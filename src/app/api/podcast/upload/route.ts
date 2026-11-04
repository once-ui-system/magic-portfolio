import { SESSION_COOKIE, verifySessionToken } from "@/lib/gallery/auth";
import { ALLOWED_AUDIO_TYPES, AUDIO_PREFIX, MAX_AUDIO_BYTES } from "@/lib/podcast/config";
import { blobConfigured } from "@/lib/podcast/episodes";
import { type HandleUploadBody, handleUpload } from "@vercel/blob/client";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * El audio se sube del navegador directamente a Vercel Blob: una función
 * serverless no admite cuerpos de más de 4,5 MB y un episodio pesa mucho más.
 * Aquí solo se firma el permiso de subida, previa verificación de la sesión.
 */
export async function POST(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  if (!blobConfigured()) {
    console.error("No hay ningún Blob store conectado al proyecto");
    return NextResponse.json(
      { message: "Almacenamiento no configurado: conecta un Blob store al proyecto" },
      { status: 500 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ message: "Petición inválida" }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(AUDIO_PREFIX)) {
          throw new Error("Ruta de subida no permitida");
        }

        return {
          allowedContentTypes: ALLOWED_AUDIO_TYPES,
          maximumSizeInBytes: MAX_AUDIO_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[podcast] fallo al firmar la subida", error);
    return NextResponse.json({ message: "No se pudo autorizar la subida" }, { status: 400 });
  }
}

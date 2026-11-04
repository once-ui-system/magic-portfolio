import { SESSION_COOKIE, verifySessionToken } from "@/lib/gallery/auth";
import { AUDIO_PREFIX, addEpisode, readEpisodes, removeEpisode } from "@/lib/podcast/episodes";
import type { PodcastEpisode } from "@/lib/podcast/types";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  const episodes = await readEpisodes();
  return NextResponse.json({ episodes });
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  let body: Partial<PodcastEpisode> & { publishedAt?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: "Petición inválida" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const audioUrl = String(body.audioUrl ?? "").trim();
  const pathname = String(body.pathname ?? "").trim();
  const publishedAt = String(body.publishedAt ?? "").slice(0, 10);

  if (title.length < 3) {
    return NextResponse.json({ message: "El título es demasiado corto" }, { status: 400 });
  }

  if (!/^https:\/\//.test(audioUrl)) {
    return NextResponse.json({ message: "El audio no tiene una URL válida" }, { status: 400 });
  }

  if (!pathname.startsWith(AUDIO_PREFIX)) {
    return NextResponse.json({ message: "La ruta del audio no es válida" }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    return NextResponse.json({ message: "La fecha no es válida" }, { status: 400 });
  }

  const duration = Number(body.durationSeconds);
  const size = Number(body.sizeBytes);

  const episode: PodcastEpisode = {
    id: crypto.randomUUID(),
    title: title.slice(0, 160),
    description: description.slice(0, 1200),
    audioUrl,
    pathname,
    contentType: String(body.contentType ?? "audio/mpeg"),
    sizeBytes: Number.isFinite(size) && size > 0 ? size : 0,
    durationSeconds: Number.isFinite(duration) && duration > 0 ? Math.round(duration) : 0,
    publishedAt,
    createdAt: new Date().toISOString(),
  };

  try {
    await addEpisode(episode);
  } catch (error) {
    console.error("[podcast] no se pudo guardar el episodio", error);
    return NextResponse.json({ message: "No se pudo guardar el episodio" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, episode });
}

export async function DELETE(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Falta el identificador" }, { status: 400 });
  }

  try {
    const removed = await removeEpisode(id);
    if (!removed) {
      return NextResponse.json({ message: "Ese episodio no existe" }, { status: 404 });
    }
  } catch (error) {
    console.error("[podcast] no se pudo borrar el episodio", error);
    return NextResponse.json({ message: "No se pudo borrar el episodio" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

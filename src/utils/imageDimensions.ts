import path from "node:path";

export type ImageDimensions = Record<string, { width: number; height: number }>;

/**
 * Reads the width and height of images in /public on the server, so the gallery can lay them out
 * and the viewer can size them before they download. Uses sharp, which Next.js already installs
 * for image optimization. Remote images, missing files and a missing sharp are skipped: those
 * fall back to `orientation` or to the browser measuring the image.
 */
export async function getImageDimensions(srcs: string[]): Promise<ImageDimensions> {
  const dimensions: ImageDimensions = {};
  const local = srcs.filter((src) => src.startsWith("/") && !src.startsWith("//"));
  if (local.length === 0) return dimensions;

  let sharp: typeof import("sharp")["default"];
  try {
    sharp = (await import("sharp")).default;
  } catch {
    return dimensions;
  }

  await Promise.all(
    local.map(async (src) => {
      try {
        const file = path.join(process.cwd(), "public", decodeURI(src.split(/[?#]/)[0]));
        const meta = await sharp(file).metadata();
        if (!meta.width || !meta.height) return;
        // EXIF orientations 5 to 8 are turned a quarter, so width and height swap on screen
        const turned = (meta.orientation ?? 1) >= 5;
        dimensions[src] = turned
          ? { width: meta.height, height: meta.width }
          : { width: meta.width, height: meta.height };
      } catch {
        // Unreadable file: the browser measures it instead
      }
    }),
  );
  return dimensions;
}

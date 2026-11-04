import { del, list, put } from "@vercel/blob";
import { AUDIO_PREFIX, BLOB_PREFIX, INDEX_PATH } from "./config";
import type { PodcastEpisode } from "./types";

export { AUDIO_PREFIX, BLOB_PREFIX, INDEX_PATH };
export type { PodcastEpisode };

/**
 * Vercel conecta los stores por OIDC (BLOB_STORE_ID) desde 2025 y solo añade
 * BLOB_READ_WRITE_TOKEN en algunos casos, así que vale cualquiera de los dos.
 */
export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/**
 * Lee el índice de episodios. Devuelve [] si aún no hay ninguno o si el
 * almacenamiento no está configurado: la página se muestra vacía, sin romper.
 */
export async function readEpisodes(): Promise<PodcastEpisode[]> {
  if (!blobConfigured()) return [];

  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    const index = blobs.find((blob) => blob.pathname === INDEX_PATH);
    if (!index) return [];

    const response = await fetch(index.url, { cache: "no-store" });
    if (!response.ok) return [];

    const parsed = (await response.json()) as unknown;
    if (!Array.isArray(parsed)) return [];

    return (parsed as PodcastEpisode[])
      .filter((episode) => episode && typeof episode.audioUrl === "string")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    console.warn("[podcast] no se pudo leer el índice de episodios", error);
    return [];
  }
}

async function saveEpisodes(episodes: PodcastEpisode[]): Promise<void> {
  await put(INDEX_PATH, JSON.stringify(episodes, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function addEpisode(episode: PodcastEpisode): Promise<void> {
  const episodes = await readEpisodes();
  const next = [episode, ...episodes.filter((entry) => entry.id !== episode.id)];
  await saveEpisodes(next);
}

export async function removeEpisode(id: string): Promise<boolean> {
  const episodes = await readEpisodes();
  const target = episodes.find((episode) => episode.id === id);
  if (!target) return false;

  await saveEpisodes(episodes.filter((episode) => episode.id !== id));

  try {
    if (target.pathname.startsWith(AUDIO_PREFIX)) await del(target.pathname);
  } catch (error) {
    console.warn("[podcast] no se pudo borrar el audio del almacenamiento", error);
  }

  return true;
}

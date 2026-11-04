/**
 * Un episodio del podcast.
 *
 * `audioUrl` es la URL pública del audio en Vercel Blob y `pathname` su ruta
 * dentro del almacenamiento, necesaria para poder borrarlo después.
 */
export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  pathname: string;
  contentType: string;
  sizeBytes: number;
  durationSeconds: number;
  /** Fecha del episodio (YYYY-MM-DD), la que se muestra en la web. */
  publishedAt: string;
  /** Momento real de la subida, en ISO. */
  createdAt: string;
}

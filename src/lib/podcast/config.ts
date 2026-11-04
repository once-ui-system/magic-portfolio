/** Prefijo bajo el que vive todo lo del podcast en el almacenamiento. */
export const BLOB_PREFIX = "podcast/";
/** Carpeta de los audios subidos. */
export const AUDIO_PREFIX = `${BLOB_PREFIX}audio/`;
/** Índice con los metadatos de los episodios. */
export const INDEX_PATH = `${BLOB_PREFIX}index.json`;

/** 200 MB: una hora de audio en MP3 de calidad alta ronda los 60 MB. */
export const MAX_AUDIO_BYTES = 200 * 1024 * 1024;

/** Formatos que aceptan todos los navegadores actuales. */
export const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/aac",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/webm",
];

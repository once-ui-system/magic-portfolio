"use client";

import { AUDIO_PREFIX, MAX_AUDIO_BYTES } from "@/lib/podcast/config";
import { Column, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ActionButton from "./ActionButton";
import styles from "./PodcastUpload.module.scss";

type Step = "closed" | "email" | "code" | "upload";

function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function readDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);
    const finish = (value: number) => {
      URL.revokeObjectURL(url);
      resolve(value);
    };
    audio.preload = "metadata";
    audio.onloadedmetadata = () => finish(Number.isFinite(audio.duration) ? audio.duration : 0);
    audio.onerror = () => finish(0);
    audio.src = url;
  });
}

export default function PodcastUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("closed");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState(today);
  const [progress, setProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; kind: "error" | "info" } | null>(null);

  const reset = () => {
    setStep("closed");
    setCode("");
    setFile(null);
    setTitle("");
    setDescription("");
    setPublishedAt(today());
    setProgress(null);
    setMessage(null);
  };

  const requestCode = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/gallery/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "No se pudo enviar el código");
      }
      setStep("code");
      setMessage({
        text: "Si el correo es el autorizado, recibirás un código en un minuto.",
        kind: "info",
      });
    } catch (error) {
      setMessage({ text: (error as Error).message, kind: "error" });
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/gallery/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "Código incorrecto");
      }
      setStep("upload");
    } catch (error) {
      setMessage({ text: (error as Error).message, kind: "error" });
    } finally {
      setBusy(false);
    }
  };

  const publish = async () => {
    if (!file) {
      setMessage({ text: "Elige el archivo de audio", kind: "error" });
      return;
    }

    if (title.trim().length < 3) {
      setMessage({ text: "Ponle un título al episodio", kind: "error" });
      return;
    }

    if (file.size > MAX_AUDIO_BYTES) {
      setMessage({ text: "El audio supera los 200 MB", kind: "error" });
      return;
    }

    setBusy(true);
    setProgress(0);
    setMessage(null);

    try {
      const extension = (file.name.split(".").pop() ?? "mp3")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const pathname = `${AUDIO_PREFIX}${slug(title) || "episodio"}-${Date.now()}.${extension || "mp3"}`;

      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/podcast/upload",
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });

      const duration = await readDuration(file);

      const response = await fetch("/api/podcast/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          audioUrl: blob.url,
          pathname: blob.pathname,
          contentType: file.type || "audio/mpeg",
          sizeBytes: file.size,
          durationSeconds: duration,
          publishedAt,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "No se pudo guardar el episodio");
      }

      const newTitle = title.trim();
      reset();
      setStep("upload");
      setMessage({ text: `“${newTitle}” ya está publicado.`, kind: "info" });
      router.refresh();
    } catch (error) {
      setMessage({ text: (error as Error).message, kind: "error" });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  if (step === "closed") {
    return (
      <Row fillWidth horizontal="center" paddingY="8">
        <ActionButton
          variant="secondary"
          size="sm"
          icon={<Icon name="microphone" size="s" />}
          onClick={() => setStep("email")}
        >
          Subir un episodio
        </ActionButton>
      </Row>
    );
  }

  return (
    <Column
      className={styles.panel}
      background="surface"
      border="neutral-alpha-weak"
      radius="l"
      padding="24"
      gap="16"
      marginY="8"
    >
      <Row fillWidth horizontal="between" vertical="center">
        <Heading as="h2" variant="heading-strong-s">
          {step === "upload" ? "Nuevo episodio" : "Verifica que eres tú"}
        </Heading>
        <ActionButton variant="ghost" size="sm" onClick={reset}>
          Cerrar
        </ActionButton>
      </Row>

      {step === "email" && (
        <>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Te enviaremos un código de un solo uso al correo autorizado.
          </Text>
          <input
            className={styles.input}
            type="email"
            value={email}
            placeholder="tu@correo.com"
            aria-label="Correo electrónico"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && email.includes("@") && requestCode()}
          />
          <ActionButton
            variant="primary"
            size="md"
            loading={busy}
            disabled={!email.includes("@")}
            onClick={requestCode}
          >
            Enviarme el código
          </ActionButton>
        </>
      )}

      {step === "code" && (
        <>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Introduce el código de 8 caracteres que has recibido. Caduca en 10 minutos.
          </Text>
          <input
            className={`${styles.input} ${styles.code}`}
            type="text"
            value={code}
            maxLength={8}
            placeholder="········"
            aria-label="Código de verificación"
            autoComplete="one-time-code"
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            onKeyDown={(event) => event.key === "Enter" && code.length === 8 && verifyCode()}
          />
          <ActionButton
            variant="primary"
            size="md"
            loading={busy}
            disabled={code.length < 8}
            onClick={verifyCode}
          >
            Entrar
          </ActionButton>
        </>
      )}

      {step === "upload" && (
        <>
          <button
            type="button"
            className={styles.dropzone}
            onClick={() => fileInputRef.current?.click()}
          >
            <Text variant="body-strong-s">{file ? file.name : "Elige el audio del episodio"}</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              MP3, M4A, WAV, OGG o WebM · hasta 200 MB
            </Text>
          </button>
          <input
            ref={fileInputRef}
            className={styles.hiddenInput}
            type="file"
            accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/aac,audio/wav,audio/x-wav,audio/ogg,audio/webm"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />

          <input
            className={styles.input}
            type="text"
            value={title}
            placeholder="Título del episodio"
            aria-label="Título del episodio"
            maxLength={160}
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            className={styles.textarea}
            value={description}
            placeholder="De qué hablas en este episodio"
            aria-label="Descripción del episodio"
            rows={3}
            maxLength={1200}
            onChange={(event) => setDescription(event.target.value)}
          />

          <input
            className={styles.input}
            type="date"
            value={publishedAt}
            aria-label="Fecha del episodio"
            onChange={(event) => setPublishedAt(event.target.value)}
          />

          {progress !== null && (
            <Column gap="4" fillWidth>
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${progress}%` }} />
              </div>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Subiendo… {progress}%
              </Text>
            </Column>
          )}

          <ActionButton
            variant="primary"
            size="lg"
            loading={busy}
            disabled={!file || title.trim().length < 3}
            onClick={publish}
          >
            Publicar episodio
          </ActionButton>
        </>
      )}

      {message && (
        <Text
          variant="body-default-s"
          className={message.kind === "error" ? styles.error : styles.success}
        >
          {message.text}
        </Text>
      )}
    </Column>
  );
}

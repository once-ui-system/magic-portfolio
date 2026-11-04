"use client";

import type { PodcastEpisode } from "@/lib/podcast/types";
import { Card, Column, Heading, Row, Text } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  const two = (value: number) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${two(minutes)}:${two(rest)}` : `${minutes}:${two(rest)}`;
}

function formatDate(value: string): string {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function PodcastList({ episodes }: { episodes: PodcastEpisode[] }) {
  const players = useRef(new Map<string, HTMLAudioElement>());
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    if (!playing) return;
    players.current.forEach((audio, id) => {
      if (id !== playing && !audio.paused) audio.pause();
    });
  }, [playing]);

  if (episodes.length === 0) {
    return (
      <Card fillWidth padding="32" radius="l" background="surface" border="neutral-alpha-weak">
        <Column gap="8" horizontal="center" align="center">
          <Heading as="h2" variant="heading-strong-s">
            Todavía no hay episodios
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            El primer audio aparecerá aquí en cuanto se suba.
          </Text>
        </Column>
      </Card>
    );
  }

  return (
    <Column fillWidth gap="16">
      {episodes.map((episode) => (
        <Card
          key={episode.id}
          fillWidth
          padding="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Column gap="12" fillWidth>
            <Row gap="8" vertical="center">
              <Text variant="body-default-xs" onBackground="neutral-medium">
                {formatDate(episode.publishedAt)}
              </Text>
              {episode.durationSeconds > 0 && (
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  · {formatDuration(episode.durationSeconds)}
                </Text>
              )}
            </Row>
            <Heading as="h2" variant="heading-strong-m">
              {episode.title}
            </Heading>
            {episode.description && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                {episode.description}
              </Text>
            )}
            {/* biome-ignore lint/a11y/useMediaCaption: aún no hay transcripciones de los episodios */}
            <audio
              ref={(element) => {
                if (element) players.current.set(episode.id, element);
                else players.current.delete(episode.id);
              }}
              src={episode.audioUrl}
              controls
              preload="none"
              onPlay={() => setPlaying(episode.id)}
              onPause={() => setPlaying((current) => (current === episode.id ? null : current))}
              style={{ width: "100%" }}
            >
              Tu navegador no admite la reproducción de audio.
            </audio>
          </Column>
        </Card>
      ))}
    </Column>
  );
}

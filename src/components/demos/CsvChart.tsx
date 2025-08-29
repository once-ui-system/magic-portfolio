"use client";
import { Card, Column, Heading, Row, Text } from "@once-ui-system/core";

type Series = { label: string; value: number }[];

export function CsvChart({ title = "CSV Preview", series }: { title?: string; series: Series }) {
  const max = Math.max(1, ...series.map((s) => s.value));
  const height = 140;
  const barWidth = 28;
  const gap = 16;
  const width = series.length * (barWidth + gap) + gap;

  return (
    <Card padding="16" radius="m">
      <Column gap="8">
        <Heading as="h4" variant="heading-strong-m">{title}</Heading>
        <svg width={width} height={height} role="img" aria-label="CSV chart preview">
          {series.map((s, i) => {
            const h = Math.round((s.value / max) * (height - 24));
            const x = gap + i * (barWidth + gap);
            const y = height - h - 4;
            return (
              <g key={i}>
                <rect x={x} y={y} width={barWidth} height={h} fill="var(--brand-solid-strong)" rx={4} />
                <text x={x + barWidth / 2} y={height - 2} textAnchor="middle" fontSize="10" fill="var(--neutral-strong)">{s.label}</text>
              </g>
            );
          })}
        </svg>
        <Row gap="8">
          {series.map((s, i) => (
            <Text key={i} variant="label-default-s">{s.label}: {s.value.toLocaleString()}</Text>
          ))}
        </Row>
      </Column>
    </Card>
  );
}


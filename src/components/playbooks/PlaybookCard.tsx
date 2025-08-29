"use client";
import { Card, Column, Heading, Text } from "@once-ui-system/core";
import { PlaybookDownload } from "./PlaybookDownload";

type Props = { slug: string; title: string; summary: string; industry: string };

export function PlaybookCard({ slug, title, summary, industry }: Props) {
  return (
    <Card padding="24" radius="l">
      <Column gap="8">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        <Text onBackground="neutral-weak">{summary}</Text>
        <PlaybookDownload slug={slug} industry={industry} title="Get the Playbook" />
      </Column>
    </Card>
  );
}

"use client";

import { blog, person } from "@/resources";
import { type ContentKind, contentApi } from "@/utils/contentKind";
import { Row, Text } from "@once-ui-system/core";
import { useEffect, useState } from "react";

interface ViewCountClientProps {
  slug: string;
  kind: ContentKind;
}

// "1.2k" in the site's language (person.locale)
const compact = new Intl.NumberFormat(person.locale ?? "en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

// The label from blog.viewCounts in content.tsx, with an English default
const reads =
  blog.viewCounts?.reads ??
  ((formatted: string, count: number) => `${formatted} ${count === 1 ? "read" : "reads"}`);

const formatReads = (count: number) => reads(compact.format(count).toLowerCase(), count);

/**
 * Records this visit and shows the total. Space is reserved and the number fades in, so the
 * centered meta row doesn't jump when it arrives.
 */
export function ViewCountClient({ slug, kind }: ViewCountClientProps) {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(contentApi("views", kind, slug), { method: "POST", cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        if (data.enabled) setCount(data.count);
        else setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, kind]);

  if (failed) return null;

  return (
    <Row
      gap="8"
      vertical="center"
      opacity={count === null ? 0 : 100}
      transition="micro-medium"
      minWidth="10ch"
    >
      <Text textVariant="body-default-xs" onBackground="neutral-weak" aria-hidden="true">
        ·
      </Text>
      <Text textVariant="body-default-xs" onBackground="neutral-weak" wrap="nowrap">
        {count === null ? " " : formatReads(count)}
      </Text>
    </Row>
  );
}

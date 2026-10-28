"use client";

import {
  Column,
  Grid,
  Row,
  Scroller,
  Text,
  ToggleButton,
  VisuallyHidden,
} from "@once-ui-system/core";
import { blog } from "@/resources";
import { useSearchParams } from "next/navigation";
import { type ReactNode, Suspense, useCallback, useEffect, useState } from "react";
import Post from "./Post";

export interface TagCount {
  name: string;
  count: number;
}

export interface TagFilterPost {
  slug: string;
  metadata: { title: string; publishedAt: string; image?: string; tag?: string };
}

interface TagFilterProps {
  tags: TagCount[];
  /** Every post, newest first */
  posts: TagFilterPost[];
  /** The usual listing, rendered on the server and shown while no tag is picked */
  children: ReactNode;
}

const PARAM = "tag";

// Labels from blog.tagFilter in content.tsx, with English defaults
const labels = {
  all: blog.tagFilter?.all ?? "All",
  label: blog.tagFilter?.label ?? "Filter posts by topic",
  results:
    blog.tagFilter?.results ??
    ((count: number, tag: string) => `${count} ${count === 1 ? "post" : "posts"} about ${tag}`),
};

function matchTag(tags: TagCount[], value: string | null) {
  if (!value) return null;
  const wanted = value.toLowerCase();
  return tags.find((tag) => tag.name.toLowerCase() === wanted)?.name ?? null;
}

// useSearchParams opts its subtree out of static rendering, so it lives in this tiny leaf under
// its own Suspense boundary and the blog page itself stays static.
function TagParamReader({ onChange }: { onChange: (value: string | null) => void }) {
  const value = useSearchParams().get(PARAM);
  useEffect(() => onChange(value), [value, onChange]);
  return null;
}

// Topic chips above the blog listing. Picking one shows only that topic's posts and puts it in
// the address (?tag=Styling), so a filtered list can be shared and Back steps through filters.
export function TagFilter({ tags, posts, children }: TagFilterProps) {
  const [param, setParam] = useState<string | null>(null);
  const active = matchTag(tags, param);

  const select = useCallback((tag: string | null) => {
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set(PARAM, tag);
    else url.searchParams.delete(PARAM);
    // Next keeps useSearchParams in sync with the History API: no server round trip, no scroll jump
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const filtered = active ? posts.filter((post) => post.metadata.tag === active) : [];

  return (
    <Column fillWidth>
      <Suspense fallback={null}>
        <TagParamReader onChange={setParam} />
      </Suspense>
      <Column as="nav" aria-label={labels.label} fillWidth marginBottom="32">
        <Scroller>
          <Row gap="4" padding="4" paddingX="16">
            <ToggleButton
              size="s"
              label={labels.all}
              selected={!active}
              onClick={() => select(null)}
            />
            {tags.map((tag) => (
              <ToggleButton
                key={tag.name}
                size="s"
                selected={active === tag.name}
                onClick={() => select(active === tag.name ? null : tag.name)}
                label={
                  <Row gap="8" vertical="center">
                    {tag.name}
                    <Text
                      onBackground="neutral-weak"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {tag.count}
                    </Text>
                  </Row>
                }
              />
            ))}
          </Row>
        </Scroller>
      </Column>
      <VisuallyHidden as="output" aria-live="polite">
        {active ? labels.results(filtered.length, active) : ""}
      </VisuallyHidden>
      <Column fillWidth hide={!!active}>
        {children}
      </Column>
      {active && (
        <Grid columns="2" s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {filtered.map((post) => (
            <Post key={post.slug} post={post} thumbnail direction="column" />
          ))}
        </Grid>
      )}
    </Column>
  );
}

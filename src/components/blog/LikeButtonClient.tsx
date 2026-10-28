"use client";

import { blog } from "@/resources";
import { type ContentKind, contentApi } from "@/utils/contentKind";
import { Row, ToggleButton } from "@once-ui-system/core";
import { useEffect, useState } from "react";

interface LikeButtonClientProps extends React.ComponentProps<typeof Row> {
  slug: string;
  kind?: ContentKind;
}

type LikeState = { count: number; liked: boolean };

// The accessible name from blog.likes in content.tsx, with an English default
const likeLabel =
  blog.likes?.label ??
  ((count: number, kind: "post" | "project") =>
    `Like this ${kind}, ${count} ${count === 1 ? "like" : "likes"}`);

/** Hidden until the API answers, so the page never shows a button that can't work. */
export function LikeButtonClient({ slug, kind = "blog", ...flex }: LikeButtonClientProps) {
  const [state, setState] = useState<LikeState | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(contentApi("likes", kind, slug), { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && data.enabled) setState({ count: data.count, liked: data.liked });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug, kind]);

  if (!state) return null;

  const toggle = async () => {
    if (pending) return;
    const previous = state;
    const liked = !previous.liked;
    // Show the change right away and settle on the server's numbers
    setState({ liked, count: Math.max(0, previous.count + (liked ? 1 : -1)) });
    setPending(true);
    try {
      const response = await fetch(contentApi("likes", kind, slug), { method: "POST" });
      if (!response.ok) throw new Error("Like failed");
      const data = await response.json();
      setState({ count: data.count, liked: data.liked });
    } catch {
      setState(previous);
    } finally {
      setPending(false);
    }
  };

  return (
    <Row horizontal="center" {...flex}>
      <ToggleButton
        variant="outline"
        size="l"
        selected={state.liked}
        prefixIcon={state.liked ? "heartFilled" : "heart"}
        label={String(state.count)}
        onClick={toggle}
        aria-label={likeLabel(state.count, kind === "work" ? "project" : "post")}
      />
    </Row>
  );
}

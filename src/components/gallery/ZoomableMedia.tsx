"use client";

import { blog, gallery } from "@/resources";
import { Media, type MediaProps } from "@once-ui-system/core";
import { type KeyboardEvent, useCallback, useEffect, useId, useState } from "react";
import { PhotoViewer, type ViewerImage } from "./PhotoViewer";

// Rendered smaller than this, it's an icon or a logo rather than a picture worth enlarging
const MIN_WIDTH = 160;
const MIN_HEIGHT = 100;
const VIDEO = /\.(mp4|webm|mov|avi|ogv|m4v|mkv)(\?.*)?$/i;
const YOUTUBE = /youtube\.com|youtu\.be/i;

type Session = { images: ViewerImage[]; origins: HTMLElement[]; start: number };

/**
 * An image in a post or project. A click, tap, Enter or Space opens the photo viewer with every
 * zoomable image in the same <article> as the set. Media spreads extra props onto its root, so
 * there is no wrapper and no layout change.
 */
export function ZoomableMedia({ enlarge: _enlarge, ...props }: MediaProps) {
  const id = useId();
  const [zoomable, setZoomable] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const isVideo = VIDEO.test(props.src) || YOUTUBE.test(props.src);
  const openLabel =
    blog.imageZoom?.open ?? ((alt: string) => (alt ? `View larger: ${alt}` : "View image larger"));

  const find = useCallback(
    () => document.querySelector<HTMLElement>(`[data-zoom-id="${CSS.escape(id)}"]`),
    [id],
  );

  // Images inside links keep their link; small ones (icons, logos) aren't worth a viewer
  useEffect(() => {
    const el = find();
    if (!el || isVideo) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      setZoomable(!el.closest("a") && r.width >= MIN_WIDTH && r.height >= MIN_HEIGHT);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [find, isVideo]);

  const open = useCallback(() => {
    const el = find();
    if (!el) return;
    const root = el.closest("article") ?? document.body;
    const origins = Array.from(root.querySelectorAll<HTMLElement>('[data-zoomable="true"]'));
    const images = origins.map((origin) => {
      const img = origin.querySelector("img");
      return {
        src: origin.dataset.zoomSrc ?? "",
        alt: img?.alt ?? "",
        title: origin.dataset.zoomCaption || undefined,
        // The inline image knows its proportions once loaded; the viewer measures any that don't
        width: img?.naturalWidth || undefined,
        height: img?.naturalHeight || undefined,
      };
    });
    setSession({ images, origins, start: Math.max(0, origins.indexOf(el)) });
  }, [find]);

  const getThumbnail = useCallback((i: number) => session?.origins[i] ?? null, [session]);
  const onClosed = useCallback(() => setSession(null), []);

  if (isVideo) return <Media {...props} />;

  const interactive = zoomable && {
    role: "button",
    tabIndex: 0,
    "aria-label": openLabel(props.alt ?? ""),
    "aria-haspopup": "dialog" as const,
    className: [props.className, "cursor-zoom-in focus-ring"].filter(Boolean).join(" "),
    // Media sets `outline: none` inline, which would hide the keyboard focus ring
    style: { ...props.style, outline: undefined },
    onClick: open,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
  };

  return (
    <>
      <Media
        {...props}
        {...interactive}
        data-zoom-id={id}
        data-zoom-src={props.src}
        data-zoom-caption={typeof props.caption === "string" ? props.caption : undefined}
        data-zoomable={zoomable ? "true" : undefined}
      />
      {session && (
        <PhotoViewer
          images={session.images}
          startIndex={session.start}
          getThumbnail={getThumbnail}
          onClosed={onClosed}
          // No address bar parameter, so nothing clashes with the page's #hash; Back still closes
          urlParam={null}
          scrollToThumbnail={false}
          optimizeImages={gallery.viewer?.optimizeImages ?? true}
          labels={gallery.viewer?.labels}
        />
      )}
    </>
  );
}

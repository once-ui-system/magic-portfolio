"use client";

import type { PhotoViewerLabels } from "@/types";
import {
  Button,
  Column,
  FocusTrap,
  IconButton,
  Row,
  ScrollLock,
  Spinner,
  Text,
  VisuallyHidden,
} from "@once-ui-system/core";
import NextImage, { getImageProps } from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import styles from "./PhotoViewer.module.scss";

export type ViewerImage = {
  src: string;
  alt: string;
  title?: string;
  year?: string;
  /** Known proportions (measured on the server); without them the viewer measures the photo */
  width?: number;
  height?: number;
};

export interface PhotoViewerProps {
  images: ViewerImage[];
  startIndex: number;
  /** The element a photo opens from and closes back into (a grid tile or an article image) */
  getThumbnail: (index: number) => HTMLElement | null;
  /** Fires whenever the photo changes */
  onIndexChange?: (index: number) => void;
  /** Fires once the closing animation has finished */
  onClosed: (index: number) => void;
  /**
   * Address bar parameter for the open photo (`?photo=<slug>`); null leaves the URL alone. Either
   * way a history entry is added, so Back closes the viewer.
   */
  urlParam?: string | null;
  /**
   * On close, scroll the page so the photo's thumbnail is in view and land on it (gallery). When
   * false the page never scrolls, and a thumbnail that is off screen gets a fade (articles).
   */
  scrollToThumbnail?: boolean;
  /** Resize photos with Next.js image optimization (true) or serve the original files (false) */
  optimizeImages?: boolean;
  labels?: PhotoViewerLabels;
}

// `?photo=<slug>` uses the file name, which stays stable as photos are added or reordered
export const photoSlug = (src: string) =>
  (src.split(/[?#]/)[0].split("/").pop() ?? "").replace(/\.[^.]+$/, "");

const HISTORY_KEY = "__photoViewer";
const GAP = 24; // px between slides while swiping
const MAX_ZOOM = 4;
const DOUBLE_TAP_MS = 280;
const FALLBACK_RATIO = { width: 4, height: 3 };

type Rect = { left: number; top: number; width: number; height: number };
type Box = Rect & { vw: number; vh: number };
type Mode = "idle" | "pending" | "swipe" | "dismiss" | "pan" | "pinch";
type Tween = { cancel: () => void; finish: () => void };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;
// Resistance past an edge: follows the finger at first, then stiffens
const rubber = (d: number, size: number) =>
  (1 - 1 / ((Math.abs(d) * 0.55) / size + 1)) * size * Math.sign(d);
const rubberClamp = (v: number, [min, max]: [number, number], size: number) =>
  v < min ? min + rubber(v - min, size) : v > max ? max + rubber(v - max, size) : v;

// A small rAF tween. Every motion here writes transforms straight to the DOM, never through state.
function tween(
  duration: number,
  ease: (t: number) => number,
  update: (p: number) => void,
  done?: () => void,
): Tween {
  let raf = 0;
  let start = 0;
  let over = false;
  const end = () => {
    if (over) return;
    over = true;
    cancelAnimationFrame(raf);
    update(1);
    done?.();
  };
  if (duration <= 0) {
    end();
    return { cancel: () => {}, finish: () => {} };
  }
  const step = (now: number) => {
    if (!start) start = now;
    const t = (now - start) / duration;
    if (t >= 1) return end();
    update(ease(t));
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return {
    cancel: () => {
      over = true;
      cancelAnimationFrame(raf);
    },
    finish: end,
  };
}

function fitInto(width: number, height: number, box: Rect): Rect {
  const scale = Math.min(box.width / width, box.height / height);
  const w = width * scale;
  const h = height * scale;
  return {
    width: w,
    height: h,
    left: box.left + (box.width - w) / 2,
    top: box.top + (box.height - h) / 2,
  };
}

// Twice the on-screen width (capped at the viewport) leaves headroom for zooming in
const sizesFor = (rect: Rect, box: Box) => `${Math.ceil(Math.min(box.vw, rect.width * 2))}px`;

const radiusOf = (el: Element | null) =>
  el ? Number.parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0 : 0;
// The origin is either the rounded element itself or a wrapper around it
const originRadius = (el: Element) => Math.max(radiusOf(el), radiusOf(el.firstElementChild));

// Show or hide a thumbnail at once. Core Media has `transition: all`, which would otherwise
// animate `visibility` too: it would stay visible while the photo grows out of it, and still be
// hidden (so it can't take focus) right after the viewer closes onto it.
function setThumbHidden(el: HTMLElement | null, hidden: boolean) {
  if (!el) return;
  const transition = el.style.transition;
  el.style.transition = "none";
  el.style.visibility = hidden ? "hidden" : "";
  getComputedStyle(el).visibility; // Apply it now, before the transition comes back
  el.style.transition = transition;
}

interface PhotoProps {
  image: ViewerImage;
  sizes: string;
  current: boolean;
  optimize: boolean;
  placeholder?: string;
  errorLabel: string;
  retryLabel: string;
  onDimensions: (width: number, height: number) => void;
}

// One photo: the grid thumbnail (already cached) underneath, the sharp image fading in on top
function Photo({
  image,
  sizes,
  current,
  optimize,
  placeholder,
  errorLabel,
  retryLabel,
  onDimensions,
}: PhotoProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [slow, setSlow] = useState(false);

  // A spinner only when loading is actually slow, so fast loads don't flash one
  // biome-ignore lint/correctness/useExhaustiveDependencies: restarts the timer on every retry
  useEffect(() => {
    if (status !== "loading") return;
    setSlow(false);
    const timer = setTimeout(() => setSlow(true), 450);
    return () => clearTimeout(timer);
  }, [status, attempt]);

  if (status === "error") {
    return (
      <Column position="absolute" fill center gap="12" padding="16" pointerEvents="auto">
        <Text textVariant="body-default-s" onBackground="neutral-weak" align="center">
          {errorLabel}
        </Text>
        <Button
          size="s"
          variant="secondary"
          onClick={() => {
            setAttempt((n) => n + 1);
            setStatus("loading");
          }}
        >
          {retryLabel}
        </Button>
      </Column>
    );
  }

  return (
    <>
      {placeholder && status !== "loaded" && (
        <img
          src={placeholder}
          alt=""
          aria-hidden
          className={styles.placeholder}
          draggable={false}
        />
      )}
      <NextImage
        key={attempt}
        src={image.src}
        unoptimized={!optimize}
        alt={image.alt}
        fill
        sizes={sizes}
        // The open photo is often the page's main image (deep links); neighbours load right behind it
        loading="eager"
        fetchPriority={current ? "high" : "low"}
        draggable={false}
        className={styles.photo}
        data-loaded={status === "loaded"}
        onLoad={(e) => {
          setStatus("loaded");
          onDimensions(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight);
        }}
        onError={() => setStatus("error")}
      />
      {status === "loading" && slow && (
        <Row position="absolute" fill center pointerEvents="none">
          <Spinner size="s" />
        </Row>
      )}
    </>
  );
}

/**
 * A full-screen photo viewer: opens out of its thumbnail and closes back into it, 1:1 swipe with
 * edge resistance, swipe down to close, pinch and double-tap zoom, keyboard arrows and Escape,
 * and Back closes it. The chrome is Once UI; the gesture layers (stage, track, slides, zoom and
 * frame) are plain elements because their transforms are written on every animation frame and
 * must not pick up layout utility classes.
 */
export function PhotoViewer({
  images,
  startIndex,
  getThumbnail,
  onIndexChange,
  onClosed,
  urlParam = "photo",
  scrollToThumbnail = true,
  optimizeImages = true,
  labels,
}: PhotoViewerProps) {
  const text = {
    dialog: labels?.dialog ?? "Photo viewer",
    close: labels?.close ?? "Close photo viewer",
    previous: labels?.previous ?? "Previous photo",
    next: labels?.next ?? "Next photo",
    counter:
      labels?.counter ?? ((current: number, total: number) => `Photo ${current} of ${total}`),
    error: labels?.error ?? "Couldn't load this photo",
    retry: labels?.retry ?? "Try again",
  };
  const statusId = useId();

  const [index, setIndex] = useState(startIndex);
  const [box, setBox] = useState<Box | null>(null);
  const [measured, setMeasured] = useState<Record<string, { width: number; height: number }>>({});
  const [chromeHidden, setChromeHidden] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Everything the gesture code reads lives in refs, so the handlers are bound once
  const indexRef = useRef(startIndex);
  const boxRef = useRef<Box | null>(null);
  const fittedRef = useRef<Rect | null>(null);
  const phaseRef = useRef<"opening" | "open" | "closing">("opening");
  const reducedRef = useRef(false);
  const pushedRef = useRef(false);
  const imagesRef = useRef(images);
  imagesRef.current = images;
  const originalRestoration = useRef(window.history.scrollRestoration);
  const closeScrollRef = useRef<number | null>(null);
  // Read before any effect rewrites the URL: the parameter already there means a deep link
  const openedFromUrl = useRef<boolean | null>(null);
  if (openedFromUrl.current === null)
    openedFromUrl.current = !!urlParam && new URL(window.location.href).searchParams.has(urlParam);
  const hiddenThumbRef = useRef<HTMLElement | null>(null);
  const frameRadiusRef = useRef(0);
  const tweens = useRef<{ track?: Tween; zoom?: Tween; frame?: Tween; open?: Tween }>({});
  // Direction of the slide currently animating (0 while the track only springs back)
  const navDirRef = useRef(0);
  const motion = useRef({
    trackX: 0,
    frame: { x: 0, y: 0, sx: 1, sy: 1, radius: null as number | null },
    zoom: { s: 1, x: 0, y: 0 },
    backdrop: 1,
  });

  const total = images.length;
  const image = images[index];

  const dimsOf = useCallback(
    (img: ViewerImage) =>
      img.width && img.height
        ? { width: img.width, height: img.height }
        : (measured[img.src] ?? FALLBACK_RATIO),
    [measured],
  );
  const fitted = box && image ? fitInto(dimsOf(image).width, dimsOf(image).height, box) : null;
  fittedRef.current = fitted;
  boxRef.current = box;

  // Write the current motion state to the DOM
  const paint = useCallback(() => {
    const { trackX, frame, zoom, backdrop } = motion.current;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${trackX}px,0,0)`;
    if (zoomRef.current)
      zoomRef.current.style.transform = `translate3d(${zoom.x}px,${zoom.y}px,0) scale(${zoom.s})`;
    if (frameRef.current) {
      const f = frameRef.current.style;
      f.transform = `translate3d(${frame.x}px,${frame.y}px,0) scale(${frame.sx},${frame.sy})`;
      // Radius is in screen pixels; divided by the scale so corners stay round while it stretches
      f.borderRadius =
        frame.radius === null ? "" : `${frame.radius / frame.sx}px / ${frame.radius / frame.sy}px`;
    }
    if (backdropRef.current) backdropRef.current.style.opacity = String(backdrop);
    stageRef.current?.toggleAttribute("data-zoomed", zoom.s > 1.01);
  }, []);

  const frameRaf = useRef(0);
  const schedule = useCallback(() => {
    if (frameRaf.current) return;
    frameRaf.current = requestAnimationFrame(() => {
      frameRaf.current = 0;
      paint();
    });
  }, [paint]);

  // Hide the thumbnail of the photo on screen, so it looks like the same picture lifted out
  const hideThumb = useCallback(
    (i: number | null) => {
      setThumbHidden(hiddenThumbRef.current, false);
      hiddenThumbRef.current = i === null ? null : getThumbnail(i);
      setThumbHidden(hiddenThumbRef.current, true);
    },
    [getThumbnail],
  );

  // Measure the area photos fit into (CSS owns the insets, including safe areas)
  useLayoutEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox({
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height,
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Resize or rotation while open: drop any zoom or half-finished drag
  const lastBox = useRef<Box | null>(null);
  useLayoutEffect(() => {
    if (!box) return;
    if (lastBox.current && (lastBox.current.vw !== box.vw || lastBox.current.vh !== box.vh)) {
      tweens.current.track?.finish();
      tweens.current.zoom?.cancel();
      motion.current.zoom = { s: 1, x: 0, y: 0 };
      motion.current.trackX = 0;
      if (phaseRef.current === "open")
        motion.current.frame = { x: 0, y: 0, sx: 1, sy: 1, radius: null };
      paint();
    }
    lastBox.current = box;
  }, [box, paint]);

  // Open: grow out of the thumbnail, or fade in when it isn't on screen
  const opened = useRef(false);
  useLayoutEffect(() => {
    if (!box || !fittedRef.current || opened.current) return;
    opened.current = true;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frameRadiusRef.current = radiusOf(frameRef.current);
    const stage = stageRef.current;
    if (!stage) return;
    const thumb = getThumbnail(indexRef.current);
    const from = thumb?.getBoundingClientRect();
    const visible = from && from.width > 0 && from.bottom > 0 && from.top < window.innerHeight;
    const f = fittedRef.current;
    const m = motion.current;
    stage.dataset.phase = "opening";

    const done = () => {
      phaseRef.current = "open";
      stage.dataset.phase = "open";
      m.frame = { x: 0, y: 0, sx: 1, sy: 1, radius: null };
      paint();
    };

    if (thumb && from && visible && !reducedRef.current) {
      hideThumb(indexRef.current);
      const thumbRadius = originRadius(thumb);
      const start = {
        x: from.left + from.width / 2 - (f.left + f.width / 2),
        y: from.top + from.height / 2 - (f.top + f.height / 2),
        sx: from.width / f.width,
        sy: from.height / f.height,
      };
      const apply = (p: number) => {
        m.frame = {
          x: start.x * (1 - p),
          y: start.y * (1 - p),
          sx: start.sx + (1 - start.sx) * p,
          sy: start.sy + (1 - start.sy) * p,
          radius: thumbRadius + (frameRadiusRef.current - thumbRadius) * p,
        };
        m.backdrop = p;
        paint();
      };
      apply(0);
      tweens.current.open = tween(420, easeOutQuart, apply, done);
    } else {
      const reduced = reducedRef.current;
      const apply = (p: number) => {
        const s = reduced ? 1 : 0.94 + 0.06 * p;
        m.frame = { x: 0, y: 0, sx: s, sy: s, radius: null };
        m.backdrop = p;
        if (frameRef.current) frameRef.current.style.opacity = String(p);
        paint();
      };
      apply(0);
      tweens.current.open = tween(reduced ? 160 : 260, easeOut, apply, done);
    }
  }, [box, getThumbnail, hideThumb, paint]);

  // Close: shrink back into the thumbnail, scrolling it into view first if needed
  const close = useCallback(
    (fromHistory = false) => {
      if (phaseRef.current === "closing") return;
      tweens.current.open?.finish();
      tweens.current.track?.finish();
      tweens.current.zoom?.cancel();
      tweens.current.frame?.cancel();
      phaseRef.current = "closing";
      const stage = stageRef.current;
      if (stage) stage.dataset.phase = "closing";

      if (!fromHistory) {
        if (pushedRef.current) {
          pushedRef.current = false;
          window.history.back();
        } else {
          // Arrived by deep link: keep the page's history entry, just drop the parameter
          const url = new URL(window.location.href);
          if (urlParam) url.searchParams.delete(urlParam);
          window.history.replaceState({}, "", url);
        }
      }

      const i = indexRef.current;
      const m = motion.current;
      const f = fittedRef.current;
      const thumb = getThumbnail(i);
      let to = thumb?.getBoundingClientRect();
      const offscreen = (r?: DOMRect) => !r || r.bottom < 0 || r.top > window.innerHeight;
      if (thumb && offscreen(to)) {
        if (scrollToThumbnail) {
          thumb.scrollIntoView({ block: "center", behavior: "instant" });
          to = thumb.getBoundingClientRect();
        } else {
          to = undefined; // Leave the page where it is and fade out
        }
      }
      closeScrollRef.current = window.scrollY;
      // Without scrolling, an off-screen photo can't usefully take focus; return it to the start
      const focusOrigin = !to && !scrollToThumbnail ? getThumbnail(startIndex) : thumb;
      const finish = () => {
        hideThumb(null);
        const focusable = focusOrigin?.closest<HTMLElement>("[tabindex]") ?? focusOrigin;
        focusable?.focus({ preventScroll: true });
        onClosed(i);
      };

      const start = { ...m.frame, radius: m.frame.radius ?? frameRadiusRef.current };
      const zoom = { ...m.zoom };
      const backdrop = m.backdrop;

      if (thumb && to && to.width > 0 && f && !reducedRef.current) {
        hideThumb(i);
        const thumbRadius = originRadius(thumb);
        const end = {
          x: to.left + to.width / 2 - (f.left + f.width / 2),
          y: to.top + to.height / 2 - (f.top + f.height / 2),
          sx: to.width / f.width,
          sy: to.height / f.height,
        };
        tweens.current.frame = tween(
          340,
          easeOutQuart,
          (p) => {
            m.frame = {
              x: start.x + (end.x - start.x) * p,
              y: start.y + (end.y - start.y) * p,
              sx: start.sx + (end.sx - start.sx) * p,
              sy: start.sy + (end.sy - start.sy) * p,
              radius: start.radius + (thumbRadius - start.radius) * p,
            };
            m.zoom = { s: zoom.s + (1 - zoom.s) * p, x: zoom.x * (1 - p), y: zoom.y * (1 - p) };
            m.backdrop = backdrop * (1 - p);
            paint();
          },
          finish,
        );
      } else {
        // No thumbnail to land on (or reduced motion): fade out where it is
        const reduced = reducedRef.current;
        tweens.current.frame = tween(
          reduced ? 140 : 220,
          easeOut,
          (p) => {
            const s = reduced ? 1 : 1 - 0.06 * p;
            m.frame = { ...start, sx: start.sx * s, sy: start.sy * s };
            m.backdrop = backdrop * (1 - p);
            if (frameRef.current) frameRef.current.style.opacity = String(1 - p);
            paint();
          },
          finish,
        );
      }
    },
    [getThumbnail, hideThumb, onClosed, paint, scrollToThumbnail, startIndex, urlParam],
  );

  // Swap the current photo; the track already slid over, so this just re-centres it
  const commit = useCallback(
    (next: number) => {
      indexRef.current = next;
      motion.current.trackX = 0;
      motion.current.zoom = { s: 1, x: 0, y: 0 };
      flushSync(() => setIndex(next));
      paint();
    },
    [paint],
  );

  const go = useCallback(
    (dir: 1 | -1, velocity = 0) => {
      if (phaseRef.current === "closing") return;
      tweens.current.open?.finish();
      // A second press mid-slide finishes the first one at once, so presses never queue or skip
      tweens.current.track?.finish();
      const m = motion.current;
      const target = indexRef.current + dir;
      const vw = boxRef.current?.vw ?? window.innerWidth;
      if (target < 0 || target >= images.length) {
        // A nudge at either end, so the press visibly registered
        if (reducedRef.current) return;
        const from = m.trackX;
        tweens.current.track = tween(
          280,
          (t) => t,
          (p) => {
            m.trackX = from * (1 - p) - dir * 28 * Math.sin(p * Math.PI);
            paint();
          },
          () => {
            tweens.current.track = undefined;
          },
        );
        return;
      }
      if (m.zoom.s > 1.01) {
        tweens.current.zoom?.cancel();
        m.zoom = { s: 1, x: 0, y: 0 };
      }
      const from = m.trackX;
      const end = -dir * (vw + GAP);
      const distance = Math.abs(end - from);
      const duration = reducedRef.current
        ? 0
        : clamp(distance / Math.max(Math.abs(velocity), 2.2), 150, 340);
      navDirRef.current = dir;
      tweens.current.track = tween(
        duration,
        easeOut,
        (p) => {
          m.trackX = from + (end - from) * p;
          paint();
        },
        () => {
          tweens.current.track = undefined;
          navDirRef.current = 0;
          commit(target);
        },
      );
    },
    [commit, images.length, paint],
  );

  // History entry (before the URL sync below, so it runs first): Back closes the viewer
  useEffect(() => {
    // Scroll restoration is stored per history entry. Set it before pushing, so the page's own
    // entry doesn't scroll back to its old position on Back and undo the scroll to the thumbnail.
    window.history.scrollRestoration = "manual";
    const state = window.history.state;
    if (state?.[HISTORY_KEY]) {
      pushedRef.current = true; // Strict Mode re-run or Forward: the entry already exists
    } else if (openedFromUrl.current) {
      pushedRef.current = false; // Opened from a deep link
    } else {
      const url = new URL(window.location.href);
      if (urlParam)
        url.searchParams.set(urlParam, photoSlug(imagesRef.current[indexRef.current].src));
      window.history.pushState({ [HISTORY_KEY]: true }, "", url);
      pushedRef.current = true;
    }
    const onPop = () => {
      if (phaseRef.current === "closing") {
        // Keep the thumbnail we're closing onto in view
        if (closeScrollRef.current !== null)
          window.scrollTo({ top: closeScrollRef.current, behavior: "instant" });
        return;
      }
      pushedRef.current = false;
      close(true);
    };
    window.addEventListener("popstate", onPop);
    const restoration = originalRestoration.current;
    return () => {
      window.removeEventListener("popstate", onPop);
      window.history.scrollRestoration = restoration;
    };
  }, [close, urlParam]);

  // Report the index, keep the URL in step, and keep the thumbnail under the photo hidden.
  // Keyed on the index alone: other re-renders must not touch the URL.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on photo changes only
  useEffect(() => {
    if (phaseRef.current === "closing") return;
    onIndexChange?.(index);
    const url = new URL(window.location.href);
    if (urlParam) url.searchParams.set(urlParam, photoSlug(imagesRef.current[index].src));
    if (url.href !== window.location.href) {
      window.history.replaceState(
        window.history.state?.[HISTORY_KEY] ? { [HISTORY_KEY]: true } : {},
        "",
        url,
      );
    }
    if (phaseRef.current === "open" && hiddenThumbRef.current) hideThumb(index);
  }, [index]);

  // A disabled button drops focus to <body>; hand it to the other arrow instead
  useEffect(() => {
    const active = document.activeElement;
    if (active === prevButtonRef.current && index === 0) nextButtonRef.current?.focus();
    if (active === nextButtonRef.current && index === total - 1) prevButtonRef.current?.focus();
  }, [index, total]);

  // Warm the cache two photos out each way (the direct neighbours are already mounted), with the
  // same URL the viewer will ask for
  useEffect(() => {
    if (!box) return;
    for (const i of [index + 2, index - 2]) {
      const img = images[i];
      if (!img) continue;
      const rect = fitInto(dimsOf(img).width, dimsOf(img).height, box);
      const { props } = getImageProps({
        src: img.src,
        alt: "",
        fill: true,
        sizes: sizesFor(rect, box),
        unoptimized: !optimizeImages,
        loading: "eager",
      });
      const preload = new window.Image();
      if (props.sizes) preload.sizes = props.sizes;
      if (props.srcSet) preload.srcset = props.srcSet;
      preload.src = props.src;
    }
  }, [index, images, box, dimsOf, optimizeImages]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || phaseRef.current === "closing") return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go]);

  // Pointer gestures: swipe, swipe down to close, double-tap and pinch zoom, pan while zoomed
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const m = motion.current;
    const g = {
      mode: "idle" as Mode,
      type: "touch",
      pointers: new Map<number, { x: number; y: number }>(),
      startX: 0,
      startY: 0,
      trackBase: 0,
      zoomBase: { s: 1, x: 0, y: 0 },
      pinch: { dist: 1, s: 1, lx: 0, ly: 0 },
      samples: [] as { x: number; y: number; t: number }[],
      lastTap: { t: 0, x: 0, y: 0 },
      tapTimer: 0 as ReturnType<typeof setTimeout> | 0,
      wheelAcc: 0,
      wheelLocked: false,
      wheelTimer: 0 as ReturnType<typeof setTimeout> | 0,
    };
    // Both are set by the time any gesture can start (the stage only takes input once measured)
    const fit = () => fittedRef.current as Rect;
    const viewport = () => boxRef.current as Box;

    const center = () => {
      const f = fit();
      return { cx: f.left + f.width / 2, cy: f.top + f.height / 2 };
    };
    // Allowed pan range at scale s: once the photo is bigger than the screen, its edges can't
    // come inside it
    const bounds = (s: number) => {
      const f = fit();
      const { cx, cy } = center();
      const { vw, vh } = viewport();
      const hw = (f.width * s) / 2;
      const hh = (f.height * s) / 2;
      return {
        x: (hw * 2 > vw ? [vw - cx - hw, hw - cx] : [0, 0]) as [number, number],
        y: (hh * 2 > vh ? [vh - cy - hh, hh - cy] : [0, 0]) as [number, number],
      };
    };
    const velocity = (now: number) => {
      const s = g.samples;
      if (s.length < 2) return { x: 0, y: 0 };
      const last = s[s.length - 1];
      if (now - last.t > 80) return { x: 0, y: 0 }; // The finger stopped before lifting
      const first = s[0];
      const dt = Math.max(1, last.t - first.t);
      return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt };
    };

    const animateZoom = (target: { s: number; x: number; y: number }, duration = 300) => {
      tweens.current.zoom?.cancel();
      const from = { ...m.zoom };
      tweens.current.zoom = tween(reducedRef.current ? 0 : duration, easeOutQuart, (p) => {
        m.zoom = {
          s: from.s + (target.s - from.s) * p,
          x: from.x + (target.x - from.x) * p,
          y: from.y + (target.y - from.y) * p,
        };
        paint();
      });
    };
    // Zoom so the point (px, py) stays under the finger or cursor
    const zoomAbout = (s: number, px: number, py: number, from = m.zoom) => {
      const { cx, cy } = center();
      const lx = (px - cx - from.x) / from.s;
      const ly = (py - cy - from.y) / from.s;
      return { s, x: px - cx - lx * s, y: py - cy - ly * s };
    };
    const settleZoom = (v = { x: 0, y: 0 }) => {
      let { s, x, y } = m.zoom;
      if (s <= 1.01) return animateZoom({ s: 1, x: 0, y: 0 });
      if (s > MAX_ZOOM) {
        const { cx, cy } = center();
        ({ s, x, y } = zoomAbout(MAX_ZOOM, cx + x, cy + y));
      }
      const b = bounds(s);
      animateZoom({ s, x: clamp(x + v.x * 220, ...b.x), y: clamp(y + v.y * 220, ...b.y) }, 420);
    };
    const toggleZoom = (px: number, py: number) => {
      if (m.zoom.s > 1.01) return animateZoom({ s: 1, x: 0, y: 0 });
      const f = fit();
      const { vw, vh } = viewport();
      // Fill the screen when that's a real step up (tall panoramas), otherwise a fixed 2.5x
      const fill = Math.max(vw / f.width, vh / f.height);
      const s = fill > 1.4 ? Math.min(fill, MAX_ZOOM) : 2.5;
      const target = zoomAbout(s, px, py, { s: 1, x: 0, y: 0 });
      const b = bounds(s);
      animateZoom({ s, x: clamp(target.x, ...b.x), y: clamp(target.y, ...b.y) });
    };
    const isOnPhoto = (x: number, y: number) => {
      const r = zoomRef.current?.getBoundingClientRect();
      return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const startPinch = () => {
      const [a, b] = [...g.pointers.values()];
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const { cx, cy } = center();
      g.pinch = {
        dist: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        s: m.zoom.s,
        lx: (mid.x - cx - m.zoom.x) / m.zoom.s,
        ly: (mid.y - cy - m.zoom.y) / m.zoom.s,
      };
      g.mode = "pinch";
    };

    const resetDrag = () => {
      stage.removeAttribute("data-dragging");
      // Spring whatever was mid-drag back into place
      if (m.trackX !== 0 && !tweens.current.track) {
        const from = m.trackX;
        tweens.current.track = tween(
          260,
          easeOut,
          (p) => {
            m.trackX = from * (1 - p);
            paint();
          },
          () => {
            tweens.current.track = undefined;
          },
        );
      }
      if (m.frame.x || m.frame.y || m.frame.sx !== 1) {
        const from = { ...m.frame };
        const backdrop = m.backdrop;
        tweens.current.frame = tween(300, easeOutQuart, (p) => {
          const s = from.sx + (1 - from.sx) * p;
          m.frame = { x: from.x * (1 - p), y: from.y * (1 - p), sx: s, sy: s, radius: null };
          m.backdrop = backdrop + (1 - backdrop) * p;
          paint();
        });
      }
    };

    const onDown = (e: PointerEvent) => {
      if (phaseRef.current === "closing" || !boxRef.current || !fittedRef.current) return;
      if ((e.target as Element).closest("button, a")) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      tweens.current.open?.finish();
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // The pointer is already gone; its moves still reach the stage
      }
      g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (g.pointers.size === 1) {
        g.type = e.pointerType;
        g.startX = e.clientX;
        g.startY = e.clientY;
        g.samples = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
        g.zoomBase = { ...m.zoom };
        tweens.current.zoom?.cancel();
        tweens.current.frame?.cancel();
        if (tweens.current.track) {
          // Caught mid-slide: land the photo it was sliding to, then keep dragging from the same
          // spot on screen, so rapid flicks step one photo each
          const dir = navDirRef.current;
          const x = m.trackX;
          tweens.current.track.cancel();
          tweens.current.track = undefined;
          if (dir) {
            navDirRef.current = 0;
            commit(indexRef.current + dir);
            m.trackX = x + dir * (viewport().vw + GAP);
            paint();
          }
          g.trackBase = m.trackX;
          g.mode = "swipe";
        } else {
          g.trackBase = 0;
          g.mode = "pending";
        }
      } else if (g.pointers.size === 2) {
        if (g.mode === "swipe" || g.mode === "dismiss") resetDrag();
        tweens.current.zoom?.cancel();
        startPinch();
      }
    };

    const onMove = (e: PointerEvent) => {
      const p = g.pointers.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (g.mode === "pinch") {
        const [a, b] = [...g.pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const { cx, cy } = center();
        const s = clamp((g.pinch.s * dist) / g.pinch.dist, 0.6, MAX_ZOOM * 1.5);
        m.zoom = { s, x: mid.x - cx - g.pinch.lx * s, y: mid.y - cy - g.pinch.ly * s };
        schedule();
        return;
      }
      if (g.pointers.size !== 1 || g.mode === "idle") return;

      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;
      g.samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
      while (g.samples.length > 2 && e.timeStamp - g.samples[0].t > 100) g.samples.shift();

      if (g.mode === "pending") {
        if (Math.hypot(dx, dy) < (g.type === "mouse" ? 4 : 8)) return;
        if (m.zoom.s > 1.01) g.mode = "pan";
        else if (Math.abs(dx) > Math.abs(dy)) g.mode = "swipe";
        else {
          g.mode = "dismiss";
          if (!hiddenThumbRef.current) hideThumb(indexRef.current);
        }
        if (g.tapTimer) clearTimeout(g.tapTimer);
        stage.setAttribute("data-dragging", "");
      }

      const { vw, vh } = viewport();
      if (g.mode === "swipe") {
        const i = indexRef.current;
        // Only one neighbour is mounted each side, so never drag past it
        let x = clamp(g.trackBase + dx, -(vw + GAP), vw + GAP);
        if ((x > 0 && i === 0) || (x < 0 && i === images.length - 1)) x = rubber(x, vw);
        m.trackX = x;
      } else if (g.mode === "dismiss") {
        const progress = Math.min(1, Math.abs(dy) / vh);
        const s = 1 - progress * 0.35;
        m.frame = { x: dx, y: dy, sx: s, sy: s, radius: frameRadiusRef.current + 12 * progress };
        m.backdrop = 1 - Math.min(1, Math.abs(dy) / (vh * 0.45));
      } else if (g.mode === "pan") {
        const b = bounds(m.zoom.s);
        m.zoom = {
          ...m.zoom,
          x: rubberClamp(g.zoomBase.x + dx, b.x, vw),
          y: rubberClamp(g.zoomBase.y + dy, b.y, vh),
        };
      }
      schedule();
    };

    const onTap = (e: PointerEvent) => {
      const now = e.timeStamp;
      const { clientX: x, clientY: y } = e;
      const last = g.lastTap;
      if (now - last.t < DOUBLE_TAP_MS && Math.hypot(x - last.x, y - last.y) < 32) {
        if (g.tapTimer) clearTimeout(g.tapTimer);
        g.lastTap = { t: 0, x: 0, y: 0 };
        toggleZoom(x, y);
        return;
      }
      g.lastTap = { t: now, x, y };
      if (g.type === "mouse") {
        // Desktop: a click beside the photo closes; clicks on it wait for a possible double-click
        if (!isOnPhoto(x, y) && m.zoom.s <= 1.01) close();
        return;
      }
      // Touch: a single tap shows or hides the controls, like a native photo viewer
      g.tapTimer = setTimeout(() => setChromeHidden((h) => !h), DOUBLE_TAP_MS);
    };

    const onUp = (e: PointerEvent) => {
      if (!g.pointers.has(e.pointerId)) return;
      g.pointers.delete(e.pointerId);
      const cancelled = e.type === "pointercancel";

      if (g.mode === "pinch") {
        if (g.pointers.size === 1) {
          // One finger lifted: carry on panning with the other
          const [p] = [...g.pointers.values()];
          g.mode = "pan";
          g.startX = p.x;
          g.startY = p.y;
          g.zoomBase = { ...m.zoom };
          g.samples = [];
        } else if (g.pointers.size === 0) {
          g.mode = "idle";
          settleZoom();
        }
        return;
      }
      if (g.pointers.size > 0) return;

      const mode = g.mode;
      g.mode = "idle";
      stage.removeAttribute("data-dragging");
      const v = velocity(e.timeStamp);
      const { vw, vh } = viewport();

      if (mode === "pending") {
        if (!cancelled) onTap(e);
      } else if (mode === "swipe") {
        const x = m.trackX;
        const dx = e.clientX - g.startX;
        // A flick in the direction this gesture moved wins; otherwise how far the strip is out
        let dir = 0;
        if (Math.abs(v.x) > 0.25 && Math.abs(dx) > 16 && Math.sign(v.x) === Math.sign(dx))
          dir = v.x < 0 ? 1 : -1;
        else if (Math.abs(x) > vw * 0.3) dir = x < 0 ? 1 : -1;
        const target = indexRef.current + dir;
        if (!cancelled && dir !== 0 && target >= 0 && target < images.length)
          go(dir as 1 | -1, v.x);
        else resetDrag();
      } else if (mode === "dismiss") {
        const dy = m.frame.y;
        const flick = Math.abs(v.y) > 0.45 && Math.sign(v.y) === Math.sign(dy);
        if (!cancelled && (Math.abs(dy) > vh * 0.16 || flick)) close();
        else resetDrag();
      } else if (mode === "pan") {
        settleZoom(cancelled ? undefined : v);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (phaseRef.current !== "open") return;
      if (e.ctrlKey) {
        // Trackpad pinch (and ctrl + wheel) zooms around the cursor
        tweens.current.zoom?.cancel();
        const s = clamp(m.zoom.s * Math.exp(-e.deltaY * 0.01), 1, MAX_ZOOM);
        const next = s <= 1.001 ? { s: 1, x: 0, y: 0 } : zoomAbout(s, e.clientX, e.clientY);
        const b = bounds(next.s);
        m.zoom = { s: next.s, x: clamp(next.x, ...b.x), y: clamp(next.y, ...b.y) };
        schedule();
        return;
      }
      if (m.zoom.s > 1.01) {
        const b = bounds(m.zoom.s);
        m.zoom = {
          ...m.zoom,
          x: clamp(m.zoom.x - e.deltaX, ...b.x),
          y: clamp(m.zoom.y - e.deltaY, ...b.y),
        };
        schedule();
        return;
      }
      // Two-finger horizontal swipe on a trackpad: one photo per gesture, including its inertia
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        g.wheelAcc += e.deltaX;
        if (!g.wheelLocked && Math.abs(g.wheelAcc) > 60) {
          g.wheelLocked = true;
          go(g.wheelAcc > 0 ? 1 : -1);
        }
      }
      if (g.wheelTimer) clearTimeout(g.wheelTimer);
      g.wheelTimer = setTimeout(() => {
        g.wheelAcc = 0;
        g.wheelLocked = false;
      }, 180);
    };

    // Switching tabs or apps mid-gesture never delivers pointerup; put everything back
    const onHidden = () => {
      if (document.visibilityState !== "hidden" || g.mode === "idle") return;
      g.pointers.clear();
      g.mode = "idle";
      resetDrag();
      settleZoom();
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onHidden);
      if (g.tapTimer) clearTimeout(g.tapTimer);
      if (g.wheelTimer) clearTimeout(g.wheelTimer);
    };
  }, [close, commit, go, hideThumb, images.length, paint, schedule]);

  // Repaint after React moves slides around (photo change, resize)
  // biome-ignore lint/correctness/useExhaustiveDependencies: index and box move the slides
  useLayoutEffect(() => {
    paint();
  }, [index, box, paint]);

  // Stop any running animation if the viewer unmounts mid-flight
  useEffect(() => {
    const running = tweens.current;
    return () => {
      for (const t of Object.values(running)) t?.cancel();
      cancelAnimationFrame(frameRaf.current);
      setThumbHidden(hiddenThumbRef.current, false);
    };
  }, []);

  const onDimensions = useCallback((img: ViewerImage, width: number, height: number) => {
    if (img.width && img.height) return;
    setMeasured((prev) => (prev[img.src] ? prev : { ...prev, [img.src]: { width, height } }));
  }, []);

  const placeholderFor = (i: number) =>
    getThumbnail(i)?.querySelector("img")?.currentSrc || undefined;
  const meta = [`${index + 1} / ${total}`, image?.year].filter(Boolean).join(" · ");

  return createPortal(
    <>
      <ScrollLock enabled allowScrollInElement={stageRef} />
      <FocusTrap active restoreFocus={false} containerRef={stageRef} className={styles.stage}>
        {/* biome-ignore lint/a11y/useSemanticElements: <dialog> brings its own top layer and focus handling, which would fight FocusTrap and the open animation */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={text.dialog}
          aria-describedby={statusId}
          className={styles.dialog}
          data-chrome={chromeHidden ? "hidden" : undefined}
        >
          <div ref={backdropRef} className={styles.backdrop} />
          <div ref={fitRef} className={styles.fit} aria-hidden />

          <div ref={trackRef} className={styles.track}>
            {box &&
              [-1, 0, 1].map((offset) => {
                const i = index + offset;
                const img = images[i];
                if (!img) return null;
                const dims = dimsOf(img);
                const rect = fitInto(dims.width, dims.height, box);
                return (
                  <div
                    key={img.src}
                    className={styles.slide}
                    style={{ transform: `translate3d(calc(${offset} * (100% + ${GAP}px)),0,0)` }}
                    aria-hidden={offset !== 0}
                  >
                    <div
                      ref={offset === 0 ? zoomRef : undefined}
                      className={styles.zoom}
                      style={{
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height,
                      }}
                    >
                      <div ref={offset === 0 ? frameRef : undefined} className={styles.frame}>
                        <Photo
                          image={img}
                          sizes={sizesFor(rect, box)}
                          current={offset === 0}
                          optimize={optimizeImages}
                          placeholder={placeholderFor(i)}
                          errorLabel={text.error}
                          retryLabel={text.retry}
                          onDimensions={(w, h) => onDimensions(img, w, h)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Floating pills like the header's menu, with its corners (data-border, as on the header) */}
          <Row position="absolute" className={styles.top} data-border="rounded">
            <Row background="page" border="neutral-alpha-weak" radius="m-4" shadow="l" padding="4">
              <IconButton
                icon="close"
                variant="tertiary"
                aria-label={text.close}
                onClick={() => close()}
              />
            </Row>
          </Row>

          <Row position="absolute" className={styles.bottom} data-border="rounded">
            <Row
              background="page"
              border="neutral-alpha-weak"
              radius="m-4"
              shadow="l"
              padding="4"
              gap="4"
              vertical="center"
              style={{ maxWidth: "100%" }}
            >
              {total > 1 && (
                <IconButton
                  ref={prevButtonRef}
                  icon="chevronLeft"
                  variant="tertiary"
                  aria-label={text.previous}
                  disabled={index === 0}
                  onClick={() => go(-1)}
                />
              )}
              <Column paddingX="8" horizontal="center" align="center" className={styles.caption}>
                {image?.title && (
                  <Text textVariant="label-strong-s" onBackground="neutral-strong" truncate>
                    {image.title}
                  </Text>
                )}
                <Text
                  textVariant="label-default-xs"
                  onBackground="neutral-weak"
                  truncate
                  className={styles.meta}
                >
                  {meta}
                </Text>
              </Column>
              {total > 1 && (
                <IconButton
                  ref={nextButtonRef}
                  icon="chevronRight"
                  variant="tertiary"
                  aria-label={text.next}
                  disabled={index === total - 1}
                  onClick={() => go(1)}
                />
              )}
            </Row>
          </Row>

          <VisuallyHidden as="div" id={statusId} aria-live="polite">
            {image &&
              `${text.counter(index + 1, total)}${image.title ? `: ${image.title}` : ""}. ${image.alt}`}
          </VisuallyHidden>
        </div>
      </FocusTrap>
    </>,
    document.body,
  );
}

"use client";

import { Row } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ReadingProgress.module.scss";
import { articleProgress, getPostBody } from "./articleScroll";

// Thin bar along the top edge that fills as the article is read. The width is written straight
// to the DOM once per frame, so scrolling never re-renders React.
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  // Portaled to <body>: inside <main> (its own stacking context) the header would paint over it
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const body = getPostBody();
    const bar = barRef.current;
    if (!mounted || !body || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      bar.style.transform = `scaleX(${articleProgress(body)})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Images and embeds loading in change the article height
    const observer = new ResizeObserver(schedule);
    observer.observe(body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <Row
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="2"
      zIndex={10}
      pointerEvents="none"
      aria-hidden="true"
    >
      <Row ref={barRef} fill solid="brand-strong" className={styles.bar} />
    </Row>,
    document.body,
  );
}

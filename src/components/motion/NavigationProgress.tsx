"use client";

import { Row } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./NavigationProgress.module.scss";

// Only navigations slower than this get a bar. Prefetched pages swap in before it would show.
const SHOW_AFTER = 150;
// A click that never turns into a navigation must not leave the bar up.
const GIVE_UP_AFTER = 10000;
const START_EVENT = "navigation-progress:start";

/** For code that navigates with `router.push` instead of a link click. */
export function startNavigationProgress() {
  window.dispatchEvent(new Event(START_EVENT));
}

// A plain left click on a link to another page of this site.
function isPageLinkClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  const anchor = (event.target as Element | null)?.closest?.("a");
  if (!anchor?.href || anchor.hasAttribute("download")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  const url = new URL(anchor.href, window.location.href);
  // Hash and query changes stay on the same page.
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}

type Phase = "idle" | "loading" | "done";

/** Thin brand bar at the top of the window while a page loads. Turn it off with features.navigationProgress. */
export function NavigationProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const pending = useRef(false);
  const timers = useRef<number[]>([]);

  const show = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearTimers = () => {
    for (const timer of timers.current) window.clearTimeout(timer);
    timers.current = [];
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: binds once; the helpers only touch refs and state setters
  useEffect(() => {
    const start = () => {
      clearTimers();
      pending.current = true;
      timers.current.push(
        window.setTimeout(() => show("loading"), SHOW_AFTER),
        window.setTimeout(() => {
          pending.current = false;
          show("idle");
        }, GIVE_UP_AFTER),
      );
    };
    // Capture phase, so it runs before the link's own handler takes over the click.
    const onClick = (event: MouseEvent) => {
      if (isPageLinkClick(event)) start();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START_EVENT, start);
      clearTimers();
    };
  }, []);

  // The new page is in: finish the bar if it was showing, otherwise just disarm it.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on page changes only
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    clearTimers();
    if (phaseRef.current !== "loading") {
      show("idle");
      return;
    }
    show("done");
    timers.current.push(window.setTimeout(() => show("idle"), 400));
  }, [pathname]);

  if (phase === "idle") return null;

  return (
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
      <Row fill solid="brand-strong" className={phase === "done" ? styles.done : styles.loading} />
    </Row>
  );
}

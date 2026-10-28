"use client";

import { features } from "@/resources";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function targetFromHash(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // A malformed escape: look the raw id up instead.
  }
  return document.getElementById(id);
}

// A brief tint on the element a #link landed on, so the reader sees where they are. With
// reduced motion it shows and goes without fading.
const flashStarts = new WeakMap<HTMLElement, number>();
function flash(element: HTMLElement, restart = false) {
  if (!(features.hashHighlight ?? true)) return;
  // A plain #link fires both click and hashchange: don't restart for the same jump.
  const now = performance.now();
  if (!restart && now - (flashStarts.get(element) ?? Number.NEGATIVE_INFINITY) < 300) return;
  flashStarts.set(element, now);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on = {
    backgroundColor: "var(--brand-alpha-medium)",
    boxShadow: "0 0 0 var(--static-space-4) var(--brand-alpha-medium)",
    borderRadius: "var(--radius-xs)",
  };
  const off = {
    backgroundColor: "transparent",
    boxShadow: "0 0 0 var(--static-space-4) transparent",
    borderRadius: "var(--radius-xs)",
  };
  for (const animation of element.getAnimations?.() ?? []) {
    if (animation.id === "hash-flash") animation.cancel();
  }
  element.animate?.([on, { ...on, offset: 0.35 }, off], {
    id: "hash-flash",
    duration: reduce ? 1600 : 2000,
    easing: reduce ? "steps(1, end)" : "ease-out",
  });
}

// The element sits where its scroll-margin puts it, or the page can't scroll any further.
function isAligned(element: HTMLElement): boolean {
  const margin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const offset = element.getBoundingClientRect().top - margin;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
  return Math.abs(offset) < 2 || (offset > 0 && atBottom);
}

export function ScrollToHash() {
  const pathname = usePathname();

  // Arriving on a page with a #hash, on first load or through client navigation. Jump straight
  // to the target instead of animating through the whole page, then keep it in place while the
  // content above it, web fonts and images settle, until the reader scrolls on their own.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs again on every client navigation
  useEffect(() => {
    // Lets in-page jumps animate again once the page has loaded (see the :has rule below).
    const markReady = () => document.documentElement.setAttribute("data-hash-ready", "");

    const target = targetFromHash(window.location.hash);
    if (!target) {
      markReady();
      return;
    }

    let userScrolled = false;
    const stop = () => {
      userScrolled = true;
    };
    const align = () => {
      if (userScrolled || !target.isConnected || isAligned(target)) return;
      target.scrollIntoView({ block: "start", behavior: "instant" });
      // Content that grew above the target pushed it away; play the highlight where it landed.
      flash(target, true);
    };

    align();
    flash(target);

    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const type of events) window.addEventListener(type, stop, { passive: true });
    // Re-align whenever the page's layout changes, for a few seconds.
    const resize = new ResizeObserver(align);
    resize.observe(document.body);
    const watch = setTimeout(() => resize.disconnect(), 3000);
    window.addEventListener("load", align);
    document.fonts?.ready.then(align);
    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady);

    return () => {
      for (const type of events) window.removeEventListener(type, stop);
      window.removeEventListener("load", align);
      window.removeEventListener("load", markReady);
      resize.disconnect();
      clearTimeout(watch);
      userScrolled = true;
    };
  }, [pathname]);

  // In-page jumps: the table of contents, heading links and links inside posts. The scroll is
  // left to the browser; this adds the highlight once the scroll has come to rest.
  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let pending: HTMLElement | null = null;

    const finish = () => {
      window.removeEventListener("scroll", onScroll);
      if (pending) flash(pending);
      pending = null;
    };
    function onScroll() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(finish, 120);
    }
    const flashWhenSettled = (target: HTMLElement) => {
      pending = target;
      clearTimeout(settleTimer);
      window.addEventListener("scroll", onScroll, { passive: true });
      settleTimer = setTimeout(finish, 200);
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
        return;
      }
      const target = targetFromHash(url.hash);
      if (target) flashWhenSettled(target);
    };
    const onHashChange = () => {
      const target = targetFromHash(window.location.hash);
      if (target && target !== pending) flashWhenSettled(target);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer);
    };
  }, []);

  // Until the page has loaded, the browser's own jump to the #hash target lands instantly
  // instead of smooth-scrolling through the whole post.
  return <style>{"html:not([data-hash-ready]):has(:target){scroll-behavior:auto}"}</style>;
}

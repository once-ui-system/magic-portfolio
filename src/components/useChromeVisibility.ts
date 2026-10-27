"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Hides the floating header while the visitor scrolls down and brings it back on scroll up.
// The state lives on <html data-chrome-hidden="true|false">, so anything fixed on screen (the
// header, its fades, the back-to-top button) follows it from CSS alone, without re-rendering.

// Pixels scrolled in one direction before the header reacts, so small jitters don't flicker it.
const THRESHOLD = 10;
// Always shown this close to the top, and at the very bottom of the page.
const TOP_ZONE = 80;
const BOTTOM_ZONE = 4;

// Only real overlays keep the header on screen, not disclosures such as an open Accordion.
// Matches what Once UI renders: Dialog, Drawer, Kbar and DateInput panels are modal dialogs;
// Dropdown, Select and Kbar triggers carry aria-haspopup with aria-expanded while open, and an
// open Dropdown panel is a "dropdown-portal"; an enlarged Media is the zoom-out button.
const OVERLAY_SELECTOR = [
  '[aria-modal="true"]',
  '[role="dialog"]',
  '[aria-haspopup]:not([aria-haspopup="false"])[aria-expanded="true"]',
  '[data-role="dropdown-portal"]',
  '[aria-expanded="true"].cursor-zoom-out',
].join(", ");

const overlayOpen = () => document.querySelector(OVERLAY_SELECTOR) !== null;

// Keyboard focus inside the header keeps it on screen. Mouse focus does not.
const headerHasKeyboardFocus = () => {
  const element = document.activeElement;
  if (!(element instanceof HTMLElement) || !element.closest("header")) return false;
  try {
    return element.matches(":focus-visible");
  } catch {
    return false;
  }
};

/** Listens to scroll while `enabled`. The header shows again on every page change. */
export function useChromeVisibility(enabled: boolean) {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-runs on every page, so a new page starts with the header shown
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    let hidden = false;
    let lastY = window.scrollY;
    let travelled = 0;
    let frame = 0;

    const setHidden = (next: boolean) => {
      if (next === hidden) return;
      hidden = next;
      root.setAttribute("data-chrome-hidden", String(next));
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;

      // Rubber-band overscroll on iOS and Android reports positions past the edges.
      if (y < 0 || y > max + 1) return;

      const delta = y - lastY;
      lastY = y;

      if (y < TOP_ZONE || y >= max - BOTTOM_ZONE || max <= TOP_ZONE || overlayOpen()) {
        travelled = 0;
        setHidden(false);
        return;
      }

      if (delta === 0) return;
      // Start counting again when the direction flips.
      if (Math.sign(delta) !== Math.sign(travelled)) travelled = 0;
      travelled += delta;

      if (travelled > THRESHOLD) {
        if (!headerHasKeyboardFocus()) setHidden(true);
        travelled = 0;
      } else if (travelled < -THRESHOLD) {
        setHidden(false);
        travelled = 0;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Tabbing into the header, or into a dialog, brings the header back.
    const onFocusIn = () => {
      if (headerHasKeyboardFocus() || overlayOpen()) setHidden(false);
    };

    root.setAttribute("data-chrome-hidden", "false");
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-chrome-hidden");
    };
  }, [enabled, pathname]);
}

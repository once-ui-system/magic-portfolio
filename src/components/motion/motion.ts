// Shared checks for the navigation progress bar and the page fade.

let hydrated = false;

/** Called once the first page has rendered in the browser. */
export function markHydrated() {
  hydrated = true;
}

/** False on the first page load, true for every client-side navigation after it. */
export function isClientNavigation() {
  return hydrated;
}

/**
 * The page fade is a large ("macro") transition. It runs when `style.transition` is "all" or
 * "macro" (the theme script writes it to <html data-transition>), and never when the visitor
 * prefers reduced motion.
 */
export function pageFadeAllowed() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const transition = document.documentElement.getAttribute("data-transition") ?? "all";
  return transition === "all" || transition === "macro";
}

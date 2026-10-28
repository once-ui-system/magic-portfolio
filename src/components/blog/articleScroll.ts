// Shared by the reading features (progress bar, resume reading, quote sharing) so they agree on
// what "the article" is: the element marked with data-post-body on blog posts and project pages.
// Progress is 0 at the top of the page and 1 once the last line of the article reaches the bottom
// of the viewport. Share buttons and related posts below the article don't count.

export const POST_BODY_ATTR = "data-post-body";

export function getPostBody() {
  return document.querySelector<HTMLElement>(`[${POST_BODY_ATTR}]`);
}

// Scroll offset at which the article is fully read
export function articleEnd(body: HTMLElement) {
  const bottom = body.getBoundingClientRect().bottom + window.scrollY;
  return Math.max(1, bottom - window.innerHeight);
}

export function articleProgress(body: HTMLElement) {
  return Math.min(1, Math.max(0, window.scrollY / articleEnd(body)));
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

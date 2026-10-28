"use client";

import { type ReactNode, useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Keeps its children from the server HTML while the page hydrates, and never creates them in the
 * browser. For inline scripts that must run before the first paint: when Next serves a page that
 * calls `notFound()`, the browser renders the whole layout itself, and React can't run a script it
 * creates (it warns "Encountered a script tag" instead).
 */
export function ServerRendered({ children }: { children: ReactNode }) {
  const fromServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );
  return fromServer ? children : null;
}

"use client";

type Props = Record<string, any> | undefined;

export function track(event: string, properties?: Props) {
  if (typeof window === "undefined") return;
  const anyWin = window as any;
  if (anyWin.posthog && typeof anyWin.posthog.capture === "function") {
    anyWin.posthog.capture(event, properties || {});
  }
}

export function identify(id: string, properties?: Props) {
  if (typeof window === "undefined") return;
  const anyWin = window as any;
  if (anyWin.posthog && typeof anyWin.posthog.identify === "function") {
    anyWin.posthog.identify(id, properties || {});
  }
}


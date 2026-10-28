"use client";

import { Flex } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { isClientNavigation, markHydrated, pageFadeAllowed } from "./motion";

/**
 * A short opacity fade on the page content after each client-side navigation. Turn it off with
 * features.routeTransition.
 *
 * Opacity only: a transform would make this the containing block of every `position: fixed`
 * element a page renders, and they would jump. The first page load never fades, so the largest
 * element paints straight away.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [clientNav] = useState(isClientNavigation);
  // The path this instance has shown. On the first page load that is the current one.
  const shownPath = useRef<string | null>(clientNav ? null : pathname);

  useLayoutEffect(() => {
    markHydrated();
    const element = ref.current;
    // A guard rather than a cleanup: Strict Mode runs this twice and must not replay the fade.
    if (!element || shownPath.current === pathname) return;
    shownPath.current = pathname;
    if (!pageFadeAllowed()) return;
    element.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 240,
      easing: "cubic-bezier(0.2, 0, 0, 1)",
    });
  }, [pathname]);

  // Lays out like the layout's content row it sits in, so pages look exactly as before.
  return (
    <Flex ref={ref} fillWidth minHeight="0" horizontal="center">
      {children}
    </Flex>
  );
}

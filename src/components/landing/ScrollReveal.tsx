"use client";

import { Flex } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = React.ComponentProps<typeof Flex> & {
  translateY?: number;
  speed?: "fast" | "medium" | "slow";
  delay?: number;
};

const SPEED_MS: Record<NonNullable<ScrollRevealProps["speed"]>, number> = {
  fast: 500,
  medium: 800,
  slow: 1100,
};

// RevealFx only animates once on mount (its `trigger` prop still fires the
// mount timer regardless), so it can't do a true reveal-on-scroll. This
// mirrors its blur + translateY look but gates the reveal on the element
// actually entering the viewport, via IntersectionObserver.
export const ScrollReveal = ({
  children,
  translateY = 8,
  speed = "medium",
  delay = 0,
  style,
  className,
  ...rest
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Flex
      ref={ref}
      fillWidth
      style={{
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${SPEED_MS[speed]}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: `${delay}s`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : `translateY(${translateY}px)`,
        filter: revealed ? "blur(0)" : "blur(6px)",
        ...style,
      }}
      className={className}
      {...rest}
    >
      {children}
    </Flex>
  );
};

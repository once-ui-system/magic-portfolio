"use client";

import React, { forwardRef, ReactNode } from "react";
import styles from "./Fade.module.scss";

import { Flex } from ".";
import { ColorScheme, ColorWeight, SpacingToken } from "../types";

type BaseColor =
  | `${ColorScheme}-${ColorWeight}`
  | `${ColorScheme}-alpha-${ColorWeight}`
  | "surface"
  | "overlay"
  | "page";

interface FadeProps extends React.ComponentProps<typeof Flex> {
  className?: string;
  to?: "bottom" | "top" | "left" | "right";
  base?: BaseColor;
  blur?: number;
  pattern?: {
    display?: boolean;
    size?: SpacingToken;
  };
  style?: React.CSSProperties;
  children?: ReactNode;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(
  (
    {
      to = "bottom",
      base = "page",
      pattern = {
        display: false,
        size: "4",
      },
      blur = 0.5,
      children,
      ...rest
    },
    ref,
  ) => {
    const getBaseVar = (base: BaseColor) => {
      if (base === "page") return "var(--page-background)";
      if (base === "surface") return "var(--surface-background)";
      if (base === "overlay") return "var(--backdrop)";

      const [scheme, weight] = base.includes("alpha") ? base.split("-alpha-") : base.split("-");

      return base.includes("alpha")
        ? `var(--${scheme}-alpha-${weight})`
        : `var(--${scheme}-background-${weight})`;
    };

    return (
      <Flex
        ref={ref}
        fillWidth
        style={
          {
            "--base-color": getBaseVar(base),
            "--gradient-direction":
              to === "top"
                ? "0deg"
                : to === "right"
                  ? "90deg"
                  : to === "bottom"
                    ? "180deg"
                    : "270deg",
            ...(pattern.display && {
              backgroundImage: `linear-gradient(var(--gradient-direction), var(--base-color), transparent), radial-gradient(transparent 1px, var(--base-color) 1px)`,
              backgroundSize: `100% 100%, var(--static-space-${pattern.size}) var(--static-space-${pattern.size})`,
              backdropFilter: `blur(${blur}rem)`,
            }),
          } as React.CSSProperties
        }
        className={styles.mask}
        {...rest}
      >
        {children}
      </Flex>
    );
  },
);

Fade.displayName = "Fade";
export { Fade };

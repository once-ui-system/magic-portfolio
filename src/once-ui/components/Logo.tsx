"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./Logo.module.scss";
import { SpacingToken } from "../types";
import { Flex } from ".";

const sizeMap: Record<string, SpacingToken> = {
  xs: "20",
  s: "24",
  m: "32",
  l: "40",
  xl: "48",
};

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  style?: React.CSSProperties;
  wordmark?: boolean;
  icon?: boolean;
  iconSrc?: string;
  wordmarkSrc?: string;
  href?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "m",
  wordmark = true,
  icon = true,
  href,
  iconSrc,
  wordmarkSrc,
  className,
  style,
  ...props
}) => {
  useEffect(() => {
    if (!icon && !wordmark) {
      console.warn(
        "Both 'icon' and 'wordmark' props are set to false. The logo will not render any content.",
      );
    }
  }, [icon, wordmark]);

  const content = (
    <>
      {icon && !iconSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className={styles.icon}
        />
      )}
      {iconSrc && (
        <img
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
            width: "auto",
          }}
          alt="Trademark"
          src={iconSrc}
        />
      )}
      {wordmark && !wordmarkSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className={styles.type}
        />
      )}
      {wordmarkSrc && (
        <img
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
            width: "auto",
          }}
          alt="Trademark"
          src={wordmarkSrc}
        />
      )}
    </>
  );

  return href ? (
    <Link
      className={classNames("radius-l", "display-flex", "fit-height", className)}
      style={style}
      href={href}
      aria-label="Trademark"
      {...props}
    >
      {content}
    </Link>
  ) : (
    <Flex
      className={classNames(className)}
      radius="l"
      fitHeight
      style={style}
      aria-label="Trademark"
    >
      {content}
    </Flex>
  );
};

Logo.displayName = "Logo";
export { Logo };

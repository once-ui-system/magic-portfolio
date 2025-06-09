"use client";

import React from "react";
import { Heading, Flex, IconButton, useToast } from "@once-ui-system/core";

import styles from "@/components/HeadingLink.module.scss";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, style }) => {
  const { addToast } = useToast();

  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        addToast({
          variant: "success",
          message: "Link copied to clipboard.",
        });
      },
      () => {
        addToast({
          variant: "danger",
          message: "Failed to copy link.",
        });
      },
    );
  };

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level];
  const asTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Flex
      style={style}
      onClick={() => copyURL(id)}
      className={styles.control}
      vertical="center"
      gap="4"
    >
      <Heading className={styles.text} id={id} variant={variant} as={asTag}>
        {children}
      </Heading>
      <IconButton
        className={styles.visibility}
        size="s"
        icon="openLink"
        variant="ghost"
        tooltip="Copy"
        tooltipPosition="right"
      />
    </Flex>
  );
};

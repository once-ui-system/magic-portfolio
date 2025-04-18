"use client";

import React, { forwardRef } from "react";

import { Skeleton, Icon, Text, StatusIndicator, Flex, SmartImage } from ".";
import styles from "./Avatar.module.scss";

interface AvatarProps extends React.ComponentProps<typeof Flex> {
  size?: "xs" | "s" | "m" | "l" | "xl" | number;
  value?: string;
  src?: string;
  loading?: boolean;
  empty?: boolean;
  statusIndicator?: {
    color: "green" | "yellow" | "red" | "gray";
  };
  style?: React.CSSProperties;
  className?: string;
}

const sizeMapping: Record<"xs" | "s" | "m" | "l" | "xl", number> = {
  xs: 20,
  s: 24,
  m: 32,
  l: 48,
  xl: 160,
};

const statusIndicatorSizeMapping: Record<"xs" | "s" | "m" | "l" | "xl", "s" | "m" | "l"> = {
  xs: "s",
  s: "s",
  m: "m",
  l: "m",
  xl: "l",
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { size = "m", value, src, loading, empty, statusIndicator, className, style = {}, ...rest },
    ref,
  ) => {
    const sizeInRem = typeof size === "number" ? `${size}rem` : undefined;
    const sizeStyle = sizeInRem
      ? {
          width: sizeInRem,
          height: sizeInRem,
          minWidth: sizeInRem,
          minHeight: sizeInRem,
          ...style,
        }
      : style;
    const isEmpty = empty || (!src && !value);

    if (value && src) {
      throw new Error("Avatar cannot have both 'value' and 'src' props.");
    }

    if (loading) {
      return (
        <Skeleton
          {...rest}
          border="neutral-medium"
          shape="circle"
          width={typeof size === "number" ? "m" : size}
          height={typeof size === "number" ? "m" : size}
          className={`${styles.avatar} ${className}`}
          aria-busy="true"
          aria-label="Loading avatar"
        />
      );
    }

    const renderContent = () => {
      if (isEmpty) {
        return (
          <Icon
            onBackground="neutral-medium"
            name="person"
            size="m"
            style={typeof size === "number" ? { fontSize: `${size}rem` } : undefined}
            className={styles.icon}
            aria-label="Empty avatar"
          />
        );
      }

      if (src) {
        return (
          <SmartImage
            radius="full"
            src={src}
            fill
            alt="Avatar"
            sizes={typeof size === "string" ? `${sizeMapping[size]}px` : `${size * 16}px`}
            className={styles.image}
          />
        );
      }

      if (value) {
        return (
          <Text
            as="span"
            onBackground="neutral-weak"
            variant={`body-default-${typeof size === "string" ? size : "m"}`}
            className={styles.value}
            aria-label={`Avatar with initials ${value}`}
          >
            {value}
          </Text>
        );
      }

      return null;
    };

    return (
      <Flex
        ref={ref}
        role="img"
        horizontal="center"
        vertical="center"
        radius="full"
        border="neutral-strong"
        background="surface"
        style={sizeStyle}
        className={`${styles.avatar} ${typeof size === "string" ? styles[size] : ""} ${className || ""}`}
        {...rest}
      >
        {renderContent()}
        {statusIndicator && (
          <StatusIndicator
            position="absolute"
            size={typeof size === "string" ? statusIndicatorSizeMapping[size] : "l"}
            color={statusIndicator.color}
            className={`${styles.className || ""} ${styles.indicator} ${size === "xl" || (typeof size === "number" && size >= 10) ? styles.position : ""}`}
            aria-label={`Status: ${statusIndicator.color}`}
          />
        )}
      </Flex>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps };

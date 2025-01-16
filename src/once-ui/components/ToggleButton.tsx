"use client";

import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { ElementType } from "./ElementType";
import { Flex, Icon } from ".";
import styles from "./ToggleButton.module.scss";

interface CommonProps {
  label?: ReactNode;
  selected: boolean;
  variant?: "ghost" | "outline";
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  fillWidth?: boolean;
  weight?: "default" | "strong";
  truncate?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  href?: string;
}

export type ToggleButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleButton = forwardRef<HTMLElement, ToggleButtonProps>(
  (
    {
      label,
      selected,
      variant = "ghost",
      size = "m",
      radius,
      justifyContent = "center",
      fillWidth = false,
      weight = "default",
      truncate = false,
      prefixIcon,
      suffixIcon,
      className,
      style,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    return (
      <ElementType
        ref={ref}
        href={href}
        className={classNames(
          styles.button,
          styles[variant],
          styles[size],
          selected && styles.selected,
          radius === "none"
            ? "radius-none"
            : radius
              ? `radius-${size}-${radius}`
              : `radius-${size}`,
          "text-decoration-none",
          "button",
          "cursor-interactive",
          {
            ["fill-width"]: fillWidth,
            ["fit-width"]: !fillWidth,
            ["justify-" + justifyContent]: justifyContent,
          },
          className,
        )}
        style={style}
        {...props}
      >
        {prefixIcon && <Icon name={prefixIcon} size={size === "l" ? "m" : "s"} />}
        {(label || children) && (
          <Flex
            padding={size === "s" ? "2" : "4"}
            textWeight={weight}
            textSize={size === "l" ? "m" : "s"}
            className="font-label"
          >
            {label || children}
          </Flex>
        )}
        {suffixIcon && <Icon name={suffixIcon} size={size === "l" ? "m" : "s"} />}
      </ElementType>
    );
  },
);

ToggleButton.displayName = "ToggleButton";
export { ToggleButton };

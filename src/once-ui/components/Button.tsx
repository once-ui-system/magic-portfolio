"use client";

import React, { ReactNode, forwardRef } from "react";
import { ElementType } from "./ElementType";
import classNames from "classnames";

import { Spinner, Icon, Arrow, Flex } from ".";
import styles from "./Button.module.scss";

interface CommonProps {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
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
  label?: string;
  weight?: "default" | "strong";
  prefixIcon?: string;
  suffixIcon?: string;
  loading?: boolean;
  fillWidth?: boolean;
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  children?: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  arrowIcon?: boolean;
}

export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(
  (
    {
      variant = "primary",
      size = "m",
      radius,
      label,
      weight = "strong",
      children,
      prefixIcon,
      suffixIcon,
      loading = false,
      fillWidth = false,
      justifyContent = "center",
      href,
      id,
      arrowIcon = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === "l" ? "s" : size === "m" ? "s" : "xs";
    const radiusSize = size === "s" || size === "m" ? "m" : "l";

    return (
      <ElementType
        id={id}
        href={href}
        ref={ref}
        className={classNames(
          styles.button,
          styles[variant],
          styles[size],
          radius === "none"
            ? "radius-none"
            : radius
              ? `radius-${radiusSize}-${radius}`
              : `radius-${radiusSize}`,
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
        {prefixIcon && !loading && <Icon name={prefixIcon} size={iconSize} />}
        {loading && <Spinner size={size} />}
        {(label || children) && (
          <Flex
            paddingX="4"
            paddingY="0"
            textWeight={weight}
            textSize={size}
            className="font-label"
          >
            {label || children}
          </Flex>
        )}
        {arrowIcon && (
          <Arrow
            style={{
              marginLeft: "calc(-1 * var(--static-space-4))",
            }}
            trigger={"#" + id}
            scale={size === "s" ? 0.8 : size === "m" ? 0.9 : 1}
            color={variant === "primary" ? "onSolid" : "onBackground"}
          />
        )}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </ElementType>
    );
  },
);

Button.displayName = "Button";
export { Button };

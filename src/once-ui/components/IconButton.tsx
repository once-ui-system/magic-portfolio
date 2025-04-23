"use client";

import React, { forwardRef, useState, useEffect, ReactNode } from "react";
import { ElementType } from "./ElementType";
import { Flex, Icon, Tooltip } from ".";
import buttonStyles from "./Button.module.scss";
import iconStyles from "./IconButton.module.scss";
import classNames from "classnames";
import { IconName } from "../icons";

interface CommonProps {
  icon?: IconName;
  id?: string;
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
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  children?: ReactNode;
}

export type IconButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps | AnchorProps>(
  (
    {
      icon = "refresh",
      size = "m",
      id,
      radius,
      tooltip,
      tooltipPosition = "top",
      variant = "primary",
      href,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isHover) {
        timer = setTimeout(() => {
          setTooltipVisible(true);
        }, 400);
      } else {
        setTooltipVisible(false);
      }

      return () => clearTimeout(timer);
    }, [isHover]);

    const content = (
      <>
        {children ? children : <Icon name={icon} size="s" />}
        {tooltip && isTooltipVisible && (
          <Flex
            position="absolute"
            zIndex={1}
            className={iconStyles[tooltipPosition]}
          >
            <Tooltip label={tooltip} />
          </Flex>
        )}
      </>
    );

    const radiusSize = size === "s" || size === "m" ? "m" : "l";

    return (
      <ElementType
        id={id}
        href={href}
        ref={ref}
        className={classNames(
          buttonStyles.button,
          buttonStyles[variant],
          iconStyles[size],
          className,
          radius === "none"
            ? "radius-none"
            : radius
            ? `radius-${radiusSize}-${radius}`
            : `radius-${radiusSize}`,
          "text-decoration-none",
          "button",
          "cursor-interactive",
          className
        )}
        style={style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label={tooltip || icon}
        {...props}
      >
        <Flex fill center>
          {content}
        </Flex>
      </ElementType>
    );
  }
);

IconButton.displayName = "IconButton";
export { IconButton };

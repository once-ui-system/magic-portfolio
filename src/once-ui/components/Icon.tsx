"use client";

import React, { forwardRef, useState, useEffect, ReactNode } from "react";
import classNames from "classnames";
import { IconType, } from "react-icons";
import { iconLibrary, IconName } from "../icons"; 
import { ColorScheme, ColorWeight } from "../types";
import { Flex, Tooltip } from ".";
import styles from "./Icon.module.scss";
import iconStyles from "./IconButton.module.scss";

interface IconProps extends React.ComponentProps<typeof Flex> {
  name: IconName;
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  size?: "xs" | "s" | "m" | "l" | "xl";
  decorative?: boolean;
  tooltip?: ReactNode;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      name,
      onBackground,
      onSolid,
      size = "m",
      decorative = true,
      tooltip,
      tooltipPosition = "top",
      ...rest
    },
    ref,
  ) => {
    const IconComponent: IconType | undefined = iconLibrary[name];
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);
    
    let colorClass = "";
    
    if (onBackground) {
      const [scheme, weight] = onBackground.split("-") as [ColorScheme, ColorWeight];
      colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
      const [scheme, weight] = onSolid.split("-") as [ColorScheme, ColorWeight];
      colorClass = `${scheme}-on-solid-${weight}`;
    }

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

    if (!IconComponent) {
      console.warn(`Icon "${name}" does not exist in the library.`);
      return null;
    }

    if (onBackground && onSolid) {
      console.warn(
        "You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied.",
      );
    }

    return (
      <Flex
        inline
        fit
        as="span"
        ref={ref}
        className={classNames(colorClass, styles.icon, styles[size])}
        role={decorative ? "presentation" : undefined}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={decorative ? undefined : name}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        {...rest}
      >
        <IconComponent />
        {tooltip && isTooltipVisible && (
          <Flex position="absolute" zIndex={1} className={iconStyles[tooltipPosition]}>
            <Tooltip label={tooltip} />
          </Flex>
        )}
      </Flex>
    );
  },
);

Icon.displayName = "Icon";

export { Icon };

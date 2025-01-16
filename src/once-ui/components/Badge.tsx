"use client";

import React, { forwardRef } from "react";
import { Arrow, Flex, Icon, SmartLink, Text } from ".";

import styles from "./Badge.module.scss";

interface BadgeProps extends React.ComponentProps<typeof Flex> {
  title?: string;
  icon?: string;
  arrow?: boolean;
  children?: React.ReactNode;
  href?: string;
  effect?: boolean;
}

const Badge = forwardRef<HTMLDivElement | HTMLAnchorElement, BadgeProps>(
  ({ title, icon, arrow = true, children, href, effect = true, ...rest }, ref) => {
    const content = (
      <Flex
        id="badge"
        paddingX="20"
        paddingY="12"
        fitWidth
        className={effect ? styles.animation : undefined}
        vertical="center"
        radius="full"
        background="neutral-weak"
        border="brand-alpha-medium"
        shadow="l"
        {...rest}
      >
        {icon && <Icon className="mr-8" size="s" name={icon} onBackground="brand-medium" />}
        {title && (
          <Text onBackground="brand-strong" variant="label-strong-s">
            {title}
          </Text>
        )}
        {children}
        {arrow && <Arrow trigger="#badge" />}
      </Flex>
    );

    if (href) {
      return (
        <SmartLink
          unstyled
          style={{
            borderRadius: "var(--radius-full)",
          }}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </SmartLink>
      );
    }

    return React.cloneElement(content, {
      ref: ref as React.Ref<HTMLDivElement>,
    });
  },
);

Badge.displayName = "Badge";
export { Badge };

"use client";

import React, { useEffect, useState, forwardRef, useCallback } from "react";
import styles from "./GlitchFx.module.scss";
import { Flex } from "./Flex";
import classNames from "classnames";

interface GlitchFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
  interval?: number;
  trigger?: "instant" | "hover" | "custom";
  continuous?: boolean;
}

const GlitchFx = forwardRef<HTMLDivElement, GlitchFxProps>(
  (
    {
      children,
      speed = "medium",
      interval = 2500,
      trigger = "instant",
      continuous = true,
      ...rest
    },
    ref,
  ) => {
    const [isGlitching, setIsGlitching] = useState(continuous || trigger === "instant");

    useEffect(() => {
      if (continuous || trigger === "instant") {
        setIsGlitching(true);
      }
    }, [continuous, trigger]);

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        setIsGlitching(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") {
        setIsGlitching(false);
      }
    };

    const triggerGlitch = useCallback(() => {
      if (trigger === "custom") {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }
    }, [trigger]);

    useEffect(() => {
      if (trigger === "custom") {
        const glitchInterval = setInterval(triggerGlitch, interval);
        return () => clearInterval(glitchInterval);
      }
    }, [trigger, interval, triggerGlitch]);

    const speedClass = styles[speed];

    return (
      <Flex
        ref={ref}
        inline
        zIndex={0}
        className={classNames(speedClass, isGlitching && styles.active)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <Flex fillWidth inline zIndex={1}>
          {children}
        </Flex>

        <Flex
          inline
          position="absolute"
          top="0"
          left="0"
          fill
          zIndex={0}
          opacity={50}
          className={classNames(styles.glitchLayer, styles.blueShift)}
        >
          {children}
        </Flex>

        <Flex
          inline
          position="absolute"
          top="0"
          left="0"
          fill
          zIndex={0}
          opacity={50}
          className={classNames(styles.glitchLayer, styles.redShift)}
        >
          {children}
        </Flex>
      </Flex>
    );
  },
);

GlitchFx.displayName = "GlitchFx";
export { GlitchFx };

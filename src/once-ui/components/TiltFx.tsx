"use client";

import React, { useRef } from "react";
import styles from "./TiltFx.module.scss";
import { Flex } from ".";

interface TiltFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
}

const TiltFx: React.FC<TiltFxProps> = ({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  let lastCall = 0;
  let resetTimeout: NodeJS.Timeout;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ("ontouchstart" in window) return;

    clearTimeout(resetTimeout);

    const now = Date.now();
    if (now - lastCall < 16) return;
    lastCall = now;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (offsetX - centerX) / centerX;
    const deltaY = (offsetY - centerY) / centerY;

    const rotateX = -deltaY * 15;
    const rotateY = -deltaX * 15;

    window.requestAnimationFrame(() => {
      element.style.transform = `perspective(1000px) translate3d(0, 0, 30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if ("ontouchstart" in window) return;

    const element = ref.current;
    if (element) {
      resetTimeout = setTimeout(() => {
        element.style.transform =
          "perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
      }, 100);
    }
  };

  return (
    <Flex
      ref={ref}
      overflow="hidden"
      className={styles.tiltFx}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export { TiltFx };
TiltFx.displayName = "TiltFx";

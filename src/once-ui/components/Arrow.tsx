"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./Arrow.module.scss";
import { Flex } from ".";

interface ArrowProps {
  trigger: string;
  scale?: number;
  color?: "onBackground" | "onSolid";
  style?: React.CSSProperties;
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  trigger,
  scale = 0.8,
  color = "onBackground",
  style,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerElement = document.querySelector(trigger);

    if (triggerElement && ref.current) {
      const handleMouseOver = () => {
        ref.current?.classList.add(styles.active);
      };

      const handleMouseOut = () => {
        ref.current?.classList.remove(styles.active);
      };

      triggerElement.addEventListener("mouseenter", handleMouseOver);
      triggerElement.addEventListener("mouseleave", handleMouseOut);

      return () => {
        triggerElement.removeEventListener("mouseenter", handleMouseOver);
        triggerElement.removeEventListener("mouseleave", handleMouseOut);
      };
    }
  }, [trigger]);

  return (
    <Flex
      ref={ref}
      vertical="center"
      horizontal="center"
      className={classNames(styles.arrowContainer, className)}
      style={{
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <Flex className={classNames(styles.arrow, styles[color])} height={0.1} />
      <Flex
        position="absolute"
        className={classNames(styles.arrowHead, styles[color])}
        height={0.0875}
      />
      <Flex
        position="absolute"
        className={classNames(styles.arrowHead, styles[color])}
        height={0.0875}
      />
    </Flex>
  );
};

Arrow.displayName = "Arrow";
export { Arrow };

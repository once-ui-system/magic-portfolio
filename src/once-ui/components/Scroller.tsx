"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Flex, IconButton } from ".";
import styles from "./Scroller.module.scss";
import { Fade } from "./Fade";

interface ScrollerProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
  direction?: "row" | "column";
  onItemClick?: (index: number) => void;
}

interface ScrollableChildProps {
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Scroller: React.FC<ScrollerProps> = ({
  children,
  direction = "row",
  className,
  style,
  onItemClick,
  ...rest
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showPrevButton, setShowPrevButton] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const handleScroll = () => {
      if (scroller) {
        const scrollPosition = direction === "row" ? scroller.scrollLeft : scroller.scrollTop;
        const maxScrollPosition =
          direction === "row"
            ? scroller.scrollWidth - scroller.clientWidth
            : scroller.scrollHeight - scroller.clientHeight;
        setShowPrevButton(scrollPosition > 0);
        setShowNextButton(scrollPosition < maxScrollPosition - 1);
      }
    };

    if (
      scroller &&
      (direction === "row"
        ? scroller.scrollWidth > scroller.clientWidth
        : scroller.scrollHeight > scroller.clientHeight)
    ) {
      handleScroll();
      scroller.addEventListener("scroll", handleScroll);
      return () => scroller.removeEventListener("scroll", handleScroll);
    }
  }, [direction]);

  const handleScrollNext = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollAmount =
        direction === "row" ? scroller.clientWidth / 2 : scroller.clientHeight / 2;
      scroller.scrollBy({
        [direction === "row" ? "left" : "top"]: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollPrev = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollAmount =
        direction === "row" ? scroller.clientWidth / 2 : scroller.clientHeight / 2;
      scroller.scrollBy({
        [direction === "row" ? "left" : "top"]: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<ScrollableChildProps>(child)) {
      const { onClick: childOnClick, onKeyDown: childOnKeyDown, ...otherProps } = child.props;

      return React.cloneElement(child, {
        ...otherProps,
        onClick: (e: React.MouseEvent) => {
          childOnClick?.(e);
          onItemClick?.(index);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          childOnKeyDown?.(e);
          if (e.key === "Enter" || e.key === " ") {
            childOnClick?.(e as any);
            onItemClick?.(index);
          }
        },
      });
    }
    return child;
  });

  return (
    <Flex
      fillWidth
      position="relative"
      className={classNames(styles.container, className)}
      style={style}
      {...rest}
    >
      {showPrevButton && (
        <Fade to="right" width={4} fillHeight position="absolute" left="0" zIndex={1}>
          <IconButton
            icon={direction === "row" ? "chevronLeft" : "chevronUp"}
            onClick={handleScrollPrev}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleScrollPrev();
              }
            }}
            size="s"
            variant="secondary"
            className={classNames(styles.scrollButton, styles.scrollButtonPrev)}
            aria-label="Scroll Previous"
          />
        </Fade>
      )}
      <Flex
        fillWidth
        zIndex={0}
        position="relative"
        radius="m"
        direction={direction}
        className={classNames(styles.scroller, styles[direction])}
        ref={scrollerRef}
      >
        {wrappedChildren}
      </Flex>
      {showNextButton && (
        <Fade to="left" width={4} fillHeight position="absolute" right="0" zIndex={1}>
          <IconButton
            icon={direction === "row" ? "chevronRight" : "chevronDown"}
            onClick={handleScrollNext}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleScrollNext();
              }
            }}
            size="s"
            variant="secondary"
            className={classNames(styles.scrollButton, styles.scrollButtonNext)}
            aria-label="Scroll Next"
          />
        </Fade>
      )}
    </Flex>
  );
};

Scroller.displayName = "Scroller";

export { Scroller };
export type { ScrollerProps };

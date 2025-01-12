"use client";

import { forwardRef, useState } from "react";
import { IconButton, StylePanel, Flex } from ".";
import styles from "./StyleOverlay.module.scss";

interface StyleOverlayProps extends React.ComponentProps<typeof Flex> {}

const StyleOverlay = forwardRef<HTMLDivElement, StyleOverlayProps>(({ ...rest }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex ref={ref} {...rest} fillHeight position="fixed" zIndex={1}>
      <IconButton
        variant={isOpen ? "secondary" : "primary"}
        onClick={togglePanel}
        icon={isOpen ? "close" : "sparkle"}
      />
      <Flex
        as="aside"
        className={`${styles.panel} ${isOpen && styles.open}`}
        maxWidth={28}
        style={{
          maxHeight: "calc(100% - var(--static-space-16))",
        }}
        fillHeight
        position="fixed"
        shadow="xl"
        top="8"
        right="8"
        transition="macro-medium"
        background="page"
        overflow="hidden"
        radius="xl"
        border="neutral-medium"
      >
        <StylePanel fill overflowY="scroll" padding="16" />
      </Flex>
    </Flex>
  );
});

StyleOverlay.displayName = "StyleOverlay";
export { StyleOverlay };

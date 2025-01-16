"use client";

import React, { forwardRef, ReactNode } from "react";
import styles from "./InlineCode.module.scss";
import { Flex } from "./Flex";

interface InlineCodeProps extends React.ComponentProps<typeof Flex> {
  children: ReactNode;
}

const InlineCode = forwardRef<HTMLDivElement, InlineCodeProps>(({ children, ...rest }, ref) => {
  return (
    <Flex
      as="span"
      inline
      fit
      ref={ref}
      radius="s"
      vertical="center"
      paddingX="4"
      paddingY="1"
      textType="code"
      background="neutral-alpha-weak"
      border="neutral-alpha-medium"
      className={styles.inlineCode}
      {...rest}
    >
      {children}
    </Flex>
  );
});

InlineCode.displayName = "InlineCode";

export { InlineCode };

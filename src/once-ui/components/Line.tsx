"use client";

import React, { forwardRef } from "react";
import { Flex } from ".";

interface LineProps extends React.ComponentProps<typeof Flex> {
  vertical?: boolean;
  style?: React.CSSProperties;
}

const Line = forwardRef<HTMLDivElement, LineProps>(
  ({ vertical, className, style, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        minWidth={(vertical && "1") || undefined}
        minHeight={(!vertical && "1") || undefined}
        width={(vertical && "1") || undefined}
        height={(!vertical && "1") || undefined}
        fillWidth={!vertical}
        fillHeight={vertical}
        background="neutral-strong"
        direction={vertical ? "column" : "row"}
        className={className}
        style={style}
        {...rest}
      />
    );
  },
);

Line.displayName = "Line";
export { Line };

"use client";

import React, { forwardRef } from "react";
import { Flex } from ".";

interface LineProps extends React.ComponentProps<typeof Flex> {
  vert?: boolean;
  style?: React.CSSProperties;
}

const Line = forwardRef<HTMLDivElement, LineProps>(({ vert, className, style, ...rest }, ref) => {
  return (
    <Flex
      ref={ref}
      minWidth={(vert && "1") || undefined}
      minHeight={(!vert && "1") || undefined}
      width={(vert && "1") || undefined}
      height={(!vert && "1") || undefined}
      fillWidth={!vert}
      fillHeight={vert}
      background="neutral-strong"
      direction={vert ? "column" : "row"}
      className={className}
      style={style}
      {...rest}
    />
  );
});

Line.displayName = "Line";
export { Line };

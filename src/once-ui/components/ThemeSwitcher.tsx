"use client";

import React, { forwardRef } from "react";
import { Row, useTheme, IconButton } from "@/once-ui/components";

type ThemeType = "system" | "dark" | "light";

interface ThemeSwitchProps extends React.ComponentProps<typeof Row> {
  defaultTheme?: ThemeType;
}

const ThemeSwitcher = forwardRef<HTMLDivElement, ThemeSwitchProps>(
  ({ defaultTheme = "system", ...rest }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <Row
        data-border="rounded"
        ref={ref}
        gap="2"
        border="neutral-alpha-weak"
        radius="full"
        {...rest}
      >
        <IconButton
          icon="computer"
          variant={theme === "system" ? "primary" : "tertiary"}
          onClick={() => setTheme("system")}
        />
        <IconButton
          icon="dark"
          variant={theme === "dark" ? "primary" : "tertiary"}
          onClick={() => setTheme("dark")}
        />
        <IconButton
          icon="light"
          variant={theme === "light" ? "primary" : "tertiary"}
          onClick={() => setTheme("light")}
        />
      </Row>
    );
  },
);

ThemeSwitcher.displayName = "ThemeSwitcher";
export { ThemeSwitcher };

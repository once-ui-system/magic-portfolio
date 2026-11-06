"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@/once-ui/components";
import { style } from "@/app/resources";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const getStoredTheme = (): Theme | null => {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage unavailable (private mode, etc.) - theme still applies for this page view
  }
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    const initial: Theme =
      current === "light" || current === "dark"
        ? current
        : getStoredTheme() ?? (style.theme as Theme);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  // Render a stable placeholder until mounted so server and client markup match.
  const isDark = theme === "dark";

  return (
    <IconButton
      onClick={toggle}
      icon={theme === null ? "moon" : isDark ? "sun" : "moon"}
      size="m"
      variant="ghost"
      tooltip={theme === null ? undefined : isDark ? "Switch to light mode" : "Switch to dark mode"}
      tooltipPosition="bottom"
      aria-label="Toggle color theme"
    />
  );
};

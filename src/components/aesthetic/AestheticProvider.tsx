"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useStyle } from "@once-ui-system/core";
import {
  aesthetic as configured,
  aesthetics,
  styleOverrides,
  type AestheticName,
} from "@/resources";

const STORAGE_KEY = "data-aesthetic";

type AestheticContextValue = {
  name: AestheticName;
  setAesthetic: (name: AestheticName) => void;
};

const AestheticContext = createContext<AestheticContextValue>({
  name: configured,
  setAesthetic: () => {},
});

export const useAesthetic = () => useContext(AestheticContext);

function isAesthetic(value: string | undefined | null): value is AestheticName {
  return !!value && value in aesthetics;
}

/**
 * Holds the aesthetic in use. It starts from once-ui.config.ts; with the
 * switcher on, the theme script in layout.tsx may already have applied the
 * visitor's last pick to <html data-aesthetic>, which this picks up on mount.
 */
export function AestheticProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<AestheticName>(configured);
  const { setStyle } = useStyle();

  const setAesthetic = useCallback(
    (next: AestheticName) => {
      const { theme: _theme, ...overrides } = styleOverrides;
      document.documentElement.dataset.aesthetic = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      setStyle({ ...aesthetics[next].style, ...overrides });
      setName(next);
    },
    [setStyle],
  );

  // Once, on mount: adopt the pick the theme script restored.
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const current = document.documentElement.dataset.aesthetic;
    if (isAesthetic(current) && current !== configured) setAesthetic(current);
  }, [setAesthetic]);

  return (
    <AestheticContext.Provider value={{ name, setAesthetic }}>{children}</AestheticContext.Provider>
  );
}

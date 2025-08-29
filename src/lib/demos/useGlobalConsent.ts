"use client";
import { useEffect, useState } from "react";

const KEY = "demo_consent:global";

export function useGlobalConsent(defaultValue = false) {
  const [consent, setConsent] = useState<boolean>(defaultValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw != null) setConsent(raw === "1");
    } catch {}
  }, []);

  function accept(v: boolean) {
    setConsent(v);
    try { localStorage.setItem(KEY, v ? "1" : "0"); } catch {}
  }

  return { consent, accept };
}


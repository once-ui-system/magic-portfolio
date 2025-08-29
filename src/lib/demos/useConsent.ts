"use client";
import { useEffect, useState } from "react";

export function useConsent(key: string, defaultValue = false) {
  const storageKey = `demo_consent:${key}`;
  const [consent, setConsent] = useState<boolean>(defaultValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw != null) setConsent(raw === "1");
    } catch {}
  }, [storageKey]);

  function accept(v: boolean) {
    setConsent(v);
    try { localStorage.setItem(storageKey, v ? "1" : "0"); } catch {}
  }

  return { consent, accept };
}


"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

type RLState = { count: number; resetAt: number; allowed: boolean };

export function useRateLimit(key: string, windowMs = 5 * 60_000, max = 10) {
  const storageKey = `demo_rl:${key}`;
  const [state, setState] = useState<RLState>({ count: 0, resetAt: Date.now() + windowMs, allowed: true });

  const load = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const now = Date.now();
      const arr: number[] = raw ? JSON.parse(raw) : [];
      const recent = arr.filter((t) => now - t < windowMs);
      const allowed = recent.length < max;
      const resetAt = recent.length ? Math.min(...recent) + windowMs : now + windowMs;
      setState({ count: recent.length, resetAt, allowed });
      localStorage.setItem(storageKey, JSON.stringify(recent));
    } catch {}
  }, [storageKey, windowMs, max]);

  useEffect(() => { load(); }, [load]);

  const record = useCallback(() => {
    try {
      const now = Date.now();
      const raw = localStorage.getItem(storageKey);
      const arr: number[] = raw ? JSON.parse(raw) : [];
      arr.push(now);
      localStorage.setItem(storageKey, JSON.stringify(arr));
      load();
    } catch {}
  }, [storageKey, load]);

  const remaining = useMemo(() => Math.max(0, max - state.count), [state.count, max]);

  return { ...state, remaining, record };
}


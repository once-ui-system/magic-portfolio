"use client";
import { useCallback } from "react";
import { track } from "./client";
import { trackFunnel } from "./funnel";

type Options = {
  funnel: string;
  industry?: string;
};

export function useFunnel({ funnel, industry }: Options) {
  const step = useCallback((s: string, props?: Record<string, any>) => {
    trackFunnel({ funnel, step: s as any, industry, props });
  }, [funnel, industry]);

  const cta = useCallback((label: string, props?: Record<string, any>) => {
    step("cta_click", { label, ...(props || {}) });
    track("cta_click", { funnel, industry, label, ...(props || {}) });
  }, [funnel, industry, step]);

  return { step, cta };
}


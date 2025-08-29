"use client";
import { track } from "./client";

type Step =
  | "view"
  | "field_change"
  | "param_change"
  | "submit_start"
  | "submit_success"
  | "submit_error"
  | "cta_click";

export function trackFunnel(opts: { funnel: string; step: Step; industry?: string; props?: Record<string, any> }) {
  const { funnel, step, industry, props } = opts;
  track("funnel_step", { funnel, step, industry, ...(props || {}) });
}


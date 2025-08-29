"use client";
import { Button } from "@once-ui-system/core";
import { useFunnel } from "@/lib/analytics/useFunnel";

type Props = {
  label: string;
  href?: string;
  industry?: string;
  funnel?: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "s" | "m" | "l";
};

export function FunnelCTA({ label, href = "#", industry, funnel = "lead", variant = "primary", size = "m" }: Props) {
  const { cta } = useFunnel({ funnel, industry });
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      onClick={() => cta(label, { href })}
    >
      {label}
    </Button>
  );
}


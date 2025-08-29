"use client";
import { Button, Row } from "@once-ui-system/core";
import flags from "@/resources/flags.json";

export function HomeCTA() {
  const variant = (flags as any)?.home?.ctaVariant || "A";
  const A = (
    <Row gap="8">
      <Button href="/pricing" variant="primary" arrowIcon>Estimate Your Project</Button>
      <Button href="/industries" variant="tertiary">See Industry Demos</Button>
    </Row>
  );
  const B = (
    <Row gap="8">
      <Button href="/playbooks" variant="primary" arrowIcon>Get a Playbook</Button>
      <Button href="/case-studies" variant="tertiary">View Case Studies</Button>
    </Row>
  );
  return variant === "B" ? B : A;
}


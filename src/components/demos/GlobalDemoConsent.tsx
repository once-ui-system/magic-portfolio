"use client";
import { Card, Column, Row, Text, Button } from "@once-ui-system/core";
import { useGlobalConsent } from "@/lib/demos/useGlobalConsent";

export function GlobalDemoConsent() {
  const { consent, accept } = useGlobalConsent(false);
  if (consent) return null;
  return (
    <Card padding="12" radius="m" border="brand-weak" style={{ position: "sticky", top: 0, zIndex: 10 }}>
      <Row wrap gap="12" vertical="center" horizontal="space-between">
        <Column>
          <Text variant="body-default-s">Demos are for illustration only. No data leaves your browser.</Text>
          <Text variant="label-default-s" onBackground="neutral-weak">By continuing, you agree to the demo terms.</Text>
        </Column>
        <Row gap="8">
          <Button variant="primary" size="s" onClick={() => accept(true)}>I Agree</Button>
          <Button variant="tertiary" size="s" onClick={() => accept(false)}>Dismiss</Button>
        </Row>
      </Row>
    </Card>
  );
}


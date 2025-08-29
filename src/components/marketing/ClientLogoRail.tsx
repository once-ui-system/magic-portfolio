"use client";
import { Card, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import { clients as defaultClients } from "@/resources";

export function ClientLogoRail({ clients = defaultClients }: { clients?: { name: string; logo?: string }[] }) {
  if (!clients || clients.length === 0) return null;
  return (
    <Card padding="16" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">Trusted by forward‑thinking teams</Heading>
        <Grid columns="4" mobileColumns="2" gap="12">
          {clients.map((c, i) => (
            <Row key={i} padding="12" border="neutral-alpha-weak" radius="m" horizontal="center" vertical="center">
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.logo} alt={c.name} style={{ maxHeight: 28, maxWidth: 120, opacity: 0.8 }} />
              ) : (
                <Text onBackground="neutral-weak">{c.name}</Text>
              )}
            </Row>
          ))}
        </Grid>
      </Column>
    </Card>
  );
}


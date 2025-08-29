"use client";
import { Badge, Card, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";

export function ValueProps() {
  return (
    <Card padding="24" radius="l">
      <Column gap="16">
        <Heading as="h3" variant="heading-strong-l">Finance‑grade builder. Operator mindset.</Heading>
        <Row gap="8" wrap>
          <Badge textVariant="label-default-s" background="brand-alpha-weak">Series 7</Badge>
          <Badge textVariant="label-default-s" background="brand-alpha-weak">Series 63</Badge>
          <Badge textVariant="label-default-s" background="brand-alpha-weak">Full‑Stack Business Developer</Badge>
        </Row>
        <Grid columns="3" mobileColumns="1" gap="12">
          <Card padding="16" radius="m">
            <Column gap="4">
              <Heading as="h4" variant="heading-strong-m">3×</Heading>
              <Text onBackground="neutral-weak">Faster operations cycles</Text>
            </Column>
          </Card>
          <Card padding="16" radius="m">
            <Column gap="4">
              <Heading as="h4" variant="heading-strong-m">20–40%</Heading>
              <Text onBackground="neutral-weak">Cost savings via automation</Text>
            </Column>
          </Card>
          <Card padding="16" radius="m">
            <Column gap="4">
              <Heading as="h4" variant="heading-strong-m">10–15%</Heading>
              <Text onBackground="neutral-weak">Faster cash cycles</Text>
            </Column>
          </Card>
        </Grid>
      </Column>
    </Card>
  );
}


import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { RevealFx, TypeFx } from "@once-ui-system/fx";
import { about, home, person, routes } from "@/resources";
import { cityFromTimeZone } from "@/utils/cityFromTimeZone";

function Prompt({ command }: { command: string }) {
  return (
    <Row gap="8" wrap>
      <Text onBackground="brand-medium">{person.firstName.toLowerCase()}@portfolio ~ %</Text>
      <Text onBackground="neutral-strong">{command}</Text>
    </Row>
  );
}

export function HeroTerminal() {
  const city = cityFromTimeZone(person.location);

  return (
    <Column fillWidth gap="40" paddingTop="40" s={{ paddingTop: "8", gap: "32" }}>
      <RevealFx translateY="8">
        <Column fillWidth background="surface" border radius="l" overflow="hidden">
          <Row fillWidth paddingX="16" paddingY="12" gap="8" vertical="center" borderBottom>
            <Row width={10} height={10} radius="full" solid="danger-medium" />
            <Row width={10} height={10} radius="full" solid="warning-medium" />
            <Row width={10} height={10} radius="full" solid="success-medium" />
            <Text
              textVariant="label-default-s"
              onBackground="neutral-weak"
              marginLeft="8"
              aria-hidden
            >
              ~/portfolio
            </Text>
          </Row>
          <Column
            fillWidth
            padding="24"
            gap="12"
            textVariant="code-default-m"
            onBackground="neutral-weak"
            s={{ padding: "16" }}
          >
            <Prompt command="whoami" />
            <Text onBackground="neutral-strong">
              {person.name}, {person.role.toLowerCase()}
              {city && ` in ${city}`}
            </Text>
            {home.ticker && home.ticker.length > 0 && (
              <>
                <Prompt command="cat focus.txt" />
                <Row gap="4" vertical="center" onBackground="accent-medium">
                  <Text aria-hidden>&gt;</Text>
                  <TypeFx words={home.ticker} loop hold={1600} charDuration={45} />
                </Row>
              </>
            )}
            {home.availability && (
              <>
                <Prompt command="status" />
                <Text onBackground="success-medium">● {home.availability.toLowerCase()}</Text>
              </>
            )}
          </Column>
        </Column>
      </RevealFx>
      <RevealFx translateY="8" delay={200} horizontal="start">
        <Column gap="20">
          <Heading as="h1" textVariant="display-strong-l" wrap="balance">
            {home.headline}
          </Heading>
          <Text textVariant="body-default-l" onBackground="neutral-weak" wrap="pretty">
            {home.subline}
          </Text>
        </Column>
      </RevealFx>
      <RevealFx delay={300} horizontal="start">
        <Row gap="12" wrap>
          {routes["/work"] && (
            <Button href="/work" size="m" weight="default">
              ls ./work
            </Button>
          )}
          {routes["/about"] && (
            <Button href={about.path} variant="secondary" size="m" weight="default">
              cd ./about
            </Button>
          )}
        </Row>
      </RevealFx>
    </Column>
  );
}

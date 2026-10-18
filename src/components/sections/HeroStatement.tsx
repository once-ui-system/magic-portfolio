import {
  Avatar,
  Button,
  Column,
  Heading,
  Line,
  Row,
  StatusIndicator,
  Text,
} from "@once-ui-system/core";
import { RevealFx } from "@once-ui-system/fx";
import { about, home, person, routes } from "@/resources";
import { cityFromTimeZone } from "@/utils/cityFromTimeZone";

export function HeroStatement() {
  const city = cityFromTimeZone(person.location);

  return (
    <Column fillWidth gap="40" paddingTop="64" s={{ paddingTop: "16", gap: "24" }}>
      <RevealFx horizontal="start">
        <Row
          wrap
          gap="12"
          vertical="center"
          textVariant="label-default-s"
          onBackground="neutral-weak"
        >
          {home.availability && (
            <Row gap="8" vertical="center" onBackground="neutral-strong">
              <StatusIndicator pulse tone="success" size="s" aria-hidden />
              {home.availability}
            </Row>
          )}
          <Text aria-hidden>/</Text>
          {person.role}
          {city && (
            <>
              <Text aria-hidden>/</Text>
              {city}
            </>
          )}
        </Row>
      </RevealFx>
      <RevealFx translateY="8" delay={100} horizontal="start">
        <Heading as="h1" textVariant="display-strong-xl" wrap="balance">
          {home.headline}
        </Heading>
      </RevealFx>
      <RevealFx translateY="8" delay={250}>
        <Row
          fillWidth
          gap="40"
          vertical="end"
          horizontal="between"
          s={{ direction: "column", horizontal: "start", gap: "24" }}
        >
          <Column maxWidth="36rem">
            <Text textVariant="heading-default-l" onBackground="neutral-weak" wrap="pretty">
              {home.subline}
            </Text>
          </Column>
          <Row gap="12" wrap>
            {routes["/about"] && (
              <Button href={about.path} size="m" weight="default">
                <Row gap="8" vertical="center">
                  {about.avatar.display && (
                    <Avatar
                      src={person.avatar}
                      size="xs"
                      aria-hidden
                      style={{ marginLeft: "-0.5rem" }}
                    />
                  )}
                  About me
                </Row>
              </Button>
            )}
            {routes["/work"] && (
              <Button href="/work" variant="secondary" size="m" weight="default" arrowIcon>
                See work
              </Button>
            )}
          </Row>
        </Row>
      </RevealFx>
      <Line />
    </Column>
  );
}

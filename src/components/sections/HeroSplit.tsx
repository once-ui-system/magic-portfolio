import {
  Button,
  Column,
  Heading,
  Media,
  Row,
  StatusIndicator,
  Tag,
  Text,
} from "@once-ui-system/core";
import { HoloFx, RevealFx, TiltFx } from "@once-ui-system/fx";
import { about, home, person, routes } from "@/resources";
import { cityFromTimeZone } from "@/utils/cityFromTimeZone";

export function HeroSplit() {
  return (
    <Row
      fillWidth
      gap="64"
      vertical="center"
      paddingTop="40"
      s={{ direction: "column-reverse", gap: "32", paddingTop: "8" }}
    >
      <Column flex={7} gap="24">
        {home.featured.display && (
          <RevealFx horizontal="start">
            <Tag
              variant="announce"
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Tag>
          </RevealFx>
        )}
        <RevealFx translateY="8" delay={100} horizontal="start">
          <Heading as="h1" textVariant="display-strong-l" wrap="balance">
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={200} horizontal="start">
          <Text textVariant="heading-default-l" onBackground="neutral-weak" wrap="pretty">
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx delay={300} horizontal="start" paddingTop="8">
          <Row gap="12" wrap>
            {routes["/work"] && (
              <Button href="/work" size="m" weight="default" arrowIcon>
                See work
              </Button>
            )}
            {routes["/about"] && (
              <Button href={about.path} variant="secondary" size="m" weight="default">
                About me
              </Button>
            )}
          </Row>
        </RevealFx>
      </Column>
      <Column flex={5} maxWidth="24rem" s={{ maxWidth: "20rem" }}>
        <RevealFx translateY="16" delay={150}>
          <TiltFx fillWidth radius="xl" intensity={0.6}>
            <HoloFx fillWidth radius="xl" overflow="hidden">
              <Column fillWidth radius="xl" overflow="hidden" border="neutral-alpha-medium">
                <Media
                  priority
                  src={person.avatar}
                  alt={person.name}
                  aspectRatio="4 / 5"
                  sizes="(max-width: 768px) 320px, 384px"
                  radius="none"
                />
                <Row
                  position="absolute"
                  bottom="0"
                  left="0"
                  fillWidth
                  padding="16"
                  gap="12"
                  vertical="center"
                  horizontal="between"
                  background="surface"
                  backdropBlur="m"
                  borderTop
                >
                  <Column gap="4">
                    <Text textVariant="heading-strong-s">{person.name}</Text>
                    <Text textVariant="label-default-s" onBackground="neutral-weak">
                      {person.role}, {cityFromTimeZone(person.location)}
                    </Text>
                  </Column>
                  {home.availability && (
                    <StatusIndicator pulse tone="success" size="s" aria-label={home.availability} />
                  )}
                </Row>
              </Column>
            </HoloFx>
          </TiltFx>
        </RevealFx>
      </Column>
    </Row>
  );
}

// components/Hero.tsx
import React from "react";
import {
  Column,
  RevealFx,
  Badge,
  Row,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
} from "@/once-ui/components";
import { home, about, person, gallery } from "@/app/resources/content";

export function Hero() {
  // raw `/images/...` path works in dev and prod
  const bgSrc = gallery.images[0].src;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "60vh",
        background: `url(${bgSrc}) center/cover no-repeat`,
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Column
        maxWidth="s"
        paddingY="l"
        paddingX="l"
        gap="l"
        style={{ position: "relative", zIndex: 1 }}
      >
              {/* {home.featured && (
          <RevealFx
            fillWidth
            horizontal="start"
            paddingTop="16"
            paddingBottom="32"
            paddingLeft="12"
          >
            <Badge
              background="red "
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}
 */}
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16"
        >
          <Heading
            wrap="balance"
            variant="display-strong-l"
            style={{ color: "#fff", margin: 0 }}
          >
            {home.headline}
          </Heading>
        </RevealFx>

        <RevealFx
          translateY="8"
          delay={0.2}
          fillWidth
          horizontal="start"
          paddingBottom="32"
        >
          <Text
            wrap="balance"
            variant="heading-default-xl"
            style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}
          >
            {home.subline}
          </Text>
        </RevealFx>

        <RevealFx
          paddingTop="12"
          delay={0.4}
          horizontal="start"
          paddingLeft="12"
        >
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            arrowIcon
          >
            <Flex gap="8" vertical="center">
              {about.avatar.display && (
                <Avatar src={person.avatar} size="m" radius="full" />
              )}
              {about.title}
            </Flex>
          </Button>
        </RevealFx>
      </Column>
    </section>
  );
}

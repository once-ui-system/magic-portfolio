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
  // const bgSrc = gallery.images[0].src;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      <Column
        maxWidth="s"
        gap="l"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "960px",
        }}
      >
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16"
        >
          <Flex gap="32" vertical="center" style={{ textAlign: "center" }}>
            <Avatar
              src="/images/avatar.png"
              size="xl"
              radius="full"
              style={{ flexShrink: 0 }}
            />

            <Column gap="16" style={{ flex: 1 }}>
              <Heading
                wrap="balance"
                variant="display-strong-l"
                style={{ color: "var(--text-default-strong)", margin: 0 }}
              >
                {home.headline}
              </Heading>

              <Text
                wrap="balance"
                variant="heading-default-xl"
                style={{ color: "var(--text-default)", margin: 0 }}
              >
                {home.subline}
              </Text>
            </Column>
          </Flex>
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

        {/* {home.featured && (
            <RevealFx
            fillWidth
            horizontal="start"
            paddingTop="0"
            paddingBottom="32"
            paddingLeft="12"
            >
            <Badge
            background="neutral-medium"
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
            )} */}
      </Column>
    </section>
  );
}

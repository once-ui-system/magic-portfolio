import React from "react";
import {
  Column,
  RevealFx,
  Heading,
  Text,
  Button,
  Avatar,
  Flex
} from "@once-ui-system/core";

export function Hero({ dict, locale = "en" }: { dict: any; locale?: string }) {
  const { home, about, person } = dict;
  const bookLabel = locale === "pt-BR" ? "Agende um horário" : "Book a slot";

  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '80px 24px 32px',
      }}
    >
      <RevealFx
        translateY="4"
        fillWidth
        horizontal="center"
      >
        <Column gap="24" horizontal="center" style={{ textAlign: "center", width: '100%' }}>
          <div className="avatar-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', marginBottom: '16px' }}>
            <Avatar
              src={person.avatar}
              size="xl"
              className="dark-only"
              style={{ margin: 0, padding: 0, border: 'none' }}
            />
            <Avatar
              src="/images/logo_light.png"
              size="xl"
              className="light-only"
              style={{ margin: 0, padding: 0, border: 'none' }}
            />
          </div>
          <Heading
            wrap="balance"
            variant="display-strong-l"
            style={{
              color: "var(--neutral-on-background-strong)",
              margin: 0,
              maxWidth: "18ch",
              lineHeight: "1.2",
              textShadow: "0 0 40px var(--brand-alpha-medium)",
              whiteSpace: "normal",
              wordBreak: "normal"
            }}
          >
            {home.headline}
          </Heading>

          <Text
            wrap="balance"
            variant="heading-default-l"
            onBackground="neutral-weak"
            style={{
              margin: 0,
              maxWidth: "720px"
            }}
          >
            {home.subline}
          </Text>
        </Column>
      </RevealFx>

      <RevealFx
        paddingTop="32"
        delay={0.4}
        horizontal="center"
      >
        <Flex gap="16" horizontal="center" wrap>
          <Button
            id="book"
            data-border="rounded"
            href={about.calendar.link}
            variant="secondary"
            size="l"
            prefixIcon="calendar"
            className="hero-cta-button"
            style={{
              border: '2px solid var(--hero-button-color, #39ff64)',
              color: 'var(--hero-button-color, #39ff64)',
              background: 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            {bookLabel}
          </Button>
          <Button
            id="email"
            data-border="rounded"
            href={`mailto:${person.email}`}
            variant="secondary"
            size="l"
            prefixIcon="email"
            className="hero-cta-button"
            style={{
              border: '2px solid var(--hero-button-color, #39ff64)',
              color: 'var(--hero-button-color, #39ff64)',
              background: 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            {person.email}
          </Button>
        </Flex>
      </RevealFx>
    </section>
  );
}

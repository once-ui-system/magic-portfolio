"use client";

import { newsletter, newsletterForm } from "@/resources";
import { Button, Heading, Input, Text, Background, Column, Row } from "@once-ui-system/core";
import { Opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

// Aveiro's public subscribe endpoint: accepts signups from any site allowed on the embed form.
const subscribeURL = "https://www.aveiro.app/api/email/subscribe";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function subscribe(email: string): Promise<string> {
  if (!newsletterForm.aveiroEmbedId) {
    return "Signups aren't connected yet: add your Aveiro embed form ID in once-ui.config.ts.";
  }
  try {
    const res = await fetch(subscribeURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embedPublicId: newsletterForm.aveiroEmbedId,
        email,
        sourcePath: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    });
    if (res.ok) return "";
    if (res.status === 400) return "Please enter a valid email address.";
    if (res.status === 404)
      return "This newsletter form wasn't found in Aveiro: check the embed form ID.";
    if (res.status === 403) return "This site isn't allowed on the Aveiro embed form yet.";
    return "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export const Newsletter: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const validate = (value: string): string =>
    value === "" || emailPattern.test(value) ? "" : "Please enter a valid email address.";

  if (newsletter.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: newsletterForm.effects.mask.x,
          y: newsletterForm.effects.mask.y,
          radius: newsletterForm.effects.mask.radius,
          cursor: newsletterForm.effects.mask.cursor,
        }}
        gradient={{
          display: newsletterForm.effects.gradient.display,
          opacity: newsletterForm.effects.gradient.opacity as Opacity,
          x: newsletterForm.effects.gradient.x,
          y: newsletterForm.effects.gradient.y,
          width: newsletterForm.effects.gradient.width,
          height: newsletterForm.effects.gradient.height,
          tilt: newsletterForm.effects.gradient.tilt,
          colorStart: newsletterForm.effects.gradient.colorStart,
          colorEnd: newsletterForm.effects.gradient.colorEnd,
        }}
        dots={{
          display: newsletterForm.effects.dots.display,
          opacity: newsletterForm.effects.dots.opacity as Opacity,
          size: newsletterForm.effects.dots.size as SpacingToken,
          color: newsletterForm.effects.dots.color,
        }}
        grid={{
          display: newsletterForm.effects.grid.display,
          opacity: newsletterForm.effects.grid.opacity as Opacity,
          color: newsletterForm.effects.grid.color,
          width: newsletterForm.effects.grid.width,
          height: newsletterForm.effects.grid.height,
        }}
        lines={{
          display: newsletterForm.effects.lines.display,
          opacity: newsletterForm.effects.lines.opacity as Opacity,
          size: newsletterForm.effects.lines.size as SpacingToken,
          thickness: newsletterForm.effects.lines.thickness,
          angle: newsletterForm.effects.lines.angle,
          color: newsletterForm.effects.lines.color,
        }}
      />
      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {newsletter.title}
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          {newsletter.description}
        </Text>
      </Column>
      {submitted ? (
        <Text variant="body-default-m" onBackground="brand-medium" role="status">
          Thanks for subscribing!
        </Text>
      ) : (
        <form
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
            const message = email ? validate(email) : "Please enter your email address.";
            if (message) {
              setError(message);
              return;
            }
            setError("");
            setSending(true);
            const failure = await subscribe(email);
            setSending(false);
            if (failure) setError(failure);
            else setSubmitted(true);
          }}
        >
          <Row fillWidth maxWidth={24} s={{ direction: "column" }} gap="8">
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              required
              onChange={(e) => {
                if (error) setError(validate(e.target.value));
              }}
              onBlur={(e) => setError(validate(e.target.value))}
              errorMessage={error}
            />
            <Row height="48" vertical="center">
              <Button type="submit" size="m" fillWidth loading={sending} disabled={sending}>
                Subscribe
              </Button>
            </Row>
          </Row>
        </form>
      )}
    </Column>
  );
};

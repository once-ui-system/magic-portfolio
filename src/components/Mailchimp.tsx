"use client";

import { mailchimp, newsletter } from "@/resources";
import { Button, Heading, Input, Text, Background, Column, Row } from "@once-ui-system/core";
import { Opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

// Mailchimp's bot trap: a hidden field named after the list (b_<u>_<id>),
// read from the form action so it follows whichever list you point it at.
function honeypotName(action: string): string | undefined {
  try {
    const params = new URL(action).searchParams;
    const u = params.get("u");
    const id = params.get("id");
    return u && id ? `b_${u}_${id}` : undefined;
  } catch {
    return undefined;
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

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
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as Opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as Opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as Opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as Opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
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
          Almost done: check your inbox to confirm your subscription.
        </Text>
      ) : (
        <form
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          action={mailchimp.action}
          method="post"
          target="_blank"
          noValidate
          onSubmit={(e) => {
            const email = String(new FormData(e.currentTarget).get("EMAIL") ?? "");
            const message = email ? validate(email) : "Please enter your email address.";
            if (message) {
              e.preventDefault();
              setError(message);
              return;
            }
            setSubmitted(true);
          }}
        >
          <Row fillWidth maxWidth={24} s={{ direction: "column" }} gap="8">
            <Input
              id="mce-EMAIL"
              name="EMAIL"
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
            {honeypotName(mailchimp.action) && (
              <input
                type="text"
                name={honeypotName(mailchimp.action)}
                tabIndex={-1}
                defaultValue=""
                aria-hidden="true"
                style={{ position: "absolute", left: "-5000px" }}
              />
            )}
            <Row height="48" vertical="center">
              <Button type="submit" size="m" fillWidth>
                Subscribe
              </Button>
            </Row>
          </Row>
        </form>
      )}
    </Column>
  );
};

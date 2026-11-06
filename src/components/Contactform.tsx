"use client";

import { useState } from "react";
import { Button, Column, Flex, Input, Text, Textarea, useToast } from "@/once-ui/components";
import { person } from "@/app/resources/content";

/**
 * Contact form with no backend dependency: it builds a prefilled mailto: link
 * and opens the visitor's mail client. Swap `handleSubmit` for a fetch() to
 * your own endpoint (Formspree, Resend, a Next.js route handler...) if you
 * want server-side delivery later.
 */
export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n---\n${name}\n${email}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;

    addToast({
      variant: "success",
      message: "Opening your mail client. Thanks for reaching out!",
    });
  };

  return (
    <Column
      as="form"
      onSubmit={handleSubmit}
      fillWidth
      gap="16"
      padding="l"
      radius="l"
      border="neutral-alpha-medium"
      background="surface"
    >
      <Flex fillWidth gap="16" mobileDirection="column">
        <Input
          id="contact-name"
          label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="contact-email"
          label="Your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Flex>
      <Textarea
        id="contact-message"
        label="Your message"
        lines={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      {error && (
        <Text variant="body-default-s" onBackground="danger-weak">
          {error}
        </Text>
      )}
      <Flex fillWidth horizontal="space-between" vertical="center" mobileDirection="column" gap="12">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Opens your mail client with the message prefilled.
        </Text>
        <Button type="submit" prefixIcon="envelope" label="Send message" size="m" variant="primary" />
      </Flex>
    </Column>
  );
};

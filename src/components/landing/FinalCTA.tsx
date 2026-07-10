import { Column, Heading, Text } from "@once-ui-system/core";
import { landing } from "@/resources";
import { AppStoreBadge } from "./AppStoreBadge";
import { ScrollReveal } from "./ScrollReveal";

export const FinalCTA = () => {
  return (
    <Column fillWidth gap="40" horizontal="center" align="center">
      <ScrollReveal translateY={8} horizontal="center">
        <Column gap="16" horizontal="center" align="center">
          <Heading
            as="h2"
            wrap="balance"
            align="center"
            className="streaktap-display"
            onBackground="neutral-strong"
          >
            Start a streak today.
          </Heading>
          <Text
            onBackground="neutral-weak"
            wrap="balance"
            align="center"
            variant="body-default-l"
            className="streaktap-body-copy"
            style={{ maxWidth: "440px" }}
          >
            {landing.tagline}
          </Text>
        </Column>
      </ScrollReveal>
      <ScrollReveal translateY={8} delay={0.1} horizontal="center">
        <Column gap="16" horizontal="center" align="center">
          <AppStoreBadge />
          <Text onBackground="neutral-weak" align="center" variant="body-default-s">
            No accounts. No ads. No noise.
          </Text>
        </Column>
      </ScrollReveal>
    </Column>
  );
};

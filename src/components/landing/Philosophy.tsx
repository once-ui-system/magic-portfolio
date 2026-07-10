import { Column, Heading, Text } from "@once-ui-system/core";
import { landing } from "@/resources";
import { ScrollReveal } from "./ScrollReveal";

export const Philosophy = () => {
  return (
    <Column fillWidth gap="64">
      <ScrollReveal translateY={8}>
        <Heading as="h2" wrap="balance" className="streaktap-display-m">
          Built on four principles.
        </Heading>
      </ScrollReveal>
      <Column gap="24">
        {landing.principles.map((line, index) => (
          <ScrollReveal key={line} translateY={10} delay={index * 0.08}>
            <Heading
              as="p"
              variant="heading-strong-xl"
              onBackground="neutral-strong"
            >
              {line}
            </Heading>
          </ScrollReveal>
        ))}
      </Column>
      <ScrollReveal translateY={8}>
        <Text
          onBackground="neutral-weak"
          variant="body-default-l"
          className="streaktap-body-copy"
          style={{ maxWidth: "720px" }}
        >
          {landing.principlesClosing}
        </Text>
      </ScrollReveal>
    </Column>
  );
};

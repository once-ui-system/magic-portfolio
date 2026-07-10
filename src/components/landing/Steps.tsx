import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { landing } from "@/resources";
import { ScrollReveal } from "./ScrollReveal";

export const Steps = () => {
  return (
    <Column fillWidth gap="64">
      <ScrollReveal translateY={8}>
        <Heading as="h2" wrap="balance" className="streaktap-display">
          Three steps. No setup.
        </Heading>
      </ScrollReveal>
      <Row
        fillWidth
        gap="48"
        s={{ direction: "column" }}
        vertical="start"
      >
        {landing.steps.map((step, index) => (
          <ScrollReveal key={step.number} translateY={12} delay={index * 0.08} style={{ flex: 1 }}>
            <Column flex={1} gap="16">
              <Text
                onBackground="neutral-weak"
                className="streaktap-step-number"
              >
                {step.number}
              </Text>
              <Heading as="h3" variant="heading-strong-l">
                {step.title}
              </Heading>
              <Text
                onBackground="neutral-weak"
                variant="body-default-m"
                className="streaktap-body-copy"
              >
                {step.body}
              </Text>
            </Column>
          </ScrollReveal>
        ))}
      </Row>
    </Column>
  );
};

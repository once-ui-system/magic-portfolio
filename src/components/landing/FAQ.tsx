import { Accordion, Column, Heading, Text } from "@once-ui-system/core";
import { landing } from "@/resources";
import { ScrollReveal } from "./ScrollReveal";

export const FAQ = () => {
  return (
    <Column fillWidth gap="64">
      <ScrollReveal translateY={8}>
        <Heading as="h2" wrap="balance" className="streaktap-display-m">
          Questions, briefly answered.
        </Heading>
      </ScrollReveal>
      <Column fillWidth gap="0">
        {landing.faq.map((item, index) => (
          <ScrollReveal key={item.q} translateY={8} delay={Math.min(index, 4) * 0.05}>
            <Accordion
              size="m"
              radius="s"
              title={
                <Text variant="heading-strong-s" onBackground="neutral-strong">
                  {item.q}
                </Text>
              }
            >
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                className="streaktap-body-copy"
              >
                {item.a}
              </Text>
            </Accordion>
          </ScrollReveal>
        ))}
      </Column>
    </Column>
  );
};

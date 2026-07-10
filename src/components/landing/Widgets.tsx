import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { landing } from "@/resources";
import { PhoneFrame } from "./PhoneFrame";
import { ScrollReveal } from "./ScrollReveal";

const WidgetPlaceholder = ({ index }: { index: number }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--neutral-alpha-weak)",
      border: "1px dashed var(--neutral-alpha-medium)",
    }}
  >
    <Text onBackground="neutral-weak" variant="body-default-s">
      Widget screenshot {index + 1}
    </Text>
  </div>
);

export const Widgets = () => {
  return (
    <Column fillWidth gap="64">
      <ScrollReveal translateY={8}>
        <Column gap="16" maxWidth={36}>
          <Heading as="h2" wrap="balance" className="streaktap-display-m">
            {landing.widgets.heading}
          </Heading>
          <Text
            onBackground="neutral-weak"
            wrap="balance"
            variant="body-default-l"
            className="streaktap-body-copy"
          >
            {landing.widgets.subline}
          </Text>
        </Column>
      </ScrollReveal>

      <Row
        gap="32"
        s={{ direction: "column" }}
        style={{ overflowX: "auto", maxWidth: "100%" }}
      >
        {landing.widgets.items.map((widget, index) => (
          <ScrollReveal
            key={widget.image}
            translateY={12}
            delay={index * 0.06}
            style={{ flex: "0 0 auto" }}
          >
            <Column gap="16" horizontal="center" style={{ flex: "0 0 auto" }}>
              <PhoneFrame width={230}>
                <WidgetPlaceholder index={index} />
              </PhoneFrame>
              <Text
                onBackground="neutral-weak"
                variant="body-default-s"
                wrap="balance"
                style={{ textAlign: "center", maxWidth: "230px" }}
              >
                {widget.caption}
              </Text>
            </Column>
          </ScrollReveal>
        ))}
      </Row>
    </Column>
  );
};

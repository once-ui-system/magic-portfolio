import { Icon, Row, Scroller, Text } from "@once-ui-system/core";
import { home } from "@/resources";

export function Ticker() {
  if (!home.ticker || home.ticker.length === 0) return null;

  return (
    <Row fillWidth paddingY="24" borderTop borderBottom aria-label="What I do">
      <Scroller auto={{ speed: "slow", hover: "pause", gap: 48 }} fillWidth fadeColor="page">
        <Row gap="48" vertical="center" paddingRight="48">
          {home.ticker.map((word) => (
            <Row key={word} gap="48" vertical="center">
              <Text textVariant="display-default-xs" onBackground="neutral-strong" wrap="nowrap">
                {word}
              </Text>
              <Icon name="sparkle" size="s" onBackground="brand-medium" aria-hidden />
            </Row>
          ))}
        </Row>
      </Scroller>
    </Row>
  );
}

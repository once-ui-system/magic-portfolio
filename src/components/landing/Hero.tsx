import { Column, Heading, RevealFx, Row, SmartLink, Text } from "@once-ui-system/core";
import Image from "next/image";
import { home, landing } from "@/resources";
import { AppStoreBadge } from "./AppStoreBadge";

export const Hero = () => {
  return (
    <Row
      fillWidth
      gap="64"
      vertical="center"
      paddingY="80"
      s={{ direction: "column", gap: "48" }}
    >
      <Column flex={1} gap="32" maxWidth={36}>
        <RevealFx translateY="4" speed="fast">
          <Text onBackground="neutral-weak" className="streaktap-eyebrow">
            {landing.eyebrow}
          </Text>
        </RevealFx>
        <RevealFx translateY="8" delay={0.05}>
          <Heading
            as="h1"
            wrap="balance"
            className="streaktap-display"
            onBackground="neutral-strong"
          >
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.15}>
          <Text
            onBackground="neutral-weak"
            wrap="balance"
            variant="body-default-xl"
            className="streaktap-body-copy"
          >
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx translateY="8" delay={0.25}>
          <Row gap="24" vertical="center" s={{ direction: "column", horizontal: "start" }}>
            <AppStoreBadge />
            <SmartLink href="#how-it-works" className="streaktap-tap">
              <Text variant="body-default-m" onBackground="neutral-weak">
                See how it works ↓
              </Text>
            </SmartLink>
          </Row>
        </RevealFx>
      </Column>

      <Column flex={1} horizontal="center">
        <RevealFx translateY="12" delay={0.2}>
          <div style={{ maxWidth: "400px", width: "100%", maxHeight: "780px" }}>
            <Image
              src={landing.heroImage}
              alt="StreakTap home screen showing a list of daily habits with streak counts"
              width={2546}
              height={1620}
              priority
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />
          </div>
        </RevealFx>
      </Column>
    </Row>
  );
};

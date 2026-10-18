import { Avatar, Button, Column, Heading, Row, Tag, Text } from "@once-ui-system/core";
import { RevealFx } from "@once-ui-system/fx";
import { about, home, person } from "@/resources";

export function HeroCentered() {
  return (
    <Column fillWidth horizontal="center" gap="m">
      <Column maxWidth="s" horizontal="center" align="center">
        {home.featured.display && (
          <RevealFx
            fillWidth
            horizontal="center"
            paddingTop="16"
            paddingBottom="32"
            paddingLeft="12"
          >
            <Tag
              variant="announce"
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Tag>
          </RevealFx>
        )}
        <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
          <Heading wrap="balance" textVariant="display-strong-l">
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={200} fillWidth horizontal="center" paddingBottom="32">
          <Text wrap="balance" onBackground="neutral-weak" textVariant="heading-default-xl">
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx paddingTop="12" delay={400} horizontal="center" paddingLeft="12">
          <Button
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            weight="default"
            arrowIcon
          >
            <Row gap="8" vertical="center" paddingRight="4">
              {about.avatar.display && (
                <Avatar
                  marginRight="8"
                  style={{ marginLeft: "-0.75rem" }}
                  src={person.avatar}
                  size="m"
                  aria-hidden
                />
              )}
              {about.title}
            </Row>
          </Button>
        </RevealFx>
      </Column>
    </Column>
  );
}

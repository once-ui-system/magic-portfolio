import { about, home, person, social } from "@/resources";
import { Avatar, Button, Column, Heading, Row, Text } from "@once-ui-system/core";

export function ContactStrip() {
  if (!home.contact) return null;

  const names = home.contact.links ?? [];
  const links =
    names.length > 0
      ? names.flatMap((name) => social.filter((item) => item.name === name && item.link))
      : social.filter((item) => item.essential && item.link);

  return (
    <Column
      fillWidth
      paddingY="48"
      gap="24"
      horizontal="center"
      align="center"
      borderTop
      borderBottom
      s={{ paddingY: "32" }}
    >
      {about.avatar.display && <Avatar src={person.avatar} size="l" aria-hidden />}
      <Column gap="12" horizontal="center" maxWidth="32rem">
        <Heading as="h2" textVariant="display-strong-xs" wrap="balance">
          {home.contact.title}
        </Heading>
        {home.contact.description && (
          <Text textVariant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {home.contact.description}
          </Text>
        )}
      </Column>
      {links.length > 0 && (
        <Row gap="12" wrap horizontal="center">
          {links.map((item, index) => (
            <Button
              key={item.name}
              href={item.link}
              prefixIcon={item.icon}
              variant={index === 0 ? "primary" : "secondary"}
              size="m"
              weight="default"
            >
              {item.name}
            </Button>
          ))}
        </Row>
      )}
    </Column>
  );
}

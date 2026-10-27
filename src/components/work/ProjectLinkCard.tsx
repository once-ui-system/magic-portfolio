"use client";

import { Card, Column, Icon, type IconName, Media, Row, Text } from "@once-ui-system/core";

interface ProjectLinkCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  href: string;
  /** Small label above the title, e.g. "Next project". */
  label: string;
  title: string;
  /** Cover thumbnail. */
  image?: string;
  /** Icon beside the label. Defaults to a chevron pointing the way the card leads. */
  icon?: IconName;
  /** "end" mirrors the card for a "next" link: text on the right, chevron pointing on. */
  align?: "start" | "end";
}

/** A compact link to a project: cover thumbnail, a small label and the title. */
export function ProjectLinkCard({
  href,
  label,
  title,
  image,
  icon,
  align = "start",
  ...flex
}: ProjectLinkCardProps) {
  const end = align === "end";
  return (
    <Card
      fillWidth
      href={href}
      transition="micro-medium"
      direction={end ? "row-reverse" : "row"}
      vertical="center"
      border="transparent"
      background="transparent"
      padding="8"
      gap="16"
      radius="l-4"
      {...flex}
    >
      {image && (
        <Row width="8rem" style={{ flexShrink: 0 }}>
          <Media
            src={image}
            alt=""
            sizes="160px"
            aspectRatio="16 / 9"
            radius="m"
            border="neutral-alpha-weak"
            cursor="interactive"
          />
        </Row>
      )}
      <Column fillWidth gap="4" horizontal={end ? "end" : "start"} align={end ? "right" : "left"}>
        <Row gap="4" vertical="center" direction={end ? "row-reverse" : "row"}>
          <Icon
            name={icon ?? (end ? "chevronRight" : "chevronLeft")}
            size="xs"
            onBackground="neutral-weak"
          />
          <Text textVariant="label-default-s" onBackground="neutral-weak">
            {label}
          </Text>
        </Row>
        <Text textVariant="heading-strong-s" wrap="balance">
          {title}
        </Text>
      </Column>
    </Card>
  );
}

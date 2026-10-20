import { Heading, Row, SmartLink, Text } from "@once-ui-system/core";

interface SectionHeaderProps {
  title: string;
  link?: { href: string; label: string };
}

export function SectionHeader({ title, link }: SectionHeaderProps) {
  return (
    <Row fillWidth vertical="end" horizontal="between" gap="16" paddingBottom="8">
      <Heading as="h2" textVariant="display-strong-xs">
        {title}
      </Heading>
      {link && (
        <SmartLink href={link.href} suffixIcon="arrowRight">
          <Text textVariant="label-default-m">{link.label}</Text>
        </SmartLink>
      )}
    </Row>
  );
}

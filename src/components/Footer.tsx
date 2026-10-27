import { about, blog, footer, gallery, home, person, routes, social, work } from "@/resources";
import { cityFromTimeZone } from "@/utils/cityFromTimeZone";
import { Column, Grid, Icon, IconButton, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./Footer.module.scss";
import TimeDisplay from "./Header";

type FooterColumn = { title: string; links: { label: string; href: string }[] };

// The columns footer: Pages (enabled routes) and Connect (social links), each with its title and
// switch in footer.pages / footer.connect, then any extra columns from content.tsx.
function linkColumns(): FooterColumn[] {
  const pages = [home, about, work, blog, gallery]
    .filter((page) => routes[page.path as keyof typeof routes])
    .map((page) => ({ label: page.label, href: page.path }));
  const connect = social
    .filter((item) => item.link)
    .map((item) => ({ label: item.name, href: item.link }));

  return [
    ...(footer.pages?.display === false
      ? []
      : [{ title: footer.pages?.title ?? "Pages", links: pages }]),
    ...(footer.connect?.display === false
      ? []
      : [{ title: footer.connect?.title ?? "Connect", links: connect }]),
    ...(footer.columns ?? []),
  ].filter((column) => column.links.length > 0);
}

function FooterColumns() {
  const columns = linkColumns();
  const city = cityFromTimeZone(person.location);
  const gridColumns = Math.min(Math.max(columns.length, 1), 4) as 1 | 2 | 3 | 4;

  return (
    <Row
      maxWidth="m"
      paddingX="16"
      paddingTop="40"
      paddingBottom="32"
      gap="40"
      borderTop
      s={{ direction: "column", gap: "32", paddingTop: "32" }}
    >
      <Column flex={2} gap="8">
        <Text textVariant="heading-strong-l" onBackground="neutral-strong">
          {person.name}
        </Text>
        <Text textVariant="body-default-s" onBackground="neutral-weak">
          {person.role}
        </Text>
        {footer.localTime && (
          <Row
            gap="8"
            vertical="center"
            marginTop="8"
            textVariant="label-default-s"
            onBackground="neutral-weak"
          >
            <Icon name="globe" size="xs" aria-hidden />
            {city && <Text>{city}</Text>}
            <Text onBackground="neutral-strong" suppressHydrationWarning>
              <TimeDisplay timeZone={person.location} />
            </Text>
          </Row>
        )}
      </Column>
      <Column flex={3}>
        <Grid fillWidth columns={gridColumns} gap="24" s={{ columns: 2 }}>
          {columns.map((column) => (
            <Column key={column.title} gap="12">
              <Text textVariant="label-strong-s" onBackground="neutral-strong">
                {column.title}
              </Text>
              <Column as="ul" gap="8">
                {column.links.map((link) => (
                  <Row as="li" key={link.href} textVariant="body-default-s">
                    <SmartLink href={link.href} unstyled className={styles.link}>
                      {link.label}
                    </SmartLink>
                  </Row>
                ))}
              </Column>
            </Column>
          ))}
        </Grid>
      </Column>
    </Row>
  );
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const columns = footer.variant === "columns";

  return (
    <Row
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      direction={columns ? "column" : undefined}
      s={{ direction: "column" }}
    >
      {columns && (
        <Row fillWidth horizontal="center">
          <FooterColumns />
        </Row>
      )}
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text textVariant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text
            style={{ paddingRight: "var(--static-space-4)", paddingLeft: "var(--static-space-4)" }}
          >
            {person.name}
          </Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            / Build your portfolio with{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
        {!columns && (
          <Row gap="16">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Row>
        )}
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};

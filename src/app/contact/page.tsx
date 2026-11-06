import { Button, Column, Flex, Heading, Icon, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person, social, contactPage } from "@/app/resources/content";
import { ContactForm } from "@/components/Contactform";
import { ResumeButtons } from "@/components/ResumeButtons";

export async function generateMetadata() {
  const title = contactPage.title;
  const description = contactPage.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/contact`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Contact() {
  const links = social.filter((item) => item.link && !item.link.startsWith("mailto:"));

  return (
    <Column maxWidth="m" gap="xl">
      <Column fillWidth gap="m" paddingX="l">
        <Heading variant="display-strong-l" wrap="balance">
          {contactPage.title}
        </Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
          {contactPage.intro}
        </Text>
      </Column>

      <Flex fillWidth gap="24" paddingX="l" mobileDirection="column">
        <Column flex={2} gap="16">
          <Column
            fillWidth
            gap="8"
            padding="l"
            radius="l"
            border="neutral-alpha-medium"
            background="surface"
          >
            <Flex gap="8" vertical="center">
              <Icon name="email" onBackground="brand-weak" />
              <Text variant="label-default-s" onBackground="neutral-weak">
                Email
              </Text>
            </Flex>
            <Text variant="body-strong-m" style={{ wordBreak: "break-all" }}>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </Text>
          </Column>
          <Column
            fillWidth
            gap="8"
            padding="l"
            radius="l"
            border="neutral-alpha-medium"
            background="surface"
          >
            <Flex gap="8" vertical="center">
              <Icon name="phone" onBackground="brand-weak" />
              <Text variant="label-default-s" onBackground="neutral-weak">
                Phone
              </Text>
            </Flex>
            <Text variant="body-strong-m">
              <a href={`tel:${person.phone.replace(/\s+/g, "")}`}>{person.phone}</a>
            </Text>
          </Column>
          <Column
            fillWidth
            gap="8"
            padding="l"
            radius="l"
            border="neutral-alpha-medium"
            background="surface"
          >
            <Flex gap="8" vertical="center">
              <Icon name="mapPin" onBackground="brand-weak" />
              <Text variant="label-default-s" onBackground="neutral-weak">
                Location
              </Text>
            </Flex>
            <Text variant="body-strong-m">{person.locationLabel} (remote-friendly)</Text>
          </Column>
          {links.length > 0 && (
            <Flex gap="8" wrap>
              {links.map((item) => (
                <Button
                  key={item.name}
                  href={item.link}
                  prefixIcon={item.icon}
                  label={item.name}
                  size="s"
                  variant="secondary"
                />
              ))}
            </Flex>
          )}
          <ResumeButtons size="s" label="CV" />
        </Column>

        <Column flex={3}>
          <ContactForm />
        </Column>
      </Flex>
    </Column>
  );
}

import { Button, Column, Flex, Heading, Icon, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person, about, experience } from "@/app/resources/content";
import styles from "./experience.module.scss";

export async function generateMetadata() {
  const title = experience.title;
  const description = experience.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/experience`,
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

export default function Experience() {
  const experiences = about.work.experiences;
  const institutions = about.studies.institutions;

  return (
    <Column maxWidth="m" gap="xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            url: `https://${baseURL}/experience`,
            worksFor: experiences.map((item) => ({
              "@type": "Organization",
              name: item.company,
            })),
            alumniOf: institutions.map((item) => ({
              "@type": "EducationalOrganization",
              name: item.name,
            })),
          }),
        }}
      />

      <Column fillWidth gap="m" paddingX="l">
        <Heading variant="display-strong-l" wrap="balance">
          {experience.title}
        </Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
          {experience.intro}
        </Text>
        {person.resume && (
          <Flex paddingTop="8">
            <Button
              href={person.resume}
              prefixIcon="download"
              label="Download CV (PDF)"
              size="m"
              variant="secondary"
              data-border="rounded"
            />
          </Flex>
        )}
      </Column>

      <Column fillWidth paddingX="l" gap="m">
        <Heading as="h2" variant="display-strong-xs" marginBottom="m">
          Work experience
        </Heading>
        <Column fillWidth className={styles.timeline}>
          {experiences.map((item, index) => (
            <Flex
              key={`${item.company}-${index}`}
              fillWidth
              gap="24"
              className={styles.item}
              paddingBottom="xl"
            >
              <Column className={styles.rail} horizontal="center">
                <Flex className={styles.dot} background="brand-strong" radius="full" />
                {index < experiences.length - 1 && (
                  <Flex className={styles.line} background="neutral-alpha-medium" />
                )}
              </Column>
              <Column fillWidth gap="8">
                <Flex fillWidth horizontal="space-between" vertical="start" mobileDirection="column" gap="4">
                  <Column gap="4">
                    <Text variant="heading-strong-l">{item.company}</Text>
                    <Text variant="body-default-m" onBackground="brand-weak">
                      {item.role}
                    </Text>
                  </Column>
                  <Column gap="4" horizontal="end" className={styles.meta}>
                    <Text variant="label-default-m" onBackground="neutral-weak">
                      {item.timeframe}
                    </Text>
                    {item.location && (
                      <Flex gap="4" vertical="center">
                        <Icon name="mapPin" size="xs" onBackground="neutral-weak" />
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {item.location}
                        </Text>
                      </Flex>
                    )}
                  </Column>
                </Flex>
                <Column as="ul" gap="8" paddingTop="8">
                  {item.achievements.map((achievement: JSX.Element, i: number) => (
                    <Text as="li" variant="body-default-m" key={`${item.company}-${i}`}>
                      {achievement}
                    </Text>
                  ))}
                </Column>
                {item.skills && item.skills.length > 0 && (
                  <Flex fillWidth paddingTop="8" gap="8" wrap>
                    {item.skills.map((skill: string) => (
                      <Tag key={skill} size="m" variant="neutral">
                        {skill}
                      </Tag>
                    ))}
                  </Flex>
                )}
              </Column>
            </Flex>
          ))}
        </Column>
      </Column>

      <Column fillWidth paddingX="l" gap="m" marginBottom="40">
        <Heading as="h2" variant="display-strong-xs" marginBottom="m">
          Education
        </Heading>
        <Column fillWidth gap="l">
          {institutions.map((institution, index) => (
            <Column
              key={`${institution.name}-${index}`}
              fillWidth
              gap="4"
              padding="l"
              radius="l"
              border="neutral-alpha-medium"
              background="surface"
            >
              <Text variant="heading-strong-m">{institution.name}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {institution.description}
              </Text>
            </Column>
          ))}
        </Column>
      </Column>
    </Column>
  );
}

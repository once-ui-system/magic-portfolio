import { Column, Flex, Heading, Text, RevealFx, Tag, Icon, Avatar, Arrow, Button } from "@/once-ui/components";
import { Resources } from "@/components/agileResources/Resources";
import { baseURL } from "@/app/resources";
import { about,agileResources, person} from "@/app/resources/content";
import styles from "@/components/agileResources/Resources.module.scss";

export async function generateMetadata() {
  const title = agileResources.title;
  const description = agileResources.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/agile`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Agile() {
  return (
    <Column maxWidth="m">      
      <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: agileResources.title,
              description: agileResources.description,
              url: `https://${baseURL}/agile`,
              image: `${baseURL}/og?title=${encodeURIComponent(agileResources.title)}`,
              author: {
                "@type": "Person",
                name: person.name,
                image: {
                  "@type": "ImageObject",
                  url: `${baseURL}${person.avatar}`,
                },
              },
            }),
          }}
        />
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column fillWidth paddingY="l" gap="m">
            <Column maxWidth="s">
              <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
                <Heading marginBottom="s" variant="display-strong-s">
                  {agileResources.intro.title}
                </Heading>
              </RevealFx>
              <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
                <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                  {agileResources.intro.description}
                </Text>
              </RevealFx>
            </Column>
            {agileResources.intro.manifesto.display && (
              <>
              <Heading
                as="h3"
                id={agileResources.intro.manifesto.title}
                variant="heading-strong-xl"
                marginBottom="s"
              >
                {agileResources.intro.manifesto.title}
              </Heading>

              <Column fillWidth flex={1}>
                <Resources range={[1, 2]} thumbnail={true} />
              </Column>
              </>
            )}
            {agileResources.intro.psm.display && (
              <>
              <Heading
                as="h3"
                id={agileResources.intro.psm.title}
                variant="heading-strong-xl"
                marginBottom="s"
              >
                {agileResources.intro.psm.title}
              </Heading>

              <Column fillWidth flex={1}>
              <Resources range={[3, 3]} columns="2" />
            </Column>
              </>
            )}
            {agileResources.intro.safe.display && (
              <>
              <Heading
                as="h3"
                id={agileResources.intro.safe.title}
                variant="heading-strong-xl"
                marginBottom="s"
              >
                {agileResources.intro.safe.title}
              </Heading>

              <Column fillWidth flex={1}>
              <Resources range={[8]} columns="2" />
            </Column>
              </>
            )}
          </Column>
        </Column>
      </Flex>
    </Column>
  );
}
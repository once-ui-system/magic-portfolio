import React from "react";
import { Heading, Tag, Icon, Flex, Text, Button, Avatar, RevealFx, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import Acknowledgement from "@/components/Acknowledgement";
import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { Resources } from "@/components/agileResources/Resources";
import styles from "@/components/about/About.module.scss";

const OverviewSkillsChart = React.lazy(() => import("@/components/skills/OverviewSkillsChart"));

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

export default function Home() {
  return (
    <>
      <Acknowledgement />
    
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
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
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="m">
        <Flex fillWidth mobileDirection="column" paddingY="s" horizontal="end">
              {about.avatar.display && (
              <Column
                className={styles.avatar}
                minWidth="160"
                paddingX="l"
                paddingBottom="m"
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
            </Flex>
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} horizontal="start" fillWidth paddingBottom="m">
            <Column maxWidth="s">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
            </Column>
            
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      {routes["/work"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex direction="column" gap="s" align="start" flex={1}>
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Projects
            </Heading>
            <Button 
              id="projects" 
              data-border="rounded"
              variant="secondary"
              size="s"
              arrowIcon
              href="/work"
            >
              Explore Projects
              </Button>
          </Flex>
          <Flex flex={2} paddingX="20">
            <Projects range={[1, 1]} />
          </Flex>
        </Flex>
      )}
      {routes["/skills"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex direction="column" gap="s" align="start" flex={1}>
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Tech Skills
            </Heading>
            <Button 
              id="skills" 
              data-border="rounded"
              variant="secondary"
              size="s"
              arrowIcon
              href="/skills"
            >
            Explore Skills
            </Button>
          </Flex>
          <Flex flex={2} paddingX="20">
            <OverviewSkillsChart />
          </Flex>
        </Flex>
      )}
      {routes["/agile"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex direction="column" gap="s" align="start" flex={1}>
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Agile Resources
            </Heading>
            <Button 
              id="skills" 
              data-border="rounded"
              variant="secondary"
              size="s"
              arrowIcon
              href="/agile"
            >
            Explore Resources
            </Button>
          </Flex>
          <Flex flex={2} paddingX="20">
            <Resources range={[3, 3]} thumbnail={true} />
          </Flex>
        </Flex>
      )}
    </Column>
    </>
  );
}

import React from "react";
import OverviewSkillsChart from "@/components/skills/OverviewSkillsChart";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import Acknowledgement from "@/components/Acknowledgement";
import { baseURL, routes } from "@/app/resources";
import { home, about, person, agileResources, work, skills } from "@/app/resources/content";
import { Resources } from "@/components/agileResources/Resources";

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
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
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
            <Projects range={[0, 1]} />
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
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Agile Resources
            </Heading>
          </Flex>
          <Flex flex={2} paddingX="20">
            <Resources range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
    </Column>
    </>
  );
}

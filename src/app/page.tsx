import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, experience } from "@/app/resources/content";
import { ResumeButtons } from "@/components/ResumeButtons";


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
            <Heading wrap="balance" variant="display-strong-l" className="text-sm" style={{ fontSize: "2.5rem" }}>
              {/* {home.headline} */}
              MOHAMED OUCHARROU
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Flex gap="12" wrap vertical="center">
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
              <ResumeButtons size="m" />
            </Flex>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/experience"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest experience
            </Heading>
          </Flex>
          <Column flex={3} paddingX="20" gap="16">
            {about.work.experiences.slice(0, 2).map((item) => (
              <Column
                key={item.company}
                fillWidth
                gap="4"
                padding="m"
                radius="l"
                border="neutral-alpha-medium"
                background="surface"
              >
                <Flex fillWidth horizontal="space-between" gap="8" mobileDirection="column">
                  <Text variant="heading-strong-m">{item.company}</Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {item.timeframe}
                  </Text>
                </Flex>
                <Text variant="body-default-s" onBackground="brand-weak">
                  {item.role}
                </Text>
              </Column>
            ))}
            <Flex>
              <Button href="/experience" variant="tertiary" size="s" arrowIcon label={`All ${experience.label.toLowerCase()}`} />
            </Flex>
          </Column>
        </Flex>
      )}
      <Projects range={[2]} />
    </Column>
  );
}

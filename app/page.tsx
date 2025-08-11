import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { home, about, person, emailForm, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components/Mailchimp";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import Image from "next/image";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/utils/utils";
import Testimonials from "@/components/testimonials";

export default function Home() {
  const testimonialsPost = getPosts(["./", "app"]).find(
    (p) => p.slug === "testimonials-as-code"
  );

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="start"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx
            paddingTop="12"
            delay={0.4}
            horizontal="start"
            paddingLeft="12"
          >
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>

            <Button
              id="upwork"
              data-border="rounded"
              href="https://www.upwork.com/freelancers/~01be2bea8b5cce7b15"
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
              className="ml-4"
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {/* Light mode icon */}
                <Image
                  src="/images/upwork-light.svg"
                  alt="Upwork"
                  width={60}
                  height={60}
                  className="block dark:hidden"
                />
                {/* Dark mode icon */}
                <Image
                  src="/images/upwork-dark.svg"
                  alt="Upwork"
                  width={60}
                  height={60}
                  className="hidden dark:block"
                />
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {/* {testimonialsPost && (
        <Column as="section" fillWidth>
          <Text className="text-center mb-10 text-4xl font-medium lg:text-5xl">
            Loved by the Community{" "}
          </Text>
          <CustomMDX source={testimonialsPost.content} />
        </Column>
      )} */}
      <Testimonials />
      {emailForm.display && <Mailchimp emailForm={emailForm} />}
    </Column>
  );
}

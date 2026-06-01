import React from "react";
import {
  Heading,
  Text,
  RevealFx,
  Column,
  Schema,
  Meta,
  Row,
  Flex,
  Button,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, work, blog } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { Hero } from "@/components/Hero";
import { Mailchimp } from "@/components";
import { LiveGithub } from "@/components/LiveGithub";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="l" horizontal="center">
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

      <Hero />

      <Column fillWidth gap="32" paddingY="32" paddingX="l">
        <Column fillWidth gap="32">
          <Row fillWidth horizontal="between" vertical="end" paddingX="l">
            <Heading as="h2" variant="display-strong-s">
              Featured Projects
            </Heading>
            <Button
              href={work.path}
              variant="secondary"
              size="s"
              suffixIcon="arrowRight"
            >
              View all
            </Button>
          </Row>
          <Projects posts={allProjects} range={[1, 6]} display="grid" />
        </Column>

        {routes["/blog"] && (
          <Column fillWidth gap="40">
            <Row fillWidth horizontal="between" vertical="end" paddingX="l">
              <Heading as="h2" variant="display-strong-s">
                Latest from the blog
              </Heading>
              <Button
                href={blog.path}
                variant="secondary"
                size="s"
                suffixIcon="arrowRight"
              >
                View all
              </Button>
            </Row>
            <Flex fillWidth paddingX="20">
              <Posts range={[1, 4]} columns="2" thumbnail={false} />
            </Flex>
          </Column>
        )}

        <LiveGithub />

        <Mailchimp />
      </Column>
    </Column>
  );
}

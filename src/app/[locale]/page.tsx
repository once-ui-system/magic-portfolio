import React from "react";
import {
  Heading,
  Column,
  Schema,
  Meta,
  Row,
  Button,
} from "@once-ui-system/core";
import { getDictionary } from "@/resources/content";
import { baseURL } from "@/resources";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

const pastWork = [
  {
    label: "Kadena Snap",
    href: "https://github.com/mindsend-datatech/kadena-snap",
  },
  {
    label: "Saga Indexer",
    href: "https://github.com/mindsend-datatech/sagaindexer",
  },
  {
    label: "SNAK docs",
    href: "https://github.com/mindsend-datatech/snak-docs",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { home } = getDictionary(locale);

  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { home, about, person } = dict;
  const proofHeading = locale === "pt-BR" ? "Prova" : "Proof";

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

      <Hero dict={dict} locale={locale} />

      <Services dict={dict} locale={locale} />

      <Column fillWidth gap="16" paddingY="64" paddingX="l" horizontal="center">
        <Heading as="h2" variant="display-default-s">
          {proofHeading}
        </Heading>
        <Row gap="12" wrap horizontal="center">
          {pastWork.map((repo) => (
            <Button
              key={repo.href}
              href={repo.href}
              variant="secondary"
              size="s"
              prefixIcon="github"
              suffixIcon="arrowUpRight"
            >
              {repo.label}
            </Button>
          ))}
        </Row>
      </Column>
    </Column>
  );
}

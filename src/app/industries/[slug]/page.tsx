import { notFound } from "next/navigation";
import { CustomMDX } from "@/components";
import { Meta, Schema, Button, Column, Heading, Text, Row } from "@once-ui-system/core";
import Script from "next/script";
import { baseURL, about, industries as industriesCfg, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { formatDate } from "@/utils/formatDate";
import type { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "industries", "pages"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";

  const posts = getPosts(["src", "app", "industries", "pages"]);
  const post = posts.find((p) => p.slug === slugPath);
  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${industriesCfg.path}/${post.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "industries", "pages"]).find((p) => p.slug === slugPath);
  if (!post) notFound();

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Script id="jsonld-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: post.metadata.title,
        description: post.metadata.summary,
        url: `${baseURL}${industriesCfg.path}/${post.slug}`
      }) }} />
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${industriesCfg.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href={industriesCfg.path} variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Industries
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        {post.metadata.publishedAt && (
          <Row gap="12" vertical="center">
            <Text variant="body-default-s" onBackground="neutral-weak">{formatDate(post.metadata.publishedAt)}</Text>
          </Row>
        )}
      </Column>
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
    </Column>
  );
}

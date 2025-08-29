import { notFound } from "next/navigation";
import { CustomMDX } from "@/components";
import { Meta, Schema, Button, Column, Heading } from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import type { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "case-studies", "pages"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string | string[] }> }): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "case-studies", "pages"]).find((p) => p.slug === slugPath);
  if (!post) return {};
  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `/case-studies/${post.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "case-studies", "pages"]).find((p) => p.slug === slugPath);
  if (!post) notFound();

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`/case-studies/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{ name: person.name, url: `${baseURL}${about.path}`, image: `${baseURL}${person.avatar}` }}
      />
      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href="/case-studies" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">Case Studies</Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
    </Column>
  );
}


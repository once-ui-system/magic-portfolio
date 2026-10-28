import { notFound } from "next/navigation";
import { isRouteEnabled } from "@/utils/routes";
import "katex/dist/katex.min.css";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
  Tag,
} from "@once-ui-system/core";
import { baseURL, blog, features, person, work, routes } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { countWords, getPosts, readingTime } from "@/utils/utils";
import { articleMetadata } from "@/utils/seo";
import { ArticleSchema } from "@/components/seo";
import { ViewCount } from "@/components/blog/ViewCount";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { MobileToc } from "@/components/blog/MobileToc";
import { ResumeReading } from "@/components/blog/ResumeReading";
import { QuoteShare } from "@/components/blog/QuoteShare";
import { ProjectLinkCard } from "@/components/work/ProjectLinkCard";
import { getProjectCover, getProjectsForPost } from "@/utils/projects";
import { LikeButton } from "@/components/blog/LikeButton";

// Only the slugs built below exist: anything else (a draft in production, a
// mistyped URL) is a real 404 instead of a not-found page served with 200.
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // A section switched off in `routes` builds no pages; every slug returns 404.
  if (!isRouteEnabled("/blog")) return [];

  const posts = getPosts(["src", "app", "blog", "posts"], { includeDrafts: true });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"], { includeDrafts: true });
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return articleMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `${blog.path}/${post.slug}`,
    image: post.metadata.image,
    publishedAt: post.metadata.publishedAt,
    updatedAt: post.metadata.updatedAt,
    tag: typeof post.metadata.tag === "string" ? post.metadata.tag : undefined,
    // Drafts only render in `next dev`, but keep them out of search all the same
    noindex: post.metadata.draft,
    nofollow: post.metadata.draft,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "blog", "posts"], { includeDrafts: true }).find(
    (post) => post.slug === slugPath,
  );

  if (!post || !isRouteEnabled("/blog")) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const { publishedAt, updatedAt } = post.metadata;
  // Labels from blog.postMeta in content.tsx, with English defaults
  const updatedLabel = blog.postMeta?.updated ?? "Updated";
  const readingTimeLabel = blog.postMeta?.readingTime ?? ((minutes) => `${minutes} min read`);
  const dot = (
    <Text aria-hidden textVariant="body-default-xs" onBackground="neutral-weak">
      ·
    </Text>
  );
  // Projects that list this post under `related` in their front matter. They link to /work and
  // pair with "Related writing" on /blog, so both routes have to be on.
  const fromProjects =
    (features.relatedWriting ?? true) && routes["/blog"] !== false && routes["/work"] !== false
      ? getProjectsForPost(post.slug)
      : [];

  return (
    <Row fillWidth>
      <Row maxWidth="12rem" m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <ArticleSchema
            path={`${blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={publishedAt}
            dateModified={updatedAt}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            section={typeof post.metadata.tag === "string" ? post.metadata.tag : undefined}
            wordCount={countWords(post.content)}
            breadcrumbs={[
              { name: blog.label, path: blog.path },
              { name: post.metadata.title, path: `${blog.path}/${post.slug}` },
            ]}
          />
          {(features.readingProgress ?? true) && <ReadingProgress />}
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            {post.metadata.draft && (
              <Tag tone="warning" prefixIcon="eyeOff" label="Draft · only visible in development" />
            )}
            <SmartLink href="/blog">
              <Text textVariant="label-strong-m">Blog</Text>
            </SmartLink>
            <Row gap="8" wrap vertical="center" horizontal="center" marginBottom="12">
              <Text textVariant="body-default-xs" onBackground="neutral-weak">
                {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
              </Text>
              {updatedAt && updatedAt !== publishedAt && (
                <>
                  {dot}
                  <Text textVariant="body-default-xs" onBackground="neutral-weak">
                    {updatedLabel} <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
                  </Text>
                </>
              )}
              {(features.readingTime ?? true) && (
                <>
                  {dot}
                  <Text textVariant="body-default-xs" onBackground="neutral-weak">
                    {readingTimeLabel(readingTime(post.content))}
                  </Text>
                </>
              )}
              <ViewCount slug={post.slug} />
            </Row>
            <Heading textVariant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text
                textVariant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: "italic" }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} aria-label={person.name} />
              <Text textVariant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          {(features.mobileToc ?? true) && <MobileToc maxWidth="s" />}
          <Column as="article" maxWidth="s" data-post-body>
            <CustomMDX source={post.content} />
          </Column>

          <LikeButton slug={post.slug} fillWidth />

          <ShareSection title={post.metadata.title} url={`${baseURL}${blog.path}/${post.slug}`} />
          {(features.quoteShare ?? true) && (
            <QuoteShare title={post.metadata.title} url={`${baseURL}${blog.path}/${post.slug}`} />
          )}

          {fromProjects.length > 0 && (
            <Column fillWidth maxWidth="s" gap="8">
              {fromProjects.map((project) => (
                <ProjectLinkCard
                  key={project.slug}
                  href={`${work.path}/${project.slug}`}
                  label={work.relatedWriting?.fromProject ?? "From the project"}
                  title={project.metadata.title}
                  image={getProjectCover(project.metadata.images)}
                  icon="rocket"
                />
              ))}
            </Column>
          )}

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" textVariant="heading-strong-xl" marginBottom="24">
              Recent posts
            </Text>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
          </Column>
          <ScrollToHash />
          {(features.resumeReading ?? true) && <ResumeReading />}
        </Column>
      </Row>
      <Column
        maxWidth="12rem"
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}

import { notFound } from "next/navigation";
import { isRouteEnabled } from "@/utils/routes";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import {
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  HeadingNav,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Tag,
  Grid,
} from "@once-ui-system/core";
import { baseURL, features, person, work, routes } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { MobileToc } from "@/components/blog/MobileToc";
import { ResumeReading } from "@/components/blog/ResumeReading";
import { QuoteShare } from "@/components/blog/QuoteShare";
import { ArticleSchema } from "@/components/seo";
import { articleMetadata } from "@/utils/seo";
import Post from "@/components/blog/Post";
import { ProjectLinkCard } from "@/components/work/ProjectLinkCard";
import { getProjectCover, getProjectNeighbours, getRelatedPosts } from "@/utils/projects";

// Only the slugs built below exist: anything else (a draft in production, a
// mistyped URL) is a real 404 instead of a not-found page served with 200.
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // A section switched off in `routes` builds no pages; every slug returns 404.
  if (!isRouteEnabled("/work")) return [];

  const posts = getPosts(["src", "app", "work", "projects"], { includeDrafts: true });
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

  const posts = getPosts(["src", "app", "work", "projects"], { includeDrafts: true });
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return articleMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `${work.path}/${post.slug}`,
    image: post.metadata.image,
    publishedAt: post.metadata.publishedAt,
    updatedAt: post.metadata.updatedAt,
    // Drafts only render in `next dev`, but keep them out of search all the same
    noindex: post.metadata.draft,
    nofollow: post.metadata.draft,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"], { includeDrafts: true }).find(
    (post) => post.slug === slugPath,
  );

  if (!post || !isRouteEnabled("/work")) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
      "aria-label": person.name,
    })) || [];

  // The "On this page" sidebar, as on blog posts; the spacer keeps the content centred
  const sidebar = features.projectToc ?? true;
  // Related posts link into /blog, previous/next into /work: each hides with its route.
  const relatedPosts =
    (features.relatedWriting ?? true) && routes["/blog"] !== false
      ? getRelatedPosts(post.metadata.related)
      : [];
  const { previous, next } =
    (features.projectNavigation ?? true) && routes["/work"] !== false
      ? getProjectNeighbours(post.slug)
      : { previous: undefined, next: undefined };

  return (
    <Row fillWidth>
      {sidebar && <Row maxWidth="12rem" m={{ hide: true }} />}
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l">
          <ArticleSchema
            as="CreativeWork"
            path={`${work.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.updatedAt}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            breadcrumbs={[
              { name: work.label, path: work.path },
              { name: post.metadata.title, path: `${work.path}/${post.slug}` },
            ]}
          />
          {(features.readingProgress ?? true) && <ReadingProgress />}
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            {post.metadata.draft && (
              <Tag tone="warning" prefixIcon="eyeOff" label="Draft · only visible in development" />
            )}
            <SmartLink href="/work">
              <Text textVariant="label-strong-m">Projects</Text>
            </SmartLink>
            <Text textVariant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
            <Heading textVariant="display-strong-m">{post.metadata.title}</Heading>
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
              <Text textVariant="label-default-m" onBackground="brand-weak">
                {post.metadata.team?.map((member, idx) => (
                  <span key={idx}>
                    {idx > 0 && (
                      <Text as="span" onBackground="neutral-weak">
                        ,{" "}
                      </Text>
                    )}
                    <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                  </span>
                ))}
              </Text>
            </Row>
          </Row>
          {post.metadata.images.length > 0 && (
            <Media
              priority
              aspectRatio="16 / 9"
              radius="m"
              alt="image"
              src={post.metadata.images[0]}
            />
          )}
          {(features.mobileToc ?? true) && <MobileToc maxWidth="xs" />}
          <Column style={{ margin: "auto" }} as="article" maxWidth="xs" data-post-body>
            <CustomMDX source={post.content} />
          </Column>
          {(features.quoteShare ?? true) && (
            <QuoteShare title={post.metadata.title} url={`${baseURL}${work.path}/${post.slug}`} />
          )}
          {relatedPosts.length > 0 && (
            <Column fillWidth gap="40" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Heading as="h2" textVariant="heading-strong-xl" marginBottom="24" data-exclude-nav>
                {work.relatedWriting?.title ?? "Related writing"}
              </Heading>
              <Grid
                columns={relatedPosts.length > 1 ? "2" : "1"}
                s={{ columns: 1 }}
                maxWidth={relatedPosts.length > 1 ? undefined : "s"}
                fillWidth
                gap="16"
              >
                {relatedPosts.map((relatedPost) => (
                  <Post key={relatedPost.slug} post={relatedPost} thumbnail direction="column" />
                ))}
              </Grid>
            </Column>
          )}
          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Heading as="h2" textVariant="heading-strong-xl" marginBottom="24">
              Related projects
            </Heading>
            <Projects exclude={[post.slug]} range={[2]} />
          </Column>
          {(previous || next) && (
            <Column
              as="nav"
              aria-label={work.projectNavigation?.label ?? "More projects"}
              fillWidth
              gap="24"
              horizontal="center"
            >
              <Line maxWidth="40" />
              <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16" paddingX="l">
                {previous ? (
                  <ProjectLinkCard
                    href={`${work.path}/${previous.slug}`}
                    label={work.projectNavigation?.previous ?? "Previous project"}
                    title={previous.metadata.title}
                    image={getProjectCover(previous.metadata.images)}
                  />
                ) : (
                  <Row s={{ hide: true }} />
                )}
                {next && (
                  <ProjectLinkCard
                    href={`${work.path}/${next.slug}`}
                    label={work.projectNavigation?.next ?? "Next project"}
                    title={next.metadata.title}
                    image={getProjectCover(next.metadata.images)}
                    align="end"
                  />
                )}
              </Grid>
            </Column>
          )}
          <ScrollToHash />
          {(features.resumeReading ?? true) && <ResumeReading />}
        </Column>
      </Row>
      {sidebar && (
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
      )}
    </Row>
  );
}

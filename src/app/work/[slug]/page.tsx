import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Grid,
} from "@once-ui-system/core";
import { baseURL, about, person, work, features, routes } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import Post from "@/components/blog/Post";
import { ProjectLinkCard } from "@/components/work/ProjectLinkCard";
import { getProjectCover, getProjectNeighbours, getRelatedPosts } from "@/utils/projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
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

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
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

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
      "aria-label": person.name,
    })) || [];

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
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
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
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
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
    </Column>
  );
}

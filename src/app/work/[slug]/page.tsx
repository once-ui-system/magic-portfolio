import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import {
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
} from "@once-ui-system/core";
import { work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { ArticleSchema } from "@/components/seo";
import { articleMetadata } from "@/utils/seo";

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

  return articleMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `${work.path}/${post.slug}`,
    image: post.metadata.image,
    publishedAt: post.metadata.publishedAt,
    updatedAt: post.metadata.updatedAt,
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

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <ArticleSchema
        as="CreativeWork"
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        breadcrumbs={[
          { name: work.label, path: work.path },
          { name: post.metadata.title, path: `${work.path}/${post.slug}` },
        ]}
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
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" textVariant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}

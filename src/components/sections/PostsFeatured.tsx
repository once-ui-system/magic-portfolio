import { blog, home, routes } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getSortedPosts } from "@/utils/utils";
import { Card, Column, Heading, Line, Media, Row, Text } from "@once-ui-system/core";
import { SectionHeader } from "./SectionHeader";

interface PostsFeaturedProps {
  range?: [number, number?];
}

export function PostsFeatured({ range = [1, 4] }: PostsFeaturedProps) {
  const [featured, ...rest] = getSortedPosts(["src", "app", "blog", "posts"], range);
  if (!featured) return null;
  const cover = featured.metadata.image;

  return (
    <Column fillWidth gap="16">
      <SectionHeader
        title={home.featuredPosts?.title ?? "Writing"}
        link={
          routes["/blog"]
            ? { href: blog.path, label: home.featuredPosts?.linkLabel ?? "All posts" }
            : undefined
        }
      />
      <Row fillWidth gap="32" s={{ direction: "column", gap: "16" }}>
        <Column flex={3}>
          <Card
            href={`${blog.path}/${featured.slug}`}
            fillWidth={!!cover}
            fill={!cover}
            direction="column"
            vertical={cover ? undefined : "end"}
            gap="20"
            padding={cover ? "4" : "24"}
            radius="l-4"
            background={cover ? "transparent" : "surface"}
            border={cover ? "transparent" : true}
            transition="micro-medium"
          >
            {cover && (
              <Media
                src={cover}
                alt=""
                aspectRatio="16 / 9"
                radius="l"
                border
                sizes="(max-width: 768px) 100vw, 640px"
              />
            )}
            <Column
              gap="12"
              paddingX={cover ? "16" : "0"}
              paddingBottom={cover ? "16" : "0"}
              s={{ paddingX: cover ? "8" : "0" }}
            >
              <Text textVariant="label-default-s" onBackground="neutral-weak">
                {formatDate(featured.metadata.publishedAt, false)}
                {featured.metadata.tag ? ` · ${featured.metadata.tag}` : ""}
              </Text>
              <Heading
                as="h3"
                textVariant={cover ? "heading-strong-xl" : "display-strong-xs"}
                wrap="balance"
              >
                {featured.metadata.title}
              </Heading>
              {featured.metadata.summary && (
                <Text textVariant="body-default-m" onBackground="neutral-weak" wrap="pretty">
                  {featured.metadata.summary}
                </Text>
              )}
            </Column>
          </Card>
        </Column>
        {rest.length > 0 && (
          <Column flex={2} as="ul">
            {rest.map((post, index) => (
              <Column as="li" key={post.slug} fillWidth>
                {index > 0 && <Line />}
                <Card
                  href={`${blog.path}/${post.slug}`}
                  fillWidth
                  direction="column"
                  gap="8"
                  paddingY="20"
                  paddingX="16"
                  radius="m"
                  background="transparent"
                  border="transparent"
                  s={{ paddingX: "8" }}
                >
                  <Text textVariant="label-default-s" onBackground="neutral-weak">
                    {formatDate(post.metadata.publishedAt, false)}
                  </Text>
                  <Text textVariant="heading-default-l" wrap="balance">
                    {post.metadata.title}
                  </Text>
                </Card>
              </Column>
            ))}
          </Column>
        )}
      </Row>
    </Column>
  );
}

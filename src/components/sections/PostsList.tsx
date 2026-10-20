import { Card, Column, Line, Row, Text } from "@once-ui-system/core";
import { getSortedPosts } from "@/utils/utils";
import { formatDate } from "@/utils/formatDate";
import { SectionHeader } from "./SectionHeader";

interface PostsListProps {
  range?: [number, number?];
}

export function PostsList({ range }: PostsListProps) {
  const posts = getSortedPosts(["src", "app", "blog", "posts"], range);
  if (posts.length === 0) return null;

  return (
    <Column fillWidth gap="16">
      <SectionHeader title="Writing" link={{ href: "/blog", label: "All posts" }} />
      <Column fillWidth as="ul">
        {posts.map((post, index) => (
          <Column as="li" key={post.slug} fillWidth>
            {index > 0 && <Line />}
            <Card
              href={`/blog/${post.slug}`}
              fillWidth
              direction="row"
              vertical="center"
              gap="24"
              paddingY="20"
              paddingX="16"
              radius="m"
              background="transparent"
              border="transparent"
              s={{ direction: "column", horizontal: "start", gap: "8", paddingX: "8" }}
            >
              <Row minWidth={112}>
                <Text textVariant="label-default-s" onBackground="neutral-weak">
                  {formatDate(post.metadata.publishedAt)}
                </Text>
              </Row>
              <Text flex={1} textVariant="heading-default-l" wrap="balance">
                {post.metadata.title}
              </Text>
              {post.metadata.tag && (
                <Row s={{ hide: true }}>
                  <Text textVariant="label-default-s" onBackground="neutral-weak">
                    {post.metadata.tag}
                  </Text>
                </Row>
              )}
            </Card>
          </Column>
        ))}
      </Column>
    </Column>
  );
}

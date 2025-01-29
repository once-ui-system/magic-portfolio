"use client";

import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import styles from "./Posts.module.scss";
import { formatDate } from "@/app/utils/formatDate";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="12"
        paddingX="16"
        gap="32"
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            priority
            maxWidth={20}
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        )}
        <Column position="relative" fillWidth gap="8" vertical="center">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt, false)}
          </Text>
          {post.metadata.tag && (
            <SmartLink
                key={post.metadata.tag}
                href={`/blog?tag=${post.metadata.tag}`}
                style={{
                    textDecoration: 'none',
                    margin: '0',
                    height: 'fit-content',
                    width: 'fit-content',
                }}
            >
                <Tag
                    className="mt-8"
                    label={post.metadata.tag}
                    variant="neutral"
                />
            </SmartLink>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}

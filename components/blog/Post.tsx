"use client";

import {
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import styles from "./Posts.module.scss";
import { formatDate } from "@/utils/formatDate";
import { Star, Lock } from "lucide-react";
import { languageIcons } from "@/utils/languageIcons";
import Image from "next/image";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  const isRepo = post.metadata.stars !== undefined;
  const langIcon = post.metadata.language
    ? languageIcons[post.metadata.language]
    : null;

  return (
    <SmartLink
      fillWidth
      unstyled
      style={{ borderRadius: "var(--radius-l)" }}
      key={post.slug}
      href={isRepo ? post.metadata.url : `/blog/${post.slug}`}
      target={isRepo ? "_blank" : undefined}
      rel={isRepo ? "noopener noreferrer" : undefined}
    >
      <Flex
        position="relative"
        transition="micro-medium"
        direction={direction}
        radius="l"
        className={styles.hover}
        mobileDirection="column"
        fillWidth
      >
        {post.metadata.image && thumbnail && (
          <Media
            priority
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="l"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        )}
        <Column
          position="relative"
          fillWidth
          gap="4"
          padding="24"
          vertical="center"
        >
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>

          <Text variant="label-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt, false)}
          </Text>

          {isRepo && (
            <>
              <Flex gap="12" marginTop="8" wrap>
                <Flex gap="4" vertical="center">
                  <Star size={18} /> {post.metadata.stars}
                </Flex>
                <Flex gap="4" vertical="center">
                  {post.metadata.private ? <Lock size={14} /> : ""}
                </Flex>
                {langIcon ? (
                  <Image
                    src={langIcon}
                    alt={post.metadata.language}
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  post.metadata.language && (
                    <Text variant="label-default-s">
                      {post.metadata.language}
                    </Text>
                  )
                )}
              </Flex>

              {post.metadata.topics?.length > 0 && (
                <Flex gap="8" marginTop="8" wrap>
                  {post.metadata.topics.map((topic: string) => (
                    <Tag key={topic} label={topic} variant="neutral" />
                  ))}
                </Flex>
              )}
            </>
          )}

          {!isRepo && post.metadata.tag && (
            <Tag
              className="mt-12"
              label={post.metadata.tag}
              variant="neutral"
            />
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}

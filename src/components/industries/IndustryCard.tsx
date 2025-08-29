"use client";
import { Column, Flex, Heading, SmartLink, Text } from "@once-ui-system/core";

interface IndustryCardProps {
  post: any;
}

export function IndustryCard({ post }: IndustryCardProps) {
  return (
    <SmartLink fillWidth unstyled style={{ borderRadius: "var(--radius-l)" }} href={`/industries/${post.slug}`}>
      <Flex position="relative" transition="micro-medium" radius="l" fillWidth padding="24">
        <Column fillWidth gap="4">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          {post.metadata.summary && (
            <Text variant="label-default-s" onBackground="neutral-weak">
              {post.metadata.summary}
            </Text>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}


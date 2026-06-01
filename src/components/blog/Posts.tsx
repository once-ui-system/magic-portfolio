import { getPosts } from "@/utils/utils";
import { Grid, RevealFx, SpacingToken } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  exclude?: string[];
  direction?: "row" | "column";
  aspectRatio?: string;
  marginBottom?: SpacingToken;
  imageHeight?: string;
  locale?: string;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  aspectRatio,
  marginBottom = "40",
  imageHeight,
  locale = "en",
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"], locale);

  // Exclude by slug (exact match)
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom={marginBottom} gap="16">
          {displayedBlogs.map((post, index) => (
            <RevealFx key={post.slug} translateY="12" delay={index * 0.1} speed="medium" fillWidth>
                <Post post={post} thumbnail={thumbnail} direction={direction} aspectRatio={aspectRatio} imageHeight={imageHeight} />
            </RevealFx>
          ))}
        </Grid>
      )}
    </>
  );
}

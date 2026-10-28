import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { isRouteEnabled } from "@/utils/routes";
import { Newsletter } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { type TagCount, TagFilter, type TagFilterPost } from "@/components/blog/TagFilter";
import { getSortedPosts } from "@/utils/utils";
import { baseURL, blog, features, person, newsletter } from "@/resources";
import { canonicalAlternates } from "@/utils/seo";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
    alternates: canonicalAlternates(blog.path),
  });
}

// Topics with how many posts each has, most used first. Only the fields a post card needs are
// sent to the browser, so the filter works without loading post bodies.
function getTagFilterData() {
  const posts: TagFilterPost[] = getSortedPosts(["src", "app", "blog", "posts"]).map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt,
      image: post.metadata.image,
      tag: post.metadata.tag,
    },
  }));
  const counts = new Map<string, number>();
  for (const post of posts) {
    const tag = post.metadata.tag;
    if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  const tags: TagCount[] = [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return { posts, tags };
}

export default function Blog() {
  if (!isRouteEnabled("/blog")) notFound();
  const filter = (features.tagFilter ?? true) ? getTagFilterData() : null;
  const listing = (
    <Column fillWidth flex={1} gap="40" s={{ gap: "24" }}>
      <Posts range={[1, 1]} thumbnail />
      <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
      <Newsletter marginBottom="l" />
      <Heading as="h2" textVariant="heading-strong-xl" marginLeft="l">
        Earlier posts
      </Heading>
      <Posts range={[4]} columns="2" />
    </Column>
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" textVariant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      {/* Only worth showing once posts cover at least two topics */}
      {filter && filter.tags.length > 1 ? (
        <TagFilter tags={filter.tags} posts={filter.posts}>
          {listing}
        </TagFilter>
      ) : (
        listing
      )}
    </Column>
  );
}

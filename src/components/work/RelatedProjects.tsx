import { getPosts } from "@/utils/utils";
import { Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";

export function RelatedProjects({ currentSlug, limit = 3 }: { currentSlug: string; limit?: number }) {
  const all = getPosts(["src","app","work","projects"]);
  const items = all
    .filter(p => p.slug !== currentSlug)
    .sort((a,b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, limit);
  if (items.length === 0) return null as any;
  return (
    <Column gap="8" marginTop="24">
      <Heading variant="heading-strong-m">Related Projects</Heading>
      {items.map(p => (
        <Row key={p.slug} horizontal="space-between">
          <SmartLink href={`/work/${p.slug}`}>{p.metadata.title}</SmartLink>
          <Text onBackground="neutral-weak">{p.metadata.publishedAt}</Text>
        </Row>
      ))}
    </Column>
  );
}


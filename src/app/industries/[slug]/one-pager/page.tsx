import { notFound } from "next/navigation";
import { Column, Heading, Row, Text, Button } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";

export default async function OnePager({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getPosts(["src", "app", "industries", "pages"]).find((p) => p.slug === slugPath);
  if (!post) notFound();

  return (
    <Column maxWidth="s" gap="12" style={{ background: "white", color: "black", padding: 24 }}>
      <Heading variant="display-strong-s">{post.metadata.title} – One‑Pager</Heading>
      <Text>{post.metadata.summary}</Text>
      <Heading as="h3" variant="heading-strong-m">Key Outcomes</Heading>
      <ul>
        <li>Time savings and error reduction</li>
        <li>Faster cycles and better visibility</li>
        <li>Agent‑powered workflows</li>
      </ul>
      <Heading as="h3" variant="heading-strong-m">Recommended Demos</Heading>
      <ul>
        <li>ROI Calculator</li>
        <li>Document Generator</li>
        <li>Agent Chat</li>
      </ul>
      <Row gap="8">
        <Button onClick={() => typeof window !== 'undefined' && window.print()}>Print to PDF</Button>
        <Button variant="tertiary" href={`/industries/${post.slug}`}>Back to Industry</Button>
      </Row>
      <style>{`@media print { header, footer, nav { display: none !important; } a { text-decoration: none; } }`}</style>
    </Column>
  );
}


import { notFound } from "next/navigation";
import { Column, Heading, Meta, Card, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import playbooks from "@/resources/playbooks.json";
import Script from "next/script";
import { PlaybookDownload } from "@/components/playbooks/PlaybookDownload";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return (playbooks as any[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const { slug } = await params;
  const s = Array.isArray(slug) ? slug.join("/") : slug;
  const pb: any = (playbooks as any[]).find((p) => p.slug === s);
  if (!pb) return {};
  return Meta.generate({
    title: `${pb.title} – Playbook`,
    description: pb.summary,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(pb.title)}`,
    path: `/playbooks/${pb.slug}`,
  });
}

export default async function PlaybookDetail({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const { slug } = await params;
  const s = Array.isArray(slug) ? slug.join("/") : slug;
  const pb: any = (playbooks as any[]).find((p) => p.slug === s);
  if (!pb) notFound();
  return (
    <Column maxWidth="s" gap="16">
      <Script id="jsonld-breadcrumb-playbook" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Playbooks", item: `${baseURL}/playbooks` },
          { "@type": "ListItem", position: 3, name: pb.title, item: `${baseURL}/playbooks/${pb.slug}` }
        ]
      }) }} />
      <Script id="jsonld-product" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: pb.title,
        description: pb.summary,
        url: `${baseURL}/playbooks/${pb.slug}`,
        category: pb.industry,
      }) }} />
      <Heading marginBottom="l" variant="display-strong-s">{pb.title}</Heading>
      <Card padding="16" radius="l">
        <Text onBackground="neutral-weak">{pb.summary}</Text>
      </Card>
      <PlaybookDownload slug={pb.slug} industry={pb.industry} title="Get the Playbook" />
    </Column>
  );
}


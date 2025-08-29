import { Column, Heading, Meta } from "@once-ui-system/core";
import Script from "next/script";
import { baseURL } from "@/resources";
import { PlaybookList } from "@/components/playbooks/PlaybookList";
import playbooks from "@/resources/playbooks.json";

export async function generateMetadata() {
  return Meta.generate({
    title: "Playbooks",
    description: "Download concise playbooks by industry (email required)",
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Playbooks")}`,
    path: "/playbooks",
  });
}

export default function PlaybooksPage() {
  return (
    <Column maxWidth="s">
      <Script id="jsonld-playbooks-itemlist" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: (playbooks as any[]).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.title,
            description: p.summary,
            url: `${baseURL}/playbooks/${p.slug}`,
            category: p.industry,
          }
        }))
      }) }} />
      <Script id="jsonld-breadcrumb-playbooks" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Playbooks", item: `${baseURL}/playbooks` }
        ]
      }) }} />
      <Heading marginBottom="l" variant="display-strong-s">Playbooks</Heading>
      <PlaybookList />
    </Column>
  );
}

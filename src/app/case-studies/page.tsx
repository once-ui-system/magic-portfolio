import { Column, Heading, Meta } from "@once-ui-system/core";
import Script from "next/script";
import { baseURL } from "@/resources";
import { CaseStudyList } from "@/components/case-studies/CaseStudyList";

export async function generateMetadata() {
  return Meta.generate({
    title: "Case Studies",
    description: "Real outcomes across industries",
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Case Studies")}`,
    path: "/case-studies",
  });
}

export default function CaseStudiesPage() {
  return (
    <Column maxWidth="s">
      <Script id="jsonld-breadcrumb-cs" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${baseURL}/case-studies` }
        ]
      }) }} />
      <Heading marginBottom="l" variant="display-strong-s">Case Studies</Heading>
      <CaseStudyList />
    </Column>
  );
}

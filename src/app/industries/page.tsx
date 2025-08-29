import { Column, Heading, Meta } from "@once-ui-system/core";
import { baseURL, industries } from "@/resources";
import { IndustryList } from "@/components/industries/IndustryList";
import Script from "next/script";

export async function generateMetadata() {
  return Meta.generate({
    title: industries.title,
    description: industries.description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(industries.title)}`,
    path: industries.path,
  });
}

export default function IndustriesPage() {
  return (
    <Column maxWidth="s">
      <Script id="jsonld-service-index" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: industries.title,
        description: industries.description,
        url: `${baseURL}${industries.path}`,
      }) }} />
      <Heading marginBottom="l" variant="display-strong-s">
        {industries.title}
      </Heading>
      <IndustryList />
    </Column>
  );
}

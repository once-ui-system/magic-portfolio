import { Column, Flex, Heading } from "@/once-ui/components";
import { Resources } from "@/components/agileResources/Resources";
import { baseURL } from "@/app/resources";
import { agileResources, person} from "@/app/resources/content";

export async function generateMetadata() {
  const title = agileResources.title;
  const description = agileResources.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/agile`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Agile() {
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: agileResources.title,
            description: agileResources.description,
            url: `https://${baseURL}/agile`,
            image: `${baseURL}/og?title=${encodeURIComponent(agileResources.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {agileResources.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Resources range={[1, 3]} thumbnail />
        <Resources range={[4]} columns="2" />
      </Column>
    </Column>
  );
}

import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, Row, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface AgileParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const resources = getPosts(["src", "app", "agile", "resources"]);
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata(props: AgileParams) {
  const params = await props.params;

  const {
    slug
  } = params;

  let resource = getPosts(["src", "app", "agile", "resources"]).find((res) => res.slug === slug);

  if (!resource) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = resource.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/agile/${resource.slug}`,
      images: [
        {
          url: ogImage,
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

export default async function AgileResource(props: AgileParams) {
  const params = await props.params;
  let resource = getPosts(["src", "app", "agile", "resources"]).find((resource) => resource.slug === params.slug);

  if (!resource) {
    notFound();
  }

  const avatars =
    resource.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="xs" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.metadata.title,
            datePublished: resource.metadata.publishedAt,
            dateModified: resource.metadata.publishedAt,
            description: resource.metadata.summary,
            image: resource.metadata.image
              ? `https://${baseURL}${resource.metadata.image}`
              : `https://${baseURL}/og?title=${resource.metadata.title}`,
            url: `https://${baseURL}/agile/${resource.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Button href="/agile" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
        Resources
      </Button>
      <Heading variant="display-strong-s">{resource.metadata.title}</Heading>
      <Row gap="12" vertical="center">
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {formatDate(resource.metadata.publishedAt)}
        </Text>
      </Row>
      <Column as="article" fillWidth>
        <CustomMDX source={resource.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}

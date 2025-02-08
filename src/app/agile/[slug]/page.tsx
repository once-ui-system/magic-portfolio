import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, Flex, Text, SmartImage, SmartLink } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { agileResources, person } from "@/app/resources/content";
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

export async function generateMetadata({ params }: AgileParams) {

  const {
    slug
  } = await params;

  const resource = getPosts(["src", "app", "agile", "resources"]).find((resource) => resource.slug === slug);

  if (!resource) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    pdf,
    team,
    linkScrum,
    linkSAFe,
    linkManifesto,
  } = resource.metadata;

  const ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    images,
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

export default async function Resource({ params }: AgileParams) {
  const { slug } = await params;
  const resource = getPosts(["src", "app", "agile", "resources"]).find((resource) => resource.slug === slug);
  
    if (!resource) {
    notFound();
  }

  const { linkScrum, linkSAFe, linkManifesto, pdf, team } = resource.metadata;

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
            "@type": "CreativeWork",
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
      <Column maxWidth="xs" gap="16">
        <Button href="/agile" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
          Resources
        </Button>
        <Heading variant="display-strong-s">{resource.metadata.title}</Heading>
      </Column>
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {resource.metadata.team?.length > 0 && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(resource.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={resource.content} />
          <Flex gap="16" wrap>
            {linkScrum && (
              <SmartLink
                href={linkScrum}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
              >
                Visit Scrum.org
              </SmartLink>
            )}
            {linkManifesto && (
              <SmartLink
                href={linkManifesto}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
              >
                Visit agilemanifesto.org
              </SmartLink>
            )}
            {linkSAFe && (
              <SmartLink
                href={linkSAFe}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
              >
                Visit scaledagile.com
              </SmartLink>
            )}
        </Flex>
      </Column>      
      <ScrollToHash />
    </Column>
  );
}

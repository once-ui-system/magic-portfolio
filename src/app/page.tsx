import React from "react";
import { Metadata } from "next";

// UI Components
import { 
  Heading, 
  Flex, 
  Text, 
  Button, 
  Avatar, 
  RevealFx, 
  Column 
} from "@/once-ui/components";

// Application resources and content
import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";

// Page components
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";

/**
 * Type definition for the website's structured data
 * Represents the schema.org WebPage structure for JSON-LD
 */
type WebPageSchema = {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  image: string;
  publisher: {
    "@type": string;
    name: string;
    image: {
      "@type": string;
      url: string;
    };
  };
};

/**
 * Generates metadata for the home page including Open Graph and Twitter card data
 * for improved SEO and social media sharing.
 * 
 * @returns {Metadata} The metadata object for the home page
 */
export async function generateMetadata(): Promise<Metadata> {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

/**
 * Creates JSON-LD schema for the home page
 * Uses schema.org standards to improve SEO and structured data
 * 
 * @returns {WebPageSchema} Structured data object for the home page
 */
function createHomePageSchema(): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: home.title,
    description: home.description,
    url: `https://${baseURL}`,
    image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
    publisher: {
      "@type": "Person",
      name: person.name,
      image: {
        "@type": "ImageObject",
        url: `${baseURL}${person.avatar}`,
      },
    },
  };
}

/**
// The JsonLdSchemaComponent is replaced by the imported JsonLdSchema component
/**
 * Home page component that displays the main landing page content
 * including introduction, projects, blog posts, and newsletter signup.
 * 
 * @returns {React.ReactElement} The rendered home page
 */
export default function Home(): React.ReactElement {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <JsonLdSchema websiteSchema={createHomePageSchema()} />
      
      {/* Hero section with headline and about button */}
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              size="m"
              arrowIcon
              aria-label="Learn more about me"
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    alt={`Avatar of ${person.name}`}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      
      {/* Featured Project */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      
      {/* Blog Posts Section */}
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading 
              as="h2" 
              variant="display-strong-xs" 
              wrap="balance" 
              id="latest-blog-posts"
            >
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts 
              range={[1, 2]} 
              columns="2" 
              aria-labelledby="latest-blog-posts"
            />
          </Flex>
        </Flex>
      )}
      
      {/* Additional Projects */}
      <Projects range={[2]} />
      
      {/* Newsletter Signup */}
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}

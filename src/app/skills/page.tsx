import { Column, RevealFx, Text, Heading, Flex, Badge } from "@/once-ui/components";
import OverviewSkillsChart from "@/components/skills/OverviewSkillsChart";
import DetailedSkillsChart from "@/components/skills/DetailedSkillsChart";
import MasonryGrid from "@/components/skills/MasonryGrid";
import { baseURL, routes } from "@/app/resources";
import { skills, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = skills.title;
  const description = skills.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/skills`,
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

const techStack = [
  { name: "React", icon: "🔵" },
  { name: "Django", icon: "🌐" },
  { name: "Python", icon: "🐍" },
  { name: "TypeScript", icon: "📘" },
];

const certifications = [
  { title: "Professional Scrum Master I", provider: "Scrum.org" },
  { title: "SAFe® 6 Scrum Master", provider: "Scaled Agile®" },
];

export default function Skills() {
  return (
    <>
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {skills.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {skills.subline}
            </Text>
          </RevealFx>
            <Flex fillWidth>
              <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ImageGallery",
                    name: skills.title,
                    description: skills.description,
                    url: `https://${baseURL}/gallery`,
                    image: skills.images.map((image) => ({
                      "@type": "ImageObject",
                      url: `${baseURL}${image.src}`,
                      description: image.alt,
                    })),
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
              <MasonryGrid />
            </Flex>
        </Column>
      </Column> 
    </>
  );
}

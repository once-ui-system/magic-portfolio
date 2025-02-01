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

const badges = [
  { title: "Certified Scrum Master", provider: "Scrum.org" },
  { title: "Certified SAFe® 6 Scrum Master", provider: "Scaled Agile®" },
];

export default function Skills() {
  const structure = [
    {
      title: skills.title,
      headline: skills.headline,
      subline: skills.subline,      
      items: [],
    },
    {
      title: "Tech Stack",
      items: techStack,
    },
    {
      title: "Certifications & Badges",
      items: certifications, badges,
    },
  ]
  return (
      <Column maxWidth="s">
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
            }),
          }}
        /> 
        {skills.display && (
          <>
          <Heading as="h1" variant="display-strong-xl" marginBottom="m">
            {skills.title}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" marginBottom="m">
            {skills.description}
          </Text>
          <Heading as="h2" variant="display-strong-xs" marginBottom="m">
            {skills.headline}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {skills.subline}
          </Text>
        </>
        )}
        

         
      </Column>
  );
}

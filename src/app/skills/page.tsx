import React from "react";
import { Avatar, Column, Icon, SmartImage, Tag, Text, Heading, Flex} from "@/once-ui/components";
import TableOfContents from "@/components/about/TableOfContents";
import { baseURL} from "@/app/resources";
import { skills, person, about } from "@/app/resources/content";
import styles from "@/components/skills/Skills.module.scss";

const DetailedSkillsChart = React.lazy(() => import("@/components/skills/DetailedSkillsChart"));
const OverviewSkillsChart = React.lazy(() => import("@/components/skills/OverviewSkillsChart"));

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

interface Image {
  width: number;
  height: number;
  alt: string;
  src: string;
}

interface Skill {
  title: string;
  description: string;
  images?: Image[];
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
  const structure = [
    {
      title: skills.intro.title,
      display: skills.intro.display,    
      items: [],
    },
    {
      title: skills.technical.title,
      display: skills.technical.display,
      items: [],
    },
  ];
  return (
    <Column maxWidth="s">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: person.name,
              jobTitle: person.role,
              description: skills.intro.description,
              url: `https://${baseURL}/about`,
              image: `${baseURL}/images/${person.avatar}`,
            }),
          }}              
        /> 
        {skills.tableOfContent.display && (
          <Column
            left="0"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            position="fixed"
            paddingLeft="24"
            gap="32"
            hide="s"
          >
          <TableOfContents 
            structure={structure} 
            skills={{ tableOfContent: skills.tableOfContent }} // Pass only the `tableOfContent` property 
            />
          </Column>
        )}
        <Flex fillWidth mobileDirection="column" horizontal="center">
          {about.avatar.display && (
            <Column
              className={styles.avatar}
              minWidth="160"
              paddingX="l"
              paddingBottom="xl"
              gap="m"
              flex={3}
              horizontal="center"
            >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        </Flex>
        
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={skills.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
            >
          </Column>

        {skills.intro.display && (
          <Column className="space-y-4" textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
              {skills.intro.description}
          </Column>
        )}

        {skills.technical.display && (
          <>
          <Flex fillWidth gap="24" mobileDirection="column">
            <Flex direction="column" gap="s" align="start" flex={1}></Flex>
              <Heading as="h2" id={skills.technical.title} variant="display-strong-s" marginBottom="s">
                {skills.technical.title}
              </Heading>
              <Column fillWidth gap="m">
                  <Text 
                    wrap="balance" 
                    variant="body-default-m"
                    marginBottom="m"
                  >
                  {skills.technical.description}
                  </Text>
                </Column>              
            </Flex>
              
              {/* Render each skill section with a chart */}
              <Column fillWidth gap="m">
                <OverviewSkillsChart />

                {skills.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="4"
                  className={skill.title === "Agile Practices" ? "agile-skills" : "other-skills"}
                  >
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="s">
                      {skill.description}
                    </Text>
                    
                    {/* Render a chart for the matching category */}
                    <Column fillWidth>
                      <DetailedSkillsChart category={skill.title} />
                    </Column>

                    {skill.images && skill.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" wrap>
                        {skill.images.map((image, index) => (
                          <SmartImage
                              key={index}
                              enlarge
                              radius="m"
                              sizes={`${image.width}x${image.height}`}
                              alt={image.alt}
                              src={image.src}
                            />
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
          </>
        )}        

      </Column>

    </Column>
  );
}

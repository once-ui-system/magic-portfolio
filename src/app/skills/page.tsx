import { Avatar, Column, Icon, IconButton, SmartImage, Tag, Text, Heading, Flex, Button, Badge } from "@/once-ui/components";
import OverviewSkillsChart from "@/components/skills/OverviewSkillsChart";
import TableOfContents from "@/components/about/TableOfContents";
import { baseURL, display, routes } from "@/app/resources";
import { skills, person, about } from "@/app/resources/content";
import styles from "@/components/skills/Skills.module.scss";

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
              <Button 
                id="skills" 
                data-border="rounded"
                variant="secondary"
                size="s"
                arrowIcon
                href="/about/#SkillsOverview"
                >
              More Details
              </Button>
            </Flex>
              <Flex flex={2} paddingX="20">
                <OverviewSkillsChart />
              </Flex>
          </>
        )}        

      </Column>

    </Column>
  );
}

import React from "react";
import { Avatar, Badge, Button, Column, Icon, SmartImage, SmartLink, Tag, Text, Heading, Flex} from "@/once-ui/components";
import { baseURL} from "@/app/resources";
import { skills, social, person, about } from "@/app/resources/content";
import styles from "@/components/skills/Skills.module.scss";

const DetailedSkillsChart = React.lazy(() => import("@/components/skills/DetailedSkillsChart"));
const OverviewSkillsChart = React.lazy(() => import("@/components/skills/OverviewSkillsChart"));
const TableOfContents = React.lazy(() => import("@/components/about/TableOfContents"));

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

export default function Skills() {
  const structure = [
    {
      title: skills.intro.title,
      display: skills.intro.display,    
      items: [],
    },
    {
      title: skills.certifications.title,
      display: skills.certifications.display,
      items: [],
    },
    {
      title: skills.technical.title,
      display: skills.technical.display,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m">
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
            skills={skills}
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

            <Column className={styles.blockAlign} flex={9} maxWidth={40}>
                <Column
                      id={skills.intro.title}
                      fillWidth
                      minHeight="160"
                      vertical="center"
                      marginBottom="m"
                >
                      {skills.intro.title}
                    <Heading className={styles.textAlign} variant="display-strong-xl">
                        {person.name}
                    </Heading>
                    <Text
                        className={styles.textAlign}
                        variant="display-default-xs"
                        onBackground="neutral-weak"
                    >
                        {person.role}
                    </Text>
                      {social.length > 0 && (
                        <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap>
                          {social.map(
                            (item) =>
                              item.link && (
                                <Button
                                  key={item.name}
                                  href={item.link}
                                  prefixIcon={item.icon}
                                  label={item.name}
                                  size="s"
                                  variant="secondary"
                                />
                              ),
                          )}
                        </Flex>
                      )}
                </Column>
                {skills.intro.display && (
                    <Column className="space-y-4" textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
                      {skills.intro.description}
                    </Column>
                )}

                {skills.certifications.display && (
                  <Column maxWidth="m" gap="m" horizontal="start">
                    <Heading 
                        as="h2" 
                        id={skills.certifications.title} 
                        variant="display-strong-m"                       
                    >
                      {skills.certifications.title}
                    </Heading>
                    <Text 
                        onBackground="neutral-weak"
                        variant="body-default-l"
                                         
                    >
                      {skills.certifications.description}
                    </Text>

                     <Flex wrap={true} gap="m" horizontal="center" paddingBottom="l">
                      {skills.certifications.images.map((image, index) => (
                        <Flex key={`${image.title}-${index}`} className={styles.badgeWrapper} vertical="center">
                        <Badge
                          id={image.title}
                          title={image.title}
                          href={image.link} // Use the link from the image object                          
                          arrow // Show the arrow effect (default: true)
                          effect // Enable the hover effect (default: true)
                          className={styles.badge}
                          fitWidth
                          radius="full"
                          background="neutral-weak"    
                          border="brand-alpha-medium"                      
                        >
                          <SmartImage
                            enlarge
                            radius="full"
                            sizes="150x150"
                            alt={image.alt}
                            src={image.src}
                            className={styles.badgeImage}
                          />
                        </Badge>
                        </Flex>
                      ))}
                    </Flex>
                  </Column>                 
                )}
                     

          <Flex fillWidth gap="24" mobileDirection="column">
            <Flex direction="column" gap="s" align="start" flex={1}>
            {skills.technical.display && (
              <>              
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
              </>              
            )}
            </Flex>
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
                  </Column>
                ))}
              </Column>
          </Column>
        </Flex>
    </Column>
  );
}
      
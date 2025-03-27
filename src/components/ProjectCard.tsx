"use client";

import {
  Avatar,
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Tooltip,
} from "@/once-ui/components";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  linkedIn?: string;
}

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  team?: TeamMember[];
  avatars?: { src: string }[]; // Keep for backward compatibility
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  team,
  avatars,
  link,
}) => {
  // Convert old avatars format to new team format for backward compatibility
  const teamMembers = team || (avatars?.map(avatar => ({
    name: "Team Member",
    role: "Contributor",
    avatar: avatar.src,
  })) || []);
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        images={images.map((image) => ({
          src: image,
          alt: title,
        }))}
      />
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(teamMembers.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {teamMembers.length > 0 && (
              <Flex direction="column" gap="s">
                <AvatarGroup 
                  avatars={teamMembers.map(member => ({ src: member.avatar }))} 
                  size="m" 
                  reverse 
                />
                <Flex wrap gap="l" paddingTop="xs">
                  {teamMembers.map((member, index) => (
                    <Flex key={index} direction="column" gap="xxs">
                      <Text variant="body-strong-xs">{member.name}</Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">{member.role}</Text>
                      {member.linkedIn && (
                        <SmartLink 
                          href={member.linkedIn}
                          suffixIcon="arrowUpRightFromSquare"
                          style={{ margin: "0", width: "fit-content" }}
                        >
                          <Text variant="body-default-xs">LinkedIn</Text>
                        </SmartLink>
                      )}
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            )}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};

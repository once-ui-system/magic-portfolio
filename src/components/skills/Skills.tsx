import {
  AvatarGroup,
  Carousel,
  Column,
  Badge,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@/once-ui/components";
import { getPosts } from "@/app/utils/utils";

export function Skills({ range }: BadgeProps) {
  let allSkills = getPosts(["src", "app", "skill", "skills"]);

  const sortedSkills = allSkills.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedSkills = range
    ? sortedSkills.slice(range[0] - 1, range[1] ?? sortedSkills.length)
    : sortedSkills;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedSkills.map((skill, index) => (
        <SkillCard
          priority={index < 2}
          key={skill.slug}
          href={`skills/${skill.slug}`}
          images={skill.metadata.images}
          title={skill.metadata.title}
          description={skill.metadata.summary}
          content={skill.content}
          avatars={skill.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={skill.metadata.link || ""}
        />
      ))}
    </Column>
  );
}


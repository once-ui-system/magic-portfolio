import { getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((project, index) => (
        <ProjectCard
          priority={index < 2}
          key={project.slug || index}
          href={`work/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          content={project.content}
          avatars={project.metadata.team?.map((member, index) => ({ 
            key: index,
            src: member.avatar 
          })) || []}
          link={project.metadata.link || ""}
        />
      ))}
    </Column>
  );
}

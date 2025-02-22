import { getFilteredPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  showFeaturedOnly?: boolean;
}

export function Projects({ showFeaturedOnly = false }: ProjectsProps) {
  const projects = getFilteredPosts(
    ["src", "app", "work", "projects"], 
    { featured: showFeaturedOnly }
  );

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          href={`/work/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          content={project.content}
          avatars={project.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={project.metadata.link || ""}
          priority={showFeaturedOnly}
        />
      ))}
    </Column>
  );
}

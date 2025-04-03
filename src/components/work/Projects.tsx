import { getFilteredPosts, getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  showFeaturedOnly?: boolean;
  showCaseStudyOnly?: boolean;
}

export function Projects({ showFeaturedOnly, showCaseStudyOnly }: ProjectsProps) {
  // If no filters are provided, get all projects
  const projects = showFeaturedOnly || showCaseStudyOnly 
    ? getFilteredPosts(
        ["src", "app", "work", "projects"],
        { 
          featured: showFeaturedOnly,
          case_study: showCaseStudyOnly 
        }
      )
    : getPosts(["src", "app", "work", "projects"]); // Get all projects

  // Sort projects by feature_order
  const sortedProjects = [...projects].sort((a, b) => {
    const orderA = a.metadata.feature_order || 999;
    const orderB = b.metadata.feature_order || 999;
    return orderA - orderB;
  });

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          href={`/work/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          content={project.content}
          avatars={project.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={project.metadata.link || ""}
          priority={false}
        />
      ))}
    </Column>
  );
}


import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
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

  console.log("allProjects", allProjects)
  return (
    <>

      {/* <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
        {displayedProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
          />
        ))}
      </Column> */}

      <div className="w-full px-6 mb-10">
        <div className="flex flex-col gap-10">
          {/* Project 1 */}
          <div className="flex flex-col gap-6">
            <a href="/work/building-once-ui-a-customizable-design-system">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src="/images/projects/project-01/cover-01.jpg" alt="" className="rounded-xl" />
                <img src="/images/projects/project-01/cover-02.jpg" alt="" className="rounded-xl" />
                <img src="/images/projects/project-01/cover-03.jpg" alt="" className="rounded-xl" />
                <img src="/images/projects/project-01/cover-04.jpg" alt="" className="rounded-xl" />
              </div>
            </a>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Building Once UI, a Customizable Design System</h2>
              <p className="text-gray-300">
                Development of a flexible and highly customizable design system using Next.js for front-end and Figma for design collaboration.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <img src="/images/avatar.jpg" className="w-10 h-10 rounded-full" alt="Varun" />
              <img src="/images/projects/project-01/avatar-01.jpg" className="w-10 h-10 rounded-full" alt="Jane Smith" />
            </div>
          </div>

          {/* Project 2 */}
          <div className="flex flex-col gap-6">
            <a href="/work/simple-portfolio-builder">
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/projects/project-01/cover-04.jpg" alt="" className="rounded-xl" />
                <video src="/images/projects/project-01/video-01.mp4" controls className="rounded-xl" />
              </div>
            </a>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Once UI: Open-source design system</h2>
              <p className="text-gray-300">No summary available.</p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="flex flex-col gap-6">
            <a href="/work/automate-design-handovers-with-a-figma-to-code-pipeline">
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/projects/project-01/cover-02.jpg" alt="" className="rounded-xl" />
                <img src="/images/projects/project-01/image-03.jpg" alt="" className="rounded-xl" />
              </div>
            </a>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Automating Design Handovers with a Figma to Code Pipeline</h2>
              <p className="text-gray-300">
                Explore the enduring debate between using spaces and tabs for code indentation, and why this choice matters more than you might think.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <img src="/images/avatar.jpg" className="w-10 h-10 rounded-full" alt="John Doe" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}



import { Column, Grid } from "@once-ui-system/core";
import Post from "@/components/blog/Post";

interface ProjectsProps {
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
}

export default async function ProjectPage({
  columns = "2",
  thumbnail = false,
  direction,
}: ProjectsProps) {
  const projects = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/repos`, {
    cache: "no-store",
  });

  if (!projects.ok) {
    return (
      <Column maxWidth="m">
        <p>Failed to load repositories.</p>
      </Column>
    );
  }

  const repos = await projects.json();

  return (
    <Column maxWidth="m">
      <h2>Latest GitHub Projects</h2>
      <Grid
        columns={columns}
        mobileColumns="1"
        fillWidth
        marginBottom="40"
        gap="12"
      >
        {repos.map((repo: any) => (
          <Post
            key={repo.id}
            post={{
              slug: repo.name,
              metadata: {
                title: repo.name,
                description: repo.description || "No description provided.",
                publishedAt: repo.updated_at,
                url: repo.html_url,
                stars: repo.stargazers_count, // now works even if 0
                forks: repo.forks_count,
                language: repo.language,
                topics: repo.topics || [],
              },
            }}
            thumbnail={thumbnail}
            direction={direction}
          />
        ))}
      </Grid>
    </Column>
  );
}

import { Column, Grid } from "@once-ui-system/core";
import Post from "@/components/blog/Post";
import GitHubCalendar from "react-github-calendar";

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
      <h1
        style={{
          paddingBottom: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        GitHub Activity Calendar
      </h1>
      <div
        style={{
          paddingBottom: "5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GitHubCalendar
          username="Awii21"
          blockSize={13}
          blockMargin={5}
          fontSize={18}
        />
      </div>
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

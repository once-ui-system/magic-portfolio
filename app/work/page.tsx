import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import GitHubCalendar from "react-github-calendar";
export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
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

      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Projects />
    </Column>
  );
}

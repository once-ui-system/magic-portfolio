import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { isRouteEnabled } from "@/utils/routes";
import { baseURL, about, person, work } from "@/resources";
import { canonicalAlternates } from "@/utils/seo";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
    alternates: canonicalAlternates(work.path),
  });
}

export default function Work() {
  if (!isRouteEnabled("/work")) notFound();

  return (
    <Column maxWidth="m" paddingTop="24">
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
      <Heading marginBottom="l" textVariant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}

import { Column, Heading, Meta, Schema, RevealFx, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources/content";
import { Projects } from "@/components/work/Projects";
import { getPosts } from "@/utils/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { work } = getDictionary(locale);

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { work, person, about } = dict;

  const allProjects = getPosts(["src", "app", "work", "projects"], locale);

  return (
    <Column maxWidth="l" fillWidth paddingX="l" paddingTop="56" gap="56">
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
      <RevealFx translateY="12" speed="slow" fillWidth>
        <Column fillWidth gap="32">
            <Heading variant="display-strong-m">
                {work.title}
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
                {work.description}
            </Text>
        </Column>
      </RevealFx>
      <RevealFx translateY="12" speed="slow" delay={0.2} fillWidth>
        <Projects posts={allProjects} display="list" />
      </RevealFx>
    </Column>
  );
}

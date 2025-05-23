import { Column, Heading, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { speaking, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: speaking.title,
    description: speaking.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(speaking.title)}`,
    path: speaking.path,
  });
}

export default function Speaking() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={speaking.title}
        description={speaking.description}
        path={speaking.path}
        image={`${baseURL}/og?title=${encodeURIComponent(speaking.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${speaking.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {speaking.title}
      </Heading>
      <Column gap="l">
        {speaking.topics.map((topic, index) => (
          <Column key={index} gap="m">
            <Heading as="h2" variant="display-strong-xs">
              {topic.title}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {topic.description}
            </Text>
          </Column>
        ))}
      </Column>
    </Column>
  );
}

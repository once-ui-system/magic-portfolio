import { Column, Heading, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { expertise, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: expertise.title,
    description: expertise.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(expertise.title)}`,
    path: expertise.path,
  });
}

export default function Expertise() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={expertise.title}
        description={expertise.description}
        path={expertise.path}
        image={`${baseURL}/og?title=${encodeURIComponent(expertise.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${expertise.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {expertise.title}
      </Heading>
      <Column gap="l">
        {expertise.competencies.map((c, i) => (
          <Column key={i} gap="m">
            <Heading as="h2" variant="display-strong-xs">
              {c.title}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {c.description}
            </Text>
          </Column>
        ))}
      </Column>
    </Column>
  );
}

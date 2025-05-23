import { Column, Heading, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { connect, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: connect.title,
    description: connect.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(connect.title)}`,
    path: connect.path,
  });
}

export default function Connect() {
  return (
    <Column maxWidth="s">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={connect.title}
        description={connect.description}
        path={connect.path}
        image={`${baseURL}/og?title=${encodeURIComponent(connect.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${connect.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {connect.title}
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak">
        {connect.text}
      </Text>
    </Column>
  );
}

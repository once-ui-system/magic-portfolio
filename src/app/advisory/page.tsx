import { Column, Heading, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { advisory, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: advisory.title,
    description: advisory.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(advisory.title)}`,
    path: advisory.path,
  });
}

export default function Advisory() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={advisory.title}
        description={advisory.description}
        path={advisory.path}
        image={`${baseURL}/og?title=${encodeURIComponent(advisory.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${advisory.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {advisory.title}
      </Heading>
      <Column gap="l">
        {advisory.offerings.map((offer, index) => (
          <Column key={index} gap="m">
            <Heading as="h2" variant="display-strong-xs">
              {offer.title}
            </Heading>
            <Column as="ul" gap="8">
              {offer.items.map((item, i) => (
                <Text as="li" variant="body-default-m" key={i} onBackground="neutral-weak">
                  {item}
                </Text>
              ))}
            </Column>
          </Column>
        ))}
      </Column>
    </Column>
  );
}

import { Column, Heading } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources";
import { insights, person, newsletter } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: insights.title,
    description: insights.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(insights.title)}`,
    path: insights.path,
  });
}

export default function Insights() {
  return (
    <Column maxWidth="s">
      <Schema
        as="blog"
        baseURL={baseURL}
        title={insights.title}
        description={insights.description}
        path={insights.path}
        image={`${baseURL}/og?title=${encodeURIComponent(insights.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/insights`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {insights.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Posts range={[1, 1]} thumbnail direction="column" />
        <Posts range={[2, 3]} thumbnail />
        <Posts range={[4]} columns="2" />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}

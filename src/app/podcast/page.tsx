import PodcastList from "@/components/podcast/PodcastList";
import PodcastUpload from "@/components/podcast/PodcastUpload";
import { readEpisodes } from "@/lib/podcast/episodes";
import { baseURL, person, podcast } from "@/resources";
import { assertRouteEnabled } from "@/utils/route-guard";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: podcast.title,
    description: podcast.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(podcast.title)}`,
    path: podcast.path,
  });
}

/** Los episodios se leen del almacenamiento en cada visita, no en el build. */
export const dynamic = "force-dynamic";

export default async function Podcast() {
  assertRouteEnabled("/podcast");

  const episodes = await readEpisodes();

  return (
    <Column maxWidth="l" fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={podcast.title}
        description={podcast.description}
        path={podcast.path}
        image={`/api/og/generate?title=${encodeURIComponent(podcast.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${podcast.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading as="h1" variant="display-strong-s" align="center">
        {podcast.title}
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak" align="center">
        {podcast.description}
      </Text>
      <PodcastUpload />
      <PodcastList episodes={episodes} />
    </Column>
  );
}

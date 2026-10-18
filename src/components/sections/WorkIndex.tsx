import { Card, Column, HoverCard, Icon, Line, Media, Row, Text } from "@once-ui-system/core";
import { getSortedPosts } from "@/utils/utils";
import { SectionHeader } from "./SectionHeader";

interface WorkIndexProps {
  range?: [number, number?];
}

export function WorkIndex({ range }: WorkIndexProps) {
  const projects = getSortedPosts(["src", "app", "work", "projects"], range);
  if (projects.length === 0) return null;

  return (
    <Column fillWidth gap="16">
      <SectionHeader title="Selected work" link={{ href: "/work", label: "All projects" }} />
      <Column fillWidth as="ol">
        {projects.map((project, index) => {
          const cover = project.metadata.images.find((src) => !src.endsWith(".mp4"));
          const row = (
            <Card
              href={`/work/${project.slug}`}
              fillWidth
              direction="row"
              vertical="center"
              gap="24"
              paddingY="24"
              paddingX="16"
              radius="m"
              background="transparent"
              border="transparent"
              s={{ gap: "16", paddingX: "8" }}
            >
              <Text textVariant="code-default-s" onBackground="neutral-weak" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Column flex={1} gap="8">
                <Text textVariant="heading-strong-xl" wrap="balance">
                  {project.metadata.title}
                </Text>
                {project.metadata.summary && (
                  <Row s={{ hide: true }}>
                    <Text textVariant="body-default-s" onBackground="neutral-weak" wrap="pretty">
                      {project.metadata.summary}
                    </Text>
                  </Row>
                )}
              </Column>
              <Row s={{ hide: true }}>
                <Text textVariant="label-default-s" onBackground="neutral-weak">
                  {new Date(project.metadata.publishedAt).getFullYear()}
                </Text>
              </Row>
              <Icon name="arrowUpRight" size="s" onBackground="neutral-weak" aria-hidden />
            </Card>
          );

          return (
            <Column as="li" key={project.slug} fillWidth>
              {index > 0 && <Line />}
              {cover ? (
                <HoverCard placement="cursor" cursorPlacement="bottom-right" trigger={row}>
                  <Column
                    width={320}
                    radius="l"
                    overflow="hidden"
                    border="neutral-alpha-medium"
                    shadow="l"
                  >
                    <Media src={cover} alt="" aspectRatio="16 / 10" sizes="320px" radius="none" />
                  </Column>
                </HoverCard>
              ) : (
                row
              )}
            </Column>
          );
        })}
      </Column>
    </Column>
  );
}

import { Card, Column, Grid, Icon, Media, Row, Text } from "@once-ui-system/core";
import { TiltFx } from "@once-ui-system/fx";
import { getSortedPosts } from "@/utils/utils";
import { SectionHeader } from "./SectionHeader";

interface WorkBentoProps {
  range?: [number, number?];
}

export function WorkBento({ range }: WorkBentoProps) {
  const projects = getSortedPosts(["src", "app", "work", "projects"], range);
  if (projects.length === 0) return null;

  return (
    <Column fillWidth gap="16">
      <SectionHeader title="Selected work" link={{ href: "/work", label: "All projects" }} />
      <Grid fillWidth columns={2} gap="16" s={{ columns: 1 }}>
        {projects.map((project, index) => {
          // Every third tile, starting with the first, is a large one spanning two rows.
          const large = index % 3 === 0;
          const cover = project.metadata.images.find((src) => !src.endsWith(".mp4"));
          return (
            <TiltFx
              key={project.slug}
              fill
              radius="l"
              intensity={0.4}
              style={large ? { gridRow: "span 2" } : undefined}
            >
              <Card
                href={`/work/${project.slug}`}
                fill
                radius="l"
                overflow="hidden"
                padding="0"
                minHeight={large ? 480 : 232}
                s={{ minHeight: 280 }}
              >
                {cover && (
                  <Media
                    src={cover}
                    alt=""
                    position="absolute"
                    top="0"
                    left="0"
                    fill
                    radius="none"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                )}
                <Row
                  position="absolute"
                  bottom="0"
                  left="0"
                  fillWidth
                  padding="20"
                  gap="16"
                  vertical="center"
                  horizontal="between"
                  background="surface"
                  backdropBlur="m"
                  borderTop
                >
                  <Column gap="4">
                    <Text
                      textVariant={large ? "heading-strong-l" : "heading-strong-m"}
                      wrap="balance"
                    >
                      {project.metadata.title}
                    </Text>
                    <Text textVariant="label-default-s" onBackground="neutral-weak">
                      {new Date(project.metadata.publishedAt).getFullYear()}
                    </Text>
                  </Column>
                  <Icon name="arrowUpRight" size="s" onBackground="neutral-weak" aria-hidden />
                </Row>
              </Card>
            </TiltFx>
          );
        })}
      </Grid>
    </Column>
  );
}

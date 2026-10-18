import { Column, Heading, Line, Row } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";

interface PostsGridProps {
  range?: [number, number?];
}

export function PostsGrid({ range = [1, 2] }: PostsGridProps) {
  return (
    <Column fillWidth gap="24" marginBottom="l">
      <Row fillWidth paddingRight="64">
        <Line maxWidth="48rem" />
      </Row>
      <Row fillWidth gap="24" marginTop="40" s={{ direction: "column", marginTop: "16", gap: "8" }}>
        <Row flex={1} paddingLeft="l" paddingTop="24" s={{ paddingLeft: "16", paddingTop: "8" }}>
          <Heading as="h2" textVariant="display-strong-xs" wrap="balance">
            Latest from the blog
          </Heading>
        </Row>
        <Row flex={3} paddingX="20" s={{ paddingX: "0" }}>
          <Posts range={range[1] ? [range[0], range[1]] : [range[0]]} columns="2" />
        </Row>
      </Row>
      <Row fillWidth paddingLeft="64" horizontal="end">
        <Line maxWidth="48rem" />
      </Row>
    </Column>
  );
}

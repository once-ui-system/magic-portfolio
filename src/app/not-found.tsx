import { Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        未找到页面
      </Heading>
      <Text onBackground="neutral-weak">你所寻找的页面不存在</Text>
    </Column>
  );
}

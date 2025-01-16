import { Column, Heading, Text } from "@/once-ui/components";

export default function NotFound() {
  return (
    <Column as="section" horizontal="center">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-strong-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
    </Column>
  );
}

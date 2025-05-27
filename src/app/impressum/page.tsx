import { Column, Heading, Text } from "@/once-ui/components";
import { person } from "../resources";

export default function Impressum() {
  return (
    <Column
      as="section"
      maxWidth="m"
      fillWidth
      align="center"
      gap="32"
      style={{ minHeight: "60vh", justifyContent: "center" }}
    >
      <Heading variant="display-default-xs" align="center" marginBottom="l">
        Impressum
      </Heading>
      <Column gap="0" align="center">
        <Text align="center" variant="body-default-m">{person.name}</Text>
        <Text align="center" variant="body-default-m">{person.street}</Text>
        <Text align="center" variant="body-default-m">{person.zip} {person.city}</Text>
      </Column>
      <Heading as="h2" variant="display-default-xs" align="center" marginTop="l">
        Kontakt
      </Heading>
      <Column gap="0" align="center">
        <Text align="center" variant="body-default-m">{person.email}</Text>
      </Column>
    </Column>
  );
}
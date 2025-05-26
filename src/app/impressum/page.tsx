import { Column, Heading, Text } from "@/once-ui/components";

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
        <Text align="center" variant="body-default-m">Marcel Kuhn</Text>
        <Text align="center" variant="body-default-m">Orffstraße 3</Text>
        <Text align="center" variant="body-default-m">90439 Nürnberg</Text>
      </Column>
      <Heading as="h2" variant="display-default-xxs" align="center" marginTop="l">
        Kontakt
      </Heading>
      <Column gap="0" align="center">
        <Text align="center" variant="body-default-m">Telefon: +49 (0) 176 456 088 09</Text>
        <Text align="center" variant="body-default-m">Telefax: +49 (0) 911 968 47 XXX</Text>
        <Text align="center" variant="body-default-m">E-Mail: kontakt@marcelkuhn.dev</Text>
      </Column>
    </Column>
  );
}
import { Column, Grid, Heading, Text } from "@once-ui-system/core";
import { PlaybookCard } from "./PlaybookCard";
import playbooks from "@/resources/playbooks.json";

export function PlaybookList() {
  return (
    <Column gap="16">
      <Grid columns="2" mobileColumns="1" gap="12">
        {playbooks.map((p) => (
          <PlaybookCard key={p.slug} {...p} />
        ))}
      </Grid>
      <Heading as="h3" variant="heading-strong-m">How it works</Heading>
      <Text onBackground="neutral-weak">Enter your email to receive the download link and future updates relevant to your industry. No spam.</Text>
    </Column>
  );
}

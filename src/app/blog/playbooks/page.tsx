import { Column, Heading, Meta, SmartLink } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { PlaybooksList } from "@/components/blog/PlaybooksList";

export async function generateMetadata() {
  return Meta.generate({
    title: "All Playbooks",
    description: "Sector playbooks and quick wins",
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Playbooks")}`,
    path: "/blog/playbooks",
  });
}

export default function AllPlaybooksPage() {
  return (
    <Column maxWidth="s">
      <Heading marginBottom="l" variant="display-strong-s">All Playbooks</Heading>
      <PlaybooksList limit={0} />
    </Column>
  );
}


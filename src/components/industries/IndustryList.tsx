import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import { IndustryCard } from "./IndustryCard";

export function IndustryList() {
  const posts = getPosts(["src", "app", "industries", "pages"]);
  const sorted = posts.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));

  return (
    <>
      {sorted.length > 0 && (
        <Grid columns="2" mobileColumns="1" fillWidth marginBottom="40" gap="12">
          {sorted.map((post) => (
            <IndustryCard key={post.slug} post={post} />
          ))}
        </Grid>
      )}
    </>
  );
}


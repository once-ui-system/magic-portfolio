import { getPosts } from "@/app/utils/utils";
import { Grid } from "@/once-ui/components";
import Resource from "./Resource";

interface ResourcesProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
}

export function Resources({ range, columns = "1", thumbnail = true }: ResourcesProps) {
  let allAgileResources = getPosts(["src", "app", "agile", "resources"]);

  const sortedAgileResources = allAgileResources.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedAgileResources = range
    ? sortedAgileResources.slice(range[0] - 1, range.length === 2 ? range[1] : sortedAgileResources.length)
    : sortedAgileResources;

  return (
    <>
      {displayedAgileResources.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="m">
          {displayedAgileResources.map((resource, index) => (
            <>
            <Resource key={resource.slug || index} 
            resource={resource} 
            thumbnail={thumbnail} />
           </>
            
          ))}
        </Grid>
      )}
    </>
  );
}

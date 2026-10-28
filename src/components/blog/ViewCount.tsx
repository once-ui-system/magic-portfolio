import { viewsEnabled } from "@/app/api/views/handlers";
import type { ContentKind } from "@/utils/contentKind";
import { ViewCountClient } from "./ViewCountClient";

interface ViewCountProps {
  slug: string;
  kind?: ContentKind;
}

/** Read count beside the date. Renders nothing when `features.viewCounts` is off or there's no store. */
export function ViewCount({ slug, kind = "blog" }: ViewCountProps) {
  if (!viewsEnabled) return null;
  return <ViewCountClient slug={slug} kind={kind} />;
}

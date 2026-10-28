import { likesEnabled } from "@/app/api/likes/handlers";
import type { ContentKind } from "@/utils/contentKind";
import { LikeButtonClient } from "./LikeButtonClient";

interface LikeButtonProps extends React.ComponentProps<typeof LikeButtonClient> {
  slug: string;
  kind?: ContentKind;
}

/** Like toggle. Renders nothing when `features.likes` is off or there's no store. */
export function LikeButton({ slug, kind = "blog", ...flex }: LikeButtonProps) {
  if (!likesEnabled) return null;
  return <LikeButtonClient slug={slug} kind={kind} {...flex} />;
}

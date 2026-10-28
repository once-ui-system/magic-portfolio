import { RouteTransition } from "@/components/motion";
import { features } from "@/resources";
import type { ReactNode } from "react";

// Mounts again on every move between top-level sections. RouteTransition also catches moves inside
// a section (/blog to a post) by watching the path.
export default function Template({ children }: { children: ReactNode }) {
  if (!(features.routeTransition ?? true)) return children;
  return <RouteTransition>{children}</RouteTransition>;
}

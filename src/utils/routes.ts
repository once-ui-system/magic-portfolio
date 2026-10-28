import { routes } from "@/resources";

// Sections whose pages live under a prefix: /blog/my-post follows "/blog".
const sections = ["/blog", "/work"] as const;

// Magic Portfolio's own pages. Each one calls notFound() on the server when it's switched off,
// which sends a real 404 status.
const checkedOnServer = ["/", "/about", "/work", "/blog", "/gallery"];

// "/blog/" and "/blog" are the same page. A background regeneration can report "/" as "/index".
function normalize(pathname: string | null) {
  return !pathname || pathname === "/index" ? "/" : pathname.replace(/\/+$/, "") || "/";
}

function sectionOf(path: string) {
  return sections.find((route) => path.startsWith(`${route}/`));
}

/**
 * Whether a path is switched on in `routes` (once-ui.config.ts). Pages under /blog and /work
 * follow their section. A path the config doesn't list is allowed: if it doesn't exist, Next
 * already returns its own 404. Safe to call on the server and in the browser.
 */
export function isRouteEnabled(pathname: string | null): boolean {
  const path = normalize(pathname);

  if (path in routes) {
    return routes[path as keyof typeof routes] !== false;
  }

  const section = sectionOf(path);
  return section ? routes[section] !== false : true;
}

/** Whether the page at this path checks `routes` itself on the server. */
export function isCheckedOnServer(pathname: string | null): boolean {
  const path = normalize(pathname);
  return checkedOnServer.includes(path) || sectionOf(path) !== undefined;
}

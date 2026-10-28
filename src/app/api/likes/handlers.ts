import { features } from "@/resources";
import {
  type SlugParams,
  canAccess,
  clientIp,
  isSameOrigin,
  json,
  visitorId,
} from "@/utils/apiGuards";
import { type ContentKind, contentId } from "@/utils/contentKind";
import { store } from "@/utils/redis";
import type { NextRequest } from "next/server";

const TOGGLES_PER_MINUTE = 20;

/** On when `features.likes` is true and there is a store (Redis, or memory in `next dev`). */
export const likesEnabled = Boolean(features.likes && store);

/**
 * GET returns the count and whether this visitor liked the item; POST toggles the visitor's like.
 * Each item is a set of anonymous visitor ids, so one like per visitor.
 * Keys: `likes:<slug>` for posts, `likes:work:<slug>` for projects.
 */
export function likeHandlers(kind: ContentKind) {
  async function GET(request: NextRequest, { params }: SlugParams) {
    const { slug } = await params;
    if (!likesEnabled || !store) return json({ enabled: false, count: 0, liked: false });
    if (!canAccess(request, kind, slug)) return json({ error: "Not found" }, { status: 404 });

    const key = `likes:${contentId(kind, slug)}`;
    const visitor = request.cookies.get("vid")?.value;
    try {
      const [count, liked] = await Promise.all([
        store.size(key),
        visitor ? store.has(key, visitor) : false,
      ]);
      return json({ enabled: true, count, liked });
    } catch {
      return json({ enabled: false, count: 0, liked: false });
    }
  }

  async function POST(request: NextRequest, { params }: SlugParams) {
    const { slug } = await params;
    if (!likesEnabled || !store) {
      return json({ enabled: false, count: 0, liked: false }, { status: 503 });
    }
    if (!isSameOrigin(request)) return json({ error: "Forbidden" }, { status: 403 });
    if (!canAccess(request, kind, slug)) return json({ error: "Not found" }, { status: 404 });

    const visitor = visitorId(request);
    const key = `likes:${contentId(kind, slug)}`;
    try {
      // Dev or a preview against real Redis: show the real numbers, don't change them
      if (!store.writable) {
        return json({ error: "This deployment is read-only" }, { status: 403 });
      }

      const hits = await store.hit(`likes:rate:${clientIp(request)}`, 60);
      if (hits > TOGGLES_PER_MINUTE) {
        return json({ error: "Too many requests" }, { status: 429, visitor });
      }

      const liked = await store.toggle(key, visitor);
      return json({ enabled: true, count: await store.size(key), liked }, { visitor });
    } catch {
      return json({ error: "Something went wrong" }, { status: 500 });
    }
  }

  return { GET, POST };
}

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

const ONE_DAY = 60 * 60 * 24;
const READS_PER_MINUTE = 30;

/** On when `features.viewCounts` is true and there is a store (Redis, or memory in `next dev`). */
export const viewsEnabled = Boolean(features.viewCounts && store);

/**
 * GET reads the count; POST records a read and returns the total. One read per visitor per item
 * per 24 hours. Keys: `views:<slug>` for posts, `views:work:<slug>` for projects.
 */
export function viewHandlers(kind: ContentKind) {
  async function GET(request: NextRequest, { params }: SlugParams) {
    const { slug } = await params;
    if (!viewsEnabled || !store) return json({ enabled: false, count: 0 });
    if (!canAccess(request, kind, slug)) return json({ error: "Not found" }, { status: 404 });
    try {
      return json({ enabled: true, count: await store.count(`views:${contentId(kind, slug)}`) });
    } catch {
      return json({ enabled: false, count: 0 });
    }
  }

  async function POST(request: NextRequest, { params }: SlugParams) {
    const { slug } = await params;
    if (!viewsEnabled || !store) return json({ enabled: false, count: 0 }, { status: 503 });
    if (!isSameOrigin(request)) return json({ error: "Forbidden" }, { status: 403 });
    if (!canAccess(request, kind, slug)) return json({ error: "Not found" }, { status: 404 });

    const visitor = visitorId(request);
    const key = `views:${contentId(kind, slug)}`;
    try {
      // Dev or a preview against real Redis: show the real number, don't change it
      if (!store.writable) return json({ enabled: true, count: await store.count(key) });

      const hits = await store.hit(`views:rate:${clientIp(request)}`, 60);
      if (hits > READS_PER_MINUTE) {
        return json({ enabled: true, count: await store.count(key) }, { visitor });
      }

      const firstToday = await store.claim(
        `views:seen:${contentId(kind, slug)}:${visitor}`,
        ONE_DAY,
      );
      const count = firstToday ? await store.increment(key) : await store.count(key);
      return json({ enabled: true, count }, { visitor });
    } catch {
      return json({ error: "Something went wrong" }, { status: 500 });
    }
  }

  return { GET, POST };
}

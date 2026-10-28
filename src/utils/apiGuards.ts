import { blog, protectedRoutes, work } from "@/resources";
import type { ContentKind } from "@/utils/contentKind";
import { getPosts } from "@/utils/utils";
import { type NextRequest, NextResponse } from "next/server";

// Server-only helpers shared by the read count and like APIs.

const VISITOR_COOKIE = "vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

const CONTENT: Record<ContentKind, { dir: string[]; path: string }> = {
  blog: { dir: ["src", "app", "blog", "posts"], path: blog.path },
  work: { dir: ["src", "app", "work", "projects"], path: work.path },
};

// Slugs are read from disk once per server instance: they only change with a new build
const slugs: Partial<Record<ContentKind, Set<string>>> = {};

/**
 * Whether this request may see the item: it has to exist, and a password-protected page only
 * counts for visitors who unlocked it.
 */
export function canAccess(request: NextRequest, kind: ContentKind, slug: string) {
  slugs[kind] ??= new Set(getPosts(CONTENT[kind].dir).map((post) => post.slug));
  if (!slugs[kind].has(slug)) return false;
  const path = `${CONTENT[kind].path}/${slug}` as `/${string}`;
  return !protectedRoutes[path] || request.cookies.get("authToken")?.value === "authenticated";
}

/**
 * Only the site's own pages may write. Browsers send Sec-Fetch-Site on fetch, with Origin as the
 * fallback, so other sites can't inflate numbers from their visitors' browsers.
 */
export function isSameOrigin(request: NextRequest) {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Anonymous visitor id from an httpOnly cookie, or a new one (set by `json`). */
export function visitorId(request: NextRequest) {
  return request.cookies.get(VISITOR_COOKIE)?.value || crypto.randomUUID();
}

export function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Uncached JSON response; with `visitor`, (re)sets the anonymous visitor cookie. */
export function json(body: object, init?: { status?: number; visitor?: string }) {
  const response = NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: { "Cache-Control": "no-store" },
  });
  if (init?.visitor) {
    response.cookies.set(VISITOR_COOKIE, init.visitor, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_YEAR,
      path: "/",
    });
  }
  return response;
}

export type SlugParams = { params: Promise<{ slug: string }> };

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Server-side access for the routes in `protectedRoutes`
 * (`src/resources/once-ui.config.ts`).
 *
 * `/api/authenticate` checks the password and sets an HttpOnly cookie that
 * holds an expiry and an HMAC of it. `src/proxy.ts` and the protected pages
 * check that cookie before rendering anything, so a protected page's content
 * never reaches a visitor without the password, and the cookie cannot be
 * written by hand.
 *
 * The HMAC key is `PAGE_ACCESS_SECRET`. Without it, a key derived from
 * `PAGE_ACCESS_PASSWORD` is used, so changing the password signs everyone out.
 */

export const PAGE_ACCESS_COOKIE = "authToken";
export const PAGE_ACCESS_MAX_AGE = 60 * 60; // seconds

function signingKey(): Buffer | null {
  const secret = process.env.PAGE_ACCESS_SECRET;
  if (secret) return createHash("sha256").update(secret).digest();
  const password = process.env.PAGE_ACCESS_PASSWORD;
  if (password) {
    return createHash("sha256").update(`magic-portfolio:page-access:${password}`).digest();
  }
  return null;
}

function sign(key: Buffer, payload: string): string {
  return createHmac("sha256", key).update(`v1.${payload}`).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so both sides have the same length and the compare stays constant-time.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Constant-time check of a submitted password against `PAGE_ACCESS_PASSWORD`. */
export function isCorrectPassword(submitted: unknown): boolean {
  const expected = process.env.PAGE_ACCESS_PASSWORD;
  if (!expected || typeof submitted !== "string") return false;
  return safeEqual(submitted, expected);
}

/** A new cookie value, valid for `PAGE_ACCESS_MAX_AGE` seconds. Null when no key is configured. */
export function createAccessToken(now = Date.now()): string | null {
  const key = signingKey();
  if (!key) return null;
  const expires = Math.floor(now / 1000) + PAGE_ACCESS_MAX_AGE;
  return `${expires}.${sign(key, String(expires))}`;
}

/** True when `token` was made by `createAccessToken` with the current key and has not expired. */
export function isValidAccessToken(token: string | undefined | null, now = Date.now()): boolean {
  const key = signingKey();
  if (!key || !token) return false;
  const [expires, signature, ...rest] = token.split(".");
  if (rest.length || !expires || !signature || !/^\d{1,12}$/.test(expires)) return false;
  if (Number(expires) <= Math.floor(now / 1000)) return false;
  return safeEqual(signature, sign(key, expires));
}

function normalizePath(pathname: string): string {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    // keep the raw path
  }
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path.toLowerCase();
}

/** True when `pathname` is listed (and set to true) in `protectedRoutes`. */
export function isProtectedPath(
  pathname: string,
  protectedRoutes: Record<string, boolean>,
): boolean {
  const path = normalizePath(pathname);
  return Object.entries(protectedRoutes).some(
    ([route, enabled]) => enabled && normalizePath(route) === path,
  );
}

// Password attempts per client, kept in this server instance's memory.
// On serverless hosts each instance counts on its own, so this slows guessing
// down rather than capping it exactly.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

/** Counts one attempt for `key`. Returns the seconds to wait when over the limit, else 0. */
export function takeAttempt(key: string, now = Date.now()): number {
  if (attempts.size > 10_000) {
    for (const [k, v] of attempts) if (v.resetAt <= now) attempts.delete(k);
  }
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return 0;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS ? Math.ceil((entry.resetAt - now) / 1000) : 0;
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}

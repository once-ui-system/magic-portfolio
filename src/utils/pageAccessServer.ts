import { protectedRoutes } from "@/resources";
import { PAGE_ACCESS_COOKIE, isProtectedPath, isValidAccessToken } from "@/utils/pageAccess";
import { cookies } from "next/headers";

/**
 * For a page to call before rendering its content: false when `path` is in
 * `protectedRoutes` and the request has no valid access cookie. Reading the
 * cookie makes that one path render per request, so no static copy of a
 * protected page is built. src/proxy.ts checks the same cookie first.
 */
export async function canViewPath(path: string): Promise<boolean> {
  if (!isProtectedPath(path, protectedRoutes)) return true;
  const cookieStore = await cookies();
  return isValidAccessToken(cookieStore.get(PAGE_ACCESS_COOKIE)?.value);
}

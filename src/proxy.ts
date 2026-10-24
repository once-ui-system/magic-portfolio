import { protectedRoutes } from "@/resources/once-ui.config";
import { PAGE_ACCESS_COOKIE, isProtectedPath, isValidAccessToken } from "@/utils/pageAccess";
import { type NextRequest, NextResponse } from "next/server";

// A protected route is only rendered for a visitor with a valid signed cookie
// from /api/authenticate. Everyone else gets /locked (no content) under the
// same URL, and RouteGuard shows the password form there.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtectedPath(pathname, protectedRoutes)) return NextResponse.next();

  const response = isValidAccessToken(request.cookies.get(PAGE_ACCESS_COOKIE)?.value)
    ? NextResponse.next()
    : NextResponse.rewrite(new URL("/locked", request.url));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  // Pages only: not API routes, Next's assets or files in public/.
  matcher: ["/((?!api/|_next/|_vercel/|.*\\.[^/]+$).*)"],
};

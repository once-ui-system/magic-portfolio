import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_auth";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/admin")) {
    const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
    const pass = process.env.ADMIN_PASSWORD || "";
    const authed = pass && cookie === pass;
    if (!authed && !url.pathname.startsWith("/admin/login")) {
      const login = url.clone();
      login.pathname = "/admin/login";
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


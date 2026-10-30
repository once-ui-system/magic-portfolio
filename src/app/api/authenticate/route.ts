import {
  PAGE_ACCESS_COOKIE,
  PAGE_ACCESS_MAX_AGE,
  clearAttempts,
  clientKey,
  createAccessToken,
  isCorrectPassword,
  takeAttempt,
} from "@/utils/pageAccess";
import * as cookie from "cookie";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.PAGE_ACCESS_PASSWORD) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  const client = clientKey(request.headers);
  const retryAfter = takeAttempt(client);
  if (retryAfter > 0) {
    return NextResponse.json(
      { message: "Too many attempts, try again later" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!isCorrectPassword(password)) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const token = createAccessToken();
  if (!token) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  clearAttempts(client);
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize(PAGE_ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: PAGE_ACCESS_MAX_AGE,
      sameSite: "strict",
      path: "/",
    }),
  );
  return response;
}

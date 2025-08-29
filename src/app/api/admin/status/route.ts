import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pass = process.env.ADMIN_PASSWORD || '';
  const cookie = req.cookies.get('admin_auth')?.value || '';
  const ok = !!pass && cookie === pass;
  return NextResponse.json({ ok });
}


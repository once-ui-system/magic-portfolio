import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'not configured' }, { status: 400 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'invalid' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_auth', password, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}


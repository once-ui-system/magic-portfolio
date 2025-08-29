import { NextRequest, NextResponse } from "next/server";
import { setTakeover, getSession } from "@/lib/realtime/store";

export async function POST(req: NextRequest) {
  const { session, value } = await req.json();
  if (!session) return NextResponse.json({ error: 'session required' }, { status: 400 });
  if (!getSession(session)) return NextResponse.json({ error: 'not found' }, { status: 404 });
  setTakeover(session, Boolean(value));
  return NextResponse.json({ ok: true });
}


import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/realtime/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session = searchParams.get('session') || '';
  const s = getSession(session);
  if (!s) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ id: s.id, takeover: s.takeover, messages: s.messages });
}


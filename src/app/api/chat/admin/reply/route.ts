import { NextRequest, NextResponse } from "next/server";
import { addMessage, getSession } from "@/lib/realtime/store";
import { appendJSONL, appendChatDay, upsertSessionJSON } from "@/lib/realtime/persist";

export async function POST(req: NextRequest) {
  const { session, content } = await req.json();
  if (!session || !content) return NextResponse.json({ error: 'session and content required' }, { status: 400 });
  if (!getSession(session)) return NextResponse.json({ error: 'not found' }, { status: 404 });
  const msg = addMessage(session, 'admin', content);
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  const ua = req.headers.get('user-agent') || '';
  const rec = { type: 'message', role: 'admin', session, message: msg, at: Date.now(), ip, ua };
  await appendJSONL("chat_sessions.jsonl", rec);
  await appendChatDay(rec);
  await upsertSessionJSON(session, (data:any) => { (data.messages||=[]).push(msg); return data; });
  return NextResponse.json({ ok: true });
}

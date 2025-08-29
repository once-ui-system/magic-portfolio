import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/realtime/store";
import { appendJSONL, appendChatDay, upsertSessionJSON } from "@/lib/realtime/persist";

export async function POST(req: NextRequest) {
  const s = createSession();
  // Persist creation with optional client-provided session info
  let info: any = {};
  try { info = await req.json(); } catch {}
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  const ua = req.headers.get('user-agent') || '';
  const rec = { type: "create", id: s.id, at: Date.now(), ip, ua, info };
  await appendJSONL("chat_sessions.jsonl", rec);
  await appendChatDay(rec);
  await upsertSessionJSON(s.id, (data:any) => { data.meta = { ...(data.meta||{}), ip, ua, info, createdAt: Date.now() }; return data; });
  return NextResponse.json({ id: s.id });
}

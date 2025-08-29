import { NextRequest, NextResponse } from "next/server";
import { addMessage, getSession } from "@/lib/realtime/store";
import { appendJSONL, appendChatDay, upsertSessionJSON } from "@/lib/realtime/persist";
import flow from "@/resources/chatflow.json";
import { assistantReply } from "@/lib/ai/openai";

export async function POST(req: NextRequest) {
  try {
    const { session, content, info } = await req.json();
    if (!session || !content) return NextResponse.json({ error: "session and content required" }, { status: 400 });
    const s = getSession(session);
    if (!s) return NextResponse.json({ error: "session not found" }, { status: 404 });

    const um = addMessage(session, 'user', content);
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const ua = req.headers.get('user-agent') || '';
    const urec = { type: 'message', role: 'user', session, message: um, at: Date.now(), ip, ua, info };
    await appendJSONL("chat_sessions.jsonl", urec);
    await appendChatDay(urec);
    await upsertSessionJSON(session, (data:any) => { (data.messages||=[]).push(um); return data; });

    if (s.takeover) {
      // Admin takeover: queue only; admin replies via admin endpoint
      return NextResponse.json({ status: 'queued' });
    }

    // AI reply path (stubbed)
    const history = s.messages.map(m => ({ role: m.role === 'admin' ? 'assistant' : m.role, content: m.content })) as any[];
    const reply = await assistantReply(history.concat([{ role: 'user', content }]));
    const am = addMessage(session, 'assistant', reply);
    const arec = { type: 'message', role: 'assistant', session, message: am, at: Date.now() };
    await appendJSONL("chat_sessions.jsonl", arec);
    await appendChatDay(arec);
    await upsertSessionJSON(session, (data:any) => { (data.messages||=[]).push(am); return data; });
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown error' }, { status: 500 });
  }
}

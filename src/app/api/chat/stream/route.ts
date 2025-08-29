import { NextRequest } from "next/server";
import { getSession } from "@/lib/realtime/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('session') || '';
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (obj: any) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      const tick = () => {
        const s = id ? getSession(id) : undefined;
        send({ type: 'messages', id, takeover: s?.takeover || false, messages: s?.messages || [] });
      };
      tick();
      const timer = setInterval(tick, 2000);
      const close = () => { clearInterval(timer); controller.close(); };
      // @ts-ignore
      controller._close = close;
    },
    cancel(reason) {}
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
}


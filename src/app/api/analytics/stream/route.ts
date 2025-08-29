import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathFilter = searchParams.get('path') || undefined;
  const hours = parseInt(searchParams.get('hours') || '24', 10);
  const device = searchParams.get('device') || 'any';
  const country = searchParams.get('country') || undefined;
  const since = Date.now() - hours * 3600_000;
  const file = path.join(process.cwd(), 'var', 'analytics_events.jsonl');
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (obj: any) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      const tick = () => {
        try {
          if (!fs.existsSync(file)) { send({ clicks: 0, moves: 0 }); return; }
          const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
          let clicks = 0, moves = 0;
          for (const ln of lines) {
            const ev = JSON.parse(ln);
            if (ev.at && ev.at < since) continue;
            if (pathFilter && ev.path !== pathFilter) continue;
            const ua: string = ev.ua || ev.serverUA || '';
            const isMobile = /Mobi|Android/i.test(ua);
            if (device === 'mobile' && !isMobile) continue;
            if (device === 'desktop' && isMobile) continue;
            if (country) {
              const geo = ev.geo || {};
              const c = (geo.country || geo.countryCode || geo.country_code || geo.country_name || '').toString().toLowerCase();
              if (!c || !c.includes(country.toLowerCase())) continue;
            }
            if (ev.type === 'click') clicks++; if (ev.type === 'move') moves++;
          }
          send({ clicks, moves, at: Date.now() });
        } catch {}
      };
      tick();
      const timer = setInterval(tick, 2000);
      const close = () => { clearInterval(timer); controller.close(); };
      // @ts-ignore
      controller._close = close;
    }
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
}

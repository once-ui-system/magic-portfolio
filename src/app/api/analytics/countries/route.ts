import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const hours = parseInt(url.searchParams.get('hours') || '720', 10); // last 30 days default
    const since = Date.now() - hours * 3600_000;
    const file = path.join(process.cwd(), 'var', 'analytics_events.jsonl');
    if (!fs.existsSync(file)) return NextResponse.json({ countries: [] });
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
    const map = new Map<string, number>();
    for (const ln of lines) {
      try {
        const ev = JSON.parse(ln);
        if (ev.at && ev.at < since) continue;
        const g = ev.geo || {};
        const c = (g.country || g.countryCode || g.country_code || '').toString();
        if (!c) continue;
        map.set(c, (map.get(c) || 0) + 1);
      } catch {}
    }
    const countries = Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,100).map(([code,count])=>({ code, count }));
    return NextResponse.json({ countries });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'countries-failed' }, { status: 500 });
  }
}


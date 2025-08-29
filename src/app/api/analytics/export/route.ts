import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathFilter = url.searchParams.get('path') || undefined;
    const hours = parseInt(url.searchParams.get('hours') || '24', 10);
    const since = Date.now() - hours * 3600_000;
    const device = url.searchParams.get('device') || 'any'; // any|mobile|desktop
    const country = url.searchParams.get('country') || undefined;

    const file = path.join(process.cwd(), 'var', 'analytics_events.jsonl');
    if (!fs.existsSync(file)) return new NextResponse('no data', { status: 404 });
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);

    const headers = [
      'at_iso','sid','type','path','ref','ua','ip','x','y','w','h','country'
    ];
    const rows: string[] = [headers.join(',')];

    for (const line of lines) {
      try {
        const ev = JSON.parse(line);
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
        const at_iso = ev.at ? new Date(ev.at).toISOString() : '';
        const ctry = (()=>{ const g=ev.geo||{}; return g.country||g.countryCode||g.country_code||''; })();
        const vals = [at_iso, ev.sid||'', ev.type||'', ev.path||'', ev.ref||'', ua.replace(/\s+/g,' ').slice(0,200), ev.ip||'', ev.x||'', ev.y||'', ev.w||'', ev.h||'', ctry];
        rows.push(vals.map(v => typeof v==='string' ? `"${(v as string).replace(/"/g,'""')}"` : v).join(','));
      } catch {}
    }
    return new NextResponse(rows.join('\n'), { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="analytics_export.csv"' } });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'export-failed' }, { status: 500 });
  }
}


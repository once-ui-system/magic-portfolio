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
    if (!fs.existsSync(file)) return NextResponse.json({ clicks: 0, moves: 0, topPages: [], grid: [] });
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);

    let clicks = 0, moves = 0;
    const pageCounts: Record<string, number> = {};
    const gridSize = 40;
    const grid: number[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    for (const line of lines) {
      try {
        const ev = JSON.parse(line);
        if (ev.at && ev.at < since) continue;
        if (pathFilter && ev.path !== pathFilter) continue;
        // device filter
        const ua: string = ev.ua || ev.serverUA || '';
        const isMobile = /Mobi|Android/i.test(ua);
        if (device === 'mobile' && !isMobile) continue;
        if (device === 'desktop' && isMobile) continue;
        // country filter
        if (country) {
          const geo = ev.geo || {};
          const c = (geo.country || geo.countryCode || geo.country_code || geo.country_name || '').toString().toLowerCase();
          if (!c || !c.includes(country.toLowerCase())) continue;
        }
        if (ev.type === 'click') clicks++;
        if (ev.type === 'move') {
          moves++;
          const x = typeof ev.x === 'number' && typeof ev.w === 'number' && ev.w > 0 ? ev.x / ev.w : undefined;
          const y = typeof ev.y === 'number' && typeof ev.h === 'number' && ev.h > 0 ? ev.y / ev.h : undefined;
          if (x !== undefined && y !== undefined) {
            const gx = Math.max(0, Math.min(gridSize - 1, Math.floor(x * gridSize)));
            const gy = Math.max(0, Math.min(gridSize - 1, Math.floor(y * gridSize)));
            grid[gy][gx] += 1;
          }
        }
        if (ev.path) pageCounts[ev.path] = (pageCounts[ev.path] || 0) + 1;
      } catch {}
    }

    const topPages = Object.entries(pageCounts)
      .sort((a,b) => b[1]-a[1])
      .slice(0, 10)
      .map(([p,c]) => ({ path: p, events: c }));

    return NextResponse.json({ clicks, moves, topPages, grid });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'summary-failed' }, { status: 500 });
  }
}

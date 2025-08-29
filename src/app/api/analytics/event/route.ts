import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const ua = req.headers.get('user-agent') || '';
    const dir = path.join(process.cwd(), 'var');
    const file = path.join(dir, 'analytics_events.jsonl');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // Optional geolocation enrichment
    let geo: any = undefined;
    try {
      if (process.env.GEOLOOKUP_URL && ip) {
        const base = process.env.GEOLOOKUP_URL as string;
        const url = `${base}${base.includes('?') ? '&' : '?'}ip=${encodeURIComponent(ip.split(',')[0])}`;
        const headers: any = {};
        if (process.env.GEOLOOKUP_API_KEY) headers['Authorization'] = `Bearer ${process.env.GEOLOOKUP_API_KEY}`;
        const res = await fetch(url, { headers });
        if (res.ok) geo = await res.json();
      }
    } catch {}
    await fs.promises.appendFile(file, JSON.stringify({ ...body, ip, serverAt: Date.now(), serverUA: ua, geo }) + "\n", 'utf8');
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'bad' }, { status: 400 });
  }
}

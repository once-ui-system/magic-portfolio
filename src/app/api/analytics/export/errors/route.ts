import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const file = path.join(process.cwd(), 'var', 'errors.jsonl');
    if (!fs.existsSync(file)) return new NextResponse('no data', { status: 404 });
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
    const headers = ['at_iso','type','msg','src','line','col','stack'];
    const rows: string[] = [headers.join(',')];
    for (const ln of lines) {
      try {
        const e = JSON.parse(ln);
        const at_iso = e.serverAt ? new Date(e.serverAt).toISOString() : '';
        const vals = [at_iso, e.type||'', e.msg||'', e.src||'', e.line||'', e.col||'', (e.stack||'').toString().slice(0,1000)];
        rows.push(vals.map(v => typeof v==='string' ? `"${v.replace(/"/g,'""')}"` : v).join(','));
      } catch {}
    }
    return new NextResponse(rows.join('\n'), { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="errors_export.csv"' } });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'export-failed' }, { status: 500 });
  }
}


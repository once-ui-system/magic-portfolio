import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const file = path.join(process.cwd(), 'var', 'vitals.jsonl');
    if (!fs.existsSync(file)) return new NextResponse('no data', { status: 404 });
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
    const headers = ['at_iso','name','value'];
    const rows: string[] = [headers.join(',')];
    for (const ln of lines) {
      try {
        const v = JSON.parse(ln);
        const at_iso = v.serverAt ? new Date(v.serverAt).toISOString() : '';
        rows.push([at_iso, v.name||'', v.value||''].join(','));
      } catch {}
    }
    return new NextResponse(rows.join('\n'), { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="vitals_export.csv"' } });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'export-failed' }, { status: 500 });
  }
}


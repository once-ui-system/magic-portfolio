import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dir = path.join(process.cwd(), 'var');
    const file = path.join(dir, 'vitals.jsonl');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await fs.promises.appendFile(file, JSON.stringify({ ...body, serverAt: Date.now() }) + "\n", 'utf8');
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'bad' }, { status: 400 });
  }
}


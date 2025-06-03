import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return new Response(JSON.stringify({ ok: false, error: "No file uploaded" }), { status: 400 });
  }
  const filename = formData.get("filename") || file.name;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "public/images/", filename);
  await fs.writeFile(filePath, buffer);
  return new Response(JSON.stringify({ ok: true, filename }), { status: 200 });
}

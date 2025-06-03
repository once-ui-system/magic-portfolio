import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "src/app/resources/content.js");
    // Формируем JS-модуль с экспортом новых данных
    const content = `// Автоматически сгенерировано панелью управления\nexport const person = ${JSON.stringify(body.person, null, 2)};\nexport const home = ${JSON.stringify(body.home, null, 2)};\nexport const about = ${JSON.stringify(body.about, null, 2)};\nexport const work = ${JSON.stringify(body.work, null, 2)};\nexport const blog = ${JSON.stringify(body.blog, null, 2)};\nexport const gallery = ${JSON.stringify(body.gallery, null, 2)};\nexport const social = ${JSON.stringify(body.social, null, 2)};\n`;
    await fs.writeFile(filePath, content, "utf8");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}

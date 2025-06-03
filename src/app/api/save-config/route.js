import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "src/app/resources/config.js");
    // Формируем JS-модуль с экспортом новых настроек
    const content = `// Автоматически сгенерировано панелью управления\nexport const config = ${JSON.stringify(body.config, null, 2)};\n`;
    await fs.writeFile(filePath, content, "utf8");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
}

import fs from "fs";
import path from "path";

function ensure(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function appendJSONL(filename: string, record: any) {
  const dir = path.join(process.cwd(), "var");
  ensure(dir);
  const file = path.join(dir, filename);
  await fs.promises.appendFile(file, JSON.stringify(record) + "\n", "utf8");
}

function sessionDir() {
  const dir = path.join(process.cwd(), "var", "chat", "sessions");
  ensure(dir);
  return dir;
}

function dayDir() {
  const dir = path.join(process.cwd(), "var", "chat", "days");
  ensure(dir);
  return dir;
}

export async function appendChatDay(record: any) {
  const d = new Date();
  const day = d.toISOString().slice(0, 10); // YYYY-MM-DD
  const file = path.join(dayDir(), `${day}.jsonl`);
  await fs.promises.appendFile(file, JSON.stringify(record) + "\n", "utf8");
}

export async function upsertSessionJSON(sessionId: string, updater: (data: any) => any) {
  const file = path.join(sessionDir(), `${sessionId}.json`);
  let data: any = { id: sessionId, createdAt: Date.now(), messages: [], meta: {} };
  if (fs.existsSync(file)) {
    try { data = JSON.parse(fs.readFileSync(file, "utf8")); } catch {}
  }
  const next = updater(data) || data;
  await fs.promises.writeFile(file, JSON.stringify(next, null, 2), "utf8");
}

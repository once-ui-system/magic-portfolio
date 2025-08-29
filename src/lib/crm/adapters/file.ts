import fs from "fs";
import path from "path";
import type { CRMAdapter, Lead } from "../types";

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function FileAdapter(): CRMAdapter {
  const dir = path.join(process.cwd(), "var");
  const file = path.join(dir, "leads.jsonl");
  ensureDir(dir);

  return {
    async createLead(lead: Lead) {
      const line = JSON.stringify(lead) + "\n";
      await fs.promises.appendFile(file, line, "utf8");
      return { id: lead.id };
    },
  };
}


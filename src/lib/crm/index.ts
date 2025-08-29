import { ConsoleAdapter } from "./adapters/console";
import { FileAdapter } from "./adapters/file";
import { HubSpotAdapter } from "./adapters/hubspot";
import type { CRMAdapter } from "./types";

export function getCRMAdapter(): CRMAdapter {
  const target = process.env.CRM_TARGET || "file";
  try {
    if (target === "file") return FileAdapter();
    if (target === "hubspot") return HubSpotAdapter();
    return ConsoleAdapter();
  } catch (e) {
    return ConsoleAdapter();
  }
}

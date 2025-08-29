import type { CRMAdapter, Lead } from "../types";

export function ConsoleAdapter(): CRMAdapter {
  return {
    async createLead(lead: Lead) {
      // eslint-disable-next-line no-console
      console.log("[CRM] Lead received", { id: lead.id, email: lead.email, industry: lead.industry });
      return { id: lead.id };
    },
  };
}


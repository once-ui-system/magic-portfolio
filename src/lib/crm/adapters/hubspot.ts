import type { CRMAdapter, Lead } from "../types";

export function HubSpotAdapter(token?: string): CRMAdapter {
  const auth = token || process.env.HUBSPOT_PRIVATE_APP_TOKEN || "";
  return {
    async createLead(lead: Lead) {
      if (!auth) throw new Error("Missing HUBSPOT_PRIVATE_APP_TOKEN");
      const props: Record<string, any> = {
        email: lead.email,
        firstname: lead.name?.split(" ")[0] || lead.name,
        lastname: lead.name?.split(" ").slice(1).join(" ") || "",
        company: lead.company || undefined,
        lifecyclestage: "lead",
        message: lead.message || undefined,
        industry: lead.industry || undefined,
        hs_lead_status: "NEW",
      };

      const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: props }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HubSpot error: ${res.status} ${text}`);
      }
      const contact = await res.json();

      // Optionally create a Deal and associate it
      if ((process.env.HUBSPOT_CREATE_DEAL || "false").toLowerCase() === "true") {
        try {
          const dealProps: Record<string, any> = {
            dealname: `Lead: ${lead.company || lead.name}${lead.industry ? ` - ${lead.industry}` : ""}`,
            pipeline: process.env.HUBSPOT_PIPELINE_ID || undefined,
            dealstage: process.env.HUBSPOT_STAGE_ID || undefined,
            amount: typeof lead.value === "number" ? lead.value : undefined,
            source: lead.source || undefined,
          };
          const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${auth}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ properties: dealProps }),
          });
          if (dealRes.ok) {
            const deal = await dealRes.json();
            // Try to associate deal <-> contact; ignore if it fails
            await fetch("https://api.hubapi.com/crm/v3/associations/deals/contacts/batch/create", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputs: [
                  { from: { id: deal.id }, to: { id: contact.id }, type: "deal_to_contact" },
                ],
              }),
            }).catch(() => {});
          }
        } catch (e) {
          // swallow deal creation errors to not block lead capture
        }
      }

      return { id: contact.id || lead.id };
    },
  };
}

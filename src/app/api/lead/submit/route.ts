import { NextRequest, NextResponse } from "next/server";
import { getCRMAdapter } from "@/lib/crm";
import type { Lead } from "@/lib/crm/types";

function uid() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, industry, funnel, consent, value, source } = body || {};

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }

    const lead: Lead = {
      id: uid(),
      name,
      email,
      company,
      message,
      industry,
      funnel,
      value: typeof value === "number" ? value : undefined,
      source,
      consent: Boolean(consent),
      createdAt: new Date().toISOString(),
      metadata: {
        ip: req.headers.get("x-forwarded-for") || undefined,
        ua: req.headers.get("user-agent") || undefined,
      },
    };

    const adapter = getCRMAdapter();
    const res = await adapter.createLead(lead);
    return NextResponse.json({ id: res.id, ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unknown error" }, { status: 500 });
  }
}

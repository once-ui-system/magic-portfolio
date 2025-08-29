import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import playbooks from "@/resources/playbooks.json";
import { getCRMAdapter } from "@/lib/crm";

export async function POST(req: NextRequest) {
  try {
    const { email, slug, industry } = await req.json();
    if (!email || !slug) return NextResponse.json({ error: "email and slug required" }, { status: 400 });

    const pb = (playbooks as any[]).find((p) => p.slug === slug);
    if (!pb) return NextResponse.json({ error: "playbook not found" }, { status: 404 });

    // Log request locally
    const dir = path.join(process.cwd(), "var");
    const file = path.join(dir, "playbook_requests.jsonl");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await fs.promises.appendFile(file, JSON.stringify({ email, slug, industry, at: new Date().toISOString() }) + "\n", "utf8");

    // CRM note (best-effort)
    let contactId: string | null = null;
    try {
      const crm = getCRMAdapter();
      const res = await crm.createLead({ id: `${Date.now()}`, name: email, email, createdAt: new Date().toISOString(), industry, funnel: "playbook", metadata: { slug } });
      contactId = res?.id || null;
    } catch {}

    // Optional: HubSpot: update contact properties then workflow enrollment
    if (process.env.CRM_TARGET === 'hubspot' && process.env.HUBSPOT_WORKFLOW_ID && process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      try {
        const wf = process.env.HUBSPOT_WORKFLOW_ID;
        const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
        
        // Update properties if we have contactId
        if (contactId) {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ properties: {
              playbook_slug: slug,
              industry,
              last_page: `${baseURL}/playbooks/${slug}`,
              user_agent: (req.headers.get('user-agent')||'').slice(0,500),
              ip_address: (req.headers.get('x-forwarded-for')||req.headers.get('x-real-ip')||'').split(',')[0],
              playbook_download_url: (process.env.PLAYBOOKS_BUCKET_URL ? `${process.env.PLAYBOOKS_BUCKET_URL.replace(/\/$/, '')}/${slug}.pdf` : (pb as any).pdf || '/')
            }})
          });
        }
        // Legacy endpoint for enrollment by email (best-effort; ignore failures)
        await fetch(`https://api.hubapi.com/automation/v3/workflows/${wf}/enrollments/contacts/${encodeURIComponent(email)}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }

    // Optional: HubSpot transactional email trigger
    if (process.env.CRM_TARGET === 'hubspot' && process.env.HUBSPOT_TX_EMAIL_ID && process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      try {
        const emailId = process.env.HUBSPOT_TX_EMAIL_ID;
        const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
        const tmpUrl = process.env.PLAYBOOKS_BUCKET_URL ? `${process.env.PLAYBOOKS_BUCKET_URL.replace(/\\/$/, '')}/${slug}.pdf` : (pb as any).pdf || '/';
        await fetch('https://api.hubapi.com/marketing/v3/transactional/single-email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            emailId,
            message: {
              to: email,
              sendId: `pb-${slug}-${Date.now()}`,
              contactProperties: { playbook_slug: slug, industry },
              customProperties: { download_url: tmpUrl },
            }
          })
        });
      } catch {}
    }

    // Determine URL to return — real object storage or static fallback
    const bucket = process.env.PLAYBOOKS_BUCKET_URL; // e.g., https://your-bucket.s3.amazonaws.com/playbooks
    const url = bucket ? `${bucket.replace(/\/$/, "")}/${pb.slug}.pdf` : pb.pdf || "/";
    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unknown error" }, { status: 500 });
  }
}

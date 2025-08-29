"use client";
import { useState } from "react";
import { Button, Card, Column, Grid, Heading, Input, Text, Checkbox } from "@once-ui-system/core";
import { track } from "@/lib/analytics/client";
import { trackFunnel } from "@/lib/analytics/funnel";

type Props = {
  industry?: string;
  funnel?: string;
  title?: string;
};

export function LeadCapture({ industry, funnel, title = "Get Started" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setStatus("loading");
    setError(null);
    trackFunnel({ funnel: funnel || "lead", step: "submit_start", industry });
    try {
      const res = await fetch("/api/lead/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, industry, funnel, consent }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      track("lead_submit", { industry, funnel, email, company });
      trackFunnel({ funnel: funnel || "lead", step: "submit_success", industry, props: { email, company } });
    } catch (e: any) {
      setError(e?.message || "Submission failed");
      setStatus("error");
      trackFunnel({ funnel: funnel || "lead", step: "submit_error", industry, props: { error: e?.message } });
    }
  }

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        {status === "ok" ? (
          <Text variant="body-strong-m">Thanks! We’ll be in touch shortly.</Text>
        ) : (
          <>
            <Grid columns="2" mobileColumns="1" gap="12">
              <Input label="Name" value={name} onChange={(e: any) => { setName(e.target.value); trackFunnel({ funnel: funnel || "lead", step: "field_change", industry, props: { field: "name" } }); }} required />
              <Input label="Email" type="email" value={email} onChange={(e: any) => { setEmail(e.target.value); trackFunnel({ funnel: funnel || "lead", step: "field_change", industry, props: { field: "email" } }); }} required />
              <Input label="Company" value={company} onChange={(e: any) => { setCompany(e.target.value); trackFunnel({ funnel: funnel || "lead", step: "field_change", industry, props: { field: "company" } }); }} />
              <Input label="Message" value={message} onChange={(e: any) => { setMessage(e.target.value); trackFunnel({ funnel: funnel || "lead", step: "field_change", industry, props: { field: "message" } }); }} />
            </Grid>
            <Checkbox label="I agree to be contacted" checked={!!consent} onChange={(v: boolean) => setConsent(v)} />
            {error && <Text onBackground="critical-strong">{error}</Text>}
            <Button onClick={submit} disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </Column>
    </Card>
  );
}

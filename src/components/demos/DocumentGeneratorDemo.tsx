"use client";
import { useEffect, useState } from "react";
import { Button, Card, Column, Grid, Heading, Input, Text } from "@once-ui-system/core";
import { track } from "@/lib/analytics/client";
import { trackFunnel } from "@/lib/analytics/funnel";
import { useConsent } from "@/lib/demos/useConsent";
import { useRateLimit } from "@/lib/demos/useRateLimit";
import { useGlobalConsent } from "@/lib/demos/useGlobalConsent";

type Props = {
  title?: string;
  template?: "nda" | "engagement" | "proposal";
  industry?: string;
};

export function DocumentGeneratorDemo({ title = "Document Generator", template = "proposal", industry }: Props) {
  const [client, setClient] = useState("");
  const [scope, setScope] = useState("");
  const [jurisdiction, setJurisdiction] = useState("US");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { consent, accept } = useConsent("docgen-demo", false);
  const { consent: globalConsent } = useGlobalConsent(false);
  const { allowed, remaining, record } = useRateLimit("docgen-demo", 5 * 60_000, 30);

  useEffect(() => {
    track("demo_view", { demo: "docgen", template, industry });
    trackFunnel({ funnel: "docgen", step: "view", industry });
  }, [template, industry]);

  async function generate() {
    if (!(consent || globalConsent)) return;
    if (!allowed) {
      setOutput("Rate limit reached. Please try again later.");
      trackFunnel({ funnel: "docgen", step: "submit_error", industry, props: { error: "rate_limit" } });
      return;
    }
    setLoading(true);
    track("demo_use", { demo: "docgen", template, client: !!client, scope: !!scope, jurisdiction });
    trackFunnel({ funnel: "docgen", step: "submit_start", industry, props: { template } });
    // Simulate generation client-side only
    await new Promise((r) => setTimeout(r, 700));
    const doc = `# ${template.toUpperCase()}\n\nClient: ${client || "Acme Corp"}\nJurisdiction: ${jurisdiction}\n\nScope:\n- ${scope || "Describe services and deliverables."}\n\nTerms:\n- This is a non-binding demonstration preview.\n- Replace with your legal template.`;
    setOutput(doc);
    setLoading(false);
    trackFunnel({ funnel: "docgen", step: "submit_success", industry, props: { template } });
    record();
  }

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        <Grid columns="2" mobileColumns="1" gap="12">
          <Input label="Client name" value={client} onChange={(e: any) => setClient(e.target.value)} />
          <Input label="Jurisdiction" value={jurisdiction} onChange={(e: any) => setJurisdiction(e.target.value)} />
          <Input label="Scope (summary)" value={scope} onChange={(e: any) => setScope(e.target.value)} />
          <Input label="Template" value={template} disabled />
        </Grid>
        <Row gap="8" wrap>
          <Text onBackground="neutral-weak">Demo only; no data is sent to a server.</Text>
          {!globalConsent && (
            <Row gap="8" vertical="center">
              <input id="docgen-consent" type="checkbox" checked={!!consent} onChange={(e) => accept(e.target.checked)} />
              <label htmlFor="docgen-consent">I understand and agree</label>
            </Row>
          )}
          {!allowed && <Text onBackground="critical-strong">Rate limit reached. Try later.</Text>}
        </Row>
        <Button onClick={generate} disabled={loading || !(consent || globalConsent)}>{loading ? "Generating…" : "Generate"}</Button>
        {output && (
          <Card padding="16" radius="m">
            <Text as="pre" style={{ whiteSpace: "pre-wrap" }}>{output}</Text>
          </Card>
        )}
      </Column>
    </Card>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Column, Grid, Heading, Input, Row, Text } from "@once-ui-system/core";
import { track } from "@/lib/analytics/client";
import { trackFunnel } from "@/lib/analytics/funnel";
import promptsMap from "@/resources/prompts.json";
import { useConsent } from "@/lib/demos/useConsent";
import { useRateLimit } from "@/lib/demos/useRateLimit";
import { useGlobalConsent } from "@/lib/demos/useGlobalConsent";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  title?: string;
  industry?: string;
  persona?: string;
  placeholder?: string;
};

export function AgentChatDemo({ title = "Agent Chat Demo", industry, persona = "Sales Assistant", placeholder = "Ask about automating your workflow…", prompts }: Props & { prompts?: string[] | string }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: `Hi! I’m your ${persona}. How can I help?` }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const suggestions: string[] = Array.isArray(prompts)
    ? prompts
    : typeof prompts === "string" && prompts.length > 0
      ? prompts.split("|").map((s) => s.trim()).filter(Boolean)
      : (industry && (promptsMap as Record<string, string[]>)[industry]) || [];
  const { consent, accept } = useConsent("chat-demo", false);
  const { consent: globalConsent } = useGlobalConsent(false);
  const { allowed, remaining, record } = useRateLimit("chat-demo", 5 * 60_000, 15);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    track("demo_view", { demo: "agent_chat", industry, persona });
    trackFunnel({ funnel: "chat", step: "view", industry });
  }, [industry, persona]);

  async function send() {
    if (!input.trim()) return;
    if (!(consent || globalConsent)) return;
    if (!allowed) {
      setMessages((m) => [...m, { role: "assistant", content: "Rate limit reached. Please try again later." }]);
      trackFunnel({ funnel: "chat", step: "submit_error", industry, props: { error: "rate_limit" } });
      return;
    }
    setSending(true);
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    track("demo_use", { demo: "agent_chat", industry, length: userMsg.content.length });
    trackFunnel({ funnel: "chat", step: "submit_start", industry });
    // Simulate an assistant response locally
    await new Promise((r) => setTimeout(r, 500));
    const assistant: Msg = {
      role: "assistant",
      content: `Here’s how I’d approach this in ${industry || "your industry"}:\n1) Map the workflow\n2) Identify automation candidates\n3) Integrate with your systems\n4) Measure ROI and iterate.`,
    };
    setMessages((m) => [...m, assistant]);
    setSending(false);
    trackFunnel({ funnel: "chat", step: "submit_success", industry });
    record();
  }

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        {suggestions.length > 0 && (
          <Row gap="8" wrap>
            {suggestions.map((s, i) => (
              <Button key={i} size="s" variant="tertiary" onClick={() => { setInput(s); trackFunnel({ funnel: "chat", step: "cta_click", industry, props: { label: "prompt", index: i } }); }}>
                {s}
              </Button>
            ))}
          </Row>
        )}
        <Row gap="8" wrap>
          <Text onBackground="neutral-weak">Demo only; no messages are sent to a server.</Text>
          {!globalConsent && (
            <Row gap="8" vertical="center">
              <input id="chat-consent" type="checkbox" checked={!!consent} onChange={(e) => accept(e.target.checked)} />
              <label htmlFor="chat-consent">I understand and agree</label>
            </Row>
          )}
          {!allowed && <Text onBackground="critical-strong">Rate limit reached. Try again later.</Text>}
        </Row>
        <Column style={{ maxHeight: 280, overflowY: "auto" }} gap="8">
          {messages.map((m, i) => (
            <Row key={i} gap="8">
              <Text onBackground={m.role === "user" ? "brand-strong" : "neutral-strong"}>
                {m.role === "user" ? "You:" : "Agent:"}
              </Text>
              <Text>{m.content}</Text>
            </Row>
          ))}
          <div ref={endRef} />
        </Column>
        <Grid columns="2" mobileColumns="1" gap="12">
          <Input value={input} placeholder={placeholder} onChange={(e: any) => setInput(e.target.value)} />
          <Button onClick={send} disabled={sending}>{sending ? "Thinking…" : "Send"}</Button>
        </Grid>
      </Column>
    </Card>
  );
}

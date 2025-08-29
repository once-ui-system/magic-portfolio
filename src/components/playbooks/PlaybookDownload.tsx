"use client";
import { useState } from "react";
import { Button, Card, Column, Grid, Input, Text } from "@once-ui-system/core";

export function PlaybookDownload({ slug, industry, title }: { slug: string; industry: string; title: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/playbooks/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, industry, email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed");
      setLink(json.url || null);
      setStatus("ok");
    } catch (e: any) {
      setError(e?.message || "Submission failed");
      setStatus("error");
    }
  }

  return (
    <Card padding="16" radius="m">
      <Column gap="8">
        <Text variant="heading-default-m">{title}</Text>
        {status === "ok" && link ? (
          <Text><a href={link} target="_blank" rel="noreferrer">Download</a></Text>
        ) : (
          <>
            <Grid columns="2" mobileColumns="1" gap="8">
              <Input label="Work email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
              <Button onClick={submit} disabled={status === "loading" || !email}>{status === "loading" ? "Sending…" : "Send me the PDF"}</Button>
            </Grid>
            {error && <Text onBackground="critical-strong">{error}</Text>}
          </>
        )}
      </Column>
    </Card>
  );
}


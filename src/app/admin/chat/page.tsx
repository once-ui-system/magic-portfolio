"use client";
import { useEffect, useState } from "react";
import { Column, Grid, Card, Heading, Row, Text, Button, Input } from "@once-ui-system/core";

export default function AdminChat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [active, setActive] = useState<any | null>(null);
  const [reply, setReply] = useState('');

  async function refresh() {
    // There is no list API; infer from known session id for demo or keep active polling
    if (!active?.id) return;
    const r = await fetch(`/api/chat/messages?session=${active.id}`);
    if (r.ok) setActive(await r.json());
  }

  useEffect(() => { const t=setInterval(refresh, 2000); return ()=>clearInterval(t); }, [active?.id]);

  async function takeover(v: boolean) {
    if (!active?.id) return;
    await fetch('/api/chat/admin/takeover', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: active.id, value: v })});
    refresh();
  }

  async function send() {
    if (!active?.id || !reply.trim()) return;
    await fetch('/api/chat/admin/reply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: active.id, content: reply })});
    setReply('');
    refresh();
  }

  return (
    <Column maxWidth="m" gap="16">
      <Heading variant="display-strong-s">Admin Chat</Heading>
      <Grid columns="2" mobileColumns="1" gap="12">
        <Card padding="16" radius="l">
          <Column gap="8">
            <Text onBackground="neutral-weak">Enter a session ID to monitor (demo)</Text>
            <Row gap="8">
              <Input placeholder="session id" value={active?.id || ''} onChange={(e:any)=>setActive({id:e.target.value})} />
              <Button onClick={refresh}>Load</Button>
            </Row>
          </Column>
        </Card>
        {active?.id && (
          <Card padding="16" radius="l">
            <Column gap="8">
              <Row horizontal="space-between" vertical="center">
                <Text variant="heading-strong-s">Session {active.id}</Text>
                <Row gap="8">
                  <Button size="s" variant={active.takeover? 'primary':'tertiary'} onClick={()=>takeover(!active.takeover)}>{active.takeover? 'Release':'Take over'}</Button>
                </Row>
              </Row>
              <Column style={{ maxHeight: 360, overflowY: 'auto' }} gap="8">
                {(active.messages||[]).map((m:any)=>(
                  <Card key={m.id} padding="8" radius="m" border={m.role==='user'?'brand-weak':'neutral-alpha-weak'}>
                    <Text onBackground={m.role==='user'? 'brand-strong':'neutral-strong'}>{m.role}: {m.content}</Text>
                  </Card>
                ))}
              </Column>
              <Row gap="8">
                <Input value={reply} onChange={(e:any)=>setReply(e.target.value)} placeholder="Type a reply…" />
                <Button onClick={send} disabled={!reply.trim()}>Send</Button>
              </Row>
            </Column>
          </Card>
        )}
      </Grid>
    </Column>
  );
}


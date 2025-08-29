"use client";
import { useEffect, useState } from "react";
import { Card, Column, Row, Button, Input, Text } from "@once-ui-system/core";

async function ensureSession(): Promise<string> {
  const key = 'chat_session_id';
  const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  if (existing) return existing;
  const res = await fetch('/api/chat/session', { method: 'POST' });
  const json = await res.json();
  localStorage.setItem(key, json.id);
  return json.id;
}

export function ChatWidget({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [session, setSession] = useState<string>('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role:string;content:string;id:string}[]>([]);
  const [takeover, setTakeover] = useState(false);
  const [sending, setSending] = useState(false);
  const [sse, setSse] = useState<EventSource | null>(null);

  useEffect(() => { (async () => {
    const id = await (async () => {
      const key = 'chat_session_id';
      const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      if (existing) return existing;
      const info = {
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        title: typeof document !== 'undefined' ? document.title : undefined,
        vp: typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight } : undefined,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
      };
      const res = await fetch('/api/chat/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
      const json = await res.json();
      localStorage.setItem(key, json.id);
      return json.id;
    })();
    setSession(id);
  })(); }, []);
  useEffect(() => {
    if (!session) return;
    const es = new EventSource(`/api/chat/stream?session=${session}`);
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data && data.messages) {
          setMessages(data.messages);
          setTakeover(!!data.takeover);
        }
      } catch {}
    };
    setSse(es);
    return () => { es.close(); setSse(null); };
  }, [session]);

  async function send() {
    if (!input.trim()) return;
    setSending(true);
    const info = {
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      title: typeof document !== 'undefined' ? document.title : undefined,
      vp: typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight } : undefined,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
    };
    await fetch('/api/chat/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session, content: input, info })});
    setInput('');
    setSending(false);
  }

  return (
    <>
      <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 50 }}>
        {!open && (
          <Button variant="primary" size="m" onClick={() => setOpen(true)} prefixIcon="chat">Chat</Button>
        )}
      </div>
      {open && (
        <Card style={{ position: 'fixed', right: 16, bottom: 16, width: 360, maxHeight: 520, zIndex: 51 }} padding="16" radius="l" shadow="l">
          <Column gap="8" style={{ height: 480 }}>
            <Row horizontal="space-between" vertical="center">
              <Text variant="heading-strong-s">Chat</Text>
              <Button size="s" variant="tertiary" onClick={() => setOpen(false)} prefixIcon="x">Close</Button>
            </Row>
            <Column style={{ overflowY: 'auto', flex: 1 }} gap="8">
              {messages.map(m => (
                <Card key={m.id} padding="8" radius="m" border={m.role==='user'?'brand-weak':'neutral-alpha-weak'}>
                  <Text onBackground={m.role==='user'? 'brand-strong':'neutral-strong'}>{m.role === 'admin' ? 'Team' : (m.role.charAt(0).toUpperCase()+m.role.slice(1))}: {m.content}</Text>
                </Card>
              ))}
              {takeover && <Text onBackground="accent-strong">A teammate has joined the chat.</Text>}
              {!takeover && sending && <Text onBackground="neutral-weak">Assistant is typing…</Text>}
            </Column>
            <Row gap="8">
              <Input value={input} onChange={(e:any)=>setInput(e.target.value)} placeholder={takeover? 'Type to message the team…':'Ask a question…'} />
              <Button onClick={send} disabled={sending || !input.trim()}>{sending? '…':'Send'}</Button>
            </Row>
          </Column>
        </Card>
      )}
    </>
  );
}

"use client";
import { useState } from "react";
import { Button, Card, Column, Heading, Input, Text } from "@once-ui-system/core";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password })});
    if (res.ok) {
      window.location.href = '/admin/analytics';
    } else {
      setError('Invalid password');
    }
  }

  return (
    <Column maxWidth="xs" gap="12">
      <Heading variant="display-strong-s">Admin Login</Heading>
      <Card padding="16" radius="l">
        <Column gap="8">
          <Input type="password" label="Password" value={password} onChange={(e:any)=>setPassword(e.target.value)} />
          {error && <Text onBackground="critical-strong">{error}</Text>}
          <Button onClick={submit}>Sign in</Button>
        </Column>
      </Card>
    </Column>
  );
}


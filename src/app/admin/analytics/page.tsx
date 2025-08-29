"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Column, Heading, Card, Text, Row, Input, Button, Select } from "@once-ui-system/core";

export default function AdminAnalytics() {
  const [pathFilter, setPathFilter] = useState<string>("");
  const [hours, setHours] = useState<number>(24);
  const [stats, setStats] = useState<any>({ clicks: 0, moves: 0, topPages: [], grid: [] });
  const [device, setDevice] = useState<'any'|'mobile'|'desktop'>('any');
  const [country, setCountry] = useState<string>("");
  const [countries, setCountries] = useState<{ code: string; count: number }[]>([]);
  const esRef = useRef<EventSource | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function refresh() {
    const q = new URLSearchParams();
    if (pathFilter) q.set('path', pathFilter);
    q.set('hours', String(hours));
    if (device) q.set('device', device);
    if (country) q.set('country', country);
    const r = await fetch(`/api/analytics/summary?${q.toString()}`);
    if (r.ok) setStats(await r.json());
  }

  useEffect(() => { refresh(); (async()=>{ try{ const r=await fetch('/api/analytics/countries'); if(r.ok){ const j=await r.json(); setCountries(j.countries||[]);} }catch{}})(); }, []);
  useEffect(() => { draw(); }, [stats]);
  useEffect(() => {
    // live counters via SSE
    if (esRef.current) { esRef.current.close(); esRef.current = null; }
    const q = new URLSearchParams();
    if (pathFilter) q.set('path', pathFilter);
    q.set('hours', String(hours));
    if (device) q.set('device', device);
    if (country) q.set('country', country);
    const es = new EventSource(`/api/analytics/stream?${q.toString()}`);
    es.onmessage = (e) => {
      try { const data = JSON.parse(e.data); setStats((s:any)=>({ ...s, clicks: data.clicks, moves: data.moves })); } catch {}
    };
    esRef.current = es;
    return () => { es.close(); esRef.current = null; };
  }, [pathFilter, hours, device, country]);

  function draw() {
    const grid: number[][] = stats.grid || [];
    const cnv = canvasRef.current; if (!cnv || grid.length === 0) return;
    const ctx = cnv.getContext('2d'); if (!ctx) return;
    const rows = grid.length; const cols = grid[0].length;
    const w = cnv.width, h = cnv.height;
    ctx.clearRect(0,0,w,h);
    let max = 0; grid.forEach(r => r.forEach(v => { if (v>max) max=v; }));
    for (let y=0; y<rows; y++) {
      for (let x=0; x<cols; x++) {
        const v = grid[y][x];
        if (!v) continue;
        const intensity = v / (max || 1);
        ctx.fillStyle = `rgba(255,0,0,${Math.min(0.8, 0.1 + intensity)})`;
        ctx.fillRect(Math.floor((x/cols)*w), Math.floor((y/rows)*h), Math.ceil(w/cols), Math.ceil(h/rows));
      }
    }
  }

  return (
    <Column maxWidth="m" gap="16">
      <Heading variant="display-strong-s">Admin Analytics</Heading>
      <Row gap="8" wrap>
        <Input label="Path filter" value={pathFilter} onChange={(e:any)=>setPathFilter(e.target.value)} placeholder="/industries or leave blank" />
        <Input label="Hours" type="number" value={hours} onChange={(e:any)=>setHours(parseInt(e.target.value||'24',10))} />
        <Select label="Device" value={device} onChange={(v:any)=>setDevice(v)} options={[{label:'Any', value:'any'},{label:'Mobile', value:'mobile'},{label:'Desktop', value:'desktop'}]} />
        <Select label="Country" value={country} onChange={(v:any)=>setCountry(v)} options={[{label:'Any', value:''}, ...countries.map(c=>({label:`${c.code} (${c.count})`, value:c.code}))]} />
        <Button size="s" variant="tertiary" onClick={()=>{ localStorage.setItem('heatmap_on','1'); }}>Show Heatmap</Button>
        <Button size="s" variant="tertiary" onClick={()=>{ localStorage.setItem('heatmap_on','0'); }}>Hide Heatmap</Button>
        <Button onClick={refresh}>Refresh</Button>
        <Button variant="tertiary" href={`/api/analytics/export?${new URLSearchParams({ path: pathFilter||'', hours: String(hours), device, country }).toString()}`}>Export CSV</Button>
      </Row>
      <Row gap="12" wrap>
        <Card padding="16" radius="m"><Text>Clicks: {stats.clicks}</Text></Card>
        <Card padding="16" radius="m"><Text>Moves: {stats.moves}</Text></Card>
      </Row>
      <Card padding="16" radius="l">
        <Text variant="heading-strong-s">Heatmap (mouse movement density)</Text>
        <canvas ref={canvasRef} width={640} height={360} style={{ width: '100%', maxWidth: 640, borderRadius: 8, border: '1px solid var(--neutral-alpha-weak)' }} />
      </Card>
      <Card padding="16" radius="l">
        <Text variant="heading-strong-s">Top Pages</Text>
        {(stats.topPages||[]).map((p:any)=>(<Row key={p.path} horizontal="space-between"><Text>{p.path}</Text><Text>{p.events}</Text></Row>))}
        {(stats.topPages||[]).length===0 && <Text onBackground="neutral-weak">No data yet.</Text>}
      </Card>
    </Column>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Row } from "@once-ui-system/core";

export function HeatmapOverlay() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [on, setOn] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(24);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const esRef = useRef<EventSource | null>(null);

  async function draw() {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const r = await fetch(`/api/analytics/summary?path=${encodeURIComponent(path)}&hours=${hours}`);
    if (!r.ok) return;
    const json = await r.json();
    const grid: number[][] = json.grid || [];
    const cnv = canvasRef.current; if (!cnv) return;
    const ctx = cnv.getContext('2d'); if (!ctx) return;
    const rows = grid.length; if (!rows) { ctx.clearRect(0,0,cnv.width, cnv.height); return; }
    const cols = grid[0].length;
    cnv.width = window.innerWidth; cnv.height = window.innerHeight;
    ctx.clearRect(0,0,cnv.width, cnv.height);
    let max = 0; grid.forEach(r => r.forEach((v:number) => { if (v>max) max=v; }));
    for (let y=0; y<rows; y++) {
      for (let x=0; x<cols; x++) {
        const v = grid[y][x]; if (!v) continue;
        const intensity = v / (max || 1);
        ctx.fillStyle = `rgba(255,0,0,${Math.min(0.5, 0.08 + intensity)})`;
        ctx.fillRect(Math.floor((x/cols)*cnv.width), Math.floor((y/rows)*cnv.height), Math.ceil(cnv.width/cols), Math.ceil(cnv.height/rows));
      }
    }
  }

  useEffect(() => {
    // Only enable for admins
    (async () => {
      try {
        const r = await fetch('/api/admin/status');
        const j = await r.json();
        setEnabled(!!j.ok);
      } catch { setEnabled(false); }
    })();
  }, []);

  useEffect(() => {
    if (!on) return;
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    // Live updates via SSE stream
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const es = new EventSource(`/api/analytics/stream?path=${encodeURIComponent(path)}&hours=${hours}`);
    es.onmessage = () => draw();
    esRef.current = es;
    return () => { window.removeEventListener('resize', onResize); es.close(); esRef.current = null; };
  }, [on, hours]);

  useEffect(() => {
    // Sync on/off with admin page via localStorage
    const key = 'heatmap_on';
    try {
      const v = localStorage.getItem(key);
      if (v === '1') setOn(true);
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setOn(e.newValue === '1');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      {enabled && (
      <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 60 }}>
        <Row gap="8">
          <Button size="s" variant={on? 'primary':'tertiary'} onClick={()=>setOn(s=>!s)} prefixIcon="flame">{on? 'Hide Heatmap':'Show Heatmap'}</Button>
        </Row>
      </div>
      )}
      {enabled && on && (
        <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 59 }} />
      )}
    </>
  );
}

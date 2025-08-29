"use client";
export function initBehaviorTracker() {
  if (typeof window === 'undefined') return;
  const sidKey = 'analytics_id';
  let sid = localStorage.getItem(sidKey);
  if (!sid) { sid = Math.random().toString(36).slice(2,10).toUpperCase(); localStorage.setItem(sidKey, sid); }
  let lastSend = 0;
  let maxScroll = 0;
  function buildSelector(el: HTMLElement | null): string {
    if (!el) return '';
    const parts: string[] = [];
    let node: HTMLElement | null = el;
    let depth = 0;
    while (node && depth < 5) {
      let part = node.tagName.toLowerCase();
      if (node.id) { part += `#${node.id}`; parts.unshift(part); break; }
      const cls = (node.className || '').toString().trim().split(/\s+/).filter(Boolean).slice(0,2);
      if (cls.length) part += `.${cls.join('.')}`;
      parts.unshift(part);
      node = node.parentElement;
      depth++;
    }
    return parts.join('>');
  }
  function send(type: string, data: any) {
    const now = Date.now();
    if (type === 'move' && now - lastSend < 500) return; // throttle
    lastSend = now;
    const ua = navigator.userAgent;
    navigator.sendBeacon?.('/api/analytics/event', new Blob([JSON.stringify({ sid, type, path: location.pathname, at: now, ua, ref: document.referrer, ...data })], { type: 'application/json' }));
  }
  window.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    send('click', { x: e.clientX, y: e.clientY, tag: t?.tagName?.toLowerCase(), sel: buildSelector(t) });
  });
  window.addEventListener('mousemove', (e) => send('move', { x: e.clientX, y: e.clientY, w: innerWidth, h: innerHeight }));
  const start = Date.now();
  // UTM on page_start
  try {
    const q = new URLSearchParams(location.search);
    const utm = {
      utm_source: q.get('utm_source') || undefined,
      utm_medium: q.get('utm_medium') || undefined,
      utm_campaign: q.get('utm_campaign') || undefined,
      utm_term: q.get('utm_term') || undefined,
      utm_content: q.get('utm_content') || undefined,
    };
    send('page_start', { ts: start, utm });
  } catch { send('page_start', { ts: start }); }
  // Scroll depth
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    const ratio = Math.max(0, Math.min(1, el.scrollTop / denom));
    if (ratio > maxScroll) maxScroll = ratio;
  }, { passive: true });
  const finish = () => {
    const dur = Date.now() - start;
    send('page_end', { dur, maxScroll });
  };
  window.addEventListener('beforeunload', finish);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') finish(); });
}

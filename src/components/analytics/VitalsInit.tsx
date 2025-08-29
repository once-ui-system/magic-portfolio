"use client";
import { useEffect } from "react";

export function VitalsInit() {
  useEffect(() => {
    // Error logging
    const send = (type: string, data: any) => {
      navigator.sendBeacon?.('/api/analytics/error', new Blob([JSON.stringify({ type, at: Date.now(), ...data })], { type: 'application/json' }));
    };
    const onError = (event: ErrorEvent) => send('error', { msg: event.message, src: event.filename, line: event.lineno, col: event.colno, stack: event.error?.stack?.slice(0, 2000) });
    const onRej = (event: PromiseRejectionEvent) => send('unhandledrejection', { reason: String(event.reason).slice(0, 1000) });
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRej);

    // Simple Web Vitals-like metrics via PerformanceObserver
    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            send('vitals', { name: 'LCP', value: (entry as any).renderTime || (entry as any).loadTime });
          } else if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            send('vitals', { name: 'CLS', value: (entry as any).value });
          } else if (entry.entryType === 'first-input') {
            send('vitals', { name: 'FID', value: (entry as any).processingStart - (entry as any).startTime });
          }
        }
      });
      try { po.observe({ type: 'largest-contentful-paint', buffered: true } as any); } catch {}
      try { po.observe({ type: 'layout-shift', buffered: true } as any); } catch {}
      try { po.observe({ type: 'first-input', buffered: true } as any); } catch {}
    } catch {}

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRej);
    };
  }, []);
  return null;
}


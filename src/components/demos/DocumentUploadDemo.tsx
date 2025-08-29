"use client";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import { track } from "@/lib/analytics/client";
import { trackFunnel } from "@/lib/analytics/funnel";
import { useConsent } from "@/lib/demos/useConsent";
import { useRateLimit } from "@/lib/demos/useRateLimit";
import { useGlobalConsent } from "@/lib/demos/useGlobalConsent";
import { CsvChart } from "@/components/demos/CsvChart";

type Props = {
  title?: string;
  accept?: string; // e.g., ".txt,.csv,application/pdf"
  industry?: string;
  note?: string;
};

export function DocumentUploadDemo({ title = "Document Upload Demo", accept = ".txt,.md,.csv", industry, note = "Files are processed in-browser for demo purposes; nothing is uploaded." }: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const { consent, accept } = useConsent("doc-upload", false);
  const { consent: globalConsent } = useGlobalConsent(false);
  const { allowed, remaining, record } = useRateLimit("doc-upload", 5 * 60_000, 20);

  useEffect(() => {
    track("demo_view", { demo: "doc_upload", industry });
    trackFunnel({ funnel: "docgen", step: "view", industry });
  }, [industry]);

  async function onPick(e: any) {
    const file: File | undefined = e?.target?.files?.[0];
    if (!file) return;
    if (!(consent || globalConsent)) return;
    if (!allowed) { setPreview("Rate limit reached. Please try later."); return; }
    setLoading(true);
    setFileName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
    track("demo_use", { demo: "doc_upload", industry, type: file.type, size: file.size });
    trackFunnel({ funnel: "docgen", step: "submit_start", industry, props: { action: "upload" } });
    try {
      // Attempt to read as text for preview. If binary, show a short message.
      const text = await file.text().catch(() => "");
      if (text) {
        const trimmed = text.slice(0, 800);
        setPreview(trimmed + (text.length > 800 ? "\n..." : ""));
        // If CSV, parse a brief summary
        if ((file.type.includes("csv") || file.name.toLowerCase().endsWith(".csv"))) {
          const lines = text.split(/\r?\n/).filter(Boolean);
          if (lines.length > 0) {
            const headers = lines[0].split(",").map((h) => h.trim());
            const rows = lines.slice(1).map((l) => l.split(","));
            const numRows = rows.length;
            // compute simple numeric column counts
            const numericCols: string[] = [];
            headers.forEach((h, idx) => {
              const nums = rows.map((r) => parseFloat(r[idx])).filter((n) => !Number.isNaN(n));
              if (nums.length > Math.max(1, Math.floor(numRows * 0.6))) numericCols.push(h);
            });
            setSummary(`CSV detected: ${numRows} rows, ${headers.length} columns. Columns: ${headers.join(", ")}. Numeric-like: ${numericCols.join(", ") || "none"}.`);
            // build series of sums for up to first 3 numeric columns
            const series: { label: string; value: number }[] = [];
            numericCols.slice(0, 3).forEach((h) => {
              const idx = headers.indexOf(h);
              const sum = rows.reduce((acc, r) => {
                const v = parseFloat(r[idx]);
                return acc + (Number.isNaN(v) ? 0 : v);
              }, 0);
              series.push({ label: h, value: sum });
            });
            // store on window for quick pass; computed again via memo when rendering
            (window as any).__csv_series = series;
          }
        } else {
          setSummary("");
        }
      } else {
        setPreview("Preview not available for this file type. File captured successfully.");
        setSummary("");
      }
      trackFunnel({ funnel: "docgen", step: "submit_success", industry, props: { action: "upload" } });
    } catch (e: any) {
      setPreview("Failed to read file for preview.");
      trackFunnel({ funnel: "docgen", step: "submit_error", industry, props: { error: e?.message } });
    } finally {
      setLoading(false);
      record();
    }
  }

  function onDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const f = ev.dataTransfer?.files?.[0];
    if (!f) return;
    onPick({ target: { files: [f] } });
  }

  function onDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        <Column gap="8">
          <Grid columns="2" mobileColumns="1" gap="12">
            <Row gap="8" vertical="center">
              <input id="doc-upload-input" type="file" accept={accept} onChange={onPick} style={{ display: "none" }} />
              <Button onClick={() => document.getElementById("doc-upload-input")?.click()} disabled={loading || !(consent || globalConsent)}>
                {loading ? "Processing…" : "Choose a File"}
              </Button>
              {fileName && <Text onBackground="neutral-strong">{fileName}</Text>}
            </Row>
            <div onDrop={onDrop} onDragOver={onDragOver} style={{ border: "1px dashed var(--neutral-alpha-weak)", padding: 16, borderRadius: 8, textAlign: "center" }}>
              <Text onBackground="neutral-weak">Drag & drop a file here</Text>
            </div>
          </Grid>
          {note && <Text onBackground="neutral-weak">{note}</Text>}
          {!globalConsent && (
            <Row gap="8" vertical="center">
              <input id="doc-consent" type="checkbox" checked={!!consent} onChange={(e) => accept(e.target.checked)} />
              <label htmlFor="doc-consent">I understand this is a demo; files are processed locally</label>
              {!allowed && <Text onBackground="critical-strong">Rate limit reached. Try later.</Text>}
            </Row>
          )}
          <Row gap="8">
            <a href="/samples/example.csv" download>Download sample CSV</a>
          </Row>
        </Column>
        {preview && (
          <Card padding="16" radius="m">
            <Text as="pre" style={{ whiteSpace: "pre-wrap" }}>{preview}</Text>
          </Card>
        )}
        {series.length > 0 && (
          <CsvChart title="Numeric Columns (Sum)" series={series} />
  const series = useMemo(() => {
    // pick up series computed during parse; if not available, no chart
    const s = (typeof window !== "undefined" && (window as any).__csv_series) || [];
    return Array.isArray(s) ? s : [];
  }, [summary]);
        )}
        {summary && (
          <Text onBackground="neutral-strong">{summary}</Text>
        )}
      </Column>
    </Card>
  );
}

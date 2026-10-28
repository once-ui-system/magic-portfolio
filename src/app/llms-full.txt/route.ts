import { seo } from "@/resources";
import { buildLlmsFull } from "@/utils/llms";

// Built once with the site, like the RSS feed. Switch off with `seo.llmsTxt.fullText`.
export const dynamic = "force-static";

export function GET() {
  if (!seo.llmsTxt.enabled || !seo.llmsTxt.fullText)
    return new Response("Not found", { status: 404 });

  return new Response(buildLlmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

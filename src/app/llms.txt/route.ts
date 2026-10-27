import { seo } from "@/resources";
import { buildLlmsIndex } from "@/utils/llms";

// Built once with the site, like the RSS feed. Switch off with `seo.llmsTxt.enabled`.
export const dynamic = "force-static";

export function GET() {
  if (!seo.llmsTxt.enabled) return new Response("Not found", { status: 404 });

  return new Response(buildLlmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

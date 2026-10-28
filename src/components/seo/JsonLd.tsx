/**
 * A JSON-LD script for structured data that core `Schema` can't express
 * (`@id` references, `@graph`, breadcrumbs). `<` is escaped so content can't
 * close the script tag.
 */
export function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inline, and `<` is escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}

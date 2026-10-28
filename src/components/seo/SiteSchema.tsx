import { baseURL, home, person, sameAs, schema } from "@/resources";
import { absoluteUrl, ids, publisherId } from "@/utils/seo";
import { JsonLd } from "./JsonLd";

/**
 * The site's entities, rendered once in the layout: the website, the person
 * behind it and, when `schema.type` is "Organization", the organization.
 * Pages refer to them by `@id` instead of repeating them.
 */
export function SiteSchema() {
  const profiles = Object.values(sameAs).filter(Boolean);
  const isOrganization = schema.type === "Organization";

  return (
    <JsonLd
      id="schema-site"
      data={{
        "@graph": [
          {
            "@type": "WebSite",
            "@id": ids.website,
            url: baseURL,
            name: schema.name,
            description: schema.description || home.description,
            inLanguage: person.locale ?? "en",
            publisher: { "@id": publisherId },
          },
          {
            "@type": "Person",
            "@id": ids.person,
            name: person.name,
            jobTitle: person.role,
            url: baseURL,
            image: absoluteUrl(person.avatar),
            ...(!isOrganization && schema.email ? { email: schema.email } : {}),
            ...(!isOrganization && profiles.length ? { sameAs: profiles } : {}),
          },
          ...(isOrganization
            ? [
                {
                  "@type": "Organization",
                  "@id": ids.organization,
                  name: schema.name,
                  url: baseURL,
                  description: schema.description,
                  ...(schema.logo ? { logo: absoluteUrl(schema.logo) } : {}),
                  ...(schema.email ? { email: schema.email } : {}),
                  ...(profiles.length ? { sameAs: profiles } : {}),
                },
              ]
            : []),
        ],
      }}
    />
  );
}

import { createOgFetchRoute } from "@once-ui-system/core/next";

// Core's handler only fetches public addresses (every redirect is checked)
// and caps the size. sameOrigin keeps it from being an open fetcher for other sites.
export const { GET } = createOgFetchRoute({ sameOrigin: true });

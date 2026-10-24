import { createOgProxyRoute } from "@once-ui-system/core/next";

// Core's handler only fetches public addresses (every redirect is checked),
// passes raster image types only, caps the size, and sends nosniff plus a
// sandbox CSP. sameOrigin keeps it from being an open proxy for other sites.
export const { GET } = createOgProxyRoute({ sameOrigin: true });

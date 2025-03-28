import React from "react";
import Script from "next/script";

/**
 * Props for the JsonLdSchema component
 */
interface JsonLdSchemaProps {
  websiteSchema: Record<string, any>;
}

/**
 * JsonLdSchema Component
 * 
 * This component renders structured data in JSON-LD format using next/script
 * to improve SEO and enable rich results in search engines.
 * 
 * @param {JsonLdSchemaProps} props - Component props containing schema data
 * @returns {React.ReactElement} - Script component with JSON-LD data
 */
export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ websiteSchema }) => {
  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      strategy="afterInteractive"
    />
  );
};

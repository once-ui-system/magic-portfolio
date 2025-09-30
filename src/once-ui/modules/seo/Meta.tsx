import { Metadata as NextMetadata } from "next";

export interface MetaProps {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  author?: {
    name: string;
    url?: string;
  };
}

export function generateMetadata({
  title,
  description,
  baseURL,
  path = "",
  image = "https://opengraph.b-cdn.net/production/images/c53b648f-c423-4882-b67f-b10117ea61e5.jpg?token=-m4wfD7XKjkhxfcKZRbRrPyQYbCEX3VdsTSShF51NbY&height=630&width=1200&expires=33295179384",
}: MetaProps): NextMetadata {
  const url = "https://preview.home.mindsend.xyz"; // Hardcoded as per your example

  return {
    title, // <title>
    description, // <meta name="description" content="">

    openGraph: {
      url, // <meta property="og:url" content="https://mindsend.xyz">
      type: "website", // <meta property="og:type" content="website">
      title, // <meta property="og:title" content="">
      description, // <meta property="og:description" content="">
      images: [
        {
          url: image, // <meta property="og:image" content="...">
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // <meta name="twitter:card" content="summary_large_image">
      title, // <meta name="twitter:title" content="">
      description, // <meta name="twitter:description" content="">
      images: [image], // <meta name="twitter:image" content="...">
    },
  };
}

export const Meta = {
  generate: generateMetadata,
};

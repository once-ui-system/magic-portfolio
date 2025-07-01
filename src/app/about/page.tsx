import AboutClient from "./AboutClient";
import { Meta } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function AboutPage() {
  return <AboutClient />;
}

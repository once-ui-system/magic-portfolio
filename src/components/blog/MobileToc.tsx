"use client";

import { blog } from "@/resources";
import { Accordion, Column, HeadingNav, Text, useHeadingLinks } from "@once-ui-system/core";
import { type ComponentProps, useEffect, useState } from "react";

// The sticky "On this page" sidebar is hidden below the m breakpoint, so phones and tablets get
// the same list folded into an accordion above the article. The closed bar renders right away so
// it doesn't push the article down later; it only drops out when the article itself has fewer
// than two headings (the list would otherwise be just "Recent posts" or "Related projects").
export function MobileToc(props: ComponentProps<typeof Column>) {
  const headings = useHeadingLinks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Headings are read on mount, so this only touches the DOM in the browser
  const inArticle = headings.filter((heading) =>
    document.getElementById(heading.id)?.closest("article"),
  ).length;

  if (mounted && inArticle < 2) return null;

  return (
    <Column fillWidth hide m={{ hide: false }} border radius="l" {...props}>
      <Accordion
        size="s"
        radius="l"
        title={
          <Text textVariant="label-default-m" onBackground="neutral-medium">
            {blog.mobileToc?.title ?? "On this page"}
          </Text>
        }
      >
        <HeadingNav header={false} position="static" paddingBottom="8" />
      </Accordion>
    </Column>
  );
}

import { Column } from "@once-ui-system/core";
import { Newsletter } from "@/components";
import { Projects } from "@/components/work/Projects";
import { aesthetic, aesthetics, display, homeSections, type AestheticName } from "@/resources";
import type { HomeSection } from "@/types";
import { HeroCentered } from "./HeroCentered";
import { HeroSplit } from "./HeroSplit";
import { HeroStatement } from "./HeroStatement";
import { HeroTerminal } from "./HeroTerminal";
import { PostsGrid } from "./PostsGrid";
import { PostsList } from "./PostsList";
import { Ticker } from "./Ticker";
import { WorkBento } from "./WorkBento";
import { WorkIndex } from "./WorkIndex";

function Section({ section }: { section: HomeSection }) {
  switch (section.type) {
    case "hero":
      if (section.variant === "statement") return <HeroStatement />;
      if (section.variant === "split") return <HeroSplit />;
      if (section.variant === "terminal") return <HeroTerminal />;
      return <HeroCentered />;
    case "ticker":
      return <Ticker />;
    case "work":
      if (section.variant === "index") return <WorkIndex range={section.range} />;
      if (section.variant === "bento") return <WorkBento range={section.range} />;
      return <Projects range={section.range} />;
    case "posts":
      if (section.variant === "list") return <PostsList range={section.range} />;
      return <PostsGrid range={section.range} />;
    case "newsletter":
      return <Newsletter />;
  }
}

function sectionsFor(name: AestheticName): HomeSection[] {
  return homeSections.length > 0 ? homeSections : aesthetics[name].home;
}

/**
 * With the aesthetic switcher on, every aesthetic's sections are rendered once,
 * merged in page order, each tagged with the aesthetics that show it; CSS from
 * AestheticStyles hides the rest. Without it, only the chosen aesthetic renders.
 */
function mergeSections(): { section: HomeSection; shownIn: AestheticName[] }[] {
  const merged: { key: string; section: HomeSection; shownIn: AestheticName[] }[] = [];
  for (const name of Object.keys(aesthetics) as AestheticName[]) {
    let cursor = -1;
    for (const section of sectionsFor(name)) {
      const key = JSON.stringify(section);
      const existing = merged.findIndex((item) => item.key === key);
      if (existing !== -1) {
        merged[existing].shownIn.push(name);
        cursor = existing;
      } else {
        merged.splice(cursor + 1, 0, { key, section, shownIn: [name] });
        cursor += 1;
      }
    }
  }
  return merged;
}

export function HomeSections() {
  if (!display.aestheticSwitcher) {
    return sectionsFor(aesthetic).map((section) => (
      <Section key={JSON.stringify(section)} section={section} />
    ));
  }

  return mergeSections().map(({ section, shownIn }) => (
    <Column key={JSON.stringify(section)} fillWidth data-aesthetic-only={shownIn.join(" ")}>
      <Section section={section} />
    </Column>
  ));
}

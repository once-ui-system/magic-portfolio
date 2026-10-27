import type { Root, RootContent } from "hast";
import { slugify as transliterate } from "transliteration";

const headings = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

/** The fragment id for a heading's text: "Get started & deploy" becomes "get-started-and-deploy". */
export function slugify(text: string): string {
  return transliterate(text.replace(/&/g, " and "), {
    lowercase: true,
    separator: "-",
  }).replace(/--+/g, "-");
}

// The text a reader sees: inline code and link text count, markup doesn't.
function textOf(node: Root | RootContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

/**
 * Rehype plugin that gives every Markdown heading in a document an id from its text, so the
 * table of contents and `#links` find it. Headings with inline code or links get a clean slug,
 * and a repeated heading gets `-1`, `-2`… so every id is unique. A heading's existing id is kept.
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    const used = new Set<string>();

    const visit = (node: Root | RootContent) => {
      if (node.type === "element" && headings.has(node.tagName)) {
        const existing = node.properties.id;
        if (typeof existing === "string" && existing) {
          used.add(existing);
          return;
        }

        const base = slugify(textOf(node));
        if (!base) return;

        let id = base;
        for (let n = 1; used.has(id); n++) id = `${base}-${n}`;
        used.add(id);
        node.properties.id = id;
        return;
      }

      if ("children" in node) node.children.forEach(visit);
    };

    visit(tree);
  };
}

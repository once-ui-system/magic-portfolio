import {
  about,
  baseURL,
  blog,
  gallery,
  home,
  person,
  protectedRoutes,
  routes,
  seo,
  social,
  work,
} from "@/resources";
import { getSortedPosts } from "@/utils/utils";
import { textOf } from "@once-ui-system/core/mdx";
import type { ReactNode } from "react";

// Builds /llms.txt (an index of the site, see https://llmstxt.org) and
// /llms-full.txt (the same plus the full text of every post and project)
// from the content the site already has.

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();
const plain = (node: ReactNode) => oneLine(textOf(node));
/** ": text" after a link in a list, or nothing when there is no text. */
const note = (text: string) => (oneLine(text) ? `: ${oneLine(text)}` : "");
const absolute = (path: string) => (/^[a-z]+:/i.test(path) ? path : `${baseURL}${path}`);

/** Enabled in `routes` and not behind a password, itself or through a parent page. */
function isPublic(path: string) {
  const section = `/${path.split("/")[1]}` as `/${string}`;
  if (routes[section] === false || routes[path as `/${string}`] === false) return false;
  return !Object.entries(protectedRoutes).some(
    ([route, locked]) => locked && (path === route || path.startsWith(`${route}/`)),
  );
}

const posts = () =>
  isPublic(blog.path)
    ? getSortedPosts(["src", "app", "blog", "posts"]).filter((post) =>
        isPublic(`${blog.path}/${post.slug}`),
      )
    : [];

const projects = () =>
  isPublic(work.path)
    ? getSortedPosts(["src", "app", "work", "projects"]).filter((project) =>
        isPublic(`${work.path}/${project.slug}`),
      )
    : [];

/** Code samples passed as props (CodeBlock's `codes`), as Markdown code blocks. */
function codeSamples(tag: string) {
  const codes = [...tag.matchAll(/\bcode:\s*(`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\])*")/g)].map(
    ([, literal]) =>
      literal.startsWith("`")
        ? literal.slice(1, -1).replace(/\\([`$\\/])/g, "$1")
        : (JSON.parse(literal) as string),
  );
  const languages = [...tag.matchAll(/\blanguage:\s*"([^"]*)"/g)].map((match) => match[1]);
  return codes
    .map((code, index) => {
      const language = languages.length === codes.length ? languages[index] : "";
      // A fence longer than any run of backticks inside, so nested fences survive
      const longest = Math.max(0, ...(code.match(/`+/g) ?? []).map((run) => run.length));
      const fence = "`".repeat(Math.max(3, longest + 1));
      return `${fence}${language}\n${code.trim()}\n${fence}`;
    })
    .join("\n\n");
}

/**
 * MDX to readable text: prose, Markdown, code and math stay; imports, exports,
 * JSX tags and `{expressions}` go. Text inside paired tags is kept, a
 * self-closing component leaves only its code samples. Relative links become
 * absolute.
 */
export function mdxToText(content: string) {
  let out = "";
  let i = 0;
  let fenced = false;

  // Index just past the tag or expression starting at `start`, skipping over
  // nested braces and quoted strings so `=>` or `>` inside props doesn't end it.
  const skip = (start: number, open: string, close: string) => {
    let depth = 0;
    let quote = "";
    for (let j = start; j < content.length; j++) {
      const char = content[j];
      if (quote) {
        if (char === "\\") j++;
        else if (char === quote) quote = "";
      } else if (char === '"' || char === "'" || char === "`") {
        if (depth > 0 || open === "<") quote = char;
      } else if (char === "{") depth++;
      else if (char === "}") {
        depth--;
        if (open === "{" && depth === 0) return j + 1;
      } else if (open === "<" && char === close && depth === 0) return j + 1;
    }
    return content.length;
  };

  while (i < content.length) {
    const atLineStart = i === 0 || content[i - 1] === "\n";

    const fence = atLineStart && content.startsWith("```", i);
    if (fence) fenced = !fenced;

    // Code blocks are copied as they are, fences included
    if (fenced || fence) {
      const end = content.indexOf("\n", i);
      const next = end === -1 ? content.length : end + 1;
      out += content.slice(i, next);
      i = next;
      continue;
    }

    if (atLineStart && /^(import|export)\s/.test(content.slice(i, i + 7))) {
      const end = content.indexOf("\n", i);
      i = end === -1 ? content.length : end + 1;
      continue;
    }

    const char = content[i];

    // Inline code and math are copied as they are
    const verbatim = char === "`" ? "`" : content.startsWith("$$", i) ? "$$" : "";
    if (verbatim) {
      const end = content.indexOf(verbatim, i + verbatim.length);
      const next = end === -1 ? content.length : end + verbatim.length;
      out += content.slice(i, next);
      i = next;
    } else if (char === "<" && /^<\/?[A-Za-z]/.test(content.slice(i, i + 3))) {
      const end = skip(i, "<", ">");
      const tag = content.slice(i, end);
      const name = tag.match(/^<\/?([A-Za-z][\w.]*)/)?.[1] ?? "";
      if (tag.endsWith("/>") && /^[A-Z]/.test(name)) out += `\n${codeSamples(tag)}\n`;
      i = end;
    } else if (char === "{") {
      i = skip(i, "{", "}");
    } else {
      out += char;
      i++;
    }
  }

  return out
    .replace(/\]\((\/[^)\s]*)\)/g, (_, path: string) => `](${baseURL}${path})`)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const introduction = () =>
  isPublic(about.path) && about.intro.display ? plain(about.intro.description) : "";

const contactLines = () =>
  social.filter((item) => item.link).map((item) => `- ${item.name}: ${item.link}`);

const pageLines = () =>
  [home, about, work, blog, gallery]
    .filter((page) => isPublic(page.path))
    .map((page) => `- [${page.label}](${absolute(page.path)})${note(page.description)}`);

export function buildLlmsIndex() {
  const blogPosts = posts();
  const workProjects = projects();
  const intro = introduction();

  return [
    `# ${person.name}`,
    "",
    `> ${oneLine(home.description)}`,
    "",
    ...(intro ? [intro, ""] : []),
    ...(seo.llmsTxt.fullText
      ? [`The full text of every post and project is at ${baseURL}/llms-full.txt.`, ""]
      : []),
    "## Pages",
    ...pageLines(),
    ...(workProjects.length
      ? [
          "",
          `## ${work.label}`,
          ...workProjects.map(
            (project) =>
              `- [${project.metadata.title}](${baseURL}${work.path}/${project.slug})${note(project.metadata.summary)}`,
          ),
        ]
      : []),
    ...(blogPosts.length
      ? [
          "",
          `## ${blog.label}`,
          ...blogPosts.map(
            (post) =>
              `- [${post.metadata.title}](${baseURL}${blog.path}/${post.slug})${note(post.metadata.summary)}`,
          ),
        ]
      : []),
    "",
    "## Contact",
    ...contactLines(),
    "",
    "## Optional",
    ...(blogPosts.length ? [`- [RSS feed](${baseURL}/api/rss)`] : []),
    `- [Sitemap](${baseURL}/sitemap.xml)`,
    "",
  ].join("\n");
}

export function buildLlmsFull() {
  const intro = introduction();
  const lines = [`# ${person.name}`, "", `> ${oneLine(home.description)}`, ""];

  if (intro) lines.push(intro, "");
  lines.push("## Contact", ...contactLines(), "");

  if (isPublic(about.path)) {
    if (about.work.display && about.work.experiences.length) {
      lines.push(`## ${about.work.title}`);
      for (const job of about.work.experiences) {
        lines.push(`- ${job.role}, ${job.company} (${job.timeframe})`);
        for (const achievement of job.achievements) lines.push(`  - ${plain(achievement)}`);
      }
      lines.push("");
    }
    if (about.studies.display && about.studies.institutions.length) {
      lines.push(`## ${about.studies.title}`);
      for (const school of about.studies.institutions) {
        const description = plain(school.description);
        lines.push(`- ${school.name}${description ? `: ${description}` : ""}`);
      }
      lines.push("");
    }
    if (about.technical.display && about.technical.skills.length) {
      lines.push(`## ${about.technical.title}`);
      for (const skill of about.technical.skills) {
        const description = plain(skill.description);
        lines.push(`- ${skill.title}${description ? `: ${description}` : ""}`);
      }
      lines.push("");
    }
  }

  const entries = [
    { heading: work.label, path: work.path, items: projects() },
    { heading: blog.label, path: blog.path, items: posts() },
  ];

  for (const { heading, path, items } of entries) {
    if (!items.length) continue;
    lines.push(`# ${heading}`);
    for (const { slug, metadata, content } of items) {
      lines.push(
        "",
        `## ${metadata.title}`,
        "",
        `URL: ${baseURL}${path}/${slug}`,
        `Published: ${metadata.publishedAt}`,
        "",
        ...(oneLine(metadata.summary) ? [`> ${oneLine(metadata.summary)}`, ""] : []),
        mdxToText(content),
        "",
      );
    }
  }

  return `${lines.join("\n").trim()}\n`;
}

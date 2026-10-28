// Known AI crawlers, by what they do. `seo.aiCrawlers` in once-ui.config.ts decides which group
// robots.txt lets in, and can replace either list. A user agent belongs in one list only.

/** Bots that fetch pages to answer someone's question or build an AI search index. */
export const aiSearchBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
];

/** Bots that collect text to train AI models. */
export const aiTrainingBots = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
];

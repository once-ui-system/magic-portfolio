#!/usr/bin/env node
/*
  Generates MDX stubs for industries from src/resources/industries.json
  Usage: node scripts/generate-industries.js
*/
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "src", "resources", "industries.json");
const outDir = path.join(root, "src", "app", "industries", "pages");

if (!fs.existsSync(jsonPath)) {
  console.error("industries.json not found at", jsonPath);
  process.exit(1);
}

const list = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function mdxTemplate(name) {
  const today = new Date().toISOString().slice(0, 10);
  return `---\n` +
`title: "${name}"\n` +
`publishedAt: "${today}"\n` +
`summary: "Industry-specific funnel and demo page."\n` +
`images: []\n` +
`---\n\n` +
`## Overview\n\nBrief overview for ${name}.\n\n` +
`## Live Demo\n\n<RoiCalculator title="${name} ROI" />\n\n` +
`## Services\n\n- Quick Wins\n- Transformation\n- Partnership\n`;
}

let created = 0;
for (const item of list) {
  const file = path.join(outDir, `${item.slug}.mdx`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, mdxTemplate(item.name), "utf8");
    created += 1;
  }
}

console.log(`Generated ${created} industry pages in ${outDir}`);


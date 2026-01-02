/**
 * add-front-matter.mjs
 *
 * Adds Docusaurus-compatible front matter to Markdown files
 * that do not already contain front matter.
 *
 * Derives:
 * - title from filename
 * - tags from directory structure
 *
 * Usage:
 *   node add-front-matter.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, "../../docs");

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateFrontMatter(filePath) {
  const relative = path.relative(DOCS_DIR, filePath);
  const parts = relative.split(path.sep);

  const fileName = path.basename(filePath, ".md");
  const section = parts[0] ?? "docs";  // qa, topics
  const topic = parts[1] ?? section;   // passive-income

  const title = titleFromSlug(fileName);
  const description = `Notes and answers about ${title.toLowerCase()}.`;

  return `---
title: ${title}
description: ${description}
tags:
  - ${section}
  - ${topic}
---
`;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip files that already have front matter
  if (content.startsWith("---")) return;

  const frontMatter = generateFrontMatter(filePath);
  fs.writeFileSync(filePath, frontMatter + "\n" + content);
  console.log(`✔ added front matter: ${filePath}`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".md")) {
      processFile(fullPath);
    }
  }
}

walk(DOCS_DIR);
console.log("✅ Front matter added where missing.");

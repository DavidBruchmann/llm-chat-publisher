#!/usr/bin/env node
/**
 * conversation-to-docs.js
 *
 * Transforms a ChatGPT conversation exported as Markdown
 * into Docusaurus-ready docs with auto front matter.
 *
 * Usage:
 *   node conversation-to-docs.js path/to/conversation.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* ------------------ setup ------------------ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = process.argv[2];

if (!INPUT_FILE) {
  console.error('Usage: node conversation-to-docs.js <conversation.md>');
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DOCS_ROOT = path.join(PROJECT_ROOT, 'docs');
const QA_ROOT = path.join(DOCS_ROOT, 'qa');
const TOPICS_ROOT = path.join(DOCS_ROOT, 'topics');

fs.mkdirSync(QA_ROOT, { recursive: true });
fs.mkdirSync(TOPICS_ROOT, { recursive: true });

/* ------------------ helpers ------------------ */

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function writeDoc(baseDir, title, body, meta = {}) {
  const slug = slugify(title);
  const filePath = path.join(baseDir, `${slug}.md`);

  const frontMatter = {
    title,
    source: 'chatgpt',
    ...meta,
  };

  const fm =
    '---\n' +
    Object.entries(frontMatter)
      .map(([k, v]) =>
        Array.isArray(v) ? `${k}: [${v.join(', ')}]` : `${k}: ${v}`
      )
      .join('\n') +
    '\n---\n\n';

  fs.writeFileSync(filePath, fm + body.trim() + '\n');
  console.log(`✔ created ${path.relative(PROJECT_ROOT, filePath)}`);
}

/* ------------------ parsing ------------------ */

const raw = fs.readFileSync(INPUT_FILE, 'utf8');

/**
 * Heuristics:
 * - "User:" starts a question
 * - "Assistant:" starts an answer
 * - Long answers become Topics
 */

const blocks = raw
  .split(/\n(?=User:|Assistant:)/)
  .map(b => b.trim())
  .filter(Boolean);

let currentQuestion = null;
let currentAnswer = null;

for (const block of blocks) {
  if (block.startsWith('User:')) {
    currentQuestion = block.replace(/^User:\s*/, '').trim();
    currentAnswer = null;
  }

  if (block.startsWith('Assistant:') && currentQuestion) {
    currentAnswer = block.replace(/^Assistant:\s*/, '').trim();

    const isLongForm = currentAnswer.split('\n').length >= 12;

    if (isLongForm) {
      // Topic article
      writeDoc(
        TOPICS_ROOT,
        currentQuestion,
        currentAnswer,
        {
          tags: ['topic', 'long-form'],
        }
      );
    } else {
      // Q&A article
      writeDoc(
        QA_ROOT,
        currentQuestion,
        `## Question\n\n${currentQuestion}\n\n## Answer\n\n${currentAnswer}`,
        {
          tags: ['qa'],
        }
      );
    }

    currentQuestion = null;
    currentAnswer = null;
  }
}

console.log('\nDone.');

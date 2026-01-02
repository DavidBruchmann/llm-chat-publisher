/**
 * normalize-headings.mjs
 *
 * Normalizes Markdown headings:
 * - "TL;DR" → "Summary"
 * - "TL;DR something" → "Summary: something"
 *
 * Usage:
 *   node normalize-headings.mjs [targetDir]
 */

import fs from 'fs';
import path from 'path';

const TARGET_DIR = process.argv[2] || 'docs';

walk(TARGET_DIR);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      normalizeFile(fullPath);
    }
  }
}

function normalizeFile(file) {
  const original = fs.readFileSync(file, 'utf8');
  let changed = false;

  const updated = original.replace(
    /^(#{1,6})\s+TL;DR(?:\s+(.*))?$/gm,
    (_, hashes, rest) => {
      changed = true;
      return rest
        ? `${hashes} Summary: ${rest.trim()}`
        : `${hashes} Summary`;
    }
  );

  if (changed) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✔ normalized TL;DR → Summary in ${file}`);
  }
}

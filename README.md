<a href="#license"><img src="https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000"></a>
[![Deploy LLM Chat Publisher to GitHub Pages](https://github.com/DavidBruchmann/llm-chat-publisher/actions/workflows/deploy.yml/badge.svg)](https://github.com/DavidBruchmann/llm-chat-publisher/actions/workflows/deploy.yml)

---

# Publishing with Docusaurus

---

## 1. Overview

This repository provides a **content ingestion and build workflow for Docusaurus**.
It converts long-form source material (such as conversational knowledge or notes) into **structured, navigable documentation** with minimal manual effort.

The focus is on **clear separation between content, tooling, and output**, enabling scalable documentation growth.
It supports Q&A and topic-based articles and ensures reproducible builds for local or GitHub Pages deployment.

---

## 2. What This Library Does

* Accepts Markdown as a **single source of truth**
* Transforms raw content into **Docusaurus-ready documents**
* Automatically generates front matter and categories
* Separates **Q&A-style content** from **topic-based articles**
* Keeps build logic out of the documentation tree

The workflow is deterministic, reproducible, and easy to extend.

---

## 3. Design Principles

* Content-first workflow
* Build logic is explicit and versioned
* No manual duplication or copy & paste
* Compatible with GitHub Pages and local development

---

## 4. How It Works

```
ChatGPT Conversation
        ⬇
[ Markdown Export ]
 (browser script)
        ⬇
single-conversation.md
        ⬇
.Build/ scripts
 (Node.js)
        ⬇
docs/
├── qa/
│   ├── *.md
│   └── _category_.json
└── topics/
    ├── *.md
    └── _category_.json
```

Raw content is exported as one Markdown file, then the build scripts split it, generate front matter, and place it into `docs/` for Docusaurus consumption.

---

## 5. Repository Structure

```
docs/        # Content for Docusaurus
  qa/        # Q&A style articles
  topics/    # Topic articles
  static/    # Static assets for the site

.Build/      # Build scripts and assets (not published)
  tools/     # Conversion and processing scripts
  assets/    # Build-time assets

docusaurus.config.js
sidebars.js
package.json
```

* `docs/` contains **only content** consumed by Docusaurus
* `.Build/` contains **only tooling**, never exposed publicly
* Configuration files define rendering and navigation, not content

---

## 6. Getting Started

1. Export conversation Markdown from ChatGPT (or other sources).
2. Place it in `.Build/input/` (optional).
3. Run Node.js scripts from `.Build/tools/` to generate Docusaurus files.
4. Verify output in `docs/` and run the local dev server:

```bash
npm run start
```

---

## 7. Installation & Scripts

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+ recommended)
* npm (comes with Node.js)

### Install dependencies

From the project root:

```bash
npm install
```

---

### Available Scripts

| Script                                 | Description                                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run start`                        | Starts the Docusaurus development server on `localhost:3000` (or your configured port).                                              |
| `.Build/tools/conversation-to-docs.js` | Reads a single exported Markdown file and splits it into `docs/qa` and `docs/topics`, generating front matter and `_category_.json`. |
| `.Build/tools/html2md.js`              | Converts raw HTML (copied from sources like ChatGPT) into Markdown format for ingestion.                                             |
| `.Build/tools/add-front-matter.js`     | Adds or updates front matter for individual Markdown files.                                                                          |
| `npm run build`                        | Compiles the Docusaurus site into static files for deployment (e.g., GitHub Pages).                                                  |
| `npm run clear`                        | Optional: clears local build artifacts (like `.docusaurus/` and `build/`).                                                           |

---

### Example Workflow

1. Export a conversation as Markdown (or convert HTML → Markdown).
2. Place the file in `.Build/input/`.
3. Run the conversion script:

```bash
node .Build/tools/conversation-to-docs.js
```

4. Check that the generated Markdown files appear in `docs/qa` and `docs/topics`.
5. Run the dev server:

```bash
npm run start
```

6. Once ready, build for production:

```bash
npm run build
```

---

## 8. Content Workflow

### a) Export a Conversation as Markdown

A small browser script (e.g., Tampermonkey) extracts an entire conversation from ChatGPT and exports it as **one Markdown file**.

* Preserves headings, lists, and code blocks
* Produces a clean, deterministic `.md` file
* Acts as the **single source of truth**

---

### b) Convert Markdown into Docusaurus Docs

Node.js scripts in `.Build/` process the exported Markdown:

* Split content into individual documents
* Generate front matter automatically
* Detect Q&A vs topic articles
* Write files into `docs/qa` and `docs/topics`
* Create `_category_.json` files if needed

**Result:** From one exported Markdown file, the build scripts generate:

* Drop-in–ready Docusaurus documents
* Consistent navigation and sidebar structure
* A scalable workflow for growing the knowledge base

---

## 9. Deployment / GitHub Pages

This project is fully compatible with **GitHub Pages**.

### Steps

1. Configure `docusaurus.config.js`:

```js
url: 'https://<your-username>.github.io',
baseUrl: '/',
organizationName: '<your-username>',
projectName: '<repository-name>',
```

2. Build the production site:

```bash
npm run build
```

3. Deploy to GitHub Pages:

```bash
GIT_USER=<your-username> USE_SSH=true npm run deploy
```

4. Verify deployment at:

```
https://<your-username>.github.io/<repository-name>/
```

> You can also deploy manually by copying `build/` to any static host. For a custom domain, configure it in `docusaurus.config.js` and add a `CNAME` file in `static/`.

---

## 10. Most Crucial Docusaurus Aspects

* **Front Matter:** Required for each Markdown file to define title, sidebar, and metadata.
* **Sidebar & Routing:** Controlled by `sidebars.js` and `docusaurus.config.js`; proper structure ensures navigation.
* **Static Assets:** Place images, CSS, or other static files in `docs/static` or `static/`.
* **Build Commands:** `npm run start` for development, `npm run build` for production.

### Helpful Links

* [Docusaurus Official Site](https://docusaurus.io/)
* [Docusaurus Documentation](https://docusaurus.io/docs)

---


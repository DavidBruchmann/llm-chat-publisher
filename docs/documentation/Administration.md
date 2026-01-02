# Administration

This document covers **installation, maintenance, and operational tasks** for this project. It is intended for developers and maintainers who need to **set up, run, update, or deploy** the system, locally or via GitHub.

Where *Development* explains *why the system is structured the way it is*, this document explains *how to operate it correctly*.

---

## Scope of this document

This document includes:

* local installation and prerequisites
* package and dependency management
* build and script execution
* tooling overview
* GitHub and GitHub Pages specifics
* common operational pitfalls

It deliberately excludes:

* content guidelines
* editorial decisions
* architectural rationale (see **Development** instead)

---

## Prerequisites

### Required software

You need the following installed:

* **Node.js** (LTS recommended)
* **npm** (comes with Node.js)
* **Git**

Check versions:

```
node --version
npm --version
git --version
```

---

## Project installation

### Clone the repository

```
git clone https://github.com/<your-user>/<your-repo>.git
cd <your-repo>
```

### Install dependencies

```
npm install
```

This installs:

* Docusaurus
* build-time tooling
* any additional developer dependencies

No global npm packages are required.

---

## Available npm scripts

All common operations are exposed via `package.json` scripts.

Typical examples:

```
npm run start        # start development server
npm run build        # build static site
npm run serve        # serve built site locally
npm run clear        # clear cache
```

Additional scripts may exist for:

* documentation normalization
* content ingestion
* maintenance tasks

Always prefer `npm run …` over calling tools directly unless debugging.

---

## Build tooling overview

All build-related logic lives under:

```
.Build/
```

### Structure

```
.Build/
├── tools/      ← reusable utilities
├── scripts/    ← project-specific workflows
└── config/     ← optional shared configuration
```

---

## Tools

### What tools are

Tools are **standalone utilities** that:

* perform one transformation
* are deterministic
* can be reused across projects

They are typically executed via Node.js:

```
node .Build/tools/<tool-name>.js [args]
```

Examples:

* normalizing Markdown headings
* converting HTML to Markdown
* splitting Markdown files

---

## Scripts

### What scripts are

Scripts are **workflow definitions** that:

* orchestrate multiple tools
* know project-specific paths
* encode the order of operations

They are typically executed via npm scripts:

```
npm run docs:build
```

Scripts may:

* create directories
* clean outputs
* call multiple tools in sequence

---

## ChatGPT ingestion workflow

### Browser-side extraction

ChatGPT content is extracted using a **Tampermonkey userscript**.

Responsibilities:

* access ChatGPT DOM
* export the full conversation
* produce **one single Markdown file**

This avoids browser limitations and CSP issues.

---

### Build-side processing

Once exported, Node.js tooling handles:

* normalization (e.g. TL;DR → Summary)
* splitting into topics and Q&A
* front matter generation
* routing into `docs/qa` and `docs/topics`

All transformations are version-controlled and repeatable.

---

## Static assets

Public assets belong in:

```
static/
```

Rules:

* everything here is publicly accessible
* no scripts or build logic should live here
* `.Build` must never be exposed

---

## GitHub repository conventions

### Branching

A simple model is recommended:

* `main` → production-ready
* feature branches → development

Avoid committing generated build artifacts unless required for deployment.

---

### Commits

Guidelines:

* small, focused commits
* one logical change per commit
* meaningful commit messages

---

## GitHub Pages deployment

### Repository setup

For GitHub Pages:

* repository name: `username.github.io`
* branch: `main` or `gh-pages`

### Docusaurus configuration

Relevant settings live in:

```
docusaurus.config.js
```

Key fields:

* `url`
* `baseUrl`
* `organizationName`
* `projectName`

These must match the GitHub Pages configuration.

---

## Local vs production URLs

The development server:

```
http://localhost:<port>
```

Production:

```
https://<username>.github.io/
```

Docusaurus handles this internally; no manual switching is required when using standard scripts.

---

## Common pitfalls

### Browser limitations

* Do not batch-download hundreds of files from the browser
* Always export a single Markdown file and process it locally

---

### Cache issues

If the dev server behaves strangely:

```
npm run clear
npm run start
```

---

### File placement

* Content → `docs/`
* Tooling → `.Build/`
* Public assets → `static/`

Mixing these will cause subtle issues.

---

## Maintenance checklist

Before deploying:

* run normalization scripts
* build site locally
* verify sidebar structure
* check broken links

---

## Final notes

This document is meant to be **practical and operational**.

If you are asking:

> *“How do I run or maintain this project?”*

…the answer should live here.

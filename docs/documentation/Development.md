# Development

This section documents **how this project is built, structured, and automated**. It is intended for developers (including future-you) and explains *why* things are where they are, not just *what* exists.

The goal of this folder is:

* to keep build and tooling knowledge **out of content docs**
* to make the workflow **auditable and reproducible**
* to avoid tribal knowledge

---

## Folder placement & sidebar intent

This folder lives at:

```
docs/documentation/
```

It is linked **at the bottom of the sidebar**, intentionally separated from user-facing content (Q&A, Topics).

This signals clearly:

* readers → content above
* contributors → documentation below

---

## Build system overview

The project separates **content**, **tooling**, and **orchestration**.

```
project-root/
├── docs/                 ← Docusaurus content only
│   ├── qa/
│   ├── topics/
│   └── documentation/    ← developer documentation (this folder)
│
├── .Build/               ← everything related to building
│   ├── tools/            ← reusable utilities
│   ├── scripts/          ← project-specific workflows
│   └── config/           ← optional shared configuration
│
└── static/               ← public assets
```

---

## Clear rule: `.Build/tools` vs `.Build/scripts`

### The core rule

> **`.Build/tools` = reusable, single-purpose utilities**
> **`.Build/scripts` = project-specific orchestration**

If a file answers:

* **“What does this do?”** → tool
* **“When / why / in what order?”** → script

---

## `.Build/tools`

### Purpose

Utilities that:

* do **one thing**
* are **stateless**
* are **deterministic**
* do **not assume project structure**

They should be portable to another repository with little or no change.

### Characteristics

* Accept input via CLI arguments, stdin, or explicit file paths
* Do not hardcode `docs/`, `qa/`, `topics/`, etc.
* Easy to test in isolation

### Examples

```
.Build/tools/
├── normalize-headings.js      ← TL;DR → Summary
├── split-markdown.js          ← split by headings
├── html2md.js                 ← HTML → Markdown
└── extract-front-matter.js
```

---

## `.Build/scripts`

### Purpose

Scripts that:

* encode **this project’s workflow**
* wire multiple tools together
* define **order and intent**

They are not meant to be reused without modification.

### Characteristics

* Hardcoded paths are acceptable
* May create / delete directories
* Represent a pipeline step

### Examples

```
.Build/scripts/
├── build-docs.js              ← normalize → split → route
├── import-chatgpt.js          ← ingest exported conversations
└── clean-output.js
```

---

## Ingress philosophy (ChatGPT → Docs)

### Browser side (Tampermonkey)

Responsibilities:

* access ChatGPT DOM
* extract full conversation
* export **one single Markdown file**

Non-responsibilities:

* splitting
* routing
* front matter logic
* batch file generation

Tampermonkey is an **ingress tool**, not a build system.

---

### Build side (Node.js)

Responsibilities:

* parse exported Markdown
* normalize headings (e.g. TL;DR → Summary)
* split into topics and Q&A
* generate front matter
* place files into `docs/qa` and `docs/topics`

This keeps the workflow:

* deterministic
* debuggable
* version-controlled

---

## Editorial normalization rules

Some rules are enforced automatically during build:

### Summary: replacement

* `## TL;DR` → `## Summary`
* `## TL;DR something` → `## Summary: something`

This is handled by:

```
.Build/tools/normalize-headings.js
```

The rule is idempotent and safe to run multiple times.

---

## Why developer documentation lives here

This folder exists so that:

* content authors are not distracted
* build logic is documented once
* future refactors have context

If a document answers:

> *“How does the site work internally?”*

…it belongs here.

---

## Guiding principles

* Content and tooling are **strictly separated**
* Browsers extract, builds transform
* One responsibility per layer
* Automation beats discipline

This structure is designed to scale without becoming fragile.

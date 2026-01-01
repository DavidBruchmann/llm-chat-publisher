// import TurndownService from "turndown";
// import TurndownService from "https://cdn.jsdelivr.net/npm/turndown@7.1.2/dist/turndown.js";
import TurndownService from "https://esm.sh/turndown@7.1.2";

const turndown = new TurndownService({
  codeBlockStyle: "fenced",
  emDelimiter: "_"
});

/* ---------------------------------------------------------
 * 1. Paste interception (THIS fixes shadow content)
 * --------------------------------------------------------- */
const pasteRoot = document.getElementById("pasteRoot");

pasteRoot.addEventListener("paste", e => {
  e.preventDefault();

  const clipboard = e.clipboardData || window.clipboardData;
  const html = clipboard.getData("text/html");
  const text = clipboard.getData("text/plain");

  const fragment = document.createElement("div");
  fragment.innerHTML = html || text;

  sanitizeFragment(fragment);
  stripChatGPTChrome(fragment);     // ← ADD THIS
  normalizeChatGPTPreBlocks(fragment);

  pasteRoot.replaceChildren(...fragment.childNodes);
});

/*
pasteRoot.addEventListener("paste", e => {
  e.preventDefault();

  const clipboard = e.clipboardData || window.clipboardData;
  const html = clipboard.getData("text/html");
  const text = clipboard.getData("text/plain");

  // Prefer HTML, fallback to plain text
  const fragment = document.createElement("div");
  fragment.innerHTML = html || text;

  sanitizeFragment(fragment);
  normalizeChatGPTPreBlocks(fragment);

  pasteRoot.replaceChildren(...fragment.childNodes);
});
*/

/* ---------------------------------------------------------
 * 2. Sanitization
 * --------------------------------------------------------- */
function sanitizeFragment(root) {
  // Remove ChatGPT UI / irrelevant containers
  root.querySelectorAll(
    "button, svg, nav, footer, header, aside, form"
  ).forEach(el => el.remove());

  // Remove hidden elements
  root.querySelectorAll("*").forEach(el => {
    const style = el.style;
    if (
      style?.display === "none" ||
      style?.visibility === "hidden" ||
      el.hasAttribute("aria-hidden")
    ) {
      el.remove();
    }
  });

  // Remove empty wrappers
  root.querySelectorAll("div, span").forEach(el => {
    if (!el.textContent.trim() && !el.querySelector("img,pre,code")) {
      el.remove();
    }
  });
}

function stripChatGPTChrome(root) {
  const blacklistText = [
    "Skip to content",
    "ChatGPT can make mistakes",
    "Cookie Preferences",
    "See Cookie Preferences"
  ];

  root.querySelectorAll("p, div, span, nav, footer").forEach(el => {
    const text = el.textContent?.trim();
    if (!text) return;

    if (blacklistText.some(b => text.includes(b))) {
      el.remove();
    }
  });
}

/* ---------------------------------------------------------
 * 3. Normalize ChatGPT code blocks
 * --------------------------------------------------------- */
function normalizeChatGPTPreBlocks(container) {
  container.querySelectorAll("pre").forEach(pre => {
    const code = pre.querySelector("code");
    if (!code) return;

    const text = code.textContent;

    const cleanPre = document.createElement("pre");
    const cleanCode = document.createElement("code");

    cleanCode.textContent = text;
    cleanPre.appendChild(cleanCode);

    pre.replaceWith(cleanPre);
  });
}

/* ---------------------------------------------------------
 * 4. Convert button
 * --------------------------------------------------------- */
document.getElementById("convert").onclick = () => {
  const markdown = turndown.turndown(pasteRoot.innerHTML);
  document.getElementById("output").value = markdown.trim() + "\n";
};

/*
import TurndownService from 'https://esm.sh/turndown';
import { gfm } from 'https://esm.sh/turndown-plugin-gfm';

const turndown = new TurndownService({
  codeBlockStyle: 'fenced',
  emDelimiter: '*'
});

turndown.use(gfm);

/ *
document.getElementById('convert').onclick = () => {
  const html = document.getElementById('input').innerHTML;
  const markdown = turndown.turndown(html);
  document.getElementById('output').value = markdown;
};
* /

document.getElementById('convert').onclick = () => {
  const input = document.getElementById('input');

  // 🔥 normalize ChatGPT code blocks first
  normalizeChatGPTPreBlocks(input);

  const html = input.innerHTML;
  const markdown = turndown.turndown(html);

  document.getElementById('output').value = markdown;
};


function normalizeChatGPTPreBlocks(container) {
  container.querySelectorAll('pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    // Extract plain text (this preserves line breaks correctly)
    const text = code.textContent;

    // Create clean structure
    const cleanPre = document.createElement('pre');
    const cleanCode = document.createElement('code');

    cleanCode.textContent = text;
    cleanPre.appendChild(cleanCode);

    pre.replaceWith(cleanPre);
  });
}
*/

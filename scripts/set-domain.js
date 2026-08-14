#!/usr/bin/env node
/**
 * Point the site's absolute URLs at your real domain.
 *
 *   npm run set-domain -- https://your-site.vercel.app
 *
 * Canonical, Open Graph, Twitter, JSON-LD, robots.txt and sitemap.xml all
 * need the same origin. Editing three files by hand is easy to get half-right
 * — a stale og:url still shows the wrong link preview even when canonical is
 * correct — so this rewrites every occurrence at once.
 *
 * Idempotent: it reads whatever origin is currently in index.html's canonical
 * tag and replaces that, so it can be re-run to change domains again.
 */
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "client", "public");
const TARGETS = ["index.html", "robots.txt", "sitemap.xml"];

const fail = (msg) => {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
};

const input = process.argv[2];
if (!input) {
  fail("Usage: npm run set-domain -- https://your-site.vercel.app");
}

let nextOrigin;
try {
  const url = new URL(input);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    fail(`Expected an http(s) URL, got "${input}"`);
  }
  nextOrigin = url.origin; // drops any path, query and trailing slash
} catch {
  fail(`"${input}" is not a valid URL. Include the scheme, e.g. https://example.com`);
}

const indexPath = path.join(PUBLIC_DIR, "index.html");
if (!fs.existsSync(indexPath)) {
  fail(`Could not find ${indexPath}`);
}

const indexHtml = fs.readFileSync(indexPath, "utf8");
const canonical = indexHtml.match(
  /<link\s+rel="canonical"\s+href="([^"]+)"/i
);
if (!canonical) {
  fail("No <link rel=\"canonical\"> found in index.html — cannot determine the current origin.");
}

const currentOrigin = new URL(canonical[1]).origin;

if (currentOrigin === nextOrigin) {
  console.log(`\n  Already set to ${nextOrigin} — nothing to do.\n`);
  process.exit(0);
}

let totalReplacements = 0;
const summary = [];

for (const file of TARGETS) {
  const filePath = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(filePath)) {
    summary.push(`  - ${file}: skipped (not found)`);
    continue;
  }

  const before = fs.readFileSync(filePath, "utf8");
  const count = before.split(currentOrigin).length - 1;

  if (count === 0) {
    summary.push(`  - ${file}: no occurrences`);
    continue;
  }

  fs.writeFileSync(filePath, before.split(currentOrigin).join(nextOrigin));
  totalReplacements += count;
  summary.push(`  - ${file}: ${count} replaced`);
}

console.log(`\n  ${currentOrigin}  ->  ${nextOrigin}\n`);
console.log(summary.join("\n"));
console.log(`\n  ${totalReplacements} URL${totalReplacements === 1 ? "" : "s"} updated. Rebuild to apply: npm run build\n`);

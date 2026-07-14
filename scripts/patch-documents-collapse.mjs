import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = path.join(ROOT, "documents.html");
let h = fs.readFileSync(p, "utf8");

const collapseIds = [
  ["Field Guides", "field-guides"],
  ["Technical Specs", "technical-specs"],
  ["Research Notes", "research-notes"],
  ["Study Guides", "study-guides"],
  ["Archive / Drafts", "archive-drafts"],
];

for (const [title, id] of collapseIds) {
  const re = new RegExp(
    `<section class="doc-group">\\s*<h2>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h2>\\s*<div class="doc-grid">`
  );
  if (re.test(h)) {
    h = h.replace(
      re,
      `<section class="doc-group" data-doc-collapse id="${id}">\n      <h2>${title} <button type="button" class="doc-collapse-toggle" data-doc-collapse-toggle aria-expanded="false">Show</button></h2>\n      <div class="doc-grid" data-doc-collapse-panel hidden>`
    );
    console.log("collapsed", title);
  } else {
    console.log("miss", title);
  }
}

if (!/id="white-papers"/.test(h)) {
  h = h.replace(
    /<section class="doc-group">\s*<h2>White Papers<\/h2>/,
    '<section class="doc-group" id="white-papers">\n      <h2>White Papers</h2>'
  );
  console.log("white-papers id");
}

fs.writeFileSync(p, h);
console.log("documents patched");

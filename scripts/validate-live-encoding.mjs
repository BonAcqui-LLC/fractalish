/** Read-only encoding checks for every public sitemap route. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = new URL(process.argv[2] || "https://fractalish.com");
const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const indexedUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const artifactPattern = /(?:\uFFFD|\u00E2[\u0080-\uFFFF]|\u00C3[\u0080-\uFFFF]|\u00C2[\u0080-\uFFFF]|[Hh]uman\?AI|human\?machine|reproduction\?not|\?Show your work\?|\?slop\?)/;
const failures = [];
const bodies = new Map();
const cacheKey = Date.now().toString(36);
let cursor = 0;

async function checkNext() {
  while (cursor < indexedUrls.length) {
    const indexedUrl = new URL(indexedUrls[cursor++]);
    const liveUrl = new URL(indexedUrl.pathname, BASE);
    liveUrl.searchParams.set("encoding-check", cacheKey);
    try {
      const response = await fetch(liveUrl, { headers: { "cache-control": "no-cache" } });
      const bytes = await response.arrayBuffer();
      let body;
      try {
        body = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      } catch {
        failures.push({ url: liveUrl.href, problem: "invalid UTF-8" });
        continue;
      }
      bodies.set(indexedUrl.pathname, body);
      if (!response.ok) failures.push({ url: liveUrl.href, problem: `HTTP ${response.status}` });
      if (artifactPattern.test(body)) failures.push({ url: liveUrl.href, problem: "encoding artifact" });
    } catch (error) {
      failures.push({ url: liveUrl.href, problem: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => checkNext()));

const homepage = bodies.get("/") || "";
const declaration = bodies.get("/synaptient-declaration/") || "";
const declarationLinkCount = (declaration.match(/href="\/synaptient-declaration\/"/g) || []).length;
const assertions = {
  homepageCorrect: homepage.includes("forms—not a universal label"),
  homepageCorrupt: homepage.includes("formsâ€”"),
  declarationDashes: declaration.includes("Human–AI"),
  declarationQuotes: declaration.includes("“Show your work”"),
  declarationLinkCount
};

if (!assertions.homepageCorrect) failures.push({ url: new URL("/", BASE).href, problem: "corrected homepage phrase absent" });
if (assertions.homepageCorrupt) failures.push({ url: new URL("/", BASE).href, problem: "corrupt homepage phrase present" });
if (!assertions.declarationDashes || !assertions.declarationQuotes) {
  failures.push({ url: new URL("/synaptient-declaration/", BASE).href, problem: "source punctuation absent" });
}
if (declarationLinkCount !== 2) {
  failures.push({ url: new URL("/synaptient-declaration/", BASE).href, problem: `expected two page links across header and footer, found ${declarationLinkCount}` });
}

console.log(JSON.stringify({ base: BASE.href, checked: indexedUrls.length, assertions, failures }, null, 2));
if (failures.length) process.exitCode = 1;

/** Minimal deterministic crawler for Fractalish public pages.
 *
 * Usage:
 *   node scripts/crawl-site.mjs https://fractalish.com
 */
const BASE = new URL(process.argv[2] || "https://fractalish.com");
const MAX_URLS = Number(process.env.FRACTALISH_CRAWL_LIMIT || 500);
const visited = new Set();
const queued = [new URL("/", BASE).href];
const broken = [];
const redirects = [];
const assets = new Set();
const internalPages = new Set();

try {
  const sitemap = await fetch(new URL("/sitemap.xml", BASE), { headers: { "cache-control": "no-cache" } });
  if (sitemap.ok) {
    const text = await sitemap.text();
    for (const match of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const indexed = normalizeUrl(match[1], BASE);
      const url = indexed ? new URL(indexed.pathname + indexed.search, BASE) : null;
      if (url && sameSite(url)) queued.push(url.href);
    }
  }
} catch {
  // Sitemap crawl seeding is best-effort; normal link crawling still runs.
}

function sameSite(url) {
  return url.origin === BASE.origin;
}

function normalizeUrl(raw, from) {
  try {
    const url = new URL(raw, from);
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function shouldSkip(url) {
  return /^(?:mailto:|tel:|javascript:|data:)/i.test(url.href);
}

function isPage(url) {
  return !/\.(?:css|js|png|jpe?g|gif|webp|svg|ico|json|xml|pdf|docx|xlsx|csv|txt|md|webmanifest|mp4|webm|vtt)$/i.test(url.pathname);
}

function refsFrom(html) {
  return [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
}

async function fetchUrl(url) {
  const response = await fetch(url, { redirect: "manual", headers: { "cache-control": "no-cache" } });
  if (
    response.status === 404 &&
    /^(?:localhost|127\.0\.0\.1)$/.test(url.hostname) &&
    isPage(url) &&
    !url.pathname.endsWith("/") &&
    !url.pathname.endsWith(".html")
  ) {
    const fallback = new URL(url.href);
    fallback.pathname = `${url.pathname}.html`;
    const fallbackResponse = await fetch(fallback, { redirect: "manual", headers: { "cache-control": "no-cache" } });
    if (fallbackResponse.ok) return { response: fallbackResponse };
  }
  const location = response.headers.get("location");
  if (response.status >= 300 && response.status < 400 && location) {
    const next = normalizeUrl(location, url);
    redirects.push({ from: url.href, status: response.status, to: next?.href || location });
    return { response, redirectTo: next };
  }
  return { response };
}

while (queued.length && visited.size < MAX_URLS) {
  const href = queued.shift();
  if (visited.has(href)) continue;
  visited.add(href);
  const url = new URL(href);
  let result;
  try {
    result = await fetchUrl(url);
  } catch (error) {
    broken.push({ url: href, problem: error.message });
    continue;
  }

  if (result.redirectTo) {
    if (sameSite(result.redirectTo) && !visited.has(result.redirectTo.href)) queued.push(result.redirectTo.href);
    continue;
  }

  const { response } = result;
  if (!response.ok) {
    broken.push({ url: href, problem: `HTTP ${response.status}` });
    continue;
  }
  if (!isPage(url)) continue;

  internalPages.add(href);
  const html = await response.text();
  for (const ref of refsFrom(html)) {
    const target = normalizeUrl(ref, url);
    if (!target || shouldSkip(target) || !sameSite(target)) continue;
    if (isPage(target)) {
      if (!visited.has(target.href)) queued.push(target.href);
    } else {
      assets.add(target.href);
    }
  }
}

for (const href of assets) {
  let response;
  try {
    response = await fetch(href, { redirect: "follow", headers: { "cache-control": "no-cache" } });
  } catch (error) {
    broken.push({ url: href, problem: error.message });
    continue;
  }
  if (!response.ok) broken.push({ url: href, problem: `HTTP ${response.status}` });
}

const result = {
  base: BASE.href,
  uniqueUrls: visited.size + assets.size,
  pagesVisited: visited.size,
  internalPages: internalPages.size,
  assetsChecked: assets.size,
  redirects,
  broken,
};

console.log(JSON.stringify(result, null, 2));
if (broken.length) process.exitCode = 1;

#!/usr/bin/env node
/**
 * Fractalish visual-legibility audit for infographic and native diagram surfaces.
 *
 * The script is intentionally read/write-local only. It starts a temporary
 * localhost static server, audits pages with Playwright when available, and
 * writes reproducible reports under docs/visual-audit/.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "docs", "visual-audit");
const SCREEN_DIR = path.join(OUT_DIR, "screenshots");
const CONTACT_DIR = path.join(OUT_DIR, "contact-sheets");

const args = new Set(process.argv.slice(2));
const phaseArg = [...args].find((arg) => arg.startsWith("--phase="));
const phase = phaseArg ? phaseArg.split("=")[1] : "audit";
const noScreenshots = args.has("--no-screenshots");

const REQUIRED_RELEASE_FIGURES = new Set([
  "assets/figures/evidence-status-layers.svg",
  "assets/figures/finite-to-persistent-observer.svg",
  "assets/figures/host-authority-boundary.svg",
  "assets/figures/metric-versus-observer.svg",
  "assets/figures/natural-math-version-authority.svg",
  "assets/figures/persistent-observer-experiment.svg",
  "assets/figures/persistent-observer-stack.svg",
  "assets/figures/weight-receipt-anatomy.svg"
]);

const SCREENSHOT_ROUTES = [
  "/",
  "/persistent-observer.html",
  "/natural-math.html",
  "/bolt-on.html",
  "/weighting-kernel.html",
  "/cognitive-basin.html",
  "/framework.html",
  "/ageometrics/",
  "/specificity-thesis.html",
  "/geometric-sufficiency-ratio/"
];

const VIEWPORTS = [
  [1600, 1000],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [320, 568]
].map(([width, height]) => ({ width, height }));

const ZOOMS = [1, 1.25, 1.5, 2];
const BROWSERS = ["chromium", "firefox", "webkit"];
const SCREENSHOT_VIEWPORTS = [
  { width: 1440, height: 900, zoom: 1, label: "desktop" },
  { width: 390, height: 844, zoom: 1, label: "mobile" },
  { width: 320, height: 568, zoom: 2, label: "narrow-zoom200" }
];

const EXCLUDE_DIRS = new Set([".git", ".wrangler", "node_modules"]);
const TEXTUAL_IMAGE_EXTENSIONS = new Set([".svg"]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toPosix(file) {
  return file.split(path.sep).join("/");
}

function rel(file) {
  return toPosix(path.relative(ROOT, file));
}

function escapeMd(text = "") {
  return String(text).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeToolMessage(message = "") {
  const text = String(message);
  if (/Executable doesn't exist/i.test(text) && /playwright install/i.test(text)) {
    return "Playwright browser executable is unavailable in the local browser cache; install the browser runtime to exercise this engine.";
  }
  return text
    .replace(/[A-Z]:\\[^\s)]+/gi, "[local-path-redacted]")
    .replace(/\u2554[\s\S]*?\u255D/g, "[tool installation hint omitted]")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function stripTags(text = "") {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function walk(dir, predicate, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full, predicate, out);
    } else if (!predicate || predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function routeForHtml(file) {
  const relative = rel(file);
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.replace(/\/index\.html$/, "/")}`;
  return `/${relative}`;
}

function localPathFromUrl(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  let candidate = path.join(ROOT, clean.replace(/^\/+/, ""));
  if (clean.endsWith("/")) candidate = path.join(candidate, "index.html");
  if (!path.extname(candidate) && fs.existsSync(`${candidate}.html`)) candidate = `${candidate}.html`;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) candidate = path.join(candidate, "index.html");
  return candidate;
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8"
  }[ext] || "application/octet-stream";
}

function startServer() {
  const server = http.createServer((req, res) => {
    try {
      const requested = new URL(req.url || "/", "http://127.0.0.1").pathname;
      const file = localPathFromUrl(requested);
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end(`Not found: ${requested}`);
        return;
      }
      res.writeHead(200, { "content-type": mime(file) });
      fs.createReadStream(file).pipe(res);
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end(error.stack || String(error));
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

function extractRefs(html) {
  const refs = [];
  const attrPattern = /\b(?:src|href|content)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attrPattern)) {
    const ref = match[1];
    if (/^(?:https?:)?\/\//i.test(ref)) {
      try {
        const parsed = new URL(ref, "https://fractalish.com");
        refs.push(parsed.pathname);
      } catch {
        refs.push(ref);
      }
    } else {
      refs.push(ref);
    }
  }
  return refs.map((ref) => ref.split("?")[0].split("#")[0]);
}

function parseViewBox(svg) {
  const match = svg.match(/\bviewBox=["']([^"']+)["']/i);
  if (!match) return null;
  const parts = match[1].trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return null;
  return { x: parts[0], y: parts[1], width: parts[2], height: parts[3], raw: match[1] };
}

function parseSvg(file) {
  const raw = fs.readFileSync(file, "utf8");
  const relative = rel(file);
  const textMatches = [...raw.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/gi)];
  const textNodes = textMatches.map((match) => ({
    attrs: match[1],
    text: stripTags(match[2])
  })).filter((node) => node.text);
  const fontSizes = [...raw.matchAll(/font-size=["']?([0-9.]+)/gi)].map((m) => Number(m[1])).filter(Boolean);
  for (const match of raw.matchAll(/font-size\s*:\s*([0-9.]+)px?/gi)) {
    fontSizes.push(Number(match[1]));
  }
  const fontFamilies = new Set();
  for (const match of raw.matchAll(/font-family\s*[:=]["']?([^;"'}]+)/gi)) {
    fontFamilies.add(match[1].replace(/["']/g, "").trim());
  }
  const title = stripTags((raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const desc = stripTags((raw.match(/<desc[^>]*>([\s\S]*?)<\/desc>/i) || [])[1] || "");
  const width = (raw.match(/\bwidth=["']([^"']+)["']/i) || [])[1] || "";
  const height = (raw.match(/\bheight=["']([^"']+)["']/i) || [])[1] || "";
  const viewBox = parseViewBox(raw);
  const text = textNodes.map((node) => node.text).join(" ");
  const defects = [];
  if (!title) defects.push("missing-title");
  if (!desc) defects.push("missing-desc");
  if (textNodes.length && fontFamilies.size === 0) defects.push("missing-font-family");
  if (fontSizes.length && Math.min(...fontSizes) < 12) defects.push("font-under-12px");
  if (/[\uFFFD]/.test(raw)) defects.push("replacement-character");
  if (/(?:â|Ã)[\u0080-\uFFFF]/.test(raw)) defects.push("mojibake-sequence");
  if (/[↔↕→←↑↓⇢⇠✓✕✗]/.test(text)) defects.push("symbol-glyphs");

  let tier = "supporting";
  if (REQUIRED_RELEASE_FIGURES.has(relative)) tier = "current-release-required";
  else if (relative.includes("/og-")) tier = "social-preview";
  else if (relative.startsWith("images/")) tier = "watermark/background";

  return {
    path: relative,
    tier,
    title,
    desc,
    width,
    height,
    viewBox,
    textCount: textNodes.length,
    minFontSize: fontSizes.length ? Math.min(...fontSizes) : null,
    maxFontSize: fontSizes.length ? Math.max(...fontSizes) : null,
    fontFamilies: [...fontFamilies],
    defects,
    textSample: text.slice(0, 180)
  };
}

function pageKind(html) {
  const kinds = [];
  if (/assets\/figures/i.test(html)) kinds.push("svg-image-use");
  if (/class=["'][^"']*\bfx-diagram\b/i.test(html)) kinds.push("native-css-diagram");
  if (/class=["'][^"']*\bdiagram-card\b/i.test(html)) kinds.push("diagram-card");
  if (/class=["'][^"']*\binline-figure\b/i.test(html)) kinds.push("inline-figure");
  if (/class=["'][^"']*\bimage-frame\b/i.test(html)) kinds.push("image-frame");
  if (/class=["'][^"']*\bstatus-board\b/i.test(html)) kinds.push("status-board");
  if (/class=["'][^"']*\bcompare-grid\b/i.test(html)) kinds.push("compare-grid");
  return kinds;
}

function inventory() {
  const svgFiles = walk(ROOT, (file) => path.extname(file).toLowerCase() === ".svg")
    .filter((file) => !rel(file).startsWith("docs/visual-audit/"))
    .sort();
  const htmlFiles = walk(ROOT, (file) => path.extname(file).toLowerCase() === ".html")
    .filter((file) => !rel(file).startsWith("docs/visual-audit/"))
    .sort();

  const svgs = svgFiles.map(parseSvg);
  const pages = htmlFiles.map((file) => {
    const html = fs.readFileSync(file, "utf8");
    const refs = extractRefs(html).filter((ref) => /(?:assets\/figures|images\/).+\.(?:svg|png|jpe?g|webp)$/i.test(ref));
    return {
      path: rel(file),
      route: routeForHtml(file),
      title: stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || ""),
      kinds: pageKind(html),
      figureRefs: [...new Set(refs.map((ref) => ref.replace(/^\/+/, "")))]
    };
  });

  const usageByFigure = new Map(svgs.map((svg) => [svg.path, []]));
  for (const page of pages) {
    for (const ref of page.figureRefs) {
      if (usageByFigure.has(ref)) usageByFigure.get(ref).push(page.route);
    }
  }
  for (const svg of svgs) {
    svg.usedOn = usageByFigure.get(svg.path) || [];
  }

  return { generatedAt: new Date().toISOString(), phase, svgs, pages };
}

function writeInventoryDocs(data) {
  ensureDir(OUT_DIR);
  const lines = [
    "# Fractalish figure inventory",
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "Scope: SVG assets, public HTML pages that reference figure assets, and native HTML/CSS diagram containers. This inventory records visual/legibility status only; it does not rewrite or re-evaluate scientific claims.",
    "",
    "## Summary",
    "",
    `- SVG assets inventoried: ${data.svgs.length}`,
    `- Public HTML pages inventoried: ${data.pages.length}`,
    `- Current-release required SVGs: ${data.svgs.filter((svg) => svg.tier === "current-release-required").length}`,
    `- Pages with rendered figure or diagram surfaces: ${data.pages.filter((page) => page.kinds.length || page.figureRefs.length).length}`,
    "",
    "## SVG assets",
    "",
    "| Path | Tier | ViewBox | Text | Font range | Font family | Used on | Initial findings |",
    "| --- | --- | --- | ---: | --- | --- | --- | --- |"
  ];

  for (const svg of data.svgs) {
    const viewBox = svg.viewBox ? svg.viewBox.raw : `${svg.width || "?"} x ${svg.height || "?"}`;
    const fontRange = svg.minFontSize === null ? "n/a" : `${svg.minFontSize}-${svg.maxFontSize}px`;
    lines.push(`| ${escapeMd(svg.path)} | ${svg.tier} | ${escapeMd(viewBox)} | ${svg.textCount} | ${fontRange} | ${escapeMd(svg.fontFamilies.join("; ") || "n/a")} | ${escapeMd(svg.usedOn.join(", ") || "not referenced in HTML")} | ${escapeMd(svg.defects.join(", ") || "none from static parse")} |`);
  }

  lines.push(
    "",
    "## Public page diagram surfaces",
    "",
    "| Page | Route | Surface classes | Figure refs |",
    "| --- | --- | --- | --- |"
  );
  for (const page of data.pages.filter((page) => page.kinds.length || page.figureRefs.length)) {
    lines.push(`| ${escapeMd(page.path)} | ${escapeMd(page.route)} | ${escapeMd(page.kinds.join(", ") || "asset reference only")} | ${escapeMd(page.figureRefs.join(", "))} |`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "FIGURE_INVENTORY.md"), `${lines.join("\n")}\n`, "utf8");
}

function pageAuditScript() {
  return () => {
    const cssPath = (node) => {
      if (!node || node.nodeType !== 1) return "";
      const parts = [];
      let el = node;
      while (el && el.nodeType === 1 && parts.length < 4) {
        let part = el.tagName.toLowerCase();
        if (el.id) part += `#${el.id}`;
        const cls = [...el.classList].slice(0, 3).join(".");
        if (cls) part += `.${cls}`;
        parts.unshift(part);
        el = el.parentElement;
      }
      return parts.join(" > ");
    };
    const root = document.documentElement;
    const bodyText = document.body ? document.body.innerText : "";
    const docOverflow = Math.max(0, root.scrollWidth - root.clientWidth);
    const elements = [...document.querySelectorAll([
      "figure",
      ".fx-diagram",
      ".diagram-card",
      ".inline-figure",
      ".hero-visual",
      ".image-frame",
      ".visual-pair",
      ".compare-grid",
      ".status-board",
      "img[src$='.svg']",
      "svg"
    ].join(","))];

    const figureFindings = elements.map((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const overflowX = style.overflowX;
      const scrollOverflow = Math.max(0, el.scrollWidth - el.clientWidth);
      const hiddenClip = scrollOverflow > 1 && overflowX === "hidden";
      const uncontainedOverflow = scrollOverflow > 1 && !["auto", "scroll", "overlay"].includes(overflowX) && !el.closest("figure,[class*='figure'],[class*='diagram'],[class*='frame']");
      const img = el.matches("img[src$='.svg']") ? el : null;
      const imgRect = img ? img.getBoundingClientRect() : null;
      const svgTextImgTooSmall = img && img.getAttribute("src")?.endsWith(".svg") && imgRect && imgRect.width < 560;
      return {
        selector: cssPath(el),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        overflowX,
        scrollOverflow: Math.round(scrollOverflow),
        hiddenClip,
        uncontainedOverflow,
        svgTextImgTooSmall,
        imgSrc: img ? img.getAttribute("src") : ""
      };
    }).filter((finding) => finding.hiddenClip || finding.uncontainedOverflow || finding.svgTextImgTooSmall);

    return {
      title: document.title,
      docWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      docOverflow,
      mojibake: /(?:\uFFFD|â[\u0080-\uFFFF]|Ã[\u0080-\uFFFF])/.test(bodyText),
      figureFindings
    };
  };
}

function svgAuditScript() {
  return () => {
    const svg = document.querySelector("svg");
    if (!svg) return { missingSvg: true, texts: [], overlaps: [], outside: [] };
    const svgRect = svg.getBoundingClientRect();

    const texts = [...svg.querySelectorAll("text")].map((el, index) => {
      let box = null;
      try {
        const rect = el.getBoundingClientRect();
        box = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
      } catch {}
      const style = getComputedStyle(el);
      return {
        index,
        text: (el.textContent || "").trim().replace(/\s+/g, " "),
        fontSize: Number.parseFloat(style.fontSize) || null,
        fontFamily: style.fontFamily || "",
        box
      };
    }).filter((item) => item.text);

    const outside = [];
    for (const item of texts) {
      if (!item.box) continue;
      const b = item.box;
      if (
        b.x < svgRect.left - 1 ||
        b.y < svgRect.top - 1 ||
        b.x + b.width > svgRect.right + 1 ||
        b.y + b.height > svgRect.bottom + 1
      ) {
        outside.push(item.index);
      }
    }

    const overlaps = [];
    for (let i = 0; i < texts.length; i += 1) {
      const a = texts[i].box;
      if (!a) continue;
      for (let j = i + 1; j < texts.length; j += 1) {
        const b = texts[j].box;
        if (!b) continue;
        const x = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
        const y = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
        const area = x * y;
        if (area > 18) {
          overlaps.push({
            a: texts[i].index,
            b: texts[j].index,
            area: Math.round(area),
            aText: texts[i].text.slice(0, 80),
            bText: texts[j].text.slice(0, 80)
          });
        }
      }
    }

    return {
      missingSvg: false,
      textCount: texts.length,
      minFontSize: texts.length ? Math.min(...texts.map((t) => t.fontSize || 999)) : null,
      fontFamilies: [...new Set(texts.map((t) => t.fontFamily).filter(Boolean))],
      replacementCharacter: texts.some((t) => t.text.includes("\uFFFD")),
      overlaps,
      outside
    };
  };
}

async function loadPlaywright() {
  try {
    return require("playwright");
  } catch (error) {
    return { error };
  }
}

function effectiveViewport(viewport, zoom) {
  return {
    width: Math.max(160, Math.round(viewport.width / zoom)),
    height: Math.max(240, Math.round(viewport.height / zoom))
  };
}

function filenameSafe(text) {
  return text.replace(/^\//, "root").replace(/[^a-z0-9.-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

async function auditWithBrowser(data) {
  const playwright = await loadPlaywright();
  const audit = {
    generatedAt: new Date().toISOString(),
    phase,
    viewportMatrix: VIEWPORTS.map((viewport) => ({ ...viewport })),
    zoomMatrix: ZOOMS,
    browserMatrix: BROWSERS,
    zoomMethod: "Viewport dimensions are divided by zoom factor to approximate browser reflow at 125%, 150%, and 200%.",
    pageRoutes: [],
    pageResults: [],
    svgResults: [],
    screenshots: [],
    skippedBrowsers: [],
    summary: {}
  };

  const figureRoutes = data.pages
    .filter((page) => page.kinds.length || page.figureRefs.some((ref) => ref.startsWith("assets/figures/")))
    .map((page) => page.route);
  const routes = [...new Set([...SCREENSHOT_ROUTES, ...figureRoutes])].sort();
  audit.pageRoutes = routes;

  const svgRoutes = data.svgs
    .filter((svg) => svg.path.startsWith("assets/figures/"))
    .map((svg) => `/${svg.path}`);

  if (playwright.error) {
    audit.skippedBrowsers = BROWSERS.map((name) => ({ name, reason: `Playwright unavailable: ${playwright.error.message}` }));
    audit.summary = summarizeAudit(audit);
    return audit;
  }

  const { server, baseUrl } = await startServer();
  try {
    for (const browserName of BROWSERS) {
      let browser;
      try {
        browser = await playwright[browserName].launch({ headless: true });
      } catch (error) {
        audit.skippedBrowsers.push({ name: browserName, reason: sanitizeToolMessage(error.message) });
        continue;
      }

      try {
        for (const viewport of VIEWPORTS) {
          for (const zoom of ZOOMS) {
            const vp = effectiveViewport(viewport, zoom);
            const page = await browser.newPage({ viewport: vp });
            page.setDefaultTimeout(8000);
            for (const route of routes) {
              const url = `${baseUrl}${route}`;
              const result = { browser: browserName, route, viewport, zoom, effectiveViewport: vp, ok: true, findings: [] };
              try {
                const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
                if (!response || response.status() >= 400) {
                  result.ok = false;
                  result.findings.push({ severity: "error", kind: "http", detail: response ? response.status() : "no response" });
                } else {
                  await page.waitForLoadState("load", { timeout: 6000 }).catch(() => {});
                  const pageResult = await page.evaluate(pageAuditScript());
                  if (pageResult.docOverflow > 2) {
                    result.findings.push({ severity: "error", kind: "page-horizontal-overflow", detail: pageResult.docOverflow });
                  }
                  if (pageResult.mojibake) {
                    result.findings.push({ severity: "error", kind: "mojibake-or-replacement-character", detail: "Rendered body text matched mojibake/replacement pattern." });
                  }
                  for (const finding of pageResult.figureFindings) {
                    const severity = finding.hiddenClip || finding.uncontainedOverflow ? "error" : "warning";
                    result.findings.push({ severity, kind: "figure-layout", detail: finding });
                  }
                  result.title = pageResult.title;
                  result.docWidth = pageResult.docWidth;
                  result.scrollWidth = pageResult.scrollWidth;
                }
              } catch (error) {
                result.ok = false;
                result.findings.push({ severity: "error", kind: "exception", detail: error.message });
              }
              audit.pageResults.push(result);
            }
            await page.close();
          }
        }

        const svgPage = await browser.newPage({ viewport: { width: 1400, height: 900 } });
        svgPage.setDefaultTimeout(8000);
        for (const route of svgRoutes) {
          const result = { browser: browserName, route, ok: true, findings: [] };
          try {
            const response = await svgPage.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 10000 });
            if (!response || response.status() >= 400) {
              result.ok = false;
              result.findings.push({ severity: "error", kind: "http", detail: response ? response.status() : "no response" });
            } else {
              const svgResult = await svgPage.evaluate(svgAuditScript());
              result.textCount = svgResult.textCount;
              result.minFontSize = svgResult.minFontSize;
              result.fontFamilies = svgResult.fontFamilies;
              if (svgResult.replacementCharacter) {
                result.findings.push({ severity: "error", kind: "replacement-character", detail: "SVG text includes U+FFFD." });
              }
              if (svgResult.outside.length) {
                result.findings.push({ severity: "error", kind: "text-outside-viewbox", detail: svgResult.outside });
              }
              if (svgResult.overlaps.length) {
                result.findings.push({ severity: "warning", kind: "text-bbox-overlap", detail: svgResult.overlaps.slice(0, 10), count: svgResult.overlaps.length });
              }
              if (svgResult.minFontSize !== null && svgResult.minFontSize < 12) {
                result.findings.push({ severity: "warning", kind: "small-svg-text", detail: svgResult.minFontSize });
              }
            }
          } catch (error) {
            result.ok = false;
            result.findings.push({ severity: "error", kind: "exception", detail: error.message });
          }
          audit.svgResults.push(result);
        }
        await svgPage.close();

        if (!noScreenshots && browserName === "chromium") {
          await captureScreenshots(browser, baseUrl, audit);
          await writeContactSheet(data, browser, baseUrl, audit);
        }
      } finally {
        await browser.close();
      }
    }
  } finally {
    server.close();
  }

  audit.summary = summarizeAudit(audit);
  return audit;
}

async function captureScreenshots(browser, baseUrl, audit) {
  const targetDir = path.join(SCREEN_DIR, phase);
  ensureDir(targetDir);
  for (const route of SCREENSHOT_ROUTES) {
    for (const viewport of SCREENSHOT_VIEWPORTS) {
      const effective = effectiveViewport(viewport, viewport.zoom);
      const page = await browser.newPage({ viewport: effective });
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 12000 }).catch(async () => {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "load", timeout: 12000 }).catch(() => {});
      });
      const fileName = `${filenameSafe(route)}-${viewport.label}-${viewport.width}x${viewport.height}-z${Math.round(viewport.zoom * 100)}.png`;
      const output = path.join(targetDir, fileName);
      await page.screenshot({ path: output, fullPage: true });
      await page.close();
      audit.screenshots.push(rel(output));
    }
  }
}

async function writeContactSheet(data, browser, baseUrl, audit) {
  ensureDir(CONTACT_DIR);
  const required = data.svgs.filter((svg) => svg.tier === "current-release-required");
  const supporting = data.svgs.filter((svg) => svg.tier !== "current-release-required" && svg.path.startsWith("assets/figures/"));
  const all = [...required, ...supporting];
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Fractalish infographic contact sheet (${escapeHtml(phase)})</title>
  <link rel="canonical" href="https://fractalish.com/docs/visual-audit/contact-sheets/figures-${escapeHtml(phase)}.html">
  <script>document.documentElement.classList.add("js")</script>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #071019; color: #f3f7f2; }
    body { margin: 0; padding: 32px; background: #071019; }
    h1, h2 { margin: 0 0 12px; }
    p { color: #aeb9c3; max-width: 92ch; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    figure { margin: 0; padding: 12px; border: 1px solid rgba(143, 215, 255, .28); border-radius: 14px; background: rgba(255,255,255,.035); }
    img { display: block; width: 100%; height: auto; border-radius: 10px; background: #071019; }
    figcaption { margin-top: 8px; color: #cbd6e2; font-size: 13px; line-height: 1.35; }
    .tier { color: #7cff6b; text-transform: uppercase; letter-spacing: .08em; font-size: 11px; }
  </style>
</head>
<body>
  <main id="main-content">
    <h1>Fractalish infographic contact sheet (${escapeHtml(phase)})</h1>
    <p>Compact visual sheet for review. Claim text is not reinterpreted here; this is a visual legibility artifact.</p>
    <div class="grid">
    ${all.map((svg) => `<figure>
      <img src="/${escapeHtml(svg.path)}" alt="">
      <figcaption><span class="tier">${escapeHtml(svg.tier)}</span><br>${escapeHtml(svg.path)}<br>${escapeHtml(svg.title || "untitled")}</figcaption>
    </figure>`).join("\n")}
    </div>
  </main>
</body>
</html>`;
  const htmlPath = path.join(CONTACT_DIR, `figures-${phase}.html`);
  const pngPath = path.join(CONTACT_DIR, `figures-${phase}.png`);
  fs.writeFileSync(htmlPath, html, "utf8");
  const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
  await page.goto(`${baseUrl}/docs/visual-audit/contact-sheets/figures-${phase}.html`, { waitUntil: "networkidle", timeout: 12000 }).catch(async () => {
    await page.goto(`${baseUrl}/docs/visual-audit/contact-sheets/figures-${phase}.html`, { waitUntil: "load", timeout: 12000 }).catch(() => {});
  });
  await page.screenshot({ path: pngPath, fullPage: true });
  await page.close();
  audit.screenshots.push(rel(htmlPath), rel(pngPath));
}

function summarizeAudit(audit) {
  const pageFindings = audit.pageResults.flatMap((result) => result.findings.map((finding) => ({ ...finding, route: result.route, browser: result.browser })));
  const svgFindings = audit.svgResults.flatMap((result) => result.findings.map((finding) => ({ ...finding, route: result.route, browser: result.browser })));
  const errors = [...pageFindings, ...svgFindings].filter((finding) => finding.severity === "error");
  const warnings = [...pageFindings, ...svgFindings].filter((finding) => finding.severity === "warning");
  const byKind = {};
  for (const finding of [...pageFindings, ...svgFindings]) {
    byKind[finding.kind] = (byKind[finding.kind] || 0) + 1;
  }
  return {
    pagesTested: new Set(audit.pageResults.map((result) => result.route)).size,
    pageRuns: audit.pageResults.length,
    svgAssetsTested: new Set(audit.svgResults.map((result) => result.route)).size,
    svgRuns: audit.svgResults.length,
    skippedBrowsers: audit.skippedBrowsers.length,
    errors: errors.length,
    warnings: warnings.length,
    byKind
  };
}

function writeAuditReports(audit) {
  ensureDir(OUT_DIR);
  fs.writeFileSync(path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.json"), `${JSON.stringify(audit, null, 2)}\n`, "utf8");

  const topFindings = [
    ...audit.pageResults.flatMap((result) => result.findings.map((finding) => ({ surface: result.route, browser: result.browser, viewport: result.viewport, zoom: result.zoom, ...finding }))),
    ...audit.svgResults.flatMap((result) => result.findings.map((finding) => ({ surface: result.route, browser: result.browser, ...finding })))
  ];

  const lines = [
    "# Fractalish infographic audit",
    "",
    `Generated: ${audit.generatedAt}`,
    `Phase: ${phase}`,
    "",
    "## Scope",
    "",
    "- Browsers requested: Chromium, Firefox, WebKit.",
    `- Browsers skipped: ${audit.skippedBrowsers.length ? audit.skippedBrowsers.map((b) => `${b.name} (${b.reason})`).join("; ") : "none"}`,
    `- Viewports: ${VIEWPORTS.map((v) => `${v.width}x${v.height}`).join(", ")}`,
    `- Zooms: ${ZOOMS.map((z) => `${Math.round(z * 100)}%`).join(", ")}`,
    `- Zoom method: ${audit.zoomMethod}`,
    "",
    "## Summary",
    "",
    `- Pages tested: ${audit.summary.pagesTested}`,
    `- Page browser/viewport/zoom runs: ${audit.summary.pageRuns}`,
    `- SVG assets tested: ${audit.summary.svgAssetsTested}`,
    `- SVG browser runs: ${audit.summary.svgRuns}`,
    `- Error findings: ${audit.summary.errors}`,
    `- Warning findings: ${audit.summary.warnings}`,
    "",
    "## Finding counts by kind",
    "",
    "| Kind | Count |",
    "| --- | ---: |"
  ];

  for (const [kind, count] of Object.entries(audit.summary.byKind).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${escapeMd(kind)} | ${count} |`);
  }
  if (!Object.keys(audit.summary.byKind).length) lines.push("| none | 0 |");

  lines.push(
    "",
    "## Representative findings",
    "",
    "| Severity | Surface | Browser | Viewport | Zoom | Kind | Detail |",
    "| --- | --- | --- | --- | ---: | --- | --- |"
  );
  for (const finding of topFindings.slice(0, 80)) {
    const viewport = finding.viewport ? `${finding.viewport.width}x${finding.viewport.height}` : "n/a";
    const detail = typeof finding.detail === "string" || typeof finding.detail === "number"
      ? finding.detail
      : JSON.stringify(finding.detail);
    lines.push(`| ${finding.severity} | ${escapeMd(finding.surface)} | ${escapeMd(finding.browser || "n/a")} | ${viewport} | ${finding.zoom ? `${Math.round(finding.zoom * 100)}%` : "n/a"} | ${escapeMd(finding.kind)} | ${escapeMd(detail).slice(0, 260)} |`);
  }
  if (!topFindings.length) lines.push("| pass | all audited surfaces | all | all | all | none | No audit findings. |");

  lines.push(
    "",
    "## Screenshot and contact-sheet artifacts",
    "",
    ...audit.screenshots.map((shot) => `- ${shot}`),
    ""
  );

  fs.writeFileSync(path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.md"), `${lines.join("\n")}\n`, "utf8");
}

function writeBeforeAfterReview(audit) {
  const beforeJson = path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.before.json");
  const afterJson = path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.after.json");
  if (phase === "before") {
    fs.copyFileSync(path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.json"), beforeJson);
  }
  if (phase === "after") {
    fs.copyFileSync(path.join(OUT_DIR, "INFOGRAPHIC_AUDIT.json"), afterJson);
  }

  let before = null;
  let after = null;
  if (fs.existsSync(beforeJson)) before = JSON.parse(fs.readFileSync(beforeJson, "utf8"));
  if (fs.existsSync(afterJson)) after = JSON.parse(fs.readFileSync(afterJson, "utf8"));

  const lines = [
    "# Fractalish visual audit before/after review",
    "",
    "This document compares visual-legibility audit artifacts for the current review branch. It is scoped to visual/layout evidence and does not modify scientific claim boundaries.",
    "",
    "## Baselines",
    "",
    `- Before audit present: ${before ? "yes" : "no"}`,
    `- After audit present: ${after ? "yes" : "no"}`,
    "",
    "## Counts",
    "",
    "| Phase | Page runs | SVG runs | Errors | Warnings | Screenshots/contact sheets |",
    "| --- | ---: | ---: | ---: | ---: | ---: |"
  ];

  for (const item of [before, after].filter(Boolean)) {
    lines.push(`| ${item.phase} | ${item.summary.pageRuns} | ${item.summary.svgRuns} | ${item.summary.errors} | ${item.summary.warnings} | ${item.screenshots.length} |`);
  }

  lines.push(
    "",
    "## Artifact locations",
    "",
    "- Inventory: docs/visual-audit/FIGURE_INVENTORY.md",
    "- Current JSON report: docs/visual-audit/INFOGRAPHIC_AUDIT.json",
    "- Current Markdown report: docs/visual-audit/INFOGRAPHIC_AUDIT.md",
    "- Before screenshots: docs/visual-audit/screenshots/before/",
    "- After screenshots: docs/visual-audit/screenshots/after/",
    "- Contact sheets: docs/visual-audit/contact-sheets/",
    "",
    "## Recommendation rubric",
    "",
    "- READY: no severe page overflow, no clipping, no rendered mojibake, no text outside SVG viewBox, and remaining warnings are documented as non-blocking.",
    "- HOLD: any severe audit finding remains on current-release public surfaces.",
    "- REDESIGN: warnings indicate the same figure cannot be made legible through spacing/container treatment alone.",
    ""
  );

  fs.writeFileSync(path.join(OUT_DIR, "BEFORE_AFTER_REVIEW.md"), `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  ensureDir(OUT_DIR);
  ensureDir(SCREEN_DIR);
  ensureDir(CONTACT_DIR);
  const data = inventory();
  writeInventoryDocs(data);
  const audit = await auditWithBrowser(data);
  writeAuditReports(audit);
  writeBeforeAfterReview(audit);

  console.log(`Wrote docs/visual-audit/FIGURE_INVENTORY.md`);
  console.log(`Wrote docs/visual-audit/INFOGRAPHIC_AUDIT.json`);
  console.log(`Wrote docs/visual-audit/INFOGRAPHIC_AUDIT.md`);
  console.log(`Wrote docs/visual-audit/BEFORE_AFTER_REVIEW.md`);
  console.log(`Summary: ${audit.summary.errors} errors, ${audit.summary.warnings} warnings across ${audit.summary.pageRuns} page runs and ${audit.summary.svgRuns} SVG runs.`);
  if (audit.summary.errors) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});

/**
 * Apply fractalish live audit 2026-07-13 site improvements.
 * Does not alter correction notice scientific wording.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
// Windows path fix for file URL
const siteRoot = process.cwd();

const footer = fs.readFileSync(path.join(siteRoot, "_partials/footer-nav.html"), "utf8").trim() + "\n";
const archival = fs.readFileSync(path.join(siteRoot, "_partials/archival-banner-resonant.html"), "utf8").trim() + "\n";
const pivot = fs.readFileSync(path.join(siteRoot, "_partials/natural-math-pivot-callout.html"), "utf8").trim() + "\n";

const majorPages = [
  "index.html",
  "start-here.html",
  "natural-math.html",
  "specificity-thesis.html",
  "documents.html",
  "contribute.html",
  "review.html",
  "support.html",
  "framework.html",
  "research.html",
  "cognitive-basin.html",
  "fractalish-ai.html",
  path.join("ageometrics", "index.html"),
];

function ensureFooter(html) {
  if (html.includes("site-footer-nav")) return html;
  // Insert before last </body>
  const i = html.lastIndexOf("</body>");
  if (i < 0) throw new Error("no </body>");
  return html.slice(0, i) + "\n" + footer + html.slice(i);
}

// 1) Footer on major pages
for (const rel of majorPages) {
  const fp = path.join(siteRoot, rel);
  if (!fs.existsSync(fp)) {
    console.warn("skip missing", rel);
    continue;
  }
  let html = fs.readFileSync(fp, "utf8");
  html = ensureFooter(html);
  fs.writeFileSync(fp, html);
  console.log("footer:", rel);
}

// 2) Natural math pivot callout
{
  const fp = path.join(siteRoot, "natural-math.html");
  let html = fs.readFileSync(fp, "utf8");
  if (!html.includes("pivot-callout")) {
    // Insert after first <h1>...</h1> or after lead paragraph following main open
    const h1 = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/i);
    if (h1) {
      const idx = html.indexOf(h1[0]) + h1[0].length;
      html = html.slice(0, idx) + "\n\n" + pivot + html.slice(idx);
    } else {
      const main = html.indexOf("<main");
      const gt = html.indexOf(">", main);
      html = html.slice(0, gt + 1) + "\n" + pivot + html.slice(gt + 1);
    }
    fs.writeFileSync(fp, html);
    console.log("pivot: natural-math.html");
  } else {
    console.log("pivot already present");
  }
}

// 3) documents.html dedupe Master White Paper — remove second occurrence block
{
  const fp = path.join(siteRoot, "documents.html");
  let html = fs.readFileSync(fp, "utf8");
  const marker = "Fractalish / Synaptient Master White Paper";
  const first = html.indexOf(marker);
  const second = html.indexOf(marker, first + 1);
  if (second > 0) {
    // Find enclosing article/card starting before second marker
    const before = html.lastIndexOf("<article", second);
    const start = before > 0 ? before : html.lastIndexOf("<div class=\"card\"", second);
    // end at next article or section close after second
    let end = html.indexOf("</article>", second);
    if (end > 0) end += "</article>".length;
    else {
      end = html.indexOf("</div>", second);
      // try to find card boundary - walk
      end = html.indexOf("\n          </div>\n", second);
      if (end > 0) end = html.indexOf("\n", end + 1);
    }
    if (start > 0 && end > start) {
      html = html.slice(0, start) + html.slice(end);
      // clean double blank lines
      html = html.replace(/\n{3,}/g, "\n\n");
      fs.writeFileSync(fp, html);
      console.log("documents: removed duplicate Master White Paper block");
    } else {
      console.warn("documents: could not isolate second block; manual check needed", start, end);
    }
  } else {
    console.log("documents: only one Master White Paper entry");
  }
  // ensure footer
  html = fs.readFileSync(fp, "utf8");
  if (!html.includes("site-footer-nav")) {
    fs.writeFileSync(fp, ensureFooter(html));
  }
}

// 4) library.html clean redirect
{
  const fp = path.join(siteRoot, "library.html");
  const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/documents.html#evidence-records">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Library | Fractalish</title>
  <link rel="canonical" href="https://fractalish.com/documents.html#evidence-records">
  <link rel="stylesheet" href="/assets/site.css">
  <meta name="robots" content="noindex">
  <script src="/assets/site.js" defer></script>
</head>
<body>
  <main class="wide">
    <h1>Library</h1>
    <p>The library index lives with public documents and evidence records.</p>
    <p><a href="/documents.html#evidence-records">Continue to Documents → Evidence records</a>.</p>
  </main>
${footer}</body>
</html>
`;
  fs.writeFileSync(fp, content);
  console.log("library.html: clean redirect");
}

// 5) Archival banner + copy to archive + stub redirect at old path
{
  const src = path.join(siteRoot, "resonant-morphology-thesis.html");
  let html = fs.readFileSync(src, "utf8");
  // Insert archival banner after <body> without touching correction notice body text
  if (!html.includes("archival-banner")) {
    html = html.replace(/<body[^>]*>/i, (m) => m + "\n  " + archival.trim() + "\n");
  }
  // Update canonical in archived copy
  const archivedName = "resonant-morphology-thesis-corrected-2026-07-13.html";
  const archiveDir = path.join(siteRoot, "archive");
  if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });
  let archived = html
    .replace(
      /canonical" href="https:\/\/fractalish\.com\/resonant-morphology-thesis\.html"/g,
      `canonical" href="https://fractalish.com/archive/${archivedName}"`
    )
    .replace(
      /og:url" content="https:\/\/fractalish\.com\/resonant-morphology-thesis\.html"/g,
      `og:url" content="https://fractalish.com/archive/${archivedName}"`
    );
  fs.writeFileSync(path.join(archiveDir, archivedName), archived);
  console.log("archive: wrote", archivedName);

  // Root file becomes redirect + keep banner path for old links: prefer soft landing with banner still at root OR pure redirect
  // Audit: move into archive + update sitemap; keep graceful redirect
  const redirectRoot = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/archive/${archivedName}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Resonant Morphology Thesis (archived) | Fractalish</title>
  <link rel="canonical" href="https://fractalish.com/archive/${archivedName}">
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/assets/site.css">
</head>
<body>
  ${archival}
  <main class="wide">
    <h1>This note has been archived</h1>
    <p>The corrected Resonant Morphology research note is retained for provenance under <a href="/archive/${archivedName}">/archive/</a>.</p>
    <p>Current work: <a href="/natural-math.html">Natural Math</a> · <a href="/specificity-thesis.html">Specificity Thesis</a> · <a href="/start-here.html">Start Here</a>.</p>
  </main>
${footer}</body>
</html>
`;
  fs.writeFileSync(src, redirectRoot);
  console.log("root resonant-morphology-thesis.html: redirect + banner");
}

// 6) sitemap.xml updates
{
  const fp = path.join(siteRoot, "sitemap.xml");
  let xml = fs.readFileSync(fp, "utf8");
  const archUrl = "https://fractalish.com/archive/resonant-morphology-thesis-corrected-2026-07-13.html";
  if (!xml.includes(archUrl)) {
    // replace or add loc for resonant
    if (xml.includes("resonant-morphology-thesis.html")) {
      xml = xml.replace(
        /https:\/\/fractalish\.com\/resonant-morphology-thesis\.html/g,
        archUrl
      );
    } else {
      xml = xml.replace(
        "</urlset>",
        `  <url>\n    <loc>${archUrl}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n</urlset>`
      );
    }
    fs.writeFileSync(fp, xml);
    console.log("sitemap: archive URL");
  } else {
    console.log("sitemap: archive already present");
  }
}

// 7) Minimal CSS for footer nav + callouts if missing
{
  const cssPath = path.join(siteRoot, "assets", "site.css");
  if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, "utf8");
    if (!css.includes("site-footer-nav")) {
      css += `

/* Audit 2026-07-13: persistent footer nav + archival / pivot callouts */
.site-footer-nav {
  border-top: 1px solid rgba(0,0,0,0.08);
  margin-top: 2rem;
  padding: 1.25rem 1rem 2rem;
  background: rgba(0,0,0,0.02);
}
.footer-nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.1rem;
  font-size: 0.92rem;
}
.footer-nav-inner a {
  color: inherit;
  text-decoration: none;
  opacity: 0.9;
}
.footer-nav-inner a:hover { text-decoration: underline; opacity: 1; }
.archival-banner { margin: 1rem auto; max-width: 960px; }
.pivot-callout { margin: 1.25rem 0 1.75rem; }
`;
      fs.writeFileSync(cssPath, css);
      console.log("site.css: footer/callout styles");
    }
  }
}

console.log("Done apply-audit-2026-07-13");

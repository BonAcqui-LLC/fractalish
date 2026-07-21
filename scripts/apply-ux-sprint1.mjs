/**
 * Sprint 1 UX: inject unified site-header + site-footer on all HTML pages.
 * Sets aria-current from pathname. Skips _partials.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const HEADER = fs.readFileSync(path.join(ROOT, "_partials", "site-header.html"), "utf8").trim();
const FOOTER = fs.readFileSync(path.join(ROOT, "_partials", "site-footer.html"), "utf8").trim();

const NAV_MATCHERS = [
  { test: /start-here/, href: "/start-here.html" },
  { test: /framework/, href: "/framework.html" },
  { test: /natural-math/, href: "/natural-math.html" },
  { test: /specificity-thesis/, href: "/specificity-thesis.html" },
  { test: /ageometrics|geometric-sufficiency/, href: "/ageometrics/" },
  { test: /documents|library|atlas|white-papers|whitepaper|docs\.html/, href: "/documents.html" },
  { test: /contribute/, href: "/contribute.html" },
  { test: /cognitive-basin/, href: "/cognitive-basin.html" },
  { test: /review/, href: "/review.html" },
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "_partials") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function webPath(filePath) {
  let rel = path.relative(ROOT, filePath).split(path.sep).join("/");
  if (rel.endsWith("/index.html")) rel = rel.slice(0, -"/index.html".length) + "/";
  else if (rel === "index.html") rel = "/";
  return "/" + rel.replace(/^\//, "");
}

function headerFor(filePath) {
  const wp = webPath(filePath).toLowerCase();
  let currentHref = null;
  for (const m of NAV_MATCHERS) {
    if (m.test.test(wp)) {
      currentHref = m.href;
      break;
    }
  }
  // Home: brand only, no aria-current on Start Here etc.
  let h = HEADER;
  if (currentHref) {
    const re = new RegExp(
      `(<a )(href="${currentHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}")`,
      "i"
    );
    h = h.replace(re, '$1aria-current="page" $2');
  }
  return h;
}

function ensureAssets(html) {
  let out = html;
  if (!/document\.documentElement\.classList\.add\(["']js["']\)/.test(out) && /<\/head>/i.test(out)) {
    out = out.replace(
      /<\/head>/i,
      '  <script>document.documentElement.classList.add("js");</script>\n</head>'
    );
  }
  if (!/assets\/site\.css/.test(out) && /<\/head>/i.test(out)) {
    out = out.replace(
      /<\/head>/i,
      '  <link rel="stylesheet" href="/assets/site.css">\n</head>'
    );
  }
  if (!/assets\/site\.js/.test(out) && /<\/head>/i.test(out)) {
    out = out.replace(
      /<\/head>/i,
      '  <script src="/assets/site.js" defer></script>\n</head>'
    );
  }
  return out;
}

function applyChrome(html, filePath) {
  let out = ensureAssets(html);
  const header = headerFor(filePath);
  const redirect = /http-equiv=["']refresh["']/i.test(out);

  // Remove existing primary header(s)
  out = out.replace(/<header class="site-header">[\s\S]*?<\/header>\s*/gi, "");

  // Remove old dual footers / audit footer-nav
  out = out.replace(/<footer class="site-footer[\s\S]*?<\/footer>\s*/gi, "");
  out = out.replace(/<nav class="site-footer-nav"[\s\S]*?<\/nav>\s*/gi, "");

  // Insert header after <body...>
  if (/<body[^>]*>/i.test(out)) {
    out = out.replace(/(<body[^>]*>)/i, `$1\n${header}\n`);
  } else {
    out = header + "\n" + out;
  }

  // Give the shared skip link a stable destination without disturbing existing IDs.
  out = out.replace(/<main(?![^>]*\bid=)([^>]*)>/i, '<main id="main-content"$1>');
  if (!/\bid=["']main-content["']/i.test(out)) {
    out = out.replace(/(<\/header>)/i, '$1\n<span id="main-content" class="skip-target" tabindex="-1"></span>');
  }

  // Fill missing canonical metadata on content pages; redirects retain their existing policy.
  if (!redirect && path.basename(filePath).toLowerCase() !== "404.html" && !/<link\b[^>]*rel=["']canonical["']/i.test(out)) {
    const canonical = `https://fractalish.com${webPath(filePath)}`;
    out = out.replace(/<\/head>/i, `  <link rel="canonical" href="${canonical}">\n</head>`);
  }

  // Insert footer before </body>
  if (/<\/body>/i.test(out)) {
    out = out.replace(/<\/body>/i, `\n${FOOTER}\n</body>`);
  } else {
    out = out + "\n" + FOOTER;
  }

  // Avoid double headers if script run twice
  const headerCount = (out.match(/class="site-header"/g) || []).length;
  if (headerCount > 1) {
    // keep first only
    let n = 0;
    out = out.replace(/<header class="site-header">[\s\S]*?<\/header>\s*/gi, (m) => {
      n += 1;
      return n === 1 ? m : "";
    });
  }
  const footerCount = (out.match(/site-footer-unified/g) || []).length;
  if (footerCount > 1) {
    let n = 0;
    out = out.replace(/<footer class="site-footer site-footer-unified">[\s\S]*?<\/footer>\s*/gi, (m) => {
      n += 1;
      return n === 1 ? m : "";
    });
  }

  return out;
}

const files = walk(ROOT);
let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, "utf8");
  // Skip pure redirect-only mini pages? still give them chrome if they have body
  if (!/<body/i.test(before) && !/<\/html>/i.test(before)) continue;
  const after = applyChrome(before, f);
  if (after !== before) {
    fs.writeFileSync(f, after, "utf8");
    changed += 1;
    console.log("updated", path.relative(ROOT, f));
  }
}
console.log(`Done. ${changed}/${files.length} files updated.`);

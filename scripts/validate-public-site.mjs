/** Read-only local integrity checks for the static site. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const mojibakePattern = /(?:\uFFFD|\u00E2[\u0080-\uFFFF]|\u00C3[\u0080-\uFFFF]|\u00C2[\u0080-\uFFFF])/;
const declarationPunctuationLossPattern = /(?:[Hh]uman\?AI|human\?machine|reproduction\?not|\?Show your work\?|\?slop\?)/;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".wrangler", "node_modules", "_partials"].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function ids(html) {
  return [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function localTarget(raw, source) {
  const cleaned = raw.split("#")[0].split("?")[0];
  if (!cleaned) return source;
  const decoded = decodeURIComponent(cleaned);
  let full = decoded.startsWith("/")
    ? path.join(ROOT, decoded.replace(/^\/+/, ""))
    : path.resolve(path.dirname(source), decoded);
  if (decoded.endsWith("/")) full = path.join(full, "index.html");
  if (!path.extname(full) && fs.existsSync(full + ".html")) full += ".html";
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) full = path.join(full, "index.html");
  return full;
}

const files = walk(ROOT);
const leafGeneratorArchiveAllowlist = new Set([
  "archive/resonant-morphology-thesis-corrected-2026-07-13.html"
]);
for (const file of files) {
  const rel = relative(file);
  const html = fs.readFileSync(file, "utf8");
  const redirect = /http-equiv=["']refresh["']/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const idList = ids(html);
  const duplicateIds = [...new Set(idList.filter((id, i) => idList.indexOf(id) !== i))];

  if (!redirect && h1Count !== 1) errors.push(`${rel}: expected one h1, found ${h1Count}`);
  if (!redirect && !/\bid=["']main-content["']/i.test(html)) errors.push(`${rel}: missing #main-content landmark target`);
  if (/class=["'][^"']*\bskip-link\b/i.test(html) || /Skip to main content/i.test(html)) {
    errors.push(`${rel}: retired skip link is still present`);
  }
  if (!redirect && !/document\.documentElement\.classList\.add\(["']js["']\)/.test(html)) errors.push(`${rel}: missing no-JS navigation hook`);
  if (duplicateIds.length) errors.push(`${rel}: duplicate ids ${duplicateIds.join(", ")}`);
  if (mojibakePattern.test(html)) errors.push(`${rel}: possible UTF-8 mojibake or replacement character`);
  if (rel === "synaptient-declaration/index.html" && declarationPunctuationLossPattern.test(html)) {
    errors.push(`${rel}: declaration punctuation differs from the authoritative DOCX source`);
  }
  if (!redirect && (html.match(/<link\b[^>]*rel=["']canonical["']/gi) || []).length !== 1) {
    warnings.push(`${rel}: expected one canonical link`);
  }
  if (/Natural Math Leaf Generator/i.test(html) && !leafGeneratorArchiveAllowlist.has(rel)) {
    errors.push(`${rel}: Leaf Generator identity language appears outside the preserved archival record`);
  }

  const refs = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
    const target = localTarget(ref, file);
    if (!fs.existsSync(target)) {
      errors.push(`${rel}: missing local target ${ref}`);
      continue;
    }
    const hash = ref.includes("#") ? ref.slice(ref.indexOf("#") + 1) : "";
    if (hash && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(target, "utf8");
      if (!ids(targetHtml).includes(decodeURIComponent(hash))) errors.push(`${rel}: missing anchor ${ref}`);
    }
  }
}

const refreshed = [
  "index.html", "start-here.html", "framework.html", "natural-math.html",
  "cognitive-basin.html", "contribute.html", "support.html", "review.html",
  "scientific-neighbors.html"
];
for (const rel of refreshed) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (!/class=["'][^"']*claim-boundary/i.test(html) && ["index.html", "natural-math.html", "cognitive-basin.html", "scientific-neighbors.html"].includes(rel)) {
    errors.push(`${rel}: missing visible claim boundary`);
  }
  if ((html.match(/<meta\b[^>]*name=["']description["']/gi) || []).length !== 1) errors.push(`${rel}: missing unique meta description`);
  if ((html.match(/<meta\b[^>]*property=["']og:description["']/gi) || []).length !== 1) errors.push(`${rel}: missing unique social description`);
}

const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
for (const phrase of [
  "Fractalish studies the generative grammar upstream of observable form",
  "Form is accumulated consequence",
  "Geometry is one way of measuring the receipt",
  "Form is what exploration leaves behind",
  "The representation is an instrument, not the thesis",
  "Description reads the receipt. Intervention tests the grammar.",
  "Decompartmentalization without decontextualization",
  "GO / STOP / HOLD and PERMIT / INHIBIT / PRESERVE are hypotheses",
  "Fractalish is not a claim that everything is a fractal",
  "Unobserved is not zero"
]) {
  if (!index.includes(phrase)) errors.push(`index.html: missing required narrative phrase: ${phrase}`);
}

const framework = fs.readFileSync(path.join(ROOT, "framework.html"), "utf8");
for (const phrase of ["EXTEND / HOLD / RETRACT", "SUPPORTED / UNRESOLVED / CONTRADICTED", "EXTEND / SENSE / RESTRICT", "GO / STOP / HOLD", "not a proof of identity", "not a substitute name for SENSE", "Unobserved does not mean zero"]) {
  if (!framework.includes(phrase)) errors.push(`framework.html: missing boundary phrase: ${phrase}`);
}

const constitution = fs.readFileSync(path.join(ROOT, "constitution.html"), "utf8");
for (const phrase of [
  "Form is accumulated consequence",
  "Geometry is one way of measuring the receipt",
  "Fractalish seeks the generative grammar upstream of accumulated form",
  "Description reads the receipt. Intervention tests the grammar.",
  "Decompartmentalization without decontextualization",
  "GO / STOP / HOLD",
  "not established universal primitives",
  "does not claim a universal grammar"
]) {
  if (!constitution.includes(phrase)) errors.push(`constitution.html: missing constitutional phrase: ${phrase}`);
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const duplicateLocations = [...new Set(locations.filter((url, i) => locations.indexOf(url) !== i))];
if (duplicateLocations.length) errors.push(`sitemap.xml: duplicate URLs ${duplicateLocations.join(", ")}`);
for (const required of ["https://fractalish.com/", "https://fractalish.com/constitution.html", "https://fractalish.com/desiloization.html", "https://fractalish.com/scientific-neighbors.html", "https://fractalish.com/ageometrics/", "https://fractalish.com/specificity-thesis.html"]) {
  if (!locations.includes(required)) errors.push(`sitemap.xml: missing ${required}`);
}
if (locations.includes("https://fractalish.com/ageometrics.html")) errors.push("sitemap.xml: redirect alias ageometrics.html should not be indexed");

console.log(`Checked ${files.length} HTML files and ${locations.length} sitemap routes.`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`  WARN ${warning}`);
}
if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  for (const error of errors) console.error(`  ERROR ${error}`);
  process.exitCode = 1;
} else {
  console.log("PASS: local routes, anchors, IDs, encoding, source punctuation, core metadata, sitemap, and narrative boundary checks.");
}

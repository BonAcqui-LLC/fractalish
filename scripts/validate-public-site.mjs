/** Read-only local integrity checks for the static site. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

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
  if (!redirect && !/\bid=["']main-content["']/i.test(html)) errors.push(`${rel}: missing #main-content skip target`);
  if (!redirect && !/document\.documentElement\.classList\.add\(["']js["']\)/.test(html)) errors.push(`${rel}: missing no-JS navigation hook`);
  if (duplicateIds.length) errors.push(`${rel}: duplicate ids ${duplicateIds.join(", ")}`);
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
  "Form is what exploration leaves behind",
  "final form is the surviving subset",
  "The generator is an instrument, not the thesis",
  "Fractalish is not a claim that everything is a fractal",
  "EXTEND", "SENSE", "RESTRICT"
]) {
  if (!index.includes(phrase)) errors.push(`index.html: missing required narrative phrase: ${phrase}`);
}

const framework = fs.readFileSync(path.join(ROOT, "framework.html"), "utf8");
for (const phrase of ["EXTEND / HOLD / RETRACT", "SUPPORTED / UNRESOLVED / CONTRADICTED", "not a proof of identity", "not a substitute name for SENSE"]) {
  if (!framework.includes(phrase)) errors.push(`framework.html: missing boundary phrase: ${phrase}`);
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const duplicateLocations = [...new Set(locations.filter((url, i) => locations.indexOf(url) !== i))];
if (duplicateLocations.length) errors.push(`sitemap.xml: duplicate URLs ${duplicateLocations.join(", ")}`);
for (const required of ["https://fractalish.com/", "https://fractalish.com/scientific-neighbors.html", "https://fractalish.com/ageometrics/", "https://fractalish.com/specificity-thesis.html"]) {
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
  console.log("PASS: local routes, anchors, IDs, core metadata, sitemap, and narrative boundary checks.");
}

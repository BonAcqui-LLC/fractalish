import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "releases");
const ARTICLE_DIR = path.join(ROOT, "releases");
const VALID_STATUSES = new Set([
  "REPORTABLE_RESULT", "EXPERIMENTAL_RESULT", "CORRECTION", "NEGATIVE_RESULT",
  "FAILURE", "NEW_SPECIFICATION", "FROZEN_ARTIFACT", "REPLICATION", "EXTENSION", "SUPERSEDED",
]);
const REQUIRED = [
  "schemaVersion", "id", "title", "slug", "date", "authors", "project", "researchArea", "status",
  "evidenceClass", "failedGatesPreserved", "summary", "subtitle", "tags", "relatedRoutes", "keyResult", "claims",
  "whatChanged", "whatHeldConstant", "whyItMatters", "whatDidNotImprove", "negativeResult",
  "limitations", "notEstablished", "nextQuestion", "canonicalRelation", "sourceArtifacts",
];

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const hashFile = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const routeFile = (route) => route === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, `${route.slice(1)}.html`);
const isoDate = (date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
const list = (items, className = "plain-list") => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

function validateRelease(release, sourceFile) {
  for (const key of REQUIRED) {
    if (release[key] === undefined || release[key] === "" || release[key] === null) throw new Error(`${sourceFile}: missing ${key}`);
  }
  if (release.schemaVersion !== 1) throw new Error(`${sourceFile}: unsupported schemaVersion`);
  if (!/^RR-\d{4}-\d{2}-\d{2}-[A-Z0-9-]+$/.test(release.id)) throw new Error(`${sourceFile}: invalid release id`);
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(release.slug)) throw new Error(`${sourceFile}: invalid slug`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(release.date)) throw new Error(`${sourceFile}: invalid date`);
  if (!VALID_STATUSES.has(release.status)) throw new Error(`${sourceFile}: invalid status ${release.status}`);
  if (typeof release.failedGatesPreserved !== "boolean") throw new Error(`${sourceFile}: failedGatesPreserved must be boolean`);
  for (const key of ["authors", "contributors", "tags", "relatedRoutes", "claims", "whatChanged", "whatHeldConstant", "whyItMatters", "whatDidNotImprove", "limitations", "notEstablished", "sourceArtifacts"]) {
    if (!Array.isArray(release[key])) throw new Error(`${sourceFile}: ${key} must be an array`);
  }
  if (!release.authors.length || !release.claims.length || !release.sourceArtifacts.length) throw new Error(`${sourceFile}: authors, claims, and sourceArtifacts cannot be empty`);
  for (const row of release.resultVisual?.rows ?? []) {
    if (!row.label || !Number.isFinite(row.value) || !Number.isFinite(row.max) || row.max <= 0 || row.value < 0 || row.value > row.max) {
      throw new Error(`${sourceFile}: invalid resultVisual row`);
    }
  }
}

function loadReleases() {
  const seenIds = new Set();
  const seenSlugs = new Set();
  const releases = fs.readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".json") && !name.startsWith("_"))
    .map((name) => {
      const release = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, name), "utf8"));
      validateRelease(release, name);
      if (seenIds.has(release.id) || seenSlugs.has(release.slug)) throw new Error(`${name}: duplicate release id or slug`);
      seenIds.add(release.id);
      seenSlugs.add(release.slug);
      return release;
    });
  return releases.sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
}

function verifyAndWriteManifest(release) {
  const assetDir = path.join(ROOT, "release-assets", release.slug);
  if (!fs.existsSync(assetDir)) throw new Error(`${release.id}: missing release-assets/${release.slug}`);
  const hashes = {};
  for (const artifact of release.sourceArtifacts) {
    if (!artifact.label || !artifact.file || !artifact.role || !artifact.expectedSha256) throw new Error(`${release.id}: incomplete source artifact record`);
    if (path.basename(artifact.file) !== artifact.file) throw new Error(`${release.id}: source artifact must be a direct child file`);
    const file = path.join(assetDir, artifact.file);
    if (!fs.existsSync(file)) throw new Error(`${release.id}: missing ${artifact.file}`);
    const hash = hashFile(file);
    if (hash !== artifact.expectedSha256.toLowerCase()) throw new Error(`${release.id}: hash mismatch for ${artifact.file}`);
    hashes[artifact.file] = hash;
  }
  const manifest = {
    schema_version: "fractalish.research-release.v1",
    id: release.id,
    title: release.title,
    date: release.date,
    project: release.project,
    status: release.status,
    evidence_class: release.evidenceClass,
    source_precedence: ["raw/executable receipt", "frozen specification/preregistration", "experiment report", "handoff", "interpretation"],
    claims: release.claims,
    limitations: release.limitations,
    failed_gates_preserved: release.failedGatesPreserved,
    source_files: release.sourceArtifacts.map(({ label, file, role }) => ({ label, file, role })),
    sha256: hashes,
    supersedes: release.supersedes ?? [],
    superseded_by: release.supersededBy ?? null,
    canonical_relation: release.canonicalRelation,
  };
  fs.writeFileSync(path.join(assetDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(assetDir, "checksums.sha256"), `${Object.entries(hashes).map(([file, hash]) => `${hash}  ${file}`).join("\n")}\n`, "utf8");
  return hashes;
}

function releaseCard(release, compact = false) {
  const sourceHref = `/release-assets/${release.slug}/manifest.json`;
  return `<article class="release-card${compact ? " is-compact" : ""}">
    <p class="release-kicker">Research Release <span>${escapeHtml(isoDate(release.date))}</span></p>
    <h3><a href="/releases/${escapeHtml(release.slug)}">${escapeHtml(release.title)}</a></h3>
    <p>${escapeHtml(release.summary)}</p>
    <dl class="release-meta"><div><dt>Project</dt><dd>${escapeHtml(release.project)}</dd></div><div><dt>Status</dt><dd>${escapeHtml(release.status)}</dd></div><div><dt>Evidence</dt><dd>${escapeHtml(release.evidenceClass)}</dd></div></dl>
    <p class="release-actions"><a class="text-link" href="/releases/${escapeHtml(release.slug)}">Read release</a><a class="text-link" href="${sourceHref}">Evidence / downloads</a></p>
  </article>`;
}

function renderTargetBlock(route, releases) {
  const related = route === "/" ? releases.filter((item) => item.featured).slice(0, 3) : releases.filter((item) => item.relatedRoutes.includes(route)).slice(0, 3);
  const heading = route === "/" ? "Research Releases" : route === "/natural-math" ? "Current Natural Math Research Release" : "Latest Related Research Release";
  const intro = route === "/"
    ? "Reportable gains, failures, corrections, replications, and frozen artifacts, published with their evidence and limitations attached."
    : "A dated reportable change linked to its original evidence package. Project authority and historical boundaries remain intact.";
  return `<section class="section release-feed" aria-labelledby="release-feed-${route === "/" ? "home" : route.replaceAll("/", "-").slice(1)}">
    <p class="eyebrow">Public state transfer, not hype</p>
    <h2 id="release-feed-${route === "/" ? "home" : route.replaceAll("/", "-").slice(1)}">${heading}</h2>
    <p>${intro}</p>
    <div class="release-grid">${related.map((item) => releaseCard(item, route !== "/")).join("")}</div>
    <p><a class="button secondary" href="/releases">View all research releases</a></p>
  </section>`;
}

function renderTable(table) {
  if (!table?.columns?.length) return "";
  return `<div class="table-wrap release-table"><table><thead><tr>${table.columns.map((item) => `<th scope="col">${escapeHtml(item)}</th>`).join("")}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((item, index) => `<${index === 0 ? "th scope=\"row\"" : "td"}>${escapeHtml(item)}</${index === 0 ? "th" : "td"}>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderSources(release, hashes) {
  const base = `/release-assets/${release.slug}`;
  const packageArtifact = release.sourceArtifacts.find((artifact) => artifact.role === "original_package") ?? release.sourceArtifacts[0];
  return `<div class="artifact-grid">${release.sourceArtifacts.map((artifact) => `<article class="artifact-card"><h3>${escapeHtml(artifact.label)}</h3><p>${escapeHtml(artifact.role.replaceAll("_", " "))}</p><p><a class="text-link" href="${base}/${encodeURIComponent(artifact.file)}">Download source</a></p><code>SHA-256 ${hashes[artifact.file]}</code></article>`).join("")}</div>
  <p class="release-actions"><a class="button" href="${base}/${encodeURIComponent(packageArtifact.file)}">Download primary source</a><a class="button secondary" href="${base}/manifest.json">Release manifest</a><a class="button secondary" href="${base}/checksums.sha256">Checksums</a></p>`;
}

function renderVisual(visual) {
  if (!visual?.rows?.length) return "";
  return `<div class="scale-result-visual" aria-label="${escapeHtml(visual.ariaLabel)}">${visual.rows.map((row) => `<div><span>${escapeHtml(row.label)}</span><progress value="${row.value}" max="${row.max}">${escapeHtml(row.display ?? `${row.value}/${row.max}`)}</progress><strong>${escapeHtml(row.display ?? `${row.value}/${row.max}`)}</strong><small>${escapeHtml(row.detail ?? "")}</small></div>`).join("")}</div>`;
}

function articleHtml(release, hashes) {
  const canonical = `https://fractalish.com/releases/${release.slug}`;
  const negativeResult = release.negativeResult?.title ? `<section class="section failure-box"><p class="eyebrow">Failed preregistration preserved</p><h2>${escapeHtml(release.negativeResult.title)}</h2><p><strong>${escapeHtml(release.negativeResult.summary)}</strong></p>${list(release.negativeResult.details ?? [])}</section>` : "";
  const diagnostics = release.diagnostics?.length ? `<section class="section"><p class="eyebrow">Causal and diagnostic audit</p><h2>Negative and diagnostic results</h2><div class="card-grid three">${release.diagnostics.map((item) => `<article class="card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><span class="status-badge is-negative">${escapeHtml(item.status)}</span></article>`).join("")}</div></section>` : "";
  const interpretation = release.interpretation?.length ? `<section class="section"><p class="eyebrow">Interpretation</p><h2>Interpretation boundary</h2>${release.interpretation.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</section>` : "";
  const aiRelation = release.aiRelevance ? `<p>${escapeHtml(release.aiRelevance)}</p>` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(release.title)} | Fractalish Research Release</title>
  <meta name="description" content="${escapeHtml(release.summary)}">
  <meta property="og:title" content="${escapeHtml(release.title)}">
  <meta property="og:description" content="${escapeHtml(release.subtitle)}">
  <meta property="og:type" content="article"><meta property="og:url" content="${canonical}">
  <meta property="article:published_time" content="${release.date}"><meta property="article:section" content="${escapeHtml(release.researchArea)}">
  <link rel="canonical" href="${canonical}"><meta name="fractalish:page-class" content="RESEARCH_RELEASE">
</head><body data-page-class="RESEARCH_RELEASE">
<main id="main-content" class="page-shell release-page">
  <header class="page-hero narrow"><p class="eyebrow">Research Release / ${escapeHtml(isoDate(release.date))}</p><h1>${escapeHtml(release.title)}</h1><p class="lead">${escapeHtml(release.subtitle)}</p></header>
  <dl class="project-brief release-status"><div><dt>Project</dt><dd>${escapeHtml(release.project)}</dd></div><div><dt>Status</dt><dd>${escapeHtml(release.status)}</dd></div><div><dt>Evidence class</dt><dd>${escapeHtml(release.evidenceClass)}</dd></div><div><dt>Research area</dt><dd>${escapeHtml(release.researchArea)}</dd></div><div><dt>Authors</dt><dd>${release.authors.map(escapeHtml).join(", ")}</dd></div><div><dt>Release ID</dt><dd>${escapeHtml(release.id)}</dd></div></dl>
  <section class="section release-abstract"><p class="eyebrow">The result</p><h2>Key result</h2><p class="argument">${escapeHtml(release.keyResult)}</p>${renderVisual(release.resultVisual)}${renderTable(release.resultTable)}</section>
  ${negativeResult}
  <section class="section split"><div><p class="eyebrow">What changed</p><h2>What changed</h2>${list(release.whatChanged)}</div><div><p class="eyebrow">What stayed frozen</p><h2>What did not change</h2>${list(release.whatHeldConstant)}</div></section>
  <section class="section split"><div><p class="eyebrow">Why it matters</p><h2>Why it matters</h2>${list(release.whyItMatters)}</div><aside class="callout"><strong>What did not improve</strong>${list(release.whatDidNotImprove)}</aside></section>
  ${diagnostics}
  ${interpretation}
  <section class="section split"><div><p class="eyebrow">Limitations</p><h2>Limitations</h2>${list(release.limitations)}</div><div><p class="eyebrow">Not established</p><h2>What is not established</h2>${list(release.notEstablished)}</div></section>
  <section class="section"><p class="eyebrow">Relation to current work</p><h2>Canonical relation</h2><p>${escapeHtml(release.canonicalRelation)}</p>${aiRelation}</section>
  <section class="section"><p class="eyebrow">Source artifacts</p><h2>The article is the entry point. These files are the record.</h2><p>Evidence precedence: executable and raw receipt; frozen specification and preregistration; experiment report; handoff; interpretation.</p>${renderSources(release, hashes)}</section>
  <section class="section invitation"><p class="eyebrow">Next question</p><h2>Next question</h2><p>${escapeHtml(release.nextQuestion)}</p><p><a class="button secondary" href="/releases">Back to all Research Releases</a></p></section>
</main></body></html>\n`;
}

function archiveHtml(releases) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Research Releases | Fractalish</title><meta name="description" content="Permanent Fractalish research releases with status, limitations, chronology, and downloadable source evidence."><meta property="og:title" content="Research Releases | Fractalish"><meta property="og:description" content="Reportable gains, failures, corrections, replications, and frozen artifacts with their evidence attached."><meta property="og:type" content="website"><meta property="og:url" content="https://fractalish.com/releases"><link rel="canonical" href="https://fractalish.com/releases"><meta name="fractalish:page-class" content="EVIDENCE_RECORD"></head><body data-page-class="EVIDENCE_RECORD"><main id="main-content" class="page-shell release-archive"><header class="page-hero narrow"><p class="eyebrow">Permanent public chronology</p><h1>Research Releases</h1><p class="lead">Research Releases document reportable changes as they occur. A release may report a gain, a failure, a correction, a replication, or a newly frozen artifact.</p></header><section class="section"><p class="claim-boundary"><strong>Public state transfer, not hype.</strong> Releases preserve evidence status, limitations, and backing documents so later work can correct them without rewriting their history.</p><div class="release-grid">${releases.map((item) => releaseCard(item)).join("")}</div></section><section class="section section-narrow"><h2>The publication rule</h2><p>A result is reportable when an outside person could use, test, critique, or continue what was learned. It does not have to be a win. Old releases remain addressable; corrections and supersession are linked rather than overwritten.</p><p><a class="text-link" href="/docs/RESEARCH_RELEASE_PUBLISHING.md">How to publish the next release</a></p></section></main></body></html>\n`;
}

function replaceFeed(file, block) {
  const html = fs.readFileSync(file, "utf8");
  const pattern = /<!-- RESEARCH_RELEASES:START -->[\s\S]*?<!-- RESEARCH_RELEASES:END -->/;
  if (!pattern.test(html)) throw new Error(`${path.relative(ROOT, file)}: missing Research Releases markers`);
  fs.writeFileSync(file, html.replace(pattern, `<!-- RESEARCH_RELEASES:START -->\n${block}\n<!-- RESEARCH_RELEASES:END -->`), "utf8");
}

function updateSitemap(releases) {
  const file = path.join(ROOT, "sitemap.xml");
  const xml = fs.readFileSync(file, "utf8");
  const pattern = /<!-- RESEARCH_RELEASES:START -->[\s\S]*?<!-- RESEARCH_RELEASES:END -->/;
  if (!pattern.test(xml)) throw new Error("sitemap.xml: missing Research Releases markers");
  const routes = ["/releases", ...releases.map((item) => `/releases/${item.slug}`)];
  const block = routes.map((route) => `  <url><loc>https://fractalish.com${route}</loc></url>`).join("\n");
  fs.writeFileSync(file, xml.replace(pattern, `<!-- RESEARCH_RELEASES:START -->\n${block}\n  <!-- RESEARCH_RELEASES:END -->`), "utf8");
}

const releases = loadReleases();
fs.mkdirSync(ARTICLE_DIR, { recursive: true });
for (const release of releases) {
  const hashes = verifyAndWriteManifest(release);
  fs.writeFileSync(path.join(ARTICLE_DIR, `${release.slug}.html`), articleHtml(release, hashes), "utf8");
}
fs.writeFileSync(path.join(ROOT, "releases.html"), archiveHtml(releases), "utf8");
replaceFeed(routeFile("/"), renderTargetBlock("/", releases));
for (const route of new Set(releases.flatMap((item) => item.relatedRoutes))) replaceFeed(routeFile(route), renderTargetBlock(route, releases));
updateSitemap(releases);
console.log(`Research Releases: generated ${releases.length} article(s), archive, feeds, manifests, and sitemap routes.`);

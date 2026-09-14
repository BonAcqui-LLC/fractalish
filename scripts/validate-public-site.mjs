/** Read-only local integrity checks for the static site. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const mojibakePattern = /(?:\uFFFD|\u00E2[\u0080-\uFFFF]|\u00C3[\u0080-\uFFFF]|\u00C2[\u0080-\uFFFF])/;
const declarationPunctuationLossPattern = /(?:[Hh]uman\?AI|human\?machine|reproduction\?not|\?Show your work\?|\?slop\?)/;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".wrangler", "node_modules", "_partials", "live-verification"].includes(ent.name)) continue;
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
  if (!redirect && !/<a\b[^>]*class=["'][^"']*\bskip-link\b[^>]*href=["']#main-content["']/i.test(html)) {
    errors.push(`${rel}: missing keyboard skip link to #main-content`);
  }
  if (!redirect && !/document\.documentElement\.classList\.add\(["']js["']\)/.test(html)) errors.push(`${rel}: missing no-JS navigation hook`);
  const pageClass = html.match(/<meta\b[^>]*name=["']fractalish:page-class["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const bodyClass = html.match(/<body\b[^>]*data-page-class=["']([^"']+)["']/i)?.[1];
  const allowedPageClasses = new Set(["JOURNEY", "CURRENT_FRAMEWORK", "CURRENT_PROJECT", "RESEARCH_RELEASE", "EVIDENCE_RECORD", "HISTORICAL_RECORD", "TOOL", "ADMIN/UTILITY"]);
  if (!pageClass || !allowedPageClasses.has(pageClass)) errors.push(`${rel}: missing or invalid page classification metadata`);
  if (bodyClass !== pageClass) errors.push(`${rel}: body page classification differs from metadata`);
  if (!redirect) {
    const currentCss = (html.match(/\/assets\/site\.css\?v=canon-collapse-20260912/g) || []).length;
    if (currentCss !== 1) errors.push(`${rel}: expected one current stylesheet token, found ${currentCss}`);
    if (/href=["']\/(?:styles\.css|assets\/search\.css)/i.test(html)) errors.push(`${rel}: obsolete public stylesheet dependency remains`);
  }
  if (duplicateIds.length) errors.push(`${rel}: duplicate ids ${duplicateIds.join(", ")}`);
  if (mojibakePattern.test(html)) errors.push(`${rel}: possible UTF-8 mojibake or replacement character`);
  if (rel === "synaptient-declaration/index.html" && declarationPunctuationLossPattern.test(html)) {
    errors.push(`${rel}: declaration punctuation differs from the authoritative DOCX source`);
  }
  const robotsNoindex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(html);
  const canonicalMatches = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/gi)];
  const metaDescriptionCount = (html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/gi) || []).length;
  if (!redirect && !robotsNoindex && canonicalMatches.length !== 1) {
    warnings.push(`${rel}: expected one canonical link`);
  }
  if (!redirect && !robotsNoindex && metaDescriptionCount !== 1) {
    errors.push(`${rel}: expected one meta description, found ${metaDescriptionCount}`);
  }
  for (const match of canonicalMatches) {
    const canonical = match[1];
    if (canonical.includes("#")) errors.push(`${rel}: canonical URL contains a fragment`);
    if (/\.html(?:$|[?#])/.test(canonical)) errors.push(`${rel}: canonical URL uses .html instead of extensionless public URL`);
  }
  if (rel === "404.html" && !robotsNoindex) errors.push("404.html: missing noindex robots directive");
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

const chatAllowlist = new Set(["start-here.html", "consequential-formation.html", "search.html"]);
for (const file of files) {
  const rel = relative(file);
  const html = fs.readFileSync(file, "utf8");
  const hasChat = /src=["']\/site-ai-widget\.js/i.test(html);
  if (hasChat !== chatAllowlist.has(rel)) errors.push(`${rel}: research chat placement differs from the approved three-route allowlist`);
}

const siteHeader = fs.readFileSync(path.join(ROOT, "_partials/site-header.html"), "utf8");
const expectedPrimaryNav = [
  ["/start-here", "Start Here"],
  ["/consequential-formation", "Framework"],
  ["/ai", "AI"],
  ["/project-map", "Projects"],
  ["/evidence", "Evidence"],
  ["/search", "Search"],
];
for (const [href, label] of expectedPrimaryNav) {
  if (!siteHeader.includes(`<a href="${href}">${label}</a>`)) errors.push(`site header: missing primary navigation item ${label}`);
}

const aiPages = new Map([
  ["ai.html", "<h1>AI</h1>"],
  ["ai/research.html", "<h1>AI research</h1>"],
  ["ai/team.html", "<h1>Fractalish Open AI Research Team</h1>"],
  ["ai/method.html", "<h1>Heterogeneous Research Loop</h1>"],
  ["ai/experiments.html", "<h1>AI experiments</h1>"],
  ["ai/artifacts.html", "<h1>AI artifacts</h1>"],
  ["ai/failures.html", "<h1>Failures and holds</h1>"],
  ["ai/build-log.html", "<h1>AI build log</h1>"],
]);
for (const [rel, requiredHeading] of aiPages) {
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (!html.includes(requiredHeading)) errors.push(`${rel}: missing required AI heading`);
  if (!html.includes('class="ai-subnav"')) errors.push(`${rel}: missing AI section navigation`);
  if (!html.includes('class="project-brief ai-status-strip"')) errors.push(`${rel}: missing public research status strip`);
  if (!html.includes('content="CURRENT_PROJECT"') || !html.includes('data-page-class="CURRENT_PROJECT"')) errors.push(`${rel}: wrong page class`);
}

const aiInventoryPath = path.join(ROOT, "docs/AI_RESEARCH_INVENTORY.json");
let aiInventory;
try {
  aiInventory = JSON.parse(fs.readFileSync(aiInventoryPath, "utf8"));
} catch (error) {
  errors.push(`docs/AI_RESEARCH_INVENTORY.json: invalid JSON (${error.message})`);
}
if (aiInventory) {
  if (aiInventory.schema_version !== "fractalish.ai-research-inventory.v1") errors.push("AI inventory: unexpected schema version");
  if (!Array.isArray(aiInventory.items) || aiInventory.items.length !== 31) errors.push("AI inventory: expected 31 distinct records");
  const inventoryIds = aiInventory.items?.map((item) => item.id) ?? [];
  if (new Set(inventoryIds).size !== inventoryIds.length) errors.push("AI inventory: duplicate record IDs");
  const relevance = new Set(aiInventory.items?.map((item) => item.relevance_class));
  for (const required of ["CORE_AI", "DIRECT_SUPPORT", "ENABLING_INFRASTRUCTURE", "PHYSICAL_SUBSTRATE_BRIDGE", "EMBODIMENT_OR_ENERGY_BRIDGE", "HISTORICAL_LINEAGE", "ADJACENT_ONLY", "UNCERTAIN"]) {
    if (!relevance.has(required)) errors.push(`AI inventory: missing relevance class ${required}`);
  }
  const serialized = JSON.stringify(aiInventory);
  if (/[A-Z]:[\\/]|Users[\\/]moop/i.test(serialized)) errors.push("AI inventory: public record leaks an absolute workstation path");
  for (const item of aiInventory.items ?? []) {
    for (const key of ["id", "title", "project", "relevance_class", "connection", "status", "evidence_status", "public_release", "destination"]) {
      if (item[key] === undefined || item[key] === "") errors.push(`AI inventory ${item.id ?? "unknown"}: missing ${key}`);
    }
  }
}

const releaseContentDir = path.join(ROOT, "content", "releases");
const releaseRecords = fs.readdirSync(releaseContentDir)
  .filter((name) => name.endsWith(".json") && !name.startsWith("_"))
  .map((name) => JSON.parse(fs.readFileSync(path.join(releaseContentDir, name), "utf8")));
const releaseIds = releaseRecords.map((release) => release.id);
const releaseSlugs = releaseRecords.map((release) => release.slug);
if (new Set(releaseIds).size !== releaseIds.length) errors.push("Research Releases: duplicate release IDs");
if (new Set(releaseSlugs).size !== releaseSlugs.length) errors.push("Research Releases: duplicate release slugs");

for (const release of releaseRecords) {
  const articlePath = path.join(ROOT, "releases", `${release.slug}.html`);
  const assetDir = path.join(ROOT, "release-assets", release.slug);
  if (!fs.existsSync(articlePath)) {
    errors.push(`Research Release ${release.id}: missing generated article`);
    continue;
  }
  const article = fs.readFileSync(articlePath, "utf8");
  if (!article.includes(`<h1>${release.title}</h1>`)) errors.push(`Research Release ${release.id}: title differs from content record`);
  if (!article.includes('content="RESEARCH_RELEASE"') || !article.includes('data-page-class="RESEARCH_RELEASE"')) errors.push(`Research Release ${release.id}: wrong page class`);
  if (!article.includes(release.id) || !article.includes(release.status) || !article.includes(release.evidenceClass)) errors.push(`Research Release ${release.id}: missing public status metadata`);

  const manifestPath = path.join(assetDir, "manifest.json");
  const checksumsPath = path.join(assetDir, "checksums.sha256");
  if (!fs.existsSync(manifestPath) || !fs.existsSync(checksumsPath)) {
    errors.push(`Research Release ${release.id}: missing generated manifest or checksums`);
    continue;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const checksums = fs.readFileSync(checksumsPath, "utf8");
  if (manifest.id !== release.id || manifest.failed_gates_preserved !== release.failedGatesPreserved) errors.push(`Research Release ${release.id}: manifest metadata differs from content record`);
  for (const artifact of release.sourceArtifacts) {
    const artifactPath = path.join(assetDir, artifact.file);
    if (!fs.existsSync(artifactPath)) {
      errors.push(`Research Release ${release.id}: missing source artifact ${artifact.file}`);
      continue;
    }
    const actual = crypto.createHash("sha256").update(fs.readFileSync(artifactPath)).digest("hex");
    if (actual !== artifact.expectedSha256.toLowerCase()) errors.push(`Research Release ${release.id}: source hash mismatch for ${artifact.file}`);
    if (manifest.sha256?.[artifact.file] !== actual) errors.push(`Research Release ${release.id}: manifest hash mismatch for ${artifact.file}`);
    if (!checksums.includes(`${actual}  ${artifact.file}`)) errors.push(`Research Release ${release.id}: checksum listing missing ${artifact.file}`);
    if (/\.(?:md|txt|json)$/i.test(artifact.file)) {
      const text = fs.readFileSync(artifactPath, "utf8");
      if (/[A-Z]:[\\/]|Users[\\/]moop/i.test(text)) errors.push(`Research Release ${release.id}: public source leaks an absolute workstation path in ${artifact.file}`);
    }
  }

  for (const route of ["/", ...release.relatedRoutes]) {
    const targetPath = route === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, `${route.slice(1)}.html`);
    const target = fs.readFileSync(targetPath, "utf8");
    if ((target.match(/<!-- RESEARCH_RELEASES:START -->/g) || []).length !== 1 || (target.match(/<!-- RESEARCH_RELEASES:END -->/g) || []).length !== 1) errors.push(`${relative(targetPath)}: expected one Research Releases marker block`);
    if (!target.includes(`/releases/${release.slug}`)) errors.push(`${relative(targetPath)}: missing related release ${release.slug}`);
  }
}

const releaseArchive = fs.readFileSync(path.join(ROOT, "releases.html"), "utf8");
for (const release of releaseRecords) {
  if (!releaseArchive.includes(`/releases/${release.slug}`)) errors.push(`releases.html: missing ${release.slug}`);
}

const naturalMathScale = releaseRecords.find((release) => release.id === "RR-2026-09-13-NM-SCALE");
if (!naturalMathScale) {
  errors.push("Research Releases: missing Natural Math scale release");
} else {
  const immutableHashes = {
    "NATURAL_MATH_SCALE_HANDOFF_FOR_JIM_2026-09-13.zip": "2b7f4c0b0ec2eb3ed8aa6ee25e149bf8e9ac10f44b54832e103833ef417ea1cf",
    "HANDOFF_FOR_JIM.md": "b21232ae4184fa43a7b9f579fc9f4dec3f35824d05a8cce4132cc37fecd8abfe",
    "NATURAL_MATH_MOVING_CYCLE_CARRY_CORRECTION_2026-09-13.zip": "58b540adbb2c6b385fd6c1e845a50d32153624efc3f64172848bfe1b357f33b9",
    "NATURAL_MATH_CARRY_STABILITY_LOCAL_CONDITION_AUDIT_2026-09-13.zip": "50485202f1413588a8b61ec7157b775f4b96e0d4b0ec8a2795eafbd7171e189a",
    "NATURAL_MATH_CARRY_SCALE_TEST_2026-09-13.zip": "a0732b4ade249f22b4491ba32f9df8f27d3f4fde2c0fc0fa843a2fe1cbca85b9",
    "NATURAL_MATH_FORMED_MOVEMENT_CAUSAL_AUDIT_2026-09-13.zip": "ba67af4b14741b95ae05c370fe7e1f3c6bf5d598294ee30631c59768cd37376a",
    "NATURAL_MATH_TICK_ORDER_ENERGY_AUDIT_2026-09-13.zip": "4b8f1997ceb9eaef83765019d042233db6e1a22a9b9f228c16e875b2b3a6cb3b",
    "README.md": "503ccfa803504463415277f82765c22fe1dcc6dfeaae2ce0276f38c66419ccb4",
    "SHA256_MANIFEST.txt": "893287337553cebda95afd3d12332d15321329e75d0c3bd9c93be5e8f8eeff43",
  };
  for (const [file, expected] of Object.entries(immutableHashes)) {
    const declared = naturalMathScale.sourceArtifacts.find((artifact) => artifact.file === file)?.expectedSha256;
    if (declared !== expected) errors.push(`Natural Math scale release: immutable source declaration changed for ${file}`);
  }
  const article = fs.readFileSync(path.join(ROOT, "releases", `${naturalMathScale.slug}.html`), "utf8");
  for (const phrase of [
    "44/64",
    "at least 48/64",
    "cycle gate C6 failed",
    "at least 32/64",
    "without retroactively passing the original 48/64 carry gate",
    "Normalized work per agent-tick declined",
    "does not replace the Natural Math v5 frozen integer baseline",
    "not evidence that artificial intelligence was demonstrated",
  ]) {
    if (!article.includes(phrase)) errors.push(`Natural Math scale release: missing boundary phrase ${phrase}`);
  }
}

const homeHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (!homeHtml.includes("Fractalish studies how what happens leaves a difference, and how that difference changes what can happen next.")) errors.push("index.html: missing adopted public sentence");
if (!/CF v0\.4 RC1 is the current canonical candidate[\s\S]*constitutive investigative operation[\s\S]*projects are experiments, implementations, evidence, and historical formation/i.test(homeHtml)) errors.push("index.html: missing CF v0.4 RC1 public hierarchy statement");
if (!/record of formation is not presumed to be its runtime[\s\S]*Formation Ledger[\s\S]*Formative Field[\s\S]*Distributed embodiment/i.test(homeHtml)) errors.push("index.html: missing v0.4 RC1 architecture orientation");
if (!/Public AI laboratory[\s\S]*AI that carries what happened forward[\s\S]*Capability is not formation|Public AI laboratory[\s\S]*host's available capability from acquired formation/i.test(homeHtml)) errors.push("index.html: missing AI public-laboratory doorway");
if (!/og:image[\s\S]*cf-social-card\.png/i.test(homeHtml)) errors.push("index.html: homepage social image is not the fixed PNG card");

const neighborsHtml = fs.readFileSync(path.join(ROOT, "scientific-neighbors.html"), "utf8");
if (!/Sara Imari Walker[\s\S]*Leroy Cronin[\s\S]*Assembly Theory does not validate CF[\s\S]*EXTERNAL REPORTED RESULTS/i.test(neighborsHtml)) errors.push("scientific-neighbors.html: missing bounded Assembly Theory comparison");

const refreshed = [
  "index.html", "start-here.html", "erase-the-nouns.html", "rounds.html", "consequential-formation.html", "what-emerged.html",
  "life-autonomy.html", "memory-intelligence.html", "cognition.html", "reinspect-knowledge.html", "build-with-it.html",
  "what-cf-does-not-claim.html", "try-to-kill-it.html", "try-the-lens.html", "cf-map.html", "framework.html", "natural-math.html",
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
  "Fractalish studies how what happens leaves a difference, and how that difference changes what can happen next.",
  "Suspend the category. Keep the evidence. Audit what returns.",
  "The lines are not the territory.",
  "changed future possibilities",
  "Consequential Formation",
  "Form is accumulated consequence",
  "A resemblance is not a discovery",
  "Do not protect the framework. Try to break it."
]) {
  if (!index.includes(phrase)) errors.push(`index.html: missing required narrative phrase: ${phrase}`);
}

const framework = fs.readFileSync(path.join(ROOT, "framework.html"), "utf8");
for (const phrase of ["EXTEND / HOLD / RETRACT", "SUPPORTED / UNRESOLVED / CONTRADICTED", "EXTEND / SENSE / RESTRICT", "GO / STOP / HOLD", "not a proof of identity", "not a substitute name for SENSE", "Unobserved does not mean zero"]) {
  if (!framework.includes(phrase)) errors.push(`framework.html: missing boundary phrase: ${phrase}`);
}

const cfV03 = fs.readFileSync(path.join(ROOT, "Consequential_Formation_Unified_Framework_v0_3_2026-09-13.md"), "utf8");
const cfV03Hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, "Consequential_Formation_Unified_Framework_v0_3_2026-09-13.md"))).digest("hex").toUpperCase();
const teamV03Hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, "CF_v0_3_Team_State_Transfer_2026-09-13.md"))).digest("hex").toUpperCase();
const cfV04 = fs.readFileSync(path.join(ROOT, "Consequential_Formation_Unified_Framework_v0_4_RC1_2026-09-13.md"), "utf8");
const cfV04Hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, "Consequential_Formation_Unified_Framework_v0_4_RC1_2026-09-13.md"))).digest("hex").toUpperCase();
if (cfV03Hash !== "79C2D5B2E0C33C7E8A900D6611F4D93133D40A7D9114584FFF54D9529BA7A9F5") errors.push("CF v0.3 full artifact differs from the supplied source bytes");
if (teamV03Hash !== "8882613D788B65807B747C9C07B55F55816E38983C20051266B8DADE3EFF15F4") errors.push("CF v0.3 team packet differs from the supplied source bytes");
if (!cfV03.includes("artifact_id: CF-UF-0.3") || !cfV03.includes("version: 0.2-unified-candidate") || !cfV03.includes("id: CF-UF-0.2")) errors.push("CF v0.3 HOLD metadata markers were unexpectedly reconciled");
if (cfV04Hash !== "E61BE1EDDB045B2C05C3AD367C06B635BDBB685C292E1D80477599E60B7CEBAC") errors.push("CF v0.4 RC1 artifact differs from the supplied source bytes");
if (!cfV04.includes("artifact_id: CF-UF-0.4-RC1") || !cfV04.includes("review_state: POST_V0_3_INTEGRATION_CANDIDATE__NOT_FROZEN")) errors.push("CF v0.4 RC1 authority markers are missing");

const currentFramework = fs.readFileSync(path.join(ROOT, "consequential-formation.html"), "utf8");
for (const phrase of [
  "Suspension comes first",
  "A noun that was never removed cannot be said to have survived the CF filter",
  "A returned category must earn its way back twice",
  "Remove the old noun. Reconstruct. Then remove our new noun too",
  "Mutual constitution does not mean identity",
  "CAPABILITY != HOST POLICY != ACQUIRED FORMATION",
  "SPECIFICATION / BUILD-TEST TARGET",
  "Current canonical candidate - CF v0.4 RC1",
  "Representation for audit is not mechanism of execution",
  "This does not establish one self across bodies",
]) {
  if (!currentFramework.includes(phrase)) errors.push(`consequential-formation.html: missing current CF phrase: ${phrase}`);
}

const methodPage = fs.readFileSync(path.join(ROOT, "erase-the-nouns.html"), "utf8");
for (const phrase of ["constitutive of Consequential Formation", "AUDIT INDEPENDENCE", "TYPE THE RETURN", "COMPRESSION NOUN", "Audit our vocabulary too"]) {
  if (!methodPage.includes(phrase)) errors.push(`erase-the-nouns.html: missing CF v0.3 method phrase: ${phrase}`);
}

const mfmPage = fs.readFileSync(path.join(ROOT, "cognitive-basin.html"), "utf8");
for (const phrase of ["Minimum Formative Machine v0.1", "CAPABILITY != HOST POLICY != ACQUIRED FORMATION", "Theta_ledger", "Theta_exec", "Negative transfer", "Recovery and transplant", "RAG", "not achieved intelligence"]) {
  if (!mfmPage.includes(phrase)) errors.push(`cognitive-basin.html: missing MFM boundary phrase: ${phrase}`);
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
for (const required of ["https://fractalish.com/", "https://fractalish.com/start-here", "https://fractalish.com/erase-the-nouns", "https://fractalish.com/rounds", "https://fractalish.com/consequential-formation", "https://fractalish.com/what-emerged", "https://fractalish.com/life-autonomy", "https://fractalish.com/memory-intelligence", "https://fractalish.com/cognition", "https://fractalish.com/reinspect-knowledge", "https://fractalish.com/build-with-it", "https://fractalish.com/what-cf-does-not-claim", "https://fractalish.com/try-to-kill-it", "https://fractalish.com/try-the-lens", "https://fractalish.com/cf-map", "https://fractalish.com/experiments", "https://fractalish.com/constitution", "https://fractalish.com/desiloization", "https://fractalish.com/scientific-neighbors", "https://fractalish.com/ageometrics/", "https://fractalish.com/specificity-thesis", "https://fractalish.com/ai", "https://fractalish.com/ai/research", "https://fractalish.com/ai/team", "https://fractalish.com/ai/method", "https://fractalish.com/ai/experiments", "https://fractalish.com/ai/artifacts", "https://fractalish.com/ai/failures", "https://fractalish.com/ai/build-log", "https://fractalish.com/releases", "https://fractalish.com/releases/2026-09-13-natural-math-scale"]) {
  if (!locations.includes(required)) errors.push(`sitemap.xml: missing ${required}`);
}
if (locations.includes("https://fractalish.com/ageometrics.html")) errors.push("sitemap.xml: redirect alias ageometrics.html should not be indexed");
for (const loc of locations) {
  if (loc.includes("#")) errors.push(`sitemap.xml: URL contains fragment ${loc}`);
  if (/\.html(?:$|[?#])/.test(loc)) errors.push(`sitemap.xml: URL uses .html instead of extensionless public URL ${loc}`);
  if (loc === "https://fractalish.com/atlas" || loc === "https://fractalish.com/library") {
    errors.push(`sitemap.xml: redirect stub should not be indexed ${loc}`);
  }
}

for (const configFile of ["_headers", "functions/api/site-chat.js"]) {
  const configPath = path.join(ROOT, configFile);
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, "utf8");
    if (/access-control-allow-origin\s*:\s*\*/i.test(config) || /"access-control-allow-origin"\s*:\s*"\*"/i.test(config)) {
      errors.push(`${configFile}: wildcard Access-Control-Allow-Origin is not allowed`);
    }
  }
}

const headersPath = path.join(ROOT, "_headers");
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, "utf8");
  for (const requiredHeader of [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ]) {
    if (!headers.includes(requiredHeader)) errors.push(`_headers: missing ${requiredHeader}`);
  }
}

const redirectsPath = path.join(ROOT, "_redirects");
if (fs.existsSync(redirectsPath)) {
  const redirects = fs.readFileSync(redirectsPath, "utf8");
  for (const rule of ["/atlas /documents 301", "/atlas.html /documents 301", "/library /documents 301", "/library.html /documents 301"]) {
    if (!redirects.includes(rule)) errors.push(`_redirects: missing ${rule}`);
  }
} else {
  errors.push("_redirects: missing redirect file");
}

for (const jsFile of fs.readdirSync(ROOT, { recursive: true }).filter((name) => /\.(?:js|mjs)$/.test(name))) {
  if (jsFile.includes(".git") || jsFile.includes("node_modules") || jsFile.includes("live-verification")) continue;
  if (jsFile === path.join("scripts", "validate-public-site.mjs")) continue;
  const js = fs.readFileSync(path.join(ROOT, jsFile), "utf8");
  if (/\b(?:innerHTML|outerHTML|insertAdjacentHTML)\b/.test(js)) {
    errors.push(`${jsFile}: unsafe DOM insertion pattern present`);
  }
}

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

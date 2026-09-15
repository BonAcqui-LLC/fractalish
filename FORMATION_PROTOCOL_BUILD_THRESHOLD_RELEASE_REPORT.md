# Formation Protocol Build Threshold Release Report

Date: 2026-09-15  
Release ID: `RR-2026-09-15-CF-BUILD-THRESHOLD`  
Status: `WORKING RESEARCH / BUILD THRESHOLD REACHED`

## Files changed

- Added the structured release record at `content/releases/2026-09-15-formation-protocol-build-threshold.json`.
- Added the stable generated article at `releases/2026-09-15-formation-protocol-build-threshold.html` and generated manifest/checksum files under its release-assets directory.
- Extended `scripts/build-releases.mjs` and `content/releases/_template.json` with backward-compatible ordered narrative blocks; no parallel publication system was created.
- Added responsive equation-band styling in `assets/site.css`.
- Added generated release cards to the homepage, archive, `/consequential-formation`, `/erase-the-nouns`, `/ai`, `/ai/research`, `/research`, and `/documents`.
- Updated sitemap, search inventories, search tests, strict public-site validation, release publishing documentation, page classification, changelog, and Search Worker crawler generation.
- Existing frozen CF artifacts and the earlier Natural Math release were not substantively modified.

## Release route

`https://fractalish.com/releases/2026-09-15-formation-protocol-build-threshold`

The archive route is `https://fractalish.com/releases`.

## Homepage location

The release is the newest card in the existing Research Releases section immediately after the Public AI Laboratory section. It does not replace the homepage hero or persistent navigation.

## Source artifacts actually linked

The primary Round Two artifact is published byte-for-byte:

`TEAM CHALLENGE - Remove the Privileges — Formation Protocol, Closure - Composition, GR, Dimensional State - ROUND TWO - ELIMINATION ROUND.txt`

- Size: 251,689 bytes
- SHA-256: `F69D019749682422CCC18CCC5F7EECF9EB3E56BCE9EF33693887653C69406D3E`
- Role: primary research artifact / team-round backing record

The generated `manifest.json` and `checksums.sha256` bind the public download to that hash.

## Tests and build results

`node scripts/build-site.mjs` passes with two generated releases, 152 checked HTML files, 92 sitemap routes, and 96 indexed public pages. Boolean search and current-pathway ranking tests pass, including Formation Protocol, proposal-operator/reopening, and Wade Marr/recompression queries.

Playwright checks at 1440 x 1000 and 390 x 844 pass across the homepage, archive, article, CF framework, category-suspension, AI, and AI research routes. There is no page or equation overflow, no broken loaded image, and no console error. The article source, manifest, and checksum links all return HTTP 200 locally. The source download is 251,689 bytes and matches its declared SHA-256.

Strict validation requires the exact status, evidence boundary, Wade attribution, unbuilt Formation Kernel language, nonclaims, kill conditions, source hash, and homepage ordering. It rejects `Hunter Marr`, leaked workstation paths, and signed credential URLs in public text artifacts.

## Source artifacts not located or not published

- The first Remove the Privileges round was located, but its raw 267,449-byte text contains embedded signed cloud URLs with `AWSAccessKeyId`, `Signature`, and `x-amz-security-token` parameters. It was not copied into the public repository. A sanitized derivative was not invented or mislabeled as the original.
- Wade Marr's three named papers were located only in a separate `COMPRESSED FOR TODD/Marr Papers Team` directory, not in the website repository or approved release-artifact collection. They are therefore acknowledged in the article but not linked or copied publicly.
- No URL, DOI, date, or publication metadata was fabricated for an omitted artifact.

## Copy mapped to the existing schema

- The requested `phase: BUILD_THRESHOLD` is expressed through the exact status and research-area fields rather than a new phase field.
- The requested evidence status maps to the existing `evidenceClass` field.
- The next test maps to `nextQuestion`; the primary kill condition maps to the existing negative-result office with a release-specific eyebrow.
- The long canonical body is represented as ordered narrative blocks within the existing release content record. Equations are rendered as accessible, wrapping text notation because the site has no MathJax or KaTeX dependency.
- The article eyebrow uses the existing project plus Research Release convention: `Consequential Formation / Research Release / Sep 15, 2026`.
- Mathematical notation was lightly converted to readable plain-text symbols; substantive claims were not strengthened.

## Claim boundaries preserved

The release records a candidate mechanism and approval for a bounded build, not an implementation result. It does not claim AGI, derived intelligence, consciousness, new physics, a theory of everything, new partition-refinement mathematics, formal equivalence with Wade Marr's work, a universal cross-scale law, or that the Formation Kernel will work.

The Formation Kernel build was not started in this tranche.

## Commit and deployment

Pending clean commit, GitHub validation, Cloudflare deployment, and cache-busted live verification at the time this report was first written. Final receipts will be recorded after publication.

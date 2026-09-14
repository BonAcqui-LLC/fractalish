# Natural Math Scale Research Release Report

Date: 2026-09-14  
Release ID: `RR-2026-09-13-NM-SCALE`  
Status: `EXPERIMENTAL_RESULT / EARNED_WITH_TESTED_SCOPE`

## 1. Routes added or changed

Added `/releases` and `/releases/2026-09-13-natural-math-scale`. Added generated release cards to `/`, `/natural-math`, `/ai`, `/ai/research`, `/research`, and `/documents`. The shared Record footer now links to Research Releases across the site.

## 2. Homepage component

The homepage now has a generated Research Releases section immediately after the AI laboratory section. It presents dated, status-bearing releases as public state transfer rather than news or marketing.

## 3. Release content schema

`content/releases/*.json` is the single structured input lane. The schema carries identity, authorship, project, status, evidence class, claims, key result, optional result visualization and table, changed and frozen conditions, failed gates, diagnostics, interpretation, limitations, nonclaims, canonical relation, chronology, related routes, and SHA-256-bound source artifacts.

## 4. First release

Source: `content/releases/2026-09-13-natural-math-scale.json`  
Generated article: `releases/2026-09-13-natural-math-scale.html`  
Public route: `https://fractalish.com/releases/2026-09-13-natural-math-scale`

## 5. Natural Math updates

`/natural-math` now links the dated scale release while preserving Natural Math v5 as the governing frozen integer baseline. The moving/carry mechanism is described as a separate frozen experimental branch and does not supersede v5.

## 6. AI updates

`/ai` and `/ai/research` now link the release. The relationship is explicitly interpretive: capability reliability may be opportunity-limited, but the experiment does not demonstrate intelligence, life, consciousness, or biological reproduction.

## 7. Published source files

The complete original handoff ZIP, unchanged handoff Markdown, all five evidence ZIPs, source README, and original checksum manifest are published byte-for-byte under `release-assets/2026-09-13-natural-math-scale/`. The article provides a human-readable public projection without altering the sources.

## 8. SHA-256 manifests

The original package SHA-256 is `2b7f4c0b0ec2eb3ed8aa6ee25e149bf8e9ac10f44b54832e103833ef417ea1cf`. The build verifies all nine published source files against immutable expected hashes and generates `manifest.json` plus `checksums.sha256`. The outer source manifest passed 7/7 checks; 43 files across the five nested evidence packages passed their nested manifests with zero failures.

## 9. Publication exclusions

No file from the supplied handoff package was excluded. Temporary unpacked copies used for audit were not published because the original evidence ZIPs and complete outer package already preserve those bytes. Credential, private-path, private-information, and third-party redistribution scans found no publication blocker.

## 10. Search and index

`RESEARCH_RELEASE` is a first-class indexed page class with a visible result label and current-release ranking boost. The static index contains 95 public pages. The exact release title and the specific query `transported reuse proportional scale` rank the new release first; broad `Natural Math` retains `/natural-math` first and places the release second. Search Worker crawler version advanced from 13 to 14.

## 11. SEO and OpenGraph

The archive and article have unique titles, descriptions, canonical extensionless URLs, OpenGraph metadata, article publication date and section metadata, shared social imagery, and sitemap entries. The sitemap now contains 91 canonical routes.

## 12. Responsive and accessibility checks

Playwright checks at 1440 x 1000 and 390 x 844 found no horizontal page overflow, broken loaded images, or browser console errors on the release, archive, homepage, or Natural Math page. The article has one H1, a main landmark, skip link, ordered headings, scoped table headers, accessible native progress elements, descriptive labels, keyboard-capable shared navigation, and visible focus behavior inherited from site chrome. All eleven article evidence/manifest links returned HTTP 200 locally.

## 13. Build and tests

`node scripts/build-site.mjs` passed. It generated the archive, article, feeds, manifests, sitemap, and search inventories; applied shared chrome; then passed the 151-page route and narrative validator and the Boolean/ranking search suite. Source hash, failed-gate language, authority boundary, duplicate ID/slug, local-path leak, feed-marker, manifest, and checksum checks are fail-closed.

## 14. Deployment

Pending committed-main deployment and live verification at the time this report was first written. This section will be replaced with GitHub commit, Cloudflare deployment, and cache-busted production receipts.

## 15. Publishing the next release

1. Copy `content/releases/_template.json` to `content/releases/YYYY-MM-DD-short-title.json`.
2. Give it a new immutable ID, slug, and date; fill every evidence and boundary field.
3. Place publication-safe source files in `release-assets/<slug>/` and enter each exact SHA-256 in `sourceArtifacts`.
4. Add only desired card destinations to `relatedRoutes`; set `featured` only for homepage display.
5. Run `node scripts/build-site.mjs`.
6. Review the generated article, archive, cards, manifest, checksums, search results, and desktop/mobile render.
7. Commit the content record, source bytes, generated outputs, and inventories together, then push `main` for Cloudflare deployment.

The maintained operator guide is `docs/RESEARCH_RELEASE_PUBLISHING.md`.

## 16. Site-copy conflicts

No frozen-artifact conflict was found. The handoff calls the corrected carry version the current canonical moving-cycle mechanism; the site calls Natural Math v5 the governing frozen integer baseline. These statements have different scopes. The public release preserves both and states that the moving/carry branch does not replace or rewrite v5. No HOLD was required.

## 17. Claims weakened to fit the evidence

- `44/64` remains below the original preregistered `48/64` carry gate; the original full cycle remains failed.
- The later scale test used its own `>=32/64` S5 gate; passing it does not retroactively pass the earlier gate.
- Reliability improved across tested x1-x3 proportional scales; arbitrary-scale continuation and a universal scaling law are not established.
- Normalized work per agent-tick declined, so the release does not claim uniformly improved efficiency.
- The joint scaling design does not isolate topology, population, horizon, lifetime, input rate, or causal-history count as the cause.
- “Admissible-opportunity multiplicity” remains useful working language, not a newly established Natural Math primitive.
- The AI connection is a bounded mechanism-level interpretation, not evidence of achieved intelligence or a general theory of emergence.

## Acceptance result

PASS locally. The article directly answers what happened, what stayed fixed, what failed, what improved, what did not improve, why the result may matter, what is not claimed, where the original evidence is downloadable, and what should be tested next.

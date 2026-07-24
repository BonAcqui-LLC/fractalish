# Fractalish visual audit before/after review

This document compares visual-legibility audit artifacts for the current review branch. It is scoped to visual/layout evidence and does not modify scientific claim boundaries.

## Baselines

- Repository: BonAcqui-LLC/fractalish
- Review branch: codex/fractalish-infographic-legibility-pass-2026-07-24
- Starting commit / rollback baseline: 15369ce55f2fc73cbfc37feff42f3591327960fa
- Before audit present: yes
- After audit present: yes
- Deployment status: not merged and not deployed.

## Counts

| Phase | Page runs | SVG runs | Errors | Warnings | Screenshots/contact sheets |
| --- | ---: | ---: | ---: | ---: | ---: |
| before | 1480 | 23 | 398 | 411 | 32 |
| after | 1480 | 23 | 0 | 0 | 32 |

## Artifact locations

- Inventory: docs/visual-audit/FIGURE_INVENTORY.md
- Current JSON report: docs/visual-audit/INFOGRAPHIC_AUDIT.json
- Current Markdown report: docs/visual-audit/INFOGRAPHIC_AUDIT.md
- Before JSON snapshot: docs/visual-audit/INFOGRAPHIC_AUDIT.before.json
- After JSON snapshot: docs/visual-audit/INFOGRAPHIC_AUDIT.after.json
- Before screenshots: docs/visual-audit/screenshots/before/
- After screenshots: docs/visual-audit/screenshots/after/
- Contact sheets: docs/visual-audit/contact-sheets/

## Root causes found

- Dense SVGs were being scaled into narrow two-column figure slots, leaving labels technically present but too small on desktop sidebars, mobile, and zoomed layouts.
- Three older Ageometrics SVGs had long labels that exceeded visible bounds or overlapped after browser text measurement.
- The homepage research schematic included several sub-12px labels.
- Legacy grids, metadata cards, download strips, and tables had fixed minimum widths that created horizontal page overflow at high zoom and narrow effective widths.

## Treatments applied

- Added contained horizontal scrolling and a minimum rendered width for SVG infographic frames so diagrams remain legible without creating document-level overflow.
- Added broad `min-width: 0` and `overflow-wrap: anywhere` safeguards for cards, badges, metadata, bindings, and grid children.
- Made tables fixed-layout and word-break-safe for narrow/zoomed review.
- Changed older `minmax(180px/220px, 1fr)` patterns to `minmax(min(..., 100%), 1fr)` where they caused overflow.
- Split long Ageometrics labels into multiple lines and raised the homepage schematic's sub-12px labels to 12px.

## Validation commands

- `node tools/audit-infographics.mjs --phase=before` → 398 errors, 411 warnings.
- `node tools/audit-infographics.mjs --phase=after` → 0 errors, 0 warnings.
- `node scripts/validate-public-site.mjs` → PASS, with one unrelated existing warning for `404.html` canonical metadata.
- PowerShell SVG XML parse over `assets/figures/*.svg` → parsed 23 SVG files.
- Privacy/local-path scan over changed audit, CSS, SVG, and script paths → no hits.

## Limitations

- Chromium completed the browser matrix. Firefox and WebKit were requested but skipped because their local Playwright browser executables were not installed in this environment.
- Zoom was approximated by dividing viewport dimensions by the zoom factor to test reflow at 125%, 150%, and 200%.
- Screenshot coverage is representative to avoid committing hundreds of binary files; the full layout matrix is recorded in JSON.
- No scientific claim text, status label meaning, attribution, or evidence boundary was intentionally changed.

## Recommendation

READY for review from the visual-legibility and infographic-quality perspective. Hold merge/deployment until human review, as requested.

## Recommendation rubric

- READY: no severe page overflow, no clipping, no rendered mojibake, no text outside SVG viewBox, and remaining warnings are documented as non-blocking.
- HOLD: any severe audit finding remains on current-release public surfaces.
- REDESIGN: warnings indicate the same figure cannot be made legible through spacing/container treatment alone.

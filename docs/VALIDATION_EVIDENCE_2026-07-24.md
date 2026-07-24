# Validation Evidence - 2026-07-24

Status: coordinated public-release evidence for Fractalish. Deployment is authorized only after all cross-site hard release gates pass. No X post or frozen-source-repository alteration was performed by this repair pass.

Branch: `codex/persistent-observer-public-release-2026-07-24`

## Commands and results

| Gate | Result | Evidence |
| --- | --- | --- |
| Local route / anchor / sitemap validator | PASS with one warning | `node scripts/validate-public-site.mjs` checked 96 HTML files and 58 sitemap routes. Warning retained: `404.html` expected one canonical link. |
| Overclaim scan | PASS after review | Matches are disclaimer, retraction, or negative-boundary uses such as "not production integration" and "not collision-free". |
| Current-tree privacy scan | PASS | Public text-source scan covered 205 current-tree HTML, MD, JSON, CSV, SVG, JS, CSS, XML, TXT, CFF, YML, PY, MJS, and control files. Category A=0, B=0 after review, C=0 sensitive after review, D=0, E=0, F=0, G=0 sensitive after review, H=0. Binary assets were excluded from text regex counting and retained as existing public assets. |
| Changed-file privacy scan | PASS | Scanned changed/new public files. Tight detector found zero local path strings and zero long token-shaped secrets after ledger sanitization. |
| Git-history privacy scan | PASS / proceed | Reachable history scan covered 46 commits. Category A found only generic detector strings in an older public-release guard script. Category B hits were the ordinary phrase "desktop-style," not a username or machine ID. Category C/D hits were protective policy language about records that should be excluded from this repository. Category G hits were the public BonAcqui support contact. Categories E, F, and H were 0. Disposition: no D-H sensitive finding; do not rewrite established history solely for generic detector strings. |
| Public repository reachability | PARTIAL | `https://github.com/BonAcqui-LLC/fractalish.git` reachable at HEAD `8fc890cde31d3ea5e64e18b9bbdc6dc1babf11e9`; README and LICENSE raw URLs return 200. `https://github.com/BonAcqui-LLC/cognitive-basin-platform.git` reachable at HEAD `662911b9e62b80166ca7420956e073442f35fc3e`; README raw URL returns 200; `main/LICENSE` raw URL returns 404. |
| Current deployment check | REVIEWED | Live `https://fractalish.com/` and `https://fractalish.com/persistent-observer` were inspected as deployment baseline. The current live sitemap listed 58 URLs. |
| DUEL disposition | PASS / cross-project corrected | DUEL DISPOSITION: ERRONEOUS CROSS-PROJECT INSTRUCTION; CORRECT PROJECT: ERACII; NOT A MISSING FRACTALISH PAGE; NO FRACTALISH RESTORATION REQUIRED. Fractalish search for a missing DUEL artifact is closed. |
| Responsive DOM check | PASS | At 1024px, compact nav state: `navLinksDisplay="none"`, `navToggleDisplay="flex"`, `overflowX=false`, stylesheet `site.css?v=observer-20260724`. At 390px, compact nav state: `navToggleDisplay="flex"`, `overflowX=false`. |
| Screenshot capture | PARTIAL / browser-backend caveat | Viewport screenshots were captured to `docs/validation/screenshots/2026-07-24/`. The in-app browser screenshot backend showed unreliable right-edge capture for the compact menu; DOM assertions above are the authoritative responsive evidence. |
| Local server cleanup | PASS | Temporary `127.0.0.1:4174` static server was stopped after screenshot capture. |

## Screenshot artifacts

- `docs/validation/screenshots/2026-07-24/persistent-observer-desktop.png` - 1024 x 768 viewport
- `docs/validation/screenshots/2026-07-24/persistent-observer-mobile.png` - 390 x 844 viewport
- `docs/validation/screenshots/2026-07-24/mathematical-bindings-desktop.png` - 1024 x 768 viewport
- `docs/validation/screenshots/2026-07-24/status-mobile.png` - 390 x 844 viewport

## Fractalish release recommendation

Fractalish is ready for coordinated cross-site release review after the current validation commands are rerun from the final commit. This does not authorize posting to X or another social platform.

Before deployment, rerun:

```powershell
node scripts/apply-persistent-observer-public-release-2026-07-24.mjs
node scripts/validate-public-site.mjs
```

Then repeat the current-tree privacy scan and inspect final `git status --short`. Deploy only if the Eracii release gates also pass or if the affected cross-site link is explicitly held out of the public release.

# Constitutional infographic pass — 2026-08-09

Scope: immediate post-deploy alignment pass after the Fractalish constitutional makeover.

This is not a full replacement for the earlier multi-width infographic audit. It records the first conservative SVG/content pass needed to keep the public site aligned with the new constitutional frame while avoiding launch delay.

## Changes made

- `assets/figures/exploration-becomes-form.svg`
  - Reframed the homepage/start-here schematic around accumulated form, active constraints, representation, residue, and bounded claim.
  - Replaced the cramped `affordable?` resource label with a two-line, contained self-maintenance/reachability question.
  - Adjusted the lower receipt row spacing so the text no longer crowds or overlaps.

- `assets/figures/og-fractalish.svg`
  - Replaced the old social-card tagline with `Form is accumulated consequence.`
  - Added a second line: `Geometry is one way of measuring the receipt.`
  - Added accessible `<title>` and `<desc>` metadata.
  - Removed the previous mojibake artifact in the social-card separator.

- `assets/figures/fractalish-governed-stack-infographic.svg`
  - Retitled the figure as a constitutional evidence stack.
  - Reframed the first layer as accumulated form / consequence made visible.
  - Reframed Ageometrics as representation-limit measurement rather than geometry-first preservation.
  - Reframed Specificity as receipt governance.
  - Added an explicit note that geometry is one instrument inside the public claim boundary.
  - Split the public-claim boundary into two shorter lines to reduce mobile scaling risk.

- `assets/figures/persistent-observer-stack.svg`
  - Preserved the required `Target integration architecture` and proposed-integration status language.
  - Split the bottom qualification line into two shorter lines so the host-authority caveat remains readable in constrained containers.

## Checks run

- Static search for mojibake and legacy infographic phrases across `assets/figures` and `docs/visual-audit`.
- Static long-line sweep across `assets/figures/*.svg` for fixed SVG text likely to crowd or overflow.
- Manual review of the eight current-release SVG text layers:
  - `evidence-status-layers.svg`
  - `finite-to-persistent-observer.svg`
  - `host-authority-boundary.svg`
  - `metric-versus-observer.svg`
  - `natural-math-version-authority.svg`
  - `persistent-observer-experiment.svg`
  - `persistent-observer-stack.svg`
  - `weight-receipt-anatomy.svg`
- Local public-site validator:
  - 103 HTML files checked.
  - 60 sitemap routes checked.
  - PASS.
  - Existing warning retained: `404.html: expected one canonical link`.

## Deliberately not changed in this immediate pass

- The persistent-observer figures already preserve the required status distinction between target architecture, proposed integration, candidate signal, and host-retained execution authority.
- The homepage figure line `Not proof of a unique history.` remains because it is reviewer-safe bounded-claim language.
- The homepage figure line `Named conditions, not decorative rules.` remains because it supports the new constitutional distinction between evidence-bearing constraints and visual ornament.

## Follow-up recommended

- Full browser-rendered contact sheets for all 26 SVG assets once a renderer or Playwright dependency is available.
- Deeper redesign of archive/supporting Ageometrics figures only where layout crowding or old framing is visible in rendered review.
- Commit/PR split that separates constitutional copy, propagated navigation, production deployment provenance, and infographic-only changes.

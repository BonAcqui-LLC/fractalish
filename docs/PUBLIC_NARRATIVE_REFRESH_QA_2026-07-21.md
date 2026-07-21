# Fractalish public narrative refresh: implementation and QA

Date: 2026-07-21

Status: production publication authorized; source validation complete

## Before and after

Before, the homepage opened with a dense research-stack description, status language, and several technical labels. The primary navigation placed nearly every framework surface at the same level. Strong boundary language existed, but the public story required prior familiarity.

After, the first desktop screen contains the central sentence, one original explanatory diagram, one research question, three visitor actions, and a quiet claim boundary. The page then moves through observation, blind exploration, process layers, the naming boundary, engine/brake, shaped persistence, scientific context, current tests, and an invitation to contribute. Deeper technical terms arrive only after the idea is established.

The supplied `LEAF GENERATOR WEBSITE.pdf` provided direct evidence for one additional correction: the current public homepage makes `Natural Math Leaf Generator + inverse test` the first large, concrete project name. The local refresh now makes that framing impossible on the homepage. The generator is described as one controlled test fixture, while the first visual is an evidence-and-constraint schematic rather than generated botanical output.

## Implemented routes and assets

- Rewritten: `/`, `/start-here.html`, `/framework.html`, `/natural-math.html`, `/cognitive-basin.html`, `/contribute.html`, `/support.html`, and `/review.html`.
- Added: `/scientific-neighbors.html`.
- Bridged without replacing technical content: `/specificity-thesis.html` and `/ageometrics/`.
- Updated site-wide: grouped header navigation, expanded footer, main-content landmark targets, canonical completion, no-JavaScript navigation fallback, focus styles, and reduced-motion behavior.
- Added original SVG assets:
  - `assets/figures/exploration-becomes-form.svg`
  - `assets/figures/representation-loss-and-residue.svg`
  - `assets/figures/cognitive-basin-landscape.svg`
- Updated discovery metadata: `sitemap.xml` and `site.webmanifest`.
- Added reproducible scripts:
  - `scripts/apply-public-narrative-refresh-2026-07-21.mjs`
  - `scripts/validate-public-site.mjs`

## Automated checks

Command:

```text
node scripts/validate-public-site.mjs
```

Result:

```text
Checked 90 HTML files and 52 sitemap routes.
Warnings (1): 404.html has no canonical link.
PASS: local routes, anchors, IDs, core metadata, sitemap, and narrative boundary checks.
```

`git diff --check` also completed without whitespace errors. The validator checks local `href` and `src` targets, same-page anchors, duplicate IDs, heading-one count, main-content landmark targets, canonical presence, required metadata, sitemap uniqueness, required claim-boundary phrases, and that `Natural Math Leaf Generator` identity language appears only in the preserved archival correction record.

## Browser checks

The site was served locally and inspected in the in-app browser.

- Desktop viewport: 1440 × 1000. No horizontal overflow. The hero claim boundary remains inside the first viewport. Both hero SVGs loaded.
- Mobile viewport: 390 × 844. No horizontal overflow. The menu moved from `aria-expanded="false"` / hidden to `true` / visible and returned to the closed state.
- Exact-route pass: 11 primary and technical routes, each with one `h1`, a main-content target, no horizontal overflow, and no missing visible images.
- Browser console: zero warning or error entries in the final 11-route identity and layout pass.
- Supporting SVGs were inspected in the browser for labels, contrast, and clipping.
- The revised hero was specifically checked for a non-botanical first impression: no leaf silhouette, generated specimen, species label, or decorative branching output appears above the fold.

Screenshots:

- [Desktop homepage](screenshots/public-narrative-refresh/home-desktop.png)
- [Mobile homepage](screenshots/public-narrative-refresh/home-mobile.png)

## Accessibility notes

- Stable `main-content` landmarks remain available on modern and legacy page structures.
- One `h1` on every non-redirect page checked by the validator.
- Descriptive alternative text and captions for the three new explanatory visuals.
- Visible `:focus-visible` treatment for links and buttons.
- Semantic navigation group labels and explicit navigation landmarks.
- Responsive layouts avoid horizontal scrolling at tested breakpoints.
- With JavaScript disabled, the mobile links remain visible and the inert menu button remains hidden.
- `prefers-reduced-motion: reduce` disables smooth scrolling and collapses animation/transition duration.

This is an implementation review, not a formal WCAG conformance audit. Color contrast was visually reviewed but not certified with an external measurement suite.

## Claims and citations for human verification before publication

- Confirm that “independent research program” and “small independent team” remain the preferred public identity language.
- Confirm that the Cognitive Basin platform repository is the intended public build destination.
- Review the “Scientific Neighbors and Prior Art” framing and bibliography for omitted closer precedents.
- Primary-source links currently include Thompson, Raup, Thom, Kirschner and Gerhart, Kondev et al., Levin, Pfeifer and Iida, Wolfram, Tero et al., Lucas et al., Beven and Freer, Hopfield, and Schölkopf et al.
- Kondev et al. is linked through the published Biophysical Journal DOI. Lucas et al. remains explicitly labeled as a 2026 preprint.
- Confirm book-edition and publication-year display for Thompson and Thom even though the links point to authoritative catalog or scan records.
- Keep “different emphasis” as a proposal description rather than a novelty or priority claim.

## Recommended next page

Refresh `/documents.html` next. It is now the main bridge from the public story to technical artifacts, so it should make status, version, provenance, supersession, runnable surface, and claim boundary scannable before a reader downloads anything.

## Publication boundary

The site owner explicitly authorized production publication on 2026-07-21. This report records the completed source and pre-deployment checks. Production status must still be confirmed from the Cloudflare Pages deployment record and a cache-busting public fetch rather than inferred from the local files.

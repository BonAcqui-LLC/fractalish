# Fractalish public narrative refresh: source audit

Date: 2026-07-21

Working branch: `codex/public-narrative-refresh-2026-07-21`

Canonical local repository: `fractalish_public_site_v1.2`
Remote: `BonAcqui-LLC/fractalish`

## Source and route findings

- The launch directory is not the editable Git repository. The canonical source is the `fractalish_public_site_v1.2` subdirectory.
- Public content is a static HTML site with shared presentation in `assets/site.css`, shared behavior in `assets/site.js`, and shared chrome sourced from `_partials/site-header.html` and `_partials/site-footer.html`.
- `scripts/apply-ux-sprint1.mjs` injects the shared header and footer across every HTML route. The script is intentionally idempotent and now also supplies main-content landmark targets, progressive-enhancement hooks, and missing canonical metadata for non-redirect content pages.
- Most top-level `name.html` pages are canonical; matching `name/index.html` pages are redirects. Ageometrics is the exception: `/ageometrics/` is canonical and `/ageometrics.html` is a redirect alias.
- The Specificity canonical was inconsistent (`/specificity-thesis`); this refresh normalizes it to `/specificity-thesis.html` in page metadata and the sitemap.
- The sitemap previously listed both the Ageometrics canonical and its redirect alias. The redirect alias was removed.
- Archive, evidence, correction, and provenance routes were preserved. No archival content or negative evidence was removed.

## Shared interface findings

- The previous nine-link primary navigation made framework layers compete with visitor tasks. The new navigation is grouped by intent: Understand, Test, Build, and Help.
- Direct technical routes remain reachable from content cards and the expanded footer.
- Older content pages did not all contain a `<main>` element. The shared injector now provides a stable `#main-content` skip destination without rewriting legacy document structure.
- At the first mobile QA pass, the new grouped navigation overrode the older collapsed-menu rule. The final CSS restores closed/open behavior and adds a no-JavaScript fallback: navigation is visible without JavaScript, while the inert menu button is hidden.

## Leaf Generator identity correction

- The supplied `LEAF GENERATOR WEBSITE.pdf` is a four-page print capture of the current public homepage dated 2026-07-21. It shows `Natural Math Leaf Generator + inverse test` as the first large, concrete program name after the abstract introduction.
- That hierarchy makes a controlled fixture easier to remember than the research question. A reader can reasonably reduce the whole site to “the leaf-generator site.”
- The local refresh removes Leaf Generator wording from the homepage, current-work labels, and archival navigation banners. The exact historical wording remains only inside the preserved correction note and its source document.
- The hero visual was replaced with a research schematic that separates recorded history, active constraints, present evidence, typed residue, and a bounded claim. It is deliberately non-botanical.
- The homepage now states the boundary directly: the generator is an instrument, not the thesis.

## Build and deployment findings

- No tracked deployment configuration was found in this repository. A local untracked `.wrangler/` directory existed before this work and was left untouched.
- The refresh is source-only. It has not been committed, pushed, deployed, or cache-purged.
- The live public site was therefore not used as evidence that these local changes are published.

## Scope decision

The refresh changes the public narrative and shared chrome while leaving deep technical documents, archive material, correction history, and evidence files intact. Natural Math, Specificity, Ageometrics, and Cognitive Basin receive explicit bridges and claim boundaries rather than silent theory rewrites.

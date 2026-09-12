# CF Site Rearchitecture Report

Date: 2026-09-12

## Summary

This pass rebuilt the public front door of fractalish.com around Consequential Formation while preserving existing research routes and evidence/status machinery.

## Pages Changed

- `index.html`: rebuilt homepage around the plain-language CF definition, intuitive examples, noun-blind method, evidence labels, and research posture.
- `start-here.html`: rebuilt newcomer path with one-minute CF, five-minute CF, Try the Lens prompts, limits, strongest insights, and research descent.
- `framework.html`: preserved the older formal research-cycle route and added a migration notice pointing to the new CF overview.
- `project-map.html`: rebuilt project map around the CF questions each branch investigates rather than a flat acronym list.
- `natural-math.html`: added a migration notice preserving Natural Math as a project authority route under CF.
- `cognitive-basin.html`: added a migration notice framing Cognitive Basin as applied CF architecture.
- Shared header and footer: simplified primary navigation around Start Here, CF, Try the Lens, CF Map, Research, Experiments, Projects, Documents, Code, About, Contribute, and Search.
- `assets/site.css`: added CF layout, path animation, grammar rails, map grids, worksheet controls, and migration notice styling.
- `assets/site.js`: added the Try the Lens helper text interaction.
- `sitemap.xml`: added new CF routes.
- `scripts/apply-ux-sprint1.mjs`: updated nav matching and shared chrome injection for the new public architecture.
- `scripts/validate-public-site.mjs`: updated local integrity expectations for the new CF front door.

## New Routes

- `/consequential-formation`
- `/try-the-lens`
- `/cf-map`
- `/experiments`

## Redirects

No new redirects were added. Existing extensionless Cloudflare/static behavior is preserved; local validation resolves extensionless links to `.html` files.

## Reused Components

- Existing shared header/footer injection.
- Existing status badge classes and evidence boundary vocabulary.
- Existing card, section, callout, page shell, and responsive grid patterns.
- Existing local validator.

## Preserved Historical Material

Existing project and research routes were not removed. Older pages now remain as project/history/evidence routes under the newer Consequential Formation public architecture.

## Retired Or Reframed Copy

The homepage no longer begins with downstream project names or the older "generative grammar upstream of observable form" framing. That material remains available through the formal framework and project routes.

## Canonical Source Search

The requested file name `Consequential_Formation_Unified_Framework_v0_2_2026-09-11.md` was searched for in the local Fractalish workspace and was not found during this pass. The implementation therefore follows the supplied public brief as the current canonical candidate while preserving older content.

## Build And Test Results

- `node scripts/apply-ux-sprint1.mjs`: passed and applied shared chrome.
- `node scripts/validate-public-site.mjs`: passed for 118 HTML files and 69 sitemap routes.
- `python scripts/build-search-index.py`: rebuilt local search index and route inventories.
- `services/search-worker/worker.mjs`: bumped `CRAWLER_VERSION` to force production KV search refresh after deployment.
- Browser checks: verified new front-door routes at 390x844 and 1440x900 with no horizontal overflow; verified Try the Lens input behavior.

## Unresolved Issues

- The exact unified CF master document was not located by filename or keyword search in the inspected local workspace.
- Live deployment and cache-busted production verification remain pending until deployment is run.

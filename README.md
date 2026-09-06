# Fractalish Public Site

This repository contains the public static site for Fractalish. The current constitutional baseline centers the site on accumulated form, geometry as receipt, generative grammar, representation residue, intervention, desiloization, and explicit claim boundaries.

## Review Branch Focus

- Constitutional center: Form is accumulated consequence. Geometry is one way of measuring the receipt. Fractalish seeks the generative grammar upstream of accumulated form.
- Constitution: `CONSTITUTION.md`, public route `https://fractalish.com/constitution.html`.
- Governance: `GOVERNANCE.md` and `rfcs/` preserve versioned constitutional changes without rewriting historical artifacts.
- Primary public route: https://fractalish.com/persistent-observer
- Natural Math authority: v5 is the governing frozen integer baseline.
- UFWK: specification only unless a named implementation qualifies it.
- Bolt-On: v0.3 frozen evidence; v0.4 Stage 1 locally validated external-host contract; no production integration claim.
- Resonant Morphology M1: historical development artifact and bounded software fixture, not flagship proof.
- Authority Compiler: public verified finite reference fragment; reusable evidence/decision primitive, not a Cognitive Basin-specific component and not a new physics or truth-machine claim.

## Status Layers

- VERIFIED / FROZEN
- BUILT AND LOCALLY VALIDATED
- CODE-PRESENT
- SPECIFICATION
- PROPOSED INTEGRATION
- EXTERNAL REPORTED RESULT
- NEGATIVE RESULT / LIMITATION
- HISTORICAL / ARCHIVED

## Public Evidence Files

- `assets/docs/public-claim-evidence-map-v1.1-sanitized.json`
- `assets/docs/public-source-manifest-sanitized-v1.1.csv`
- `assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json`
- `docs/PAGE_TO_PUBLIC_CLAIM_MAP.md`
- `docs/NAMESPACE_CROSSWALK.md`
- `docs/PUBLIC_REPOSITORY_INDEX.md`

## Future Research Lanes

- **UMRM — Unknown-Mechanism Root Mining:** proposed adversarial program for reducing explicitly unresolved scientific mechanism edges to the smallest testable transition rules, with strict claim boundaries and falsification-first design. See `docs/future-research/UNKNOWN_MECHANISM_ROOT_MINING_UMRM.md`.

## Current Non-Claims

No current release demonstrates a universal grammar of nature, a universal geometry, proof that everything is fractal, GO / STOP / HOLD as universal primitives, causation from morphology alone, or the complete Natural Math-UFWK-Cognitive Basin-Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service. No page should imply completed production integration, physical CNT memory, morphology uniqueness, universal coding, or machine-generated human-value scoring.

The Authority Compiler release is bounded to its public finite reference fragment. Its existence does not claim completed R2R, Cognitive Basin, APTD, ValuFai, or other governed-system integrations.

## Local Validation

The site search at `/search` implements strict Boolean keyword retrieval. Its production index is served by `services/search-worker/worker.mjs`, which crawls the live domain daily at 09:17 UTC using Cloudflare Cron and KV. This includes live Worker-injected content, article headers, and the site's linked subtitle/bindings data. `/assets/search-status.json` reports the last crawl and every route's disposition. Aliases are consolidated; utility/noindex pages and binary downloads are excluded. Failed crawls preserve the previous complete index.

After editing or adding pages, run `python scripts/build-search-index.py` to refresh the fallback index and both HTML inventories. CI rejects stale inventories, including new orphan pages missing from the sitemap. The crawler reads the deployed inventory, sitemap, and internal links; its bundled inventory supports the pre-manifest deployment. Deploy crawler changes with `npx wrangler deploy --config services/search-worker/wrangler.toml`. Do not overwrite live route overlays with stale source: Scientific Neighbors has a separate `fractalish-marr-attribution` Worker. Ranking cannot override Boolean constraints; queries are evaluated in the browser.

Use the repository validator before review:

```powershell
node scripts/validate-public-site.mjs
```

This branch may be deployed only after all current coordinated-release gates pass. Do not post to X or any social platform from automation.

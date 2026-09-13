# Fractalish Public Site

**Fractalish studies how what happens leaves a difference, and how that difference changes what can happen next.**

This repository contains the public static site and evidence record for Fractalish. Consequential Formation is the current framework. Suspending explanatory privilege from inherited categories is its constitutive investigative operation, introduced publicly as Erase the Categories. Named projects are experiments, implementations, evidence, and historical formation.

## Current Canonical-Candidate Orientation

- Full current candidate: [`Consequential_Formation_Unified_Framework_v0_4_RC1_2026-09-13.md`](Consequential_Formation_Unified_Framework_v0_4_RC1_2026-09-13.md)
- Prior orientation candidate: [`Consequential_Formation_Unified_Framework_v0_3_2026-09-13.md`](Consequential_Formation_Unified_Framework_v0_3_2026-09-13.md)
- Compact v0.3 state-transfer packet: [`CF_v0_3_Team_State_Transfer_2026-09-13.md`](CF_v0_3_Team_State_Transfer_2026-09-13.md)
- Status: CF v0.4 RC1 is a canonical candidate for orientation and external review. It is not frozen, a validated universal theory, or a declaration of discovery.
- Authority boundary: frozen project artifacts and receipts remain controlling for their own project claims; native-domain mathematics remains native.
- HOLD: the supplied v0.3 artifact retains two internal `v0.2` machine-readable version fields. The artifact is preserved verbatim rather than silently corrected.

The current operation is `SUSPEND -> OBSERVE -> DISTINGUISH -> TRACE CHANGE -> TRACE RETENTION -> MAP CONSTRAINT -> MAP REACHABILITY -> AUDIT INDEPENDENCE -> RECONSTRUCT -> TYPE THE RETURN -> RENAME ONLY IF EARNED`.

## AI Public Laboratory

The top-level [`/ai`](https://fractalish.com/ai) section separates available host capability from acquired formation and publishes the machine-intelligence work as a status-bearing research record, not as a claim of achieved intelligence.

- Research inventory: [`docs/AI_RESEARCH_INVENTORY.md`](docs/AI_RESEARCH_INVENTORY.md) and [`docs/AI_RESEARCH_INVENTORY.json`](docs/AI_RESEARCH_INVENTORY.json)
- Project and evidence relations: [`docs/AI_RELATION_MAP.md`](docs/AI_RELATION_MAP.md)
- HOLD, exclusion, and publication decisions: [`docs/AI_PUBLICATION_REVIEW_QUEUE.md`](docs/AI_PUBLICATION_REVIEW_QUEUE.md)
- Public routes: `/ai/research`, `/ai/team`, `/ai/method`, `/ai/experiments`, `/ai/artifacts`, `/ai/failures`, and `/ai/build-log`
- Claim boundary: inclusion identifies relevant local evidence or lineage; it does not promote a specification, draft, source paper, blocked experiment, or private record to a demonstrated result.

## Review Branch Focus

- Current framework: Consequential Formation suspends inherited categories, reconstructs how retained consequences alter present constraints and future possibilities, audits whether returned concepts can stand independently, and types what returns.
- Recursive method: a noun that was never removed cannot be said to have survived; after reconstruction, CF removes its own new noun and tests it again.
- Historical constitutional language: Form is accumulated consequence; geometry as receipt; representation residue; intervention; desiloization.
- Constitution: `CONSTITUTION.md`, public route `https://fractalish.com/constitution.html`.
- Governance: `GOVERNANCE.md` and `rfcs/` preserve versioned constitutional changes without rewriting historical artifacts.
- Primary public route: https://fractalish.com/start-here
- Reviewer and technical record: https://fractalish.com/evidence
- Natural Math authority: v5 is the governing frozen integer baseline.
- Cognitive Basin / FormationCore: bounded software evidence and active architecture; they do not by themselves establish MFM.
- Minimum Formative Machine v0.1: SPECIFICATION / immediate BUILD-TEST TARGET. It tests whether experience becomes executable formation that changes later reasoning under matched controls; it is not an achieved intelligence.
- Formation Ledger and Formative Field: the graph/hypergraph is the candidate audit and transfer representation; indexed executable susceptibilities and sparse recruitment are the candidate runtime. Neither has earned general superiority.
- Host separation: distinguish host capability, host policy/habits, and acquired formation. Bare-host policy profiling is required before attributing behavior to formation.
- Distributed embodiment: DEDICATED CANDIDATE PROGRAM. Embodiment is a time-varying reachability index over capability, energy, authority, local formation, and connectivity; this is not an identity claim.
- Energy ecology: ACTIVE CANDIDATE BRANCH. Compare generation, storage, conversion, regeneration, and exchange under actual load profiles; no universal generator ranking is claimed.
- CNTM: candidate optional physical-substrate program. It is not required for MFM; biology supplies routines, not a mandatory implementation script.
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

No current release demonstrates a universal grammar of nature, a universal geometry, proof that everything is fractal, GO / STOP / HOLD as universal primitives, causation from morphology alone, or the complete Natural Math-UFWK-Cognitive Basin-Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service. No page should imply completed production integration, physical CNT memory, morphology uniqueness, universal coding, machine-generated human-value scoring, identity among time/energy/matter/gravity, solved consciousness or physics, achieved MFM intelligence, a required biological/molecular substrate, a proven-superior Formative Field, one identity across distributed bodies, a universal energy-source ranking, or a fixed developmental timeline.

The Authority Compiler release is bounded to its public finite reference fragment. Its existence does not claim completed R2R, Cognitive Basin, APTD, ValuFai, or other governed-system integrations.

## Local Validation

The site search at `/search` implements strict Boolean keyword retrieval. Its production index is served by `services/search-worker/worker.mjs`, which crawls the live domain daily at 09:17 UTC using Cloudflare Cron and KV. This includes live Worker-injected content, article headers, and the site's linked subtitle/bindings data. `/assets/search-status.json` reports the last crawl and every route's disposition. Aliases are consolidated; utility/noindex pages and binary downloads are excluded. Failed crawls preserve the previous complete index.

After editing or adding pages, run `python scripts/build-search-index.py` to refresh the fallback index and both HTML inventories. CI rejects stale inventories, including new orphan pages missing from the sitemap. The crawler reads the deployed inventory, sitemap, and internal links; its bundled inventory supports the pre-manifest deployment. Deploy crawler changes with `npx wrangler deploy --config services/search-worker/wrangler.toml`. Do not overwrite live route overlays with stale source: Scientific Neighbors has a separate `fractalish-marr-attribution` Worker. Ranking cannot override Boolean constraints; queries are evaluated in the browser.

Use the repository validator before review:

```powershell
node scripts/validate-public-site.mjs
```

This branch may be deployed only after all current coordinated-release gates pass. Do not post to X or any social platform from automation.

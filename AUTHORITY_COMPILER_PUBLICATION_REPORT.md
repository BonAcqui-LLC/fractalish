# Authority Compiler Publication Report

Date: 2026-09-02

## Verdict

PUBLIC_FROZEN_VERIFIED_REFERENCE_FRAGMENT

The public repository is frozen by tag and release, and the public clean-clone verification passed. The verdict is scoped to the finite implemented reference fragment only.

## Authority Compiler Repository

- Public repository: https://github.com/BonAcqui-LLC/authority-compiler
- Initial public commit: 4bed79509e73e5224f36dd21434e766790abd1a6
- Final public commit: 4bed79509e73e5224f36dd21434e766790abd1a6
- Tag: AUTHORITY_COMPILER_POST_REDTEAM_v0_1
- Release: https://github.com/BonAcqui-LLC/authority-compiler/releases/tag/AUTHORITY_COMPILER_POST_REDTEAM_v0_1
- Repository description: Query-indexed, evidence-bound, fail-closed authority compiler with proof-carrying judgments and deterministic reference fixtures.

## Local and Public Source Hashes

- Frozen local implementation source input receipt: 581f8f9882e3367e75242b6feb00e1dbc49f1c3ee2280f1ad8bb4a10dd10a466
- Public artifact receipt hash: 9a277a6153302e2773ce274912c55b8ab53a46a6615e81b59a625415ed4248a7
- Public fixture hash: 31c3be5193e842548d83e8791948669991ed1f37ac2d1f964a892e7dcafa454f
- Public runtime receipt hash: 8c1c03d3fd385cf8145e5cb4bc87a51371f4c9bccaa1f43153e4a839e91f970a
- Public test receipt hash: e5b628bcab75a6213357b43a110429190acfc0f7f82f431ca208d0a3553c819d

Public-safe adaptations were made outside the frozen local original: one absolute path was removed from the implementation report copy, and the Specialist 09 collision fixture was vendored under `verifier/` so the public clean clone does not depend on a private parent research directory. Core implementation source under `src/authority_compiler/` was preserved.

## Public Clean-Clone Verification

Fresh clone: public repository cloned into a temporary directory separate from the source working copy.

Commands:

```powershell
$env:PYTHONPATH='src'
python -B -m unittest discover -s tests -v
python -B verifier\specialist09_collision_fixtures.py
python -B scripts\regenerate.py
python -B scripts\regenerate.py
```

Results:

- 107 tests passed
- 0 failed
- 0 skipped
- 30 named fixtures
- unchanged Specialist 09 collision regressions passing
- 15/15 hard gates retained from `receipts/FREEZE_MANIFEST.json`
- deterministic regeneration retained fixture SHA-256 `31c3be5193e842548d83e8791948669991ed1f37ac2d1f964a892e7dcafa454f`
- public clean-clone unsafe path/secret scan: no hits
- GitHub Actions CI: main push success; tag push success

## Fractalish Site Reconciliation

- Site route: https://fractalish.com/research/authority-compiler/
- Site reconciliation content commit: 06fa6362c580c490f57794e6b8f37980a1995990
- Final pushed site HEAD is recorded in the final handoff; a commit cannot contain its own final SHA without changing that SHA.
- Files changed:
  - `research/authority-compiler/index.html`
  - `research.html`
  - `sitemap.xml`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/PUBLIC_REPOSITORY_INDEX.md`
  - `docs/PAGE_TO_PUBLIC_CLAIM_MAP.md`
  - `docs/NAMESPACE_CROSSWALK.md`
  - `docs/PUBLIC_CLAIM_EVIDENCE_MAP.json`
  - `assets/docs/public-claim-evidence-map-v1.1-sanitized.json`
  - `assets/docs/public-source-manifest-sanitized-v1.1.csv`
  - `assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json`
  - `docs/visual-audit/INFOGRAPHIC_AUDIT.md`
  - `docs/visual-audit/INFOGRAPHIC_AUDIT.json`
  - `AUTHORITY_COMPILER_PUBLICATION_REPORT.md`

Added claim IDs: CLAIM-0112 through CLAIM-0118.

Added public source IDs: SRC-PUB-0061 through SRC-PUB-0066.

Added mathematical binding ID: FMB-0112.

No separate `EVIDENCE:*` records were added because the current machine-readable schema is claim-centric and source-manifest-centric. Public evidence is bound through the repository commit, tag, release, fixture receipt, artifact receipt, test receipt, and source manifest entries.

## Fractalish Validation

Command:

```powershell
node scripts/validate-public-site.mjs
```

Result: PASS. The validator checked 109 HTML files and 63 sitemap routes.

Additional checks:

- internal route and sitemap inclusion passed
- public repository, release, tag, and CI status confirmed through GitHub CLI
- no missing claim IDs in the page-to-claim map
- no unsafe local path or secret scan hits after sanitizing prior visual-audit path strings
- wording keeps model outputs as research instruments/adversaries, not institutional endorsements
- no claim that AI proved a theory, Marr was proved correct, Marr was disproved, or any AI lab endorsed the work

## Remaining HOLDs

- general joint-instrument solver
- arbitrary KS/contextuality solving
- broad certificate completeness
- production persistence
- structured minimum-access complexity
- grouping-witness minimality
- policy/consequence fixed point
- completed R2R, Cognitive Basin, APTD, ValuFai, or other downstream integration

## Public Status

PUBLIC / VERIFIED REFERENCE FRAGMENT, scoped only to the finite implemented fragment at public commit `4bed79509e73e5224f36dd21434e766790abd1a6` and tag `AUTHORITY_COMPILER_POST_REDTEAM_v0_1`.

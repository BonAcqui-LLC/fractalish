# Publishing the Next Fractalish Research Release

Research Releases are permanent public state-transfer records. A release can report a gain, bounded success, failed preregistration, negative result, correction, replication, demotion, extension, or newly frozen artifact.

The criterion is not "did we win?" It is: did the work change enough that an outside person could use, test, critique, or continue it?

## One-File Publishing Workflow

1. Copy `content/releases/_template.json` to `content/releases/YYYY-MM-DD-short-title.json`.
2. Give the release a unique `id`, `slug`, and date. Never reuse or overwrite an older release.
3. Fill every evidence office: result, changed conditions, held constants, negative result, limitations, non-claims, next question, chronology, and source artifacts.
4. Put publication-safe backing files in `release-assets/<slug>/`. Keep original source files byte-for-byte when possible.
5. Calculate each source file's SHA-256 and place it in that artifact's `expectedSha256` field.
6. Add only pages that should receive a compact release card to `relatedRoutes`. Each target page must already contain the generated release-feed markers.
7. Set `featured: true` only when the release should appear among the newest homepage releases.
8. Run `node scripts/build-site.mjs` from the repository root.
9. Review the generated article, archive, project cards, `manifest.json`, `checksums.sha256`, sitemap, search results, and mobile rendering.
10. Commit the content object, generated pages, backing files, manifests, search inventories, and any intentional target-page markers together.

## What the Build Does

`node scripts/build-site.mjs` performs the complete static build:

1. validates every release content object;
2. verifies source files against their declared SHA-256 values;
3. writes one stable article at `releases/<slug>.html`;
4. rebuilds `/releases` in reverse chronological order;
5. refreshes the newest homepage release cards;
6. refreshes cards on every declared `relatedRoutes` page;
7. writes the release `manifest.json` and `checksums.sha256`;
8. updates generated release sitemap entries;
9. applies shared Fractalish chrome and page classifications;
10. rebuilds and tests search;
11. runs the complete public-site validator.

The build fails closed on missing fields, duplicate IDs/slugs, unsupported statuses, missing sources, hash mismatches, or missing feed markers.

## Status Vocabulary

Use the project's native vocabulary where it is more precise. The release system recognizes:

- `REPORTABLE_RESULT`
- `EXPERIMENTAL_RESULT`
- `CORRECTION`
- `NEGATIVE_RESULT`
- `FAILURE`
- `NEW_SPECIFICATION`
- `FROZEN_ARTIFACT`
- `REPLICATION`
- `EXTENSION`
- `SUPERSEDED`

Evidence classes are not globally constrained because native project evidence vocabularies retain authority. Use explicit labels such as `EARNED_WITH_TESTED_SCOPE`, `CANDIDATE`, `WORKING_HYPOTHESIS`, `FAILED`, or `HOLD`.

## Chronology and Corrections

Do not rewrite an old release when later evidence changes it. Publish a new release and fill `supersedes`, `supersededBy`, and `priorReleaseLinks` as appropriate. Use the article to say whether the new work `SUPERSEDES`, `CORRECTS`, or `EXTENDS` the earlier record.

An original failed gate stays failed. A later experiment may stand beside it under a different preregistration; it cannot retroactively repair it.

## Publication Safety

Before placing files in `release-assets/`, inspect for credentials, API keys, private personal information, device identifiers, unrelated private material, and third-party content not intended for redistribution. If a cleaned projection is needed, retain and label the original source only when publication is authorized; never silently edit an original handoff or frozen artifact.

The article is the human entry point. Source documents are the backing record. The release archive is the chronology. Project pages state the current project position.

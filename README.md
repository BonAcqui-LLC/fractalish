# Fractalish

## Fractalish Translation Apparatus v0.1

This workspace now includes a local-first morphology translation apparatus for generating traceable evidence packages from single images.

### Install

```bash
pip install -r requirements.txt
```

### Generate synthetic samples

```bash
python tools/generate_synthetic_examples.py
```

This writes:

- `examples/input/sample.png`
- `examples/input/synthetic_branching.png`
- `examples/input/synthetic_irregular_boundary.png`
- `examples/input/synthetic_polygonal_cells.png`
- `examples/input/synthetic_crack.png`
- `examples/input/synthetic_noise.png`

### Analyze one image

```bash
python tools/fractalish_analyze.py examples/input/sample.png --out examples/output/sample_case
```

Expected evidence package:

- `raw_image.png`
- `normalized.png`
- `binary_mask.png`
- `skeleton.png`
- `overlay.png`
- `morphology_trace.svg`
- `metrics.csv`
- `metrics.xlsx`
- `mcva_record.json`
- `report.md`

### Compare two images

```bash
python tools/fractalish_compare.py examples/input/synthetic_branching.png examples/input/synthetic_crack.png --out examples/output/sample_compare
```

### Batch analyze a folder

```bash
python tools/fractalish_batch.py examples/input --out examples/output/batch
```

### Notes

- The analyzer is local-first and rule-based in v0.1.
- Fractal dimension is one descriptor, not a diagnosis.
- Similarity is not identity.
- Single images classify; sequences explain.

## Natural Math

This workspace also now includes a canonical local-first `natural_math/` package.

### Run Natural Math

Default runner:

```bash
python tools/natural_math_run.py
```

This now defaults to the `bifurcation-demo` profile so the package demonstrates real branch splitting instead of only immediate inactive-state behavior.

### Natural Math profiles

Closed-system inactive-state baseline:

```bash
python tools/natural_math_run.py --profile smoke
```

Single-child growth demo:

```bash
python tools/natural_math_run.py --profile growth-demo
```

Obstacle-aware branch-splitting demo:

```bash
python tools/natural_math_run.py --profile bifurcation-demo
```

Simple obstacle/growth variant:

```bash
python tools/natural_math_run.py --profile obstacle-growth
```

Optional exports:

```bash
python tools/natural_math_run.py --profile bifurcation-demo --out tmp/nm_demo
```

Expected Natural Math exports:

- `natural_math_summary.json`
- `natural_math_history.csv`
- `natural_math_events.csv`

### Natural Math package status

- The canonical implementation lives under `natural_math/`.
- The current package includes deterministic runs, event logging, invariant checks, and named demo profiles.
- Reproduction remains a conservative scaffold, not a full Appendix B-complete validation engine yet.
- The strongest current demos are `smoke`, `growth-demo`, and `bifurcation-demo`.

See also:

- [docs/natural_math_full_implementation_plan.md](C:\Users\moop\Downloads\Articles%20on%20X.com\Fractalish.com\docs\natural_math_full_implementation_plan.md)
- [docs/natural_math_runner_profiles.md](C:\Users\moop\Downloads\Articles%20on%20X.com\Fractalish.com\docs\natural_math_runner_profiles.md)

Static v1 landing page for `fractalish.com`, designed for direct deployment to Cloudflare Pages from the `public/` directory.

## Structure

- `public/index.html`: page markup and SEO metadata
- `public/styles.css`: theme, layout, motion, and responsive rules
- `public/app.js`: lightweight content rendering and UI behavior
- `public/images/`: local source imagery used by the page

## Public Site Cleanup Pass

The public site now has a clearer document-first research hierarchy.

Primary navigation:

- `Home`
- `Field Guide`
- `Natural Math`
- `MCVA / AMCVA / HOLD`
- `Fractalish Commons`
- `Tools`
- `Reference Library`
- `Research Notes`
- `Videos / Study Guides`
- `Documents`
- `Contribute`

Key cleanup additions:

- expanded `Natural Math` and `MCVA / AMCVA / HOLD` field-guide pages
- curated `Documents` library grouped by type and status
- cleaned `Research Notes` index plus expanded `Recovery Wake`
- `Tom Wessels` study-guide page with official embeds and accessible timed subtitle panels
- `Desiloizing Geometry` field-guide page
- `Microglia / Fractal Analysis` precedent note
- `No Knowledge Trapped in Video` policy note

Subtitle source files for the Tom Wessels study guide are staged under:

- `public/assets/subtitles/`

## Local preview

Use any static server that serves `public/` as the web root.

## Deployment

Cloudflare Pages can deploy this as a static site with:

- Build command: none
- Output directory: `public`

# Canonical Definitions

## Ageometrics

Ageometrics is the quantitative study of information, causality, identity, behavior, history, or meaning that is not preserved by a specified geometric representation alone.

## Geometric Sufficiency Ratio

For declared system record `X`, geometric representation `G(X)`, target `Y`, baseline score `S0`, geometry-only score `SG`, and full-record score `SX`:

```text
GSR_Y(G) = (SG - S0) / (SX - S0), where SX > S0
```

Interpretation:

- GSR near `1`: the chosen geometry preserves most recoverable target-relevant improvement.
- GSR near `0`: the geometry contributes little beyond baseline.
- Intermediate GSR: geometry is useful but incomplete.
- Negative GSR: the tested geometry-plus-model path harms out-of-sample performance relative to baseline.

## Non-Geometric Residue

```text
NGR_Y(G) = 1 - GSR_Y(G)
```

Reporting note:

- NGR is a normalized performance gap, not a metaphysical substance.
- Because GSR can fall below `0` or exceed `1` in some reporting regimes, NGR should be treated as a signed diagnostic unless a bounded reporting convention is declared explicitly.

## Interventional GSR

Interventional GSR measures the fraction of recoverable intervention-response performance captured by the declared geometry relative to the fuller available record.

## Temporal GSR

Temporal GSR measures how much target-relevant information remains when process history is compressed into a final-state or trajectory-derived geometry.

## Representation-Stability Envelope

The representation-stability envelope is the distribution of GSR values across a declared family of admissible geometric representations of the same record.

## Geometric Encoding Cost

Geometric encoding cost is the declared cost of augmenting a representation through added dimensions, labels, bits, auxiliary fields, or description length in order to improve sufficiency.

## Minimal Residue-Restoring Channel

The minimal residue-restoring channel is the smallest declared auxiliary channel that raises the representation above a stated sufficiency threshold for the target.

## Blind Growth Memory Hypothesis

When a process develops through locally informed, path-dependent updates without access to a complete global plan, part of its encounter history becomes embodied in the structure that constrains later updates.

## Perceptual Horizon

Perceptual horizon is the extent of information available to an updating process beyond its current local state.

## Geometry-History Tradeoff

The geometry-history tradeoff is the proposed frontier between immediate optimization through broader foresight and recoverable developmental history preserved in final structure.

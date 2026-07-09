# Canonical Definitions

## Ageometrics

Ageometrics is the quantitative study of information, causality, identity, behavior, history, or meaning that is not preserved by a specified geometric representation alone.

Formal label:

> Ageometrics: Geometric Sufficiency and Residue Analysis

## Declared objects

- `X`: declared fuller reference record available at prediction or decision time
- `G(X)`: specified geometric representation derived from `X`
- `B`: declared baseline information or baseline predictor
- `Y`: target
- `ell`: declared loss, with lower values preferred
- `Pi`: complete empirical comparison protocol

## Canonical population GSR

For any information source `Z`:

```text
R*_ell(Z) = inf_f E[ell(Y, f(Z))]
```

Canonical Geometric Sufficiency Ratio:

```text
GSR*_{ell,Y}(G | X,B)
=
[R*_ell(B) - R*_ell(G(X))]
/
[R*_ell(B) - R*_ell(X)]
```

with:

```text
R*_ell(B) > R*_ell(X)
```

Under the canonical nesting assumptions:

```text
R*_ell(X) <= R*_ell(G(X)) <= R*_ell(B)
```

the population quantity lies in `[0,1]`.

## Empirical GSR

Protocol-specific empirical estimator:

```text
GSR_hat_Pi
=
[R_hat_Pi(B) - R_hat_Pi(G)]
/
[R_hat_Pi(B) - R_hat_Pi(X)]
```

`GSR_hat_Pi` is not automatically bounded. Values below `0` or above `1` are diagnostic and must be preserved, reported, and interpreted.

## Canonical NGR

```text
NGR* = 1 - GSR*
```

Under the canonical assumptions, `NGR*` lies in `[0,1]`.

## Empirical NGR

```text
NGR_hat_Pi = 1 - GSR_hat_Pi
```

`NGR_hat_Pi` is a signed empirical diagnostic and may fall outside `[0,1]`.

## Comparator protocol

`Pi` must declare:

- temporal and information-availability rules
- train, validation, and test partitions
- model or inference families
- capacity and compute budgets
- hyperparameter-search budgets
- stopping rules
- loss or score
- uncertainty procedure
- leakage controls

## Same-learner comparison

The same learner, tuning budget, and evaluation protocol are applied to the geometry and fuller record when technically possible.

## Capacity-matched comparison

When different model forms are unavoidable, model capacity, compute, and search effort are matched as closely as possible.

## Model-envelope comparison

The comparison is repeated across several credible learner families so representation conclusions can be separated from single-model idiosyncrasies.

## Representation-stability envelope

The representation-stability envelope is the distribution of GSR values across a declared family of admissible geometric representations of the same record.

## Geometric encoding cost

Geometric encoding cost is the declared cost of augmenting a representation through added dimensions, labels, bits, auxiliary fields, or description length in order to improve sufficiency.

## Minimal residue-restoring channel

The minimal residue-restoring channel is the smallest declared auxiliary channel that raises the representation above a stated sufficiency threshold.

## Blind Growth Memory Hypothesis

When a process develops through locally informed, path-dependent updates without access to a complete global plan, part of its encounter history becomes embodied in the structure that constrains later updates.

## Perceptual Horizon

Perceptual horizon is the extent of information available to an updating process beyond its current local state.

## Geometry-History Tradeoff

The geometry-history tradeoff is the proposed frontier between broader foresight and recoverable developmental history preserved in final structure.

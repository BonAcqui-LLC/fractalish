# Metric Notes

## Canonical risk definition

For any information source `Z`:

```text
R*_ell(Z) = inf_f E[ell(Y, f(Z))]
```

Canonical GSR:

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

## Canonical assumptions

When:

- `G(X)` is derived from `X`
- the fuller record can reproduce the geometry-only decision rule
- the geometry is at least as informative as the declared baseline

the nesting assumptions are:

```text
R*_ell(X) <= R*_ell(G(X)) <= R*_ell(B)
```

Under those assumptions:

```text
0 <= GSR* <= 1
```

## Empirical estimator

For a declared protocol `Pi`:

```text
GSR_hat_Pi
=
[R_hat_Pi(B) - R_hat_Pi(G)]
/
[R_hat_Pi(B) - R_hat_Pi(X)]
```

The component risks must be evaluated:

- on the same held-out cases
- under the same temporal-availability rules
- without target leakage
- under declared comparator controls
- with declared uncertainty estimation

## Required comparison views

1. Same-learner GSR
2. Capacity-matched GSR
3. Model-envelope GSR

Nested model designs are preferred when available, but interpretation should remain out-of-sample and protocol-specific.

## Interval violations

Empirical interval violations are informative diagnostics:

- `GSR_hat_Pi < 0` may indicate the geometry-only path performs worse than baseline
- `GSR_hat_Pi > 1` may indicate finite-sample regularization, optimization effects, model mismatch, or comparator imbalance

These values should not be clipped silently.

Recommended report:

1. raw `GSR_hat_Pi`
2. paired confidence interval
3. `R_hat_Pi(B)`, `R_hat_Pi(G)`, and `R_hat_Pi(X)`
4. declared protocol summary
5. diagnosis of interval violation
6. optional clipped display value labeled as display-only

## Canonical and empirical NGR

Canonical:

```text
NGR* = 1 - GSR*
```

Empirical:

```text
NGR_hat_Pi = 1 - GSR_hat_Pi
```

`NGR*` is bounded under the canonical assumptions. `NGR_hat_Pi` is a signed diagnostic.

## Information-theoretic companion

```text
GSR^I_Y(G | X) = I(G(X);Y) / I(X;Y)
```

when the denominator is positive.

This companion is conceptually useful but should not be treated as the default empirical estimator where mutual information is unstable or poorly estimated.

## Comparator protocol minimum

Every Ageometrics result should declare:

- fuller reference record
- specified geometry
- baseline
- target
- loss or proper score
- train, validation, and test design
- learner families
- compute and tuning budget
- uncertainty procedure
- leakage controls

## HOLD items

- preferred proper losses vary by domain
- denominator instability remains a practical issue
- best aggregation rule for model-envelope GSR remains unresolved
- canonical treatment when geometry and fuller record are not cleanly nested remains unresolved
- cross-domain comparability remains unestablished

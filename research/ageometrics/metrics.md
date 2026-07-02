# Metric Notes

## Core formula

```text
GSR_Y(G) = (SG - S0) / (SX - S0), where SX > S0
```

## Required declarations

Every reported GSR should declare:

- system record `X`
- geometric representation `G(X)`
- target `Y`
- baseline `S0`
- geometry-only score `SG`
- full-record score `SX`
- model or inference class
- training and validation protocol
- uncertainty interval
- leakage controls

## Why the comparator matters

The main failure mode is comparator drift:

- if `SX` is produced by a much stronger model family than `SG`, the ratio may mostly measure model-capacity inequality rather than representation insufficiency;
- if `X` contains information unavailable at decision time, `SX` overstates attainable performance;
- if the score is poorly calibrated across tasks, cross-domain comparisons become unstable.

## Reporting discipline

Recommended reporting bundle:

1. raw baseline, geometry-only, and full-record scores
2. GSR value
3. uncertainty interval
4. score type and split protocol
5. model-budget parity statement
6. leakage and augmentation notes
7. whether NGR is being treated as signed or bounded

## Loss and information forms

Alternative formulations are useful when their assumptions are stated:

- loss-based GSR for metrics where lower is better
- information-theoretic GSR when mutual information can be estimated credibly
- interventional and temporal variants when the target is causal or developmental

## HOLD items

- monotone-score invariance is not yet established
- cross-domain comparability is not yet established
- best practice for bounding `SX` across model classes is unresolved
- a canonical encoding-cost functional is unresolved

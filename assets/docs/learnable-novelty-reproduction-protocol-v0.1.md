# Learnable Novelty Reproduction Protocol v0.1

No result may be promoted from `EXTERNAL REPORTED RESULT` until this protocol is completed before execution and the resulting artifacts are hash-bound.

## Pre-registration fields

- **Paper:** *Intelligence from Learnable Novelty*, arXiv:2607.18433v1.
- **Code repository and exact commit/tag:** REQUIRED; not located in this audit.
- **Code archive SHA-256:** REQUIRED.
- **Environment:** OS, Python, dependency lockfile, accelerator libraries, numerical backend, and exact versions REQUIRED.
- **Seeds:** enumerate environment, policy, reservoir/input-weight, data-split, and evaluation seeds before execution.
- **Hardware:** CPU, RAM, GPU/accelerator model/count, driver/runtime, precision mode, and wall-clock budget REQUIRED.
- **Datasets/tasks:** exact download URLs or content hashes, preprocessing, splits, and task versions REQUIRED.
- **Observer:** reservoir architecture, frozen weights/input distribution, dimensions, activation, ridge λ, estimator η, and draw count REQUIRED.
- **Expected metrics:** means, dispersion, confidence intervals, ranks, learning curves, terminal success, and estimator values with exact aggregation rules REQUIRED.
- **Controls:** task-only, epiplexity-only, task+bonus, random/inert representation, shuffled target/data, reservoir-draw sensitivity, and declared negative tasks REQUIRED where applicable.
- **Deviations:** every deviation from the paper/code must be declared before examining results, then recorded with rationale.
- **Artifact hashes:** code, configs, raw logs, checkpoints, metrics, plots, and final tables must receive SHA-256 hashes.

## Scope-specific requirements

- Rule 110/ECA: enumerate all 88 locally unique rules, width 64, next-32-state target, ten reservoir/input draws, rank statistic, and tie handling.
- NCA: record τ=8 configuration, all nine reported figure seeds where applicable, update law, and soliton/band evaluation procedure.
- MNIST: labels must be absent from representation training; label use in probes, 5NN, evaluation, and visualization must be explicit.
- RL: record all ten tasks, ten seeds, 600k-step budget, PPO implementation, bonus coefficient/schedule, task-only, task+bonus, and epiplexity-only regimes.
- Acrobot: terminal-goal rate and return must be reported; high learnability without goal completion is a failure of task achievement, not a success surrogate.

## Falsification conditions

- Rule 110 does not rank highest under the preregistered aggregation or is unstable across declared reservoir draws.
- NCA findings disappear under seed expansion or declared negative controls.
- MNIST probe/5NN gains do not survive held-out evaluation with labels excluded from training.
- Task+bonus does not outperform task-only under the preregistered task/seed aggregation, or improvements are dominated by one task/seed.
- Epiplexity-only behavior is incorrectly reported as task solving despite absent terminal success.
- Estimator results materially change under small reasonable λ/η/reservoir perturbations not disclosed in advance.
- Any published table cannot be regenerated from immutable raw logs and the bound commit.

## Publication gate

A reproduction may be called local only after an independent script verifies all hashes, regenerates every reported metric, records failed seeds and deviations, and produces a signed/versioned qualification artifact. Co-evolving observers and LLM substrates remain future work unless separately implemented and qualified.
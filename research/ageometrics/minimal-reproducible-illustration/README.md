# Minimal Reproducible Illustration

This directory preserves the current synthetic Ageometrics illustration used by
the v0.5 paper.

Claim boundary:

- This is a minimal reproducible illustration.
- It is not broad empirical validation.
- It is not a general benchmark suite.
- It does not claim pairwise identical terminal geometry across examples.

Declared representation note:

- The declared terminal-geometric representation consists only of the final
  geometric coordinates `g1` and `g2`.
- The informative history channel is excluded from that declared geometry and
  remains available only in the fuller record.

Reproduction command:

```powershell
python research/ageometrics/minimal-reproducible-illustration/ageometrics_synthetic_temporal_residue_v0_5.py --output research/ageometrics/minimal-reproducible-illustration/ageometrics_synthetic_v0_5_results.json
```

Preserved seeded protocol:

- seed: `42`
- sample size: `20000`
- split: stratified `60/40` train/test
- learner: `StandardScaler + LogisticRegression(max_iter=1000)`
- fuller record: `g1`, `g2`, `history`
- declared geometry: `g1`, `g2`
- baseline: training-set class-rate predictor
- loss: `log_loss`
- uncertainty: paired bootstrap with `2000` resamples
- stopping rule: logistic regression `max_iter=1000`

Sensitivity work:

- A larger sensitivity suite remains pending.
- The current repository does not fabricate multi-seed, multi-learner, or
  restoration results that have not been run.

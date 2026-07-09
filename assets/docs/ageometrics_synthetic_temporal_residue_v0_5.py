#!/usr/bin/env python3
"""Reproduce the v0.5 Ageometrics minimal reproducible illustration.

This script preserves the seeded synthetic example used to illustrate
controlled temporal residue outside a declared terminal-geometric representation.
It is an illustration, not a validation suite.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, log_loss
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler


def run(seed: int = 42, n: int = 20_000, bootstrap: int = 2_000) -> dict:
    rng = np.random.default_rng(seed)
    g1 = rng.normal(size=n)
    g2 = rng.normal(size=n)
    history = rng.choice([-1, 1], size=n)
    noise = rng.normal(scale=1.0, size=n)
    y = (0.9 * g1 + 0.5 * g2 + 1.3 * history + noise > 0).astype(int)

    geometry = np.column_stack([g1, g2])
    fuller = np.column_stack([g1, g2, history])

    g_train, g_test, x_train, x_test, y_train, y_test = train_test_split(
        geometry,
        fuller,
        y,
        test_size=0.40,
        random_state=seed,
        stratify=y,
    )

    baseline_probability = np.repeat(y_train.mean(), len(y_test))
    geometry_model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1_000))
    fuller_model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1_000))
    geometry_model.fit(g_train, y_train)
    fuller_model.fit(x_train, y_train)

    p_geometry = geometry_model.predict_proba(g_test)[:, 1]
    p_fuller = fuller_model.predict_proba(x_test)[:, 1]

    risk_baseline = log_loss(y_test, baseline_probability, labels=[0, 1])
    risk_geometry = log_loss(y_test, p_geometry, labels=[0, 1])
    risk_fuller = log_loss(y_test, p_fuller, labels=[0, 1])
    gsr = (risk_baseline - risk_geometry) / (risk_baseline - risk_fuller)

    boot_rng = np.random.default_rng(seed + 81)
    boot_values = []
    for _ in range(bootstrap):
        idx = boot_rng.integers(0, len(y_test), len(y_test))
        rb = log_loss(y_test[idx], baseline_probability[idx], labels=[0, 1])
        rg = log_loss(y_test[idx], p_geometry[idx], labels=[0, 1])
        rx = log_loss(y_test[idx], p_fuller[idx], labels=[0, 1])
        denominator = rb - rx
        if denominator > 0:
            boot_values.append((rb - rg) / denominator)

    ci_low, ci_median, ci_high = np.quantile(boot_values, [0.025, 0.5, 0.975])

    return {
        "seed": seed,
        "n": n,
        "test_n": len(y_test),
        "bootstrap_samples": bootstrap,
        "loss": "log_loss",
        "learner": "StandardScaler + LogisticRegression",
        "risk_baseline": risk_baseline,
        "risk_geometry": risk_geometry,
        "risk_fuller": risk_fuller,
        "accuracy_geometry": accuracy_score(y_test, p_geometry >= 0.5),
        "accuracy_fuller": accuracy_score(y_test, p_fuller >= 0.5),
        "gsr": gsr,
        "gsr_bootstrap_ci_95": [ci_low, ci_high],
        "gsr_bootstrap_median": ci_median,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--n", type=int, default=20_000)
    parser.add_argument("--bootstrap", type=int, default=2_000)
    parser.add_argument("--output", type=Path, default=Path("ageometrics_synthetic_v0_5_results.json"))
    args = parser.parse_args()
    results = run(args.seed, args.n, args.bootstrap)
    args.output.write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()

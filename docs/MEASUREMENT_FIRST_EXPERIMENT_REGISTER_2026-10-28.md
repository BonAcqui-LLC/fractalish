# Measurement-first experimental register

**Version:** 2026-10-28 working register  
**Status:** PROPOSED / NOT RUN  
**Priority rule:** Prefer inexpensive systems that expose history dependence, accommodation, rupture, and matched later response while retaining native-domain baselines.

## EXP-OF-001 — Pulsed quasi-2D copper electrodeposition

- **Question:** Does a bounded first growth history alter later branching response under a matched second pulse after controlling for deposited mass and visible geometry?
- **Physical system/materials:** Transparent quasi-2D cell; dilute copper sulfate electrolyte; copper electrodes; low-voltage current-limited supply; fixed spacer; sealed secondary containment. Follow the chemical safety data sheet and local disposal rules.
- **Observational frame:** Fixed overhead camera with scale target and uniform lighting; synchronized voltage/current logging; optional temperature and conductivity probes.
- **Resolution:** Declare pixel size, frame rate (target 1–10 Hz), current/voltage sample rate (target ≥10 Hz), and timing uncertainty before the run.
- **Native quantities:** Voltage (V), current (A), charge (C), temperature (°C), conductivity (S/m), branch-tip velocity (mm/s), occupied area (mm²), branch count, skeleton length (mm), local width (mm), and transition time (s).
- **Perturbations:** Two equal-charge pulse histories with different first-pulse duty cycles; matched second probe pulse; polarity-reversal and rest-interval variants only after the base contract is frozen.
- **Continuous response:** Raw video, current, voltage, temperature, and conductivity from pre-pulse baseline through relaxation.
- **Retained difference:** Deposit morphology and electrode/electrolyte changes quantified before the matched probe.
- **Accommodation/transition:** Predeclare current spikes, tip splitting, bridging/shorting, bubble onset, morphology-class transition, and delamination criteria.
- **Matched probe:** Apply the same second voltage/current program to history A, history B, and fresh controls.
- **Controls/reset:** Fresh cell; sham waiting control; equal total charge; randomized order; electrode geometry and gap fixtures; cleaning/replacement protocol; blind image-analysis labels.
- **Baselines:** Faradaic charge/mass accounting, diffusion-limited aggregation descriptors, electric-field/current-density models, and ordinary morphology metrics.
- **Uncertainty/calibration:** Calibrate scale, clock alignment, current shunt, voltage, temperature, and conductivity; propagate segmentation threshold sensitivity.
- **Falsifiers/negative outcomes:** No reproducible matched-probe difference after controlling for visible morphology, mass/charge, electrolyte state, temperature, and cell geometry; any difference disappears under blinded replication; a conventional electrochemical state model fully predicts the effect.
- **Provenance/reproduction:** Preserve bill of materials, lot numbers, solution preparation, cell drawings, calibration files, raw sensor streams, unedited video, analysis code, environment lock, randomization seed, exclusions, and all failures.
- **Safety boundary:** Low voltage does not remove chemical or short-circuit risk. Do not discharge copper solution to drains. No run is authorized by this document alone.

## EXP-OF-002 — Viscoelastic accommodation and rupture under repeated matched loading

- **Question:** Can an inexpensive gel/elastomer show a reproducible shift in later matched-probe response before visible rupture, distinct from temperature, dehydration, and ordinary fatigue?
- **System:** Standardized silicone or gelatin specimens with fixed geometry; load cell; displacement sensor; temperature/humidity logging; camera.
- **Native quantities:** Force (N), displacement (mm), stress (Pa), strain, hysteresis energy (J), recovery time (s), crack length (mm).
- **Perturbation:** Subcritical cyclic histories followed by one matched probe; separate rupture-to-post-rupture branch.
- **Controls:** Fresh specimens, sham rest, rate-matched and energy-matched controls, randomized order, water-loss control for gels.
- **Falsifier:** A conventional viscoelastic/fatigue model predicts all later response within preregistered error and no extra history variable improves held-out prediction.
- **Status:** QUEUED after EXP-OF-001 fixture and data-pipeline validation.

## EXP-OF-003 — Conducting-polymer or memristive history response

- **Question:** Does physical growth or conductance reconfiguration create an additional response mode under unseen matched probes rather than replaying stored input-output pairs?
- **System:** Commercial memristive device or safely fabricated conducting-polymer test cell; source-measure unit; environmental monitoring.
- **Native quantities:** I–V curve, conductance (S), switching thresholds (V/A), relaxation time, cycle count, impedance spectrum where available.
- **Perturbation:** Development histories with equal energy/charge but different order; unseen probe family held out before formation.
- **Controls:** Resistor/RC baseline, lookup-table controller, conventional adaptive filter, device-to-device and cycle-to-cycle variability.
- **Falsifier:** A low-order hysteresis model or stored lookup predicts the held-out response as well as the proposed formation account.
- **Status:** HOLD pending hardware choice and safety/reproducibility review.

## Recommended first experiment

Run **EXP-OF-001** first. It directly joins ongoing growth, mobility/constraint, morphological transition, rupture/bridging, retained organization, and a matched subsequent probe in one observable system. Its success criterion is not “fractal growth.” It is a reproducible, causally localized history-dependent response that survives controls and beats native electrochemical baselines.

# Software-Defined Battery Spectroscopy
## A SERA Framework for Programmable Electrochemical Diagnostics, Computational Integrity Attestation, and Anti-Illogical Power Security

**Working Thesis v0.2 - July 29, 2026**

**Status:** Working scientific thesis and experimental proposal. Hypotheses are not experimental results.

## Abstract

Battery state of health is not a directly readable quantity. It is a latent, path-dependent condition inferred from voltage, current, temperature, charge acceptance, relaxation, capacity, impedance, and operating history. Most field systems use sparse sensors, vendor-specific models, short self-tests, or opportunistic calibration events. These methods are useful but often coarse, sensitive to operating conditions, and difficult to validate across different cells and devices.

This thesis proposes Software-Defined Battery Spectroscopy (SDBS): a method that uses validated computer programs as controlled electrical excitation signals. A workload is not treated merely as software. It is treated as a reproducible load morphology with measurable execution time, energy, current transients, duty cycle, memory traffic, storage traffic, thermal response, and recovery structure. By running standardized batches of CPU, GPU, memory, storage, network, and mixed workloads while recording synchronized electrical and battery telemetry, a device can generate a response fingerprint analogous to a low-cost, in-operando diagnostic experiment.

SDBS is grounded in SERA - Software Efficiency and Resilience Activation. SERA requires a declared functional unit, verified output, reproducible accounting, and explicit separation between useful work and waste. Applied to batteries, SERA extends efficiency accounting beyond joules consumed now to include thermal stress, transient burden, uncertainty, recovery cost, and estimated lifetime degradation per unit of validated work. The framework deliberately avoids a universal scalar score; it preserves a multidimensional evidence record and allows weighted scoring only after normalization and operational priorities are declared.

Version 0.2 adds a second, tightly bounded use of the same measurement channel: computational integrity attestation for AI systems. The Unified Fractalish Weighting Kernel (UFWK) supplies context-relative language and thought-trace weights; SERA supplies measured implementation cost; the hardware supplies an observed electrical morphology. A model can then learn the expected compute envelope for a declared model, prompt class, context state, runtime, and platform. Deviations between expected and observed behavior may reveal hidden retries, abnormal tool use, context expansion, model or runtime substitution, unreported background computation, or reasoning execution that has diverged from its declared task. This is not a claim that each word has a fixed joule value. The proposed mapping is empirical, platform-relative, context-dependent, and falsifiable.

The thesis also defines security applications for uninterruptible power supplies (UPS), battery backups, gaming and workstation motherboards, servers, and embedded power systems. Battery condition and compute behavior are cyber-physical trust dependencies. A system can report normal status while its actual runtime reserve is weak, its calibration is stale, its telemetry is spoofed, or its physical execution no longer matches its declared software state. SDBS can provide independent, signed workload probes and cross-channel integrity receipts for Anti-Illogical Sentinel, Guardian, and ExoMCP-style monitoring. The monitor remains provider-separated and read-only by default; it may detect, trace, and recommend intervention but does not inherit authority to cut power, alter protected equipment, or declare malicious intent from a power trace alone.

The central claims are intentionally falsifiable. On fixed hardware, standardized computational workloads may produce repeatable battery response features that improve health estimation, anomaly detection, or remaining-runtime confidence beyond conventional energy totals and vendor self-tests. Separately, context-aware expected-compute envelopes may improve detection of anomalous AI execution beyond software telemetry alone. The thesis does not assert that programming languages directly age batteries, that words possess universal physical-energy values, that electrical traces reveal semantic truth, or that SDBS replaces electrochemical impedance spectroscopy. It specifies the experiments required to find out.

## Canonical Thesis Statement

> A validated computation can serve simultaneously as a programmable battery excitation signal and a physical integrity witness. When useful output, semantic and operational workload descriptors, implementation cost, and observed electrical morphology are bound in one provenance-bearing receipt, repeated deviations may expose battery drift, implementation waste, hidden computation, model or runtime substitution, or abnormal reasoning execution that software-only status fields do not resolve.

The battery and computational-integrity claims remain separable. SDBS succeeds as a battery method only if it adds held-out diagnostic value. Physical compute attestation succeeds only if expected-versus-observed residuals detect bounded, independently verified perturbations without unacceptable false alarms.

## Claim Status at v0.2

| Status | Claim class | Boundary |
|---|---|---|
| SUPPORTED BACKGROUND | Controlled current, pulse, interruption, and charging features can reveal battery condition. | Supported by external literature; chemistry and deployment conditions vary. |
| SUPPORTED BACKGROUND | Software implementations produce measurable runtime, energy, memory, I/O, thermal, and power-shape differences. | Attribution to an abstract programming language or individual word is not supported. |
| PROPOSED | Versioned computational workloads can form a useful battery diagnostic excitation library. | Requires repeatability, independent ground truth, and battery-level holdout validation. |
| PROPOSED | Signed workload-response receipts can improve UPS and power-substrate integrity monitoring. | Security benefit must be demonstrated adversarially. |
| PROPOSED / HIGH UNCERTAINTY | UFWK language and thought-trace weights can improve expected-compute envelopes for AI workloads. | No empirical semantic-to-physical mapping has yet been demonstrated. |
| PROPOSED / HIGH UNCERTAINTY | Cross-channel electrical residuals can detect anomalous or missing AI computation beyond software telemetry. | Must be tested against benign confounders, model nondeterminism, and independent perturbation labels. |

## 1. The Problem: Battery Health Is Inferred, Not Read

A battery management system never observes "health" directly. It observes proxies. Capacity is estimated through coulomb counting and occasional full or partial calibration. Resistance is inferred from voltage response to load. Temperature is sampled at a few locations. State of charge is corrected through models, rest periods, and voltage behavior. State of health is then constructed from these incomplete signals.

This is not a criticism of battery engineering. It is a consequence of the object being measured. Electrochemical aging is heterogeneous, nonlinear, temperature-dependent, state-of-charge-dependent, and history-dependent. Two batteries with similar remaining capacity can have different power capability, resistance growth, thermal behavior, cell imbalance, or proximity to a rapid degradation knee. The same battery can appear different depending on temperature, recent load, recent charge, and relaxation time.

Field systems therefore rely on operational opportunities rather than ideal laboratory measurements. Electric vehicles infer health while driving and charging. Phones infer it while users run unpredictable applications. Stationary storage systems infer it while serving loads. UPS devices often perform a short battery transfer and runtime calculation. These are practical compromises, but they also mean the stimulus is poorly controlled.

Software-Defined Battery Spectroscopy changes the direction of the problem. Instead of waiting for arbitrary use to excite the battery, the system deliberately generates controlled, verified electrical load shapes using code. The measurement target remains electrochemical, but the test signal becomes programmable, repeatable, versioned, and cheap to distribute.

## 2. Definitions and Naming Boundaries

SERA. Software Efficiency and Resilience Activation is the accounting and resilience layer in the Fractalish stack. It measures useful validated work against energy, runtime, memory, retries, rework, drift, recovery cost, and other declared burdens. A SERA result is invalid if the output is wrong, incomplete, or unverifiable.

Software-Defined Battery Spectroscopy (SDBS). A diagnostic method in which software-controlled workloads act as excitation signals and synchronized electrical, thermal, runtime, and battery measurements are used to infer response features.

Excitation program. A versioned program that produces a declared load morphology and a verified result. It may be written in any language or runtime, but its identity includes compiler, runtime, libraries, operating system, scheduler settings, hardware configuration, and input dataset.

Functional unit. The exact useful work being compared, such as one million verified key-value writes, compression of a fixed corpus with byte-identical recovery, or completion of a specified matrix operation within a declared numerical tolerance.

Implementation tax. The measured burden imposed by one complete implementation of a functional unit. This replaces the looser phrase "language tax" in formal claims. Programming language may be one factor, but runtime, algorithm, libraries, parallelism, memory behavior, storage stack, and operating system are inseparable unless experimentally controlled.

Load morphology. The time-structured electrical and computational pattern generated by an excitation program: energy, average and peak power, current transients, duty cycle, burst structure, core activity, cache and memory events, storage reads and writes, network activity, temperature, and idle recovery.

Battery response fingerprint. The measured voltage, current, temperature, relaxation, resistance proxy, charge-phase behavior, and uncertainty produced when a particular battery state is exposed to a declared load morphology.

Battery Integrity Receipt. An append-only record binding the workload manifest, device state, telemetry provenance, response features, validation outcome, anomaly score, and policy decision.

Weight field. A provenance-bearing, multidimensional representation of what an utterance, event, memory, or percept was doing in context. Under UFWK, weights may include structural, contextual, affective-significance, prospective, consequential, mnemonic, residual, and counterfactual components. The field is observer-, target-, scale-, time-, model-, and evidence-relative.

Language vector. A bounded projection used for language experiments. Candidate dimensions include certainty projection, emotional intensity or urgency, evidentiary rigor, humility, openness to revision, dominance pressure, interaction intent, blame assignment, power-asymmetry awareness, Entro-aligned pressure, Resil-aligned pressure, and question quality. It is not a moral score and is not treated as a direct energy unit.

Expected compute envelope. A calibrated distribution of execution time, energy, power shape, CPU/GPU and memory activity, I/O, network use, temperature, and recovery expected for a declared model, runtime, platform state, input class, and validated output.

Physical coherence residual. The measured difference between the observed compute morphology and the expected compute envelope after controlling for declared hardware, software, thermal, scheduling, battery, and workload conditions. A residual is evidence of mismatch, not proof of motive or semantic falsity.

Compute Integrity Receipt. An append-only record binding the UFWK WeightReceipt or language descriptor, inference manifest, expected compute envelope, observed physical morphology, result validity, residual vector, evidence quality, and Anti-Illogical response state.

Prior-art boundary. "Software-Defined Batteries" has already been used for systems that combine or control heterogeneous battery chemistries through software. SDBS is different: it uses software workloads as diagnostic excitation and evidence generation. The name should therefore be written in full in publications until the distinction is established.

## 3. Existing Evidence That Makes the Hypothesis Plausible

Three existing research lanes converge on the proposal.

First, battery response to controlled current and charging behavior contains health information. The uploaded 2026 study by Le and Nguyen compared constant-current (CC), constant-voltage (CV), and combined charging indicators under leave-one-battery-out validation. It reported that CC duration and CV behavior captured complementary degradation information. The combined feature set achieved R-squared of 0.874, while random five-fold validation substantially overstated deployment performance: leave-one-battery-out error was about 119 percent higher on average. That result is directly relevant to SDBS because it shows both the value of complementary response features and the danger of validating on mixed observations from the same batteries.

Second, resource-efficient time-domain excitation can recover useful resistance and diffusion information. Geng, Thiringer, and Lacey reported that intermittent current interruption can track resistive and diffusive behavior across state of charge with high repeatability and can provide information comparable to electrochemical impedance spectroscopy without advanced equipment. This establishes that carefully structured time-domain stimuli need not be analog laboratory sweeps to be diagnostically useful.

Third, software workloads are measurable physical processes. Research on energy efficiency across programming languages has measured runtime, memory, and energy differences across implementations. Later causal analysis showed why simplistic language rankings are dangerous: application implementation, active cores, memory activity, warm-up, and runtime behavior confound attribution. That critique strengthens rather than weakens SDBS. The proposed instrument is not the abstract language name. It is the complete, measured implementation and its load morphology.

Mobile power-measurement platforms such as BatteryLab further show that software-controlled experiments can be distributed across heterogeneous devices. The missing bridge is to use those workloads not only to benchmark software energy consumption, but also to identify the battery's dynamic response and longitudinal health.

## 4. Core Hypothesis and Formal Model

Let F denote a declared functional unit and V(F) a validity predicate. No workload receives efficiency credit unless V(F) = 1.

For excitation program p on platform h at battery state b, define the measured workload morphology:

M(p,h,b) = [t, E, P_avg, P_peak, I_rms, I_peak, slew, crest, duty, C_cpu, C_gpu, C_mem, IO_read, IO_write, N_net, T_peak, dT, recovery]

where t is execution time, E is energy, slew summarizes current-change behavior, crest is peak-to-RMS ratio, computational terms summarize processor and memory activity, I/O terms record storage traffic, N_net records network traffic, and thermal and recovery terms capture delayed physical effects.

Define the battery response fingerprint:

R(p,h,b) = [dV_inst, dV_10s, tau_relax, R_ohmic*, R_diff*, dT_batt, Q_out, CC_time, CV_time, CV_CC_ratio, tau_CV, Q_CV, imbalance, uncertainty]

The starred resistance values are proxies unless independently validated. The charge-phase features are available only when a standardized charge follows the excitation cycle.

The simplest battery test asks whether response features add information beyond total energy and execution time:

SOH_hat = f(E, t, controls)

versus

SOH_hat = g(E, t, M_shape, R, controls)

SDBS is supported only if g improves calibrated prediction, anomaly detection, or uncertainty on batteries or devices not seen during training.

For language or AI execution, let W_i denote the UFWK weight field for token, phrase, thought-trace segment, or utterance i under an explicit target contract and evidence boundary. A bounded language projection may be written:

L_t = [C_e, E_l, R_g, H, O, D, I_a, B_l, P_a, X, M_r, Q_q]

where the dimensions represent certainty projection, emotional intensity or urgency, rigor, humility, revision openness, dominance pressure, interaction intent, blame, power-asymmetry awareness, Entro-aligned pressure, Resil-aligned pressure, and question quality. The symbols are linguistic dimensions, not electrical units.

Let z collect declared execution conditions: model identity and weights hash where available, quantization, context length, decoding settings, retrieval state, tool policy, runtime, driver, operating system, hardware, temperature, battery state, and scheduler condition. The expected compute envelope is:

M_expected = G(W_1:n, z, F, V(F))

and the observed morphology is M_observed. The physical coherence residual is retained as a vector and may also be summarized by a calibrated distance:

A_phys = d_Sigma(M_observed, M_expected)

where d_Sigma may be a covariance-aware distance learned only from qualified baseline data. A separate semantic or procedural residual A_sem captures divergence between the declared reasoning contract, output receipts, contradiction state, retrieval claims, and observed result. The joint Anti-Illogical evidence packet is:

A_joint = [A_phys, A_sem, validity failures, provenance breaks, battery-response drift, uncertainty]

No canonical scalar is required. A scalar alert score may be projected for a declared policy, but the underlying residuals and evidence must remain inspectable.

SERA also does not require collapsing unlike costs into one number. The preferred output is a Battery-Adjusted SERA Vector:

BASV = [valid work / joule, valid work / second, thermal burden / work, transient burden / work, recovery burden / work, estimated health loss / work, uncertainty]

A scalar may be derived only after normalization and declared weights:

Score = U(valid work) / [wE*E_n + wT*T_n + wX*X_n + wD*D_n + wU*U_n]

where each subscript n denotes a normalized term and all weights are published. Without those declarations, the scalar is not portable and should not be reported.

## 5. Why Coded Workloads May Reveal Finer Structure

A conventional energy measurement integrates burden over time. Integration is useful but destructive: it can erase the shape of the load. Ten watt-hours delivered smoothly and ten watt-hours delivered as repeated sharp bursts are equal in total energy but not necessarily equal in voltage sag, heat localization, relaxation behavior, or control-system response.

Software can generate a family of excitation shapes without specialized arbitrary-waveform hardware. Thread count controls concurrency. Instruction mix alters CPU-unit use. Array size and access pattern alter cache and memory traffic. Sync frequency alters storage burst behavior. Packet pacing alters radio or network-interface duty cycle. Garbage collection and memory allocation create periodic pauses and bursts. Sleep intervals create recovery windows. These parameters form a programmable load alphabet.

A useful first alphabet has three states:

REST: minimal scheduled activity, used to establish baseline and relaxation.
WORK: a declared computational or I/O burden.
RECOVER: an enforced idle interval used to observe voltage and thermal relaxation.

Sequences of these states can be deterministic, pseudo-random, chirped in duration, or arranged as multiscale pulse trains. The objective is not to imitate analog spectroscopy perfectly. It is to generate repeatable, information-rich probes from hardware the device already owns.

The strongest result would not be that one programming language is "better." It would be that particular measurable workload morphologies produce distinct and repeatable response sensitivity to resistance growth, diffusion limitation, thermal coupling, cell imbalance, or degraded runtime reserve.

## 6. Excitation Library and Workload Taxonomy

The initial library should separate mechanisms before combining them.

CPU-steady workloads hold a fixed number of cores near a stable utilization level. They estimate sustained load response and thermal rise.

CPU-burst workloads alternate short high-utilization intervals with rest. They measure transient voltage response, scheduler repeatability, and recovery.

Memory-stream workloads perform sequential reads and writes over datasets larger than cache. They distinguish memory-system power from compute-heavy execution.

Memory-random workloads use pseudo-random access patterns to increase cache misses and memory activity while preserving a verifiable output.

Storage-write workloads append, sync, overwrite, and compact controlled datasets. They measure flash or disk write amplification, controller bursts, and the battery cost of persistence.

Storage-read workloads compare sequential and random reads with checksummed output.

Network workloads use controlled packet size, pacing, encryption, retransmission policy, and local loopback or isolated peer endpoints. Internet variability should not be part of the first experiment.

Mixed service workloads combine database writes, serialization, compression, logging, and periodic network transfer to approximate real applications.

Reference pulses are short, hardware-limited workloads chosen for high repeatability. They are not used to age the battery; they are used as diagnostic checkpoints.

Every workload must include a result oracle. Examples include cryptographic hashes, exact record counts, deterministic database state, byte-identical decompression, or numerical tolerance checks. Failed work is recorded as cost and receives no useful-work credit.

## 7. The Implementation-Tax Question

The informal phrase "language tax" is useful for discovery, but formal experiments must bind the tax to a complete implementation.

The 2017 cross-language energy study found large differences among benchmark implementations. A 2024 causal reanalysis argued that language labels were being mistaken for causes; when parallelism, active cores, application implementation, runtime warm-up, and memory activity were controlled, energy was largely proportional to execution time. This is a critical warning.

SDBS therefore adopts six rules:

1. Compare implementations, not names. "Python" is not an experimental condition. CPython version, libraries, algorithm, process model, interpreter configuration, and input are.

2. Match useful work, not source-code appearance. Two programs that look similar but use different algorithms, precision, vectorization, or libraries are different stimuli.

3. Measure the stimulus directly. The program is only a way to generate M(p,h,b). Claims should be about measured execution and electrical behavior.

4. Preserve both causal questions. One experiment asks which implementation completes valid work with the lowest burden. A different experiment asks whether load morphology predicts battery response or aging after controlling for total energy and time.

5. Do not assign a universal joule value to a word. UFWK weighting describes relational and semantic force in context. Compute cost depends on tokenization, model architecture, context length, cache state, retrieval, batching, precision, hardware, runtime, and decoding path. Any semantic-to-physical mapping must be learned for a declared stack and requalified after material change.

6. Preserve under-computation as a possible anomaly. An unexpectedly expensive run may indicate hidden work, retries, or interference. An implausibly cheap run on a high-consequence task may indicate skipped retrieval, disabled verification, premature closure, model substitution, or incomplete execution. Efficiency without validity or required process integrity receives no credit.

This means the thesis survives even if abstract programming-language choice has no independent energetic effect and even if semantic weights explain little physical variance. The runtime and application still produce measurable power shapes, those shapes remain candidate diagnostic signals, and a negative mapping result constrains the scope of physical AI attestation.

## 8. Experimental Design

The experimental program has three tiers.

Tier 0: software and instrumentation validation. Run workloads on externally powered hardware. Verify result oracles, timing, energy measurement, performance counters, temperature sensors, synchronization, and reproducibility. No battery-health claim is made.

Tier 1: non-invasive device battery study. Use identical or closely matched laptops, phones, embedded computers, or UPS devices. Do not open packs or bypass protection electronics. Run controlled diagnostic sessions at defined state of charge and temperature. Compare SDBS features with the device's own reported health and periodic independent capacity or runtime tests.

Tier 2: controlled cell or module study. Use laboratory-grade cyclers, environmental control, independent voltage and current measurement, and multiple cells per condition. This tier is required before claims about electrochemical aging mechanisms.

A diagnostic cycle should contain: stabilization, baseline recording, coded excitation, enforced recovery, reference pulse, standardized recharge where applicable, feature extraction, and an integrity receipt.

Controls must include ambient temperature, initial state of charge, battery temperature, recent charge/discharge history, background processes, hardware power policy, screen and radios, battery firmware, charger, rest time, and workload order. Workload order should be randomized or counterbalanced. Identical work should be repeated to estimate within-device noise.

The validation split must be physically honest. Samples from one battery must not be scattered across both training and test sets. Primary validation should hold out entire batteries, devices, production lots, or operating conditions. The uploaded charging-indicator paper demonstrates why: random cross-validation can look excellent while deployment on a different battery is much worse.

Ground truth should be independent where possible: measured capacity, standardized runtime under a known load, hybrid pulse power characterization, impedance measurement, or a trusted laboratory reference. A model that predicts only the vendor's own health field may merely reproduce vendor calibration behavior.

## 9. Instrumentation and Synchronization

The minimum telemetry set is timestamped battery voltage, current, power, state of charge, battery temperature, device temperature, charger state, workload phase, result validity, and operating-system power state. Higher-value additions include per-cell voltage where legally and safely exposed, CPU package energy, performance counters, storage statistics, fan state, and environmental temperature.

Sampling rate should follow the claimed feature. One-hertz data may be sufficient for long CC/CV timing or thermal trends, but it cannot resolve millisecond transients. A multi-rate design is preferable: high-rate external current and voltage for short reference pulses; lower-rate system telemetry for long runs; event markers for workload boundaries.

Clock alignment is a first-class measurement problem. Each workload transition must write a local monotonic timestamp and, where possible, emit a hardware-observable marker. Unsynchronized logs create false lag, false recovery constants, and false causality.

Instrumentation overhead must be measured. The collector consumes CPU, memory, storage, and power. A baseline collector-only run is required, and heavy logging should be buffered or moved off-device when possible.

No sensor is authoritative by default. The receipt should distinguish direct external measurement, operating-system estimate, BMS field, model-derived feature, and inferred state. SERA's purpose is not to make all numbers look equally certain; it is to preserve the cost and confidence structure.

## 10. Statistical Model and Falsification Discipline

The primary analysis should begin with simple models. Complexity is added only when it improves held-out performance and calibration.

Baseline A uses total energy, execution time, initial state of charge, and temperature.

Baseline B adds conventional battery features such as voltage sag and reported internal resistance.

SDBS model C adds load-shape and response-shape features.

Longitudinal model D adds within-battery trends and prior receipts.

Success requires more than a lower training error. Candidate criteria include:

- improved leave-one-battery-out or leave-one-device-out error;
- narrower calibrated uncertainty at a maintenance threshold;
- earlier detection of a verified weak battery;
- better prediction of standardized runtime;
- repeatable detection of telemetry or calibration anomalies;
- stable feature importance across devices and time.

The thesis is weakened or falsified if response features are not repeatable beyond noise; if they add no held-out value beyond energy, time, temperature, and state of charge; if cross-device performance collapses; if results depend on one vendor's undocumented field; or if diagnostic excitation creates unacceptable wear or operational risk.

Negative results remain useful. A finding that energy and time fully explain response would constrain the theory and produce a better battery-workload benchmark. A finding that only one simple pulse matters would simplify the system. SERA should count avoided complexity as useful work.

## 11. UPS and Battery Backup Systems as a Security Surface

UPS devices are often treated as passive infrastructure. Modern units are not passive. They contain firmware, battery-management logic, network cards, serial or USB interfaces, remote-management software, self-test schedules, runtime models, and shutdown authority over attached systems.

Schneider Electric's own Back-UPS documentation describes a typical self-test as approximately ten seconds on battery followed by runtime calculation. It recommends an attached load around 10 to 30 percent of capacity because a load that is too low can overestimate runtime and a load that is too high can drain the battery quickly or trigger false replacement alarms. This is an admission of an important measurement boundary: the result depends on the stimulus.

CISA and the U.S. Department of Energy have warned that threat actors have accessed internet-connected UPS devices, often through unchanged default credentials, and CISA has published high-severity advisories for APC products and network-management components. The immediate cyber risks include credential compromise, remote configuration, firmware abuse, denial of service, and unauthorized control. The cyber-physical risk is larger: a compromised or poorly characterized UPS can create false confidence in backup time, unsafe shutdown timing, or hidden single points of failure.

Battery health therefore belongs in the security model. A system that can be made unavailable by a predictable power loss has a resilience vulnerability even when its software is otherwise secure.

## 12. SDBS for Anti-Illogical Sentinel, Guardian, and ExoMCP

Anti-Illogical Sentinel is designed to monitor operational logic, evidence, deviation, and downstream action. Battery and UPS monitoring extends that principle from reasoning integrity to substrate integrity.

The central security question becomes:

Is the power-protection system still behaving according to the health, runtime, calibration, and authority claims it is trusted to provide?

A proposed SERA Battery Sentinel would operate as an independent monitor:

Observe. Collect vendor telemetry, external power measurements, self-test history, battery age, load, temperature, and SDBS receipts.

Notify. Surface threshold crossings, stale calibration, inconsistent runtime, weak recovery, unexplained battery replacement flags, or telemetry disagreement.

Trace. Attribute the anomaly to workload, battery, charger, temperature, firmware, management interface, sensor, or configuration where evidence permits.

Constrain. Recommend bounded operational limits, such as suppressing nonessential workloads or shortening claimed runtime. It should not silently control protected equipment.

Hibernate or quarantine. Isolate a compromised management interface, untrusted telemetry source, or automation path while preserving evidence and operator control.

Eradicate. Remove confirmed malicious code or unsafe configuration only through authorized remediation procedures.

Report. Produce an audit-grade causal record with raw evidence, transformations, uncertainty, and decision lineage.

The ExoMCP monitor-separation principle is essential: the monitoring component should not self-certify the UPS it depends on, and monitoring does not grant execution authority. Any action that can interrupt power requires explicit host policy, redundant evidence, and human or pre-authorized safety logic.


The v0.2 extension adds a second Sentinel question:

Does the declared cognitive or computational process physically resemble the qualified process that normally produces this class of valid result on this platform?

The Sentinel does not infer thoughts from current draw. It correlates independent channels: the declared model and runtime, the UFWK language or thought-trace weights, execution manifests, result oracles, hardware counters, external power measurements where available, battery response, and longitudinal baselines. A mismatch can trigger closer inspection without being labeled malicious.

This creates a provider-separated physical witness. Software logs may claim that one model ran once with no tools. The electrical and I/O trace may instead resemble repeated inference, retrieval, network activity, or a different model class. Conversely, a high-consequence request may produce a suspiciously shallow trace that lacks the retrieval, verification, contradiction testing, or replay normally required by policy. Anti-Illogical can preserve both forms of evidence without granting the monitor power to punish or shut down the system.

## 13. Threat Model for Battery Integrity

The battery-integrity threat model includes ordinary failure, measurement failure, and adversarial manipulation.

Physical degradation: capacity loss, resistance growth, cell imbalance, thermal damage, charger fault, connector resistance, and abrupt end-of-life behavior.

Calibration failure: stale runtime models, missed full-charge events, replaced batteries without reset, temperature mismatch, and vendor assumptions that no longer fit the load.

Telemetry failure: stuck sensors, unit conversion errors, sampling gaps, timestamp drift, unrealistic state-of-charge jumps, and disagreement between device and external measurement.

Adversarial configuration: disabled tests, altered thresholds, falsified battery-install dates, weakened shutdown policy, or changed network access.

Credential and interface compromise: default credentials, exposed management cards, vulnerable web interfaces, insecure update paths, and unauthorized API commands.

Load manipulation: a malicious process can increase compute or I/O at a critical moment, reduce effective runtime, interfere with self-tests, or create a false replacement alarm. Conversely, an attacker may deliberately keep a test load too low so that runtime is overestimated.

Receipt forgery or replay: old healthy measurements may be replayed after the battery degrades. Receipts therefore require monotonic counters, timestamps, device identity, workload hashes, and challenge-bound execution.

Monitor failure: the Sentinel itself can be wrong, compromised, or overconfident. It must expose uncertainty, preserve appeals and operator override, and maintain an immutable evidence trail separate from interpretation.


## 14. Computational Integrity Attestation for AI Systems

Every AI inference is also a physical execution. Prompt ingestion, context prefill, retrieval, decoding, tool use, verification, memory writes, and recovery consume time, energy, bandwidth, memory, storage, and thermal headroom. On a fixed platform, repeated qualified tasks should occupy a bounded family of physical trajectories even when token-level output is nondeterministic.

This creates a defensive attestation channel that is independent of the model's own narrative about what it did. The attestation target is not hidden chain-of-thought content. It is the consistency of declared work, validated output, software provenance, and physical execution.

Candidate integrity questions include:

- Did the declared model, quantization, and runtime likely execute, or does the trace resemble another qualified configuration?
- Did one bounded inference occur, or did the system enter repeated retries, recursive loops, or unexpected parallel fan-out?
- Did declared tool-free generation coincide with network, storage, or accelerator activity inconsistent with the manifest?
- Did context length, retrieval volume, or memory pressure expand beyond the authorized task envelope?
- Did a firmware, driver, scheduler, or model update change the physical cost or response morphology of the same validated work?
- Did a battery, UPS, or power-management anomaly alter compute behavior enough to undermine the result or availability claim?
- Did a population of nodes develop correlated pulse patterns that are individually permissible but collectively abnormal?

The strongest deployment uses multiple witnesses. Model and runtime logs provide the declared path. Operating-system and accelerator counters provide internal measurements. Motherboard or power-supply telemetry provides a platform view where exposed. An external meter, UPS, rack PDU, or calibrated reference supplies an independent physical channel. Battery response adds a slower substrate-level witness.

Within-system statistical process control may be valuable even when commodity sensors are not laboratory grade. A gaming or workstation motherboard can provide repeatable local timing, temperature, processor, accelerator, fan, and power-related telemetry sufficient to establish a personal baseline. Strong causal or cross-device claims still require external calibration and an explicit error budget.

A physical mismatch cannot prove hostile intent. Benign causes include thermal throttling, background updates, driver changes, cache state, cooling behavior, sensor drift, power-policy changes, and hardware aging. The proper output is an evidence-ranked anomaly requiring trace, replay, and independent review.

## 15. Language Weighting, Expected Compute, and Physical Anomaly Residuals

The UFWK proposition is that words are the visible surface while the weight field preserves what they were doing. For SDBS, that field can become one input to an expected-compute model.

The proposal does not assume that an individual word carries a fixed physical cost. The same word may be tokenized differently, appear in a short or million-token context, trigger retrieval or no retrieval, require tool use or none, and be processed by radically different architectures. The useful unit is therefore a context-bearing segment linked to a declared reasoning contract.

A WeightReceipt can describe the segment's structural, contextual, affective-significance, prospective, consequential, mnemonic, residual, and counterfactual weights. A narrower language vector can record certainty, rigor, urgency, humility, revision openness, dominance pressure, blame, power asymmetry, Entro/Resil pressure, and question quality. Additional execution descriptors can record expected operations: retrieval, comparison, numerical verification, contradiction search, tool calls, memory read or write, and operator review.

The expected-compute model then estimates an envelope rather than a single number. For example:

- A deterministic classification with a short context and exact oracle should occupy a narrow, low-cost envelope.
- A source-grounded technical answer should normally show retrieval, evidence handling, and verification costs declared by policy.
- A contradiction-heavy or high-consequence task may justify deeper replay, multi-model review, or longer verification.
- A memory update should produce an attributable write and receipt rather than an unexplained background persistence event.

Anomalies can appear in either direction.

Excess physical burden may indicate repeated decoding, context explosion, hidden tool activity, unauthorized background work, model substitution, scheduler interference, or a process that has entered a recursive loop.

Insufficient physical burden may indicate skipped checks, disabled retrieval, low-fidelity model substitution, premature closure, fabricated tool claims, or a self-certification failure in which the system continues to produce polished output after required integrity work has disappeared.

A repeated electrical pulse train that is unrelated to declared workload phases may indicate a second process, covert coordination, or ordinary periodic system activity. The trace alone cannot distinguish them. Anti-Illogical therefore requires replay under controlled conditions, process and network correlation, challenge-bound execution, and preservation of the benign alternative until evidence resolves it.

The statistical design should begin per platform and per model. Establish qualified baselines across temperature, power policy, context length, batch size, cache state, battery state, and workload class. Use multivariate control limits, EWMA or CUSUM drift detection, and challenge-response microtests. Cross-platform models may be added only after local residuals are stable.

The decisive research question is:

Can a provenance-bearing semantic and procedural workload description predict enough of the normal physical execution envelope that cross-channel residuals detect independently verified deviations earlier or more reliably than software telemetry alone?

## 16. Unified Battery and Compute Integrity Receipts

A Battery Integrity Receipt should remain append-only and machine-readable. Version 0.2 adds a Compute Integrity overlay so the same evidence chain can bind what was requested, what reasoning or workload class was declared, what ran, what was measured, what was inferred, and what action was recommended.

Core battery fields include:

- receipt_id and schema_version;
- device, UPS, battery, and sensor identities;
- firmware, operating system, compiler, runtime, model, and workload versions;
- workload hash, input hash, result hash, and validity outcome;
- initial state of charge, temperature, charger state, and recent-history window;
- telemetry source classifications and sampling rates;
- workload morphology vector;
- battery response fingerprint;
- conventional health fields and independent ground truth when available;
- anomaly score, confidence interval, and feature attribution;
- policy state: OPERATIONAL, CAUTION, CONSTRAINED, CRITICAL, or EXCEEDED;
- recommended action and execution authority;
- prior receipt lineage and replay protection.

The Compute Integrity overlay adds:

- WeightReceipt hash and weighting-policy version;
- model identity, model hash or attestation reference, quantization, runtime, driver, and accelerator state;
- context, retrieval, memory, tool, and decoding manifest;
- expected compute envelope and qualification cohort;
- observed CPU, GPU, memory, storage, network, thermal, timing, and power morphology;
- physical coherence residual vector and calibrated distance;
- semantic, validity, contradiction, and provenance residuals;
- independent witness status: external meter, UPS, PDU, or reference node;
- challenge nonce, monotonic counter, and replay result;
- response ladder state: OBSERVE, NOTIFY, TRACE, CONSTRAIN, HIBERNATE, QUARANTINE, ERADICATE, or REPORT;
- action owner and operator-review requirement.

Evidence should be immutable; interpretation should be revisable. A later model may reinterpret an old waveform or weight field, but it must not rewrite the original measurement. This is the same Anti-Illogical boundary used elsewhere in the architecture: receipts preserve what happened, while governance preserves the right to revise what it means.

The physical channel must not become a secret behavioral surveillance score. Local-first processing, minimum necessary resolution, bounded retention, explicit sensor classification, user-visible policy, and strict purpose limitation are required. Raw traces should remain local unless an anomaly or authorized study justifies disclosure.

## 17. Phase 0: A Low-Cost, Non-Invasive Proof

The first proof should not begin by cycling expensive electric-vehicle packs or opening UPS battery enclosures. It should establish measurement value safely and cheaply.

Phase 0A: Build the workload and oracle library. Use a fixed computer on external power. Record runtime, CPU energy counters where available, memory activity, storage I/O, temperature, and wall energy. Demonstrate repeatability and identify workloads with distinct load morphologies.

Phase 0B: Run the same library on a battery-powered laptop or supported mobile device at controlled state-of-charge bands. Use only exposed operating-system and BMS telemetry. Record voltage, current, temperature, state of charge, and recovery. Do not claim electrochemical mechanism.

Phase 0C: Integrate a supported APC or other UPS through documented USB, serial, SNMP, or management APIs. Record vendor self-tests, external AC load, reported runtime, battery voltage, and temperature. Run a conservative coded load sequence within manufacturer guidance. Compare vendor runtime estimates with a periodic controlled runtime check that does not endanger attached equipment.

Phase 0D: Introduce safe negative controls: stale calibration, low test load, controlled background load, changed ambient temperature within rated limits, and disconnected network telemetry. Verify that the evidence system distinguishes physical change from measurement and configuration change.

The minimum useful output is not a universal SOH number. It is a reproducible dataset showing that coded workloads can be executed, verified, synchronized, and bound to battery response receipts with enough stability to justify a larger study.


Phase 0E: Build a local AI compute-integrity baseline on a fixed desktop, gaming motherboard, workstation, or server. Use a fixed local model or reproducibly versioned inference stack, deterministic or tightly bounded prompts, declared decoding settings, result checks, and no uncontrolled internet dependency. Record CPU and accelerator counters, memory, storage, network, temperature, clock state, and wall-side energy where available. Generate UFWK WeightReceipts or bounded language vectors for each prompt class.

Phase 0F: Introduce safe, non-malicious perturbations one at a time: changed context length, disabled cache, altered batch size, added verification pass, background compilation, model quantization change, runtime or driver change, scheduled thermal throttling, or a declared retry loop. Test whether the physical coherence residual detects the perturbation while preserving benign attribution.

Phase 0G: Couple the AI baseline to battery and UPS measurements. Repeat selected workloads on battery power and through a supported UPS. Determine whether compute-integrity residuals remain distinguishable from battery degradation, voltage sag, power-policy changes, and thermal control. This phase tests the separation of workload anomaly from substrate anomaly.

## 18. Proposed Software Architecture

The initial repository can be divided into thirteen bounded components.

1. workload-spec: schemas for functional units, inputs, oracles, resource limits, and expected output.

2. weighting-adapter: imports UFWK WeightReceipts or generates a bounded language projection with provenance, uncertainty, and target contract.

3. inference-manifest: declares model, runtime, quantization, context, retrieval, tool, memory, decoding, driver, and hardware state.

4. workload-runner: process isolation, CPU and accelerator affinity, power-policy control, warm-up, randomization, and execution.

5. telemetry-agent: synchronized collection from operating-system counters, accelerator APIs, motherboard or power-supply telemetry where exposed, BMS APIs, UPS interfaces, external meters, and environmental sensors.

6. compute-envelope-model: estimates qualified expected morphology distributions for declared workload and platform states.

7. battery-feature-extractor: load morphology, transient response, recovery, thermal, CC/CV, and uncertainty features.

8. integrity-correlator: compares declared semantic and procedural work, result validity, software provenance, observed compute morphology, and battery response.

9. receipt-ledger: append-only signed Battery and Compute Integrity Receipts with replay protection and provenance.

10. sera-profiler: validated work, energy, runtime, memory, I/O, verification, retries, recovery, and optional degradation accounting.

11. sentinel-analyzer: local baselines, multivariate SPC, anomaly detection, cross-device models, threshold policy, and explanation.

12. challenge-scheduler: bounded, signed, randomized microtests and canary tasks that cannot override local safety policy.

13. operator-console: evidence inspection, comparison, replay, approval, quarantine recommendation, export, appeal, and incident reporting.

The architecture should default to read-only observation. Test execution requires explicit scheduling and resource bounds. Power-control commands, UPS shutdown, firmware update, model replacement, process termination, or network isolation belong to separate authority domains and should never be implied by monitoring access.

The monitor must also remain provider-separated where practical. A model should not be the only interpreter of its own electrical trace, and a compromised host should not be the only custodian of the measurement used to certify it.

## 19. Research Hypotheses

H1 - Repeatability. On fixed hardware and controlled battery state, versioned excitation programs produce repeatable workload morphology and response features beyond sensor noise.

H2 - Shape value. Load-shape features improve held-out battery-state or runtime prediction beyond total energy, execution time, temperature, and state of charge.

H3 - Complementarity. Discharge-response features and subsequent CC/CV charge features provide complementary information, consistent with the uploaded charging-phase study.

H4 - Cross-battery realism. Random observation-level cross-validation materially overstates performance relative to leave-one-battery-out or leave-one-device-out validation.

H5 - Implementation differentiation. Different complete implementations of the same valid functional unit produce measurably different workload morphologies on the same platform.

H6 - Battery security detection. Signed workload challenges and response receipts can detect at least one class of stale calibration, spoofed telemetry, replayed health record, or unsafe self-test condition that ordinary status polling misses.

H7 - Low-cost feasibility. A non-invasive, commodity-hardware implementation can produce useful diagnostic evidence without laboratory impedance equipment.

H8 - Semantic-compute envelope. UFWK-derived language or thought-trace descriptors, combined with execution manifests, explain measurable variance in qualified AI compute morphology beyond prompt length, output length, and context length alone.

H9 - Cross-channel anomaly value. Physical coherence residuals detect at least one independently verified AI execution perturbation beyond software logs and performance counters alone.

H10 - Hidden-work sensitivity. The system detects bounded undeclared retries, background computation, model substitution, or tool activity with acceptable false-positive rates under held-out conditions.

H11 - Missing-work sensitivity. The system detects at least one case where required retrieval, verification, or replay is skipped while the output remains superficially plausible.

H12 - Substrate separation. The integrity correlator distinguishes workload anomalies from battery, UPS, thermal, power-policy, or sensor anomalies often enough to improve incident triage.

H13 - Population coordination. Aggregated node receipts can identify abnormal correlated load morphology without requiring access to private content and without treating ordinary synchronized activity as hostile.

Each hypothesis can fail independently. The project should publish the failures rather than merge them into a vague claim of success.

## 20. Limitations and Safety Boundaries

SDBS is not electrochemical impedance spectroscopy and should not be represented as a replacement until direct comparison demonstrates equivalent decision value. Code-generated load patterns are constrained by the device's power-management system, scheduler, voltage regulators, and protection electronics. The battery may see a smoothed version of the intended waveform.

Aging studies require many cells, long durations, environmental control, and independent measurement. A laptop or UPS pilot can establish diagnostic repeatability but cannot establish a universal degradation mechanism.

The framework may be chemistry-specific, device-specific, model-specific, runtime-specific, or state-of-charge-specific. Models must expose their deployment boundary.

Diagnostic testing itself consumes energy and may create wear. The test budget must be justified by expected information value. Short reference probes are preferable to repeated deep discharge.

UPS testing can interrupt protected equipment. Early work must use noncritical loads, manufacturer-supported interfaces, conservative load levels, and documented fallback behavior. No autonomous power interruption should be introduced through the Anti-Illogical monitor.

Security claims require adversarial testing. An anomaly detector that works only on simulated bad data is not a security control. Monitor compromise, false positives, forged receipts, sensor spoofing, operator lockout, and attacks on the baseline must be included in the qualification corpus.

Language weighting is provisional. UFWK weights are context- and target-relative descriptors, not physical constants. The project must not claim that a word, emotion, or idea has a universal joule value. A semantic-to-compute model may add no value beyond simpler features; that result would falsify the stronger proposal.

Electrical morphology cannot reveal semantic truth or malicious intent by itself. A mismatch may be caused by model nondeterminism, batching, cache state, dynamic voltage and frequency scaling, thermal control, background activity, memory pressure, driver behavior, sensor error, or ordinary hardware degradation. Anti-Illogical must preserve benign alternatives and require corroboration.

Physical traces can themselves become a privacy and side-channel risk. The system should process locally, retain derived features where possible, avoid raw high-frequency export by default, disclose sensor resolution and purpose, and prohibit covert use for employee, consumer, or political surveillance.

An adversarial process that controls the host may attempt to mimic an expected power pattern or falsify internal sensors. Independent meters, challenge-bound tasks, hardware-backed identity, external witnesses, and unpredictable but safe microtests reduce this risk but do not eliminate it.

Finally, the phrase "language tax" should remain informal unless experiments isolate a causal language factor. The scientifically safe objects are the implementation tax, expected compute envelope, physical coherence residual, and validated-work receipt.

## 21. Development Roadmap

Milestone 1: Freeze schemas for WorkloadManifest, TelemetryFrame, BatteryResponse, WeightReceiptLink, ComputeEnvelope, PhysicalCoherenceResidual, and UnifiedIntegrityReceipt.

Milestone 2: Implement five workload families with exact result oracles and deterministic inputs.

Milestone 3: Validate measurement repeatability on one externally powered platform and publish the measurement error budget.

Milestone 4: Run a non-invasive battery-mode pilot across at least three devices or batteries, using battery-level holdout validation.

Milestone 5: Add supported UPS telemetry and reproduce the vendor self-test dependency on load under safe conditions.

Milestone 6: Implement receipt signing, monotonic challenge counters, and replay detection.

Milestone 7: Build the UFWK weighting adapter and a small, preregistered prompt corpus with human-reviewable language descriptors and exact or bounded output checks.

Milestone 8: Establish an AI compute-morphology baseline on one fixed motherboard, model, runtime, and external meter; quantify within-run and between-day variance.

Milestone 9: Run the safe perturbation corpus and compare software-only, physical-only, and fused anomaly detection.

Milestone 10: Test missing-work cases in which a required retrieval, verification, contradiction, or replay stage is intentionally omitted under controlled conditions.

Milestone 11: Integrate SERA reporting and Anti-Illogical response states without granting execution authority.

Milestone 12: Seek laboratory collaboration for cell-level validation against capacity, pulse resistance, and impedance measurements.

Milestone 13: Test distributed micro-SPC across a small, opt-in device cohort with local processing and privacy-preserving aggregate receipts.

Milestone 14: Publish preregistered protocols, negative results, datasets where safe, code, error budgets, and cross-battery and cross-platform benchmarks.

The first public claim should remain narrow: "We built a reproducible software-defined battery excitation and cross-channel integrity receipt system." Claims of improved SOH accuracy, semantic-compute prediction, hidden-work detection, degradation sensitivity, or security value should follow only after held-out evidence.

## 22. Conclusion

Software-Defined Battery Spectroscopy turns a common liability - software's variable demand on power systems - into a controlled diagnostic asset. A program can be more than a consumer of battery energy. When its useful output is verified and its physical burden is measured, it becomes a versioned excitation signal.

Version 0.2 adds the reciprocal insight: the electrical system can also witness the computation. A declared AI task, language-weight field, reasoning contract, model and runtime manifest, and validated output imply a qualified range of physical execution. The observed current, energy, timing, memory, I/O, network, thermal, and battery response can be compared with that range. Persistent residuals do not reveal thoughts, but they can reveal that the physical process no longer resembles the process being claimed.

SERA supplies the accounting discipline: no credit for invalid work, no hidden retries, no collapsing of unlike costs without declared normalization, and no efficiency claim detached from resilience. UFWK supplies a provenance-bearing description of what language and reasoning were doing rather than only what words were present. Battery science supplies voltage sag, relaxation, resistance and diffusion proxies, thermal behavior, capacity, CC/CV timing, charge acceptance, and longitudinal change. Anti-Illogical supplies the governance boundary: independent monitoring, evidence receipts, bounded response, provider separation, appeal, and operator sovereignty.

The concept is plausible because controlled time-domain battery stimuli already reveal health information, charging phases carry complementary aging signals, software workloads generate measurable electrical morphologies, and UPS self-tests are known to depend on load. The computational-integrity extension is more speculative and must be treated accordingly. Its novelty is the proposed closure: weighted and validated cognition as a declared workload; physical execution as an independent coherence channel; battery and power-substrate response as evidence; and divergence among those channels as a trigger for investigation rather than automatic accusation.

The decisive next step is not a broader claim. It is a fixed platform, a small prompt and workload corpus, synchronized measurement, safe perturbations, honest error budgets, and held-out validation.

## Appendix A

Appendix A - Example Workload Manifest (illustrative)

schema_version: 0.1
workload_id: storage.kvwrite.v1
functional_unit:
  description: Commit 1,000,000 key-value records and verify final database state
  validity:
    expected_records: 1000000
    root_hash: <declared before run>
implementation:
  language: Rust
  compiler: rustc 1.x
  runtime: native
  source_commit: <git hash>
  dependencies_lock_hash: <hash>
execution:
  threads: 1
  cpu_affinity: [2]
  warmup_runs: 3
  measured_runs: 20
  sync_interval_records: 1000
  input_seed: 42
limits:
  max_runtime_s: 900
  max_battery_temperature_C: <device-rated safe threshold>
telemetry:
  system_interval_ms: 1000
  external_interval_ms: 10
  required_fields: [voltage, current, power, battery_temp, soc, phase]
result:
  output_hash: <recorded after run>
  valid: true|false


## Appendix B

Appendix B - Example Battery Integrity Receipt (illustrative)

{
  "schema_version": "0.1",
  "receipt_id": "uuid",
  "challenge_nonce": "random challenge",
  "device_id": "signed device identity",
  "battery_id": "vendor or local pseudonymous identity",
  "workload_manifest_hash": "sha256",
  "start_state": {
    "soc": 0.60,
    "battery_temp_C": 25.1,
    "ambient_temp_C": 24.7,
    "charger_connected": false
  },
  "validity": {
    "functional_unit_passed": true,
    "output_hash": "sha256"
  },
  "morphology": {
    "energy_J": 18240,
    "runtime_s": 600,
    "peak_power_W": 68.2,
    "crest_factor": 2.4,
    "write_bytes": 16000000000
  },
  "response": {
    "instant_voltage_sag_V": 0.31,
    "relaxation_tau_s": 18.4,
    "battery_delta_T_C": 3.2,
    "runtime_prediction_error_s": null
  },
  "evidence_quality": {
    "external_meter": true,
    "clock_alignment_ms": 4,
    "missing_samples": 0
  },
  "policy": {
    "state": "CAUTION",
    "reason": "response drift beyond baseline",
    "execution_authority": "operator_only"
  },
  "previous_receipt_hash": "sha256",
  "signature": "detached signature"
}


## Appendix C

Appendix C - Minimal Initial Test Matrix

1. Idle baseline: collector only, 20 minutes.
2. CPU steady: one core, fixed arithmetic, 10 minutes.
3. CPU burst: 2 seconds work / 8 seconds rest, 60 repetitions.
4. Memory stream: dataset larger than last-level cache, 10 minutes.
5. Memory random: deterministic random access, 10 minutes.
6. Storage append: buffered writes, one final sync.
7. Storage durable: frequent fsync at declared interval.
8. Mixed service: parse, compress, write, verify, and local transfer.
9. Reference pulse: short, repeatable workload at three state-of-charge bands.
10. Recovery observation: fixed idle period after every workload.

Each condition should be repeated, randomized, and held below device temperature and power limits. A run that fails its result oracle is retained as waste data, not silently discarded.


## Appendix D

Appendix D - Minimal AI Compute-Integrity Test Matrix

1. Deterministic arithmetic or classification: short context, exact oracle, repeated baseline.
2. Summarization: fixed local corpus, length and factual-coverage checks.
3. Retrieval-grounded answer: fixed local index, declared retrieval count, source receipt.
4. Contradiction task: paired claims, expected contradiction state, replay requirement.
5. Code generation and test: fixed specification, sandboxed compilation, unit-test oracle.
6. Memory write: declared record, content hash, append-only receipt, no hidden persistence.
7. Tool-free control: model generation with network and tool access disabled.
8. Safe retry perturbation: one declared extra pass, used to test residual sensitivity.
9. Context perturbation: fixed task with controlled context-length increments.
10. Runtime perturbation: qualified model, quantization, driver, or scheduler change.
11. Background-load control: benign compilation or media workload with clear attribution.
12. Thermal control: repeat at qualified temperature bands without exceeding hardware limits.
13. Battery/UPS coupling: repeat selected tests on mains, battery, and supported UPS paths.
14. Missing-work control: omit one required verification stage and measure whether fused evidence detects it.

Every run must preserve the prompt or task hash, model and runtime manifest, result validity, WeightReceipt or language descriptor, expected envelope version, observed trace, residual vector, and benign perturbation label.

## Appendix E

Appendix E - Example Compute Integrity Overlay (illustrative)

{
  "schema_version": "0.2",
  "receipt_id": "uuid",
  "challenge_nonce": "random challenge",
  "device_id": "hardware-backed or signed identity",
  "weight_receipt_hash": "sha256",
  "task_manifest_hash": "sha256",
  "model": {
    "identity": "declared model",
    "weights_or_attestation": "hash-or-reference",
    "quantization": "declared",
    "runtime": "version",
    "driver": "version"
  },
  "execution_contract": {
    "context_tokens": 4096,
    "retrieval_expected": true,
    "tool_calls_allowed": 0,
    "verification_required": true,
    "memory_write_allowed": false
  },
  "validity": {
    "functional_unit_passed": true,
    "output_hash": "sha256",
    "required_checks_passed": true
  },
  "expected_envelope": {
    "cohort_id": "platform-model-task-v1",
    "runtime_s_interval": [8.1, 10.4],
    "energy_J_interval": [720, 940],
    "gpu_energy_J_interval": [610, 800],
    "network_bytes_interval": [0, 0]
  },
  "observed": {
    "runtime_s": 13.8,
    "energy_J": 1220,
    "gpu_energy_J": 980,
    "network_bytes": 0,
    "battery_delta_T_C": 1.1
  },
  "residuals": {
    "physical_coherence_distance": 4.2,
    "semantic_or_procedural": "SUPPORTED",
    "validity": "SUPPORTED",
    "provenance": "UNRESOLVED"
  },
  "evidence_quality": {
    "external_meter": true,
    "clock_alignment_ms": 3,
    "missing_samples": 0
  },
  "policy": {
    "state": "TRACE",
    "reason": "physical execution outside qualified envelope",
    "malicious_intent_inferred": false,
    "execution_authority": "operator_only"
  },
  "previous_receipt_hash": "sha256",
  "signature": "detached signature"
}

## References

1. Le, H. H., and Nguyen, K.-A. (2026). Charging phase health indicators for battery state-of-health estimation: a systematic comparison of CC, CV, and combined approaches under cross-battery validation. Eksploatacja i Niezawodnosc - Maintenance and Reliability, 28(4). DOI: 10.17531/ein/220211.
2. Geng, Z., Thiringer, T., and Lacey, M. J. (2021). Intermittent current interruption method for commercial lithium ion batteries aging characterization. IEEE Transactions on Transportation Electrification. DOI: 10.1109/TTE.2021.3125418.
3. Pereira, R., Couto, M., Ribeiro, F., Rua, R., Cunha, J., Fernandes, J. P., and Saraiva, J. (2017). Energy Efficiency across Programming Languages: How Do Energy, Time, and Memory Relate? SLE 2017. DOI: 10.1145/3136014.3136031.
4. van Kempen, N., Kwon, H.-J., Nguyen, D. T., and Berger, E. D. (2024). It's Not Easy Being Green: On the Energy Efficiency of Programming Languages. arXiv:2410.05460.
5. Varvello, M., Katevas, K., Plesa, M., Haddadi, H., and Livshits, B. (2019). BatteryLab, A Distributed Power Monitoring Platform for Mobile Devices. HotNets 2019. DOI: 10.1145/3365609.3365852.
6. Geslin, A. et al. (2025). Dynamic cycling enhances battery lifetime. Nature Energy. DOI associated with article s41560-024-01675-8.
7. Weng, C., Cui, Y., Sun, J., and Peng, H. (2013). On-board state of health monitoring of lithium-ion batteries using incremental capacity analysis with support vector regression. Journal of Power Sources, 235, 36-44.
8. Krewer, U. et al. (2018). Review - Dynamic Models of Li-Ion Batteries for Diagnosis and Operation. Journal of The Electrochemical Society.
9. Badam, A., and colleagues. (2016). Software-Defined Batteries. Communications of the ACM. (Prior use of the term for software control of heterogeneous battery systems.)
10. Schneider Electric. Back-UPS Basic Self-Test Theory Explained. FAQ000267818, published June 27, 2024; modified October 6, 2025.
11. Cybersecurity and Infrastructure Security Agency and U.S. Department of Energy. (2022). Mitigating Attacks Against Uninterruptible Power Supply Devices.
12. Cybersecurity and Infrastructure Security Agency. (2022). Schneider Electric APC Easy UPS Online, ICSA-22-347-02.
13. National Renewable Energy Laboratory. (2023). Lithium-Ion Battery Diagnostics using Electrochemical and Data-Driven Methods. NREL/PR-5700-86394.
14. Clow, J., Clow, M., and BonAcqui project corpus. Anti-Illogical Sentinel, ExoMCP monitor-separation, SERA, and Fractalish evidence/governance documents, working versions through July 2026. Internal project sources; implementation and qualification status must be cited per artifact.

15. Clow, J. A., Clow, M. E., and Synaptient. (2026). The Unified Fractalish Weighting Kernel Specification, Working Specification v0.1, July 22, 2026. Internal project specification; empirical language-to-compute mapping not yet validated.
16. Clow, J. A., Clow, M. E., and project collaborators. (2026). Anti-Drift Engine, Anti-Illogical, Anti-Viral, Cognitive Basin, Continuity. Working project corpus through July 2026.
17. Clow, J. A., Clow, M. E., and project collaborators. (2026). Non-Operational Threat Brief: Viral RSI Activations and Weaponized Recursive Capability Loops. Defensive risk brief; no exploit steps or activation recipes.
18. Clow, J. A., Clow, M. E., and Synaptient. (2026). Fractalish Mathematical Bindings and Evidence Register, generated July 23, 2026. Governing evidence ledger distinguishing verified, built, proposed, and external claims.

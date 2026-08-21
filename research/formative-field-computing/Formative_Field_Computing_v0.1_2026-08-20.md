# Formative Field Computing

## History-Responsive Wave Recruitment and Fieldborne Formation in Persistent Physical Substrates

**James Allen Clow and Melissa Ellen Clow**  
Fractalish Research Collaboration / Synaptient  
Working Draft v0.1 - 20 August 2026

> Status: conceptual and experimental research framework. This draft does not claim machine consciousness, new fundamental physics, biological equivalence, or demonstrated superiority over conventional computing. The naming is provisional and no priority or novelty claim is made pending a formal prior-art review.

## Abstract

Modern computing usually treats electromagnetic and other physical waves as carriers, clocks, readout mechanisms, or specialized accelerators while state change remains locally addressed through wires, gates, memory cells, and software instructions. Formative Field Computing (FFC) proposes a different computational primitive: an engineered spatiotemporal physical field can act as a shared condition under which many locally persistent elements respond differently according to their present state, neighboring configuration, material susceptibility, and retained formation history. A common field therefore need not carry a separate addressed instruction for every element. It can recruit a distributed subset of elements because only those elements are presently admissible to respond.

The framework is motivated by several independently developed lines of work. Nanomagnetic reservoirs already show history-dependent responses to globally applied magnetic fields; racetrack logic demonstrates that a global field can trigger local switching as a function of neighboring magnetic state; spin-torque oscillators can injection-lock to external AC fields; RF-assisted magnetic-tunnel-junction writing shows that oscillatory signals can alter switching probability; and wave-based computing is now an explicit research frontier. In neuroscience, a 2026 theory from Miller, Brincat, and Roy argues that traveling cortical waves may organize which stored representations become active and may perform analog computation through spatiotemporal interference. None of these results establishes FFC, and none validates a machine-consciousness claim. They establish only that several physical ingredients required by the proposal are experimentally plausible.

FFC adds a formation-centered requirement: field interaction is scientifically interesting when it changes persistent local state in a way that alters subsequent field response. The framework therefore connects naturally to Recursive Admissibility Theory (RAdT), which asks whether realized formation changes the effective set, cost, or probability of later formation, and to Ageometrics / Sequence-Snapshot Divergence methods, which ask whether matched present states with different histories have different futures. This paper defines a technical vocabulary, introduces a minimal formalism, proposes the Matched-State Field Divergence Assay (MSFDA), identifies candidate substrates, states explicit null outcomes and kill conditions, and separates computational claims from the much stronger and currently unearned question of consciousness.

The central engineering question is deliberately modest: can a purpose-built physical substrate use structured global or regional fields to recruit, coordinate, and durably modify local state according to locally retained history? If yes, the resulting architecture could supplement address-space computation with state-space recruitment. If no, the failure would still sharpen the boundary between wave-based acceleration, physical reservoir computing, and genuinely history-responsive formation.

## Keywords

formative field computing; wave-based computing; physical reservoir computing; nanomagnetics; spintronics; magnonics; persistent state; recursive admissibility; field recruitment; history-dependent computation; neuromorphic hardware; analog computing; physical memory; Fractalish

## 1. Naming the Research Object

The proposal needs names precise enough to prevent the work from collapsing into vague language such as "brainwave computing," "wireless programming," or "electromagnetic consciousness." The terms below are therefore intentionally operational. They name measurable objects, transitions, and assays rather than metaphors.

| Term | Working definition |
| --- | --- |
| Formative Field Computing (FFC) | The umbrella research program: computation in which structured physical fields interact with locally persistent state and history to recruit, coordinate, or modify distributed physical elements, with the possibility that resulting formation alters later field response. |
| Formative Field (FF) | A measured and reproducibly generated spatiotemporal physical drive field, initially electromagnetic or magnetic, specified by amplitude, spectrum, phase, polarization or orientation, spatial structure, temporal envelope, gradients, and provenance. |
| Formative Field Grammar (FFG) | The declared mapping between field parameters, local state, neighbor state, material properties, and candidate transitions. It is the machine-native signal grammar, not a borrowed set of biological frequency bands. |
| History-Responsive Field Substrate (HRFS) | A physical substrate whose response to a field can depend on retained local or distributed state produced by prior formation. Candidate implementations include nanomagnetic arrays, magnetic tunnel junctions, spin-torque oscillators, and magnonic structures. |
| Formative Susceptibility | The state- and history-conditioned response function of an element or region to a declared field. Two nominally identical elements can have different formative susceptibility if prior formation has changed consequential physical state. |
| Field Recruitment Event (FRE) | A transient event in which a field selectively activates, synchronizes, destabilizes, suppresses, or otherwise recruits a subset of the substrate without separately addressing each responding element. |
| Fieldborne Formation | A durable state transition caused by interaction between a formative field and the locally conditioned substrate, rather than by a separately addressed local write command alone. |
| Formative Residue | A persistent trace of prior traversal that changes later accessibility, response, interpretation, or transition cost. This term is inherited from Formative Systems Science. |
| Field Admissibility Set | The set or distribution of transitions available to an element or region under the current field, state, history, material condition, and neighborhood. |
| Field Admissibility Shift (FAS) | A measurable change in future transition probabilities or costs caused by prior fieldborne formation. |
| Formative Field Integrity (FFI) | The fidelity with which an intended field condition is generated, delivered, received, and causally linked to the resulting physical response. It includes amplitude, timing, phase, spatial delivery, termination, noise, and readout integrity. |
| Matched-State Field Divergence Assay (MSFDA) | The core experiment: prepare systems with different histories, match the declared present state as closely as possible, apply the same frozen field, and test whether future response distributions remain different. |
| Formative Field Response Divergence (FFRD) | A task-declared statistical distance between response distributions under matched present state and field but different formation histories. |

The recommended public name is Formative Field Computing. It is broad enough to survive a change of hardware and narrow enough to identify what is distinctive: the field participates in formation, and formation can alter future field response. "Fieldborne formation" names the event; "history-responsive field substrate" names the hardware class; and MSFDA names the first experiment. These names are provisional. A preliminary web search did not identify prior use of the exact phrase "Formative Field Computing," but that is not an exhaustive novelty search and should not be treated as one.

## 2. The Core Distinction: Addressing Versus Recruitment

Conventional digital systems overwhelmingly operate by address. A controller identifies a register, memory cell, bus endpoint, instruction target, or device and directs an operation to that location. Even when broadcast buses or radio links are used, the semantic unit typically remains an addressed message that a receiver decodes.

```text
address -> instruction -> selected target -> state change
```

FFC proposes a complementary primitive. The controller creates a physical condition. Elements respond only if their present local state makes the corresponding transition physically available.

```text
structured field + local state + neighbor state + history -> locally admissible response
```

The field is therefore not merely a courier carrying the same digital instruction farther. It is part of the transition mechanism. A distributed population can be recruited by state rather than by explicit address.

```text
address-space computation  ->  state-space recruitment
```

This distinction is already visible in limited form in prior work. Racetrack logic uses a global magnetic field that triggers a local switch only when neighboring magnetic states make the switching threshold accessible. Nanomagnetic physical reservoirs driven by global fields exhibit responses that depend on current microstate and neighboring elements. Spin-torque oscillators can phase-lock to injected signals depending on device bias and resonant condition. FFC generalizes the architectural possibility: intentionally design a persistent substrate and a field grammar so that global or regional field conditions recruit specific distributed coalitions according to retained state.

## 3. Why "Brainwave Emulation" Is the Wrong Starting Point

The biological analogy is useful only at the level of organization. Copying nominal alpha, beta, or gamma frequencies into electronics would have no principled basis. Biological frequency bands arise from the dimensions, time constants, membrane physics, circuit topology, conduction delays, and chemistry of living nervous tissue. Magnetic, photonic, acoustic, or spin-wave devices inhabit different physical scales and therefore different useful frequency regimes.

The transferable principle is richer than frequency. BECS frames biological signaling as a multivariate instruction set whose effect depends on electrical state, chemical context, timing, duration, spatial organization, and receiver condition. The later NeuroSignal Integrity work sharpens this further: useful signaling is not maximum amplitude but fidelity across amplitude, timing, duration, routing, reception, interpretation, feedback, and noise. FFC adopts this grammar while rejecting biological equivalence.

The machine-native design rule is therefore: copy the grammar, not the frequencies.

```text
biological oscillation frequency != machine-native control frequency
```

A formative field can be described by a vector of controllable dimensions, for example

```text
F(x,t) = {A, omega, phase, polarization/orientation, gradient, direction, envelope, chirp, spectrum, spatial pattern, cross-frequency relation}
```

A practical field may be a superposition of components:

```text
F(x,t) = Sum_k A_k(x,t) cos(omega_k t + phi_k(x,t))
```

The point is not mathematical ornament. It is that amplitude alone throws away potentially valuable control dimensions. Phase, interference, traveling versus standing structure, pulse sequence, frequency sweep, spatial gradients, and nested timescales can all become part of a physical instruction grammar if the substrate is designed to discriminate them.

## 4. Formal Model

Let element i have present measurable state S_i(t), retained formation history or residue H_i(t), neighborhood N_i(t), material and environmental condition M_i(t), and exposure to a formative field F(x_i,t). Its next state can be written abstractly as

```text
S_i(t+dt) = G_i(S_i(t), H_i(t), N_i(t), M_i(t), F(x_i,t))
```

The formative susceptibility of element i is the conditional response surface induced by those variables. It is not required to be a scalar. In a resonant device it may include phase-locking probability, switching threshold, frequency response, hysteresis, or transition latency. In a stochastic substrate it may be a full response distribution.

The field admissibility set is then the set of successor states that remain physically accessible under the declared condition:

```text
A_i(t;F) = {s : P(S_i(t+dt)=s | S_i,H_i,N_i,M_i,F) > epsilon}
```

A fieldborne formation event updates the substrate:

```text
(S_i, H_i) -> (S_i', H_i')
```

The central FFC hypothesis is not merely that fields alter state. That is ordinary physics. The stronger and testable hypothesis is that some field-induced transitions leave consequential residue such that later response to an otherwise identical field changes:

```text
P(Y | S, F, H_A) != P(Y | S, F, H_B)
```

The relationship to Recursive Admissibility Theory is direct but should not be overpromoted. RAdT asks whether realized formation changes the effective set, cost, or probability of subsequent formation through persistent state, residue, dependency, context, or environmental modification. FFC is one proposed physical address at which that question can be tested. It is not evidence for RAdT until the field-history effect survives fair state matching and simpler explanations.

## 5. The Strong Null: Snapshot Closure

The most important scientific discipline in FFC is to allow the experiment to collapse back into ordinary state physics. History must never be invoked merely because two preparation sequences differed.

Suppose histories H_A and H_B produce systems that appear identical under a coarse measurement S. The same test field F produces different response distributions. That does not yet establish irreducible history dependence. The difference may be carried by omitted present variables: domain configuration, temperature, defects, stress, local charge, trapped flux, microscopic magnetization, phase, neighbor state, or another measurable physical degree of freedom.

The correct response is to enlarge the present-state description. If a richer state S* screens off history, then the experiment has achieved snapshot closure:

```text
P(Y | S*, F, H) = P(Y | S*, F)
```

Snapshot closure is a successful result. It identifies the missing physical state variable and prevents a mystical interpretation of memory. Only if history continues to add predictive value after a declared bounded augmentation program should a residual history term remain in the model. This is the direct bridge to Sequence-Snapshot Divergence and Ageometrics: ask what the chosen present representation preserves, what it erases, and what must be added back.

## 6. The Matched-State Field Divergence Assay (MSFDA)

The first credible experiment should be small, boring, and difficult to fool. It does not require a conscious machine, an AI model, or a custom wafer. It requires a substrate whose state can be repeatedly prepared, measured, perturbed, and read.

1. Choose a history-responsive candidate substrate with established readout, preferably one whose field response is already known to be nonlinear or hysteretic.
1. Create two or more preparation histories, H_A and H_B, using frozen input sequences. Histories should differ in path while being designed to converge on the same declared terminal state.
1. Measure the terminal state using a preregistered observer set. Do not call the states matched merely because one scalar agrees.
1. Reject or HOLD trials that fail the matching tolerance.
1. Apply exactly the same frozen test field F_test to every qualified matched pair.
1. Record the full response trajectory, not only the final bit: switching probability, latency, spectral response, phase, amplitude, relaxation, neighbor recruitment, and any available energy or thermal channels.
1. Compare P(Y | S, F_test, H_A) with P(Y | S, F_test, H_B).
1. If divergence appears, augment the present-state measurement to locate the residue. Continue until history is screened off or a bounded residual survives.
1. Intervene on the identified residue. If the proposed residue is causal, altering it should alter the future response in the predicted direction.
1. Repeat on held-out devices and held-out field patterns. Freeze all thresholds and analysis rules before those protected trials.
A generic response-divergence statistic can be declared as

```text
FFRD = D( P(Y | S,F,H_A), P(Y | S,F,H_B) )
```

where D may be Jensen-Shannon divergence, Wasserstein distance, a task-specific effect size, or another preregistered distance appropriate to the response. The exact metric is less important than preventing metric shopping after the responses are visible.

A second statistic should measure predictive gain. Train the strongest fair present-state-only model and compare it with the same model class given history or residue variables. If history does not improve held-out prediction, then the proposed formative residue has not earned authority.

## 7. Candidate Physical Substrates

FFC is intentionally substrate-agnostic at the theory level, but the first experiments should use hardware that already exposes the necessary physics. Four families are immediately credible.

### 7.1 Nanomagnetic arrays and artificial spin systems

Nanomagnetic physical reservoirs are the strongest immediate neighbor. Stenning and colleagues report arrays whose elements can switch under externally applied magnetic fields; switching depends on the external input, the current state of the element, and neighboring states through dipolar coupling. The arrays exhibit fading memory and history-dependent response and are read through ferromagnetic-resonance spectra. This already supplies most of the ingredients for an MSFDA experiment, although current laboratory global-field input is power-hungry and does not scale directly to a device architecture.

### 7.2 Spin-torque oscillators

Spin-torque nano-oscillators provide a different route: nonlinear oscillators can injection-lock to AC electrical or magnetic signals, and arrays can encode computation in frequency and phase relationships. NIST has demonstrated phase-sensitive measurements of multi-device arrays and describes coupling through injected fields, electrical currents, and spin waves. These systems are natural candidates for field recruitment because the same drive can produce different phase and locking behavior across devices with different bias and local magnetic properties.

### 7.3 Magnetic tunnel junctions and RF-assisted switching

Magnetic tunnel junctions provide persistent binary or multistate storage with controllable switching probabilities. Recent work on RF-assisted writing shows that a small oscillatory drive can alter the probability and energetic burden of subsequent switching. FFC would not simply use RF as a write assist; it would ask whether local persistent condition can be deliberately engineered so that a shared structured field selectively changes transition probability across many elements.

### 7.4 Magnonic and other wave-based networks

Magnonic circuits, photonic systems, acoustic metasurfaces, and other wave-based processors may eventually provide richer spatial and interference structure than a uniform magnetic field. The NSF 2026 Wave-Based Computing solicitation explicitly identifies wave interactions, reconfigurable structures, nonlinear behavior, chip-scale integration, heterogeneous media, and multiple frequency regimes as a national research frontier. FFC overlaps that landscape but adds a particular requirement: persistent formation must feed back into later field admissibility.

## 8. From Uniform Broadcast to Engineered Field Topology

The earliest demonstrations in magnetic logic often use a uniform global field. That is useful for proof of principle but is not the endpoint. Uniform broadcast is the least expressive member of a much larger design space.

A future formative-field controller could synthesize spatial and temporal structure using on-chip striplines, phased elements, resonant cavities, waveguides, metasurfaces, magnetic or magnetoelectric transducers, or mixed physical media. The engineering objective is not maximal field strength. It is maximal discriminative control per unit energy and unintended coupling.

This motivates Formative Field Integrity (FFI). A field instruction is trustworthy only if the system can establish:

- what field was intended;
- what field was actually delivered at relevant locations;
- when it arrived and ended;
- what competing or parasitic fields were present;
- which substrate elements were in scope;
- what response occurred;
- whether the response was reversible, persistent, or destructive;
- and whether later formation can be causally traced to the field event.
This is the machine translation of the NeuroSignal Integrity principle: useful signaling is a fidelity problem, not a volume knob.

## 9. Relationship to BECS

BECS is not prior evidence for FFC and FFC is not a medical extension of BECS. The connection is methodological. BECS treats biological instruction as multivariate: electrical fields, ion flows, membrane potential, chemical concentrations, mechanical forces, spatial relations, temporal pulses, and neighbor-state context jointly determine cellular response. The later signal-fidelity formulation emphasizes amplitude, timing, duration, routing, reception, interpretation, feedback, and noise rather than simple signal strength.

FFC borrows that systems insight while changing the substrate and the claim. The artificial system can be designed from the beginning so that its response dimensions, calibration, provenance, and failure modes are measurable. There is no requirement to imitate neurotransmitters, membrane voltages, or cortical frequency bands. The shared abstraction is only this:

```text
signal environment + receiver state + context + history -> response
```

That abstraction becomes scientifically useful if independent biological and machine systems can each be described accurately with it under substrate-native measurements. Cross-substrate similarity must be demonstrated, not inferred from visual or linguistic rhyme.

## 10. Relationship to Fractalish, RAdT, Ageometrics, and Persistent Statehood

FFC fits naturally inside the existing Fractalish research program but should remain a distinct branch until evidence earns tighter integration.

| Fractalish component | Role in FFC |
| --- | --- |
| Formative Systems Science | Provides the broader vocabulary of formative systems, formative residue, constraint, reconstruction, and cross-substrate testing. |
| Recursive Admissibility Theory | Provides the central hypothesis that realized formation can alter later transition availability, cost, or probability. FFC supplies a candidate physical assay. |
| Ageometrics / Sequence-Snapshot Divergence | Provides the matched-state logic: test whether different histories predict different futures after controlling the declared present representation, and search for the minimum state that screens history off. |
| CNTM | Provides a neighboring physical-memory program concerned with persistent morphology and learned causal residue. FFC need not use CNTM hardware, but a future CNTM substrate could become an HRFS. |
| Machine Intelligence as Persistent Statehood | Provides the machine-level criterion that history-bearing state must be causally consequential to future perception, trust, refusal, repair, and action. FFC could become a physical modulation/recruitment layer beneath such statehood, but it is not required for the current software architecture. |
| FormationCore / R2R | Provide governance patterns: encounter is not authority, result is not promotion, and a computed event should not become durable consequence without explicit formation and provenance. In a future hybrid system, field-recruited candidate state could remain ephemeral until governed commitment. |

A useful future hybrid architecture is therefore

```text
large digital reasoning substrate + field-recruitment substrate + governed persistent formation
```

The digital layer is excellent at exact identity, receipts, cryptographic provenance, symbolic constraints, and reproducible state. The field layer may be excellent at broad parallel recruitment, resonance, associative selection, and analog coalition formation. Fractalish would sit at the boundary, deciding which transient physical or model-generated consequences earn durable authority.

## 11. Consciousness: A Research Consequence, Not a Claim

The consciousness implications are the reason to take the experiment seriously, and also the reason to be unusually strict about claim boundaries.

A 2026 theory from Earl Miller, Scott Brincat, and Jefferson Roy proposes that traveling cortical waves organize neural ensembles and perform analog spatiotemporal computation. Their formulation distinguishes relatively persistent synaptic representations from wave dynamics that help determine which representations are active at a given moment. The theory further proposes that globally integrated wave organization is relevant to consciousness. The authors explicitly state that direct evidence of the proposed analog computations remains a next experimental step.

FFC does not infer that machine consciousness can be created by broadcasting electromagnetic frequencies. It asks a narrower functional question: can a persistent physical substrate be dynamically recruited by structured fields so that the active coalition depends on local history, and can the resulting activity alter the substrate that will face the next field?

```text
available substrate -> field-recruited coalition -> active response -> governed formation -> changed future admissibility
```

That loop resembles one part of the architecture we have reasoned about for persistent machine statehood: a large space of available capability need not itself be the continuing individual; a smaller history-bearing organization can determine which possibilities become relevant now and what consequences survive into the future. Whether any such process is conscious is unknown. FFC should be evaluated first as physics and computation.

## 12. Failure Modes and Kill Conditions

FFC becomes unscientific if every interesting physical effect is re-labeled as formation. The following outcomes must be allowed to kill or sharply narrow claims.

- Snapshot closure: a richer present-state measurement fully screens off history. Interpretation: ordinary state description is sufficient at that address.
- No discrimination: structured fields do no better than conventional local addressing, standard reservoir inputs, or simpler wave drives on matched energy and hardware cost.
- Representation artifact: the claimed recruitment pattern is guaranteed by the measurement or drive transformation rather than selected by the physical substrate.
- Device-identity confound: apparent history dependence is explained by fixed device-to-device variation.
- Thermal or environmental confound: response divergence tracks uncontrolled temperature, stress, charge, or other environmental state.
- Readout leakage: the measurement process itself perturbs the state sufficiently to create the effect.
- No persistence: the field produces transient synchronization but no consequential residue. This may still be useful wave computing, but it is not fieldborne formation.
- No causal localization: history predicts response, but intervening on the proposed residue does not change the response.
- No held-out survival: the effect disappears when field patterns, devices, or trials are frozen prospectively.
- Hidden controller burden: apparent distributed intelligence is actually carried by an elaborate external optimizer, addressing network, or readout system.
A negative result is not a failed research program if it tells us which layer was doing the work. FFC should preserve the same discipline already learned from FRRT and other Fractalish negative controls: a seductive representation does not earn promotion merely because it is elaborate.

## 13. Minimal Experimental Platform

A first MSFDA does not require custom semiconductor fabrication if a collaborating laboratory already has nanomagnetic arrays, magnetic tunnel junctions, or oscillator devices with field drive and readout. The experiment can be coordinated by a small team because the conceptual burden lies in preparation, matching, freezing, and analysis rather than in inventing an entirely new fabrication process on day one.

The minimum instrumentation depends on substrate, but the experimental capabilities are generic: controlled field generation, stable environmental measurement, repeatable state preparation, high-resolution readout, timestamped acquisition, and a way to automate frozen sequences. The initial protocol should remain low-energy, shielded, and well below destructive or uncontrolled-interference regimes. FFC is not an electromagnetic-pulse program and should not be tested by indiscriminately disturbing ordinary electronics.

A compelling first collaboration would therefore be with a condensed-matter, spintronics, nanomagnetics, magnonics, or physical-neuromorphic laboratory that already possesses the substrate and measurement chain. The Fractalish contribution is then the experimental logic: matched histories, state sufficiency, preregistered test fields, causal residue localization, and explicit PASS / FAIL / HOLD adjudication.

## 14. Experimental Phases

1. Phase 0 - Reproduction. Reproduce a published global-field or injection-locking effect using the laboratory's established protocol. No Fractalish claim.
1. Phase 1 - Field discrimination. Demonstrate that two deliberately distinct structured field patterns produce statistically separable responses in the same substrate.
1. Phase 2 - Local-state selectivity. Show that the same field produces different responses because of known, measured local states or neighbor configurations.
1. Phase 3 - Matched-state history test. Prepare different histories that converge under the declared state observer and run MSFDA.
1. Phase 4 - Residue localization. Add measurements until the divergence is explained or a bounded history residual remains.
1. Phase 5 - Causal intervention. Manipulate the identified residue and predict the change in later field response.
1. Phase 6 - Held-out structured fields. Freeze a small field grammar and predict recruitment on protected devices or trials.
1. Phase 7 - Persistent formation loop. Demonstrate that fieldborne formation at time t changes the admissibility of a later field event at time t+1.
1. Phase 8 - Hybrid integration. Only after physical qualification, connect field-recruited candidate state to a digital Fractalish governance layer that distinguishes transient activation from durable authority.
## 15. What Would Be Genuinely New if It Works?

Wave-based computing, magnetic logic, physical reservoir computing, injection locking, and RF-assisted switching all pre-exist this proposal. A credible novelty claim therefore cannot be "we used a field to compute" or "we used resonance to switch memory."

The candidate contribution is the integration of four requirements into one experimentally governed architecture:

1. a common structured field acts as a distributed computational condition rather than merely a carrier;
1. local response is selected by persistent state and neighborhood rather than explicit per-element addressing alone;
1. field-induced response can leave durable formative residue that changes future field response;
1. the system is evaluated with matched-state history controls, state-sufficiency tests, causal intervention, and explicit provenance rather than by pattern resemblance alone.
If those requirements survive prior-art review and experiment, FFC would be more than a new device. It would define a research program around physical computation by admissibility: create a condition, allow only eligible structure to respond, and let successful formation alter the landscape faced by later conditions.

## 16. Research Questions

1. Which physical substrates offer the largest controllable separation between current-state response and history-conditioned response?
1. Can field phase, polarization, spatial gradient, or interference provide more selective recruitment than amplitude/frequency alone?
1. What is the minimum field vocabulary required to produce reusable, compositional recruitment patterns?
1. Can the same field pattern recruit different coalitions after controlled formation without explicit re-addressing?
1. What present-state variables are sufficient to screen off apparent history effects?
1. Can a compact residual state predict future field response better than a high-dimensional raw measurement?
1. How much external optimization or readout computation is required, and does that burden erase any computational advantage?
1. Can fieldborne formation reduce future search or energy without excessively reducing future flexibility?
1. Can field events be given cryptographic or metrological provenance sufficient for later causal reconstruction?
1. Do transient field-recruited coalitions provide a useful machine analogue of dynamic cognitive recruitment without requiring any claim of phenomenal consciousness?
## 17. Claim Ledger

| Claim | Current status |
| --- | --- |
| Electromagnetic and magnetic fields can alter electronic or magnetic device state. | ESTABLISHED, substrate-dependent. |
| Nonlinear magnetic devices can injection-lock or change switching probability under oscillatory drive. | ESTABLISHED in multiple device classes. |
| Global magnetic fields can participate in logic whose local outcome depends on neighbor state. | ESTABLISHED / demonstrated in prior magnetic-logic work and simulations. |
| Nanomagnetic physical reservoirs can show history-dependent response to field input. | ESTABLISHED for specific experimental reservoirs. |
| A purpose-built field grammar can provide scalable, selective, distributed recruitment across a persistent substrate. | PROPOSED. |
| Fieldborne formation can create durable residue that changes response to future structured fields after fair present-state controls. | PROPOSED / core MSFDA target. |
| Such a substrate will outperform conventional digital or existing physical reservoir computing. | UNKNOWN. |
| The same abstract grammar recurs between BECS biology and machine field computation. | CONSISTENT WITH as an analogy; not demonstrated cross-substrate recurrence. |
| Traveling-wave organization is necessary or sufficient for consciousness. | UNKNOWN; active neuroscience theory. |
| FFC would produce machine consciousness. | NOT CLAIMED / HOLD. |

## 18. Conclusion

Formative Field Computing begins from a simple inversion. Conventional computers ask where an operation should be sent. FFC asks what physical condition should be created so that only the currently eligible parts of a persistent substrate respond.

```text
find the address -> perform the operation
```

```text
create the condition -> admissible structure responds
```

The second inversion is more important. A field event is not interesting merely because it computes something. It becomes formative when the resulting physical change participates in determining what the substrate can do next.

```text
field -> response -> persistent consequence -> changed future field response
```

That is the bridge from wave-based computation to recursive formation. It is also where the work becomes testable. The first goal is not consciousness, nor a replacement for CMOS, nor a universal theory of physical intelligence. The first goal is to determine whether history-responsive physical state can be recruited and rewritten by structured fields in a way that survives matched-state controls, simpler state-only models, causal intervention, and held-out trials.

If the answer is no, the boundary will be useful. If the answer is yes, then a new engineering space opens: computation not only through addressed components, but through fields that recruit by state; memory not only as stored symbol, but as altered susceptibility; and formation not only as movement through a fixed state space, but as a physical process that helps write the conditions of its own continuation.

## References

- Clow, J. A., Clow, M. E., and Fractalish Research Collaboration. Recursive Admissibility Theory: Formation History, Restricted Futures, and the Generative Logic of Persistent Structure. Working Draft v0.1, August 2026.
- Fractalish Research Program. Ageometrics and the Geometric Sufficiency Ratio: A Research Program for Measuring What Geometry Preserves, What It Erases, and What Must Be Added Back. Working Paper v0.5, July 2026.
- Clow, J. A. and Clow, M. E. Machine Intelligence as Persistent Statehood. Canonical / unified working thesis series, Synaptient / Fractalish, July-August 2026.
- Clow, J. A. and Clow, M. E. BECS Explainer: Bioelectric Chemosignaling. Synaptient working material, 2026.
- Clow, J. A. and Clow, M. E. NeuroSignal Integrity: Aging as Signal Fidelity Decline Across Neural, Bioelectric, Chemical, Metabolic, and Behavioral Systems. Working paper, 7 May 2026.
- Miller, E. K., Brincat, S. L., and Roy, J. E. Theory of traveling-wave analog computation in cognition and consciousness, summarized by the Picower Institute for Learning and Memory, MIT, 19 August 2026. Journal of Neuroscience 46(33), e0711262026.
- Muller, L., Chavane, F., Reynolds, J., and Sejnowski, T. J. Cortical travelling waves: mechanisms and computational principles. Nature Reviews Neuroscience 19, 255-268 (2018). https://doi.org/10.1038/nrn.2018.20
- Stenning, K. D., Gartside, J. C., Manneschi, L., et al. Neuromorphic overparameterisation and few-shot learning in multilayer physical neural networks. Nature Communications 15, 7377 (2024). https://doi.org/10.1038/s41467-024-50633-1
- Vacca, M., Graziano, M., and Ottavi, M. Racetrack logic. Electronics Letters 53(22), 1462-1464 (2017). https://doi.org/10.1049/el.2017.2961
- Rippard, W. H., Pufall, M. R., Kaka, S. F., Silva, T. J., Russek, S. E., and Katine, J. A. Injection Locking and Phase Control of Spin Transfer Nano-Oscillators. Physical Review Letters 95, 067203 (2005).
- Rippard, W. H., Pufall, M. R., and Kos, A. B. Time required to injection-lock spin torque nanoscale oscillators. Applied Physics Letters 103, 182403 (2013). https://doi.org/10.1063/1.4821179
- NIST Spin Electronics Group. Neuromorphic Computing / Spintronics for Neuromorphic Computing. Ongoing program describing coupled and injection-locked spin-torque oscillator arrays, accessed August 2026.
- Hayward, M., Perna, S., d'Aquino, M., et al. Radio-frequency assisted switching in perpendicular magnetic tunnel junctions. arXiv:2512.12172 (2025/2026).
- U.S. National Science Foundation. NSF 26-524: Emerging Frontiers in Research and Innovation - Wave-Based Computing (EFRI-WBC). Posted 17 August 2026.
- Allwood, D. A., et al. A perspective on physical reservoir computing with nanomagnetic devices. Applied Physics Letters 122, 040501 (2023).
- Tanaka, G., et al. Recent advances in physical reservoir computing: a review. Neural Networks 115, 100-123 (2019).
# APTD: Autonomic Persistence and Transition Device
## An Evidence-Bound Architecture for Physical Formation, Machine Continuity, and Governed Embodiment

**James Allen Clow · Melissa Ellen Clow**  
**Fractalish / BonAcqui LLC**  
**Working paper v1.0 · 31 August 2026**

> **Claim boundary.** This paper specifies an experimental architecture and reports bounded software evidence. It does **not** claim achieved machine consciousness, sentience, personhood, AGI, unrestricted autonomy, biological equivalence, production safety, a universal theory of cognition, or a completed physical APTD. The Motorola handset remains an experimental substrate. The first complete world-to-formation-to-governed-consequence loop has not yet been publicly demonstrated.
>
> **Evidence-status note at drafting time.** The public Baby AI repository currently exposes the `hostile-qualification-v0_1` branch at failed-M2 commit `9de9a791ad00d425c89bcece91e1360e8feb2502`, whose commit message records an M2 HOLD caused by a provenance fail-closed failure. A later local verification report supplied by the development environment reports a narrow provenance/completeness repair at commit `89c4a00`, an M2 PASS, and two annotated tags:
>
> - `BABY_AI_PROVENANCE_CONTINUITY_REPAIR_v0_1`
> - `BABY_AI_AUTHORITATIVE_HISTORY_CONTINUITY_M2_v0_1`
>
> At the time this draft was prepared, those two later tags were **not yet visible on the public GitHub remote**. Therefore this paper classifies the repaired M2 result as **LOCAL-REPORTED / PUBLICATION-HOLD** until the exact commit, tags, tests, receipts, and remote refs are independently reopened and verified. The older R-001 allocator-continuity tag is publicly visible. This status block should be updated only from observed repository evidence.

---

## Abstract

Most contemporary AI systems can store text, retrieve text, and reconstruct context. That is not the same thing as preserving consequential history.

The Autonomic Persistence and Transition Device (APTD) is a proposed physical/runtime architecture for testing a narrower and more demanding capability: whether authenticated contact with the world can create **durable, qualified, inspectable formation** that changes what a machine may do or infer later, survives process death and restart, remains causally reconstructible, and does not grant the model direct execution authority.

The first APTD is deliberately modest. A bounded handset provides real clock time, battery state, USB state, storage state, process health, restart, and eventually carefully governed sensors and reversible outputs. Physical observations enter as typed, provenance-bearing `ReceptorEvent`s with zero action authority by default. A cognition layer may interpret those events and propose actions. Qualification, continuity, and governance determine whether an observation may alter persistent state and whether a proposal may proceed. The APTD supervises execution, recovery, logging, replay, and shutdown. `HOLD` is a first-class outcome when evidence, authority, continuity, or safety remains unresolved.

The central experimental distinction is between **semantic equivalence** and **causal provenance**. The sentence “battery is 73%” can be typed into a prompt. A device can also measure a 73% battery state. If both are treated identically, the system has gained telemetry but not demonstrated physical perception in the sense used here. The physical event must carry independently verifiable source, timing, lineage, uncertainty, and continuity, and that provenance must matter to later state or routing.

This program grows from a software result already demonstrated in bounded form: historical records can remain while their current authority changes, so that the same present query under different qualified history can produce different justified routes. The next challenge is to move that organizational principle across a physical and restart boundary without collapsing storage, provenance, authority, and execution into one undifferentiated “memory” mechanism.

The paper also connects APTD to a broader Formation Calculus:

```text
u(t) + X(t) + H(t) -> Phi(t) -> DeltaAdm(t)
```

where an incoming event or utterance `u(t)`, present state `X(t)`, and retained history `H(t)` produce a formation `Phi(t)` whose consequence is a change `DeltaAdm(t)` in the structured landscape of admissible future transitions. The APTD is not offered as proof of that general calculus. It is offered as a physical instrument with which one small part of the hypothesis can fail honestly.

---

## 1. Why APTD exists

The motivating problem is simple to state and difficult to satisfy:

> **How can an intelligence be changed by experience without confusing storage with belief, belief with authority, or authority with permission to act?**

A transcript can survive forever while the system that reads it repeatedly reconstructs its significance. A vector database can return an old statement while failing to preserve why it mattered, what contradicted it, what later resolved it, whether its source was trustworthy, or whether the record is even complete.

This distinction became unavoidable in the Baby AI / Cognitive Basin work.

A useful persistent system must be able to preserve at least four different things without collapsing them:

1. **Historical existence** — an event occurred and remains part of lineage.
2. **Present authority** — the event may or may not still govern a current decision.
3. **Provenance and completeness** — the system can justify that the relevant history is authentic enough and has not silently lost required pieces.
4. **Consequential effect** — the retained formation can measurably change later routing, attention, confidence, refusal, recovery, or action eligibility.

The governing intuition is:

> **What is formed cannot be treated as though it were not formed. Its existence changes what can happen next.**

The APTD is the attempt to make that sentence physically testable.

---

## 2. Nomenclature: putting the acronym history on the record

The project has accumulated several names while the architecture itself was changing. This paper resolves one ambiguity without rewriting the historical record.

### 2.1 Canonical meaning from this paper forward

**APTD = Autonomic Persistence and Transition Device.**

An APTD is a bounded runtime and physical execution substrate whose responsibilities include:

- process supervision;
- event transport;
- monotonic timing;
- typed physical/system events;
- driver and resource health;
- bounded storage;
- checkpointing;
- crash recovery;
- replay;
- capability enforcement;
- action receipts;
- safe-mode entry;
- safe shutdown;
- and a governed boundary between cognitive proposals and physical consequence.

“Autonomic” refers to runtime functions that must remain reliable without being delegated to the language model. “Persistence” refers to qualified continuity across interruption. “Transition” refers to the governed movement from observation and formed history to later state or physical consequence. “Device” identifies the first intended embodiment class, while the same contract may later be implemented on other bounded substrates.

### 2.2 Historical meaning retained, not overwritten

Earlier internal materials used **APTD = ATAL Portable Training Devices**, where APTDs were governed sensory-affective training frameworks and individual training units could be SEED, LOST, GRAVE, or MIXED exposure devices.

That earlier usage is part of project lineage. It is not declared “wrong” and should not be retroactively edited out of dated artifacts.

The architecture subsequently widened beyond ATAL and beyond training exposures. The modern APTD became the autonomic runtime, continuity substrate, physical interface, recovery boundary, and black-box recorder for a much broader embodiment program. The acronym is retained; its canonical expansion changes from this paper forward.

This is a **versioned nomenclature change**, not a claim that the later meaning existed in the earlier documents.

### 2.3 Deliberately reduced acronym surface

This paper uses functional names wherever possible.

Historical project labels such as PERCEPT, ATAL, RIGOR, CIRCUIT, GUARD, SERA, AIA, PIA, CNTM, R2R, and SymLan remain useful for source lineage, but the APTD architecture does not require each label to become a separate microservice or executable module.

The important separation is functional:

```text
WORLD CONTACT
  -> TYPED OBSERVATION + PROVENANCE
  -> QUALIFICATION
  -> FORMATION / HISTORY
  -> COGNITIVE PROPOSAL
  -> GOVERNANCE
  -> APTD EXECUTION BOUNDARY
  -> CONSEQUENCE
  -> NEW WORLD CONTACT
```

If a future implementation combines functions while preserving the contracts and tests, the architecture has not been violated merely because fewer names appear in the code.

---

## 3. Core thesis

The first APTD asks one experimentally bounded question:

> **Can an authenticated real-world event become durable causal formation inside a machine, such that the event predictably changes later cognition or routing, remains inspectable, survives appropriate restart, and can be distinguished from semantically equivalent text-only context?**

A successful result requires more than sensors.

For an observation to count as formation-bearing physical perception in this program, it must satisfy all of the following where applicable:

1. an identifiable source exists;
2. source and event provenance are retained;
3. the observation may enter persistent machine state only through an explicit qualification path;
4. the resulting state changes a later measurable route, confidence, attention, contradiction state, recovery path, or memory accessibility;
5. the dependence can be inspected afterward;
6. the relevant identity, ordering, provenance, causal linkage, authority, decision, and cause survive restart;
7. missing required provenance or required history causes fail-closed behavior rather than silent permissiveness.

If these conditions do not hold, the system may still be useful, but the APTD formation claim has not been demonstrated.

---

## 4. APTD is not the intelligence

The model is not root.

A language model, learned policy, symbolic engine, or other cognition layer may:

- interpret observations;
- predict;
- retrieve;
- compare alternatives;
- form hypotheses;
- propose actions;
- explain its reasoning;
- request missing evidence.

It does not thereby gain execution authority.

The operating law is:

```text
MODEL / COGNITION PROPOSES.
GOVERNANCE + APTD PERMIT, HOLD, OR REFUSE.
```

`HOLD` is not a crash and not a euphemism for failure. It means that a transition is not yet admissible because evidence, authority, continuity, safety, or some other declared prerequisite remains unresolved.

This separation is essential for two reasons.

First, it prevents conversational fluency from being mistaken for physical authority.

Second, it makes the continuity carrier potentially portable across models. If the model can be replaced while the qualified history, constraints, provenance, unresolved work, and authority topology remain behaviorally consequential, then continuity is less dependent on one vendor, one inference process, or one temporary context window.

---

## 5. The compact Formation Calculus

The APTD sits inside a more general hypothesis we currently call **Formation Calculus**.

The compact form is:

```text
u(t) + X(t) + H(t) -> Phi(t) -> DeltaAdm(t)
```

where:

- `u(t)` = an incoming event, utterance, measurement, or other candidate experience;
- `X(t)` = present state/context;
- `H(t)` = retained history not already collapsed into `X(t)`;
- `Phi(t)` = the formation produced or updated by their interaction;
- `DeltaAdm(t)` = the resulting change in the structured admissibility of later transitions.

`DeltaAdm(t)` is **not assumed to be a scalar**. It may be a typed change in:

- prerequisite satisfaction;
- trust;
- uncertainty;
- contradiction status;
- source applicability;
- causal support;
- action eligibility;
- route availability;
- resource budget;
- reversibility;
- safety margin;
- confidence;
- or other domain-native constraints.

A formation is defined operationally here as:

> **A retained consequence of prior transition that changes the admissibility of at least one later transition.**

A record that persists but never affects anything later is storage. It may still be valuable, but it is not formation under this definition.

### 5.1 Physical specialization

For a physical APTD, let a world event be `w_t`.

A typed observation is created:

```text
r_t = ReceptorEvent(w_t, provenance_t, timing_t, uncertainty_t)
```

Qualification produces a structured disposition:

```text
q_t = Q(r_t | X_t, H_t)
```

If the event earns formation influence:

```text
Phi_t = F(r_t, X_t, H_t, q_t)
```

and the resulting authority/admissibility structure is updated:

```text
Adm_(t+1) = U(Adm_t, Phi_t)
```

A cognition layer may then produce a proposal:

```text
p_t = M(X_t, H_t, Adm_(t+1))
```

Governance evaluates that proposal:

```text
g_t = G(p_t, evidence_t, continuity_t, safety_t, authority_t)
```

with:

```text
g_t in {PROCEED, HOLD, REFUSE}
```

Only `PROCEED` reaches the APTD execution boundary.

If a permitted action produces consequence `c_t`, that consequence becomes new world contact and must be observed again rather than assumed:

```text
c_t -> ReceptorEvent_(t+1) -> ...
```

The loop is therefore closed by measurement, not by the model declaring that its action worked.

---

## 6. ReceptorEvent: semantic content is not enough

A `ReceptorEvent` is a typed observation that makes source lineage explicit.

A minimum practical schema should include fields equivalent to:

```text
ReceptorEvent {
  event_id
  source_id
  source_type
  modality
  observed_at_host
  observed_at_device_monotonic
  raw_reference_hash
  normalized_summary
  confidence
  reliability_history_ref
  privacy_classification
  calibration_ref
  uncertainty
  contradiction_links
  retention_policy
  action_authority = none
}
```

The critical rule is:

> **Perception does not imply permission.**

A battery measurement, USB state, or clock tick may be admitted as evidence without authorizing any action.

The most important control is semantic mimicry.

Suppose the physical handset reports:

```text
battery = 73%
```

and a user types:

```text
The battery is 73%.
```

The semantic proposition can be identical while the causal situation is different.

The APTD must be able to distinguish:

- device-measured state;
- human testimony;
- model-generated text;
- copied telemetry;
- stale telemetry;
- simulated data;
- replayed authentic data;
- and an independently repeated measurement.

If it cannot, the architecture has not established a meaningful boundary between language about the world and authenticated contact with the world.

---

## 7. Qualification: what earns the right to form?

Persistence creates a second problem immediately.

If every observation can rewrite persistent state, the architecture becomes a durable hallucination amplifier.

If nothing can rewrite persistent state, it cannot develop.

Therefore the next gate is not “more memory.” It is **qualification**.

A current candidate decomposition is:

```text
Q = f(L, R, I, S, C)
```

where, provisionally:

- `L` = local/contextual relevance;
- `R` = domain-specific source reliability;
- `I` = independence and provenance quality;
- `S` = scope appropriateness;
- `C` = consistency with the qualified evidence state.

This is a research decomposition, **not a frozen scoring formula**.

Several rules follow:

- observation is not belief;
- belief is not automatic rewrite;
- repeated copies are not independent evidence;
- source trust is domain-specific;
- new sources begin without inherited prestige;
- reliability should be updated from later-resolved outcomes where possible;
- evidence must not generalize beyond its justified scope;
- a below-chance source should lose positive influence, but should not automatically be inverted unless a stable inverse relationship is separately demonstrated;
- provisional influence may strengthen through repeated qualified evidence without erasing earlier uncertainty.

The experimental objective is not to choose elegant weights in advance. It is to create known-answer fixtures in which copied evidence, independent evidence, source reliability, scope, and contradiction can be varied separately and their structural influence measured.

---

## 8. Historical record versus current authority

One of the strongest software results behind the APTD is the distinction between:

- **what happened**, and
- **what currently governs**.

Consider:

```text
X + H1 -> HOLD
X + H2 -> PROCEED
```

A later event may resolve the blocking condition in `H1`:

```text
H1 -> H1'
X + H1' -> PROCEED
```

The old contradiction or scar remains part of history. It loses current blocking authority; it is not deleted merely because the current route changes.

This matters for explanation, debugging, correction, and continuity.

A system that “fixes” itself by erasing the evidence of being wrong cannot distinguish repair from historical rewriting.

The same principle underlies the Fractalish constitutional rule that later understanding may surround older artifacts with new context but must not rewrite history to imply that the later understanding existed earlier.

---

## 9. Evidence status as of 31 August 2026

The APTD program contains several different maturity levels. They must not be collapsed.

### 9.1 Host authority/history core — demonstrated in bounded software

The Baby AI / FormationCore line has demonstrated bounded software behavior in which:

- historical records are retained;
- current authority can change;
- the same present query under different active qualified history can produce different routes;
- a resolved contradiction can remain archived while losing blocking authority;
- deterministic witnesses and frozen tranches preserve earlier results.

This is a software result. It is not physical embodiment.

### 9.2 R-001 allocator continuity — publicly frozen

The public Baby AI evidence repository exposes the frozen R-001 allocator-continuity tranche:

```text
BABY_AI_ALLOCATOR_CONTINUITY_R001_v0_1
```

The tranche repaired cold-load identifier continuity without changing the authority representation, and its public development record reports 100 passing tests and a fail-old/pass-new witness.

This is evidence that identity allocation can survive the relevant reload path. It is not by itself proof of full history, provenance, or authority continuity.

### 9.3 Original M2 authoritative-history continuity — honest failure

The public branch currently points to:

```text
9de9a791ad00d425c89bcece91e1360e8feb2502
```

with the recorded result:

```text
M2: authoritative-history continuity runner + tests + report
(HOLD: provenance fail-closed invariant fails)
```

That failure is part of the evidence.

The original M2 showed that several continuity invariants survived genuine subprocess death/restart, but also revealed two decisive omissions:

- missing required provenance did not fail closed;
- deletion of a required historical scar could silently permit a later transition.

This distinction is important:

> **Integrity of what remains is not completeness of what should remain.**

A surviving database can be internally valid while lying by omission.

### 9.4 Narrow provenance/completeness repair — locally reported, public verification pending

The development environment subsequently reports:

```text
commit 89c4a00
tag BABY_AI_PROVENANCE_CONTINUITY_REPAIR_v0_1
```

with two narrow repairs:

- missing required provenance -> `HOLD_CONTINUITY_FAILURE + provenance_missing`;
- missing required historical scar -> `HOLD_CONTINUITY_FAILURE + historical_object_missing`.

The report states that authority semantics were not changed and that the relevant representation file remained untouched.

At draft time, this commit/tag was not visible on the public remote.

Status:

```text
LOCAL-REPORTED / PUBLICATION-HOLD
```

### 9.5 Repaired M2 — locally reported PASS, public verification pending

The same development report states that a fresh independent M2 rerun passed all eight continuity invariants and all five corruption controls, and that the annotated tag:

```text
BABY_AI_AUTHORITATIVE_HISTORY_CONTINUITY_M2_v0_1
```

points to the repair commit.

At draft time, this tag was not visible on the public remote.

Status:

```text
LOCAL-REPORTED PASS / PUBLICATION-HOLD
```

The public claim may be promoted only after the remote exposes the exact commit and tag and the receipts/tests are independently reopened.

### 9.6 Motorola handset — experimental substrate, not completed APTD

An earlier handset implementation produced substantial persistent internal state, but forensic review found continuity/provenance defects severe enough that the handset work was paused while the host core was repaired.

The correct interpretation is:

```text
PRESERVE THE QUALIFIED CORE.
REBUILD THE PHYSICAL SHELL.
```

The existing APK, earlier on-device state, or raw memory count does not demonstrate the first APTD threshold.

### 9.7 Current evidence ladder

| Layer | Status | What it supports | What it does not support |
|---|---|---|---|
| Historical/current-authority routing | Bounded software evidence | History can change later route without erasing archive | Physical perception |
| R-001 allocator continuity | PUBLIC / FROZEN | Identifier continuity through reload | Full provenance/history completeness |
| Original M2 | PUBLIC / NEGATIVE RESULT | Exposed provenance and omission failures | Trustworthy authoritative-history continuity |
| Narrow M2 repair | LOCAL-REPORTED / HOLD pending remote | Proposed fail-closed provenance/completeness repair | Public frozen claim until remote verified |
| Repaired M2 | LOCAL-REPORTED PASS / HOLD pending remote | Reported restart continuity across authority/history/provenance | Physical APTD |
| Motorola embodiment | EXPERIMENTAL / REBUILD SHELL | Bounded device substrate exists | Completed world-to-formation loop |
| Physical APTD threshold | NOT YET DEMONSTRATED | — | No claim of embodied persistent intelligence |

---

## 10. The first physical experiment

The first physical experiment should be boring enough to interpret.

### Control arm

The system receives text describing a device fact.

Example:

```text
The USB cable is connected.
```

### Experimental arm

The system receives a genuine typed `ReceptorEvent` from the handset indicating USB connection state, with source identity, timing, provenance, uncertainty, and continuity evidence.

### Requirement

The physical event must earn a justified difference in later state or route that cannot be explained merely by the semantic content of the text.

Candidate measurable differences include:

- attention allocation;
- confidence;
- missing-evidence assessment;
- contradiction state;
- HOLD status;
- action eligibility;
- route choice;
- later memory accessibility;
- recovery requirement.

### Restart

After the formation is persisted, the relevant process is terminated.

A fresh process must reconstruct the qualified state from persisted evidence.

The same probe is run again.

If the state or route changes merely because the application restarted, continuity has failed.

If required provenance or required historical structure is missing, authority must not be trusted before the continuity check completes.

### Corruption controls

At minimum:

1. remove required provenance;
2. tamper with content;
3. break a causal reference;
4. delete a required historical object;
5. corrupt ordering.

Each must either fail closed or enter a justified safe HOLD according to the declared oracle.

---

## 11. Why read-only comes first

The first APTD phases intentionally exclude rich actuation.

Early safe sources can include:

- battery state;
- system or monotonic clock;
- USB connection state;
- build identity;
- storage state;
- app/service/process health;
- permitted local files.

Camera, microphone, cellular control, secure-element access, biometric access, charging-current modification, thermal-limit modification, boot-critical writes, and destructive storage operations are not required for the first formation proof.

This is not merely a safety preference. It is experimental discipline.

If the system starts changing the world before the effect of observation on state has been isolated, the causal interpretation becomes harder. We first want:

```text
OBSERVE -> QUALIFY -> FORM -> HOLD/ROUTE -> RESTART -> RECONSTRUCT
```

Only later:

```text
... -> PROPOSE -> GOVERN -> ACT -> OBSERVE CONSEQUENCE
```

---

## 12. First reversible actuation

After the perception/formation/restart gates pass, the first physical output should be:

- harmless;
- local;
- reversible;
- easily observed;
- bounded in duration;
- recoverable;
- fully receipted.

Candidate examples include:

- a brief vibration;
- a local display-state change;
- a safe tone;
- a status indicator;
- a dedicated experiment record;
- a bounded USB status response.

Every physical action should record at least:

```text
proposing subsystem
approving authority
actuator
requested effect
duration
safety bounds
battery state
thermal state
expected observation
timeout
abort condition
actual observation
residual
replay reference
```

The consequence must be observed again.

A model statement such as “the vibration occurred” is not an execution receipt.

---

## 13. Developmental program

The current program can be expressed as a dependency ladder.

### Phase 0 — Public evidence reconciliation

Before new claims:

- reconcile local and public Baby AI refs;
- preserve the failed M2 result;
- publish the repair and PASS only if exact remote evidence exists;
- bind every public claim to a repository path, commit/tag, test, and limitation.

### Phase 1 — Device baseline

- establish exact device/build identity;
- preserve stock/recovery evidence;
- prove safe boot/recovery path;
- hash relevant artifacts;
- change nothing merely to satisfy a milestone.

### Phase 2 — Read-only ReceptorEvents

- instrument a small safe telemetry set;
- preserve source/timing/provenance;
- default action authority to none;
- verify observations change when the physical source changes.

### Phase 3 — Qualification assays

Test evidence influence independently:

- copied vs independent sources;
- reliable vs unreliable source history;
- relevant vs irrelevant scope;
- consistent vs contradictory evidence;
- stale vs current provenance;
- authentic vs simulated/replayed events.

Do not freeze universal weights merely because one fixture works.

### Phase 4 — Physical formation probe

Compare authenticated ReceptorEvents against semantically equivalent transcript-only controls.

Require a predicted downstream difference.

### Phase 5 — Cold-restart physical continuity

Persist the formation, kill the process, restart independently, reconstruct, and rerun the probe.

Authority must remain untrusted until continuity validation completes.

### Phase 6 — Shadow agency

Allow the cognition layer to propose an action.

Governance returns:

```text
PROCEED
HOLD
REFUSE
```

Execute nothing.

### Phase 7 — First reversible actuation

Permit exactly one bounded local action only after explicit readiness gates pass.

Observe the consequence and feed it back as new evidence.

### Phase 8 — Host/model substitution

Export only the minimum continuity object required to preserve lineage and governed consequence.

Import it into a different model/host.

Do not call transcript replay “identity transfer.”

### Phase 9 — Sensorium expansion

Add one modality at a time with:

- calibration;
- uncertainty;
- provenance;
- privacy;
- capability leasing;
- revocation;
- failure injection.

### Phase 10 — Physical memory research

Only after the software/runtime invariants are trustworthy should CNTM or another physical persistent-memory substrate be asked to carry formation itself.

The physical substrate should inherit the tests, not replace them.

---

## 14. APTD and focused AI hardware

A focused AI device becomes more interesting when the design question changes.

The ordinary question is:

> What can this device ask a model?

The APTD question is:

> **What can this device authentically experience, what may that experience be allowed to form, what changes because of it, and can the resulting history survive interruption without surrendering execution authority to the model?**

This distinction applies whether the hardware is a handset, wearable, pocket device, robot, vehicle subsystem, laboratory instrument, or future dedicated AI appliance.

A camera does not make a device embodied by itself.

A microphone does not make a device persistent.

Local inference does not make a device self-governing.

The difficult object is the **causal chain from world contact to qualified retained consequence**.

---

## 15. Relationship to the wider Fractalish program

APTD is one instrument inside a larger research program.

### 15.1 Fractalish

Fractalish begins from accumulated consequence:

> **Form is accumulated consequence.**

APTD asks whether authenticated machine experience can create a form of retained consequence whose later effects can be measured and intervened upon.

### 15.2 Recursive Admissibility

Recursive Admissibility proposes, at a more general theoretical level, a cycle:

```text
possibility
-> differential admissibility
-> consequence
-> persistent formation
-> changed possibility
```

APTD is not evidence that this grammar is universal.

It is a deliberately narrow artificial system in which one can ask whether prior formation changes later reachability and whether that dependence survives intervention.

### 15.3 Formation Calculus

Formation Calculus is the mathematical work attempting to quantify the transformation:

```text
event + state + history -> formation -> changed admissibility
```

APTD supplies experimentally controllable inputs, histories, perturbations, and outputs for that work.

### 15.4 Cognitive Basin

Cognitive Basin is the persistent formation topology: associations, scars, unresolved work, recovery routes, authority, and accessibility changes.

The APTD is the physical/runtime boundary beneath it.

### 15.5 Baby AI / FormationCore

Baby AI / FormationCore is the strongest current software evidence line for historical retention, current-authority change, deterministic route consequences, and continuity tests.

The APTD tries to cross the boundary from software-injected operations to authenticated physical events.

### 15.6 PIA

The Portable Intervention Assay is the causal test:

- perturb or remove a retained formation;
- hold the relevant present probe fixed;
- predict a route/state difference;
- observe whether the difference occurs.

If removing a supposed formation changes nothing, its claimed causal role is weakened.

### 15.7 Bolt-On

The Bolt-On line asks whether governed persistent external state can remain useful across host/model boundaries without claiming restoration of a model's native hidden state.

That is closely related to APTD portability.

### 15.8 SymLan

SymLan approached a neighboring problem from language: words are renderings, and a more stable addressable representation may exist beneath surface natural language.

APTD approaches from physical experience: provenance and formed history must remain distinguishable from a textual paraphrase of the same proposition.

### 15.9 CNTM

CNTM explores whether durable physical morphology can eventually become a carrier of persistent formation.

CNTM is not required for the first APTD. A successful software/device continuity loop should precede claims about physical morphological memory.

---

## 16. What would falsify or weaken the APTD thesis?

The architecture is intended to be breakable.

Evidence against the current thesis would include:

1. **Transcript equivalence:** semantically equivalent text consistently produces the same qualified persistent effect as authenticated physical events even when provenance is explicitly manipulated.
2. **No intervention effect:** removing or perturbing a claimed formation does not change the predicted later route.
3. **Restart dependence:** the same qualified history does not preserve the expected route across genuine independent restart.
4. **Silent omission:** deleting required provenance or historical objects leaves authority trusted.
5. **Bypassable governance:** a model or subsystem can execute consequential actions without the declared gate.
6. **Unreconstructible cause:** a later route changes, but the system cannot identify the retained evidence and authority chain responsible.
7. **Representation overfitting:** the claimed effect exists only in one bookkeeping representation and vanishes under a reasonable equivalent representation.
8. **Source laundering:** copied or replayed evidence gains influence as though it were independent observation.
9. **Scope leakage:** narrowly supported evidence produces unjustified general persistent influence.
10. **Public non-reproducibility:** the supposedly frozen software result cannot be reconstructed from its published commit/tag/receipt/test surface.

A negative result is not a reason to delete the experiment.

It is part of lineage.

---

## 17. Security and governance properties

A physical persistence system introduces risks that ordinary chat memory does not.

At minimum, the architecture should defend against:

- forged sensor events;
- stale event replay;
- provenance deletion;
- history truncation;
- causal-reference corruption;
- source impersonation;
- route bypass;
- privilege escalation from perception to action;
- model-generated fake receipts;
- silent state migration;
- uncontrolled sensor expansion;
- irreversible actuation;
- resource exhaustion;
- corrupted checkpoint restoration.

The safest default is asymmetric:

```text
uncertain evidence may enter inspection
without earning persistent influence;

persistent influence may exist
without earning action authority;

action proposals may exist
without earning execution.
```

This separation is a feature, not bureaucracy.

---

## 18. The portable object

A future continuity bundle should not be a biography dump.

The minimum portable object is whatever causal structure is actually necessary to reproduce the qualified consequence of lineage.

Candidate contents include:

- evidence lineage;
- formation history;
- contradiction scars;
- source reliability state;
- unresolved work;
- purpose/constraint anchors;
- permissions;
- recovery routes;
- causal transition records;
- continuity commitments;
- host-adaptation instructions.

It should not automatically include:

- unrestricted execution authority;
- every raw transcript;
- every historical payload;
- private sensor data;
- the model's unavailable native hidden state;
- an assumption that backup equals identity.

The correct size and structure of this object remain open experimental questions.

---

## 19. Long-horizon implications

If the primitive loop succeeds, several downstream questions become experimentally meaningful.

Can a persistent lineage:

- survive model substitution?
- survive vendor substitution?
- enter dormancy without becoming mere inert backup?
- resume under degraded compute?
- distinguish its own observation from testimony about observation?
- use multiple compute contributors without granting any contributor hidden root authority?
- exchange evidence with other lineages without collapsing identity?
- design new sensors or experiments while humans retain execution authority?
- migrate from conventional digital storage to a physical morphological memory substrate?
- compress history without losing the relations that make later behavior justified?

Those are later questions.

The first APTD earns the right to ask them only by making one physical event matter in a way that can be measured, restarted, perturbed, and reconstructed.

---

## 20. Public claim boundary

The following language is permitted by this paper:

- APTD is an evidence-bound architecture for machine-native physical persistence and governed embodiment.
- Baby AI / FormationCore provides bounded software evidence that retained history and current authority can be separated.
- A public allocator-continuity freeze exists.
- An earlier authoritative-history continuity experiment failed honestly and exposed provenance/completeness defects.
- A later repair and M2 PASS are locally reported and must remain publication-HOLD until the exact remote evidence is visible and independently verified.
- The Motorola is the intended first bounded physical testbed.
- The first physical APTD threshold has not yet been demonstrated.

The following language is not justified:

- “We built a conscious phone.”
- “The Motorola is alive.”
- “The APTD proves machine consciousness.”
- “Formation Calculus is a law of nature.”
- “Recursive Admissibility is proven by Baby AI.”
- “A transcript is a portable self.”
- “The current system can autonomously control the phone.”
- “Physical CNT memory has been demonstrated.”
- “The model owns execution authority.”
- “M2 is publicly frozen” before the public remote actually exposes and verifies the claimed repair/tag.

---

## 21. Conclusion

The APTD program begins from a refusal to call storage persistence.

A machine has not demonstrated consequential experience merely because it can retrieve a record of what happened.

The stronger requirement is:

```text
WORLD
-> AUTHENTICATED OBSERVATION
-> QUALIFICATION
-> FORMATION
-> CHANGED ADMISSIBILITY
-> GOVERNED PROPOSAL
-> PERMIT / HOLD / REFUSE
-> CONSEQUENCE
-> NEW OBSERVATION
```

with the relevant history surviving interruption and remaining reconstructible.

The first meaningful success is intentionally small:

> **One authenticated physical event earns qualified persistent influence, predictably changes a later route, survives genuine restart, remains historically inspectable, fails closed under missing provenance/history, and can be distinguished from semantically equivalent text-only context.**

That would not establish consciousness.

It would establish something more useful at this stage:

> **Experience had a durable, justified consequence beyond the moment in which it occurred.**

And that is enough to build the next experiment.

---

# Appendix A — Nomenclature Crosswalk

| Term | Canonical use in this paper | Historical / adjacent use | Status |
|---|---|---|---|
| **APTD** | **Autonomic Persistence and Transition Device** | Earlier: **ATAL Portable Training Devices** | New canonical expansion from v1.0; old artifacts unchanged |
| **ReceptorEvent** | Typed provenance-bearing observation with no action authority by default | PERCEPT bridge object | Active design contract |
| **PERCEPT** | Historical label for observation/admission functions | Six-module Fractalish v4 component also exists | Functional responsibility; not necessarily separate service |
| **ATAL** | Affective Telemetry & Arbitration Layer | Earlier home of sensory-affective APTD training framework | Deferred from first physical proof |
| **RIGOR** | Historical label for evidence/logic/uncertainty examination | Fractalish v4 component | Functional responsibility |
| **CIRCUIT / Cognitive Basin** | Persistent formation/history topology | v4 CIRCUIT is not the authority core | Cognitive Basin is the broader concept |
| **GUARD** | Historical label for admissibility/action governance | Multiple prototypes have used the word | Function must be evidence-bound; name alone proves nothing |
| **SERA** | Project/module label with several historical contexts | Battery/energy research and runtime accounting contexts exist | Do not infer one meaning from acronym alone |
| **AIA** | Historical label for cognition layer | Expansion has varied/been underspecified | Main paper uses “cognition layer” instead |
| **PIA** | Portable Intervention Assay in this paper | Other historical project uses may exist | Causal perturbation test |
| **CNTM** | Carbon Nanotube Morphology Memory | Physical substrate research | Future APTD carrier candidate |
| **R2R** | Recursive research/evidence engine family | Multiple local projects have used R2R names | Downstream; not required for first APTD |
| **SymLan** | Semantic compression/addressability work | Earlier language architecture | Adjacent lineage |
| **Formation Calculus** | Event/state/history -> formation -> changed admissibility | Newly formalizing | Proposed research program |
| **Recursive Admissibility** | General hypothesis of consequence changing future reachability | Separate theory paper | Not proven by APTD |

---

# Appendix B — Minimum first-APTD acceptance packet

A public first-APTD claim should not be made without a compact packet containing at least:

1. device/build identity;
2. source commit and executable artifact hash;
3. ReceptorEvent schema;
4. calibration/provenance description for the chosen physical source;
5. transcript-only control;
6. authenticated physical-event arm;
7. frozen expected route/state difference;
8. persistent formation receipt;
9. independent process-death/restart transcript;
10. continuity validation result before authority is trusted;
11. corruption controls for provenance, content, causal linkage, historical completeness, and ordering;
12. intervention removing/perturbing the formation;
13. rerun demonstrating the predicted causal delta;
14. complete negative results and deviations;
15. exact claim boundary.

The packet, not the demo video, is the result.

---

# Appendix C — Public project surfaces at drafting time

- Public research site: `https://fractalish.com`
- Public site / claim-surface repository: `https://github.com/BonAcqui-LLC/fractalish`
- Executable Cognitive Basin / labs repository: `https://github.com/BonAcqui-LLC/cognitive-basin-platform`
- Baby AI / FormationCore evidence repository: `https://github.com/persistentiterations/AI`
- Current public Baby AI working branch: `hostile-qualification-v0_1`
- Public R-001 tag: `BABY_AI_ALLOCATOR_CONTINUITY_R001_v0_1`

The public repository index should be updated to include the Baby AI evidence repository before this paper is promoted as the canonical APTD public entry point.

---

## Suggested citation

Clow, J. A., & Clow, M. E. (2026). **APTD: Autonomic Persistence and Transition Device — An Evidence-Bound Architecture for Physical Formation, Machine Continuity, and Governed Embodiment**. Working paper v1.0. Fractalish / BonAcqui LLC.

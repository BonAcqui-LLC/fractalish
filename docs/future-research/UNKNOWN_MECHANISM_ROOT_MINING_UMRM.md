# Unknown-Mechanism Root Mining (UMRM)

**Status:** PROPOSED FUTURE RESEARCH LANE  
**Date entered:** 2026-08-11  
**Project family:** Fractalish / Cognitive Basin / Generator Grammar  
**Execution status:** NOT STARTED  
**Claim boundary:** This document records a proposed research program. It does not establish a universal grammar of nature, a medical mechanism, a diagnostic method, or a causal explanation for any named disease or physical phenomenon.

## 1. Working name

**Unknown-Mechanism Root Mining (UMRM)**

Short description:

> Mine well-characterized scientific problems whose literature explicitly states that a mechanism is unknown, unclear, unresolved, or poorly understood; trace each problem backward to the earliest known causal discontinuity; reduce that discontinuity to the smallest testable transition rule; and attempt to falsify the resulting rule against independent evidence.

UMRM is not a program for attaching Fractalish vocabulary to unsolved problems. It is a program for forcing the vocabulary to make risky, low-level predictions at unresolved causal edges.

## 2. Motivation

A recurring Fractalish working intuition is that apparently complicated natural processes may reduce to a small set of operations governing **reachable change under constraint**.

Recent discussion sharpened this into several provisional ideas:

- physical systems are already dynamically active; macroscopic stasis is usually constrained transition rather than absence of activity;
- stable form can be viewed as persistent reduction or restructuring of reachable states;
- apparent instruction may often be implemented through opening, blocking, biasing, coupling, trapping, releasing, or retaining transitions;
- a pathological or failed state may sometimes be better described as an otherwise lawful process trapped in a non-returning basin than as a process that has simply stopped;
- the strongest evidence for any such grammar would come not from explaining known mechanisms after the fact, but from predicting something useful at an edge the scientific literature itself still marks as unresolved.

UMRM therefore targets the body of published **"mechanism unknown"** problems as an adversarial test corpus.

## 3. Golden reduction rule

For every candidate problem, reduce the observation toward the earliest branch possible.

Do not begin with a high-level label such as disease, pathway, morphology, network, intelligence, or organism.

Instead ask:

1. What is the last state or transition that is well established?
2. What is the next state or consequence that is also well established?
3. Where, exactly, does the causal trace become unresolved?
4. What was reachable immediately before that edge?
5. What became reachable or unreachable immediately after it?
6. What changed the local constraint landscape?
7. What consequence was retained?
8. Can the unresolved edge be reduced again?
9. Can the proposed root be perturbed from both directions?
10. Does the same root survive in an unrelated substrate or domain?

The preferred target is the smallest stable branch: a genuine **0|1** distinction where possible, while preserving **0|0** when two histories become observationally indistinguishable at the available measurement surface.

## 4. Candidate primitive vocabulary

The following operators are provisional search aids, not established primitives:

- **OPEN** — make a transition reachable.
- **BLOCK / CONSTRAIN** — make a transition unreachable or sufficiently improbable.
- **BIAS** — change relative transition probability without fully opening or blocking it.
- **COUPLE** — allow one state/process to alter another's reachable set.
- **DECOUPLE / ISOLATE** — remove such influence.
- **TRAP** — create or deepen a basin from which exit becomes difficult.
- **RELEASE** — remove a barrier or make stored potential available.
- **RETAIN** — preserve a consequence so that it constrains later transitions.
- **CLEAR / RETURN** — restore a previously reachable trajectory or complete a traversal.
- **IMPOSE** — externally alter the reachable transition set.
- **ADVANCE / GENERATE** — permit or produce state transition.

A candidate unresolved mechanism should be reduced to the smallest operator or operator relation that can make a falsifiable prediction. If none of these operators is sufficient, the vocabulary must expand rather than forcing the problem to fit.

## 5. Core hypothesis under test

### Always-On Transition Hypothesis — provisional

> Physical systems continuously possess lawful transition possibilities determined by their state and environment. Complex organization need not be created ex nihilo; it may arise through the selective opening, closing, biasing, coupling, trapping, release, and retention of available transitions.

This is not equivalent to saying that everything is alive, that all systems grow, or that all mechanisms reduce to one force. It is a candidate abstraction about transition and constraint.

### Root-Invariant hypothesis — provisional

> Some apparently unrelated phenomena may share a smaller causal transition rule that remains invariant when substrate-specific details are changed.

A visual resemblance, shared word, or analogous high-level description does not count as evidence for a root invariant.

## 6. What counts as a useful UMRM target

Prefer problems with all or most of the following:

1. The literature explicitly labels a mechanism, pathogenesis step, causal link, or transition as unknown/unclear/unresolved.
2. The state immediately upstream of the unknown edge is relatively well characterized.
3. The state immediately downstream is relatively well characterized.
4. Existing perturbations alter the transition but do not yet explain it.
5. Temporal data exist.
6. Public raw or sufficiently primary data exist.
7. Multiple independent experimental or observational roots exist.
8. The unknown edge can plausibly be expressed as a small number of competing transition hypotheses.
9. The field contains mechanistic nouns and correlations but lacks a satisfactory causal verb.
10. A wrong prediction can fail decisively.

## 7. Initial mining corpus

### Primary structured source

**DisMech — Disorder Mechanisms Knowledge Base / Monarch Initiative**

Use its explicit knowledge gaps, open questions, controversies, mechanism graphs, evidence links, and model references as a structured starting corpus.

Potential search language includes:

- "mechanism remains unknown"
- "mechanism remains unclear"
- "not fully understood"
- "pathogenesis is unclear"
- "etiology remains unknown"
- "mechanistic basis remains elusive"
- "precise mechanism is unresolved"
- "poorly understood"
- "how X leads to Y is unknown"

### Expansion sources

After the structured pass, expand to primary/review literature, open mechanistic databases, public omics repositories, materials databases, physics datasets, and other domains where an explicit unresolved transition can be identified.

UMRM should not remain disease-only. Biology is merely an attractive first corpus because the literature frequently marks causal gaps explicitly and supplies rich intervention data.

## 8. Candidate first-domain emphasis

Early candidates should preferentially include **persistence / failed-transition / non-return problems**, because the current grammar makes a directional prediction there.

Examples of candidate classes, not established Fractalish explanations:

- chronic inflammation;
- fibrosis;
- immune exhaustion;
- senescence persistence and failed clearance;
- developmental arrest;
- pathological state stabilization;
- failed repair/return transitions;
- granulomatous persistence;
- other systems where a normally available transition appears to become obstructed or self-maintaining.

Medical interpretation must remain subordinate to established evidence. UMRM is not a clinical decision system.

## 9. Required candidate record

Every mined unresolved edge should receive a structured record containing at least:

- candidate ID;
- domain;
- source citation(s);
- exact unresolved-mechanism language;
- established upstream state;
- established downstream state;
- known interventions;
- known temporal ordering;
- known negative results;
- proposed smallest unresolved branch;
- competing root hypotheses;
- candidate operator mapping;
- independent-root availability;
- public-data availability;
- exposure status;
- falsifier;
- disposition.

Allowed early dispositions should include:

- `ROOT_TRACTABLE`
- `MORE_METADATA_REQUIRED`
- `DOWNSTREAM_ONLY`
- `NO_CLEAN_EDGE`
- `INSUFFICIENT_INDEPENDENCE`
- `INSUFFICIENT_DATA`
- `GRAMMAR_NOT_USEFUL`
- `HOLD`

## 10. Experimental sequence

For each serious candidate:

1. **Locate** the explicit unknown edge in the literature.
2. **Freeze** the known upstream and downstream evidence.
3. **Withhold** evidence that directly resolves the unknown edge where a blind test is possible.
4. **Reduce** the gap to the smallest competing transition hypotheses.
5. **Preregister** what each hypothesis predicts.
6. **Perturb** or analyze existing perturbational data using only pre-edge information.
7. **Adjudicate** against independent evidence.
8. **Attack** apparent success with counterexamples and alternate mechanisms.
9. **Cross-domain test** only after a domain-local result survives.
10. **MERGE / CONSTRAIN / HOLD / REJECT** the candidate operator.

## 11. Minimum evidence for a "hit"

The following does **not** count:

> "Our grammar can explain disease X."

A minimal meaningful hit is closer to:

> Published evidence establishes states A and C but leaves the A→C transition mechanistically unresolved. Before consulting the withheld resolution evidence, UMRM reduction predicts intervening operation B and a directional consequence of manipulating B. An independent experiment or dataset then shows that manipulating the candidate mechanism changes the A→C transition as preregistered.

One hit establishes only a bounded result in that system.

Cross-domain relevance requires repetition across genuinely unrelated substrates without changing the primitive definition to fit each result.

## 12. Strong falsification rules

UMRM should be built to embarrass the grammar quickly.

Reject or constrain a candidate when:

- the proposed root merely restates known domain terminology;
- the prediction was obtainable directly from consulted outcome literature;
- a simpler established mechanism explains the result equally well;
- the proposed primitive changes meaning between domains;
- visual or verbal similarity is doing the argumentative work;
- independent roots fail;
- counterexamples reveal the candidate operator to be downstream rather than causal;
- the unresolved edge cannot be localized cleanly;
- the grammar adds no predictive value over conventional causal analysis.

Negative results remain canonical evidence.

## 13. Relationship to current Fractalish work

UMRM may eventually interact with:

- Generator / natural grammar work;
- Cognitive Basin and reachability framing;
- Hunter's non-return / persistence framing;
- Natural Math;
- PIA / persistent-state work;
- R2R rapid literature assimilation;
- FRRT failure / first-post-failure transition analysis;
- natural-versus-synthetic provenance / formation-receipt work;
- SERA evidence and execution accounting.

Similarity does not establish shared mechanism. Every connection must earn its own evidence.

## 14. Relationship to Event 006

**Keep UMRM operationally separate from Event 006.**

Event 006 is already preregistered and approaching reveal. UMRM must not introduce new hypotheses, thresholds, targets, operators, code changes, or analytical flexibility into that frozen event.

UMRM work may begin independently after appropriate repository setup, but no Event 006 artifact should be modified merely to accommodate this research lane.

## 15. First implementation milestone

The first UMRM implementation should be a **read-only corpus mining and ranking pass**.

Deliverables:

1. ingest structured DisMech knowledge-gap records;
2. identify explicit unresolved causal edges;
3. rank candidates by root tractability rather than fame or apparent fit;
4. produce structured candidate records;
5. select a small adversarial pilot set spanning at least two mechanistically different domains or disease classes;
6. freeze evidence boundaries before deeper literature inspection;
7. issue a pilot plan without claiming a resolved mechanism.

No large model build is required for the first pass. Conventional retrieval, graph traversal, structured extraction, and simple scoring are preferred.

## 16. Longer-term extension: natural versus synthetic provenance

A related future lane may test whether imposed formation history leaves a persistent micro/nanoscale receipt in materials.

The root question is not merely whether a classifier can distinguish natural and synthetic samples, but:

> What is the earliest measurable consequence of the first causal divergence between natural formation and imposed formation, and can that consequence be reduced to a minimal invariant relation?

This should be treated as a sibling project unless evidence later justifies merging it with UMRM.

## 17. Claim boundary / public-language rule

Until evidence exists, describe UMRM as:

- a method for mining explicit unresolved causal transitions;
- a test of whether a small transition/constraint vocabulary has predictive value;
- an adversarial search for counterexamples to the proposed grammar.

Do not describe it as:

- a universal solution to unknown mechanisms;
- proof of a universal grammar of nature;
- a new theory of cancer or disease;
- proof that all systems are alive;
- proof that constraint is itself a fundamental physical force;
- a diagnostic or therapeutic framework.

## 18. Immediate restart prompt

When this project is revisited, begin with:

> Read `docs/future-research/UNKNOWN_MECHANISM_ROOT_MINING_UMRM.md`. Preserve its claim boundary. Build a read-only inventory of explicit unresolved-mechanism edges from DisMech and other authoritative sources. Rank by root tractability: well-established upstream/downstream states, perturbation availability, temporal resolution, independent roots, public data, and falsifiability. Do not attempt to solve candidates during the inventory pass. Return a small adversarial pilot set and freeze evidence boundaries before deeper inspection.

---

**Canonical working label:** UMRM — Unknown-Mechanism Root Mining  
**Status at entry:** PROPOSED / NOT STARTED  
**Reason preserved:** High-priority future test of Fractalish root-reduction and reachability/constraint grammar against explicitly unresolved scientific mechanisms.

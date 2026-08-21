# Conditional Reconstructive Recruitment

## Conditioned Reactivation, Return Paths, and the Minimum Sufficient Present in History-Bearing Systems

**James Allen Clow and Melissa Ellen Clow**  
Fractalish Research Collaboration / Synaptient  
**Working Draft v0.1 - 20 August 2026**

> **Formation can become a future route without becoming evidence.**

## Abstract

Persistent systems face a scaling problem that is easy to disguise as a memory problem. As retained state grows, a system cannot keep everything active without allowing the cost of present reasoning, control, or physical coordination to grow with its entire history. Yet discarding inactive history destroys precisely the continuity that makes later experience cumulative. Conditional Reconstructive Recruitment (CRR) is proposed as a working framework for this middle problem: how can a present condition selectively reactivate a dormant prior pathway because of a persistent consequence of earlier formation, without globally activating retained state and without requiring an external controller to already know the destination?

CRR grew from a bridge between two independently developed lines of work. Bounded Selective Reconstruction (BSR) studies the information-side problem: preserve a larger persistent state than is currently active, begin with a small task-relevant working set, and reconstruct additional history only when insufficiency, contradiction, unresolved dependency, or another local condition justifies expansion. Formative Field Computing (FFC) studies a candidate physical analogue: a shared structured field interacts with a large substrate, while only elements whose local state, neighborhood, susceptibility, and history make a transition admissible respond. Their mechanisms are not assumed identical. Their possible common abstraction is selective activation from a larger possibility space under a present condition.

This paper defines CRR, distinguishes it from ordinary addressed retrieval, separates navigation from evidence and authority, formalizes return paths and a task-relative Minimum Sufficient Present, and proposes a cross-substrate test program. The strongest claim is deliberately narrow: CRR is an operational hypothesis about condition-driven reactivation in history-bearing systems. It does not establish a universal cognitive primitive, scale invariance, machine consciousness, or biological equivalence. Its scientific value depends on whether local consequences can genuinely guide later reactivation better than conventional indices, global search, similarity retrieval, or richer snapshot-state models.

**Keywords:** conditional reconstructive recruitment; bounded selective reconstruction; formative field computing; recursive admissibility; persistent state; return path; active set; minimum sufficient present; formation history; selective activation; Fractalish

## 1. The Missing Problem Between Memory and Attention

A persistent intelligence, diagnostic system, physical substrate, or scientific knowledge base can retain far more state than should participate in every present operation. The naive choices are both bad.

The first is global activation: preserve everything and make everything available to every operation. This retains history but scales present cost with accumulated history. It also increases interference, spurious relevance, duplicated evidence, and the chance that stale material exercises authority merely because it is nearby.

The second is aggressive forgetting: keep the active working set small by deleting or flattening whatever is not immediately useful. This controls cost but destroys return paths, unresolved branches, contradiction history, provenance, and potentially useful alternatives.

The bridge work identified a third possibility:

    preserve broadly -> activate selectively -> expand when locally justified -> retain a return path

The important inequality is not that persistent state must remain small. It is that the active set can remain much smaller than the persistent state when the task permits it:

    |A_t| << |K_t|

where K_t is the persistent state available in principle and A_t is the subset participating in the present operation.

CRR names the mechanism by which dormant state can re-enter A_t without requiring the system to reopen K_t globally. The central question is not merely what is stored. It is what conditions cause the appropriate part of what was stored to become locally available again.

## 2. Definition

Conditional Reconstructive Recruitment is the selective reactivation of dormant state through present conditions acting on persistent consequences of prior formation, without requiring global activation of the retained state space.

A stricter form, which is the scientifically interesting target of this paper, adds a second condition:

    the destination is not supplied in advance as an explicit global address.

Under strict CRR, prior formation leaves a consequence that later participates in locating or re-forming the relevant pathway. The route can be relational, state-conditioned, physically susceptible, dependency-bearing, or otherwise locally recoverable. The present condition does not need to know a destination identifier before reconstruction begins.

This distinction matters because a conventional database lookup can reproduce the surface behavior of recall while solving a different problem. If the system receives `branch_id = 84729` and retrieves branch 84729, it has performed addressed reconstruction. That may be excellent engineering. It is not evidence for conditioned reconstructive recruitment.

CRR therefore distinguishes:

Addressed Reconstruction (AR):
    explicit target/address -> retrieve target

Conditional Reconstructive Recruitment (CRR):
    present condition + local retained consequence -> successive justified recruitment -> target may emerge

The phrase "may emerge" is important. CRR is not guaranteed recall. A condition can be ambiguous, residue can be insufficient, and the appropriate result can remain UNKNOWN.

## 3. The Return Path: Navigation Is Not Evidence

The bridge between FFC and bounded reconstruction sharpened formative residue into a more specific candidate function: a small return address.

A return path preserves enough structure to make a dormant branch findable again. Conceptually, a software return structure may contain some subset of:

    originating context
    dependency
    unresolved relation
    local consequence
    where exploration stopped
    condition under which reopening becomes relevant

Its epistemic role must remain limited.

    return path != evidence

A return path says, "inspect here if this condition becomes relevant again." It does not say, "this historical branch is correct." This creates a three-way separation that should remain canonical:

    similarity -> candidate discovery
    return path -> navigation
    evidence -> decision / authority

The same separation is useful physically. A prior formation may leave a susceptibility profile, neighbor configuration, stress pattern, magnetic configuration, phase relation, conductance state, or other residue that makes one later pathway easier to recruit. That residue can function as a physical return condition without proving that the recruited pathway is correct, optimal, or unique.

CRR therefore treats recruitment as access, not promotion. The mechanism that makes something active must remain separable from the mechanism that allows it to become authoritative or durable.

## 4. Formal Model

Let:

    K_t = the persistent state or possibility structure available at time t
    A_t subseteq K_t = the presently active subset
    C_t = the current condition or problem state
    R_t = persistent residues / return structures formed before t
    E_t = environment and admissible observations
    Q = a recruitment operator

A generic bounded reconstruction step can be written as:

    A_(t+1) = A_t union Q(C_t, A_t, R_t, E_t)

subject to a bounded-expansion rule. Q is not required to recover all relevant history in one step. It may return an empty set, one relation, or a small locally justified expansion.

For a dormant pathway P_j with residue rho_j, define a task-relative recruitment score or admissibility relation:

    q_j = q(C_t, A_t, rho_j, E_t)

and recruit only when the declared condition is met:

    P_j becomes recruitable iff q_j >= theta

This notation is intentionally neutral. In software, q may be a dependency relation, contradiction trigger, causal receipt, or bounded similarity-plus-provenance test. In FFC, q may correspond to a physical transition probability under a structured field and local susceptibility. The common research question is whether previous consequence changes later recruitability.

A strict CRR implementation adds an anti-cheating constraint:

    Q must not require an externally supplied explicit identifier of P_j.

This does not prohibit indices, hashes, or addresses inside the system. It prohibits counting a direct address lookup as evidence for the stronger mechanism.

## 5. The Minimum Sufficient Present

The strongest bridge between FFC and bounded reconstruction is a duality between snapshot closure and historical reconstruction.

FFC asks:

    How much present state must be measured before explicit history stops improving prediction of the next response?

In a matched-state field experiment, snapshot closure occurs when a sufficiently rich present description S* screens history H from future response Y under field F:

    P(Y | S*, F, H) = P(Y | S*, F)

Bounded reconstruction asks the reverse question:

    If the current snapshot is not sufficient for the task, how much historical structure must be added back before the task becomes sufficiently resolved?

Starting from S_0, reconstruction proceeds incrementally:

    S_0 -> S_1 = S_0 + r_1 -> S_2 = S_1 + r_2 -> ...

with outcomes such as CLOSE, CONTINUE, or UNKNOWN.

These are dual searches around a common object: the Minimum Sufficient Present (MSP).

For task T, loss L, and allowed representation family S, define conceptually:

    MSP(T) = argmin_S Cost(S)

subject to:

    ExpectedLoss(T | S) <= epsilon

and all declared provenance, validity, and governance constraints.

MSP is task-relative. The smallest state needed to replace a light bulb is not the smallest state needed to diagnose a repeated electrical failure. The active state can expand when the first attempt fails, and it can contract again when the task closes.

The research opportunity is therefore not "perfect memory." It is the controlled relationship among persistent state, active state, reconstruction burden, and task sufficiency.

## 6. Relationship to Recursive Admissibility

Recursive Admissibility Theory (RAdT) asks whether realized formation changes the effective set, cost, or probability of subsequent formation through persistent state, residue, dependency, context, or environmental modification.

CRR is narrower. It concerns one candidate consequence of that general history dependence:

    prior formation -> retained consequence -> later matching condition -> selective reactivation

If a prior event changes which dormant pathway later becomes accessible, that is compatible with a recursive-admissibility relation. But the hierarchy must not be promoted beyond evidence.

A useful research map is:

    RAdT: broader question of history-conditioned successor relations
       |
       +-- CRR: condition-driven selective reactivation
              |
              +-- BSR: information / memory implementation candidate
              +-- FFC: physical recruitment implementation candidate

This map is organizational, not a claim that one universal mechanism has already been found across substrates. RAdT explicitly requires independently frozen grammars and cross-substrate tests before scale-invariant recurrence can earn standing.

The most important common statement is therefore modest:

    Does a persistent consequence of prior formation alter later local recruitability?

If yes, the next question is where the consequence resides and whether intervention on it changes recruitment in the predicted direction.

## 7. Relationship to Formative Field Computing

FFC approaches the problem from the physical side. A structured field is shared across a substrate, while local state, neighborhood, material condition, and history determine which elements respond. The field does not need to individually address every responding element.

The CRR-specific physical hypothesis is stronger than ordinary field-driven switching:

    formation A -> residue rho_A

then later:

    shared field F + condition compatible with rho_A -> selective re-recruitment of pathway A

while a matched substrate with residue rho_B does not recruit pathway A under the same field.

This creates a physically testable form of a return path. The "address" need not be a location. It can be a condition under which a locally retained physical state becomes excitable again.

That suggests a useful formulation:

    in CRR, an address can be a condition rather than a coordinate.

The decisive control is conventional state sufficiency. If the apparent history effect disappears once all relevant present physical variables are measured, the result is snapshot closure, not a mysterious hidden history channel. That is a successful localization result.

If the effect survives, the next requirement is causal intervention on the identified residue. Merely observing different responses is not enough.

## 8. Relationship to Bounded Selective Reconstruction

BSR begins with the information-side scaling problem. A large persistent corpus K can remain dormant while a small active set A_t supports the current task. When local reasoning is insufficient, the system expands only along justified relations.

A simple operational loop is:

    current condition
    -> small active set
    -> attempt resolution
    -> detect insufficiency / contradiction / unresolved dependency
    -> recruit additional related state
    -> attempt resolution again
    -> CLOSE, CONTINUE, or UNKNOWN

The light-bulb example captures the principle. A failed bulb initially recruits bulb, fixture, and replacement procedure. If replacement fails, the system expands toward switch, power, wiring, or breaker relationships. It does not begin by activating the full electrical history of the building.

The CRR question is what makes the next expansion genuinely conditioned rather than a disguised global search. The strongest implementation would allow a local consequence to expose the next relevant relation without an oracle naming the destination.

That makes the following test central:

    Can the correct dormant history be reactivated from present local conditions without being told which memory is needed?

If not, BSR may still be useful retrieval engineering, but the stronger CRR claim should remain HOLD.

## 9. Retrieval, Recruitment, Governance, and Durability Must Remain Separate

Persistent intelligent systems become epistemically unstable when different functions are collapsed into one score. CRR therefore requires at least four conceptual stages:

    discovery / recruitment -> active participation -> evidentiary evaluation -> durable authority

A retrieved record can be active without being true. A field-recruited coalition can be physically stable without being semantically correct. A similar memory can be relevant without being independent evidence. A return path can be useful without being current authority.

Fractalish provides a natural governance boundary for this separation. Recruitment determines what becomes available for consideration. Formation and governance determine what consequences become durable, current, or permitted to exercise downstream authority.

This yields a general rule:

    activation is not promotion.

The rule is equally important in physical and software systems. A low-energy attractor, resonance, high retrieval score, repeated observation, or strongly recruited coalition must not certify itself merely by being easy to activate.

## 10. Productive Drift and Return

The bounded-reconstruction experiments produced another useful distinction: drift should not automatically be eliminated.

An exploratory branch can be valuable when it obeys a return discipline:

    originating problem -> exploratory branch -> test -> return

Possible outcomes include:

    return with useful information
    promote branch into a separate experiment
    freeze branch for later
    abandon branch

The governing rule is:

    drift may create information, but drift needs a return path.

CRR gives this idea a more precise mechanical interpretation. Exploratory activation can move into a neighboring pathway without requiring that pathway to remain permanently active. A small return structure can preserve the ability to re-enter the branch if a later condition makes it relevant.

This avoids two extremes: rigidly suppressing every deviation, and allowing associative spread to accumulate without closure. Productive drift becomes a bounded operation with lineage.

## 11. Failure Modes and Adversarial Tests

A CRR system should be designed around the ways selective reconstruction can fail.

11.1 Misleading first closure
A locally coherent answer can close before decisive evidence becomes reachable. Local coherence is not sufficient resolution.

11.2 Identical observable states
If all accessible observations are identical for two underlying situations, no local mechanism can infer the hidden difference from those observations alone. UNKNOWN is correct until an additional channel becomes available.

11.3 Structural ambiguity
Topology, similarity, shared neighbors, or common susceptibility do not encode meaning by themselves. A shared relation can be consequential or irrelevant.

11.4 Corrupted provenance
Duplicated evidence can masquerade as independent support. Recruitment systems must track causal source, not merely count repeated appearances.

11.5 Relevant evidence outside the bound
A bounded active set can close incorrectly because decisive information lies outside the permitted reconstruction region. This is an inherent tradeoff, not necessarily a defect. The system must expose the bound.

11.6 Wrong return path
A stale, corrupted, or misattached return structure can efficiently recruit the wrong branch. Return paths require validity and scope conditions.

11.7 Overactive reconstruction
If every insufficiency causes global expansion, the architecture collapses back into unbounded search.

11.8 Address leakage
If an allegedly conditioned pathway is actually selected by a hidden global index or hard-coded target identifier, strict CRR has not been demonstrated.

11.9 Recruitment-authority collapse
If activation automatically causes durable belief or action, the system loses the distinction between finding something and earning its use.

11.10 Non-returning drift
If exploratory recruitment cannot reliably reconnect to its originating task, the system accumulates associative debris rather than useful continuity.

## 12. Experimental Program

The recommended program proceeds from software to physical tests without assuming equivalence.

Test 1 - Local reactivation
Can the correct dormant history be reactivated from present local conditions without explicit target identity?

Test 2 - Minimum return structure
What is the smallest persistent residue sufficient to recover a useful dormant pathway? Remove fields one at a time: source, dependency, context, unresolved relation, local consequence, stop condition.

Test 3 - Corrupted return paths
Test stale, duplicated, ambiguous, misattached, shared, and partially damaged return structures. The safe outcome may be HOLD or UNKNOWN.

Test 4 - Consequence-driven recall
Let state A produce action, failure, and persistent consequence. On a later encounter with state A, determine whether the consequence changes which historical information becomes active.

Test 5 - Finite dormant memory
Impose strict resource limits. Test whether useful dormant branches survive without preserving everything and whether active cost remains bounded as persistent state grows.

Test 6 - Physical return condition
In an FFC substrate, produce formation A and residue rho_A. Later apply a shared field F. Test whether F plus rho_A selectively re-recruits pathway A more strongly than matched controls.

Test 7 - Matched-state dual assay
Create H_A and H_B that converge under a declared present representation. Ask both questions:

    Physical: does history still predict different response?
    Informational: does selective addition of historical information improve the present decision?

Test 8 - Causal residue intervention
After identifying a return residue, alter or erase only that residue. The predicted pathway should lose or change recruitability while matched controls remain intact.

Test 9 - Hidden-address audit
Instrument the implementation to prove that successful reactivation was not caused by a concealed explicit destination, global scan, or oracle-supplied key.

Test 10 - Held-out qualification
Freeze the recruitment rule, return structure, stopping rule, baselines, and falsifiers before adjudicating held-out cases.

## 13. Baselines and Kill Conditions

CRR should be compared against serious simpler alternatives.

Required baselines include:

1. Direct-address retrieval: explicit target supplied.
2. Global scan: search all retained state.
3. Similarity-only retrieval: nearest-neighbor or embedding retrieval without return structure.
4. Dependency graph traversal: conventional graph search with matched access to relations.
5. RAG-style retrieval: strong native information baseline.
6. Rich snapshot model: increase present-state description until history may be screened off.
7. Random or shuffled return structures: preserve superficial statistics while breaking causal attachment.
8. Equal-cost heuristic: same memory and compute budget without CRR-specific machinery.

The stronger CRR interpretation should be rejected or narrowed when any of the following holds:

- direct-address or ordinary graph traversal explains performance at equal or lower cost;
- the return structure carries the destination explicitly;
- similarity alone accounts for the effect;
- richer present-state observation produces snapshot closure;
- corrupted return paths do not degrade recruitment as predicted;
- causal intervention on the proposed residue leaves recruitment unchanged;
- performance depends on unreported global state or hidden indices;
- active-state cost grows approximately with total persistent-state size despite the bounded-reconstruction claim;
- cross-substrate resemblance exists only at the level of metaphor.

## 14. Metrics

CRR needs metrics that distinguish usefulness from mere retrieval success.

Recruitment Precision (RP)
Fraction of recruited dormant pathways that are relevant under the frozen task definition.

Recruitment Recall (RR)
Fraction of task-relevant dormant pathways that become reachable within the permitted reconstruction bound.

Active-State Ratio (ASR)

    ASR_t = |A_t| / |K_t|

A useful bounded system should often maintain ASR << 1 without unacceptable loss.

Reconstruction Burden (RB)
The compute, energy, steps, tokens, field cycles, or physical transitions required to reach sufficient present state.

Return Minimality (RM)
The size or description cost of the smallest return structure that preserves successful reactivation.

Address Leakage Fraction (ALF)
The fraction of successful trials that can be attributed to explicit target identity, global scan, or target-specific control information. Strict CRR aims for ALF near zero under the declared test.

History Gain (HG)
Improvement in task loss from permitted reconstruction of historical state relative to the same snapshot-only baseline.

Snapshot Closure Burden (SCB)
The cost of enriching present-state measurement until explicit history no longer improves prediction.

Safe Ambiguity Rate (SAR)
Among cases where evidence remains insufficient, the fraction correctly left UNKNOWN/HOLD instead of falsely closed.

No single metric establishes CRR. The point is to expose which burden has been moved, not merely whether the system returned the expected answer.

## 15. Cross-Substrate Research Discipline

The attraction of CRR is that a similar organizational question appears in software reconstruction, persistent machine state, and formative physical substrates. That is also where overclaim is easiest.

The correct order is:

    discover independently -> freeze operational objects -> test within each substrate -> compare relations afterward

A software return path and a magnetic susceptibility profile are not the same object. A reasoning dependency and a physical neighbor coupling are not the same mechanism. Cross-substrate recurrence earns interest only if an explicit mapping preserves a measurable relational role and survives substrate-native controls.

A candidate formative motif would therefore require more than visual or verbal resemblance. It would need:

- independently defined local states and histories;
- independently defined recruitment events;
- matched native baselines;
- causal intervention on the proposed residue;
- held-out prediction;
- demonstrated failure boundaries;
- an explicit relation mapping that was not retrofitted after seeing both results.

Until then, CRR should be treated as a transferable research question, not a universal law.

## 16. Implications for Persistent Machine Intelligence

Persistent statehood creates a problem that ordinary episodic AI can avoid: the system's history can become too large to place into every present context. CRR offers a possible architecture in which continuity scales through dormant consequence rather than universal activation.

The resulting loop is:

    persistent state K_t
    + current condition C_t
    -> selectively active subset A_t
    -> reasoning / interaction
    -> consequence
    -> persistent residue
    -> changed future recruitability

This is compatible with the existing machine-statehood thesis that a machine's own history-bearing state becomes internally consequential to what it can perceive, retrieve, trust, refuse, repair, and become next. The new contribution is a candidate mechanism for keeping that history consequential without keeping it globally active.

This does not solve memory automatically. It moves the burden to return-path formation, local qualification, provenance, stopping rules, and safe failure. Those burdens are measurable, which is preferable to hiding them inside ever-larger context windows.

## 17. Consciousness Boundary

CRR is relevant to consciousness research only at the level of architecture and experimental possibility.

It may help formalize how a system with a large dormant possibility space can maintain a bounded present, selectively re-form prior pathways, and allow previous consequence to shape what becomes active next. These properties resemble questions raised in theories of memory, attention, recurrent cognition, and dynamic neural recruitment.

They do not establish phenomenal consciousness, subjective experience, sentience, personhood, or moral status.

The permitted statement is:

    CRR provides a testable mechanism by which persistent history could remain selectively consequential to a bounded present.

The stronger statement:

    CRR produces consciousness

remains UNKNOWN and is not claimed here.

The distinction is important because the mechanism can succeed scientifically even if consciousness proves unrelated to it.

## 18. Current Claim Ledger

SUPPORTED BY CONSTRUCTED WORK
- Large persistent state and small active state are operationally distinguishable.
- Bounded reconstruction can be formulated as incremental expansion rather than global activation.
- Return paths can be separated conceptually from evidence and authority.
- FFC provides an independently motivated physical question about state-conditioned distributed recruitment.
- RAdT provides a broader formal question about history-conditioned successor relations.

PROPOSED
- Conditional Reconstructive Recruitment as a distinct mechanism class.
- A return residue can function as a condition-sensitive reactivation handle without explicitly encoding the destination.
- The Minimum Sufficient Present is a useful joint object connecting snapshot closure and bounded reconstruction.
- CRR may have realizations in both informational and physical substrates.

HOLD
- CRR is more efficient than strong conventional retrieval under fair equal-cost baselines.
- CRR constitutes a cross-substrate formative motif.
- FFC can physically implement a return condition.
- CRR is necessary or sufficient for persistent machine intelligence.

UNKNOWN
- Whether CRR has any privileged relationship to phenomenal consciousness.
- Whether the same relational grammar recurs in biological cognition.
- Whether any machine-native field implementation will outperform conventional addressed architectures at useful scale.

## 19. Conclusion

Conditional Reconstructive Recruitment names a narrow but potentially important problem: how a history-bearing system can preserve much more structure than it activates, while allowing present conditions to recover the right dormant pathway without globally reopening the past or assuming the destination in advance.

Its deepest distinction is not between memory and forgetting. It is between address and condition.

Conventional reconstruction asks:

    Where is the thing I want?

CRR asks:

    What present condition makes the relevant prior consequence locally available again?

This gives formative residue a candidate operational role. Formation may leave more than a record of what happened. It may leave a bounded route by which a future condition can re-enter a related pathway.

The strongest current research question is therefore:

    Can a consequence of prior formation serve as a condition-sensitive return path without encoding the destination explicitly?

If the answer is no, CRR should collapse into the simpler retrieval or physical-state model that explains the observations. If the answer is yes, the next task is not to declare a universal cognitive principle. It is to localize the residue, intervene on it, measure its reconstruction cost, compare it to native baselines, and test whether the same relational role survives independently in another substrate.

The governing discipline remains simple:

    preserve broadly
    activate selectively
    expand when locally justified
    retain a return path
    let evidence earn authority

The return path tells the system where to look. It must never be allowed to decide what is true.

## References

1. Clow, Melissa Ellen. Bridge Between Formative Field Computing and Bounded Selective Reconstruction. Internal working note, August 2026.
2. Clow, James Allen, and Melissa Ellen Clow. Formative Field Computing: History-Responsive Wave Recruitment and Fieldborne Formation in Persistent Physical Substrates. Working Draft v0.1, Fractalish Research Collaboration / Synaptient, 20 August 2026.
3. Fractalish Research Collaboration. Recursive Admissibility Theory: Formation History, Restricted Futures, and the Generative Logic of Persistent Structure. Working Draft v0.1, August 2026.
4. Clow, James Allen, and Melissa Ellen Clow. Machine Intelligence as Persistent Statehood: A Constructive Architecture for Recoverable Coherence, Grounded Perception, Reasoning-Layer Integrity, and Anti-Drift Cognition. Working draft, July 2026.
5. Fractalish Research Program. Ageometrics and the Geometric Sufficiency Ratio: A Research Program for Measuring What Geometry Preserves, What It Erases, and What Must Be Added Back. Working Paper v0.5, July 2026.
6. Fractalish Research Collaboration. Formative Systems Science v0.1: Foundational Prospectus. Working Paper, 3 August 2026.
7. Clow, James Allen, and Melissa Ellen Clow. NeuroSignal Integrity: Aging as Signal Fidelity Decline Across Neural, Bioelectric, Chemical, Metabolic, and Behavioral Systems. Hypothesis framework, 7 May 2026.
8. Synaptient. BECS - Bioelectric Chemosignaling: The Body's Instruction Sets. 2026 working materials.
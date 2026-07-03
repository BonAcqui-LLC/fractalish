# Ageometrics and the Geometric Sufficiency Ratio

## A Research Program for Measuring What Geometry Preserves, What It Erases, and What Must Be Added Back

**Version:** 0.5 working paper  
**Date:** July 2026  
**Public attribution:** Synaptient  
**Status:** Decision-theoretic working paper with a minimal reproducible illustration; cross-domain validation, sensitivity analysis, observer-envelope testing, and exhaustive prior-art review remain incomplete

## Abstract

Geometry is among the most powerful representational technologies ever developed. Physical systems, social relations, linguistic meanings, causal networks, computational states, memories, trajectories, and probability distributions can all be embedded into spaces whose distances, neighborhoods, curvatures, symmetries, and topologies support analysis. This reach is a scientific triumph. It also creates a methodological danger: once almost anything can be represented geometrically, the mere existence of a useful geometry ceases to show that geometry is causally, historically, semantically, or functionally sufficient.

This paper introduces **Ageometrics**, the quantitative study of the limits of geometric representation. Ageometrics does not reject geometry. It asks a stricter question: for a specified system, representation, and target of inquiry, how much of the relevant information is recoverable from geometry alone, how stable is that recovery under reasonable changes of representation, and what systematic residue remains outside the geometric account?

The paper proposes the **Geometric Sufficiency Ratio (GSR)** as a task-relative measure of the fraction of recoverable predictive or explanatory performance captured by a geometric representation relative to a declared fuller reference record. The canonical formulation is defined through expected loss and Bayes-optimal risk, while empirical GSR is explicitly protocol-dependent and requires matched data access, evaluation folds, loss, tuning effort, and comparator discipline. It also defines the complementary **Non-Geometric Residue (NGR)** and develops interventional, temporal, representation-stability, and encoding-cost extensions. A first taxonomy of residue is proposed: temporal, causal, provenance, contextual, algorithmic, semantic, identity, and energetic residue.

A minimal reproducible illustration plants temporal information outside a declared terminal-geometric representation. Using the same logistic learner and matched training protocol for the geometric representation and fuller-record inputs, the geometric representation retains only about one fifth of the log-loss improvement available from the fuller record in the seeded example. The illustration shows that GSR can be estimated against an intentionally controlled missing channel; it is not broad empirical validation of Ageometrics.

Ageometrics is positioned beside, but not reduced to, information bottleneck theory, sufficient dimension reduction, predictive V-information, causal representation learning, contextuality, topological data analysis, geometric deep learning, and algorithmic information theory. Recent work on geometric factorization of sufficient harmonic representations provides a useful positive complement: it asks when a specified geometric quotient is sufficient under declared invariances and model assumptions. Ageometrics asks the complementary empirical question of how much target-relevant decision value survives declared compression into geometry, how stable that answer is across observers and representations, and what typed residue remains.

The strongest near-term application is artificial intelligence memory. In a history-bearing artificial system, the full developmental record can be retained, allowing direct measurement of how much causal and autobiographical structure survives compression into embeddings, graphs, attractors, replay states, or memory topologies. Cognitive Basin is an important instrumented application of that question, but the mathematical framework does not depend on acceptance of any one memory architecture. External agent-memory systems such as AutoMem likewise provide inspectable trajectories, memory operations, and downstream behavior that can serve as benchmark settings without becoming synonymous with the Basin.

## 1. The Problem Hidden Inside Geometry's Success

The sciences have repeatedly advanced by finding the right geometry. Celestial mechanics became tractable through trajectories and conic sections. Relativity redefined gravity through spacetime geometry. Statistical models acquired information geometry. Networks became graphs. Data became point clouds and manifolds. Machine learning turned words, images, proteins, users, and concepts into coordinates. Modern geometric deep learning now offers a unifying language for grids, graphs, groups, manifolds, gauges, and symmetries.

The achievement is so broad that it can conceal its own limit.

A representation may be geometrically expressive enough to encode nearly any structure placed into it. A graph can record ancestry if ancestry is supplied as directed edges. A high-dimensional vector can encode a timestamp if the timestamp is included among the coordinates. A manifold can carry provenance labels if provenance is attached as an additional field. A state space can contain a complete event history if every event is assigned another dimension.

At some point, however, the statement that a system has been represented geometrically becomes empty. The geometry may no longer explain or compress the system; it may simply rename the complete record.

This produces a hierarchy that is often collapsed:

1. A phenomenon **can be represented geometrically**.
2. A geometric representation is **useful for a task**.
3. The geometry is **sufficient for predicting a target**.
4. The geometry is **causally explanatory**.
5. The geometry preserves the system's **history, identity, or semantics**.
6. The geometry is the **minimal or natural ontology** of the system.

Each step requires additional evidence. None follows automatically from the previous one.

Ageometrics begins at the gap between the first two steps and the rest.

## 2. Definition of Ageometrics

**Ageometrics is the quantitative study of information, causality, identity, behavior, history, or meaning that is not preserved by a specified geometric representation alone.**

The adjective *specified* is essential. Ageometrics does not claim that some fact is metaphysically incapable of geometric encoding. With enough dimensions, labels, auxiliary fields, temporal indices, and special metrics, almost any finite record can be made geometric.

The real question is operational:

> What must be added to a geometric representation before it becomes sufficient for the target, and at what point has the representation stopped being a genuine geometric compression and become the original system written in coordinates?

Ageometrics therefore treats geometric insufficiency as relative to four declared objects:

- the **system record** \(X\);
- the **geometric representation** \(G(X)\);
- the **target property or task** \(Y\);
- the **admissible predictor or inference class** \(\mathcal{F}\).

Without these declarations, claims of sufficiency are too vague to test.

For technical disambiguation, the full field label used in this paper is **Ageometrics: Geometric Sufficiency and Residue Analysis**. The word *ageometric* already appears as a specialized adjective in geometric group theory, especially in work on outer automorphisms of free groups. That usage is unrelated to the present proposal. The collision should be disclosed in metadata and search descriptions, but it does not presently appear to identify an existing field devoted to geometric sufficiency or residue.

## 3. Geometry, Topology, and Form

Ageometrics uses *geometry* in a broad operational sense. It includes representations organized primarily through:

- points and coordinates;
- distances and similarities;
- neighborhoods;
- graphs and hypergraphs;
- manifolds;
- curvature;
- symmetry;
- topology;
- embeddings;
- attractor landscapes;
- spatial or relational morphologies.

This breadth is intentional because the scientific issue is not limited to Euclidean shape. A memory graph, a latent vector space, a causal diagram, and a persistent-homology summary are all forms of structured relational representation.

Ageometrics is therefore not merely a critique of visual shape. It examines the sufficiency of any representation whose primary information is carried through arrangement, adjacency, metric relation, invariance, or form.

## 4. The Geometric Sufficiency Ratio

The original score-based form of GSR is intuitive, but a rigorous definition must prevent differences in model power, tuning effort, data access, or score scaling from masquerading as geometric residue. The canonical metric is therefore defined first through predictive risk, followed by a protocol-specific empirical estimator.

### 4.1 Declared objects and benchmark protocol

Let:

- \(X\) denote the declared fuller reference record available at the prediction or decision time;
- \(G(X)\) denote a specified geometric representation derived from \(X\);
- \(B\) denote the declared baseline information or baseline predictor;
- \(Y\) denote the target property, outcome, or response;
- \(\ell\) denote the declared loss function, with lower values preferred;
- \(\Pi\) denote the complete empirical comparison protocol.

The protocol \(\Pi\) must include:

- data-access rules and temporal availability;
- train, validation, and test partitions;
- model or inference families;
- capacity and compute budgets;
- hyperparameter-search budgets;
- optimization stopping rules;
- scoring or loss definition;
- uncertainty estimation;
- leakage controls.

The term *fuller reference record* is intentional. \(X\) is not presumed to be a metaphysically complete description of the system. It is the richest admissible record declared for the benchmark.

### 4.2 Canonical population definition

For any information source \(Z\), define its Bayes-optimal risk under loss \(\ell\) as

\[
R^\star_\ell(Z)
=
\inf_f
\mathbb{E}\left[\ell\left(Y,f(Z)\right)\right],
\]

where the infimum is taken over all admissible measurable predictors.

The **population Geometric Sufficiency Ratio** is

\[
\operatorname{GSR}^{\star}_{\ell,Y}(G\mid X,B)
=
\frac{
R^\star_\ell(B)-R^\star_\ell(G(X))
}{
R^\star_\ell(B)-R^\star_\ell(X)
},
\]

provided

\[
R^\star_\ell(B)>R^\star_\ell(X).
\]

This form asks what fraction of the risk reduction available from the fuller record is retained by the declared geometric representation.

### 4.3 Boundedness under the canonical assumptions

When \(G(X)\) is derived from \(X\), the fuller record contains at least the information available in its geometry. Under Bayes-optimal comparison,

\[
R^\star_\ell(X)
\leq
R^\star_\ell(G(X)).
\]

If the geometry is at least as informative as the baseline,

\[
R^\star_\ell(G(X))
\leq
R^\star_\ell(B).
\]

Together these imply

\[
0
\leq
\operatorname{GSR}^{\star}_{\ell,Y}
\leq
1.
\]

Interpretation:

- GSR near \(1\): geometry retains nearly all recoverable target-relevant information available in the fuller reference record;
- GSR near \(0\): geometry retains little beyond the baseline;
- intermediate GSR: geometry is useful but incomplete.

A value outside this interval is not a property of the population definition. It is evidence that an empirical estimate is affected by sampling variation, optimization error, regularization, model-class mismatch, data leakage, or an invalid nesting assumption.

### 4.4 Protocol-specific empirical estimator

Bayes risks are rarely available. For a declared protocol \(\Pi\), let

- \(\widehat R_{\Pi}(B)\) be cross-validated or held-out baseline risk;
- \(\widehat R_{\Pi}(G)\) be geometry-only risk;
- \(\widehat R_{\Pi}(X)\) be fuller-record risk.

Define the empirical estimator

\[
\widehat{\operatorname{GSR}}_{\Pi}
=
\frac{
\widehat R_{\Pi}(B)-\widehat R_{\Pi}(G)
}{
\widehat R_{\Pi}(B)-\widehat R_{\Pi}(X)
}.
\]

The three risks must be estimated on the same held-out cases and under a comparator protocol designed to isolate representation rather than model advantage.

At minimum, researchers should report three empirical views:

1. **Same-learner GSR**: the same learning algorithm and tuning budget are applied to geometry and fuller record where technically possible.
2. **Capacity-matched GSR**: model capacity, compute, and search effort are matched when the input structures require different model forms.
3. **Model-envelope GSR**: results are reported across several credible model families to show whether the conclusion depends on one learner.

A nested model design is preferable when available: the fuller-record predictor should contain the geometry-only predictor as a restricted case. Even then, final conclusions must use out-of-sample risk rather than training fit.

### 4.5 Restricted predictive families and V-GSR

When empirical GSR is estimated under a restricted predictive family rather than the Bayes-optimal observer, the result is observer-relative. This constrained setting is operationally important because real studies are conducted through declared learners, architectures, compute budgets, and optimization procedures rather than idealized unrestricted prediction.

### 4.5.1 Operational Guidance for V-GSR Views

When reporting V-GSR, three complementary views are useful. The appropriate view depends on the scientific question, input structures, and available computational budget.

#### Same-Learner V-GSR

Use the same declared predictive family, architecture, preprocessing policy, hyperparameter-search budget, optimization procedure, data partitions, random-seed policy, and stopping rule for both the geometric representation and the fuller record.

This view holds the declared observer and much of the training protocol fixed, reducing major learner-capacity and optimization confounds. It does **not** make the comparison architecture-neutral. Different representations may vary in dimensionality, conditioning, sample efficiency, optimization difficulty, or compatibility with the learner's inductive biases. The result must therefore be interpreted as representation sufficiency relative to the declared observer and protocol.

#### Approximately Capacity-Matched V-GSR

Use this view when the input types require fundamentally different architectures, such as graph, sequence, image, field, or set-based models. Match the systems as closely as practicable in parameter count, training compute, data exposure, tuning effort, regularization, and stopping criteria.

Exact capacity equivalence across architecture families is generally unavailable. Report the matching variables, tolerances, and remaining asymmetries explicitly. Do not describe a comparison as capacity-matched without declaring how capacity and search effort were operationalized.

#### Model-Envelope V-GSR

Evaluate GSR across a preregistered or otherwise justified collection of credible predictive families. Report the distribution and a declared summary such as the median, range, interquartile range, or lower quantile.

This is the most robustness-oriented view because it exposes dependence on observer choice. It is not automatically numerically conservative: conservatism depends on the aggregation rule selected in advance.

#### Reporting recommendation

For routine empirical work, report same-learner V-GSR as the primary estimate and identify:

- predictive family and architecture;
- representation-specific preprocessing;
- training, validation, and test partitions;
- optimization and regularization procedures;
- tuning budget;
- stopping rule;
- random-seed policy;
- uncertainty estimate.

Where architecture choice is materially coupled to representation type, approximately capacity-matched or model-envelope analysis should become primary. Claims approaching representation-independent sufficiency require evidence across an appropriately broad observer envelope.

| View | Primary purpose | What is held or matched | Principal limitation | Recommended use |
| --- | --- | --- | --- | --- |
| Same-Learner | Hold the declared observer fixed | Family, architecture, protocol, search budget, partitions, stopping rule | Representation-architecture interactions remain | Default empirical estimate |
| Approximately Capacity-Matched | Compare structurally different input types | Parameters, compute, data exposure, tuning effort, regularization | Exact cross-architecture equivalence is unavailable | Graph vs. sequence vs. set/image comparisons |
| Model-Envelope | Test observer robustness | Credible range of predictive families | Highest computational cost; summary rule matters | High-stakes, summary, or architecture-sensitive claims |

Predictive V-information is explicitly observer-relative: it measures usable information under a declared predictive family. The same discipline must be preserved in V-GSR. A fixed learner reduces important confounds but does not remove all representation-dependent effects.

### 4.6 Out-of-range empirical estimates

An empirical estimate may be negative when the geometry-only path performs worse than baseline. It may exceed one when the geometry-only model generalizes better than the fuller-record model because of finite samples, regularization, optimization, or comparator imbalance.

Such values should be preserved rather than silently clipped, but interpreted as **empirical diagnostics**, not literal negative or super-complete residue.

Recommended reporting:

- raw empirical GSR;
- a confidence interval from paired bootstrap or repeated cross-fitting;
- the three component risks;
- same-learner, capacity-matched, and model-envelope results where feasible;
- a diagnosis of any interval violation;
- an optional clipped display value used only for visualization.

### 4.7 Non-Geometric Residue

The canonical **Non-Geometric Residue** is

\[
\operatorname{NGR}^{\star}_{\ell,Y}
=
1-
\operatorname{GSR}^{\star}_{\ell,Y}.
\]

Under the canonical assumptions, NGR lies in \([0,1]\). It is the fraction of recoverable risk reduction available in the fuller reference record that is not retained by the declared geometry.

For empirical work,

\[
\widehat{\operatorname{NGR}}_{\Pi}
=
1-
\widehat{\operatorname{GSR}}_{\Pi}
\]

is a signed diagnostic and may fall outside \([0,1]\). Researchers must label it accordingly.

NGR is not a metaphysical non-geometric substance. It is a target-, representation-, loss-, and protocol-relative performance gap.

### 4.8 Minimal reproducible illustration

The current synthetic illustration uses one seeded generative process, one predictive family, and one planted residue class: temporal information excluded from the declared terminal-geometric representation. The declared geometry consists only of the final geometric coordinates used for prediction; it does not claim pairwise identical terminal geometry across examples.

Using the same logistic learner and matched preprocessing pipeline for both inputs, the seeded example yields:

- baseline log loss `0.6931346805078615`
- geometry-only log loss `0.6167793772454127`
- fuller-record log loss `0.3287583211635697`
- empirical GSR `0.2095506508705805`
- 95 percent paired bootstrap interval `[0.18923265136981707, 0.23131519077455637]`

This is a minimal reproducible illustration that the GSR protocol can detect controlled insufficiency. It is not a validation suite, a proof of cross-domain adequacy, or evidence that geometric residue has been characterized exhaustively.

**Note on scope.** This demonstration uses one seeded generative process, one predictive family, and one planted residue class: temporal information excluded from the declared geometric representation. It is intended as a minimal reproducible illustration that the GSR protocol can detect controlled insufficiency. It does not establish cross-domain validity, representation independence, or robustness across learner families. Systematic testing across seeds, sample sizes, residue classes, representation families, and observer envelopes is reserved for the benchmark program described in Section 20.

### 4.9 Worked example

Suppose a task has baseline accuracy of \(0.75\), geometry-only accuracy of \(0.80\), and fuller-record accuracy of \(0.95\). Accuracy here is treated as expected zero-one utility, so higher is better.

\[
\operatorname{GSR}
=
\frac{0.80-0.75}{0.95-0.75}
=
0.25.
\]

The geometry captured one quarter of the recoverable improvement above baseline, even though its raw accuracy was 80 percent.

The same calculation in loss form uses error rates:

\[
\operatorname{GSR}^{L}
=
\frac{0.25-0.20}{0.25-0.05}
=
0.25.
\]

### 4.10 Relationship to existing normalized scores

The algebraic normalization is not claimed to be unprecedented in isolation. Close relatives include forecast skill scores, relative error reduction, coefficients of determination, partial \(R^2\), and other reference-normalized performance measures.

The proposed contribution is the specialized experimental object:

- a declared geometric representation;
- a fuller admissible record;
- a task-relative sufficiency ratio;
- explicit comparator discipline;
- residue classification;
- interventional and temporal variants;
- representation-stability analysis;
- encoding-cost frontiers;
- matched-equivalence benchmarks.

Ageometrics should therefore claim a new research framing and measurement program unless later scholarship supports a stronger priority claim, not ownership of the general idea of normalized improvement. Formula-level overlap could reduce novelty without invalidating the diagnostic protocol, typed-residue program, restoration tests, or instrumented applications.

### 4.11 Information-theoretic companion

When mutual information is identifiable or credibly estimable, an information-theoretic companion is

\[
\operatorname{GSR}^{I}_Y(G\mid X)
=
\frac{I(G(X);Y)}{I(X;Y)}.
\]

Because \(G(X)\) is derived from \(X\), the data-processing inequality gives

\[
I(G(X);Y)
\leq
I(X;Y),
\]

placing the idealized information ratio in \([0,1]\) when the denominator is positive.

This form connects Ageometrics to information bottleneck theory. It should not be treated as the default empirical metric where high-dimensional mutual information cannot be estimated reliably.

## 5. GSR Is Task-Relative, Not Absolute

No representation is sufficient in the abstract. A road map may be sufficient for navigation and useless for reconstructing political history. A memory graph may predict retrieval latency while failing to distinguish trusted evidence from manipulation. A protein fold may predict binding while omitting the developmental route through which the fold was reached.

Accordingly, the notation should always retain the target:

\[
\operatorname{GSR}_{Y}(G).
\]

A single representation may have:

- high GSR for immediate classification;
- moderate GSR for robustness under perturbation;
- low GSR for causal attribution;
- near-zero GSR for provenance;
- undefined GSR for subjective meaning.

Ageometrics rejects claims such as “the geometry is sufficient” unless the target and conditions are stated.

## 6. Extensions of the Ratio

### 6.1 Interventional Geometric Sufficiency Ratio

Observational equivalence can hide causal differences. Two systems may occupy the same state and behave identically until disturbed.

Let \(S_G^{\mathrm{do}}\) and \(S_X^{\mathrm{do}}\) measure prediction of responses under intervention. Define

\[
\operatorname{IGSR}_Y(G)
=
\frac{S_G^{\mathrm{do}}-S_0^{\mathrm{do}}}
{S_X^{\mathrm{do}}-S_0^{\mathrm{do}}}.
\]

IGSR asks whether geometry predicts what the system will do when acted upon, not merely what it looks like during passive observation.

This extension is important because causal representation learning has shown that observational structure often fails to identify latent causal variables without interventions, temporal information, or restrictive assumptions.

### 6.2 Temporal Geometric Sufficiency Ratio

A final state can erase the order by which it was formed. Let \(H\) be the full event history and \(G_T(H)\) a geometry derived from the terminal state or a compressed trajectory. Define a temporal target such as next-state response, recovery rate, or vulnerability to relapse.

The Temporal GSR measures how much of that target is retained after history becomes form.

### 6.3 Representation-Stability Envelope

Let \(\mathcal{G}=\{G_1,\ldots,G_n\}\) be a family of reasonable geometric representations. Define the envelope

\[
\mathcal{E}_{\mathrm{GSR}}
=
\left\{
\operatorname{GSR}_Y(G_1),
\ldots,
\operatorname{GSR}_Y(G_n)
\right\}.
\]

A narrow, high envelope supports structural sufficiency. A wide envelope means that conclusions depend heavily on coordinate choice, metric, embedding dimension, segmentation, graph construction, or scale.

Useful summaries include:

- minimum GSR;
- maximum GSR;
- mean GSR;
- variance;
- worst-case GSR under admissible transformations;
- rank stability of conclusions.

### 6.4 Geometric Encoding Cost

A geometry can be made sufficient by injecting more information. The important question is how much.

Define an encoding-cost function \(C(G)\) that measures dimensions, labels, bits, auxiliary fields, or description length required by the representation. Then study the sufficiency-cost frontier:

\[
\left(C(G), \operatorname{GSR}_Y(G)\right).
\]

A representation that reaches GSR near one only after encoding every timestamp, source, intervention, and event may have no compression advantage.

This yields a critical test:

> Does geometry discover structure, or merely warehouse the complete record?

### 6.5 Minimal Residue-Restoring Channel

Let \(R\) be an auxiliary non-geometric channel, such as provenance, causal order, timestamps, or intervention labels. Define the smallest \(R^\ast\) such that

\[
\operatorname{GSR}_Y(G\oplus R^\ast)\geq \tau
\]

for a declared sufficiency threshold \(\tau\).

The content of \(R^\ast\) identifies what the geometry was missing.

## 7. A Taxonomy of Non-Geometric Residue

### 7.1 Temporal residue

Information dependent on sequence, duration, irreversibility, timing, or developmental path.

Examples:

- identical final weights reached through different curricula;
- identical scars formed by one severe event or many minor events;
- identical graph topology with different edge-creation order.

### 7.2 Causal residue

Information available only through mechanism, intervention, or counterfactual response.

Examples:

- two networks with the same correlation structure but different causal direction;
- two materials with identical visible morphology but different fracture response;
- two agents with identical outputs but different dependence on hidden tools.

### 7.3 Provenance residue

Information about origin, authority, chain of custody, manipulation, or evidentiary status.

Examples:

- a belief derived from direct measurement versus repetition;
- identical documents from authenticated and forged sources;
- the same memory supplied voluntarily or inserted coercively.

### 7.4 Contextual residue

Properties that cannot be assigned independently of the context in which they are measured or used.

Quantum contextuality supplies a rigorous neighboring example: locally consistent assignments may fail to extend to one global context-independent assignment. More generally, a system's state may not be separable from the operational frame used to elicit it.

### 7.5 Algorithmic residue

Differences in generative process, program length, computational depth, or construction rule not evident in the resulting geometry.

Two identical patterns may have radically different shortest descriptions or production costs.

### 7.6 Semantic residue

Meaning, obligation, reference, authority, intention, and normativity that are not guaranteed by distance or adjacency.

Two phrases can occupy nearby embedding coordinates while differing in legal force, irony, speaker commitment, or truth status.

### 7.7 Identity residue

Information about continuity, lineage, copying, restoration, replacement, and transformation history.

Two machine instances may have identical current states but different claims to continuity because one is a direct continuation and the other an unauthorized copy.

### 7.8 Energetic and metabolic residue

Information about the work required to reach or maintain a state.

Two systems may occupy the same configuration while differing in stored tension, thermal burden, depletion, retry history, or maintenance debt.

This category is particularly important in artificial cognition, where identical outputs can carry very different compute costs and failure risks.

## 8. Neighboring Fields and the Unfilled Gap

Ageometrics is not born in an intellectual vacuum. Its ingredients appear across several mature fields.

### 8.1 Information bottleneck and sufficient statistics

Information bottleneck theory formalizes the search for compressed representations that preserve information relevant to a target. Sufficient statistics ask whether a statistic retains all information needed for inference about a parameter. Sufficient dimension reduction asks whether high-dimensional predictors can be compressed without losing target-relevant structure.

Ageometrics inherits their task-relative rigor but asks a different primary question: what is lost specifically when the chosen compressed representation is geometric, and what kind of residue accounts for the loss?

### 8.2 Geometric deep learning

Geometric deep learning demonstrates how powerful geometric priors can unify neural architectures across grids, groups, graphs, geodesics, and gauges. Its success strengthens the need for Ageometrics. The more domains geometry successfully organizes, the more carefully researchers must distinguish useful representation from sufficient explanation.

### 8.3 Causal representation learning

Causal representation learning studies whether latent causal variables and relations can be recovered from high-dimensional observations. Identifiability results repeatedly show that extra assumptions, multiple environments, interventions, or temporal information are needed.

Ageometrics generalizes that lesson. Causal residue is one form of non-geometric residue, and IGSR is designed to measure it.

### 8.4 Contextuality

The sheaf-theoretic treatment of contextuality formalizes situations where locally valid assignments cannot be combined into one global assignment. This supplies a precise example of information that resists a naive global state-space account.

Ageometrics treats contextual obstruction as a residue class rather than claiming all residue is contextual.

### 8.5 Topological data analysis

Topological data analysis extracts robust multiscale features such as components, loops, and voids. Reviews of the field acknowledge both its power and its limitations, including insensitivity to non-topological changes and the need to incorporate geometric, spectral, combinatorial, or additional non-geometric information.

Ageometrics offers a quantitative framework for asking how sufficient a topological summary is for a declared task and what complementary channel restores the missing performance.

### 8.6 Algorithmic information theory

Algorithmic information theory distinguishes an object's description from its shortest generative program. This is relevant when identical geometry hides different construction histories or when a visually complex form is generated by a short rule.

Algorithmic residue may eventually be formalized through conditional description length.

### 8.7 The gap

Ageometrics shares foundations with several established programs. Blackwell's comparison of experiments supplies a decision-theoretic language for comparing information sources; proper scoring rules and forecast-skill methods provide evaluation tools; Information Bottleneck theory and sufficient dimension reduction study task-relevant compression; and predictive V-information directly informs the observer-relative V-GSR extension.

Recent work on geometric factorization provides a useful positive complement. Stewart (2026) establishes conditions under which quotienting by task-invariant group actions yields a sufficient, and under an additional orbit-separation condition, minimally sufficient geometric representation. That result asks when a specified geometric quotient is sufficient under declared invariances and model assumptions. Ageometrics asks the complementary empirical question: for a declared system record, geometric representation, target, baseline, loss, observer, and protocol, how much target-relevant decision value survives, how stable is that conclusion across reasonable representations and observers, and what typed residue remains?

Ageometrics does not claim the general discovery that representations may be sufficient or insufficient. Its proposed contribution is the combination of:

1. a normalized operational measure of decision value retained by a declared geometric representation;
2. an observer-relative extension for constrained predictive families;
3. representation-stability and observer-envelope analysis;
4. a typed taxonomy of Non-Geometric Residue;
5. restoration-channel experiments intended to test candidate residue classes rather than merely naming them; and
6. an experimental posture for history-bearing processes whose developmental records are compressed into form.

The broader Fractalish program applies this instrument to blind-growth processes, geometry-history tradeoffs, Cognitive Basin, CNTM, and possible physical memory substrates. These applications motivate the framework and provide instrumented test settings, but they are distinct from the core mathematical contribution.

Ageometrics therefore does not replace classical sufficiency analysis, Information Bottleneck methods, geometric representation theory, or predictive information. It provides a focused measurement and diagnostic program for cases in which a fuller developmental or causal record has been compressed into a specified geometric, topological, or morphology-bearing representation.

## 9. The Foundational Experimental Design

The simplest Ageometric experiment creates two systems that are equivalent under a chosen geometry but differ in a hidden property that matters.

Let systems \(A\) and \(B\) satisfy

\[
G(A)=G(B)
\]

under the representation being tested, while

\[
Y(A)\neq Y(B).
\]

If a geometry-only predictor cannot distinguish their target behavior but a fuller-record predictor can, then the geometric representation has measurable residue.

### 9.1 Matched-pair benchmark families

#### Same memory graph, different learning order

Two agents end with identical nodes and edge weights. One learned concepts in a safe curriculum; the other learned them through repeated contradiction and repair. Test future susceptibility to confusion or recovery after perturbation.

#### Same embedding, different provenance

Two claims have nearly identical semantic vectors. One is supported by direct evidence; the other originated in adversarial manipulation. Test downstream trust calibration.

#### Same final weights, different training history

Construct networks with matching or near-matching parameter states but different optimization paths, data exposure, or poisoning history. Test robustness and hidden backdoor activation.

#### Same topology, different energetic state

Two physical or simulated systems share visible structure but differ in stored stress or resource depletion. Test failure under load.

#### Same output, different reasoning integrity

One agent derives an answer from valid evidence; another copies or rationalizes it. Test transfer to a counterfactual case.

#### Same current state, different identity lineage

One instance is a continuous process; another is restored from an earlier checkpoint and patched to match. Test autobiographical reconstruction and continuity claims.

#### Same behavior at rest, different perturbation response

Two systems perform identically under ordinary conditions but diverge after intervention. This is the cleanest IGSR benchmark.

### 9.2 Requirements

Every benchmark must specify:

- the equivalence relation defining "same geometry";
- the hidden distinction;
- the target behavior;
- the full record;
- the model classes;
- the baseline;
- the intervention;
- the scoring rule;
- the uncertainty estimate;
- the threshold for meaningful residue.

## 10. Ageometrics for Artificial Intelligence Memory

Artificial memory is the strongest immediate application because its full history can be instrumented.

Most current memory systems reduce experience into one or more of:

- vector embeddings;
- summaries;
- key-value stores;
- graph relations;
- retrieved documents;
- learned weights;
- recurrent state.

These representations are useful. They also erase information.

A vector embedding can preserve similarity while losing source authority. A graph can preserve association while losing order. A summary can preserve conclusions while losing discarded alternatives. Weights can preserve behavior while obscuring which experiences formed it. A retrieval system can return the right statement while forgetting whether the statement was once contradicted.

A history-bearing artificial system can retain:

- event timestamps;
- activation boundaries;
- source provenance;
- evidentiary confidence;
- causal sequence;
- rejected alternatives;
- contradiction history;
- reinforcement and decay;
- compute and energy cost;
- modification events;
- recovery paths;
- continuity lineage.

This enables a direct comparison between full developmental record and compressed morphology.

### 10.1 Cognitive Basin as an Ageometric laboratory

Within the broader Fractalish research program, Ageometrics serves as an instrumentation layer for history-bearing artificial systems. A Cognitive Basin does not preserve experience solely as an undifferentiated event log. It converts process into persistent forms such as associations, attractors, contradiction scars, compressed memories, routed recovery structures, replay records, and governed state transitions. This creates a directly testable question: which distinctions in the fuller developmental record remain available after each conversion, and which become inaccessible?

An Ageometric protocol can compare the fuller developmental record with a declared Basin representation for targets involving prediction, provenance recovery, contradiction resolution, continuity, routing, replay fidelity, or adaptive response. Typed residue and restoration tests can then distinguish ordinary compression loss from failures involving temporal order, causal history, source identity, contextual modulation, or prior corrective experience.

These applications do not establish the validity of Cognitive Basin in advance. They provide protocols by which specific preservation, recovery, and continuity claims can be tested. The mathematical framework must remain usable in systems that do not adopt the Basin architecture.

Ageometrics asks:

- Does the representation retain enough information to reconstruct the originating experience?
- Can it distinguish evidence from manipulation?
- Can it predict future behavior?
- Does it preserve the difference between one severe failure and repeated minor failures?
- Can it distinguish direct continuity from restored similarity?
- How much provenance must remain external to the geometry?
- What is the minimum record needed to prevent identity loss?

The key advantage is known ground truth. Unlike a coastline or fossil, the artificial system can preserve the complete event history. The inverse problem can therefore be measured rather than guessed.

### 10.2 External agent-memory testbeds

Recent agent-memory systems provide external instrumented settings in which process-to-memory compression can be examined. AutoMem (Wu et al., 2026), for example, treats file-system operations as explicit memory actions and improves memory structure and model proficiency through separate optimization loops over long-horizon trajectories. It is not a Cognitive Basin implementation: its demonstrated contribution concerns learned management of task memory rather than persistent associative maturation, contradiction scars, cross-domain continuity, or governed autobiographical state. Its explicit trajectories, memory actions, evolving schemas, and downstream behavior nevertheless make it a useful candidate testbed for Ageometric analysis.

### 10.3 Candidate AI-memory metrics

- GSR for retrieval accuracy;
- GSR for provenance reconstruction;
- GSR for contradiction recovery;
- IGSR for response to adversarial perturbation;
- temporal GSR for next-learning prediction;
- identity GSR for continuity discrimination;
- energetic GSR for compute-cost prediction;
- representation-stability envelope across embeddings, graphs, and attractor maps;
- minimal residue-restoring channel size.

## 11. Relationship to Fractalish

Fractalish and Ageometrics form a paired discipline.

**Fractalish** investigates what process history becomes visible in form.

**Ageometrics** measures what process history is lost when the system is represented as form.

Fractalish has three defensible levels:

1. **Constructive Fractalish** designs recursive, multiscale, history-bearing structures.
2. **Interpretive Fractalish** tests what information can be recovered from those structures.
3. **Ageometrics** identifies where structural interpretation fails and what additional record is required.

This pairing corrects a common temptation. If geometry appears everywhere, researchers may treat universal representability as universal explanation. Ageometrics prevents that collapse.

The mature combined question is:

> Under what conditions does form preserve process, how much does it preserve, and what does form make unknowable without additional history?

## 12. Falsification and Failure Conditions

Ageometrics must be capable of failing.

**Empirical failure criterion.** Ageometrics would fail as an empirical measurement program if, under preregistered controlled conditions, it repeatedly failed to detect known planted losses of target-relevant information, reported substantial residue when the declared geometric representation was sufficient for the target, or produced materially incompatible conclusions under protocol-preserving replication.

**Distinct-value criterion.** The value of Ageometrics as a distinct standalone framework would be reduced if GSR, V-GSR, representation-stability analysis, typed Non-Geometric Residue, and restoration testing proved wholly reducible to existing methods without additional diagnostic, experimental, or practical utility. Mathematical overlap alone, however, would not invalidate applications in which Ageometrics operationalizes otherwise unmeasured questions about developmental history, provenance, contradiction history, continuity, or process-to-form compression.

Different components may therefore succeed or fail independently: the GSR formula may be mathematically redundant while a residue taxonomy or restoration protocol remains useful, or a novel measure may prove unreliable in practice.

These are not objections to hide. They define the first adversarial research agenda.

The strongest support would come from repeated findings that:

- reasonable geometric representations leave stable performance gaps;
- the gaps map consistently to residue classes;
- small non-geometric channels restore performance;
- the same residue types recur across domains;
- GSR predicts when geometric models fail under intervention or distribution shift.

## 13. Methodological Risks

### 13.1 An unfair full-record comparator

If the full record includes information unavailable at prediction time, \(S_X\) will overstate the attainable performance. Full-record models must respect temporal and causal availability.

### 13.2 Model-class confounding

A weak geometry-only model and a powerful full-record model can manufacture residue. Model capacity, optimization budget, search effort, and validation procedures must be matched or examined through a declared model envelope. The same-learner estimate should be reported whenever technically possible, and any unavoidable architectural advantage must be treated as part of the protocol rather than as representation evidence.

### 13.3 Geometry smuggling

A representation may encode timestamps, provenance, or labels in coordinates and then claim geometry captured them. Such augmentations must be declared, costed, and separated from ordinary structural features.

### 13.4 Target leakage

The geometry may be constructed using the target. This invalidates the ratio unless the construction process is included in the evaluation.

### 13.5 Overclaiming metaphysical residue

A low GSR does not show that the missing information is fundamentally non-geometric. It shows only that the tested representation is insufficient.

### 13.6 Benchmark triviality

Matched pairs must not differ through an obvious metadata field that any representation could recover. The goal is to expose meaningful compression failures.

## 14. A Minimal Research Protocol

A first Ageometrics study can be conducted without exotic mathematics.

1. Select a fully instrumented system.
2. Define the fuller reference record \(X\) and the information available at decision time.
3. Construct one or more geometric representations \(G_i(X)\).
4. Define a target \(Y\) and a proper loss or justified utility.
5. Establish baseline information or a baseline predictor \(B\).
6. Pre-register protocol \(\Pi\): folds, model families, capacity budgets, tuning effort, stopping rules, and leakage controls.
7. Estimate baseline, geometry-only, and fuller-record risks on identical held-out cases.
8. Report same-learner, capacity-matched, and model-envelope comparisons where feasible.
9. Compute empirical GSR and paired uncertainty intervals.
10. Diagnose any estimate outside \([0,1]\) rather than clipping it silently.
11. Apply controlled interventions and compute IGSR.
12. Add candidate residue channels one at a time.
13. Identify the minimal channel that restores performance.
14. Repeat under alternate representations, scales, and model classes.
15. Conduct an adversarial audit for leakage, smuggling, comparator drift, and unavailable future information.
16. Publish successes, failures, and HOLD results.

## 15. The First Team Research Questions

A multi-model independent review should investigate:

- Is Ageometrics genuinely distinct from existing sufficiency analysis?
- Is the name already used in a conflicting technical sense?
- What is the strongest prior art for GSR?
- Which score formulations are statistically sound?
- Should canonical GSR remain loss-based, with arbitrary score forms treated only as secondary reports?
- Which comparator protocols best isolate representation from learner capacity?
- How should uncertainty be propagated through a ratio whose denominator may be small?
- What benchmark would most decisively demonstrate value?
- Which residue classes are redundant?
- Which domains provide real matched-equivalence systems?
- What result would show the program adds no scientific value?
- What ethical risks arise when applying GSR to human identity or consciousness?
- Can geometric encoding cost be formalized through minimum description length?
- How should causal and semantic targets be evaluated without circular labels?

Every agent should receive the same prompt and work independently. Convergence is evidence of shared structure, not proof. Divergences should become focused follow-up rounds.


## 16. Blind Growth, Local Contact, and the Memory of Encounter

A further insight strengthens the relationship between Fractalish and Ageometrics: many natural and computational fractal-growth processes are effectively blind.

Blindness here does not mean randomness, stupidity, or total absence of information. It means that the active growth front does not possess a representation of the completed whole. It responds to local contact, finite-range fields, current constraints, and whatever history has already become embodied in the structure.

Diffusion-limited aggregation supplies the cleanest example. Mobile particles follow stochastic trajectories and attach when they first encounter the existing aggregate. The aggregate does not consult a global blueprint. Exposed tips intercept more incoming trajectories than screened interior regions, producing branching through local interaction and path dependence. The final morphology is therefore a record of where the process could reach, where it was obstructed, and how earlier growth changed the accessibility of later growth.

The same logic appears in deterministic local rewriting systems, self-assembly, morphogenesis, crack propagation, root growth, vascular development, and local-memory algorithms. The resulting structure may exhibit global organization even though no individual growth event represented the global result.

This suggests the **Blind Growth Memory Hypothesis**:

> When a process develops through locally informed, path-dependent updates without access to a complete global plan, part of its encounter history becomes embodied in the structure that constrains subsequent updates.

The hypothesis is deliberately limited. It does not claim that final morphology preserves the complete history. Indeed, it predicts compression. A branch may record that a constraint or opportunity affected growth while failing to preserve whether the constraint was temporary, how many failed attempts preceded the branch, what alternatives were nearly selected, or what the process would have done under a different intervention.

Blind growth therefore explains both sides of the paired program:

- Fractalish studies the encounter history that survives as form.
- Ageometrics measures the encounter history that disappears during formation.

The relevant transformation is

\[
\text{local encounters}
\rightarrow
\text{state transitions}
\rightarrow
\text{accumulated morphology}
\rightarrow
\text{partial history preserved}
+
\text{residue}.
\]

This formulation also prevents an important mistake. Self-similarity may be visually prominent, but the more consequential property for developmental memory may be locally informed recursive growth. A structure can be history-bearing without exhibiting exact scale invariance, and a perfectly self-similar mathematical object may contain no contingent developmental history at all.

## 17. Perceptual Horizon and the Geometry-History Tradeoff

Blindness can be made experimentally variable through the concept of **perceptual horizon**.

Let \(H_p\) denote the extent of information available to an updating process beyond its current local state. A practical hierarchy is:

- \(H_0\): contact-only information;
- \(H_1\): immediate neighborhood;
- \(H_2\): finite-range sensing;
- \(H_3\): propagated field or network awareness;
- \(H_4\): global map;
- \(H_5\): predictive and counterfactual world model.

Perceptual horizon is not identical to intelligence. A system may possess sophisticated local inference while lacking a global map, or possess a global map that is stale, biased, or computationally expensive.

Varying \(H_p\) permits a new family of experiments. The same task can be solved by contact-only growth, finite look-ahead, global planning, or global planning with retrospective rewiring. Researchers can then measure:

- task completion;
- energy and wiring cost;
- route diversity;
- resilience;
- adaptation after environmental change;
- final morphology;
- history-reconstruction accuracy;
- GSR and NGR;
- sensitivity to representation;
- information required at each update.

A plausible tradeoff should be tested rather than assumed:

> Increasing global foresight may improve immediate optimization while reducing the amount of contingent developmental history preserved in the final structure.

At the local extreme, structure records many encounters because the process can move forward only through consequences already embodied in the field. At the globally optimized extreme, detours, failed routes, scars, and intermediate compromises may be erased. The resulting form may be efficient while becoming less autobiographical.

This creates a **geometry-history tradeoff frontier**. One axis measures operational efficiency. The other measures recoverable developmental history. A mature artificial memory system may need neither maximal blindness nor maximal global optimization, but a regulated intermediate horizon that preserves consequence without trapping the system in every accident of its past.

The Ageometric question is not simply whether a global planner performs better. It is:

> What information about formation is lost when planning replaces local developmental consequence, and does that loss matter for later adaptation, explanation, trust, or identity?

## 18. Finance as a Canonical Ageometric Domain

Finance is a particularly strong testbed because market science already relies heavily on geometry, scaling, networks, and fractal statistics while preserving unusually rich event histories.

Markets are represented through:

- price trajectories;
- candlestick fields;
- return distributions;
- volatility surfaces;
- correlation geometry;
- efficient frontiers;
- yield curves;
- order-book shapes;
- network graphs;
- Hurst exponents;
- multifractal spectra;
- latent market-state embeddings.

These representations are valuable. Yet a price path is an extreme compression of a much larger process involving order arrivals, cancellations, executions, inventory, leverage, liquidity, information, strategic reaction, and institutional constraints.

The central finance question for Ageometrics is:

> How much of a market's causal and prospective state survives in its visible price geometry?

Define:

- \(X\): the full temporally available market record, including orders, cancellations, spread, depth, volume, executions, and declared contextual variables;
- \(G(X)\): a price, volatility, multifractal, network, or order-book geometry;
- \(Y\): a target such as future volatility, liquidity failure, drawdown continuation, recovery time, price impact, or regime transition.

The resulting finance-specific GSR measures how much recoverable signal remains after the market mechanism is compressed into the chosen geometry.

This domain is especially useful because recent microstructure research links persistent order flow, market impact, volume, and rough volatility through path-dependent order-arrival processes. Such work makes explicit that observed roughness can arise from temporally structured micro-events rather than existing as an autonomous property of the final chart.

Candidate residue classes include:

- **order-flow residue**: sequence and direction of orders omitted from the terminal path;
- **liquidity residue**: depth, replenishment, and cancellation behavior hidden beneath quoted prices;
- **leverage residue**: margin structure and forced-liquidation risk;
- **provenance residue**: whether movement arose from broad participation, one execution program, manipulation, or institutional rebalancing;
- **regime residue**: differences between ordinary, crisis, intervention, and structural-transition conditions;
- **reflexive residue**: behavior caused by market participants responding to the geometric pattern itself.

Reflexive residue makes finance especially revealing. A chart pattern may become predictive because participants believe it is predictive. Geometry is then both record and intervention.

A first benchmark should identify or construct matched market windows with similar:

- return path;
- volatility;
- volume;
- drawdown;
- multifractal spectrum;
- technical indicators;

but materially different:

- order-flow imbalance;
- cancellation rate;
- depth;
- leverage;
- participant concentration;
- subsequent recovery or cascade.

Geometry-only and full-record models would then predict the same declared target. GSR would replace vague arguments about whether technical or fractal analysis "works" with a narrower and more useful question:

> For which targets and regimes does market geometry preserve meaningful information, and what additional history is required when it does not?

This is not a trading claim and should not be treated as a promise of profit. It is a representation-sufficiency experiment in a domain where the difference between visible consequence and hidden mechanism is unusually clear.

## 19. Developmental Circuits in Artificial Cognition

The AI-memory application becomes more precise when perception, appraisal, reasoning, memory, action, and consequence are treated as a coupled developmental circuit rather than independent modules.

The elementary unit is:

\[
\text{sense}
\rightarrow
\text{evaluate}
\rightarrow
\text{reason}
\rightarrow
\text{remember}
\rightarrow
\text{act}
\rightarrow
\text{observe consequence}
\rightarrow
\text{revise}.
\]

Every new sensor can create more than a new data channel. It can create new distinctions, regulatory states, concepts, memories, uncertainties, self-maintenance requirements, and forms of action. A magnetometer can change orientation, anomaly detection, confidence, and spatial memory. A current sensor can become interoceptive. A spectrometer can generate categories unavailable to unaided human perception. Internal thermal and power telemetry can alter planning, urgency, and self-preservation.

This matters Ageometrically because the same memory geometry may conceal different coupled histories. Two representations can contain identical nodes and weights while differing in:

- which modalities supplied the evidence;
- which regulatory state was active;
- which alternatives were considered;
- what action followed;
- what consequence repaired or reinforced the route;
- what energy or risk was incurred;
- whether the experience was voluntary, imposed, or manipulated.

The full Cognitive Basin record should therefore distinguish at least three layers:

1. **encounter history**: what entered and through which sensor or source;
2. **developmental transition history**: how appraisal, reasoning, action, and revision unfolded;
3. **consolidated morphology**: what remains embodied in memory topology.

GSR can be calculated between each pair. This allows the system to discover, for example, that a memory graph is sufficient for retrieval but insufficient for provenance, contradiction recovery, consent history, or continuity.

The long-term objective is not to maximize geometric retention indiscriminately. A developing intelligence must compress. The objective is to know what each compression sacrifices and to preserve explicit non-geometric channels for information that should not be silently lost.


## 20. Research Roadmap

### Phase I: Priority and literature audit

Search mathematics, statistics, information theory, causal inference, philosophy of science, machine learning, systems biology, and physics for equivalent metrics or fields.

Deliverable: a prior-art matrix distinguishing exact matches, partial precedents, and conceptual neighbors.

### Phase II: Formal metric paper

Refine GSR, IGSR, temporal GSR, stability envelopes, and encoding cost. Prove basic properties and identify failure cases.

### Phase III: Synthetic benchmarks

Create exact matched systems and minimal reproducible illustrations with controlled residue. Verify that GSR recovers the planted information loss, then expand across seeds, sample sizes, residue classes, representation families, and observer envelopes.

### Phase IV: AI-memory benchmark

Compare vector memory, graph memory, summary memory, and history-bearing basin memory on provenance, intervention, contradiction, and continuity tasks.

An external agent-memory compression benchmark should reproduce or adapt an instrumented long-horizon memory environment in which the complete interaction trajectory, explicit memory operations, successive memory-state snapshots, task actions and outcomes, schema revisions, and held-out evaluation episodes are all preserved. Compare at least

\[
R_{\text{trace}},\quad
R_{\text{initial-memory}},\quad
R_{\text{evolved-memory}},\quad
R_{\text{task-specific-summary}}
\]

for targets including next-action prediction, future failure or hazard prediction, navigation or task completion, provenance recovery, temporal-order reconstruction, environmental-change detection, and contradiction recovery.

The expected result is not that one representation is universally superior. A compressed memory may yield higher GSR for immediate navigation while yielding lower GSR for temporal, provenance, or change-detection targets. This target dependence is the scientific object of the benchmark.

Protocol requirements:

- keep a final evaluation set untouched by scaffold or model selection;
- separate development, validation, and final test episodes;
- declare whether task policy, prompt, action vocabulary, parser, safety rules, or control logic changed alongside memory structure;
- treat policy additions and action blockers as possible intervention confounds rather than automatically attributing all gains to memory;
- report same-learner and, where appropriate, model-envelope results;
- preserve complete traces so restoration tests can be run after the primary experiment.

### Phase V: Physical and biological applications

Test materials, fracture, fluid morphology, neural development, and ecological networks where full or partial process histories are available.

### Phase VI: Ageometric atlas

Build a cross-domain atlas of residue classes, geometric failure modes, and minimal restoration channels.

## 21. Broader Significance

Ageometrics converts a philosophical discomfort into an experimental program.

The discomfort is simple: geometry can express so much that its presence may stop being informative. The response is not to abandon geometry. It is to measure its reach.

A successful Ageometrics program would help answer:

- when embeddings preserve meaning;
- when topology predicts dynamics;
- when morphology reveals history;
- when causal order is indispensable;
- when provenance must remain explicit;
- when two apparently identical machine states are not the same identity;
- when compression becomes falsification;
- when a representation is explanatory rather than merely expressive.

These questions matter beyond artificial intelligence. They concern every science that infers process from form.

## 22. Conclusion

Geometry is one of science's greatest compressive languages. Its power is not in doubt.

What has been insufficiently measured is its boundary.

Ageometrics proposes that boundary as a field of study. The comparator-revised Geometric Sufficiency Ratio supplies a first instrument. Non-Geometric Residue names the target-relative gap, while the protocol requirement prevents model inequality from being mistaken for representational loss. Interventional and temporal extensions make the program causal and developmental. Encoding cost prevents total-record coordinate systems from masquerading as elegant explanations.

The proposed discipline begins with one modest principle:

> Geometric equivalence does not imply causal, historical, semantic, functional, energetic, or identity equivalence.

Its experimental corollary is equally direct:

> When geometrically equivalent systems behave differently under controlled observation or intervention, the difference is measurable residue relative to that representation.

Fractalish asks what history becomes visible in form.

Ageometrics asks what history disappears when reality is reduced to form.

The two questions belong together. One measures the power of structure. The other measures its limit.


## Revision Note for v0.5

Version 0.5 reframes the synthetic example as a minimal reproducible illustration, corrects the operational guidance for V-GSR views, strengthens differentiation from neighboring sufficiency and representation-learning work, separates empirical failure from novelty and distinct-value criteria, and adds both Cognitive Basin instrumentation and an external agent-memory benchmark pathway.

## References


Anderson-Sprecher, R. (1994). Model Comparisons and R-Squared. The American Statistician, 48(2), 113–117.

Gneiting, T., and Raftery, A. E. (2007). Strictly Proper Scoring Rules, Prediction, and Estimation. Journal of the American Statistical Association, 102(477), 359–378.

Murphy, A. H. (1988). Skill Scores Based on the Mean Square Error and Their Relationships to the Correlation Coefficient. Monthly Weather Review, 116, 2417–2424.

Dong, Y., Soale, A.-N., and Power, M. D. (2022). A Selective Review of Sufficient Dimension Reduction for Multivariate Response Regression. arXiv:2202.00876.

Xu, Y., Zhao, S., Song, J., Stewart, R., and Ermon, S. (2020). A Theory of Usable Information Under Computational Constraints. ICLR 2020. arXiv:2002.10689.

Algom-Kfir, Y., and Pfaff, C. (2016). Normalizers and Centralizers of Cyclic Subgroups Generated by Lone Axis Fully Irreducible Outer Automorphisms. arXiv:1603.07206.

Stewart, K. (2026). Geometric Factorization of Sufficient Harmonic Representations. arXiv:2606.07346.


Villanueva-Alcalá, U., Nicolás-Carlock, J. R., and Boyer, D. (2023). Diffusion limited aggregation, resetting and large deviations of Brownian motion. arXiv:2309.00560.

Horst, U., Xu, W., and Zhang, R. (2024). Path-dependent Fractional Volterra Equations and the Microstructure of Rough Volatility Models driven by Poisson Random Measures. arXiv:2412.16436.

Muhle-Karbe, J., Ouazzani Chahd, Y., Rosenbaum, M., and Szymanski, G. (2026). A Unified Theory of Order Flow, Market Impact, and Volatility. arXiv:2601.23172.

Abramsky, S., and Brandenburger, A. (2011). The Sheaf-Theoretic Structure of Non-Locality and Contextuality. arXiv:1102.0264.

Bronstein, M. M., Bruna, J., Cohen, T., and Veličković, P. (2021). Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges. arXiv:2104.13478.

Chazal, F., and Michel, B. (2021). An Introduction to Topological Data Analysis: Fundamental and Practical Aspects for Data Scientists. Frontiers in Artificial Intelligence, 4, 667963.

Tishby, N., Pereira, F. C., and Bialek, W. (2000). The Information Bottleneck Method. arXiv:physics/0004057.

von Kügelgen, J., Besserve, M., Wendong, L., Gresele, L., Kekić, A., Bareinboim, E., Blei, D. M., and Schölkopf, B. (2023). Nonparametric Identifiability of Causal Representations from Unknown Interventions. arXiv:2306.00542.

Wei, G.-W., et al. (2025). Topological Data Analysis and Topological Deep Learning Beyond Persistent Homology: A Review. Artificial Intelligence Review.

Wu, S., Zhu, H., Zhang, Y., Wang, X., and Yeung-Levy, S. (2026). AutoMem: Automated Learning of Memory as a Cognitive Skill. arXiv:2607.01224.

Synaptient. (2026). Ageometrics and the Geometric Sufficiency Ratio working research records.

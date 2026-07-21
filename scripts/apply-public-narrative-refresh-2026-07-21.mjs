/**
 * Apply the July 2026 public narrative refresh described in the two source briefs.
 * This intentionally edits source only; it does not deploy.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const doc = ({ title, description, canonical, body, image = "/assets/figures/og-fractalish.svg", type = "article" }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://fractalish.com${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="https://fractalish.com${image}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/site.css">
  <script src="/assets/site.js" defer></script>
</head>
<body>
${body.trim()}
</body>
</html>
`;

const pages = {
  "index.html": doc({
    title: "Fractalish | Form Is What Exploration Leaves Behind",
    description: "Fractalish studies how local exploration, constraint, memory, and loss leave structured traces in form.",
    canonical: "https://fractalish.com/",
    type: "website",
    image: "/assets/figures/exploration-becomes-form.svg",
    body: `
<main class="home-refresh">
  <section class="hero hero-refresh" aria-labelledby="home-title">
    <div class="hero-copy">
      <p class="eyebrow">A public research program about history, constraint, and form</p>
      <h1 id="home-title">Form is what exploration leaves behind.</h1>
      <p class="lead">A shape is not only an object. It can be the surviving record of routes tried, barriers met, resources spent, branches abandoned, and connections recovered.</p>
      <p class="research-question"><strong>Research question:</strong> when a system preserves only part of its history, what can its present form still tell us?</p>
      <div class="hero-actions" aria-label="Primary paths">
        <a class="button" href="/start-here.html">Understand the idea</a>
        <a class="button secondary" href="/natural-math.html">See experiments</a>
        <a class="button secondary" href="/cognitive-basin.html">Build and test</a>
      </div>
      <p class="claim-boundary"><strong>Claim boundary:</strong> Fractalish is an independent, testable research program. It separates demonstrated results, working proposals, and open questions.</p>
    </div>
    <figure class="hero-visual exploration-figure">
      <img src="/assets/figures/exploration-becomes-form.svg" alt="A research schematic separates recorded local history, active constraints, present evidence, and typed residue before a bounded claim is made.">
      <figcaption>The research object is the evidence relationship: history, constraints, representation, target, and what the representation leaves out.</figcaption>
    </figure>
  </section>

  <section class="section section-narrow" aria-labelledby="central-observation">
    <p class="eyebrow">The central observation</p>
    <h2 id="central-observation">Visible structure can be a compressed history.</h2>
    <p class="argument">Fractalish proposes that a finite, resource-bounded system explores possibility through local topological actions. Bifurcation creates alternatives; constraint, contact, failure, and success differentially preserve them.</p>
    <p>The resulting morphology is not merely an object or an optimized structure. It can be a partially readable residue of the exploration itself. Because prior construction changes what later action can reach, morphology can also become memory.</p>
    <p>The final form is the surviving subset of a larger process, not a complete transcript. Similar forms can arise through different histories, and different representations can erase different details.</p>
  </section>

  <section class="section" aria-labelledby="blind-exploration">
    <div class="section-heading">
      <p class="eyebrow">Blind exploration</p>
      <h2 id="blind-exploration">No global map is required.</h2>
    </div>
    <div class="card-grid three">
      <article class="card"><h3>Continue</h3><p>A local front extends while conditions remain permissive.</p></article>
      <article class="card"><h3>Bifurcate or reconnect</h3><p>Competing routes may divide, later meet, or reinforce one another.</p></article>
      <article class="card"><h3>Terminate or fade</h3><p>Constraint, exhaustion, or screening removes routes from the surviving record.</p></article>
    </div>
  </section>

  <section class="section split" aria-labelledby="process-surfaces">
    <div>
      <p class="eyebrow">One operation, aligned across layers</p>
      <h2 id="process-surfaces">Generation, historical readout, and memory belong to one testable chain.</h2>
      <p>The proposed synthesis is not any one branch, generator, or measurement score. It is the alignment of a constructive grammar, a way to read surviving form, an internal machine analogue, and a discipline for knowing when the inference fails.</p>
    </div>
    <ol class="process-chain">
      <li><strong>Construct</strong><span>Natural Math supplies the finite local grammar: extend, sense, restrict, bifurcate, reconnect, or stop.</span></li>
      <li><strong>Read</strong><span>Fractalish treats visible form as evidence of routing, constraint, damage, recovery, erasure, and retained history.</span></li>
      <li><strong>Internalize</strong><span>Cognitive Basin translates trails into persistent routing, contradiction scars, remanence, recovery paths, and replay.</span></li>
      <li><strong>Govern</strong><span>Specificity, Ageometrics, MCVA, AMCVA, and HOLD keep partial evidence from becoming pattern pareidolia.</span></li>
    </ol>
  </section>

  <section class="section callout" aria-labelledby="instrument-not-thesis">
    <p class="eyebrow">Scope correction</p>
    <h2 id="instrument-not-thesis">The generator is an instrument, not the thesis.</h2>
    <p>Leaf-like forms can be controlled test fixtures because their simulated histories are known and variable. They do not define Fractalish. The research subject is traceable history, constrained process, representation loss, and recovery across domains.</p>
    <p>Fractalish is not a claim that everything is a fractal. The name points to families of path-dependent, branching, scale-crossing forms—not a universal label.</p>
  </section>

  <section class="section" aria-labelledby="engine-brake">
    <p class="eyebrow">Engine and brake</p>
    <h2 id="engine-brake">Explore, sense, and stay inside the boundary.</h2>
    <div class="card-grid three">
      <article class="card"><h3>EXTEND</h3><p>Propose a local continuation.</p></article>
      <article class="card"><h3>SENSE</h3><p>Read the local conditions relevant to that move.</p></article>
      <article class="card"><h3>RESTRICT</h3><p>Refuse or reshape moves that exceed the active boundary.</p></article>
    </div>
    <p class="fine-print">These are Natural Math process operators. They are not the Cognitive Basin action states or the Basin evidence postures.</p>
  </section>

  <section class="section split" aria-labelledby="cognition-section">
    <div>
      <p class="eyebrow">Cognition as shaped persistence</p>
      <h2 id="cognition-section">A system can remember by changing the landscape of its next move.</h2>
      <p>Cognitive Basin explores persistent, inspectable state: routes thicken with use, contradictions leave scars, recovery changes later choices, and replay makes those changes auditable.</p>
      <p><a class="text-link" href="/cognitive-basin.html">Explore Cognitive Basin and BasinLab →</a></p>
    </div>
    <figure class="inline-figure">
      <img src="/assets/figures/cognitive-basin-landscape.svg" alt="A topological field with a thickened route, a contradiction scar, a recovery route, a hold region, and a replay path.">
      <figcaption>A conceptual field, not a consciousness claim.</figcaption>
    </figure>
  </section>

  <section class="section" aria-labelledby="synthesis-context">
    <p class="eyebrow">Synthesis and context</p>
    <h2 id="synthesis-context">Related to established work; different in its proposed synthesis.</h2>
    <p>Fractalish sits near morphogenesis, exploratory dynamics, generative models, adaptive networks, morphological computation, associative memory, and inverse problems. Those fields contain important neighboring pieces.</p>
    <p>The proposed distinction is the operational unification: the same bounded, path-dependent process is examined as generation, exploration, topology, memory, and partial historical residue, then carried from external morphology into auditable machine state. That is a research claim to test—not a declaration of universal priority.</p>
    <p><a class="text-link" href="/scientific-neighbors.html">Read Scientific Neighbors and Prior Art →</a></p>
  </section>

  <section class="section" aria-labelledby="experimental-front">
    <p class="eyebrow">Experimental front</p>
    <h2 id="experimental-front">Where the work can be tested now.</h2>
    <div class="card-grid three">
      <article class="card"><h3>Compare generated histories</h3><p>Hold the final form constant where possible, vary the history, and measure what a chosen representation can distinguish.</p><a href="/natural-math.html">Natural Math</a></article>
      <article class="card"><h3>Test representation loss</h3><p>Specify observer, protocol, representation, and target before claiming that a form is sufficient.</p><a href="/ageometrics/">Ageometrics</a></article>
      <article class="card"><h3>Audit stateful behavior</h3><p>Replay local actions, contradictions, recovery, and unresolved holds in a governed implementation.</p><a href="/cognitive-basin.html">Cognitive Basin</a></article>
    </div>
  </section>

  <section class="section invitation" aria-labelledby="invitation">
    <p class="eyebrow">Invitation</p>
    <h2 id="invitation">Try to improve it—or break it cleanly.</h2>
    <p>Bring counterexamples, alternate mechanisms, negative results, primary citations, code, or careful questions. A useful criticism is more valuable than unearned agreement.</p>
    <div class="hero-actions"><a class="button" href="/contribute.html">Contribute</a><a class="button secondary" href="/review.html">Review the claims</a></div>
  </section>
</main>`
  }),

  "start-here.html": doc({
    title: "Start Here | Fractalish",
    description: "A plain-language path from the central Fractalish idea to its tests, measurements, and public implementation.",
    canonical: "https://fractalish.com/start-here.html",
    body: `
<main class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Start here</p>
    <h1>Form is what exploration leaves behind.</h1>
    <p class="lead">Fractalish begins with a simple possibility: present structure may preserve a partial record of local exploration.</p>
  </header>
  <section class="section section-narrow">
    <h2>Picture a front moving without a map.</h2>
    <p>It can continue, divide, stop, reconnect, or fade. Barriers redirect it. Limited resources shorten it. Earlier routes screen later ones. When the process ends, the surviving form is neither random decoration nor a full recording. It is a filtered residue of what happened.</p>
    <figure class="inline-figure"><img src="/assets/figures/exploration-becomes-form.svg" alt="A schematic separates recorded history, active constraints, observed evidence, and typed residue."><figcaption>A bounded claim needs the history record, constraints, representation, target, and residue—not a decorative generated form.</figcaption></figure>
  </section>
  <section class="section" aria-labelledby="four-questions">
    <h2 id="four-questions">Four linked questions</h2>
    <div class="card-grid four">
      <article class="card"><h3>How does form grow?</h3><p><a href="/natural-math.html">Natural Math</a> models bounded local exploration.</p></article>
      <article class="card"><h3>What does form preserve?</h3><p><a href="/specificity-thesis.html">Specificity</a> asks how strongly a representation supports a target claim.</p></article>
      <article class="card"><h3>What did representation erase?</h3><p><a href="/ageometrics/">Ageometrics</a> records sufficiency, residue, and recoverability.</p></article>
      <article class="card"><h3>Can history shape future action?</h3><p><a href="/cognitive-basin.html">Cognitive Basin</a> implements persistent, replayable state.</p></article>
    </div>
  </section>
  <section class="section split">
    <div><p class="eyebrow">The important limit</p><h2>Similarity is not identity.</h2><p>Two forms can look alike and still come from different histories. One history can also look different under different observers or representations. Fractalish therefore treats every inference as target- and protocol-relative.</p></div>
    <aside class="callout"><h3>Choose your next route</h3><ul class="link-list"><li><a href="/framework.html">See the whole framework</a></li><li><a href="/natural-math.html">Inspect the generative experiments</a></li><li><a href="/documents.html">Read the documents</a></li><li><a href="/review.html">Audit the claims and corrections</a></li></ul></aside>
  </section>
</main>`
  }),

  "framework.html": doc({
    title: "Framework | Fractalish",
    description: "A progressive map of Fractalish: local generation, representation-aware measurement, persistent machine state, and physical evidence.",
    canonical: "https://fractalish.com/framework.html",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Framework</p><h1>One research question, four working layers.</h1><p class="lead">Fractalish follows history from local generation to surviving form, then asks what can be measured, implemented, and physically verified.</p></header>
  <section class="section">
    <ol class="layer-sequence">
      <li><span>01</span><div><h2>Generate: Natural Math</h2><p>A bounded model of local action under finite energy, constraint, memory, branching, and recovery. Its process operators are <strong>EXTEND</strong>, <strong>SENSE</strong>, and <strong>RESTRICT</strong>.</p><a href="/natural-math.html">Open Natural Math</a></div></li>
      <li><span>02</span><div><h2>Measure: Specificity and Ageometrics</h2><p>Specificity receipts test compliance with a declared target; they do not certify absolute truth. Ageometrics makes the observer, protocol, representation, and target explicit, then records what is sufficient, what remains as residue, and what can be restored.</p><a href="/specificity-thesis.html">Specificity</a> · <a href="/ageometrics/">Ageometrics</a></div></li>
      <li><span>03</span><div><h2>Implement: Cognitive Basin</h2><p>A governed implementation of persistent, topological state with replay. Action states are <strong>EXTEND / HOLD / RETRACT</strong>. Evidence postures are <strong>SUPPORTED / UNRESOLVED / CONTRADICTED</strong>. The namespaces must not be conflated.</p><a href="/cognitive-basin.html">Open Cognitive Basin</a></div></li>
      <li><span>04</span><div><h2>Realize: device evidence</h2><p>Physical implementation asks which traces survive outside the simulator. Receipts, negative results, and recovery steps remain part of the evidence.</p><a href="/documents.html">Browse public evidence</a></div></li>
    </ol>
  </section>
  <section class="section visual-pair">
    <div><p class="eyebrow">Representation boundary</p><h2>A final form is lossy and often non-unique.</h2><p>MCVA tests whether a chosen representation is sufficient for a target under a protocol; it is not a proof of identity or unique history. AMCVA asks what is absent, erased, or unrecoverable. HOLD is an unresolved action posture—not a substitute name for SENSE.</p></div>
    <figure class="inline-figure"><img src="/assets/figures/representation-loss-and-residue.svg" alt="A full record passes through a representation, producing a recovered view and an explicit residue of what was lost."><figcaption>Report the recovered view and the residue together.</figcaption></figure>
  </section>
  <section class="section claim-register" aria-labelledby="claim-register"><h2 id="claim-register">Claim register</h2><div class="card-grid three"><article class="card"><h3>Supported here</h3><p>The site contains runnable models, auditable state transitions, documented protocols, and public artifacts.</p></article><article class="card"><h3>Proposed</h3><p>The synthesis connecting path-dependent morphology, representation loss, and shaped persistent state remains a research proposal.</p></article><article class="card"><h3>Not claimed</h3><p>No theory of everything, no proof that a form has a unique history, and no claim that Cognitive Basin is conscious.</p></article></div></section>
</main>`
  }),

  "natural-math.html": doc({
    title: "Natural Math | Fractalish",
    description: "Natural Math is a bounded experimental model for local exploration under finite energy, sensed conditions, and explicit restriction.",
    canonical: "https://fractalish.com/natural-math.html",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Experimental surface</p><h1>Natural Math</h1><p class="lead">A minimal forward model for asking how local exploration becomes surviving form.</p><p class="claim-boundary"><strong>Boundary:</strong> Natural Math is a bounded modeling framework, not a theory of everything and not a claim that every natural form follows one mechanism. Leaf-like output is one controlled test fixture, not the identity or endpoint of the program.</p></header>
  <section class="section"><div class="card-grid three"><article class="card"><h2>EXTEND</h2><p>Propose one locally reachable continuation.</p></article><article class="card"><h2>SENSE</h2><p>Measure only the conditions available to the local front.</p></article><article class="card"><h2>RESTRICT</h2><p>Reject or reshape moves that exceed energy, geometry, or an active rule.</p></article></div></section>
  <section class="section split"><div><p class="eyebrow">The experiment</p><h2>Change one condition. Keep the receipts.</h2><p>A run begins with a seed, a local neighborhood, a finite resource budget, and a restriction rule. It records continuations, bifurcations, terminations, reconnections, and faded routes. Comparisons are meaningful only when the differing conditions are named.</p></div><ol class="process-chain"><li><strong>Seed</strong><span>Define the local starting state.</span></li><li><strong>Explore</strong><span>Apply EXTEND, SENSE, and RESTRICT.</span></li><li><strong>Deposit</strong><span>Preserve the surviving and rejected traces.</span></li><li><strong>Compare</strong><span>Test a declared target under a declared representation.</span></li></ol></section>
  <section class="section"><h2>What counts as a useful result?</h2><div class="card-grid three"><article class="card"><h3>Positive</h3><p>A condition produces a repeatable difference under a named protocol.</p></article><article class="card"><h3>Negative</h3><p>A proposed distinction disappears, fails to repeat, or is erased by the representation.</p></article><article class="card"><h3>Unresolved</h3><p>The available record cannot yet distinguish the alternatives. The uncertainty stays visible.</p></article></div></section>
  <section class="section callout"><h2>From generation to inference</h2><p>The generated form is only the start. <a href="/specificity-thesis.html">Specificity</a> and <a href="/ageometrics/">Ageometrics</a> ask whether a chosen representation supports the target claim and what evidence it has erased.</p><p><a class="button" href="/documents.html">See documents and runnable artifacts</a></p></section>
</main>`
  }),

  "cognitive-basin.html": doc({
    title: "Cognitive Basin / BasinLab | Fractalish",
    description: "Cognitive Basin explores governed, persistent, inspectable state: path-dependent action, contradiction, recovery, and replay.",
    canonical: "https://fractalish.com/cognitive-basin.html",
    image: "/assets/figures/cognitive-basin-landscape.svg",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Machine implementation</p><h1>Cognitive Basin / BasinLab</h1><p class="lead">What if memory changes the shape of the next available action rather than merely adding another line to a log?</p><p class="claim-boundary"><strong>Boundary:</strong> this is a governed architecture for persistent state and replay. It does not establish consciousness.</p></header>
  <section class="section visual-pair"><div><h2>A topological view of machine state</h2><p>Repeated routes can deepen. Contradictions can leave scars. Recovery can create a new path without pretending the contradiction never happened. A HOLD region keeps unresolved work visible until evidence changes.</p></div><figure class="inline-figure"><img src="/assets/figures/cognitive-basin-landscape.svg" alt="Conceptual basin field showing a thickened route, contradiction scar, recovery route, hold region, and replay."><figcaption>The diagram is a design model for inspectable behavior.</figcaption></figure></section>
  <section class="section"><h2>Two namespaces, kept separate</h2><div class="namespace-grid"><article class="card"><p class="eyebrow">Action state</p><h3>EXTEND · HOLD · RETRACT</h3><p>What the governed process is permitted to do next. HOLD is a deliberate unresolved posture.</p></article><article class="card"><p class="eyebrow">Evidence posture</p><h3>SUPPORTED · UNRESOLVED · CONTRADICTED</h3><p>How the current record bears on a proposition. These labels do not name actions.</p></article></div><p class="fine-print">Natural Math uses EXTEND / SENSE / RESTRICT for a different purpose. SENSE is a local operation; HOLD is not another name for it.</p></section>
  <section class="section"><h2>What BasinLab makes auditable</h2><div class="card-grid four"><article class="card"><h3>Persistent state</h3><p>Changes survive beyond a single request.</p></article><article class="card"><h3>Governance</h3><p>Rules constrain which local action is available.</p></article><article class="card"><h3>Contradiction and recovery</h3><p>Corrections supersede without erasing prior evidence.</p></article><article class="card"><h3>Replay</h3><p>A reviewer can inspect how the present basin was shaped.</p></article></div></section>
  <section class="section callout"><h2>Build surface</h2><p>The public platform repository contains the implementation surface. Architectural language here remains subordinate to runnable behavior and recorded tests.</p><div class="hero-actions"><a class="button" href="https://github.com/BonAcqui-LLC/cognitive-basin-platform">Open the platform repository</a><a class="button secondary" href="/contribute.html">Propose a test</a></div></section>
</main>`
  }),

  "contribute.html": doc({
    title: "Contribute | Fractalish",
    description: "Contribute counterexamples, cases, code, citations, negative results, or careful review to the Fractalish public research program.",
    canonical: "https://fractalish.com/contribute.html",
    type: "website",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Contribute</p><h1>Help test the work, not just decorate it.</h1><p class="lead">The most useful contribution may confirm a pattern, expose a failure, sharpen a boundary, or show that two histories cannot be distinguished.</p></header>
  <section class="section"><div class="card-grid three"><article class="card"><h2>Bring a case</h2><p>Supply a form, the known history if available, the observation protocol, and the target distinction.</p></article><article class="card"><h2>Bring a counterexample</h2><p>Show where a claimed distinction fails, where a representation erases it, or where another mechanism fits better.</p></article><article class="card"><h2>Bring a tool</h2><p>Improve generation, measurement, replay, visualization, validation, or accessibility.</p></article></div></section>
  <section class="section split"><div><h2>A useful submission includes</h2><ul class="check-list"><li>A precise question or claim</li><li>Inputs and provenance</li><li>Observer, protocol, representation, and target</li><li>Expected and observed result</li><li>Negative evidence and unresolved details</li><li>A reproducible artifact when possible</li></ul></div><aside class="callout"><p class="eyebrow">Small independent team</p><h3>Clarity reduces review cost.</h3><p>Fractalish is developed by a small independent team. Self-contained cases, primary citations, and reproducible steps make serious review possible.</p></aside></section>
  <section class="section"><h2>Contribution lanes</h2><div class="card-grid four"><article class="card"><h3>Research</h3><p>Cases, comparisons, replications, and falsification attempts.</p></article><article class="card"><h3>Engineering</h3><p>Code, tests, device evidence, and interface improvements.</p></article><article class="card"><h3>Review</h3><p>Claim audits, citation corrections, and clearer alternatives.</p></article><article class="card"><h3>Support</h3><p>Introductions, compute, equipment, sponsorship, or practical help.</p></article></div><div class="hero-actions"><a class="button" href="https://github.com/BonAcqui-LLC/fractalish/issues">Open a site issue</a><a class="button secondary" href="/review.html">Review protocol</a><a class="button secondary" href="/support.html">Support options</a></div></section>
</main>`
  }),

  "support.html": doc({
    title: "Support Fractalish | Fractalish",
    description: "Practical ways to support an independent public research program through review, collaboration, infrastructure, and sponsorship.",
    canonical: "https://fractalish.com/support.html",
    type: "website",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Support</p><h1>Help an independent research program stay testable and public.</h1><p class="lead">Support is useful when it increases the quality, reproducibility, or reach of the work without weakening its claim boundaries.</p></header>
  <section class="section"><div class="card-grid three"><article class="card"><h2>Review</h2><p>Offer technical criticism, primary sources, methods advice, or a serious falsification attempt.</p></article><article class="card"><h2>Collaborate</h2><p>Bring a dataset, laboratory method, device surface, implementation partner, or comparison problem.</p></article><article class="card"><h2>Sponsor</h2><p>Help cover infrastructure, compute, equipment, accessibility, documentation, or independent validation.</p></article></div></section>
  <section class="section split"><div><h2>What support does not buy</h2><p>It does not buy a preferred result, inflated language, hidden negative evidence, or the removal of provenance. Corrections and unresolved states remain visible.</p></div><aside class="callout"><h3>Start with the smallest useful step.</h3><p>Share a relevant source. Review one claim. Reproduce one run. Introduce one capable collaborator. Fund one clearly scoped validation task.</p><a class="button" href="/contribute.html">Choose a contribution lane</a></aside></section>
</main>`
  }),

  "review.html": doc({
    title: "Review and Corrections | Fractalish",
    description: "A reviewer-facing guide to claim boundaries, evidence states, correction history, and constructive falsification of Fractalish work.",
    canonical: "https://fractalish.com/review.html",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Review and corrections</p><h1>Skepticism is part of the method.</h1><p class="lead">Fractalish asks reviewers to separate what is directly demonstrated, what is proposed, what remains unresolved, and what has been contradicted.</p></header>
  <section class="section"><h2>A compact review protocol</h2><ol class="review-steps"><li><strong>Name the claim.</strong><span>Quote or link the smallest exact statement being reviewed.</span></li><li><strong>Name the evidence.</strong><span>Identify the artifact, run, citation, or observation that bears on it.</span></li><li><strong>Name the boundary.</strong><span>State the observer, protocol, representation, and target.</span></li><li><strong>Try the alternative.</strong><span>Offer a counterexample, competing mechanism, negative control, or missing variable.</span></li><li><strong>Assign a posture.</strong><span>SUPPORTED, UNRESOLVED, or CONTRADICTED—without turning uncertainty into failure or success.</span></li></ol></section>
  <section class="section"><h2>High-value review targets</h2><div class="card-grid three"><article class="card"><h3>Non-uniqueness</h3><p>Can different histories produce the same represented form?</p></article><article class="card"><h3>Representation loss</h3><p>Does the protocol erase the distinction it later claims to measure?</p></article><article class="card"><h3>Namespace drift</h3><p>Are process operators, action states, and evidence postures being conflated?</p></article></div></section>
  <section class="section split"><div><h2>Correction policy</h2><p>Raw evidence and prior public artifacts remain attributable. A correction should identify what changed, why it changed, and which newer record supersedes the older interpretation. Negative evidence is not removed simply because it is inconvenient.</p></div><aside class="callout"><h3>Priority is not the review question.</h3><p>The useful question is whether a claim is clear, testable, properly situated, and supported by the cited evidence. See the contextual map before making novelty claims.</p><a href="/scientific-neighbors.html">Scientific Neighbors and Prior Art</a></aside></section>
  <section class="section invitation"><h2>Send a review</h2><p>Use a repository issue for a public, traceable correction or test proposal. Include primary sources and reproduction steps where possible.</p><a class="button" href="https://github.com/BonAcqui-LLC/fractalish/issues">Open an issue</a></section>
</main>`
  }),

  "scientific-neighbors.html": doc({
    title: "Scientific Neighbors and Prior Art | Fractalish",
    description: "Primary sources and scientific neighbors for path-dependent form, morphogenesis, adaptive networks, memory, inverse problems, and representation-aware inference.",
    canonical: "https://fractalish.com/scientific-neighbors.html",
    body: `
<main class="page-shell">
  <header class="page-hero narrow"><p class="eyebrow">Scientific context</p><h1>Scientific Neighbors and Prior Art</h1><p class="lead">Fractalish is not presented as an isolated discovery. It is a proposed synthesis near several established traditions.</p><p class="claim-boundary"><strong>Context boundary:</strong> adjacency is not equivalence, and this page makes no priority claim. “Different” below describes the Fractalish research emphasis, not proof of novelty.</p></header>
  <section class="section neighbor-list">
    <article><div><h2>Growth, form, and transformation</h2><p><strong>Established:</strong> form can be studied through physical and mathematical transformations, and biological morphology has a long quantitative tradition.</p><p><strong>Overlap:</strong> Fractalish also treats form as evidence about process.</p><p><strong>Different emphasis:</strong> it foregrounds the surviving form as a lossy record of local exploration and asks what a declared representation can recover.</p></div><ul class="citation-list"><li><a href="https://doi.org/10.5962/bhl.title.11332">D’Arcy Wentworth Thompson, <cite>On Growth and Form</cite> (1917)</a></li><li><a href="https://doi.org/10.2307/1301992">David M. Raup, “Geometric Analysis of Shell Coiling” (1966)</a></li><li><a href="https://books.google.com/books?id=3jtRAAAAMAAJ">René Thom, <cite>Structural Stability and Morphogenesis</cite> (1975)</a></li></ul></article>
    <article><div><h2>Developmental systems and exploratory dynamics</h2><p><strong>Established:</strong> conserved core processes can enable phenotypic variation, morphogenetic fields coordinate large-scale pattern, and some biological processes reach functional endpoints through repeated abortive trajectories followed by selection of a successful one.</p><p><strong>Overlap:</strong> local trials, constraints, energetic cost, stabilization, and retraction can produce organized outcomes without a complete global blueprint.</p><p><strong>Different emphasis:</strong> Fractalish asks whether the resulting morphology remains a partially readable history, carries the operation across morphology and machine state, and makes representation loss and equifinality part of the method.</p></div><ul class="citation-list"><li><a href="https://doi.org/10.1073/pnas.95.15.8420">Marc Kirschner and John Gerhart, “Evolvability” (1998)</a></li><li><a href="https://doi.org/10.1073/pnas.0701035104">John Gerhart and Marc Kirschner, “The theory of facilitated variation” (2007)</a></li><li><a href="https://doi.org/10.1016/j.bpj.2025.09.009">Jane Kondev et al., “Biological Processes as Exploratory Dynamics” (2025)</a></li><li><a href="https://doi.org/10.1016/j.biosystems.2012.04.005">Michael Levin, “Morphogenetic fields in embryogenesis, regeneration, and cancer” (2012)</a></li></ul></article>
    <article><div><h2>Distributed computation and adaptive networks</h2><p><strong>Established:</strong> computation may be distributed across morphology; simple local rules can generate complex behavior; adaptive transport networks reorganize under pressure. A 2026 preprint reports that branching, fusion, and stopping under finite resources can approach biological multi-objective trade-offs without global optimization or feedback.</p><p><strong>Overlap:</strong> Fractalish uses local action, finite resources, bifurcation, reconnection, and path-dependent restructuring.</p><p><strong>Different emphasis:</strong> it treats the surviving structure as partial historical evidence, connects that external memory to governed internal routing, and requires a formal account of what the representation omitted.</p></div><ul class="citation-list"><li><a href="https://people.csail.mit.edu/iida/papers/pfeifer_iida_JSM05.pdf">Rolf Pfeifer and Fumiya Iida, “Morphological Computation” (2005)</a></li><li><a href="https://doi.org/10.1038/311419a0">Stephen Wolfram, “Cellular automata as models of complexity” (1984)</a></li><li><a href="https://doi.org/10.1126/science.1177894">Atsushi Tero et al., “Rules for Biologically Inspired Adaptive Network Design” (2010)</a></li><li><a href="https://arxiv.org/abs/2601.03877">Maxime Lucas et al., “Minimal branching and fusion morphogenesis approaches biological multi-objective optimality” (preprint, 2026)</a></li></ul></article>
    <article><div><h2>Inverse problems, memory, and learned representation</h2><p><strong>Established:</strong> multiple models may fit the same observations; associative systems can encode memories as attractors; useful representations depend on structure and intervention.</p><p><strong>Overlap:</strong> Cognitive Basin uses landscape language and Fractalish treats inference as observer- and target-relative.</p><p><strong>Different emphasis:</strong> the stack joins replayable machine state to explicit sufficiency, residue, and recovery receipts.</p></div><ul class="citation-list"><li><a href="https://doi.org/10.1016/S0022-1694(01)00421-8">Keith Beven and Jim Freer, “Equifinality, data assimilation, and uncertainty estimation” (2001)</a></li><li><a href="https://doi.org/10.1073/pnas.79.8.2554">John J. Hopfield, “Neural networks and physical systems…” (1982)</a></li><li><a href="https://doi.org/10.1109/JPROC.2021.3058954">Bernhard Schölkopf et al., “Toward Causal Representation Learning” (2021)</a></li></ul></article>
  </section>
  <section class="section callout"><h2>How to improve this map</h2><p>This is a living bibliography, not a novelty certificate. Missing primary sources, closer precedents, and contrary evidence are welcome through the public review path.</p><a class="button" href="/review.html">Review the context</a></section>
</main>`
  })
};

for (const [relative, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(ROOT, relative), html, "utf8");
  console.log("wrote", relative);
}

console.log(`Done. ${Object.keys(pages).length} narrative pages written.`);

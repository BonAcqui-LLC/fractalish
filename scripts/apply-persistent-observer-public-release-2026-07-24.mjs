import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function write(rel, body) {
  const target = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body.trimStart(), "utf8");
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function replaceIn(rel, replacements) {
  let text = read(rel);
  for (const [pattern, value] of replacements) {
    text = text.replace(pattern, value);
  }
  write(rel, text);
}

function header(active = "") {
  const current = (name) => (active === name ? ' aria-current="page"' : "");
  return String.raw`<header class="site-header">
  <nav class="nav" aria-label="Primary navigation">
    <a class="brand" href="/index.html" aria-label="Fractalish home">Fractalish<span>.</span></a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav-links" data-nav-toggle>
      <span class="nav-toggle-label">Menu</span>
      <span class="nav-toggle-icon" aria-hidden="true"></span>
    </button>
    <div class="nav-links nav-groups" id="primary-nav-links" data-nav-links>
      <div class="nav-group">
        <span class="nav-group-label">Understand</span>
        <a${current("idea")} href="/start-here.html">Idea</a>
        <a${current("framework")} href="/framework.html">Framework</a>
        <a${current("observer")} href="/persistent-observer">Observer</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-label">Evidence</span>
        <a${current("natural")} href="/natural-math.html">Natural Math</a>
        <a${current("bindings")} href="/mathematical-bindings.html">Bindings</a>
        <a${current("documents")} href="/documents.html">Documents</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-label">Build</span>
        <a${current("kernel")} href="/weighting-kernel.html">UFWK</a>
        <a${current("bolt")} href="/bolt-on.html">Bolt-On</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-label">Review</span>
        <a${current("neighbors")} href="/scientific-neighbors.html">Neighbors</a>
        <a${current("status")} href="/status.html">Status</a>
      </div>
    </div>
  </nav>
</header>`;
}

function footer() {
  return String.raw`<footer class="site-footer site-footer-unified">
  <div class="inner footer-grid">
    <div>
      <p class="footer-title">Fractalish</p>
      <p class="footer-tagline">Form is what exploration leaves behind.</p>
      <p class="footer-motto">Read form carefully. Preserve uncertainty. Compare before claiming.</p>
      <p class="footer-boundary">An independent research program. Results, proposals, and open questions are labeled separately.</p>
    </div>
    <div>
      <p class="footer-label">Public research front</p>
      <nav class="footer-nav-inner" aria-label="Research links">
        <a href="/persistent-observer">Persistent observer</a>
        <a href="/natural-math.html">Natural Math authority</a>
        <a href="/scientific-neighbors.html">Scientific neighbors</a>
        <a href="/mathematical-bindings.html">Sanitized bindings</a>
        <a href="/docs/PAGE_TO_PUBLIC_CLAIM_MAP.md">Page-to-claim map</a>
      </nav>
    </div>
    <div>
      <p class="footer-label">Evidence and boundaries</p>
      <nav class="footer-nav-inner" aria-label="Evidence links">
        <a href="/weighting-kernel.html">UFWK</a>
        <a href="/bolt-on.html">Bolt-On</a>
        <a href="/docs/NAMESPACE_CROSSWALK.md">Namespace crosswalk</a>
        <a href="/docs/PUBLIC_REPOSITORY_INDEX.md">Repository index</a>
        <a href="/status.html">Status</a>
      </nav>
    </div>
  </div>
</footer>`;
}

function page({ title, description, canonical, image = "/assets/figures/og-fractalish.svg", active, body }) {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://fractalish.com${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://fractalish.com${image}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/site.css?v=observer-20260724">
  <script src="/assets/site.js?v=observer-20260724" defer></script>
  <script>document.documentElement.classList.add("js");</script>
</head>
<body>
${header(active)}
${body}
${footer()}
</body>
</html>`;
}

write("persistent-observer.html", page({
  title: "The Persistent Observer: Beyond Learnable Novelty | Fractalish",
  description: "A governed architecture for moving from observer-relative learnable structure to weighted persistent memory, deterministic replay, contradiction preservation, and host-portable continuity.",
  canonical: "https://fractalish.com/persistent-observer",
  image: "/assets/figures/persistent-observer-stack.svg",
  active: "observer",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Persistent observer architecture</p>
    <h1>Structure becomes understanding only when it changes what the system can reach next.</h1>
    <p class="lead">Learnable novelty estimates the reusable structure a bounded observer can extract. Fractalish extends the question: what should the observer preserve, how should the encounter alter future accessibility, what contradictions and consequences must remain attached, and which actions remain impermissible regardless of informational value?</p>
    <p class="claim-boundary"><strong>Native architecture:</strong> The Fractalish spine remains Natural Math &rarr; Specificity / Ageometrics &rarr; UFWK &rarr; Cognitive Basin &rarr; Bolt-On and governed host continuity. In neighboring terminology, Cognitive Basin forms part of a persistent-observer architecture.</p>
    <p class="claim-boundary"><strong>Claim boundary:</strong> This page joins frozen software results, locally validated prototypes, code-present structures, formal specifications, and proposed integrations. Their statuses remain separate. No complete persistent observer operating end to end inside a production language-model service is claimed.</p>
    <p class="research-question"><strong>Central distinction:</strong> A metric scores an encounter. A persistent observer is changed by it, inspectably, reversibly, and with receipts.</p>
    <ul class="page-nav" aria-label="Section navigation">
      <li><a href="#missing-step">Missing step</a></li>
      <li><a href="#learnable-novelty">Learnable novelty</a></li>
      <li><a href="#finite-to-persistent">Finite to persistent</a></li>
      <li><a href="#architecture">Architecture</a></li>
      <li><a href="#evidence">Exists now</a></li>
      <li><a href="#provisional">Provisional</a></li>
      <li><a href="#experiment">Experiment</a></li>
      <li><a href="#negative">Negative results</a></li>
      <li><a href="#why">Why build it</a></li>
      <li><a href="#neighbors">Neighbors</a></li>
      <li><a href="#collaborate">Collaborate</a></li>
      <li><a href="#downloads">Evidence</a></li>
    </ul>
  </header>

  <section class="section compare-grid" id="missing-step">
    <article class="note-panel">
      <p class="eyebrow">The missing step after learnability</p>
      <h2>Extracted structure still needs custody.</h2>
      <p>Learnability can say that an observer extracted reusable structure. It does not, by itself, say which target made that structure relevant, what evidence was preserved, what residue remains, what later accessibility should change, or what action remains blocked.</p>
    </article>
    <figure class="diagram-card">
      <img src="/assets/figures/metric-versus-observer.svg" alt="A metric produces a score while a persistent observer preserves receipts, contradiction history, and changed accessibility.">
      <figcaption>A metric scores an encounter. A persistent observer changes future reach under receipts and review.</figcaption>
    </figure>
  </section>

  <section class="section" id="learnable-novelty">
    <p class="eyebrow">What learnable novelty contributes</p>
    <h2>A candidate signal, not a governor.</h2>
    <div class="status-board">
      <article class="card"><span class="status-badge is-external">External reported result</span><h3>Epiplexity</h3><p>From Entropy to Epiplexity separates structure learnable by a bounded observer from surprise that remains unlearnable under that observer and model class. Fractalish records this as neighboring external work, not a locally reproduced result. Claims: CLAIM-0083 and CLAIM-0084.</p></article>
      <article class="card"><span class="status-badge is-external">External reported result</span><h3>Learnable novelty</h3><p>Intelligence from Learnable Novelty reports a reservoir-based closed-form estimator or approximation of epiplexity using a fixed bounded observer. Co-evolving observers and LLM substrates remain proposed future work. Claims: CLAIM-0085 through CLAIM-0091.</p></article>
      <article class="card"><span class="status-badge is-negative">Limitation</span><h3>Intrinsic signal is not a target</h3><p>The reported Acrobot result is treated here as evidence that intrinsic learnability is not a substitute for a declared target. MNIST labels were absent from training but used for evaluation.</p></article>
    </div>
  </section>

  <section class="section visual-pair" id="finite-to-persistent">
    <div>
      <p class="eyebrow">From the finite observer to the persistent observer</p>
      <h2>Operational complexity is conditioned by the observer.</h2>
      <p>Yanbo Zhang's Age of Subjectivity and the subsequent work with Michael Levin place the finite observer at the center of complexity: structure is complex to the extent that a bounded observer can extract and reuse it. Their learnable-novelty estimator gives that insight a practical computational form.</p>
      <p>Fractalish begins from a closely neighboring premise but follows a different systems question. Once an observer extracts structure, what should remain attached to it? Which target made it relevant? What evidence and residue were preserved or lost? How should contradiction alter the record? How should the encounter change future accessibility? And what prevents an intrinsic learning signal from acquiring authority over action?</p>
      <p>We therefore treat learnable novelty as a candidate signal inside a larger persistent-observer architecture, not as truth, value, memory, or governance by itself.</p>
      <p><strong>Layer distinction:</strong> Objectivity and subjectivity belong at different layers. Evidence should be preserved as exactly and inspectably as possible. Interpretation remains observer-, target-, context-, history-, and protocol-relative.</p>
      <p><strong>UFWK line:</strong> Immutable evidence; revisable interpretation.</p>
    </div>
    <figure class="inline-figure">
      <img src="/assets/figures/finite-to-persistent-observer.svg" alt="A finite observer produces a candidate signal, while a persistent observer adds receipts, residue, contradiction, governance, and future accessibility.">
      <figcaption>Complexity is not necessarily created by the observer, but operational measurement is conditioned by capacity, history, target, and protocol.</figcaption>
    </figure>
  </section>

  <section class="section" id="architecture">
    <p class="eyebrow">The Fractalish architecture</p>
    <h2>Target integration architecture.</h2>
    <figure class="diagram-card">
      <img src="/assets/figures/persistent-observer-stack.svg" alt="Target integration architecture with dashed proposed signal edge, immutable receipts, UFWK WeightReceipt, Cognitive Basin, guard and hold, Bolt-On, and host-owned action.">
      <figcaption>Dashed edges mark proposed integrations. Solid edges mark bounded implemented or specified custody paths. There is no direct arrow from learnable novelty to execution.</figcaption>
    </figure>
    <div class="callout warning">
      <h2>Current release boundary</h2>
      <p>No current release has yet demonstrated the complete Natural Math&ndash;UFWK&ndash;Cognitive Basin&ndash;Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service.</p>
    </div>
  </section>

  <section class="section" id="evidence">
    <p class="eyebrow">What exists now</p>
    <h2>Mixed-status evidence, not one blended claim.</h2>
    <div class="status-board">
      <article class="card"><span class="status-badge is-frozen">Verified / Frozen</span><h3>Natural Math v5</h3><p>Governing frozen integer baseline. Bounded oracle and replay suites passed: 25/25 integer fixtures, 15/15 cluster fixtures, 200/200 replay configurations, and 10/10 bounded replay cases. Claims: CLAIM-0001 through CLAIM-0014.</p></article>
      <article class="card"><span class="status-badge is-local">Built and Locally Validated</span><h3>Specificity v0.3 and Construction A+</h3><p>Specificity has local acceptance and pytest evidence. Construction A+ is software-only descriptor encoding with a preserved small-batch collision: five runs produced two glyph IDs, not collision-free uniqueness. Claims: CLAIM-0015 through CLAIM-0023 and CLAIM-0046 through CLAIM-0051.</p></article>
      <article class="card"><span class="status-badge is-frozen">Verified / Frozen</span><h3>Bolt-On v0.3</h3><p>Frozen portable sidecar evidence reports replay, host substitution, adversarial rejection, and zero adapter-executed actions under bounded fixtures. Claims: CLAIM-0065 through CLAIM-0070.</p></article>
      <article class="card"><span class="status-badge is-local">Built and Locally Validated</span><h3>Bolt-On v0.4 Stage 1</h3><p>The external-host contract reports 73/73 tests, 37 contract requirements, 28/28 rejection cases, host actions=0, and bolt-on actions=0. It is not production integration. Claims: CLAIM-0071 and CLAIM-0072.</p></article>
      <article class="card"><span class="status-badge is-spec">Specification</span><h3>UFWK</h3><p>The structured WeightReceipt, uncertainty envelope, routing projection, accumulation ledger, and evidence/interpretation split are specifications. Claims: CLAIM-0024 through CLAIM-0031.</p></article>
      <article class="card"><span class="status-badge is-external">External Reported Result</span><h3>Learnable novelty</h3><p>Rule 110, NCA, MNIST, and reinforcement-learning findings are recorded as external reported results until reproduced in a declared Fractalish protocol. Claims: CLAIM-0085 through CLAIM-0091.</p></article>
      <article class="card"><span class="status-badge is-applied">Playable Applied Experiment</span><h3>Eracii Arena: Duel</h3><p>Eracii Duel is a Natural Math-informed applied-development lane led by Melissa Ellen Clow. It is not part of frozen Natural Math v5 conformance or qualification.</p><p><a class="text-link" href="https://eracii.com/duel">Play Eracii Duel &rarr;</a></p></article>
    </div>
  </section>

  <section class="section" id="provisional">
    <p class="eyebrow">What remains provisional</p>
    <h2>The complete stack is a research program.</h2>
    <ul class="detail-list">
      <li>Learnable-novelty-informed Basin routing is a proposed integration.</li>
      <li>CONFIGURATOR and the Natural Math-CONFIGURATOR bridge remain active experiments until the approved v0.6 qualification plan passes.</li>
      <li>NCA soliton behavior motivates a future experiment; it is not an established carrier into Cognitive Basin memory.</li>
      <li>Persistent observer behavior inside ChatGPT or another production LLM service is not claimed.</li>
    </ul>
  </section>

  <section class="section" id="experiment">
    <p class="eyebrow">The proposed integration experiment</p>
    <h2>Can transient learnable structure produce governed persistent accessibility?</h2>
    <p><span class="status-badge is-spec">PROPOSED INTEGRATION</span></p>
    <p>The learnable-novelty soliton result motivates a future experiment: can transient learnable structures produce persistent, receipt-governed changes in later accessibility?</p>
    <ol class="experiment-flow">
      <li><div><strong>Baseline.</strong><p>Run an untouched host, summary-only memory, vector-only memory, recency-only memory, and learnable-novelty-only arms.</p></div></li>
      <li><div><strong>Read-only sidecar.</strong><p>Attach a neutral adapter that can observe and normalize events but cannot execute native host actions.</p></div></li>
      <li><div><strong>Receipts.</strong><p>Write immutable evidence receipts, then derive separate interpretation records and WeightReceipts.</p></div></li>
      <li><div><strong>Basin update.</strong><p>Test whether contradiction scars, recovery routes, target contracts, and HOLD change future retrieval usefully.</p></div></li>
      <li><div><strong>Substitution and replay.</strong><p>Move the host boundary and verify evidence identity, replay, and governance behavior.</p></div></li>
      <li><div><strong>Falsification.</strong><p>Reject the stronger claim if simpler memory baselines match performance or if governance cannot prevent intrinsic-drive capture.</p></div></li>
    </ol>
    <figure class="diagram-card">
      <img src="/assets/figures/persistent-observer-experiment.svg" alt="Experiment plan comparing memory baselines, candidate learnability signal, receipts, Basin update, and host boundary checks.">
      <figcaption>The candidate signal edge is dashed because this integration has not been demonstrated.</figcaption>
    </figure>
  </section>

  <section class="section" id="negative">
    <p class="eyebrow">Negative results and falsification</p>
    <h2>Failures stay visible.</h2>
    <div class="compare-grid">
      <article class="note-panel"><h3>Already preserved</h3><ul class="detail-list"><li>Construction A+ five-seed batch was not collision-free.</li><li>Descriptor round-trip does not reconstruct original morphology.</li><li>CNTM public evidence is software-only; no physical CNT memory is established.</li><li>Acrobot shows intrinsic learnability is not a substitute for a declared target.</li></ul></article>
      <article class="note-panel"><h3>Future falsifiers</h3><ul class="detail-list"><li>Persistent state adds no benefit over simpler baselines.</li><li>WeightReceipts cannot be calibrated or replayed.</li><li>Contradiction scars do not improve correction behavior.</li><li>Host substitution changes protected evidence.</li><li>Novelty pressure overrides HOLD or target contracts.</li></ul></article>
    </div>
  </section>

  <section class="section" id="why">
    <p class="eyebrow">Why this work exists</p>
    <h2>Why we are building this.</h2>
    <p>We did not begin with an AI theory and then attach a social vision. We began from the conviction that free knowledge and universal education are load-bearing requirements of a survivable post-labor transition. When we examined the systems that would have to carry that knowledge, we found drift, silent rewrite, broken continuity, and uninspectable authority.</p>
    <p>The exact-state, receipt-governed, host-authority-preserving architecture grew from the need to make a future knowledge commons trustworthy.</p>
    <p>Knowledge, education, rights, and basic provision must not depend on a machine-generated human-value score.</p>
    <p class="micro-copy">Wider context: Synaptient, Logientia, Entroresilience, UHI, HALO, and The Great Work remain motivation and civilizational context. The persistent observer does not technically prove those social programs.</p>
  </section>

  <section class="section" id="neighbors">
    <p class="eyebrow">Scientific neighbors</p>
    <h2>Nearby work matters.</h2>
    <p>Fractalish does not claim absence of prior art. We have not identified another public program combining these exact layers, but that is an audit statement, not a proof of uniqueness.</p>
    <p><a class="button" href="/scientific-neighbors.html">Open scientific neighbors</a></p>
  </section>

  <section class="section" id="collaborate">
    <p class="eyebrow">Collaboration invitation</p>
    <h2>Help test the boundary.</h2>
    <p>Useful collaboration includes information theory, reservoir computing, persistent memory, retrieval evaluation, causal inference, event sourcing, formal governance, accessibility review, and adversarial testing.</p>
    <p><a class="button" href="/contribute.html">Contribute</a></p>
  </section>

  <section class="section" id="downloads">
    <p class="eyebrow">Evidence and downloads</p>
    <h2>Public-safe review materials.</h2>
    <div class="download-strip">
      <article class="source-card"><h3>Sanitized claim map</h3><p>Claim IDs, statuses, scope limits, evidence IDs, negative evidence, and source identifiers.</p><p><a class="button" href="/assets/docs/public-claim-evidence-map-v1.1-sanitized.json">Download JSON</a></p></article>
      <article class="source-card"><h3>Mathematical bindings</h3><p>Filterable FMB ledger generated from sanitized public-safe data.</p><p><a class="button" href="/mathematical-bindings.html">Open bindings</a></p></article>
      <article class="source-card"><h3>Reproduction protocol</h3><p>Learnable novelty reproduction protocol starts in a not-yet-run state.</p><p><a class="button" href="/research/learnable-novelty-reproduction.html">Read protocol</a></p></article>
      <article class="source-card"><h3>Page-to-claim map</h3><p>Review table binding public status and numerical claims to public evidence IDs.</p><p><a class="button" href="/docs/PAGE_TO_PUBLIC_CLAIM_MAP.md">Open map</a></p></article>
    </div>
  </section>
</main>`
}));

write("natural-math.html", page({
  title: "Natural Math Authority | Fractalish",
  description: "Natural Math v5 is the governing frozen integer baseline; later diagnostic and experimental branches remain separate unless explicitly promoted by hash-bound qualification.",
  canonical: "https://fractalish.com/natural-math.html",
  image: "/assets/figures/natural-math-version-authority.svg",
  active: "natural",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Natural Math authority</p>
    <h1>Natural Math v5 is the governing frozen integer baseline.</h1>
    <p class="lead">Natural Math is a bounded local-process model for exact integer state, deterministic replay, and controlled morphology experiments. Higher version numbers do not establish authority by themselves.</p>
    <p class="claim-boundary"><strong>Authority note:</strong> Natural Math v5 is the governing frozen integer baseline. Later-numbered diagnostic and experimental branches remain separate unless a versioned, hash-bound qualification record explicitly promotes them.</p>
  </header>

  <section class="section visual-pair">
    <div>
      <p class="eyebrow">Version hierarchy</p>
      <h2>Do not infer authority from numbering.</h2>
      <div class="status-grid">
        <article class="summary-card"><span class="status-badge is-frozen">Verified / Frozen</span><h3>v5</h3><p>Frozen integer/reference baseline with exact specification hashes, frozen operators, bounded fixtures, and deterministic replay evidence.</p></article>
        <article class="summary-card"><span class="status-badge is-local">Extension line</span><h3>v5.1</h3><p>Extension line only. It does not silently replace v5.</p></article>
        <article class="summary-card"><span class="status-badge is-spec">Research branch</span><h3>v6, v6.18, Stage 10</h3><p>Later diagnostic or research branches, separately qualified where applicable, not the governing frozen base.</p></article>
        <article class="summary-card"><span class="status-badge is-spec">Candidates</span><h3>v10.3.2, v12, higher</h3><p>Active or historical research candidates. They do not supersede v5 without an explicit frozen compatibility decision.</p></article>
      </div>
    </div>
    <figure class="inline-figure">
      <img src="/assets/figures/natural-math-version-authority.svg" alt="Natural Math authority ladder showing v5 as the frozen baseline and later branches as separate candidates or diagnostic branches.">
      <figcaption>Authority flows from frozen qualification, not from the largest version number.</figcaption>
    </figure>
  </section>

  <section class="section">
    <p class="eyebrow">Frozen v5 evidence</p>
    <h2>What v5 establishes.</h2>
    <div class="status-board">
      <article class="card"><h3>Operators</h3><p>Integer division, squared grid distance, energy deficit, exact-rational gradient, pressure projection, action selection, movement conflict resolution, bifurcation, bonding, cluster stepping, seeded randomness, serialization, and default parameters are bound to CLAIM-0001 through CLAIM-0013.</p></article>
      <article class="card"><h3>Rerun result</h3><p>Natural Math v5 passed 40/40 frozen oracle fixtures and 210/210 replay configurations in the 2026-07-23 read-only rerun. Claim: CLAIM-0014.</p></article>
      <article class="card"><h3>Boundary</h3><p>The result is deterministic software behavior under declared integer parameters and fixtures. It is not a general law of biology, physics, intelligence, or morphology.</p></article>
    </div>
  </section>

  <section class="section" id="applied-experiments">
    <p class="eyebrow">Applied experiments</p>
    <h2>Playable systems that make local rules easier to inspect.</h2>
    <div class="status-board">
      <article class="card">
        <span class="status-badge is-applied">Playable Applied Experiment</span>
        <h3>Eracii Arena: Duel</h3>
        <p><strong>Playable applied development &middot; Led by Melissa Ellen Clow</strong></p>
        <p>Eracii Arena translates selected Natural Math design principles into a playable deterministic strategy system. Two legends act within a finite grid, bounded rounds, explicit resources, local movement constraints, persistent positional consequences, and exact action resolution.</p>
        <p>Once the combatants and player decisions are fixed, match outcomes arise from declared rules rather than random rolls or hidden outcome modifiers. The game also exposes the rival's current planned action and records a chained match history, making decisions and consequences inspectable rather than opaque.</p>
        <p>Eracii is an independent applied-development lane. It is informed by Natural Math but is not part of the frozen Natural Math v5 conformance or qualification record.</p>
        <p><a class="button" href="https://eracii.com/duel">Play Eracii Duel &rarr;</a></p>
      </article>
    </div>
  </section>

  <section class="section">
    <p class="eyebrow">Namespace discipline</p>
    <h2>Natural Math actions are not Basin actions.</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Namespace</th><th>States</th><th>Boundary</th></tr></thead>
        <tbody>
          <tr><td>Natural Math action</td><td>EXTEND, SENSE, RESTRICT_DIE</td><td>Local process operators in the frozen integer baseline.</td></tr>
          <tr><td>Cognitive Basin action</td><td>EXTEND, HOLD, RETRACT</td><td>Governed memory/action posture, not a rewrite of source events.</td></tr>
          <tr><td>Cognitive Basin evidence</td><td>SUPPORTED, UNRESOLVED, CONTRADICTED</td><td>Evidence status layer.</td></tr>
          <tr><td>Specificity posture</td><td>OPERATIONAL, CAUTION, CONSTRAINED, CRITICAL, EXCEEDED</td><td>Target-contract response, not truth itself.</td></tr>
        </tbody>
      </table>
    </div>
    <p>A source event may lead to a separate interpretation or governance request, but the original source state is never rewritten into a different namespace.</p>
  </section>
</main>`
}));

write("weighting-kernel.html", page({
  title: "Unified Fractalish Weighting Kernel | Fractalish",
  description: "UFWK is a specification for structured WeightReceipts: typed, target-relative significance with immutable evidence, revisable interpretation, uncertainty, gates, and falsification conditions.",
  canonical: "https://fractalish.com/weighting-kernel.html",
  image: "/assets/figures/weight-receipt-anatomy.svg",
  active: "kernel",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Specification</p>
    <h1>Learnability is one candidate signal. It is not the whole weight field.</h1>
    <p class="lead">The Unified Fractalish Weighting Kernel keeps significance structured: evidence remains immutable, interpretation remains revisable, and task scalars are derived projections rather than replacements for the WeightReceipt.</p>
    <p class="claim-boundary"><strong>Status:</strong> SPECIFICATION. UFWK remains a specification unless a named implementation says otherwise. Related claims: CLAIM-0024 through CLAIM-0031.</p>
  </header>

  <section class="section visual-pair">
    <div>
      <h2>The canonical object is a structured WeightReceipt.</h2>
      <p>No universal scalar replaces it. Any task scalar is a derived routing projection. Weights are target-relative. Evidence and interpretation remain separate.</p>
      <p>Affective-significance is not subjective feeling. High weight is not truth. High weight is not human worth. High novelty is not action authority. Rights do not depend on weight.</p>
    </div>
    <figure class="inline-figure">
      <img src="/assets/figures/weight-receipt-anatomy.svg" alt="A structured WeightReceipt with eight weight families, uncertainty envelope, source evidence, and non-compensatory governance gates.">
      <figcaption>Immutable evidence; revisable interpretation.</figcaption>
    </figure>
  </section>

  <section class="section">
    <h2>Eight weight families</h2>
    <div class="card-grid four">
      <article class="card"><h3>Structural</h3><p>Reusable organization, pattern, and dependency.</p></article>
      <article class="card"><h3>Contextual</h3><p>Target, role, situation, scope, and protocol dependence.</p></article>
      <article class="card"><h3>Affective-significance</h3><p>Attention and mobilization semantics, not subjective feeling.</p></article>
      <article class="card"><h3>Prospective</h3><p>Future relevance, option value, and anticipated reach.</p></article>
      <article class="card"><h3>Consequential</h3><p>Effect magnitude, irreversibility, dependency, and harm/benefit accounting.</p></article>
      <article class="card"><h3>Mnemonic</h3><p>How memory accessibility, retrieval priority, and replay should change.</p></article>
      <article class="card"><h3>Residual</h3><p>What remains outside the fit, including typed residue and uncertainty.</p></article>
      <article class="card"><h3>Counterfactual</h3><p>What likely differs under nearby histories, targets, policies, or interventions.</p></article>
    </div>
  </section>

  <section class="section compare-grid">
    <article class="note-panel"><h2>Uncertainty envelope</h2><p>Receipts carry uncertainty, scope, evaluator disagreement, missing evidence, target drift, and calibration limits. Weight inflation is a failure mode, not a success.</p></article>
    <article class="note-panel"><h2>Non-compensatory gates</h2><p>Some conditions cannot be compensated by high score: missing authority, unresolved contradiction, rights boundary, target-contract failure, unsafe action request, or replay failure can force HOLD.</p></article>
    <article class="note-panel"><h2>Invalidation conditions</h2><p>Invalidate or supersede a WeightReceipt when evidence identity fails, calibration changes, the target changes, contradiction arrives, replay diverges, or a non-compensatory gate is triggered.</p></article>
    <article class="note-panel"><h2>Entroresilience</h2><p>Entroresilience is treated as a provisional directional/accounting extension for consequence and recovery. It is not a completed UFWK runtime.</p></article>
  </section>

  <section class="section">
    <h2>Verification and adversarial tests</h2>
    <ol class="experiment-flow">
      <li><div><strong>Evidence identity.</strong><p>Hash source evidence separately from later interpretations.</p></div></li>
      <li><div><strong>Calibration.</strong><p>Test target-relative stability across evaluators, tasks, and correction cycles.</p></div></li>
      <li><div><strong>Inflation attacks.</strong><p>Try novelty, urgency, emotional salience, authority impersonation, and consequence exaggeration.</p></div></li>
      <li><div><strong>Gate attacks.</strong><p>Verify that high novelty or usefulness cannot bypass HOLD, rights boundaries, or missing evidence.</p></div></li>
      <li><div><strong>Replay reinterpretation.</strong><p>Preserve the original evidence while updating changed accessibility after correction.</p></div></li>
    </ol>
  </section>
</main>`
}));

write("bolt-on.html", page({
  title: "Bolt-On Demonstrator | Fractalish",
  description: "A bounded sidecar architecture showing continuity and governance beside a replaceable host while retaining zero execution authority in the adapter.",
  canonical: "https://fractalish.com/bolt-on.html",
  image: "/assets/figures/host-authority-boundary.svg",
  active: "bolt",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Portability and authority</p>
    <h1>Continuity should survive the host.</h1>
    <p class="lead">The strongest result is not that the Bolt-On controls a host. The strongest result is that continuity and governance can be carried beside a host while the adapter retains no execution authority.</p>
    <p class="claim-boundary"><strong>Claim boundary:</strong> this page records frozen v0.3 evidence and a bounded v0.4 Stage 1 external-host contract. It does not claim production integration, live third-party integration, network security qualification, complete host control, or a completed persistent observer.</p>
  </header>

  <section class="section visual-pair">
    <div>
      <p class="eyebrow">Required architecture</p>
      <h2>Replaceable host, host-owned action.</h2>
      <ol class="process-chain">
        <li><strong>Host</strong><span>Replaceable host owns native state.</span></li>
        <li><strong>Adapter</strong><span>Read-only adapter normalizes events.</span></li>
        <li><strong>Projection</strong><span>Canonical event / projection.</span></li>
        <li><strong>Receipt</strong><span>Natural Math receipt and replay.</span></li>
        <li><strong>Weight</strong><span>Optional WeightReceipt.</span></li>
        <li><strong>Basin</strong><span>Cognitive Basin changed accessibility.</span></li>
        <li><strong>Guard</strong><span>GUARD / HOLD / target contract.</span></li>
        <li><strong>Boundary</strong><span>Host-owned command boundary and native host action.</span></li>
      </ol>
    </div>
    <figure class="inline-figure">
      <img src="/assets/figures/host-authority-boundary.svg" alt="Host authority boundary with read-only adapter, canonical events, receipts, optional WeightReceipt, Cognitive Basin, guard, and host-owned native action.">
      <figcaption>No direct arrow flows from the read-only adapter to native action.</figcaption>
    </figure>
  </section>

  <section class="section">
    <h2>Status evidence</h2>
    <div class="status-board">
      <article class="card"><span class="status-badge is-frozen">Verified / Frozen</span><h3>v0.3</h3><p>20/20 frozen manifest files verified; aggregate verifier passed. Release record reports 256 tests, two host families, 48 adversarial rejections, two baseline host-owned actions, zero bolt-on-executed actions, and one host substitution. Claims: CLAIM-0065 through CLAIM-0070.</p></article>
      <article class="card"><span class="status-badge is-local">Built and Locally Validated</span><h3>v0.4 Stage 1</h3><p>External-host contract demonstration only: 73/73 unit tests, 37 contract requirements, 28/28 rejection cases, host actions=0, bolt-on actions=0. Claims: CLAIM-0071 and CLAIM-0072.</p></article>
      <article class="card"><span class="status-badge is-negative">Limitation</span><h3>No production claim</h3><p>No third-party or production host is qualified. The mapping is not universal and does not prove compatibility with ChatGPT or any production LLM service.</p></article>
    </div>
  </section>

  <section class="section">
    <h2>Replay, substitution, and zero adapter authority</h2>
    <div class="compare-grid">
      <article class="note-panel"><h3>Replay</h3><p>Receipts and checkpoints make prior decisions inspectable and replayable under bounded fixtures.</p></article>
      <article class="note-panel"><h3>Substitution</h3><p>The portable sidecar can carry continuity across replaceable hosts without acquiring native execution authority.</p></article>
      <article class="note-panel"><h3>Adapter boundary</h3><p>The adapter reads and projects. Native action remains host-owned.</p></article>
      <article class="note-panel"><h3>Non-claim</h3><p>The Bolt-On is not a completed persistent observer and not a production-host controller.</p></article>
    </div>
  </section>
</main>`
}));

write("scientific-neighbors.html", page({
  title: "Scientific Neighbors | Fractalish",
  description: "Primary-source context for epiplexity, learnable novelty, persistent memory governance, morphogenesis, active inference, computational mechanics, event sourcing, and morphological computation.",
  canonical: "https://fractalish.com/scientific-neighbors.html",
  active: "neighbors",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Scientific neighbors</p>
    <h1>Related work, overlap, and differences.</h1>
    <p class="lead">Fractalish is not claiming a vacuum. Neighboring fields supply essential tools and warnings. The current audit statement is modest: we have not identified another public program combining these exact layers.</p>
    <p class="claim-boundary"><strong>Boundary:</strong> neighboring work does not prove Fractalish, and Fractalish does not absorb neighboring work as a component. Each relationship is labeled as conceptual, implemented, proposed, or external reported result.</p>
  </header>

  <section class="section" id="computational-epistemic-complexity">
    <p class="eyebrow">Computational epistemic complexity, persistent state, and governed memory</p>
    <h2>Primary sources for the current public comparison.</h2>
    <div class="neighbor-list">
      <article><div><h2>From Entropy to Epiplexity</h2><p>Marc Finzi et al., arXiv:2601.03220v2. Contributes the epiplexity framing: learnable structure versus residual surprise under bounded observer and model class.</p></div><ul class="citation-list"><li>Overlap: observer-relative complexity and learnability.</li><li>Difference: Fractalish asks what persistent, receipt-governed state should do after extraction.</li><li>Status: EXTERNAL REPORTED RESULT, not locally reproduced. Claims: CLAIM-0083 and CLAIM-0084.</li><li><a href="https://arxiv.org/abs/2601.03220v2">arXiv source</a></li></ul></article>
      <article><div><h2>Intelligence from Learnable Novelty</h2><p>Yanbo Zhang and Michael Levin, arXiv:2607.18433v1. Contributes a reservoir-based closed-form estimator or approximation of epiplexity with a fixed bounded observer.</p></div><ul class="citation-list"><li>Overlap: candidate learnability signal for what an observer can carry away.</li><li>Difference: Fractalish keeps target, receipt, contradiction, governance, and host authority separate.</li><li>Status: EXTERNAL REPORTED RESULT. Claims: CLAIM-0085 through CLAIM-0091.</li><li><a href="https://arxiv.org/abs/2607.18433v1">arXiv source</a></li></ul></article>
      <article><div><h2>Welcome to the Age of Subjectivity</h2><p>Yanbo Zhang essay / conceptual article. It frames complexity around the observer and motivates the finite-observer discussion.</p></div><ul class="citation-list"><li>Overlap: observer-conditioned complexity.</li><li>Difference: Fractalish does not adopt "abandon objectivity" as doctrine; it separates exact evidence from observer-relative interpretation.</li><li>Status: conceptual neighbor, not peer-reviewed technical result.</li><li><a href="https://x.com/YanboZhang3/status/2065844470990491819">X article reference</a></li></ul></article>
      <article><div><h2>Always-On Agents</h2><p>Ding, Nannapaneni, Liu, and Zhang, arXiv:2606.30306. Surveys persistent memory, state, and governance in LLM agents.</p></div><ul class="citation-list"><li>Overlap: durable state, provenance, mutability, recoverability, and actionability.</li><li>Difference: Fractalish proposes a particular receipt-governed architecture and target integration experiment.</li><li>Status: external survey / conceptual and evaluation neighbor.</li><li><a href="https://arxiv.org/abs/2606.30306">arXiv source</a></li></ul></article>
      <article><div><h2>Long-Term Memory Security in LLM Agents</h2><p>A Survey on Long-Term Memory Security in LLM Agents: Attacks, Defenses, and Governance Across the Memory Lifecycle, arXiv:2604.16548.</p></div><ul class="citation-list"><li>Overlap: lifecycle threats, provenance, versioning, rollback, integrity, confidentiality, availability, and governance.</li><li>Difference: Fractalish focuses on receipts, target-relative weighting, changed accessibility, and host authority boundaries.</li><li>Status: external security survey.</li><li><a href="https://arxiv.org/abs/2604.16548">arXiv source</a></li></ul></article>
    </div>
  </section>

  <section class="section">
    <h2>Established neighboring fields</h2>
    <div class="status-board">
      <article class="card"><h3>Michael Levin's morphogenesis and basal cognition</h3><p>Contributes morphogenetic memory, bioelectric regulation, and diverse intelligence context. Fractalish overlaps conceptually on form, history, and control, but does not claim physical CNT memory or biological proof.</p></article>
      <article class="card"><h3>Active inference and free energy</h3><p>Contributes observer/action loops and model-relative behavior. Fractalish differs by emphasizing explicit receipts, replay, target contracts, and host authority boundaries.</p></article>
      <article class="card"><h3>Computational mechanics</h3><p>Contributes rigorous state reconstruction and observer-relative structure. Fractalish overlaps conceptually, but adds governance, receipt custody, and public claim mapping.</p></article>
      <article class="card"><h3>Persistent-agent memory systems</h3><p>Contribute memory architectures and retrieval practice. Fractalish focuses on provenance, contradiction, target-relative weighting, and host-owned action.</p></article>
      <article class="card"><h3>Deterministic replay and event sourcing</h3><p>Contribute auditability, immutable event logs, and reconstruction. Fractalish uses these as engineering neighbors for receipts and rollback.</p></article>
      <article class="card"><h3>Morphological computation</h3><p>Contributes embodiment and structure-as-computation. Fractalish keeps morphology claims partial, target-relative, and non-unique.</p></article>
    </div>
  </section>

  <section class="section">
    <h2>Epiplexity and Ageometrics: nearby, not identical.</h2>
    <p>Epiplexity separates structure learnable by a bounded observer from surprise that remains unlearnable under that observer and model class. Ageometrics asks what a chosen representation failed to preserve relative to a declared target, protocol, and fuller admissible record. The concerns are neighboring, but the mathematical objects and loss contracts are different.</p>
    <p>Epiplexity's residual and Ageometrics' NGR both resist treating all information as equally usable, but they measure different losses under different contracts.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Dimension</th><th>Epiplexity / learnable novelty</th><th>Ageometrics / NGR</th></tr></thead>
        <tbody>
          <tr><td>Question asked</td><td>What structure can a bounded observer extract and reuse?</td><td>What did a declared representation fail to preserve for a target?</td></tr>
          <tr><td>Observer model</td><td>Bounded observer/model class.</td><td>Declared observer, representation, protocol, and comparator.</td></tr>
          <tr><td>Target dependence</td><td>Conditioned by observer/model objective.</td><td>Explicit target-contract dependence.</td></tr>
          <tr><td>Residual definition</td><td>Unlearnable surprise under the observer/model class.</td><td>Target-relative performance gap relative to fuller admissible record.</td></tr>
          <tr><td>History dependence</td><td>Depends on what the observer can learn from data.</td><td>Depends on what history the representation preserves or erases.</td></tr>
          <tr><td>Persistence</td><td>Metric or reward signal by itself.</td><td>Representation audit; persistence requires separate architecture.</td></tr>
          <tr><td>Governance</td><td>Not a governance layer by itself.</td><td>Can feed HOLD and specificity posture, but does not decide action alone.</td></tr>
          <tr><td>Current evidence status</td><td>External reported result in this register.</td><td>Specification/working paper plus local Specificity evidence where separately claimed.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>`
}));

write("status.html", page({
  title: "Status | Fractalish",
  description: "Public status register for frozen evidence, local validation, code-present structures, specifications, proposed integrations, external reported results, limitations, and archives.",
  canonical: "https://fractalish.com/status.html",
  active: "status",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Status</p>
    <h1>Every claim keeps its evidence layer.</h1>
    <p class="lead">This page separates frozen results, local validation, code-present work, specifications, proposed integrations, external reported results, negative results, and historical material.</p>
  </header>
  <section class="section">
    <div class="status-board">
      <article class="card"><span class="status-badge is-frozen">Verified / Frozen</span><h3>Natural Math v5 and Bolt-On v0.3</h3><p>Natural Math v5 is the governing frozen integer baseline. Bolt-On v0.3 is the frozen host-portability evidence layer. CNTM software gates remain software-only.</p></article>
      <article class="card"><span class="status-badge is-local">Built and Locally Validated</span><h3>Specificity, Construction A+, v0.4 contract</h3><p>These have local evidence under bounded fixtures. Construction A+ is not collision-free across morphologies; v0.4 is not production integration.</p></article>
      <article class="card"><span class="status-badge is-local">Code-Present</span><h3>Cognitive Basin structures</h3><p>Implementation structures exist for action/evidence namespaces and recovery routes, but complete production LLM behavior is not qualified here.</p></article>
      <article class="card"><span class="status-badge is-spec">Specification</span><h3>UFWK and CNTM admission</h3><p>UFWK WeightReceipt, uncertainty envelope, routing projection, and evidence/interpretation split remain specifications unless a named implementation qualifies them.</p></article>
      <article class="card"><span class="status-badge is-spec">Proposed Integration</span><h3>Persistent observer stack</h3><p>Learnable-novelty-informed Basin routing, CONFIGURATOR bridge, and the full Natural Math/UFWK/Basin/Bolt-On/host chain are not demonstrated end to end.</p></article>
      <article class="card"><span class="status-badge is-external">External Reported Result</span><h3>Epiplexity and learnable novelty</h3><p>The current paper results are recorded as external reported results until Fractalish reproduction protocols are run.</p></article>
      <article class="card"><span class="status-badge is-applied">Playable Applied Experiment</span><h3>Eracii Arena: Duel</h3><p>Eracii Duel is Natural Math-informed applied development led by Melissa Ellen Clow. It is not part of the frozen v5 conformance record.</p><p><a class="text-link" href="https://eracii.com/duel">Play Eracii Duel &rarr;</a></p></article>
      <article class="card"><span class="status-badge is-negative">Negative Result / Limitation</span><h3>Preserved failures</h3><p>Construction A+ collision, descriptor round-trip limits, no physical CNT memory, Acrobot target failure, and namespace-collision risks stay visible.</p></article>
      <article class="card"><span class="status-badge">Historical / Archived</span><h3>Resonant Morphology</h3><p>Historical development artifact and bounded software fixture, retained for lineage and experiment design, not flagship proof.</p></article>
    </div>
  </section>
  <section class="section callout warning">
    <h2>Current release boundary</h2>
    <p>No current release has yet demonstrated the complete Natural Math&ndash;UFWK&ndash;Cognitive Basin&ndash;Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service.</p>
  </section>
  <section class="section">
    <h2>Not claimed</h2>
    <ul class="detail-list">
      <li>No completed production language-model integration.</li>
      <li>No proof of consciousness, sentience, artificial personhood, or moral agency.</li>
      <li>No universal theory of everything.</li>
      <li>No claim that morphology uniquely contains its full generating history.</li>
      <li>No claim that descriptor round-trip reconstructs original morphology.</li>
      <li>No physical CNT memory-device result.</li>
      <li>No machine-generated human-value score for knowledge, education, rights, or basic provision.</li>
    </ul>
  </section>
</main>`
}));

write("mathematical-bindings.html", page({
  title: "Mathematical Bindings | Fractalish",
  description: "A sanitized public explorer binding FMB identifiers to claim IDs, formulas, source identifiers, implementation status, evidence boundaries, negative results, and next required evidence.",
  canonical: "https://fractalish.com/mathematical-bindings.html",
  active: "bindings",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Sanitized public index</p>
    <h1>Mathematical Bindings</h1>
    <p class="lead">This explorer is generated only from the sanitized public claim map and source manifest. It publishes stable FMB identifiers, claim IDs, status layers, formulas, public-safe source identifiers, qualification boundaries, negative results, and next required evidence.</p>
    <p class="claim-boundary"><strong>Boundary:</strong> no absolute paths, usernames, nonpublic evidence-log paths, nonpublic repository names, AI-session identifiers, health files, legal files, or nonpublic working material are included.</p>
  </header>
  <section class="section">
    <div class="download-strip">
      <article class="source-card"><h3>Bindings ledger</h3><p>Sanitized JSON with FMB identifiers and evidence boundaries.</p><p><a class="button" href="/assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json">Download JSON</a></p></article>
      <article class="source-card"><h3>Claim map</h3><p>Sanitized public claim/evidence map v1.1.</p><p><a class="button" href="/assets/docs/public-claim-evidence-map-v1.1-sanitized.json">Download JSON</a></p></article>
      <article class="source-card"><h3>Source manifest</h3><p>Logical public source IDs and repository-relative source references.</p><p><a class="button" href="/assets/docs/public-source-manifest-sanitized-v1.1.csv">Download CSV</a></p></article>
    </div>
  </section>
  <section class="section" data-bindings-explorer data-bindings-source="/assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json">
    <h2>Filter the public bindings ledger</h2>
    <div class="binding-controls">
      <div class="control-field"><label for="bindings-search">Search</label><input id="bindings-search" type="search" data-bindings-search placeholder="FMB id, claim id, family, formula, source id"></div>
      <div class="control-field"><label for="bindings-family">Family</label><select id="bindings-family" data-bindings-family><option value="">All families</option></select></div>
      <div class="control-field"><label for="bindings-status">Status</label><select id="bindings-status" data-bindings-status><option value="">All statuses</option></select></div>
      <div class="control-field"><label for="bindings-layer">Evidence layer</label><select id="bindings-layer" data-bindings-layer><option value="">All layers</option></select></div>
    </div>
    <p class="binding-summary" data-bindings-summary>Loading sanitized bindings...</p>
    <div class="binding-list" data-bindings-list></div>
  </section>
</main>`
}));

write("documents.html", page({
  title: "Documents | Fractalish",
  description: "Review-oriented Fractalish document library grouped by evidence status, authority, version, and claim boundary.",
  canonical: "https://fractalish.com/documents.html",
  active: "documents",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Documents and evidence</p>
    <h1>One library, with status labels attached.</h1>
    <p class="lead">This review library favors authority and claim boundaries over raw volume. Superseded and historical materials remain reachable only with their limitations attached.</p>
  </header>

  <section class="section" id="evidence-records">
    <h2>Verified / Frozen</h2>
    <div class="status-board">
      <article class="card"><h3>Natural Math v5 frozen integer baseline</h3><ul class="meta-inline"><li>Version: v5</li><li>Date: 2026-07-23 rerun</li><li>Status: VERIFIED / FROZEN</li><li>Superseded: no</li></ul><p>Governing authority for Natural Math integer/reference claims. Later-numbered branches do not supersede it without a hash-bound promotion record.</p><p><a class="button" href="/natural-math.html">Authority note</a></p></article>
      <article class="card"><h3>Bolt-On v0.3 frozen release</h3><ul class="meta-inline"><li>Version: v0.3</li><li>Status: VERIFIED / FROZEN</li><li>Authority: CLAIM-0065 to CLAIM-0070</li></ul><p>Portable sidecar evidence with zero adapter-executed actions under bounded fixtures.</p><p><a class="button" href="/bolt-on.html">Open page</a></p></article>
      <article class="card"><h3>CNTM frozen software gates</h3><ul class="meta-inline"><li>Status: VERIFIED / FROZEN</li><li>Boundary: software-only</li></ul><p>Finite ternary readout and replay infrastructure are not physical CNT chemistry or morphology-memory proof.</p><p><a class="button" href="/mathematical-bindings.html">View bindings</a></p></article>
    </div>
  </section>

  <section class="section">
    <h2>Built and Locally Validated</h2>
    <div class="status-board">
      <article class="card"><h3>Specificity Engine v0.3</h3><ul class="meta-inline"><li>Status: local validation</li><li>Boundary: target-contract compliance</li></ul><p>Measures target-relative compliance and repair posture. It is not absolute truth.</p><p><a class="button" href="/assets/docs/specificity-thesis-v0.3-public-note.md">Public note</a></p></article>
      <article class="card"><h3>Construction A+</h3><ul class="meta-inline"><li>Status: local validation</li><li>Negative result: collision preserved</li></ul><p>Five-seed batch produced two glyph IDs; descriptor round-trip does not reconstruct the original morphology.</p><p><a class="button" href="/mathematical-bindings.html">See CLAIM-0046 to CLAIM-0051</a></p></article>
      <article class="card"><h3>Bolt-On v0.4 Stage 1</h3><ul class="meta-inline"><li>Status: local validation</li><li>Boundary: not production</li></ul><p>External-host contract demonstration only; no third-party or production host is qualified.</p><p><a class="button" href="/bolt-on.html">Open page</a></p></article>
    </div>
  </section>

  <section class="section">
    <h2>Specification and Proposed Integration</h2>
    <div class="status-board">
      <article class="card"><h3>Persistent Observer</h3><ul class="meta-inline"><li>Status: proposed integration architecture</li><li>Route: /persistent-observer</li></ul><p>Primary contemporary research contribution and planned public reply target.</p><p><a class="button" href="/persistent-observer">Open page</a></p></article>
      <article class="card"><h3>Unified Fractalish Weighting Kernel</h3><ul class="meta-inline"><li>Status: specification</li><li>Boundary: no universal scalar</li></ul><p>Structured WeightReceipts, uncertainty envelope, HOLD, and invalidation conditions.</p><p><a class="button" href="/weighting-kernel.html">Open page</a></p></article>
      <article class="card"><h3>CONFIGURATOR / Bridge</h3><ul class="meta-inline"><li>Status: PROPOSED INTEGRATION / ACTIVE EXPERIMENT</li><li>Boundary: no successful architectural conclusion yet</li></ul><p>Not placed in the homepage hero and not used as qualified evidence before v0.6 qualification.</p></article>
    </div>
  </section>

  <section class="section">
    <h2>External Reported Result</h2>
    <div class="status-board">
      <article class="card"><h3>From Entropy to Epiplexity</h3><ul class="meta-inline"><li>arXiv:2601.03220v2</li><li>Status: external reported result</li></ul><p>Epiplexity framing; not locally reproduced here.</p><p><a class="button" href="https://arxiv.org/abs/2601.03220v2">Open arXiv</a></p></article>
      <article class="card"><h3>Intelligence from Learnable Novelty</h3><ul class="meta-inline"><li>arXiv:2607.18433v1</li><li>Status: external reported result</li></ul><p>Reservoir-based estimator/approximation with fixed bounded observer.</p><p><a class="button" href="https://arxiv.org/abs/2607.18433v1">Open arXiv</a></p></article>
      <article class="card"><h3>Reproduction protocol</h3><ul class="meta-inline"><li>Status: not yet run</li><li>Boundary: preregistered before results</li></ul><p>Seeds, environment, controls, metrics, deviations, hashes, hardware, and falsification conditions.</p><p><a class="button" href="/research/learnable-novelty-reproduction.html">Read protocol</a></p></article>
    </div>
  </section>

  <section class="section">
    <h2>Historical / Archived</h2>
    <div class="status-board">
      <article class="card archive-quiet"><h3>Resonant Morphology M1</h3><ul class="meta-inline"><li>Status: HISTORICAL DEVELOPMENT ARTIFACT</li><li>Authority: bounded software fixture</li><li>Superseded: yes, as flagship proof</li></ul><p>The M1 is retained for lineage and experiment design, not as proof of physical morphology memory, universal coding, or completed persistent intelligence.</p><p><a class="button muted" href="/archive/resonant-morphology-thesis-corrected-2026-07-13.html">Open archive</a></p></article>
      <article class="card archive-quiet"><h3>Natural Math v2.x drafts</h3><ul class="meta-inline"><li>Status: historical lineage</li><li>Current authority: v5</li></ul><p>Earlier drafts are not the current technical specification.</p></article>
    </div>
  </section>
</main>`
}));

write("research.html", page({
  title: "Research Notes | Fractalish",
  description: "Fractalish research notes with status boundaries and links to current persistent-observer, learnable-novelty, and archived morphology materials.",
  canonical: "https://fractalish.com/research.html",
  body: String.raw`<main id="main-content" class="page-shell">
  <header class="page-hero narrow">
    <p class="eyebrow">Research notes</p>
    <h1>Current work first; archived lineage labeled.</h1>
    <p class="lead">Research notes are narrower than specifications and papers. They are listed with status boundaries so a historical note is not mistaken for the current front door.</p>
  </header>
  <section class="section">
    <div class="status-board">
      <article class="card"><h3>Persistent Observer</h3><ul class="meta-inline"><li>Status: public research front</li><li>Route: /persistent-observer</li></ul><p>The public reply target for learnable novelty, persistent state, receipts, governance, and host-bound continuity.</p><p><a class="button" href="/persistent-observer">Open page</a></p></article>
      <article class="card"><h3>Beyond Learnable Novelty</h3><ul class="meta-inline"><li>Status: working technical note</li><li>Boundary: not end-to-end proof</li></ul><p>Reading version of the persistent-observer comparison note.</p><p><a class="button" href="/research/beyond-learnable-novelty.html">Read note</a></p></article>
      <article class="card"><h3>Learnable novelty reproduction protocol</h3><ul class="meta-inline"><li>Status: NOT YET RUN</li><li>Boundary: preregistered controls</li></ul><p>Protocol for reproducing external reported results before Fractalish reports its own outcomes.</p><p><a class="button" href="/research/learnable-novelty-reproduction.html">Read protocol</a></p></article>
      <article class="card"><h3>Ageometrics</h3><ul class="meta-inline"><li>Status: current working paper</li><li>Boundary: target-relative representation loss</li></ul><p>GSR and NGR measure representation sufficiency and residue under declared contracts, not epiplexity by another name.</p><p><a class="button" href="/ageometrics/">Open Ageometrics</a></p></article>
      <article class="card archive-quiet"><h3>Resonant Morphology M1</h3><ul class="meta-inline"><li>Status: HISTORICAL DEVELOPMENT ARTIFACT</li><li>Boundary: bounded software fixture</li></ul><p>Retained for lineage and experiment design, not flagship proof.</p><p><a class="button muted" href="/archive/resonant-morphology-thesis-corrected-2026-07-13.html">Open archive</a></p></article>
      <article class="card"><h3>Recovery Wake</h3><ul class="meta-inline"><li>Status: research note</li><li>Boundary: candidate feature family</li></ul><p>Post-bifurcation recovery signatures as a possible descriptor family.</p><p><a class="button" href="/research/recovery-wake.html">Read note</a></p></article>
    </div>
  </section>
</main>`
}));

write("assets/docs/resonant-morphology-thesis-v0.1-public-note.md", String.raw`# Resonant Morphology M1 - Corrected Historical Note

Status: HISTORICAL DEVELOPMENT ARTIFACT / BOUNDED SOFTWARE FIXTURE
Corrected: 2026-07-13
Current authority: not the public flagship proof; retained for lineage and experiment design.

The Resonant Morphology M1 is a bounded software fixture connecting a parameterized local-growth simulation, descriptor extraction, finite glyph encoding, and target-relative Specificity receipt. It is retained for lineage and experiment design, not as proof of physical morphology memory, universal coding, or completed persistent intelligence.

## Correction and Retraction Notice

The earlier stronger language around bidirectional closure, resonance, absolute truth, and robust morphology classes is retracted or bounded. The Pi_A+ readout is lossy and forward-only. The Specificity Receipt measures target compliance, not absolute truth. Seed 42 is one deterministic trace, not a proof of robust morphology classes.

## Corrected Threshold and Readout

The prototype's branching threshold is corrected to:

\`theta_b = 2.8(T) + 1.5\`

The symbolic readout is deterministically recoverable from the discrete ternary vector. That does not reconstruct the original simulated morphology. Tuple/glyph round-trip is not morphology reconstruction.

## Bounded Prototype Receipt

| Observation | Result |
| --- | --- |
| Segments | 7 |
| Bifurcations | 3 |
| Glyph ID | 31433 |
| PEFP digits | \`[0, 1, 0, -1, 0, -1, -1, 0, 1]\` |
| GSR / NGR | \`0.8 / 0.2\` |
| Debt classification | \`CAUTION\` |
| Failed checklist item | \`trail_density_ok\` |

The result is useful because the receipt preserves a failed condition and a nonzero debt state. A CAUTION output in one fixture is not a general solution to hallucination.

## Preserved Limitations

- The current small Construction A+ batch produced only two glyphs across five runs.
- It was not collision-free across morphologies.
- Tuple/glyph round-trip does not reconstruct the original morphology.
- Historical perfect replay was incomplete.
- No physical encoder-alphabet-channel-decoder system is established.
- Target-contract compliance is not absolute truth.
- Causal influence alone does not establish a finite alphabet.
- Post-hoc discretization alone does not establish a code.

## Mature Claim Hierarchy

1. Pattern
2. Process trace
3. Morphological memory
4. Morphological signal
5. Morphological code
6. Autonomously arising morphological code

Form may preserve partial or useful process history, but equifinality remains possible. Form is what exploration leaves behind: a partial, filtered, and potentially non-unique record of bounded local process.
`);

replaceIn("archive/resonant-morphology-thesis-corrected-2026-07-13.html", [
  [/This page is retained for provenance only\.<\/strong> It is not the current experimental front door\.[\s\S]*?do not read past the notice as unrestricted theory\.<\/p>/, `This page is retained for provenance only.</strong> It is not the current experimental front door. The Resonant Morphology M1 is now classified as a <strong>HISTORICAL DEVELOPMENT ARTIFACT / BOUNDED SOFTWARE FIXTURE</strong>. It is retained for lineage and experiment design, not as proof of physical morphology memory, universal coding, or completed persistent intelligence.</p>`],
  [/The morphology becomes a symbol via a lossy, forward readout\.[\s\S]*?not a bidirectional physical recovery\.<\/p>/, `The readout is lossy and forward-only. The symbol is deterministically recoverable from the discrete ternary vector, but tuple/glyph round-trip does not reconstruct the original simulated morphology. This is a bounded forward fixture, not bidirectional recovery.</p>`],
  [/The Specificity Receipt in this prototype measures target compliance against the declared checklist\.[\s\S]*?proof of robust morphology classes\.<\/p>/, `The Specificity Receipt in this prototype measures target compliance against the declared checklist. It does not measure absolute truth, and Seed 42 remains a single deterministic trace rather than proof of robust morphology classes. A CAUTION output in one fixture is not a general solution to hallucination.</p>`],
  [/This note does not claim proven sentience, artificial personhood, physical CNTM memory,[\s\S]*?regulatory authority\.<\/p>/, `This note does not claim sentience, artificial personhood, physical CNTM memory, physical morphology memory, completed persistent intelligence, a universal morphology decoder, medical authority, or regulatory authority.</p>`],
  [/This is the true test of morphology as memory\./, `This is one bounded test of whether final topology preserves useful information about the rules that produced it.`]
]);

replaceIn("resonant-morphology-thesis.html", [
  [/Canonical current work is <a href="\/natural-math.html">Natural Math<\/a>[\s\S]*?unrestricted theory\.<\/p>/, `The current public front door is <a href="/persistent-observer">Persistent Observer</a>. Natural Math v5 is the governing frozen integer baseline. This archived page is retained only as lineage and a bounded software fixture, not as flagship proof.</p>`],
  [/Current work: <a href="\/natural-math.html">Natural Math<\/a>[\s\S]*?Start Here<\/a>\.<\/p>/, `Current work: <a href="/persistent-observer">Persistent Observer</a> - <a href="/natural-math.html">Natural Math authority</a> - <a href="/mathematical-bindings.html">Sanitized bindings</a>.</p>`]
]);

replaceIn("index.html", [
  [/href="\/persistent-observer\.html"/g, `href="/persistent-observer"`],
  [/Fractalish now includes a persistent-observer research section linking bounded learnability, WeightReceipts, Cognitive Basin changed accessibility, Bolt-On portability, and explicit action boundaries without claiming a complete production-host deployment\./, `The Persistent Observer page is the public front door for the current research: bounded learnability, immutable receipts, UFWK WeightReceipts, Cognitive Basin changed accessibility, Bolt-On portability, and explicit host-owned action boundaries.`],
  [/Open persistent observer/, `Open the Persistent Observer`]
]);

replaceIn("docs/PUBLIC_RELEASE_INDEX.md", [
  [/# Public Release Index[\s\S]*/, `# Public Release Index

This index is review-oriented and follows the Fractalish Mathematical Bindings and Evidence Register v1.1 SANITIZED.

## Primary Public Route

- Persistent Observer: https://fractalish.com/persistent-observer
- Status: PROPOSED INTEGRATION architecture with mixed evidence layers.
- Public-safe claim boundary: no complete production language-model persistent observer is claimed.

## Verified / Frozen

- Natural Math v5 authority page: https://fractalish.com/natural-math.html
  - Current authority: governing frozen integer/reference baseline.
  - Evidence: CLAIM-0001 through CLAIM-0014.
- Bolt-On Demonstrator: https://fractalish.com/bolt-on.html
  - Current authority: v0.3 frozen release for bounded portability evidence.
  - Evidence: CLAIM-0065 through CLAIM-0070.

## Built and Locally Validated

- Specificity v0.3 and Construction A+: https://fractalish.com/mathematical-bindings.html
  - Evidence: CLAIM-0015 through CLAIM-0023 and CLAIM-0046 through CLAIM-0051.
  - Boundary: target-contract compliance, not absolute truth; Construction A+ is not collision-free across morphologies.
- Bolt-On v0.4 Stage 1: https://fractalish.com/bolt-on.html
  - Evidence: CLAIM-0071 and CLAIM-0072.
  - Boundary: external-host contract demonstration only; no production host qualified.

## Specification

- Unified Fractalish Weighting Kernel: https://fractalish.com/weighting-kernel.html
  - Evidence status: CLAIM-0024 through CLAIM-0031.
  - Boundary: no universal scalar; UFWK remains a specification unless a named implementation says otherwise.

## External Reported Result

- Epiplexity: https://arxiv.org/abs/2601.03220v2
- Learnable novelty: https://arxiv.org/abs/2607.18433v1
- Fractalish reproduction protocol: https://fractalish.com/research/learnable-novelty-reproduction.html

## Sanitized Downloads

- Public claim evidence map: https://fractalish.com/assets/docs/public-claim-evidence-map-v1.1-sanitized.json
- Mathematical bindings ledger: https://fractalish.com/assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json
- Public source manifest: https://fractalish.com/assets/docs/public-source-manifest-sanitized-v1.1.csv
- Page-to-claim map: https://fractalish.com/docs/PAGE_TO_PUBLIC_CLAIM_MAP.md
- Namespace crosswalk: https://fractalish.com/docs/NAMESPACE_CROSSWALK.md

## Historical / Archived

- Resonant Morphology archive: https://fractalish.com/archive/resonant-morphology-thesis-corrected-2026-07-13.html
  - Status: HISTORICAL DEVELOPMENT ARTIFACT / BOUNDED SOFTWARE FIXTURE.
  - Boundary: not proof of physical morphology memory, universal coding, or completed persistent intelligence.
`]
]);

write("docs/PROJECT_MAP.md", String.raw`# Project Map

This map follows the Fractalish Mathematical Bindings and Evidence Register v1.1 SANITIZED. It favors explicit authority over file names, high version numbers, or historical priority language.

## Persistent Observer

- What it is: the primary contemporary research contribution and public front door.
- Public route: https://fractalish.com/persistent-observer
- Status: PROPOSED INTEGRATION architecture with frozen, local, specification, and external evidence layers kept separate.
- Boundary: no complete production language-model persistent observer is claimed.

## Natural Math

- What it is: the exact integer/reference baseline for bounded local process and replay.
- Public route: https://fractalish.com/natural-math.html
- Status: Natural Math v5 is VERIFIED / FROZEN and governing.
- Boundary: v5.1 is an extension line; v6/v6.18/Stage 10 are separate diagnostic or research branches; v10.3.2/v12 and higher candidates do not supersede v5 without explicit hash-bound promotion.

## UFWK

- What it is: the Unified Fractalish Weighting Kernel and structured WeightReceipt specification.
- Public route: https://fractalish.com/weighting-kernel.html
- Status: SPECIFICATION.
- Boundary: learnability is one candidate signal; no universal scalar replaces the structured receipt.

## Cognitive Basin

- What it is: persistent state, recovery route, contradiction, and changed-accessibility architecture.
- Public route: https://fractalish.com/cognitive-basin.html
- Status: code-present and locally validated where separately claimed.
- Boundary: not complete production LLM integration.

## Bolt-On

- What it is: portable continuity and governance beside replaceable hosts while execution remains host-owned.
- Public route: https://fractalish.com/bolt-on.html
- Status: v0.3 VERIFIED / FROZEN; v0.4 Stage 1 BUILT AND LOCALLY VALIDATED.
- Boundary: zero adapter-executed actions; not production integration.

## Specificity / Ageometrics

- What it is: target-relative sufficiency, residue, and governance posture.
- Routes: https://fractalish.com/specificity-thesis.html and https://fractalish.com/ageometrics/
- Status: Specificity v0.3 is locally validated; Ageometrics v0.5 is a current working paper.
- Boundary: NGR is not epiplexity residual entropy and target-contract compliance is not absolute truth.

## Resonant Morphology M1

- What it is: a bounded software fixture connecting local-growth simulation, descriptor extraction, finite glyph encoding, and target-relative Specificity receipt.
- Public route: https://fractalish.com/archive/resonant-morphology-thesis-corrected-2026-07-13.html
- Status: HISTORICAL DEVELOPMENT ARTIFACT / BOUNDED SOFTWARE FIXTURE.
- Boundary: not flagship proof, not physical morphology memory, not universal coding, not completed persistent intelligence.

## CONFIGURATOR / Bridge

- What it is: proposed integration lane for connecting Natural Math, interpretation namespaces, and future WeightReceipt handling.
- Status: PROPOSED INTEGRATION / ACTIVE EXPERIMENT.
- Boundary: v0.5 PASS messages are not treated as qualified evidence; v0.6 needs separate hardening and qualification.
`);

write("README.md", String.raw`# Fractalish Public Site

This repository contains the public static site for Fractalish. The current review branch aligns the site with the Fractalish Mathematical Bindings and Evidence Register v1.1 SANITIZED.

## Review Branch Focus

- Primary public route: https://fractalish.com/persistent-observer
- Natural Math authority: v5 is the governing frozen integer baseline.
- UFWK: specification only unless a named implementation qualifies it.
- Bolt-On: v0.3 frozen evidence; v0.4 Stage 1 locally validated external-host contract; no production integration claim.
- Resonant Morphology M1: historical development artifact and bounded software fixture, not flagship proof.

## Status Layers

- VERIFIED / FROZEN
- BUILT AND LOCALLY VALIDATED
- CODE-PRESENT
- SPECIFICATION
- PROPOSED INTEGRATION
- EXTERNAL REPORTED RESULT
- NEGATIVE RESULT / LIMITATION
- HISTORICAL / ARCHIVED

## Public Evidence Files

- \`assets/docs/public-claim-evidence-map-v1.1-sanitized.json\`
- \`assets/docs/public-source-manifest-sanitized-v1.1.csv\`
- \`assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json\`
- \`docs/PAGE_TO_PUBLIC_CLAIM_MAP.md\`
- \`docs/NAMESPACE_CROSSWALK.md\`
- \`docs/PUBLIC_REPOSITORY_INDEX.md\`

## Current Non-Claims

No current release demonstrates the complete Natural Math-UFWK-Cognitive Basin-Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service. No page should imply completed production integration, physical CNT memory, morphology uniqueness, universal coding, or machine-generated human-value scoring.

## Local Validation

Use the repository validator before review:

\`\`\`powershell
node scripts/validate-public-site.mjs
\`\`\`

This branch may be deployed only after all current coordinated-release gates pass. Do not post to X or any social platform from automation.
`);

write("docs/NAMESPACE_CROSSWALK.md", String.raw`# Namespace Crosswalk

Identically spelled states are not automatically equivalent. A source event may lead to a separate interpretation or governance request, but the original source state is never rewritten into a different namespace.

| Namespace | States | Meaning |
| --- | --- | --- |
| Natural Math action | EXTEND, SENSE, RESTRICT_DIE | Local process operators in the frozen integer baseline. |
| Cognitive Basin action | EXTEND, HOLD, RETRACT | Governed action posture inside persistent state. |
| Cognitive Basin evidence | SUPPORTED, UNRESOLVED, CONTRADICTED | Evidence posture for claims and records. |
| Latent Role activation | INHIBIT, HOLD, ADVANCE | Activation-state handling. |
| Specificity posture | OPERATIONAL, CAUTION, CONSTRAINED, CRITICAL, EXCEEDED | Target-contract and structural debt posture. |
| Bolt-On portable action | HOLD, RELEASE | Portable sidecar action projection, not native host execution. |
| CNTM admission | CANONIZE, REJECT, HOLD | Admission posture; implementation authority remains unresolved unless named. |

Do not publish a simple RESTRICT -> HOLD mapping. RESTRICT_DIE is a Natural Math action state. HOLD is a governed unresolved posture in other namespaces.
`);

write("docs/PUBLIC_REPOSITORY_INDEX.md", String.raw`# Public Repository Index

This index records public repository links used by the review branch. Live verification evidence is captured in the validation evidence file.

| Repository | Purpose | Authority Level | Frozen Commit / Tag | Test or Verifier Command | Current Limitations |
| --- | --- | --- | --- | --- | --- |
| https://github.com/BonAcqui-LLC/fractalish | Public site and public source lanes including CNTM Natural Math canonical library references. | Mixed: site source, frozen-source references, public review branch. | Site starting commit 8fc890cde31d3ea5e64e18b9bbdc6dc1babf11e9; branch under review records current HEAD. | \`node scripts/validate-public-site.mjs\` for site routes; source-lane verifiers are named in the claim map where public. | Site repo does not by itself prove frozen-source claims; those remain claim-map and manifest bound. |
| https://github.com/BonAcqui-LLC/cognitive-basin-platform | Public platform repository linked for Cognitive Basin, Specificity, Motorola, and related source lanes. | Built/local or code-present depending component. | Exact frozen commits are claim-specific where present. | Named verifier commands must be followed from that repository and claim-specific docs. | Site must not claim runnable evidence where a reader cannot locate the named verifier. |

Repository-link audit must be refreshed before deployment review. Missing README, missing license, dead link, or unverifiable test command should hold deployment.
`);

write("docs/PAGE_TO_PUBLIC_CLAIM_MAP.md", String.raw`# Page-to-Public-Claim Map

This map binds public implementation, numerical, comparison, and status statements to the sanitized public claim map. It is not a private provenance file.

| Page | Section | Exact sentence or claim surface | Claim ID | Public Evidence ID | Source / Commit | Status | Qualification Boundary |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /natural-math.html | Frozen v5 evidence | Natural Math v5 passed 40/40 frozen oracle fixtures and 210/210 replay configurations in the 2026-07-23 read-only rerun. | CLAIM-0014 | EVIDENCE:NATURAL_MATH_V5_AND_CONSTRUCTION_A_PLUS_LOCAL_RERUN_UTF8_LOG; EVIDENCE:NATURAL_MATH_V5_FROZEN_VALIDATION_DIR | SOURCESET:natural-math-frozen-canonical; Master-library frozen baseline; SHA-256-bound | VERIFIED / FROZEN | Deterministic software behavior under declared integer parameters and fixtures. |
| /persistent-observer | What exists now | Natural Math v5 is the governing frozen integer baseline. | CLAIM-0001 to CLAIM-0014 | EVIDENCE:NATURAL_MATH_V5_AND_CONSTRUCTION_A_PLUS_LOCAL_RERUN_UTF8_LOG; EVIDENCE:NATURAL_MATH_V5_FROZEN_VALIDATION_DIR | SOURCESET:natural-math-frozen-canonical | VERIFIED / FROZEN | Not a general law of biology, physics, or intelligence. |
| /persistent-observer | What exists now | Construction A+ five-seed batch was not collision-free. | CLAIM-0051 | EVIDENCE:NATURAL_MATH_V5_AND_CONSTRUCTION_A_PLUS_LOCAL_RERUN_UTF8_LOG | REPO:cntm-natural-math-canonical-library / approved local rerun | BUILT AND LOCALLY VALIDATED | Software-only descriptor/encoding; not physical morphology or arbitrary uniqueness. |
| /persistent-observer | What exists now | Bolt-On v0.3 reports 256 tests, two host families, 48 adversarial rejections, two baseline host-owned actions, zero bolt-on-executed actions, and one host substitution. | CLAIM-0065 to CLAIM-0070 | EVIDENCE:BOLT_ALL_FROZEN_ISOLATED_VERIFY_STDOUT; EVIDENCE:BOLT_V0_3_ISOLATED_ORIGIN_MANIFEST | REPO:cntm-natural-math-canonical-library | VERIFIED / FROZEN | Portable dry-run/governance projection only; not production LLM-host integration. |
| /bolt-on.html | Status evidence | v0.4 Stage 1 reports 73/73 unit tests, 37 contract requirements, 28/28 rejection cases, host actions=0, and bolt-on actions=0. | CLAIM-0071; CLAIM-0072 | EVIDENCE:BOLT_V0_4_EXTERNAL_CONTRACT_UNITTEST_STDOUT | REPO:cntm-natural-math-canonical-library | BUILT AND LOCALLY VALIDATED | External-host contract demonstration only; execution authority NONE. |
| /weighting-kernel.html | Header | UFWK remains a specification unless a named implementation says otherwise. | CLAIM-0024 to CLAIM-0031 | DOC:ufwk-specification | DOCSET:ufwk-selected-documents | SPECIFICATION | Provisional observer-, target-, context-, and policy-relative architecture. |
| /scientific-neighbors.html | Epiplexity | Epiplexity is recorded as external reported result, not locally reproduced. | CLAIM-0083; CLAIM-0084 | DOC:from-entropy-to-epiplexity-2601-03220v2-pdf | DOCSET:levin-selected-documents | EXTERNAL REPORTED RESULT | This register does not claim independent reproduction. |
| /scientific-neighbors.html | Learnable novelty | Learnable novelty reports a reservoir-based estimator or approximation with a fixed bounded observer. | CLAIM-0085 to CLAIM-0091 | DOC:intelligence-from-learnable-novelty-2607-18433v1-pdf | DOCSET:levin-selected-documents | EXTERNAL REPORTED RESULT | External preprint; co-evolving observers and LLM substrates remain future work. |
| /status.html | Historical / Archived | Resonant Morphology M1 is a historical development artifact and bounded software fixture. | CLAIM-0046 to CLAIM-0051 | EVIDENCE:NATURAL_MATH_V5_AND_CONSTRUCTION_A_PLUS_LOCAL_RERUN_UTF8_LOG | REPO:cntm-natural-math-canonical-library | BUILT AND LOCALLY VALIDATED / HISTORICAL | Retained for lineage, not physical morphology memory or universal coding. |
| /mathematical-bindings.html | Explorer | The explorer is generated only from the sanitized public claim map and source manifest. | ALL PUBLIC CLAIMS | PUBLIC_CLAIM_EVIDENCE_MAP.json; PUBLIC_SOURCE_MANIFEST_SANITIZED.csv | Sanitized v1.1 package | PUBLICATION-SAFE INDEX | Not exhaustive private provenance; no local paths or private manifests. |

Reviewed words requiring attention: proven, verified, frozen, first, unique, complete, closed, collision-free, physical, truth, solved, anti-hallucination, production, external host, independent, general, universal.
`);

write("docs/VALIDATION_EVIDENCE_2026-07-24.md", `# Validation Evidence - 2026-07-24

Status: coordinated public-release evidence for Fractalish. Deployment is authorized only after all cross-site hard release gates pass. No X post or frozen-source-repository alteration was performed by this repair pass.

Branch: \`codex/persistent-observer-public-release-2026-07-24\`

## Commands and results

| Gate | Result | Evidence |
| --- | --- | --- |
| Local route / anchor / sitemap validator | PASS with one warning | \`node scripts/validate-public-site.mjs\` checked 96 HTML files and 58 sitemap routes. Warning retained: \`404.html\` expected one canonical link. |
| Overclaim scan | PASS after review | Matches are disclaimer, retraction, or negative-boundary uses such as "not production integration" and "not collision-free". |
| Current-tree privacy scan | PASS | Public text-source scan covered 205 current-tree HTML, MD, JSON, CSV, SVG, JS, CSS, XML, TXT, CFF, YML, PY, MJS, and control files. Category A=0, B=0 after review, C=0 sensitive after review, D=0, E=0, F=0, G=0 sensitive after review, H=0. Binary assets were excluded from text regex counting and retained as existing public assets. |
| Changed-file privacy scan | PASS | Scanned changed/new public files. Tight detector found zero local path strings and zero long token-shaped secrets after ledger sanitization. |
| Git-history privacy scan | PASS / proceed | Reachable history scan covered 46 commits. Category A found only generic detector strings in an older public-release guard script. Category B hits were the ordinary phrase "desktop-style," not a username or machine ID. Category C/D hits were protective policy language about records that should be excluded from this repository. Category G hits were the public BonAcqui support contact. Categories E, F, and H were 0. Disposition: no D-H sensitive finding; do not rewrite established history solely for generic detector strings. |
| Public repository reachability | PARTIAL | \`https://github.com/BonAcqui-LLC/fractalish.git\` reachable at HEAD \`8fc890cde31d3ea5e64e18b9bbdc6dc1babf11e9\`; README and LICENSE raw URLs return 200. \`https://github.com/BonAcqui-LLC/cognitive-basin-platform.git\` reachable at HEAD \`662911b9e62b80166ca7420956e073442f35fc3e\`; README raw URL returns 200; \`main/LICENSE\` raw URL returns 404. |
| Current deployment check | REVIEWED | Live \`https://fractalish.com/\` and \`https://fractalish.com/persistent-observer\` were inspected as deployment baseline. The current live sitemap listed 58 URLs. |
| DUEL disposition | PASS / cross-project corrected | DUEL DISPOSITION: ERRONEOUS CROSS-PROJECT INSTRUCTION; CORRECT PROJECT: ERACII; NOT A MISSING FRACTALISH PAGE; NO FRACTALISH RESTORATION REQUIRED. Fractalish search for a missing DUEL artifact is closed. |
| Responsive DOM check | PASS | At 1024px, compact nav state: \`navLinksDisplay="none"\`, \`navToggleDisplay="flex"\`, \`overflowX=false\`, stylesheet \`site.css?v=observer-20260724\`. At 390px, compact nav state: \`navToggleDisplay="flex"\`, \`overflowX=false\`. |
| Screenshot capture | PARTIAL / browser-backend caveat | Viewport screenshots were captured to \`docs/validation/screenshots/2026-07-24/\`. The in-app browser screenshot backend showed unreliable right-edge capture for the compact menu; DOM assertions above are the authoritative responsive evidence. |
| Local server cleanup | PASS | Temporary \`127.0.0.1:4174\` static server was stopped after screenshot capture. |

## Screenshot artifacts

- \`docs/validation/screenshots/2026-07-24/persistent-observer-desktop.png\` - 1024 x 768 viewport
- \`docs/validation/screenshots/2026-07-24/persistent-observer-mobile.png\` - 390 x 844 viewport
- \`docs/validation/screenshots/2026-07-24/mathematical-bindings-desktop.png\` - 1024 x 768 viewport
- \`docs/validation/screenshots/2026-07-24/status-mobile.png\` - 390 x 844 viewport

## Fractalish release recommendation

Fractalish is ready for coordinated cross-site release review after the current validation commands are rerun from the final commit. This does not authorize posting to X or another social platform.

Before deployment, rerun:

\`\`\`powershell
node scripts/apply-persistent-observer-public-release-2026-07-24.mjs
node scripts/validate-public-site.mjs
\`\`\`

Then repeat the current-tree privacy scan and inspect final \`git status --short\`. Deploy only if the Eracii release gates also pass or if the affected cross-site link is explicitly held out of the public release.
`);

write("assets/figures/finite-to-persistent-observer.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
  <title id="title">From finite observer to persistent observer</title>
  <desc id="desc">A finite observer extracts a candidate learnability signal. A persistent observer preserves receipts, residue, contradiction, governance, and changed future accessibility.</desc>
  <rect width="1200" height="720" fill="#071019"/>
  <style>
    text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}
    .muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.solid{stroke:#7cff6b;stroke-width:4;fill:none}.dash{stroke:#f0b46a;stroke-width:4;fill:none;stroke-dasharray:12 10}
  </style>
  <text x="70" y="80" font-size="34" font-weight="700">Finite observer</text>
  <text x="700" y="80" font-size="34" font-weight="700">Persistent observer</text>
  <rect class="box" x="70" y="140" width="380" height="120" rx="8"/>
  <text x="105" y="190" font-size="24" font-weight="700">bounded capacity</text>
  <text class="muted" x="105" y="225" font-size="18">extracts reusable structure</text>
  <rect class="box" x="70" y="330" width="380" height="120" rx="8"/>
  <text x="105" y="380" font-size="24" font-weight="700">candidate signal</text>
  <text class="muted" x="105" y="415" font-size="18">learnability / epiplexity estimate</text>
  <path class="dash" d="M450 390 C560 390 575 390 680 390"/>
  <text class="muted" x="485" y="360" font-size="18">candidate input only</text>
  <rect class="box" x="700" y="130" width="420" height="78" rx="8"/>
  <text x="730" y="178" font-size="22" font-weight="700">immutable evidence receipt</text>
  <rect class="box" x="700" y="232" width="420" height="78" rx="8"/>
  <text x="730" y="280" font-size="22" font-weight="700">target, residue, uncertainty</text>
  <rect class="box" x="700" y="334" width="420" height="78" rx="8"/>
  <text x="730" y="382" font-size="22" font-weight="700">contradiction and correction history</text>
  <rect class="box" x="700" y="436" width="420" height="78" rx="8"/>
  <text x="730" y="484" font-size="22" font-weight="700">changed future accessibility</text>
  <rect class="gate" x="700" y="538" width="420" height="78" rx="8"/>
  <text x="730" y="586" font-size="22" font-weight="700">HOLD / guard / host boundary</text>
  <path class="solid" d="M910 208 V232"/>
  <path class="solid" d="M910 310 V334"/>
  <path class="solid" d="M910 412 V436"/>
  <path class="solid" d="M910 514 V538"/>
</svg>`);

write("assets/figures/natural-math-version-authority.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
  <title id="title">Natural Math version authority</title>
  <desc id="desc">Natural Math v5 is the frozen governing baseline. v5.1 is an extension line, v6 and Stage 10 are research branches, and higher numbered candidates do not supersede v5 without explicit qualification.</desc>
  <rect width="1200" height="720" fill="#071019"/>
  <style>
    text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.frozen{fill:#102113;stroke:#7cff6b;stroke-width:3}.branch{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.candidate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.line{stroke:#aeb9c3;stroke-width:3;fill:none}.dash{stroke:#f0b46a;stroke-width:3;fill:none;stroke-dasharray:10 9}
  </style>
  <text x="70" y="80" font-size="36" font-weight="700">Authority follows qualification, not numbering</text>
  <rect class="frozen" x="90" y="160" width="1020" height="120" rx="8"/>
  <text x="130" y="210" font-size="28" font-weight="700">Natural Math v5</text>
  <text class="muted" x="130" y="250" font-size="20">governing frozen integer/reference baseline - hash-bound fixtures and replay</text>
  <path class="line" d="M600 280 V335"/>
  <rect class="branch" x="90" y="350" width="300" height="130" rx="8"/>
  <text x="125" y="400" font-size="24" font-weight="700">v5.1</text>
  <text class="muted" x="125" y="438" font-size="18">extension line only</text>
  <rect class="branch" x="450" y="350" width="300" height="130" rx="8"/>
  <text x="485" y="400" font-size="24" font-weight="700">v6 / v6.18 / Stage 10</text>
  <text class="muted" x="485" y="438" font-size="18">diagnostic or research branch</text>
  <rect class="candidate" x="810" y="350" width="300" height="130" rx="8"/>
  <text x="845" y="400" font-size="24" font-weight="700">v10.3.2 / v12+</text>
  <text class="muted" x="845" y="438" font-size="18">candidate or historical branch</text>
  <path class="dash" d="M240 520 H960"/>
  <text class="muted" x="295" y="570" font-size="22">No branch supersedes v5 without explicit frozen compatibility promotion</text>
</svg>`);

write("assets/figures/persistent-observer-stack.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 760" role="img" aria-labelledby="title desc">
  <title id="title">Persistent observer target integration architecture</title>
  <desc id="desc">Target architecture showing learnable novelty as a dashed candidate signal into immutable receipts, WeightReceipts, Cognitive Basin, guard and HOLD, Bolt-On continuity, and host-owned action.</desc>
  <rect width="1320" height="760" fill="#071019"/>
  <style>
    text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.solid{stroke:#7cff6b;stroke-width:4;fill:none}.dash{stroke:#f0b46a;stroke-width:4;fill:none;stroke-dasharray:14 10}.label{fill:#7cff6b;font-size:16;font-weight:700}.warn{fill:#f0b46a;font-size:16;font-weight:700}
  </style>
  <text x="60" y="60" font-size="34" font-weight="700">Target integration architecture</text>
  <rect class="box" x="60" y="120" width="210" height="94" rx="8"/><text x="90" y="170" font-size="21" font-weight="700">Encounter</text><text class="muted" x="90" y="198" font-size="15">stream / event</text>
  <rect class="gate" x="320" y="120" width="230" height="94" rx="8"/><text x="350" y="160" font-size="20" font-weight="700">Learnability</text><text class="muted" x="350" y="190" font-size="15">candidate signal</text>
  <rect class="box" x="600" y="120" width="230" height="94" rx="8"/><text x="630" y="160" font-size="20" font-weight="700">Evidence receipt</text><text class="muted" x="630" y="190" font-size="15">immutable</text>
  <rect class="box" x="880" y="120" width="230" height="94" rx="8"/><text x="910" y="160" font-size="20" font-weight="700">WeightReceipt</text><text class="muted" x="910" y="190" font-size="15">revisable interpretation</text>
  <rect class="box" x="880" y="300" width="230" height="94" rx="8"/><text x="910" y="340" font-size="20" font-weight="700">Cognitive Basin</text><text class="muted" x="910" y="370" font-size="15">changed accessibility</text>
  <rect class="gate" x="600" y="300" width="230" height="94" rx="8"/><text x="630" y="340" font-size="20" font-weight="700">GUARD / HOLD</text><text class="muted" x="630" y="370" font-size="15">target contract</text>
  <rect class="box" x="320" y="300" width="230" height="94" rx="8"/><text x="350" y="340" font-size="20" font-weight="700">Bolt-On</text><text class="muted" x="350" y="370" font-size="15">continuity sidecar</text>
  <rect class="gate" x="60" y="300" width="210" height="94" rx="8"/><text x="90" y="340" font-size="20" font-weight="700">Host boundary</text><text class="muted" x="90" y="370" font-size="15">native action owned by host</text>
  <path class="solid" d="M270 167 H320"/>
  <path class="dash" d="M550 167 H600"/>
  <path class="solid" d="M830 167 H880"/>
  <path class="solid" d="M995 214 V300"/>
  <path class="solid" d="M880 347 H830"/>
  <path class="solid" d="M600 347 H550"/>
  <path class="solid" d="M320 347 H270"/>
  <text class="warn" x="382" y="236">candidate signal / proposed experiment</text>
  <text class="label" x="125" y="444">No direct signal-to-execution edge</text>
  <text class="muted" x="60" y="650" font-size="18">Solid edges: bounded custody or specified handoff. Dashed edge: proposed integration. The host retains execution authority.</text>
</svg>`);

write("assets/figures/metric-versus-observer.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc">
  <title id="title">Metric versus persistent observer</title>
  <desc id="desc">A metric produces a score from an encounter. A persistent observer preserves evidence, target, residue, contradiction, replay, and changed future accessibility.</desc>
  <rect width="1200" height="680" fill="#071019"/>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.line{stroke:#7cff6b;stroke-width:4;fill:none}</style>
  <text x="90" y="80" font-size="34" font-weight="700">Metric</text>
  <text x="660" y="80" font-size="34" font-weight="700">Persistent observer</text>
  <rect class="box" x="90" y="150" width="360" height="95" rx="8"/><text x="125" y="205" font-size="24" font-weight="700">Encounter</text>
  <path class="line" d="M270 245 V320"/>
  <rect class="gate" x="90" y="320" width="360" height="95" rx="8"/><text x="125" y="375" font-size="24" font-weight="700">Score</text>
  <text class="muted" x="125" y="415" font-size="18">Useful, but not memory or governance</text>
  <rect class="box" x="660" y="130" width="390" height="72" rx="8"/><text x="690" y="174" font-size="21" font-weight="700">Immutable evidence</text>
  <rect class="box" x="660" y="222" width="390" height="72" rx="8"/><text x="690" y="266" font-size="21" font-weight="700">Target and residue</text>
  <rect class="box" x="660" y="314" width="390" height="72" rx="8"/><text x="690" y="358" font-size="21" font-weight="700">Contradiction and correction</text>
  <rect class="box" x="660" y="406" width="390" height="72" rx="8"/><text x="690" y="450" font-size="21" font-weight="700">Replay and changed reach</text>
  <rect class="gate" x="660" y="498" width="390" height="72" rx="8"/><text x="690" y="542" font-size="21" font-weight="700">HOLD / host boundary</text>
  <text class="muted" x="660" y="622" font-size="18">Changed inspectably, reversibly, and with receipts.</text>
</svg>`);

write("assets/figures/weight-receipt-anatomy.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
  <title id="title">WeightReceipt anatomy</title>
  <desc id="desc">A structured WeightReceipt has immutable evidence, eight target-relative weight families, an uncertainty envelope, invalidation conditions, non-compensatory gates, and derived task projections.</desc>
  <rect width="1200" height="720" fill="#071019"/>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.line{stroke:#7cff6b;stroke-width:4;fill:none}</style>
  <text x="60" y="70" font-size="34" font-weight="700">Structured WeightReceipt</text>
  <rect class="box" x="60" y="120" width="480" height="90" rx="8"/><text x="90" y="172" font-size="24" font-weight="700">Immutable evidence</text><text class="muted" x="90" y="198" font-size="16">hashes, source, target, protocol</text>
  <rect class="box" x="60" y="250" width="230" height="80" rx="8"/><text x="90" y="298" font-size="20" font-weight="700">Structural</text>
  <rect class="box" x="310" y="250" width="230" height="80" rx="8"/><text x="340" y="298" font-size="20" font-weight="700">Contextual</text>
  <rect class="box" x="60" y="350" width="230" height="80" rx="8"/><text x="90" y="398" font-size="20" font-weight="700">Affective-significance</text>
  <rect class="box" x="310" y="350" width="230" height="80" rx="8"/><text x="340" y="398" font-size="20" font-weight="700">Prospective</text>
  <rect class="box" x="60" y="450" width="230" height="80" rx="8"/><text x="90" y="498" font-size="20" font-weight="700">Consequential</text>
  <rect class="box" x="310" y="450" width="230" height="80" rx="8"/><text x="340" y="498" font-size="20" font-weight="700">Mnemonic</text>
  <rect class="box" x="60" y="550" width="230" height="80" rx="8"/><text x="90" y="598" font-size="20" font-weight="700">Residual</text>
  <rect class="box" x="310" y="550" width="230" height="80" rx="8"/><text x="340" y="598" font-size="20" font-weight="700">Counterfactual</text>
  <rect class="gate" x="660" y="130" width="420" height="110" rx="8"/><text x="695" y="178" font-size="23" font-weight="700">Uncertainty envelope</text><text class="muted" x="695" y="212" font-size="17">scope, disagreement, missing evidence</text>
  <rect class="gate" x="660" y="280" width="420" height="110" rx="8"/><text x="695" y="328" font-size="23" font-weight="700">Non-compensatory gates</text><text class="muted" x="695" y="362" font-size="17">HOLD, rights, target failure</text>
  <rect class="gate" x="660" y="430" width="420" height="110" rx="8"/><text x="695" y="478" font-size="23" font-weight="700">Invalidation conditions</text><text class="muted" x="695" y="512" font-size="17">correction, replay failure, target drift</text>
  <rect class="box" x="660" y="580" width="420" height="70" rx="8"/><text x="695" y="624" font-size="22" font-weight="700">Derived task projection only</text>
</svg>`);

write("assets/figures/host-authority-boundary.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 720" role="img" aria-labelledby="title desc">
  <title id="title">Host authority boundary</title>
  <desc id="desc">A replaceable host connects to a read-only adapter, canonical event projection, receipts, optional WeightReceipt, Cognitive Basin, guard and HOLD, and finally a host-owned command boundary.</desc>
  <rect width="1320" height="720" fill="#071019"/>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.line{stroke:#7cff6b;stroke-width:4;fill:none}.dash{stroke:#f0b46a;stroke-width:4;fill:none;stroke-dasharray:12 10}</style>
  <text x="60" y="70" font-size="34" font-weight="700">Continuity beside the host, not control of the host</text>
  <rect class="box" x="60" y="150" width="170" height="100" rx="8"/><text x="92" y="195" font-size="20" font-weight="700">Replaceable</text><text x="92" y="222" font-size="20" font-weight="700">host</text>
  <rect class="box" x="280" y="150" width="170" height="100" rx="8"/><text x="310" y="195" font-size="20" font-weight="700">Read-only</text><text x="310" y="222" font-size="20" font-weight="700">adapter</text>
  <rect class="box" x="500" y="150" width="170" height="100" rx="8"/><text x="530" y="195" font-size="20" font-weight="700">Canonical</text><text x="530" y="222" font-size="20" font-weight="700">event</text>
  <rect class="box" x="720" y="150" width="170" height="100" rx="8"/><text x="750" y="195" font-size="20" font-weight="700">Receipt</text><text x="750" y="222" font-size="20" font-weight="700">and replay</text>
  <rect class="box" x="940" y="150" width="170" height="100" rx="8"/><text x="970" y="195" font-size="20" font-weight="700">Optional</text><text x="970" y="222" font-size="20" font-weight="700">WeightReceipt</text>
  <rect class="box" x="720" y="360" width="170" height="100" rx="8"/><text x="750" y="405" font-size="20" font-weight="700">Cognitive</text><text x="750" y="432" font-size="20" font-weight="700">Basin</text>
  <rect class="gate" x="500" y="360" width="170" height="100" rx="8"/><text x="530" y="405" font-size="20" font-weight="700">GUARD /</text><text x="530" y="432" font-size="20" font-weight="700">HOLD</text>
  <rect class="gate" x="280" y="360" width="170" height="100" rx="8"/><text x="310" y="405" font-size="20" font-weight="700">Host-owned</text><text x="310" y="432" font-size="20" font-weight="700">boundary</text>
  <rect class="gate" x="60" y="360" width="170" height="100" rx="8"/><text x="92" y="405" font-size="20" font-weight="700">Native host</text><text x="92" y="432" font-size="20" font-weight="700">action</text>
  <path class="line" d="M230 200 H280M450 200H500M670 200H720M890 200H940M1025 250V330C1025 410 960 410 890 410M720 410H670M500 410H450"/>
  <path class="dash" d="M280 410H230"/>
  <text class="muted" x="290" y="510" font-size="18">Dashed final edge requires host permit. Adapter does not execute.</text>
</svg>`);

write("assets/figures/evidence-status-layers.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 720" role="img" aria-labelledby="title desc">
  <title id="title">Evidence status layers</title>
  <desc id="desc">Stack of evidence labels from verified frozen through locally validated, code-present, specification, proposed integration, external reported result, negative result, and historical archived.</desc>
  <rect width="1100" height="720" fill="#071019"/>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.row{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.warn{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}</style>
  <text x="70" y="70" font-size="34" font-weight="700">Evidence status is part of the claim</text>
  <g font-size="22" font-weight="700">
    <rect class="row" x="90" y="120" width="920" height="60" rx="8"/><text x="125" y="158">VERIFIED / FROZEN</text><text class="muted" x="520" y="158" font-size="18">hash-bound, frozen, fixture-qualified</text>
    <rect class="row" x="90" y="195" width="920" height="60" rx="8"/><text x="125" y="233">BUILT AND LOCALLY VALIDATED</text><text class="muted" x="520" y="233" font-size="18">implemented and rerun, not broadly qualified</text>
    <rect class="row" x="90" y="270" width="920" height="60" rx="8"/><text x="125" y="308">CODE-PRESENT</text><text class="muted" x="520" y="308" font-size="18">structures exist, complete behavior not qualified</text>
    <rect class="row" x="90" y="345" width="920" height="60" rx="8"/><text x="125" y="383">SPECIFICATION</text><text class="muted" x="520" y="383" font-size="18">formal contract without complete runtime evidence</text>
    <rect class="warn" x="90" y="420" width="920" height="60" rx="8"/><text x="125" y="458">PROPOSED INTEGRATION</text><text class="muted" x="520" y="458" font-size="18">planned connection, not demonstrated</text>
    <rect class="warn" x="90" y="495" width="920" height="60" rx="8"/><text x="125" y="533">EXTERNAL REPORTED RESULT</text><text class="muted" x="520" y="533" font-size="18">neighboring result, not locally reproduced</text>
    <rect class="warn" x="90" y="570" width="920" height="60" rx="8"/><text x="125" y="608">NEGATIVE / HISTORICAL</text><text class="muted" x="520" y="608" font-size="18">failures and lineage stay visible</text>
  </g>
</svg>`);

write("assets/figures/persistent-observer-experiment.svg", String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 760" role="img" aria-labelledby="title desc">
  <title id="title">Persistent observer proposed experiment</title>
  <desc id="desc">Experiment compares baselines, candidate learnability signal, read-only sidecar, immutable receipts, Basin updates, host substitution, and falsification checks.</desc>
  <rect width="1320" height="760" fill="#071019"/>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#f3f7f2}.muted{fill:#aeb9c3}.box{fill:#101b25;stroke:#8fd7ff;stroke-width:2}.gate{fill:#1d1a12;stroke:#f0b46a;stroke-width:2}.line{stroke:#7cff6b;stroke-width:4;fill:none}.dash{stroke:#f0b46a;stroke-width:4;fill:none;stroke-dasharray:12 10}</style>
  <text x="60" y="70" font-size="34" font-weight="700">PROPOSED INTEGRATION experiment</text>
  <rect class="box" x="80" y="130" width="260" height="90" rx="8"/><text x="110" y="180" font-size="22" font-weight="700">Baselines</text><text class="muted" x="110" y="208" font-size="16">summary, vector, recency</text>
  <rect class="gate" x="80" y="270" width="260" height="90" rx="8"/><text x="110" y="320" font-size="22" font-weight="700">Learnability-only</text><text class="muted" x="110" y="348" font-size="16">candidate signal</text>
  <rect class="box" x="430" y="200" width="260" height="90" rx="8"/><text x="460" y="250" font-size="22" font-weight="700">Read-only sidecar</text>
  <rect class="box" x="780" y="130" width="260" height="90" rx="8"/><text x="810" y="180" font-size="22" font-weight="700">Receipts</text><text class="muted" x="810" y="208" font-size="16">evidence and replay</text>
  <rect class="box" x="780" y="270" width="260" height="90" rx="8"/><text x="810" y="320" font-size="22" font-weight="700">Basin update</text><text class="muted" x="810" y="348" font-size="16">changed accessibility</text>
  <rect class="gate" x="780" y="410" width="260" height="90" rx="8"/><text x="810" y="460" font-size="22" font-weight="700">Host boundary</text><text class="muted" x="810" y="488" font-size="16">substitution and HOLD</text>
  <rect class="gate" x="430" y="520" width="360" height="90" rx="8"/><text x="460" y="570" font-size="22" font-weight="700">Falsify if simpler baselines match</text>
  <path class="line" d="M340 175 C395 175 395 245 430 245"/>
  <path class="dash" d="M340 315 C395 315 395 245 430 245"/>
  <path class="line" d="M690 245 C735 245 735 175 780 175"/>
  <path class="line" d="M910 220 V270"/>
  <path class="line" d="M910 360 V410"/>
  <path class="line" d="M780 455 C650 455 620 500 610 520"/>
</svg>`);

// Add public-safe source IDs and next-evidence fields to the bindings ledger.
const ledgerPath = path.join(ROOT, "assets/docs/mathematical-bindings-ledger-v1.1-sanitized.json");
const manifestPath = path.join(ROOT, "assets/docs/public-source-manifest-sanitized-v1.1.csv");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
ledger.global_disclaimer = "No current release has yet demonstrated the complete Natural Math-UFWK-Cognitive Basin-Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service.";
const manifestRows = fs.readFileSync(manifestPath, "utf8").trim().split(/\r?\n/).slice(1).map((line) => {
  const [logical_source_id, repository, repository_locator, commit, source_path, source_sha256] = line.split(",");
  return { logical_source_id, repository, repository_locator, commit, source_path, source_sha256 };
});
for (const binding of ledger.bindings || []) {
  const source = binding.source || {};
  const matched = manifestRows.find((row) => row.source_sha256 === source.sha256 || row.source_path === source.path);
  binding.public_safe_source_id = matched?.logical_source_id || binding.source?.repository || "UNRESOLVED:source-not-located";
  binding.source = {
    ...source,
    repository: matched?.repository || source.repository || "PUBLIC-SAFE-SOURCE-UNRESOLVED",
    repository_locator: matched?.repository_locator || source.repository_locator || "",
    commit: matched?.commit || source.commit || "PUBLIC-SAFE-AUTHORITY-UNRESOLVED",
    path: matched?.source_path || (/(?:[A-Za-z]:[\\/]|[\\/]Users[\\/][^\\/]+|[\\/]home[\\/][^\\/]+)/i.test(source.path || "") ? "SOURCEPATH:private-path-redacted" : source.path || "SOURCEPATH:unresolved"),
    sha256: matched?.source_sha256 || source.sha256 || "SHA256:unresolved"
  };
  if (/(?:[A-Za-z]:[\\/]|[\\/]Users[\\/][^\\/]+|[\\/]home[\\/][^\\/]+)/i.test(binding.implementation_ref || "")) {
    binding.implementation_ref = `${binding.public_safe_source_id}:implementation-ref-redacted-to-public-source-id`;
  }
  if (/VERIFIED|FROZEN|ESTABLISHED/i.test(`${binding.representation_layer} ${binding.status}`)) {
    binding.next_required_evidence = "No broader claim without a new versioned, hash-bound qualification record.";
  } else if (/EXTERNAL/i.test(`${binding.representation_layer} ${binding.status}`)) {
    binding.next_required_evidence = "Independent reproduction under the declared Fractalish protocol before local result claims.";
  } else if (/SPECIFICATION|PROVISIONAL|UNRESOLVED/i.test(`${binding.representation_layer} ${binding.status}`)) {
    binding.next_required_evidence = "Named implementation, tests, fixtures, hashes, and falsification conditions.";
  } else {
    binding.next_required_evidence = "Broader validation, external review, and explicit scope expansion before stronger public claims.";
  }
}
fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + "\n", "utf8");

const claimMapPath = path.join(ROOT, "assets/docs/public-claim-evidence-map-v1.1-sanitized.json");
const claimMap = JSON.parse(fs.readFileSync(claimMapPath, "utf8"));
claimMap.global_disclaimer = "No current release has yet demonstrated the complete Natural Math-UFWK-Cognitive Basin-Bolt-On pipeline operating end to end inside ChatGPT or another production language-model service.";
fs.writeFileSync(claimMapPath, JSON.stringify(claimMap, null, 2) + "\n", "utf8");

fs.copyFileSync(
  path.join(ROOT, "assets/docs/learnable-novelty-reproduction-protocol-v0.1.md"),
  path.join(ROOT, "docs/LEARNABLE_NOVELTY_REPRODUCTION_PROTOCOL_v0.1.md")
);
fs.copyFileSync(
  claimMapPath,
  path.join(ROOT, "docs/PUBLIC_CLAIM_EVIDENCE_MAP.json")
);

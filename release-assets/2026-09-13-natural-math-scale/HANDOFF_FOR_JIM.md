# Natural Math — Moving/Carry + Scale Handoff for Jim's ChatGPT

Date: 2026-09-13

## Purpose

This package transfers the newest Natural Math evidence concerning the moving/carry mechanism and its proportional scale behavior.

It is intended for work on the larger Natural Math / AI idea. Treat the included experiment ZIPs as the evidentiary source. This handoff summarizes what was actually demonstrated and what remains unestablished.

## Precedence

Use this evidence order if documents conflict:

1. exact executable / raw run receipt
2. frozen specification and preregistration
3. experiment report
4. this handoff summary
5. conceptual interpretation

Do not repair failed gates after the fact.

---

## 1. Frozen moving/carry mechanism

The current canonical moving-cycle mechanism is the corrected carry version.

The key physical correction was that a mobile dot may carry up to 3 units of ordinary material, exactly one formation's material requirement.

No global planner, map, curiosity bonus, future state, or broadcast information is used.

The unformed dot's local problem is:

- if cargo < 3, locally seek material;
- once cargo == 3, locally seek a matching addressed trace;
- formation still requires addressed trace + material + energy at the same site.

The mechanism remains deterministic and integer/discrete.

### Frozen small-scale result

17x17 world
18 mobile agents
512 ticks
formation lifetime 7

Median carry-cycle outcomes:

- work: 122
- formations: 421
- dissolutions: 420
- dissolution-trace reformations: 381.5
- contributor-independent reformations: 181.5
- transported-substrate reformations: 1
- first-quarter work: 47.5
- final-quarter work: 22.5
- late-work seeds: 64/64
- median distinct positions after tick 64: 60.25

Material conservation, energy conservation, and exact replay passed.

### Original preregistered transported gate

Transported-substrate reformation occurred in 44/64 seeds.

The preregistered gate required at least 48/64.

Therefore that original gate remains formally FAILED.

Do not rewrite it as passed.

---

## 2. Why the earlier moving version failed

Several audits separated implementation artifacts from genuine resource constraints.

### Directional lock

The earlier movement rule omitted the backward neighbor and allowed stay to preserve heading. This created a real movement lock.

Adding the missing backward option reduced that artifact, but did not by itself solve the cycle.

### No-carry problem

The larger physical mismatch was that trace and material could be spatially separated, but a dot could not transport material.

A dot could walk to material, but it had no way to bring that material to the addressed trace.

The bounded cargo correction solved this physical impossibility.

### Tick-order conflict

Maintenance-first:
- preserves sustained cycling;
- weak transport.

Movement-first:
- stronger transport;
- sustained work collapses.

The accepted tick-order audit showed that many locally selected, pre-maintenance-affordable moves were suppressed because maintenance was always charged first.

However simply reversing the order caused the cycle to collapse.

This exposed a genuine local resource-allocation conflict rather than a single hidden movement bug.

### Local arbitration variants

Tested and preserved as failures:

- immediate-energy arbitration
- terminal-life arbitration
- commitment reserve before formation

None simultaneously preserved the strong sustained cycle and forced transported reuse to become universal.

Do not reopen these merely to reach a preferred transport count.

---

## 3. Stability and seed extension

The 44/20 split was rerun deterministically.

For the original 64 seeds:

- transported-reformation counts reproduced exactly;
- event hashes reproduced exactly.

So the split is not run-to-run noise.

The same frozen mechanism was then run on 256 seeds:

- transported-success seeds: 171/256
- success rate: 66.8%
- Wilson 95% interval: approximately 60.8% to 72.3%
- late-work seeds: 256/256
- median total work: 121
- median final-quarter work: 22

64-seed blocks:

- seeds 0-63: 44/64 = 68.8%
- seeds 64-127: 45/64 = 70.3%
- seeds 128-191: 41/64 = 64.1%
- seeds 192-255: 41/64 = 64.1%

Interpretation:

Transported reuse is conditional under the small-scale frozen environment. It is not a rare fixed set of exceptional failures.

The strongest local discriminator was whether a formed structure actually moved before dissolution:

- success group median formed moves: 2
- failure group median formed moves: 0
- success group median transported dissolutions: 2
- failure group median transported dissolutions: 0

But creation of a transported trace is necessary, not always sufficient. Some seeds created one and still failed because addressed information + carried material + enough energy did not coincide for reuse.

---

## 4. Proportional scale test

The mechanism was frozen before scaling.

No local movement score, carry rule, trace rule, formation rule, maintenance priority, dissolution rule, work rule, local cost, relation count, or tie-break was changed.

Scale factors tested:

s = 1, 2, 3

Scaled together:

- world side: 17*s
- agents: 18*s^2
- horizon: 512*s
- formation lifetime: 7*s
- observation windows: proportional to horizon
- material-feed events per tick: s^2
- movement remains one edge/tick, so propagation distance relative to world side is preserved

Local formation cost, movement cost, maintenance cost, work cost, and cargo capacity remained unchanged.

### Scale results

| Scale | Grid | Agents | Ticks | Lifetime | Median work | Re-formations | Independent reuse | Transported reuse | Transport-success seeds |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| x1 | 17x17 | 18 | 512 | 7 | 122 | 381.5 | 181.5 | 1 | 44/64 |
| x2 | 34x34 | 72 | 1024 | 14 | 715.5 | 2341.5 | 996.5 | 6 | 64/64 |
| x3 | 51x51 | 162 | 1536 | 21 | 2157 | 7679 | 2959 | 12 | 64/64 |

All preregistered qualitative scale gates passed at all three sizes.

Conservation, provenance, replay, and nonnegative-state checks passed.

Late work remained 64/64 at every tested scale.

Final-quarter median work:

- x1: 22.5
- x2: 128
- x3: 422.5

Transported-substrate reuse:

- x1: 44/64
- x2: 64/64
- x3: 64/64

### Normalized throughput

Normalized work per agent-tick declined with scale:

- x1: about 0.01324
- x2: about 0.00970
- x3: about 0.00867

So scale did not simply make the system uniformly more efficient.

What changed was reliability and total amount of cycling, not proportional efficiency.

---

## 5. What this adds to Natural Math

The strongest supported addition is:

> A fixed set of local deterministic rules can preserve useful cycling across proportional increases in system size, while some higher-order capabilities become more reliable because larger systems create more opportunities for locally required conditions to coincide.

A more mechanistic statement is:

> Scale changes the space of possible local causal histories even when the local rule does not change.

This matters because the x1 transported shortfall could have been interpreted as a structural inability of the mechanism.

The x2 and x3 results weaken that interpretation:

- same local rules;
- larger proportional world;
- more agents;
- proportionally longer horizon;
- proportionally larger input schedule;
- transported reuse becomes 64/64.

Thus, within this tested range, transported reuse appears opportunity-limited at the smallest scale rather than structurally impossible.

---

## 6. What is NOT established

Do not claim any of the following:

- arbitrary scale will continue to work;
- a universal scaling law has been established;
- normalized efficiency improves with scale;
- complexity must increase with system size;
- biological reproduction has been demonstrated;
- intelligence has been demonstrated;
- life has been demonstrated;
- emergence in the philosophical/general sense has been proved;
- the original 44/64 preregistered failure has been retroactively passed.

The scale result is bounded to this frozen mechanism and tested proportional scaling regime.

---

## 7. Current Natural Math implication for the larger AI idea

This result is relevant to the larger AI direction because it demonstrates a concrete separation among:

- local rule
- resource availability
- retained addressed history
- physical transport
- maintained structure
- global behavior

The system is not given a global objective representation or a final design.

Instead:

1. local state constrains current action;
2. action changes physical/resource state;
3. that state changes which future actions are reachable;
4. addressed traces retain consequences from prior structure;
5. moving material can meet retained history later;
6. repeated local conjunctions produce sustained work;
7. scale changes how often useful conjunctions become reachable without changing the local decision rule.

That is potentially relevant to AI architectures that aim to build capability from bounded local state and causal memory rather than from a globally specified final policy.

This experiment does not establish that such an AI architecture will work. It provides a tested mechanism-level example of the broader principle.

---

## 8. Current stopping point

The moving/carry mechanism is frozen.

Do not tune it toward 100% transported reuse.

The small-scale 44/64 result is preserved as a real boundary.

The scale result is the current extension:

- persistence survives proportional scaling;
- contributor-independent reuse survives;
- transported reuse becomes more reliable;
- normalized throughput decreases moderately.

Further work should be framed as a new question, not as a repair of this completed section.

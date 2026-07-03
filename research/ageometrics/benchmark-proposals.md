# Benchmark Proposals

Every benchmark should declare:

- target
- fuller reference record
- geometric representation
- baseline
- loss or proper score
- temporal information boundary
- train, validation, and test protocol
- same-learner plan
- capacity-matching plan
- model-envelope plan
- tuning and search budget
- uncertainty method
- leakage risks
- out-of-range diagnosis plan

## AI memory

Matched-pair benchmark:

- same or near-same memory geometry
- different provenance, contradiction history, acquisition order, consent history, or continuity lineage

Targets:

- provenance reconstruction
- contradiction recovery
- intervention response
- continuity discrimination

External agent-memory compression benchmark:

- preserve the full interaction trace
- preserve explicit memory read, search, append, rewrite, and consolidation operations
- preserve successive memory-state snapshots
- compare full trace, initial memory, evolved memory, and task-specific summary views
- measure next-action prediction, temporal-order reconstruction, provenance recovery, contradiction recovery, and hazard prediction

Protocol discipline:

- keep a final evaluation set untouched by scaffold or model selection
- declare whether prompts, policies, safety rules, or action vocabularies changed alongside memory structure
- treat policy additions and blockers as possible intervention confounds rather than automatic memory gains
- preserve complete traces so restoration tests can be run after the primary experiment

## Finance

Matched-window benchmark:

- similar visible price geometry
- materially different order-flow imbalance, cancellation rate, depth, leverage, participant concentration, or later cascade behavior

Targets:

- future volatility
- liquidity failure
- drawdown continuation
- recovery time
- regime transition

Constraint:

- this is a representation-sufficiency benchmark, not a trading claim

## Materials

Matched morphology benchmark:

- same visible morphology
- different loading history, residual stress, or stored energy

Targets:

- fracture response
- fatigue vulnerability
- post-load recovery

## Visual communication

Matched-object benchmark:

- same depicted object
- different communicative goal, causal explanation burden, or stroke budget

Targets:

- identification
- causal explanation
- sparse reconstruction

# Tools and CI

1 changes proposed, 6 groups to keep as they are.

Two read-only tools reviews integrated:226 original tests plus77 additional tests (reports6565979619/6565996723/6566258844), plus six added synthetic inventory checks and eleven house-measurement tests reviewed separately. Standalone/plugin execution scope is labeled separately; no test run supplied semantic evidence.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- CI cannot turn missing history, a failed prerequisite or stale proof into a pass.
- Preview publishing preserves the live site and other builders’ files.
- Measurements compare equivalent inputs and distinguish missing telemetry from zero.
- Interleaved worlds and settings preserve deterministic state and tuning fingerprints.
- Research seeds, source identities and report denominators remain auditable.

## Proposed changes

### T6. One mixed replay and fixture-sanity case

**1 tests · hard limits · historical time unknown.**

Examples: [Interleaved bots and bags replay deterministically.](../../tools/balance/report.test.mjs#L36).

**Yes/no: Ask the report/combat owner to separate fixture-sanity predicates from this replay test? Yes opens a targeted follow-up review; deterministic replay and accounting stay blocking. It does not move or delete the case.** [Assertions, rationale and exact membership](semantic-groups.md#t6).


## Keep as they are

- [T1: CI coverage, publication and proof guards](semantic-groups.md#t1): 71 tests; known files: <1 s of CI; 3 files have unknown timing.
- [T2: Measurement and diagnostic contracts](semantic-groups.md#t2): 80 tests; ~3 s of CI.
- [T3: Generated-world fingerprints and repeat-night isolation](semantic-groups.md#t3): 4 tests; ~16 s of CI.
- [T4: Research, architecture and generated data](semantic-groups.md#t4): 93 tests; known files: ~4 s of CI; 12 files have unknown timing.
- [T5: Preview and visual-review tool integrity](semantic-groups.md#t5): 57 tests; known files: ~122 s of CI; 6 files have unknown timing.
- [T7: Separate coordination-plugin contracts](semantic-groups.md#t7): 14 tests; historical time unknown.

<details>
<summary>Examples and evidence for the kept groups</summary>

### T1. CI coverage, publication and proof guards

**71 tests · current rules · known files: <1 s of CI; 3 files have unknown timing.**

Examples: [Missing history cannot produce a related-test pass.](../../tools/ci/test-scope.test.ts#L19); [A failed selected test stays failed.](../../tools/ci/run-unit.test.ts#L23); [Proof serving rejects encoded path traversal.](../../tools/ci/proofs.test.cjs#L37).

[Assertions, rationale and exact membership](semantic-groups.md#t1).

### T2. Measurement and diagnostic contracts

**80 tests · hard limits · ~3 s of CI.**

Examples: [An unmeasured trip is not recorded as zero cost.](../../tools/bench/travel-budget.test.ts#L12); [Instrumentation preserves worker message behavior.](../../tools/bench/travel-probe.test.ts#L5); [Transport backlog does not inflate stage time.](../../tools/bench/worker-checkpoint.test.ts#L31).

[Assertions, rationale and exact membership](semantic-groups.md#t2).

### T3. Generated-world fingerprints and repeat-night isolation

**4 tests · hard limits · ~16 s of CI.**

Examples: [Notes and unused knobs do not change the game fingerprint.](../../tools/bench/fingerprint.test.ts#L18); [The second night equals a fresh matching night.](../../tools/bench/twoNights.test.ts#L28); [A new game resets previous fight settings.](../../tools/bench/twoNights.test.ts#L38).

[Assertions, rationale and exact membership](semantic-groups.md#t3).

### T4. Research, architecture and generated data

**93 tests · current rules · known files: ~4 s of CI; 12 files have unknown timing.**

Examples: [Held-out and reserved seeds cannot leak into training rows.](../../tools/balance/expert-contract.test.mjs#L61); [Survey merges reject duplicate or missing work.](../../tools/balance/survey.test.mjs#L69); [Generated types retain optional and nullable fields.](../../tools/config/typegen.test.ts#L11).

[Assertions, rationale and exact membership](semantic-groups.md#t4).

### T5. Preview and visual-review tool integrity

**57 tests · current rules · known files: ~122 s of CI; 6 files have unknown timing.**

Examples: [Preview publishing adds only the named files.](../../tools/shots/push.test.ts#L30); [Depth readback preserves distinct neighboring values.](../../tools/refraction/depth-readback.test.cjs#L3); [An unused preview switch preserves production data.](../../tools/roster/presets.test.mjs#L6).

[Assertions, rationale and exact membership](semantic-groups.md#t5).

### T7. Separate coordination-plugin contracts

**14 tests · current rules · historical time unknown.**

Examples: [A page item requires a status.](../../.claude/skills/page-contract/tests/contract.test.ts#L25); [A malformed batch cannot partly apply.](../../.claude/skills/page-contract/tests/contract.test.ts#L69); [Wake requests retain the intended coordinator identity.](../../.claude/skills/page-contract/tests/contract.test.ts#L164).

[Assertions, rationale and exact membership](semantic-groups.md#t7).

</details>

**Yes/no: Keep T1, T2, T3, T4, T5, T7 as they are?** They protect honest CI coverage and publication, trustworthy measurements, deterministic isolation, research provenance and safe preview tooling.

[Old/current ruling comparisons](semantic-groups.md#tools-ci-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

0 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

# Creatures and movement

1 change proposed, 3 groups to keep.

## What these protect

- Nights preserve creature identities and counts; runaways sleep safely and return after loss.
- Babies follow/scatter without drowning or unintended load, and feed only from a placed rune.
- Grounding preserves takeoff cooldown/input semantics and cannot pull down an already-flying witch.
- Full/coarse/frozen simulation follows scheduling and hysteresis without changing the specified pace.
- Travel preserves posse membership, routing updates and berry eligibility.
- Bot observations and trace data stay detached, with human reaction/input limits and non-renewing danger-aware jobs.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="c1"></a>

### C1. Emergent travel, sleep, scenery and convergence thresholds

**15 tests · outcome stats · files take ~260 s.**

Examples: [Squirrels complete a sampled number of glides and landings.](../../src/rules/glide.test.ts#L12); [Idlers show sampled nap and wake occurrences.](../../src/rules/naps.test.ts#L35); [A following party reaches a minimum sampled spacing.](../../src/rules/spacing.test.ts#L40).

**Yes/no: Split these mixed tests so sampled movement, sleep, spacing, distribution and convergence thresholds become nonblocking reports? Yes keeps conservation, valid positions, exact input/seed behavior, configured speeds, LOD transitions and victory state gates blocking.** [Assertions, rationale and exact membership](semantic-groups.md#c1).


## Keep as they are

- [C2: Explicit growth comparison helpers](semantic-groups.md#c2): 2 tests; files take ~3 s.
- [C3: Direct movement and creature integrity](semantic-groups.md#c3): 90 tests; files take ~301 s.
- [C4: Human-limited bot observations and decisions](semantic-groups.md#c4): 39 tests; files take ~4 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="c2"></a>

### C2. Explicit growth comparison helpers

**2 tests · current rules · files take ~3 s.**

Examples: [Pending creatures accumulate only under the allowed conditions.](../../src/rules/growth.test.ts#L34); [Awakening consumes the pending count consistently.](../../src/rules/growth.test.ts#L47).

[Assertions, rationale and exact membership](semantic-groups.md#c2).

<a id="c3"></a>

### C3. Direct movement and creature integrity

**90 tests · current rules · files take ~301 s.**

Examples: [Parked animals do not ground the witch.](../../src/rules/grounded.test.ts#L73); [A blocked takeoff does not spend its cooldown.](../../src/rules/grounded.test.ts#L59); [A runaway sleeps safely outside the sea.](../../src/rules/runaway.test.ts#L37).

[Assertions, rationale and exact membership](semantic-groups.md#c3).

<a id="c4"></a>

### C4. Human-limited bot observations and decisions

**39 tests · current rules · files take ~4 s.**

Examples: [An invisible creature cannot alter observations.](../../src/bots/expert.test.ts#L41); [Changing a trace copy cannot change controls.](../../src/bots/expert-trace.test.ts#L277); [Mode toggles wait for their acknowledgement.](../../src/bots/expert.test.ts#L91).

[Assertions, rationale and exact membership](semantic-groups.md#c4).

</details>

**C-KEEP — Yes/no: Keep C2, C3, C4 as they are?** They protect creature conservation, exact input/seed continuation, movement/LOD and berry/bag rules, travel/victory ownership and human-limited bot decisions.

[Review scope and provenance](semantic-groups.md#creatures-movement-review-provenance). [Old/current rulings](semantic-groups.md#creatures-movement-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

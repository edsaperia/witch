# World, islands and lakes

1 changes proposed, 5 groups to keep as they are.

Read-only semantic review of the 97 originally assigned tests at 7ca190821 (comments6566078651 and6566081354). Snapshot size is kept on the saves page; two bot outcomes stay with #1622. Additional neighboring tests outside that original partition still need coverage reconciliation.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- A campaign retains island shapes across nights while permitted creature/type deals change.
- Walkers, landing and world objects respect water, coast and zoo-fence boundaries.
- Rosters, biome blends, lake appearances and beach interactions follow authored rules.
- Prepared and directly generated maps agree; snapshot size and hydration speed have separate budgets.
- Some mixed tests also pin aesthetic densities or event frequencies rather than direct rules.

## Proposed changes

### W4. Scenery distributions and sea-life frequencies

**7 tests · outcome stats · ~200 s of CI.**

Examples: [Dolphin appearances meet a sampled frequency band.](../../src/rules/seaLife.test.ts#L15); [Low ground contains more trees by a sampled ratio.](../../src/rules/terrain.test.ts#L31); [Featured scenery appears on most sampled islands.](../../src/rules/rules.test.ts#L1851).

**Yes/no: Split these seven mixed tests so scenery-density and event-frequency targets become nightly reports? Yes keeps placement, no-set-piece, deterministic equality and shape-parameter checks blocking; only statistical components become informational.** [Assertions, rationale and exact membership](semantic-groups.md#w4).


## Keep as they are

### W1. Campaign identity and map equivalence

**21 tests · hard limits · ~313 s of CI.**

Examples: [An island keeps its coast between nights.](../../src/rules/worldSeed.test.ts#L28); [The same shapes can receive a different type deal.](../../src/rules/deal.test.ts#L54); [Prepared maps equal directly generated maps.](../../src/rules/mapPrep.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#w1).

### W2. Coast, lake and zoo boundaries

**25 tests · hard limits · ~88 s of CI.**

Examples: [Trying to land over water keeps her flying.](../../src/rules/lakeHold.test.ts#L41); [Travelling animals route around lakes.](../../src/rules/lakes.test.ts#L119); [A zoo knockout returns her outside the fences.](../../src/rules/zooFence.test.ts#L74).

[Assertions, rationale and exact membership](semantic-groups.md#w2).

### W3. Authored rosters, biomes and lake looks

**27 tests · current rules · ~118 s of CI.**

Examples: [An island receives its allowed phase roster.](../../src/rules/rosters.test.ts#L28); [Biome appearance strengthens farther from home.](../../src/biomeForests.test.ts#L48); [Lake appearance is seeded from its island’s two looks.](../../src/rules/lakeLooks.test.ts#L35).

[Assertions, rationale and exact membership](semantic-groups.md#w3).

### W5. Map resource and test-helper budgets

**4 tests · hard limits · ~77 s of CI.**

Examples: [Hydrating a prepared map stays cheaper than generating it.](../../src/rules/mapPrep.test.ts#L65); [A smaller test world does not mutate shared tuning.](../../src/test/worlds.test.ts#L7); [Largest-world diversity coverage remains separate.](../../src/test/worlds.test.ts#L18).

[Assertions, rationale and exact membership](semantic-groups.md#w5).

### W6. Links, travel and explicit transition rules

**13 tests · current rules · ~91 s of CI.**

Examples: [An obsolete wave-pace link key is ignored.](../../src/app/linkParams.test.ts#L66); [A new island’s explicit link overrides carried settings.](../../src/app/sail.test.ts#L87); [The door can open while island preparation continues.](../../src/rules/wakeUp.test.ts#L148).

[Assertions, rationale and exact membership](semantic-groups.md#w6).


**Yes/no: Keep W1, W2, W3, W5, W6 as they are?** They protect campaign identity and map equivalence, spatial boundaries, authored world content, resource budgets and explicit link/transition rules.

[Old/current ruling comparisons](semantic-groups.md#world-islands-lakes-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

125 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

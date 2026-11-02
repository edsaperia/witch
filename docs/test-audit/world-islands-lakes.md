# World, islands and lakes

3 changes proposed, 6 groups to keep as they are.

Two bounded source reviews are integrated: original97-case partition plus122 additional IDs (reports6566078651/6566081354 and6566275689/6566277162). Shared save/creature cases and owner-only listings are counted elsewhere once. No world runtime was executed.

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

### W7. Procedural field and scenery quality

**7 tests · outcome stats · ~131 s of CI.**

Examples: [Area variance produces a minimum sampled size spread.](../../src/rules/rules.test.ts#L183); [A forest meets sampled dense and open shares.](../../src/rules/rules.test.ts#L200); [Generated patterns meet sampled glade and hedge shares.](../../src/rules/layoutPatterns.test.ts#L27).

**Yes/no: Move these seven procedural-quality measurements to nightly/manual reports? Yes retains their measurements and design context, while those sampled appearance/distribution scores stop blocking releases.** [Assertions, rationale and exact membership](semantic-groups.md#w7).

### W8. Mixed procedural quality and world integrity

**29 tests · outcome stats · ~182 s of CI.**

Examples: [Nearby islands retain a strait but also favor a closeness target.](../../src/rules/archipelago.test.ts#L22); [A shore sample meets a minimum reed count.](../../src/rules/groundcover.test.ts#L19); [Zoo streets meet a sampled median-distance target.](../../src/rules/zooMap.test.ts#L20).

**Yes/no: Split these twenty-nine tests so only procedural density/variety/shape targets become reports? Yes keeps separation, valid content, numerical geometry correctness, equality, configured limits and meaningful nonempty coverage blocking. Whole mixed tests are not moved.** [Assertions, rationale and exact membership](semantic-groups.md#w8).


## Keep as they are

- [W1: Campaign identity and map equivalence](semantic-groups.md#w1): 21 tests; ~313 s of CI.
- [W2: Coast, lake and zoo boundaries](semantic-groups.md#w2): 25 tests; ~88 s of CI.
- [W3: Authored rosters, biomes and lake looks](semantic-groups.md#w3): 27 tests; ~118 s of CI.
- [W5: Map resource and test-helper budgets](semantic-groups.md#w5): 4 tests; ~77 s of CI.
- [W6: Links, travel and explicit transition rules](semantic-groups.md#w6): 13 tests; ~91 s of CI.
- [W9: World continuation, placement and explicit modes](semantic-groups.md#w9): 79 tests; ~603 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

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

### W9. World continuation, placement and explicit modes

**79 tests · current rules · ~603 s of CI.**

Examples: [Prepared and direct maps continue to the same state.](../../src/rules/mapPrep.test.ts#L59); [A travelling follower remains ashore around a lake.](../../src/rules/lakes.test.ts#L128); [Runestone grounds exclude special scenery.](../../src/rules/stoneKeepClear.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#w9).

</details>

**Yes/no: Keep W1, W2, W3, W5, W6, W9 as they are?** They protect campaign identity and map equivalence, spatial boundaries, authored world content, resource budgets and explicit link/transition rules.

[Old/current ruling comparisons](semantic-groups.md#world-islands-lakes-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

0 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

# World, islands and lakes

4 changes proposed, 7 groups to keep.

## What these protect

- A campaign retains island shapes across nights while permitted creature/type deals change.
- Walkers, landing and world objects respect water, coast and zoo-fence boundaries.
- Rosters, biome blends, lake appearances and beach interactions follow authored rules.
- Prepared and directly generated maps agree; snapshot size and hydration speed have separate budgets.
- Some mixed tests also pin aesthetic densities or event frequencies rather than direct rules.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="w4"></a>

### W4. Scenery distributions and sea-life frequencies

**7 tests · outcome stats · files take ~200 s.**

Examples: [Dolphin appearances meet a sampled frequency band.](../../src/rules/seaLife.test.ts#L15); [Low ground contains more trees by a sampled ratio.](../../src/rules/terrain.test.ts#L31); [Featured scenery appears on most sampled islands.](../../src/rules/rules.test.ts#L1851).

**Yes/no: Split these seven mixed tests so scenery-density and event-frequency targets become nightly reports? Yes keeps placement, no-set-piece, deterministic equality and shape-parameter checks blocking; only statistical components become informational.** [Assertions, rationale and exact membership](semantic-groups.md#w4).

<a id="w7"></a>

### W7. Procedural field and scenery quality

**7 tests · outcome stats · files take ~131 s.**

Examples: [Area variance produces a minimum sampled size spread.](../../src/rules/rules.test.ts#L183); [A forest meets sampled dense and open shares.](../../src/rules/rules.test.ts#L200); [Generated patterns meet sampled glade and hedge shares.](../../src/rules/layoutPatterns.test.ts#L27).

**Yes/no: Move these seven procedural-quality measurements to nightly/manual reports? Yes retains their measurements and design context, while those sampled appearance/distribution scores stop blocking releases.** [Assertions, rationale and exact membership](semantic-groups.md#w7).

<a id="w8"></a>

### W8. Mixed procedural quality and world integrity

**29 tests · outcome stats · files take ~182 s.**

Examples: [Nearby islands retain a strait but also favor a closeness target.](../../src/rules/archipelago.test.ts#L22); [A shore sample meets a minimum reed count.](../../src/rules/groundcover.test.ts#L19); [Zoo streets meet a sampled median-distance target.](../../src/rules/zooMap.test.ts#L20).

**Yes/no: Split these twenty-nine tests so only procedural density/variety/shape targets become reports? Yes keeps separation, valid content, numerical geometry correctness, equality, configured limits and meaningful nonempty coverage blocking. Whole mixed tests are not moved.** [Assertions, rationale and exact membership](semantic-groups.md#w8).

<a id="w-r2-1"></a>

### W-R2-1. Scenery abundance observations

**3 tests · outcome stats · files take ~131 s.**

Examples: [no ruin, freak tree, relic, set piece or grounds arrangement appears twice, over 5 seeds](../../src/rules/rules.test.ts#L1257); [places scenes, each at most once, in areas they suit, off the paths and clear of the gameplay (Ed, 2026-10-04)](../../src/rules/rules.test.ts#L1270); [give each set piece to one area only, which has room for it](../../src/rules/rules.test.ts#L1294).

**Yes/no: Report sampled scenery abundance while retaining uniqueness, suitability, clearance and valid placement checks?** [Assertions, rationale and exact membership](semantic-groups.md#w-r2-1).


## Keep as they are

- [W1: Campaign identity and map equivalence](semantic-groups.md#w1): 21 tests; files take ~313 s.
- [W2: Coast, lake and zoo boundaries](semantic-groups.md#w2): 25 tests; files take ~88 s.
- [W3: Authored rosters, biomes and lake looks](semantic-groups.md#w3): 27 tests; files take ~118 s.
- [W5: Map resource and test-helper budgets](semantic-groups.md#w5): 4 tests; files take ~77 s.
- [W6: Links, travel and explicit transition rules](semantic-groups.md#w6): 13 tests; files take ~91 s.
- [W9: World continuation, placement and explicit modes](semantic-groups.md#w9): 79 tests; files take ~603 s.
- [W-R2-K1: Scenery footprint, stairs and paths](semantic-groups.md#w-r2-k1): 3 tests; files take ~131 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="w1"></a>

### W1. Campaign identity and map equivalence

**21 tests · hard limits · files take ~313 s.**

Examples: [An island keeps its coast between nights.](../../src/rules/worldSeed.test.ts#L28); [The same shapes can receive a different type deal.](../../src/rules/deal.test.ts#L54); [Prepared maps equal directly generated maps.](../../src/rules/mapPrep.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#w1).

<a id="w2"></a>

### W2. Coast, lake and zoo boundaries

**25 tests · hard limits · files take ~88 s.**

Examples: [Trying to land over water keeps her flying.](../../src/rules/lakeHold.test.ts#L41); [Travelling animals route around lakes.](../../src/rules/lakes.test.ts#L119); [A zoo knockout returns her outside the fences.](../../src/rules/zooFence.test.ts#L74).

[Assertions, rationale and exact membership](semantic-groups.md#w2).

<a id="w3"></a>

### W3. Authored rosters, biomes and lake looks

**27 tests · current rules · files take ~118 s.**

Examples: [An island receives its allowed phase roster.](../../src/rules/rosters.test.ts#L28); [Biome appearance strengthens farther from home.](../../src/biomeForests.test.ts#L48); [Lake appearance is seeded from its island’s two looks.](../../src/rules/lakeLooks.test.ts#L35).

[Assertions, rationale and exact membership](semantic-groups.md#w3).

<a id="w5"></a>

### W5. Map resource and test-helper budgets

**4 tests · hard limits · files take ~77 s.**

Examples: [Hydrating a prepared map stays cheaper than generating it.](../../src/rules/mapPrep.test.ts#L65); [A smaller test world does not mutate shared tuning.](../../src/test/worlds.test.ts#L7); [Largest-world diversity coverage remains separate.](../../src/test/worlds.test.ts#L18).

[Assertions, rationale and exact membership](semantic-groups.md#w5).

<a id="w6"></a>

### W6. Links, travel and explicit transition rules

**13 tests · current rules · files take ~91 s.**

Examples: [An obsolete wave-pace link key is ignored.](../../src/app/linkParams.test.ts#L66); [A new island’s explicit link overrides carried settings.](../../src/app/sail.test.ts#L87); [The door can open while island preparation continues.](../../src/rules/wakeUp.test.ts#L148).

[Assertions, rationale and exact membership](semantic-groups.md#w6).

<a id="w9"></a>

### W9. World continuation, placement and explicit modes

**79 tests · current rules · files take ~603 s.**

Examples: [Prepared and direct maps continue to the same state.](../../src/rules/mapPrep.test.ts#L59); [A travelling follower remains ashore around a lake.](../../src/rules/lakes.test.ts#L128); [Runestone grounds exclude special scenery.](../../src/rules/stoneKeepClear.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#w9).

<a id="w-r2-k1"></a>

### W-R2-K1. Scenery footprint, stairs and paths

**3 tests · current rules · files take ~131 s.**

Examples: [gives each scene a footprint at least the art's own](../../src/rules/rules.test.ts#L1286); [stairs stand only by ravines, rocky slopes, cave mouths and stone shrines](../../src/rules/rules.test.ts#L1290); [keep soundsystems and set pieces off the paths, so paths run on unbroken](../../src/rules/rules.test.ts#L1306).

[Assertions, rationale and exact membership](semantic-groups.md#w-r2-k1).

</details>

**W-KEEP — Yes/no: Keep W1, W2, W3, W5, W6, W9, W-R2-K1 as they are?** They protect campaign identity and map equivalence, spatial boundaries, authored world content, resource budgets and explicit link/transition rules.

[Review scope and provenance](semantic-groups.md#world-islands-lakes-review-provenance). [Old/current rulings](semantic-groups.md#world-islands-lakes-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

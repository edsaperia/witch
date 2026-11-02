# House and treehouse

2 changes proposed, 3 groups to keep as they are.

Read-only review at9f045ebca, report6566215080. Original178 tests are reconciled into reviewed house groups and explicit tools/UI/save/MP/combat handoffs. Extra rebucketed neighbors remain separately listed until reviewed.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- Floors, walls and corridors keep stations reachable and landings safe.
- Hats retain ownership and occupied points through drops, overflow, reload and return.
- Bed, landing, collection and ingredient-credit events occur once.
- Editor data round-trips and validates camera-facing conversion without changing archived layout evidence.
- Classic-layout and older camera options remain explicit supported comparisons.

## Proposed changes

### H1. Simulated house travel observations

**3 tests · outcome stats · ~62 s of CI.**

Examples: [The bed-to-Terrace journey meets a time target.](../../src/rules/houseRooms.test.ts#L66); [Followers reach their house spots within a sampled window.](../../src/rules/houseGuard.test.ts#L39); [Followers regroup after leaving within a sampled window.](../../src/rules/houseGuard.test.ts#L57).

**Yes/no: Split these three travel tests so their time/proximity observations become nonblocking reports? Yes retains floor, reachability, transition, identity and eligibility checks as blocking tests.** [Assertions, rationale and exact membership](semantic-groups.md#h1).

### H2. Historical route and layout descriptions

**3 tests · leftovers · ~11 s of CI.**

Examples: [The route name should match its current99m assertion.](../../src/rules/houseConfig.test.ts#L27); [Placement tests compare explicit classic and Ed modes.](../../src/rules/housePlacement.test.ts#L11); [Restored spell slots belong to explicit classic mode.](../../src/rules/housePlacement.runtime.test.ts#L75).

**Yes/no: Update these three historical descriptions while keeping every assertion? Yes changes names/comments only; route values, classic compatibility and occupant-conservation checks remain unchanged.** [Assertions, rationale and exact membership](semantic-groups.md#h2).


## Keep as they are

- [HK1: Movement, interactions and camera contracts](semantic-groups.md#hk1): 77 tests; ~88 s of CI.
- [HK2: Layouts, editor and hat conservation](semantic-groups.md#hk2): 32 tests; ~17 s of CI.
- [HK3: Equipment and kitchen contracts](semantic-groups.md#hk3): 28 tests; ~89 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

### HK1. Movement, interactions and camera contracts

**77 tests · current rules · ~88 s of CI.**

Examples: [House edges keep her on the safe floor.](../../src/rules/houseRooms.test.ts#L126); [Only one dressing station opens at a time.](../../src/rules/stations.test.ts#L68); [Holding the bed interaction sleeps once.](../../src/rules/houseRooms.test.ts#L210).

[Assertions, rationale and exact membership](semantic-groups.md#hk1).

### HK2. Layouts, editor and hat conservation

**32 tests · current rules · ~17 s of CI.**

Examples: [A second knockout does not duplicate a dropped hat.](../../src/rules/hat.test.ts#L88); [Editor layout data survives its supported round trip.](../../src/editor/houseLayout.test.ts#L16); [Placement uses explicit facing and station anchors.](../../src/rules/housePlacement.test.ts#L24).

[Assertions, rationale and exact membership](semantic-groups.md#hk2).

### HK3. Equipment and kitchen contracts

**28 tests · current rules · ~89 s of CI.**

Examples: [Fitted broom parts add their stated effects.](../../src/rules/broomParts.test.ts#L42); [A broom cannot complete two spell sets at once.](../../src/rules/broomParts.test.ts#L70); [Three reserved ingredients cannot be spent twice.](../../src/rules/mushrooms.test.ts#L59).

[Assertions, rationale and exact membership](semantic-groups.md#hk3).

</details>

**Yes/no: Keep HK1, HK2, HK3 as they are?** They protect safe floors and interactions, exactly-once events, layout/editor identity, hat conservation and direct equipment/kitchen rules.

[Old/current ruling comparisons](semantic-groups.md#house-treehouse-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

164 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

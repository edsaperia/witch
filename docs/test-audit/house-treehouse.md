# House and treehouse

4 changes proposed, 6 groups to keep.

## What these protect

- Floors, walls and corridors keep stations reachable and landings safe.
- Hats retain ownership and occupied points through drops, overflow, reload and return.
- Bed, landing, collection and ingredient-credit events occur once.
- Editor data round-trips and validates camera-facing conversion without changing archived layout evidence.
- Classic-layout and older camera options remain explicit supported comparisons.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="h1"></a>

### H1. Simulated house travel observations

**3 tests · outcome stats · files take ~62 s.**

Examples: [The bed-to-Terrace journey meets a time target.](../../src/rules/houseRooms.test.ts#L66); [Followers reach their house spots within a sampled window.](../../src/rules/houseGuard.test.ts#L39); [Followers regroup after leaving within a sampled window.](../../src/rules/houseGuard.test.ts#L57).

**Yes/no: Split these three travel tests so their time/proximity observations become nonblocking reports? Yes retains floor, reachability, transition, identity and eligibility checks as blocking tests.** [Assertions, rationale and exact membership](semantic-groups.md#h1).

<a id="h2"></a>

### H2. Historical route and layout descriptions

**3 tests · leftovers · files take ~11 s.**

Examples: [The route name should match its current 99 m assertion.](../../src/rules/houseConfig.test.ts#L27); [Placement tests compare explicit classic and Ed modes.](../../src/rules/housePlacement.test.ts#L11); [Restored spell slots belong to explicit classic mode.](../../src/rules/housePlacement.runtime.test.ts#L75).

**Yes/no: Update these three historical descriptions while keeping every assertion? Yes changes names/comments only; route values, classic compatibility and occupant-conservation checks remain unchanged.** [Assertions, rationale and exact membership](semantic-groups.md#h2).

<a id="h-r2-1"></a>

### H-R2-1. Canopy density and find diversity observations

**8 tests · outcome stats · files take ~77 s.**

Examples: [has 300 to 500 lobes, thick and thin](../../src/rules/crown.test.ts#L19); [keeps open ground it's given (the dancefloor) open to the sky as the Terrace: no lobe over it or on a line of sight to it](../../src/rules/crown.test.ts#L56); [strings its lights: every bulb on a string, in order along it, the Terrace ringed](../../src/rules/crown.test.ts#L81); [hangs each string its own way (Ed, 2026-10-27: "String lights on the treehouse seem to all have the same shape")](../../src/rules/crown.test.ts#L101); [has leaves over the Terrace and along its notch, where the gap had none](../../src/rules/crown.test.ts#L127).

**Yes/no: Split sampled canopy density and find diversity into nonblocking reports while preserving the blocking protections?** [Assertions, rationale and exact membership](semantic-groups.md#h-r2-1).

<a id="h-r2-2"></a>

### H-R2-2. Obsolete Workshop descriptions

**3 tests · leftovers · files take ~65 s.**

Examples: [E at it while the party's on: the part is hers at once (a found event of its kind), not fitted: it waits at the Workshop's bay](../../src/rules/finds.test.ts#L150); [a part found leaves her broom as it was: her fitted part stays, her set and spell too](../../src/rules/finds.test.ts#L159); [the broom stand is gone (the Workshop's bay, lathe and pegboard in its place), and no station offers a broom's power or shape](../../src/rules/wardrobeShelves.test.ts#L90).

**Yes/no: Correct three obsolete Workshop descriptions while preserving every assertion?** [Assertions, rationale and exact membership](semantic-groups.md#h-r2-2).


## Keep as they are

- [HK1: Movement, interactions and camera contracts](semantic-groups.md#hk1): 77 tests; files take ~88 s.
- [HK2: Layouts, editor and hat conservation](semantic-groups.md#hk2): 32 tests; files take ~17 s.
- [HK3: Equipment and kitchen contracts](semantic-groups.md#hk3): 28 tests; files take ~89 s.
- [H-R2-K1: Layout, wake-up and opening contracts](semantic-groups.md#h-r2-k1): 54 tests; files take ~163 s.
- [H-R2-K2: Current kitchen and explicit legacy preview contracts](semantic-groups.md#h-r2-k2): 27 tests; files take ~7 s.
- [H-R2-K3: Equipment, finds, canopy, telescope and Studio contracts](semantic-groups.md#h-r2-k3): 65 tests; files take ~91 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="hk1"></a>

### HK1. Movement, interactions and camera contracts

**77 tests · current rules · files take ~88 s.**

Examples: [House edges keep her on the safe floor.](../../src/rules/houseRooms.test.ts#L126); [Only one dressing station opens at a time.](../../src/rules/stations.test.ts#L68); [Holding the bed interaction sleeps once.](../../src/rules/houseRooms.test.ts#L210).

[Assertions, rationale and exact membership](semantic-groups.md#hk1).

<a id="hk2"></a>

### HK2. Layouts, editor and hat conservation

**32 tests · current rules · files take ~17 s.**

Examples: [A second knockout does not duplicate a dropped hat.](../../src/rules/hat.test.ts#L88); [Editor layout data survives its supported round trip.](../../src/editor/houseLayout.test.ts#L16); [Placement uses explicit facing and station anchors.](../../src/rules/housePlacement.test.ts#L24).

[Assertions, rationale and exact membership](semantic-groups.md#hk2).

<a id="hk3"></a>

### HK3. Equipment and kitchen contracts

**28 tests · current rules · files take ~89 s.**

Examples: [Fitted broom parts add their stated effects.](../../src/rules/broomParts.test.ts#L42); [A broom cannot complete two spell sets at once.](../../src/rules/broomParts.test.ts#L70); [Three reserved ingredients cannot be spent twice.](../../src/rules/mushrooms.test.ts#L59).

[Assertions, rationale and exact membership](semantic-groups.md#hk3).

<a id="h-r2-k1"></a>

### H-R2-K1. Layout, wake-up and opening contracts

**54 tests · current rules · files take ~163 s.**

Examples: [preserves the complete export and all 110 kept poses/anchors; removes strictly west of -100](../../src/editor/currentEdLayout.test.ts#L11); [requires explicit valid clutter removal rather than accepting missing furniture or overlaps](../../src/editor/currentEdLayout.test.ts#L28); [starts with every authored pose under either one-ulp sine result, with the same source identity](../../src/editor/editorStartupIdentity.test.ts#L27); [keeps source changes and unknown legacy IDs incompatible, rather than bypassing validation](../../src/editor/editorStartupIdentity.test.ts#L39); [keeps the original v1 bytes and its camera-preserving import under both math variants](../../src/editor/editorStartupIdentity.test.ts#L49).

[Assertions, rationale and exact membership](semantic-groups.md#h-r2-k1).

<a id="h-r2-k2"></a>

### H-R2-K2. Current kitchen and explicit legacy preview contracts

**27 tests · current rules · files take ~7 s.**

Examples: [has exactly 56 unordered three-mushroom recipes, including repeats](../../src/rules/cauldron.test.ts#L5); [retains Ed's tutorial mapping for %j](../../src/rules/cauldron.test.ts#L17); [does not invent assignments for biome recipes](../../src/rules/cauldron.test.ts#L24); [collects without a capacity limit and transfers each kind without loss](../../src/rules/cauldron.test.ts#L30); [uses one per press and brews on exactly the third, then starts a fresh brew](../../src/rules/cauldron.test.ts#L46).

[Assertions, rationale and exact membership](semantic-groups.md#h-r2-k2).

<a id="h-r2-k3"></a>

### H-R2-K3. Equipment, finds, canopy, telescope and Studio contracts

**65 tests · current rules · files take ~91 s.**

Examples: [give every item in the finds pool (the wearables and the 9 broom parts) an outline of 7 to 10 stars, within the sky's limits (render/sky.ts: 12 stars, 16 lines)](../../src/rules/constellations.test.ts#L6); [stand at the trunk's bearing from the treehouse, about 35° up, and go once it's found](../../src/rules/constellations.test.ts#L20); [take the night's one find from one source, any kind, an outline by its item id (Ed, 2026-10-22: one permanent upgrade a night)](../../src/rules/constellations.test.ts#L31); [wrap round north](../../src/rules/constellations.test.ts#L39); [is the same crown for the same house and seed, another for another seed](../../src/rules/crown.test.ts#L14).

[Assertions, rationale and exact membership](semantic-groups.md#h-r2-k3).

</details>

**H-KEEP — Yes/no: Keep HK1, HK2, HK3, H-R2-K1, H-R2-K2, H-R2-K3 as they are?** They protect safe floors and interactions, exactly-once events, layout/editor identity, hat conservation and direct equipment/kitchen rules.

[Review scope and provenance](semantic-groups.md#house-treehouse-review-provenance). [Old/current rulings](semantic-groups.md#house-treehouse-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

# Legends

2 changes proposed, 4 groups to keep.

## What these protect

- A legend area and its paired creature area share ownership, rage accounting and party borders.
- Circle lookup agrees with the complete search, and circle explanations follow the legend's state.
- Legend footprint data controls circle size and margins; raw physical cells need not equal ownership cells.
- Long fixtures also pin baby travel times, grove averages, rim coverage and runestone-gap failure rates.
- Relic glints remain visible on the ground and show through canopy gaps only from above.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="l3"></a>

### L3. Timed scenarios and generated scenery/quest statistics

**8 tests · outcome stats · files take ~87 s.**

Examples: [Babies return to their circle within 20 seconds.](../../src/rules/legendClearing.test.ts#L50); [Generated groves meet average-strength targets.](../../src/rules/legendClearing.test.ts#L158); [Almost all circles meet the runestone gap.](../../src/rules/legendClearing.test.ts#L206).

**Yes/no: Move these eight scenery, travel and quest-distribution tests out of release gates? Yes makes their sampled times, averages and coverage a nightly report. Small boundary, ownership and current quest-cap checks stay blocking.** [Assertions, rationale and exact membership](semantic-groups.md#l3).

<a id="l5"></a>

### L5. Pinned list of giants exceeding the old circle cap

**1 test · leftovers · files take ~4 s.**

Examples: [The oversized-legend list stays exactly eleven species.](../../src/rules/legendFit.test.ts#L34).

**Yes/no: Replace the exact list of eleven giant species with a report of which legends currently overflow? Yes keeps the circle cap and margin checks blocking, while the species list becomes informational.** [Assertions, rationale and exact membership](semantic-groups.md#l5).


## Keep as they are

- [L1: Paired-area ownership and sleeping placement](semantic-groups.md#l1): 9 tests; files take ~49 s.
- [L2: Circle geometry and explanation contracts](semantic-groups.md#l2): 9 tests; files take ~50 s.
- [L4: Retained comparison settings](semantic-groups.md#l4): 5 tests; files take ~147 s.
- [L6: Quest completion, sleeping state and party-legend rules](semantic-groups.md#l6): 61 tests; files take ~221 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="l1"></a>

### L1. Paired-area ownership and sleeping placement

**9 tests · hard limits · files take ~49 s.**

Examples: [Paired areas share ownership.](../../src/rules/legendAreas.test.ts#L92); [The party border surrounds both paired areas.](../../src/rules/legendAreas.test.ts#L141); [Unrelated sleeping ownership is rejected.](../../src/rules/sleepCells.test.ts#L51).

[Assertions, rationale and exact membership](semantic-groups.md#l1).

<a id="l2"></a>

### L2. Circle geometry and explanation contracts

**9 tests · current rules · files take ~50 s.**

Examples: [Every species has a measured footprint.](../../src/rules/legendFit.test.ts#L13); [Fast circle lookup matches complete search.](../../src/rules/legendCircle.test.ts#L16); [Quest instructions ask for any age and no buff.](../../src/rules/legendCircle.test.ts#L82).

[Assertions, rationale and exact membership](semantic-groups.md#l2).

<a id="l4"></a>

### L4. Retained comparison settings

**5 tests · leftovers · files take ~147 s.**

Examples: [Radius maps default to one-fifth legends.](../../src/rules/legendShare.test.ts#L21); [An explicit comparison can fill every area.](../../src/rules/legendShare.test.ts#L41).

[Assertions, rationale and exact membership](semantic-groups.md#l4).

<a id="l6"></a>

### L6. Quest completion, sleeping state and party-legend rules

**61 tests · current rules · files take ~221 s.**

Examples: [Placing the sigil completes the quest immediately.](../../src/rules/questDrop.test.ts#L41); [A completed quest wakes an ally and grants no buff.](../../src/rules/legends.test.ts#L251); [Only the final Easter-egg letter permits legend pickup.](../../src/rules/partyLegend.test.ts#L45).

[Assertions, rationale and exact membership](semantic-groups.md#l6).

</details>

**L-KEEP — Yes/no: Keep L1, L2, L4, L6 as they are?** They protect paired-area ownership, circle geometry and instructions, deliberate comparison settings, quest completion and sleeping/Easter-egg state rules.

[Review scope and provenance](semantic-groups.md#legends-review-provenance). [Old/current rulings](semantic-groups.md#legends-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

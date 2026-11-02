# Legends

2 changes proposed, 3 groups to keep as they are.

Format-check preview: reviewed the named core files and groups below; other legend-tagged files remain unreviewed. Combat behavior in legends.test.ts remains with #1622. This is not the completed system audit.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- A legend area and its paired creature area share ownership, rage accounting and party borders.
- Circle lookup agrees with the complete search, and circle explanations follow the legend's state.
- Legend footprint data controls circle size and margins; raw physical cells need not equal ownership cells.
- Long fixtures also pin baby travel times, grove averages, rim coverage and runestone-gap failure rates.

## Proposed changes

### L3. Timed travel and generated scenery statistics

**6 tests · outcome stats · ~33 s of CI.**

Examples: [Babies return to their circle within 20 seconds.](../../src/rules/legendClearing.test.ts#L50); [Generated groves meet average-strength targets.](../../src/rules/legendClearing.test.ts#L158); [Almost all circles meet the runestone gap.](../../src/rules/legendClearing.test.ts#L206).

**Yes/no: Move these six tests of baby travel times, grove averages, rim coverage and siege timing out of release gates? Yes means they run nightly as a nonblocking report; small rule and safety checks are retained separately.** [Assertions, rationale and exact membership](semantic-groups.md#l3).

### L5. Pinned list of giants exceeding the old circle cap

**1 tests · leftovers · ~4 s of CI.**

Examples: [The oversized-legend list stays exactly eleven species.](../../src/rules/legendFit.test.ts#L34).

**Yes/no: Replace the exact list of eleven giant species with a report of which legends currently overflow? Yes keeps the circle cap and margin checks blocking, while the species list becomes informational.** [Assertions, rationale and exact membership](semantic-groups.md#l5).


## Keep as they are

### L1. Paired-area ownership and sleeping placement

**9 tests · hard limits · ~49 s of CI.**

Examples: [Paired areas share ownership.](../../src/rules/legendAreas.test.ts#L92); [The party border surrounds both paired areas.](../../src/rules/legendAreas.test.ts#L141); [Unrelated sleeping ownership is rejected.](../../src/rules/sleepCells.test.ts#L51).

[Assertions, rationale and exact membership](semantic-groups.md#l1).

### L2. Circle geometry and explanation contracts

**7 tests · current rules · ~17 s of CI.**

Examples: [Every species has a measured footprint.](../../src/rules/legendFit.test.ts#L13); [Fast circle lookup matches complete search.](../../src/rules/legendCircle.test.ts#L16); [Quest instructions ask for any age and no buff.](../../src/rules/legendCircle.test.ts#L82).

[Assertions, rationale and exact membership](semantic-groups.md#l2).

### L4. Retained radius-map comparison settings

**2 tests · leftovers · ~14 s of CI.**

Examples: [Radius maps default to one-fifth legends.](../../src/rules/legendShare.test.ts#L21); [An explicit comparison can fill every area.](../../src/rules/legendShare.test.ts#L41).

[Assertions, rationale and exact membership](semantic-groups.md#l4).


**Yes/no: Keep L1, L2, L4 as they are?** They protect paired-area ownership, circle geometry and instructions, and deliberately retained radius-map comparisons.

[Old/current ruling comparisons](semantic-groups.md#legends-ruling-review). No change happens before Ed rules.

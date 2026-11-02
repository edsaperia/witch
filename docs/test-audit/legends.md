# Legends

Format-check preview: reviewed the named core files and groups below; other legend-tagged files remain unreviewed. Combat behavior in legends.test.ts remains with #1622. This is not the completed system audit.

## What these protect

- A legend area and its paired creature area share ownership, rage accounting and party borders.
- Circle lookup agrees with the complete search, and circle explanations follow the legend's state.
- Legend footprint data controls circle size and margins; raw physical cells need not equal ownership cells.
- Long fixtures also pin baby travel times, grove averages, rim coverage and runestone-gap failure rates.

## Proposed decisions

### L1. Paired-area ownership and sleeping placement

**9 declarations · hard limits · ~48.992 historical file-seconds.**

Examples: [counts a legend area and its pair as one area: a point…](../../src/rules/legendAreas.test.ts#L92); [partifies a pair together: its legend area is…](../../src/rules/legendAreas.test.ts#L141); [rejects an unrelated area even for a boss, and rejects…](../../src/rules/sleepCells.test.ts#L51).

**Yes/no: Keep paired-area identity, route exclusion and sleeping-ownership protections?** [Assertions, rationale and exact membership](semantic-groups.md#l1).

### L2. Circle geometry and explanation contracts

**7 declarations · current rules · ~16.525 historical file-seconds.**

Examples: [has every area's creature measured…](../../src/rules/legendFit.test.ts#L13); [skips only legends too far for their circle: the same…](../../src/rules/legendCircle.test.ts#L16); [asks for its kind with no age and names no boon (Ed,…](../../src/rules/legendCircle.test.ts#L82).

**Yes/no: Keep the footprint, circle-size, indexed-lookup and explanation contracts?** [Assertions, rationale and exact membership](semantic-groups.md#l2).

### L3. Timed travel and generated scenery statistics

**6 declarations · outcome stats · ~33.250 historical file-seconds.**

Examples: [each holds a wild baby of its legend's kind, which…](../../src/rules/legendClearing.test.ts#L50); [each swells the forest round it, strongest at its edge…](../../src/rules/legendClearing.test.ts#L158); [each keeps its edge minFromStone metres from its…](../../src/rules/legendClearing.test.ts#L206).

**Yes/no: Move these six long scenario/statistical checks to a nonblocking report, while retaining small rule and boundary tests?** [Assertions, rationale and exact membership](semantic-groups.md#l3).

### L4. Retained radius-map comparison settings

**2 declarations · leftovers · ~14.055 historical file-seconds.**

Examples: [puts one in legends.share of the areas (Ed,…](../../src/rules/legendShare.test.ts#L21); [puts one in every area but home at 1, and differs by seed](../../src/rules/legendShare.test.ts#L41).

**Yes/no: Keep these two radius-map comparison tests, including explicit half/all-area settings, separate from authored-island rules?** [Assertions, rationale and exact membership](semantic-groups.md#l4).

### L5. Pinned list of giants exceeding the old circle cap

**1 declarations · leftovers · ~4.400 historical file-seconds.**

Examples: [lists the legends too big for any circle under the cap…](../../src/rules/legendFit.test.ts#L34).

**Yes/no: Replace this exact eleven-species list with a report of current footprint overflow, keeping the cap/margin safety checks?** [Assertions, rationale and exact membership](semantic-groups.md#l5).


Historical containing-file durations are approximate context, **not case time or savings**. Partial-file groups include other cases; overlapping file totals must not be added. [Old/current ruling comparisons](semantic-groups.md#legends-ruling-review). No change happens before Ed rules.

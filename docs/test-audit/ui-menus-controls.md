# UI, menus and controls

1 changes proposed, 4 groups to keep as they are.

Read-only source review at 9f045ebca, report6566137785. Exact overlap with saves/world/art is counted on those pages once; multiplayer boundaries remain with #1609.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- Remapped keys, mouse and pad act once per press while Choose/Back retain recovery routes.
- Only the top menu owns input; closing it cannot leave walking keys held or activate a hidden panel.
- Travel and loading handoff preserve island, seed, settings and ownership.
- Reports and replay diagnostics survive quotas and corrupt data without changing play.
- Creator/editor controls produce valid data while historical comparison modes remain distinct.

## Proposed changes

### U1. Preview and chart distribution thresholds

**3 tests · outcome stats · ~2 s of CI.**

Examples: [Bag preview loops rank total letter counts.](../../src/ui/bagSim.test.ts#L24); [Each bag preview must land a sampled hit.](../../src/ui/bagSim.test.ts#L31); [Generated charts meet drift and quadrant-share targets.](../../src/app/chartLayout.test.ts#L15).

**Yes/no: Split these three tests so sampled throw/hit and chart-distribution targets run as nonblocking reports? Yes keeps reach, containment, patch separation and repeatable preview behavior blocking.** [Assertions, rationale and exact membership](semantic-groups.md#u1).


## Keep as they are

- [U2: Controls, pause and menu recovery](semantic-groups.md#u2): 105 tests; ~12 s of CI.
- [U3: Opening, travel, progression and links](semantic-groups.md#u3): 101 tests; ~54 s of CI.
- [U4: Diagnostics, encoded data and queue bounds](semantic-groups.md#u4): 60 tests; ~7 s of CI.
- [U5: Creator and editor data compatibility](semantic-groups.md#u5): 40 tests; ~2 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

### U2. Controls, pause and menu recovery

**105 tests · current rules · ~12 s of CI.**

Examples: [Choose and Back retain a working recovery input.](../../src/ui/rebind.test.ts#L27); [Keys released in an overlay do not keep her walking.](../../src/platform/freezeStack.test.ts#L34); [Pause preserves native editing controls.](../../src/platform/freezeNative.test.ts#L47).

[Assertions, rationale and exact membership](semantic-groups.md#u2).

### U3. Opening, travel, progression and links

**101 tests · current rules · ~54 s of CI.**

Examples: [A failed in-place journey can use its fallback link.](../../src/app/sail.test.ts#L64); [A resumed night retains its intended saved state.](../../src/app/night.test.ts#L129); [A loss does not leak temporary finds into progress.](../../src/app/loan.test.ts#L97).

[Assertions, rationale and exact membership](semantic-groups.md#u3).

### U4. Diagnostics, encoded data and queue bounds

**60 tests · hard limits · ~7 s of CI.**

Examples: [Malformed or oversized diagnostic data is rejected.](../../src/platform/logCodec.test.ts#L22); [Tracing preserves worker messages and results.](../../src/app/workerJobTrace.test.ts#L19); [Diagnostic retention stays bounded.](../../src/platform/playtestJournal.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#u4).

### U5. Creator and editor data compatibility

**40 tests · current rules · ~2 s of CI.**

Examples: [Old creator data drops removed familiar fields.](../../src/ui/creator.test.ts#L48); [Pending effects are not presented as working.](../../src/ui/potionLab.test.ts#L13); [Editor values remain within their data contract.](../../src/ui/creator.test.ts#L27).

[Assertions, rationale and exact membership](semantic-groups.md#u5).

</details>

**Yes/no: Keep U2, U3, U4, U5 as they are?** They protect input recovery, menu ownership, opening/travel handoff, retained diagnostics and valid creator/editor data.

[Old/current ruling comparisons](semantic-groups.md#ui-menus-controls-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

35 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

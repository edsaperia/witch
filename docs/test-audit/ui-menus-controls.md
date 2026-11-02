# UI, menus and controls

3 changes proposed, 7 groups to keep.

## What these protect

- Remapped keys, mouse and pad act once per press while Choose/Back retain recovery routes.
- Only the top menu owns input; closing it cannot leave walking keys held or activate a hidden panel.
- Travel and loading handoff preserve island, seed, settings and ownership.
- Reports and replay diagnostics survive quotas and corrupt data without changing play.
- Creator/editor controls produce valid data while historical comparison modes remain distinct.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="u1"></a>

### U1. Preview and chart distribution thresholds

**3 tests · outcome stats · files take ~2 s.**

Examples: [Bag preview loops rank total letter counts.](../../src/ui/bagSim.test.ts#L24); [Each bag preview must land a sampled hit.](../../src/ui/bagSim.test.ts#L31); [Generated charts meet drift and quadrant-share targets.](../../src/app/chartLayout.test.ts#L15).

**Yes/no: Split these three tests so sampled throw/hit and chart-distribution targets run as nonblocking reports? Yes keeps reach, containment, patch separation and repeatable preview behavior blocking.** [Assertions, rationale and exact membership](semantic-groups.md#u1).

<a id="u-time"></a>

### U-TIME. Production-sized replay pressure fixture cost

**1 test · hard limits · files take ~38 s.**

Examples: [Legacy report text survives duplicated replay pressure, reload and both exports.](../../src/app/playtestComments.test.ts#L69).

**Yes/no: Keep the report-integrity checks with a smaller blocking fixture and move production-sized pressure to a nonblocking report?** [Assertions, rationale and exact membership](semantic-groups.md#u-time).

<a id="u7"></a>

### U7. Sampled camera comfort and travel magnitudes

**5 tests · outcome stats · files take ~131 s.**

Examples: [Camera transitions meet a sampled maximum angle change.](../../src/rules/coastCamera.test.ts#L38); [Authored bearings match exactly, alongside a sampled smoothness score.](../../src/rules/coastCamera.test.ts#L44); [Leaving a seat follows the intro curve and an extra midpoint-distance preference.](../../src/rules/rules.test.ts#L447); [Camera following retains no overshoot and bounded look-ahead.](../../src/rules/rules.test.ts#L481); [Rightward input moves the witch and the camera within a fixed sample window.](../../src/rules/rules.test.ts#L788).

**Yes/no: Split or replace sampled camera comfort and travel magnitudes while retaining or supplying direct pose, continuity and movement/follow protections?** [Assertions, rationale and exact membership](semantic-groups.md#u7).


## Keep as they are

- [U2: Controls, pause and menu recovery](semantic-groups.md#u2): 105 tests; files take ~12 s.
- [U3: Opening, travel, progression and links](semantic-groups.md#u3): 101 tests; files take ~54 s.
- [U4: Diagnostics, encoded data and queue bounds](semantic-groups.md#u4): 60 tests; files take ~7 s.
- [U5: Creator and editor data compatibility](semantic-groups.md#u5): 40 tests; files take ~2 s.
- [U8: Paused picture, clock and quality-controller policy](semantic-groups.md#u8): 17 tests; files take ~131 s.
- [U9: Morning and post-night guidance](semantic-groups.md#u9): 9 tests; files take ~4 s.
- [U10: Exact camera geometry and configuration](semantic-groups.md#u10): 4 tests; files take ~131 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="u2"></a>

### U2. Controls, pause and menu recovery

**105 tests · current rules · files take ~12 s.**

Examples: [Choose and Back retain a working recovery input.](../../src/ui/rebind.test.ts#L27); [Keys released in an overlay do not keep her walking.](../../src/platform/freezeStack.test.ts#L34); [Pause preserves native editing controls.](../../src/platform/freezeNative.test.ts#L47).

[Assertions, rationale and exact membership](semantic-groups.md#u2).

<a id="u3"></a>

### U3. Opening, travel, progression and links

**101 tests · current rules · files take ~54 s.**

Examples: [A failed in-place journey can use its fallback link.](../../src/app/sail.test.ts#L64); [A resumed night retains its intended saved state.](../../src/app/night.test.ts#L129); [A loss does not leak temporary finds into progress.](../../src/app/loan.test.ts#L97).

[Assertions, rationale and exact membership](semantic-groups.md#u3).

<a id="u4"></a>

### U4. Diagnostics, encoded data and queue bounds

**60 tests · hard limits · files take ~7 s.**

Examples: [Malformed or oversized diagnostic data is rejected.](../../src/platform/logCodec.test.ts#L22); [Tracing preserves worker messages and results.](../../src/app/workerJobTrace.test.ts#L19); [Diagnostic retention stays bounded.](../../src/platform/playtestJournal.test.ts#L50).

[Assertions, rationale and exact membership](semantic-groups.md#u4).

<a id="u5"></a>

### U5. Creator and editor data compatibility

**40 tests · current rules · files take ~2 s.**

Examples: [Old creator data drops removed familiar fields.](../../src/ui/creator.test.ts#L48); [Pending effects are not presented as working.](../../src/ui/potionLab.test.ts#L13); [Editor values remain within their data contract.](../../src/ui/creator.test.ts#L27).

[Assertions, rationale and exact membership](semantic-groups.md#u5).

<a id="u8"></a>

### U8. Paused picture, clock and quality-controller policy

**17 tests · current rules · files take ~131 s.**

Examples: [retains a paused picture through a minute of menu frames, including background art arrivals](../../src/app/worldDrawGate.test.ts#L4); [redraws the start for new art, a changed view or an explicit simulation step, once each](../../src/app/worldDrawGate.test.ts#L15); [starts at full quality with nothing in effect](../../src/rules/ladder.test.ts#L9); [steps down after a few slow windows, past rungs not built and load rungs, to the next live rung](../../src/rules/ladder.test.ts#L15); [doesn't step down on a window or two, nor while settling](../../src/rules/ladder.test.ts#L24).

[Assertions, rationale and exact membership](semantic-groups.md#u8).

<a id="u9"></a>

### U9. Morning and post-night guidance

**9 tests · current rules · files take ~4 s.**

Examples: [none while she's still in bed](../../src/rules/guidance.test.ts#L32); [a game's first morning, in Ed's order (2026-10-29): the dressing table (skin, hair), wardrobe, shoes, bags, the invitations, the cloak, her hat, her broom; then the decks](../../src/rules/guidance.test.ts#L38); [the dressing table's step is done once she's used it: E there (its panel opened)](../../src/rules/guidance.test.ts#L62); [no dressing pin after a night played: last night's clothes are in their pile; straight to the decks](../../src/rules/guidance.test.ts#L71); [a game's first morning on a later load (no night played yet): no pile, so the dressing pins, her hat last on the hats' floor](../../src/rules/guidance.test.ts#L77).

[Assertions, rationale and exact membership](semantic-groups.md#u9).

<a id="u10"></a>

### U10. Exact camera geometry and configuration

**4 tests · current rules · files take ~131 s.**

Examples: [lying down to stargaze, lower and closer still; getting up and walking off, back the same way](../../src/rules/coastCamera.test.ts#L28); [over the treetops the coast leaves the camera alone](../../src/rules/coastCamera.test.ts#L60); [uses each mode's angle and distance, and zoom moves between in and out](../../src/rules/rules.test.ts#L463); [sits south of and above what it looks at](../../src/rules/rules.test.ts#L496).

[Assertions, rationale and exact membership](semantic-groups.md#u10).

</details>

**U-KEEP — Yes/no: Keep U2, U3, U4, U5, U8, U9, U10 as they are?** They protect input recovery, menu ownership, opening/travel handoff, retained diagnostics and valid creator/editor data.

[Review scope and provenance](semantic-groups.md#ui-menus-controls-review-provenance). [Old/current rulings](semantic-groups.md#ui-menus-controls-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

# Saves, replay and robustness

0 changes proposed, 6 groups to keep as they are.

Core save, settings and replay setup/assertions reviewed. Borrowed visits and telephone boundaries remain with #1609; this page proposes no gameplay change.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- A slot change waits for the outgoing checkpoint; failed migration never replaces the original save bytes.
- A restored night preserves shared references, typed buffers, RNG cursors and identical future simulation.
- Build-number changes alone do not invalidate compatible nights; explicit world links remain distinct.
- Owned equipment, chart discoveries and accessibility settings survive reloads and bad storage.

## Proposed changes

None in the reviewed groups.

## Keep as they are

### S1. Slot migration and isolation

**14 tests · hard limits · <1 s of CI.**

Examples: [Old save bytes survive migration.](../../src/app/saveSlots.test.ts#L30); [A corrupt slot cannot block another.](../../src/app/saveSlots.test.ts#L55); [An older tab preserves newer slots.](../../src/app/saveSlots.test.ts#L132).

[Assertions, rationale and exact membership](semantic-groups.md#s1).

### S2. Snapshot integrity and format guards

**8 tests · hard limits · ~32 s of CI.**

Examples: [Snapshots preserve shared data.](../../src/rules/nightSnapshot.test.ts#L36); [The restored night continues identically.](../../src/rules/nightSnapshot.test.ts#L64); [Game format changes require review.](../../src/app/saveFormat.test.ts#L40).

[Assertions, rationale and exact membership](semantic-groups.md#s2).

### S3. Solo autosave eligibility and identity

**10 tests · hard limits · ~4 s of CI.**

Examples: [Compatible saves survive new builds.](../../src/app/nightSave.test.ts#L32); [Failed writes are reported safely.](../../src/app/nightSave.test.ts#L132); [Slot changes wait for the last checkpoint.](../../src/app/nightSave.test.ts#L146).

[Assertions, rationale and exact membership](semantic-groups.md#s3).

### S4. Equipment saves and compatibility migrations

**13 tests · current rules · <1 s of CI.**

Examples: [Old brooms convert once and retain colours.](../../src/app/broomSave.test.ts#L44); [Found hats survive a refused write in this page.](../../src/app/hatSave.test.ts#L8); [Old station names migrate to current ones.](../../src/app/guideSave.test.ts#L7).

[Assertions, rationale and exact membership](semantic-groups.md#s4).

### S5. Campaign progress and personal settings

**21 tests · current rules · <1 s of CI.**

Examples: [Won nights unlock islands; losses do not.](../../src/app/chartSave.test.ts#L17); [Old volumes migrate only once.](../../src/app/playerSettings.test.ts#L25); [Resuming preserves accessibility settings.](../../src/app/playerSettings.test.ts#L49).

[Assertions, rationale and exact membership](semantic-groups.md#s5).

### S6. Recorded inputs and retained playtest reports

**18 tests · hard limits · ~97 s of CI.**

Examples: [A paused tape replays the identical state.](../../src/platform/inputRecording.test.ts#L18); [A checkpoint never hides replay divergence.](../../src/platform/inputRecording.test.ts#L76); [Report text survives an attachment-write failure.](../../src/app/playtestComments.test.ts#L111).

[Assertions, rationale and exact membership](semantic-groups.md#s6).


**Yes/no: Keep S1, S2, S3, S4, S5, S6 as they are?** They protect slot isolation, exact save/replay continuation, safe checkpoints, equipment migrations, personal settings and retained report text.

[Old/current ruling comparisons](semantic-groups.md#saves-replay-robustness-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

0 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).

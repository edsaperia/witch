# Saves, replay and robustness

0 changes proposed, 6 groups to keep.

## What these protect

- A slot change waits for the outgoing checkpoint; failed migration never replaces the original save bytes.
- A restored night preserves shared references, typed buffers, RNG cursors and identical future simulation.
- Build-number changes alone do not invalidate compatible nights; explicit world links remain distinct.
- Owned equipment, chart discoveries and accessibility settings survive reloads and bad storage.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

None in the reviewed groups.

## Keep as they are

- [S1: Slot migration and isolation](semantic-groups.md#s1): 14 tests; files take <1 s.
- [S2: Snapshot integrity and format guards](semantic-groups.md#s2): 8 tests; files take ~32 s.
- [S3: Solo autosave eligibility and identity](semantic-groups.md#s3): 10 tests; files take ~4 s.
- [S4: Equipment saves and compatibility migrations](semantic-groups.md#s4): 16 tests; files take <1 s.
- [S5: Campaign progress and personal settings](semantic-groups.md#s5): 21 tests; files take <1 s.
- [S6: Recorded inputs and retained playtest reports](semantic-groups.md#s6): 17 tests; files take ~97 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="s1"></a>

### S1. Slot migration and isolation

**14 tests · hard limits · files take <1 s.**

Examples: [Old save bytes survive migration.](../../src/app/saveSlots.test.ts#L30); [A corrupt slot cannot block another.](../../src/app/saveSlots.test.ts#L55); [An older tab preserves newer slots.](../../src/app/saveSlots.test.ts#L132).

[Assertions, rationale and exact membership](semantic-groups.md#s1).

<a id="s2"></a>

### S2. Snapshot integrity and format guards

**8 tests · hard limits · files take ~32 s.**

Examples: [Snapshots preserve shared data.](../../src/rules/nightSnapshot.test.ts#L36); [The restored night continues identically.](../../src/rules/nightSnapshot.test.ts#L64); [Game format changes require review.](../../src/app/saveFormat.test.ts#L40).

[Assertions, rationale and exact membership](semantic-groups.md#s2).

<a id="s3"></a>

### S3. Solo autosave eligibility and identity

**10 tests · hard limits · files take ~4 s.**

Examples: [Compatible saves survive new builds.](../../src/app/nightSave.test.ts#L32); [Failed writes are reported safely.](../../src/app/nightSave.test.ts#L132); [Slot changes wait for the last checkpoint.](../../src/app/nightSave.test.ts#L146).

[Assertions, rationale and exact membership](semantic-groups.md#s3).

<a id="s4"></a>

### S4. Equipment saves and compatibility migrations

**16 tests · current rules · files take <1 s.**

Examples: [Old brooms convert once and retain colours.](../../src/app/broomSave.test.ts#L44); [Found hats survive a refused write in this page.](../../src/app/hatSave.test.ts#L8); [Old station names migrate to current ones.](../../src/app/guideSave.test.ts#L7).

[Assertions, rationale and exact membership](semantic-groups.md#s4).

<a id="s5"></a>

### S5. Campaign progress and personal settings

**21 tests · current rules · files take <1 s.**

Examples: [Won nights unlock islands; losses do not.](../../src/app/chartSave.test.ts#L17); [Old volumes migrate only once.](../../src/app/playerSettings.test.ts#L25); [Resuming preserves accessibility settings.](../../src/app/playerSettings.test.ts#L49).

[Assertions, rationale and exact membership](semantic-groups.md#s5).

<a id="s6"></a>

### S6. Recorded inputs and retained playtest reports

**17 tests · hard limits · files take ~97 s.**

Examples: [keeps a ten-minute paused tape exact without expanding paused frames into the crash journal](../../src/platform/inputRecording.test.ts#L18); [rejects divergence before a labelled checkpoint instead of using it to repair the replay](../../src/platform/inputRecording.test.ts#L76); [commits text before attachments, exposes a real attachment-write error and reloads every word](../../src/app/playtestComments.test.ts#L111).

[Assertions, rationale and exact membership](semantic-groups.md#s6).

</details>

**S-KEEP — Yes/no: Keep S1, S2, S3, S4, S5, S6 as they are?** They protect slot isolation, exact save/replay continuation, safe checkpoints, equipment migrations, personal settings and retained report text.

[Review scope and provenance](semantic-groups.md#saves-replay-robustness-review-provenance). [Old/current rulings](semantic-groups.md#saves-replay-robustness-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).

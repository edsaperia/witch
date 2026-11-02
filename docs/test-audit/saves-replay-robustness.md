# Saves, replay and robustness

Format-check preview: core save files read in full; unrelated name-based assignments and recording integration remain to review. This is not the completed system audit.

## What these protect

- A slot change waits for the outgoing checkpoint; failed migration never replaces the original save bytes.
- A restored night preserves shared references, typed buffers, RNG cursors and identical future simulation.
- Build-number changes alone do not invalidate compatible nights; explicit world links remain distinct.
- Owned equipment, chart discoveries and accessibility settings survive reloads and bad storage.

## Proposed decisions

### S1. Slot migration and isolation

**12 declarations · hard limits · ~0.033 historical file-seconds.**

Examples: [preserves all legacy progress/settings bytes in the…](../../src/app/saveSlots.test.ts#L30); [a corrupt slot's bytes cannot block another slot](../../src/app/saveSlots.test.ts#L55); [keeps other tabs' slots and last-used selection when…](../../src/app/saveSlots.test.ts#L132).

**Yes/no: Keep these slot isolation, migration and failed-write protections unchanged?** [Assertions, rationale and exact membership](semantic-groups.md#s1).

### S2. Snapshot integrity and format guards

**8 declarations · hard limits · ~32.195 historical file-seconds.**

Examples: [roundtrips a played night, its maps, sets, typed…](../../src/rules/nightSnapshot.test.ts#L36); [continues the same simulation, including RNG, after…](../../src/rules/nightSnapshot.test.ts#L64); [requires an explicit rules-format review when Game or…](../../src/app/saveFormat.test.ts#L40).

**Yes/no: Keep all snapshot, deterministic-continuation and explicit format-review protections unchanged?** [Assertions, rationale and exact membership](semantic-groups.md#s2).

### S3. Solo autosave eligibility and identity

**10 declarations · hard limits · ~3.854 historical file-seconds.**

Examples: [accepts a build-counter jump under the cross-build…](../../src/app/nightSave.test.ts#L32); [doesn't overlap writes and reports a failed write…](../../src/app/nightSave.test.ts#L132); [flush waits for an active checkpoint then writes the…](../../src/app/nightSave.test.ts#L146).

**Yes/no: Keep compatible-night acceptance, identity checks and serialized writes unchanged?** [Assertions, rationale and exact membership](semantic-groups.md#s3).

### S4. Equipment saves and compatibility migrations

**13 declarations · current rules · ~0.007 historical file-seconds.**

Examples: [an old save's broom shape goes back to the Classic…](../../src/app/broomSave.test.ts#L44); [keeps a newly found hat in this page when storage…](../../src/app/hatSave.test.ts#L8); [keeps the new things (one an item, newest last) and…](../../src/app/guideSave.test.ts#L7).

**Yes/no: Keep equipment ownership and old-save conversion checks, including the old broom and station-name fixtures?** [Assertions, rationale and exact membership](semantic-groups.md#s4).

### S5. Campaign progress and personal settings

**21 declarations · current rules · ~0.028 historical file-seconds.**

Examples: [unlocks the islands of the legends a won night woke,…](../../src/app/chartSave.test.ts#L17); [carries over today's saved volumes and screen shake…](../../src/app/playerSettings.test.ts#L25); [keeps original settings levels across a saved night,…](../../src/app/playerSettings.test.ts#L49).

**Yes/no: Keep deterministic chart-unlock rules and settings persistence unchanged?** [Assertions, rationale and exact membership](semantic-groups.md#s5).


Historical containing-file durations are approximate context, **not case time or savings**. Partial-file groups include other cases; overlapping file totals must not be added. [Old/current ruling comparisons](semantic-groups.md#saves-replay-robustness-ruling-review). No change happens before Ed rules.

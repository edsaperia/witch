# Save slots (brief)

COMPLETED in PR #1494, shipped with input-stack integration and included in v6478 (2026-10-31). Current storage, migration and format guards are described in [save-slots notes](../notes/save-slots.md). “Today” and build-number rejection below describe the pre-change problem, not current behavior; rename/delete remain outside the shipped scope.

Ed, 2026-10-30 14:45 UTC: "We should have save slots that hold progress and settings. By default open the previous one, but you should be able to select a different slot or a new slot from a tab in the settings screen, which restarts the night."

Today `src/app/nightSave.ts:42` throws away a saved night whenever `n.build !== build`. With about 19 deploys a day, a reload usually loses the night in progress.

Scope:
1. **Slots.** Each slot holds that player's progress (finds, unlocks, world, the current saved night) and settings. The game opens the last-used slot by default.
2. **Settings tab "Saves".** List the slots with a summary (island, nights, date). Allow choosing another slot or creating a new one; switching restarts the night in that slot. Rename and delete are optional, and deletion needs confirmation.
3. **Version saves by format, not build.** Accept a saved night when its format version matches. Bump the version, or add a migration, only when the saved shape changes. Add a test that fails if the saved-game shape changes without a version bump.
4. **Migration.** On first run, wrap the existing single save and settings into slot 1, with nothing lost.
5. **Robustness.** Storage failures stay quiet but are logged. A corrupt slot never blocks the others.

PLAN first (data layout, migration, UI sketch), then build. Typecheck plus nearby tests; save tests live in `src/app/*Save*.test.ts`.

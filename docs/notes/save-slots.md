# Save slots

Ed, 2026-10-30: "We should have save slots that hold progress and settings. By default open the previous one, but you should be able to select a different slot or a new slot from a tab in the settings screen, which restarts the night."

**Save slot storage** (`src/app/saveSlots.ts`): a version-1 index at `witch.saves.v1` holds the last-used slot and independent slot metadata. Existing progress and settings keys listed in `SLOT_KEYS` become `witch.save.<slot-id>.<old-key>`. The wrapper passes device diagnostics and unrelated keys through unchanged. Each data item remains independent, so malformed settings in one slot do not prevent reading the others. Existing readers remain responsible for validating each item's contents.

**Single-save migration**: copy the legacy values as exact strings into slot `s1`; keep their original keys. Publish the index only when every legacy read and copy succeeds. A failed copy stays in memory for the page, logs once per key, and does not publish a migration marker, even if a new slot is created afterwards. A later page can retry from the originals. Slot 1 keeps the existing IndexedDB night key (the URL path), so no large night is copied or discarded. Other slots use `<path>#save=<id>`. This storage helper is not yet wired into runtime reads.

**Slot switching**: persist selection before reloading; return false if the browser refuses it. The caller must finish saving the outgoing night before selecting/reloading. Runtime/UI integration waits for robustness PR #1493 to land, per coordinator comment 6528935296 on PR #1494; then merge that prototype into this branch before touching the shared runtime files.

**Save format guards** (`src/app/saveFormat.test.ts`): normalized TypeScript declarations for SavedNight, the graph codec types and Game have fingerprints keyed by their format versions. A declaration edit fails the guard until its version is deliberately bumped and a new baseline reviewed (or a compatible migration is added). Comments and formatting do not affect it. This checks the envelope, graph representation and top-level Game declaration; it does not claim exhaustive coverage of every nested imported game type. Runtime roundtrip and compatibility tests remain necessary.

Checks: `npm exec -- vitest run src/app/saveSlots.test.ts src/app/saveFormat.test.ts --maxWorkers=1`, `npm run typecheck`. Full suite, browser and combined release checks belong to the coordinator.

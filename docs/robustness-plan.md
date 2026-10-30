# Crash log, layer check, start screen retirement

Brief: COORDINATOR 6525574522, 2026-10-30. Branch `codex/robustness`, starting at `3f7d386beb3d7147f32f6837d9144decd467b7b2`.

1. Capture global errors and unhandled promise rejections in the L log: last 20, stack, build, game time and island. Audit empty catches individually; preserve deliberate storage/optional-feature fallbacks, and record unexpected failures without changing their recovery behavior.
2. Add a source-level rules boundary test, including type imports and DOM global access. Repair the named boundary leaks. Report the existing rules import cycle without restructuring it.

## Plan for steps 3–5, before implementation

Ed (2026-10-30): “deprecate the start screen and not load the update notes at all”. Resumed nights, `?creator=0`, and bot games should enter play through the existing start action, preserving its initialization and audio gesture handling. Remove the start-screen notes dependency; keep the normal bedroom/creator arrival path intact.

Ed requests a “What's new” settings tab. Reuse the settings page's navigation and focus handling. Fetch notes only when that tab opens, in bounded newest-first batches. A Load more action appends the next batch; loading/failure/end states must preserve the rest of settings. Keep builders' existing fragment format and tests.

Measure a production build with sourcemaps before splitting modules: entry and transitive initial chunks, raw/compressed download sizes, and module contributors. Then inspect Creator, Studio, Zoo, DJ booth and telescope for dynamic loading at their actual entry points. Preserve synchronous gameplay state and input ownership; show existing loading feedback while a panel loads. Keep art drawing modules in workers or lazy chunks, respecting the art-fingerprint builder's ownership. Compare the same build options after changes. Boot time requires a coordinated browser run; source size/build duration alone will not be called boot time. Request the exact-SHA measurement through the coordinator, with no local browser run.

Validation: typecheck and nearby tests. Full suites/smokes remain the coordinator's. Each bounded milestone is committed and pushed. No release or live activation by this builder.

## Crash capture milestone

The playtest log observes page errors and unhandled promise rejections without suppressing browser reporting. A page-wide ring keeps the latest 20 records across nights, preserving each record's original build, game time and island. Errors before log initialization retain the build and explicitly unknown time/island. Each active-night capture saves immediately; blocked storage remains quiet. `logCaughtError` is the entry point for the pending empty-catch audit. The audit and rules/startup work remain in progress.

Validation: `npm run typecheck` passed; `npx vitest run src/platform/playtestLog.test.ts` passed two tests (ring rollover, context across nights, both global events, rejection serialization and blocked storage). The first restricted test attempt could not rename Vitest's temporary cache file; the ordinary-permissions retry passed.

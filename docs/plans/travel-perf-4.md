# Prepare found islands in the treehouse

Ed, 2026-11-04: only home and the islands she has found are prepared in the background, and only while she's in the treehouse. Unfound islands may be missing from the map table until the full chart has been opened once.

1. Merge the current prototype normally, preserving the guard against recording a borrowed night's results on the local chart.
2. Prepare only saved found islands and home. Debug unlocks may change where she can sail, but do not expand the background work.
3. Stop background preparation when she leaves the treehouse, sails, sleeps, hides the tab, pauses or opens the full chart. Cancel before a throttled save/cache check; ignore replies from a stopped worker. Re-entering resumes through the existing cache.
4. Preserve the full chart's all-island demand queue, prepared renderer and one-island-per-frame rise-in. The map-table miniature reads only the cache. The demand worker is independent of the background worker.
5. Use focused unit tests with fake workers and tiny synthetic terrain to check active background job counts and the real outline-worker demand/cache handler. Run nearby tests with one worker and typecheck. CI covers the combined build; visual acceptance remains Ed's.

Scope: chart background scheduling, its small main hook, focused tests, island notes and the existing changelog fragment. No house/sleep/alarm behavior, shader, artwork or workflow changes. No browser or heavy local proof is needed for this rework.

The earlier implementation checkpoint remains in git history. This revision replaces its broader debug-unlock scope and outstanding browser-proof plan with the requested unit evidence. It makes no measured speed or visual-parity claim.

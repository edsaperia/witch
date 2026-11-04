# T6 nightly behaviour hookup

Coordinator ruling [1632#6578304163](https://github.com/edsaperia/witch/pull/1632#issuecomment-6578304163), 2 November 2026: run `tools/balance/report.test.mjs` in the independent nightly behaviour report as an execution check; show its four fixture-sanity rows as informational. Do not add release CI coverage.

Base: prototype c7b1f99303970a62ec9f9816b5ad5fd97508d20f, including the merged world-rules provider from #1661. Explicit dependency: #1660 at c66e07ffe75bba2408d534795c54809dd478e884, retaining its replay assertions and fixture contracts without modification. Merge that dependency into this own branch before integration. Canonical owns combining and release.

Add bounded sequential replay and fixture subprocesses to the reporting runner and preserve their logs/raw results. Convert the four observations to readable metrics retaining actual values and historical references. Replay, process or malformed-result failures are execution errors; false historical predicates do not fail the report. Keep the existing music/world/world-rules registration, scheduling policy, quiet nights and standalone failure/artifact reporting. IP2 #1663 started on an older base; when canonical combines it, retain world-rules plus both invite providers and this T6 hookup.

Validate with synthetic failure/outcome fixtures, the existing lightweight reporting harness, normal typecheck and syntax checks. No generated game/replay, browser or full suite on the laptop; CI and canonical's later registered report supply execution evidence. No timing saving claimed: these .mjs replay checks did not previously run in release CI.

No existing test declarations will be removed or weakened. Report all added/changed tests and reasons. No game, tuning, combat, multiplayer or player text changes.

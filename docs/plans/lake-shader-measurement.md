# Lake shader readiness measurement — preparation

PLAN: branch `codex/lake-shader-measurement`, isolated worktree `work/lake-shader-measurement`, from current prototype `032d88d1e`. This branch prepares evidence and a bounded measurement; it changes no game behavior. Previous PR1604 history/worktree remains intact.

Granted target: v7461, source `f5b9ba7db946f33b8276dbe6a124cd0691462c11` (Ed, 2026-11-04). The coordinator granted one run of at most15 minutes for the two full-lakes shader variants and a no-lakes baseline, using the existing performance trace driver. A newer live build is not a substitute.

1. Resolve the exact target CI artifact/version and preserve its source/build identity; locate the existing readiness trace driver and pin its bytes and dependencies.
2. Reuse the reviewed `owned-run-watchdog.cjs` kernel-job runner (SHA256 starting `ab76356e`) and its three dependencies, with handles rather than numeric-PID tree killing. Do not modify shared helpers or capture another owner's processes.
3. Prepare fixture, GPU/served-version checks, compile/readiness telemetry, fresh quiet check, bounded phases and cleanup reserve. All pins and gates go in a READY manifest; unknown pins mean NOT READY.
4. Validate only the preparation's syntax/static/pure checks. No browser, GPU, heavy measurement, full suite, service or spend is started during preparation.
5. Post exact READY or an exact unresolved gap. Actual execution requires root's serialized allocation after READY review, prior-owner FREE and fresh quiet evidence. After one bounded run, post a public summary and SLOT DONE. No run retries or product changes are inferred.

Readiness walls include polling delay and are not compiler CPU. This work makes no speed, visual or runtime claim before an allocated measurement. Root owns coordination; no personal polling loop.

## Prepared inputs

The exact CI7461 run is41923303645, game-dist artifact13367159619. The downloaded ZIP matches the recorded SHA256 `b50b7bccc13bc045f2363663f59d1461a6c4921ca454e515c27efd7a42d1d29e`; version.json reads `v7461 · f5b9ba7`. All1033 extracted files are hashed. Browser/Playwright/Node inputs and the unchanged supervisor's four files are also pinned.

The existing local Intel comparison driver's readiness observer is reused, with source/compile metadata added by the prepared wrapper. [Driver instructions](../../tools/bench/lake-readiness/README.md) describe the two serial startup fixtures, failure gates and230/250/270-second deadlines. [Exact preparation hashes](../../tools/bench/lake-readiness/ready.json) are the READY input manifest. Machine paths, artifact copies and raw results stay in private local state.

Seven pure preflight tests and all CJS syntax checks pass; the offline checker verified every artifact/runtime/supervisor/driver pin. The launcher propagates validated allocation values to the watchdog's parent environment and driver, then restores prior parent values. The browser is fresh and headless, with Intel verification still required. The artifact's absent optional favicon receives204 from the harness; other missing assets remain errors. No game tests changed, browser started, GPU compilation attempted or slot consumed. Execution still waits for root's review, exact-head allocation, actual preceding FREE and fresh quiet evidence. Preparation is ready for that review, not permission to execute.

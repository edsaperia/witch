# Lake shader readiness measurement — preparation

PLAN: branch `codex/lake-shader-measurement`, isolated worktree `work/lake-shader-measurement`, from current prototype `032d88d1e`. This branch prepares evidence and a bounded measurement; it changes no game behavior. Previous PR1604 history/worktree remains intact.

Granted target: v7461, source `f5b9ba7db946f33b8276dbe6a124cd0691462c11` (Ed, 2026-11-04). The coordinator granted one run of at most15 minutes for the two full-lakes shader variants and a no-lakes baseline, using the existing performance trace driver. A newer live build is not a substitute.

1. Resolve the exact target CI artifact/version and preserve its source/build identity; locate the existing readiness trace driver and pin its bytes and dependencies.
2. Reuse the reviewed `owned-run-watchdog.cjs` kernel-job runner at revision `ab76356e` and its three dependencies, with handles rather than numeric-PID tree killing. Do not modify shared helpers or capture another owner's processes.
3. Prepare fixture, GPU/served-version checks, compile/readiness telemetry, fresh quiet check, bounded phases and cleanup reserve. All pins and gates go in a READY manifest; unknown pins mean NOT READY.
4. Validate only the preparation's syntax/static/pure checks. No browser, GPU, heavy measurement, full suite, service or spend is started during preparation.
5. Post exact READY or an exact unresolved gap. Actual execution requires root's serialized allocation after READY review, prior-owner FREE and fresh quiet evidence. After one bounded run, post a public summary and SLOT DONE. No run retries or product changes are inferred.

Readiness walls include polling delay and are not compiler CPU. This work makes no speed, visual or runtime claim before an allocated measurement. Root owns coordination; no personal polling loop.

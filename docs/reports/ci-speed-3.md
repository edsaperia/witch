# CI speed 3 measurements

Builder PR #1617; inbox #1615. No assertions, test timeouts or game behavior changed.

## Completed baselines

All numbers below are from completed GitHub job/step timestamps, including job setup/cleanup. Envelope starts at workflow creation (the available push-event timestamp proxy); runner-minutes sum actual started jobs, excluding skipped jobs. These are CI workflow figures only: independent Art check/Pages workflows are not silently included. Queue is measured from dependency completion to job start.

| Run | Kind | Complete CI envelope | Started jobs | Runner-minutes | Unit test execution spread | Unit checkout spread | Check checkout |
|---|---|---:|---:|---:|---:|---:|---:|
| [41262925514](https://github.com/edsaperia/witch/actions/runs/41262925514) | Original audit reference | 24m16s | 10 | 63.58 | 178–515s | 76–99s | 91s |
| [41305026644](https://github.com/edsaperia/witch/actions/runs/41305026644) | Same prototype source fe62217, ordinary PR, real benchmark | 13m01s | 10 | 64.82 | 187–445s | 66–109s | 69s |
| [41307420147](https://github.com/edsaperia/witch/actions/runs/41307420147) | Documents-only PR; full units, unchanged-game benchmark path | 17m01s | 10 | 54.65 | 230–473s | 64–180s | 82s |

The last baseline is the appropriate comparison for this CI-only PR's unchanged-game benchmark path. The same-source run supplies 601 cloud per-file timings; it is not passed off as a matched end-to-end comparison because its browser benchmark actually ran. Queue conditions differ substantially: build/unit/check queue on the original reference was 87s / 231–280s / 281s; on the documents-only baseline it was 17s / 246–319s / 3s. Do not attribute queue variation to source changes.

## Implementation and pending measurements

Unit checkout depth is two: a normal tested PR merge contains the event base and head parents. A real Git fixture proves the module-only related selection works at depth two and falls back to the full suite at depth one. If an older event base is absent or merge-base resolution fails, existing conservative full selection remains. Check work needs no history and uses checkout's default depth one.

Reporting/checked-tree fixtures, relay tests and typecheck retain their commands in parallel check-work. The final required check keeps its name and contains only explicit success checks for build, unit, check-work and main publication. It has no checkout, dependency installation or tests. This adds one started CI job (10 to 11 on equivalent ordinary PR runs); any extra gate queue is included in the final envelope rather than assumed free.

Cloud unit artifacts now retain successful Vitest JSON reports in addition to ordinary output/annotations. Refresh committed timings with node tools/ci/unit-timings.mjs followed by downloaded shard report paths; use --source RUN_URL --ci-log LOG for a completed historical run. Unknown files are still assigned, never omitted. Revised largest-first packing balances total measured work, replacing the old objective that could hide extra heavy files underneath a long file. Cloud comparison remains required before an acceptance claim.

No completed after envelope is available yet. Initial plan-only run was cancelled by the implementation push and is excluded. Pending results are not improvements. All 601 currently enumerated files map to exactly one of the four revised shards (148/151/151/151 files); summed measured work is 1124.021/1124.057/1122.752/1123.368 seconds. These are packing diagnostics, not actual shard wall times. The 405-second packs.test.ts file remains a potential lower bound: balanced work cannot promise identical shard duration.

First shallow-checkout checkpoint [41331902079](https://github.com/edsaperia/witch/actions/runs/41331902079): shard 3 checkout 17:37:06–17:37:10 UTC (4s), shard 1 checkout 17:37:33–17:37:36 UTC (3s). Both meet the under-15s target. These completed steps are valid checkout evidence, not a completed CI envelope.

## Duplicate release runs: deferred on safety grounds

The existing exact-tree/environment artifact certifies successful Art check results, not CI's unit/typecheck/relay/smoke/benchmark gates. A CI PR tests a synthetic merge, while a push tests its commit. The same head tree does not identify the PR comparison base or establish a full-suite result (ordinary module PRs may run related tests). Benchmark expectations also depend on the branch, and smoke consumes a stamped generated artifact. Reusing a successful Art check or matching a head SHA cannot certify those distinct inputs.

A safe whole-CI reuse protocol would need provenance for the actual tested tree, workflow/test selection, environment, benchmark base/expectations and build inputs, emitted only after all relevant gates succeed; it would also need orchestration across jobs owned by #1614/#1583. Seconds-apart runs cannot reuse an unfinished proof. Implementing that broad protocol is not a small safe unit/check change, so duplicate CI remains intact. No gates are skipped or marked green from insufficient proof.

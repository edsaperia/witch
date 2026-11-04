# CI speed 3 PLAN

Task #1615; coordinator #1476 comment 6561288633. Branch codex/ci-speed-3; worktree work/ci-speed-3; starting HEAD fe62217eb01bbd92900ec10b9082b7777064eba5.

1. Shallow unit/check checkouts with conservative incomplete-history fallback; measure against 15 second target.
2. Parallel existing typecheck/reporting/relay work, tiny strict final check, preserving main publication ordering.
3. Refresh committed cloud per-file timings and balance with prior #1592 contention accounted for. Preserve all assertions, coverage and timeouts.
4. Inspect exact-tree/environment proof contract for duplicate-release reuse; explain deferral if no simple safe change. Coordinate other owners through canonical coordinator.
5. Report completed comparable envelopes including queue, job counts and worker-minutes; baseline 41262925514 is 24m16s. No partial or estimated improvement claims.

Nearby local tests and typecheck use one worker; full CI cloud. No local browser/art/full-suite allocation, release, prototype/main pushes.

Initial finding: existing duration balancing is opt-in after cloud contention/timeout; do not simply enable it unchanged. Art/proof jobs remain owned by #1583/#1614.

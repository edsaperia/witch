# Brief: CI speed 3, the required-check critical path

Ed (1 Nov 17:2x): **"prioritise speedups and then multiplayer."** Ed (1 Nov, earlier): "the infrastructure we have is fine, we're just not being very efficient with it". So this means no new services or runners: make the existing GitHub Actions CI faster end to end.

Evidence: the existing-infrastructure audit on #1588 (comment 6552455375, 1 Nov 02:41). Measured on #1582's CI run 41262925514, the 24m16s envelope is essentially build → slowest unit shard → final check:

| step | queue | execution |
|---|---|---|
| build | 85 s | 70 s |
| slowest unit shard | 275 s | 623 s (515 s tests, **99 s checkout**) |
| final check | 280 s | 120 s (**91 s checkout**, 21 s typecheck) |

## Do, in this order (measure each)

1. **Checkout cost.** `unit` and `check` in `.github/workflows/ci.yml` use `fetch-depth: 0` (full history). Find out what needs history (the unit-scope / related-tests diff?), and fetch only that: a shallow clone, plus just the merge-base or the base ref's tip when needed. Target: under 15 s per checkout.
2. **Don't serialize the final check behind all shards.** Run typecheck, the config/tool tests and anything else that doesn't need the unit results as its own job **in parallel with the shards**. Keep a tiny strict combined-status gate at the end (no work in it, just "all required jobs succeeded"), so branch protection and `pubdirect.sh` still see one `check`.
3. **Balance the unit shards by measured duration.** Shard test time ranged 178–515 s. Use recorded per-file durations (committed and refreshable) to pack the shards evenly. Report the new spread.
4. **Same-source duplicate runs.** A release pushes `claude/prototype` and opens a publish PR for the same tree seconds apart, and both run full CI (e.g. 41262141042 and 41262145488). Make one of them reuse the other's result when the tested tree is identical, keeping the existing exact tree + environment proof-matching safety. If that can't be made safe simply, skip it and say why.
5. **Queue time** (275–513 s waits) comes from the account's concurrent-job limit. Fewer, better-packed jobs help more than more parallelism. Report the job count per run before and after.

## Rules

- No change to what any test asserts. No skipped tests. Green must still mean the same thing.
- Report **completed, comparable end-to-end envelopes** (PR push → last required job green, queue included) before and after, on the same kind of PR. Not partial or estimated numbers.
- It must work with #1583 (art-check shards) and #1614 (proofs in CI), which also touch CI. Coordinate on `ci.yml` through the coordinator. Don't edit their jobs.
- Speed-ups are released first and alone (standing rule).

Protocol: PLAN first, then build, then FINAL with before/after envelopes.

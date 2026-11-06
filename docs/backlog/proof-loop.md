# Faster proof loops

Lessons from the paused-means-still fix (#1598, shipped in v6887 on 1 Nov 2026). The fix itself was small. The loop around it took about two hours: eight proof runs, 10:36 to 12:34 UTC. This page lists what slowed it down and what to change. Item 1 has an inbox (see below). The other items are process changes for the coordinator and builders.

**Audit status (2026-11-05): Partly built: proofs run in CI with a cached baseline and saved diffs; the other items are process rules or not built.** (1 Nov audit: index line only, no table.) **Built** means code is present.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| 1. Run headless proof scripts in CI | **Partly built** | #1614 (released as 1101l, #1625): `tools/ci/run-proofs.cjs`, `tools/ci/proofs.json`; fast pause/Settings holds on PR builds, settled pixel comparisons in `.github/workflows/proofs-nightly.yml`. Only `paused-world` is declared CI-safe so far; other headless proofs are not CI jobs. |
| 2. Agree the acceptance bar before the first run | — | Process rule for the coordinator and builders, not code. Unbuilt context. |
| 3. Tracing built into proofs (images, diff, pixel trace) | **Partly built** | #1614: the nightly repaint proof keeps PNGs, the diff and a pixel trace (`PAUSE_TRACE_PIXELS`) as artifacts. Not yet every proof. |
| 4. Hunt the whole class when a proof finds one cause | — | Process rule, not code. Unbuilt context. |
| 5. Measure the baseline once, cached by SHA | **Built** | #1614: `tools/ci/build-proof-baseline.cjs` builds and caches the baseline by exact SHA and reuses its result; the fast PR mode needs no baseline. Related: #1835 (release v7564) reuses a whole successful release validation for an identical tree; #1857 fixes the bench base. |
| 6. Safe reusable proof runner for the coordinator (own PID files, refuses a second run) | — | The CI runner exists; no local runner with PID files and a single-run lock found in `tools/`. |

## What slowed it down

1. **Every proof went through the coordinator.** Builders on Windows couldn't run the headless browser proof (`tools/smoke/paused-world.cjs`). Each round was: builder pushes, coordinator rebuilds and runs (4–5 min), coordinator posts results, builder fixes. That's 10–15 minutes a round, mostly spent waiting on messages.
2. **One cause per round.** The exact-pixel repaint test found the causes one at a time: foliage dither, light glows, coast fade, texture re-uploads, art arriving while paused, and finally the witch vanishing on a second repaint. Pixel tracing (which object drew each differing pixel) only arrived in run 4.
3. **Coordinator tooling mistakes.** About 20 minutes were lost. Three runs killed themselves because `pkill -f` matched the script's own command line. Twice, two copies ran at once.
4. **Repeated baseline.** Every run re-measured the unchanged live build for a full minute.
5. **The acceptance bar moved.** The coordinator first asked for art to be frozen while paused, then dropped it once Ed asked whether it mattered. That should have been settled before the first run.

The strictness did pay off once: the exact repaint comparison caught a real bug where the witch vanished from a paused screen that repainted twice.

## What to change

1. **Run proof scripts in CI** (inbox: *Inbox: run proof scripts in CI*, brief `docs/plans/proof-ci.md`). Any proof that runs headless (SwiftShader is fine for correctness, not for timing) becomes a CI job, so builders see the result on every push without waiting for the coordinator. Laptop runs stay for real-GPU timing and two-machine multiplayer only.
2. **Agree the acceptance bar before the first run.** Write down what must match exactly, and what is allowed and recorded (e.g. art finishing loading during a pause), in the plan before any proof runs.
3. **Build tracing into proofs from the start.** On a mismatch, every proof should save the images, the diff and the object/material/uniform trace for the differing pixels.
4. **When a proof finds one cause, hunt the whole class.** E.g. after the first wall-clock leak, audit every render path for `performance.now`, `Date.now`, frame counters and `Math.random` at once, instead of one per round.
5. **Measure the baseline once.** Cache the live build's result by its SHA and reuse it.
6. **A safe, reusable proof runner for the coordinator.** It takes arguments, tracks its own server PIDs in files (no `pkill -f` on patterns that appear in its own command line), and refuses to start if another proof is running.

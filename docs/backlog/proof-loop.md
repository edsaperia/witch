# Faster proof loops

Lessons from the paused-means-still fix (#1598, shipped in v6887 on 1 Nov 2026). The fix itself was small. The loop around it took about two hours: eight proof runs, 10:36 to 12:34 UTC. This page lists what slowed it down and what to change. Item 1 has an inbox (see below). The other items are process changes for the coordinator and builders.

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

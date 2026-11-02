# One shared, still capture harness (coordinator, 2026-10-31, from Ed's 48-hour review)

Cloud screenshots (SwiftShader, 960×540) have cost hours today and settled little:
- first screenshots take about 50 s (Playwright's 30 s default timed out);
- black frames swap between builds;
- **the frame changes on every `view.render` call even with the game clock frozen**, so OFF/ON comparisons are undecidable (#1543 refraction, 3 runs).

Each PR then writes its own driver.

#1543's builder found per-call mutations at head 580fcb83:
- camera hill-clearance `camLift` in `src/render/view/camera.ts:162` eases `.35/.06` **per call, without dt**;
- `View.render` eases `canopyNow` by `.08` **per call**;
- `loadingMist` follows wall time, not game time.

It also wrote a test-only `tools/refraction/capture-hold.cjs`, which renders the prepared scene through `Post.render` with updates held. The cloud rerun on 580fcb83 (results due about 19:00 UTC) says which resources really change.

## Do
1. **Fix the frame-rate dependence in the game itself.** Any easing that runs per render call without dt makes the camera and canopy move at different speeds on 60 Hz and 144 Hz screens. Make `camLift`, `canopyNow` and any other per-call easing the drift diagnostics find **dt-based** (same feel at 60 fps). Drive `loadingMist` from game time if it's part of the world, or keep wall time if it's a loading overlay, but make it holdable for captures. Unit-test each one: two calls at the same time, no change; the same total dt in 1 vs 4 steps, the same result.
2. **Shared harness** in `tools/shots/`, built on what exists (`tools/shots/push.mjs`, #1543's `capture-hold.cjs`, `foreground.cjs`, the cloud runners' freeze scripts on `claude/refraction-1543-review`):
   - one function to load a build, check its served version, and freeze (manual stepping, seeded random, pinned clocks);
   - a warm-up screenshot and a 120 s timeout;
   - a hold-still render for OFF/ON/OFF-return comparisons that **asserts OFF-return == OFF**;
   - a mask helper (actor removed);
   - a diff helper (pixel count, max, bbox, amplified PNG, side-by-side).

   Migrate #1543's and #1542's drivers to it once their PRs land (not during their review).
3. Document it in `docs/notes/testing.md` so builders write a 20-line scenario, not a 300-line driver.

## Rules
- Production rendering may change **only** for item 1 (frame-rate independence), with a bench declaration if frames move.
- Owns: `src/render/view/camera.ts` (the easing lines only), the `View.render` easing lines, `loadingMist`, and `tools/shots/*`. Coordinate with #1543 (refraction) and #1545 (dodge echoes) on view.ts. Their capture-only tools stay theirs until they land.

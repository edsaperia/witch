# Shared still capture harness: implementation plan

Assignment: canonical #1476 comment 6547335419, full brief in #1555
(`codex/ops-inbox` d119c80f), 2026-10-31. Ed: “make a plan… then do everything
on it. Use codex wherever possible. Do everything in parallel that can be done
in parallel.” Owner: chat 01a18d4a-9d53-72b2-a6ed-ce68c4e64e56, branch
`codex/capture-harness`, isolated `work/capture-harness`.

## Current checkpoint and finite gate

The finite implementation gate OPENED with canonical6547931572: the #1543 rerun
on exact580fcb83 completed and its resource-drift findings landed. That run was session
`session_018uvzSLocq4FtBSmPmAvHfK`, results expected at
`previews/refraction-1543-review/foreground-580fcb8/`. Root centralwatch delivers
the actual result; this builder creates no idle monitor. Completion of that
named rerun opens implementation; no additional undefined permission is required.
Both old review holds subsequently opened for assigned repairs: #1543 is now
e75c8f8b and #1545 is8b1f1d7e. This task keeps its own branch/commits independent.

No browser, build, bench or other heavy local run is allocated here. Latest
canonical1476#6547931247 stops Claude builders/cloud runners and requires each
Codex builder's own headless capture in a canonical laptop slot: prior FREE,
Ed idle>=5min/no game tab, bounded<=270s, SLOT DONE. Ask after the repair is pushed.
No unallocated local/cloud assumption; small nearby unit checks only so far.

## Problem and accepted scope

SwiftShader's first screenshot can take about 50 seconds, exceeding Playwright's
30-second default. Repeated full View.render calls also mutate an otherwise
frozen scene, making an OFF/ON difference indistinguishable from background
drift. Per-PR drivers duplicate staging, version checks, freezing and analysis.

Production changes are limited to frame-rate independence: camera hill-clearance
camLift, View.render canopyNow, loadingMist holdability, and additional per-call
easing only if the named diagnostics identify it. No shader/style redesign,
refraction/dodge behavior change, gameplay, collision, potion or art rewrite.
Own only camera.ts easing lines, View.render easing lines, loadingMist and
tools/shots/*. Keep other owners' additive View/Post changes intact.

## Implementation sequence after the gate

1. Read the actual rerun diagnostics and current prototype. Establish which
   resources change per call; distinguish confirmed changes from hypotheses.
   Preserve the current prepared-scene capture hold as diagnostic evidence.
2. Replace fixed per-call relaxation with elapsed-time relaxation. For a constant
   target, use k(dt) = 1 - (1 - k60)^(60*dt), retaining k60=.35/.06 for camera
   rise/fall and .08 for canopy. Specify first-frame, island/reset and rewind
   initialization explicitly. Repeated timestamps must not advance it. Avoid
   arbitrary delta clamps that invalidate equal-total-time partition behavior.
   Keep camera/canopy clock selection consistent with their existing consumers;
   test pause/slowtime rather than silently changing clock ownership.
3. Classify loadingMist: it is a loading overlay, so wall-time animation may stay
   the production default. Expose a narrow capture hold for its clock/state if
   needed; do not make a loading veil depend on a paused simulation. Any newly
   identified easing receives the same narrowly scoped treatment.
4. Add one shared tools/shots harness using existing machinery: served-build
   verification against requested SHA, manual stepping, seeded random and pinned
   clocks; asset readiness; warm-up screenshot; explicit 120-second screenshot
   timeout; prepared-scene redraw; OFF/ON/OFF-return with decoded pixel equality
   asserted for OFF-return. Keep caller-owned page/runner allocation separate
   from scenario definition. Always restore hooks, actors, clocks and visibility
   on success and failure; reject nested holds and accidental clock advancement.
5. Add actor-removal masking over the held scene. Do not rely on mesh.visible
   across a full View update (SpriteBatch.set makes it visible again). Return
   raw images plus trustworthy metadata, not a foreground-pass claim from an
   approximate bounding quad.
6. Add decoded PNG diff results: differing pixel count, maximum channel delta,
   bounding box, amplified PNG and side-by-side. Assert frame dimensions/build
   consistency and reject unexplained OFF-return drift. Version-label exclusion
   must be explicit and recorded, never a whole-frame visual approximation.
7. Document the API and a small scenario in docs/notes/testing.md. Generate tool
   inventory/notes index as required. A builder should write about 20 lines for
   a scene while the shared harness handles capture correctness.
8. Migrate #1543 and #1542 drivers only AFTER their owning PRs land. Until then,
   their capture-only tools stay owned by those PRs. Do not copy/move them during
   review. This is a deferred migration condition, not an implementation gate
   for the independent shared API.

## Checks and handoff

- Meaningful easing tests: repeated time is identity; equal total elapsed time
  in one versus four steps agrees for a fixed target; a 1/60-second step matches
  old coefficients; rise/fall, first/reset/rewind and pause/slow clocks covered.
- Capture tests: actual production updates are bypassed only during hold, Post
  redraw still runs, teardown restores inherited and own render descriptors,
  masks/clock overrides restore after a failure, version mismatch/drift rejected.
- Diff fixtures: identical pixels, one changed pixel, alpha/dimension cases,
  maximum delta and bounds are exact; PNG-byte equality is not pixel equality.
- Typecheck, nearby tests with one worker and node tools/config/check.mjs before
  production pushes. No full suite/art/smoke/browser/heavy local work without
  canonical allocation. Declare that frames move where dt replaces per-call
  easing; provide a bench declaration and leave the allocated measurement to
  canonical. Do not claim performance or visual acceptance from unit tests.

Report exact branch/SHA, changes, checks and limitations on this task's PR and
root #1476. Keep default-off review flags untouched. No merge/release authority.

## Implemented checkpoint

renderEasing.ts and the owned camera/View lines use her interpolated elapsed
clock. A new night initializes a one-60Hz-frame first step; repeated/rewound
timestamps advance zero. .35/.06/.08 coefficients are preserved at1/60s; the
canopy terminal snap is after the step, at most one60Hz frame earlier near1m.
uGlowR is derived from projection (not another accumulator); scenery budget
already uses real dt. Loading mist keeps its intended loading-overlay wall clock,
holdable through pinned clocks/prepared-scene capture. Other owners' rig/lighting
policies are untouched; the four iPos resources are not silently rewritten.

Shared still/pixels/headless/run modules and small dodge/refraction scenarios are
implemented. They do not move/rewrite the still-owned1543/1542 drivers. True
OFF-return equality, masks/diffs and cleanup are tested with tiny fixtures/fake
pages; no actual browser launched.23 focused tests and local typecheck pass.
Bench declaration and usage are in docs/notes/testing.md. Hardware/pixel/feel/cost
acceptance, CI and allocated real captures remain pending. Workspace/global usual
Playwright and ms-playwright caches were absent. Prepared SDK-only playwright1.64.1
in ignored work/capture-runtime with install scripts disabled, no browser download
or launch. Installed Chrome/Edge binaries exist; canonical can name an existing
Chromium-family executable in the slot evidence. No Ed browser/profile is reused.

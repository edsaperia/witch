# Paused means still

Plan on prototype fd834e1fb. Ed saw pointers continue to pulse while paused (1 November 2026).

Keep the last world picture behind a mid-night pause. Update pause controls, Settings, pad navigation and HUD independently of the draw decision, including the landing-sleep path. Retain chart and zoo precedence and the explicit flight transition. On the start screen draw initially and on visible art or view invalidation (including witch art, resize, quality and context restoration). Drain pending art independently from world submission. Use the same displayed simulation time for both ends of each visual transition, including a forced redraw. Check that time cannot advance across a pause or reset incorrectly across nights.

## Clock audit at the starting revision

- main.ts:1393 — remove periodic redraw. freeze.frozen currently bypasses the throttle entirely.
- view/guidance.ts:154 — move guidance pointer size to game time.
- aimhud.ts:64,66 — move charge-release flash start and expiry together.
- leash/bubbles.ts:78 — move sleeping bubble visibility ease.
- leash/bubbles.ts:108 — move dream bubble visibility ease.
- leash/bubbles.ts:140 — move rotating dream symbol.
- leash/bubbles.ts:145 — move nightmare shake.
- leash/bubbles.ts:276 — move circle smoothing delta.
- leash/bubbles.ts:374 — move target bubble visibility ease.
- leash/bubbles.ts:411 — move invitation bubble visibility ease.
- invites.ts:312 — move invitation sight fade.
- impact.ts:12–45 — move hit deformation stamp and lifetime together. Keep physical frame submission budgets on real time.
- view/camera.ts:228 — move camera smoothing delta.
- view/home.ts:445 — move deck highlight.
- zooExit.ts:26 — move zoo exit glow.
- houseRooms.ts:474 — move selected furniture glow.
- houseRooms.ts:562 — move loan sparkles.
- houseRooms.ts:291,399 — separate shader readiness from visible floor fade. Keep compile completion real, move visible fade phase.
- houseRooms.ts:555 — keep head projection freshness as a real-time validity check.
- ground.ts:935,977 — separate coast readiness from visible coast fade. Hold the fade on forced draws.
- view.ts:1437,1452 — move batch appearance fade and its start stamp together. Show ready art directly on the title screen.
- view.ts:1564 — move visible landing fades, retain real-time readiness deadlines.
- view.ts:1861 — move loading mist drift.
- dream.ts:73–108 — keep the dream overlay's own presentation clock while it owns the screen. Check nested pause so a dream cannot visibly animate beneath a pause page.
- chart/seaChart.ts:685,724 — keep chart flight presentation time on the separate chart screen.
- main.ts arrival flight — retain its explicit transition clock.
- main.ts stations and booth — keep overlay interaction timers live.
- main.ts guidance bookkeeping — keep UI refresh deadlines separate from pin animation.
- app/hud.ts:72 — keep HUD clock-loss CSS feedback as UI.
- Render budgets, allocation/LRU, profiling, queue deadlines, shader compilation, art-worker timing and GPU waits retain real time. Sigils, party waves and other time-fed effects retain their simulation input.

## Ownership and proof

Shared file view.ts is also touched by #1542 (lighting), #1543 (refraction) and #1558 (veil). main.ts and view.ts are targets of the A4 production fence. Seek the coordinator's exact hunk boundary before touching them. Leave those three effect implementations and A4 registry/extraction to their owners.

Test menu updates and world draw counts through the same production decision, title art/view invalidation, and a pointer before/after ten seconds paused including a forced draw and first resumed frame. Compare actual before/after draws per paused minute on a canonical runner. The reported 55 slow frames in 67 s are a baseline symptom, not a count of all draws. No browser measurements yet.

## Implementation and outstanding proof

The draw decision now follows menu updates. Normal pause retains the world, chart and zoo keep their own screens, and the title consumes newly completed art, including witch frames. Resize, explicit quality changes and manual simulation steps can invalidate the retained picture. Loading sleep uses its own presentation time while awaiting the house, because its wake condition requires the house to have finished fading before simulation time can advance.

Guidance size, charge-ready flash, invitation impacts and sight fades, creature bubbles and nightmare shake, selection glow, deck and zoo exit glow, sparkles, batch appearance and loading mist use simulation time. The hitstop submission deadline, chart flight and compilation measurements retain their real clocks.

Camera hill clearance now uses elapsed render game time. Its old 60 Hz rise and fall fractions define the exponential ease, so a second render at the same time leaves the camera in place.

Outstanding clock cases for review on forced redraw are the coast compilation-to-appearance fade (ground.ts / CoastReadiness), the separately compiled room floor and furniture arrival fade (houseRooms.ts), telescope constellation dwell (view/camera.ts), and the nested dream overlay (dream.ts). Keep their readiness, interaction and presentation semantics separate when adapting them. An ordinary held world does not call its renderer. The dream overlay has its own animation callback.

The cloud proof script is tools/smoke/paused-world.cjs. Supply the two served build directories with trailing slashes and their source SHAs. It verifies each manifest, counts actual View.render calls per elapsed minute, operates Settings and the bestiary, samples pin scales and compares same-size paused repaints to the retained frame. Browser results must be recorded separately from the draw-policy and pointer unit tests.

### Cloud run 3 and source trace

Pause held the menu's world picture for a minute and Settings for ten seconds, with zero world draws and the morning pointer's phase held. The baseline drew 31 times per minute in this run. The resize then changed 13,895 of 57,600 pixels, within x = 0–319 and y = 0–170. Bestiary was not reached.

The foliage edge dither is ordered in sprite space. The ground blend uses spatial noise. Bedroom lantern flicker reads the supplied render time. None of those expressions increments a seed on draw. A verified upstream difference is camera placement consuming the previous witch draw's house offset; the first render writes a new offset for the next one. Reuse the original input when presenting the same simulation instant. Also stamp lighting time before CPU edge sparkles read it, and use the landing presentation clock for room floor and furniture arrival fades (including the async compilation stamp). Identifying which submission produced a particular changed pixel still requires runtime evidence.

On a cloud diagnostic run, PAUSE_TRACE_PIXELS=1 records world/effect submissions that change three discrepant screen pixels, foliage (116,55), bedside (160,77) and blue-white (217,88). A mismatch writes pixel-submissions.json beside the PNGs. The trace runs only during sampled candidate frames. Its GPU readbacks are for attribution, not timing.

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

### Run 4

At identical render time and witch time, the island draw changed colour at (116,55), the witch batch contributed white only in the held frame at (160,77), and the napwolf contributed white only on repaint at (217,88). An object disappearing from a sample does not distinguish a different frame from a different position, projection, texture or depth result.

The napwolf sleep frame uses render time and creature ID. The witch's wakes, bob and sprite cycles use wake state and witch time. The creature batch's real-time stamp is for GPU eviction; the witch's asynchronous bare-art request is an asset warmup. The island shader mixes spatial noise, sampled textures, light uniforms and game-time effects. Its deferred coast appearance was a genuine wall-time exception. Only its visible fade now uses game time; actual shader wait diagnostics retain wall time. Whether this coast is present in the bedroom capture needs the recorded material inputs.

The cloud trace adds the glow centre (155,90). For island, witch and napwolf submissions it saves all shader uniforms, texture IDs/versions, camera view/projection, object transform and active instance attributes (including positions and atlas UVs) even when none of the four probe pixels is hit. The comparison can now distinguish an input change from an identical draw over a different underlying pixel.

A second confirmed update path is independent of animation time. Each world draw called workAhead, which drains pending floor art into the island material's atlas and fills missing area tiles, and swapHomeArt could assign newly completed witch art to the existing batch. A forced mid-night repaint at the already displayed simulation step now skips both operations. It still renders and reprojects the world. Title art arrivals, landing readiness, a manually advanced step and live play keep their usual work. The cloud comparison must establish whether these updates contributed to the observed pixels.

### Run 5 and repaint acceptance

The baseline drew 34 times per paused minute. The candidate drew zero during pause and Settings. On a forced repaint the art version advanced from 16 to 31, with 793 changed pixels inside (204,78)–(251,139), inclusive. The coordinator accepted art arrivals on forced repaints. Compare every RGBA byte when the version is unchanged. When it changes, record both versions, the changed-pixel count and bounds, then continue to the bestiary. The same rule applies to the second forced repaint. Run 5 stopped before the bestiary.

### Run 6

After closing Settings the runner explicitly dispatches two separate same-size resize events, waiting for exactly one draw after each. The first repaint gained art (16 to 31, 790 pixels). The second repaint at version 31 changed 21,757 pixels. The ordinary witch batch submitted one instance on the first draw and had no recorded submission on the second. Camera matrices and the recorded island glow uniforms matched. Run 6 did not record the bare batch or its bound atlas.

The witch renderer previously cleared its ordinary batch whenever the independent hatless art job became ready. That job does not increment the scenery art version, and a retained repaint does not run swapHomeArt to replace a prewarmed batch's transparent placeholder. Retained repaints now use the last submitted witch instances, including their hat state. A live draw may switch to the ready hatless atlas. The regression exercises readiness changing between two retained submissions and the switch after play resumes.

Crown clearance uses witch-time deltas, and string wind and twinkle use shader time. The new trace includes crown inputs and both witch batches, even when a batch has zero instances, to distinguish secondary colour changes. No independent crown clock cause established.

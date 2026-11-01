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

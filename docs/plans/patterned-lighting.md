# Patterned lighting: first slice

Ed authorized implementation of visual-response-projects section 4 on 2026-10-31, then confirmed: “start with the first slice, and then evaluate these other ideas”. This is light texture/projection, not section 5 material/normal redesign or a new potion engine.

## Delivery

One soundsystem with rotating spokes, sweeping stripes and layered colour bands; one gentle irregular light; one ring-pattern spell. Share a light-local world-position function through the existing lighting shader, preserving ordinary lights, palette/soft-knee treatment, light-budget selection and existing shadow paths. Reuse the real BeatClock (including tempo ramps); the existing music mix spectrum is available but no new analyser or instrument feed is needed for this slice.

Start with at most three patterned existing light slots, not extra point lights. Broad, low-contrast slow motion by default; reduce-flashing disables modulation exactly. An explicit off comparison must restore original light values. No gameplay/collision or authored art changes.

## Ownership before integration

Request canonical approval for narrow additions in lighting.ts, view/lights.ts and ForestLight metadata, source selection in view/home.ts and existing spell-light slot writing in fx/system.ts. Do not change creature art/rig owners (#1470/#1532), potion/audio owner (#1536), house/worker/kitchen owner (#1526), or multiplayer owner (#1538). Independent lightPatterns math/tests can proceed while those boundaries are confirmed.

## Validation and review

Focused one-worker tests plus typecheck: anchoring at common world contacts, source translation/rotation, exact off/comfort identity, bounded colour modulation and absolute beat timing across tempo ramps. CPU tests and shared source do not prove GPU shader acceptance or measured performance.

Canonical must allocate the exact-SHA runner. Capture ground and treetop views, moving creatures across bands, camera motion, two overlapping selected sources, budget-edge transitions, all three soundsystem looks, spell rings, flicker, off and reduce-flashing comparisons. Record shader compilation, source SHA, renderer, seed/world/scene, viewport/pixel scale, light counts, CPU/GPU frame medians/p95, fragment cost and any extra uniforms/textures. Expected: no extra point lights or textures; cost remains UNMEASURED until run. No local browser/cloud allocation inferred.

After this first slice has evidence, evaluate broader signal routing, trip controls, overlap staging and richer projection against receiver consistency, readability/comfort and measured cost. Do not implement those further features without their decision. Keep normals/material redesign, new analysers, per-instrument routing, new shadows and unrelated backlog projects deferred.

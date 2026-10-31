# Travel performance 2 (brief)

STATUS 2026-10-31: PR #1498 shipped milestones 1–2, included in v6478: ground feature families/coast demand and worker path/height preparation. Current evidence and its limits are in [performance notes](../notes/performance.md). Milestones 3–4 (background precompile and chart pre-draw) remain deferred until separately assigned; this brief does not authorize starting them. House first-show work was assigned separately to #1507.

From Ed's efficiency decisions (2026-10-30 14:40 UTC). Work on this branch, `codex/travel-perf-2`; report on its draft PR. Background: #1464 (sleep-until-alarm landing, per-kind lake shaders), shipped as v5936.

In this order, one milestone at a time, each with a PLAN if it's over about 30 lines:
1. **Ground-shader extras split.** Extend the per-kind family split to the zoo street and plaza, dancefloor, pavement, the legend-floor loop, koi and bare mode, so an island compiles only the features it has. Also stop compiling the beach twin before the coast is needed (it was 16.5 s on Intel). Same proof as the lake split: zero-pixel parity across all combinations, plus the forced/zoo/debug all-features views.
2. **Island build off the main thread.** Move paths and heights into the existing map-prep worker. Explain the 0.7–0.8 s task after `witch:build-forest` and the 640 ms `HouseRooms.update` from your Intel trace, and fix them if they're cheap.
3. **Background shader precompile.** Precompile the next islands' ground programs **only while she's in the treehouse or on the map** (Ed's rule), and pause the moment she leaves. Reachable islands only, nearest first.
4. **Chart pre-draw.** Same rule: today `warmChart` draws all 65 islands during play. Make it draw reachable islands only, and only while she's in the treehouse or on the map. The map still opens instantly, with islands rising in as they're drawn (that already works).
Measure each step on the Intel laptop with prepared headless slots. Fast machines must be unchanged.



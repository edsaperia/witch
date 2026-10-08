# tools/rig

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `demo.cjs`

The live rig's demo: serves the built game, loads it in headless Chromium with ?rig=1 and an arena, starts it, and saves screenshots every STEP seconds of game time for SECS seconds to previews/rig-<name>-<n>.png, then a strip of them side by side.

## `legends.cjs`

Sleeping-legend strips: the built game in headless Chromium: for each of SPECIES, its legend in the debug arena made a sleeping area legend, the camera ZOOM steps in, the crop LIFT metres above its feet; a row of: asleep, a nightmare, woken happy, and…

## `perf.cjs`

The live rig's cost: COUNT wild creatures, stepped frame by frame at a fixed 1/60 s for FRAMES frames with the rig off and then on, timing the view's own work for the creatures and the whole frame's JS.

## `strip.mjs`

The live rig's frame strips: a creature put together by the rig from its baked parts through a scripted run, composed and lit like the game's sprites, one frame every STEP seconds, in rows: previews/rig-strip-<species>.png.

```
node tools/rig/strip.mjs wolf,snake [level] [scale]
```

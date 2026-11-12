# Sail, then take-off: the 5.5 s freeze (Ed, 2026-11-12 18:30, live v7872)

Ed: "Just had a very long freeze when taking off from the treehouse after a sail".

From his playtest recording (decoded by the first builder, not committed: it holds his machine details):
- v7872 · 1edc03c. He started on home, seed 81808 (settings changed: treeNormals "32", spells.hats "", spells.bag "satchel").
- He sailed by the map table's chart to raven, seed 864794, in place (the dive path).
- About 80 s after arriving, at raven game time 8.07 s, he went from the treehouse floor up to the treetops. One frame took 5,484 ms, of which 5,433 ms was the view's draw (shadow map plus main render, src/render/view/frame.ts); the rules took 3 ms.
- Intel UHD on Direct3D 11, Chrome 157, Windows.
- The boot's build log has all four warm-up stages: compile, textures, test draws. After the sail, the log has only the night's build, the warm stage and the grass tufts.

Leading theory (not verified):
- On a sail, prepare takes its dive path: `compileAll(sail, underDive=true)` in `src/render/view/readiness.ts` runs before the house and forest exist, and the later warm-up steps are skipped.
- The draw gate (`src/render/shaderDrawGate.ts`) skips materials without a program while the sail's compiles are pending, so those are never compiled then.
- Each then compiles on the main thread the first time it's drawn. The treetop crowns are hidden on the ground, so take-off is their first draw.

`sail-takeoff-repro.cjs` is the first builder's reproduction script. It loads home 81808, sails to raven 864794 through the map table's chart (the real dive path, not `window.witch.sail()`, which takes the full warm-up path), arrives, wakes and takes off, recording a CPU profile and frame timings. It needs `quick=1` for the start card, and a machine that isn't overloaded: the first try couldn't finish loading in 8.5 minutes on a load-70 machine.

## Measured (2026-11-12, the cloud's software renderer, `sail-takeoff.cjs`; the first builder's script folded into it)

Programs made at take-off are the measure: every frame there takes about a second, so a frame's time alone doesn't separate a compile from an ordinary draw.

- **Sail, before:** 2 programs in the first treetop frame; that frame 2,486 / 2,718 ms against about 1,000 ms either side, 1,380 / 1,590 ms of it in `getProgramParameter` (the link's wait). The take-off's CPU profile: 1,589 ms in `getProgramParameter`, everything else small.
- **No sail, before:** 1 program (the first below), with 4.6 to 4.8 s of the link's wait (two runs sharing the machine).
- **What they were** (found by wrapping `renderBufferDirect` and diffing three's program keys):
  1. The house's walls and roofs seen from the air (`HouseRoomsView.mat` after `setApproachDepth(preview)`, `render/treehouseLook.ts`): opaque and depth-tested on her first rise off the house, a variant no program twin held. Made at take-off **with or without a sail**.
  2. The sigil stack's sharp-mask material (`maskOf`, `render/leash/glyphs.ts`), drawn by `Post.drawSharp`, never from the scene. The boot's warm draws make it; the dive path has none, and the last night's program was released with that night's materials.
- **The leading theory, refuted here:** no treetop-crown material was uncompiled before take-off. Three hidden decal materials were (`decor decals`, `decor sceneDecals`, an unnamed mesh), which would compile when first shown, not at take-off.
- **After** (`Post.compile` compiles the sharp masks into the mask's own target; a twin for the walls' variant; `View.warmAfterHouse` on the dive path): **0 programs** and no compile, link or `getProgramParameter` call at take-off, with or without a sail. The first treetop frame was 1,240 ms against 900 to 1,300 ms either side. The warm-up made 1 program after the house and 2 more after the tufts (two of the decals); the third decal, the unnamed mesh, is uncompiled on a fresh load too.
- **Not verified:** Ed's Direct3D 11 machine. There, ANGLE may also build shader variants on an object's first draw, which the boot's warm draws cover and the dive path still skips. If a freeze is still there, the L log's slow-frame entries now say how many programs and textures that frame made (`gpu: { programs, textures }`).

## The sail's other long tasks (Ed's recording: 2.9 s and 3.5 s)

- **2.9 s while the night was made under the chart:** making the night's game (`witch:prep` to `witch:game`), the rules' world generation (the rules bundle's map and paths, `meander` among them): 3.5 s here on a quiet machine. It's one call in the rules; it would need slicing or a worker. Not fixed.
- **Between those, on this renderer only:** the dive's `compileAll` waiting in `isReady` (`getProgramParameter` of the completion status) for every program at once, 4 s (39 s with the machine shared). With real parallel compiling, that check doesn't wait.
- **3.5 s on the first frame after the hand-off:** the frames after `chart:go` here (5 to 7 s tasks, before and after the fix alike) are mostly synchronous GPU readbacks: the tufts' bake reading back its canvases (`getImageData` in `GrassView.bake`, on canvases made by `art/`), the GPU memory guard's `getError` after uploads (`GpuLedger.checkIfAllocated`, `render/view/gpuBudget.ts`, where the frame pays for the queued uploads), the tree normals' banded `readPixels` (`render/treeNormalDirs.ts`; Ed has `treeNormals "32"`), and the sea chart's `toDataURL` (`render/chart/seaChart.ts`). None is cheap and safe to change here; the tufts' readback (a `willReadFrequently` canvas in `art/`) is the likeliest small win, but it touches the art.

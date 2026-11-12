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

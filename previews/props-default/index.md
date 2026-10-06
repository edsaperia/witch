# Should `?props=gen` be the default? Evidence for Ed

**Build:** claude/prototype **c40eaffd** (includes the fen, #207's bridges and #214's fingerposts), built once and served headless.

**Setup:** headless Chromium at 1280×720, at night with the normal camera, waves off. Each pair is the same seed and the same spot, **off on the left and `?props=gen` on the right**. The script is `compare.cjs` in this folder.

## What `?props=gen` changes

The prop generator draws seeded variants, three shapes of each, in place of the hand-made props:

- **Areas' props:** standing stones, cairns, pools, broken stumps, fallen logs, fungi rings, henges (as stone circles), boulders and mounds.
- **Party decorations:** bunting, balloon bunches and paper lanterns.
- **Path crossings:** footbridges, rope bridges and root bridges.
- **New:** fingerposts where footpaths come into a clearing.

The set pieces (punt, jetty, ring, heap) are already on without the switch: the fen uses the punt.

## The views (seed 123)

| | view | what differs |
|---|---|---|
| 1 | `pair-1-home.png`, home after she stands up | Nothing visible. Home's props are its own party pieces, and at wave 0 there's no generated bunting near. |
| 2 | `pair-2-moor.png`, the moor near its centre | The biggest change. The hand-made moss mounds are tall shapes that fade as she passes. The generated ones are low, round moss mounds, so the moor reads lower and darker. The hand-made pools are thin blue strips; the generated pools are dark water with a broken shore and glints. |
| 3 | `pair-3-fern-forest.png` | Nothing visible: its props are ferns and trees, which the generator doesn't touch. |
| 4 | `pair-4-pool.png`, a moor pool | As view 2, up close: blue strips become dark pools among low mounds. |
| 5 | `pair-5-bridge.png`, a footbridge where a path crosses a stream | The hand-made footbridge with rails becomes a generated X-braced footbridge, at the same size. |
| 6 | `pair-6-fingerpost.png`, the first footpath's clearing end | No post here: the rules skip a post closer than 40 m to another piece, and this spot was one of those. A verified in-game fingerpost (on an earlier map) is `../art-review/props-ingame/fingerpost-props-gen.png`. |

## Performance (seed 922199, the ravine from the treetops, Ed's scene)

`perf-off.json` and `perf-on.json` cover 300 frames stepped at 1/60 s and drawn, with screenshots `perf-ravine-treetop-*.png`. The numbers are from software rendering (swiftshader), so only the on/off comparison means anything.

| | frame, median | frame, p95 | draw calls, median / max | scenery drawn | art still queued |
|---|---|---|---|---|---|
| off | 479 ms | 2061 ms | 80 / 85 | 2891 | 27 |
| `?props=gen` | 479 ms | 1908 ms | 80 / 85 | 2898 | 27 |

**No measurable cost.** Draw calls are the same, and the scenery count is within 0.3%. Load to ready took the same time, about 30 s for this seed and 55 s for seed 123, in both.

## Known gaps if it were the default

1. **The moor's look changes the most.** Its mounds go from tall to low and round, and on a dark moor many dark-green mounds can read as bushes. Ed should judge this one by eye.
2. **Fingerposts:**
   - 252 on seed 123's map, about one per clearing. Many stand beyond the playable edge, as other path pieces do.
   - At night, outside her light, a post is small and dark, so it reads only up close.
3. **Not generated yet; these stay hand-made:**
   - stream water strips and gnawed stumps;
   - reeds, ferns, small stones, flower beds, hedges, walls and rock walls;
   - the tall pieces: pillars, spires and stalagmites;
   - the relic party objects (a DECISION FOR ED on #191).
4. **Pool outlines:** #218 (bulges and coves on the set pieces' pools) has merged since this build (c40eaffd), so the pools in these shots predate it. It only affects the set pieces.
5. **Checks:** `node art/check.mjs` covers every generated kind. Neither smoke test has been run with `?props=gen` on (CI's quick smoke runs the default game). These runs had no page or console errors.
6. **Bake time:** three shapes of each kind mean more sprites to bake per area type. That made no measurable difference here (art queued 27 in both).

## Turning it on

It's a small flip in `src/main.ts`: `?props=gen` becomes the default, and `?props=hand` gets the hand-made props back. If a PR for it exists, it's marked DECISION FOR ED and won't be merged without his OK.

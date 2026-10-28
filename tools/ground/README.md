# tools/ground

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `area-frames.cjs`

The ground's area texture before and after a change to it: the built game shot at the same spots with the same camera, a fixed 1/60 s at a time, waiting for the art: a night's area borders on the ground and from the treetops, the dancefloor's ring, a pond,…

```
npm run build && node tools/ground/area-frames.cjs [out dir]   DIST=dist SEED=123 ISLAND=fox ONLY=night,lakes,zoo WAIT=240
```

## `ground-sheet.mjs`

The ground's sheet: a row per area, its floor laid 4 x 2 as the game lays it, a column per style; with --variants, its four variants side by side instead, each once.

```
node tools/ground/ground-sheet.mjs <out.png> [area,...|all] [column,...] [scale] [--variants]
```

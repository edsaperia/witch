# tools/dj

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `booth-sheet.mjs`

The DJ booth as the game layers it: the treehouse round its studio, her DJ frame stood with its ground anchor on the seat anchor, the DJ table's fore frame over her, then her frame's upper layer over that; one cell per gesture frame, at scale 4, the…

```
node tools/dj/booth-sheet.mjs <out.png> [seed: a generated witch instead of ours] [--gif]
```

## `booth.cjs`

The DJ booth in play: the built game at 1280×720 on a seed, waiting for the party spell behind her decks, frames stepped by hand a fixed 1/30 s.

```
npm run build && node tools/dj/booth.cjs [out dir] [seed]
```

## `strip.mjs`

The witch's DJ frames: every frame of every gesture, for our witch and a few generated witches, at scale 5, each over its row's label; under each, the frame's upper layer tinted, to check the cut.

```
node tools/dj/strip.mjs <out.png> [seeds, e.g. 3,8]
```

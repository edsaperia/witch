# tools/dj

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `booth-sheet.mjs`

The DJ booth as the game layers it: the treehouse round its studio, her DJ frame stood with its ground anchor on the seat anchor, the DJ table's fore frame over her, then her frame's upper layer over that; one cell per gesture frame, at scale 4, the…

```
node tools/dj/booth-sheet.mjs <out.png> [seed: a generated witch instead of ours] [--gif | --needle]
```

## `booth.cjs`

The DJ booth in play: the built game at 1280×720 on a seed, waiting for the party spell behind her decks, frames stepped by hand a fixed 1/30 s.

```
npm run build && node tools/dj/booth.cjs [out dir] [seed]
```

## `candles-sheet.mjs`

The knockdown candles: every melt level and flicker frame, white and red, at scale 8, then the booth as the game layers it along the front edge of the studio's terrace at four moments of the wait, at scale 3: 6 white, 12 and 24.

```
node tools/dj/candles-sheet.mjs <out.png>
```

## `respawn.cjs`

A knockdown's wait at the decks in play: the built game at 1280×720, the party spell cast at once, she steps off, is hit till she's knocked out, then is filmed frame by frame at a fixed 1/30 s from going down to free: her hat, the teleport, her scratching…

```
npm run build && node tools/dj/respawn.cjs [out dir] [seed]
```

## `strip.mjs`

The witch's DJ frames: every frame of every gesture, for our witch and a few generated witches, at scale 5, each over its row's label; under each, the frame's upper layer tinted, to check the cut.

```
node tools/dj/strip.mjs <out.png> [seeds, e.g. 3,8]
```

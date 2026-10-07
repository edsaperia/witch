# tools/art-style

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `capture.cjs`

Frame strips of the pixel-art styles in play: serves the built game, loads it at 1280x720 with ?style= and ?px=, starts, flies along the ground through the nearest wooded area, rises and flies over the treetops, and saves the six frames as one strip per…

```
npm run build && node tools/art-style/capture.cjs <out dir> [now/3,bold/4,bold/5,ref/4,ref/5] [seed]
```

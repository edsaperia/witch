# tools/feel

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `trace.cjs`

Frame feel: drives the built game frame by frame on a scripted display schedule through the real loop's own path, and measures where things land on screen, in screen pixels as drawn: the witch, the ground under her flight and the nearest creature.

```
npm run build && node tools/feel/trace.cjs [seed] [area] [out dir]
```

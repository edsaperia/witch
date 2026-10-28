# tools/telescope

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `moon.cjs`

The moon through the telescope: the built game at 960×600, seed 123, the moon moved on to full, the telescope aimed at the moon's bearing and panned across it and tilted through it, each frame's moon on the screen and a contact strip of the frames as…

```
npm run build && node tools/telescope/moon.cjs <out dir> [seed]
```

## `shots.cjs`

The telescope: the built game at 1280×800, seed 123 after three waves, stepped at a fixed 1/60 s.

```
npm run build && node tools/telescope/shots.cjs <out dir> [seed]
```

# tools/shot

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `contrast.cjs`

The picture's contrast: what nothing lights against what's lit.

```
npm run build && node tools/shot/contrast.cjs [out dir]   (SEED=542195, LINK= more of the link, UNLIT=1,0.75,0.6,0.5,
```

## `crown-gap.cjs`

The Terrace's gap in the great oak's crown, measured.

```
npm run build && node tools/shot/crown-gap.cjs [out dir] (SEED=160271, SCENES="at:3166,2850,treetop|...", SIZE=1280x720, DIST=dist)
```

## `crown-look.cjs`

The great oak's crown's look, a mock for Ed: from the built game, the same views with the crown's knobs set live.

```
npm run build && node tools/shot/crown-look.cjs [out dir]   (SEED=160271, SIZE=1900x1240, ROOM=parlour, WARM=1, AS=,
```

## `crown-whole.cjs`

The oak's crown whole over the Terrace, or with its gap: the same frames with the switches on and off, for the report.

```
npm run build && node tools/shot/crown-whole.cjs [out dir]   (SEED=160271, SIZE=1280x720, DIST=dist, LINK= more of the link)
```

## `motes.cjs`

The sigils' motes, measured: from the built game on the playtest's island, each kind of mote drawn on and off at the same moment, and what it adds to the drawn picture read off its pixels, over a few moments of its motion: embers the embers rising off four…

```
npm run build && node tools/shot/motes.cjs [out dir]   (SEED=542195, LINK= more of the link, SIZE=1106x743, MOMENTS=6, DIST=dist,
```

## `pixels.cjs`

How crisp the pixel art reaches the screen.

```
npm run build && node tools/shot/pixels.cjs [out dir]   (SEED=542195, LINK= more of the link, SIZE=1106x743, DPRS=1,1.25,1.5,
```

## `playtest-render.cjs`

Capture the five chain poses and three near/far night mushroom colours on an allocated headless renderer slot.

```
node tools/shot/playtest-render.cjs <served-url> <expected-sha> <output-dir> [chains|stumps|mushrooms]
```

## `shot.cjs`

A builder's quick proof shot: one picture of a room, an area, a creature or a find in the built game, in a minute or two on the cloud's software renderer.

```
npm run build && node tools/shot/shot.cjs <scene> [out.png] [more of the link]
node tools/shot/shot.cjs object:dressingTable previews/shot/dressing.png
node tools/shot/shot.cjs find:hat:sentry previews/shot/sentry.png own=none
node tools/shot/shot.cjs creature:fox@1 previews/shot/fox.png zoom=0
```

## `stump-diagnostic.cjs`

Record the seed-123 wild stump's art, shader gate, instance counts and visible pixels in the allocated capture session.

```
node tools/shot/playtest-render.cjs <served-url> <expected-sha> <output-dir> stumps
```

## `wisps.cjs`

The wild stumps' wisps: from a built game, her a little south of the nearest wild stump, on foot and from the treetops, a few moments apart as the wisps drift; and the light they add, read off the drawn picture with the wisps on and off at the same moment:…

```
npm run build && node tools/shot/wisps.cjs [out dir]   (NAME=after, DIST=dist (a build of the base for NAME=before), SEED=542195,
```

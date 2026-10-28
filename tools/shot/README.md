# tools/shot

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

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

## `shot.cjs`

A builder's quick proof shot: one picture of a room, an area, a creature or a find in the built game, in a minute or two on the cloud's software renderer.

```
npm run build && node tools/shot/shot.cjs <scene> [out.png] [more of the link]
node tools/shot/shot.cjs object:dressingTable previews/shot/dressing.png
node tools/shot/shot.cjs find:hat:sentry previews/shot/sentry.png own=none
node tools/shot/shot.cjs creature:fox@1 previews/shot/fox.png zoom=0
```

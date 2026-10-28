# tools/shadows

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `prop-light-shots.cjs`

Shadows from the soundsystems' and runestones' own light: the built game at 1280×800, stepped at a fixed 1/60 s, her on foot just south of the nearest soundsystem and of the runestone nearest home, her own glow's shadows off so the shadows are the…

```
npm run build && node tools/shadows/prop-light-shots.cjs <out dir> [seed]
```

## `scenery-shots.cjs`

Scenery's shadows from her glow: the built game at 1280×800, stepped at a fixed 1/60 s, her on foot just east of a scene's piece, a set piece, a decor piece, a runestone and a soundsystem, each shot with them and without, coloured, without the taper and…

```
npm run build && node tools/shadows/scenery-shots.cjs <out dir> [seed]
```

## `trunk-cover.cjs`

The trunks' shadows on the grass and flowers, and their cost: the built game at 1280×800, stepped at a fixed 1/60 s, her on foot 7 m east of a tree in a wooded area next to home, so its shadow falls west over its grass and tufts.

```
npm run build && node tools/shadows/trunk-cover.cjs <out dir> [seed]
```

## `trunk-walkup.cjs`

The trunks' shadows as she walks up to a trunk: the built game at 1280×800, stepped at a fixed 1/60 s, her on foot east of a tree in a wooded area next to home, at 16, 8, 4 and 2 m from its trunk.

```
npm run build && node tools/shadows/trunk-walkup.cjs <out dir> [seed]
```

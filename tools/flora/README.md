# tools/flora

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bush-sheet.mjs`

The undergrowth's sheet: each bush kind a row, a few seeds in each column, a column per style, lit under the previews' studio light at the game's screen scale.

```
node tools/flora/bush-sheet.mjs <out.png> [column,...] [scale]
```

## `leaf-jitter-shots.cjs`

Each tree's own leaf colour: the built game at 1280×720 on a seed, at three spots of the home island, each from the treetops and from the ground, the same frame shot with the jitter off, at the tuning's numbers, and at twice them; and the measurements…

```
npm run build && node tools/flora/leaf-jitter-shots.cjs <out dir> [seed]
```

## `species-sheet.mjs`

Before-and-after sheets for the tree migration onto the blob generator: each species a row, a sapling, a mature and a tall tree in each column group, lit under the previews' studio light at the game's screen scale.

```
node tools/flora/species-sheet.mjs <out.png> <species,...|all> <column,...> [scale]
```

## `tuft-sheet.mjs`

The tufts' sheet: a row per area, a column per style, lit under the previews' studio light.

```
node tools/flora/tuft-sheet.mjs <out.png> [area,...] [column,...] [scale]
```

## `vignette.mjs`

Before-and-after vignettes for trees in the open areas: for each area, a small scene of its own floor, its walls and small pieces, its big pieces and its set piece as the art draws them today, then the same with the proposed trees added.

```
node tools/flora/vignette.mjs <spec.json> <out dir> [scale]
```

# tools/flora

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bush-sheet.mjs`

The undergrowth's sheet: each bush kind a row, a few seeds in each column, a column per style, lit under the previews' studio light at the game's screen scale.

```
node tools/flora/bush-sheet.mjs <out.png> [column,...] [scale]
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

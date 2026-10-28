# tools/biomes

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `sheet.mjs`

The biome looks' contact sheet: a row per biome, each on a floor of one of its areas, lit by the game's night: three shared species in its look, then four of its own species in its look, then a 3 x 3 patch of its own crowns as the treetops see them; then…

```
node tools/biomes/sheet.mjs <png> [scale]   (MODE=trees, the default; canopy: the treetops; blends: border islands; ground: the tufts and the decor's rocks; rings: each biome at rings 3, 4 and 5's strengths; areas: a real
```

## `shots.cjs`

The biome looks in play: the built game at one spot, every area's trees in each biome's look, shot on foot and from the treetops.

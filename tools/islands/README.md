# tools/islands

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `chart.mjs`

The archipelago from above: for each world, the chart's layout today beside the new one, at one true scale: each island's patch outlined, and its land.

```
node tools/islands/chart.mjs [--worlds 0,1,2] [--outlines] [--out previews/islands/chart.png]
```

## `map.mjs`

Islands from above: for each phase and seed, the island's land and coast, its lakes, its playable areas' middles, its runestones and the sea round it, at one scale so the sizes compare; with how long each took to make.

```
node tools/islands/map.mjs [--phases 0,1,2,3,4,5] [--seeds 1,2,3] [--out previews/islands/phases.png] [--set path=value;...]
```

## `sheet.mjs`

Every kind's island as a dream bubble draws it and as the sea chart's path, from its coastline with the islands' coast knobs, its phase from the kinds table where the rosters have it.

```
node tools/islands/sheet.mjs <out.png> [--amp 0.3] [--harmonics 4] [--detail 0.35]
```

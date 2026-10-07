# tools/relics

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `map.mjs`

The legend relics on the map, from above: for each seed, an SVG of the areas, home's area and circle, the legends' clearings and the relics, each with its kind and its nearest neighbour's distance; and, with --sweep N, a check of seeds 1..N, printing any…

```
node tools/relics/map.mjs [--seeds 123,922199] [--out previews/relics] [--sweep 200]
```

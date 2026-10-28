# tools/forest

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `border-map.mjs`

A patch of forest from above, each tree, bush and ground-cover tuft a dot in its look's colour, the exact borders drawn in white, for a before and after: The blend width defaults to the tuning file's; 0 is no blend at all.

```
node tools/forest/border-map.mjs <seed> <x> <z> <size m> <out.png> [blend width m]
```

## `border-stats.mjs`

How the planting mixes across area borders: for the trees within 40 m of a border, the share in their neighbour's look by distance from it, and how clumped the strays are.

```
node tools/forest/border-stats.mjs [seed] [stray]
```

## `border.cjs`

A border between two areas, on the ground and from the treetops: Loads the built game on that seed, walks out from the dancefloor due east until the area under her changes for the nth time, puts her on foot on that border, lets the forest grow and…

```
node tools/forest/border.cjs <dist dir> <seed> <out prefix> [nth border]
```

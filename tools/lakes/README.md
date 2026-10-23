# tools/lakes

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `leylines.mjs`

How often the ley line crosses a lake: for each phase and seed, the route's links between runestones in wave order, how many cross a lake's water and for how far.

```
node tools/lakes/leylines.mjs [--phases 1,2,3,4,5] [--seeds 1,2,3,4,5,6]
```

## `looks-map.mjs`

Which biome lakes each island has: for every playable kind's island, its lakes, each lake's look, size and middle.

```
node tools/lakes/looks-map.mjs [--world 0] [--kinds a,b]
```

## `looks.cjs`

Biome lakes in play, MOCK, shot from the built game: Each entry is a look or kind:look@x,z.

```
node tools/lakes/looks.cjs [dist] [seed] [phase] [out dir] [looks,comma,separated]
```

## `shots.cjs`

Lakes in play, shot from the built game: Loads it on that seed and phase, puts her on foot by a lake, shoots the shore from the ground; walks her at the water; rises, shoots it from the treetops over the water; asks her down over the water and flies her…

```
node tools/lakes/shots.cjs [dist] [seed] [phase] [out dir]
```

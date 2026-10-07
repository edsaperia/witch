# tools/map

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `leycurve.mjs`

The ley line's curvature, before and after: for each seed, the whole route from above, then close-ups at the stones where the straight line turned sharpest: straight against curved, the stone white, the minimum radius as a dashed circle for scale.

```
node tools/map/leycurve.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-curve] [--close 4] [--at k,...]
```

## `leydepart.mjs`

The ley line leaving home, close up: for each seed, the 360 m round home from above: the dancefloor, its ring of speakers and the line's clearance round them, the treehouse, the first link and the next few in wave order, each stone a dot.

```
node tools/map/leydepart.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-depart] [--route varied]
```

## `leyroute.mjs`

The ley line's route from above, today's against the spiral: for each seed, the whole route through every area in wave order, the varied order beside the spiral, the line from blue to pink, home the yellow dot, each crossing ringed red; under them,…

```
node tools/map/leyroute.mjs [--seeds 1,2,3,123,4242,925469] [--out previews/ley-spiral]
```

## `shape.mjs`

The map's shape from above: for each seed, the square map and the circular one side by side at one scale: the playable areas in their type's colour, the buffer ring grey, the forest past her flight's edge dark; her flight's edge, the runestones, the…

```
node tools/map/shape.mjs [--seeds 1,123,925469] [--out previews/map-shape]
```

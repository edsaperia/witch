# tools/beach

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `approach.cjs`

The camera as she nears the sea: Loads the built game, puts her on foot 260 m in from the north coast and walks her north: screenshots at 200 m and 100 m from where she lies down at the water's edge, at it, and lying stargazing, into…

```
node tools/beach/approach.cjs [dist dir] [out prefix]
```

## `check.cjs`

The beach: its cost in an ordinary run, and a look at it.

```
node tools/beach/check.cjs [dist dir] [--shots]
```

## `gaze-gif.cjs`

Lying down to stargaze on the beach, the sky opening up: Loads the built game and puts her on the sand by a beach witch, keeping still: they chat, hold hands and hug, then lie down to stargaze together.

```
node tools/beach/gaze-gif.cjs [dist dir]
```

## `map.mjs`

The beach from above: the island, its sand round the coast at its width there, the rocky stretches, and the decorations.

## `spot.cjs`

Stargazing at an exact spot: Loads the built game on that seed, puts her on foot at, pushes her straight out toward the nearest edge until she lies down to stargaze, waits for the view to settle and screenshots it; prints the area the overlay names there…

```
node tools/beach/spot.cjs <dist dir> <seed> <x> <z> <out.png>
```

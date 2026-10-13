# tools/beach

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `approach.cjs`

The camera as she nears the sea: Loads the built game, puts her on foot 260 m in from the north coast and walks her north: screenshots at 200 m and 100 m from where she lies down at the water's edge, at it, and lying stargazing, into…

```
node tools/beach/approach.cjs [dist dir] [out prefix]
```

## `bearings.cjs`

The stargazing camera round the coast: Loads the built game once and, for each of the twelve bearings of beach.camera.bearings, puts her on the sand there, walks her out until she lies down to stargaze, lets the view settle and screenshots it as…

```
node tools/beach/bearings.cjs <dist dir> <out dir> [seed]
```

## `check.cjs`

The beach: its cost in an ordinary run, and a look at it.

```
node tools/beach/check.cjs [dist dir] [--shots]
```

## `dolphins-sheet.mjs`

The east coast's dolphins: every leap frame and splash frame at scale 8 on a night sea, then a leap's arc laid out at game scale: splash, the frames along the arc, splash.

```
node tools/beach/dolphins-sheet.mjs <out.png>
```

## `dolphins.cjs`

The east coast's dolphins in play: the built game at 1280×720, her set down on the sand of the east coast facing the sea, then 24 s stepped a fixed 1/30 s, lying down to stargaze half way.

```
npm run build && node tools/beach/dolphins.cjs [out dir] [seed]
```

## `gaze-gif.cjs`

Lying down to stargaze on the beach, the sky opening up: Loads the built game and puts her on the sand by a beach witch, keeping still: they chat, hold hands and hug, then lie down to stargaze together.

```
node tools/beach/gaze-gif.cjs [dist dir]
```

## `kraken-sheet.mjs`

The west coast's kraken: every tentacle and head frame on a night sea with a moon road, at scale 3, then a scene at game scale: three tentacles at different frames round its head.

```
node tools/beach/kraken-sheet.mjs <out.png>
```

## `map.mjs`

The beach from above: the island, its sand round the coast at its width there, the rocky stretches, and the decorations.

## `spot.cjs`

Stargazing at an exact spot: Loads the built game on that seed, puts her on foot at, pushes her straight out toward the nearest edge until she lies down to stargaze, waits for the view to settle and screenshots it; prints the area the overlay names there…

```
node tools/beach/spot.cjs <dist dir> <seed> <x> <z> <out.png>
```

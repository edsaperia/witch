# tools/sail

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bed-shots.cjs`

A sail ending in bed: the built game loaded at home, then sailed in place to another island, the page's own loop running through the flight in, a picture every EVERY seconds, each logged with the flight's and the wake-up's state; then, landed, the alarm…

```
npm run build && node tools/sail/bed-shots.cjs [out] [dist]
```

## `leak.cjs`

Sails in place without growing: serves the built game, loads island A with ?quick=1&creator=0&debug=sail, starts it, then sails A→B→C→A… fifteen times through the real sail path, each landing, its art let in, then a few drawn frames and about 5 s of play…

```
node tools/sail/leak.cjs [out dir]   ISLANDS=home,fox,wolf SEEDS=123,4242,777 SAILS=15 WARM=9 TOL=2 DIAG=1 (each landing's scene objects listed)
CHECK=<leak.json> node tools/sail/leak.cjs   (a saved run checked again)
```

## `swap.cjs`

The view taking another night in place, checked against a fresh page: serves the built game, loads seed A with ?debug=sail&quick=1&creator=0, starts it and steps a little, then swaps to seed B in place and steps B as the bench's boot scene does; separately…

```
node tools/sail/swap.cjs [out dir] (default previews/sail/)   A=123 B=165272 ISLAND_A=<island> ISLAND_B=<island> STEPS=60 SAIL=1
```

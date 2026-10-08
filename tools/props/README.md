# tools/props

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `ingame.cjs`

In-game screenshots of the prop generator: serves the built game, loads it in headless Chromium at 1280x720 with extra query parameters, starts, puts the witch on the ground in the nearest area of the given type, lets the creatures come out, and saves a…

```
npm run build && node tools/props/ingame.cjs <area> <out dir> [query] [seed]   (the shots are ingame-ground.png and ingame-treetops.png)
```

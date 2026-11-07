# tools/prebake

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `bake.mjs`

The art bake: draws the sets the art workers would draw in the player's browser on a first visit, as a build step would, and measures them: how many, how big as shipped, how long to draw.

```
node tools/prebake/bake.mjs [--out .art-baked] [--workers N] [--list] [--measure] [--only <kind,...>] [--islands <id,...>] [--limit N] [--extra <island>=<asks.json>,...]
```

## `coverage.cjs`

What a real first visit asks of the art against what the bake has: loads a build in headless Chromium, records every set the game's AssetLibrary asks for for a while, and reports which of their cache keys the bake's report lists, by kind.

```
node tools/prebake/coverage.cjs <dist> <report.json|-> "<link query>" [seconds] [out.json]
```

## `lightUniforms.cjs`

The night's lighting as the game's sprite shader has it: loads a build in headless Chromium, waits for the fade, and writes every number and vector uniform of a scenery sprite material and the metres an art pixel.

```
node tools/prebake/lightUniforms.cjs <dist> <out.json>
```

## `page.ts`

The art bake's page: lists every set the art workers can be asked for that depends on nothing chosen in play, by asking the game's own AssetLibrary for each island of the first world with its ask recorded instead of sent, then draws the sets in the game's…

## `treeQuant.mjs`

How small the baked tree sets get with fewer colours and normals: a measurement and a picture, nothing shipped.

```
node tools/prebake/treeQuant.mjs <bake dir> <uniforms.json> <out dir> [sample=30]
```

## Also here

- `bake.html`

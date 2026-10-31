# tools/attacks

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `audit-report.mjs`

Writes the attack-system audit report from its collected evidence.

## `audit-screen.mjs`

Screens attack audit deliveries and records their evidence.

## `audit.mjs`

One bounded audit job; current rules only, no renderer/browser or balance edits.

## `census-proposal.mjs`

Static proposal only: expands the existing frozen survey.

## `compile.mjs`

The composable attacks into what the game reads today: each attack in config/attacks.json that the old runtime can run, compiled to its flat record and written into config/combat.json's `attacks` block in place; and the grammar's schema written to…

```
node tools/attacks/compile.mjs           (--check: say what would change and exit 1, writing nothing)
node tools/attacks/compile.mjs --from-legacy   (once: write config/attacks.json from combat.json's records, variants on a base)
```

## `deliveries.mjs`

Which attacks fire in play, and how: a bot night on an island, each wild or enraged creature's attacks counted as they're thrown.

```
node tools/attacks/deliveries.mjs [--runs home:533531,squirrel:615594,ibex:542195] [--world 1268398697] [--found squirrel,hedgehog] [--time 900] [--bot skilled]
```

## `strip.cjs`

Attack strips: the built game in headless Chromium, an arena, the camera zoomed all the way in on the ground; when a creature starts winding up a blow, FRAMES frames every STEP seconds of game time, cropped round it and what it's after, into one row per…

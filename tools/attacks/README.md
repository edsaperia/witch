# tools/attacks

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `compile.mjs`

The composable attacks into what the game reads today: each attack in config/attacks.json that the old runtime can run, compiled to its flat record and written into config/combat.json's `attacks` block in place; and the grammar's schema written to…

```
node tools/attacks/compile.mjs           (--check: say what would change and exit 1, writing nothing)
node tools/attacks/compile.mjs --from-legacy   (once: write config/attacks.json from combat.json's records, variants on a base)
```

## `strip.cjs`

Attack strips: the built game in headless Chromium, an arena, the camera zoomed all the way in on the ground; when a creature starts winding up a blow, FRAMES frames every STEP seconds of game time, cropped round it and what it's after, into one row per…

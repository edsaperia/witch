# tools/config

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `linkSwitches.mjs`

The link switches as data: every ?name=value the game reads from its link is a record in config/link-switches.json, and docs/LINK-SWITCHES.md is written from it.

```
node tools/config/linkSwitches.mjs           refresh each record's readIn from the code, then rewrite docs/LINK-SWITCHES.md
node tools/config/linkSwitches.mjs --check   say what's out of step (as the test does), change nothing
```

## `schema.mjs`

The config schemas: writes and checks config/schema/*.schema.json and the knob reference config/KNOBS.md.

```
node tools/config/schema.mjs --check     validate the config files against their schemas
node tools/config/schema.mjs --docs      rewrite config/KNOBS.md from the schema and the notes
node tools/config/schema.mjs --init      (re)infer every schema from its file as it stands, with TUNING_OVER and CONFIGS' records and choices
node tools/config/schema.mjs --add       add the knobs the file has and the schema lacks (inferred), drop the ones it no longer has, keep the rest
```

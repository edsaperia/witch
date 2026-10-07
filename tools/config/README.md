# tools/config

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `schema.mjs`

The config schemas: writes and checks config/schema/*.schema.json and the knob reference config/KNOBS.md.

```
node tools/config/schema.mjs --check     validate the config files against their schemas
node tools/config/schema.mjs --docs      rewrite config/KNOBS.md from the schema and the notes
node tools/config/schema.mjs --init      (re)infer every schema from its file as it stands, with TUNING_OVER and CONFIGS' records and choices
node tools/config/schema.mjs --add       add the knobs the file has and the schema lacks (inferred), drop the ones it no longer has, keep the rest
```

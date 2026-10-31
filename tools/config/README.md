# tools/config

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `check.mjs`

Read-only config/docs freshness gate, run before CI's shared build; every failure keeps its exact fix command.

```
node tools/config/check.mjs
```

## `format.mjs`

Stable tuning JSON: one leaf setting per line, small numeric vectors inline, original key order.

```
node tools/config/format.mjs --check
node tools/config/format.mjs --write
```

## `generated.mjs`

Inventory maintained generated products, their inputs and consumers; include a read-only writer scan for discovery.

```
node tools/config/generated.mjs --write
node tools/config/generated.mjs --check
node tools/config/generated.mjs --writers
```

## `knob-docs.mjs`

The tuning file's notes into data.

```
node tools/config/knob-docs.mjs [--from <tuning.json with notes>] [--dry]
```

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
node tools/config/schema.mjs --docs      rewrite config/KNOBS.md and the tuning schema's descriptions from config/knobs/*.json
node tools/config/schema.mjs --init      (re)infer every schema from its file as it stands, with TUNING_OVER and CONFIGS' records and choices
node tools/config/schema.mjs --add       add the knobs the file has and the schema lacks (inferred), drop the ones it no longer has, keep the rest
```

## `typegen.mjs`

Derives the tuning data's static type from the schema; validation stays in schema.mjs --check and tuningSchema.test.ts.

```
node tools/config/typegen.mjs --write
node tools/config/typegen.mjs --check
```

## Also here

- `format.test.ts`
- `inventory.test.ts`
- `typegen.test.ts`

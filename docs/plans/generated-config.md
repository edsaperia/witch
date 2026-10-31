# Generated config docs and one-setting-per-line tuning (architecture items A1 + A2)

Ed approved both on 2026-10-30 (architecture review). Owner: one Codex builder. Inbox: this branch's draft PR. Protocol as usual: PLAN first, then milestone REPORTs, then FINAL. Ask with QUESTION. The coordinator combines, checks and publishes.

## Why

- `config/tuning.json` had 194 commits in the last 7 days. Each setting change rewrites dense lines (e.g. the whole `map.shapes` array sits on one line), so concurrent branches conflict and diffs are unreadable.
- Generated files are committed by hand: `config/KNOBS.md`, the schema descriptions in `config/schema/*.schema.json`, and `docs/notes/INDEX.md` (and similar). They drift, and builders hand-merge them.
- `src/rules/tuning.ts:537` `export const TUNING: Tuning = raw as Tuning;` is an unchecked cast. A typo or wrong-typed knob in tuning.json is only caught where it's used.

## A2: one setting per line (do this first; it's mechanical)

1. A formatter (`tools/config/format.mjs`, `--check` and `--write`) for `config/tuning.json`, and for any other config JSON where it helps (your call; list them). Rule: every leaf setting on its own line. Short arrays of numbers (e.g. `[0, 0]`, colours, ranges) may stay inline. Arrays of objects get one object per block. Keys keep their current order. Output must be byte-stable (running it twice changes nothing).
2. Reformat the files in ONE commit with no value changes, and prove it: a test that parses before and after and deep-equals them.
3. Add `--check` to the existing config test or CI step so an unformatted file fails with the exact fix command.
4. Timing: ship the reformat in a quiet window. Before pushing the reformat, check open branches that touch tuning.json (`git log`/diff against each open `codex/*` branch) and list them in your REPORT. I'll schedule the merge.

## A1: generate, don't commit

1. Inventory every committed file that a script writes (KNOBS.md, schema descriptions, docs/notes/INDEX.md, LINK-SWITCHES.md, tools READMEs from `tools/inventory.mjs`, others you find). For each: the generator, its inputs, and whether the site or the game reads it at runtime or build time.
2. For each, propose one of: (a) generate at build/CI time and stop committing it (gitignore plus a build step); or (b) keep it committed but enforce freshness with a `--check` in CI (for files people read on GitHub). Put the table in your PLAN. I expect KNOBS.md and INDEX.md to want (b), since Ed reads them on GitHub, and schema descriptions to want (a) if nothing at runtime needs them committed.
3. Tuning type from schema: replace the unchecked cast with a type derived from `config/schema/tuning.schema.json`, generated into a `.d.ts` or checked by a build-time validator, plus a startup or test-time validation that fails loudly with the knob's path and expected type. No behaviour change: every current knob value must validate unchanged. If a knob fails validation, report it; don't "fix" values.
4. Tests and typecheck. Keep `npm run typecheck` fast.

## Out of scope

No knob value changes, renames or removals; no new settings; no changes to how the game reads settings at runtime beyond validation; no art/worker/cache areas (#1470, #1500 owners); nothing in main.ts beyond a one-line validation call if unavoidable. Ask before any of those.

## Validation

Focused tests with one worker (`--maxWorkers=1`) plus typecheck. The coordinator runs the full suite, smokes and release.

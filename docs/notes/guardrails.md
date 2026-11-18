# Guardrails

<!-- summary: The checks that stop the code getting worse: ESLint, no new import loops in src/, the size ratchet on big files and functions, test honesty (no new raised time limits, retries, module mocks or fixed sleeps in tests), their escapes, and the release's clean-up of bench declarations. -->

Ed's go, 2026-11-15 (items a and g of the quality plan: "All four please", "Yes please"; the brief: "go!"). The code is healthy in places (strict TypeScript, rules never import render or ui), but nothing stopped it getting worse. These checks come before the big split of `stepCombat`, `generateMap` and `fixedStep`, so that split can only make things smaller.
CLAUDE.md keeps one paragraph (**Guardrails**); add to this note, not CLAUDE.md.

All of them (and test honesty, below: `test-honesty`) run in CI's **check work** job on every PR, and `node tools/checks/which.mjs` lists them as builder checks (`config/checks.json`: `lint`, `import-loops`, `size-ratchet`). None of them has a shared baseline file: the loop and size checks compare the change with its merge base, and the lint's few old violations carry a comment on their own line.

## Lint (`npm run lint`)

ESLint 10 with typescript-eslint, `eslint.config.js`. About 75 s locally over `src/` and `tools/` (the promise rules read the types, so most of it is TypeScript loading the project); a builder's check lints only the changed files.

- `src/**/*.ts`, with type information: `no-floating-promises` (a promise nobody awaits or catches; write `void p` for fire and forget), `no-misused-promises` (an async function where a plain callback is expected), `await-thenable`, `no-for-in-array`.
- `src/` and `tools/`, cheap: `eqeqeq` (`== null` allowed), `no-self-compare`, `no-dupe-else-if`, `no-cond-assign`, `no-self-assign`, `no-dupe-keys`, `no-duplicate-case`, `no-unreachable`, `no-loss-of-precision`, `no-unsafe-negation`, `no-constant-binary-expression`, `no-fallthrough`, `use-isnan`, `valid-typeof`, `no-debugger`; `src/` also `no-var` and `no-unsafe-finally`. `tools/voice/pink-trombone/` (vendored) is left out.
- Not used: unused variables and switch fallthrough (tsc's `noUnusedLocals`, `noUnusedParameters` and `noFallthroughCasesInSwitch` cover `src/`); `prefer-const` (dozens of multi-variable `let` lines, no autofix, little gain); `no-unnecessary-type-assertion` (497 hits: churn across every area); `switch-exhaustiveness-check` and `prefer-promise-reject-errors` (noisy, or a behaviour change to fix).
- A violation that can't be fixed safely gets `// eslint-disable-next-line <rule> -- <why>` (or `eslint-disable-line` at the end of the line). A disable that no longer silences anything fails (`reportUnusedDisableDirectives`), so they don't linger.
- Left at the start (2026-11-15): `src/rules/spacing.ts` (the hot path's `x === x` not-NaN test), `src/main.ts` (the first night's `setTimeout(async ...)`), `src/platform/audio/sfxCues.ts` (a dead `else if`: the "ouch" on a hit never plays, as the branch sits under `if (this.primed)`: **a likely bug, left for Ed**, as the lint step changes no sound), `tools/chart/emerge.cjs` (a page-side self-assignment).

## No new import loops (`node tools/checks/loops.mjs`)

Reads the value imports between `src/` files (static `import`/`export ... from`, not `import type`, not an import whose names are all `type`, not dynamic `import()`, not `import("...").T` type expressions), finds the loops (strongly connected groups), and compares with the merge base (`--base <ref>`, default `origin/claude/prototype`; CI checks out the PR merged onto its base and compares with `HEAD^1`, the base, from a two-commit clone deepened by the PR's own commits for their trailers: a full clone cost 1m40s).

- **Fails** if the change adds an import edge inside a loop that the base didn't have: a new loop, or a new edge inside an existing loop (a worse tangle). It prints the new edge, the shortest loop it closes and the group.
- Passes: today's loops; any new import outside a loop; removing imports. Renamed files keep their edges (git's rename detection).
- `--list` prints today's groups. On 2026-11-15: 11 groups. The biggest, 18 files: the combat tangle (`combat.ts`, `combat/hits`, `combat/legend`, `combat/packs`, `combat/targeting`, `combat/teams`, `attacks/combatWorld`, `attackObservation`, `creatures`, `creatureStates`, `growth`, `legends`, `orbit`, `power`, `quest`, `sigilAvoid`, `swarm`, `wildWatch`); then 8 (`game.ts` with challenge, challengeStatues, guestDeck, guestEffects, opening, sigilButton, wakeUp), three of 5 (`map.ts` with islandShape, pathGeometry, paths, zooMap; `movement.ts` with momentum, spacing, combatSpacing, combat/data; `render/view.ts` with four of `render/view/`), one of 3 (leylines, party, pulseRoute) and five pairs (attacks parse/timeline, chains/leash, findSets/finds, musicBanger/musicScore, houseDecor/housePieces). (The brief's 26-file group joins the 18 with the movement/spacing group and `runeOffset`, `lungeMotion`, `combat/actions`; those links are type-only now, or were removed by the dead-code pass.)
  After the big split (2026-11-15, PR #2095): 9 groups. The combat tangle is down to 6 (`creatures`, `creatureStates`, `legends`, `quest`, `sigilAvoid`, `wildWatch`): `growth`, `power` and `swarm` read `combat/data` directly, so `combat.ts` and its phases sit outside every loop. The movement group (5) and the map group (5) are gone: `movementData.ts` (MOVEMENT, FIGHT, `profileOf`), `map/areaTypes.ts`, `map/helpers.ts` and `islandCoast.ts` are leaves, each still exported from where it was.
- How to fix one: import from a file outside the loop; move the shared piece into its own file that imports neither side; or `import type` when only types are needed.
- Sample failure (a throwaway `import "./combat";` in `src/rules/movement.ts`):

  ```
  loops: 1 new import edge inside an import loop since origin/claude/prototype (merge base 1abb91c7e):

    NEW EDGE  src/rules/movement.ts  ->  src/rules/combat.ts
    the loop it closes: src/rules/movement.ts -> src/rules/combat.ts -> src/rules/movement.ts
    in a group of 26 files: src/rules/attackObservation.ts, src/rules/attacks/combatWorld.ts, src/rules/combat.ts, ...
  ```

## The size ratchet (`node tools/checks/size.mjs`)

Big things in `src/` may shrink but not grow, compared with the merge base (same `--base` as above). Tests (`*.test.*`), `.d.ts` and `*.generated.*` files don't count.

- A **file over 800 lines** fails if it has more lines than at the base (so a file growing past 800 fails too). A new file over 800 fails.
- A **function over 150 lines** (a top-level function, a top-level `const f = () => {...}`, or a method of a top-level class, named `Class.method`) likewise. A function moved to another file keeps its size (matched by name anywhere in the base), so a split that moves a big function as it is passes; it fails only if it grows.
- Renamed files are followed.
- `--list` prints everything over the limits. On 2026-11-15: 16 files (`map.ts` 1628, `musicScore.ts` 1430, `render/view.ts` 1428, `main.ts` 1408, `game.ts` 1343, ...) and 29 functions (`generateMap` 1154, `stepCombat` 868, `newBot` 436, ..., `fixedStep` 183).
  After the big split (2026-11-15): `generateMap`, `stepCombat` and `fixedStep` are off the list (`map.ts` 289 lines; `combat.ts` 37; `fixedStep` about 60 lines; every stage and phase under 150), `game.ts` unchanged at 1343.
- How to fix one: put the new code in a new or smaller file or function and call it; or take out as many lines as you add.
- Sample failure (two throwaway lines in `stepCombat`):

  ```
  size: 2 files or functions over the limit grew since origin/claude/prototype (merge base 1abb91c7e):

    src/rules/combat.ts: 1026 -> 1028 lines (limit 800; over the limit it may shrink but not grow)
    src/rules/combat.ts#stepCombat (function): 868 -> 870 lines (limit 150; over the limit it may shrink but not grow)
  ```

## No new module state in the rules (`node tools/checks/moduleState.mjs`)

Added with item d of the quality plan (Ed's go, 2026-11-15): a new top-level `let`, or a top-level collection written after load, in `src/rules/` since the merge base fails, unless its line (or the comment above) says `// module-state: <why>`. Its escape is that comment, not a trailer. The audit, the categories and what it can't see: `docs/notes/module-state.md`.

## Test honesty (`node tools/checks/testHonesty.mjs`)

Ed's go, 2026-11-18 ("do it"), on borrowing three ideas from [interfere-inc/landmines](https://github.com/interfere-inc/landmines) (MIT; Oxlint rules "that keep AI-written code honest"). Borrowed, not installed: it is for Oxlint and we use ESLint; its `no-comments` rule clashes with quoting Ed's rulings in comments (`tools/docs/rulings.mjs` reads them); its `no-test-doubles` is too strict for a game whose tests need stand-ins for WebGL, the DOM and audio.

Three things in a test file that hide a slow or flaky test may fall but not rise. Counted per test file (any `*.test.*` in the repository: `src/`, `tools/`, `server/`), and compared with the merge base (same `--base` as above), so the base is each file's allowance and there is no allowance file to clash on. A file's count that falls needs nothing lowered by hand: the next change is compared with a base that has fewer.

- **Raised time limits and retries.** A limit over the default 60 s on a test, hook or suite (`it("...", fn, 120_000)`, `{ timeout: 120_000 }`), no limit at all (`0`), or one the check can't read as a number (it follows the file's own top-level constants and `+ - * /`); a `retry` option; a `vi.setConfig` that raises `testTimeout` or `hookTimeout` or sets `retry`. A limit of 60 s or less isn't counted.
- **Module mocks.** `vi.mock(` and `vi.doMock(`: the module under test's neighbours replaced. `vi.fn` spies, `vi.spyOn` and `vi.stubGlobal` are not counted.
- **Fixed sleeps.** `new Promise(r => setTimeout(r, ms))` (awaited or kept in a helper), `timers/promises`' `setTimeout`, `scheduler.wait`. A timer that does something (a stand-in worker answering later) isn't one.
- **The global limits**, whatever the base: `testTimeout`, `hookTimeout` or `teardownTimeout` over 60 s, or `retry`, in `vite.config.ts`; a `--retry`, `--testTimeout` or `--test-timeout` flag in `package.json`, `server/package.json` or `tools/ci/run-unit.mjs`.
- Renamed files keep their counts. A count moved from one file to another (a test file split) reads as a rise in the new file: use the trailer.
- Why a script and not an ESLint rule: the ratchet needs each file as it was at the merge base, which a lint rule can't see without an allowance file, and one shared allowance file is what builders clash on (the reason `size.mjs` and `loops.mjs` have none). It parses with TypeScript, as `size.mjs` does; about two seconds over 800 test files.

How to fix one properly:

- A slow test: make it smaller (a prepared game from `src/test/`, fewer steps, one case a test) so it fits 60 s. Never a retry: find why it fails sometimes.
- A module mock: run the real module; hand the code a stand-in through its own arguments or options (the stores take an `IDBFactory`, the Views are built round stand-in parts); or split the pure part out and test that.
- A sleep: await the operation itself or a promise it gives (a promise the test resolves by hand, as `render/viewPrepareHouse.test.ts`'s house); `await vi.waitFor(() => expect(...))` for something that lands soon; `vi.useFakeTimers()` and `await vi.advanceTimersByTimeAsync(ms)` when the code under test runs on a timer (`render/prepareIsland.test.ts`; fake only `setTimeout` and `clearTimeout` when the code reads the real `performance` clock).

`--list` prints today's counts. On 2026-11-18: **205** raised limits in 68 files (`rules/challenge.test.ts` 16, `rules/combat.test.ts` 11, `rules/leyPulseAudit.test.ts` 11, `rules/lakes.test.ts` 10, `rules/challengeStatues.test.ts` 7, `rules/wildWatch.test.ts` 7; no retries anywhere); **37** module mocks in 16 files (`app/chartDemand.test.ts` 9, `app/workerJobHandlers.test.ts` 5, three files of 3); **12** fixed sleeps, all in `server/relay.test.mjs` (a real WebSocket relay, waited on 10 ms at a time: left as it was). The five sleeps in the Vitest suite were fixed with the check: `platform/storageScope.test.ts` (two; they wait for the database opens and the wipe's delete), `platform/online/session.test.ts` (a `turn()` helper; it waits for the guest's "ready", the preparation's own promise and the traced refusal), `render/prepareIsland.test.ts` (fake timers over `whenAsked`'s 30 ms look; it slept 700 ms) and `render/viewPrepareHouse.test.ts` (the house made by a promise the test resolves).

Sample failure (three throwaway lines in `src/rules/naps.test.ts`):

```
tests: 3 counts went up since origin/claude/prototype (merge base 797540b4c); each may fall but not rise:

  src/rules/naps.test.ts: raised time limits or retries 6 -> 7  (now at lines 57, 78, 98, 114, 151, 165, 169)
  src/rules/naps.test.ts: module mocks (vi.mock, vi.doMock) 0 -> 1 (none before)  (now at line 168)
  src/rules/naps.test.ts: fixed sleeps 0 -> 1 (none before)  (now at line 169)
```

## The escape: a commit trailer, reviewed

For a rare case where growth is right, add a trailer to one of the branch's commits (the last line block of its message):

```
Size-ok: src/rules/combat.ts the new attack's table belongs beside the others; the split will move it (coordinator agreed)
Size-ok: src/rules/combat.ts#stepCombat ...
Loops-ok: src/rules/movement.ts ...
Tests-ok: src/render/frameBudget.test.ts measures a real frame, so it waits real time
```

`Size-ok: <file>` excuses that file's line count and its functions; `<file>#<function>` only that function. `Loops-ok: <importing file>` excuses new loop edges from that file. `Tests-ok: <test file>` excuses that test file's risen counts (a test that must measure real time, a test file split in two). The checks read the trailers of the commits since the merge base, so they survive the coordinator's merge into a release (merge commits keep them); a PR body is not read. The coordinator reviews each one: say why in the trailer, and name it in the FINAL. To try one locally without committing: `GUARDRAILS_OK="Size-ok: src/x.ts why" node tools/checks/size.mjs`.

## Bench declarations at release

`tools/release/combine-bench.mjs` (run by `rel.sh`, step 6) combines the released PRs' `tools/bench/expect/<branch>.json` into `tools/bench/expect/claude/release-<n>.json`, which the bench reads on the release PR, and now also deletes what nothing reads any more: the released PRs' own declarations and every earlier `claude/release-*.json`. So after a release, `tools/bench/expect/` holds only that release's combined file and the declarations of branches not yet released.
The one-time clean-up (2026-11-15) deleted 191 files whose branch's PR was merged or closed (and `codex-playtest-1031-rules.json`, a misnamed copy of the merged `codex/playtest-1031-rules`'s); `claude/stump-ground.json` stays (its branch has no PR yet).

## For the coordinator

- A builder's PR red on **No new import loops** or **Size ratchet**: the message names the edge or the file; send it back, or accept a `Loops-ok`/`Size-ok` trailer you agree with.
- `rel.sh` and `pubnow.sh` find the CI build number through `lib.sh`'s `ci_build`, which asks for 100 runs a page (main's commit soon has more than 30: each PR preview's Pages publish runs there by repository_dispatch; release 57 stopped on it) and fails, saying so, when there is none.

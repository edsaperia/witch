# QA log: the overnight programme (2026-10-07)

What QA checked on `claude/prototype` through the night, for the morning report. Each round: `npm test`, typecheck and build at the tip; `bench:quick` on **every merge commit against its first parent** (with the tip's bench), so any change in the rules fingerprint or the shots is pinned to one PR; and the journey (`tools/qa/journey.cjs`: bedroom → decks → step-off → first speaker → boot → countdown → wave one → treetops → legend circle → beach → party's over, failing on page or console errors, blank pictures or a moment that doesn't happen).

Timings are the cloud's software renderer (headless Chromium, SwiftShader, 4 cores): compare them only run to run here, never with a real GPU.

## Baseline: 818c7aec (#349), 00:31–01:49 UTC

- `npm test`, typecheck, build: green.
- `bench:quick`: rules to wave 10, step median 0.96 / 0.92 ms, p99 4.25 / 4.03 ms (seeds 123 / 165272); boot, wave-fight and bedroom settled.
- Full `bench`: no errors.

| | median | p99 | worst |
|---|---|---|---|
| rules to wave 30, seed 123 (2023 creatures), step | 3.6 ms | 9.3 ms | 15.3 ms |
| rules to wave 30, seed 165272 (2033 creatures), step | 4.3 ms | 8.6 ms | 15.6 ms |
| 10 s ground flight, frame work | 434 ms | 5.7 s | 21.8 s |
| 10 s treetop boost, frame work | 1150 ms | 9.6 s | 20.9 s |

The flights' frame work is nearly all `draw` (the software renderer); the bench reports no hitch count, draw calls or heap.

## Round 1: tip 62fcd7d4 (#382), 01:51–02:48

17 merges since the baseline (#352, #347, #355, #366, #351, #368, #359, #361, #376, #383, #354, #372, #373, #370, #386, #350, #382).

- Tests (98 files, 757 tests), typecheck, build: green. `bench:quick` runs.
- Phase-1 refactors, merge commit against its first parent: **#370** art-core-dedupe, **#386** combat-split, **#376** audio-tidy: same state, 0 pixels differing. (Their CI "game unchanged" checks were green too.)
- #383 changed the fingerprint's format (keys sorted, notes dropped), so rules fingerprints from before it don't compare with ones after.
- Journey: ok, every moment reached, no errors, no blank frames. Draw calls 51–91 (91 in the treetops), `dropped` 0 throughout.
- Harness notes (not game bugs): the HUD clock reads 00:00 in the journey's shots (frames stepped by hand don't update it); in the beach shot the sea isn't clearly in view (camera), to look at again.

## Round 2: tip 5f917266 (#396), 02:49–04:11

14 merges, each checked against its first parent with `bench:quick`.

| PR | what | result |
|---|---|---|
| #380 | main-split | same |
| #387 | state-names | same |
| #384 | leash-split | same |
| #392 | art-check-coverage | same |
| #364 | beach-night | rules "differ (buffs)", 0 pixels: a bench false positive (below) |
| #391 | ui-one-pattern | same |
| #393 | gc-audit | same |
| #390 | sigil-button | same |
| #375 | docs-design-sweep | same |
| #394 | art-prefetch | same |
| #395 | main-split-2 | same |
| #374 | view-split | same |
| #385 | friendly-area | same |
| #396 | main-split-3 | same |

- Tests and typecheck green at the tip. Journey ok: no errors, every moment reached, draw calls 50–93, `dropped` 0.
- **Bench false positive** (reported to the coordinator): `g.buffs` holds the whole tuning (`buffs.tuning`, `buffs.base`: `newBuffs` in `rules/buffs.ts`), and the fingerprint includes `g.buffs`, so any new or renamed tuning knob reads as "rules differ (buffs)". A refactor that only touches a knob would turn "game unchanged" red. Fix: leave those two out of the fingerprint in `tools/bench/rules.ts`.

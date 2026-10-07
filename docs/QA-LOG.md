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

## Round 3: tip 893849d2 (#404), 04:12–06:05

22 merges, each against its first parent. Tests (101 files, 769) and typecheck green at the tip.

- **Same** (18): #388 p1-deadcode, #389 p1-tools, #371 balance, #378 unused-uniforms, #379 legend-attack-visible, #397 lazy-bot-decide, #367 making-of, #369 previews-curation, #400 art-overrides, #399 gc-map, #403 view-gc, #401 crowd-perf, #402 gc-keys, #408 spacing-grid, #405 p1-test-speed, #409 bedroom-first-paint, #412 changelog-versions, #404 creature-mustelids.
- **Differ, on purpose** (4, none a refactor):
  - #356 dj-witch: the boot shot's treehouse DJ booth only (17,535 px): the decks redrawn, smaller and lit, on a rug. Looks right.
  - #381 ley-curvature, #406 balance: "buffs" in the rules only, 0 pixels: the tuning-in-buffs false positive (fixed since by #420 bench-buffs).
  - #407 sea-glints: a new camera field (`seaBehind`, 0 inland) and its knob; 0 pixels.
- Journey ok: no errors, every moment reached, draw calls 49–89, `dropped` 0.

## Morning: full bench 818c7aec → 31d1905c (#435), 06:11–07:25

The tip benched is 11 merges before the frozen ship tip 0ab00110 (#448): #437–#449 aren't in these numbers. At 31d1905c: tests (105 files, 780), typecheck, build green. One run each, same machine.

**Rules** (headless, wave 30, 1800 steps, ~2,030 creatures), step ms, flat within noise:

| seed | median | p99 | worst |
|---|---|---|---|
| 123 | 3.61 → 3.85 | 9.29 → 8.95 | 15.3 → 16.5 |
| 165272 | 4.30 → 4.26 | 8.64 → 10.04 | 15.6 → 16.3 |

**Frames** (600 at 1/60 s, frame work ms; >95% is the software renderer's `draw`, of a richer scene, so it says nothing of a real GPU):

| flight | median | p99 | worst |
|---|---|---|---|
| ground, 10 s | 434 → 522 | 5671 → 7025 | 21752 → 18752 |
| treetop boost, 10 s | 1150 → 1138 | 9586 → 11014 | 20866 → 22991 |

**The game's own CPU work** (everything but `draw`):

- Treetop boost: the view's other parts, summed medians 10.1 → 7.8 ms (`refresh` 2.6 → 0.1, `prefetch` 2.9 → 2.1); rules p99 9.0 → 5.7. Ground flight: 4.1 → 3.9; `leash` p99 6.4 → 3.4. The phase-2 work shows.
- **To check**: the `party` lap's p99 19.7 → 52.4 ms on the ground flight (8.7 → 14.9 in the treetops), median unchanged (0.1 → 0.2): a spike, not a steady cost. The lap (`render/view.ts`, up to `this.time("party")`) covers soundsystems, lasers, the ley lines (update, grow, ring, the ley head's front) and the glades: likely the ley-line work (#351, #381), unconfirmed, one run. `heights` p99 in the treetops 15.9 → 24.9.

**Pixels**: all seven scenes differ from the baseline, as expected after the night's intended visual merges; every refactor and optimisation merge through #404 matched its own parent (rounds 1–3).

# Performance and housekeeping review, 2026-10-13

Juliet's overnight pass on Ed's ask: "Have an open think about housekeeping, performance and optimisation. If you can think of any ways to improve it, please do so." Everything here was measured on the prototype at #772's merge (`9ad634d`), in the cloud: 4 cores, Node 22, headless Chromium on a software renderer. Nothing visible, playable or balanced changes in any of the PRs; each states its before and after.

The earlier baseline is `docs/archive/BASELINE-2026-10-07.md` (the rules at late waves on the old ~100-area radius map, the browser's frame by part, the heap). This review takes the parts of the game that have moved since (the island maps, the archipelago, the sea chart) and the housekeeping side (the repository, the bundle, the tests, CI).

## In short

| what | found | done |
|---|---|---|
| the repository | 621 MB tracked, 520 MB of it the tools' preview pictures that `.gitignore` has ignored since 2026-10-07 but which stayed tracked | #805: untracked, a 101 MB checkout |
| the bundle | the tuning file's `_` notes (159 kB of its 187 kB) bundled into the game's shared chunk and again into the sea chart's worker; 32 kB more in the other config files | #803: dropped at build, 344 kB raw / 71 kB gzipped off the first load |
| start-up | the archipelago (every island's place on the chart) 1.5 s on the main thread at the start of every run, and again in the chart worker; an island's map 1.15 s on top | #809: 0.55 s and 0.6 s, the same map to the last sample |
| the tests | 7 m 44 s wall, 28 minutes of CPU; 307 map builds in the suite at about 0.95 s each | #809 takes a quarter off each build; the rest is the simulations themselves (below) |
| CI | 8.5 minutes a run, 7 m 49 s of it `npm test`; the smoke job 5 minutes beside it | nothing changed: options below |
| the rules' frame work | an island at wave 28: 0.2 ms a step at p50, 1 ms at p99 | the baseline's 3 ms steps were the radius map's 2,000 creatures: gone with it |
| the view's frame work | over the treetops at wave 28: about 4 ms of CPU a frame hovering, 8.5 flying (20 at p95: the streaming as she moves); the heap flat at 330 MB | nothing worth a change; the numbers are in section 7 |
| dead code, duplication | `tsc --noUnusedLocals` clean; no module nothing imports; 297 exports used only in their own file (types and knobs, mostly); nothing worth a sweep with twenty animal PRs open | left; the list is below |
| stale docs | eight tool folders missing from `tools/README.md`; three dead paths in `docs/ART-GUIDE.md`; the bench's late probe's spot in the sea on an island | #814 (the inventory regenerated, the paths fixed), #817 (the probe's spot) | |

## How it was measured

- **The repository**: `git ls-files` with `du`; `git count-objects`.
- **The bundle**: `npm run build` (Vite's own table) and a sourcemap build attributed back to each source file by its mappings (a 60-line script; every chunk's bytes by file).
- **Map generation**: a small esbuild bundle of the rules (as `tools/bench/ts.mjs` does) timing `generateMap`, `new Forest`, `spawnCreatures` and `placeRelics` over four seeds on the island map and on the radius map, and Node's `--cpu-prof` summarised by self and inclusive time; `worldOf(world)` over eight worlds for the archipelago.
- **Same map, proved**: a fingerprint of 48 maps (the radius map and the home, fox, wolf, stag and bear islands over 8 seeds): every cell's type, playability, site and runestone, the neighbours, every sample of the land and lake maps with its distance and coast loop, the legend clearings, relics, paths, scene pieces, decor, the creatures spawned, and 400 `areaAt` samples; and of 8 worlds' archipelagos (every island's place, turn, area and patch). The same hash before and after every change in #809.
- **The tests**: `vitest run --reporter=json` for each file's time.
- **CI**: the last fifteen runs' jobs and steps from the Actions API.
- **The rules at late waves**: `node tools/bench/ts.mjs perf --seeds=871136 --waves=10,20,28` (the baseline's probe; it now plays the island the game plays).
- **The view's frame work and the heap**: `node tools/bench/late.cjs` (below).

## 1. The repository: 520 MB of pictures nobody reads (#805)

| | files | size |
|---|---|---|
| `previews/` | 345 | 497 MB |
| `art/previews/` | 97 | 25 MB |
| everything else | 2,718 | 101 MB |

Ed's overnight programme (2026-10-07) stopped committing the tools' pictures (the folder "had grown to 416 MB"): they go in PR comments, the best of the old ones captioned into `making-of/media/`. `.gitignore` has ignored `previews/` since, but what was already tracked stayed tracked, and three more came in on 2026-10-11 and -12. Nothing reads them: the tools only write there, and `making-of/media/media.json` keeps each picture's `from: "previews/..."` as provenance only (the site's copies live in `making-of/media/`, 58 MB, which stay). #805 is `git rm --cached` of both folders: history untouched (no rewrite, so clones are no smaller and every link to a picture at a commit still works), a checkout 101 MB. Links to `blob/claude/prototype/previews/...` in old PR comments would 404, which is why it's its own PR for the coordinator to decide. CI's checkout step takes 15 s today; it should take a few.

## 2. The bundle

`npm run build` makes two pages (the game, the sea chart) and these chunks:

| chunk | kB | gzip | what's in it |
|---|---|---|---|
| chartView (the shared chunk, loaded with main) | 1,547 | 501 | three.js 556 kB; the art generators (`art/*.js`, about 600 kB); the rules; `seaChart.ts`; `config/tuning.json` 187 kB |
| main | 1,469 | 526 | the view (`render/view.ts` alone 183 kB), the audio engine, the UI; `changelog.ts` 54 kB (every fragment); the FOF voice's wasm 46 kB |
| artWorker | 683 | | the art generators again (a worker: its own copy) |
| chartOutlines.worker | 596 | | `rules/map.ts` and what it needs, the art the recipes pull in, `tuning.json` 187 kB again |
| viewParams, bot, decide, botGame, landingBake | 82, 16, 12, 2, 2 | | lazy |

(The chunk called `chartView` is the shared one because the chart entry reaches it first; the game loads it at start. Not a code-splitting fault, just a name.)

**Done, #803**: the config files' `_` notes dropped at build: `config/tuning.json` is 187 kB minified and 159 kB of it is notes; the other config files carry 32 kB more; nothing in the game reads a key starting with `_`. A Vite plugin (`configNotes`, build only; dev, the tests and the tools read the files as they are) strips them: chartView 1,547 → 1,387 kB (gzip 501 → 441), the chart worker 596 → 437 kB, main 1,469 → 1,444 kB. 344 kB raw and 71 kB gzipped off the first load.

**Then** (small ones):
- **Done, #816**: the FOF voice's wasm module (46 kB in main) isn't in the game (CLAUDE.md: "FOF isn't in the game"); now a dynamic import where the worklet is loaded: main 1,469 → 1,422 kB (gzip 526 → 509).
- `changelog.ts` bundles all 493 fragments (54 kB) into main for the three the start screen shows; a changelog page would want them all, so this is only worth it if there's none planned.
- The art generators ride in three bundles (the shared chunk, the art worker, the chart worker): 600 kB twice over. The workers need them; the main page needs them for the character creator and the previews. Unavoidable without a bigger rework.

## 3. Start-up: the map (#809)

What `newGame` does before the first frame, on the home island (10 areas), mean of four seeds:

| | before | after (#809) |
|---|---|---|
| the archipelago (once a world: every island's place, turn and patch on the chart; `worldOf`) | 1,506 ms | 549 ms |
| `generateMap` with that share in it | 1,151 ms | 601 ms |
| `new Forest(map)` | 108 ms | 97 ms |
| `spawnCreatures` | 7 ms | 4 ms |
| the old radius map's `generateMap` (every rules test's start) | 950 ms | 696 ms |

The archipelago is worked out again, from scratch, in the sea chart's outlines worker (`chartOutlines.worker.ts`) when the chart opens: #809's gain applies there too.

Where the time went (`--cpu-prof`, self time, four island maps):

| function | share | what | what #809 did |
|---|---|---|---|
| `archipelago` → `into` | 13% | each pair of islands' coasts probed at 28 angles, every pair every round (260 rounds), and 16 turns tried at every 30th | each island's probe points measured once a turn, not per pair per round; a probe that can't raise the most so far even at the other coast's furthest reach left unmeasured; a neighbour that can't own a patch point passed over; islands that can't reach the rim not pushed; the wanted sea per neighbour once a turning |
| `inStrait` (rules/map.ts) | 14% | every land sample in the middle band measured against all 96 rim segments | only the segments within half a strait by their middles and half-lengths measured (a metre's margin, so nothing that mattered is skipped) |
| `root`, `site`, `nearest`, `ringOf` (the partition) | 15% | 90,000 `partition()` calls a map (50,000 from `findNeighbours`, 36,000 from the land map), 220,000 `root()` calls, 135,000 distinct deepest cells | a deeper layer's site worked out inline in `root` (the same two hashes `ringOf` writes) instead of `site()`'s map lookup and tuple |
| `makeLand` → `pass` (the smoothing) | 2 to 8% | four min/max passes with a 5-wide window at every sample | two sweeps a line: the distance to the last and the next 1 (or 0) |

Every one is an exact equivalent: the same arithmetic in the same order where a value is kept, and a bound with a margin (1e-6, far past a lerp's rounding) where work is skipped. The fingerprints above are the proof, and the Bench workflow (base against head) runs on the PR.

**Left**: `findNeighbours` samples the partition 6 times an area across the whole grid (50,000 calls on an island whose land is a tenth of it); sampling only near the island's cells would halve the partition's share, but which neighbours it finds depends on the sampling, so it would need the fingerprint run over more seeds than I'd trust tonight. The partition's `rootCache` is a `Map` of 135,000 integer keys a map; a direct-mapped typed-array cache like `ringOf`'s would be faster, but the cached cells' identity is what the map hands out and I didn't want to change what callers get.

## 4. The tests: 7 m 44 s wall, 28 minutes of CPU

205 files, 1,254 tests; `vitest run` with a worker a core (4 here, 4 on `ubuntu-latest`), `isolate: false`. 1,677 s of file time over 435 s of wall: CPU-bound and well balanced (the longest file is 181 s, under the wall), so the wall only comes down with the total.

| file | s | tests | why |
|---|---|---|---|
| `rules/pointFeatures.test.ts` | 181 | 2 | 31 seeds' radius maps with their forests, creatures and relics in one `it` |
| `rules/rules.test.ts` | 131 | 137 | a map and a game a test, many stepped for game minutes |
| `rules/relics.test.ts` | 129 | 8 | |
| `rules/combat.test.ts` | 72 | 37 | |
| `rules/leyroute.test.ts` | 68 | 9 | |
| `rules/bot.test.ts` | 59 | 10 | bots playing whole openings |
| `rules/legends.test.ts` | 42 | 22 | |
| the next 23 files | 15 to 31 each | | |

The top ten are 46% of the total. 118 files build a map (307 `generateMap`/`newGame` calls), each the radius map at about 0.95 s under load: roughly 250 to 300 s of the 1,677 s. #809 takes a quarter off each; the rest is the simulations the tests mean to run.

**Left, for the test owners**: a map cache in the test setup (`src/test/radiusMap.ts`) would take most of the remaining 200 s off, but the maps carry closures and tests do mutate games, so it would need `generateMap` to hand out a fresh map from a cached partition and land, which is a change to the rules' own module; not tonight. `pointFeatures.test.ts`'s 31 seeds could become one `it` a seed (clearer failures, the same time).

## 5. CI: 8.5 minutes a run

From the last fifteen runs (`ci.yml`):

| job | step | time |
|---|---|---|
| check | checkout | 15 s |
| | `npm ci` | 2 s (cached) |
| | `npm test` | 7 m 49 s |
| | typecheck, build, upload | 8 s, 9 s, 3 s |
| smoke (alongside) | checkout, setup, build | 35 s |
| | Playwright and its Chromium | 55 s |
| | the quick smoke test | 2 m 54 s |
| | the music check | 22 s |

The run is the `check` job, and the `check` job is the tests. The one lever without touching the tests is sharding them over two jobs (`vitest --shard=1/2`, `2/2`): about 4.5 minutes a run at twice the runner minutes, which, with twenty builders' PRs and the 2026-10-05 note that two runs a push "swamped the runners", I'd leave to Ed. The Bench workflow (base and head, `bench:quick`, about 9 minutes) runs on every PR beside CI and isn't on the critical path.

## 6. The rules' frame work at late waves

`node tools/bench/ts.mjs perf --seeds=871136 --waves=10,20,28 --steps=1200`, which since the island maps plays the home island (10 areas, 39 creatures):

| wave | step p50 | p99 | worst |
|---|---|---|---|
| 10 | 0.26 ms | 1.06 ms | 4.3 ms |
| 20 | 0.21 ms | 0.91 ms | 30 ms (one GC) |
| 28 | 0.17 ms | 0.93 ms | 2.2 ms |

The baseline's 3 ms steps at 2,200 creatures were the radius map's; an island never gets there. The probe needs `--island off` to measure the old map now (CLAUDE.md's description of it is a wave behind).

## 7. The view's frame work and the heap

`node tools/bench/late.cjs` (the built game in headless Chromium at 1280×720, seed 871136 brought to wave 28, then 300 frames at a fixed 1/60 s, the view's work by part). On the home island at wave 28 there are 39 creatures (2 wild, 15 marching; the sim 2 full, 16 coarse, 8 frozen), against the baseline's 1,632 on the radius map.

| | ms a frame (mean) |
|---|---|
| the rules' step | 0.6 (p95 1.0, worst 2.3) |
| `draw` (the software renderer here; three.js's walk and the GL calls on a real GPU) | 206 |
| `hud` | 0.50 |
| `witch` | 0.46 |
| `leash` | 0.34 |
| `grass+lights` | 0.28 |
| `party` | 0.20 |
| `markers`, `groundTiles`, `refresh`, `creatures`, `uniforms` | 0.16, 0.16, 0.14, 0.12, 0.07 |
| everything else | under 0.05 each |

**About 3 ms of CPU a frame besides `draw`**, where the baseline had 11 (7.4 of view and 3.5 of rules): the island cut the creature count twenty-fold and the frame work with it. 86 draw calls (95 at most). The heap holds at 321 MB from the first timed frame to the last (325 at most): no growth over the run, so no leak in play; what it holds from load is the art's pixel data and the ground tiles, as the baseline found.

Two caveats. This run stayed on the ground at the map's edge: the probe took its spot in map metres (Ed's 1059,1499 on the old radius map), and on an island map, whose home lies wherever the archipelago put it (2,548, 2,509 on this seed), that spot is in the sea, so she was held at the edge and the probe timed the ground view with nothing drawn. Fixed in #817 (`AT` is now metres from the dancefloor, and the probe fails rather than time the wrong view); the treetop run with it:

`node tools/bench/late.cjs` as fixed, seed 871136 at wave 28, 300 m east and 200 m south of the dancefloor over the treetops, 120 frames at 1280×720 (60 hovering, 60 flying north): 1,570 trees drawn hovering, up to 1,937 flying; 97 draw calls; the sim 9 full, 15 coarse.

| | hovering | flying |
|---|---|---|
| the rules' step, p50 / p95 | 0.5 / 1.5 ms | 0.6 / 1.7 ms |
| the view's CPU work besides `draw`, p50 / p95 / worst | 3.5 / 7.5 / 9.6 ms | 8.0 / 19.0 / 20.6 ms |
| `witch` (her sprite, the ride, the camera), mean / p95 | 0.39 / 1.1 | 1.34 / 7.2 |
| `refresh` (the art and ground round her as she moves) | 0.01 / 0.1 | 1.25 / 4.6 |
| `hud` | 0.79 / 3.8 | 0.83 / 1.9 |
| `grass+lights` | 0.65 / 1.9 | 0.81 / 1.9 |
| `leash` | 0.58 / 0.9 | 0.61 / 3.7 |
| `heightsAhead`, `heights`, `groundTiles`, `prefetch` (the rolling ground and its tiles ahead of her) | about 0.05 together | 0.60, 0.47, 0.52, 0.53 (p95 2.0, 3.3, 2.2, 2.4) |
| `party`, `creatures`, `markers`, `uniforms` | 0.25, 0.23, 0.22, 0.09 | 0.29, 0.26, 0.19, 0.14 |
| `draw` (the software rasteriser here) | 2,085 ms mean | |

So **hovering over the treetops costs about 4 ms of CPU a frame, and flying about 8.5 at the median and 20 at p95**, the difference being the streaming as she moves: the ground's heights and tiles ahead, the art's refresh and prefetch, and her own part (the ride over the rolling ground). None of it is one hot spot; the p95s are the frames where a new tile or a new sprite set comes in. The heap went 330 to 333 MB over the 120 frames (337 at most), the art and tiles coming in; no leak. On Ed's machine the `?perf=1` HUD gives the same parts against his GPU.

And `draw`'s 206 ms is the cloud's software rasteriser, not a number for Ed's machine; the `?perf=1` HUD is the way to read it there.

## 8. Allocation churn

`node tools/bench/alloc.mjs --seed=123 --wave=20 --steps=1200` (the rules alone, V8's sampling heap profiler, the home island at wave 20 with 39 creatures): **153 KB allocated a step, 0.74 ms a step**. At 60 steps a second that's 9 MB a second, a young-generation collection every second or two at about a millisecond each: under 0.2% of the frame. Phase 2's GC audit already took the big ones (the grid's generator, the partition's tuples, the cues' sets). What's left, by function (self, KB a step):

| KB | share | where | what |
|---|---|---|---|
| 20.9 | 14% | `next` (iterators) | `for … of` over Maps and Sets through the rules: an iterator result object each |
| 17.9 | 12% | `coarseMarchers` (rules/game.ts) | a fresh `near` list of points, two spreads of the leash's stack and placed sigils, and a `Set` of the coarse marchers, every step |
| 15.6 | 10% | `stepCombat` | |
| 8.7 | 6% | `hypot` | (the profiler's attribution of boxed results) |
| 7.4 | 5% | `Grid`, `near` (combat/targeting.ts) | the fighting creatures' grid rebuilt every step (a Map and its cell arrays), and each query's result array |
| 4.5, 3.9 | 3% each | `packsOf`, `steer` (movement) | |

None of it is worth a rules change tonight: a minor collection a second is not what makes a hitch, and each of these is a function other builders are in. `coarseMarchers` and `Grid` could keep their lists between steps (the `near` points change only when a witch moves or a sigil goes down) if the churn ever matters.

## 9. Dead code and duplication

- `tsc --noEmit --noUnusedLocals --noUnusedParameters` over `src/`: clean (0 errors).
- No module under `src/` that nothing imports (a scan of every import path against every file).
- 297 `export`s are used only in their own file (a scan of `export const|function|class|type|interface` against every file in `src/`, `art/`, `tools/`): about 200 of them types and interfaces exported for documentation, the rest knobs (`SILENT_DB`, `WIN_STARS`, `POOL_CAP`…) and a few functions (`gladesOf`, `runestoneOf`, `overlayBlur`, `callOf`, `napFrame`, `bakeOverride`, `typeSprites`). Dropping the `export` keyword is cosmetic and touches files twenty animal PRs are editing; left for a quiet day.
- Duplication: the art kit's twenty-odd `*.js` generators share shapes by hand (every `*3d` builder has its own ellipsoid and taper helpers); that's the art builders' style and their own territory.

## 10. Stale docs and config

- `tools/README.md` didn't mention eight of the 42 tool folders (`hats`, `hologram`, `islands`, `lakes`, `qa`, `samples`, `shadows`, `soundsystem`, `voice` had no README), and seven folders' counts were behind: `node tools/inventory.mjs` run again in #814.
- `docs/ART-GUIDE.md` pointed at `tools/art-iterations/sheets.mjs` and `silhouettes.mjs` (#97's, never merged) and `docs/art-iterations/README.md`: now the art-iterations README, the area sheet and the silhouette sheet `art/preview.mjs` draws (#814).
- `tools/bench/late.cjs` took its spot in map metres, the radius map's; on an island that's the sea (#817 fixes it: metres from the dancefloor).
- `docs/archive/BASELINE-2026-10-07.md` section 1 and `tools/bench/perf.ts` describe the radius map; the probe now plays an island (section 6 above).
- CLAUDE.md's Testing section says the bench's `rules.ts` is "brought to wave 30"; `run.mjs --quick` goes to 10 and the frames' scenes are described twice (once under Testing, once in the bench README). Harmless.
- `config/changelog/` holds 493 fragment files (2 MB on disk for 54 kB of text); the archive rule froze `archive.json` at round 9. A second archive of everything with a version would keep the folder small; it's Ed's call since the rule was his.

## 11. For foxtrot (the music cutting out)

Nothing in this pass touched the audio. Two things seen on the way that may matter to it:
- The archipelago's 1.5 s (now 0.55 s) ran on the main thread inside `newGame`, before the first frame; it never overlaps the music, but any later `worldOf` call for a world the page hasn't seen (the chart's "Start over" with a new world, opened mid-night from the treehouse deck) would stall the main thread for that long while the music plays. #809 shortens it; a worker would end it.
- `generateMap` for an island is 0.6 s on the main thread after #809 (1.15 s before): the same note for anything that makes a second map mid-run.

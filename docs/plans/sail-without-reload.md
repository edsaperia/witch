# Sailing without reloading the page

**Status (2026-10-28):** PRs 1 to 6 shipped (#973, #979, #974, #978, #980, #981, #982; then the transition #1110/#1120, always ending asleep in bed #1123, no stutter #1225): the sail is in place by default (`sail.inPlace`, `src/app/sail.ts`, `?sail=reload` the fallback). PR 7 partly: the wake-up in her bedroom while the island builds is the opening (Ed, 2026-10-23; #985 first put the first load on the chart); still to do: chart.html as a link that opens the game on the chart (decision 7: it is still its own chart page, `src/app/chartPage.ts`).

A plan, not code. Ed, 2026-10-19: "Option 5: we'll have to do this eventually anyway. Start planning it."

## In plain English

Today, when she sails from the sea chart to an island, the browser reloads the whole game. It throws everything away and builds it all again:

- the 2.7 MB of code;
- the sound, so the music stops dead;
- the art workers and every drawn sprite;
- the compiled shaders;
- the witch's, the creatures' and the treehouse's art.

Only then is the new island made and drawn.

The aim is to keep the page and swap only what belongs to the island: the night's rules state, its map, and the island's layers of the picture (ground, hills, paths, ley lines, runestones, trees, the party). Everything else stays loaded and warm, including the music.

**What the audit found**

- **It can be done.** Three readers went through the whole game: the start-up code, the drawing code and the rules and sound (section A). Nothing makes a reload necessary.
- **The rules are clean.**
  - The rules use no randomness of their own, no clock and no hidden counters. Every counter lives in the game object.
  - One shared setting leaks from one night into the next: the fight speed and scale (`FIGHT`). It's a one-line fix.
- **The difficulty is the wiring.**
  - About 20 parts of the page each hold "the game" directly: the HUD, the pause sliders, the sound, the debug hooks and the screen shake among them.
  - In the drawing code, about 9 files build things from the island and never free them.
  - Some art is filed under keys that don't name the island. Without a fix, the new island would show trees grown from the old island's seed, or a party animal drawn as last island's species.
- **The music can play straight through a sail.**
  - The audio engine doesn't hold the game; it's told each frame where it is.
  - It needs a way to restart its own clock and pick up the new night's seed.
  - Its sound-effect cues have to start fresh each night.
- **We would build it in 7 PRs.**
  - Each one is safe and shippable on its own.
  - The first four change nothing you can see. They fix two existing bugs and add tests that would catch a leak.
  - The switch comes in PR 5, on by default once its tests pass. The reload stays as the fallback, used automatically if anything goes wrong, and `?sail=reload` forces it.
- **The tests that make it safe** (section C):
  - Two nights played in one page must give exactly the same state and the same picture as a fresh page.
  - Ten sails in a row must not grow memory, textures, listeners or workers.
- **It is the floor your planned arrival stands on.** The chart zooming into the bedroom window and her waking up while the island builds both need this (section E).

**Your decisions** (Ed, 2026-10-19; section F has them in full):
- Back after a sail opens the pause menu.
- A failed sail reloads quietly.
- The music fades to a quiet sea and flight cue, then the new night's start.
- The new way is on as soon as the tests pass.
- Every pause-page slider carries to the next island, game knobs included.
- Only this island's own art (its trees, treehouse and soundsystems) is kept in memory; the creatures' art stays for the whole page.
- chart.html stays, as a link that opens the game on the chart.

The detail follows.

---

## A. The audit: everything that assumes one night per page

Marks: **KEEP** (page-lived, untouched), **RESET** (keep the object, clear its per-night state), **REBUILD** (a new one for each night). Lines are as of `a5c3e675f`.

### A1. Start-up and the page (`src/main.ts`, `src/app`, `src/ui`)

**The main finding.** `main.ts` makes the night once and everything closes over it:
- `const game = newGame(seed, tuning)` (main.ts:76);
- `const tuning` (71), `let seed` (63) and `const params` (58).

Only one consumer, the Music Lab panel (316), reads the game through a getter. Every other piece holds it.

**What holds the night**

| What | Where | Holds | Mark |
|---|---|---|---|
| The game | main.ts:76 | `const game` | REBUILD; read through one holder |
| Tuning | main.ts:71, `tuningFromLink` | island, world, found, knobs | REBUILD, from clean config (A3) |
| Seed and URL | main.ts:58, 63 | boot `params`, `seed` | REBUILD, after `history.pushState` |
| Hud | main.ts:146, hud.ts:11 | game; `lossShown`, `bootShown` | REBUILD (keep `debugOn`) |
| PlaytestLog | main.ts:108, playtestLog.ts:69 | game, `run` (seed, samples) | REBUILD: a new run per night, or nights merge under the old seed |
| Freeze | main.ts:190, freeze.ts:27 | game and seed, readonly; a capture keydown | re-point (rebuilding would add a second listener) |
| ScreenShake | main.ts:347 | game, tuning | re-point |
| PerfHud | main.ts:377 | game; appends `#perf-hud` | re-point |
| ZooPanel | main.ts:62 | game; its own DOM | REBUILD (remove its DOM) |
| Knobs | main.ts:114, knobs.ts:45 | tuning, game; a window keydown | page-level listener reading the holder |
| Decide / PauseSliders | main.ts:306, 363 | `host.tuning`, `host.seed` | re-host |
| Repro | main.ts:383 | boot `params` (so it names the old island) | read live params |
| ArrivalFlight | main.ts:198 | `const arrival`; still image; capture skip listeners never removed (220) | REBUILD per sail; FlightEnd passed in memory |
| Per-night flags | main.ts:142, 211, 374, 453 | `castWanted`, `landed`, `last`, `overShown`, `wonShown`, `chartRecorded`, `musicCueNow`, `attackTick` | RESET; without it, night 2 never records to the chart or shows its cards |
| Readiness | main.ts:154, 176-184 | `ready`, then `view.prepare()`, then `arrival.begin(game)`, one-shot | per night |
| Bot | main.ts:264, botGame.ts:229 | BotTag DOM, capture keydown never removed | RESET |
| `window.witch` | hooks.ts:36 | a snapshot of game, tuning, hud, shake; closures over them | getters on the holder (smoke and bench tools drive it) |
| Arena key | gameParams.ts:38 | keydown over game, one per game | remove per night |
| Sound watchdog | sound.ts:117 | 1 s interval; `live()` / `booted()` close over game | keep one; read the holder |
| Creator, input, resize, frame loop | main.ts:102, 150, 233, 462 | page | KEEP (the creator's callbacks read the holder) |

**Leaving the page.** Every place that leaves the page today:

| Where | Does | Becomes |
|---|---|---|
| main.ts:488-492 | the map table's chart → sail → `location.href` | **the sail in place** (PR 5) |
| chartView.ts:137 | chart.html's sail | stays a page load (it starts the game) |
| main.ts:455, 457 | `#won-sail`, `#chart-open` → chart.html | open the chart overlay in place (PR 6) |
| main.ts:456, 459 | `#again` reload, `#fresh` new seed | a night in place (PR 6) |
| main.ts:273 | bot game exit | a night in place (PR 6) |
| #966's bed | "a new night starts", as Play again does | a night in place (PR 6) |
| decide.ts:122, 129 | knobs read only at map build | keep the reload (rare, developer-facing) |
| main.ts:358 (Zoo), newBuild.ts:25, view.ts:345 (GL context restored) | — | keep the reload |

**Workers.**
- **chartWarm** (app/chartWarm.ts:36): one at a time. KEEP.
- **The chart view's outline worker** (chartView.ts:165): ended on dispose.
- **landingBake** (landingBake.ts:68): up to 6 extra art workers.
  - `dispose()` doesn't stop it. Today the reload does.
  - In place, it should finish and then end, or better, use the game's own pool (E1).

**URL.**
- The sail's parameters are `island`, `seed`, `arrive=1` and `world`.
- **What is read at start-up only:** `params` (main.ts:58), `tuningFromLink`, `gameFromLink`, and the repro keys (`wave`, `cleared`, `at`, `mode`, `zoom`, `set`, `found`).
- **What is read live:** main.ts:492, decide.ts and knobs.ts.
- **In place:**
  - `history.pushState` to `?island=X&seed=S[&world=W]`;
  - drop `arrive` and the repro, `bot`, `quest`, `arena` and `partyover` keys, so the next island doesn't inherit a debug position;
  - rebuild the tuning from the new URL and the updated `witch.chart` save.
- `arrive=1` and sessionStorage `witch.arrive` stay only for chart.html's own sail. In place, the FlightEnd is passed in memory.

**Storage.**
- `witch.chart` is written as a night ends. The next night's `tuning.map.found` must re-read it, which the tuning rebuild does.
- `witch.playtest` needs a new run per night.
- The rest (settings, loadout, genome, autotalk, shake) belong to the player and are KEEP.

**DOM left behind by a night.**
- `#won.on`, `#over.on` and their text;
- `#start`'s display and `.loading`;
- `#progress.done`;
- `#seed`;
- `#clock` classes;
- `#spell` / `#bedroom-btn`;
- `canvas.style.transform`;
- `body.arriving`;
- the arrival still image and "landing…", which are removed after the first use and must be made again;
- the HUD-fade `<style>`, which is only injected when the page booted as an arrival.

A `resetDom()` per night covers all of these.

### A2. The drawing (`src/render`)

**How the View is built.**
- `new View(canvas, game, style, genome)` (view.ts:335) takes the game at construction.
- Six classes keep their own readonly `game`: View, LeashView, StringLightsView, Lasers, BorderView and InviteView.
- There is one `THREE.Scene` and **no island root group**. PathView's group is the only island group, and the View doesn't keep it.

**Rebuilt from the island** (about 2.5k lines in 9 files):

| Layer | Built from | Frees itself? |
|---|---|---|
| HeightField (height.ts:199) | map, forest; also the module globals `current` / `amplitude` (529) and `HEIGHT_UNIFORMS.uHeight` | **no dispose** |
| Ground (ground.ts) | map-sized texture (up to 8192²), lakes, beach, carvings, disco | `dispose` (739) misses floors, carve, discoTiles, `uLakes`, the disco CanvasTextures, and a per-tile DataTexture (735) |
| PathView (paths.ts:182) | `map.paths` ribbons and strips | **no dispose; group not kept** |
| LeyLines (leylines.ts:371) | route plus boot ring from `bootPath(map)` | **no dispose** |
| MarkerArt and markerBatch (markers.ts:42) | this map's runestones; also a `"markers"` trunk-shadow batch | **no dispose** |
| Dancefloor (dancefloor.ts:95) | `map.dancefloor` baked into geometry | **no dispose** |
| Minimap (minimap.ts:16) | DOM canvas sized `map.n` | — |
| MapTable (mapTable.ts) | deck radius; owns a **second WebGLRenderer** near the deck | `drop()` (the mesh is not freed) |
| typeBatches and per-type trunkShadowBatches | area-type art **seeded by `game.seed`** | `SpriteBatch.release` |
| treehouseBatch | this island's Ent or house art | — |

**Kept, with per-night state cleared** (about 20 files):
- Grass: its cells, and its map/forest refs;
- StringLights: `clear()` exists but frees nothing;
- Borders, Leash, Invites;
- PartyObjects: dressings, bounds, fires;
- SoundsystemGen batches; RigView bodies;
- Holograms `seen`, Glades edges;
- Smoke `mounds`;
- BeachView: it already notices a new map, but keeps the old `ground`;
- Clouds and LightRings: the seed only;
- about 45 fields of View itself, listed in the audit notes (e.g. `markerCache`, `plan`, `leyReach`, `legendSleeps`, `rigGears`, `prepared`, `prefetched`, `ride`).

**Module caches that never clear while the View lives:**
- `view/creatures.ts:61-65` (`PER`, `ARTS`, `RING_OF`): keyed by creature id; cleared only when a new View appears.
- `view/scenery.ts:47`: a WeakMap of an in-progress rebuild generator per View. It closes over the old game.
- `view/home.ts:290`: candles per View.
- `sprites.ts:594`: `FADE_MATERIALS` and `FADE_MESHES` grow forever (a leak today, slow).

Everything keyed by the map object (WeakMaps in markers, soundsystemGen, scenery) is fine: a new map gets new entries.

**The art workers** (assets.ts:110):
- **The pool.** Six workers with no terminate. **Never make a second AssetLibrary.**
- **Caches that are wrong across islands:**
  - `types` is keyed by type id only, but drawn with `this.seed`, which is readonly. Old-seed trees would show.
  - `party-<id>`, `happy-<id>`, `nap-party-<id>` and `nap-happy-<id>` are keyed by **creature id only**.
    - The nap ones are also written to IndexedDB. **That is a bug today, even with reloads:** a cached nap of creature N can show another seed's species.
    - The fix is the same: key them by species and gear.
- **In-flight jobs** have no generation token, so an old island's type job can land after the swap.
- **Safe to keep:** creatures by species, rigs (the 48-page LRU, keyed by genome hash), the witch, hats, props and decor.

**Shaders.**
- No shader source contains island data, so new island materials reuse the compiled programs.
- **One catch:** three.js frees a program when its last material is disposed.
  - **Build the new island's layers first, then dispose the old ones.** Otherwise the big ground shader recompiles.

**Listeners.**
- None in render besides `webglcontextrestored` (view.ts:345, a reload, which stays).
- The DOM it appends once (bubbles, invites root, leash panels, indicators, minimap) needs clearing, not rebuilding.

### A3. The rules (`src/rules`)

- Nothing uses `Math.random`, `Date`, the DOM or Three.js.
- Every counter lives in the game object: shots, party witches, growth, and creature ids as array positions.
- About 30 module caches exist. All are WeakMaps keyed by the map (or a part of it), or constant tables.

**What leaks or could leak between nights:**

| Where | What | Fix |
|---|---|---|
| movement.ts:58 (written combat.ts:34-37) | **`FIGHT`**: scale, speed, momentum, charge, leap and walk carry over from night 1. `travel.updateModes` (game.ts:542) reads it before the first `stepFights`, and `charge`/`leap` are only written when set | reset in `newGame` (PR 1) |
| combat/hits.ts:13 | `D`, the last combat data | reset with FIGHT |
| combat/data.ts:205, 223 | `SCALED`, `LAST_SCALED`, keyed by FIGHT's values | follow FIGHT; fine once it's reset |
| linkParams.ts:49 | `tuningFromLink` copies `TUNING` one level deep. Saved settings (`setKnob`, decisions.ts:25), `gameParams.ts:47` (`leyLines.pulseSpeed`) and `viewParams.ts:10` (`partyObjects.generated`) **write into the shared config itself**. A second night inherits them, and `BUILT` (main.ts:82) is already changed | build each night's tuning from a pristine deep copy; re-apply every pause-page slider on purpose, game knobs included (decision 5; PR 1) |
| islandShape.ts:41, archipelago.ts:78, partyGuests.ts:28, musicScore.ts:492 | string-keyed caches whose key leaves out the tuning or style | harmless with one tuning per world; add the tuning hash to the key if knobs may change between nights |

**newGame** takes `(seed, tuning, players)`. The island comes in through `tuning.map`.

**What the app does after `newGame`** must happen again, in the same order, for night 2 to equal a fresh page:
- `gameFromLink` (spell, quest, arena, `party.paused`);
- `wearHat`;
- the loadout.

**Building the map takes time** (docs/archive/perf-housekeeping-review.md):
- `generateMap` about 0.6 s on the main thread;
- `new Forest` about 0.1 s;
- archipelago about 0.55 s once per world (cached).

**The map is pure, and it already runs in a worker** (chartOutlines.worker.ts). **But a `ForestMap` can't be posted back:** it carries closures (`areaAt`, `typeOf`, `cellSafe`…), and its WeakMap caches live in the thread that built it (see E4).

**The bench can't catch these leaks today.** `tools/bench/rules.ts` already runs seeds 123 and 165272 one after the other in one process. Its baseline for the second seed would hide a leak from the first, because both runs use the same tuning.

### A4. Sound (`src/platform/audio`, `src/app/sound.ts`)

**What can be kept.**
- **One AudioContext per page, KEEP.**
- The music engine never holds the game; it's given time, beat and mix each frame.
- The night beds, the sea, ponds, picnics, babble, whales and ambience all run on the audio clock, with positions passed in per frame. KEEP.

**What must change at a sail:**

| Where | Problem | Fix |
|---|---|---|
| musicEngine.ts:91, 262-265, 316 | **its timeline anchor `g0` is private, and `reset()` doesn't clear it.** Game time jumping back to 0 throws the music 6 s ahead, slewing back for about 2 minutes (read from the code, not heard) | a public `newTimeline()`: `g0 = NaN`, `nextStep = -1`, `knocksHeard = 0`, ungate |
| sound.ts:40, 76, 113 | `Sound.seed` and `tuning` are private readonly. The watchdog's rebuild would bring back night 1's seed | `Sound.setNight(tuning, seed)`, which also sets `engine.seed` (public) |
| sfxCues.ts:56-98, 484-568 | per-game state keyed by **creature id**, **game time** and area cell: picnic murmurs at old spots, stale clears and fireworks firing once the new clock reaches them | a **new `SfxCues` each night** (cheap) |
| musicEngine.ts:182-191 | the new night's style triggers `setStyle`, which tears down every channel and doesn't pre-build the sung channel (about 190 ms on its first note) | warm the sung channel after `setStyle`, while the sail is quiet |
| sfxKit.ts | holds `tuning.sfx` from construction | re-point to the new night's tuning (its sliders carry over anyway: decision 5) |
| shed.ts | the safety valve's grace runs once a page | re-arm it at each arrival |
| input.ts | page | KEEP; `clearPresses()` at arrival |

---

## B. The seam: ending a night and starting one in place

Two lifetimes, made explicit:

- **The page** (made once): renderer, View (its kept parts), AssetLibrary and workers, Sound (context, engine, Sfx), input, creator, frame stats, meter, the frame loop, the chart overlay.
- **The night** (made per island): game, tuning, seed, URL params, PlaytestLog, Hud, SfxCues, ArrivalFlight, per-night flags, and the View's **island layers**.

**`src/app/night.ts`** (new; the only place a night begins or ends):

```ts
interface NightSpec {
  island: string; seed: number; world?: number;
  how: "boot" | "sail" | "again" | "fresh" | "bed" | "bot";
  arrival?: FlightEnd;           // from the chart, in memory (not sessionStorage)
}
interface Night {
  spec: NightSpec; game: Game; tuning: Tuning; params: URLSearchParams;
  playtest: PlaytestLog; hud: Hud; cues: SfxCues; arrival: ArrivalFlight | null;
  flags: { ready: boolean; landed: boolean; wonShown: boolean; overShown: boolean; chartRecorded: boolean; castWanted: boolean };
}
/** Everything kept across nights. main.ts makes it once. */
interface Page { view: View; sound: Sound; input: Input; creator: Creator; freeze: Freeze; shake: ScreenShake; perfHud: PerfHud; night: Night | null; }

function nightTuning(spec: NightSpec, params: URLSearchParams): Tuning;   // from a pristine deep copy of config + witch.chart + every slider set this session (decision 5)
async function startNight(page: Page, spec: NightSpec): Promise<Night>;   // build, then swap, then dispose the old
function endNight(page: Page): void;                                     // record to the chart, stop per-night timers, clear DOM
```

**What `startNight` does, in order:**

1. `history.pushState` the night's URL, plus a guard entry for Back (decision 1). Rebuild `params` and the tuning (`nightTuning`).
2. `newGame(seed, tuning)`, then `gameFromLink` and the hat and loadout, exactly as at boot. `newGame` resets `FIGHT` and the combat data.
3. `view.island.build(game)` builds the new island layers **off-scene**:
   - heights, ground, paths, ley lines, markers, dancefloor, minimap, map table, treehouse, the type batches;
   - `assets.reseat({ seed, treehouse })` bumps a generation number. Jobs from the old one are dropped as they land.
4. **Swap**:
   - `view.setGame(game)` re-points the six readers and resets the per-night fields and module caches (`resetCreatureCaches()`, `scenery.cancel(view)`);
   - add the new island root, remove the old one;
   - `useHeightField(new)`.
5. **Dispose** the old island root (every GPU resource listed in A2). This is the step after the new materials have compiled.
   - Then evict the old island's art from memory: its type art, type and trunk-shadow batches, treehouse and soundsystem sets (decision 6: this island only; the creature species' art stays page-wide).
   - Revisiting an island redraws them. The IndexedDB art cache keeps that quick.
6. **Sound** (decision 3: no crossfade from the old night):
   - **At the sail** (`endNight`): the old night's music fades out over about 1.5 s, and a quiet sea and flight cue fades in. That cue is the `Sea` bed (`platform/audio/places.ts`) with a soft wind, played by a new `sound.sailing(level)`.
   - **While the island builds**, only the cue plays. The music engine schedules nothing, so a long map build can't make it stutter.
   - **At landing**: `sound.setNight(tuning, seed)` then `engine.newTimeline()`, a new `SfxCues` and `valve.begin()`. The new night's start (the boot's intro) comes in as the cue fades.
7. A new PlaytestLog run, `hud.reset(game)`, `freeze.retarget(game, seed)`, `resetDom()`, a new ArrivalFlight (if `spec.arrival`), then `prepare` and `begin`.
8. `page.night = night`. The frame loop, `window.witch` (getters) and every listener read `page.night` from here on.

**Where it sits.**
- `main.ts` shrinks to "make the Page, then `startNight({ how: "boot", … })`". The boot and every later night go through **the same code**. That is what makes "night 2 equals a fresh page" testable, and it stays true by construction.
- The View is split into its page part (`View`) and its island part (`View.island: IslandLayers`, a new `render/island.ts` with one `THREE.Group` root and a `dispose()`).
- The rules don't change, besides resetting `FIGHT` in `newGame`.

**The fallback** (decision 2).
- `startNight` is wrapped. On any throw it reloads quietly, as today: `location.href = url`, with no message.
- `?sail=reload` forces the reload, and `?sail=inplace` forces the new way.
- The tuning's `sail.inPlace` is the default. It is on from PR 5, once the tests pass (decision 4).

**Back** (decision 1).
- After a sail in place, Back opens the pause menu and nothing is lost.
- Each in-place night pushes its URL and then one guard entry with the same URL.
- On `popstate`, the game pushes the guard again and opens the pause menu.
- A first page load (no sail yet) leaves Back alone, as today.
- Forward is never offered.

---

## C. Tests that make it safe

1. **Two nights equal a fresh page: the rules** (vitest, `src/rules/twoNights.test.ts`, and in CI).
   - Seed B is played fresh for 1800 steps with the bench's fixed path, and its fingerprint taken (`tools/bench/fingerprint.ts`).
   - Then seed A on another island with other fight knobs, then seed B again, through `nightTuning` and `newGame`. The fingerprints must be **exactly** equal.
   - The sliders carry over (decision 5), so the test sets the same sliders before both runs of B. A second case changes a game knob during night A and checks that night B equals a fresh page started with that knob.
   - It fails today, because of `FIGHT`. PR 1 makes it pass.
   - A bench variant runs `--seeds=B` and `--seeds=A,B` in separate processes and compares the B fingerprints.
2. **Two nights equal a fresh page: the picture** (bench, `tools/bench/frames.cjs`, a new quick scene `second-night`).
   - Load island A, sail in place to B with `window.witch.sail(spec)`, settle, and screenshot.
   - Compare it pixel for pixel with the fresh `wave-fight`-style shot of B.
   - It runs in the Bench workflow from PR 5 on.
3. **Flat over 10 sails** (`tools/sail/leak.cjs`, built game, headless Chromium):
   - sail A, then B, then C, then A… ten times, landing and playing 5 s each;
   - after each landing, record:
     - `renderer.info.memory` (textures, geometries) and `renderer.info.programs.length`;
     - the JS heap after a forced GC (CDP `HeapProfiler.collectGarbage`, then `Runtime.getHeapUsage`);
     - DOM node count;
     - listeners on window and document (CDP `DOMDebugger.getEventListeners`);
     - live workers (CDP target count);
     - AudioNode count (a counting wrapper under `?debug=sail`).
   - **Pass:**
     - from sail 2 on, programs, listeners, workers and DOM are **equal** after every sail. Textures and geometries are equal at each return to the same island, since only this island's own art is kept (decision 6). The creature species' art stays page-wide (decision 6), so it grows over the first rounds of the islands by their species and then holds: the leak test's warm-up (`WARM`) is expected;
     - the heap stays within 5 % of sail 2.
   - It also asserts that the old game object is never stepped after the swap: `stepGame` throws on a game marked `disposed` under `?debug=sail`.
   - It runs in CI as a slow job from PR 5 on (about 10 minutes in the cloud).
4. **The fallback.**
   - The quick smoke test runs one sail in place and one with `?sail=reload`.
   - A unit test forces `startNight` to throw and checks that the reload URL is the one the old path would have used.
5. **Audio.**
   - `node tools/music-lab/check.cjs` gets a sail case: play wave 2 of night A, then the sail (the fade to the sea and flight cue, 5 s of cue alone), then `newTimeline()`, `setNight(B)` and the boot.
   - It must render no NaN or clipping, and no silence: the cue covers the gap.
   - The old night's music must be fully gone before the new night's first note (decision 3).
   - The music's beat must stay within 50 ms of the game's after 10 s.
6. **Back.**
   - The quick smoke test sails in place, then presses Back (`page.goBack()`).
   - The pause menu must be open, the island and night unchanged, and the URL still the night's.

---

## D. PRs, in a safe order

**Status (2026-10-20):** PRs 1, 2, 3, 4a, 4b, 5 and 6 are done: the sail in place is on by default (`sail.inPlace`), and Play again, a new forest, the bed, the bot game's exit and the cards' sea chart go in place too. PR 7 is still to come. (2026-10-21: Ed took Play again and A new forest off the party's-over card, "replace with the bed": the bed is the only way to a new night on the same island, and `NightWay` is `"bed" | "bot"`.)

Each is shippable. Nothing a player sees changes until PR 5, which turns the new way on once its tests pass (decision 4).

| # | PR | What | Size | Visible? | Bench |
|---|---|---|---|---|---|
| 1 | **Night hygiene and bugs** | `FIGHT`/`D` reset in `newGame`; `nightTuning` from a pristine deep copy, every slider re-applied on purpose (decision 5); the creature-id art keys fixed (`party-`, `happy-`, `nap-`, also in IndexedDB: fixes today's bug); `FADE_MATERIALS` pruned on release; Ground's missing disposes; test C1 | ~250 lines | no (the nap fix can change a napping animal's colour to the right one) | rules same; frames may differ only if a nap shows |
| 2 | **The page and the night** | `app/night.ts` with `Night` and `Page`; main.ts reads `page.night` everywhere; `window.witch` as getters; the per-night flags into `Night`; `resetDom`; Hud/Freeze/Shake/PerfHud/Decide re-pointable; boot goes through `startNight({how:"boot"})`. Still reloads to sail | ~500, mostly mechanical | no | same game |
| 3 | **Sound across nights** | `Sound.setNight`, `MusicEngine.newTimeline`, a new `SfxCues` per night, the sung channel warmed after `setStyle`, the valve re-armed; the sail's fade-out and the sea and flight cue (`sound.sailing`, decision 3); test C5 | ~200 | no | same |
| 4a | **The island layers** | `render/island.ts` with one root group; HeightField, Ground, PathView, LeyLines, MarkerArt, Dancefloor, Minimap, MapTable, treehouse and type batches moved under it, each with a `dispose`; the View builds its island through it once. Nothing is swapped yet | ~700 | no | pixel-identical |
| 4b | **Resetting the View** | `View.setGame`; per-night fields and module caches reset; `assets.reseat` with a generation token; in-flight jobs dropped; `scenery.cancel`; the old island's art evicted after the swap (decision 6) | ~400 | no | same |
| 5 | **The switch** | the map table's sail calls `startNight`, with `sail.inPlace` **on** once C2–C4 and C6 pass (decision 4) and `?sail=reload` to force the old way; the arrival re-armed in memory; `pushState` and Back to the pause menu (decision 1); the quiet fallback (decision 2); tests C2, C3, C4, C6 | ~450 | **yes** | new `second-night` scene |
| 6 | **Every other way to a new night** | `#won-sail`/`#chart-open` open the overlay in place; Play again, a fresh seed, the bot's exit and #966's bed go through `startNight`; each covered by C3's sails and the smoke test | ~200 | yes | — |
| 7 | **On top** (with Golf and Foxtrot) | first load on the chart (a Page with no night), chart.html kept as a link that opens the game on the chart (decision 7); the wake-up in the bedroom while the island builds | separate plan | yes | — |

**Roughly 2,700 lines over 7 PRs.**
- PRs 1 and 3 can go in parallel with anything.
- PR 2 touches most of `main.ts`, so it should land in a quiet moment, between other `main.ts` work (#966 and #968 first).
- PRs 4a and 4b are the big ones in render.

---

## E. How it meets the work in flight

1. **Foxtrot (#968, holding the night behind the chart; the landing bake; tree seeds by island).**
   - #968's hold (paused clock, no drawing, the art queue held) is exactly the state `startNight` wants the old night in. With it merged, ending the old night can begin the moment the sail is chosen.
   - **The landing bake** draws the chosen island's area types into the IndexedDB art cache, under the night's seed and style hash.
     - In place, the game must use the **same seed** and a style built the same way, or the bake is wasted.
     - Better: the bake runs on the page's own art pool (`assets.ask`), not six extra workers, so the art lands straight in memory and no workers compete.
     - `dispose()` must stop the bake if another island is chosen.
   - **Tree seeds by island.**
     - If the type art is seeded by the island rather than the night, `types` can be keyed by island. Revisiting an island then finds its trees in the IndexedDB art cache (only this island's stay in memory: decision 6).
     - `assets.reseat` then takes the island's seed; the generation token is still needed.
     - Worth agreeing with Foxtrot before PR 4b.
2. **Delta (the chart meshes).**
   - The chart overlay has its own WebGLRenderer (SeaChart), and the map table another. Today the reload clears both.
   - In place, they must free everything on close: browsers allow about 16 live WebGL contexts and lose the oldest.
   - Test C3 opens and closes the chart on every sail, so it covers Delta's meshes.
   - Longer term, drawing the chart through the game's own renderer would remove a context. That's Delta's call.
3. **Alpha (making the map in a worker during the flight).**
   - This matters more without a reload: the page and the music keep running, so a 0.6–2 s map build on the main thread would stall them.
   - **But a `ForestMap` can't cross from the worker:** it holds closures, and its many WeakMap caches live in the thread that built it.
   - **Two ways:**
     - (a) The worker returns a plain, serialisable map, and a `hydrateMap(data)` on the main thread rebuilds the closures. This needs a test that hydrate(worker(seed)) gives the same fingerprint as `generateMap(seed)`.
     - (b) The worker only pre-warms the archipelago and outline caches, and the main thread builds the map in slices (yielding each frame) during the flight.
   - (a) is the real fix; (b) is a stopgap. Alpha should know the seam is `startNight` step 2: it can take a ready map in place of building one.
4. **Golf (#966, the treehouse rooms and the bedroom).**
   - The bed "ends the night as Play again does" (a reload) and becomes `startNight({ how: "bed" })` in PR 6.
   - **The rooms** are drawn in the treehouse's plane from `config/house.json`.
     - They are island-independent, so they can stay on the page.
     - They are placed by the island's treehouse, so they move with the island layers. That needs one re-point, not a rebuild.
5. **The wake-up and the first load on the chart.**
   - **First load.** With the Page/Night split, a Page can run with `night = null`: the chart overlay open, the music's intro playing, the art workers warming home.
     - Choosing home (the only one unlocked in a first game) calls `startNight`.
     - chart.html then becomes a shortcut to this, not a separate page.
   - **The wake-up.** The bedroom (Golf's room, island-independent) is drawn first. Meanwhile `startNight` builds steps 1–3 in slices behind it:
     - the alarm, snooze, stretch, getting out of bed, then hair and skin at the mirror;
     - the view out of the window waits only for the island root to be ready.
   - The wake-up's length is the build's budget: Foxtrot's timeline puts building the island at about 15–25 s on the cloud's software renderer, so far less on a real GPU.
   - The swap (step 4) happens while she's at the mirror. The window shows the new island when she turns back.

---

## F. Risks, and Ed's decisions

**Risks**

- **One missed reader drives the old night.** Twenty-odd pieces hold the game today.
  - *Mitigation:* the `Night` holder, `window.witch` getters, the `disposed` assertion in `stepGame`, and the listener count in C3.
- **A long map build blocks the main thread during the flight.** The music is safe: by decision 3 only the sea and flight cue plays then, and it is audio nodes that need nothing from the main thread. But the chart's flight and the bedroom's animation would still stutter.
  - *Mitigation:* Alpha's worker, or building in slices.
- **Leaking GPU memory a little per sail**, which shows only after many sails.
  - *Mitigation:* C3, and building before disposing.
- **A lost WebGL context** still reloads (view.ts:345). Unchanged, and fine.
- **Debug state.** The repro link keys (`wave`, `at`, `cleared`…) must not carry to the next island. The URL pushed for each night drops them. The sliders do carry, on purpose (decision 5).
- **Sliders and the tests.** Since game knobs carry over, "night 2 equals a fresh page" holds only for a fresh page given the same sliders. C1 tests exactly that.

**Ed's decisions** (2026-10-19, through the coordinator)

1. **Back after a sail opens the pause menu.**
   - The game captures Back so nothing is lost by accident (section B, "Back"; PR 5; test C6).
2. **A failed sail reloads quietly, as today.**
   - There is no message (section B, "The fallback").
3. **The music fades to a quiet sea and flight cue, then the new night's start.**
   - There is no crossfade from the old night (section B step 6; PR 3; test C5).
4. **The new way is on as soon as the tests pass.**
   - PR 5 turns `sail.inPlace` on. `?sail=reload` keeps the old way for comparison.
5. **Every pause-page slider carries to the next island, game knobs included.**
   - `nightTuning` re-applies them on purpose to a pristine copy, rather than inheriting them by accident through the shared config (A3; PR 1; test C1).
6. **Only this island's own art is kept in memory.**
   - After the swap, the old island's own art (its area types and trees, treehouse and soundsystem sets) is evicted (section B step 5; PR 4b).
   - Sailing back redraws it from the IndexedDB art cache.
   - The creature species' art stays page-wide, as it is now (Ed, 2026-10-20): it isn't evicted per island, so the leak test (C3) lets it warm up over the first rounds.
7. **chart.html stays, as a link that opens the game on the chart** (PR 7).

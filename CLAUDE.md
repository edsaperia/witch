# Witch

Witch is a new videogame by Ed Saperia (Ed, 2026-10-03). Its design so far is `DESIGN.md`. Engine (Ed, 2026-10-03): prototype in Three.js in the browser, port to Godot once Ed is happy; so the game's state and rules live in `src/rules/` with no Three.js in them, and `src/render/` draws them. Anything else not yet decided: ask Ed rather than assume, and record his answers here.

Work on Witch follows the shared rules in [edsaperia/dev-ops](https://github.com/edsaperia/dev-ops): `AGENTS.md`, `CONVENTIONS.md` and `claude/QUESTIONS-PAGE.md`. This file adds what is specific to Witch and wins where the two disagree.

## Deploys

The playable game is a static site on GitHub Pages, served from the `gh-pages` branch by `.github/workflows/pages.yml`:

- a push or merge to `main` builds the game and publishes it at the site's root, https://edsaperia.github.io/witch/ — **merging to `main` deploys**;
- each pull request from this repository is built and published under `/pr-<number>/` (https://edsaperia.github.io/witch/pr-<number>/), and the workflow comments that link on the PR; closing the PR removes it;
- documents-only changes still rebuild and republish the same game (no `docs` lane yet).
- every build writes `version.json` beside the game (its label, `vite.config.ts` `versionFile`; main's at the root, a PR's in its `pr-<number>/`); a page left open reads it on load, on pausing and every five minutes, never from a cache, and while a newer build is up says so in the bedroom and on the pause page: "A newer version (v3712) is out", with a reload button (Ed, 2026-10-14; `src/app/newBuild.ts`), and so does a menu whose code a deploy has replaced under it (Hotel's #906).
- many deploys at once are fine: each writes only its own folder (main the root, a PR its `pr-<number>/`), and one whose push to `gh-pages` is beaten fetches the newer branch and tries again (up to ten times).

Pages must be switched on once in the repository's settings (Source: *Deploy from a branch*, `gh-pages`, `/ (root)`); until then the links return 404. A deploy is verified by opening the link and checking the seed and the game load.

## What's new

The start screen shows a **What's new** panel: the last three entries of the changelog, newest first. The changelog is **one small file per change** in `config/changelog/` (Ed, 2026-10-05: so builders working in parallel don't conflict), collected at build time by `src/changelog.ts`:

- Every push that changes something Ed can see **adds a new fragment file**, `config/changelog/<yyyy-mm-dd>-<slug>.json` (e.g. `2026-10-05-bigger-areas.json`), holding `{ "version": null, "items": ["…"] }`: its bullets in plain player-facing words ("Trees no longer pop in and out"), not commit-speak. Several pushes of one piece of work may add to that same fragment.
- Once its build has a number (the playable-link comment), **write that number into your own fragment's `version`** on your next push. Never edit anyone else's fragment.
- `config/changelog/archive.json` holds everything up to round 9 and is frozen: never edit it. There is no shared list to edit.
- Fragments with the same version make one entry (the newest file's items first); the current build's (`version: null`) shows as the build being played. `src/changelog.test.ts` checks every file's shape.

## Builders and the coordinator (Ed, 2026-10-29)

Several builders work in parallel (Claude sessions and Codex alike); one **coordinator** session briefs them, combines their work, checks it and publishes. These rules win over older wording below.

- **Branches.** Work on your own branch off `claude/prototype` (Codex: `codex/<topic>`), with a draft PR into `claude/prototype`. **Never push to `claude/prototype` or `main`, and never release:** the coordinator combines ready branches on one build, runs the full check once and publishes (Ed, 2026-10-28: "combine them on one branch, run one check, publish once").
- **Checks before a FINAL:** `npm run typecheck` plus the tests near what you touched (and `node art/check.mjs` when you touch the art). **Not** the full suite or the smoke tests: the coordinator runs those on the combined build (Ed, 2026-10-29: "Be economical ... Try and batch testing if it saves tokens"). CI still runs everything on your PR.
- **Reports:** short. `REPORT:` while working, `QUESTION:` when blocked, `FINAL:` when done: what changed and why, the tests, anything you noticed but didn't fix, how Ed can check it in play. Claude builders send them to the coordinator's session; Codex posts them as PR comments, and reads `COORDINATOR:` comments there.
- **Talk only to the coordinator,** not to other builders: it relays (Ed, 2026-10-29). If you need another builder's area, say so in a `QUESTION:`.
- **Pictures only when Ed will look at them** (a visual change he asked for, a before/after); none for logic fixes. Through `tools/shots/push.mjs`, as below.
- **Small changes stay small:** no slow tools, no extra polish beyond the brief; take care and go slowly only when a problem is suspected (Ed, 2026-10-29).
- **Ed's words are the spec.** Quote them in comments and docs with the date; when a brief and Ed's words disagree, ask.
- **For Ed:** plain words, numbered points, UTC times, and honesty about quality (what's rough, what's unverified).

## Fixing bugs (Ed, 2026-10-13)

Bring a bug back to Ed early rather than guess: he can answer questions, take a log or test in play faster than a builder can work round a gap.

- **Check the report first.** If it lacks something you need (the version, what he was doing, a screenshot, the L log), ask straight away, through the coordinator.
- **15 minutes to reproduce.** Can't make it happen by then? Stop and report what you tried and exactly what you need from Ed: a question, a log taken a certain way, or something to try in play.
- **No unconfirmed "fixed".** If you can't see the bug go away yourself, say so in the PR and give Ed a short in-game check (e.g. "load v36xx with an empty cache, start a night: is the witch visible?").
- **Make the next sighting count.** If the L log wouldn't show what went wrong, add the logging that would.
- **Visual bugs: measure, don't eyeball** (Ed, 2026-10-14, after the circle hunt). First write down what should hold (e.g. "see-through at full opacity draws the same as see-through off"), render both and pixel-diff them; bisect with that number, not by comparing screenshots in a dark forest. Try it on the cloud renderer before assuming it's Ed's machine.
- **No fix on an untested theory.** Push a fix only once the measurement changes; otherwise send Ed one build with every switch in it, not one build per guess.

## Testing

CI (`.github/workflows/ci.yml`) runs on every push and pull request, in this order:

- `npm ci`
- `npm test` (Vitest: the rules modules in `src/rules/`, including the partition checked against the Art Lab's own `makePartition`, and the geometry of the on-screen cues in `src/render/indicator.test.ts`)
- `npm run typecheck` (`tsc --noEmit` over `src/`, `config/` and `vite.config.ts`)
- `npm run build` (Vite, into `dist/`)
- then, in a second job, `npm run smoke:quick` on that build: the quick smoke test (`tools/smoke/quick.cjs`, headless Chromium with Playwright installed in CI and its Chromium cached; a few minutes). It loads the game at 960×540 with `?quick=1` (only the art the start needs; `QUICK_SIZE=1280x720` for another size), starts, hops off the treehouse deck, flies about 2.5 s of game time on the ground, rises, flies about 2.5 s in the treetops and descends (kept short: the runners' software renderer takes 20 s or so a second of game time), and fails on any page or console error, a blank picture, a witch that doesn't move, rise or descend, or the page's thread held over 15 s while it loads and starts (a heartbeat from its first script; `QUICK_STALL_MS`), or, walking her through the treehouse (Terrace, Parlour, Bestiary, Studio) a fixed frame at a time with the picture's draw left out, any frame's drawing in the house (the view's "witch" part) over 150 ms (`QUICK_HOUSE_MS`; its furniture, rooms' dressing, Workshop pictures and the crown's clearings are drawn by the art workers: `render/housePieces.ts`, `render/workshopPieces.ts`, `render/crownMask.ts`); then sails in place to fox (`window.witch.sail`), checks Back opens the pause menu on that night, and, the party over (`window.witch.lose`), holding E at the treehouse's bed starts the next night on that island in place, a new seed (`QUICK_SAIL=0` skips those). Its screenshot and log are kept as the run's `smoke-quick` artifact. Then the music check, `node tools/music-lab/check.cjs`: it builds the Music Lab and, in headless Chromium, renders every section of `config/music-style.json` offline, four at a time (plus a build into a wave under siege and the game's mix far off and damaged), failing on a script error, a fetch, silence, NaN or clipping, then plays it live and jumps to a wave. Run it before every push that touches the music. Then the pause check, `node tools/smoke/pause-on-top.cjs`: each overlay (the sea chart, the map table, a dressing station, the Workshop's bay and pegboard, the telescope, the finds dev panel) opened and paused over, failing unless the pause page is on top, the screen's middle hits its shield, keys and a stubbed pad reach nothing under it, and Esc returns to the overlay (`platform/freeze.ts`). The full smoke test below still covers pops, floating, big windows, touch and waves. **The singer's tuning check** (Ed's singer review, 2026-10-14): `node tools/music-lab/tune.cjs [section] [seed] [bars] [wave]` has the game's engine render the sung line alone (the recorded voice, as the game plays it) over a breakdown in headless Chromium, dry and then through the voice effects, pitch-tracks each sung note's middle and fails if a dry note sits over 20 cents off the note asked for or wobbles over 20 cents within itself, or the line leaves the alto (MIDI 55 to 67 in the home key). Run it before every push that touches the singer (the sung part, the recorded voice's patch, the voice effects).

**Push first, slow checks after** (Ed, 2026-10-04: "All the builders should push first and run checks afterwards"): when a change works, run the fast checks (`npm test`, `npm run typecheck`, `npm run build`, and `node art/check.mjs` if it touches art), then push straight away so the bot builds a playable version, and post a short REPORT with the version. Then run the slow checks (the smoke run, preview sheets); report any failure, fix it and push again. Never hold a playable build back waiting for the smoke run. (Since 2026-10-29 builders leave the slow checks to the coordinator: see **Builders and the coordinator**.)

**Previews go to `claude/ed-shots` only through `node tools/shots/push.mjs`** (2026-10-26): it adds or replaces just the files named and refuses to delete anything, so a stale staged deletion in a checkout can't take other builders' previews with it; never commit to that branch from a checkout (docs/notes/testing.md **Publishing previews**).

The slower checks and the area tools moved to the notes (each still to be run as it says, by the coordinator on the combined build unless a brief asks a builder): the full smoke test and the proof shots (`docs/notes/testing.md`); the art check before every push that touches the art (`docs/notes/art-checks.md`); the music and sound checks before every push that touches them (`docs/notes/music.md`, `docs/notes/sound.md`); the balance tools after a rules change (`docs/notes/balance.md`); the performance hunts (`docs/notes/performance.md`).

## Glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them. The game's own terms are in `DESIGN.md`'s glossary; these are the prototype's.

Its entries are in the notes below, by area, and listed in [`docs/notes/INDEX.md`](docs/notes/INDEX.md), made from the notes (`node tools/docs/glossary.mjs --write` after adding one; `tools/docs/glossary.test.ts` checks it).

## Notes

The rest of what builders need lives in a note an area, under `docs/notes/` (housekeeping, Ed 2026-10-23: four pull requests went back for conflicts in one day, nearly all in this file). **Before working on an area, read its note; when you change the area, add to its note, not to this file.** This file keeps what every builder needs every time: the deploys, What's new, fixing bugs, testing and this index. The glossary's names are the notes' headings: each note holds its area's entries (bold, as before: a line opening `**Name**` or `- **Name**`), and its tools and checks; [`docs/notes/INDEX.md`](docs/notes/INDEX.md) lists them all, made from the notes, never by hand (the coordinator's docs pass, 2026-10-28: the lists that stood here had fallen 46 entries behind).

- [`docs/notes/run.md`](docs/notes/run.md): The run: the phases of a run, the opening and the party spell, the clock, her controls and the camera, waves, knockouts and the party's end.
- [`docs/notes/house.md`](docs/notes/house.md): The treehouse and its house: the treehouse and its deck, arriving, the house's rooms, the station menus, the Studio, finds, the Workshop and broom parts, hats and brooms, the telescope.
- [`docs/notes/cauldron.md`](docs/notes/cauldron.md): The gated mushroom collection, shared kitchen and Mirror Floor preview; checks and remaining scope.
- [`docs/notes/witch-art.md`](docs/notes/witch-art.md): The witch's art: the witch generator, the party witches and their pair poses, her lean cycle.
- [`docs/notes/world-art.md`](docs/notes/world-art.md): The world's art: area types and recipes, layouts, flora and trees, props and scenes, party objects, the dancefloor and soundsystems, paths, the art style, the pixel wind.
- [`docs/notes/creatures.md`](docs/notes/creatures.md): Creatures' art: genomes and templates, textures and palettes, evolution kits, faces, the live rig, the sleeping legends' art.
- [`docs/notes/island.md`](docs/notes/island.md): Islands and the journey: island growth and shape, the land, lakes, biomes and beaches, the archipelago and the sea chart, sailing in place, kinds, the zoo.
- [`docs/notes/view.md`](docs/notes/view.md): The view: what the renderer draws over the world: tilt-shift, the ground and its hills, ley lines, the sky and moon, smoke, pops, the debug overlay and test sliders.
- [`docs/notes/gameplay.md`](docs/notes/gameplay.md): Creatures in play: inviting, the leash and sigils, combat and sieges, creature states, the legends and their quests.
- [`docs/notes/music.md`](docs/notes/music.md): The music: the music engine, its style, sections and arc, the singer, the labs and studio, samples.
- [`docs/notes/sound.md`](docs/notes/sound.md): Sound effects: the synthesised sound effects, babble and whale song, the mix.
- [`docs/notes/balance.md`](docs/notes/balance.md): Balance: the balance simulators and bots, fighting value, populations and costs, the playtest log.
- [`docs/notes/balance-baselines.md`](docs/notes/balance-baselines.md): Balance baselines: the matched-seed, matched-bag tables from the real-rules report (v5655; one seed, no tuning).
- [`docs/notes/balance-report-coverage.md`](docs/notes/balance-report-coverage.md): Real-rules reports: the report tool, how to rerun it, and what the old balance sims still cover.
- [`docs/notes/expert-search.md`](docs/notes/expert-search.md): Expert search: observation limits, deterministic training, protected seeds and the survey adapter.
- [`docs/notes/balance-study.md`](docs/notes/balance-study.md): Balance study: the follow-up on the real rules after the report tool (#1475): the matched-tempo preflight and the study's limits.
- [`docs/notes/balance-survey-design.md`](docs/notes/balance-survey-design.md): Balance survey: the frozen five-study cloud design, first-wave limits and expert feedback gates.
- [`docs/notes/config.md`](docs/notes/config.md): Config files: the tuning file (values only) and its schema, the knobs' words in `config/knobs/<section>.json` (what each does, Ed's decisions), the style file, the link switches registry.
- [`docs/notes/testing.md`](docs/notes/testing.md): Testing tools: the full smoke test, proof shots.
- [`docs/notes/art-checks.md`](docs/notes/art-checks.md): Art checks: the art generator's check, the style bible, the genome compare, the lab and export commands.
- [`docs/notes/performance.md`](docs/notes/performance.md): Performance: the View's build in slices, the start's shaders, the stall hunt.
- [`docs/notes/making-of.md`](docs/notes/making-of.md): The Making Of: the static site about how the game was made.
- [`docs/notes/online-prototype.md`](docs/notes/online-prototype.md): The separate two-browser prototype: local relay, host authority, joining, checks and current limits.

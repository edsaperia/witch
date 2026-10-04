# Witch

Witch is a new videogame by Ed Saperia (Ed, 2026-10-03). Its design so far is `DESIGN.md`. Engine (Ed, 2026-10-03): prototype in Three.js in the browser, port to Godot once Ed is happy; so the game's state and rules live in `src/rules/` with no Three.js in them, and `src/render/` draws them. Anything else not yet decided: ask Ed rather than assume, and record his answers here.

Work on Witch follows the shared rules in [edsaperia/dev-ops](https://github.com/edsaperia/dev-ops): `AGENTS.md`, `CONVENTIONS.md` and `claude/QUESTIONS-PAGE.md`. This file adds what is specific to Witch and wins where the two disagree.

## Deploys

The playable game is a static site on GitHub Pages, served from the `gh-pages` branch by `.github/workflows/pages.yml`:

- a push or merge to `main` builds the game and publishes it at the site's root, https://edsaperia.github.io/witch/ — **merging to `main` deploys**;
- each pull request from this repository is built and published under `/pr-<number>/` (https://edsaperia.github.io/witch/pr-<number>/), and the workflow comments that link on the PR; closing the PR removes it;
- documents-only changes still rebuild and republish the same game (no `docs` lane yet).

Pages must be switched on once in the repository's settings (Source: *Deploy from a branch*, `gh-pages`, `/ (root)`); until then the links return 404. A deploy is verified by opening the link and checking the seed and the game load.

## Testing

CI (`.github/workflows/ci.yml`) runs on every push and pull request, in this order:

- `npm ci`
- `npm test` (Vitest: the rules modules in `src/rules/`, including the partition checked against the Art Lab's own `makePartition`)
- `npm run typecheck` (`tsc --noEmit` over `src/`, `config/` and `vite.config.ts`)
- `npm run build` (Vite, into `dist/`)

Not in CI, run by builders before a FINAL: `npm run build && npm run smoke`, a headless Chromium smoke test (`tools/smoke/smoke.cjs`, Playwright from the machine's global install; never `playwright install`) that flies both modes on the laptop and phone layouts, drives the touch controls, and saves screenshots to `previews/`.

The art generator (`art/`, entry `art/generator.js`) and the Witch Art Lab (`tools/art-lab/`) have one more check, not in CI, run from the repository root before every push that touches them:

- `node art/check.mjs` — builds the lab, opens the source page and the built page in headless Chromium (no script errors, a bestiary card for every species, the scene drawn), and draws every creature, tree, bush, area type, soundsystem and sigil (each non-empty, creatures and soundsystems standing on their bottom row; baby < young < adult < legend for every species, and the bigger species' adults 1.15 to 1.45 times the witch; party gear (collar, hat, shoes) shows on every species at baby, young and adult without changing its size, woken eyes glow red, partyGear is seeded and varied; only magical materials glow, and flowering areas have no glowing pixels; a soundsystem about three times the witch; the hero dancefloor's patterns each fit the circle, keep to their palette of 2 to 4 neons, run whole beats and light up, over levels 1 to 4, 20+ general ones, the switch-on, and a shape for each of the 30 areas in its neon, its transitions run from all old to all new, and its tiles (lit brighter at each intensity), grout, rim (repeating exactly) and floor draw; every wooded area has at least 8 tree variants over at least 3 height classes, taller by class; every tree species draws, each crown differs measurably from every other's from the treetops, areas with the same layout pattern never share a main species, none is the main kind of more than two areas, and plain broadleaf is left only to the dead woods; every species' bottom half carries some life (ivy, moss, sprigs, low boughs, skirts), saplings more, without changing its top half, and no wall of leaves at the witch's eye height; the witch's rise, descend, fast and brake frames exist for both facings at her ordinary scale with nothing NaN; so do her on-foot poses (stand 3, land 3, takeoff 3, talk 4, placeSigil 3, liftSigil 3, sit 2), each with hand and hat-tip anchors inside the sprite, the hand above her hat reaching for the stack and down by her feet at the ground; every species has a sigil that renders as vector, as a 12 px glyph, on the ground and floating, its strokes inside the box, each level's ground rune bigger, the young's ring dotted and the adult's full (telling apart at 14 px); the treehouse is 12 to 18 m tall turned towards and away, its top and bottom halves add up to the whole, its windows glow, and its seat anchor is on the terrace; every area has a set piece, the twenty new 3D ones standing on the ground at 6 to 12 m; the modern relics (15+), the playground (6 pieces) and the sports grounds stand, their ground decals lie flat at 15 to 30 m, only the flagged ones glow and every arrangement names real pieces with one glowing touch at most; the world decorations (12 ruins in two conditions, 8 rocks, 8 freak trees) stand, ruins 4 to 14 m with a few tall enough for the treetops, tall ones split top and bottom, only the flagged ones glow, and the lake kit is whole; each of the 10 path kinds' strips repeats exactly every period (so it tiles along a spline), with an end, a Y and a T, only the magic trail glows, the railway's points, broken end and crossing are drawn, the 3D path pieces stand, and every area suits a path kind; the leash stack stands newest at the bottom, trails behind her flight and settles).

Related commands: `node tools/art-lab/build.mjs` writes the self-contained lab page to `tools/art-lab/dist/witch-art-lab.html` (the one to publish); `node art/export.mjs [style.json] [out dir]` exports every asset as albedo and normal-map PNGs with `manifest.json` (default `art/out/`, not committed); `node art/preview.mjs animals|trees|treeheights|areas|sets|lights|soundsystems|sigils|witch|home|relics|grounds|decor|lake|paths|pathpieces|species|canopy|disco|discostrip|discolooks <list> <png> [scale]` renders lit preview sheets. They need Playwright's Chromium (in cloud sessions, under `/opt/pw-browsers`).

## Glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them. The game's own terms are in `DESIGN.md`'s glossary; these are the prototype's.

- **Area type**: one of the kinds of area: Ed's 30, defined with their art in `art/areas.js` (his columns: floor, wall objects, small objects, big objects, set piece, creature). `config/area-types.json` adds the game's own numbers per type (how thick its big objects stand).
- **Wall objects, small objects, big objects, set piece**: Ed's columns. Big objects stand like trees (trees split into top and bottom halves; mounds, boulders and logs whole); small objects scatter like undergrowth; wall objects stand where areas meet and block nothing; a set piece shows in a quarter of its type's areas, in the clearing.
- **Treehouse**: the witch's home near the dancefloor (`art/treehouse.js`), a camper van crossed with a castle stuck in a giant tree; she starts the game sitting on its terrace (`sit` pose at its `seat` anchor).
- **Layout**: an area type's `layout` in `art/areas.js`: how its trees and undergrowth are arranged (pattern, density, clumping, glades, height mix, lean, terrain, decorations, a one-line feel); data the prototype's layout engine reads.
- **Modern relics**: the forest's reclaimed modern world (`art/relics.js`): cars, trolleys, cones, broken highway, odds and ends, an overgrown playground and sports grounds, with suggested arrangements; no brands or text.
- **World decorations**: scattered features any area can have, independent of its own props (`art/decor.js`): ruins, rocks, freak trees, and the lake kit; an area's `layout.decor` will weight their families.
- **Path kinds**: the ten kinds of path (`art/paths.js`), each a ground-space strip the prototype sweeps along a spline, with end and junction patches and 3D edge props; the railway adds points, a broken end, a crossing and landmarks.
- **Hero dancefloor**: the round floor of 30-across glass tiles in a carved stone rim (`art/dancefloor.js`), lit by the prototype's tile-lighting engine: a pattern library (shapes, loops, fills, the switch-on sequence and one shape per area from its creature's sigil), each with its beats, palette of neons and party level (1 calm to 4 full rave), transitions (wipe, iris, dissolve, burst), and the tile looks (unlit, lit at three intensities, grout, rim).
- **Tree species**: the kinds of tree in `art/trees.js` (`TREE_SPECIES`): the original six and fifteen UK species (oak, beech, ash, lime, sycamore, horse chestnut, rowan, alder, Scots pine, yew, hawthorn, holly, hazel, weeping birch, larch); each area names a main species and often a minor one.
- **Remoteness**: how far an area is from home, 0 at the dancefloor's area to 1 at the map's edge; creatures grow more numerous and older with it.
- **Tilt-shift**: the post-process blur toward the top and bottom of the screen that makes the forest look like a miniature.
- **Tuning file**: `config/tuning.json`, the numbers Ed edits (speeds, camera, density, glow, pixel size, creatures, bloom, tilt-shift).
- **Style file**: `config/style.json`, a style saved in the Witch Art Lab; every sprite is drawn from it.
- **Top half / bottom half**: a tree's crown and its trunk, drawn as two sprites; tops show in treetop mode only. The bottom half also carries the life below the crown (ivy, moss, epicormic sprigs, low boughs, a skirt on yew, holly and the conifers), so ground mode isn't a forest of bare poles.
- **Debug overlay**: the panel toggled by `~` or a three-finger tap: frame rate, seed, area type, mode.

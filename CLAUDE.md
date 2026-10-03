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

- `node art/check.mjs` — builds the lab, opens the source page and the built page in headless Chromium (no script errors, 20 bestiary cards, the scene drawn), and draws every creature, tree and bush (each non-empty and standing on its bottom row; legends taller than young, young taller than babies).

Related commands: `node tools/art-lab/build.mjs` writes the self-contained lab page to `tools/art-lab/dist/witch-art-lab.html` (the one to publish); `node art/export.mjs [style.json] [out dir]` exports every asset as albedo and normal-map PNGs with `manifest.json` (default `art/out/`, not committed); `node art/preview.mjs animals|trees <list> <png> [scale]` renders lit preview sheets. They need Playwright's Chromium (in cloud sessions, under `/opt/pw-browsers`).

## Glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them. The game's own terms are in `DESIGN.md`'s glossary; these are the prototype's.

- **Area type**: one of the kinds of area: Ed's 30 in `config/area-types.json` (from DESIGN.md), each with his columns (floor, wall, small, big, set piece, creature) plus the stand-ins the prototype draws with until `art/areas.js` exists (leaf colour, tree shapes, the animal sprite).
- **Remoteness**: how far an area is from home, 0 at the dancefloor's area to 1 at the map's edge; creatures grow more numerous and older with it.
- **Tilt-shift**: the post-process blur toward the top and bottom of the screen that makes the forest look like a miniature.
- **Tuning file**: `config/tuning.json`, the numbers Ed edits (speeds, camera, density, glow, pixel size, creatures, bloom, tilt-shift).
- **Style file**: `config/style.json`, a style saved in the Witch Art Lab; every sprite is drawn from it.
- **Top half / bottom half**: a tree's crown and its trunk, drawn as two sprites; tops show in treetop mode only.
- **Debug overlay**: the panel toggled by `~` or a three-finger tap: frame rate, seed, area type, mode.

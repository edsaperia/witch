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

## Glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them. The game's own terms are in `DESIGN.md`'s glossary; these are the prototype's.

- **Area type**: one of the kinds of area (`config/area-types.json`): its leaf colour, favourite tree shapes and creature. 30 placeholders for now.
- **Tuning file**: `config/tuning.json`, the numbers Ed edits (speeds, camera, density, glow, pixel size).
- **Style file**: `config/style.json`, a style saved in the Witch Art Lab; every sprite is drawn from it.
- **Top half / bottom half**: a tree's crown and its trunk, drawn as two sprites; tops show in treetop mode only.
- **Debug overlay**: the panel toggled by `~` or a three-finger tap: frame rate, seed, area type, mode.

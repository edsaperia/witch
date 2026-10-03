# Witch

Witch is a new videogame by Ed Saperia (Ed, 2026-10-03). Its genre, engine and platform are not decided yet; ask Ed rather than assume them, and record his answers here.

Work on Witch follows the shared rules in [edsaperia/dev-ops](https://github.com/edsaperia/dev-ops): `AGENTS.md`, `CONVENTIONS.md` and `claude/QUESTIONS-PAGE.md`. This file adds what is specific to Witch and wins where the two disagree.

## Deploys

Nothing deploys yet: a push or merge to `main` ships nothing. Before any deploy is wired up (a web build, a store upload, a CI release), the coordinator asks Ed on his questions page, and this section is updated with what deploys, how, and from where.

## Testing

There is no CI yet. The art generator (`art/`, entry `art/generator.js`) and the Witch Art Lab (`tools/art-lab/`) have one check, run from the repository root before every push:

- `node art/check.mjs` — builds the lab, opens the source page and the built page in headless Chromium (no script errors, a bestiary card for every species, the scene drawn), and draws every creature, tree, bush, area type and soundsystem (each non-empty, creatures and soundsystems standing on their bottom row; legends taller than young, young taller than babies; a soundsystem about three times the witch).

Related commands: `node tools/art-lab/build.mjs` writes the self-contained lab page to `tools/art-lab/dist/witch-art-lab.html` (the one to publish); `node art/export.mjs [style.json] [out dir]` exports every asset as albedo and normal-map PNGs with `manifest.json` (default `art/out/`, not committed); `node art/preview.mjs animals|trees|areas|soundsystems <list> <png> [scale]` renders lit preview sheets. They need Playwright's Chromium (in cloud sessions, under `/opt/pw-browsers`).

## Glossary

Literal, stable names for the parts of the game, as Ed and the builders agree them.

# Creatures waiting to be kinds

The turtle's records, written and not yet in the game (Ed, 2026-11-12: "Make the sigil etc for the bee and turtle"). The folder
is what `art/creatures/<id>/` holds for a species: `genome.js` (what the generated art makes of it with the meshes off),
`sigil.js` and `bold.js` (its sigil, and the bold form for stacks and runes), `legend.js` and `nap.js` (the generated art's
sleeping forms), `creature.js` (its movement, voice and pack: first guesses, not tuned). Its mesh is `art/mesh/turtle.js`,
drawn, with its nap (drawn into its shell).

It is not in `art/creatures/` because the game holds 64 kinds to 64 islands (`src/rules/kinds.test.ts`; Ed's layout B,
2026-10-23), and every creature in `art/creatures/` is either one of those kinds or on the bench (`src/rules/kinds.ts` `BENCH`).
The turtle waits for Ed to say which kind it replaces (Ed, 2026-11-12: "Suggest a creature with not much identity for the turtle
to replace").

**The bee** was here and is a kind now: it took the marten's place on home, in the old pinewood, with an id of its own (Ed,
2026-11-12: "make a new ID, keep the marten distinct, we may want it back one day"). **The marten** is on the bench: its folder,
its mesh and its lines in the config tables are all kept, and nothing deals it.

To make the turtle a kind, as was done for the bee:

1. Move its folder to `art/creatures/` and run `node tools/creatures.mjs index`.
2. Give it the island: the area's `creature:` in `art/areas.js`, its `art/areas/<id>/kind.json`, then `node tools/data.mjs areas index`.
3. Give it its lines: `config/creature-actions.json`, `config/species-attacks.json`, `config/attack-look.json`,
   `config/packs.json` (its body radii by `node tools/combat-spacing/body-radii.mjs`, its coordination, its waiting pattern,
   unlike every other's, and its style), `config/legend-footprints.json`, `config/tuning.json` (the lists the kind it replaces
   is in), `art/genome/size-ranks.js`, the Stiltwalkers' leg counts (`src/render/rig/stiltParts.test.ts`).
4. Put the kind it replaces on the bench (`BENCH`) or take its records out, and move the turtle's sizes from
   `MESH_HEIGHTS_PENDING` to `MESH_HEIGHTS` (`art/mesh/index.js`).
5. `node tools/creatures.mjs check`, `node tools/data.mjs areas check`, `node tools/docs/tables.mjs --write`, the tests, and a
   `rules` line in the branch's bench declaration.

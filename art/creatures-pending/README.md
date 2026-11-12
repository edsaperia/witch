# Creatures waiting to be kinds

The bee's and the turtle's records, written and not yet in the game (Ed, 2026-11-12: "Make the sigil etc for the bee and
turtle"). Each folder is what `art/creatures/<id>/` holds for a species: `genome.js` (what the generated art makes of it with the
meshes off), `sigil.js` and `bold.js` (its sigil, and the bold form for stacks and runes), `legend.js` and `nap.js` (the generated
art's sleeping forms), `creature.js` (its movement, voice and pack: first guesses, not tuned). Their meshes are in `art/mesh/`
(`bee.js`, `turtle.js`), drawn, with their naps (the bee lands and folds its wings; the turtle draws into its shell).

They are not in `art/creatures/` because the game holds that every creature has an island and every island one creature: 64 of
each (`src/rules/kinds.test.ts`; Ed's layout B, 2026-10-23), every creature with its own attack, and every attack's creature
with a biome (`src/rules/attacks/species.test.ts`). So neither can be added without a place to live:

1. **The bee** takes the marten's place on home, in the old pinewood, and flies (Ed, 2026-11-11 and 2026-11-12). That is a swap
   of one creature for another in every table the marten is in: `art/areas/old-pinewood/kind.json` and `art/areas.js` (its
   area), `config/creature-actions.json`, `config/species-attacks.json`, `config/packs.json` (its measured body radius, its
   pack's entries, its style), `config/attack-look.json`, `config/legend-footprints.json`, `config/tuning.json` (three lists),
   `art/genome/size-ranks.js`, the Stiltwalkers' leg counts (`src/render/rig/stiltParts.test.ts`), and players' saves, which
   name the marten (when the moth became a swallowtail its id was kept so saves were untouched).
2. **The marten and the turtle** are "kept for other islands", and there is no island free: for Ed to say which kinds they
   replace, or whether the world grows past 64.

To make one a kind once that is settled: move its folder to `art/creatures/`, run `node tools/creatures.mjs index`, give it
its lines in the tables above, move its sizes from `MESH_HEIGHTS_PENDING` to `MESH_HEIGHTS` (`art/mesh/index.js`), and run
`node tools/creatures.mjs check` and the tests.

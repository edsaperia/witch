// Area ids renamed when the roster moved their creatures to the biomes and their areas were re-themed (Ed, 2026-10-25: "rename
// internally too", e.g. garden to snowy-taiga). An area's place among the area types (its type id on every map) doesn't change,
// so maps, seeds and the art's seeds are as they were; only the id does. Saves keep kinds, never area ids (app/chartSave.ts), so
// none needs rewriting; an old id can still come in from outside (a link's ?shot=area:<id>, a zoo layout, a tool's argument), and
// areaIdOf maps it to today's. src/rules/areaRenames.test.ts checks every old id is gone and its new one is an area.
//
// Renaming an area (the pattern for the roster's re-themes, one biome a pull request):
//   1. git mv art/areas/<old> art/areas/<new>; in it, the recipe's `id` and its export's name (or the original area's flora
//      export, AREA_FLORA_<NEW>), then node tools/data.mjs areas index
//   2. an original area (art/areas.js): its entry's id and its AREA_LAYOUTS key
//   3. every other place that names it by id: git grep -n -- '<old>' (config/area-types.json, config/zoo.json, art/paths.js
//      moods, art/scenes.js suits, src/render/legendFloor.ts, src/platform/audio/*.ts, docs), each to the new id
//   4. add the pair here, oldest first
// Re-theming one (each PR lists what it borrows and what's new art; set pieces are off, Ed 2026-10-11, so they're left be):
//   - reuse first: trees from the biome's list (art/flora/biomes.js and India's per-biome species), ground, tufts and props from the
//     biome's existing areas (a recipe's or an original area's fields), nothing drawn new unless nothing fits
//   - grade by its kind's ring (its island's phase, the kind's phase + 1; Ed, 2026-10-25: "lower phase non-home biome areas can be
//     semi-temperate looking; higher phase biomes are more extreme"): ring 3 semi-temperate (about a third temperate trees, a
//     softer ground), ring 4 mostly biome (a temperate tree as a minor at most), ring 5 fully the biome
//   - India's biome look still goes over the top, by the island's bearing (art/flora/biomes.js) and, from #1126, at a strength by
//     ring (the tuning's biomeLooks: .55, .8, 1), so don't tint for the biome twice
//   - a freed tree, prop or ground no longer used anywhere: say so in the PR, for the temperate PR to rehome
export const AREA_RENAMES = {
  "holly-thicket": "thorn-scrub",
  norway: "jungle-understory",
  "cave-mouth": "jungle-cave",
  stream: "mangrove-channel",
  heronry: "mangrove-heronry",
  garden: "snowy-taiga",
  bog: "tundra-bog",
};

/** Today's id for an area id, old or new (a rename of a rename followed to its end). */
export function areaIdOf(id) {
  let out = id;
  for (let i = 0; i < 8 && Object.prototype.hasOwnProperty.call(AREA_RENAMES, out); i++) out = AREA_RENAMES[out];
  return out;
}

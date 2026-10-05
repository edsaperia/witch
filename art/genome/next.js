// Art sets: the art iterations (docs/art-iterations/, ahead of the art pass of issue #92), as data on top of the
// genomes. An iteration changes creature genome records, adds plant genomes and changes what an area grows; it
// never changes the default art. A style's artSet picks one: "<area>@<n>" an area's set at its nth iteration (each
// iteration a patch on the one before), "new@<n>" the new creatures' nth, or "next" every area's chosen iteration
// together (the game's ?art=next, for Ed to compare). Without artSet everything draws as it always has.
//   genomes: { id: patch } a patch on that species' record (objects merged, arrays and values replaced, null removes);
//            a patch whose id is not a species makes a new one (it must then be a whole record).
//   plants:  { id: plant genome } new tree species (art/flora/genomes.js's schema), or patches on existing ones.
//   areas:   { id: patch } a patch on the area type's def (art/areas.js): its big and small objects, leaf hue, floor.
import { GENOME_BY_ID, speciesOf, genomeProblems } from "./index.js";
import { PLANT_GENOMES } from "../flora/genomes.js";
import { plantSpecies } from "../trees.js";
import { ART_ITERATIONS, NEXT_CHOICE } from "./iterations.js";
export { ART_ITERATIONS, NEXT_CHOICE };

const isObj = v => v && typeof v === "object" && !Array.isArray(v);
export function mergePatch(base, patch) {
  if (!isObj(base) || !isObj(patch)) return patch === undefined ? base : patch;
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) { if (v === null) delete out[k]; else out[k] = isObj(v) && isObj(base[k]) ? mergePatch(base[k], v) : v; }
  return out;
}

// The iterations an art set is made of, in order: [{ genomes, plants, areas }, ...].
function steps(name) {
  if (name === "next") return Object.entries(NEXT_CHOICE).flatMap(([group, n]) => (ART_ITERATIONS[group] || []).slice(0, n));
  const m = /^([a-z-]+)@(\d+)$/.exec(name || "");
  if (!m || !ART_ITERATIONS[m[1]]) return [];
  return ART_ITERATIONS[m[1]].slice(0, +m[2]);
}

const SETS = new Map();
// An art set, resolved: { species: { id: the builders' species object }, genomes: { id: record }, plants: { id: tree species }, plantGenomes, areas: { id: patch } }.
export function artSet(name) {
  if (!name) return null;
  let set = SETS.get(name);
  if (set) return set;
  const genomes = {}, plantGenomes = {}, areas = {};
  for (const s of steps(name)) {
    for (const [id, p] of Object.entries(s.genomes || {})) genomes[id] = mergePatch(genomes[id] || GENOME_BY_ID[id] || {}, { id, ...p });
    for (const [id, p] of Object.entries(s.plants || {})) plantGenomes[id] = mergePatch(plantGenomes[id] || PLANT_GENOMES[id] || {}, p);
    for (const [id, p] of Object.entries(s.areas || {})) areas[id] = mergePatch(areas[id] || {}, p);
  }
  const problems = Object.values(genomes).flatMap(genomeProblems);
  if (problems.length) throw new Error(`art set ${name}: ${problems.join("; ")}`);
  const species = Object.fromEntries(Object.values(genomes).map(g => [g.id, speciesOf(g)]));
  const plants = Object.fromEntries(Object.entries(plantGenomes).map(([id, g]) => [id, plantSpecies(id, g)]));
  set = { name, genomes, species, plantGenomes, plants, areas };
  SETS.set(name, set);
  return set;
}
// Every art set name the iterations make: each group's iterations, and "next".
export const ART_SET_NAMES = [...Object.entries(ART_ITERATIONS).flatMap(([g, list]) => list.map((_, i) => `${g}@${i + 1}`)), "next"];
// The species object for an id in a style's art set, or null (then the default).
export const setSpecies = (id, st) => (st?.artSet && artSet(st.artSet)?.species[id]) || null;
// A tree species by name in a style's art set, or null.
export const setPlant = (type, st) => (st?.artSet && artSet(st.artSet)?.plants[type]) || null;
// An area type's def with its art set's patch, or the def itself.
export const setArea = (def, st) => { const p = st?.artSet && def && artSet(st.artSet)?.areas[def.id]; return p ? mergePatch(def, p) : def; };

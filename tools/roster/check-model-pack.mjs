// No browser or geometry rendering: exercise the exact shared selection contract.
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRosterVariants } from "../../art/roster/presets.js";
const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha || "")) throw Error("Supply the prepared exact model SHA");
const root = resolve("previews", `roster-model-${sha}`, "art");
const G = await import(pathToFileURL(resolve(root, "genome/index.js")).href);
const pack = createRosterVariants(G.GENOMES);
const clean = p => { const out = { ...p }; if (!out.over || !Object.keys(out.over).length) delete out.over; return out; };
for (const id of ["beetle", "snowleopard"]) {
  const original = G.GENOME_BY_ID[id], context = { creatureModels: `${id}:roster`, creatureVariants: pack };
  assert.deepEqual(clean(G.selectedCreatureGenome(original, context, 3).palette), clean(original.palette), `${id} elder palette`);
  assert.equal(G.selectedCreatureGenome(original, {}).palette, original.palette);
  for (const level of [0, 1, 2]) assert.notDeepEqual(G.selectedCreatureGenome(original, context, level).palette, original.palette);
  console.log(`${id}: exact shared-hook elder palette restored, ordinary palette differs, default unchanged`);
}

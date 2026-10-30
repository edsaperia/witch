// No browser or geometry rendering: exercise the exact shared selection contract.
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRosterVariants, expectedRosterLegendPalette } from "../../art/roster/presets.js";
const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha || "")) throw Error("Supply the prepared exact model SHA");
const root = resolve("previews", `roster-model-${sha}`, "art");
const G = await import(pathToFileURL(resolve(root, "genome/index.js")).href);
const pack = createRosterVariants(G.GENOMES);
const clean = p => { const out = { ...p }; if (!out.over || !Object.keys(out.over).length) delete out.over; return out; };
for (const id of ["beetle", "snowleopard"]) {
  const original = G.GENOME_BY_ID[id], context = { creatureModels: `${id}:roster`, creatureVariants: pack };
  assert.equal(JSON.stringify(clean(G.selectedCreatureGenome(original, context, 3).palette)), JSON.stringify(clean(expectedRosterLegendPalette(original))), `${id} elder palette (same strict comparison as capture)`);
  assert.equal(G.selectedCreatureGenome(original, {}).palette, original.palette);
  for (const level of [0, 1, 2]) assert.notDeepEqual(G.selectedCreatureGenome(original, context, level).palette, original.palette);
  console.log(`${id}: exact declared shared-hook elder palette, ordinary palette differs, default unchanged`);
}
const { mandiblePart } = await import(pathToFileURL(resolve(root, "body-graph/mandibles.js")).href);
const jaw = G.selectedCreatureGenome(G.GENOME_BY_ID.beetle, { creatureModels: "beetle:roster", creatureVariants: pack }, 2).look.mandibles;
const jaws = [-1, 1].map(side => mandiblePart([0, 0, 0], side, .95, jaw, "towards"));
const gap = Math.abs(jaws[0].tip[2] - jaws[1].tip[2]) - jaws[0].points.at(-1)[3] - jaws[1].points.at(-1)[3];
assert.ok(gap > .03, "adult jaw tips retain an actual model-space gap");
console.log(`beetle adult tip gap ${gap.toFixed(5)} model units; projected readability still needs cloud review`);

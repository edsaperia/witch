// Writes art/mesh/species/index.js, the list of every kind drawn as a mesh, from the folder: one import a file in
// art/mesh/species/ (each exports MESH: its id, heights, plans and sleeping options), sorted by id. So a batch adding kinds adds
// files and runs this, and never edits a list by hand (docs/plans/creature-mesh-rollout.md, step 0; as art/creatures/index.js is
// made by tools/creatures.mjs).
//   node tools/creature-mesh/index.mjs           writes it
//   node tools/creature-mesh/index.mjs --check   fails if it is stale (src/render/meshCreatures.test.ts checks the same)
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../art/mesh/species"), INDEX = path.join(DIR, "index.js");

/** The ids with a file in art/mesh/species/, sorted. */
export const meshIds = () => readdirSync(DIR).filter(f => f.endsWith(".js") && f !== "index.js").map(f => f.slice(0, -3)).sort();

/** What art/mesh/species/index.js should hold for those ids. */
export function indexText(ids = meshIds()) {
  return ["// Every kind drawn as a mesh, from art/mesh/species/<id>.js, sorted by id. Written by `node tools/creature-mesh/index.mjs`: never", "// edit by hand (add a file and run the tool; src/render/meshCreatures.test.ts fails if this is stale).",
    ...ids.map(id => `import { MESH as ${id} } from "./${id}.js";`), "", `export const MESH_SPECIES = { ${ids.join(", ")} };`, ""].join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const text = indexText();
  if (process.argv.includes("--check")) { if (!existsSync(INDEX) || readFileSync(INDEX, "utf8") !== text) { console.error("art/mesh/species/index.js is stale: run node tools/creature-mesh/index.mjs"); process.exit(1); } console.log(`art/mesh/species/index.js is fresh: ${meshIds().length} kinds`); }
  else { writeFileSync(INDEX, text); console.log(`art/mesh/species/index.js: ${meshIds().join(", ")}`); }
}

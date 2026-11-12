// Every creature drawn as a mesh, by species and level: MESH_PLANS[species][level]() is its plan (art/mesh/shape.js builds it) and
// MESH_HEIGHTS[species][level] how tall it stands. A kind's own file holds both, and how it sleeps (art/mesh/species/<id>.js; the
// list of them, species/index.js, is made from the folder by tools/creature-mesh/index.mjs), so kinds are added side by side
// without touching a shared table (docs/plans/creature-mesh-rollout.md, step 0).
import { MESH_SPECIES } from "./species/index.js";

export const MESH_LEVELS = ["baby", "young", "adult", "legend"];
/** A kind's four plans, baby to legend. One that curls up to sleep its own way says so with `curl` (art/mesh/gear.js `napping` reads
 *  gait.curl), given to each of its plans here. */
export const MESH_PLANS = Object.fromEntries(Object.entries(MESH_SPECIES).map(([species, m]) => [species, MESH_LEVELS.map(l => (m.curl ? () => { const p = m.plans[l](); p.gait.curl = m.curl; return p; } : m.plans[l]))]));
/** How tall each stands, baby to legend, in art pixels: its whole silhouette, standing still, turned towards us (Ed, 2026-11-12:
 *  "keep the sizes": today's drawn height of the kind at each level, which `node tools/creature-mesh/sizes.mjs <kind>` measures).
 *  Home's are the sizes Ed looked at the ladders at and passed ("Ok these are good", 2026-11-12). */
export const MESH_HEIGHTS = Object.fromEntries(Object.entries(MESH_SPECIES).map(([species, m]) => [species, m.heights]));

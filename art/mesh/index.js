// Creatures drawn as meshes, for the game (Ed, 2026-11-12: "I'm happy with these models, let's do the real build"): which species
// have one, at what size, and their walks as sprites (art/mesh/raster.js draws a plan's shape, art/mesh/shape.js). Off unless the
// style's `meshCreatures` is 1 (the link's ?meshCreatures=1) while they lack what the generated creatures have: party gear, faces,
// their own naps and sleeping legends, a view from above.
import { MESH_PLANS } from "./plans.js";
import { shape } from "./shape.js";
import { bakeMesh, meshStep } from "./raster.js";

/** A walk's frames, each heading. */
export const MESH_FRAMES = 8;

/** How tall each stands, baby to legend, in art pixels: its whole silhouette, first frame, turned towards us. These are the sizes
 *  Ed looked at the ladders at and passed ("Ok these are good", 2026-11-12); they are not yet squared with the game's own body
 *  sizes (art/genome/size-candidate.js), which measure the body without tails, ears or ornament. Only species in the game's
 *  roster are here: the bee has no genome yet, the turtle no island. */
export const MESH_HEIGHTS = { fox: [53, 81, 137, 387], stoat: [41, 63, 88, 229], marten: [45, 69, 97, 237], hare: [74, 114, 164, 491], squirrel: [42, 71, 122, 403], dormouse: [38, 65, 86, 246], badger: [54, 82, 113, 256], mole: [45, 67, 95, 323], hedgehog: [47, 74, 103, 347], snail: [35, 54, 73, 222] };

/** Whether this species is drawn as a mesh under this style. */
export const hasMesh = (species, st) => st?.meshCreatures === 1 && Object.hasOwn(MESH_HEIGHTS, species);

/** A species' walk at a level (0 baby to 3 legend), drawn: art/mesh/raster.js bakeMesh's { w, h, step, towards, away }. Not kept:
 *  a legend's frames are tens of megabytes. */
export const meshWalk = (species, level) => bakeMesh(shape(MESH_PLANS[species][level]()), { height: MESH_HEIGHTS[species][level], frames: MESH_FRAMES, colours: level === 3 ? 24 : 12 });

/** Its walk for the view: frames in its cycle, and step, how far it goes between them as a share of its sprite's width (its
 *  adult's: the view keeps one walk a species). Worked out without drawing anything, once. */
const gaits = new Map();
export function meshGait(species) { let g = gaits.get(species); if (!g) gaits.set(species, (g = { frames: MESH_FRAMES, step: meshStep(shape(MESH_PLANS[species][2]()), MESH_FRAMES) })); return g; }

// Creatures drawn as meshes, for the game (Ed, 2026-11-12: "I'm happy with these models, let's do the real build"): which species
// have one, at what size, and their walks as sprites (art/mesh/raster.js draws a plan's shape, art/mesh/shape.js). Off unless the
// style's `meshCreatures` is 1 (the link's ?meshCreatures=1) while they lack what the generated creatures have: party gear, faces,
// their own naps and sleeping legends, a view from above.
import { MESH_PLANS } from "./plans.js";
import { shape } from "./shape.js";
import { bakeMesh, meshPpu, meshStep } from "./raster.js";
import { dress, napping } from "./gear.js";

/** A walk's frames, each heading. */
export const MESH_FRAMES = 8;

/** How tall each stands, baby to legend, in art pixels: its whole silhouette, first frame, turned towards us. These are the sizes
 *  Ed looked at the ladders at and passed ("Ok these are good", 2026-11-12); they are not yet squared with the game's own body
 *  sizes (art/genome/size-candidate.js), which measure the body without tails, ears or ornament (Ed, 2026-11-12: "keep the
 *  sizes"). Only species in the game's roster are here. */
export const MESH_HEIGHTS = { fox: [53, 81, 137, 387], stoat: [41, 63, 88, 229], marten: [45, 69, 97, 237], hare: [74, 114, 164, 491], squirrel: [42, 71, 122, 403], dormouse: [38, 65, 86, 246], badger: [54, 82, 113, 256], mole: [45, 67, 95, 323], hedgehog: [47, 74, 103, 347], snail: [35, 54, 73, 222],
  // (the bee, in the marten's place on home since 2026-11-12: the marten's order of size, not yet looked at in play)
  bee: [45, 69, 97, 280] };
/** The turtle's, for when it is a kind (art/creatures-pending/README.md says what it waits on): its neighbours' order of size. */
export const MESH_HEIGHTS_PENDING = { turtle: [45, 69, 97, 280] };

/** Whether this species is drawn as a mesh under this style. */
export const hasMesh = (species, st) => st?.meshCreatures === 1 && Object.hasOwn(MESH_HEIGHTS, species);

// (Ed, 2026-11-12, of the trial: "texture, twice the sides": every tube twice as many-sided, and the grown and the legends, whose
// faces are large enough to look bare, with a coat texture)
const plan = (species, level, gear) => ({ ...dress(MESH_PLANS[species][level](), gear), fine: 2 }), colours = level => (level === 3 ? 24 : 12);
const texture = level => (level >= 2 ? { size: 3.2, long: 2.6, tilt: 0.32, tone: 0.07 } : null);
/** How it sleeps: as its plan says if it does (gait.sleep: the snail's and the turtle's "shell", the mole's "sphinx"), else a legend
 *  curled on its side and the rest on their bellies (art/mesh/gear.js). */
const sleeps = (p, level) => p.gait?.sleep ?? (level === 3 ? "curl" : "sphinx");

/** A species' walk at a level (0 baby to 3 legend), drawn: art/mesh/raster.js bakeMesh's { w, h, step, towards, away }. gear: a
 *  party animal's (art/mesh/gear.js `dress`). Not kept: a legend's frames are tens of megabytes. */
export const meshWalk = (species, level, gear = null) => bakeMesh(shape(plan(species, level, gear)), { ppu: scale(species, level), frames: MESH_FRAMES, colours: colours(level), texture: texture(level) });
/** The scale a species is drawn at, art pixels a metre: its bare self standing MESH_HEIGHTS tall, so a hat doesn't shrink it. */
const scale = (species, level) => meshPpu(shape(plan(species, level, null)), (MESH_HEIGHTS[species] ?? MESH_HEIGHTS_PENDING[species])[level]);

/** The same animal asleep (art/mesh/gear.js `napping`), at the size it walks at: its two breaths, { w, h, towards } (the game
 *  mirrors a sleeper for the other way). gear: what it wears, kept on asleep (Ed, 2026-10-06). */
export function meshNap(species, level, gear = null) {
  const p = plan(species, level, gear);
  return bakeMesh(shape(napping(p, sleeps(p, level))), { ppu: scale(species, level), frames: 2, colours: colours(level), texture: texture(level) });
}

/** A species' legend as it sleeps through the centuries (docs/notes/creatures.md, **Sleeping legend**): asleep, its glow gone
 *  out, gone to stone and moss so it passes for a boulder or a mound, and sunk a fifth into the earth. { w, h, towards }: its two
 *  slow breaths, the ground on the bottom row. */
export function meshSleep(species) {
  const b = meshNap(species, 3), sunk = Math.round(b.h * 0.2), h = b.h - sunk, cut = px => px.slice(0, b.w * h * 4);
  for (const f of b.towards) {
    for (let i = 0; i < b.w * h; i++) { const q = i * 4; if (!f.albedo[q + 3]) continue;
      // (stone by its lightness, and moss where it faces the sky: the normal's green is its up, 128 level, less is up)
      const l = f.albedo[q] * 0.3 + f.albedo[q + 1] * 0.59 + f.albedo[q + 2] * 0.11, up = (128 - f.normal[q + 1]) / 127, x = i % b.w, y = (i - x) / b.w, patch = ((Math.imul(x >> 1, 374761393) ^ Math.imul(y >> 1, 668265263)) >>> 0) % 7 < 5 ? 1 : 0.45, moss = Math.max(0, Math.min(1, (up - 0.25) * 2.2)) * patch; // (moss in two-pixel patches, thinner in some)
      const stone = [l * 0.62 + 34, l * 0.64 + 36, l * 0.6 + 38], green = [l * 0.3 + 38, l * 0.42 + 62, l * 0.24 + 30];
      for (let c = 0; c < 3; c++) { const base = stone[c] * 0.78 + f.albedo[q + c] * 0.22; f.albedo[q + c] = base + (green[c] - base) * moss * 0.8; }
      f.albedo[q + 3] = 255; }
    f.albedo = cut(f.albedo); f.normal = cut(f.normal); f.flipped = cut(f.flipped); if (f.eyes) f.eyes = undefined; if (f.head) f.head = [f.head[0], Math.min(h - 1, f.head[1])];
  }
  return { w: b.w, h, towards: b.towards };
}

/** Its walk for the view: frames in its cycle, and step, how far it goes between them as a share of its sprite's width (its
 *  adult's: the view keeps one walk a species). Worked out without drawing anything, once. */
const gaits = new Map();
export function meshGait(species) { let g = gaits.get(species); if (!g) gaits.set(species, (g = { frames: MESH_FRAMES, step: meshStep(shape(MESH_PLANS[species][2]()), MESH_FRAMES) })); return g; }

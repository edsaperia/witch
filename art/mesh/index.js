// Creatures drawn as meshes, for the game (Ed, 2026-11-12: "I'm happy with these models, let's do the real build"; "meshes are great,
// we should aim to transition to them for all the creatures"): which species have one (a file in art/mesh/species/), at what size,
// and their walks, naps and sleeping legends as sprites (art/mesh/raster.js draws a plan's shape, art/mesh/shape.js). On unless the
// style's `meshCreatures` is 0 (the link's ?meshCreatures=0: the generated creatures, to compare).
import { MESH_HEIGHTS, MESH_PLANS } from "./plans.js";
import { shape } from "./shape.js";
import { bakeMesh, bodyLength, meshPpu, meshStep, stride } from "./raster.js";
import { dress, napping } from "./gear.js";

export { MESH_HEIGHTS };

/** A walk's cycle, in frames (the generated creatures have two: art/creatures.js walkGait), and how many frames a level has each
 *  heading: the cycle and one more, standing still on all its feet, which the view shows when it stops (MESH_STAND). */
export const MESH_CYCLE = 8, MESH_FRAMES = MESH_CYCLE + 1, MESH_STAND = MESH_CYCLE;
/** The most frames of its walk the view shows in a second (two and a half cycles): past that pace its feet slide rather than its
 *  legs blur (Ed's playtest, 2026-11-12: "they appear to vibrate along instead of walk"). */
export const MESH_RATE = 20;

/** Whether this species is drawn as a mesh under this style. */
export const hasMesh = (species, st) => st?.meshCreatures === 1 && Object.hasOwn(MESH_HEIGHTS, species);

// (Ed, 2026-11-12, of the trial: "texture, twice the sides": every tube twice as many-sided, and the grown and the legends, whose
// faces are large enough to look bare, with a coat texture)
const plan = (species, level, gear) => ({ ...dress(MESH_PLANS[species][level](), gear), fine: 2 }), colours = level => (level === 3 ? 24 : 12);
const texture = level => (level >= 2 ? { size: 3.2, long: 2.6, tilt: 0.32, tone: 0.07 } : null);
/** How it sleeps: as its plan says if it does (gait.sleep: the snail's and the turtle's "shell", the mole's "sphinx"), else a legend
 *  curled on its side and the rest on their bellies (art/mesh/gear.js). */
const sleeps = (p, level) => p.gait?.sleep ?? (level === 3 ? "curl" : "sphinx");

/** A species' walk at a level (0 baby to 3 legend), drawn: art/mesh/raster.js bakeMesh's { w, h, step, towards, away }, each
 *  heading its cycle's MESH_CYCLE frames and then it standing still (MESH_STAND). gear: a party animal's (art/mesh/gear.js
 *  `dress`). Not kept: a legend's frames are tens of megabytes. */
export const meshWalk = (species, level, gear = null) => bakeMesh(shape(plan(species, level, gear)), { ppu: scale(species, level), frames: MESH_CYCLE, stand: true, colours: colours(level), texture: texture(level) });
/** The scale a species is drawn at, art pixels a metre: its bare self standing MESH_HEIGHTS tall, so a hat doesn't shrink it. */
const scale = (species, level) => meshPpu(shape(plan(species, level, null)), MESH_HEIGHTS[species][level]);

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

/** Its walk for the view: frames a level has each heading, cycle (how many of them are its walk), stand (the one it stands still
 *  in), rate (the most of them shown a second), type (how it goes: art/mesh/shape.js GAIT_TYPES) and steps: how far it goes between
 *  frames at each level, as a share of that level's sprite's width, so its planted feet stay put on the ground (step: its
 *  adult's). Worked out without drawing anything, once. */
const gaits = new Map();
export function meshGait(species) {
  let g = gaits.get(species);
  if (!g) { const steps = MESH_PLANS[species].map(make => meshStep(shape({ ...make(), fine: 2 }), MESH_CYCLE)); gaits.set(species, (g = { frames: MESH_FRAMES, cycle: MESH_CYCLE, stand: MESH_STAND, rate: MESH_RATE, type: gaitType(MESH_PLANS[species][2]()), step: steps[2], steps })); }
  return g;
}
/** What a level's walk comes to, for judging it (tools/creature-mesh/sheet.mjs, the tests): type (how it goes), stride (how far
 *  it goes in one cycle, metres), body (its body's length, metres: a stride under about a quarter of it reads as a shuffle), ppu
 *  (art pixels a metre) and step (what the view moves it between frames, a share of its sprite's width). Nothing is drawn. */
export function meshFacts(species, level) {
  const p = { ...MESH_PLANS[species][level](), fine: 2 }, sh = shape(p);
  return { type: gaitType(p), stride: stride(sh), body: bodyLength(sh), ppu: scale(species, level), step: meshGait(species).steps[level] };
}
/** How a plan gets about (art/mesh/shape.js GAIT_TYPES): what it says, else a flyer flies, a legless one glides and the rest walk. */
export const gaitType = p => p.gait?.type ?? (p.hover ? "fly" : p.gait?.legs?.length ? "walk" : "glide");

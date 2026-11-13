// Creatures drawn as meshes, for the game (Ed, 2026-11-12: "I'm happy with these models, let's do the real build"; "meshes are great,
// we should aim to transition to them for all the creatures"): which species have one (a file in art/mesh/species/), at what size,
// and their walks, naps and sleeping legends as sprites (art/mesh/raster.js draws a plan's shape, art/mesh/shape.js). On unless the
// style's `meshCreatures` is 0 (the link's ?meshCreatures=0: the generated creatures, to compare).
import { MESH_HEIGHTS, MESH_PLANS } from "./plans.js";
import { shape } from "./shape.js";
import { bakeMesh, bodyLength, meshPpu, meshStep, stride } from "./raster.js";
import { dress, napping } from "./gear.js";

export { MESH_HEIGHTS };

/** A walk's cycle, in frames (the generated creatures have two: art/creatures.js walkGait), and the frames a level has each
 *  heading: its slow pace's cycle; one more, standing still on all its feet (MESH_STAND); and, if it has legs, its fast pace's
 *  cycle from MESH_RUN on (Ed, 2026-11-12: its legs "still slide or skate, mostly short-legged animals at speed": one clip can't
 *  be both a walk whose feet plant at a crawl and a run whose stride covers a sprint; art/mesh/stride.js picks between them).
 *  MESH_FRAMES: a legless kind's (the cycle and the standing frame); a legged one has MESH_FRAMES + MESH_CYCLE. */
export const MESH_CYCLE = 8, MESH_FRAMES = MESH_CYCLE + 1, MESH_STAND = MESH_CYCLE, MESH_RUN = MESH_FRAMES;
/** How many frames of a flyer's wingbeat the view shows in a second (it beats by the clock, moving or not). A walker's frames
 *  go by the ground it covers, with no cap (art/mesh/stride.js): the cap the first meshes had was their feet sliding. */
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
 *  heading its slow cycle's MESH_CYCLE frames, then it standing still (MESH_STAND), then its fast cycle's (from MESH_RUN). gear: a party animal's (art/mesh/gear.js
 *  `dress`). Not kept: a legend's frames are tens of megabytes. */
export const meshWalk = (species, level, gear = null) => { const p = () => plan(species, level, gear); return bakeMesh(shape(p()), { ppu: scale(species, level), frames: MESH_CYCLE, stand: true, run: runs(p()) ? shape(p(), "run") : null, more: strikes(p), colours: colours(level), texture: texture(level) }); };
/** A kind whose heads strike in turn (its plan's gait.strike: the hydra's, art/mesh/species/hydra.js; Ed, 2026-11-13: "it would be
 *  cool if the hydra did attacks with alternating heads"): for each of its striking heads in turn, MESH_STRIKE's poses, that
 *  head drawn back twice over (the others swaying between the two) and then struck forward. They are drawn after its walk's
 *  frames (meshGait's `strike` says where). */
export const MESH_STRIKE = ["a", "b", "snap"];
const strikes = p => { const S = p().gait?.strike; return S ? S.heads.flatMap((_, k) => MESH_STRIKE.map(phase => { const q = p(); return shape({ ...q, still: { ...q.gait.strike.pose(k, phase), root: q.gait.root } }); })) : undefined; };
/** Whether a plan has a fast pace of its own (a legged kind's: art/mesh/kit/gaits.js). */
const runs = p => !!p.gait?.paces?.run;
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

/** Its walk for the view (art/mesh/stride.js steps it): frames a level has each heading, cycle (how many of them are a pace's
 *  cycle), stand (the one it stands still in), rate (a flyer's: frames of its wingbeat a second), type (how it goes:
 *  art/mesh/shape.js GAIT_TYPES), steps: how far it goes between frames of its slow pace at each level, as a share of that
 *  level's sprite's width, so its planted feet stay put on the ground (step: its adult's), rests (the slow pace's frames that
 *  have every foot down: what it stops on), if it has a fast pace, run: { from (its first frame), steps }, and, if its heads
 *  strike in turn, strike: { from (the first of those frames), heads, each (frames a head: MESH_STRIKE) }. Worked out
 *  without drawing anything, once. */
const gaits = new Map();
export function meshGait(species) {
  let g = gaits.get(species);
  if (!g) {
    const shapes = MESH_PLANS[species].map(make => { const p = () => ({ ...make(), fine: 2 }); return { walk: shape(p()), run: runs(p()) ? shape(p(), "run") : null }; }), adult = shapes[2];
    const steps = shapes.map(s => meshStep(s.walk, MESH_CYCLE, s.run)), feet = adult.walk.feet ?? [];
    const rests = feet.length ? Array.from({ length: MESH_CYCLE }, (_, i) => i).filter(i => feet.every(f => (((i / MESH_CYCLE + f.phase) % 1) + 1) % 1 < f.duty - 1e-9)) : [];
    const strike = MESH_PLANS[species][2]().gait?.strike, walked = MESH_FRAMES + (adult.run ? MESH_CYCLE : 0);
    gaits.set(species, (g = { frames: walked + (strike ? strike.heads.length * MESH_STRIKE.length : 0), ...(strike ? { strike: { from: walked, heads: strike.heads.length, each: MESH_STRIKE.length } } : {}), cycle: MESH_CYCLE, stand: MESH_STAND, rate: MESH_RATE, type: gaitType(MESH_PLANS[species][2]()), step: steps[2], steps, rests, ...(adult.run ? { run: { from: MESH_RUN, steps: shapes.map(s => meshStep(s.walk, MESH_CYCLE, s.run, s.run)) } } : {}) }));
  }
  return g;
}
/** What a level's going comes to, for judging it (tools/creature-mesh/sheet.mjs, the tests): type (how it goes), stride (how far
 *  it goes in one cycle at its fast pace, or its only one, metres), walk (the same at its slow pace), body (its body's length,
 *  metres: a stride under about a quarter of it reads as a shuffle), ppu (art pixels a metre) and step (what the view moves it
 *  between frames of its slow pace, a share of its sprite's width). Nothing is drawn. */
export function meshFacts(species, level) {
  const p = () => ({ ...MESH_PLANS[species][level](), fine: 2 }), sh = shape(p()), fast = runs(p()) ? shape(p(), "run") : sh;
  return { type: gaitType(p()), stride: stride(fast), walk: stride(sh), body: bodyLength(sh), ppu: scale(species, level), step: meshGait(species).steps[level] };
}
/** How a plan gets about (art/mesh/shape.js GAIT_TYPES): what it says, else a flyer flies, a legless one glides and the rest walk. */
export const gaitType = p => p.gait?.type ?? (p.hover ? "fly" : p.gait?.legs?.length ? "walk" : "glide");

// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them.
import { BONES } from "./torso.js";
import { tufts } from "./tufts.js";

/** A mane (the lion's; batch B of docs/plans/creature-mesh-rollout.md): rows of full locks round the skin's rings `rows` (the
 *  torso's `R`: 6 throat, 5 neck, 4 shoulders), each row longer than the one before it, and with `P` (a point on the head,
 *  kit/head.js) a crown of them behind the ears and under the jaw. colour(i, row) and tip(i, row) pick each lock's; glow as
 *  kit/tufts.js has it ("tip": a flame-lock's lit end). */
export function mane(R, o) {
  const { rows = [6, 5, 4], n = 5, a0 = 0.15, a1 = 2.95, long = 0.2, r = 0.075, sweep = 0.55, droop = 0.3, grow = 0.35, colour, tip = colour, glow = false, P, crown = 1 } = o;
  const cones = rows.flatMap((i, k) => tufts(R[i], BONES[i], { n, a0, a1, long: long * (1 + 0.2 * k), sweep, droop, r: r * (1 + 0.1 * k), grow, lock: true, glow, colour: j => colour(j, k), tip: j => tip(j, k) }));
  if (P) for (const s of [1, -1]) for (const [x, y, z, dx, dy, dz] of [[0.02, 0.085, 0.0, 0.03, 0.07, -0.1], [0.07, 0.04, -0.01, 0.1, 0.0, -0.1], [0.075, -0.03, 0.0, 0.07, -0.09, -0.07], [0.03, -0.06, 0.03, 0.02, -0.12, -0.03]])
    cones.push({ at: P(x * s, y, z), rx: r * 0.85, ry: r * 0.7, tip: P((x + dx * crown) * s, y + dy * crown, z + dz * crown), bone: "head", colour: colour(0, 0), tipColour: tip(0, 0), split: 0.45, up: [0, 0, 1], sides: 5, glow, bulge: 0.9 });
  return cones;
}

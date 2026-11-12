// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** Leg timings for a gait's `legs`, one for each way of going (the plan's gait.type says which: art/mesh/shape.js GAIT_TYPES): a
 *  walk (left hind, left fore, right hind, right fore, a quarter apart: a badger's, a turtle's), a trot (diagonal pairs together:
 *  a fox's, a hedgehog's scurry) and a bound (the hind pair together, then the fore pair, with a moment in the air after each: a
 *  stoat's, a hare's, a squirrel's; Ed, 2026-11-12: "many small creatures bound rather than trot"). k scales how far the joints
 *  swing and fold: at 1 a leg swings about half a radian each way from where it hangs, so a stride is near twice its leg's length
 *  over its duty (Ed's playtest, 2026-11-12: "their moving animations don't seem to animate their legs and are very short; they
 *  appear to vibrate along instead of walk": the swing was a third of a radian and the stride a tenth of a body). */
const stride = (k, phases, swing = [0.5, 0.5]) => [["hip", "knee", "hock", swing[0], [0.5, -0.65], -0.06], ["shoulder", "elbow", "wrist", swing[1], [-0.5, 1.0], -0.16]].flatMap(([a, b, c, sw, fold, lift], n) =>
  ["L", "R"].map((tag, side) => ({ bones: [a + tag, b + tag, c + tag], phase: phases[n][side], swing: sw * k, fold: fold.map(f => f * k), lift: lift * k })));
export const walk = (k = 1) => stride(k, [[0, 0.5], [0.75, 0.25]]);
export const trot = (k = 1) => stride(k, [[0, 0.5], [0.5, 0]], [0.52, 0.52]);
export const bound = (k = 1) => stride(k, [[0, 0.06], [0.46, 0.52]], [0.6, 0.5]);

// Ways of going that several kinds share, each a gait to spread into a plan's own (`{ ...hop({ seconds: 0.4 }), tails }`):
// (a bound: Ed, 2026-11-12, "many small creatures bound rather than trot"; its long back gathers and stretches, art/mesh/shape.js)
export const lope = (o = {}) => ({ type: "bound", seconds: 0.5, duty: 0.3, bob: 0, bobs: 1, sway: 0.02, rock: 0.2, tailSwing: 0.1, legs: bound(1), ...o });
// (a bound: Ed, 2026-11-12, "many small creatures bound rather than trot"; hind feet together, a moment in the air, art/mesh/shape.js)
export const hop = (o = {}) => ({ type: "bound", seconds: 0.48, duty: 0.3, bob: 0, bobs: 1, sway: 0.015, rock: 0.14, tailSwing: 0.08, legs: bound(1), ...o });
// (a trot: the heavy and the low go on diagonal pairs, the badger steadily, the mole and the hedgehog at a scurry, a shorter stance)
export const trundle = (o = {}) => ({ type: "trot", seconds: 0.6, duty: 0.5, bob: 0, sway: 0.085, tailSwing: 0.1, legs: trot(1), ...o });
export const scurry = (o = {}) => trundle({ duty: 0.42, legs: trot(1.15), ...o });

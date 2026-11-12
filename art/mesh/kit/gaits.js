// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** Leg timings for a pace's `legs`, one for each way of going (art/mesh/shape.js GAIT_TYPES): a walk (left hind, left fore,
 *  right hind, right fore, a quarter apart: three feet down), a trot (diagonal pairs together), a bound (the hind pair together,
 *  then the fore pair: Ed, 2026-11-12, "many small creatures bound rather than trot") and a hop (a bound gone slowly: the fore
 *  pair, then the hind, each waiting for the other to land). Each leg is { bones, phase }: where in the cycle its paw comes
 *  down; the pace's `duty` says for how long, and art/mesh/shape.js `strides` keeps it planted that long. */
const legs = phases => [["hip", "knee", "hock"], ["shoulder", "elbow", "wrist"]].flatMap((b, n) => ["L", "R"].map((tag, side) => ({ bones: b.map(x => x + tag), phase: phases[n][side] })));
export const walk = () => legs([[0, 0.5], [0.75, 0.25]]);
export const trot = () => legs([[0, 0.5], [0.5, 0]]);
export const bound = () => legs([[0, 0.05], [0.47, 0.53]]);
export const hopping = () => legs([[0, 0.04], [0.5, 0.56]]);

// Each pace's numbers (Ed, 2026-11-12, of the walk clip: "the feet don't plant, and the bodies seem rigid"; the body "doesn't bob
// or sway enough"). What they mean is with art/mesh/shape.js `strides`: duty, the share of the cycle a foot is down; reach, a
// stance's length on the ground and step, how high a swinging paw lifts, and leap, how high it goes with no foot down (shares of
// its hips' height); and its body's: bob (the same share), pitch, roll, yaw and flex (radians; flex is a bound's back gathering
// and stretching), sway (a share again: its body over the feet that are down), head (how much of the body's turning the head
// turns back, 0 to 1), tail (how much of the hips' turning runs down the tail), lag (how late each tail joint is, a share of the
// cycle) and wag. A kind's file changes any of them for its own animal (a legend heavier, a baby bouncier).
export const PACES = {
  // going slowly, one foot after another: a roll and a sway over the feet that are down, the body vaulting over each forefoot
  amble: { type: "walk", seconds: 1.1, duty: 0.8, reach: 0.5, step: 0.13, legs: walk(), body: { bob: 0.035, pitch: 0.018, roll: 0.045, sway: 0.035, yaw: 0.06, head: 0.75, tail: 1.2, lag: 0.09, wag: 0.12 } },
  // going fast on diagonal pairs: sinking onto each pair, a moment in the air between them
  trot: { type: "trot", seconds: 0.6, duty: 0.4, reach: 0.95, step: 0.22, leap: 0.07, legs: trot(), body: { bob: 0.07, pitch: 0.03, roll: 0.02, sway: 0.01, yaw: 0.05, head: 0.8, tail: 1.3, lag: 0.1, wag: 0.08 } },
  // a low animal's quick patter: shorter stances and more of them, hardly leaving the ground
  patter: { type: "trot", seconds: 0.36, duty: 0.3, reach: 1.1, step: 0.2, leap: 0.05, legs: trot(), body: { bob: 0.05, pitch: 0.025, roll: 0.03, sway: 0.02, yaw: 0.08, head: 0.8, tail: 1, lag: 0.1, wag: 0.1 } },
  // a turtle hurrying: the same walk gone quick and long, its shell swinging over splayed legs
  scramble: { type: "walk", seconds: 0.5, duty: 0.52, reach: 1.1, step: 0.2, legs: walk(), body: { bob: 0.03, pitch: 0.02, roll: 0.06, sway: 0.04, yaw: 0.11, head: 0.8, tail: 1, lag: 0.1, wag: 0.1 } },
  // a bound gone slowly: forefeet, then hind feet, the back humping between
  hop: { type: "bound", seconds: 0.7, duty: 0.58, reach: 0.5, step: 0.16, legs: hopping(), body: { bob: 0.03, pitch: 0.06, flex: 0.1, roll: 0, sway: 0, yaw: 0.015, head: 0.8, tail: 1.2, lag: 0.08, wag: 0.03 } },
  // a bound: hind feet push together, a long moment in the air, the back stretched; forefeet land, the back gathers
  bound: { type: "bound", seconds: 0.5, duty: 0.22, reach: 1.0, step: 0.24, leap: 0.4, legs: bound(), body: { bob: 0.05, pitch: 0.15, flex: 0.24, roll: 0, sway: 0, yaw: 0.012, head: 0.85, tail: 1.4, lag: 0.07, wag: 0.02 } },
};
/** A pace with a kind's own numbers over the kit's (its `body` over the kit's `body`). */
export const pace = (name, o = {}) => ({ ...PACES[name], ...o, body: { ...PACES[name].body, ...o.body } });

// Ways of going that several kinds share: a gait to hand a plan, with a slow pace and a fast one (the view picks by how fast the
// animal is going: art/mesh/stride.js). o: { tails, walk: its slow pace's own numbers, run: its fast pace's, body: both paces' }.
// lively scales how much its body moves at every pace (1: as the pace says; a baby's more, a legend's less: it is heavy).
// `type` is how the kind is known to go: its fast pace's.
const gait = (slow, fast) => (o = {}) => { const { walk: w = {}, run: r = {}, ...rest } = o, run = pace(fast, r); return { type: run.type, seconds: run.seconds, legs: run.legs, ...rest, paces: { walk: pace(slow, w), run } }; };
// (a fox: an easy walk, and a trot with air in it)
export const trots = gait("amble", "trot");
// (a bound: Ed, 2026-11-12, "many small creatures bound rather than trot"; its long back gathers and stretches)
export const lope = gait("hop", "bound");
export const hop = gait("hop", "bound");
// (the heavy and the low: a rolling walk; at speed the badger trots, the mole and the hedgehog patter)
export const trundle = gait("amble", "trot");
export const scurry = gait("amble", "patter");
// (a turtle: one foot after another at any pace)
export const plod = gait("amble", "scramble");

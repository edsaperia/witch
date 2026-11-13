// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z).
// Added with the many-legged kinds (docs/plans/creature-mesh-rollout.md, batch G: "six, eight and fourteen legs; pincers, a sting").
import { jointLeg } from "./jointleg.js";
import { about, eulerOf } from "./turns.js";

/** Pairs of jointed legs (kit/jointleg.js), three for an insect, four for a spider, a scorpion or a crab, seven for a woodlouse.
 *  spots: one a pair, the hindmost first: { at: [x, y, z] (its left leg's top), yaw (how far its legs point forward of straight
 *  out, radians), ...jointLeg's own for that pair }; o: jointLeg's options for them all, and across: "z" for a crab, whose legs
 *  stand out fore and aft of the way it goes (it is built facing sideways) and are mirrored that way. Each leg comes back with
 *  its pair and side, which the timings below read. */
export function legPairs(spots, o = {}) {
  const out = [], z = o.across === "z";
  spots.forEach((sp, i) => { for (const [s, side] of [[1, "L"], [-1, "R"]]) { const { at, yaw = 0, ...own } = sp;
    out.push({ ...jointLeg(`${i}${side}`, z ? [at[0], at[1], at[2] * s] : [at[0] * s, at[1], at[2]], { ...o, ...own, dir: z ? [Math.sin(yaw), Math.cos(yaw) * s] : [Math.cos(yaw) * s, Math.sin(yaw)] }), pair: i, side: s }); } });
  return out;
}

// Leg timings for many legs (a pace's `legs`: { bones, phase }, where in the cycle each tip comes down).
/** Alternating sets: each leg with the one diagonally across the next pair, so six legs go as two tripods and eight as two fours,
 *  one set down while the other swings. */
export const sets = legs => legs.map(l => ({ bones: l.names.slice(0, 3), phase: ((l.pair + (l.side > 0 ? 0 : 1)) % 2) * 0.5 }));
/** A ripple: each side's legs come down one after another from the hindmost forward, `lag` of the cycle apart, the two sides
 *  half a cycle apart: a woodlouse's fourteen. */
export const ripple = (lag = 0.04) => legs => { const n = 1 + Math.max(...legs.map(l => l.pair)); return legs.map(l => ({ bones: l.names.slice(0, 3), phase: (l.side > 0 ? 0 : 0.5) + (n - 1 - l.pair) * lag })); };

const long = v => Math.hypot(...v), minus = (a, b) => a.map((v, i) => v - b[i]);
/** How long a stance a leg can make along the way it goes (z) with its joints never pulled straight: art/mesh/shape.js `strides`
 *  works a leg's reach out as if it hung straight down, and a leg that stands out to the side has less. */
const room = l => { const [a, b, c] = l.bones.map(x => x[1]), D = minus(c, a), most = (long(minus(b, a)) + long(minus(c, b))) * 0.985; return 2 * (Math.sqrt(Math.max(0, most * most - D[0] * D[0] - D[1] * D[1])) - Math.abs(D[2])) * 0.82; };

// The two paces of the many-legged (art/mesh/kit/gaits.js PACES says what the numbers mean): a crawl with most feet down, and a
// scuttle, each set down as the other lifts. The body is carried level and steady over its legs: hardly a bob, a little yaw.
const CRAWL = { type: "trot", seconds: 0.9, duty: 0.65, reach: 1.6, step: 0.3, heel: [-0.08, 0.2, 0.15], toe: 0.2, body: { bob: 0.012, pitch: 0.006, roll: 0.015, sway: 0.008, yaw: 0.03, head: 0.8, tail: 0.6, lag: 0.1, wag: 0.03, crouch: 0.02 } };
const SCUTTLE = { type: "trot", seconds: 0.36, duty: 0.42, reach: 2.6, step: 0.4, leap: 0, heel: [-0.08, 0.25, 0.2], toe: 0.2, body: { bob: 0.02, pitch: 0.008, roll: 0.02, sway: 0.008, yaw: 0.045, head: 0.85, tail: 0.6, lag: 0.1, wag: 0.03, crouch: 0.02 } };
/** How the many-legged go, as kit/gaits.js's gaits are handed to a plan: legs (legPairs' own), o: { timing (sets, or ripple()),
 *  type (how its going is known: "trot" for alternating sets, "walk" for a ripple), lively, tails, walk and run (each pace's own
 *  numbers over these), fold (how it folds its legs asleep: `folds`) }. Each pace's stance is kept inside what its legs can
 *  reach (`room`), so no tip is dragged. It sleeps on its belly with its legs folded in at every level: it has no back to curl. */
export function scuttles(legs, o = {}) {
  const { walk: w = {}, run: r = {}, timing = sets, type = "trot", fold, ...rest } = o, timed = timing(legs), high = legs.map(l => l.bones[0][1][1] - l.bones[3][1][1]), mean = high.reduce((s, v) => s + v, 0) / high.length, most = Math.min(...legs.map(room));
  const mk = (base, own) => { const p = { ...base, type, ...own, legs: timed, body: { ...base.body, ...own.body } }; p.reach = Math.min(p.reach * mean, most) / mean; return p; }, run = mk(SCUTTLE, r);
  return { type: run.type, seconds: run.seconds, legs: timed, sleep: "sphinx", nap: folds(fold), give: 0.1, ...rest, paces: { walk: mk(CRAWL, w), run } };
}

/** Asleep (a gait's `nap`, which art/mesh/gear.js `napping` calls with the pose it has made): a jointed leg can't go under its
 *  body as a fox's does, so each is folded flat at its side: its upper piece let down level, the rest doubled back in under it.
 *  o: { thigh, shin, foot: how each piece lies, radians up from straight out; head: its head's turn; also: what else the kind
 *  does with itself, handed the same pose }. */
export const folds = (o = {}) => ctx => {
  const { plan, rots } = ctx, at = Object.fromEntries(plan.bones.map(([name, p]) => [name, p])), E = { thigh: 0.1, shin: -2.8, foot: -3.0, ...o };
  for (const l of plan.gait.legs ?? []) { const [a, b, c] = l.bones, d = plan.bones.find(x => x[2] === c)[0], h = [at[c][0] - at[a][0], at[c][2] - at[a][2]], n = Math.hypot(...h) || 1, k = [h[1] / n, 0, -h[0] / n];
    // (how far up from straight out a piece points; a turn about k lets it down by that much)
    const up = (p, q) => Math.atan2(q[1] - p[1], ((q[0] - p[0]) * h[0] + (q[2] - p[2]) * h[1]) / n), t1 = up(at[a], at[b]) - E.thigh, t2 = up(at[b], at[c]) - E.shin, t3 = up(at[c], at[d]) - E.foot;
    rots[a] = eulerOf(about(k, t1)); rots[b] = eulerOf(about(k, t2 - t1)); rots[c] = eulerOf(about(k, t3 - t2)); }
  if (plan.gait.head) rots[plan.gait.head] = o.head ?? [0.12, 0, 0];
  o.also?.(ctx);
};

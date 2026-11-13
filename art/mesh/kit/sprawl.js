// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the cold-blooded kinds (docs/plans/creature-mesh-rollout.md, batch E: "a sprawling gait").
import { pace, trot, walk } from "./gaits.js";
import { head } from "./head.js";
import { torso } from "./torso.js";

/** A sprawled leg from its top joint on the flank: the upper bone goes out sideways, level with the body (a hind knee a little
 *  forward, a fore elbow a little back), the lower one down to a flat foot that stands well outside the body. The same bones'
 *  names as kit/leg.js's, so the kit's leg timings and art/mesh/shape.js `strides` plant it as they do any leg. len: the
 *  upper bone is half of it; thick; out (how far the knee stands off, 1); colours { upper, mid, sock }; paw (the foot's
 *  width), foot (the toes' length), claws: { colour, len } three a foot. */
export function sprawlLeg(kind, tag, s, top, o) {
  const { len: L = 0.3, thick = 1, out = 1, parent, colours: C, paw = 1, foot = 1, claws } = o, t = thick * L, hind = kind === "hind", f = hind ? 1 : -1;
  const b = (hind ? ["hip", "knee", "hock", "hpaw"] : ["shoulder", "elbow", "wrist", "fpaw"]).map(x => x + tag);
  const knee = [top[0] + s * 0.5 * L * out, top[1] + 0.03 * L, top[2] + f * 0.12 * L], ankle = [knee[0] + s * 0.07 * L, 0.075 * L, knee[2] - f * 0.03 * L], pawAt = [ankle[0] + s * 0.01 * L, 0.02 * L, ankle[2] + 0.035 * L];
  const mix = (p, q, k) => p.map((v, i) => v + (q[i] - v) * k), toe = k => [pawAt[0] + s * 0.03 * L * k, 0.016 * L, pawAt[2] + 0.15 * L * foot * k];
  const ring = (at, rx, ry, bone, colour, flat) => ({ at, rx: rx * t, ry: ry * t, bone: b[bone], colour, ...(flat ? { up: [0, 1, 0] } : {}) });
  const rings = [ring(mix(top, knee, -0.12), 0.1, 0.13, 0, C.upper), ring(mix(top, knee, 0.4), 0.105, 0.12, 0, C.upper), ring(knee, 0.085, 0.095, 0, C.mid), ring(mix(knee, ankle, 0.5), 0.07, 0.08, 1, C.mid), ring(ankle, 0.06, 0.065, 1, C.sock),
    ring(pawAt, 0.075 * paw, 0.05, 2, C.sock, true), ring(toe(0.5), 0.11 * paw, 0.034, 3, C.sock, true), ring(toe(1), 0.1 * paw, 0.022, 3, C.sock, true)];
  const cones = claws ? [-1, 0, 1].map(k => ({ at: [toe(1)[0] + k * 0.07 * t * paw, 0.02 * L, toe(1)[2] - 0.01 * L], rx: 0.022 * t, ry: 0.02 * t, tip: [toe(1)[0] + k * 0.1 * t * paw, 0.004, toe(1)[2] + 0.07 * L * (claws.len ?? 1)], bone: b[3], colour: claws.colour, up: [0, 1, 0], sides: 3 })) : [];
  return { bones: [[b[0], top, parent], [b[1], knee, b[0]], [b[2], ankle, b[1]], [b[3], pawAt, b[2]]], lofts: [{ sides: 5, up: [0, 0, 1], rings }], cones, names: b };
}

/** A sprawler's build in one go, as kit/quad.js is a four-legged one: a low, broad body (the kit's torso, its rings made `wide`
 *  and `flat`), the kit's head on a short level neck, and four sprawled legs. o: C (colours), body (the torso's options; back
 *  is how high its spine is carried), wide, flat, hind and fore (sprawlLeg's), head. Returns what quad does:
 *  { body, skull, legs, root (where a tail starts), R (the skin's rings), P (a point on the head) }. */
export function sprawler(o) {
  const { wide = 1.25, flat = 0.75 } = o, hind = { colours: o.C, ...o.hind }, fore = { colours: o.C, ...(o.fore ?? o.hind) };
  const body = torso({ back: 0.17, neck: [0.02, 0.15], neckThick: 1.2, tuck: 1.05, white: 0.55, ...o.body, colours: o.C });
  for (const r of body.rings) { r.rx *= wide; r.ry *= flat; }
  const skull = head(body.pivot, { cheek: 0, ear: { shape: "round", tall: 0.05, wide: 0.4, back: o.C.coat, inner: o.C.coat }, ...o.head, colours: o.C }), R = body.rings, legs = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) legs.push(sprawlLeg("hind", tag, s, [R[1].rx * 0.8 * s, R[1].at[1], R[1].at[2] + 0.02], { ...hind, parent: "pelvis" }), sprawlLeg("fore", tag, s, [R[4].rx * 0.8 * s, R[4].at[1] - 0.005, R[4].at[2] - 0.02], { ...fore, parent: "chest" }));
  return { body, skull, legs, root: [0, R[1].at[1], R[0].at[2] + 0.03], R, P: skull.P };
}

// A sprawler's two paces (art/mesh/kit/gaits.js PACES says what the numbers mean). Its legs stand out to its sides, so its
// stride comes from its back: its hips and its shoulders swing opposite ways (`yaw`), its head held steady and its tail
// following in a wave.
const CREEP = { seconds: 1.2, duty: 0.8, reach: 1.1, step: 0.3, heel: [-0.05, 0.3, 0.3], legs: walk(), body: { bob: 0.012, pitch: 0.008, roll: 0.03, sway: 0.03, yaw: 0.16, head: 0.9, tail: 1, lag: 0.16, wag: 0.04, crouch: 0.02 } };
const SCUTTLE = { seconds: 0.44, duty: 0.38, reach: 1.2, step: 0.35, leap: 0, heel: [-0.05, 0.35, 0.35], legs: trot(), body: { bob: 0.025, pitch: 0.012, roll: 0.04, sway: 0.02, yaw: 0.22, head: 0.92, tail: 1, lag: 0.16, wag: 0.04, crouch: 0.02 } };
/** How a sprawler goes: a creep, one foot after another, and a scuttle on diagonal pairs. o as kit/gaits.js's gaits take:
 *  { tails, lively, walk and run (each pace's own numbers over these) }. It sleeps with its legs laid back along its sides. */
export function sprawls(o = {}) {
  const { walk: w = {}, run: r = {}, ...rest } = o, mk = (name, base, own) => pace(name, { ...base, ...own, body: { ...base.body, ...own.body } }), run = mk("patter", SCUTTLE, r);
  return { type: run.type, seconds: run.seconds, legs: run.legs, nap: tucked, ...rest, paces: { walk: mk("amble", CREEP, w), run } };
}

/** Asleep (a gait's `nap`, which art/mesh/gear.js `napping` calls with the pose it has made): a sprawled leg can't fold under
 *  it as an upright one does, so each is laid back along its flank, straight, as a basking lizard's or a swimming crocodile's;
 *  curled in a ring (a legend), where a straight leg would stand off its bent side, it is folded back on itself there instead. */
export function tucked({ plan, how, rots }) {
  const at = Object.fromEntries(plan.bones.map(([name, p]) => [name, p]));
  for (const l of plan.gait.legs ?? []) { const [upper, lower, foot] = l.bones, d = at[lower].map((v, i) => v - at[upper][i]), s = Math.sign(d[0]) || 1, was = Math.atan2(d[0], d[2]);
    rots[upper] = [0, s * (Math.PI - 0.2) - was, 0]; rots[lower] = [0, -s * Math.atan2(d[2], Math.abs(d[0])) + (how === "curl" ? Math.PI : 0), s * 1.35]; rots[foot] = [0.5, 0, 0]; }
}

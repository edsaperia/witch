// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).
import { ball } from "./ball.js";

/** A flying insect's body, hung `fly` off the ground (the bee's, art/mesh/species/bee.js, made a part): a head with two great
 *  eyes and feelers, a thorax (a loft named "thorax") and an abdomen in rings (a loft named "abdomen", on bones abd1..abdN: armour is
 *  laid on either by name), six legs hanging. o: k (its size), C { thorax, head, eye, eyeGlow, leg, feeler }, chest, skull,
 *  eye: { r, out, up, fwd }, abdomen: { len, fat, rings, droop, bones, colour(i), prof(t) }, legs: { len, fwd }, feelers:
 *  { len, club (a colour: a knob on each end) }. Returns the pieces, P (a point in its own measure) and `sways`: its body's
 *  small movements for a gait's `extra`. */
export function insect(o) {
  const { fly = 0.3, k = 1, C, chest = 1, skull = 1, eye: E = {}, abdomen: A = {}, legs: L = {}, feelers: F = {} } = o, P = (x, y, z) => [x * k, fly + y * k, z * k];
  const nb = A.bones ?? 2, n = A.rings ?? 6, len = A.len ?? 1, fat = A.fat ?? 1, droop = A.droop ?? 0.11, z0 = -0.07 * chest;
  const bones = [["root", [0, 0, 0], null], ["thorax", P(0, 0.06, 0.02), "root"], ["head", P(0, 0.05, 0.02 + 0.09 * chest), "thorax"]];
  const spot = t => P(0, 0.045 - droop * t * len, z0 - 0.36 * t * len);
  for (let i = 0; i < nb; i++) bones.push([`abd${i + 1}`, spot(i / nb), i ? `abd${i}` : "thorax"]);
  const prof = A.prof ?? (t => Math.sin(Math.PI * Math.pow(t, 0.75)) * 0.9 + 0.1 * (1 - t)), lofts = [], cones = [];
  lofts.push({ name: "thorax", sides: 8, up: [0, 1, 0], rings: [[-0.085, 0.45], [-0.05, 0.9], [0.02, 1], [0.08, 0.8], [0.11, 0.4]].map(([z, f]) => ({ at: P(0, 0.06, 0.02 + z * chest), rx: 0.092 * k * chest * f, ry: 0.092 * k * chest * f, bone: "thorax", colour: C.thorax })) });
  const hz = 0.02 + (0.115 + 0.02 * skull) * chest; lofts.push(...ball("head", P(0, 0.05, hz), { r: 0.066 * k * skull, colour: C.head ?? C.thorax, sides: 7 }).lofts);
  for (const s of [1, -1]) { const tag = s > 0 ? "L" : "R";
    lofts.push(...ball("head", P((E.out ?? 0.046) * s * skull, 0.05 + (E.up ?? 0.012) * skull, hz + (E.fwd ?? 0.025) * skull), { r: 0.036 * k * (E.r ?? 1) * skull, colour: C.eye ?? "#0c0a09", glow: !!C.eyeGlow, sides: 6 }).lofts);
    if (F.len !== 0) { const f = F.len ?? 1, base = P(0.02 * s, 0.05 + 0.055 * skull, hz + 0.025), tip = P((0.02 + 0.05 * f) * s, 0.05 + 0.055 * skull + 0.12 * f, hz + 0.025 + 0.1 * f);
      bones.push([`ant${tag}`, base, "head"]); cones.push({ at: base, rx: 0.008 * k, ry: 0.008 * k, tip, bend: [0, 0.04 * k * f, 0], bulge: 0.9, bone: `ant${tag}`, colour: C.feeler ?? C.head ?? "#1d1612", up: [0, 0, 1], sides: 3 });
      if (F.club) lofts.push(...ball(`ant${tag}`, tip, { r: 0.014 * k * (F.knob ?? 1), colour: F.club, glow: !!F.glow, sides: 5 }).lofts); } }
  const ring = (i, e = 0) => { const t = Math.min(1, Math.max(0, i / (n - 1) + e)); return { at: spot(t), rx: 0.105 * k * fat * prof(t) + 0.012 * k, ry: 0.1 * k * fat * prof(t) + 0.012 * k, bone: `abd${Math.min(nb, Math.floor(t * nb * 0.999) + 1)}`, colour: (A.colour ?? (() => C.thorax))(i) }; };
  // (each band two rings of its colour, so the bands' edges are sharp and not a blend from one ring to the next)
  const R = Array.from({ length: n }, (_, i) => ring(i)), half = 0.42 / (n - 1);
  lofts.push({ name: "abdomen", sides: 8, up: [0, 1, 0.3], rings: R.flatMap((r, i) => (i === 0 ? [r, ring(i, half)] : i === n - 1 ? [ring(i, -half), r] : [ring(i, -half), ring(i, half)])) });
  const legs = []; [[0.08, 0.14, 0.9], [0.02, 0.17, 1], [-0.04, 0.2, 1.15]].forEach(([z, ll, f], i) => { for (const s of [1, -1]) { const b = `leg${i}${s > 0 ? "L" : "R"}`, top = P(0.05 * s, 0, z), m = (L.len ?? 1) * k, fw = (L.fwd ?? 0) * k;
    const knee = [top[0] + 0.06 * m * s, top[1] - ll * 0.45 * m, top[2] - 0.01 * m + fw * 0.5], foot = [top[0] + 0.04 * m * s, top[1] - ll * f * m, top[2] - 0.05 * m + fw];
    bones.push([b, top, "thorax"]); legs.push(b); lofts.push({ sides: 4, up: [0, 0, 1], rings: [[top, 0.014], [knee, 0.011], [foot, 0.006]].map(([at, r]) => ({ at, rx: r * k, ry: r * k, bone: b, colour: C.leg ?? C.head ?? "#1d1612", plain: true })) }); } });
  const T = Math.PI * 2, sways = [...Array.from({ length: nb }, (_, i) => ({ bone: `abd${i + 1}`, rot: u => [0.07 * Math.sin(T * u - 0.8 * i), 0, 0] })), { bone: "head", rot: u => [0.05 * Math.sin(T * u + 1), 0.06 * Math.sin(T * u), 0] },
    ...legs.map((bone, i) => ({ bone, rot: u => [0.12 * Math.sin(T * u + i), 0, 0.06 * Math.sin(T * u * 2 + i)] })), ...(F.len !== 0 ? [{ bone: "antL", rot: u => [0.1 * Math.sin(T * 2 * u), 0, 0] }, { bone: "antR", rot: u => [0.1 * Math.sin(T * 2 * u + 1), 0, 0] }] : [])];
  return { bones, lofts, cones, P, sways, end: spot(1), spot };
}

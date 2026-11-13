// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z).
// Added with the many-legged kinds (docs/plans/creature-mesh-rollout.md, batch G: "six, eight and fourteen legs; pincers, a sting").
import { eulerOf, times, transposed, turnOf } from "./turns.js";

/** A scorpion's tail: `n` beads on a chain of their own bones (tail0..) from `root` at its rear, going back, up and over its
 *  back in an arc (pitch: how steeply it starts, radians up from straight back; curl: how far round it has turned by its end),
 *  then a bulb and a curved sting pointing on the way the last bead does. len its whole length; r a bead's size; taper how much
 *  smaller the last is; colours { coat, joint, bulb, sting }; glow lights the sting. Hand its `chain` to the gait's `tails` and it
 *  sways behind the walk. Returns its pieces, chain, and `tip` (where the sting's point is). */
export function stingTail(parent, root, o) {
  const { n = 5, len = 0.4, r = 0.03, pitch = 0.5, curl = 2.3, taper = 0.75, colours: C, glow = false, bulb = 1, sting = 1, sides = 6 } = o, seg = len / n, bones = [], lofts = [], chain = [];
  const way = i => { const a = pitch + curl * i / n; return [0, Math.sin(a), -Math.cos(a)]; }, add = (p, d, k) => p.map((v, j) => v + d[j] * k);
  let p = root;
  for (let i = 0; i <= n; i++) { const name = `tail${i}`, d = way(i), R = r * (1 - (1 - taper) * i / n) * (i === n ? 1.25 * bulb : 1), L = i === n ? seg * 0.9 * bulb : seg, perp = [1, 0, 0];
    bones.push([name, p, i ? `tail${i - 1}` : parent]); chain.push(name);
    lofts.push({ sides, up: perp, rings: [[0.02, 0.55], [0.22, 1], [0.7, 0.95], [0.98, i === n ? 0.35 : 0.6]].map(([f, k], j) => ({ at: add(p, d, L * f), rx: R * k, ry: R * k, bone: name, colour: i === n ? C.bulb ?? C.coat : j === 3 ? C.joint ?? C.coat : C.coat, up: perp })) });
    if (i < n) p = add(p, d, seg); }
  // (the sting: off the bulb's end, hooking down and on)
  const d = way(n), a = pitch + curl + 0.9, hook = [0, Math.sin(a), -Math.cos(a)], from = add(p, d, seg * 0.8 * bulb), tip = add(add(from, d, seg * 0.35 * sting), hook, seg * 0.75 * sting);
  const cones = [{ at: from, rx: r * 0.42 * bulb, ry: r * 0.42 * bulb, tip, bend: d.map(v => v * seg * 0.22 * sting), bulge: 0.6, bone: `tail${n}`, colour: C.sting ?? C.coat, tipColour: C.point ?? C.sting ?? C.coat, glow: glow ? "tip" : false, up: [1, 0, 0], sides: 4 }];
  return { bones, lofts, cones, chain, tip, way, pitch, curl, n };
}

/** Asleep, such a tail is let down and laid round its side on the ground (a gait's `nap` calls this with the pose): each bead
 *  turned level, then swung a step further round than the last. side 1 or -1; step: how far a bead, radians; droop: how
 *  steeply its first beads go down to the ground. */
export const laidTail = (t, o = {}) => ({ rots }) => { const { side = 1, step = 0.55, droop = 0.45 } = o; let before = turnOf(0, 0, 0);
  t.chain.forEach((bone, i) => { const a = t.pitch + t.curl * i / t.n, want = turnOf(-a - (i < 2 ? droop : 0), side * step * (i + 0.5), 0); rots[bone] = eulerOf(times(transposed(before), want)); before = want; }); };

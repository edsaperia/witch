// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).
import { along, aside, path, sweep } from "./sweep.js";

/** A branched antler's tines by kind: each [where along the beam 0..1, its heading [out, up, forward], its length as a share
 *  of the beam's]. "red": a stag's (brow, bez, trez and a crown of three); "roe": a roebuck's three points; "fork"; "spike". */
export const TINES = {
  red: [[0.1, [0.25, 0.3, 1], 0.3], [0.24, [0.3, 0.45, 1], 0.22], [0.5, [0.35, 0.6, 0.9], 0.27], [0.8, [0.9, 0.8, 0.1], 0.25], [0.82, [-0.5, 1, 0.5], 0.23], [0.9, [0.1, 1, -0.7], 0.2]],
  roe: [[0.48, [0.15, 0.8, 1], 0.32], [0.74, [0.15, 0.6, -1], 0.26]],
  fork: [[0.5, [0.2, 0.7, 1], 0.38]],
  spike: [],
};

/** A pair of antlers on the head, from P (kit/head.js gives it: a point on the head). kind: a TINES name (a beam with tines)
 *  or "palm" (an elk's: a stem and a broad cupped blade, points along its edge). size (1: a grown stag's, a grown elk's),
 *  spread (how far apart they open), lean (how far back the beam goes before it rises), r (the beam's thickness), colour, tip
 *  (the points' colour), tines (its own list, in place of the kind's), at [out, up, forward] (where each starts on the head),
 *  glow: a colour the points are lit in (a legend's); moss: { colour, tip, long } hanging from it; pools: { colour } a palm's
 *  cup filled and lit. They ride `bone`, and are not part of what its body's length is measured by (they are tubes of bare
 *  bone, kit/sweep.js). */
export function antlers(P, o = {}) {
  const { kind = "red", size = 1, spread = 1, lean = 1, r = 0.023, colour = "#cdb48a", tip = "#f3ead6", tines = TINES[kind] ?? [], at = [0.03, 0.082, 0.065], bone = "head", sides = 5, glow, moss, pools } = o;
  const k = P(1, 0, 0)[0], lofts = [], cones = [], unit = d => { const l = Math.hypot(...d) || 1; return d.map(v => v / l); };
  const hang = p => moss && cones.push({ at: p, rx: 0.02 * k, ry: 0.009 * k, tip: [p[0], p[1] - 0.11 * k * (moss.long ?? 1), p[2] - 0.015 * k], bone, colour: moss.colour, tipColour: moss.tip ?? moss.colour, bulge: 0.8, split: 0.5, up: [0, 0, 1], sides: 4 });
  for (const s of [1, -1]) {
    const from = P(at[0] * s, at[1], at[2]);
    if (kind === "palm") {
      // a stem out sideways, then the blade: wide front to back, thin, cupped upward, its points along the front edge and the end
      const W = [0.02, 0.022, 0.065, 0.115, 0.135, 0.115, 0.05], T = [0.02, 0.02, 0.014, 0.012, 0.012, 0.012, 0.01], n = W.length - 1;
      const pts = W.map((_, i) => { const t = i / n; return [from[0] + s * 0.3 * t * spread * size * k, from[1] + (0.06 * t + 0.26 * t * t) * size * k, from[2] - (0.05 * t + 0.2 * t * t) * lean * size * k]; });
      lofts.push({ sides: 6, up: [0, 1, 0], rings: pts.map((p, i) => ({ at: p, rx: W[i] * size * k, ry: T[i] * size * k * (i < 2 ? 1 : 0.8), bone, colour: i === n ? tip : colour, plain: true, up: [0, 1, 0] })) });
      const tine = (p, d, L, w = 0.03) => cones.push({ at: p, rx: w * size * k, ry: 0.011 * size * k, tip: p.map((v, j) => v + unit(d)[j] * L * size * k), bone, colour, tipColour: glow ?? tip, glow: glow ? "tip" : false, split: 0.5, bulge: 0.6, up: [0, 1, 0], sides: 4 });
      for (const i of [3, 4, 5]) tine([pts[i][0], pts[i][1], pts[i][2] + W[i] * 0.8 * size * k], [s * 0.35, 0.7, 0.6], 0.13);
      for (const i of [4, 5]) tine([pts[i][0], pts[i][1], pts[i][2] - W[i] * 0.8 * size * k], [s * 0.4, 0.75, -0.5], 0.11);
      tine(pts[n], [s * 0.8, 0.6, 0], 0.12); tine(pts[1], [s * 0.35, 0.25, 1], 0.17, 0.02); tine(pts[1], [s * 0.7, 0.35, 0.8], 0.13, 0.02);
      if (pools) lofts.push({ sides: 6, up: [0, 1, 0], rings: [2, 3, 4, 5].map((i, j) => ({ at: [pts[i][0], pts[i][1] + 0.014 * size * k, pts[i][2]], rx: W[i] * 0.45 * size * k * (j === 0 || j === 3 ? 0.6 : 1), ry: 0.004 * size * k, bone, colour: pools.colour, glow: true, plain: true, up: [0, 1, 0] })) });
      for (const i of [3, 5]) hang([pts[i][0], pts[i][1], pts[i][2] - W[i] * 0.6 * size * k]);
      continue;
    }
    // the beam: out and back from the head, then up, its top coming in and forward
    const L = 0.42 * size * k, pts = path(from, L, 8, t => [s * spread * 0.75 * Math.cos(t * 2.2), 1, lean * (-0.7 + 1.5 * t)]);
    lofts.push(sweep(bone, pts, { r: t => r * k * Math.sqrt(size) * (1 - 0.8 * t), colour: t => (t > 0.85 ? glow ?? tip : colour), glow: t => !!glow && t > 0.85, sides }));
    for (const [t, [dx, dy, dz], share] of tines) { const p = along(pts, t), d = unit([s * dx, dy, dz]), len = share * L, rr = r * k * Math.sqrt(size) * (1 - 0.8 * t) * 0.9;
      cones.push({ at: p, rx: rr, ry: rr, tip: p.map((v, j) => v + d[j] * len), bone, colour, tipColour: glow ?? tip, glow: glow ? "tip" : false, split: 0.55, bulge: 0.6, bend: [0, len * 0.12, 0], up: aside(d), sides: 4 }); }
    for (const t of [0.3, 0.55, 0.75]) hang(along(pts, t));
  }
  return { bones: [], lofts, cones };
}

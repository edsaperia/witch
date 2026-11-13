// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).
import { path, sweep } from "./sweep.js";

/** A pair of horns on the head, from P (kit/head.js gives it), each a ridged tube along a curve: it starts heading p0 (radians
 *  above straight back: 1.57 is straight up) and turns `curl` over its length, down and round (a ram's full curl is about 5, a
 *  double spiral 9; an ibex's scimitar 1.5), going out sideways by out [at its root, at its tip]; tighten draws a spiral in as
 *  it goes. len (of the head's size), r its root's thickness, n its rings, ridges (every other ring stands proud by `knob`, in
 *  the colour `ridge`), colour, tip (its point's colour), at [out, up, forward] where each starts; glow: a colour its last part
 *  is lit in; broken: { side: 1 | -1, at } that side's snapped off there; bands: { colour, at: [..] } metal rings round it. */
export function horns(P, o = {}) {
  const { len = 0.3, r = 0.03, p0 = 1.2, curl = 1.5, out = [0.2, 0.2], tighten = 0, n = 14, ridges = true, knob = 0.16, colour = "#5b4a3b", ridge = "#857159", tip, at = [0.034, 0.078, 0.05], bone = "head", glow, broken, bands, sides = 5 } = o;
  const k = P(1, 0, 0)[0], lofts = [];
  for (const s of [1, -1]) {
    let pts = path(P(at[0] * s, at[1], at[2]), len * k, n, t => { const p = p0 - curl * t; return [s * (out[0] + (out[1] - out[0]) * t), Math.sin(p), -Math.cos(p)]; }, tighten);
    const snapped = broken?.side === s, keep = snapped ? Math.max(3, Math.round(n * broken.at) + 1) : pts.length, N = pts.length - 1; pts = pts.slice(0, keep);
    const fat = i => r * k * Math.pow(1 - 0.88 * (i / N), 0.8);
    lofts.push({ sides, up: [1, 0, 0], rings: pts.map((p, i) => { const t = i / N, proud = ridges && i % 2 === 1, lit = !!glow && !snapped && t > 0.82;
      return { at: p, rx: fat(i) * (proud ? 1 + knob : 1), ry: fat(i) * (proud ? 1 + knob : 1) * 1.1, bone, colour: lit ? glow : t > 0.9 && tip && !snapped ? tip : proud ? ridge : colour, glow: lit, plain: true, up: [1, 0, 0] }; }) });
    for (const t of bands?.at ?? []) { const i = Math.round(t * N); if (i < 1 || i >= pts.length - 1) continue;
      lofts.push(sweep(bone, [pts[i - 1], pts[i], pts[i + 1]].map((p, j) => p.map((v, c) => pts[i][c] + (v - pts[i][c]) * 0.3)), { r: fat(i) * 1.32, flat: 1.1, colour: bands.colour, sides: 6, up: [1, 0, 0] })); }
  }
  return { bones: [], lofts, cones: [] };
}

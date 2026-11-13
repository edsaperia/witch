// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the wonders (docs/plans/creature-mesh-rollout.md, batch H).
import { sweep } from "./sweep.js";

/** A thagomizer: pairs of long spikes standing out sideways and up from near the end of a tail made by kit/tail.js (`t`), each
 *  riding the tail's bone there, so they swing with it. pairs, from and to (where along the tail the first and last pair stand,
 *  0..1), len, r (a spike's root), rise (radians above level), back (how far they rake back), colour, tip (its point's),
 *  band: a colour, a ring round each spike (a legend's offered gold), broken: which spike, counted from the first, is snapped
 *  short. */
export function thagomizer(t, o = {}) {
  const { pairs = 2, len = 0.16, r = 0.022, from = 0.74, to = 0.93, rise = 0.5, back = 0.4, colour = "#d8cdb8", tip, band, broken } = o, R = t.lofts[0].rings, cones = [], lofts = [];
  const on = f => { const x = f * (R.length - 1), i = Math.min(R.length - 2, Math.floor(x)), u = x - i; return { at: R[i].at.map((v, k) => v + (R[i + 1].at[k] - v) * u), r: R[i].rx + (R[i + 1].rx - R[i].rx) * u, bone: R[u < 0.5 ? i : i + 1].bone }; };
  let n = 0;
  for (let j = 0; j < pairs; j++) for (const s of [1, -1]) {
    const st = on(pairs > 1 ? from + (to - from) * j / (pairs - 1) : from), short = broken === n++, L = len * (short ? 0.42 : 1) * (1 - 0.12 * j), d = [s * Math.cos(rise), Math.sin(rise), -back], dl = Math.hypot(...d), u = d.map(v => v / dl);
    const base = [st.at[0] + s * st.r * 0.55, st.at[1] + st.r * 0.3, st.at[2]], along = f => base.map((v, i) => v + u[i] * L * f);
    cones.push({ at: base, rx: r, ry: r, tip: along(1), bone: st.bone, colour, tipColour: short ? colour : tip ?? colour, split: short ? 0.92 : 0.6, up: [0, 0, 1], sides: 5 });
    if (band && !short) lofts.push(sweep(st.bone, [0.2, 0.27, 0.34].map(along), { r: r * 0.98, colour: band, sides: 5, up: [0, 0, 1] }));
  }
  return { bones: [], lofts, cones };
}

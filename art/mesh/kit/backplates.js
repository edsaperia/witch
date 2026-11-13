// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the wonders (docs/plans/creature-mesh-rollout.md, batch H).

/** Where plates stand along a back: `n` between each pair of the skin's `rings` (kit/torso.js's, with the bone each rides: BONES)
 *  from ring `from` to ring `to`, each the top of the back there. For a tail, `alongTail` does the same down a kit/tail.js tail. */
export function alongBack(rings, bones, o = {}) {
  const { from = 1, to = 5, n = 2 } = o, out = [];
  for (let i = from; i < to; i++) for (let j = 0; j < n; j++) { const k = (j + 0.5) / n, A = rings[i], B = rings[i + 1], m = (p, q) => p + (q - p) * k;
    out.push({ at: [m(A.at[0], B.at[0]), m(A.at[1], B.at[1]) + m(A.ry, B.ry) * 0.94, m(A.at[2], B.at[2])], bone: bones[k < 0.5 ? i : i + 1] }); }
  return out;
}
export const alongTail = (t, from = 1, to = 5) => t.lofts[0].rings.slice(from, to).map(r => ({ at: [r.at[0], r.at[1] + r.ry * 0.9, r.at[2]], bone: r.bone })).reverse();

/** A stegosaurus's plates: one standing at each of `stations` (tail end first, as alongTail and alongBack give them), in two
 *  rows, left and right in turn, each a thin kite on edge: narrow at its root, widest under its middle, a point at its top.
 *  high and long (the biggest one's), size(t, j) => each one's share of that (t 0 at the first station, 1 at the last), thin,
 *  side (how far off the spine each row stands), splay (radians each row leans outward), lean (how far its point leans back),
 *  colour, rim (its root's), tip (its point's), vein: a colour, lit, in a line up each face (a legend's lava), chips: the
 *  stations whose plates are broken short. */
export function backPlates(stations, o = {}) {
  const { high = 0.14, long = 0.075, thin = 0.012, side = 0.025, splay = 0.22, lean = 0.12, colour, rim = colour, tip = colour, vein, size = () => 1, chips = [], sides = 4 } = o, lofts = [], cones = [], N = Math.max(1, stations.length - 1);
  stations.forEach((st, j) => { const s = j % 2 ? 1 : -1, k = size(j / N, j), chipped = chips.includes(j), H = high * k * (chipped ? 0.6 : 1), L = long * k, w = thin * Math.max(0.6, k);
    const out = [s * Math.sin(splay), Math.cos(splay), -lean], base = [st.at[0] + s * side * k, st.at[1] - 0.012, st.at[2]], p = (f, off = 0) => base.map((v, i) => v + out[i] * H * f + up[i] * off), up = [Math.cos(splay), -s * Math.sin(splay), 0];
    const prof = chipped ? [[0, 0.5, rim], [0.5, 1, colour], [0.86, 0.85, colour], [1, 0.5, rim]] : [[0, 0.5, rim], [0.4, 1, colour], [0.76, 0.66, colour], [1, 0.06, tip]];
    lofts.push({ sides, up, rings: prof.map(([f, wd, c]) => ({ at: p(f), rx: L * wd, ry: w, bone: st.bone, colour: c, plain: true, up })) });
    if (vein) for (const d of [1, -1]) cones.push({ at: p(0.1, d * w * 1.05), rx: L * 0.2, ry: w * 0.35, tip: p(chipped ? 0.95 : 0.84, d * w * 0.8), bone: st.bone, colour: vein, glow: true, up, sides: 3 }); });
  return { bones: [], lofts, cones };
}

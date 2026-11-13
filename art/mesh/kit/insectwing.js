// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F): the bee's wings and its hover
// (art/mesh/species/bee.js), made a part and given more to draw: a butterfly's painted wings, a dragonfly's long glass ones.

const T = Math.PI * 2;

/** An insect's wing on its own bone: a flat blade from `root` along `dir`, `len` long and `wide` at its broadest. prof: its
 *  outline, [[along 0..1, breadth 0..1], ...]; colour (its ground: the border's, where it has cells); cells: [{ from, to, wide
 *  (of the blade's breadth there), colour, glow, off (-1..1: towards its front or its hind edge) }]: panels of colour laid on
 *  both its faces, the ground showing between them as veins and round them as a border; veins: { colour, glow, n } thin lines
 *  along it; tail: { len, colour, at } a swallowtail's streamer off its hind edge; tatters: its outer edge cut ragged. */
export function insectwing(bone, root, dir, o = {}) {
  const { len = 0.3, wide = 0.08, colour, cells = [], veins, tail, thick = 0.004, up = [0, 1, 0], tatters = 0 } = o, l = Math.hypot(...dir) || 1, d = dir.map(v => v / l);
  const prof = o.prof ?? [[0, 0.35], [0.3, 1], [0.65, 1.05], [0.9, 0.7], [1, 0.15]], at = t => root.map((v, i) => v + d[i] * len * t);
  // (the blade's own side to side: square to its length and to `up`; + is its hind edge for a wing whose `up` is the sky's)
  const side = (() => { const c = [up[1] * d[2] - up[2] * d[1], up[2] * d[0] - up[0] * d[2], up[0] * d[1] - up[1] * d[0]], m = Math.hypot(...c) || 1; return c.map(v => v / m * (c[2] > 0 ? -1 : 1)); })();
  const fat = t => { let i = 0; while (i + 2 < prof.length && prof[i + 1][0] < t) i++; const [t0, f0] = prof[i], [t1, f1] = prof[i + 1]; return f0 + (f1 - f0) * Math.min(1, Math.max(0, (t - t0) / (t1 - t0))); };
  const ring = (t, f, colour, glow, lift = 0, off = 0) => ({ at: at(t).map((v, i) => v + up[i] * lift + side[i] * off * wide * fat(t)), rx: Math.max(0.0008, wide * fat(t) * f), ry: thick, bone, colour, glow: !!glow, up, plain: true });
  const lofts = [{ sides: 4, up, rings: prof.map(([t], i) => ring(t, tatters && i > prof.length - 3 ? 1 - tatters * 0.4 : 1, colour)) }], cones = [];
  for (const c of cells) { const ts = [c.from, (c.from * 2 + c.to) / 3, (c.from + c.to * 2) / 3, c.to], f = [0.55, 1, 1, 0.5];
    for (const lift of [thick * 1.2, -thick * 1.2]) lofts.push({ sides: 4, up, rings: ts.map((t, i) => ring(t, (c.wide ?? 0.7) * f[i], c.colour, c.glow, lift, c.off ?? 0)) }); }
  if (veins) for (let n = 0; n < (veins.n ?? 1); n++) { const off = (veins.n ?? 1) > 1 ? -0.5 + n / ((veins.n ?? 1) - 1) : -0.3;
    lofts.push({ sides: 3, up, rings: [0.04, 0.35, 0.7, 0.96].map(t => ({ ...ring(t, 0, veins.colour, veins.glow, thick * 1.5, off * (1 - t * 0.5)), rx: veins.w ?? 0.005, ry: veins.w ?? 0.005 })) }); }
  if (tail) { const b = at(tail.at ?? 0.85).map((v, i) => v + side[i] * wide * fat(tail.at ?? 0.85) * 0.6); cones.push({ at: b, rx: wide * 0.2, ry: thick, tip: b.map((v, i) => v + (side[i] * 0.85 + d[i] * 0.25) * tail.len), bone, colour: tail.colour ?? colour, split: 0.7, bulge: 0.75, up, sides: 4 }); }
  if (tatters) for (let n = 0; n < 3; n++) { const t = 0.72 + n * 0.1, b = at(t).map((v, i) => v + side[i] * wide * fat(t) * (n - 1) * 0.5); cones.push({ at: b, rx: wide * 0.2, ry: thick, tip: b.map((v, i) => v + (d[i] * (0.5 + 0.25 * (n % 2)) + side[i] * (n - 1) * 0.3) * len * 0.3 * tatters), bone, colour, up, sides: 4 }); }
  return { lofts, cones };
}

/** How a winged insect goes: it hangs in the air and its wings beat (the view steps a flyer's frames by the clock, moving or
 *  not: art/mesh/index.js MESH_RATE). wings: [{ bone, s (1 its left, -1 its right), phase }]; beats a cycle, mid and amp (how
 *  high the wings are held and how far they beat, radians); more: what else moves, as a gait's `extra`. */
export const hovers = (wings, o = {}) => { const { beats = 3, mid = 0.15, amp = 0.75, seconds = 0.8, bob = 0.02, root = "thorax", more = [], ...rest } = o;
  return { type: "fly", seconds, root, bob, bobs: 1, legs: [], ...rest, extra: [...wings.map(w => ({ bone: w.bone, rot: u => [0, 0, w.s * (mid + amp * Math.sin(T * beats * u + (w.phase ?? 0)))] })), ...more] }; };

// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Added with the cold-blooded kinds (docs/plans/creature-mesh-rollout.md, batch E).

/** A row of scutes standing along a back: `n` between each pair of the skin's `rings` (kit/torso.js's, with the bone each rides:
 *  BONES) from ring `from` to ring `to`, at `side` round from the spine (radians; 0 one row down the middle, else a row each
 *  side). high, wide, long (each one's size), lean (how far its point leans back), colour, tip, glow ("tip" lights its point). */
export function scutes(rings, bones, o = {}) {
  const { from = 1, to = 4, n = 2, side = 0, high = 0.04, wide = 0.03, long = 0.04, lean = 0.5, colour, tip, glow = false, sides = 4 } = o, out = [];
  for (let i = from; i < to; i++) for (let j = 0; j < n; j++) for (const s of side ? [1, -1] : [1]) {
    const k = (j + 0.5) / n, A = rings[i], B = rings[i + 1], m = (p, q) => p + (q - p) * k, sx = Math.sin(side) * s, cy = Math.cos(side);
    const at = [m(A.at[0], B.at[0]) + sx * m(A.rx, B.rx) * 0.92, m(A.at[1], B.at[1]) + cy * m(A.ry, B.ry) * 0.92, m(A.at[2], B.at[2])];
    out.push({ at, rx: wide, ry: long, tip: [at[0] + sx * high, at[1] + cy * high, at[2] - high * lean], bone: bones[k < 0.5 ? i : i + 1], colour, tipColour: tip ?? colour, glow, split: 0.55, up: [0, 0, 1], sides });
  }
  return out;
}

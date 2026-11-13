// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.
import { bib } from "./bib.js";

/** The head on the skull's base `pivot`: its rings (to follow the torso's), ears, cheek tufts and eyes. size scales it all;
 *  muzzle its length, muzzleWide and muzzleDeep its section, wide the skull's width, dome its height, nose the nose's size;
 *  ear { shape: "point" | "round" | "long", tall, wide, at: [out, up, forward] (moved from a fox's), lean (a long ear laid back),
 *  splay (tipped outward), back, tip, inner, torn: -1|1 (that side's ear bitten short and split) }; cheek the tufts' reach (0:
 *  none); eye its size, eyeAt [out, up, forward] moving it; stripe (cy, sx) => a colour or nothing, painted over the skull and
 *  brow (a badger's bands: sx is -1..1 across the head); colours { coat, belly, nose, muzzle (the muzzle's own, if grizzled), mask
 *  (the face's, brow to nose, if it wears one), eye, eyes: [left, right] (each { colour, glow }) }. */
export function head(pivot, o) {
  const { size = 1, muzzle = 1, ear = {}, cheek = 1, eye = 1, colours: C, white = 0.5, wide = 1, dome = 1, muzzleWide = 1, muzzleDeep = 1, nose = 1, stripe, eyeAt = [0, 0, 0] } = o, k = size, m = muzzle;
  const P = (x, y, z) => [x * k, pivot[1] + y * k, pivot[2] + z * k], at = white * 0.7 - 0.85, mz = C.muzzle ?? C.mask ?? C.coat;
  const face = (base, lo) => (stripe ? (cy, sx) => stripe(cy, sx) ?? bib(base, C.belly, lo)(cy) : bib(base, C.belly, lo));
  const rings = [
    { at: P(0, 0.03, 0.04), rx: 0.09 * k * wide, ry: 0.074 * k * dome, bone: "head", colour: face(C.coat, at) },
    { at: P(0, 0.025, 0.11), rx: 0.08 * k * wide, ry: 0.066 * k * dome, bone: "head", colour: face(C.mask ?? C.coat, at + 0.2) },
    { at: P(0, 0, 0.16), rx: 0.044 * k * muzzleWide, ry: 0.044 * k * muzzleDeep, bone: "head", colour: face(mz, at + 0.4) },
    { at: P(0, -0.013, 0.16 + 0.065 * m), rx: 0.03 * k * muzzleWide, ry: 0.03 * k * muzzleDeep, bone: "head", colour: bib(mz, C.belly, at + 0.55) },
    { at: P(0, -0.013, 0.16 + 0.087 * m), rx: 0.02 * k * nose, ry: 0.02 * k * nose, bone: "head", colour: C.nose },
    { at: P(0, -0.013, 0.16 + 0.101 * m), rx: 0.009 * k * nose, ry: 0.009 * k * nose, bone: "head", colour: C.nose },
  ];
  const tall = ear.tall ?? 1, ew = ear.wide ?? 1, cones = [], lofts = [], bones = [["head", pivot, "neck"]], [ex = 0, ey = 0, ez = 0] = ear.at ?? [], shape = ear.shape ?? "point";
  for (const s of [1, -1]) {
    const name = s > 0 ? "earL" : "earR", bx = 0.048 * wide + ex, base = P(bx * s, 0.07 * dome + ey, 0.025 + ez), torn = ear.torn === s, h = torn ? 0.6 : 1;
    bones.push([name, base, "head"]);
    if (shape === "point") {
      const tip = (dx, f) => P((bx + (0.026 + (ear.splay ?? 0) * 0.1) * tall * f + dx) * s, 0.07 * dome + ey + 0.16 * tall * f, 0.025 + ez - 0.015 * f);
      cones.push({ at: base, rx: 0.042 * k * ew, ry: 0.034 * k * ew, tip: tip(0, h), bone: name, colour: cy => (cy < 0 ? (ear.back ?? C.coat) : C.coat), tipColour: ear.tip ?? ear.back ?? C.coat, split: torn ? 0.75 : 0.62, up: [0, 0, 1] });
      if (torn) cones.push({ at: P(0.03 * s, 0.1, 0.02), rx: 0.016 * k, ry: 0.014 * k, tip: tip(-0.03, 0.72), bone: name, colour: ear.back ?? C.coat, up: [0, 0, 1] }); // (what's left of its inner edge)
    } else {
      // a round ear is a low paddle; a long one a hare's: narrow at the root, widest a third up, thin all the way, its tip dark
      const long = shape === "long", H = (long ? 0.16 : 0.075) * tall * h, lean = ear.lean ?? (long ? 0.25 : 0), sp = (ear.splay ?? (long ? 0.12 : 0.35));
      const prof = long ? [[0, 0.5], [0.3, 1], [0.62, 0.92], [0.86, 0.6], [1, 0.12]] : [[0, 0.8], [0.45, 1], [0.8, 0.75], [1, 0.3]];
      const up = [0, Math.sin(lean), Math.cos(lean)];
      lofts.push({ sides: 6, up, rings: prof.map(([t, f], i) => ({ at: P((bx + sp * H * t) * s, 0.07 * dome + ey + H * t * Math.cos(lean), 0.025 + ez - H * t * Math.sin(lean)), rx: 0.04 * k * ew * f, ry: (long ? 0.012 : 0.016) * k * ew * (0.6 + 0.4 * f), bone: name, up,
        colour: t > (long ? 0.78 : 2) ? (ear.tip ?? ear.back ?? C.coat) : cy => (cy > 0 ? (ear.inner ?? C.coat) : (ear.back ?? C.coat)) })) });
      if (torn) cones.push({ at: P((bx + sp * H) * s, 0.07 * dome + ey + H * 0.9, 0.025 + ez - H * Math.sin(lean)), rx: 0.012 * k, ry: 0.008 * k, tip: P((bx + sp * H * 1.3 + 0.02) * s, 0.07 * dome + ey + H * 1.25, 0.025 + ez - H * Math.sin(lean) * 1.2), bone: name, colour: ear.back ?? C.coat, up });
    }
    if (cheek) cones.push({ at: P(0.06 * wide * s, -0.005, 0.065), rx: 0.04 * k, ry: 0.03 * k, tip: P((0.06 * wide + 0.075 * cheek) * s, -0.005 - 0.035 * cheek, 0.065 - 0.065 * cheek), bone: "head", colour: C.cheek ?? C.belly, split: 0.5, up: [0, 1, 0] });
    const E = C.eyes?.[s > 0 ? 0 : 1], ew2 = 0.058 * wide + eyeAt[0];
    cones.push({ at: P(ew2 * s, 0.055 * dome + eyeAt[1], 0.117 + eyeAt[2]), rx: 0.019 * k * eye, ry: 0.016 * k * eye, tip: P((ew2 + 0.016 * eye) * s, 0.063 * dome + eyeAt[1], 0.125 + eyeAt[2]), bone: "head", colour: E?.colour ?? C.eye ?? C.nose, glow: !!E?.glow, tag: "eye", split: 0.5, up: [0, 1, 0], sides: 4 });
  }
  return { bones, rings, cones, lofts, P, ears: ["earL", "earR"] };
}

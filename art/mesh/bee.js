// The bee, four levels, as plans for tools/creature-mesh/quadruped.js (it builds any plan of bones, lofts and cones): a
// candidate to stand in for the marten or the stoat (Ed, 2026-11-11: "Martens and Stoats are pretty similar, maybe we should
// have a different animal. Bees? Turtles?"). It hovers: a furred thorax between a round head with great dark eyes and a banded
// abdomen ending in its sting, two pairs of wings beating, six legs hanging. Its ladder is a proposal: a bee-let, all fluff,
// its wings too small to lift it far; a slim worker; a great bumble of an adult with pollen on its legs; and the old queen,
// long in the body, plated in purple enamel cut with honey-lit marks, crowned in comb, her wings ragged fans of dark blades set with light. On home
// island in the marten's place (Ed, 2026-11-11: "keep both, but swap the marten for the bee"). Metres; y up; its head along
// +z; it hangs `fly` off the ground.
import { ball, tufts } from "./kit.js";

const BLACK = "#1d1612", AMBER = "#f2b21f", FUZZ = "#e0a019", WING = "#e3f4ff";

function bee(name, o) {
  const { fly = 0.3, k = 1, C = {}, wing = 1, abdomen: ab = {}, eye = 1, sting = 1, fuzz, antennae = 1, gait = {} } = o, coat = C.fuzz ?? FUZZ, dark = C.dark ?? BLACK, light = C.band ?? AMBER;
  const P = (x, y, z) => [x * k, fly + y * k, z * k], T = Math.PI * 2;
  const bones = [["root", [0, 0, 0], null], ["thorax", P(0, 0.06, 0.02), "root"], ["head", P(0, 0.05, 0.11), "thorax"], ["abd1", P(0, 0.04, -0.06), "thorax"], ["abd2", P(0, 0.0, -0.06 - 0.16 * (ab.len ?? 1)), "abd1"]];
  const lofts = [], cones = [];
  // thorax and head
  lofts.push(...ball("thorax", P(0, 0.06, 0.02), { r: 0.092 * k * (o.chest ?? 1), colour: coat, sides: 8 }).lofts, ...ball("head", P(0, 0.05, 0.135), { r: 0.066 * k, colour: dark, sides: 7 }).lofts);
  for (const s of [1, -1]) {
    lofts.push(...ball("head", P(0.046 * s, 0.062, 0.16), { r: 0.036 * k * eye, colour: C.eye ?? "#0c0a09", glow: !!C.eyeGlow, sides: 6 }).lofts);
    bones.push([`ant${s > 0 ? "L" : "R"}`, P(0.02 * s, 0.11, 0.16), "head"]);
    cones.push({ at: P(0.02 * s, 0.105, 0.16), rx: 0.008 * k, ry: 0.008 * k, tip: P(0.07 * s * antennae, 0.105 + 0.12 * antennae, 0.16 + 0.1 * antennae), bend: [0, 0.04 * k * antennae, 0], bulge: 0.9, bone: `ant${s > 0 ? "L" : "R"}`, colour: dark, up: [0, 0, 1], sides: 3 });
  }
  // the abdomen: banded rings from the waist to the sting, drooping
  const L = ab.len ?? 1, fat = ab.fat ?? 1, n = ab.rings ?? 6, prof = i => { const t = i / (n - 1); return Math.sin(Math.PI * Math.pow(t, 0.75)) * 0.9 + 0.1 * (1 - t); };
  const ring = (i, e = 0) => { const t = Math.min(1, Math.max(0, i / (n - 1) + e)); return { at: P(0, 0.045 - 0.11 * t * L, -0.07 - 0.36 * t * L), rx: 0.105 * k * fat * prof(t * (n - 1)) + 0.012 * k, ry: 0.1 * k * fat * prof(t * (n - 1)) + 0.012 * k, bone: t < 0.45 ? "abd1" : "abd2", colour: (ab.colour ?? (j => (j % 2 ? dark : light)))(i) }; };
  // (each band two rings of its colour, so the bands' edges are sharp and not a blend from one ring to the next)
  const R = Array.from({ length: n }, (_, i) => ring(i)), half = 0.42 / (n - 1);
  lofts.push({ name: "abdomen", sides: 8, up: [0, 1, 0.3], rings: R.flatMap((r, i) => (i === 0 ? [r, ring(i, half)] : i === n - 1 ? [ring(i, -half), r] : [ring(i, -half), ring(i, half)])) });
  const end = R[n - 1].at; cones.push({ at: end, rx: 0.014 * k, ry: 0.014 * k, tip: [end[0], end[1] - 0.03 * k * sting, end[2] - 0.09 * k * sting], bone: "abd2", colour: C.sting ?? dark, up: [0, 1, 0], sides: 4 });
  // wings: a fore and a hind pair, flat blades from the thorax's top
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) for (const [pair, len, wide, back] of [["f", 0.3, 0.075, 0.25], ["h", 0.2, 0.06, 0.75]]) {
    const b = `wing${pair}${tag}`, root = P(0.035 * s, 0.13, 0.02 - (pair === "h" ? 0.035 : 0)); bones.push([b, root, "thorax"]);
    const d = [s * Math.cos(back) * 0.92, 0.38, -Math.sin(back)], at = t => root.map((v, j) => v + d[j] * len * wing * k * t);
    // (an old queen's wings, o.ornate: { frame, cells: [colours] }; Ed, 2026-11-12, of a drawing of a ragged fairy wing: "the bee
    // legend can have wings more like this": each wing a fan of long pointed blades, the fore pair swept up and out, the hind
    // pair trailing in tails that curl, every blade a dark frame with a lit cell set in it, like leaded glass)
    if (o.ornate) { const c = [0, -0.12, -1], n = [d[1] * c[2] - d[2] * c[1], d[2] * c[0] - d[0] * c[2], d[0] * c[1] - d[1] * c[0]], nl = Math.hypot(...n) * (n[1] < 0 ? -1 : 1), up = n.map(v => v / nl);
      const fan = pair === "f" ? [[-0.3, 0.85, 1], [0.05, 1.15, 1.15], [0.4, 0.95, 1.05], [0.75, 0.7, 0.9]] : [[0.35, 0.8, 0.9], [0.7, 1.2, 0.8], [1.05, 1.75, 0.6], [1.35, 1.25, 0.55]];
      fan.forEach(([th, long, fat], i) => { const dir = d.map((v, j) => v * Math.cos(th) + c[j] * Math.sin(th)), L = len * wing * k * long, W = wide * wing * k * fat * 0.62, curl = pair === "h" ? 0.5 : 0.22;
        const along = t => root.map((v, j) => v + dir[j] * L * t + c[j] * curl * L * t * t + up[j] * (i % 2 ? 0.006 : 0) * k), blade = (pts, w, colour, lift, glow) => ({ sides: 4, up, rings: pts.map(([t, f]) => ({ at: along(t).map((v, j) => v + up[j] * lift), rx: Math.max(0.0008, w * f), ry: 0.004 * k, bone: b, colour, glow, up })) });
        lofts.push(blade([[0, 0.3], [0.22, 1], [0.5, 0.85], [0.75, 0.42], [0.9, 0.16], [1, 0.01]], W, o.ornate.frame, 0, false));
        const cell = o.ornate.cells[i % o.ornate.cells.length], pts = [[0.14, 0.2], [0.26, 1], [0.48, 0.8], [0.66, 0.2]];
        lofts.push(blade(pts, W * 0.6, cell, 0.005 * k, true), blade(pts, W * 0.6, cell, -0.005 * k, true)); });
      continue; }
    lofts.push({ sides: 4, up: [0, 1, 0], rings: [[0, 0.35], [0.3, 1], [0.65, 1.05], [0.9, 0.7], [1, 0.15]].map(([t, f]) => ({ at: at(t), rx: wide * wing * k * f, ry: 0.004 * k, bone: b, colour: C.wing ?? WING, up: [0, 1, 0] })) });
    if (C.vein) lofts.push({ sides: 3, up: [0, 1, 0], rings: [0.05, 0.4, 0.75, 0.97].map(t => ({ at: at(t).map((v, j) => v + (j === 1 ? 0.006 * k : 0)), rx: 0.006 * k, ry: 0.006 * k, bone: b, colour: C.vein, glow: true, up: [0, 1, 0] })) });
  }
  // six legs hanging, the hind pair longest
  [[0.08, 0.14, 0.9], [0.02, 0.17, 1], [-0.04, 0.2, 1.15]].forEach(([z, len, f], i) => { for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const b = `leg${i}${tag}`, top = P(0.05 * s, 0.0, z); bones.push([b, top, "thorax"]);
    const knee = [top[0] + 0.06 * k * s, top[1] - len * 0.45 * k, top[2] - 0.01 * k], foot = [top[0] + 0.04 * k * s, top[1] - len * f * k, top[2] - 0.05 * k];
    lofts.push({ sides: 4, up: [0, 0, 1], rings: [{ at: top, rx: 0.014 * k, ry: 0.014 * k, bone: b, colour: dark }, { at: knee, rx: 0.011 * k, ry: 0.011 * k, bone: b, colour: dark }, { at: foot, rx: 0.006 * k, ry: 0.006 * k, bone: b, colour: dark }] });
    // (pollen: a pad of it packed on each hind shin)
    if (o.pollen && i === 2) lofts.push({ sides: 5, up: [0, 0, 1], rings: [[0.1, 0.5], [0.4, 1], [0.75, 0.9], [0.95, 0.4]].map(([t, f]) => ({ at: knee.map((v, j) => v + (foot[j] - v) * t), rx: 0.024 * k * o.pollen * f, ry: 0.02 * k * o.pollen * f, bone: b, colour: "#ffd84a" })) });
  } });
  if (fuzz) cones.push(...tufts({ at: P(0, 0.06, 0.02), rx: 0.085 * k, ry: 0.085 * k }, "thorax", { n: fuzz.n ?? 4, a0: 0.2, a1: 2.6, long: (fuzz.long ?? 0.05) * k, sweep: 0.5, droop: 0, r: 0.03 * k, lock: true, colour: () => coat, tip: () => fuzz.tip ?? "#fff0b8" }),
    ...tufts({ at: P(0, 0.06, 0.07), rx: 0.07 * k, ry: 0.07 * k }, "thorax", { n: fuzz.n ?? 4, a0: 0.3, a1: 2.8, long: (fuzz.long ?? 0.05) * k * 0.8, sweep: 0.2, droop: 0, r: 0.028 * k, lock: true, colour: () => fuzz.collar ?? coat, tip: () => fuzz.tip ?? "#fff0b8" }));
  // it hovers: the wings beat (three beats to its bob, so each frame catches them somewhere else), the body rocks, the legs trail
  const beats = gait.beats ?? 3, flap = (s, ph) => u => [0, 0, s * (0.15 + 0.75 * Math.sin(T * beats * u + ph))];
  return { name, bones, lofts: [...lofts, ...(o.lofts ?? [])], cones: [...cones, ...(o.cones ?? [])], armour: o.armour ?? [], hover: fly * k, /* (how far off the ground it hangs: its sprites keep that much air under it, art/mesh/raster.js) */ gait: { seconds: 0.8, root: "thorax", bob: 0.02 * k, bobs: 1, legs: [], ...gait, extra: [
    { bone: "wingfL", rot: flap(1, 0) }, { bone: "wingfR", rot: flap(-1, 0) }, { bone: "winghL", rot: flap(1, -0.5) }, { bone: "winghR", rot: flap(-1, -0.5) },
    { bone: "abd1", rot: u => [0.08 * Math.sin(T * u), 0, 0] }, { bone: "abd2", rot: u => [0.1 * Math.sin(T * u - 0.8), 0, 0] }, { bone: "head", rot: u => [0.05 * Math.sin(T * u + 1), 0.06 * Math.sin(T * u), 0] },
    ...[0, 1, 2].flatMap(i => ["L", "R"].map((tag, n) => ({ bone: `leg${i}${tag}`, rot: u => [0.12 * Math.sin(T * u + i + n), 0, 0.06 * Math.sin(T * u * 2 + i)] }))),
    { bone: "antL", rot: u => [0.1 * Math.sin(T * 2 * u), 0, 0] }, { bone: "antR", rot: u => [0.1 * Math.sin(T * 2 * u + 1), 0, 0] }, ...(gait.more ?? [])] }, P, R };
}
const done = b => { const { P, R, ...plan } = b; return plan; };

export const BEE_PLANS = {
  // a bee-let: a ball of pale fluff with a stub of an abdomen, wings too small to lift it far, great dark eyes
  baby: () => done(bee("bee-baby", { fly: 0.14, chest: 1.25, C: { fuzz: "#f6d76a", band: "#f6d76a", dark: "#4a3a22" }, wing: 0.5, eye: 1.3, sting: 0, antennae: 0.6, abdomen: { len: 0.45, fat: 0.85, rings: 5, colour: i => (i % 2 ? "#6a5230" : "#f6d76a") }, fuzz: { n: 4, long: 0.06, tip: "#fffbe0" }, gait: { seconds: 0.6, beats: 5 } })),
  // a worker: slim, neatly banded, proper wings
  young: () => done(bee("bee-young", { fly: 0.26, chest: 0.9, wing: 0.95, abdomen: { len: 0.9, fat: 0.8 }, antennae: 0.9 })),
  // a great bumble: a deep furred thorax, bold bands, wide wings, pollen heaped on its hind legs, a long sting
  adult: () => done(bee("bee-adult", { fly: 0.3, chest: 1.2, wing: 1.2, eye: 1.1, sting: 1.5, antennae: 1.2, pollen: 1.3, abdomen: { len: 1.05, fat: 1.2, rings: 7 }, fuzz: { n: 5, long: 0.07, tip: "#fff0b8", collar: "#fff0b8" } })),
  // the old queen: long in the body, banded black and gold; over each black band a plate of royal purple enamel edged in gold, a
  // honey-lit mark on every plate; a crown of comb; her wings ragged fans of long dark blades with lit cells set in them, the
  // hind pair trailing in tails; a ruff of white fur
  legend() {
    const GOLD = "#e9b949", HONEY = "#ffc83a", LIT = "#fff2b0", PURPLE = "#4b2a6e", C = { fuzz: "#c98a14", band: GOLD, dark: "#241a12", eye: "#6a1626", vein: LIT, sting: GOLD, wing: "#cfe9ff" };
    // her armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): each black band i lies between the abdomen's rings 2i and 2i + 1
    const armour = [1, 3, 5, 7].map(i => ({ on: "abdomen", from: 2 * i - 0.25, to: 2 * i + 1.25, round: [0, 1.7], thick: 0.016, colour: PURPLE, rim: GOLD, runes: { colour: HONEY, size: 0.7, max: 1, seed: i } }));
    const b = bee("bee-legend", { fly: 0.36, chest: 1.15, C, wing: 1.75, eye: 1.05, sting: 2.6, antennae: 1.8, abdomen: { len: 1.9, fat: 1.05, rings: 10, colour: i => (i % 2 ? "#241a12" : GOLD) }, fuzz: { n: 6, long: 0.1, tip: "#ffffff", collar: "#ffffff" }, armour, ornate: { frame: "#2b1840", cells: [LIT, HONEY, "#cfe9ff"] }, gait: { seconds: 1.2, beats: 5 } }), { P } = b;
    // the crown: five cells of comb standing on her head, the middle one lit
    const crown = [-2, -1, 0, 1, 2].map(i => ({ at: P(0.03 * i, 0.105, 0.125), rx: 0.022, ry: 0.02, tip: P(0.04 * i, 0.105 + 0.15 - 0.02 * Math.abs(i), 0.115), bone: "head", colour: GOLD, tipColour: i ? GOLD : HONEY, glow: !i, split: 0.8, bulge: 0.9, up: [0, 0, 1], sides: 6 }));
    return { ...done(b), cones: [...b.cones, ...crown] };
  },
};

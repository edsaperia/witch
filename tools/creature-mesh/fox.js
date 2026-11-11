// The fox's four levels as plans for tools/creature-mesh/quadruped.js, each its own build and not the last one enlarged (Ed,
// 2026-10-05: "the evolved design per stage (not just being larger)"). Its signature is the brush and the pointed mask, pushed
// further a level: a kit that's all ears with a stub of a tail; a leggy young with a full brush; an adult with its ruff and a
// second, smaller tail; and the old shrine fox, the elder of its kind (the genome's brief, art/creatures/fox/genome.js): nine
// soft tails tipped silver-white, a grizzled muzzle and a bitten ear, a red rope at its throat with a bell, rings in its ears,
// stone prayer beads on its legs. The red fox's own proportions underneath: long in the leg, a deep narrow chest tucked up to
// the loin, a wedge of a head. Metres; y up; its head along +z.
import { band, head, leg, plan, tail, torso } from "./kit.js";

const WHITE = "#f4efe6", SOCK = "#2a1a16", NOSE = "#16100e", EAR = "#1f1512";

/** The four legs on a torso: len and thick for all, fore a little shorter as the shoulder sits lower. */
function legs(body, o) {
  const out = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const hip = body.hip(s), sh = body.shoulder(s);
    out.push(leg("hind", tag, s, [hip[0], 0.37 * o.len, hip[2]], { ...o, parent: "pelvis" }), leg("fore", tag, s, [sh[0], 0.34 * o.len, sh[2]], { ...o, parent: "chest" }));
  }
  return out;
}
// a walk: left hind, left fore, right hind, right fore, a quarter apart; `k` scales how far the joints swing and fold
const walk = (k = 1) => [["hip", "knee", "hock", 0, 0.33, [0.5, -0.65], -0.06], ["shoulder", "elbow", "wrist", 0.75, 0.34, [-0.5, 1.0], -0.16]].flatMap(([a, b, c, ph, swing, fold, lift]) =>
  [["L", 0], ["R", 0.5]].map(([tag, off]) => ({ bones: [a + tag, b + tag, c + tag], phase: (ph + off) % 1, swing: swing * k, fold: fold.map(f => f * k), lift: lift * k })));

function baby() {
  const C = { coat: "#a8643a", belly: "#eadfce", nose: NOSE, upper: "#a8643a", mid: "#96552f", sock: "#4a2f25" }, L = 0.52;
  const body = torso({ back: 0.37 * L + 0.012, len: 0.54, girth: 1.02, deep: 0.92, tuck: 1.08, neck: [0.075, 0.07], neckThick: 1.15, white: 0.45, colours: C });
  const skull = head(body.pivot, { size: 1.38, muzzle: 0.45, ear: { tall: 1.05, wide: 1.45, back: EAR }, cheek: 0.5, eye: 1.6, white: 0.55, colours: C });
  const brush = tail("tail", "pelvis", [0, 0.37 * L + 0.02, -0.19], { len: 0.19, r: 0.062, pitch: 0.15, tip: 0.4, blunt: 0.4, colours: { coat: C.coat, tip: WHITE } });
  return plan("fox-baby", body, skull, [...legs(body, { len: L, thick: 1.6, colours: C }), brush], { seconds: 0.46, duty: 0.55, bob: 0.011, sway: 0.07, tailSwing: 0.3, tails: [brush.chain], legs: walk(1.15) });
}

function young() {
  const C = { coat: "#e8852b", belly: WHITE, nose: NOSE, upper: "#e8852b", mid: "#cf6c1f", sock: SOCK }, L = 1.1;
  const body = torso({ back: 0.37 * L + 0.01, len: 0.96, girth: 0.84, deep: 0.95, tuck: 0.72, neck: [0.17, 0.15], neckThick: 0.92, white: 0.4, colours: C });
  const skull = head(body.pivot, { size: 0.93, muzzle: 1.08, ear: { tall: 1.25, wide: 1.05, back: EAR }, cheek: 0.35, eye: 1.15, colours: C });
  const brush = tail("tail", "pelvis", [0, 0.37 * L + 0.015, -0.33], { len: 0.54, r: 0.088, pitch: -0.3, colours: { coat: C.coat, under: "#b85c1b", tip: WHITE } });
  return plan("fox-young", body, skull, [...legs(body, { len: L, thick: 0.86, colours: C }), brush], { seconds: 0.62, duty: 0.58, bob: 0.008, sway: 0.05, tailSwing: 0.16, tails: [brush.chain], legs: walk(1.05) });
}

function adult() {
  const C = { coat: "#e07a1f", belly: WHITE, nose: NOSE, upper: "#e07a1f", mid: "#c9641a", sock: SOCK }, L = 1;
  const body = torso({ back: 0.38, len: 1, girth: 1, deep: 1.04, tuck: 0.86, neck: [0.17, 0.15], neckThick: 1.12, white: 0.5, colours: C });
  const skull = head(body.pivot, { size: 1, muzzle: 1, ear: { tall: 1, wide: 1, back: EAR, tip: EAR }, cheek: 1.35, eye: 1, colours: C });
  const T = { coat: C.coat, under: "#a44f18", tip: WHITE };
  const brush = tail("tail", "pelvis", [-0.015, 0.385, -0.335], { len: 0.54, r: 0.096, yaw: -0.16, pitch: -0.3, colours: T }), second = tail("tailb", "pelvis", [0.03, 0.4, -0.32], { len: 0.42, r: 0.07, yaw: 0.3, pitch: 0.28, curl: -0.25, tip: 0.26, colours: T });
  // the ruff: white fur standing off the throat and the chest's front
  const n = body.rings[5].at, ruff = [[0.055, -0.03, 0.02, 0.1, -0.1, -0.02], [-0.055, -0.03, 0.02, -0.1, -0.1, -0.02], [0, -0.07, 0.03, 0, -0.16, 0.0]].map(([x, y, z, tx, ty, tz]) => ({ at: [n[0] + x, n[1] + y, n[2] + z], rx: 0.04, ry: 0.035, tip: [n[0] + tx, n[1] + ty, n[2] + tz], bone: "neck", colour: WHITE, split: 0.5, up: [0, 0, 1] }));
  return plan("fox-adult", body, skull, [...legs(body, { len: L, thick: 1, colours: C }), brush, second], { seconds: 0.72, duty: 0.6, bob: 0.007, sway: 0.045, tailSwing: 0.13, tails: [brush.chain, second.chain], legs: walk(1) }, { cones: ruff });
}

function legend() {
  const SILVER = "#eef2f5", GREY = "#cdc6bd", GOLD = "#e9b949", ROPE = "#c5222c", STONE = "#8d9398";
  const C = { coat: "#c75e17", belly: "#efe8dc", nose: NOSE, muzzle: GREY, eye: "#ffd15c", upper: "#c75e17", mid: "#a94d14", sock: "#211512" }, L = 1.2;
  const body = torso({ back: 0.37 * L + 0.01, len: 1.06, girth: 1.12, deep: 1.22, tuck: 0.66, neck: [0.23, 0.13], neckThick: 1.3, white: 0.55, colours: C });
  const skull = head(body.pivot, { size: 1.14, muzzle: 1.25, ear: { tall: 1.45, wide: 1, back: EAR, tip: EAR, torn: -1 }, cheek: 1.6, eye: 1.8, white: 0.6, colours: C });
  // nine tails rooted across the rump, fanned up and back like a held breath, the middle ones tallest, every tip silver
  const tails = Array.from({ length: 9 }, (_, i) => { const f = (i - 4) / 4, a = Math.abs(f);
    return tail(`tail${"abcdefghi"[i]}`, "pelvis", [0.05 * f, body.rings[1].at[1] + 0.05 - 0.03 * a, body.rings[1].at[2] - 0.03 + 0.04 * a], { len: 0.74 - 0.14 * a + (i % 2) * 0.05, r: 0.118 - 0.014 * a, yaw: f * 0.95, pitch: 0.62 - 0.5 * a - (i % 2) * 0.22, curl: 0.3 + 0.12 * a, tip: 0.17, blunt: 0.26, sides: 7, colours: { coat: C.coat, under: "#93440f", tip: SILVER } }); });
  // a mane of pale old fur off the neck and shoulders
  const n = body.rings[5].at, sh = body.rings[4].at, mane = [[0.07, 0.0, 0, 0.17, -0.1, -0.08], [-0.07, 0, 0, -0.17, -0.1, -0.08], [0.06, -0.07, 0.03, 0.12, -0.2, -0.02], [-0.06, -0.07, 0.03, -0.12, -0.2, -0.02], [0, -0.1, 0.05, 0, -0.25, 0.02], [0.05, 0.06, -0.03, 0.1, 0.07, -0.16], [-0.05, 0.06, -0.03, -0.1, 0.07, -0.16]]
    .map(([x, y, z, tx, ty, tz]) => ({ at: [n[0] + x, n[1] + y, n[2] + z], rx: 0.05, ry: 0.045, tip: [n[0] + tx, n[1] + ty, n[2] + tz], bone: "neck", colour: y > 0.03 ? C.coat : C.belly, tipColour: GREY, split: 0.55, up: [0, 0, 1] }));
  // the shrine's rope high on its throat, its bell under it; a ring in each ear; grey brows
  const top = body.rings[6].at, rope = band("neck", n, top, { at: 0.6, r: 0.1, ry: 0.118, wide: 0.04, colour: ROPE }), P = skull.P;
  const by = top[1] - 0.24, bz = top[2] + 0.06, bell = [{ at: [0, by, bz], rx: 0.045, ry: 0.045, tip: [0, by - 0.075, bz], bone: "neck", colour: GOLD, split: 0.8, up: [0, 0, 1], sides: 6 }, { at: [0, by, bz], rx: 0.045, ry: 0.045, tip: [0, by + 0.05, bz - 0.01], bone: "neck", colour: GOLD, up: [0, 0, 1], sides: 6 }];
  const rings = [1, -1].map(s => ({ at: P(0.088 * s, 0.13, 0.02), rx: 0.014, ry: 0.014, tip: P(0.1 * s, 0.075, 0.02), bone: s > 0 ? "earL" : "earR", colour: GOLD, split: 0.8, up: [0, 0, 1], sides: 5 }));
  const brows = [1, -1].map(s => ({ at: P(0.045 * s, 0.092, 0.1), rx: 0.018, ry: 0.012, tip: P(0.085 * s, 0.125, 0.04), bone: "head", colour: GREY, split: 0.5, up: [0, 1, 0] }));
  const four = legs(body, { len: L, thick: 1.02, colours: C, band: { colour: STONE, at: 0.3, r: 0.036 } });
  return plan("fox-legend", body, skull, [...four, ...tails, rope], { seconds: 0.95, duty: 0.64, bob: 0.006, sway: 0.035, tailSwing: 0.08, tails: tails.map(t => t.chain), legs: walk(0.9) }, { cones: [...mane, ...bell, ...rings, ...brows] });
}

export const FOX = { baby, young, adult, legend };

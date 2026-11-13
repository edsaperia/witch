// The tarantula, four levels, as plans for art/mesh/shape.js (the rollout's batch G, the many-legged:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/spider/genome.js): "dark and hairy, a big furry abdomen, thick legs banded orange at every joint; its legend's
// web the old rose window". Eight jointed legs going as two fours (kit/manylegs.js), its knees carried higher than its back;
// a fore part with its fangs, feeler legs and eyes, and a great abdomen on a bone of its own. Its ladder: a spiderling, pale
// brown and big-eyed on short legs; a leggy young one, its bands showing; a heavy furred adult; and the old one of the
// badlands, tall on long legs, its abdomen raised and plated in rose glass leaded with gold, a petal of the old window lit on
// every plate, its fangs and its eight eyes lit.
import { legPairs, scuttles } from "../kit/manylegs.js";
import { tufts } from "../kit/tufts.js";

function spider(name, o) {
  const { k = 1, C, abdomen: ab = {}, legs: lg = {}, fur, fangs = 1, eyes = {}, armour = [], gait = {} } = o, y0 = 0.135 * k * (lg.stand ?? 1), fat = ab.fat ?? 1, AL = ab.len ?? 1, tilt = ab.tilt ?? 0.06;
  // its skin, tail to nose: the abdomen (on `abd`, tilted up behind), a narrow waist, the fore part, the head
  const A = (t, r) => ({ at: [0, y0 + (0.02 + tilt * AL * (1 - t) * 3) * k, (-0.07 - 0.3 * AL * (1 - t)) * k], rx: 0.13 * fat * r * k, ry: 0.12 * fat * r * k, bone: "abd", colour: cy => (cy < -0.6 ? C.belly : C.abdomen ?? C.coat) });
  const B = (z, rx, ry, bone, dy = 0) => ({ at: [0, y0 + dy * k, z * k], rx: rx * k, ry: ry * k, bone, colour: cy => (cy < -0.6 ? C.belly : C.coat) });
  const skin = [A(0, 0.12), A(0.14, 0.62), A(0.4, 1), A(0.68, 0.97), A(0.9, 0.6), A(1, 0.4), B(-0.055, 0.07, 0.05, "body"), B(0, 0.105, 0.066, "body"), B(0.06, 0.092, 0.06, "body"), B(0.1, 0.064, 0.048, "head", -0.004), B(0.135, 0.03, 0.026, "head", -0.01)];
  const bones = [["body", [0, y0, 0], null], ["abd", [0, y0 + 0.02 * k, -0.07 * k], "body"], ["head", [0, y0, 0.085 * k], "body"]], lofts = [{ name: "skin", sides: 8, up: [0, 1, 0], rings: skin }], cones = [];
  // (fur standing off its abdomen)
  if (fur) for (const i of [1, 2, 3]) cones.push(...tufts(skin[i], "abd", { n: fur.n ?? 4, a0: 0.25, a1: 2.3, long: (fur.long ?? 0.06) * k, sweep: 0.55, droop: 0, r: 0.026 * k * fat, lock: true, colour: () => C.abdomen ?? C.coat, tip: () => fur.tip }));
  const hy = y0 - 0.006 * k;
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    // its eyes: a big pair in front (what shuts asleep), small ones beside them
    cones.push({ at: [0.022 * k * s, hy + 0.03 * k, 0.115 * k], rx: 0.013 * k * (eyes.size ?? 1), ry: 0.013 * k * (eyes.size ?? 1), tip: [0.026 * k * s, hy + 0.036 * k, 0.133 * k], bone: "head", colour: eyes.colour ?? "#0c0a09", glow: !!eyes.glow, tag: "eye", up: [0, 1, 0], sides: 5, bulge: 0.8 });
    for (const [dx, dz] of [[0.045, 0.1], [0.05, 0.08]]) cones.push({ at: [dx * k * s, hy + 0.034 * k, dz * k], rx: 0.008 * k, ry: 0.008 * k, tip: [(dx + 0.012) * k * s, hy + 0.044 * k, (dz + 0.006) * k], bone: "head", colour: eyes.colour ?? "#0c0a09", glow: !!eyes.glow, up: [0, 1, 0], sides: 4, bulge: 0.8 });
    // its fangs, and a feeler leg each side of them
    cones.push({ at: [0.02 * k * s, hy - 0.012 * k, 0.125 * k], rx: 0.016 * k, ry: 0.016 * k, tip: [0.012 * k * s, hy - (0.03 + 0.045 * fangs) * k, 0.14 * k], bend: [0, 0, 0.012 * k], bulge: 0.75, bone: "head", colour: C.coat, tipColour: C.fang ?? "#1a1210", glow: C.fangGlow ? "tip" : false, up: [0, 0, 1], sides: 4 });
    bones.push([`palp${tag}`, [0.04 * k * s, hy - 0.004 * k, 0.11 * k], "head"]);
    lofts.push({ sides: 4, up: [1, 0, 0], rings: [[0, 0, 0, 1], [0.012, 0.022, 0.05, 0.9], [0.016, -0.03, 0.085, 0.75], [0.014, -0.075, 0.09, 0.35]].map(([dx, dy, dz, f], i) => ({ at: [(0.04 + dx) * k * s, hy - 0.004 * k + dy * k, (0.11 + dz) * k], rx: 0.016 * k * f, ry: 0.016 * k * f, bone: `palp${tag}`, colour: i === 1 ? C.joint : C.leg })) });
  }
  // eight legs fanned round its fore part, knees high
  const L = 0.3 * k * (lg.len ?? 1), legs = legPairs([[-0.035, -0.95], [-0.008, -0.35], [0.022, 0.28], [0.052, 0.88]].map(([z, yaw], i) => ({ at: [0.072 * k, y0 - 0.02 * k, z * k], yaw, len: L * (i === 0 || i === 3 ? 1.08 : 0.94) })), { rise: lg.rise ?? 0.45, knee: 0.42, thick: lg.thick ?? 1, low: 0.26, sides: 5, parent: "body", colours: { upper: C.leg, joint: C.joint, lower: C.leg, tip: C.foot ?? C.leg } });
  const T = Math.PI * 2;
  return { name, bones: [...bones, ...legs.flatMap(l => l.bones)], lofts: [...lofts, ...legs.flatMap(l => l.lofts)], cones: [...cones, ...(o.cones?.({ skin, k, y0 }) ?? [])], armour,
    // (asleep its legs are drawn in tight against it, knees up, as a resting spider's; a legend's, too long for that, lower)
    gait: { root: "body", hips: "body", head: "head", ...scuttles(legs, { fold: o.fold ?? { thigh: 0.95, shin: -1.75, foot: -1.9 }, ...gait }), extra: [{ bone: "abd", rot: u => [0.03 * Math.sin(T * 2 * u), 0.05 * Math.sin(T * u + 0.6), 0] }, { bone: "palpL", rot: u => [0.25 * Math.sin(T * u), 0, 0] }, { bone: "palpR", rot: u => [0.25 * Math.sin(T * u + 2), 0, 0] }] }, anchors: { neck: 6, skull: 9 } };
}
const ORANGE = "#e07a2d";
const spiders = {
  // a spiderling: pale brown, big-eyed, a small round abdomen, short thick legs
  baby: () => spider("spider-baby", { k: 0.75, C: { coat: "#7a5a48", abdomen: "#8a6a54", belly: "#5a4236", leg: "#5e463a", joint: "#c98a52" }, abdomen: { len: 0.62, fat: 0.72 }, legs: { len: 0.66, thick: 1.7, rise: 0.36, stand: 0.8 }, eyes: { size: 1.6 }, fangs: 0.5, gait: { lively: 1.3 } }),
  // leggy and quick, its orange bands showing
  young: () => spider("spider-young", { k: 0.88, C: { coat: "#4a382f", abdomen: "#54402f", belly: "#33261f", leg: "#3a2c26", joint: ORANGE }, abdomen: { len: 0.8, fat: 0.8 }, legs: { len: 0.92, thick: 1.15 }, fur: { n: 3, long: 0.04, tip: "#7a5a40" }, gait: { lively: 1.1 } }),
  // heavy and hairy: a great furred abdomen, thick legs banded orange at every joint
  adult: () => spider("spider-adult", { C: { coat: "#3d302b", abdomen: "#46342a", belly: "#261c18", leg: "#2e2420", joint: ORANGE, foot: "#4a342a" }, abdomen: { len: 1, fat: 1.08 }, legs: { thick: 1.45 }, fur: { n: 5, long: 0.07, tip: "#8a5a36" }, fangs: 1.2 }),
  // the old one of the badlands: tall on long legs, its abdomen raised and plated in rose glass leaded with gold, a petal of the
  // old window lit on every plate; its fangs and its eyes lit
  legend() {
    const ROSE = "#7a1f3a", GOLD = "#e9b949", LIT = "#ff9ac0";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ on: "skin", from: 1.05, to: 4.6, round: [0, 2.1], lames: 4, inset: 0.06, gap: 0.05, thick: 0.022, step: 0.008, colour: ROSE, rim: GOLD, runes: { colour: LIT, max: 1, size: 0.62 } },
      { on: "skin", from: 6.1, to: 8.6, round: [0, 1.5], thick: 0.016, step: 0.006, colour: ROSE, rim: GOLD, runes: { colour: LIT, max: 1, size: 0.6, round: [0, 0.9] } }];
    return spider("spider-legend", { k: 1.45, C: { coat: "#2a1f1e", abdomen: "#33201f", belly: "#1a1312", leg: "#221a19", joint: "#ff8a30", foot: GOLD, fang: LIT, fangGlow: true }, abdomen: { len: 1.15, fat: 1.12, tilt: 0.1 }, legs: { len: 1.12, thick: 1.3, rise: 0.8, stand: 1.5 }, fold: { thigh: 0.45, shin: -2.2, foot: -2.6 },
      fur: { n: 5, long: 0.06, tip: "#b8603a" }, fangs: 1.6, eyes: { colour: LIT, glow: true, size: 1.1 }, armour, gait: { lively: 0.75 } });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It sleeps on its belly with its legs drawn in, knees up, at every level: it can't curl. */
export const MESH = { id: "spider", heights: [33, 50, 78, 426], plans: spiders };

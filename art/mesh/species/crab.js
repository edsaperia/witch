// The crab, four levels, as plans for art/mesh/shape.js (the rollout's batch G, the many-legged:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/crab/genome.js; Ed, 2026-10-12): "a mudflat fiddler that scuttles sideways, its shell orange-red, one great
// claw on an adult, barnacles; a juvenile's claws tiny and its legs tucked in, both growing with age; its legend the elder of
// its kind: one colossal gleaming claw bigger than its body, waved in a slow beckoning display, its eyes lit, its shell aged like
// a reef". It goes sideways: it is built facing across the way it goes (its face along -x, so it looks out of the picture at
// us as it passes), its shell's width along +z, and its eight jointed legs stand out fore and aft of its going (kit/manylegs.js,
// across "z"), the leading four reaching and pulling as the trailing four push. A pincer on an arm at each front corner
// (kit/pincers.js), one of them the great claw; eyes on stalks.
import { legPairs, scuttles } from "../kit/manylegs.js";
import { pincer } from "../kit/pincers.js";
import { plate } from "../kit/plate.js";

function crab(name, o) {
  const { k = 1, C, shell = 1, claw = 1, small = 1, stalk = 1, legs: lg = {}, eyes = {}, armour = [], gait = {}, raise = 0 } = o, y0 = 0.12 * k * (lg.stand ?? 1), W = 0.17 * k * shell, RX = 0.1 * k * shell, RY = 0.058 * k * shell;
  // its shell: one skin from its one side to its other, widest and furthest forward in its middle
  const ring = (t, g, h) => ({ at: [RX * 0.35 * (1 - g), y0, W * t], rx: RX * g, ry: RY * h, bone: "body", colour: cy => (cy < -0.45 ? C.belly : cy > 0.8 ? C.top ?? C.shell : C.shell) });
  const skin = [ring(-1, 0.2, 0.25), ring(-0.9, 0.62, 0.7), ring(-0.55, 0.92, 0.95), ring(0, 1, 1), ring(0.55, 0.92, 0.95), ring(0.9, 0.62, 0.7), ring(1, 0.2, 0.25)];
  const bones = [["body", [0, y0, 0], null], ["head", [-RX * 0.8, y0, 0], "body"]], lofts = [{ name: "skin", sides: 8, up: [0, 1, 0], rings: skin }], cones = [];
  // its eyes on stalks at the front of its shell
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) { const a = [-RX * 0.8, y0 + RY * 0.55, W * 0.3 * s], H = 0.07 * k * stalk, b = `eye${tag}`, top = [a[0] - 0.006 * k, a[1] + H, a[2]];
    bones.push([b, a, "head"]);
    lofts.push({ sides: 4, up: [0, 0, 1], rings: [[0, 1], [0.6, 0.8], [0.85, 1.5], [1.1, 1.5], [1.25, 0.6]].map(([f, r], i) => ({ at: [a[0] - 0.006 * k * f, a[1] + H * f, a[2]], rx: 0.011 * k * r, ry: 0.011 * k * r, bone: b, colour: i < 2 ? C.shell : eyes.colour ?? "#0c0a09", glow: i >= 2 && !!eyes.glow })) });
    cones.push({ at: [top[0] - 0.006 * k, top[1], top[2]], rx: 0.012 * k, ry: 0.014 * k, tip: [top[0] - 0.02 * k, top[1], top[2]], bone: b, colour: eyes.colour ?? "#0c0a09", glow: !!eyes.glow, tag: "eye", up: [0, 1, 0], sides: 4, bulge: 0.8 }); }
  // its claws: the great one (on its +z side, held across its front; a legend's raised) and the small one
  const arm = (s, tag, size, up) => pincer(tag, [-RX * 0.62, y0 - RY * 0.35, W * 0.62 * s], { out: [-0.75, -0.1 + up * 0.5, 0.6 * s], fwd: [-0.35, 0.12 + up * 1.4, -0.9 * s], gape: [0.1, 1, up * 0.6 * s], l1: 0.085 * k * (0.7 + 0.3 * Math.min(size, 2)), l2: 0.085 * k * size, size: 0.42, finger: 0.9, open: 0.45, thick: 0.22, parent: "body",
    colours: { arm: C.shell, hand: size > 1.2 ? C.claw ?? C.shell : C.shell, finger: size > 1.2 ? C.finger ?? C.claw ?? C.shell : C.shell, tip: C.nip }, glow: !!C.nipGlow && size > 1.2 });
  const claws = [arm(1, "L", claw, raise), arm(-1, "R", small, 0)];
  // eight legs, four standing out each way along its going, the foremost raked towards its face
  const L = 0.19 * k * (lg.len ?? 1), legs = legPairs([[0.07, 0.55], [0.03, 0.2], [-0.012, -0.12], [-0.05, -0.5]].map(([x, yaw]) => ({ at: [x * k * shell, y0 - RY * 0.45, W * 0.8], yaw })), { across: "z", len: L, rise: lg.rise ?? 0.36, thick: lg.thick ?? 1, low: 0.3, parent: "body", colours: { upper: C.leg, joint: C.joint ?? C.leg, lower: C.leg, tip: C.foot ?? C.leg } });
  const T = Math.PI * 2, parts = [...claws, ...legs];
  // asleep: settled on the mud, legs folded in, its claws drawn across its face and its eye stalks laid down sideways
  const also = ({ rots }) => { rots.head = [0, 0, 0]; rots.eyeL = [-1.25, 0, 0]; rots.eyeR = [1.25, 0, 0]; rots.armL = [0, -0.5, raise ? 0.9 : 0]; rots.armR = [0, 0.5, 0]; rots.nipL = [0, 0, 0]; };
  return { name, bones: [...bones, ...parts.flatMap(p => p.bones)], lofts: [...lofts, ...parts.flatMap(p => p.lofts)], cones: [...cones, ...parts.flatMap(p => p.cones), ...(o.cones?.({ skin, k, y0, RX, RY, W }) ?? [])], armour,
    // (its great claw waves as it goes: a legend's a slow beckoning, Ed's brief)
    gait: { root: "body", hips: "body", head: "head", ...scuttles(legs, { fold: { also }, ...gait }), extra: [{ bone: "armL", rot: u => [0, 0, (raise ? 0.28 : 0.08) * Math.sin(T * u)] }, { bone: "nipL", rot: u => [0.2 * Math.max(0, Math.sin(T * u + 1)), 0, 0] }, { bone: "eyeL", rot: u => [0.08 * Math.sin(T * u), 0, 0] }, { bone: "eyeR", rot: u => [0.08 * Math.sin(T * u + 1.5), 0, 0] }] }, anchors: { neck: 3, skull: 2 } };
}
const SHELL = "#c8553a";
/** Barnacles on its shell: low bosses, pale, each with a dark mouth. */
const barnacles = (spots, lit) => ({ k, y0, RX, RY, W }) => spots.flatMap(([x, z, r]) => plate("body", [RX * x, y0 + RY * 0.86 * Math.sqrt(Math.max(0.1, 1 - x * x * 0.8 - z * z * 0.6)), W * z], [x * 0.5, 1, z * 0.3], { r: 0.018 * k * r, high: 0.02 * k * r, colour: "#e6dcc8", rim: "#b8ae9a", sides: 5, gem: lit ? { colour: lit } : undefined }).cones);
const crabs = {
  // a little one: a round pale-orange shell on tucked-in legs, tiny claws, big eyes on short stalks
  baby: () => crab("crab-baby", { k: 0.8, shell: 0.85, claw: 0.42, small: 0.4, stalk: 1.1, C: { shell: "#e08a5a", top: "#e89a6a", belly: "#f2d8b8", leg: "#d87a4e" }, legs: { len: 0.6, thick: 1.7, stand: 0.72, rise: 0.3 }, gait: { lively: 1.3 } }),
  // its legs out and its claws grown, one a little the bigger
  young: () => crab("crab-young", { k: 0.9, claw: 1, small: 0.7, stalk: 1.1, C: { shell: "#d2643e", top: "#da7448", belly: "#eed0a8", leg: "#c25a3a", claw: "#e07a4a" }, legs: { len: 0.82, thick: 1.3, stand: 0.85 }, gait: { lively: 1.1 } }),
  // orange-red, one great claw held across its front, barnacles on its shell
  adult: () => crab("crab-adult", { claw: 1.8, small: 0.75, C: { shell: SHELL, top: "#b84a34", belly: "#e8c8a0", leg: "#b04a34", joint: "#8a3426", claw: "#e8704a", finger: "#f2e2c8" }, legs: { thick: 1.3 }, cones: barnacles([[0.1, -0.5, 1], [0.35, 0.3, 0.8], [-0.2, 0.55, 0.7]]) }),
  // the elder: one colossal gleaming claw bigger than its body, raised and beckoning, its points lit; its eyes lit; its shell
  // aged like a reef, barnacled and grown with coral, and plated in sea-green bronze with a lit mark on every plate
  legend() {
    const VERDI = "#2f6a62", EDGE = "#c9a24a", LIT = "#9affe0";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ on: "skin", from: 1.1, to: 4.9, round: [0, 1.25], lames: 4, inset: 0.06, gap: 0.06, thick: 0.02, step: 0.006, colour: VERDI, rim: EDGE, runes: { colour: LIT, max: 1, size: 0.6 } }];
    // (coral: branching fingers standing on its shell's back edge)
    const coral = ({ k, y0, RX, RY, W }) => [[0.55, -0.6, 1], [0.6, -0.2, 1.3], [0.62, 0.3, 1.1], [0.5, 0.65, 0.8]].flatMap(([x, z, f], i) => { const at = [RX * x, y0 + RY * 0.6, W * z], H = 0.1 * k * f;
      return [[0, 1], [0.03 * (i % 2 ? 1 : -1), 0.7], [-0.02, 0.5]].map(([dz, h], j) => ({ at: [at[0] + j * 0.008 * k, at[1], at[2] + dz * k * j], rx: 0.014 * k, ry: 0.014 * k, tip: [at[0] + 0.02 * k * (j + 1), at[1] + H * h, at[2] + dz * k * 2.4], bone: "body", colour: "#c8506a", tipColour: "#ffb0c0", bulge: 0.8, up: [1, 0, 0], sides: 4 })); });
    const b = barnacles([[0.1, -0.7, 1.2], [0.4, 0.1, 1], [-0.25, 0.7, 0.9], [0.3, 0.75, 0.7]], LIT);
    return crab("crab-legend", { k: 1.4, shell: 1.05, claw: 3.2, small: 0.8, stalk: 1.5, raise: 1, C: { shell: "#9a3e30", top: "#7a3a36", belly: "#c8a888", leg: "#7a3028", joint: EDGE, foot: EDGE, claw: "#f08a4a", finger: "#fff0d0", nip: LIT, nipGlow: true }, legs: { thick: 1.4, len: 1.1 },
      eyes: { colour: LIT, glow: true }, armour, cones: g => [...coral(g), ...b(g)], gait: { lively: 0.75 } });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It goes sideways. It sleeps settled on its belly at every level, legs folded in, claws across its face. */
export const MESH = { id: "crab", heights: [34, 50, 79, 228], plans: crabs };

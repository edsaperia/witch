// The fire beetle, four levels, as plans for art/mesh/shape.js (the rollout's batch G, the many-legged:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/beetle/genome.js): "a black shell cracked with embers down its wing cases, its great jaws still a stag
// beetle's; its legend's antlers tipped with fire". Six jointed legs going as two tripods (kit/manylegs.js), a head with a
// stag beetle's jaws on bones of their own, feelers. Its ladder: a round red-brown beetle-let with stubs of jaws; a slim
// young one, its wing cases spotted orange; an adult with great tined jaws, its cracks lit; and the old one of the fire
// fields, its jaws grown to antlers that rise over it, every tine burning, its back plated in bronze cut with ember marks.
import { legPairs, scuttles } from "../kit/manylegs.js";

const BLACK = "#2a2022", EMBER = "#ff6a1c";
function beetle(name, o) {
  const { k = 1, long = 1, wide = 1, high = 1, head: hd = 1, C, legs: lg = {}, jaw = {}, cracks, feelers = 1, armour = [], gait = {}, eyes = {} } = o, y0 = 0.108 * k * (lg.stand ?? 1), Z = z => z * k * (z < 0 ? long : 1);
  const ring = (z, dy, rx, ry, bone, colour) => ({ at: [0, y0 + dy * k * high, Z(z)], rx: rx * k * wide, ry: ry * k * high, bone, colour: typeof colour === "string" && bone === "body" ? cy => (cy < -0.55 ? C.belly ?? colour : colour) : colour });
  const skin = [ring(-0.215, -0.02, 0.02, 0.02, "body", C.shell), ring(-0.175, 0, 0.075, 0.06, "body", C.shell), ring(-0.1, 0.012, 0.11, 0.086, "body", C.shell), ring(-0.02, 0.012, 0.112, 0.086, "body", C.shell), ring(0.026, 0, 0.096, 0.07, "body", C.shell),
    ring(0.034, 0, 0.102, 0.075, "body", C.thorax), ring(0.09, 0, 0.098, 0.068, "body", C.thorax), ring(0.125, -0.006, 0.066, 0.048, "body", C.thorax),
    ring(0.132, -0.012, 0.06 * hd, 0.045 * hd, "head", C.head), ring(0.172, -0.016, 0.055 * hd, 0.04 * hd, "head", C.head), ring(0.2, -0.02, 0.03 * hd, 0.024 * hd, "head", C.head)];
  const H = [0, y0 - 0.014 * k * high, 0.2 * k], bones = [["body", [0, y0, 0], null], ["head", [0, y0 - 0.01 * k, 0.128 * k], "body"]], lofts = [{ name: "skin", sides: 8, up: [0, 1, 0], rings: skin }], cones = [];
  // (a point on its wing cases: z along it, a round from its spine)
  const on = (z, a, lift = 1.02) => { let i = 1; while (i < 4 && skin[i + 1].at[2] < Z(z)) i++; const p = skin[i], q = skin[i + 1], f = Math.min(1, Math.max(0, (Z(z) - p.at[2]) / (q.at[2] - p.at[2]))), m = (u, v) => u + (v - u) * f; return [Math.sin(a) * m(p.rx, q.rx) * lift, m(p.at[1], q.at[1]) + Math.cos(a) * m(p.ry, q.ry) * lift, Z(z)]; };
  // the cracks down its wing cases: jagged lines, lit if they are embers
  if (cracks) for (const s of [1, -1]) for (let n = 0; n < (cracks.n ?? 2); n++) { const a0 = 0.5 + n * 0.62, w = (cracks.w ?? 0.007) * k;
    lofts.push({ sides: 3, up: [s, 0.4, 0], rings: [-0.165, -0.13, -0.095, -0.06, -0.03, 0.005].slice(n ? 1 : 0).map((z, i) => ({ at: on(z, s * (a0 + 0.14 * (i % 2 ? 1 : -1) * (n ? -1 : 1))), rx: w * (i % 2 ? 1.3 : 0.8), ry: w, bone: "body", colour: cracks.colour, glow: !!cracks.glow, up: [s * Math.sin(a0), Math.cos(a0), 0] })) }); }
  // its eyes, its feelers and its jaws
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    cones.push({ at: [0.046 * hd * k * s, H[1] + 0.012 * k, 0.158 * k], rx: 0.016 * k * (eyes.size ?? 1), ry: 0.016 * k * (eyes.size ?? 1), tip: [0.064 * hd * k * s, H[1] + 0.016 * k, 0.162 * k], bone: "head", colour: eyes.colour ?? "#0c0a09", glow: !!eyes.glow, tag: "eye", up: [0, 1, 0], sides: 5, bulge: 0.8 });
    bones.push([`ant${tag}`, [0.03 * k * s, H[1] + 0.03 * k, 0.18 * k], "head"]);
    cones.push({ at: [0.03 * k * s, H[1] + 0.026 * k, 0.18 * k], rx: 0.007 * k, ry: 0.007 * k, tip: [(0.03 + 0.1 * feelers) * k * s, H[1] + (0.03 + 0.05 * feelers) * k, (0.18 + 0.1 * feelers) * k], bend: [0.02 * k * s * feelers, 0.03 * k * feelers, 0], bulge: 0.9, bone: `ant${tag}`, colour: C.leg, up: [0, 0, 1], sides: 3 });
    // (a jaw: a curve out and round to its point, its tines on the inside; a legend's rises, its tines standing up and burning)
    const { len = 0.08, bow = 1, lift = 0, tines = [], thick = 1, tine = 1, fire } = jaw, at = t => [s * (0.026 + 0.05 * bow * Math.sin(Math.PI * Math.pow(t, 0.8))) * k, H[1] + lift * k * t * (0.4 + 0.6 * t), (0.19 + len * t) * k], b = `jaw${tag}`;
    bones.push([b, at(0), "head"]);
    lofts.push({ sides: 5, up: [0, 1, 0], rings: [0, 0.2, 0.45, 0.7, 0.9, 1].map(t => ({ at: at(t), rx: 0.02 * thick * k * (1 - 0.88 * t), ry: 0.017 * thick * k * (1 - 0.88 * t), bone: b, colour: fire && t > 0.85 ? fire : C.jaw, glow: !!fire && t > 0.85 })) });
    for (const t of tines) { const p = at(t), L = 0.035 * tine * k * (1.2 - t * 0.5); cones.push({ at: p, rx: 0.011 * thick * k, ry: 0.011 * thick * k, tip: fire ? [p[0] + s * 0.012 * k, p[1] + L * 2.2, p[2] - 0.01 * k] : [p[0] - s * L, p[1] + L * 0.25, p[2] + L * 0.3], bone: b, colour: C.jaw, tipColour: fire ?? C.jaw, glow: fire ? "tip" : false, up: [0, 0, 1], sides: 4 }); }
  }
  // six legs, the hind pair raked back and the fore pair forward
  const L = 0.2 * k * (lg.len ?? 1), legs = legPairs([[-0.06, -0.6], [0.03, -0.05], [0.096, 0.52]].map(([z, yaw]) => ({ at: [0.074 * k * wide, 0.062 * k * (lg.stand ?? 1), z * k], yaw })), { len: L, rise: lg.rise ?? 0.3, thick: lg.thick ?? 1, parent: "body", colours: { upper: C.leg, joint: C.joint ?? C.leg, lower: C.leg, tip: C.foot ?? C.leg } });
  const T = Math.PI * 2, wave = (bone, ph) => ({ bone, rot: u => [0.12 * Math.sin(T * 2 * u + ph), 0.08 * Math.sin(T * u + ph), 0] });
  return { name, bones: [...bones, ...legs.flatMap(l => l.bones)], lofts: [...lofts, ...legs.flatMap(l => l.lofts), ...(o.lofts ?? [])], cones: [...cones, ...(o.cones ?? [])], armour,
    gait: { root: "body", hips: "body", head: "head", ...scuttles(legs, gait), extra: [wave("antL", 0), wave("antR", 1.3), { bone: "jawL", rot: u => [0, 0.05 * Math.sin(T * u), 0] }, { bone: "jawR", rot: u => [0, -0.05 * Math.sin(T * u), 0] }] }, anchors: { neck: 7, skull: 8 } };
}
const beetles = {
  // a beetle-let: round and red-brown, a big head, stubs of jaws, short legs
  baby: () => beetle("beetle-baby", { k: 0.8, long: 0.72, high: 1.08, head: 1.3, C: { shell: "#5a3026", thorax: "#4a2a24", head: "#3a2422", belly: "#3a2422", leg: "#2a1e1e", jaw: "#6a3a2a" }, legs: { len: 0.8, thick: 1.5 }, jaw: { len: 0.035, bow: 0.4, thick: 1.1 }, feelers: 0.6, eyes: { size: 1.3 }, gait: { lively: 1.3 } }),
  // slim and quick, its wing cases spotted with orange where the cracks will open
  young: () => beetle("beetle-young", { k: 0.92, wide: 0.9, C: { shell: "#3a2624", thorax: "#33222a", head: "#2a1e20", belly: "#2a1e20", leg: "#231a1a", jaw: "#4a2a22" }, legs: { thick: 1.2 }, jaw: { len: 0.07, bow: 0.8 }, cracks: { n: 1, colour: "#d8601e", w: 0.008 }, gait: { lively: 1.1 } }),
  // black, its wing cases cracked with embers; a stag beetle's great tined jaws
  adult: () => beetle("beetle-adult", { C: { shell: BLACK, thorax: "#33262a", head: "#241c1e", belly: "#1e1718", leg: "#1e1718", joint: "#5a2a1a", jaw: "#5a2c20" }, legs: { thick: 1.25 }, jaw: { len: 0.17, bow: 1.25, thick: 1.4, tines: [0.45, 0.72], tine: 1.2 }, cracks: { n: 2, colour: EMBER, glow: true }, feelers: 1.2 }),
  // the old one of the fire fields: its jaws grown to antlers that rise over it, every tine burning; its eyes lit; its back
  // plated in bronze, an ember mark cut in every plate
  legend() {
    const BRONZE = "#8a4a1e", RIM = "#d8902e", FIRE = "#ffb030";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ on: "skin", from: 1.15, to: 3.95, round: [0.3, 2.0], lames: 3, gap: 0.05, thick: 0.02, step: 0.01, colour: BRONZE, rim: RIM, runes: { colour: FIRE, max: 1 } },
      { on: "skin", from: 5.05, to: 6.95, round: [0, 1.9], thick: 0.02, step: 0.008, colour: BRONZE, rim: RIM, runes: { colour: FIRE, max: 1, size: 0.7 } }];
    return beetle("beetle-legend", { k: 1.5, long: 1.15, C: { shell: "#1c1416", thorax: "#241a1c", head: "#1c1416", belly: "#140f10", leg: "#181112", joint: EMBER, jaw: "#3a1c14", foot: "#6a2a14" }, legs: { len: 1.15, thick: 1.4, rise: 0.36 },
      jaw: { len: 0.2, bow: 1.5, lift: 0.5, thick: 1.7, tines: [0.3, 0.52, 0.74], tine: 1.5, fire: FIRE }, cracks: { n: 2, colour: EMBER, glow: true, w: 0.008 }, feelers: 1.5, eyes: { colour: FIRE, glow: true }, armour, gait: { lively: 0.75 } });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It sleeps on its belly with its legs folded in at every level (kit/manylegs.js `folds`): it can't curl. */
export const MESH = { id: "beetle", heights: [29, 47, 72, 346], plans: beetles };

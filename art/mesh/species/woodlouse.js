// The woodlouse, four levels, as plans for art/mesh/shape.js (the rollout's batch G, the many-legged:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's ladder
// (art/creatures/woodlouse/genome.js): "a pale round baby of five plates, a slate-grey young of seven with pale edges, an adult of
// ten raised-rimmed plates flecked at their edges with jointed feelers and two tail spikes, and the wispy forest's legend:
// armoured like a fortress, shields with spiked edges ... dry leaves caught in its plates, whip feelers". A low arch of
// overlapping plates, each on a bone of its own down its back, so it rolls into a ball to sleep; fourteen short jointed legs
// going in a ripple from the hindmost forward (kit/manylegs.js; ten on the baby, which has five plates to hang them from).
import { folds, legPairs, ripple, scuttles } from "../kit/manylegs.js";

function woodlouse(name, o) {
  const { k = 1, n = 7, long = 0.4, wide = 1, high = 1, C, rim, flecks, feelers = 1, jointed, spikes, legs: lg = {}, crest, edge, armour, gait = {} } = o, L = long * k, seg = L / n, mid = Math.floor(n / 2);
  const girth = t => 0.42 + 0.58 * Math.pow(Math.sin(Math.PI * (0.08 + 0.84 * t)), 0.7), RX = 0.115 * k * wide, RY = 0.075 * k * high, yc = 0.03 * k + RY, top = yc + RY * 0.92;
  // a bone a plate, at the top of its back where the plate joins the next one in towards its middle: the middle plate is its root
  const name_ = i => (i === mid ? "body" : `seg${i}`), z0 = i => -L / 2 + seg * i, bones = [["body", [0, top, z0(mid) + seg / 2], null]];
  for (let i = mid + 1; i < n; i++) bones.push([name_(i), [0, top, z0(i)], name_(i - 1)]);
  for (let i = mid - 1; i >= 0; i--) bones.push([name_(i), [0, top, z0(i + 1)], name_(i + 1)]);
  bones.push(["head", [0, top - RY * 0.5, L / 2], name_(n - 1)]);
  // its skin: each plate two rings, its hind edge standing out over the plate behind it (a pale rim there, flecked on the grown)
  const plate = (i, f, r) => { const t = (i + f) / n, g = girth(t); return { at: [0, yc, z0(i) + seg * f], rx: RX * g * r, ry: RY * (0.55 + 0.45 * g) * r, bone: name_(i), colour: (cy, sx, frac) => (f < 0.5 && rim && (cy < 0.25 || rim.all) ? (flecks && Math.round(frac * 16) % 3 === 0 ? flecks : rim.colour) : cy < -0.5 ? C.belly : i % 2 ? C.coat : C.coat2 ?? C.coat) }; };
  const skin = [{ at: [0, yc - RY * 0.2, -L / 2 - seg * 0.25], rx: RX * 0.16, ry: RY * 0.2, bone: name_(0), colour: C.coat }];
  for (let i = 0; i < n; i++) skin.push(plate(i, 0.04, 1.06), plate(i, 0.98, 0.95));
  const neck = skin.length - 1; skin.push({ at: [0, yc - RY * 0.25, L / 2 + seg * 0.2], rx: RX * 0.4, ry: RY * 0.42, bone: "head", colour: C.head ?? C.coat }, { at: [0, yc - RY * 0.4, L / 2 + seg * 0.55], rx: RX * 0.16, ry: RY * 0.2, bone: "head", colour: C.head ?? C.coat });
  const lofts = [{ name: "skin", sides: 8, up: [0, 1, 0], rings: skin }], cones = [], hy = yc - RY * 0.2, hz = L / 2 + seg * 0.3;
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    cones.push({ at: [RX * 0.3 * s, hy + RY * 0.2, hz - seg * 0.1], rx: 0.012 * k, ry: 0.012 * k, tip: [RX * 0.42 * s, hy + RY * 0.3, hz], bone: "head", colour: o.eye ?? "#0c0a09", glow: !!o.eyeGlow, tag: "eye", up: [0, 1, 0], sides: 4, bulge: 0.8 });
    // feelers: out and forward, an elbow in them on the grown; a legend's long whips
    const a = [RX * 0.22 * s, hy, hz + seg * 0.15], F = 0.11 * k * feelers, e = [a[0] + s * F * 0.55, a[1] + F * 0.35, a[2] + F * 0.5], tip = [e[0] + s * F * 0.5, e[1] - F * (jointed ? 0.2 : -0.1), e[2] + F * 0.75];
    bones.push([`ant${tag}`, a, "head"]);
    lofts.push({ sides: 3, up: [0, 1, 0], rings: [[a, 1], [e, jointed ? 1.1 : 0.8], [tip, 0.35], ...(o.whip ? [[[tip[0] + s * F * 0.5, tip[1] + F * 0.3, tip[2] + F * 0.1], 0.15]] : [])].map(([at, f]) => ({ at, rx: 0.008 * k * f, ry: 0.008 * k * f, bone: `ant${tag}`, colour: C.leg })) });
    if (spikes) cones.push({ at: [RX * 0.14 * s, yc - RY * 0.2, -L / 2 - seg * 0.1], rx: 0.012 * k, ry: 0.01 * k, tip: [RX * 0.3 * s, yc - RY * 0.1, -L / 2 - seg * (0.3 + 0.9 * spikes)], bone: name_(0), colour: C.leg, up: [0, 1, 0], sides: 3 });
    // (a legend's shields: a spike standing off the lower edge of every plate)
    if (edge) for (let i = 0; i < n; i++) { const p = skin[1 + 2 * i], an = 1.75; cones.push({ at: [Math.sin(an) * p.rx * 0.95 * s, yc + Math.cos(an) * p.ry * 0.95, p.at[2] + seg * 0.3], rx: 0.016 * k, ry: 0.012 * k, tip: [Math.sin(an) * (p.rx + 0.05 * k * (edge.long ?? 1)) * s, yc + Math.cos(an) * p.ry - 0.012 * k, p.at[2] - seg * 0.1], bone: p.bone, colour: edge.colour ?? C.coat, tipColour: edge.tip, up: [0, 0, 1], sides: 3 }); }
  }
  // (a legend's crest: a blade standing on the middle of each plate, tallest over its middle)
  if (crest) for (let i = 1; i < n - 1; i++) { const p = skin[1 + 2 * i], tall = crest.tall * k * (0.55 + 0.45 * Math.sin(Math.PI * i / (n - 1))); cones.push({ at: [0, yc + p.ry * 0.9, p.at[2] + seg * 0.45], rx: 0.012 * k, ry: seg * 0.42, tip: [0, yc + p.ry + tall, p.at[2] - seg * 0.1], bone: p.bone, colour: crest.colour, tipColour: crest.tip, glow: crest.glow ? "tip" : false, split: 0.45, bulge: 0.7, up: [0, 0, 1], sides: 4 }); }
  // its legs: a pair under each of its middle plates
  const pairs = Math.min(7, n), first = Math.floor((n - pairs) / 2), len = 0.13 * k * (lg.len ?? 1);
  const legs = legPairs(Array.from({ length: pairs }, (_, j) => { const i = first + j, t = (i + 0.5) / n; return { at: [RX * girth(t) * 0.5, 0.05 * k * (lg.stand ?? 1), z0(i) + seg / 2], yaw: (t - 0.5) * 0.4, parent: name_(i) }; }), { len, rise: 0.3, low: 0.32, thick: lg.thick ?? 1.3, colours: { upper: C.leg, lower: C.leg, tip: C.foot ?? C.leg } });
  // asleep it rolls into a ball (the brief: "Woodlouse may roll into a ball to sleep"): every plate turned down a step from the
  // one before it, from its middle to its head and to its tail, till the two meet under it; its feelers laid back
  const roll = ({ rots }) => { const step = Math.PI * 0.97 / Math.max(1, (n - 1) / 2); for (let i = 0; i < n; i++) if (i !== mid) rots[name_(i)] = [i > mid ? step : -step, 0, 0]; rots.head = [0.5, 0, 0]; rots.antL = [1.2, 0, 0]; rots.antR = [1.2, 0, 0]; };
  const T = Math.PI * 2, wave = (bone, ph) => ({ bone, rot: u => [0.1 * Math.sin(T * 2 * u + ph), 0.12 * Math.sin(T * u + ph), 0] });
  return { name, bones: [...bones, ...legs.flatMap(l => l.bones)], lofts: [...lofts, ...legs.flatMap(l => l.lofts)], cones: [...cones, ...(o.cones?.({ skin, seg, yc, k }) ?? [])], armour: armour?.(n) ?? [],
    gait: { root: "body", hips: "body", head: "head", ...scuttles(legs, { timing: ripple(0.04), type: "walk", fold: { also: roll }, walk: { duty: 0.8, seconds: 1.0 }, run: { duty: 0.45, seconds: 0.4 }, ...gait }), extra: [wave("antL", 0), wave("antR", 1.1)] }, anchors: { neck, skull: neck + 1 } };
}
const SLATE = "#666c76";
const lice = {
  // pale and round: five soft plates, short feelers
  baby: () => woodlouse("woodlouse-baby", { k: 0.8, n: 5, long: 0.3, high: 1.15, C: { coat: "#c9c6c0", coat2: "#bdbab6", belly: "#e6e2d8", leg: "#a8a49c", head: "#b4b0aa" }, feelers: 0.6, legs: { thick: 1.6 }, gait: { lively: 1.3 } }),
  // slate grey, seven plates with pale edges
  young: () => woodlouse("woodlouse-young", { k: 0.9, n: 7, long: 0.38, C: { coat: SLATE, coat2: "#5e646e", belly: "#b9b6ac", leg: "#4a4e56", head: "#565b64" }, rim: { colour: "#b8bcc4" }, feelers: 1, gait: { lively: 1.1 } }),
  // ten raised-rimmed plates flecked at their edges, jointed feelers, two tail spikes
  adult: () => woodlouse("woodlouse-adult", { n: 10, long: 0.46, high: 1.1, C: { coat: "#5a606a", coat2: "#4e545e", belly: "#a8a59c", leg: "#3c4048", head: "#484d56" }, rim: { colour: "#aeb3bc" }, flecks: "#e4dcc0", feelers: 1.35, jointed: true, spikes: 1, legs: { thick: 1.4 } }),
  // the wispy forest's old one, armoured like a fortress: a shield of dark iron raised over every plate, a moon-pale mark lit
  // on each, a spike at every shield's edge and a crest of blades down its back; dry leaves caught between its plates; whip feelers
  legend() {
    const IRON = "#2e3440", EDGE = "#8fa0b8", MOON = "#cfe8ff";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): plate i lies on the skin's rings 1 + 2i and 2 + 2i
    const armour = n => Array.from({ length: n }, (_, i) => ({ on: "skin", from: 1 + 2 * i + 0.08, to: 2 + 2 * i - 0.05, round: [0, 1.6], thick: 0.016 + (i % 2) * 0.006, step: 0.012, colour: IRON, rim: EDGE, runes: i % 2 ? undefined : { colour: MOON, max: 1, size: 0.6, round: [0.3, 1.3] } }));
    const leaves = ({ skin, seg, yc, k }) => [[3, 0.9, 1], [8, 0.5, -1], [12, 1.2, 1], [15, 0.7, -1]].map(([r, a, s], i) => { const p = skin[r]; return { at: [Math.sin(a) * p.rx * s, yc + Math.cos(a) * p.ry, p.at[2]], rx: 0.022 * k, ry: 0.006 * k, tip: [Math.sin(a) * (p.rx + 0.07 * k) * s, yc + Math.cos(a) * p.ry + 0.03 * k, p.at[2] - seg * 0.8], bone: p.bone, colour: ["#9a5a2a", "#b8842e", "#7a4a26"][i % 3], bulge: 0.9, split: 0.4, up: [0, 1, 0], sides: 4 }; });
    return woodlouse("woodlouse-legend", { k: 1.5, n: 10, long: 0.5, high: 1.35, C: { coat: "#444a56", coat2: "#3a404a", belly: "#8a8880", leg: "#2a2e36", head: "#343840", foot: "#8fa0b8" }, rim: { colour: EDGE }, feelers: 2.1, jointed: true, whip: true, spikes: 1.6, legs: { thick: 1.5, len: 1.1 },
      crest: { tall: 0.085, colour: IRON, tip: MOON, glow: true }, edge: { colour: IRON, tip: EDGE }, eye: MOON, eyeGlow: true, armour, cones: leaves, gait: { lively: 0.75 } });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It rolls into a ball to sleep at every level. */
export const MESH = { id: "woodlouse", heights: [28, 45, 73, 219], plans: lice };

// The turtle, four levels, as plans for tools/creature-mesh/quadruped.js: a candidate to stand in for the marten or the stoat
// (Ed, 2026-11-11: "Martens and Stoats are pretty similar, maybe we should have a different animal. Bees? Turtles?"). A pond
// turtle's build: a flat body slung between four splayed legs, a long neck with a blunt beaked head, its shell over all. Its
// ladder is a proposal: a hatchling still wearing half its egg; a quick smooth-shelled young; an adult under a high keeled
// dome with moss at its rim; and the oracle, the old one whose shell is read: its plates' joins lit like the cracks a fire
// reads a shell by, a bronze rim hung with lamps, a beard and long brows, and the long green tail of weed that only the very
// oldest turtles grow.
import { ball, dome, plan, plate, quad, tail, tufts, walk } from "./kit.js";

const OLIVE = "#7d8f6a", T = { coat: OLIVE, belly: "#e6d79a", nose: "#3a4226", upper: "#6a7c58", mid: "#5b6c4a", sock: "#4c5c3e", eye: "#17140f" };
const build = (C, o) => quad({ C, hind: { len: 0.27, thick: 2.0, paw: 1.5, spread: 2.1, ...o.hind }, fore: { len: 0.27, thick: 1.9, paw: 1.6, spread: 2.2, ...o.fore }, body: { len: 0.8, girth: 1.2, deep: 0.72, tuck: 1.05, neck: [0.07, 0.2], neckThick: 0.62, white: 0.6, ...o.body },
  head: { size: 0.84, muzzle: 0.42, muzzleWide: 1.45, muzzleDeep: 1.3, wide: 0.95, dome: 0.95, cheek: 0, eye: 1.35, eyeAt: [0, 0.006, -0.01], nose: 0.01, ...o.head, ear: { shape: "round", tall: 0.05, wide: 0.4, back: C.coat, inner: C.coat } } });
const paddle = (o = {}) => ({ seconds: 0.9, duty: 0.7, bob: 0.004, sway: 0.07, tailSwing: 0.12, legs: walk(0.9), ...o });
/** Its shell over the torso: wide, long and high as given; plates patterned light and dark. */
const carapace = (q, o) => { const R = q.R, c = [0, R[1].at[1] + 0.005, (R[1].at[2] + R[4].at[2]) / 2 - 0.01], L = (R[4].at[2] - R[1].at[2]);
  return dome("loin", c, { rx: R[3].rx * (o.wide ?? 1.5), rz: L * (o.long ?? 0.72), high: o.high, sides: 10, rows: o.rows ?? 5, colour: o.colour, rim: o.rim, seams: o.seams }); };
const plates = (a, b) => (row, cz, sx) => ((row + Math.round((Math.atan2(sx, cz) / Math.PI + 1) * 3)) % 2 ? a : b);
const turtle = {
  // a hatchling, big-headed and soft, still wearing half its egg
  baby() {
    const C = { ...T, coat: "#a3b08a", upper: "#a3b08a", mid: "#93a07a", sock: "#93a07a" }, q = build(C, { hind: { len: 0.2, thick: 2.1, paw: 1.7, spread: 2.1 }, fore: { len: 0.2, thick: 2.1, paw: 1.8, spread: 2.2 }, body: { len: 0.56, girth: 1.1, neck: [0.05, 0.13], neckThick: 0.8 }, head: { size: 1.25, eye: 1.7 } });
    const sh = carapace(q, { high: 0.1, colour: plates("#c9a560", "#b89250") }), t = tail("tail", "pelvis", q.root, { len: 0.07, r: 0.022, pitch: -0.2, tip: 0, colours: { coat: C.coat, tip: C.coat } });
    // the egg: a white cap on its shell, its edge broken
    const top = sh.on(0.55, 0), egg = dome("loin", [top.at[0], top.at[1] - 0.012, top.at[2] - 0.06], { rx: 0.12, rz: 0.12, high: 0.11, sides: 8, rows: 4, colour: () => "#fbf8ee" });
    const chips = Array.from({ length: 7 }, (_, i) => { const p = egg.on(0.04, i / 7 * Math.PI * 2 + 0.3); return { at: p.at, rx: 0.03, ry: 0.012, tip: [p.at[0] + p.out[0] * 0.012, p.at[1] - 0.04 - 0.016 * (i % 2), p.at[2] + p.out[2] * 0.012], bone: "loin", colour: "#fbf8ee", up: [0, 0, 1], sides: 3 }; });
    return plan("turtle-baby", q.body, q.skull, [...q.legs, sh, egg, t], paddle({ seconds: 0.55, tails: [t.chain] }), { cones: chips });
  },
  // a smooth low shell, quick on its feet
  young() {
    const q = build(T, { body: { len: 0.78, girth: 1.08 }, head: { size: 0.82 } });
    const sh = carapace(q, { high: 0.13, colour: plates("#a8843f", "#8f6d32"), rim: { colour: "#e6d79a" } }), t = tail("tail", "pelvis", q.root, { len: 0.12, r: 0.026, pitch: -0.25, tip: 0, colours: { coat: T.coat, tip: T.coat } });
    return plan("turtle-young", q.body, q.skull, [...q.legs, sh, t], paddle({ seconds: 0.7, tails: [t.chain] }));
  },
  // a high dome with a keel of raised plates down it, moss hanging at its rim, a hooked beak, thick clawed legs
  adult() {
    const q = build(T, { hind: { len: 0.3, thick: 2.2, paw: 1.6, spread: 2.2, claws: { colour: "#e6dcb8", len: 1.2, thick: 1.4, wide: 1.5 } }, fore: { len: 0.3, thick: 2.2, paw: 1.7, spread: 2.3, claws: { colour: "#e6dcb8", len: 1.4, thick: 1.4, wide: 1.6 } }, body: { len: 0.86, girth: 1.3, neck: [0.09, 0.22], neckThick: 0.7 }, head: { size: 0.92, muzzle: 0.5, muzzleDeep: 1.45 } });
    const sh = carapace(q, { high: 0.27, wide: 1.6, colour: plates("#7a5a2a", "#9a7636"), rim: { colour: "#e6d79a" } }), t = tail("tail", "pelvis", q.root, { len: 0.16, r: 0.03, pitch: -0.25, tip: 0, colours: { coat: T.coat, tip: T.coat } });
    const keel = [0.92, 0.72, 0.5].flatMap((u, i) => [0, Math.PI].filter(a => i || !a).map(a => { const p = sh.on(u, a); return plate("loin", p.at, [p.out[0], p.out[1] + 0.6, p.out[2] - 0.2], { r: 0.06, ry: 0.04, high: 0.075, colour: "#c9a560", rim: "#7a5a2a", up: [0, 0, 1], sides: 5 }); }));
    const moss = Array.from({ length: 8 }, (_, i) => { const p = sh.on(0.0, i / 8 * Math.PI * 2 + 0.2); return { at: p.at, rx: 0.03, ry: 0.016, tip: [p.at[0] + p.out[0] * 0.02, p.at[1] - 0.07 - 0.02 * (i % 3), p.at[2] + p.out[2] * 0.02], bone: "loin", colour: "#4f7a3a", tipColour: "#7ba24c", bulge: 0.8, split: 0.5, up: [0, 0, 1], sides: 4 }; });
    return plan("turtle-adult", q.body, q.skull, [...q.legs, sh, ...keel, t], paddle({ tails: [t.chain] }), { cones: moss });
  },
  // the oracle: its shell a high dome of dark horn, every join between its plates lit; a bronze rim with a lit stone at each
  // plate and lamps hung from it; a bronze plate on its brow; a white beard and long brows, one eye lit and one gone; and the
  // tail of green weed, longer than itself
  legend() {
    const HORN = "#2f3a34", HORN2 = "#3d4a40", LINE = "#a8f0d0", BRONZE = "#b9722e", BRONZE2 = "#e0a04a", LAMP = "#ffd27a", WEED = "#3f7a4a", C = { ...T, coat: "#5b6a48", belly: "#c9ba80", muzzle: "#8a9470", upper: "#4c5a3a", mid: "#3f4c30", sock: "#333f28", eyes: [{ colour: LINE, glow: true }, { colour: "#dfe6e2" }] };
    const q = build(C, { hind: { len: 0.36, thick: 2.3, paw: 1.7, spread: 2.2, knob: 1.2, claws: { colour: "#d9d2b8", len: 1.8, thick: 1.6, wide: 1.6 } }, fore: { len: 0.36, thick: 2.3, paw: 1.8, spread: 2.3, knob: 1.2, claws: { colour: "#d9d2b8", len: 2.0, thick: 1.6, wide: 1.7 } }, body: { len: 0.95, girth: 1.4, neck: [0.14, 0.26], neckThick: 0.78 }, head: { size: 1.05, muzzle: 0.55, muzzleDeep: 1.5, eye: 1.4 } }), P = q.P;
    const sh = carapace(q, { high: 0.3, wide: 1.7, long: 0.78, rows: 6, colour: plates(HORN, HORN2), rim: { colour: BRONZE, r: 0.012 }, seams: { colour: LINE, glow: true, n: 7, w: 0.009 } });
    const t = tail("tail", "pelvis", q.root, { len: 1.15, r: 0.1, pitch: 0.25, curl: -0.5, wave: 0.45, waves: 1.6, bones: 7, plume: true, tip: 0.25, colours: { coat: WEED, under: "#2f5c3a", tip: "#8fc46a" }, spikes: { n: 7, colour: "#8fc46a", len: 0.8 } });
    // the rim: a boss with its stone at every other plate, a lamp hung between
    const bosses = Array.from({ length: 7 }, (_, i) => { const p = sh.on(0.03, i / 7 * Math.PI * 2 + 0.45); return plate("loin", p.at.map((v, j) => v + p.out[j] * 0.012), [p.out[0], 0.25, p.out[2]], { r: 0.04, high: 0.02, colour: BRONZE2, rim: BRONZE, gem: { colour: LINE }, up: [0, 1, 0], sides: 6 }); });
    const lamps = Array.from({ length: 4 }, (_, i) => { const p = sh.on(0.0, i / 4 * Math.PI * 2 + 1.1); return ball("loin", [p.at[0] + p.out[0] * 0.03, p.at[1] - 0.07, p.at[2] + p.out[2] * 0.03], { r: 0.034, colour: LAMP, glow: true, sides: 6, squash: 1.2 }); });
    const brow = plate("head", P(0, 0.085, 0.08), [0, 1, 0.45], { r: 0.06, ry: 0.05, high: 0.03, colour: BRONZE, rim: BRONZE2, gem: { colour: LINE }, up: [0, 0, 1], sides: 6 });
    const beard = [{ at: P(0, -0.035, 0.17), rx: 0.03, ry: 0.025, tip: P(0, -0.24, 0.12), bone: "head", colour: "#f1eee4", tipColour: "#c9c6ba", bulge: 0.8, split: 0.45, up: [0, 0, 1], sides: 5 },
      ...[1, -1].flatMap(s => [{ at: P(0.05 * s, 0.085, 0.11), rx: 0.016, ry: 0.012, tip: P(0.2 * s, 0.16, -0.06), bone: "head", colour: "#f1eee4", bulge: 0.7, split: 0.5, up: [0, 1, 0], sides: 4 }, { at: P(0.04 * s, -0.01, 0.2), rx: 0.008, ry: 0.008, tip: P(0.2 * s, -0.12, 0.14), bone: "head", colour: "#f1eee4", up: [0, 1, 0], sides: 3 }])];
    const barnacles = [[0.2, 0.9], [0.3, 2.4], [0.15, 4.0], [0.45, 5.2]].map(([u, a]) => { const p = sh.on(u, a); return { at: p.at, rx: 0.022, ry: 0.022, tip: p.at.map((v, j) => v + p.out[j] * 0.03), bone: "loin", colour: "#c9c6ba", split: 0.7, bulge: 0.8, up: [0, 1, 0], sides: 5 }; });
    return plan("turtle-legend", q.body, q.skull, [...q.legs, sh, ...bosses, ...lamps, brow, t], paddle({ seconds: 1.5, sway: 0.05, tailSwing: 0.06, tails: [t.chain], legs: walk(0.8) }), { cones: [...beard, ...barnacles] });
  },
};
export const TURTLE_PLANS = turtle;

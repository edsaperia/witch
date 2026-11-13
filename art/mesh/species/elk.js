// The elk, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals till
// Ed passes them). The northern elk (a moose: its genome has palm antlers, a humped back, a shaggy dark coat): very tall on long
// pale legs, high humped shoulders sloping to a low rump, a short neck, a long heavy head with an overhanging nose, a bell of
// skin under its throat, antlers like open hands. A gangly red calf; a yearling with its first forks; the bull with full palms;
// and the bog's old bull (its genome's legend: lit antlers, moss, pools), black as peat, moss hanging from it, its palms grown
// vast and cupped, each holding a lit pool, with bog-oak plate on its back (Ed, 2026-11-12: "Armour should just be thickened
// polygons on their torso with a different colour and glowing runes"). Metres; y up; its head along +z.
import { antlers } from "../kit/antlers.js";
import { trots } from "../kit/gaits.js";
import { hooves } from "../kit/hooves.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#2a211d", HOOF = "#1c1613", ELK = { coat: "#4d3828", belly: "#3d2c20", muzzle: "#7a6654", nose: NOSE, upper: "#5a4636", mid: "#8a7866", sock: "#a39584" };
// (it lies with its forelegs folded under it, knees forward: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const build = (C, o) => { const q = quad({ C, hind: { len: 2.0, thick: 0.66, ...o.hind }, fore: { len: 2.3, thick: 0.64, ...o.fore }, body: { len: 1.15, girth: 1.3, deep: 1.3, tuck: 0.85, hump: 0.9, neck: [0.1, 0.2], neckThick: 1.35, white: 0.2, ...o.body },
  head: { size: 1.3, muzzle: 1.9, muzzleWide: 1.3, muzzleDeep: 1.5, nose: 1.7, dome: 0.95, cheek: 0, eye: 0.9, ...o.head, ear: { shape: "long", tall: 0.8, wide: 1.2, splay: 0.8, lean: 0.5, back: C.coat, inner: "#8a7866", ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF, size: 1.1 }) }; };
const stub = (q, C) => tail("tail", "pelvis", q.root, { len: 0.1, r: 0.03, pitch: -1.0, tip: 0, blunt: 0.3, sides: 5, colours: { coat: C.coat, tip: C.coat } });
// (the bell: a flap of skin and hair hanging under its throat)
const bell = (R, C, long = 1) => ({ at: [0, R[6].at[1] - R[6].ry * 0.7, R[6].at[2]], rx: 0.035, ry: 0.05, tip: [0, R[6].at[1] - R[6].ry - 0.16 * long, R[6].at[2] + 0.02], bone: "neck", colour: C.coat, tipColour: C.belly, bulge: 0.8, split: 0.5, up: [0, 0, 1], sides: 5 });
const elk = {
  // a calf: red-brown, all legs, a short soft face
  baby() {
    const C = { coat: "#a36a3c", belly: "#8f5a32", muzzle: "#6e4a30", nose: NOSE, upper: "#a36a3c", mid: "#b98a5e", sock: "#c9a580" }, q = build(C, { hind: { len: 1.5, thick: 0.72 }, fore: { len: 1.62, thick: 0.7 }, body: { len: 0.72, girth: 1.0, deep: 1.0, hump: 0.2, neck: [0.14, 0.12], neckThick: 1.0 }, head: { size: 1.3, muzzle: 1.05, muzzleDeep: 1.25, nose: 1.4, eye: 1.5 }, ear: { tall: 1.1 } });
    const t = stub(q, C);
    return plan("elk-baby", q.body, q.skull, [...q.legs, t], trots({ lively: 1.3, lie: COUCHED, tails: [t.chain] }));
  },
  // a yearling: the hump and the long nose coming, two small forks
  young() {
    const C = { ...ELK, coat: "#6a4a30", upper: "#6a4a30" }, q = build(C, { hind: { len: 1.85, thick: 0.6 }, fore: { len: 2.05, thick: 0.58 }, body: { len: 1.0, girth: 1.08, deep: 1.1, hump: 0.5, neckThick: 1.1 }, head: { size: 1.15, muzzle: 1.6, muzzleDeep: 1.35 } });
    const t = stub(q, C);
    return plan("elk-young", q.body, q.skull, [...q.legs, t, antlers(q.P, { kind: "fork", size: 0.4, spread: 1.5, lean: 0.4 })], trots({ lively: 1.1, lie: COUCHED, tails: [t.chain] }), { cones: [bell(q.R, C, 0.5)] });
  },
  // the bull: the full hump and mane over its shoulders, the bell, palms like open hands
  adult() {
    const q = build(ELK, {}), R = q.R, t = stub(q, ELK);
    const mane = [4, 5].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.15, a1: 1.1, long: 0.14, sweep: 0.8, droop: 0.2, r: 0.07, lock: true, colour: () => "#3a2a1e", tip: () => "#5a4636" }));
    return plan("elk-adult", q.body, q.skull, [...q.legs, t, antlers(q.P, { kind: "palm", colour: "#c9b48e" })], trots({ lie: COUCHED, tails: [t.chain] }), { cones: [bell(R, ELK), ...mane] });
  },
  // the bog's old bull: black as peat and hung with moss, a long bell and beard; its palms vast and cupped, a lit pool held in
  // each and a light on every point; bog-oak plate on its back, edged pale as birch, a mark of marsh-light on each
  legend() {
    const MARSH = "#8ff5dc", OAK = "#2b2622", BIRCH = "#d9d4c4", MOSS = "#4c6f3a", C = { coat: "#2e2620", back: "#1f1a16", belly: "#241d18", muzzle: "#5e5348", nose: NOSE, upper: "#3a3028", mid: "#6a5e52", sock: "#8f8474", eyes: [{ colour: MARSH, glow: true }, { colour: MARSH, glow: true }] };
    const q = build(C, { hind: { len: 2.2, thick: 0.64, knob: 1.35 }, fore: { len: 2.6, thick: 0.62, knob: 1.35 }, body: { len: 1.2, girth: 1.3, deep: 1.45, tuck: 0.7, hump: 1.5, neck: [0.06, 0.24], neckThick: 1.45 }, head: { size: 1.45, muzzle: 2.1, muzzleDeep: 1.6, eye: 1.1 }, ear: { torn: 1 } }), R = q.R, P = q.P, t = stub(q, C);
    const hands = antlers(P, { kind: "palm", size: 1.35, spread: 1.05, colour: "#8a8168", tip: "#d9d2b8", glow: MARSH, pools: { colour: MARSH }, moss: { colour: MOSS, tip: "#7ba24c", long: 1.6 } });
    const mane = [3, 4, 5].flatMap(i => tufts(R[i], BONES[i], { n: 4, a0: 0.15, a1: 1.3, long: 0.2, sweep: 0.75, droop: 0.3, r: 0.08, lock: true, colour: () => "#1f1a16", tip: () => "#4a4038" }));
    const moss = [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 1.7, a1: 2.6, long: 0.16, sweep: 0.3, droop: 0.85, r: 0.05, flat: 0.4, colour: () => MOSS, tip: () => "#7ba24c" }));
    const beard = [{ at: P(0, -0.04, 0.22), rx: 0.035, ry: 0.035, tip: P(0, -0.2, 0.18), bone: "head", colour: C.coat, tipColour: C.muzzle, split: 0.5, bulge: 0.7, up: [0, 0, 1] }];
    const armour = [{ from: 1.2, to: 4.4, round: [0, 1.6], lames: 4, thick: 0.024, step: 0.012, colour: OAK, rim: BIRCH, runes: { colour: MARSH } }];
    return plan("elk-legend", q.body, q.skull, [...q.legs, t, hands], trots({ lively: 0.75, lie: COUCHED, tails: [t.chain] }), { cones: [bell(R, C, 1.7), ...mane, ...moss, ...beard], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "elk", heights: [72, 130, 199, 440], plans: elk };

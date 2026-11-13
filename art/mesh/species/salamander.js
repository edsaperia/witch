// The salamander, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/salamander/genome.js): a fire salamander, near black with yellow blotches and a yellow belly, sprawled, its
// tail growing longer with each level; its legend with coals in its coat, lit eyes and wisps down its back. A sprawler
// (kit/sprawl.js): low and soft, its legs out to its sides, going by the swing of its back.
import { plan } from "../kit/plan.js";
import { rudder } from "../kit/rudder.js";
import { scutes } from "../kit/scutes.js";
import { spots } from "../kit/spots.js";
import { sprawler, sprawls } from "../kit/sprawl.js";
import { BONES } from "../kit/torso.js";

const BLACK = "#22201f", YELLOW = "#f2c230";
const SAL = { coat: BLACK, belly: YELLOW, nose: BLACK, upper: BLACK, mid: "#2c2927", sock: "#3a3532", eye: "#0c0a0a" };
const build = (C, o) => sprawler({ C, wide: 1.2, flat: 0.72, body: { back: 0.13, len: 0.9, girth: 1.0, deep: 0.85, neck: [0.015, 0.11], neckThick: 1.3, white: 0.5, ...o.body }, hind: { len: 0.22, thick: 0.95, paw: 1.2, ...o.legs }, fore: { len: 0.2, thick: 0.9, paw: 1.2, ...o.legs, ...o.fore },
  head: { size: 0.95, muzzle: 0.45, muzzleWide: 1.7, muzzleDeep: 1.0, wide: 1.1, dome: 0.75, eye: 1.5, eyeAt: [-0.004, 0.012, -0.01], nose: 0.01, ...o.head } });
const tailOf = (q, C, o) => rudder("tail", "pelvis", q.root, { len: 0.5, r: 0.07, flat: 0.95, pitch: -0.12, curl: 0.1, tip: 0, bones: 6, colours: { coat: C.coat, under: C.belly, tip: C.coat }, ...o });
const blotches = (q, o) => spots(q.R, BONES, { colour: YELLOW, n: 2, a0: 0.25, a1: 1.15, r: 0.024, ...o });
// (the most supple of the sprawlers: its whole back swings)
const goes = (o = {}) => sprawls({ ...o, walk: { body: { yaw: 0.22 } }, run: { body: { yaw: 0.3 } } });
const salamander = {
  // a larva just out of the water: stubby and big-headed, paler, feathery gills still at its neck, a short finned tail
  baby() {
    const C = { ...SAL, coat: "#4a4440", upper: "#4a4440", mid: "#4a4440", sock: "#5a534e" }, q = build(C, { body: { len: 0.62, girth: 0.95, back: 0.12 }, legs: { len: 0.17, thick: 1.0 }, head: { size: 1.25, eye: 1.9 } }), P = q.P;
    const t = tailOf(q, C, { len: 0.28, r: 0.06, flat: 1.5, bones: 4 });
    const gills = [1, -1].flatMap(s => [0, 1, 2].map(i => ({ at: P(0.075 * s, 0.01 + 0.02 * i, 0.0), rx: 0.016, ry: 0.01, tip: P((0.15 + 0.01 * i) * s, 0.02 + 0.045 * i, -0.07), bone: "head", colour: "#c9584a", tipColour: "#e88a78", bulge: 0.8, split: 0.5, up: [0, 1, 0], sides: 4 })));
    return plan("salamander-baby", q.body, q.skull, [...q.legs, t], goes({ lively: 1.3, tails: [t.chain] }), { cones: [...gills, ...blotches(q, { n: 1, r: 0.02 })] });
  },
  // slim and glossy, the first yellow on it
  young() {
    const q = build(SAL, { body: { len: 0.85, girth: 0.82 }, head: { size: 0.9 } }), t = tailOf(q, SAL, { len: 0.42, r: 0.055 });
    return plan("salamander-young", q.body, q.skull, [...q.legs, t], goes({ lively: 1.1, tails: [t.chain] }), { cones: blotches(q, { n: 2, r: 0.02 }) });
  },
  // long and heavy, bold yellow blotches down its back and its tail, a tail as long as the rest of it
  adult() {
    const q = build(SAL, { body: { len: 1.05, girth: 1.12 }, legs: { len: 0.25, thick: 1.0 }, head: { size: 1.0 } }), t = tailOf(q, SAL, { len: 0.85, r: 0.085 }), tr = t.lofts[0].rings;
    const onTail = [2, 4, 6].map(i => ({ at: [0, tr[i].at[1] + tr[i].ry * 0.9, tr[i].at[2]], rx: 0.026, ry: 0.026, tip: [0, tr[i].at[1] + tr[i].ry + 0.012, tr[i].at[2]], bone: tr[i].bone, colour: YELLOW, bulge: 0.9, split: 0.5, up: [0, 0, 1], sides: 5 }));
    return plan("salamander-adult", q.body, q.skull, [...q.legs, t], goes({ tails: [t.chain] }), { cones: [...blotches(q, { n: 3, r: 0.028 }), ...onTail] });
  },
  // the one the old books mean, that lives in the fire: its blotches gone to coals, a crest of flame down its back and its
  // tail, its eyes lit; plate the dark red of cooling iron along its back, a mark lit on each
  legend() {
    const EMBER = "#ff8a2a", FLAME = "#ffd76a", IRON = "#5a1f14", C = { ...SAL, coat: "#1a1616", belly: "#c9781f", upper: "#1a1616", mid: "#241d1c", sock: "#33201a", eyes: [{ colour: FLAME, glow: true }, { colour: FLAME, glow: true }] };
    const q = build(C, { body: { len: 1.2, girth: 1.3, back: 0.15 }, legs: { len: 0.3, thick: 1.1, claws: { colour: "#3a2a24", len: 1.2 } }, head: { size: 1.15, eye: 1.5 } }), t = tailOf(q, C, { len: 1.05, r: 0.1, wave: 0.2, curl: 0.2, bones: 7 }), tr = t.lofts[0].rings;
    const crest = scutes(q.R, BONES, { from: 4, to: 6, n: 2, high: 0.07, wide: 0.022, long: 0.035, colour: EMBER, tip: FLAME, glow: true });
    const flames = [1, 2, 3, 4, 5, 6, 7].map(i => ({ at: [tr[i].at[0], tr[i].at[1] + tr[i].ry * 0.85, tr[i].at[2]], rx: 0.02, ry: 0.04, tip: [tr[i].at[0], tr[i].at[1] + tr[i].ry + 0.1 - 0.008 * i, tr[i].at[2] - 0.05], bone: tr[i].bone, colour: EMBER, tipColour: FLAME, glow: true, split: 0.5, up: [0, 0, 1], sides: 4 }));
    const coals = blotches(q, { colour: EMBER, n: 2, a0: 0.9, a1: 1.5, r: 0.02 }).map(c => ({ ...c, glow: true }));
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.9, to: 4.7, round: [0, 1.0], lames: 6, thick: 0.016, step: 0.01, colour: IRON, rim: "#8a3a22", runes: { colour: FLAME, max: 1 } }];
    return plan("salamander-legend", q.body, q.skull, [...q.legs, t], goes({ lively: 0.8, tails: [t.chain] }), { cones: [...crest, ...flames, ...coals], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build; curl, how it curls up to sleep (art/mesh/gear.js `napping` reads gait.curl): long, it turns further so its ring closes. */
export const MESH = { id: "salamander", heights: [33, 51, 74, 260], curl: { turn: 4.4 }, plans: salamander };

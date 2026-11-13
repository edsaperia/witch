// The toad, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/toad/genome.js): a squat olive toad; "its legend: its throat sac swollen into a great glowing balloon". Not a
// sprawler: it squats on long folded hind legs and hops (kit/quad.js with a hare's proportions, its body made broad and
// flat). It does not curl to sleep: it tucks down where it squats, at every level.
import { ball } from "../kit/ball.js";
import { hop } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { rudder } from "../kit/rudder.js";
import { spots } from "../kit/spots.js";
import { BONES } from "../kit/torso.js";

const TOAD = { coat: "#7f8a3e", belly: "#d9d39a", nose: "#5f6a2e", upper: "#75803a", mid: "#6a7434", sock: "#5a632c", eye: "#d98a1e" };
const build = (C, o) => { const q = quad({ C, hind: { len: 0.5, thick: 1.5, foot: 2.0, paw: 1.5, spread: 1.5, ...o.hind }, fore: { len: 0.34, thick: 1.2, paw: 1.4, spread: 1.4, ...o.fore }, body: { len: 0.62, girth: 1.35, deep: 0.9, tuck: 1.1, arch: 0.5, rump: 1.15, neck: [0.03, 0.08], neckThick: 1.5, white: 0.55, ...o.body },
  head: { size: 1.15, muzzle: 0.3, muzzleWide: 2.3, muzzleDeep: 1.3, wide: 1.2, dome: 0.8, cheek: 0, eye: 1.8, eyeAt: [-0.012, 0.03, -0.035], nose: 0.01, ...o.head, ear: { shape: "round", tall: 0.05, wide: 0.4, back: C.coat, inner: C.coat } } });
  for (const r of q.R) { r.rx *= o.wide ?? 1.3; r.ry *= 0.88; } return q; };
// (a slow hop and a bound; it sleeps squatting, tucked down: it can't curl nose to tail)
const hops = (o = {}) => hop({ sleep: "sphinx", ...o });
const warts = (q, o) => spots(q.R, BONES, { colour: "#5f6a2e", n: 3, a0: 0.2, a1: 1.3, r: 0.016, ...o });
const toad = {
  // a toadlet just out of the pond: smooth and bright, its tadpole's tail not yet gone
  baby() {
    const C = { ...TOAD, coat: "#9aa84e", upper: "#9aa84e", mid: "#8a9846", sock: "#7a883e" }, q = build(C, { hind: { len: 0.36, thick: 1.6 }, fore: { len: 0.26, thick: 1.3 }, body: { len: 0.5, girth: 1.2 }, head: { size: 1.35, eye: 2.1 }, wide: 1.2 });
    const t = rudder("tail", "pelvis", q.root, { len: 0.2, r: 0.05, flat: 1.6, pitch: -0.25, tip: 0, colours: { coat: C.coat, tip: C.coat } });
    return plan("toad-baby", q.body, q.skull, [...q.legs, t], hops({ lively: 1.3, tails: [t.chain] }));
  },
  // small and dry-skinned, the first warts
  young() {
    const q = build(TOAD, { body: { len: 0.58, girth: 1.2 }, head: { size: 1.05 } });
    return plan("toad-young", q.body, q.skull, q.legs, hops({ lively: 1.1 }), { cones: warts(q, { n: 2, r: 0.012 }) });
  },
  // broad as a hand and warty all over, heavy brows over amber eyes, a pale throat
  adult() {
    const q = build(TOAD, { hind: { len: 0.54, thick: 1.7 }, fore: { len: 0.36, thick: 1.35 }, body: { len: 0.68, girth: 1.6 }, head: { size: 1.2 }, wide: 1.35 }), P = q.P;
    const brows = [1, -1].map(s => ({ at: P(0.05 * s, 0.085, 0.05), rx: 0.035, ry: 0.02, tip: P(0.085 * s, 0.06, -0.06), bone: "head", colour: TOAD.mid, bulge: 0.85, split: 0.5, up: [0, 1, 0], sides: 5 }));
    return plan("toad-adult", q.body, q.skull, q.legs, hops(), { cones: [...warts(q, { n: 3, r: 0.02 }), ...brows] });
  },
  // the old one under the stone: vast, every wart a point of light, its eyes lit, its throat swollen into a great pale sac
  // lit from within (part of it, not an ornament); plate of green bronze down its back, a mark lit on each
  legend() {
    const LIT = "#ffd76a", SAC = "#f4e9a8", BRONZE = "#3f6a52", C = { ...TOAD, coat: "#5f6a36", belly: "#c9c48a", upper: "#57622f", mid: "#4d572a", sock: "#3f4722", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { len: 0.62, thick: 1.8, knob: 1.2 }, fore: { len: 0.42, thick: 1.45, knob: 1.2 }, body: { len: 0.78, girth: 1.9, neck: [0.04, 0.1] }, head: { size: 1.35, eye: 1.7 }, wide: 1.4 }), R = q.R, P = q.P;
    // its throat: swollen out under its chin, lit (under its chin and joined to it: its own skin, not an ornament)
    const sac = ball("neck", [0, R[5].at[1] - R[5].ry * 0.45, R[5].at[2] + 0.05], { r: R[5].rx * 0.7, colour: SAC, glow: true, sides: 8, squash: 0.85 });
    const brows = [1, -1].map(s => ({ at: P(0.05 * s, 0.085, 0.05), rx: 0.04, ry: 0.022, tip: P(0.11 * s, 0.09, -0.09), bone: "head", colour: C.mid, tipColour: "#8a9846", bulge: 0.8, split: 0.5, up: [0, 1, 0], sides: 5 }));
    const lights = warts(q, { colour: LIT, n: 2, a0: 1.15, a1: 1.6, r: 0.018 }).map(c => ({ ...c, glow: true }));
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.9, to: 4.6, round: [0, 1.0], lames: 4, thick: 0.022, step: 0.012, colour: BRONZE, rim: "#8fb89a", runes: { colour: LIT, max: 1 } }];
    return plan("toad-legend", q.body, q.skull, [...q.legs, sac], hops({ lively: 0.75 }), { cones: [...brows, ...lights], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "toad", heights: [33, 50, 82, 232], plans: toad };

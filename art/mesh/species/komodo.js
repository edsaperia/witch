// The Komodo dragon, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md). Its genome's brief (art/creatures/komodo/genome.js; Ed, 2026-10-12): "a big low monitor
// lizard, long and heavy, its long flat head, its sprawled legs and its tail as long again as its body. Its evolution: a banded
// yellow-and-green tree-climbing hatchling, a speckled young, a heavy grey-brown adult, and the island's legend, the elder of its
// kind: vast, the bony plates in its hide grown into weathered, mossed stone armour, old scars raked across its flank, a longer
// tongue, long hooked claws, and a string of offerings over its shoulders". A sprawler (kit/sprawl.js), carried higher than the
// salamander, its head out on a long neck.
import { band } from "../kit/band.js";
import { bib } from "../kit/bib.js";
import { plan } from "../kit/plan.js";
import { rudder } from "../kit/rudder.js";
import { scutes } from "../kit/scutes.js";
import { spots } from "../kit/spots.js";
import { sprawler, sprawls } from "../kit/sprawl.js";
import { BONES } from "../kit/torso.js";

const TONGUE = "#e8c84a", KOMODO = { coat: "#7a6c58", belly: "#b5a684", nose: "#3a322a", upper: "#6f6250", mid: "#655948", sock: "#51473a", eye: "#17120f" };
const build = (C, o) => sprawler({ C, wide: 1.15, flat: 0.8, body: { back: 0.2, len: 1.15, girth: 1.15, deep: 0.9, neck: [0.05, 0.22], neckThick: 1.0, white: 0.35, ...o.body }, hind: { len: 0.34, thick: 1.0, paw: 1.2, claws: { colour: "#2a231c" }, ...o.legs }, fore: { len: 0.32, thick: 0.95, paw: 1.2, claws: { colour: "#2a231c" }, ...o.legs, ...o.fore },
  head: { size: 1.0, muzzle: 1.5, muzzleWide: 1.25, muzzleDeep: 0.8, wide: 0.85, dome: 0.7, eye: 0.9, nose: 0.5, ...o.head } });
const tailOf = (q, C, o) => rudder("tail", "pelvis", q.root, { len: 1.0, r: 0.1, flat: 1.1, pitch: -0.14, curl: 0.12, tip: 0, bones: 6, colours: { coat: C.coat, under: C.belly, tip: C.coat }, ...o });
/** Its forked tongue, out and tasting the air: `long` times a grown one's. */
const tongue = (P, long = 1, m = 1.5) => [1, -1].map(s => ({ at: P(0, -0.02, 0.16 + 0.09 * m), rx: 0.008, ry: 0.005, tip: P(0.022 * s * long, -0.05 * long, 0.16 + 0.09 * m + 0.1 * long), bone: "head", colour: TONGUE, up: [0, 1, 0], sides: 3 }));
const komodo = {
  // a hatchling that lives up trees: slim, banded yellow and green, a long whip of a tail
  baby() {
    const C = { ...KOMODO, coat: "#6f8a3c", belly: "#e3d27a", upper: "#6f8a3c", mid: "#63803a", sock: "#566f32" }, q = build(C, { body: { len: 0.8, girth: 0.85, back: 0.16, neck: [0.04, 0.14] }, legs: { len: 0.26, thick: 0.85 }, head: { size: 1.05, muzzle: 0.9, eye: 1.4 } });
    q.R.forEach((r, i) => { if (i % 2 === 0 && i < 5) r.colour = bib("#e3d27a", C.belly, -0.3); });
    const t = tailOf(q, C, { len: 0.7, r: 0.065 });
    return plan("komodo-baby", q.body, q.skull, [...q.legs, t], sprawls({ lively: 1.3, tails: [t.chain] }));
  },
  // a slim speckled young, its head still short
  young() {
    const C = { ...KOMODO, coat: "#7d7450", upper: "#7d7450", mid: "#70684a" }, q = build(C, { body: { len: 1.0, girth: 0.95 }, head: { size: 0.95, muzzle: 1.15 } }), t = tailOf(q, C, { len: 0.9, r: 0.08 });
    return plan("komodo-young", q.body, q.skull, [...q.legs, t], sprawls({ lively: 1.1, tails: [t.chain] }), { cones: [...spots(q.R, BONES, { colour: "#d9c97a", n: 3, a0: 0.3, a1: 1.3, r: 0.012 }), ...tongue(q.P, 0.7, 1.15)] });
  },
  // heavy and grey-brown, a long flat head, a dewlap, its tongue out
  adult() {
    const q = build(KOMODO, { body: { len: 1.25, girth: 1.3, back: 0.22 }, legs: { len: 0.38, thick: 1.1 }, head: { size: 1.1 } }), t = tailOf(q, KOMODO, { len: 1.25, r: 0.12 }), R = q.R;
    const dewlap = { at: [0, R[5].at[1] - R[5].ry * 0.6, R[5].at[2]], rx: 0.05, ry: 0.07, tip: [0, R[5].at[1] - R[5].ry * 1.7, R[5].at[2] + 0.03], bone: "neck", colour: KOMODO.belly, bulge: 0.85, split: 0.5, up: [0, 0, 1], sides: 5 };
    return plan("komodo-adult", q.body, q.skull, [...q.legs, t], sprawls({ tails: [t.chain] }), { cones: [dewlap, ...tongue(q.P)] });
  },
  // the elder of the island: vast, a crown of spines, long hooked claws, old scars across its flank, a string of offerings
  // over its shoulders; the bony plates in its hide grown into weathered, mossed stone armour, a mark lit on each
  legend() {
    const STONE = "#8f9488", MOSS = "#5d7a3e", LIT = "#c9f08a", C = { ...KOMODO, coat: "#5f5648", belly: "#9a8e72", upper: "#554c40", mid: "#4c4439", sock: "#3d362d", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { body: { len: 1.4, girth: 1.5, back: 0.26, neck: [0.08, 0.26], neckThick: 1.1, hump: 0.4 }, legs: { len: 0.46, thick: 1.15, paw: 1.3, claws: { colour: "#d9d2b8", len: 2.2 } }, head: { size: 1.25, eye: 1.0 } }), R = q.R, P = q.P;
    const t = tailOf(q, C, { len: 1.5, r: 0.15, wave: 0.15, bones: 7 });
    const crown = [-2, -1, 0, 1, 2].map(i => ({ at: P(0.03 * i, 0.085, 0.04), rx: 0.016, ry: 0.014, tip: P(0.05 * i, 0.19 - 0.02 * Math.abs(i), -0.04), bone: "head", colour: C.coat, tipColour: "#e3d9b8", split: 0.5, up: [0, 0, 1], sides: 4 }));
    const dewlap = { at: [0, R[5].at[1] - R[5].ry * 0.6, R[5].at[2]], rx: 0.06, ry: 0.09, tip: [0, R[5].at[1] - R[5].ry * 1.8, R[5].at[2] + 0.03], bone: "neck", colour: C.belly, bulge: 0.85, split: 0.5, up: [0, 0, 1], sides: 5 };
    const scars = [0, 1, 2].map(i => ({ at: [R[3].rx * 0.95, R[3].at[1] + 0.05 - 0.03 * i, R[3].at[2] - 0.06], rx: 0.008, ry: 0.006, tip: [R[3].rx * 0.9, R[3].at[1] + 0.02 - 0.03 * i, R[3].at[2] + 0.1], bone: "chest", colour: "#c9a394", up: [0, 1, 0], sides: 3 }));
    // the offerings: a cord over its shoulders, fangs and bones hung from it
    const cord = band("neck", R[4].at, R[5].at, { at: 0.6, r: R[5].rx * 1.1, ry: R[5].ry * 1.1, wide: 0.014, colour: "#7a5a3a" });
    const hung = [-1, 1].flatMap(s => [0.9, 1.5].map((a, i) => ({ at: [Math.sin(a) * s * R[5].rx * 1.1, R[5].at[1] + Math.cos(a) * R[5].ry * 1.1, R[5].at[2] - 0.03], rx: 0.014, ry: 0.012, tip: [Math.sin(a) * s * R[5].rx * 1.15, R[5].at[1] + Math.cos(a) * R[5].ry - 0.09 - 0.02 * i, R[5].at[2] - 0.03], bone: "neck", colour: "#efe6cf", up: [0, 0, 1], sides: 4 })));
    const moss = scutes(R, BONES, { from: 1, to: 4, n: 2, side: 1.15, high: 0.035, wide: 0.03, long: 0.03, lean: 0.2, colour: MOSS, tip: "#86a659" });
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.8, to: 4.8, round: [0, 1.1], lames: 5, thick: 0.024, step: 0.012, colour: STONE, rim: "#6f7468", runes: { colour: LIT, max: 1 } }];
    return plan("komodo-legend", q.body, q.skull, [...q.legs, t, cord], sprawls({ lively: 0.75, tails: [t.chain] }), { cones: [...crown, dewlap, ...scars, ...hung, ...moss, ...tongue(P, 1.6)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build; curl, how it curls up to sleep (art/mesh/gear.js `napping` reads gait.curl): long, it turns further so its ring closes. */
export const MESH = { id: "komodo", heights: [54, 84, 120, 262], curl: { turn: 4.2 }, plans: komodo };

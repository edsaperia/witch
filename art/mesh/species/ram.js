// The ram, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals till
// Ed passes them). A hill sheep: a barrel of pale fleece on short dark legs, a dark face with a roman nose, ears out sideways.
// Its ladder is its genome's (art/creatures/ram/genome.js, docs/art-guide/EVOLUTIONS.md): "a curly white lamb with big ears and
// no horns, a young with its first horn buds, an adult with heavy dark ridged horns in a full curl and a fleece ruff, and the
// tangly forest's legend, the elder of its kind: the bellwether, the old lead ram of every flock: vast horns in a double spiral,
// worn and one broken short, ringed in bronze, a grizzled shaggy fleece, a bell at its throat and a garland of heather round
// its neck"; with bronze plate on its back (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a
// different colour and glowing runes"). Metres; y up; its head along +z.
import { band } from "../kit/band.js";
import { trots } from "../kit/gaits.js";
import { hooves } from "../kit/hooves.js";
import { horns } from "../kit/horns.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const DARK = "#3a2e28", HOOF = "#1f1815", WOOL = "#ebe4d2", WOOL2 = "#cfc6b0", RAM = { coat: WOOL, belly: "#d8cfba", mask: DARK, muzzle: DARK, nose: "#17110f", upper: WOOL, mid: DARK, sock: DARK };
// (a sheep lies with its forelegs folded under it, knees forward: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const build = (C, o) => { const q = quad({ C, hind: { len: 1.0, thick: 1.0, ...o.hind }, fore: { len: 1.0, thick: 0.95, ...o.fore }, body: { len: 0.98, girth: 1.4, deep: 1.12, tuck: 1.02, neck: [0.15, 0.13], neckThick: 1.3, white: 0.2, ...o.body },
  head: { size: 1.05, muzzle: 1.0, muzzleWide: 1.05, muzzleDeep: 1.3, dome: 1.05, cheek: 0, eye: 1.0, ...o.head, ear: { shape: "long", tall: 0.6, wide: 1.1, splay: 1.3, lean: 0.6, at: [0.01, -0.03, -0.01], back: C.mask ?? C.coat, inner: "#c9a79a", ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF }) }; };
const dock = (q, C) => tail("tail", "pelvis", q.root, { len: 0.12, r: 0.04, pitch: -1.1, tip: 0, blunt: 0.4, sides: 5, colours: { coat: C.coat, tip: C.coat } });
// (its fleece: fat curled locks standing off its back and flanks)
const fleece = (R, o = {}) => [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 5, a0: 0.2, a1: 2.5, long: 0.1, sweep: 0.55, droop: 0.25, r: 0.075, jitter: 0.2, lock: true, colour: k => (k % 2 ? WOOL2 : WOOL), tip: () => WOOL2, ...o }));
const ram = {
  // a lamb: a white curly ball on four black pegs, big ears, no horns
  baby() {
    const C = { ...RAM, mask: "#4a3a32", muzzle: "#4a3a32" }, q = build(C, { hind: { len: 0.72, thick: 1.15 }, fore: { len: 0.72, thick: 1.1 }, body: { len: 0.62, girth: 1.25, neck: [0.1, 0.09], neckThick: 1.1 }, head: { size: 1.3, muzzle: 0.7, muzzleDeep: 1.1, eye: 1.5 }, ear: { tall: 1.0 } });
    const t = dock(q, C);
    return plan("ram-baby", q.body, q.skull, [...q.legs, t], trots({ lively: 1.3, lie: COUCHED, tails: [t.chain] }), { cones: fleece(q.R, { n: 4, long: 0.06, r: 0.055 }) });
  },
  // a young ram: longer in the leg, its first horns two short curved buds
  young() {
    const q = build(RAM, { hind: { len: 1.0, thick: 0.9 }, fore: { len: 1.0, thick: 0.86 }, body: { len: 0.88, girth: 1.2 }, head: { size: 1.0 } }), t = dock(q, RAM);
    return plan("ram-young", q.body, q.skull, [...q.legs, t, horns(q.P, { len: 0.17, r: 0.026, p0: 0.9, curl: 1.3, out: [0.5, 0.4], n: 6 })], trots({ lively: 1.1, lie: COUCHED, tails: [t.chain] }), { cones: fleece(q.R, { n: 4, long: 0.07, r: 0.06 }) });
  },
  // the ram: heavy dark ridged horns in a full curl beside its face, a fleece ruff at its chest
  adult() {
    const q = build(RAM, { body: { girth: 1.5, deep: 1.18, neckThick: 1.5 }, head: { size: 1.12 } }), R = q.R, t = dock(q, RAM);
    const curl = horns(q.P, { len: 0.52, r: 0.042, p0: 0.75, curl: 5.3, out: [1.1, 0.25], tighten: 0.55, n: 20, tip: "#b9a98c" });
    const ruff = tufts(R[5], "neck", { n: 5, a0: 0.8, a1: 3.0, long: 0.14, sweep: 0.4, droop: 0.5, r: 0.075, lock: true, colour: () => WOOL, tip: () => WOOL2 });
    return plan("ram-adult", q.body, q.skull, [...q.legs, t, curl], trots({ lie: COUCHED, tails: [t.chain] }), { cones: [...fleece(R), ...ruff] });
  },
  // the bellwether: grizzled and shaggy, vast worn horns in a double spiral ringed in bronze, one broken short; a bell at its
  // throat on a garland of heather; bronze plate on its back, a heather-coloured mark lit on each
  legend() {
    const HEATHER = "#e9a0ff", BRONZE = "#8a5a24", EDGE = "#e2b660", GREY = "#9a9488", C = { ...RAM, coat: "#cfc8b8", belly: "#a8a294", mask: "#2e2623", muzzle: "#6e665e", upper: "#cfc8b8", eyes: [{ colour: HEATHER, glow: true }, { colour: "#e3e6e6" }] };
    const q = build(C, { hind: { len: 1.15, thick: 1.1, knob: 1.3 }, fore: { len: 1.15, thick: 1.05, knob: 1.3 }, body: { len: 1.05, girth: 1.55, deep: 1.25, hump: 0.5, neck: [0.14, 0.17], neckThick: 1.55 }, head: { size: 1.3, muzzle: 1.15, muzzleDeep: 1.45, eye: 1.2 }, ear: { torn: -1 } }), R = q.R, P = q.P, t = dock(q, C);
    const spiral = horns(P, { len: 0.86, r: 0.06, p0: 0.75, curl: 9.2, out: [1.15, 0.4], tighten: 0.62, n: 34, colour: "#6a5a48", ridge: "#9a8a70", tip: "#d9cdb0", glow: HEATHER, broken: { side: -1, at: 0.62 }, bands: { colour: EDGE, at: [0.14, 0.26, 0.38] } });
    const shag = [...fleece(R, { long: 0.19, droop: 0.6, r: 0.085, colour: k => (k % 2 ? GREY : "#cfc8b8"), tip: () => GREY }), ...tufts(R[5], "neck", { n: 5, a0: 0.8, a1: 3.0, long: 0.22, sweep: 0.35, droop: 0.65, r: 0.085, lock: true, colour: () => "#cfc8b8", tip: () => GREY })];
    const beard = [{ at: P(0, -0.04, 0.2), rx: 0.03, ry: 0.03, tip: P(0, -0.19, 0.15), bone: "head", colour: "#cfc8b8", tipColour: GREY, split: 0.5, bulge: 0.7, up: [0, 0, 1] }];
    // the garland: a rope of heather round its neck, sprigs standing off it, and the bell under its throat
    const n = R[5].at, garland = band("neck", n, R[6].at, { at: 0.3, r: R[5].rx * 1.12, ry: R[5].ry * 1.12, wide: 0.05, colour: "#5f7a4a" });
    const sprigs = tufts({ at: n, rx: R[5].rx * 1.2, ry: R[5].ry * 1.2 }, "neck", { n: 5, a0: 0.3, a1: 2.8, long: 0.07, sweep: 0.2, droop: 0.1, r: 0.03, colour: () => "#b56ad0", tip: () => "#e9a0ff" });
    const by = n[1] - R[5].ry * 1.35, bz = n[2] + 0.06, bell = [{ at: [0, by, bz], rx: 0.055, ry: 0.055, tip: [0, by - 0.1, bz], bone: "neck", colour: EDGE, split: 0.85, bulge: 0.9, up: [0, 0, 1], sides: 6 }, { at: [0, by, bz], rx: 0.055, ry: 0.055, tip: [0, by + 0.06, bz - 0.01], bone: "neck", colour: EDGE, up: [0, 0, 1], sides: 6 }];
    const armour = [{ from: 1.2, to: 4.3, round: [0, 1.5], lames: 3, thick: 0.024, step: 0.014, colour: BRONZE, rim: EDGE, runes: { colour: HEATHER } }];
    return plan("ram-legend", q.body, q.skull, [...q.legs, t, spiral, garland], trots({ lively: 0.75, lie: COUCHED, tails: [t.chain] }), { cones: [...shag, ...beard, ...sprigs, ...bell], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "ram", heights: [54, 89, 147, 328], plans: ram };

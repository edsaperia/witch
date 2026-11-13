// The meerkat, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief (Ed, 2026-10-12;
// art/creatures/meerkat/genome.js): a slim sandy sentinel, long-necked and upright, banded faintly across the back, dark round
// its eyes, a thin dark-tipped tail; its elder's eyes lit. Slight and narrow, its neck carried high; it bounds (Ed, 2026-11-12:
// "many small creatures bound rather than trot"). Its legend is this builder's proposal: the old watcher of the badlands.
import { lope } from "../kit/gaits.js";
import { paint } from "../kit/paint.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const DARK = "#3a2a20", BANDS = "#a07c4e", CREAM = "#efe2c4";
const MEERKAT = { coat: "#c9a36b", belly: CREAM, muzzle: "#e3cfa6", nose: "#1c1412", upper: "#c9a36b", mid: "#b89460", sock: "#a58352", eye: "#0f0b0a" };
// (dark round each eye; and faint bands across its back, hips to shoulders)
function marks(q, bands = BANDS) {
  paint(q.skull.rings[1], cy => (cy < 0.82 && cy > 0.05 ? DARK : undefined));
  for (const i of [1, 3]) paint(q.R[i], cy => (cy > 0.35 ? bands : undefined));
  return q;
}
const build = (C, o) => marks(quad({ C, hind: { len: 0.62, thick: 0.9, ...o.hind }, fore: { len: 0.6, thick: 0.8, ...o.fore }, body: { len: 0.8, girth: 0.8, deep: 0.9, tuck: 0.85, arch: 0.6, neck: [0.2, 0.08], neckThick: 0.9, white: 0.45, ...o.body },
  head: { size: 0.95, muzzle: 0.8, muzzleWide: 0.8, wide: 0.96, dome: 0.95, cheek: 0, eye: 1.35, ...o.head, ear: { shape: "round", tall: 0.4, wide: 0.8, at: [0.02, -0.035, -0.005], back: DARK, inner: DARK, ...o.ear } } }), o.bands);
const thin = (q, C, o) => tail("tail", "pelvis", q.root, { len: 0.5, r: 0.03, pitch: 0.15, tip: 0.3, blunt: 0.3, sides: 5, colours: { coat: C.coat, tip: DARK }, ...o });
const meerkat = {
  // a pup: a big head on a short neck, its eye patches too big for its face
  baby() {
    const C = { ...MEERKAT, coat: "#d6b88a", upper: "#d6b88a", mid: "#d6b88a", sock: "#c0a274" }, q = build(C, { bands: "#c4a678", hind: { len: 0.36, thick: 1.5 }, fore: { len: 0.35, thick: 1.4 }, body: { len: 0.5, girth: 0.95, arch: 0.4, neck: [0.07, 0.06], neckThick: 1.1 }, head: { size: 1.25, muzzle: 0.5, eye: 1.7 } });
    const t = thin(q, C, { len: 0.2, r: 0.024 });
    return plan("meerkat-baby", q.body, q.skull, [...q.legs, t], lope({ lively: 1.3, tails: [t.chain] }));
  },
  // stretching out: the neck coming up, the bands showing
  young() {
    const q = build(MEERKAT, { body: { len: 0.76, girth: 0.7, neck: [0.17, 0.08] }, head: { size: 0.9 } });
    const t = thin(q, MEERKAT, { len: 0.42 });
    return plan("meerkat-young", q.body, q.skull, [...q.legs, t], lope({ lively: 1.1, tails: [t.chain] }));
  },
  // the sentinel: its neck straight up like a post, the bands dark across its back, its tail held out stiff behind it, a digger's claws
  adult() {
    const q = build(MEERKAT, { bands: "#8a6840", fore: { len: 0.62, thick: 0.85, claws: { colour: DARK, len: 1.8, thick: 1.3 } }, body: { len: 0.84, girth: 0.84, neck: [0.3, 0.05], neckThick: 0.95 }, head: { size: 1.0 } });
    const t = thin(q, MEERKAT, { len: 0.55, r: 0.034, pitch: 0.35, curl: 0.3 });
    return plan("meerkat-adult", q.body, q.skull, [...q.legs, t], lope({ tails: [t.chain] }), { cones: whiskers(q.P, CREAM, 0.7) });
  },
  // the old watcher of the badlands: gaunt, its neck risen taller than its body is long, both eyes lit and never shut, a crest
  // of dark locks down that neck, claws like trowels, its tail a long dark-tipped brush; its bands gone to umber plate edged
  // in copper across its back, a mark lit on each
  legend() {
    const LIT = "#ffd98a", UMBER = "#4b2e22", COPPER = "#e0954a", C = { ...MEERKAT, coat: "#b88d55", back: "#9a7444", muzzle: "#e9dcc0", upper: "#b88d55", mid: "#a07c4e", sock: "#7d5e3a", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { bands: "#7d5e3a", hind: { len: 0.86, thick: 0.85, knob: 1.3, claws: { colour: DARK, len: 1.3 } }, fore: { len: 0.84, thick: 0.8, knob: 1.3, claws: { colour: DARK, len: 2.8, thick: 1.5, wide: 1.2 } }, body: { len: 0.95, girth: 0.9, deep: 1.0, tuck: 0.65, arch: 0.9, hump: 0.4, neck: [0.46, 0.04], neckThick: 0.95 }, head: { size: 1.15, muzzle: 0.9, eye: 1.7 }, ear: { torn: 1 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.8, r: 0.05, pitch: 0.3, curl: 0.5, wave: 0.15, bones: 6, tip: 0.3, plume: true, sides: 6, colours: { coat: C.coat, tip: DARK }, spikes: { n: 4, colour: DARK, len: 0.7 } });
    const crest = [6, 5, 4].flatMap((i, k) => tufts(R[i], i > 4 ? "neck" : "chest", { n: 1, a0: 0.1, long: 0.16 - 0.02 * k, sweep: 0.75, droop: 0.1, r: 0.045, lock: true, colour: () => C.back, tip: () => DARK }));
    const armour = [{ from: 1.1, to: 4.6, round: [0, 1.3], lames: 5, thick: 0.02, step: 0.012, colour: UMBER, rim: COPPER, runes: { colour: LIT, max: 1 } }];
    return plan("meerkat-legend", q.body, q.skull, [...q.legs, t], lope({ lively: 0.75, tails: [t.chain] }), { cones: [...crest, ...whiskers(q.P, CREAM, 1.3)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "meerkat", heights: [40, 62, 88, 234], plans: meerkat };

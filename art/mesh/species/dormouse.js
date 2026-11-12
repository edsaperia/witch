// The dormouse, four levels, as plans for art/mesh/shape.js (the hare, the squirrel and the dormouse were drawn together)
// (docs/plans/creature-meshes.md; the ladders are proposals till Ed marks them). Hoppers and scurriers: haunches bigger than
// their shoulders, a rounded back, a blunt head with the eyes set high on its sides. On Ed's word for the fox (2026-11-11): the
// adult already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces
// on legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { bound, hop } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const BLACK = "#17120f", GOLD = "#e9b949";

// ---- The dormouse (honeysuckle tangle): the big dark eyes, the furred tail, the curl of its sleep.
const DOR = { coat: "#d59a40", belly: "#f7ecd4", nose: "#c98a80", upper: "#d59a40", mid: "#c0862f", sock: "#f0d9c0", eye: BLACK };
const dorBuild = (C, o) => quad({ C, hind: { len: 0.32, thick: 1.6, foot: 1.3, ...o.hind }, fore: { len: 0.28, thick: 1.3, ...o.fore }, body: { len: 0.55, girth: 1.0, deep: 1.0, tuck: 1.0, arch: 0.8, rump: 1.15, neck: [0.06, 0.07], neckThick: 1.2, white: 0.5, ...o.body },
  head: { size: 1.2, muzzle: 0.42, muzzleWide: 1.1, dome: 1.08, wide: 1.05, cheek: 0, eye: 1.7, eyeAt: [0.0, 0.004, -0.012], nose: 0.9, ...o.head, ear: { shape: "round", tall: 0.75, wide: 1.25, at: [0.012, -0.012, -0.012], back: C.coat, inner: "#e9b9a8", ...o.ear } } });
const dormouse = {
  // a big-eyed baby with a short thin tail
  baby() {
    const C = { ...DOR, coat: "#c9a070", upper: "#c9a070", mid: "#c9a070" }, q = dorBuild(C, { hind: { len: 0.26, thick: 1.7 }, fore: { len: 0.24, thick: 1.5 }, body: { len: 0.44, girth: 0.95 }, head: { size: 1.42, eye: 1.9 }, ear: { tall: 0.9, wide: 1.4 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.16, r: 0.016, pitch: -0.1, blunt: 0.4, tip: 0, colours: { coat: "#b98f62", tip: "#b98f62" } });
    return plan("dormouse-baby", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.4, rock: 0.1, tailSwing: 0.2, tails: [t.chain] }));
  },
  // slim and leggy, its tail not yet bushy
  young() {
    const q = dorBuild(DOR, { hind: { len: 0.42, thick: 1.2 }, fore: { len: 0.36, thick: 1.0 }, body: { len: 0.6, girth: 0.8, tuck: 0.85 }, head: { size: 1.08 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.42, r: 0.026, pitch: -0.05, curl: 0.4, blunt: 0.4, tip: 0, colours: { coat: DOR.mid, tip: DOR.mid } });
    return plan("dormouse-young", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.44, rock: 0.1, tailSwing: 0.18, tails: [t.chain] }));
  },
  // fattened for its long sleep, golden, its full furred tail curled up over it like a blanket, whiskers out wide
  adult() {
    const q = dorBuild(DOR, { body: { len: 0.6, girth: 1.42, deep: 1.05, rump: 1.2 }, head: { size: 1.26 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.62, r: 0.085, pitch: 1.1, curl: 2.0, bones: 6, blunt: 0.35, tip: 0.12, colours: { coat: "#c88a30", under: "#a8701f", tip: "#f7ecd4" }, spikes: { n: 5, colour: "#e9bb62", len: 0.7 } });
    return plan("dormouse-adult", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.62, rock: 0.08, tailSwing: 0.05, tails: [t.chain] }), { cones: whiskers(q.P, "#f7ecd4", 1.2) });
  },
  // the sleeper: vast and round and never quite awake, its eyes shut; honeysuckle grown through its fur and flowering, lit;
  // plum enamel plate edged in gold over its back in lames, a dream-mark lit on each; whiskers like rods
  legend() {
    const DREAM = "#c9a8ff", BLOOM = "#fff0b8", PLUM = "#4a3168", C = { ...DOR, coat: "#c98f3a", back: "#b9a48a", belly: "#f3e6cc", muzzle: "#e6d8c0", upper: "#c98f3a", mid: "#b07a2c", eye: "#6a4a2a" };
    const q = dorBuild(C, { hind: { len: 0.44, thick: 1.9, knob: 1.2 }, fore: { len: 0.4, thick: 1.6, knob: 1.2 }, body: { len: 0.72, girth: 1.95, deep: 1.0, rump: 1.15, neck: [0.04, 0.1], neckThick: 1.5 }, head: { size: 1.75, eye: 0.7, eyeAt: [0.004, -0.004, -0.012] }, ear: { tall: 0.8, wide: 1.3, torn: -1 } }), P = q.P, R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 1.0, r: 0.13, pitch: 0.9, curl: 2.6, wave: 0.2, bones: 6, blunt: 0.35, tip: 0.1, colours: { coat: "#b9802c", under: "#96661f", tip: "#f3e6cc" }, spikes: { n: 7, colour: "#e9bb62", len: 0.9 } });
    // honeysuckle grown through its fur low on its flanks and round its neck, its trumpets lit
    const blooms = [...tufts(R[4], "chest", { n: 3, a0: 1.75, a1: 2.5, long: 0.1, sweep: 0.1, droop: -0.1, r: 0.03, sides: 5, jitter: 0.3, colour: () => "#ffd7c8", tip: () => BLOOM, glow: true }), ...tufts(R[5], "neck", { n: 3, a0: 0.4, a1: 2.0, long: 0.08, sweep: 0.0, droop: -0.2, r: 0.026, sides: 5, colour: () => BLOOM, glow: true })];
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): plum enamel edged in gold over its shoulders, a dream-mark lit on each plate
    const armour = [{ from: 1.75, to: 4.7, round: [0, 1.7], lames: 4, thick: 0.022, step: 0.014, colour: PLUM, rim: GOLD, runes: { colour: DREAM } }];
    return plan("dormouse-legend", q.body, q.skull, [...q.legs, t], hop({ seconds: 1.2, duty: 0.36, rock: 0.05, tailSwing: 0.03, tails: [t.chain], legs: bound(0.85) }), { cones: [...blooms, ...whiskers(P, "#f3e6cc", 2.4)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "dormouse", heights: [38, 65, 86, 246], plans: dormouse };

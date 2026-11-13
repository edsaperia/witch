// The jungle python, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/snake/genome.js): heavy, emerald green with white flecks down its spine and a yellow belly, a broad head. No
// legs: kit/serpent.js's one tube, which slithers along its own track and coils to sleep. Its legend is this builder's
// proposal: the old one of the canopy, hooded, its flecks lit.
import { serpent } from "../kit/serpent.js";

const BELLY = "#e8d26a", FLECK = "#f4f6ea", TONGUE = "#c8323c";
/** Its skin: two greens ring by ring, the belly's yellow below, a pale fleck on the spine every third ring. */
const skin = (a, b, fleck = FLECK, belly = BELLY) => (t, i) => (cy => (cy < -0.3 ? belly : cy > 0.8 && i % 3 === 1 && t > 0.12 ? fleck : i % 2 ? a : b));
const head = (c, belly = BELLY) => () => (cy => (cy < -0.3 ? belly : c));
const snake = {
  // a hatchling: short, bright as a new leaf, its head and eyes too big for it
  baby: () => serpent("snake-baby", { len: 0.8, r: 0.044, n: 16, rear: { share: 0.44, up: 1.35 }, wave: { amp: 0.07, long: 0.55 }, seconds: 1.1, skin: skin("#7fcf58", "#6fc04c"), head: { len: 3.6, wide: 1.5, deep: 1.0, eye: 1.6, colour: head("#7fcf58") } }),
  // slim and quick, the flecks showing
  young: () => serpent("snake-young", { len: 1.2, r: 0.048, n: 20, rear: { share: 0.42, up: 1.4 }, wave: { amp: 0.065, long: 0.5 }, seconds: 1.25, skin: skin("#3fae55", "#35a04b"), head: { len: 3.4, wide: 1.35, eye: 1.2, colour: head("#3fae55"), tongue: TONGUE } }),
  // heavy and emerald, a broad head held high
  adult: () => serpent("snake-adult", { len: 1.6, r: 0.075, n: 24, rear: { share: 0.42, up: 1.45 }, wave: { amp: 0.06, long: 0.5 }, seconds: 1.5, skin: skin("#1f9a4c", "#198a42"), head: { len: 3.3, wide: 1.45, deep: 0.9, colour: head("#1f9a4c"), tongue: TONGUE } }),
  // the old one of the canopy: vast, darker than the shade it lies in, a hood spread behind its head, every fleck down its
  // spine a light, its eyes lit; gold-edged jade plate up its reared neck, a mark lit on each
  legend() {
    const LIT = "#c8ffd8", JADE = "#0f5a4a", GOLD = "#e9b949";
    const hood = t => { const k = Math.exp(-(((t - 0.88) / 0.07) ** 2)); return [1 + 1.5 * k, 1 - 0.3 * k]; };
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.45, to: 0.8, round: [0, 1.25], lames: 6, thick: 0.02, step: 0.012, colour: JADE, rim: GOLD, runes: { colour: LIT, max: 1 } }];
    const lights = S => S.spine.filter((p, i) => i % 3 === 1 && p.t > 0.12 && (p.t < 0.43 || p.t > 0.82)).map(p => ({ at: [p.at[0], p.at[1] + p.ry * 0.9, p.at[2]], rx: p.rx * 0.3, ry: p.rx * 0.3, tip: [p.at[0], p.at[1] + p.ry * 1.25, p.at[2]], bone: p.bone, colour: LIT, glow: true, up: [0, 0, 1], sides: 4 }));
    return serpent("snake-legend", { len: 2.3, r: 0.105, n: 28, rear: { share: 0.42, up: 1.45 }, wave: { amp: 0.055, long: 0.5 }, seconds: 2.0, skin: skin("#14683a", "#105a32", "#14683a", "#d9c66a"), girth: hood,
      head: { len: 3.2, wide: 1.5, deep: 0.9, eye: 1.2, colour: head("#14683a", "#d9c66a"), eyes: { colour: LIT, glow: true }, tongue: TONGUE, horns: { colour: GOLD, tip: "#fff3c4", len: 0.7 } }, armour, cones: lights });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It coils to sleep at every level (kit/serpent.js `coil`). */
export const MESH = { id: "snake", heights: [51, 78, 112, 273], plans: snake };

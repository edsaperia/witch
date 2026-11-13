// The badlands' rattlesnake, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md). Its genome's brief (art/creatures/rattlesnake/genome.js; Ed, 2026-10-13): "a sandy
// sidewinder with dark diamonds, a wedge head and a rattle that grows a button a level; its legend the elder of its kind: great
// stacked coils, a colossal raised rattle whose shake ripples through the sand, great horns over its eyes, scarred". No legs:
// kit/serpent.js's one tube, shorter and thicker than the python's, its tail's end raised with the rattle on it.
import { serpent } from "../kit/serpent.js";

const SAND = "#d9b88a", SAND2 = "#cfab7a", DARK = "#6b4a2e", BELLY = "#f0e2c4", BONE = "#e6d6b0";
/** Its skin: sand, the belly pale, dark diamonds down its back (a point, the diamond's width, a point, a gap). */
const skin = (sand = SAND, sand2 = SAND2, dark = DARK) => (t, i) => (cy => (cy < -0.35 ? BELLY : t > 0.1 && cy > [0.8, 0.3, 0.8, 2][i % 4] ? dark : i % 2 ? sand : sand2));
const head = (c, dark = DARK) => k => ((cy, sx) => (cy < -0.3 ? BELLY : k > 0 && k < 3 && cy < 0.55 && cy > 0.1 ? dark : c)); // (a dark band through each eye)
const build = (name, o) => serpent(name, { n: 20, rear: { share: 0.3, up: 1.15 }, lift: { share: 0.14, up: 1.25 }, wave: { amp: 0.075, long: 0.55 }, ...o, head: { len: 3.2, wide: 1.75, deep: 0.85, nod: 0.18, colour: head(SAND), ...o.head } });
const rattlesnake = {
  // newly hatched: a stub of a snake with one button on its tail
  baby: () => build("rattlesnake-baby", { len: 0.78, r: 0.04, n: 14, seconds: 1.0, skin: skin("#e3c79c", "#dabb8c", "#8a6a48"), head: { eye: 1.6, wide: 1.6, colour: head("#e3c79c", "#8a6a48") }, rattle: { n: 1, colour: BONE } }),
  // three buttons, the diamonds dark
  young: () => build("rattlesnake-young", { len: 1.1, r: 0.048, n: 18, seconds: 1.2, skin: skin(), head: { eye: 1.2, tongue: "#2a1c1c" }, rattle: { n: 3, colour: BONE } }),
  // thick as a wrist, a broad wedge of a head, six buttons held up
  adult: () => build("rattlesnake-adult", { len: 1.5, r: 0.066, n: 22, seconds: 1.45, skin: skin(), head: { wide: 1.9, tongue: "#2a1c1c" }, rattle: { n: 6, colour: BONE, r: 0.03 } }),
  // the elder: great and scarred, horns over its eyes, a colossal rattle raised behind it, its last button lit; turquoise
  // plate down its neck, set as the desert sets it in silver, a mark lit on each
  legend() {
    const LIT = "#ffd27a", TURQ = "#1f8f8a", SILVER = "#d9dde0";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.52, to: 0.82, round: [0, 1.25], lames: 5, thick: 0.02, step: 0.012, colour: TURQ, rim: SILVER, runes: { colour: LIT, max: 1 } }];
    const scars = S => [0.3, 0.42].map(t => { const p = S.at(t); return { at: [p.at[0] + p.rx * 0.6, p.at[1] + p.ry * 0.75, p.at[2] - 0.06], rx: 0.012, ry: 0.008, tip: [p.at[0] + p.rx * 0.95, p.at[1] + p.ry * 0.2, p.at[2] + 0.08], bone: p.bone, colour: "#e9b4a4", up: [0, 0, 1], sides: 3 }; });
    return build("rattlesnake-legend", { len: 2.3, r: 0.1, n: 26, seconds: 1.9, lift: { share: 0.16, up: 1.35 }, wave: { amp: 0.07, long: 0.55 }, skin: skin("#c9a678", "#bd9868", "#553a24"),
      head: { wide: 2.0, eye: 1.1, colour: head("#c9a678", "#553a24"), eyes: { colour: LIT, glow: true }, tongue: "#2a1c1c", horns: { colour: "#553a24", tip: BONE, len: 1.3 } }, rattle: { n: 9, colour: BONE, tip: LIT, r: 0.07 }, armour, cones: scars });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It coils to sleep at every level (kit/serpent.js `coil`). */
export const MESH = { id: "rattlesnake", heights: [39, 63, 89, 222], plans: rattlesnake };

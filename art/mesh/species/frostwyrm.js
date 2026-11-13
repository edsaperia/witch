// The frost wyrm, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built
// from what batches A to G made; this one on batch E's serpent, kit/serpent.js, as the coordinator's brief has it). The frost
// cave's (art/creatures/frostwyrm/genome.js: "a wingless ice dragon, long and low, a long neck and a crocodile's snout,
// swept-back horns, a crest of ice-blue plates and a long tapering tail; its legend the thing that makes it a wyrm: a body and
// tail so long it winds like a river of ice, great horns and a beard of icicles"). A wyrm in the old sense: no legs, one long
// body that slithers and coils to sleep (kit/serpent.js `coil`, its own pose: it has no legs to curl up on). Its legend's
// armour (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
// is glacier ice up its reared neck. Metres; y up; its head along +z.
import { serpent } from "../kit/serpent.js";

const ICE = "#9fd8ee", PALE = "#e6f6fb", BELLY = "#dfeef2";
const skin = (a, b, belly = BELLY) => (t, i) => (cy => (cy < -0.3 ? belly : i % 2 ? a : b));
const head = (c, belly = BELLY) => () => (cy => (cy < -0.3 ? belly : c));
/** Its crest: a row of ice plates standing down its spine, tallest behind its head. every: one on each so-manyth ring. */
const crest = (o = {}) => S => S.spine.filter((p, i) => i % (o.every ?? 2) === 1 && p.t > 0.1).map(p => { const up = [0, Math.cos(p.pitch), -Math.sin(p.pitch)], along = [0, Math.sin(p.pitch), Math.cos(p.pitch)], h = (o.high ?? 0.8) * p.ry * (0.6 + 0.7 * p.t);
  return { at: p.at.map((v, k) => v + up[k] * p.ry * 0.8), rx: p.rx * 0.2, ry: p.ry * 0.55, tip: p.at.map((v, k) => v + up[k] * (p.ry + h) - along[k] * h * 0.45), bone: p.bone, colour: o.colour ?? ICE, tipColour: o.tip ?? PALE, glow: o.glow ?? false, split: 0.5, up: along, sides: 3 }; });
const frostwyrm = {
  // a hatchling: short, pale as new ice, its head too big for it, nubs of horns
  baby: () => serpent("frostwyrm-baby", { len: 0.95, r: 0.06, n: 16, rear: { share: 0.5, up: 1.3 }, wave: { amp: 0.07, long: 0.55 }, seconds: 1.1, skin: skin("#bfe3ee", "#b2d9e6"), head: { len: 3.6, wide: 1.4, deep: 0.95, eye: 1.6, colour: head("#bfe3ee"), horns: { colour: PALE, len: 0.35 } }, cones: crest({ high: 0.4, every: 3 }) }),
  // slim and quick, its crest coming in
  young: () => serpent("frostwyrm-young", { len: 1.4, r: 0.066, n: 20, rear: { share: 0.46, up: 1.32 }, wave: { amp: 0.065, long: 0.5 }, seconds: 1.25, skin: skin("#8fc6dc", "#82bbd2"), head: { len: 4.0, wide: 1.3, deep: 0.85, eye: 1.2, colour: head("#8fc6dc"), horns: { colour: PALE, len: 0.7 } }, cones: crest({ high: 0.6 }) }),
  // the frost wyrm: a long neck held high, a crocodile's snout, horns swept back, a crest of ice-blue plates down its back
  adult: () => serpent("frostwyrm-adult", { len: 1.9, r: 0.09, n: 26, rear: { share: 0.44, up: 1.35 }, wave: { amp: 0.06, long: 0.5 }, seconds: 1.5, skin: skin("#5fa6c6", "#5499ba"), head: { len: 4.4, wide: 1.3, deep: 0.8, colour: head("#5fa6c6"), horns: { colour: PALE, tip: "#ffffff", len: 1.1 } }, cones: crest({ high: 0.9 }) }),
  // the river of ice: so long it winds in many curves, great horns, a beard of icicles lit at their points, its crest lit, its
  // eyes lit; glacier-blue plate up its reared neck, a mark lit on each
  legend() {
    const LIT = "#c8f6ff", GLACIER = "#1f4f73";
    const armour = [{ from: 0.5, to: 0.84, round: [0.25, 1.3], lames: 7, thick: 0.02, step: 0.012, colour: GLACIER, rim: PALE, runes: { colour: LIT, max: 1 } }];
    const more = S => [...crest({ high: 1.0, tip: LIT, glow: "tip" })(S),
      ...[-0.1, -0.035, 0.035, 0.1].map((x, i) => ({ at: S.P(x, -0.05, 0.45 + 0.08 * (i % 2)), rx: 0.012, ry: 0.012, tip: S.P(x * 1.1, -0.3 - 0.08 * (i % 2), 0.4), bone: "head", colour: PALE, tipColour: LIT, glow: "tip", up: [0, 0, 1], sides: 3 }))];
    return serpent("frostwyrm-legend", { len: 3.4, r: 0.115, n: 36, rear: { share: 0.3, up: 1.4 }, wave: { amp: 0.05, long: 0.34 }, seconds: 2.0, skin: skin("#3f86ad", "#3779a0", "#cfe6ee"), head: { len: 4.4, wide: 1.4, deep: 0.85, eye: 1.2, colour: head("#3f86ad", "#cfe6ee"), eyes: { colour: LIT, glow: true }, horns: { colour: PALE, tip: LIT, len: 1.7 } }, armour, cones: more });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs frostwyrm`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. It coils to sleep at every level (kit/serpent.js `coil`). */
export const MESH = { id: "frostwyrm", heights: [102, 139, 215, 293], plans: frostwyrm };

// The feathered serpent, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders,
// built from what batches A to G made; this one on batch E's serpent, kit/serpent.js, with batch F's wing). The step pyramid's
// (Ed, 2026-10-23, its biome's fantastic creature: "the serpent template plus feathers, in bright plumage";
// art/creatures/featheredserpent/genome.js: "an emerald serpent, gold-bellied, its neck raised in an S inside a ruff of scarlet,
// gold and turquoise feathers, a crest of plumes off its head, streamers off its tail. Its evolution: a hatchling with a fluff
// of a ruff, a young with its first streamers, the adult's full ruff and crest and wings beginning; the legend the plumed
// serpent of the temple: great feathered wings, a towering crest, its feathers' tips burning turquoise"). Its legend's armour
// (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes") is
// gold up its reared neck. It slithers, and coils to sleep (kit/serpent.js `coil`, its own pose: a snake can't curl nose to
// tail), its legend's wings let down. Metres; y up; its head along +z.
import { featherwing } from "../kit/featherwing.js";
import { coil, serpent } from "../kit/serpent.js";

const GOLD = "#e9b949", SCARLET = "#d8362f", TURQ = "#2fc4c0", TONGUE = "#c8323c", PLUMES = [SCARLET, GOLD, TURQ];
const skin = (a, b, belly = GOLD) => (t, i) => (cy => (cy < -0.3 ? belly : i % 2 ? a : b));
const head = (c, belly = GOLD) => () => (cy => (cy < -0.3 ? belly : c));
/** Its feathers, for serpent's `cones`: a ruff round its neck at `at` (n feathers round, `long` of its thickness there), a
 *  crest of `crest` plumes off the back of its head and `streamers` off its tail's end; lit: their tips burn that colour. */
const plumage = o => S => { const out = [], lit = o.lit ? { tipColour: o.lit, glow: "tip" } : {};
  for (const [f, k] of o.rows ?? [[o.at ?? 0.9, 1]]) { const p = S.at(f), up = [0, Math.cos(p.pitch), -Math.sin(p.pitch)], along = [0, Math.sin(p.pitch), Math.cos(p.pitch)], n = o.n ?? 7, L = (o.long ?? 2) * p.ry * k;
    for (let j = 0; j < n; j++) { const a = (j / n) * Math.PI * 2 + 0.3, rad = [Math.cos(a), 0, 0].map((v, i) => v + up[i] * Math.sin(a)), c = PLUMES[j % 3];
      out.push({ at: p.at.map((v, i) => v + rad[i] * p.ry * 0.7), rx: p.ry * 0.5, ry: p.ry * 0.12, tip: p.at.map((v, i) => v + rad[i] * (p.ry + L * 0.8) - along[i] * L * 0.55), bone: p.bone, colour: c, tipColour: PLUMES[(j + 1) % 3], split: 0.55, bulge: 0.92, up: along, sides: 4, ...lit }); } }
  for (let j = 0; j < (o.crest ?? 0); j++) { const x = (j - (o.crest - 1) / 2) * 0.09, h = (o.tall ?? 0.5) * (1 - 0.25 * Math.abs(j - (o.crest - 1) / 2));
    out.push({ at: S.P(x, 0.12, 0.28), rx: 0.02, ry: 0.07, tip: S.P(x * 2.4, 0.12 + h, 0.28 - h * 0.7), bone: "head", colour: PLUMES[j % 3], tipColour: PLUMES[(j + 2) % 3], split: 0.6, bulge: 0.92, up: [1, 0, 0], sides: 4, ...lit }); }
  for (let j = 0; j < (o.streamers ?? 0); j++) { const p = S.spine[0], x = (j - (o.streamers - 1) / 2), L = (o.trail ?? 0.3);
    out.push({ at: p.at, rx: p.rx * 1.6, ry: p.ry * 0.5, tip: [p.at[0] + x * L * 0.28, p.at[1] + 0.01, p.at[2] - L * (1 - 0.15 * Math.abs(x))], bone: p.bone, colour: PLUMES[(j + 2) % 3], tipColour: PLUMES[j % 3], split: 0.6, bulge: 0.9, up: [0, 1, 0], sides: 4, ...lit }); }
  return out; };
/** A serpent with wings on its reared neck at `at`: shut against it, or with `up` held spread and raised that many radians. */
function winged(p, at, o, up) {
  const sp = p.gait.serpent.spine, r = sp[Math.round(at * (sp.length - 1))];
  const ws = [[1, "L"], [-1, "R"]].map(([s, tag]) => featherwing(tag, s, [r.at[0] + s * r.rx * 0.7, r.at[1] + r.ry * 0.3, r.at[2]], { parent: r.bone, tilt: up ? 0 : r.pitch * 0.8, colours: { coat: "#1f9a5a", flight: SCARLET, tip: GOLD, under: TURQ }, ...o, ...(up ? { fold: { roll: -up, at: [0.5, -0.05, 0.4] } } : {}) }));
  for (const w of ws) { p.bones.push(...w.bones); p.lofts.push(...w.lofts); p.cones.push(...w.cones); }
  // (asleep, coiled, a raised wing is swung back and let down level)
  if (up) p.gait.nap = pose => { coil(pose); ws.forEach((w, i) => { const s = i ? -1 : 1; pose.rots[w.names[0]] = [-r.pitch, 0, -s * (up - 0.12)]; }); };
  return p;
}
const featheredserpent = {
  // a hatchling: bright as a new leaf, a fluff of a ruff
  baby: () => serpent("featheredserpent-baby", { len: 0.9, r: 0.055, n: 16, rear: { share: 0.52, up: 1.3 }, wave: { amp: 0.07, long: 0.55 }, seconds: 1.1, skin: skin("#59c46a", "#4db85e"), head: { len: 3.5, wide: 1.5, deep: 1.0, eye: 1.6, colour: head("#59c46a") }, cones: plumage({ at: 0.95, n: 6, long: 2.2, crest: 1, tall: 0.25 }) }),
  // a young one: its ruff grown, its first streamers
  young: () => serpent("featheredserpent-young", { len: 1.3, r: 0.06, n: 20, rear: { share: 0.5, up: 1.32 }, wave: { amp: 0.065, long: 0.5 }, seconds: 1.25, skin: skin("#2fae5c", "#27a052"), head: { len: 3.4, wide: 1.35, eye: 1.2, colour: head("#2fae5c"), tongue: TONGUE }, cones: plumage({ rows: [[0.96, 1], [0.91, 0.7]], n: 7, long: 3.2, crest: 3, tall: 0.45, streamers: 3, trail: 0.3 }) }),
  // the feathered serpent: a full ruff of scarlet, gold and turquoise, a crest of plumes, streamers, small wings shut on its neck
  adult: () => winged(serpent("featheredserpent-adult", { len: 1.7, r: 0.08, n: 24, rear: { share: 0.48, up: 1.35 }, wave: { amp: 0.06, long: 0.5 }, seconds: 1.5, skin: skin("#149a52", "#108a48"), head: { len: 3.3, wide: 1.4, deep: 0.9, colour: head("#149a52"), tongue: TONGUE }, cones: plumage({ rows: [[0.96, 1], [0.91, 0.8]], n: 9, long: 4.2, crest: 5, tall: 0.75, streamers: 5, trail: 0.5 }) }),
    0.72, { span: 0.5, chord: 0.2, primaries: 4, secondaries: 3 }),
  // the plumed serpent of the temple: great feathered wings spread above it, a towering crest, every feather's tip burning
  // turquoise, its eyes lit; gold plate up its reared neck, a turquoise mark lit on each
  legend() {
    const LIT = "#6ff5ee", UP = 0.9, armour = [{ from: 0.52, to: 0.76, round: [0.2, 1.3], lames: 5, thick: 0.02, step: 0.012, colour: "#b8862c", rim: "#f6dc8a", runes: { colour: LIT, max: 1 } }];
    return winged(serpent("featheredserpent-legend", { len: 2.5, r: 0.11, n: 30, rear: { share: 0.42, up: 1.4 }, wave: { amp: 0.055, long: 0.42 }, seconds: 2.0, skin: skin("#0f7a44", "#0c6c3c", "#d9a93c"), head: { len: 3.3, wide: 1.45, deep: 0.9, eye: 1.2, colour: head("#0f7a44", "#d9a93c"), eyes: { colour: LIT, glow: true }, tongue: TONGUE }, armour,
      cones: plumage({ rows: [[0.96, 1], [0.92, 0.85]], n: 10, long: 3.6, crest: 5, tall: 0.95, streamers: 5, trail: 0.7, lit: LIT }) }), 0.8, { span: 1.5, chord: 0.5, primaries: 8, secondaries: 5, lit: LIT }, UP);
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs featheredserpent`: Ed, 2026-11-12, "keep
 *  the sizes"; its legend's is to the top of its raised wings, as today's is); plans, each level's build. */
export const MESH = { id: "featheredserpent", heights: [108, 149, 196, 436], plans: featheredserpent };

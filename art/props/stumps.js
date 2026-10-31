// The great stumps (Ed, 2026-10-29): every area's centrepiece, in place of its runestone, a giant tree's stump sawn long ago. One
// generator, a genome per species (one for each biome: "find joy and variety in the organic diversity of the trees themselves"),
// built in 3D (model3d.js) and seen from its own seeded angle, so no two areas share a stump. Ed's notes, from the mocks
// (claude/ed-shots previews/ed/centrepieces/stumps/):
// - "mostly sawn and flat on top, but they don't have to be perfectly round": a lobed outline, a lobe where each root flares;
// - "the stump should be 10m across, and the root area 25m across. They can vary": `across` and `spread` (m);
// - "flatter to the ground; I assume they won't actually have any height in the gameplay": knee to waist high on her (`height`);
// - "roots can go underground and sometimes emerge again further out": `dives`, the earth heaved over a buried run;
// - "not freshly cut": its top weathered grey, its rings faint, cracks and moss, no chips;
// - "the spell and the audio circle effect can be on top of the stump, and the soundsystem can grow sitting on top of it": a flat
//   top, and its middle (stumpPiece's `top`) for the ring and the stack;
// - "they will be lit by the sigils that float above them": nothing here glows; its normals take the stack's light.
//   STUMP_GENOMES: each species' ranges (sizes in metres), choices and colours ([h, s, v], a small seeded spread)
//   stumpSpecies(biome): the species a biome grows (art/flora/biomes.js keys; a blend "a/b" takes its first)
//   stumpPiece(species, { seed, yaw }, def, st): { sp, colours, metres, top, origin, roots, depth, yaw, variant } (top: the cut's middle
//   on the sprite, origin: the ground under it, px from its top-left; roots: the root area's outline, its radius in art pixels
//   at ROOT_ANGLES angles; depth: metres on the ground a metre of the sprite's height is, seen from the art's camera, so it can lie on the ground)
import { M, hsv2rgb, rng, cellHash, cropTight } from "../core.js";
import { Model, render, v3, PITCH } from "../model3d.js";
import { witchPixelsPerUnit, cleanFlecks } from "../witch.js";
import { propVariant } from "./generator.js";
import { groundColours } from "../ground.js";
import { treeSpecies, treeColours } from "../trees.js";
import { AREA_FLORA } from "../flora/areas.js";
import { biomeLook, biomeColours } from "../flora/biomes.js";

const SU = 1 / 1.9; // model units a metre (as the prop generator's PR_U)
/** How many angles a stump's root area's outline is measured at (stumpPiece's `roots`). */
export const ROOT_ANGLES = 32;
/** How many angles a stump's cut's outline is measured at (stumpCut). */
export const CUT_ANGLES = 48;
// lobes: how many, how far each swells past the trunk at its foot (a share of the radius) and how wide (radians); flute: the
// clefts between them; plank: the lobes thin walls (a kapok's buttresses); roots: how many, branching (the chance of a second
// branch), dives (the chance of each of two underground runs); top: weathered, slabs (the saw at different heights), hollow (a
// rotted heart, a share of the radius), cracks; lift: a mangrove's trunk raised on its stilt roots (m); moss, frost: shares.
export const STUMP_GENOMES = {
  oak: { // (temperate, home) broad and low, lobed, flaring into long ropey roots
    across: [9, 11], spread: [23, 27], height: [.9, 1.1], lobes: [6, 8], lobe: [.35, .6], lobeWidth: .3, flute: .25,
    roots: [8, 10], rootGirth: [0.77, 1.19], branch: .5, dives: .7, slabs: [0, 0], hollow: [0, .22], cracks: [3, 6], moss: .45,
    colour: { bark: [.07, .36, .34], dark: [.06, .45, .2], light: [.08, .26, .5], top: [.09, 0.12, 0.51], ring: [.08, .26, .5], moss: [.24, .45, .38], spread: .04 },
  },
  cedar: { // (cold rainforest) a red cedar: the biggest, deeply fluted, stringy red bark, a rotted heart
    across: [11, 13], spread: [22, 26], height: [1.2, 1.4], lobes: [9, 12], lobe: [.18, .3], lobeWidth: .22, flute: .6,
    roots: [6, 8], rootGirth: [0.77, 1.1], branch: .3, dives: .6, slabs: [0, 0], hollow: [.18, .32], cracks: [4, 8], moss: .85,
    colour: { bark: [.05, .55, .44], dark: [.04, .6, .24], light: [.06, .4, .58], top: [.08, 0.06, 0.51], ring: [.07, .14, .48], moss: [.25, .5, .4], spread: .04 },
  },
  spruce: { // (cold) narrower, its shallow roots spreading far over the ground, frost on its north
    across: [7.5, 9.5], spread: [24, 28], height: [.7, .9], lobes: [5, 7], lobe: [.25, .4], lobeWidth: .35, flute: .2,
    roots: [10, 13], rootGirth: [0.59, 0.94], branch: .6, dives: .5, slabs: [0, 0], hollow: [0, 0], cracks: [3, 5], moss: .1, frost: .3,
    colour: { bark: [.05, .2, .3], dark: [.05, .25, .17], light: [.06, .15, .44], top: [.1, 0.13, 0.57], ring: [.09, .3, .55], moss: [.3, .3, .42], frost: [.6, .06, .9], spread: .04 },
  },
  pine: { // (mountains) a Scots pine: plated orange-grey bark, sawn in uneven slabs, roots gripping
    across: [8, 10], spread: [20, 24], height: [.8, 1], lobes: [5, 7], lobe: [.3, .5], lobeWidth: .34, flute: .3,
    roots: [6, 8], rootGirth: [0.77, 1.1], branch: .4, dives: .6, slabs: [3, 5], slabDrop: [.12, .3], hollow: [0, .12], cracks: [2, 5], moss: .3,
    colour: { bark: [.06, .5, .5], dark: [.05, .55, .28], light: [.07, .35, .66], top: [.09, 0.16, 0.56], ring: [.08, .34, .52], moss: [.24, .4, .4], spread: .04 },
  },
  kapok: { // (jungle) a kapok: plank buttresses fanning out like walls, smooth grey bark, pale soft wood
    across: [6, 8], spread: [22, 26], height: [1.1, 1.3], lobes: [4, 6], lobe: [.7, 1], lobeWidth: .13, flute: .1, plank: true,
    roots: [4, 6], rootGirth: [0.34, 0.51], branch: .2, dives: .4, slabs: [0, 0], hollow: [0, .1], cracks: [2, 4], moss: .6,
    colour: { bark: [.13, .12, .32], dark: [.13, .15, .2], light: [.12, .1, .46], top: [.12, 0.11, 0.59], ring: [.11, .22, .56], moss: [.26, .5, .4], spread: .04 },
  },
  charred: { // (volcanic) burnt black, split by heat, its top in burnt slabs, ash grey
    across: [9, 11], spread: [20, 24], height: [.9, 1.1], lobes: [6, 8], lobe: [.25, .4], lobeWidth: .3, flute: .4,
    roots: [6, 8], rootGirth: [0.77, 1.1], branch: .4, dives: .6, slabs: [3, 5], slabDrop: [.1, .25], hollow: [.12, .25], cracks: [6, 10], moss: 0,
    colour: { bark: [0, .1, .14], dark: [0, .1, .07], light: [.05, .08, .26], top: [.07, 0.05, 0.25], ring: [.05, .1, .2], moss: [.24, .3, .3], spread: .03 },
  },
  mangrove: { // (mangrove swamp) raised on a cage of stilt roots arching down into the ground
    across: [6, 8], spread: [20, 24], height: [1.3, 1.5], lift: [.5, .7], lobes: [5, 7], lobe: [.15, .25], lobeWidth: .3, flute: .2, stilts: true,
    roots: [18, 22], rootGirth: [0.37, 0.54], branch: .3, dives: 0, slabs: [0, 0], hollow: [0, .12], cracks: [2, 4], moss: .35,
    colour: { bark: [.09, .27, .38], dark: [.08, .3, .22], light: [.09, .2, .52], top: [.07, 0.18, 0.51], ring: [.07, .38, .48], moss: [.22, .35, .45], spread: .04 },
  },
  baobab: { // (hot) a baobab: a fat, smooth, grey-pink trunk, a fibrous pale top, few short roots
    across: [11, 13], spread: [16, 20], height: [1.1, 1.3], lobes: [5, 7], lobe: [.18, .3], lobeWidth: .4, flute: .08,
    roots: [3, 5], rootGirth: [0.85, 1.19], branch: .2, dives: .5, slabs: [0, 0], hollow: [.12, .3], cracks: [2, 4], moss: 0, smooth: true,
    colour: { bark: [.05, .22, .58], dark: [.04, .25, .4], light: [.06, .16, .7], top: [.11, 0.12, 0.61], ring: [.1, .26, .6], moss: [.2, .3, .5], spread: .04 },
  },
  juniper: { // (badlands) silver, twisted, split into strands, gnarled
    across: [7, 9], spread: [20, 24], height: [.8, 1], lobes: [4, 6], lobe: [.35, .6], lobeWidth: .28, flute: .55, twist: 1.1,
    roots: [5, 7], rootGirth: [0.68, 1.02], branch: .5, dives: .6, slabs: [0, 0], slabDrop: [.05, .15], hollow: [.08, .25], cracks: [5, 9], moss: 0,
    colour: { bark: [.1, .08, .46], dark: [.08, .12, .28], light: [.1, .05, .62], top: [.1, 0.06, 0.57], ring: [.08, .16, .5], moss: [.2, .3, .5], spread: .03 },
  },
};
// The species each biome grows (art/flora/biomes.js BIOME_LOOKS' keys).
export const STUMP_FOR_BIOME = { temperate: "oak", "cold rainforest": "cedar", cold: "spruce", "mountains and glaciers": "pine", jungle: "oak", volcanic: "charred", "mangrove swamp": "mangrove", hot: "baobab", badlands: "juniper" };
export const stumpSpecies = biome => STUMP_FOR_BIOME[String(biome ?? "").split(/[/|]/)[0]] ?? "oak";
// Each area type's stump (Ed, 2026-10-29: "a different stump per area type"; "they don't necessarily have to look very different between
// area types, they just have to fit in with the area's look"): the stump of its own main tree (AREA_FLORA's first species), by the form
// nearest that tree (broadleaves the oak's, firs the spruce's, pines and larches the pine's...), its bark that tree's in the area's biome,
// its moss and the earth over its roots the area's own ground (stumpPiece's colours). A main kind that makes no sawn stump (palms, cacti,
// bamboo, cycads) takes the biome's form, as before.
export const STUMP_FOR_TREE = {
  oak: "oak", beech: "oak", ash: "oak", lime: "oak", sycamore: "oak", chestnut: "oak", elm: "oak", whitebeam: "oak", crabApple: "oak", broad: "oak", flat: "oak",
  olive: "oak", cherry: "oak", marula: "oak", mopane: "oak", rowan: "oak", hawthorn: "oak", hazel: "oak", elder: "oak", alder: "oak", willow: "oak", birch: "oak",
  weepingBirch: "oak", aspen: "oak", holly: "oak", glowcap: "oak", vinewood: "oak", crystal: "oak",
  cedar: "cedar", yew: "cedar", baldCypress: "cedar", fir: "spruce", pine: "pine", larch: "pine",
  juniper: "juniper", acacia: "juniper", paloVerde: "juniper", mesquite: "juniper", desertIronwood: "juniper",
  kapok: "oak", strangler: "oak", ironwood: "oak", mangrove: "mangrove", baobab: "baobab", // (the jungle's buttressed trees the oak's broad flare: the kapok's thin planks read as flat fins in the game)
};
/** An area's main tree (its flora's first species), or null. */
export const areaMainTree = def => AREA_FLORA[def?.id]?.species?.[0]?.[0] ?? null;
/** The stump form (a STUMP_GENOMES key) for an area (its def) in a biome (key). */
export function stumpForArea(def, biome) {
  const tree = areaMainTree(def), b = String(biome ?? "").split(/[/|]/)[0];
  if (b === "volcanic") return "charred"; // (the volcanic biome's trunks are charred black: art/flora/biomes.js)
  return STUMP_FOR_TREE[tree] ?? stumpSpecies(biome);
}

// A colour from its [h, s, v], spread a little by the seed.
const tone = (c, r, k) => hsv2rgb(((c[0] + (r() - .5) * k * .5) % 1 + 1) % 1, Math.max(0, Math.min(1, c[1] + (r() - .5) * k)), Math.max(0, Math.min(1, c[2] + (r() - .5) * k * 1.5)));

function build(m, v, G) {
  const r = v.r, K = SU, h = v.height * K, lift = (v.lift ?? 0) * K, nL = v.lobes, tw = G.twist ?? 0;
  // its irregularity (Ed, 2026-10-29: "The trunk shape and rings are a bit even, can they be more irregular?"; runeMarkers.stump.irregular,
  // 0 as first drawn): from a stream of its own, so the rest of its shape is as it was
  const irr = Math.max(0, v.irregular ?? 0), ri = rng((v.seed * 7121 + 503) >>> 0);
  // the lobes: each a buttress from the trunk's middle out to its foot, fused with the core (one group: a smooth union); uneven ones
  // swelling more or less and bunching
  const lobes = [...Array(nL).keys()].map(i => ({ a: i / nL * Math.PI * 2 + (r() - .5) * Math.PI * 1.1 / nL, A: v.lobe * (.75 + r() * .5) }));
  for (const L of lobes) { L.A *= Math.max(.3, 1 + irr * (ri() - .45) * 1.1); L.a += irr * (ri() - .5) * Math.PI * .5 / nL; }
  // the radius that puts its cut, on average, `across` wide: the core's top radius, the lobes reaching past it
  const R = v.across * K * .5 / (1 + (G.plank ? .15 : .45) * v.lobe * nL * G.lobeWidth / Math.PI);
  const bark = p => { // furrows running up it (twisting on a juniper), plates between, moss and frost on its shady (far) side
    const a = Math.atan2(p[2], p[0]) - tw * p[1] / Math.max(h, .01), k = Math.sin(a * (G.smooth ? 9 : 22) + Math.sin(p[1] * 7 + a * 3) * .8);
    const shade = -p[2] / Math.max(.01, Math.hypot(p[0], p[2]));
    if (v.frost && shade > .2 && cellHash(p, 6, 41) < v.frost * (shade + .2)) return M.WEB;
    if (v.moss && shade > .1 && cellHash(p, 11, 42) < v.moss * (shade + .1) * (1.2 - p[1] / Math.max(h, .01)) * .8) return M.MOSS;
    return k > (G.smooth ? .9 : .55) ? M.BARKD : k < -.85 || cellHash(p, 14, 43) < .06 ? M.BARKL : undefined;
  };
  const base = lift, core = R * (G.plank ? .85 : 1);
  m.seg([0, base - .05, 0], [0, h + .2, 0], core * (G.smooth ? 1 : 1.08), core * .97, M.TRUNK, { group: 1, rough: G.smooth ? .004 : .012, paint: bark });
  for (const L of lobes) { // a buttress: from the rim down to its foot (the stump being low, a ramp, not a column), the cut's outline bulging over it
    const out = [Math.cos(L.a), 0, Math.sin(L.a)], foot = R * (1 + L.A * (G.plank ? 1.6 : 1.25)), wr = R * G.lobeWidth;
    if (G.plank) { // a kapok's plank: an upright wall, as tall as the stump at the trunk, falling to the ground at its foot
      const L0 = foot - R * .7, H0 = h + lift, th = R * .07 + .04, c = v3.add(v3.mul(out, R * .7 + L0 / 2), [0, H0 / 2, 0]);
      m.box(c, [L0 / 2, H0 / 2, th], M.TRUNK, { dir: out, up: [0, 1, 0], round: th * .8, group: 1, rough: .006, paint: bark });
      const n = v3.norm(v3.add(v3.mul(out, H0), [0, L0 * 1.15, 0])), along = v3.norm(v3.sub(v3.mul(out, L0), [0, H0, 0])), at = v3.add(v3.mul(out, R * .8), [0, H0, 0]);
      m.box(v3.add(at, v3.mul(n, R * 3)), [R * 3, R * 3, R * 3], M.TRUNK, { dir: along, up: n, cut: true, group: 1 });
    } else m.ell(v3.add(v3.mul(out, R * .95), [0, base, 0]), [foot - R * .95 + wr * .3, (h - base) * (1.04 + .1 * L.A), wr], M.TRUNK, { dir: out, up: [0, 1, 0], group: 1, rough: .01, paint: bark });
  }
  // the flutes: clefts between the lobes, carved
  if (G.flute > .1) for (let i = 0; i < nL; i++) {
    const a = (lobes[i].a + lobes[(i + 1) % nL].a + (i === nL - 1 ? Math.PI * 2 : 0)) / 2, w = Math.min(R * .14 * G.flute, h * .3);
    m.seg([Math.cos(a) * R * 1.12, base - .05, Math.sin(a) * R * 1.12], [Math.cos(a + tw * .5) * R * 1.1, h * .5, Math.sin(a + tw * .5) * R * 1.1], w * 1.4, w, M.TRUNK, { group: 1, cut: true });
  }
  // irregular: knuckles of wood swelling the rim between the lobes, a side grown flat, and a notch (a wedge the saw or a split took)
  const notches = [];
  if (irr > 0) {
    const nk = Math.round(2 + 3 * ri());
    for (let i = 0; i < nk; i++) {
      const a = ri() * Math.PI * 2, w = R * (.18 + .22 * ri()) * Math.min(1.5, irr), c = R * (.78 + .14 * ri());
      m.seg([Math.cos(a) * c, base - .05, Math.sin(a) * c], [Math.cos(a) * c * .97, h + .2, Math.sin(a) * c * .97], w * 1.15, w, M.TRUNK, { group: 1, rough: G.smooth ? .004 : .012, paint: bark });
    }
    if (ri() < .55 * Math.min(1, irr)) { // a flattened side: everything past a line, shaved off
      const a = ri() * Math.PI * 2, n = [Math.cos(a), 0, Math.sin(a)], big = R * 4;
      m.box(v3.add(v3.mul(n, R * (.86 + .1 * ri()) + big), [0, h * .5, 0]), [big, h, big], M.TRUNK, { dir: n, up: [0, 1, 0], cut: true, group: 1, paint: bark });
    }
    if (ri() < .75 * Math.min(1, irr)) { // a V notch into the rim, down the side
      const a = ri() * Math.PI * 2, w = R * (.13 + .1 * ri()) * Math.min(1.3, irr), c = R * 1.04, turn = Math.PI / 4;
      m.box([Math.cos(a) * c, h, Math.sin(a) * c], [w, h * .7, w], M.BARKL, { dir: [Math.cos(a + turn), 0, Math.sin(a + turn)], up: [0, 1, 0], cut: true, group: 1 });
      notches.push(a);
    }
  }
  // the cut: sawn flat long ago, a little out of level; on a pine, charred or juniper stump in slabs the saw left at different heights
  const tilt = v3.norm([(r() - .5) * .05, 1, (r() - .5) * .05]), hollow = v.hollow * R, nRings = 16 + Math.floor(r() * 10);
  const checks = [...Array(v.cracks).keys()].map(() => { const c = r() * Math.PI * 2; return { c, w: 1, to: .2 + .8 * ((c * 7) % 1) }; });
  // irregular: the heart (the pith, where the rings start) off the middle, the rings unevenly spaced (closer towards the bark, as the
  // tree's growth slowed) and wavering, and a long split from the heart to the rim
  const ha = ri() * Math.PI * 2, hr = R * .14 * Math.min(1.3, irr) * (.5 + .5 * ri()), heart = [Math.cos(ha) * hr, Math.sin(ha) * hr];
  const widths = [...Array(nRings).keys()].map(i => Math.max(.3, 1 + irr * (ri() - .5) * 1.5) * (1 - .45 * Math.min(1, irr) * i / nRings));
  const sumW = widths.reduce((a, b) => a + b, 0), bounds = []; { let acc = 0; for (const w of widths) bounds.push((acc += w) / sumW); }
  const ringOf = q => { let i = 0; while (i < nRings && bounds[i] <= q) i++; return i; };
  const wav = [ri() * 6.28, ri() * 6.28, ri() * 6.28];
  if (irr > 0 && ri() < .6 * Math.min(1, irr)) checks.push({ c: ri() * Math.PI * 2, w: 2.5, to: 1.1 });
  // (the cut's outline, measured once it's built (cutEdge): the rings follow it out at the rim)
  let edgeAt = () => R;
  const cutPaint = p => {
    const a = Math.atan2(p[2], p[0]), E = edgeAt(a), dx = p[0] - heart[0], dz = p[2] - heart[1], q0 = Math.hypot(dx, dz) / E;
    // (the rings round the heart in the middle, round the outline at the rim)
    const f = Math.max(0, 1 - Math.min(1, q0)), qx = p[0] - heart[0] * f, qz = p[2] - heart[1] * f, q = Math.hypot(qx, qz) / E, ah = Math.atan2(dz, dx);
    if (hollow && Math.hypot(dx, dz) < hollow * 1.15) return M.STONED; // the rotted heart
    if (checks.some(k => Math.cos(ah - k.c) > 0 && Math.abs(Math.sin(ah - k.c)) * q * R < (.012 + .012 * q) * k.w && q > .25 / k.w && q < k.to)) return M.STONED; // a check, splitting out from the heart
    if (v.moss && p[2] < -R * .55 && q > .75 && cellHash(p, 12, 44) < v.moss * .7 * (q - .6)) return M.MOSS;
    if (v.frost && q > .55 && cellHash(p, 16, 45) < v.frost * (q - .45)) return M.WEB;
    const wobble = Math.sin(a * 3 + v.seed) * .02 + irr * q * (.03 * Math.sin(a * 2 + wav[0]) + .022 * Math.sin(a * 5 + wav[1]) + .012 * Math.sin(a * 9 + q * 7 + wav[2]));
    return (ringOf(q + wobble) & 1) && q < 1.05 ? M.ACCENT : undefined;
  };
  const big = R * 4;
  m.box(v3.add([0, h, 0], v3.mul(tilt, big)), [big, big, big], M.BELLY, { dir: [1, 0, 0], up: tilt, cut: true, group: 1, paint: cutPaint });
  m.parts[m.parts.length - 1].skip = true; // (the cut itself: its outline's measured just under it, stumpCut)
  for (let i = 0; i < v.slabs; i++) { // a slab: everything one side of a line, a little lower
    const a = i / v.slabs * Math.PI * 2 + r() * .9, n = [Math.cos(a), 0, Math.sin(a)], drop = v.slabDrop * K * (.5 + r());
    m.box(v3.add(v3.add([0, h - drop, 0], v3.mul(n, R * (.35 + r() * .3) + big)), [0, big, 0]), [big, big, big], M.BELLY, { dir: n, up: [0, 1, 0], cut: true, group: 1, paint: cutPaint });
    m.parts[m.parts.length - 1].skip = true;
  }
  if (hollow) { m.ell([heart[0], h, heart[1]], [hollow, Math.min(h * .8, hollow), hollow], M.STONED, { cut: true, group: 1 }); m.parts[m.parts.length - 1].skip = true; }
  // the roots: out of the flare along the ground, in short straight runs with a kink between, branching, diving under the earth
  // and surfacing further out; a mangrove's arch from high on its trunk down into the ground
  const reach = v.spread * K * .5;
  const root = (x0, z0, a0, y0, len, girth, depth, k) => {
    const pts = [], seg = .55 * K, n = Math.max(3, Math.ceil(len / seg)), dives = G.stilts || depth > 1 ? [] : [[.38 + r() * .22, .09 + r() * .07], [.72 + r() * .12, .07 + r() * .05]].filter(() => r() < v.dives);
    const branchAt = depth ? [] : [...(r() < .7 ? [.3 + r() * .2] : []), ...(r() < v.branch * .6 ? [.55 + r() * .15] : [])];
    let x = x0, z = z0, a = a0, buried = null;
    for (let i = 0; i <= n; i++) {
      const t = i / n, w = girth * (1 - t * .5) * (.9 + .2 * Math.sin(i * 1.7 + k));
      let y;
      if (G.stilts) y = y0 * Math.cos(t * Math.PI / 2) + girth * .6 * Math.sin(t * Math.PI) - (t > .9 ? (t - .9) * 8 * w : 0);
      else {
        y = y0 * (1 - t) ** 2.5 + w * .25 * Math.sin(t * Math.PI * (2 + (k % 3))) * (1 - t) - (t > .85 ? (t - .85) * 5 * w : 0) - w * .45; // half sunk: its back above the earth
        for (const [c, wd] of dives) y -= 2 * w * Math.max(0, 1 - Math.abs(t - c) / wd);
      }
      pts.push([x, y, z, w]);
      // the earth heaved over a buried run: a low ridge in the floor's own tones
      if (y < -w * .8) { if (!buried) buried = [x, z]; } else if (buried) { const mx = (buried[0] + x) / 2, mz = (buried[1] + z) / 2, l = Math.hypot(x - buried[0], z - buried[1]) / 2 + w; m.ell([mx, 0, mz], [l, w * .35, w * 1.3], M.BODY2, { dir: v3.norm([x - buried[0] + 1e-6, 0, z - buried[1]]), up: [0, 1, 0], group: 20 + (k % 50), paint: p => cellHash(p, 9, 46) < .3 ? M.BODY : undefined }); buried = null; }
      if (branchAt.length && t >= branchAt[0]) { branchAt.shift(); root(x, z, a + (r() < .5 ? 1 : -1) * (.4 + r() * .4), Math.max(0, y + w * .45), len * (1 - t) * (.6 + r() * .4), w * .62, depth + 1, k * 7 + i); }
      if (i % 2 === 1) a += (r() - .5) * .5;
      x += Math.cos(a) * seg; z += Math.sin(a) * seg;
    }
    m.chain(pts, M.TRUNK, { group: 2 + depth, rough: .008, paint: p => cellHash(p, 10, 47) < .12 ? M.BARKL : cellHash(p, 16, 49) < .22 ? M.BARKD : (v.moss && p[1] > 0 && cellHash(p, 5, 48) < v.moss * .35 ? M.MOSS : undefined) });
  };
  for (let i = 0; i < v.roots; i++) {
    const main = i < nL, a = main ? lobes[i].a + (r() - .5) * .3 : r() * Math.PI * 2, start = R * (G.stilts ? .6 : main ? 1 + lobes[i].A * .9 : .95);
    const len = (reach - start) * (G.stilts ? .45 + r() * .3 : (.6 + r() * .4) * (main ? 1 : .6));
    root(Math.cos(a) * start, Math.sin(a) * start, a, G.stilts ? lift * (.8 + r() * .5) : h * .18, len, v.rootGirth * K * (G.stilts ? 1 : main ? 1 : .7), 0, i + 1);
  }
  m.clipY = 0; // (what's under the ground isn't drawn: the roots' buried runs, the earth's)
  const cut = cutOutline(m, h, R);
  edgeAt = a => { const u = ((a / (Math.PI * 2)) * CUT_ANGLES % CUT_ANGLES + CUT_ANGLES) % CUT_ANGLES, i = Math.floor(u), t = u - i; return cut[i] * (1 - t) + cut[(i + 1) % CUT_ANGLES] * t; };
  return { R, cut, heart };
}

// The cut's outline (model units, at CUT_ANGLES angles from +x towards +z): the trunk's solid (group 1, carved by its notches and
// shaved sides but not by the saw's cut itself) just under the cut, from outside in.
function cutOutline(m, h, R) {
  const y = h - .03, out = [], step = R * .06;
  for (let i = 0; i < CUT_ANGLES; i++) {
    const a = i / CUT_ANGLES * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), f = q => m.groupField(1, [c * q, y, s * q]);
    let q = R * 2.2;
    while (q > step && f(q) > 0) q -= step;
    let lo = q, hi = q + step; // (inside at lo, outside at hi)
    for (let k = 0; k < 10; k++) { const mid = (lo + hi) / 2; if (f(mid) > 0) hi = mid; else lo = mid; }
    out.push(lo);
  }
  return out;
}

// A stump's variant: its genome's draw for its seed, and o.irregular (runeMarkers.stump.irregular).
function stumpVariant(species, o) {
  const v = propVariant(species, o.seed ?? 0, o, STUMP_GENOMES);
  for (const k of ["lift", "slabDrop"]) if (v[k] === undefined) v[k] = 0;
  v.irregular = o.irregular ?? 0;
  return v;
}

/** A stump's cut's outline on the ground (Ed, 2026-10-29: "The area in which I can cast the soundsystem spell should be the whole
 *  trunk (cut part, not the roots)"): its radius (m) round its middle at CUT_ANGLES even angles from east towards the camera (+z) as it
 *  lies in the game, seen from o.yaw (as stumpPiece draws it), mirrored with `flip` (the view's: render/markers.ts stumpDeal). Built
 *  as stumpPiece builds it, not drawn: for the rules (rules/stumps.ts). */
export function stumpCut(species, o = {}, flip = false) {
  const G = STUMP_GENOMES[species]; if (!G) throw new Error(`no stump species "${species}"`);
  const v = stumpVariant(species, o), { cut } = build(new Model({ blend: .18 }), v, G), yaw = o.yaw ?? v.r() * Math.PI * 2;
  const at = a => { const u = ((a / (Math.PI * 2)) * CUT_ANGLES % CUT_ANGLES + CUT_ANGLES) % CUT_ANGLES, i = Math.floor(u), t = u - i; return cut[i] * (1 - t) + cut[(i + 1) % CUT_ANGLES] * t; };
  // (the model turned by yaw, as drawn: a world angle A is the model's A - yaw; mirrored, A is PI - A)
  return [...Array(CUT_ANGLES).keys()].map(i => { const A = i / CUT_ANGLES * Math.PI * 2; return +(at((flip ? Math.PI - A : A) - yaw) / SU).toFixed(3); });
}

/** One stump: species (a STUMP_GENOMES key), o.seed (its shape and colours), o.yaw (the angle it's seen from, radians; seeded when
 *  not given). Returns its sprite, colours, size, the cut's middle on the sprite (`top`, px from its top-left), its root area's outline (`roots`), how
 *  far its rows reach over the ground (`depth`) and its variant. */
export function stumpPiece(species, o = {}, def = null, st = {}, ppm = 16) {
  const G = STUMP_GENOMES[species]; if (!G) throw new Error(`no stump species "${species}"`);
  const v = stumpVariant(species, o);
  { const b = String(st.biome ?? "").split(/[/|]/)[0]; if (v.frost && def && b !== "cold" && b !== "mountains and glaciers" && !def.snow) v.frost = 0; } // (frost only where it snows)
  const m = new Model({ blend: .18 });
  const { R, cut } = build(m, v, G), yaw = o.yaw ?? v.r() * Math.PI * 2;
  const px = witchPixelsPerUnit(st), { sp: raw, project } = render(m, { scale: px, yaw, lineGap: .3 });
  const top0 = project([0, v.height * SU, 0]), foot0 = project([0, 0, 0]);
  const { sp, x0 = 0, y0 = 0 } = cropTight(raw);
  // The root area's outline round the rings' middle (Ed, 2026-10-29: the analyser's bars "should be long enough that they fill the whole
  // root area, not just the cut trunk circle"): its radius (art pixels across, as the sprite's width) at ROOT_ANGLES angles on the
  // ground, from east round towards the camera (+z, south in the game): the farthest pixel of it that way as it lies, the envelope
  // of its roots (each angle the most of its neighbours within an eighth of a turn, smoothed), so the bars reach out over the roots
  // and the gaps between them alike
  const far = [];
  for (let i = 0; i < ROOT_ANGLES; i++) {
    const a = i / ROOT_ANGLES * Math.PI * 2 - yaw, c = Math.cos(a), s = Math.sin(a); // (the model turned by yaw: render's toWorld)
    let f = 0;
    for (let q = 0; q < v.spread * SU * .6; q += .01) { // (on the cut's plane: the game lays the picture on the ground by its cut's middle)
      const [sx, sy] = project([c * q, v.height * SU, s * q]), x = Math.round(sx - x0 - .5), y = Math.round(sy - y0 - .5);
      if (x >= 0 && y >= 0 && x < sp.w && y < sp.h && sp.m[y * sp.w + x]) f = q;
    }
    far.push(Math.max(f, R));
  }
  const W = Math.round(ROOT_ANGLES / 8), at = i => far[(i % ROOT_ANGLES + ROOT_ANGLES) % ROOT_ANGLES];
  const env = far.map((_, i) => { let m = 0; for (let d = -W; d <= W; d++) m = Math.max(m, at(i + d)); return m; });
  const roots = env.map((_, i) => +((env[(i + ROOT_ANGLES - 1) % ROOT_ANGLES] + 2 * env[i] + env[(i + 1) % ROOT_ANGLES]) / 4 * px).toFixed(1));
  cleanFlecks(sp);
  const r = rng((v.seed * 7919 + 29) >>> 0), C = G.colour, k = C.spread, g = def?.floor ? groundColours(def, st) : null;
  // fitted to its area (def): its bark its main tree's (treeColours, the biome's look over it, as the area's own trees are coloured:
  // art/areas.js prop), a smooth-barked kind's smooth bark (beech, rowan, holly...); its moss the area's ground's
  let fit = null;
  if (def && G.fit !== false) {
    const tree = areaMainTree(def), S = tree ? treeSpecies(tree) : null, look = st.biome ? biomeLook(st.biome) : null;
    if (S && STUMP_FOR_TREE[tree]) { const c = treeColours(rng(v.seed * 31 + 7), { ...st, leafHue: def.leaf ?? st.leafHue }, S.fn); biomeColours(c, look, M); fit = { bark: S.trunk ? c[M.BARK2] : c[M.TRUNK], dark: c[M.BARKD], light: c[M.BARKL] }; }
    else if (look) { const c = { [M.TRUNK]: tone(C.bark, r, 0), [M.BARKD]: tone(C.dark, r, 0), [M.BARKL]: tone(C.light, r, 0) }; biomeColours(c, look, M); fit = { bark: c[M.TRUNK], dark: c[M.BARKD], light: c[M.BARKL] }; }
  }
  const mixc = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
  const colours = { [M.TRUNK]: tone(C.bark, r, k), [M.BARKD]: tone(C.dark, r, k), [M.BARKL]: tone(C.light, r, k), [M.BELLY]: tone(C.top, r, k * .5), [M.ACCENT]: tone(C.ring, r, k * .5), [M.STONED]: hsv2rgb(C.dark[0], C.dark[1] * .8, C.dark[2] * .45), [M.MOSS]: tone(C.moss, r, k), [M.WEB]: tone(C.frost ?? [.6, .06, .9], r, k * .3), [M.BODY2]: g ? g[M.BODY2] : hsv2rgb(.08, .4, .22), [M.BODY]: g ? g[M.BODY] : hsv2rgb(.08, .35, .3), [M.LINE]: hsv2rgb(C.dark[0], C.dark[1], C.dark[2] * .55) };
  if (fit) { colours[M.TRUNK] = mixc(colours[M.TRUNK], fit.bark, .7); colours[M.BARKD] = mixc(colours[M.BARKD], fit.dark, .7); colours[M.BARKL] = mixc(colours[M.BARKL], fit.light, .7); colours[M.LINE] = mixc(colours[M.LINE], fit.dark.map(c => c * .6), .7); }
  if (g && g[M.MOSS]) colours[M.MOSS] = mixc(colours[M.MOSS], g[M.MOSS], .6);
  const { r: _r, ...variant } = v;
  return { sp, colours, metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1), radius: +(R / SU).toFixed(1) }, top: { x: top0[0] - x0, y: top0[1] - y0 }, origin: { x: foot0[0] - x0, y: foot0[1] - y0 }, roots, depth: +(1 / Math.sin(PITCH)).toFixed(4), yaw, variant };
}

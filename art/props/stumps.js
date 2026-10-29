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
//   stumpPiece(species, { seed, yaw }, def, st): { sp, colours, metres, top, origin, yaw, variant } (top: the cut's middle on the
//   sprite, origin: the ground under it, px from its top-left)
import { M, hsv2rgb, rng, cellHash, cropTight } from "../core.js";
import { Model, render, v3 } from "../model3d.js";
import { witchPixelsPerUnit, cleanFlecks } from "../witch.js";
import { propVariant } from "./generator.js";
import { groundColours } from "../ground.js";

const SU = 1 / 1.9; // model units a metre (as the prop generator's PR_U)
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
    roots: [5, 7], rootGirth: [0.68, 1.02], branch: .5, dives: .6, slabs: [2, 3], slabDrop: [.05, .15], hollow: [.08, .25], cracks: [5, 9], moss: 0,
    colour: { bark: [.1, .08, .46], dark: [.08, .12, .28], light: [.1, .05, .62], top: [.1, 0.06, 0.57], ring: [.08, .16, .5], moss: [.2, .3, .5], spread: .03 },
  },
};
// The species each biome grows (art/flora/biomes.js BIOME_LOOKS' keys).
export const STUMP_FOR_BIOME = { temperate: "oak", "cold rainforest": "cedar", cold: "spruce", "mountains and glaciers": "pine", jungle: "kapok", volcanic: "charred", "mangrove swamp": "mangrove", hot: "baobab", badlands: "juniper" };
export const stumpSpecies = biome => STUMP_FOR_BIOME[String(biome ?? "").split("/")[0]] ?? "oak";

// A colour from its [h, s, v], spread a little by the seed.
const tone = (c, r, k) => hsv2rgb(((c[0] + (r() - .5) * k * .5) % 1 + 1) % 1, Math.max(0, Math.min(1, c[1] + (r() - .5) * k)), Math.max(0, Math.min(1, c[2] + (r() - .5) * k * 1.5)));

function build(m, v, G) {
  const r = v.r, K = SU, h = v.height * K, lift = (v.lift ?? 0) * K, nL = v.lobes, tw = G.twist ?? 0;
  // the lobes: each a buttress from the trunk's middle out to its foot, fused with the core (one group: a smooth union)
  const lobes = [...Array(nL).keys()].map(i => ({ a: i / nL * Math.PI * 2 + (r() - .5) * Math.PI * 1.1 / nL, A: v.lobe * (.75 + r() * .5) }));
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
  // the cut: sawn flat long ago, a little out of level; on a pine, charred or juniper stump in slabs the saw left at different heights
  const tilt = v3.norm([(r() - .5) * .05, 1, (r() - .5) * .05]), hollow = v.hollow * R, nRings = 16 + Math.floor(r() * 10);
  const checks = [...Array(v.cracks).keys()].map(() => r() * Math.PI * 2);
  const cutPaint = p => {
    const q = Math.hypot(p[0], p[2]) / R, a = Math.atan2(p[2], p[0]);
    if (hollow && q * R < hollow * 1.15) return M.STONED; // the rotted heart
    if (checks.some(c => Math.cos(a - c) > 0 && Math.abs(Math.sin(a - c)) * q * R < .012 + .012 * q && q > .25 && q < .2 + .8 * ((c * 7) % 1))) return M.STONED; // a check, splitting out from the heart
    if (v.moss && p[2] < -R * .55 && q > .75 && cellHash(p, 12, 44) < v.moss * .7 * (q - .6)) return M.MOSS;
    if (v.frost && q > .55 && cellHash(p, 16, 45) < v.frost * (q - .45)) return M.WEB;
    return (Math.floor((q + Math.sin(a * 3 + v.seed) * .02) * nRings) & 1) && q < 1.05 ? M.ACCENT : undefined;
  };
  const big = R * 4;
  m.box(v3.add([0, h, 0], v3.mul(tilt, big)), [big, big, big], M.BELLY, { dir: [1, 0, 0], up: tilt, cut: true, group: 1, paint: cutPaint });
  for (let i = 0; i < v.slabs; i++) { // a slab: everything one side of a line, a little lower
    const a = i / v.slabs * Math.PI * 2 + r() * .9, n = [Math.cos(a), 0, Math.sin(a)], drop = v.slabDrop * K * (.5 + r());
    m.box(v3.add(v3.add([0, h - drop, 0], v3.mul(n, R * (.35 + r() * .3) + big)), [0, big, 0]), [big, big, big], M.BELLY, { dir: n, up: [0, 1, 0], cut: true, group: 1, paint: cutPaint });
  }
  if (hollow) m.ell([0, h, 0], [hollow, Math.min(h * .8, hollow), hollow], M.STONED, { cut: true, group: 1 });
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
  return R;
}

/** One stump: species (a STUMP_GENOMES key), o.seed (its shape and colours), o.yaw (the angle it's seen from, radians; seeded when
 *  not given). Returns its sprite, colours, size, the cut's middle on the sprite (`top`, px from its top-left) and its variant. */
export function stumpPiece(species, o = {}, def = null, st = {}, ppm = 16) {
  const G = STUMP_GENOMES[species]; if (!G) throw new Error(`no stump species "${species}"`);
  const v = propVariant(species, o.seed ?? 0, o, STUMP_GENOMES);
  for (const k of ["lift", "slabDrop"]) if (v[k] === undefined) v[k] = 0;
  const m = new Model({ blend: .18 });
  const R = build(m, v, G), yaw = o.yaw ?? v.r() * Math.PI * 2;
  const { sp: raw, project } = render(m, { scale: witchPixelsPerUnit(st), yaw, lineGap: .3 });
  const top0 = project([0, v.height * SU, 0]), foot0 = project([0, 0, 0]);
  const { sp, x0 = 0, y0 = 0 } = cropTight(raw);
  cleanFlecks(sp);
  const r = rng((v.seed * 7919 + 29) >>> 0), C = G.colour, k = C.spread, g = def?.floor ? groundColours(def, st) : null;
  const colours = { [M.TRUNK]: tone(C.bark, r, k), [M.BARKD]: tone(C.dark, r, k), [M.BARKL]: tone(C.light, r, k), [M.BELLY]: tone(C.top, r, k * .5), [M.ACCENT]: tone(C.ring, r, k * .5), [M.STONED]: hsv2rgb(C.dark[0], C.dark[1] * .8, C.dark[2] * .45), [M.MOSS]: tone(C.moss, r, k), [M.WEB]: tone(C.frost ?? [.6, .06, .9], r, k * .3), [M.BODY2]: g ? g[M.BODY2] : hsv2rgb(.08, .4, .22), [M.BODY]: g ? g[M.BODY] : hsv2rgb(.08, .35, .3), [M.LINE]: hsv2rgb(C.dark[0], C.dark[1], C.dark[2] * .55) };
  const { r: _r, ...variant } = v;
  return { sp, colours, metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1), radius: +(R / SU).toFixed(1) }, top: { x: top0[0] - x0, y: top0[1] - y0 }, origin: { x: foot0[0] - x0, y: foot0[1] - y0 }, yaw, variant };
}

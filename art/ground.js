// The ground generator (#119): each area's floor tile grown from a genome, in the stamp language the plants use. The prototype
// repeats a tile across the area (src/render/ground.ts) and reads only its albedo, so all the lighting is in the tones: every
// stamp is lit from the upper left in its three tones (dark, mid, light), and nothing is a lone pixel.
//
// A genome (GROUND_GENOMES, by the area's floor kind; an area's own `ground` merges over it):
//   base     the ground itself: wrapping noise in three tones (BODY2 dark, BODY, BELLY light); scale: the noise's size in
//            pixels [x, y]; cuts: where dark gives way to mid and mid to light
//   patches  blotches of another ground lying on it ({ mat, n, r: [min, max] }): moss on stone, bare earth in grass
//   puddles  little pools ({ n, r: [min, max] }): WATER, a dark rim on their near side and a glint
//   details  the scatter: [{ stamp, n, mats: [dark, mid, light] }], stamps from GR_STAMPS below
// groundTile(def, st, variant): the tile. The base noise wraps at the edges and is the same in every variant, and every
// patch, puddle and detail stays inside the tile, so any variant sits next to any other without a seam.
import { M, Sprite, hsv2rgb, vnoise, rng, hash2, matOf } from "./core.js";

// Stamps: [dx, dy, tone] (0 dark, 1 mid, 2 light) round their anchor, lit from the upper left. size: from the detail's
// size (1 default), r: a random stream for their own variety.
const grLine = (pts, tone) => pts.map(([x, y], i) => [x, y, typeof tone === "function" ? tone(i, pts.length) : tone]);
const GR_STAMPS = {
  blade: (r, k = 1) => { const h = Math.max(1, Math.round((1 + r() * 2) * k)); return grLine(Array.from({ length: h }, (_, i) => [0, -i]), (i, n) => (i === n - 1 && n > 1 ? 2 : i === 0 ? 0 : 1)); },
  tuft: r => [[-1, 0, 0], [-1, -1, 1], [0, 0, 0], [0, -1, 1], [0, -2, 2], [1, 0, 0], [1, -1, 2]].filter(() => r() < .9),
  tall: r => { const h = 3 + Math.floor(r() * 3), lean = r() < .5 ? -1 : 1; return Array.from({ length: h }, (_, i) => [i > h * .6 ? lean : 0, -i, i === 0 ? 0 : i > h - 2 ? 2 : 1]); },
  needle: r => { const d = r() < .5 ? 1 : -1; return [[0, 0, 1], [d, 0, 1], [2 * d, 1, 0]]; },
  twig: r => { const L = 4 + Math.floor(r() * 3), d = r() < .5 ? 1 : -1; return Array.from({ length: L }, (_, i) => [i * d, Math.floor(i / 3), i % 3 === 0 ? 2 : 1]); },
  root: r => { const L = 6 + Math.floor(r() * 4), d = r() < .5 ? 1 : -1; return Array.from({ length: L }, (_, i) => [[i * d, Math.round(Math.sin(i * .7)), 1], [i * d, Math.round(Math.sin(i * .7)) + 1, 0]]).flat(); },
  pebble: r => (r() < .5 ? [[0, 0, 2], [1, 0, 1], [0, 1, 1], [1, 1, 0]] : [[0, 0, 2], [1, 0, 2], [2, 0, 1], [0, 1, 1], [1, 1, 1], [2, 1, 0]]),
  slab: r => { const w = 4 + Math.floor(r() * 2), out = []; for (let x = 0; x < w; x++) { out.push([x, 0, 2], [x, 1, x < w - 1 ? 1 : 0], [x, 2, 0]); } return out; },
  clod: r => { const w = 3 + Math.floor(r() * 2), out = []; for (let x = 0; x < w; x++) { out.push([x, 0, x === 0 ? 2 : 1], [x, 1, 0]); } return out; },
  leaf: r => (r() < .5 ? [[0, 0, 2], [1, 0, 1], [1, 1, 0]] : [[0, 0, 1], [1, 0, 2], [0, 1, 0]]),
  moss: r => [[0, -1, 2], [1, -1, 1], [-1, 0, 1], [0, 0, 1], [1, 0, 1], [2, 0, 0], [0, 1, 0], [1, 1, 0]].filter((_, i) => i !== 5 || r() < .5),
  flower: () => [[0, 0, 0], [0, -1, 1], [0, -2, 2], [1, -2, 2]],
  clover: () => [[0, -1, 2], [-1, 0, 1], [1, 0, 1], [0, 0, 1], [0, 1, 0]],
  sprig: () => [[0, 0, 0], [0, -1, 0], [-1, -1, 1], [1, -2, 1], [0, -2, 2], [0, -3, 2]],
};
// Each floor kind's genome. mats: material names; "FLOWER" takes the area's flower colour.
const grG = (base, details, more = {}) => ({ base: { scale: [7, 5], cuts: [.38, .64], ...base }, details, patches: [], puddles: null, ...more });
const grD = (stamp, n, mats, size) => ({ stamp, n, mats, ...(size ? { size } : {}) });
const GR_GRASS = ["LEAF3", "LEAF", "LEAF2"], GR_STONES = ["STONED", "STONE", "BELLY"], GR_EARTH = ["BODY2", "BODY", "BELLY"];
export const GROUND_GENOMES = {
  moss: grG({ scale: [9, 6] }, [grD("moss", 26, GR_GRASS), grD("blade", 18, GR_GRASS)], { patches: [{ mat: "MOSS", n: 4, r: [4, 8] }] }),
  needles: grG({}, [grD("needle", 90, ["BODY2", "ACCENT", "ACCENT"]), grD("twig", 4, ["BODY2", "TRUNK", "BARKL"]), grD("pebble", 4, GR_STONES)]),
  mud: grG({ cuts: [.42, .7] }, [grD("clod", 24, GR_EARTH), grD("leaf", 10, ["BODY2", "FLOWER", "FLOWER"])], { puddles: { n: 2, r: [3, 6] } }),
  stony: grG({}, [grD("pebble", 28, GR_STONES), grD("tuft", 22, GR_GRASS)], { patches: [{ mat: "MOSS", n: 3, r: [3, 6] }] }),
  nettles: grG({}, [grD("tuft", 40, GR_GRASS), grD("leaf", 16, GR_GRASS)]),
  leaves: grG({}, [grD("leaf", 90, ["BODY2", "FLOWER", "FLOWER"]), grD("twig", 5, ["BODY2", "TRUNK", "BARKL"])]),
  grass: grG({}, [grD("tuft", 50, GR_GRASS), grD("blade", 30, GR_GRASS), grD("flower", 4, ["LEAF3", "LEAF", "FLOWER"])]),
  lawn: grG({ cuts: [.36, .66] }, [grD("blade", 60, GR_GRASS, .6)]),
  plants: grG({}, [grD("tuft", 36, GR_GRASS), grD("clover", 26, GR_GRASS)]),
  roots: grG({}, [grD("root", 6, ["BODY2", "TRUNK", "BARKL"]), grD("pebble", 10, GR_STONES), grD("moss", 8, GR_GRASS)], { patches: [{ mat: "MOSS", n: 3, r: [3, 6] }] }),
  slate: grG({ scale: [10, 4] }, [grD("slab", 9, GR_STONES), grD("pebble", 18, GR_STONES)]),
  tallgrass: grG({}, [grD("tall", 60, GR_GRASS), grD("tuft", 20, GR_GRASS)]),
  flowers: grG({}, [grD("tuft", 36, GR_GRASS), grD("flower", 40, ["LEAF3", "LEAF", "FLOWER"])]),
  pebbles: grG({}, [grD("pebble", 65, GR_STONES), grD("blade", 10, GR_GRASS)]),
  scree: grG({ scale: [6, 4] }, [grD("pebble", 50, GR_STONES), grD("slab", 8, GR_STONES)]),
  earth: grG({ cuts: [.42, .68] }, [grD("clod", 18, GR_EARTH), grD("pebble", 14, GR_STONES)]),
  stone: grG({ scale: [10, 7] }, [grD("slab", 8, GR_STONES), grD("pebble", 12, GR_STONES), grD("moss", 6, GR_GRASS)], { patches: [{ mat: "MOSS", n: 4, r: [4, 7] }] }),
  heather: grG({}, [grD("sprig", 60, ["LEAF3", "LEAF", "FLOWER"]), grD("blade", 16, GR_GRASS)]),
  bluebells: grG({}, [grD("flower", 60, ["LEAF3", "LEAF", "FLOWER"]), grD("tuft", 20, GR_GRASS)]),
  clover: grG({}, [grD("clover", 46, GR_GRASS), grD("flower", 8, ["LEAF3", "LEAF", "FLOWER"])]),
};

// The genome an area's floor grows from: its floor kind's, with the area's own `ground` over it.
export function groundGenome(def) {
  const g = GROUND_GENOMES[def.floor[0]] || GROUND_GENOMES.grass, o = def.ground || {};
  return { ...g, ...o, base: { ...g.base, ...(o.base || {}) } };
}

// Each tone in clusters (as the plants' clusterLeaves): a pixel of one of the three takes the one most of its 3 x 3 has.
function grCluster(sp, mats) {
  const { w, h } = sp;
  for (let pass = 0; pass < 2; pass++) {
    const src = sp.m.slice();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, own = mats.indexOf(src[i]); if (own < 0) continue;
      const cnt = [0, 0, 0];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const k = mats.indexOf(src[((y + dy + h) % h) * w + ((x + dx + w) % w)]); if (k >= 0) cnt[k]++; }
      const best = cnt.indexOf(Math.max(...cnt)); if (cnt[best] > cnt[own]) sp.m[i] = mats[best];
    }
  }
}

export function groundTile(def, st, variant = 0, W = 64, H = 48) {
  const [kind, hue, sat, val] = def.floor, g = groundGenome(def), sp = new Sprite(W, H), seed = def.id.length * 131, B = g.base;
  const sty = st.artStyle === "bold" || st.artStyle === "ref", up = [0, -.42, .91];
  // the base: noise that wraps at the tile's edges, so tiles repeat without a seam
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const f = (a, b) => vnoise(a / B.scale[0], b / B.scale[1], seed);
    let n = (f(x, y) * (W - x) * (H - y) + f(x - W, y) * x * (H - y) + f(x, y - H) * (W - x) * y + f(x - W, y - H) * x * y) / (W * H);
    if (variant) { // a variant's own blotches in the middle, fading to the shared base at the edges, so every variant meets every other
      const e = Math.min(x, W - 1 - x, y, H - 1 - y) / 8, k = e >= 1 ? 1 : e * e * (3 - 2 * e);
      n += (vnoise(x / B.scale[0], y / B.scale[1], seed + variant * 977) - vnoise(x / B.scale[0], y / B.scale[1], seed + 3301)) * k;
    }
    sp.px(x, y, n < B.cuts[0] ? M.BODY2 : n > B.cuts[1] ? M.BELLY : M.BODY, ...up);
  }
  if (sty) grCluster(sp, [M.BODY2, M.BODY, M.BELLY]);
  const r = rng(seed * 7 + variant * 7919 + 1), inside = (x, y) => x >= 1 && y >= 1 && x < W - 1 && y < H - 1, set = (x, y, m) => { if (inside(x, y)) sp.px(x, y, m, ...up); };
  // patches and puddles: soft-edged blobs of another ground, kept inside the tile
  const blob = (rx, ry, f) => { const cx = rx + 1 + r() * (W - 2 * rx - 2), cy = ry + 1 + r() * (H - 2 * ry - 2), ph = r() * 9; for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const u = (x + .5 - cx) / rx, v = (y + .5 - cy) / ry, d = u * u + v * v + (vnoise(x / 2, y / 2, ph) - .5) * .5; if (d < 1) f(x, y, u, v, d); } };
  for (const P of g.patches || []) for (let i = 0; i < P.n; i++) { const rx = P.r[0] + r() * (P.r[1] - P.r[0]); blob(rx, rx * .7, (x, y, u, v, d) => set(x, y, d > .7 && v > 0 ? M.BODY2 : u + v < -.6 ? M.LEAF2 : matOf(P.mat))); }
  if (g.puddles) for (let i = 0; i < g.puddles.n; i++) { const rx = g.puddles.r[0] + r() * (g.puddles.r[1] - g.puddles.r[0]); blob(rx, rx * .55, (x, y, u, v, d) => set(x, y, d > .72 && v < 0 ? M.BODY2 : d > .72 ? M.BELLY : u < -.3 && v < -.2 && d < .3 ? M.WEB : M.WATER)); }
  // the scatter: each detail's stamp at random spots inside the tile, its tones lit from the upper left
  for (const Dt of g.details) {
    const mats = Dt.mats.map(matOf), fn = GR_STAMPS[Dt.stamp];
    for (let i = 0; i < Dt.n; i++) {
      const px = fn(r, Dt.size || 1), x0 = Math.floor(r() * W), y0 = Math.floor(r() * H);
      if (!px.every(([dx, dy]) => inside(x0 + dx, y0 + dy))) continue; // inside the tile only, so variants meet without a seam
      if (sp.get(x0, y0) === M.WATER) continue; // nothing in the puddles
      for (const [dx, dy, t] of px) set(x0 + dx, y0 + dy, mats[t]);
    }
  }
  if (sty) sp.stylised = st.artStyle;
  return { sp, colours: groundColours(def, st), genome: g };
}

// The area's ground palette by material (the floor tile's, and for anything that should sit into it: a pool's rim takes
// its mud from BODY2/BODY and its moss from MOSS). Stylised (st.artStyle bold or ref): the ramp hue-shifted, as the plants'.
export function groundColours(def, st) {
  const [kind, hue, sat, val] = def.floor, sty = st.artStyle === "bold" || st.artStyle === "ref";
  const ref = st.artStyle === "ref", sh = sty ? (ref ? .5 : 1) : 0;
  const flower = { flowers: hsv2rgb(.13, .6, .95), bluebells: [90, 110, 230], heather: [180, 90, 170], clover: [240, 235, 240], leaves: hsv2rgb(hue + .02, .65, .6) }[kind] || hsv2rgb(hue, .3, .6);
  const colours = {
    [M.BODY]: hsv2rgb(hue, sat * st.sat, val), [M.BODY2]: hsv2rgb(hue + .02 + .05 * sh, Math.min(1, sat * st.sat * (1.1 + .15 * sh)), val * (.78 - .06 * sh)), [M.BELLY]: hsv2rgb(hue - .02 - .04 * sh, sat * st.sat * (.9 - .2 * sh), Math.min(1, val * (1.15 + .1 * sh))),
    [M.ACCENT]: kind === "needles" ? hsv2rgb(.07, .5, .5) : hsv2rgb(.1, .08, .62), [M.FLOWER]: flower,
    [M.LEAF]: hsv2rgb(def.leaf, .55 * st.sat, .45), [M.LEAF2]: hsv2rgb(def.leaf - .03 - .05 * sh, .5 * st.sat * (1 - .2 * sh), .62 + .06 * sh), [M.LEAF3]: hsv2rgb(def.leaf + .03 + .05 * sh, .6 * st.sat, .3),
    [M.MOSS]: hsv2rgb(def.leaf + .02, .5 * st.sat, .36), [M.TRUNK]: hsv2rgb(st.trunkHue, .4, .3), [M.BARKL]: hsv2rgb(st.trunkHue - .01, .35, .48),
    [M.STONE]: hsv2rgb(.58, .06, .54), /* cool grey, never brighter than the witch in her own light (art director, round 1) */ [M.STONED]: hsv2rgb(.62 + .02 * sh, .1, .38), [M.WATER]: hsv2rgb(.58, .35, Math.max(.16, val * .55)), [M.WEB]: hsv2rgb(.56, .12, .78),
  };
  return colours;
}

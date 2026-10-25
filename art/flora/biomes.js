// Biome looks for the forests (Ed, 2026-10-23: "Design all 8. Consider temperate alongside; they should work as a set." "They're
// still trees in a forest, so they may be scrubby, but it shouldn't feel desolate."; then "No need to mock"): each biome a set of
// cheap changes laid over any species at bake time, never new art: its leaves, bark and moss tinted in RGB after
// treeColours (art/trees.js: its nightGreen squeezes the green hues, so a hue shift there would be lost), the tree builders' own
// knobs nudged (lean, gnarl, scale, hang), snow on the crown (snowCrown), and, for the blob generator's species, crown extras
// (vines, dots). An island blends its two neighbouring biomes by bearing (src/rules/lakeLooks.ts islandBlend, biomeKey):
// `biomeLook(key)`. Its area types' art jobs carry the key (render/artBuild.ts ArtJob, its cache key too), so their trees (art/areas.js
// areaTreeVariants), small trees (artBuild areaTree), bushes and props (areas.js prop) bake in its look; the leaf jitter keeps the
// biome's share (render/view/frameUniforms.ts). Nothing here costs a frame: it all runs once, as an area type's art is baked. A
// temperate island has no key: its art exactly as before. `?biome=<name or key>` puts every area in one look (a tryout).

// leaf: [r, g, b, k] mix every leaf tone toward that colour by k; sat and val after it. lit: the lit tone (LEAF2) mixed toward its
// own colour (new growth, sun-bleaching). bark: the trunk's three tones toward a colour. moss: hanging moss and lichen's colour.
// knobs: added to (lean, gnarl, hang, snow) or multiplied into (scale) the area's tree recipe. crown: blob-generator extras.
// stone: rocks and pebbles (the world decorations' rocks and ruins, the tufts' pebbles: STONE and STONED) mixed toward it by k.
// jitter: the share of the game's per-tree leaf jitter (render/sprites.ts) kept, 0 none (snow and lichen stay white).
export const BIOME_LOOKS = {
  temperate: { name: "Temperate", feel: "as the game is: blue-green broadleaf and pine" },
  cold: { name: "Cold (N)", feel: "dark blue-green conifers under snow, pale bark, frost on the moss",
    leaf: [48, 104, 96, .5], sat: .6, val: 1.25, bark: [168, 168, 176, .35], moss: [205, 215, 226], snow: .8, stone: [150, 156, 170, .35], jitter: 0, knobs: { gnarl: .1 } },
  "mountains and glaciers": { name: "Mountains & glaciers (NE)", feel: "grey-green, wind-bent, hung with pale lichen beards, a dusting of snow",
    leaf: [108, 136, 104, .55], sat: .55, val: 1.15, bark: [118, 110, 104, .3], moss: [180, 196, 168], snow: .28, stone: [132, 128, 130, .3], jitter: .3, knobs: { lean: .25, gnarl: .3, hang: .5, scale: .9 } },
  volcanic: { name: "Volcanic (E)", feel: "fertile ash: lush deep emerald on charred black trunks, red new growth catching the lava's glow",
    leaf: [10, 120, 74, .5], sat: 1.35, val: 1, lit: [226, 88, 54, .55], bark: [34, 28, 30, .65], moss: [96, 64, 52], stone: [34, 30, 36, .7], jitter: .5, knobs: { gnarl: .25 } },
  badlands: { name: "Badlands (SE)", feel: "dusty sage and olive scrub, ochre bark, low and twisted but full",
    leaf: [172, 150, 60, .65], sat: .85, val: 1.12, lit: [222, 172, 88, .45], bark: [180, 98, 50, .6], moss: [150, 120, 80], stone: [184, 88, 52, .65], jitter: .6, knobs: { lean: .2, gnarl: .35, scale: .82 } },
  hot: { name: "Hot (S)", feel: "sunlit yellow-olive savanna green, pale sandy bark",
    leaf: [176, 176, 48, .62], sat: 1.05, val: 1.15, lit: [236, 214, 120, .35], bark: [192, 162, 122, .36], moss: [170, 150, 90], stone: [214, 180, 124, .6], jitter: .8, knobs: {} },
  "mangrove swamp": { name: "Mangrove swamp (SW)", feel: "dark glossy olive-teal over wet black-brown roots, grey Spanish moss",
    leaf: [96, 118, 44, .55], sat: .95, val: 1.1, bark: [62, 50, 40, .42], moss: [168, 176, 146], stone: [76, 84, 64, .3], jitter: .6, knobs: { hang: .6 }, trunk: { stilts: { n: [4, 6], at: [.12, .3], reach: [10, 22], w: .35 } } },
  jungle: { name: "Jungle (W)", feel: "vivid saturated emerald, vines hung with flowers, dark wet bark",
    leaf: [20, 150, 64, .55], sat: 1.45, val: 1.15, bark: [72, 56, 40, .2], moss: [80, 130, 70], flower: [236, 84, 150], stone: [88, 96, 70, .25], jitter: .7, knobs: { hang: .25 },
    crown: { vines: { share: .16, len: [10, 26], budEvery: 6, bud: "FLOWER" }, dots: { share: .04, mat: "FLOWER", size: 2 } } },
  "cold rainforest": { name: "Cold rainforest (NW)", feel: "very deep blue-green, every bough furred and hung with bright moss",
    leaf: [20, 96, 80, .5], sat: 1.15, val: .95, bark: [80, 100, 58, .5], moss: [160, 214, 100], stone: [84, 104, 76, .35], jitter: .4, knobs: { hang: .9, gnarl: .15 } },
};
BIOME_LOOKS.rocky = BIOME_LOOKS.volcanic; // (the east's old name: lakeLooks.ts COMPASS)

const NUM = ["sat", "val", "snow", "jitter"], KNOB_ADD = ["lean", "gnarl", "hang"];
const mixArr = (a, b, w) => a && b ? a.map((v, i) => v * w + b[i] * (1 - w)) : a ? a.map((v, i) => i === 3 ? v * w : v) : b ? b.map((v, i) => i === 3 ? v * (1 - w) : v) : undefined;
/** A biome's look, or two blended (`{ a, b, w }`, a's share w): every number mixed by share, crown extras kept at their share; at
 *  strength `s` (Ed, 2026-10-25: "Lower phase non-home biome areas can be semi-temperate looking; higher phase biomes are more
 *  extreme"; its ring's, rules/lakeLooks.ts biomeKey), that look mixed toward temperate's by 1 - s. A key: "a", or "a|b|w", or
 *  "a|b|w|s". */
export function biomeLook(blend) {
  if (typeof blend === "string") { const [a, b = a, w = "1", s = "1"] = blend.split("|"); blend = { a, b, w: +w, s: +s }; } // (a name, or a blend's key: rules/lakeLooks.ts biomeKey)
  if (!blend || (blend.a === "temperate" && blend.b === "temperate")) return null;
  const A = BIOME_LOOKS[blend.a] || BIOME_LOOKS.temperate, B = BIOME_LOOKS[blend.b] || BIOME_LOOKS.temperate, w = blend.w ?? 1, s = Math.max(0, Math.min(1, blend.s ?? 1));
  const look = mixLooks(A, B, w, blend.a === blend.b ? A.name : `${A.name} ${Math.round(w * 100)}% · ${B.name}`);
  return s >= 1 ? look : mixLooks(look, BIOME_LOOKS.temperate, s, `${look.name} at ${Math.round(s * 100)}%`);
}
/** Two looks mixed, A's share w (a look's missing number its temperate value: 1 for sat, val and jitter, else 0). */
function mixLooks(A, B, w, name) {
  const out = { name };
  for (const k of NUM) out[k] = (A[k] ?? (k === "sat" || k === "val" || k === "jitter" ? 1 : 0)) * w + (B[k] ?? (k === "sat" || k === "val" || k === "jitter" ? 1 : 0)) * (1 - w);
  for (const k of ["leaf", "lit", "bark", "stone"]) out[k] = mixArr(A[k], B[k], w);
  for (const k of ["moss", "flower"]) out[k] = A[k] && B[k] ? A[k].map((v, i) => v * w + B[k][i] * (1 - w)) : (w >= .5 ? A[k] : B[k]) || A[k] || B[k];
  const ka = A.knobs || {}, kb = B.knobs || {};
  out.knobs = { scale: (ka.scale ?? 1) * w + (kb.scale ?? 1) * (1 - w) };
  for (const k of KNOB_ADD) out.knobs[k] = (ka[k] ?? 0) * w + (kb[k] ?? 0) * (1 - w);
  const crown = {}; // crown extras at their share of the blend
  for (const [L, s] of [[A, w], [B, 1 - w]]) for (const [k, v] of Object.entries(L.crown || {})) if (s > 0) crown[k] = { ...v, share: (crown[k]?.share ?? 0) + v.share * s };
  if (Object.keys(crown).length) out.crown = crown;
  const trunk = w >= .5 ? A.trunk : B.trunk; if (trunk) out.trunk = trunk;
  return out;
}

/** The share of the game's per-tree leaf jitter a biome (a name or a blend's key) keeps: 1 temperate, 0 the snow's (its
 *  autumn and hue turns would tint snow and lichen; render/view/frameUniforms.ts). Remembered by key. */
const JITTER = new Map();
export function biomeJitter(key) {
  if (!key) return 1;
  let j = JITTER.get(key); if (j === undefined) { j = biomeLook(key)?.jitter ?? 1; JITTER.set(key, j); }
  return j;
}

/** A tree style (an area's `ts`) with a biome's knobs laid over it. */
export function biomeStyle(ts, look) {
  if (!look) return ts;
  const k = look.knobs || {}, o = { ...ts };
  if (k.lean) o.treeLean = (o.treeLean ?? 0) + k.lean;
  if (k.gnarl) o.gnarl = Math.min(1, (o.gnarl ?? 0) + k.gnarl);
  if (k.hang) o.treeHang = Math.min(1, (o.treeHang ?? 0) + k.hang);
  if (look.crown) o.biomeCrown = look.crown;
  if (look.trunk) o.biomeTrunk = look.trunk;
  return o;
}
/** The size a biome grows its trees to. */
export const biomeScale = look => look?.knobs?.scale ?? 1;
/** The snow a biome lays on a crown, over the area's own. */
export const biomeSnow = (look, own = 0) => Math.max(own, look?.snow ?? 0);

const mix = (c, m, k) => [0, 1, 2].map(i => Math.round(c[i] * (1 - k) + m[i] * k));
function satVal(c, s, v) { const l = .3 * c[0] + .59 * c[1] + .11 * c[2]; return c.map(x => Math.max(0, Math.min(255, Math.round((l + (x - l) * s) * v)))); }
/** A tree's colour table (treeColours' and the area's) tinted by a biome, in place. M: the material numbers. flower: false keeps
 *  the table's own flowers and berries (a prop's: a flowerbed, a hedge's berries); stone: true tints its stone too (the world
 *  decorations' rocks, the tufts' pebbles; never snow, ice or the white of a bone, which are other materials). */
export function biomeColours(c, look, M, { flower = true, stone = false } = {}) {
  if (!look) return c;
  for (const m of [M.LEAF, M.LEAF2, M.LEAF3]) if (c[m]) { let x = look.leaf ? mix(c[m], look.leaf, look.leaf[3]) : c[m]; if (m === M.LEAF2 && look.lit) x = mix(x, look.lit, look.lit[3]); c[m] = satVal(x, look.sat ?? 1, look.val ?? 1); }
  if (look.bark) for (const m of [M.TRUNK, M.BARKD, M.BARKL]) if (c[m]) c[m] = mix(c[m], look.bark, look.bark[3]);
  if (stone && look.stone) for (const m of [M.STONE, M.STONED]) if (c[m]) c[m] = mix(c[m], m === M.STONED ? look.stone.map(v => v * .5) : look.stone, look.stone[3]); // (its shade toward the stone's own, half as bright, so a rock keeps its shading)
  if (look.moss && c[M.MOSS]) c[M.MOSS] = look.moss.slice(0, 3);
  if (flower && look.flower) c[M.FLOWER] = look.flower.slice(0, 3);
  return c;
}

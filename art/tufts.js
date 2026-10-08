// Ground cover and wind (for the prototype's rendering): tiny tufts scattered thickly over an area's floor, and a
// per-pixel sway mask for everything leafy, so a shader can move leaves and leave trunks and rocks still.
//
// tuftSprites(areaId, style): the area's tufts, each 8 to 12 art pixels, in its own palette: [{ kind, weight, sp, colours }]
//   (bake with bake(); bakeTufts() does it, with each tuft's sway mask). Kinds: grass (short), longgrass, fern, heather,
//   rushes, moss, clover, needles, litter (fallen leaves), pebbles, and the rarer flowers and mushrooms. weight is its share
//   of the area's tufts (they add up to 1): the common ones high, the rare ones a few in a hundred.
// swayMask(sp) (sway.js): one byte a pixel, 0 for anything rigid (trunk, branch, rock, stone, wood, metal) rising to 255 at the leafy
//   tips: leaves, flowers, grass and reeds sway more the higher they stand above the sprite's foot and the nearer they are to
//   its silhouette; thin twigs a little; the rest not at all. bakeSway(sp) draws it as a grey canvas (R = G = B = the sway,
//   alpha where the sprite has a pixel), the same size as the sprite's albedo, for a parallel texture or atlas channel.
import { M, Sprite, hsv2rgb, hash2, rng, bake, defaultCanvas } from "./core.js";
import { AREA_BY_ID } from "./areas.js";
import { bakeSway } from "./sway.js";

// ---- the tufts ----
// Each draws into a small sprite, its foot on the bottom row; r: a random stream.
const TF_DRAW = {
  grass(sp, r) { const n = 6 + Math.floor(r() * 3); for (let k = 0; k < n; k++) { const x = 1 + r() * (sp.w - 2), h = 3 + r() * 3, lean = (r() - .5) * 2; for (let j = 0; j < h; j++) sp.px(x + lean * j / h, sp.h - 1 - j, j > h * .6 ? M.LEAF2 : j < 2 ? M.LEAF3 : M.LEAF, lean * .1, -.3, .9); } },
  longgrass(sp, r) { const n = 6 + Math.floor(r() * 3); for (let k = 0; k < n; k++) { const x = 1 + r() * (sp.w - 2), h = 7 + r() * 4, lean = (r() - .5) * 4; for (let j = 0; j < h; j++) { const t = j / h; sp.px(x + lean * t * t, sp.h - 1 - j, t > .65 ? M.LEAF2 : t < .25 ? M.LEAF3 : M.LEAF, lean * .1, -.3, .9); } } },
  fern(sp, r) { for (const side of [-1, 1]) { const x0 = sp.w / 2 + side * .5, L = 8 + r() * 2; for (let j = 0; j < L; j++) { const t = j / L, x = x0 + side * t * t * 4, y = sp.h - 1 - j * .85; sp.px(x, y, M.LEAF, side * .2, -.3, .9); if (j % 2 && j > 1) { sp.px(x + side, y + 1, M.LEAF2, side * .4, -.2, .9); sp.px(x - side, y, M.LEAF3, -side * .2, -.2, .9); } } } },
  heather(sp, r) { for (let k = 0; k < 7; k++) { const x = 1 + r() * (sp.w - 2), h = 3 + r() * 3; for (let j = 0; j < h; j++) sp.px(x, sp.h - 1 - j, j > h - 3 ? (hash2(k, j, 3) < .6 ? M.FLOWER : M.LEAF3) : M.LEAF3, 0, -.3, .9); } },
  rushes(sp, r) { for (let k = 0; k < 5; k++) { const x = 1 + r() * (sp.w - 2), h = 8 + r() * 4, lean = (r() - .5) * 2; for (let j = 0; j < h; j++) sp.px(x + lean * j / h, sp.h - 1 - j, j < 3 ? M.LEAF3 : M.LEAF, 0, -.3, .9); if (r() < .5) for (let j = 0; j < 2; j++) sp.px(x + lean, sp.h - 1 - h - j, M.TRUNK, 0, -.5, .85); } },
  moss(sp, r) { for (let k = 0; k < 3; k++) { const cx = 2 + r() * (sp.w - 4), rx = 2 + r() * 1.5, ry = 1.4 + r() * .8; sp.ellipse(cx, sp.h - ry, rx, ry, k % 2 ? M.LEAF2 : M.LEAF, { round: 1 }); } for (let i = 0; i < sp.m.length; i++) if (sp.m[i] && hash2(i, 1, 9) < .15) sp.m[i] = M.LEAF3; },
  clover(sp, r) { for (let k = 0; k < 3; k++) { const cx = 1.5 + k * 3 + r(), cy = sp.h - 2 - r() * 1.5; for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0]]) sp.px(cx + dx, cy + dy, k % 2 ? M.LEAF2 : M.LEAF, dx * .4, dy * .4, .9); sp.px(cx, cy + 1, M.LEAF3, 0, 0, 1); } if (r() < .5) { sp.px(5, sp.h - 4, M.FLOWER, 0, -.5, .85); sp.px(5, sp.h - 3, M.LEAF3, 0, 0, 1); } },
  needles(sp, r) { for (let k = 0; k < 7; k++) { const x = r() * (sp.w - 3), y = sp.h - 1 - r() * 2, dx = r() < .5 ? 1 : -1; for (let j = 0; j < 3; j++) sp.px(x + j, y - (dx > 0 ? j * .5 : 0), k % 3 ? M.TRUNK : M.BARKL, 0, -.5, .85); } },
  litter(sp, r) { for (let k = 0; k < 5; k++) { const x = 1 + r() * (sp.w - 3), y = sp.h - 1 - r() * 2.5; sp.px(x, y, M.LEAF3, 0, -.6, .8); sp.px(x + 1, y, k % 2 ? M.BARKL : M.TRUNK, 0, -.6, .8); sp.px(x + .5, y - 1, M.TRUNK, 0, -.6, .8); } },
  pebbles(sp, r) { for (let k = 0; k < 4; k++) { const cx = 1.5 + r() * (sp.w - 3), rx = .9 + r() * 1.1; sp.ellipse(cx, sp.h - 1.2, rx, rx * .7, k % 2 ? M.STONE : M.STONED, { round: 1 }); } },
  flowers(sp, r) { for (let k = 0; k < 3; k++) { const x = 2 + k * 2.8 + r(), h = 4 + r() * 3; for (let j = 0; j < h; j++) sp.px(x, sp.h - 1 - j, M.LEAF, 0, -.3, .9); sp.px(x, sp.h - 1 - h, M.FLOWER, 0, -.5, .85); sp.px(x + 1, sp.h - 1 - h, M.FLOWER, 0, -.5, .85); sp.px(x, sp.h - h, M.FLOWER, 0, -.5, .85); } },
  mushrooms(sp, r) { for (let k = 0; k < 2; k++) { const x = 2 + k * 4 + r(), h = 2 + Math.floor(r() * 2); for (let j = 0; j < h; j++) sp.px(x, sp.h - 1 - j, M.BELLY, 0, 0, 1); for (let dx = -1; dx <= 1; dx++) sp.px(x + dx, sp.h - 1 - h, M.STONE, dx * .5, -.5, .8); sp.px(x, sp.h - 2 - h, M.STONE, 0, -.7, .7); } },
};
// Stylised (st.artStyle bold or ref, the game's ?style=; docs/ART-GUIDE.md section 0), in the trees' and bushes' stamp language:
// fewer, bigger shapes, each lit from the upper left in three tones (light on the left, shadow on the right and at the foot), no lone
// pixels. A blade is two pixels wide at its foot, one at its tip; a blob is a little lit dome.
const tfBlade = (sp, x, h, lean, tip = M.LEAF2) => { for (let j = 0; j < h; j++) { const t = j / h, xx = x + lean * t * t, y = sp.h - 1 - j; sp.px(xx, y, t > .55 ? tip : M.LEAF, lean * .1, -.3, .9); if (t < .5) sp.px(xx + 1, y, M.LEAF3, .4, -.2, .9); } };
const tfDome = (sp, cx, rx, ry, lit = M.LEAF2, mid = M.LEAF, dark = M.LEAF3) => { for (let y = Math.floor(sp.h - 2 * ry); y < sp.h; y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const u = (x + .5 - cx) / rx, v = (y + .5 - (sp.h - ry)) / ry; if (u * u + v * v > 1) continue; sp.px(x, y, u + v < -.55 ? lit : u + v > .45 || v > .55 ? dark : mid, u * .5, v * .5, .8); } };
const TF_STYL = {
  grass(sp, r) { for (let k = 0; k < 4; k++) tfBlade(sp, 1 + k * 2.2 + r(), 3.5 + r() * 2.5, (r() - .5) * 2); },
  longgrass(sp, r) { for (let k = 0; k < 4; k++) tfBlade(sp, 1 + k * 2.2 + r(), 7 + r() * 4, (r() - .5) * 4); },
  rushes(sp, r) { for (let k = 0; k < 3; k++) { const x = 1.5 + k * 2.8 + r(), h = 9 + r() * 3, lean = (r() - .5) * 1.5; tfBlade(sp, x, h, lean, M.LEAF); if (k !== 1) for (let j = 0; j < 2; j++) { sp.px(x + lean, sp.h - 1 - h - j, M.TRUNK, 0, -.5, .85); sp.px(x + lean + 1, sp.h - 1 - h - j, M.TRUNK, .3, -.5, .85); } } },
  fern(sp, r) { for (const side of [-1, 1]) { const x0 = sp.w / 2 + side * .5, L = 8 + r() * 2; for (let j = 0; j < L; j++) { const t = j / L, x = x0 + side * t * t * 4, y = sp.h - 1 - j * .85, lit = side < 0; sp.px(x, y, lit ? M.LEAF : M.LEAF3, side * .2, -.3, .9); if (j % 3 === 1 && j > 1) { sp.px(x + side, y + 1, lit ? M.LEAF2 : M.LEAF, side * .4, -.2, .9); sp.px(x + side * 2, y + 1, lit ? M.LEAF2 : M.LEAF, side * .4, -.2, .9); } } } },
  heather(sp, r) { for (let k = 0; k < 2; k++) { const cx = 2.6 + k * 4.6 + r() * .6; tfDome(sp, cx, 2.6, 3, M.LEAF, M.LEAF3, M.LEAF3); for (let dx = -1; dx <= 1; dx++) for (let dy = 0; dy < 2; dy++) if (hash2(k, dx * 3 + dy, 5) < .7) sp.px(cx + dx - .5, sp.h - 6 + dy, M.FLOWER, 0, -.4, .85); } },
  moss(sp, r) { tfDome(sp, 3 + r(), 2.8, 1.9); tfDome(sp, 6.8 + r(), 2.4, 1.5); },
  clover(sp, r) { for (let k = 0; k < 3; k++) { const cx = 1.5 + k * 3 + r(), cy = sp.h - 2; for (const [dx, dy, m] of [[0, -1, M.LEAF2], [-1, 0, M.LEAF2], [1, 0, M.LEAF], [0, 0, M.LEAF], [1, -1, M.LEAF]]) sp.px(cx + dx, cy + dy, m, dx * .4, dy * .4, .9); sp.px(cx, cy + 1, M.LEAF3, 0, 0, 1); } if (r() < .5) { sp.px(5, sp.h - 4, M.FLOWER, 0, -.5, .85); sp.px(6, sp.h - 4, M.FLOWER, 0, -.5, .85); } },
  needles(sp, r) { for (let k = 0; k < 4; k++) { const x = (k % 2) * 4 + r() * 2, y = sp.h - 1 - (k < 2 ? 0 : 1.6) - r() * .4; for (let j = 0; j < 4; j++) sp.px(x + j, y - (k % 2 ? j * .4 : 0), j < 2 ? M.BARKL : M.TRUNK, 0, -.5, .85); } },
  litter(sp, r) { for (let k = 0; k < 3; k++) { const x = 1 + k * 3 + r(), y = sp.h - 2 - r(), m = [M.LEAF3, M.TRUNK, M.BARKL][k % 3]; sp.px(x, y, m, 0, -.6, .8); sp.px(x + 1, y, m, 0, -.6, .8); sp.px(x, y + 1, M.TRUNK, 0, -.3, .9); sp.px(x + 1, y + 1, m === M.BARKL ? M.TRUNK : m, 0, -.3, .9); } },
  pebbles(sp, r) { for (let k = 0; k < 2; k++) { const cx = 2.6 + k * 4.6 + r() * .6, rx = 2 + r() * .5; tfDome(sp, cx, rx, 1.5, M.STONE, M.STONE, M.STONED); } },
  flowers(sp, r) { for (let k = 0; k < 2; k++) { const x = 2.5 + k * 4 + r(), h = 4 + r() * 3; for (let j = 0; j < h; j++) sp.px(x, sp.h - 1 - j, j < 2 ? M.LEAF3 : M.LEAF, 0, -.3, .9); for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0]]) sp.px(x + dx, sp.h - 2 - h + dy, M.FLOWER, dx * .4, -.5, .85); } },
  mushrooms(sp, r) { for (let k = 0; k < 2; k++) { const x = 2.5 + k * 4 + r(), h = 2 + Math.floor(r() * 2); for (let j = 0; j < h; j++) sp.px(x, sp.h - 1 - j, M.BELLY, 0, 0, 1); for (let dx = -1; dx <= 2; dx++) sp.px(x + dx, sp.h - 1 - h, dx > 0 ? M.STONED : M.STONE, dx * .5, -.5, .8); sp.px(x, sp.h - 2 - h, M.STONE, 0, -.7, .7); sp.px(x + 1, sp.h - 2 - h, M.STONE, .3, -.7, .7); } },
};
const TF_SIZE = { grass: [10, 7], longgrass: [10, 12], fern: [11, 9], heather: [10, 7], rushes: [9, 13], moss: [10, 4], clover: [10, 5], needles: [10, 3], litter: [10, 4], pebbles: [10, 3], flowers: [10, 9], mushrooms: [9, 5] };
// Each floor's mix: [kind, weight]. The rare ones (flowers, mushrooms) are a few in a hundred.
const TF_MIX = {
  moss: [["moss", .4], ["grass", .25], ["rushes", .15], ["longgrass", .14], ["mushrooms", .03], ["flowers", .03]],
  needles: [["needles", .45], ["fern", .2], ["moss", .2], ["grass", .1], ["mushrooms", .05]],
  mud: [["litter", .35], ["grass", .25], ["rushes", .2], ["moss", .15], ["mushrooms", .05]],
  stony: [["pebbles", .35], ["grass", .35], ["moss", .2], ["flowers", .07], ["mushrooms", .03]],
  nettles: [["longgrass", .45], ["grass", .3], ["litter", .2], ["flowers", .05]],
  leaves: [["litter", .5], ["grass", .2], ["moss", .2], ["mushrooms", .06], ["fern", .04]],
  grass: [["grass", .55], ["longgrass", .2], ["clover", .15], ["flowers", .07], ["mushrooms", .03]],
  lawn: [["grass", .7], ["clover", .22], ["flowers", .08]],
  plants: [["grass", .35], ["fern", .25], ["clover", .25], ["flowers", .1], ["mushrooms", .05]],
  roots: [["moss", .45], ["fern", .2], ["grass", .2], ["mushrooms", .1], ["flowers", .05]],
  slate: [["pebbles", .35], ["needles", .25], ["moss", .25], ["grass", .15]],
  tallgrass: [["longgrass", .55], ["grass", .3], ["flowers", .1], ["mushrooms", .05]],
  flowers: [["grass", .4], ["longgrass", .2], ["flowers", .3], ["clover", .1]],
  pebbles: [["pebbles", .45], ["grass", .3], ["rushes", .15], ["moss", .1]],
  scree: [["pebbles", .55], ["moss", .25], ["grass", .15], ["flowers", .05]],
  earth: [["litter", .45], ["pebbles", .25], ["grass", .2], ["mushrooms", .1]],
  stone: [["moss", .45], ["pebbles", .3], ["fern", .2], ["mushrooms", .05]],
  heather: [["heather", .6], ["grass", .25], ["moss", .1], ["flowers", .05]],
  bluebells: [["flowers", .35], ["grass", .3], ["fern", .2], ["litter", .15]],
  clover: [["clover", .45], ["grass", .35], ["flowers", .15], ["longgrass", .05]],
};
// The area's tufts: [{ kind, weight, sp, colours }].
export function tuftSprites(id, st = {}) {
  const A = AREA_BY_ID[id]; if (!A) throw new Error(`no area type "${id}"`);
  const mix = TF_MIX[A.floor[0]] || TF_MIX.grass, leaf = A.leaf, r = rng(id.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 3) >>> 0);
  const flower = { heather: hsv2rgb(.85, .5, .7), bluebells: hsv2rgb(.68, .55, .8) }[A.floor[0]] || hsv2rgb([.95, .13, .55, .0, .8][Math.floor(leaf * 100) % 5], .55, .9);
  const colours = { [M.LEAF]: hsv2rgb(leaf, .42, .4), [M.LEAF2]: hsv2rgb(leaf - .03, .38, .52), [M.LEAF3]: hsv2rgb(leaf + .03, .5, .26), /* (the night palette: darker, quieter greens) */ [M.FLOWER]: flower, [M.TRUNK]: hsv2rgb(.07, .45, .36), [M.BARKL]: hsv2rgb(.08, .4, .55),
    [M.STONE]: hsv2rgb(.08, .4, .55), [M.STONED]: hsv2rgb(.62, .08, .4), [M.BELLY]: [226, 216, 196] };
  if (A.floor[0] === "slate" || A.floor[0] === "scree" || A.floor[0] === "stony" || A.floor[0] === "pebbles" || A.floor[0] === "stone" || A.floor[0] === "earth") colours[M.STONE] = hsv2rgb(.1, .06, .58); // stones are grey; elsewhere STONE is a mushroom's cap
  const sty = st.artStyle === "bold" || st.artStyle === "ref";
  if (sty) { // the pixel-art ramp, as the trees': the shadow deeper and towards blue-violet, the light paler and towards cream ("ref" keeps one tone family)
    const ref = st.artStyle === "ref"; colours[M.LEAF3] = hsv2rgb(leaf + (ref ? .035 : .07), .72, .26); colours[M.LEAF2] = hsv2rgb(leaf - (ref ? .045 : .08), ref ? .3 : .36, .82);
  }
  return mix.map(([kind, weight]) => { const [w, h] = TF_SIZE[kind], sp = new Sprite(w, h); (sty ? TF_STYL : TF_DRAW)[kind](sp, r); if (sty) sp.stylised = st.artStyle; return { kind, weight, sp, colours: kind === "mushrooms" ? { ...colours, [M.STONE]: hsv2rgb(.04, .6, .6) } : colours }; });
}
// Baked: [{ kind, weight, A, N, S (its sway mask), w, h }].
export function bakeTufts(id, st = {}, makeCanvas = defaultCanvas) {
  return tuftSprites(id, st).map(t => { const b = bake(t.sp, t.colours, st, "none", makeCanvas); return { kind: t.kind, weight: t.weight, A: b.A, N: b.N, S: bakeSway(t.sp, makeCanvas), w: b.w, h: b.h }; });
}

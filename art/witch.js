// The witch (Ed, DESIGN.md): a modern young-adult witch on a broomstick, with headphones,
// sneakers, jeans and a witch's hat as the one classic touch. Built in 3D like the creatures
// (model3d.js): turned towards or away from the viewer, seen from above, three frames of a
// gentle hover bob, and a lean-forward pose for fast flight.
// Outfits: she is made of named parts, each with its own material and colour slot, so an
// unlockable outfit is a palette (and, later, a part swap), not a redraw.
import { M, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";

// Her parts and the material each is drawn in.
export const WITCH_PARTS = { hair: M.HAIR, hat: M.HAT, headphones: M.PHONES, top: M.TOP, jacket: M.JACKET, jeans: M.JEANS, sneakers: M.SHOES, broom: M.BROOM, bristles: M.STRAW, skin: M.SKIN };
// The default outfit: a hue, saturation and value per part. Style knobs override the hues.
export const DEFAULT_OUTFIT = {
  hair: [.01, .7, .85], hat: [.74, .45, .45], headphones: [.92, .55, .9], top: [.13, .15, .95], jacket: [.72, .45, .7],
  jeans: [.6, .5, .7], sneakers: [.0, .0, .95], broom: [.08, .55, .55], bristles: [.12, .55, .9], skin: [.07, .3, .94],
};
export function witchColours(st, outfit = DEFAULT_OUTFIT) {
  const o = { ...DEFAULT_OUTFIT, ...outfit }, hue = { hair: st.hairHue, jacket: st.cloakHue, hat: st.hatHue, top: st.topHue, jeans: st.jeansHue, sneakers: st.shoeHue, headphones: st.phonesHue };
  const c = {}; for (const [part, mat] of Object.entries(WITCH_PARTS)) { const [h, s, v] = o[part]; c[mat] = hsv2rgb(hue[part] ?? h, s, v); }
  c[M.EYE] = [24, 18, 30]; c[M.GLINT] = [255, 255, 245]; c[M.NOSE] = [20, 16, 24]; c[M.MAGIC] = hsv2rgb(st.glowHue ?? .13, .5, 1); c[M.MAGIC2] = hsv2rgb(st.glowHue ?? .13, .15, 1);
  c[M.BELLY] = [245, 245, 240]; // sneaker soles, headphone band highlights
  return c;
}

// frame 0..2 bob; lean: the fast-flight pose; facing "towards" | "away".
export function witchModel({ frame = 0, lean = false } = {}) {
  const m = new Model({ blend: .03 }), bob = [0, .025, .045][frame % 3], tilt = [0, .015, -.01][frame % 3] + (lean ? .08 : 0);
  const y = .42 + bob, L = lean ? .1 : 0; // the broom's height; how far she leans forward
  const sway = [0, .03, .05][frame % 3];
  // her shadow on the ground: she flies
  m.ell([.02, .005, 0], [.2, .005, .12], M.NOSE, { group: 0 });
  // the broom: a long handle, bristles bound at the back, glowing at their tips
  m.seg([-.5, y - tilt * 2, 0], [.62, y + tilt * 3, 0], .022, .018, M.BROOM, { group: 2 });
  m.ell([-.62, y - tilt * 2 - .01, 0], [.17, .07, .08], M.STRAW, { dir: [1, tilt, 0], group: 3, paint: p => p[0] < -.72 ? M.MAGIC2 : p[0] > -.5 ? M.BROOM : undefined });
  // legs astride: jeans to the knee, then down to sneakers
  for (const side of [-1, 1]) {
    const hip = [-.04, y + .06, side * .07], knee = [.12 + L * .5, y - .02, side * .14], foot = [.08 + L, y - .2, side * .13];
    m.seg(hip, knee, .055, .045, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.seg(knee, foot, .045, .04, M.JEANS, { group: side > 0 ? 6 : 4 });
    m.ell(v3.add(foot, [.05, -.02, 0]), [.08, .04, .045], M.SHOES, { group: side > 0 ? 6 : 4, paint: p => p[1] < foot[1] - .04 ? M.BELLY : undefined });
  }
  // body: a top under an open jacket; hips in jeans
  m.ell([-.04, y + .08, 0], [.11, .07, .1], M.JEANS, { group: 1 });
  const chest = [.0 + L * .8, y + .26 - L * .3, 0];
  m.ell(chest, [.1, .16, .11], M.JACKET, { dir: [L * 2.5, 1, 0], up: [-1, 0, 0], group: 1, paint: p => p[0] > chest[0] + .04 && Math.abs(p[2]) < .055 ? M.TOP : undefined });
  // arms: shoulders to hands on the broom handle
  for (const side of [-1, 1]) {
    const sh = v3.add(chest, [.01, .11, side * .11]), hand = [.26 + L, y + .03, side * .05];
    m.seg(sh, v3.lerp(sh, hand, .5), .04, .035, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.seg(v3.lerp(sh, hand, .5), hand, .035, .03, M.JACKET, { group: side > 0 ? 7 : 5 });
    m.ell(hand, [.035, .03, .035], M.SKIN, { group: side > 0 ? 7 : 5 });
  }
  // head, face and hair
  const H = v3.add(chest, [.03 + L * .5, .26, 0]);
  m.ell(H, [.11, .115, .1], M.SKIN, { group: 8, paint: p => (p[0] < H[0] - .01 || p[1] > H[1] + .075) ? M.HAIR : undefined });
  for (const side of [-1, 1]) m.ell(Model.surface(H, [.11, .115, .1], v3.norm([.85, .05, side * .45])), [.016, .026, .016], M.EYE, { group: 8 });
  // hair trailing out behind, swaying with the bob
  m.chain([[...v3.add(H, [-.06, .02, 0]), .06], [...v3.add(H, [-.18 - L, -.05 + sway, .02]), .045], [...v3.add(H, [-.3 - L * 1.5, -.08 + sway * 1.6, .03]), .02]], M.HAIR, { group: 9 });
  // headphones: cups over the ears and a band across the top of the head
  for (const side of [-1, 1]) m.ell(v3.add(H, [-.015, 0, side * .105]), [.05, .055, .03], M.PHONES, { group: 10 });
  m.chain([[...v3.add(H, [-.005, .03, -.095]), .015], [...v3.add(H, [-.005, .11, -.05]), .015], [...v3.add(H, [-.005, .125, 0]), .015], [...v3.add(H, [-.005, .11, .05]), .015], [...v3.add(H, [-.005, .03, .095]), .015]], M.PHONES, { group: 10 });
  // the hat: a wide brim and a tall crown, its tip bent back
  const brim = v3.add(H, [-.03, .1, 0]);
  m.ell(brim, [.16, .014, .15], M.HAT, { dir: [1, .25, 0], group: 11 });
  m.chain([[...v3.add(brim, [0, .01, 0]), .085], [...v3.add(brim, [-.05 - L, .17, 0]), .045], [...v3.add(brim, [-.16 - L * 1.5, .27 + sway * .5, 0]), .012]], M.HAT, { group: 11, paint: p => p[1] < brim[1] + .045 ? M.MAGIC : undefined }); // a glowing hatband
  return m;
}

// The witch about as tall as a young creature, so she reads clearly over the ground.
export function witchSprite(st = {}, { frame = 0, lean = false, facing = "towards" } = {}) {
  const pixel = st.pixel || 3, h = Math.round((st.size || 8) * Math.sqrt(st.growth || 20) * (2 / pixel) * 1.9);
  const { sp } = render(witchModel({ frame, lean }), { height: h, facing });
  // she glows: a few motes of light round her
  let n = 0;
  for (let i = 0; i < 400 && n < 6; i++) {
    const x = (i * 37) % sp.w, y = (i * 53) % Math.floor(sp.h * .8);
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    if ((x * 7 + y * 13 + frame * 5) % 11) continue;
    sp.px(x, y, M.MAGIC2); n++;
  }
  return sp;
}

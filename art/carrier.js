// The island's party legend carrying the treehouse Ent on its back (Ed, 2026-10-10, docs/backlog/journey.md §3 "Arriving": on a
// new island the Ent stands on the back of a party legend of that island's kind; Ed chose one shared carrying pose for every kind,
// 2026-10-12). Home, the Ent's own island, has none.
//
// The carrier is its kind's adult form (no legend back dressing: the Ent's roots sit on its back) grown, at the art's own pixel
// size, until its back stands CARRIER.back metres up (its length kept to maxLength), facing the camera's way like every creature.
// A flyer lands: its shadow on the ground goes and its body comes down onto the ground, its wings spread low either side.
// The Ent is grown that much shorter (entSprite's deckY: render/homeArt.ts) so its deck stays where the rules have it.
import { M, Sprite } from "./core.js";
import { critter, SPECIES_BY_ID } from "./creatures.js";

/** back: its back's height (metres; higher for a short kind, grown to minLength, but never past maxBack: an upright owl stays short); sink: how far the Ent's roots stand down into
 *  its back; minLength, maxLength: its shortest and longest (metres). */
export const CARRIER = { back: 13, maxBack: 16, sink: 1.2, minLength: 13, maxLength: 28 };

/** The opaque box of a sprite and its back's top: the median of its top edge over the middle fifth of its width (so an ear, an
 *  antler or a raised leg there doesn't count). */
function carrierBox(sp) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const tops = [], mid = (x0 + x1) / 2;
  for (let x = Math.floor(x0 + (x1 - x0) * 0.4); x <= Math.ceil(x0 + (x1 - x0) * 0.6); x++) for (let y = 0; y < sp.h; y++) if (sp.m[y * sp.w + x]) { tops.push({ x, y }); break; }
  if (!tops.length) return { x0, x1, y0, y1, back: y0, bx: Math.round(mid) };
  const back = [...tops].sort((a, b) => a.y - b.y)[tops.length >> 1].y; // (its anchor on the column nearest the middle whose top is that)
  const at = tops.filter(t => t.y === back).sort((a, b) => Math.abs(a.x - mid) - Math.abs(b.x - mid))[0];
  return { x0, x1, y0, y1, back, bx: at.x };
}

/** A flyer's shadow (art/creatures3d.js: an ellipse on the ground, M.NOSE) gone: the bottom rows holding nothing else cleared. */
function carrierLanded(src) {
  const sp = new Sprite(src.w, src.h); sp.m.set(src.m); sp.n.set(src.n); sp.g.set(src.g); // (a copy: critter's are cached)
  for (let y = sp.h - 1; y >= 0; y--) {
    let other = false;
    for (let x = 0; x < sp.w; x++) { const v = sp.m[y * sp.w + x]; if (v && v !== M.NOSE) { other = true; break; } }
    if (other) break;
    for (let x = 0; x < sp.w; x++) sp.m[y * sp.w + x] = 0;
  }
  return sp;
}

/** Its pixels cropped to their box, a pixel to spare all round for the outline. */
function carrierCrop(sp, b) {
  const W = b.x1 - b.x0 + 3, H = b.y1 - b.y0 + 3, o = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const X = x + b.x0 - 1, Y = y + b.y0 - 1; if (X < 0 || Y < 0 || X >= sp.w || Y >= sp.h) continue;
    const i = Y * sp.w + X, j = y * W + x; if (!sp.m[i]) continue;
    o.m[j] = sp.m[i]; o.g[j] = sp.g[i]; o.n[j * 3] = sp.n[i * 3]; o.n[j * 3 + 1] = sp.n[i * 3 + 1]; o.n[j * 3 + 2] = sp.n[i * 3 + 2];
  }
  return o;
}

/** The carrier of kind `id` (a species id) at `ppm` art pixels a metre (the Ent's: render/homeArt.ts measures it), or null for a
 *  kind with no art. Returns { sprite (cropped to its pixels), back: { x, y } (its back's top, where the Ent's trunk stands; pixels),
 *  backM (that height, metres), lengthM }. */
export function carrierSprite(st, id, { ppm = 16, back = CARRIER.back, maxBack = CARRIER.maxBack, minLength = CARRIER.minLength, maxLength = CARRIER.maxLength } = {}) {
  const S = SPECIES_BY_ID[id]; if (!S) return null;
  const draw = k => carrierLanded(critter(id, 2, 0, { ...st, size: (st.size ?? 1) * k }, "towards")); // (only a flyer has a shadow to drop)
  // Two proportional guesses, with at most two corrections if quantized
  // native size steps still exceed the existing carrier bounds.
  let k = 1, sp = draw(1), b = carrierBox(sp);
  for (let pass = 0; pass < 4; pass++) {
    const h = b.y1 - b.back + 1, w = b.x1 - b.x0 + 1;
    k *= Math.min((maxBack * ppm) / h, Math.max((minLength * ppm) / w, Math.min((back * ppm) / h, (maxLength * ppm) / w)));
    sp = draw(k); b = carrierBox(sp);
    // Integer witch-reference steps can overshoot two proportional guesses.
    // Check the actual native result and allow bounded corrective passes.
    if(pass>=1&&b.y1-b.back+1<=maxBack*ppm&&b.x1-b.x0+1<=maxLength*ppm&&b.x1-b.x0+1>=minLength*ppm)break;
  }
  return { sprite: carrierCrop(sp, b), back: { x: b.bx - b.x0 + 1, y: b.back - b.y0 + 1 }, backM: (b.y1 - b.back + 1) / ppm, lengthM: (b.x1 - b.x0 + 1) / ppm };
}

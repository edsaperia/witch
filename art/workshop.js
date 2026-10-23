// The Workshop's broom parts drawn on their own (Ed, 2026-10-22/23; docs/backlog/workshop.md): each part as it is on her broom,
// cut from art/brooms.js's kinds (a kind's body is a tip's or a chassis's look, its tail an exhaust's; the twig bristles are her
// own bundle's, art/witch.js), for the bay's cards (ui/stationPanel.ts), the pegboard's cells and her broom resting on the bay or the
// lathe (render/workshopArt.ts). Plain first versions, in the house's pixel (art/furniture.js modelSprite): an art pass should give
// each part its own sprite, drawn at the cards' size, and her broom assembled from its three parts (the later art PR).
import { M } from "./core.js";
import { Model } from "./model3d.js";
import { BROOM_KINDS } from "./brooms.js";
import { ctPlace } from "./country.js";
import { modelSprite } from "./furniture.js";

// the broom's knobs, as hers by default (her look's own fit could stand in later)
const L0 = { broomLength: 1, bristles: 1, frame: 0, broomBend: 0 };
const first = m => [m.parts.length, m.flats.length];
/** Everything drawn since `from` scaled by k about the origin (the kinds draw at a broom's real size). */
function scaleFrom(m, [n], k) {
  for (const q of m.parts.slice(n)) {
    if (q.type === "cone") { q.a = q.a.map(v => v * k); q.b = q.b.map(v => v * k); q.r1 *= k; q.r2 *= k; }
    else if (q.type === "ell") { q.c = q.c.map(v => v * k); q.r = q.r.map(v => v * k); }
    else { q.c = q.c.map(v => v * k); q.h = q.h.map(v => v * k); q.round *= k; }
    if (q.paint) { const f = q.paint; q.paint = (p, part) => f(p.map(v => v / k), part); }
  }
}
// her own twig bristles (art/witch.js broomBristles' twig): a long bound bundle along -x from its binding at x0, stray twigs out of it
function twigTail(m, x0, k = 1) {
  const R = [.17 * 1.4 * k, .07 * .7, .08 * .7], c = [x0 - R[0] * .76, 0, 0];
  m.ell(c, R, M.STRAW, { group: 3 });
  for (let i = 0; i < 5; i++) { const s = (i / 4 - .5) * 2; m.seg([c[0] - R[0] * .4, 0, 0], [c[0] - R[0] * (1.15 + .1 * (i % 2)), s * R[1] * 1.1, (i % 3 - 1) * R[2] * .9], .012, .006, M.STRAW, { group: 3 }); }
}
/** One part along x, its nose (a body's) toward +x, its tail (an exhaust's) toward -x, about the origin: `kind` the broom kind it's cut
 *  from and `piece` which end ("body" or "tail"; config/broom-parts.json look). */
export function drawPart(m, kind, piece, L = L0) {
  const K = BROOM_KINDS[kind];
  if (piece === "tail") {
    if (kind === "twig" || !K?.tail) { m.seg([.1, 0, 0], [.02, 0, 0], .02, .02, M.BROOM, { group: 2 }); twigTail(m, .04); return; }
    m.seg([.12, 0, 0], [.02, 0, 0], .02, .02, M.BROOM, { group: 2 }); // (a stub of handle, so a tail hangs by something)
    K.tail(m, L, [.02 - .13, 0, 0], [.17, .07, .08], { dir: [1, 0, 0], group: 3 });
    return;
  }
  if (K?.body) K.body(m, L, [-.42, 0, 0], [.42, 0, 0], .022, .018);
  else m.seg([-.42, 0, 0], [.42, 0, 0], .022, .018, M.BROOM, { group: 2 });
}
/** Her broom as it rests on the bay's trestles or the lathe (render/workshopArt.ts): its chassis's body (else a plain handle), its
 *  tip's body over its nose, its exhaust's tail (else her twig bristles); each a { kind, piece } look or null. Along x, the nose +x. */
export function drawBroom(m, { tip = null, chassis = null, exhaust = null } = {}, L = L0) {
  const C = chassis && BROOM_KINDS[chassis.kind];
  if (C?.body) C.body(m, L, [-.5, 0, 0], [.6, 0, 0], .022, .018);
  else m.seg([-.5, 0, 0], [.6, 0, 0], .022, .018, M.BROOM, { group: 2 });
  if (tip && BROOM_KINDS[tip.kind]?.body) { const n = first(m); BROOM_KINDS[tip.kind].body(m, L, [0, 0, 0], [.3, 0, 0], .024, .02); ctPlace(m, n[0], { at: [.42, 0, 0] }, n[1]); }
  if (!exhaust || exhaust.kind === "twig" || !BROOM_KINDS[exhaust.kind]?.tail) twigTail(m, -.5);
  else BROOM_KINDS[exhaust.kind].tail(m, L, [-.5 - .13, 0, 0], [.17, .07, .08], { dir: [1, 0, 0], group: 3 });
}

/** A part's sprite (art/furniture.js modelSprite: { sp, origin, lights, marks }), the house's pixel: lying along the screen (yaw 0,
 *  its nose right) for a card, or hung on the pegboard (yaw: the board's, tilted `lean` radians in the board's plane, `scale` of a
 *  real part). The glowing bits (a jet's flame) are her magic's colour. */
export function partSprite(kind, piece, { ppm = 32 / 3, pitch = .6, yaw = 0, lean = 0, scale = 1 } = {}) {
  const m = new Model({ blend: .02 }), n = first(m);
  drawPart(m, kind, piece);
  if (scale !== 1) scaleFrom(m, n, scale);
  if (lean) ctPlace(m, n[0], { pitch: lean }, n[1]);
  return modelSprite(m, { ppm, pitch, yaw });
}
/** Her broom's sprite, resting (render/workshopArt.ts): turned `turn` radians on the floor's plane from lying along the piece it
 *  rests on (yaw: that piece's), `scale` times a real broom (the house is drawn twice life size: art/furniture.js SIZE). */
export function restingBroomSprite(looks, { ppm = 32 / 3, pitch = .6, yaw = 0, turn = 0, scale = 1 } = {}) {
  const m = new Model({ blend: .02 }), n = first(m);
  drawBroom(m, looks);
  if (scale !== 1) scaleFrom(m, n, scale);
  if (turn) ctPlace(m, n[0], { yaw: turn }, n[1]);
  return modelSprite(m, { ppm, pitch, yaw });
}

// The treehouse Ent (Ed, 2026-10-11, docs/backlog/journey.md §3: "a treehouse Ent ... its pose is Atlas: the Ent kneels,
// holding the treehouse up above it in its branches. It looks mostly like a gnarled tree, with only a suggestion of Atlas,
// and no face"; and "Okay let's make the treehouse. It can just be a circle with a wooden floor and a balustrade sitting on
// the ent ... The world map is in the centre ... DJ decks are on the platform. The table holding the decks is along the
// curved bottom edge of the platform").
//   - the Ent: a giant, gnarled, deeply furrowed tree, kneeling (its near knee down on the ground, the far one raised),
//     roots gripping the ground all round; its trunk leaning a little forward under the load, a mossy burl bowed where a
//     head would be (no face, no eyes); two great boughs raised from its shoulders, their "hands" opening into branches that
//     hold the deck from below, more boughs from its back meeting the deck's middle; leafy tufts at the branch tips under
//     the rim, in the giant's own blue-green;
//   - the deck: a round plank floor laid in rings, a thick rim, joists under it; a turned-post balustrade (balusters, a
//     bottom rail and a top rail, a stouter newel post every few), lanterns hanging from some of the newels;
//   - the world map at its centre: a plain round wooden table on a pedestal, its top painted (the sea, a pale ring), flat
//     and clear: the game draws the sea chart's live miniature over it;
//   - the DJ decks: a curved desk along the deck's south arc (its edge nearest the camera and the dancefloor), just inside
//     the rail: today's booth (art/treehouse.js djTable: the turntables, the mixer, the LED front) in its middle, squared to
//     the camera, where she stands behind it facing us, and curved wings of the same desk either side following the rail.
// Built in 3D (model3d.js) to the witch's own scale like the treehouse (art/treehouse.js), in metres here (ENT); turned
// towards or away. Baked in halves so she stands between them: far (the Ent, the floor, the far half of the rail, the map
// table) and near (the near half of the rail and the decks' desk), as the walk-in buildings' far and near halves; and the
// DJ table's frames (DJ_FRAMES: the platters turning, the LEDs chasing) to draw over her, as the treehouse's fore.
import { M, Sprite } from "./core.js";
import { Model, render, v3, YAW } from "./model3d.js";
import { witchPixelsPerUnit, DJ_DECKS } from "./witch.js";
import { treehouseColours, djTable, DJ_FRAMES, CANDLE } from "./treehouse.js";

/** Its sizes, in metres (Ed, 2026-10-11: "The deck sits at 22 m"; Echo's layout: radius 7, the map table about 2.5 m across).
 *  deckY: the deck's floor over the ground; deckR: its radius; railH: the balustrade's height; tableR, tableH: the map table's
 *  radius and height; deskArc: the decks' desk's half-span round the deck (radians either side of the camera side); deskGap:
 *  from the rail's posts in to the desk's front. */
export const ENT = { deckY: 22, deckR: 7, railH: 1.1, tableR: 1.25, tableH: .85, deskArc: .62, deskGap: .45, lanterns: 6 };
/** Its colours: the treehouse's (the giant's bark and leaves, wood, iron, warm light, the party's neons). */
export const entColours = st => treehouseColours(st);

const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const FAIRY = [M.COLLAR, M.RUNE, M.WOKEN, M.MAGIC];

/** The Ent's model, in the witch's units, for `facing`: { m (everything), far, near (its two halves), dj: the decks' frame
 *  (djTable's), stand (where she stands, units), the deck's centre and the table's, the lanterns, the desk's arc, k (units a metre) }. */
function entModel(st, facing, E) {
  const k = 16 / witchPixelsPerUnit(st), U = x => x * k, P = (x, y, z) => [U(x), U(y), U(z)]; // (units a metre: the witch's model is drawn at witchPixelsPerUnit px a unit, 16 px a metre)
  const m = new Model({ blend: .04 }), far = new Model({ blend: .04 }), near = new Model({ blend: .04 }), lights = [];
  const both = (fn) => { fn(m); fn(far); }, nearAlso = fn => { fn(m); fn(near); };
  let G = 100; const g = () => G++;
  const D = E.deckY, R = E.deckR, hs = D / 22; // (its body grows with the deck's height)
  const yaw = YAW[facing] ?? YAW.towards, cam = [Math.sin(yaw), 0, Math.cos(yaw)], aCam = Math.atan2(cam[2], cam[0]); // towards the camera, in the model's plane
  // ---- the bark: deeply furrowed along the limb, knotted, a little moss ----
  const bark = p => { const x = p[0] / k, y = p[1] / k, z = p[2] / k, a = Math.atan2(z, x), q = Math.sin(a * 9 + y * 1.1 + 1.6 * Math.sin(y * .5 + a * 3) + x * .4); return q > .55 ? M.BARKD : q > .2 ? M.BARK2 : q < -.82 ? M.BARKL : (hash(Math.floor(a * 5), Math.floor(y * 1.5)) < .06 ? M.MOSS : undefined); };
  const limb = (pts, o = {}) => both(mm => mm.chain(pts.map(([x, y, z, r]) => [U(x), U(y), U(z), U(r)]), M.TRUNK, { group: o.group ?? g(), rough: U(o.rough ?? .12), paint: bark }));
  const burl = (x, y, z, r, mat = M.TRUNK) => both(mm => mm.ell(P(x, y, z), [U(r), U(r * .85), U(r)], mat, { group: g(), rough: U(.08), paint: p => (p[1] / k > y + r * .55 ? M.MOSS : bark(p)) }));
  // the roots, gripping the ground all round
  for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2 + .2 + (hash(i, 3) - .5) * .35, r1 = 5.2 + hash(i, 5) * 2.4, c = Math.cos(a), s = Math.sin(a);
    limb([[c * 1.8, 2.4, s * 1.8 - .6, 1.3], [c * 2.9, 1.0, s * 2.9 - .4, .9], [c * r1 * .7, .35, s * r1 * .7, .5], [Math.cos(a + .2) * r1, .05, Math.sin(a + .2) * r1, .14]], { rough: .08 }); }
  // kneeling: the near knee down on the ground (its shin lying back along it), the far knee raised, its foot planted
  const hip = [0, 8 * hs, -1.6];
  limb([[1.9, 1.0, 4.6, 1.45], [1.7, .8, 1.4, 1.2], [1.5, .55, -2.6, .85]]); // the near shin, along the ground
  limb([[1.9, 1.3, 4.5, 1.55], [1.5, 4.6 * hs, 2.2, 1.9], [hip[0] + .7, hip[1], hip[2], 2.3]]); // up to the hip
  limb([[-2.7, .5, 1.6, 1.2], [-2.9, 3.6 * hs, 2.6, 1.3], [-3.0, 6.2 * hs, 3.0, 1.45], [-1.8, 7.6 * hs, .4, 1.9], [hip[0] - .7, hip[1], hip[2], 2.3]]); // the far leg, its knee up
  burl(1.9, 1.4, 4.7, 1.55); burl(-3.0, 6.3 * hs, 3.0, 1.35);
  // the trunk: 5 m+ across, twisted, leaning a little forward, its shoulders under the load
  const sh = [0, 16.5 * hs, .3];
  limb([[hip[0], hip[1], hip[2], 2.6], [.7, 11 * hs, -1.3, 2.85], [-.4, 14 * hs, -.5, 2.65], [sh[0], sh[1], sh[2], 2.3]], { group: 1, rough: .16 });
  burl(1.4, 11.6 * hs, -.2, 1.5); burl(-1.6, 13.4 * hs, .5, 1.2); burl(.4, 9.3 * hs, .6, 1.1);
  // no face: a great burl bowed where a head would be, under the deck, mossed over
  both(mm => mm.ell(P(0, 17.6 * hs, 2.0), [U(1.6), U(1.25), U(1.45)], M.TRUNK, { group: g(), rough: U(.14), paint: p => (p[1] / k > 18.2 * hs ? M.MOSS : bark(p)) }));
  // the arms: two great boughs raised from the shoulders, their hands opening into branches under the deck
  const under = D - .55;
  for (const s of [-1, 1]) {
    const hand = [s * 4.6, under - 1.6, 1.6];
    limb([[s * 2.0, sh[1] - .3, .4, 1.7], [s * 3.9, 17.4 * hs, 1.6, 1.5], [s * 4.9, (17.4 * hs + hand[1]) / 2, 1.9, 1.25], [...hand, 1.05]]);
    burl(s * 3.9, 17.4 * hs, 1.6, 1.2); burl(...hand.map((v, j) => j === 1 ? v + .3 : v), .95);
    for (const [j, a] of [-1.0, -.35, .3, .95, 1.55].entries()) { const d = R * (.55 + .3 * hash(j, s + 3)), t = [s * Math.abs(Math.cos(a)) * d + s * 1.0, under, Math.sin(a) * d]; limb([[...hand, .55], [...v3.lerp(hand, t, .5).slice(0, 1), (hand[1] + under) / 2 + .5, v3.lerp(hand, t, .5)[2], .38], [...t, .16]], { rough: .06 }); }
  }
  // boughs from its back up into the deck's middle, and a few more under the rim at the back
  for (const [x, z] of [[-1.4, -1.8], [1.3, -2.1], [0, -.6], [-.2, -3.2]]) limb([[x * .4, sh[1] - .8, -.8, 1.0], [x, under - 2.0, z, .7], [x * 1.5, under, z * 1.35, .3]], { rough: .07 });
  for (const a of [-2.2, -1.57, -.9]) { const c = Math.cos(a), s = Math.sin(a); limb([[c * 1.5, 15 * hs, s * 1.5 - .6, .9], [c * 3.6, under - 3, s * 3.6, .55], [c * (R - .6), under, s * (R - .6), .2]], { rough: .06 }); }
  // leafy tufts at the branch tips under the rim, in its own blue-green; a few hanging higher round the back
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + hash(i, 9) * .3; if (Math.cos(a - aCam) > .55) continue; // (never across its front: its raised arms show there)
    const d = R - .2 + hash(i, 4) * .5, y = under - .3 - hash(i, 2) * .7;
    both(mm => mm.ell(P(Math.cos(a) * d, y, Math.sin(a) * d), [U(.85), U(.55), U(.85)], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: g(), rough: U(.18) })); }
  // ---- the deck: planks in rings, a thick rim, joists under it ----
  const top = D, gd = g();
  both(mm => mm.ell(P(0, top - .25, 0), [U(R), U(.25), U(R)], M.WOOD, { group: gd, paint: p => {
    const x = p[0] / k, z = p[2] / k, y = p[1] / k, r = Math.hypot(x, z), a = Math.atan2(z, x);
    if (y < top - .35) return M.BARK2; // its underside, darker
    if (r > R - .3) return M.BARKL; // the rim
    const ring = r / .55, ri = Math.floor(ring); if (ring % 1 < .1) return M.BARKD; // the rings' seams
    const n = Math.max(6, Math.round(r * Math.PI * 2 / 1.4)); if (((a / (Math.PI * 2) * n + ri * .37) % 1 + 1) % 1 < .045) return M.BARKD; // their joints
    return hash(ri, Math.floor((a / (Math.PI * 2)) * n)) < .3 ? M.HAT2 : undefined; // boards a shade apart
  } }));
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + .2, c = Math.cos(a), s = Math.sin(a); both(mm => mm.box(P(c * R * .5, top - .65, s * R * .5), [U(R * .48), U(.14), U(.12)], M.BARK2, { dir: [c, 0, s], up: [0, 1, 0], group: g() })); } // joists
  // ---- the balustrade: turned balusters, a bottom rail and a top rail, a stouter newel every few, lanterns from some ----
  const RR = R - .22, nPost = Math.round(RR * Math.PI * 2 / .42), newelEvery = 6, isNear = a => Math.cos(a - aCam) > 0; // (near: the half towards the camera)
  for (let i = 0; i < nPost; i++) {
    const a = i / nPost * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), b = [U(c * RR), U(top), U(s * RR)], newel = i % newelEvery === 0, gp = g();
    const add = mm => {
      if (newel) { mm.box(v3.add(b, [0, U(E.railH / 2 + .05), 0]), [U(.13), U(E.railH / 2 + .08), U(.13)], M.WOOD, { group: gp, round: U(.03), paint: p => (Math.abs(p[1] / k - top - E.railH - .12) < .06 ? M.BARKL : undefined) }); mm.ell(v3.add(b, [0, U(E.railH + .2), 0]), [U(.13), U(.11), U(.13)], M.BARKL, { group: gp }); }
      else { mm.seg(v3.add(b, [0, U(.12), 0]), v3.add(b, [0, U(E.railH - .05), 0]), U(.05), U(.045), M.WOOD, { group: gp }); mm.ell(v3.add(b, [0, U(E.railH * .42), 0]), [U(.085), U(.16), U(.085)], M.WOOD, { group: gp }); mm.ell(v3.add(b, [0, U(E.railH * .8), 0]), [U(.06), U(.05), U(.06)], M.BARKL, { group: gp }); } // a turned baluster: a bulb and a collar
    };
    if (isNear(a)) nearAlso(add); else both(add);
    if (newel && lights.length < E.lanterns && Math.cos(a - aCam) < .85) { // a lantern hanging from the newel's top, out over the edge (never in front of the decks)
      const lc = [U(c * (RR + .32)), U(top + E.railH - .35), U(s * (RR + .32))], gl = g(), addL = mm => { // an iron frame (a cap, a base, four corner bars) round a glowing glass
        mm.seg(v3.add(lc, [0, U(.45), 0]), v3.add(lc, [0, U(.22), 0]), U(.015), U(.015), M.BODY3, { group: gl });
        for (const dy of [.19, -.19]) mm.box(v3.add(lc, [0, U(dy), 0]), [U(.15), U(.03), U(.15)], M.BODY3, { group: gl, round: U(.01) });
        for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) mm.seg(v3.add(lc, [U(dx * .12), U(-.17), U(dz * .12)]), v3.add(lc, [U(dx * .12), U(.17), U(dz * .12)]), U(.014), U(.014), M.BODY3, { group: gl });
        mm.ell(lc, [U(.12), U(.16), U(.12)], M.GLOW, { group: gl + 1, paint: p => (Math.abs(p[1] - lc[1]) < U(.05) ? M.MAGIC2 : undefined) }); };
      if (isNear(a)) nearAlso(addL); else both(addL); g();
      lights.push({ at: lc, rgb: [255, 190, 96], kind: "lantern" });
    }
  }
  for (const [y, r] of [[.18, .06], [E.railH + .02, .085]]) for (let i = 0; i < nPost; i++) { // the rails, round in segments
    const a0 = i / nPost * Math.PI * 2, a1 = (i + 1) / nPost * Math.PI * 2, p = a => [U(Math.cos(a) * RR), U(top + y), U(Math.sin(a) * RR)], gr = 40;
    const add = mm => mm.seg(p(a0), p(a1), U(r), U(r), y > .5 ? M.BARKL : M.WOOD, { group: gr + (y > .5 ? 1 : 0) });
    if (isNear((a0 + a1) / 2)) nearAlso(add); else both(add);
  }
  // ---- the world map: a round table on a pedestal at the deck's middle, its top painted and flat ----
  const tt = top + E.tableH, gt = g();
  both(mm => { mm.ell(P(0, top + .06, 0), [U(.55), U(.08), U(.55)], M.WOOD, { group: gt }); mm.seg(P(0, top + .1, 0), P(0, tt - .08, 0), U(.2), U(.16), M.WOOD, { group: gt, paint: p => (Math.abs(p[1] / k - top - E.tableH * .5) < .05 ? M.BARKL : undefined) });
    mm.ell(P(0, tt - .04, 0), [U(E.tableR), U(.06), U(E.tableR)], M.WOOD, { group: gt + 1, paint: p => { const r = Math.hypot(p[0], p[2]) / k; if (p[1] / k < tt - .07) return M.BARK2; return r > E.tableR - .14 ? M.BARKL : r > E.tableR - .2 ? M.STRAW : M.BODY; } }); }); // (the sea painted on, a pale ring round it: the chart's miniature is drawn over it)
  g();
  // ---- the DJ decks: a curved desk along the deck's south arc, just inside the rail, the booth in its middle squared to the camera ----
  const D0 = DJ_DECKS, deskFront = RR - E.deskGap, a1m = D0.depth[1] / k, standR = deskFront - a1m - .02, stand = P(Math.cos(aCam) * standR, top, Math.sin(aCam) * standR);
  const dj = djTable(near, { facing, stand }); djTable(m, { facing, stand });
  const deskIn = deskFront - (D0.depth[1] - D0.depth[0]) / k, deskMid = (deskFront + deskIn) / 2, deskTop = D0.top / k, halfMid = D0.width / k / standR; // (the booth's own half-span round the arc)
  const wing = (from, to) => { const n = Math.max(2, Math.round((to - from) / .07)); for (let i = 0; i < n; i++) {
    const a0 = from + (to - from) * i / n, a1 = from + (to - from) * (i + 1) / n, am = (a0 + a1) / 2, c = Math.cos(am), s = Math.sin(am), len = (a1 - a0) * deskMid / 2 + .02, gw = 60 + 20 + (i % 3);
    nearAlso(mm => mm.box(P(c * deskMid, deskTop / 2, s * deskMid).map((v, j) => j === 1 ? U(top + deskTop / 2) : v), [U(len), U(deskTop / 2), U((deskFront - deskIn) / 2)], M.WOOD, { dir: [-s, 0, c], up: [0, 1, 0], group: gw, round: U(.02), paint: p => {
      const x = p[0] / k, z = p[2] / k, y = p[1] / k - top, r = Math.hypot(x, z);
      if (y > deskTop - .02) return r > deskFront - .04 ? M.BARKL : M.SHADES; // the top: dark, a light lip at its front
      if (r < deskFront - .04) return M.BARKL; // its back, toward her
      if (y > deskTop - .1 || y < .09) return FAIRY[((Math.floor(Math.atan2(z, x) * deskMid * 9) % 4) + 4) % 4]; // LED strips, top and bottom
      return ((Math.atan2(z, x) * deskMid * 5) % 1 + 1) % 1 < .08 ? M.BARK2 : undefined; // slats
    } })); } };
  wing(aCam + halfMid * .92, aCam + E.deskArc); wing(aCam - E.deskArc, aCam - halfMid * .92);
  lights.push({ at: dj.to([D0.platter.a, D0.top + .03, D0.platter.c]), rgb: [255, 80, 200], kind: "decks" }, { at: dj.to([D0.platter.a, D0.top + .03, -D0.platter.c]), rgb: [80, 230, 255], kind: "decks" });
  // (in the world, as drawn: the camera looks north, the side nearest it is south, +z: its angles there are its model angles less aCam, plus π/2)
  const S = Math.PI / 2;
  return { m, far, near, dj, stand, standR, k, top, deck: P(0, top, 0), table: P(0, tt, 0), lights, desk: { inner: +standR.toFixed(2), front: +deskFront.toFixed(2), from: +(S - E.deskArc).toFixed(3), to: +(S + E.deskArc).toFixed(3), mid: +S.toFixed(3) }, aCam, RR };
}

/** The treehouse Ent at the witch's scale, for `facing` ("towards" or "away") and its sizes (ENT, overridable: { deckY, deckR }):
 *  { whole, far, near, fore, foreFrames, foreBox, candles, anchors, metres }.
 *  - whole: everything as drawn; far: the Ent, the deck's floor, the far half of the rail, the map table (drawn behind her);
 *    near: the near half of the rail and the decks' curved desk (drawn over her); each at the whole's size and origin.
 *  - fore: the DJ table alone (the booth in the desk's middle), at the whole's size and origin; foreFrames: its DJ_FRAMES turns,
 *    cropped to the box they share, foreBox its top-left in the whole's pixels (as the treehouse's: the game draws them over her).
 *  - candles: the knockdown candles' row, along the desk's top front edge, screen left to right (as the treehouse's).
 *  - anchors (pixels in the whole): base (the trunk's foot on the ground: place it by this), deck (the deck's centre, on its
 *    floor), table (the map table's top's centre), seat (where she stands behind the decks: her ground anchor), platter (the
 *    pink-labelled turntable's centre), camera (just over her at the decks, for the opening zoom), lights ({ x, y, rgb, kind }:
 *    the lanterns and the decks).
 *  - metres: height and width of the whole; deckY (the deck's floor over the ground), deckR, railH, tableR, tableH; desk: the
 *    decks' desk round the deck's centre ({ inner: her standing radius, front: its front's radius, from, to: the angles it spans,
 *    mid: the camera side's angle; radians in the deck's plane, 0 along +x (east), π/2 along +z (south, towards the camera) });
 *    seat ({ x, z } her standing spot from the deck's centre); trunk (its diameter at the hip), footprint (its roots' reach). */
export function entSprite(st = {}, { facing = "towards", ppm = 16, deckY = ENT.deckY, deckR = ENT.deckR } = {}) {
  const E = { ...ENT, deckY, deckR }, T = entModel(st, facing, E), ppu = witchPixelsPerUnit(st), r = render(T.m, { scale: ppu, facing }), full = r.sp;
  let x0 = full.w, x1 = -1, y0 = full.h; for (let y = 0; y < full.h; y++) for (let x = 0; x < full.w; x++) if (full.m[y * full.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const W = x1 - x0 + 1, H = full.h - y0, crop = s => { const o = new Sprite(W, H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * full.w + x + x0; if (s.m[i]) o.put(x, y, s.m[i], s.n[i * 3], s.n[i * 3 + 1], s.n[i * 3 + 2]); } return o; };
  const whole = crop(full), REF = T.deck, [ax, ay] = r.project(REF);
  // another model drawn into the whole's frame: lined up on the deck's centre
  const into = mm => { const rf = render(mm, { scale: ppu, facing }), [bx, by] = rf.project(REF), o = new Sprite(W, H);
    for (let y = 0; y < rf.sp.h; y++) for (let x = 0; x < rf.sp.w; x++) { const i = y * rf.sp.w + x, v = rf.sp.m[i]; if (!v) continue; const X = Math.round(x + ax - bx - x0), Y = Math.round(y + ay - by - y0); if (X >= 0 && Y >= 0 && X < W && Y < H) o.put(X, Y, v, rf.sp.n[i * 3], rf.sp.n[i * 3 + 1], rf.sp.n[i * 3 + 2]); }
    return o; };
  const far = into(T.far), near0 = into(T.near), near = new Sprite(W, H);
  // near: only where it shows in the whole (the deck's rim in front of the rail's feet stays the far half's); far: and any of the whole that neither has
  for (let i = 0; i < whole.m.length; i++) { const v = whole.m[i], x = i % W, y = Math.floor(i / W); if (!v) continue;
    if (near0.m[i] === v) near.put(x, y, v, whole.n[i * 3], whole.n[i * 3 + 1], whole.n[i * 3 + 2]);
    else if (!far.m[i]) far.put(x, y, v, whole.n[i * 3], whole.n[i * 3 + 1], whole.n[i * 3 + 2]); }
  const frames = []; for (let f = 0; f < DJ_FRAMES; f++) { const fm = new Model({ blend: .04 }); djTable(fm, { frame: f, facing, stand: T.stand }); frames.push(into(fm)); }
  const fore = frames[0];
  // the whole shows the table exactly as it's drawn over her (and the near half too)
  for (let i = 0; i < fore.m.length; i++) if (fore.m[i]) for (const t of [whole, near]) t.put(i % W, Math.floor(i / W), fore.m[i], fore.n[i * 3], fore.n[i * 3 + 1], fore.n[i * 3 + 2]);
  let fx0 = W, fx1 = -1, fy0 = H, fy1 = -1;
  for (const fs of frames) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (fs.m[y * W + x]) { fx0 = Math.min(fx0, x); fx1 = Math.max(fx1, x); fy0 = Math.min(fy0, y); fy1 = Math.max(fy1, y); }
  const foreFrames = frames.map(fs => { const c = new Sprite(fx1 - fx0 + 1, fy1 - fy0 + 1); for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) { const i = (y + fy0) * W + x + fx0; if (fs.m[i]) c.put(x, y, fs.m[i], fs.n[i * 3], fs.n[i * 3 + 1], fs.n[i * 3 + 2]); } return c; });
  const at = p => { const [x, y] = r.project(p); return { x: +(x - x0).toFixed(1), y: +(y - y0).toFixed(1) }; };
  // the candles' row: along the desk's top front edge, CANDLE.samples points across its middle, screen left to right
  const k = T.k, cr = T.desk.front - .12, candles = [];
  for (let i = 0; i < CANDLE.samples; i++) { const a = T.aCam - .32 + .64 * i / (CANDLE.samples - 1); candles.push(at([Math.cos(a) * cr * k, (T.top + DJ_DECKS.top / k) * k, Math.sin(a) * cr * k])); }
  candles.sort((p, q) => p.x - q.x);
  const seat = at(T.stand), cam = at(v3.add(T.stand, [0, .55, 0]));
  return { whole, far, near, fore, foreFrames, foreBox: { x: fx0, y: fy0 }, candles,
    anchors: { base: at([0, 0, 0]), deck: at(T.deck), table: at(T.table), seat, platter: at(T.dj.to([DJ_DECKS.platter.a, DJ_DECKS.top, DJ_DECKS.platter.c])), camera: cam, lights: T.lights.map(L => ({ ...at(L.at), rgb: L.rgb, kind: L.kind })) },
    metres: { height: +(H / ppm).toFixed(1), width: +(W / ppm).toFixed(1), deckY: E.deckY, deckR: E.deckR, railH: E.railH, tableR: E.tableR, tableH: E.tableH, desk: T.desk,
      seat: { x: 0, z: +T.standR.toFixed(2) }, trunk: 5.6, footprint: 7.6 } };
}

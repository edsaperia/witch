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
/** The house's sizes, in metres (docs/backlog/treehouse.md, Ed 2026-10-14): the balcony's centre `out` south of the hub's centre and its
 *  radius; the hub's wall height and the dome's over it; the pool's radius (the grating she walks on) and the flagstones' round it; the
 *  map's disc radius and height; the magic circle's centre `out` south of the hub's centre and its radius; the open front's half-arc
 *  (radians either side of the camera side, the wall cut away there); where the clockwork moon stands tonight (radians round from the
 *  far side). The hub's radius is the deck's (deckR), its floor the deck's. */
export const HOUSE = { balcony: { out: 6.3, r: 5 }, wallH: 3.4, domeH: 3.2, poolR: 2.6, flagR: 4.3, tableR: 1.55, tableH: .9, circle: { out: 4.2, r: 1.3 }, openArc: 1.2, moonAt: .5 };
/** The oak's Terrace (organic: config/house/base.json terrace, which the game passes in; the same here for the lab and the checks,
 *  rules/houseConfig.test.ts keeping them one): her seat behind the decks, the decks' desk on its open south-east rim (its middle, w
 *  along x, d along z), the magic circle, metres east and south of its middle; r, the round of wood drawn for the outside view. */
export const OAK_TERRACE = { seat: { x: 6, z: 6.4 }, decks: { x: 6, z: 8, w: 5, d: 1.6 }, circle: { x: 2, z: 2, r: 2 }, r: 10 };
/** Its colours: the treehouse's (the giant's bark and leaves, wood, iron, warm light, the party's neons). */
export const entColours = st => ({ ...treehouseColours(st), [M.WATER]: [38, 92, 128], [M.STONED]: [52, 50, 56] }); // (the map's sea and the pool; the flagstones' seams)

const entHash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const ENT_FAIRY = [M.COLLAR, M.RUNE, M.WOKEN, M.MAGIC];

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
  const bark = p => { const x = p[0] / k, y = p[1] / k, z = p[2] / k, a = Math.atan2(z, x), q = Math.sin(a * 9 + y * 1.1 + 1.6 * Math.sin(y * .5 + a * 3) + x * .4); return q > .55 ? M.BARKD : q > .2 ? M.BARK2 : q < -.82 ? M.BARKL : (entHash(Math.floor(a * 5), Math.floor(y * 1.5)) < .06 ? M.MOSS : undefined); };
  const limb = (pts, o = {}) => both(mm => mm.chain(pts.map(([x, y, z, r]) => [U(x), U(y), U(z), U(r)]), M.TRUNK, { group: o.group ?? g(), rough: U(o.rough ?? .12), paint: bark }));
  const burl = (x, y, z, r, mat = M.TRUNK) => both(mm => mm.ell(P(x, y, z), [U(r), U(r * .85), U(r)], mat, { group: g(), rough: U(.08), paint: p => (p[1] / k > y + r * .55 ? M.MOSS : bark(p)) }));
  // the roots, gripping the ground all round
  for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2 + .2 + (entHash(i, 3) - .5) * .35, r1 = 5.2 + entHash(i, 5) * 2.4, c = Math.cos(a), s = Math.sin(a);
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
    for (const [j, a] of [-1.0, -.35, .3, .95, 1.55].entries()) { const d = R * (.55 + .3 * entHash(j, s + 3)), t = [s * Math.abs(Math.cos(a)) * d + s * 1.0, under, Math.sin(a) * d]; limb([[...hand, .55], [...v3.lerp(hand, t, .5).slice(0, 1), (hand[1] + under) / 2 + .5, v3.lerp(hand, t, .5)[2], .38], [...t, .16]], { rough: .06 }); }
  }
  // boughs from its back up into the deck's middle, and a few more under the rim at the back
  for (const [x, z] of [[-1.4, -1.8], [1.3, -2.1], [0, -.6], [-.2, -3.2]]) limb([[x * .4, sh[1] - .8, -.8, 1.0], [x, under - 2.0, z, .7], [x * 1.5, under, z * 1.35, .3]], { rough: .07 });
  for (const a of [-2.2, -1.57, -.9]) { const c = Math.cos(a), s = Math.sin(a); limb([[c * 1.5, 15 * hs, s * 1.5 - .6, .9], [c * 3.6, under - 3, s * 3.6, .55], [c * (R - .6), under, s * (R - .6), .2]], { rough: .06 }); }
  // leafy tufts at the branch tips under the rim, in its own blue-green; a few hanging higher round the back
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + entHash(i, 9) * .3; if (Math.cos(a - aCam) > .55) continue; // (never across its front: its raised arms show there)
    const d = R - .2 + entHash(i, 4) * .5, y = under - .3 - entHash(i, 2) * .7;
    both(mm => mm.ell(P(Math.cos(a) * d, y, Math.sin(a) * d), [U(.85), U(.55), U(.85)], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: g(), rough: U(.18) })); }
  // The deck as Ed first asked for it (2026-10-11), the treehouse plan's step 1 (docs/backlog/treehouse.md, Ed 2026-10-14) replacing
  // it with the house below (E.house); kept behind the tuning's switch (treehouse.house.on false) for a build or two.
  const deckParts = () => {
    // ---- the deck: planks in rings, a thick rim, joists under it ----
    const top = D, gd = g();
    both(mm => mm.ell(P(0, top - .25, 0), [U(R), U(.25), U(R)], M.WOOD, { group: gd, paint: p => {
      const x = p[0] / k, z = p[2] / k, y = p[1] / k, r = Math.hypot(x, z), a = Math.atan2(z, x);
      if (y < top - .35) return M.BARK2; // its underside, darker
      if (r > R - .3) return M.BARKL; // the rim
      const ring = r / .55, ri = Math.floor(ring); if (ring % 1 < .1) return M.BARKD; // the rings' seams
      const n = Math.max(6, Math.round(r * Math.PI * 2 / 1.4)); if (((a / (Math.PI * 2) * n + ri * .37) % 1 + 1) % 1 < .045) return M.BARKD; // their joints
      return entHash(ri, Math.floor((a / (Math.PI * 2)) * n)) < .3 ? M.HAT2 : undefined; // boards a shade apart
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
        if (y > deskTop - .1 || y < .09) return ENT_FAIRY[((Math.floor(Math.atan2(z, x) * deskMid * 9) % 4) + 4) % 4]; // LED strips, top and bottom
        return ((Math.atan2(z, x) * deskMid * 5) % 1 + 1) % 1 < .08 ? M.BARK2 : undefined; // slats
      } })); } };
    wing(aCam + halfMid * .92, aCam + E.deskArc); wing(aCam - E.deskArc, aCam - halfMid * .92);
    lights.push({ at: dj.to([D0.platter.a, D0.top + .03, D0.platter.c]), rgb: [255, 80, 200], kind: "decks" }, { at: dj.to([D0.platter.a, D0.top + .03, -D0.platter.c]), rgb: [80, 230, 255], kind: "decks" });
    // (in the world, as drawn: the camera looks north, the side nearest it is south, +z: its angles there are its model angles less aCam, plus π/2)
    const S = Math.PI / 2;
    return { m, far, near, dj, stand, standR, k, top, deck: P(0, top, 0), table: P(0, tt, 0), circle: null, balcony: null, lights, desk: { inner: +standR.toFixed(2), front: +deskFront.toFixed(2), from: +(S - E.deskArc).toFixed(3), to: +(S + E.deskArc).toFixed(3), mid: +S.toFixed(3) }, aCam, RR };
  };

  // ---- The house (Ed, 2026-10-14, docs/backlog/treehouse.md): the hub, a round room on the Ent where the deck was, its back wall
  // and the far ribs of a glass dome drawn (the front cut away, so the camera sees in), the map in its middle as a water feature
  // (the world's disc at table height, the sea pouring off its sides into a pool on the floor, a golden grating over the pool so she
  // walks up to the map, flagstones round it, the rest planks), a clockwork moon on a ring round the room's top, and the magic
  // circle on the floor a few metres behind the decks (a red pentagram, the three claw marks in its middle, candles round it); and
  // the balcony, a half-round plank floor hung off the hub's south side (towards the camera and the dancefloor) on two boughs, open
  // at its edge (she flies straight onto it, and off it again), the decks' desk on its rim in the middle, squared to the camera.
  // In the rules' frame the hub's centre is the deck's (x east, z south); the balcony's centre lies `out` metres south of it. ----
  const houseParts = () => {
    const HS = E.house, top = D, Rb = HS.balcony.r, OUT = HS.balcony.out, wallH = HS.wallH, domeH = HS.domeH, poolR = HS.poolR, flagR = HS.flagR, TR = HS.tableR, TH = HS.tableH;
    const south = [Math.cos(aCam), Math.sin(aCam)], east = [Math.sin(aCam), -Math.cos(aCam)];
    const H = (dx, y, dz) => P(east[0] * dx + south[0] * dz, y, east[1] * dx + south[1] * dz); // (metres east and south of the hub's centre, y up: units)
    const inHouse = p => { const x = p[0] / k, z = p[2] / k; return { dx: east[0] * x + east[1] * z, dz: south[0] * x + south[1] * z }; }; // (a point's east and south, metres)
    const CIRC = { dz: HS.circle.out, r: HS.circle.r }, STAR = []; // the pentagram's five points, round the circle from the top (north)
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; STAR.push([Math.cos(a) * CIRC.r * .86, Math.sin(a) * CIRC.r * .86]); }
    const segD = (px, pz, a, b) => { const vx = b[0] - a[0], vz = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * vx + (pz - a[1]) * vz) / (vx * vx + vz * vz))); return Math.hypot(px - a[0] - vx * t, pz - a[1] - vz * t); };
    const circlePaint = (dx, dz) => { // the magic circle on the floor: its ring, the pentagram's lines, the claw marks
      const x = dx, z = dz - CIRC.dz, r = Math.hypot(x, z);
      if (r > CIRC.r + .12) return undefined;
      if (Math.abs(r - CIRC.r) < .08 || Math.abs(r - CIRC.r * .86) < .04) return M.CLOTH;
      for (let i = 0; i < 5; i++) if (segD(x, z, STAR[i], STAR[(i + 2) % 5]) < .07) return M.CLOTH;
      for (const [cx, cz] of [[-.28, -.1], [0, 0], [.28, .1]]) if (segD(x, z, [cx - .12, cz - .3], [cx + .12, cz + .3]) < .05) return M.BARKD; // the three claw marks, gouged
      return r < CIRC.r - .2 ? M.BARK2 : undefined; // (the floor inside the ring, scorched darker)
    };
    const floorPaint = p => { // the hub's floor: the grating over the pool, flagstones round it, planks beyond, the circle
      const { dx, dz } = inHouse(p), r = Math.hypot(dx, dz), y = p[1] / k;
      if (y < top - .35) return M.BARK2; // its underside
      const c = circlePaint(dx, dz); if (c) return c;
      if (HS.organic) { // the Ent's own house (Ed, 2026-10-23: "redraw the terrace at the same time"): wide boards across it, a carved ring in its middle, its rim
        if (r > R - .3) return M.BARKL;
        const ring = Math.abs(r - 2.4); if (ring < .08) return M.BARKD; if (ring < .2) return M.BARKL;
        const b = Math.floor(dz / .6), off = entHash(b, 13) * 4;
        if (((dz / .6) % 1 + 1) % 1 < .07 || (((dx + off) / 3.4) % 1 + 1) % 1 < .025) return M.BARKD;
        return entHash(b, Math.floor((dx + off) / 3.4)) < .3 ? M.HAT2 : undefined;
      }
      if (r < poolR) { // the pool under its golden grating: bars every 30 cm each way, the dark water and a koi or two between them
        if (Math.abs(((dx * 3.3) % 1 + 1) % 1 - .5) > .36 || Math.abs(((dz * 3.3) % 1 + 1) % 1 - .5) > .36) return M.STRAW;
        for (const [kx, kz, ka] of [[.9, -1.4, .3], [-1.6, .5, 1.9], [.4, 1.8, 4.2]]) { const ux = Math.cos(ka), uz = Math.sin(ka), lx = (dx - kx) * ux + (dz - kz) * uz, lz = -(dx - kx) * uz + (dz - kz) * ux; if ((lx / .32) ** 2 + (lz / .12) ** 2 < 1) return M.EAR; }
        return M.WATER;
      }
      if (r < poolR + .3) return M.STONE; // the pool's stone lip
      if (r < flagR) { // flagstones, their seams dark
        const a = Math.atan2(dz, dx), n = Math.max(6, Math.round(r * 5.2)), ri = Math.floor((r - poolR) / .9), u = ((a / (Math.PI * 2) * n + ri * .41) % 1 + 1) % 1;
        if (((r - poolR) / .9) % 1 < .07 || u < .06) return M.STONED;
        return entHash(ri, Math.floor((a / (Math.PI * 2)) * n)) < .35 ? M.BARKL : M.STONE;
      }
      if (r > R - .3) return M.BARKL; // the rim
      const ring = r / .55, ri = Math.floor(ring); if (ring % 1 < .1) return M.BARKD; // planks in rings, as the deck's
      const n = Math.max(6, Math.round(r * Math.PI * 2 / 1.4)), a = Math.atan2(p[2], p[0]); if (((a / (Math.PI * 2) * n + ri * .37) % 1 + 1) % 1 < .045) return M.BARKD;
      return entHash(ri, Math.floor((a / (Math.PI * 2)) * n)) < .3 ? M.HAT2 : undefined;
    };
    const gd = g();
    both(mm => mm.ell(P(0, top - .25, 0), [U(R), U(.25), U(R)], M.WOOD, { group: gd, paint: floorPaint }));
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + .2, c = Math.cos(a), s = Math.sin(a); both(mm => mm.box(P(c * R * .5, top - .65, s * R * .5), [U(R * .48), U(.14), U(.12)], M.BARK2, { dir: [c, 0, s], up: [0, 1, 0], group: g() })); } // joists
    // the balcony: a half-round plank floor out of the hub's south side, its boards running south, a thick rim; two boughs under it
    const gb = g(), balconyPaint = p => { const { dx, dz } = inHouse(p), y = p[1] / k, rb = Math.hypot(dx, dz - OUT);
      if (y < top - .4) return M.BARK2;
      if (rb > Rb - .3) return M.BARKL;
      if (Math.abs(((dx * 2.2) % 1 + 1) % 1 - .5) > .46) return M.BARKD; // the boards' seams
      if (((dz * .7 + Math.floor(dx * 2.2) * .37) % 1 + 1) % 1 < .04) return M.BARKD; // their joints
      return entHash(Math.floor(dx * 2.2), Math.floor(dz * .7)) < .3 ? M.HAT2 : undefined; };
    both(mm => mm.ell(H(0, top - .3, OUT), [U(Rb), U(.22), U(Rb)], M.WOOD, { group: gb, paint: balconyPaint }));
    for (const sgn of [-1, 1]) { const sx = sgn * 2.2; limb([[sx * .9, 16 * hs, 1.2, 1.3], [sx * 1.4, top - 3.2, 4.5, 1.0], [sx * 1.5, top - 1.2, 8.5, .65], [sx * 1.3, top - .5, 10.4, .25]].map(([x, y, z, r]) => [east[0] * x + south[0] * z, y, east[1] * x + south[1] * z, r]), { rough: .07 });
      for (let i = 0; i < 3; i++) both(mm => mm.ell(H(sx * (1.1 + .5 * i) + (entHash(i, sgn + 7) - .5), top - .9 - entHash(i, sgn) * .6, 6 + i * 2.1), [U(.8), U(.5), U(.8)], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: g(), rough: U(.18) })); } // leafy tufts under it
    // ---- the hub's wall: planks round the back, windows glowing in it, the front cut away; a post at each cut end (none on the Ent's
    // own house: the Terrace is its platform, open, a rail round its back drawn by the game, render/houseArt.ts) ----
    const WR = R - .12, OPEN_ARC = HS.openArc, nW = HS.organic ? 0 : Math.round(WR * Math.PI * 2 / .5), gw = g();
    for (let i = 0; i < nW; i++) { const a0 = i / nW * Math.PI * 2, a1 = (i + 1) / nW * Math.PI * 2, am = (a0 + a1) / 2;
      if (Math.cos(am - aCam) > Math.cos(OPEN_ARC)) continue; // (the front, open to the camera)
      const c = Math.cos(am), s = Math.sin(am), win = i % 5 === 2;
      both(mm => mm.box(P(c * WR, top + wallH / 2, s * WR), [U((a1 - a0) * WR / 2 + .015), U(wallH / 2), U(.11)], M.WOOD, { dir: [-s, 0, c], up: [0, 1, 0], group: gw, paint: p => {
        const y = p[1] / k - top, r = Math.hypot(p[0], p[2]) / k;
        if (r > WR + .05) return M.BARK2; // the outside, weathered
        if (win && y > 1.3 && y < 2.3) return M.GLOW; // a window
        if (y > wallH - .12 || y < .14) return M.BARKL; // the plate and the skirting
        return Math.abs(((y * 2.6) % 1 + 1) % 1 - .5) > .46 ? M.BARKD : undefined; } })); }
    if (!HS.organic) for (const sgn of [-1, 1]) { const a = aCam + sgn * OPEN_ARC, c = Math.cos(a), s = Math.sin(a), gp = g(); nearAlso(mm => mm.box(P(c * WR, top + wallH / 2, s * WR), [U(.16), U(wallH / 2 + .05), U(.16)], M.WOOD, { group: gp, round: U(.03), paint: p => (Math.abs(p[1] / k - top - wallH) < .08 ? M.BARKL : undefined) })); }
    // ---- the glass dome over it: an iron ring on the wall's top, its far ribs rising to a finial; the clockwork moon on a ring below the glass ----
    const gr = g();
    for (let i = 0; i < nW; i++) { const a0 = i / nW * Math.PI * 2, a1 = (i + 1) / nW * Math.PI * 2; if (Math.cos((a0 + a1) / 2 - aCam) > 0) continue;
      both(mm => mm.seg(P(Math.cos(a0) * WR, top + wallH + .04, Math.sin(a0) * WR), P(Math.cos(a1) * WR, top + wallH + .04, Math.sin(a1) * WR), U(.07), U(.07), M.BODY3, { group: gr })); }
    const apex = top + wallH + domeH, nRib = HS.organic ? 0 : 12, grib = g();
    for (let i = 0; i < nRib; i++) { const a = i / nRib * Math.PI * 2 + Math.PI / nRib; if (Math.cos(a - aCam) > .1) continue;
      const pts = []; for (let j = 0; j <= 5; j++) { const u = j / 5, th = u * Math.PI / 2; pts.push([Math.cos(a) * WR * Math.cos(th), top + wallH + domeH * Math.sin(th), Math.sin(a) * WR * Math.cos(th), .05 - .015 * u]); }
      both(mm => mm.chain(pts.map(([x, y, z, r]) => [U(x), U(y), U(z), U(r)]), M.BODY3, { group: grib })); }
    if (!HS.organic) both(mm => mm.ell(P(0, apex + .12, 0), [U(.16), U(.22), U(.16)], M.STRAW, { group: g() })); // the finial
    if (!HS.organic) { // the clockwork moon: a brass track just under the dome's ring, a gear on it, and the moon out on an arm at its station tonight (the far side)
      const MR = WR - .45, my = top + wallH - .35, gm = g(), ma = aCam + Math.PI + HS.moonAt;
      for (let i = 0; i < nW; i++) { const a0 = i / nW * Math.PI * 2, a1 = (i + 1) / nW * Math.PI * 2; if (Math.cos((a0 + a1) / 2 - aCam) > .35) continue;
        both(mm => mm.seg(P(Math.cos(a0) * MR, my, Math.sin(a0) * MR), P(Math.cos(a1) * MR, my, Math.sin(a1) * MR), U(.05), U(.05), M.STRAW, { group: gm })); }
      const mc = [Math.cos(ma) * (MR - .75), my - .1, Math.sin(ma) * (MR - .75)];
      both(mm => mm.seg(P(Math.cos(ma) * MR, my, Math.sin(ma) * MR), P(...mc), U(.06), U(.04), M.BODY3, { group: gm }));
      both(mm => mm.ell(P(Math.cos(ma) * MR, my, Math.sin(ma) * MR), [U(.22), U(.22), U(.1)], M.STRAW, { group: g(), dir: [Math.cos(ma), 0, Math.sin(ma)], paint: p => (entHash(Math.floor(p[0] / k * 30), Math.floor(p[1] / k * 30)) < .3 ? M.BODY3 : undefined) })); // the gear
      both(mm => mm.ell(P(...mc), [U(.42), U(.42), U(.42)], M.BELLY, { group: g(), paint: p => (entHash(Math.floor(p[0] / k * 9), Math.floor((p[1] + p[2]) / k * 9)) < .22 ? M.BODY2 : undefined) })); // the moon, its seas
      lights.push({ at: P(...mc), rgb: [200, 214, 255], kind: "moon" });
    }
    // ---- the map: the world's disc on a stone pedestal, the sea pouring off its sides into the pool ----
    const tt = top + TH, gt = g(), seaPaint = p => { const { dx, dz } = inHouse(p), r = Math.hypot(dx, dz), y = p[1] / k;
      if (y < tt - .06) return M.STONE;
      if (r > TR - .12) return M.BARKL; // its rim
      for (let i = 0; i < 9; i++) { const a = i * 2.4 + .7, d = .32 + .5 * entHash(i, 11), ix = Math.cos(a) * d * TR, iz = Math.sin(a) * d * TR, rr = (.1 + .1 * entHash(i, 13)) * TR; // the islands, hinted: a dark shape, its sigil a point of neon
        const e = Math.hypot((dx - ix) / rr, (dz - iz) / (rr * (.7 + .5 * entHash(i, 17)))); if (e < .22) return ENT_FAIRY[i % 4]; if (e < 1) return i === 0 ? M.MOSS : M.STONED; }
      return M.WATER; };
    if (!HS.organic) both(mm => { mm.seg(P(0, top, 0), P(0, tt - .3, 0), U(.55), U(.4), M.STONE, { group: gt, rough: U(.05), paint: p => (Math.abs(p[1] / k - top - TH * .45) < .06 ? M.STONED : undefined) });
      mm.ell(P(0, tt - .06, 0), [U(TR), U(.08), U(TR)], M.STONE, { group: gt + 1, paint: seaPaint });
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + .4, c = Math.cos(a), s2 = Math.sin(a); // the sea pouring off the rim in streams, flecked white, into the pool
        mm.seg(P(c * (TR - .02), tt - .04, s2 * (TR - .02)), P(c * (poolR - .7), top + .04, s2 * (poolR - .7)), U(.09), U(.16), M.WATER, { group: gt + 2, paint: p => (entHash(Math.floor(p[0] / k * 14 + p[1] / k * 3), Math.floor(p[2] / k * 14)) < .14 ? M.BELLY : undefined) }); } });
    g(); g(); g();
    // ---- the magic circle's candles, five round it, lit ----
    for (let i = 0; i < 5; i++) { const [sx, sz] = STAR[i], gc = g(), base = H(sx * 1.18, top, CIRC.dz + sz * 1.18);
      both(mm => { mm.seg(base, v3.add(base, [0, U(.22), 0]), U(.045), U(.04), M.BELLY, { group: gc }); mm.ell(v3.add(base, [0, U(.28), 0]), [U(.035), U(.06), U(.035)], M.MAGIC2, { group: gc + 1 }); }); g();
      lights.push({ at: v3.add(base, [0, U(.3), 0]), rgb: [255, 170, 80], kind: "candle" }); }
    // ---- the DJ decks: a curved desk along the balcony's rim in the middle, squared to the camera; a lantern post at each end of it ----
    const D0 = DJ_DECKS, RRb = Rb - .22, deskFront = RRb - E.deskGap, a1m = D0.depth[1] / k, standR = deskFront - a1m - .02, stand = H(0, top, OUT + standR);
    const dj = djTable(near, { facing, stand }); djTable(m, { facing, stand });
    const deskIn = deskFront - (D0.depth[1] - D0.depth[0]) / k, deskMid = (deskFront + deskIn) / 2, deskTop = D0.top / k, halfMid = D0.width / k / standR;
    const wing = (from, to) => { const n = Math.max(2, Math.round((to - from) / .07)); for (let i = 0; i < n; i++) {
      const a0 = from + (to - from) * i / n, a1 = from + (to - from) * (i + 1) / n, am = (a0 + a1) / 2, c = Math.cos(am), s = Math.sin(am), len = (a1 - a0) * deskMid / 2 + .02, gw2 = 60 + 20 + (i % 3);
      const ctr = H(0, 0, OUT); // (the balcony's centre, units; the wing's arc round it)
      nearAlso(mm => mm.box([ctr[0] + U(c * deskMid), U(top + deskTop / 2), ctr[2] + U(s * deskMid)], [U(len), U(deskTop / 2), U((deskFront - deskIn) / 2)], M.WOOD, { dir: [-s, 0, c], up: [0, 1, 0], group: gw2, round: U(.02), paint: p => {
        const x = (p[0] - ctr[0]) / k, z = (p[2] - ctr[2]) / k, y = p[1] / k - top, r = Math.hypot(x, z);
        if (y > deskTop - .02) return r > deskFront - .04 ? M.BARKL : M.SHADES;
        if (r < deskFront - .04) return M.BARKL;
        if (y > deskTop - .1 || y < .09) return ENT_FAIRY[((Math.floor(Math.atan2(z, x) * deskMid * 9) % 4) + 4) % 4];
        return ((Math.atan2(z, x) * deskMid * 5) % 1 + 1) % 1 < .08 ? M.BARK2 : undefined; } })); } };
    wing(aCam + halfMid * .92, aCam + E.deskArc); wing(aCam - E.deskArc, aCam - halfMid * .92);
    for (const sgn of [-1, 1]) { const a = aCam + sgn * (E.deskArc + .08), c = Math.cos(a), s = Math.sin(a), ctr = H(0, 0, OUT), b = [ctr[0] + U(c * RRb), U(top), ctr[2] + U(s * RRb)], gp = g();
      nearAlso(mm => { mm.box(v3.add(b, [0, U(.6), 0]), [U(.12), U(.62), U(.12)], M.WOOD, { group: gp, round: U(.03) }); mm.ell(v3.add(b, [0, U(1.3), 0]), [U(.14), U(.17), U(.14)], M.GLOW, { group: gp + 1, paint: p => (Math.abs(p[1] - b[1] - U(1.3)) < U(.05) ? M.MAGIC2 : undefined) }); }); g();
      lights.push({ at: v3.add(b, [0, U(1.3), 0]), rgb: [255, 190, 96], kind: "lantern" }); }
    lights.push({ at: dj.to([D0.platter.a, D0.top + .03, D0.platter.c]), rgb: [255, 80, 200], kind: "decks" }, { at: dj.to([D0.platter.a, D0.top + .03, -D0.platter.c]), rgb: [80, 230, 255], kind: "decks" });
    const S = Math.PI / 2;
    return { m, far, near, dj, stand, standR, k, top, deck: P(0, top, 0), table: P(0, tt, 0), circle: H(0, top, CIRC.dz), balcony: H(0, top, OUT), lights,
      desk: { inner: +standR.toFixed(2), front: +deskFront.toFixed(2), from: +(S - E.deskArc).toFixed(3), to: +(S + E.deskArc).toFixed(3), mid: +S.toFixed(3) }, aCam, RR: RRb };
  };
  // ---- The oak (Ed, 2026-10-24, the treehouse layout v4: config/house/): the Terrace one of the trunk's rooms, its floor the game's
  // (render/houseArt.ts paints the oak's whole floor from its shape while she's in the house); here a round of the tree's own wood
  // for the outside view (no planks: growth rings, a mossy bark rim), the magic circle's candles, and her decks on the Terrace's
  // open south-east rim: the DJ table where she stands, a straight desk either side of it, a lantern at each end. In the rules'
  // frame (x east, z south, metres from the Terrace's middle: config/house/base.json terrace, HOUSE.terrace here). ----
  const oakParts = () => {
    const HS = E.house, Tt = HS.terrace, top = D, Rt = Tt.r;
    const south = [Math.cos(aCam), Math.sin(aCam)], east = [Math.sin(aCam), -Math.cos(aCam)];
    const H = (dx, y, dz) => P(east[0] * dx + south[0] * dz, y, east[1] * dx + south[1] * dz);
    const inHouse = p => { const x = p[0] / k, z = p[2] / k; return { dx: east[0] * x + east[1] * z, dz: south[0] * x + south[1] * z }; };
    const floorPaint = p => { const { dx, dz } = inHouse(p), r = Math.hypot(dx, dz), y = p[1] / k;
      if (y < top - .35) return M.BARK2; // its underside
      if (r > Rt - .45) return entHash(Math.floor(Math.atan2(dz, dx) * Rt * 2), 3) < .4 ? M.MOSS : M.BARK2; // the bark rim, mossy
      const g2 = r * 1.6 + .5 * Math.sin(Math.atan2(dz, dx) * 3), f = g2 - Math.floor(g2); // (growth rings round its heart, a little warped)
      return f < .09 ? M.BARKD : f > .7 ? M.HAT2 : undefined; };
    both(mm => mm.ell(P(0, top - .25, 0), [U(Rt), U(.25), U(Rt)], M.WOOD, { group: g(), paint: floorPaint }));
    // the magic circle's candles, five round it, lit
    const C = Tt.circle;
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5, gc = g(), base = H(C.x + Math.cos(a) * C.r * 1.02, top, C.z + Math.sin(a) * C.r * 1.02);
      both(mm => { mm.seg(base, v3.add(base, [0, U(.22), 0]), U(.045), U(.04), M.BELLY, { group: gc }); mm.ell(v3.add(base, [0, U(.28), 0]), [U(.035), U(.06), U(.035)], M.MAGIC2, { group: gc + 1 }); }); g();
      lights.push({ at: v3.add(base, [0, U(.3), 0]), rgb: [255, 170, 80], kind: "candle" }); }
    // her decks: the DJ table at her seat, the desk's two wings either side of it along the rim, a lantern at each end
    const D0 = DJ_DECKS, S0 = Tt.seat, DK = Tt.decks, stand = H(S0.x, top, S0.z);
    const dj = djTable(near, { facing, stand }); djTable(m, { facing, stand });
    const half = D0.width / k + .02, deskTop = D0.top / k, x0 = DK.x - DK.w / 2, x1 = DK.x + DK.w / 2;
    for (const [a, b] of [[x0, S0.x - half], [S0.x + half, x1]]) { if (b - a < .1) continue;
      nearAlso(mm => mm.box(H((a + b) / 2, top + deskTop / 2, DK.z), [U((b - a) / 2), U(deskTop / 2), U(DK.d / 2)], M.WOOD, { dir: [east[0], 0, east[1]], up: [0, 1, 0], group: 80 + (a < S0.x ? 0 : 1), round: U(.02), paint: p => {
        const { dx, dz } = inHouse(p), y = p[1] / k - top;
        if (y > deskTop - .02) return M.SHADES;
        if (dz < DK.z + DK.d / 2 - .04) return M.BARKL; // (its back and ends)
        if (y > deskTop - .1 || y < .09) return ENT_FAIRY[((Math.floor(dx * 9) % 4) + 4) % 4]; // the LED strips
        return ((dx * 5) % 1 + 1) % 1 < .08 ? M.BARK2 : undefined; } })); }
    for (const x of [x0 - .15, x1 + .15]) { const b = H(x, top, DK.z), gp = g();
      nearAlso(mm => { mm.box(v3.add(b, [0, U(.6), 0]), [U(.12), U(.62), U(.12)], M.WOOD, { group: gp, round: U(.03) }); mm.ell(v3.add(b, [0, U(1.3), 0]), [U(.14), U(.17), U(.14)], M.GLOW, { group: gp + 1, paint: p => (Math.abs(p[1] - b[1] - U(1.3)) < U(.05) ? M.MAGIC2 : undefined) }); }); g();
      lights.push({ at: v3.add(b, [0, U(1.3), 0]), rgb: [255, 190, 96], kind: "lantern" }); }
    lights.push({ at: dj.to([D0.platter.a, D0.top + .03, D0.platter.c]), rgb: [255, 80, 200], kind: "decks" }, { at: dj.to([D0.platter.a, D0.top + .03, -D0.platter.c]), rgb: [80, 230, 255], kind: "decks" });
    const S = Math.PI / 2, standR = Math.hypot(S0.x, S0.z);
    return { m, far, near, dj, stand, standR, k, top, deck: P(0, top, 0), table: P(0, top, 0), circle: H(C.x, top, C.z), balcony: H(DK.x, top, DK.z), lights, seat: { x: S0.x, z: S0.z },
      candleRow: { x0: S0.x - 1.4, x1: S0.x + 1.4, z: DK.z + DK.d / 2 - .12, at: (dx, y, dz) => H(dx, y, dz) },
      desk: { inner: +standR.toFixed(2), front: +(standR + DK.d).toFixed(2), from: +(S - .3).toFixed(3), to: +(S + .3).toFixed(3), mid: +S.toFixed(3) }, aCam, RR: Rt };
  };
  return E.house ? (E.house.organic ? oakParts() : houseParts()) : deckParts();
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
export function entSprite(st = {}, { facing = "towards", ppm = 16, deckY = ENT.deckY, deckR = ENT.deckR, house = /** @type {boolean | { organic?: boolean }} */ (false) } = {}) {
  const E = { ...ENT, deckY, deckR, house: house ? { ...HOUSE, terrace: OAK_TERRACE, ...(typeof house === "object" ? house : {}) } : null }, T = entModel(st, facing, E), ppu = witchPixelsPerUnit(st), r = render(T.m, { scale: ppu, facing }), full = r.sp;
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
  const k = T.k, cr = T.desk.front - .12, candles = [], CR = T.candleRow;
  for (let i = 0; i < CANDLE.samples; i++) { const u = i / (CANDLE.samples - 1), a = T.aCam - .32 + .64 * u; candles.push(at(CR ? CR.at(CR.x0 + (CR.x1 - CR.x0) * u, T.top + DJ_DECKS.top / k, CR.z) : [Math.cos(a) * cr * k, (T.top + DJ_DECKS.top / k) * k, Math.sin(a) * cr * k])); }
  candles.sort((p, q) => p.x - q.x);
  const seat = at(T.stand), cam = at(v3.add(T.stand, [0, .55, 0]));
  return { whole, far, near, fore, foreFrames, foreBox: { x: fx0, y: fy0 }, candles,
    anchors: { base: at([0, 0, 0]), deck: at(T.deck), table: at(T.table), seat, ...(T.circle ? { circle: at(T.circle), balcony: at(T.balcony) } : {}), platter: at(T.dj.to([DJ_DECKS.platter.a, DJ_DECKS.top, DJ_DECKS.platter.c])), camera: cam, lights: T.lights.map(L => ({ ...at(L.at), rgb: L.rgb, kind: L.kind })) },
    metres: { height: +(H / ppm).toFixed(1), width: +(W / ppm).toFixed(1), deckY: E.deckY, deckR: E.deckR, railH: E.railH, tableR: E.tableR, tableH: E.tableH, desk: T.desk,
      seat: T.seat ?? { x: 0, z: +((E.house ? E.house.balcony.out : 0) + T.standR).toFixed(2) }, trunk: 5.6, footprint: 7.6,
      ...(E.house ? { house: { hub: E.deckR, balcony: E.house.balcony, wallH: E.house.wallH, domeH: E.house.domeH, poolR: E.house.poolR, table: { r: E.house.tableR, h: E.house.tableH }, circle: E.house.circle, openArc: E.house.openArc } } : {}) } };
}

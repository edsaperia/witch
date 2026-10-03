// The witch's treehouse (Ed: "like a camper van had a baby with a castle and it got stuck in a
// tree. This is near the dancefloor; you start the game sitting on its terrace"). The home landmark:
//   - the tree: a giant broad trunk, roots spilling out over the ground, thick branches cradling
//     the van, a crown of leaves behind and above;
//   - the camper: a rounded two-tone van body wedged nose-up in the branches, a pop-top roof with
//     striped canvas, side windows and a round porthole glowing warm, a sliding door, a wing mirror,
//     hubcaps, a ladder up the back to the roof;
//   - the castle: a stone turret growing up out of the van's back with an arrow slit, crenellations,
//     a pointy tiled roof and a pennant; a stone chunk wedged under the van;
//   - patched together with planks and rope, bunting along the branches and fairy lights in the
//     party's colours;
//   - the terrace: a plank deck off the van's nose, with a railing, plant pots, a striped awning,
//     a lantern and a camping chair (where she sits at the start);
//   - a rope ladder down the trunk (decorative: she flies).
// Built in 3D (model3d.js) to the witch's own size, so her sit pose fits its chair; turned towards
// or away. Split into a base (trunk, van, terrace: seen from the ground) and a top (the crown, the
// turret's roof and pennant: drawn in treetop mode, cut out round the witch). Anchors: the seat,
// the door and the light sources, in pixels.
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit, WITCH_SEAT_HEIGHT } from "./witch.js";

// Its parts' materials. The windows glow warm (GLOW, brightest MAGIC2); the fairy lights are three
// party neons (COLLAR pink, RUNE cyan, WOKEN gold) and MAGIC (violet).
const LEAVES = new Set([M.LEAF, M.LEAF2, M.LEAF3]);
export function treehouseColours(st = {}) {
  const leaf = st.leafHue ?? .3, van = st.vanHue ?? .03;
  return {
    [M.TRUNK]: [92, 66, 48], [M.BARK2]: [70, 50, 38], [M.BARKD]: [44, 32, 28], [M.BARKL]: [124, 94, 68],
    [M.LEAF]: hsv2rgb(leaf, .55, .42), [M.LEAF2]: hsv2rgb(leaf + .02, .5, .55), [M.LEAF3]: hsv2rgb(leaf + .04, .6, .26),
    [M.BODY]: hsv2rgb(van, .62, .72), [M.BELLY]: [236, 226, 204], [M.BODY2]: hsv2rgb(van + .5, .45, .6), // the van's paint, its cream top, the awning's second stripe
    [M.BODY3]: [40, 36, 46], [M.FRAME]: [196, 200, 210], [M.SHADES]: [28, 26, 32], // tyres and the slate roof's dark rows, chrome, rubber
    [M.HAT1]: [74, 70, 96], [M.HAT2]: [96, 88, 122], // the turret roof's tiles, in two rows
    [M.STONE]: [118, 116, 124], [M.STONED]: [64, 62, 72], [M.MOSS]: [80, 112, 60],
    [M.WOOD]: [148, 104, 62], [M.STRAW]: [196, 168, 112], [M.CLOTH]: [232, 220, 196], [M.ACCENT]: hsv2rgb(.95, .6, .85), [M.EAR]: [176, 96, 64], // planks, rope, canvas, the pennant, terracotta
    [M.GLOW]: [255, 190, 96], [M.MAGIC2]: [255, 236, 190], // warm window light
    [M.COLLAR]: [255, 80, 200], [M.RUNE]: [80, 230, 255], [M.WOKEN]: [255, 214, 80], [M.MAGIC]: [180, 110, 255], // fairy lights
    [M.LINE]: [24, 22, 30], [M.NOSE]: [14, 12, 18],
  };
}

// The terrace's deck height and the chair (model units, the witch's own; she is about 1.3 tall).
const DECK = 2.5, CHAIR = [2.2, DECK, .3];
const FAIRY = [M.COLLAR, M.RUNE, M.WOKEN, M.MAGIC];
function treehouseModel() {
  const m = new Model({ blend: .05 }), lights = [];
  const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
  // ---- the tree: trunk, roots, branches ----
  const bark = p => { const k = Math.sin(Math.atan2(p[2], p[0]) * 9 + p[1] * 2.3); return k > .75 ? M.BARKD : k < -.6 ? M.BARKL : k > .35 ? M.BARK2 : undefined; };
  m.chain([[0, -.05, -.2, .62], [.05, 1.4, -.22, .5], [.1, 2.4, -.3, .44], [-.05, 3.6, -.45, .34], [-.15, 4.7, -.55, .24]], M.TRUNK, { group: 1, rough: .025, paint: bark });
  for (let i = 0; i < 7; i++) { // roots spilling out over the ground
    const a = i / 7 * Math.PI * 2 + .3, r0 = .45, r1 = 1.05 + hash(i, 1) * .45;
    m.chain([[Math.cos(a) * r0, .45, -.2 + Math.sin(a) * r0, .2], [Math.cos(a) * (r0 + r1) * .55, .16, -.2 + Math.sin(a) * (r0 + r1) * .55, .13], [Math.cos(a) * r1, .02, -.2 + Math.sin(a) * r1, .05]], M.TRUNK, { group: 1, rough: .015, paint: bark });
  }
  const branch = (pts, g = 1) => m.chain(pts, M.TRUNK, { group: g, rough: .015, paint: bark });
  branch([[.1, 2.0, -.25, .26], [.9, 2.12, .0, .18], [1.6, 2.2, .1, .13], [2.9, 2.35, .2, .07]]);   // under the van's nose and the terrace
  branch([[0, 2.1, -.3, .25], [-.9, 2.25, -.05, .17], [-1.7, 2.45, .05, .1], [-2.2, 2.75, .05, .05]]); // under its back
  branch([[-.05, 3.6, -.45, .2], [.9, 4.3, -.55, .14], [1.8, 4.9, -.6, .07]], 2);                    // up into the crown
  branch([[-.1, 4.0, -.5, .18], [-1.1, 4.6, -.7, .12], [-1.9, 5.0, -.8, .06]], 2);
  branch([[-.15, 4.6, -.55, .14], [.2, 5.4, -.85, .08]], 2);
  // ---- the crown: leafy clumps behind and above the house ----
  const leafy = c => p => { const n = hash(Math.floor(p[0] * 9), Math.floor(p[1] * 9) + Math.floor(p[2] * 9) * 7); return p[1] < c[1] - .25 || n < .18 ? M.LEAF3 : n > .82 ? M.LEAF2 : undefined; };
  for (const [c, r] of [[[-1.7, 5.15, -.9], [.95, .6, .75]], [[1.6, 5.2, -.8], [.95, .62, .75]], [[.1, 5.85, -1.0], [1.15, .7, .85]], [[-.7, 4.65, -1.25], [.85, .55, .6]], [[.95, 4.6, -1.3], [.8, .5, .6]], [[-2.4, 4.6, -.7], [.55, .45, .5]], [[2.5, 4.75, -.6], [.6, .45, .5]]])
    m.ell(c, r, M.LEAF, { group: 40, rough: .05, paint: leafy(c) });
  // ---- the camper van, wedged nose-up in the branches ----
  const vc = [-.15, 2.92, .15], vd = v3.norm([1, .07, 0]), vh = [1.25, .52, .58];
  const vx = p => v3.dot(v3.sub(p, vc), vd), vy = p => v3.dot(v3.sub(p, vc), [-vd[1], vd[0], 0]); // along and up the van
  m.box(vc, vh, M.BODY, { dir: vd, round: .22, group: 3, paint: p => {
    const x = vx(p), y = vy(p), side = p[2] > vc[2] + vh[2] - .04;
    if (side && Math.hypot(x + .85, y - .02) < .15) return Math.hypot(x + .85, y - .02) < .11 ? M.GLOW : M.FRAME; // the porthole
    if (side && x > .35 && x < .8 && y > -.42 && y < .38) return y > .02 && y < .3 && x > .42 && x < .73 ? M.GLOW : Math.abs(x - .575) < .2 && y < -.38 ? M.FRAME : M.BODY2; // the sliding door, its window lit
    if (side && y > .06 && y < .32 && x > -.6 && x < .25) return (Math.abs(x + .17) < .02) ? M.BELLY : M.GLOW; // side windows, lit
    if (x > vh[0] - .05 && y > .05 && y < .35 && Math.abs(p[2] - vc[2]) < .45) return M.MAGIC2; // the windscreen, lamplight inside
    if (x > vh[0] - .06 && Math.abs(y + .2) < .07 && Math.abs(Math.abs(p[2] - vc[2]) - .38) < .08) return M.FRAME; // headlights
    return y > .02 ? M.BELLY : y < -.42 ? M.SHADES : undefined; // cream above, paint below, a rubber skirt
  } });
  lights.push({ at: v3.add(vc, [-.15, .2, vh[2] + .1]), rgb: [255, 190, 96], kind: "window" }, { at: v3.add(vc, [-.9, .05, vh[2] + .1]), rgb: [255, 190, 96], kind: "porthole" }, { at: v3.add(vc, [1.3, .25, 0]), rgb: [255, 236, 190], kind: "windscreen" });
  for (const x of [-.75, .75]) { const c = v3.add(v3.add(vc, v3.mul(vd, x)), [0, -.5, vh[2] - .02]); m.ell(c, [.21, .21, .08], M.SHADES, { group: 4, paint: p => Math.hypot(p[0] - c[0], p[1] - c[1]) < .1 ? M.FRAME : undefined }); } // wheels and hubcaps
  m.seg(v3.add(vc, [1.05, .3, vh[2] - .02]), v3.add(vc, [1.2, .32, vh[2] + .14]), .015, .015, M.FRAME, { group: 5 }); m.box(v3.add(vc, [1.22, .34, vh[2] + .16]), [.04, .06, .02], M.FRAME, { group: 5, round: .015 }); // the wing mirror
  // the pop-top: a cream lid on striped canvas sides
  const top = v3.add(vc, [-.25, vh[1] + .14, 0]);
  m.box(top, [.95, .1, .5], M.CLOTH, { dir: vd, round: .05, group: 6, paint: p => Math.floor((vx(p) + 2) * 6) % 2 ? M.BODY2 : undefined });
  m.box(v3.add(top, [0, .14, 0]), [1.0, .05, .54], M.BELLY, { dir: v3.norm([1, .14, 0]), round: .04, group: 6 });
  // the ladder up the back to the roof
  for (const z of [-.18, .18]) m.seg(v3.add(vc, [-1.33, -.45, z]), v3.add(vc, [-1.3, .62, z]), .02, .02, M.FRAME, { group: 7 });
  for (let i = 0; i < 5; i++) m.seg(v3.add(vc, [-1.33, -.32 + i * .22, -.18]), v3.add(vc, [-1.33, -.32 + i * .22, .18]), .014, .014, M.FRAME, { group: 7 });
  // ---- the castle turret growing up out of the van's back ----
  const T = [-.75, 3.25, -.05], TR = .44, TH = 1.45;
  m.seg(T, v3.add(T, [0, TH, 0]), TR, TR - .04, M.STONE, { group: 8, rough: .012, paint: p => {
    const y = p[1] - T[1], a = Math.atan2(p[2] - T[2], p[0] - T[0]), row = Math.floor(y * 6), col = Math.floor((a + Math.PI) * 4 + (row % 2) * .5);
    if (Math.abs(a - Math.PI / 2 + .35) < .07 && y > .75 && y < 1.15) return M.GLOW; // the arrow slit, lit
    if ((y * 6) % 1 < .12 || ((a + Math.PI) * 4 + (row % 2) * .5) % 1 < .1) return M.STONED; // mortar
    return hash(row, col) < .15 && y < .5 ? M.MOSS : undefined;
  } });
  lights.push({ at: v3.add(T, [.2, .95, TR + .1]), rgb: [255, 190, 96], kind: "arrow slit" });
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; m.box(v3.add(T, [Math.cos(a) * (TR - .05), TH + .1, Math.sin(a) * (TR - .05)]), [.1, .1, .08], M.STONE, { dir: [-Math.sin(a), 0, Math.cos(a)], round: .02, group: 9, rough: .008 }); } // crenellations
  const roofBase = v3.add(T, [0, TH + .1, 0]), roofTip = v3.add(roofBase, [.08, 1.05, -.04]); // inside the crenellations
  m.seg(roofBase, roofTip, TR - .1, .02, M.HAT1, { group: 10, paint: p => Math.floor((p[1] - roofBase[1]) * 7) % 2 ? M.HAT2 : undefined }); // the pointy tiled roof
  m.seg(roofTip, v3.add(roofTip, [0, .45, 0]), .015, .012, M.FRAME, { group: 11 });
  m.box(v3.add(roofTip, [.17, .37, 0]), [.16, .06, .01], M.ACCENT, { dir: [1, -.15, .1], round: .005, group: 11 }); // the pennant
  m.box([-1.35, 2.45, .3], [.28, .2, .22], M.STONE, { dir: [1, .3, .2], round: .05, rough: .01, group: 12, paint: p => p[1] > 2.58 ? M.MOSS : undefined }); // a stone chunk wedged under the van
  // ---- patches: planks nailed over the van, rope lashing it to the branches ----
  m.box(v3.add(vc, [-.35, -.33, vh[2] + .01]), [.3, .05, .02], M.WOOD, { dir: [1, .12, 0], round: .01, group: 13 });
  m.box(v3.add(vc, [-.3, -.22, vh[2] + .01]), [.26, .045, .02], M.WOOD, { dir: [1, -.08, 0], round: .01, group: 13 });
  for (const x of [-.9, .95]) { const c = v3.add(vc, [x, -.55, 0]); for (const k of [-1, 1]) m.seg(v3.add(c, [k * .04, -.08, vh[2] + .03]), v3.add(c, [k * .04, .1, vh[2] + .03]), .025, .025, M.STRAW, { group: 14 }); }
  // ---- the terrace: a plank deck off the van's nose ----
  const deck = [2.05, DECK - .05, .3], dh = [.85, .05, .62];
  m.box(deck, dh, M.WOOD, { round: .02, group: 15, paint: p => ((p[2] - deck[2] + 2) * 9) % 1 < .12 ? M.BARKD : undefined }); // planks
  for (const [x, z] of [[1.3, -.25], [2.8, -.25], [2.8, .85], [1.3, .85]]) m.seg([x, DECK - .1, z], [x, DECK - .7, z * .3], .04, .04, M.WOOD, { group: 16 }); // struts down to the branch
  const rail = [[1.25, .9], [2.88, .9], [2.88, -.3]]; // the railing round the open sides
  for (let i = 0; i + 1 < rail.length; i++) {
    const [a, b] = [rail[i], rail[i + 1]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / .32);
    m.seg([a[0], DECK + .42, a[1]], [b[0], DECK + .42, b[1]], .025, .025, M.WOOD, { group: 17 });
    for (let k = 0; k <= n; k++) { const t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t; m.seg([x, DECK, z], [x, DECK + .42, z], .02, .02, M.WOOD, { group: 17 }); }
  }
  // the camping chair (its seat at the witch's seat height) and plant pots
  const C = CHAIR;
  m.box([C[0], C[1] + WITCH_SEAT_HEIGHT - .02, C[2]], [.2, .025, .2], M.CLOTH, { round: .02, group: 18, paint: p => Math.floor((p[2] + 2) * 10) % 2 ? M.BODY2 : undefined });
  m.box([C[0] - .2, C[1] + WITCH_SEAT_HEIGHT + .22, C[2]], [.025, .24, .2], M.CLOTH, { dir: [1, -.15, 0], round: .02, group: 18, paint: p => Math.floor((p[2] + 2) * 10) % 2 ? M.BODY2 : undefined });
  for (const [dx, dz] of [[-.18, -.18], [.18, -.18], [-.18, .18], [.18, .18]]) m.seg([C[0] + dx, C[1], C[2] + dz], [C[0] - dx * .6, C[1] + WITCH_SEAT_HEIGHT - .03, C[2] - dz * .2], .015, .015, M.FRAME, { group: 19 });
  for (const [x, z, s] of [[2.65, -.15, 1], [1.45, .7, .8], [2.7, .7, .7]]) {
    m.seg([x, DECK, z], [x, DECK + .2 * s, z], .1 * s, .13 * s, M.EAR, { group: 20 });
    m.ell([x, DECK + .3 * s, z], [.16 * s, .14 * s, .16 * s], M.LEAF2, { group: 21, rough: .02, paint: p => hash(Math.floor(p[0] * 30), Math.floor(p[1] * 30)) < .25 ? M.LEAF : undefined });
  }
  // the striped awning over the door and the deck's near half, and a lantern under it
  m.box([1.62, 3.55, .5], [.42, .02, .5], M.CLOTH, { dir: [1, -.35, 0], round: .01, group: 22, paint: p => Math.floor((p[2] + 2) * 5) % 2 ? M.BODY2 : undefined });
  for (const z of [.05, .95]) m.seg([1.98, 3.4, z], [1.98, DECK, z], .02, .02, M.WOOD, { group: 23 });
  m.seg([1.95, 3.42, .5], [1.95, 3.28, .5], .006, .006, M.FRAME, { group: 24 }); m.ell([1.95, 3.2, .5], [.05, .07, .05], M.MAGIC2, { group: 24 });
  lights.push({ at: [1.95, 3.2, .5], rgb: [255, 220, 150], kind: "lantern" });
  // ---- the rope ladder down the trunk ----
  for (const z of [.18, .48]) m.seg([1.2, DECK - .05, z], [1.0, .06, z + .12], .018, .018, M.STRAW, { group: 25 });
  for (let i = 1; i < 8; i++) { const t = i / 8, y = DECK - .05 - (DECK - .11) * t, x = 1.2 - .2 * t; m.seg([x, y, .18 + .12 * t], [x, y, .48 + .12 * t], .02, .02, M.WOOD, { group: 25 }); }
  // ---- bunting along the branches, fairy lights from the turret to the awning ----
  const string = (a, b, sag, n, each) => { for (let i = 0; i <= n; i++) { const t = i / n, p = v3.lerp(a, b, t); p[1] -= Math.sin(t * Math.PI) * sag; each(p, i); } };
  string([-.55, 3.95, .45], [1.95, 3.42, 1.0], .35, 9, (p, i) => { m.ell(p, [.035, .035, .035], FAIRY[i % 4], { group: 26 + (i % 2), extra: true }); });
  string([-.75, 4.7, .42], [1.6, 3.65, 1.0], .2, 7, (p, i) => { m.ell(p, [.03, .03, .03], FAIRY[(i + 2) % 4], { group: 28 + (i % 2), extra: true }); });
  string([2.88, DECK + .45, .9], [2.88, DECK + .45, -.3], .08, 5, (p, i) => { m.ell(p, [.03, .03, .03], FAIRY[(i + 1) % 4], { group: 30 + (i % 2), extra: true }); });
  string([-2.0, 2.8, .1], [-.9, 3.6, .5], .15, 5, (p, i) => { m.box(p, [.05, .06, .01], [M.ACCENT, M.BODY2, M.CLOTH][i % 3], { dir: [1, 0, .2], round: .005, group: 32 + (i % 2) }); }); // bunting
  lights.push({ at: [.7, 3.4, .75], rgb: [255, 120, 220], kind: "fairy lights" }, { at: [2.88, DECK + .4, .3], rgb: [120, 230, 255], kind: "fairy lights" });
  m.ell([.2, .005, -.15], [1.5, .005, 1.0], M.NOSE, { group: 0 }); // its shadow on the ground
  return { m, lights, seat: [C[0], C[1], C[2]], door: v3.add(vc, [.57, -.45, vh[2]]), splitY: vc[1] + vh[1] + .5 };
}

// The treehouse at the witch's scale: { whole, top, bot, crownY, anchors: { seat, door, lights: [{ x, y, rgb, kind }] }, metres }.
// base: the trunk's foot on the ground (place the treehouse by it); seat: where her sit pose's anchor goes (the deck under the chair); door: the van's sliding door at the deck; lights: its light sources.
// top is the crown and everything above the van's roof (drawn in treetop mode, cut out round the witch); bot the rest.
export function treehouseSprite(st = {}, { facing = "towards", ppm = 16 } = {}) {
  const T = treehouseModel(), r = render(T.m, { scale: witchPixelsPerUnit(st), facing }), full = r.sp;
  // cropped to what is drawn (a part's bounding sphere leaves empty rows above it); anchors move with it
  let x0 = full.w, x1 = -1, y0 = full.h; for (let y = 0; y < full.h; y++) for (let x = 0; x < full.w; x++) if (full.m[y * full.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const sp = new Sprite(x1 - x0 + 1, full.h - y0); for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = (y + y0) * full.w + x + x0; if (full.m[i]) sp.put(x, y, full.m[i], full.n[i * 3], full.n[i * 3 + 1], full.n[i * 3 + 2]); }
  const project = p => { const [x, y] = r.project(p); return [+(x - x0).toFixed(1), +(y - y0).toFixed(1)]; };
  const crownY = Math.round(project([0, T.splitY, 0])[1]);
  const top = new Sprite(sp.w, sp.h), bot = new Sprite(sp.w, sp.h);
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x, mm = sp.m[i]; if (!mm) continue;
    (LEAVES.has(mm) || y < crownY ? top : bot).put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]);
  }
  const at = p => { const [x, y] = project(p); return { x, y }; };
  return { whole: sp, top, bot, crownY, anchors: { base: at([0, 0, -.2]), seat: at(T.seat), door: at(T.door), lights: T.lights.map(L => ({ ...at(L.at), rgb: L.rgb, kind: L.kind })) }, metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1) } };
}

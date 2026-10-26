// The treehouse's furniture (Ed, 2026-10-23: real art for the house's objects, config/house/, in place of the plain boxes
// render/houseRooms.ts drew). Ed's style: "a charming mismatched combination ... cozy cottage vibes sprouting leaves, occasional
// gothic pieces, and random modern clutter"; a palette per room; its lights "a mix of magic, candles, gas lamps, modern lamps, fairy
// lights, neon lamps". From the mock (#1017), his answers: twice the size it was (as big as her creator bedroom's: house.json's
// footprints are twice a real piece's, SIZE), the bed's canopy over its head half, the rooms dim with the glows lighting what's
// near them, and the clutter fewer, chunkier things that read at a glance.
// Each piece is a 3D model (model3d.js) built to its object's footprint (w, d, h as house.json gives them, over SIZE), never to where
// it stands, so the house's plan can move it: drawn by id, at the house's own art pixel and view.
//   - Model space: metres of the real piece; x along the wall it backs on (-W/2 to W/2), z out from that wall into the room (its back
//     at -D/2, its front at D/2), y up from the floor. It's drawn turned by `yaw` (model3d.js render's): 0 its front facing the camera
//     (south), π/4 down-left on the screen, -π/4 down-right (the way it faces in the house: render/houseFurniture.ts standing).
//   - Its lights (`m.lights`, model points with a colour, reach and power) come back as pixels, for the lighting pass.
//   - A piece with states (the curtains, open or shut) takes `state` and is drawn once for each.
import { M, Sprite, hsv2rgb, hash2 } from "./core.js";
import { Model, render } from "./model3d.js";
import { SHEETED_PIECES, SHEETED_COLOURS } from "./sheeted.js";

/** House.json's footprints over a real piece's: the pieces drawn twice their real size (Ed, 2026-10-23: "about 2x, as big as in her
 *  old creator bedroom"), so a piece is built at its footprint over this and drawn this many times over. */
export const SIZE = 2;
/** Each piece drawn this much bigger again (Ed, 2026-10-26: "I think they're too small, which makes it hard to see what they are"):
 *  house.json's footprint is the real piece's times SIZE times this, so the piece is the same, drawn bigger, its details chunkier.
 *  The bed's already big; the small ones grow most. */
export const GROW = { bed: 1, telephone: 1.8, microphone: 1.6, book: 1.7, telescope: 1.6, hats: 1, drumKit: 1.1, synthRack: 1.4, broomBay: 1.35, lathe: 1.2, pegboard: 1.4, cauldron: 1.4, teaTable: 1.4, cardTable: 1.4, invitations: 1 };
export const GROW_ALL = 1.5;
/** A piece's own scale: its footprint's metres over the real piece's. */
export const sizeOf = id => SIZE * (GROW[id] ?? (id.startsWith("bedroom") ? 1 : GROW_ALL));

const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];
const rotY = (v, a) => [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
/** A light at model point c: its colour, its reach in pixels (at the house's pixel, before SIZE) and its power (art/lighting.js shade's). */
/** The tilt (radians, nose up) the Workshop's parts hang at on the pegboard's pegs (art/workshop.js partSprite's `hung`). */
export const HANG = .35;
const light = (m, c, rgb, R, power) => { (m.lights ??= []).push({ c, rgb, R, power }); };
/** A glowing bulb, flame or bead (drawn unlit), its light with it. */
const bulb = (m, c, r, mat, g, lit) => { m.ell(c, [r, r, r], mat, { group: g, extra: true }); if (lit) light(m, c, ...lit); };
const WARM = [255, 190, 110], FAIRY = [255, 120, 210], MAGICL = [170, 120, 255], SCREEN = [150, 214, 255], GREEN = [130, 255, 160];
/** A candle: its stick (wax), its flame and its warm light. */
const candle = (m, c, g, h = .12, lit = true) => { m.seg(c, [c[0], c[1] + h, c[2]], .028, .025, M.BELLY, { group: g }); bulb(m, [c[0], c[1] + h + .035, c[2]], .022, M.WOKEN, g + 100, lit ? [WARM, 14, .35] : null); };
/** A sprig of leaves at c, `n` of them, `r` their size: the house sprouting (Ed: "cozy cottage vibes sprouting leaves"). */
const sprig = (m, c, n, r, g, up = .4) => { for (let i = 0; i < n; i++) { const a = i * 2.4, s = r * (1 - i / (n * 2)); m.ell([c[0] + Math.cos(a) * r * .9, c[1] + (i % 3) * r * .35, c[2] + Math.sin(a) * r * .9], [s, s * .5, s * .8], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: g, dir: [Math.cos(a), up, Math.sin(a)] }); } };
/** Ivy up a post from y0 to y1 at (x, z). */
const ivy = (m, x, z, y0, y1, g, r = .06) => { for (let y = y0, i = 0; y < y1; y += r * 3, i++) { const a = i * 1.9; m.ell([x + Math.cos(a) * r * 1.4, y, z + Math.sin(a) * r * 1.4], [r * 1.2, r * .7, r], i % 3 ? M.LEAF : M.LEAF2, { group: g, dir: [Math.cos(a), .4, Math.sin(a)] }); } };
/** A plank front: lines down it every `step` metres along x. */
const planks = (step, mat = M.BARKD, w = .015) => p => (Math.abs(((p[0] / step) % 1 + 1) % 1 - .5) > .5 - w / step ? mat : undefined);
/** A disc (a table top, a rug): a flattened ellipsoid. */
const disc = (m, c, r, t, mat, o) => m.ell(c, [r, t, r], mat, o);
/** A short cylinder from y0 to y1 (a pot, a cup, a cauldron's band): a cone with flat-ish caps. */
const can = (m, x, z, y0, y1, r, mat, o) => m.seg([x, y0 + r * .3, z], [x, y1 - r * .3, z], r, r, mat, o);

// ---------- following a round room's wall ----------
// Ed, 2026-10-23: "furniture goes in round rooms so no need to make everything rectangular as if to go against a wall". A piece along the
// wall (BEND) is built straight and then bent round the wall's arc, `R` metres from the room's middle at its back: every part moved
// round it (x along the wall becomes the angle round the arc, z the way in), turned with it, long ones cut into short lengths first so
// a shelf or a rail curves rather than cutting the arc's chord; a part's paint and a flat's mask keep the straight piece's places.
const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
function bendModel(m, R, D) {
  const zb = -D / 2, C = zb + R;
  const to = p => { const rho = R - (p[2] - zb), a = p[0] / R; return [rho * Math.sin(a), p[1], C - rho * Math.cos(a)]; };
  const back = p => { const dx = p[0], dz = C - p[2], rho = Math.hypot(dx, dz), a = Math.atan2(dx, dz); return [a * R, p[1], zb + R - rho]; };
  const turn = (v, a) => [v[0] * Math.cos(a) - v[2] * Math.sin(a), v[1], v[0] * Math.sin(a) + v[2] * Math.cos(a)];
  const L = .08; // (no straight length past this along the wall)
  const parts = [];
  for (const q of m.parts) {
    if (q.type === "box" && Math.abs(q.axes[0][0]) > .9 && q.h[0] > L) {
      const n = Math.ceil(q.h[0] / L), hl = q.h[0] / n;
      for (let i = 0; i < n; i++) parts.push({ ...q, c: add3(q.c, mul3(q.axes[0], -q.h[0] + hl * (2 * i + 1))), h: [hl + q.round * .5, q.h[1], q.h[2]] });
    } else if (q.type === "cone" && Math.abs(q.b[0] - q.a[0]) > 2 * L) {
      const n = Math.ceil(Math.abs(q.b[0] - q.a[0]) / (2 * L)), d = sub3(q.b, q.a);
      for (let i = 0; i < n; i++) parts.push({ ...q, a: add3(q.a, mul3(d, i / n)), b: add3(q.a, mul3(d, (i + 1) / n)), r1: q.r1 + (q.r2 - q.r1) * i / n, r2: q.r1 + (q.r2 - q.r1) * (i + 1) / n });
    } else parts.push(q);
  }
  m.parts = parts.map(q => {
    const o = q.paint ? { paint: p => q.paint(back(p)) } : {};
    if (q.type === "cone") return { ...q, ...o, a: to(q.a), b: to(q.b) };
    const a = q.c[0] / R;
    return { ...q, ...o, c: to(q.c), axes: q.axes.map(v => turn(v, a)) };
  });
  const flats = [];
  for (const f of m.flats) {
    const alongU = Math.abs(f.u[0]) > .9 && f.su > L, alongV = !alongU && Math.abs(f.v[0]) > .9 && f.sv > L;
    if (!alongU && !alongV) { flats.push(f); continue; }
    const S = alongU ? f.su : f.sv, ax = alongU ? f.u : f.v, n = Math.ceil(S / L);
    for (let i = 0; i < n; i++) {
      const mid = -1 + (2 * i + 1) / n; // (its strip's middle, in the mask's -1..1)
      const mask = alongU ? (s, t) => f.mask(mid + s / n, t) : (s, t) => f.mask(s, mid + t / n);
      flats.push({ ...f, c: add3(f.c, mul3(ax, mid * S)), ...(alongU ? { su: S / n * 1.04 } : { sv: S / n * 1.04 }), mask });
    }
  }
  m.flats = flats.map(f => { const a = f.c[0] / R; return { ...f, c: to(f.c), u: turn(f.u, a), v: turn(f.v, a) }; });
  for (const Lt of m.lights ?? []) Lt.c = to(Lt.c);
  for (const k of Object.keys(m.marks ?? {})) m.marks[k] = to(m.marks[k]);
}
/** The biome board's nine frame colours (Hotel, 2026-10-23: each biome's chart palette, row by row from the top left, north up):
 *  cold rainforest, cold, mountains and glaciers; jungle, temperate (home), volcanic; mangrove swamp, hot, badlands. Drawn in
 *  materials the board uses for nothing else, coloured for it alone (PIECE_COLOURS). */
export const BIOMES = ["#2f6b5e", "#9fc4d8", "#7f93a3", "#2e8b3e", "#7aa04a", "#c8442a", "#6f7a3a", "#d9a441", "#b0603a"];
const BIOME_MATS = [M.SKIN, M.EAR, M.EYE, M.PUPIL, M.BROW, M.BODYL, M.NIGHT, M.NIGHT2, M.MOUTH];
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

/** The pieces that follow a round room's wall (bent round it): long, flat-backed things.
 *  (Ed, 2026-10-26: "the items were designed for being against walls, but her house doesn't really have walls, so we should design
 *  things to look nice freestanding": they stand off the walls now, straight; the bend kept for a piece that's wanted against one.) */
export const BEND = new Set(["curtains"]);

// ---------- the pieces ----------
// Each builds model m from its real footprint (W along the wall, D out from it, H its height) and its state.
const PIECES = {
  // A gothic canopy bed: four dark carved posts with spires, a carved headboard with a pointed arch and a rose window, velvet curtains
  // drawn back to the head posts, a moth-eaten canopy over its head half; ivy up a foot post, leaves breaking out at the top; her
  // hoodie flung on the duvet, her phone on the pillow glowing, its lead trailing to the floor.
  bed(m, { W, D, H }) {
    const x0 = -W / 2 + .07, x1 = W / 2 - .07, zb = -D / 2 + .07, zf = D / 2 - .07, top = 2.25, mat = H * .78, base = .26;
    m.box([0, base, 0], [W / 2 - .1, .11, D / 2 - .1], M.BARKD, { round: .02, group: 1, paint: p => (Math.abs(p[1] - base) < .02 ? M.WOOD : undefined) });
    m.box([0, mat - .08, -.05], [W / 2 - .16, .1, D / 2 - .18], M.BELLY, { round: .06, group: 2 });
    m.box([0, mat + .02, .25], [W / 2 - .12, .07, D / 2 - .45], M.CLOTH, { round: .07, group: 3, paint: p => (Math.abs(p[2] - (-D / 2 + .7)) < .07 ? M.BELLY : Math.abs(((p[0] + p[2]) * 2.5 % 1 + 1) % 1 - .5) < .07 ? M.BODY3 : undefined) });
    m.box([0, mat - .12, zf - .02], [W / 2 - .12, .2, .05], M.CLOTH, { round: .04, group: 3 });
    for (const s of [-1, 1]) m.ell([s * W * .22, mat + .1, zb + .28], [W * .2, .1, .16], M.BELLY, { group: 4 + (s > 0) });
    // the headboard: a carved panel, a pointed arch of spindles over it, a rose window glowing faintly
    m.box([0, .95, zb], [W / 2 - .06, .55, .045], M.BARKD, { group: 6, paint: p => (Math.abs(p[0]) < W / 2 - .2 && Math.abs(p[1] - .95) < .4 && ((p[0] * 8 + p[1] * 3) % 1 + 1) % 1 < .14 ? M.HAIR : undefined) });
    for (let i = -3; i <= 3; i++) { const t = i / 3, hgt = 1.55 + .35 * (1 - Math.abs(t)) ** 1.6; m.seg([t * (W / 2 - .12), 1.4, zb], [t * (W / 2 - .2), hgt, zb], .055, .04, M.BARKD, { group: 6 }); }
    m.ell([0, 1.95, zb], [.09, .11, .05], M.BARKD, { group: 6 });
    m.ell([0, 1.15, zb + .05], [.14, .14, .02], M.MAGIC, { group: 7, paint: p => (Math.abs(Math.atan2(p[1] - 1.15, p[0]) % .8) < .12 ? M.MAGIC2 : undefined) });
    light(m, [0, 1.15, zb + .15], MAGICL, 10, .2);
    m.box([0, .52, zf], [W / 2 - .06, .2, .04], M.BARKD, { group: 8, paint: p => (Math.abs(p[0] % .3) < .03 ? M.HAIR : undefined) });
    [[x0, zb], [x1, zb], [x0, zf], [x1, zf]].forEach(([x, z], i) => {
      m.seg([x, 0, z], [x, top, z], .065, .05, M.BARKD, { group: 10 + i });
      for (const y of [.3, .75, 1.4]) m.ell([x, y, z], [.09, .065, .09], M.BARKD, { group: 10 + i });
      m.seg([x, top, z], [x, top + .3, z], .055, .005, M.BARKD, { group: 10 + i });
    });
    // the canopy's rails, its cloth over the head half (Ed: "the head half only, as drawn"), torn and holed, a scalloped valance
    for (const z of [zb, zf]) m.box([0, top - .02, z], [W / 2 - .07, .035, .035], M.BARKD, { group: 14 });
    for (const x of [x0, x1]) m.box([x, top - .02, 0], [.035, .035, D / 2 - .07], M.BARKD, { group: 14 });
    m.flat([0, top + .04, -D / 4 + .02], X, Z, W / 2 - .06, D / 4, (s, t) => (hash2(Math.floor((s + 1) * 6), Math.floor((t + 1) * 4), 41) > .86 || t > .7 + .3 * Math.sin(s * 11) ? undefined : M.ACCENT), { group: 15, bend: .1 });
    m.flat([0, top - .1, zb - .01], X, [0, -1, 0], W / 2 - .06, .1, (s, t) => (t > .3 && Math.abs(((s + 1) * 5) % 1 - .5) > .32 ? undefined : M.ACCENT), { group: 15, bend: .1 });
    for (const x of [x0, x1]) m.flat([x, top - .1, -D / 4], Z, [0, -1, 0], D / 4, .1, (s, t) => (t > .3 && Math.abs(((s + 1) * 4) % 1 - .5) > .32 ? undefined : M.ACCENT), { group: 15, bend: .1 });
    // the velvet curtains, drawn back and tied at the head posts, falling in folds
    for (const x of [x0, x1]) {
      const s = Math.sign(x);
      m.flat([x + s * .02, top * .55, zb + .3], Z, Y, .26, top * .45, (u, v) => (Math.abs(u) > 1 - (1 - v) * .55 ? undefined : Math.sin(u * 9) > .4 ? M.BODY : M.ACCENT), { group: 16 + (s > 0), bend: .5 });
      m.ell([x + s * .04, top * .5, zb + .15], [.06, .05, .11], M.FLOWER, { group: 18 });
    }
    ivy(m, x0, zf, .2, top, 20, .07);
    sprig(m, [x0, top + .12, zf - .05], 6, .16, 21);
    // her hoodie flung on the duvet, a sleeve hanging off; her phone on the pillow, lit, its lead trailing to the floor
    m.ell([W * .15, mat + .16, .15], [.34, .11, .27], M.JACKET, { group: 22, rough: .012 });
    m.ell([W * .15 + .24, mat + .21, .34], [.15, .1, .13], M.JACKET, { group: 22 });
    m.seg([W * .15 - .2, mat + .14, .3], [x0 + .04, mat - .1, .5], .08, .07, M.JACKET, { group: 22 });
    m.box([-W * .22, mat + .22, zb + .32], [.09, .015, .15], M.SHADES, { group: 24, dir: rotY(X, .3) });
    m.flat([-W * .22, mat + .24, zb + .32], rotY(X, .3), rotY(Z, .3), .07, .12, () => M.GLINT, { group: 25, bend: 0 });
    light(m, [-W * .22, mat + .3, zb + .32], SCREEN, 9, .25);
    m.chain([[-W * .22, mat + .2, zb + .47, .016], [x0 + .05, mat + .1, zb + .55, .016], [x0 - .08, .3, zb + .5, .016], [x0 - .12, .02, zb + .2, .016]], M.SOLE, { group: 26 });
  },

  // An open clothes rail: two chrome uprights and a rail, her cloaks and party clothes on hangers (bright, so they read: a long cloak, a
  // sequinned dress, a cape, a puffer jacket), three shoe boxes under them, a string of fairy lights along the rail, a vine sprouting off
  // one end, a party hat on a knob.
  wardrobe(m, { W, D, H }) {
    const rail = H * .86, xa = -W / 2 + .06, xb = W / 2 - .06;
    for (const x of [xa, xb]) {
      m.seg([x, .06, 0], [x, rail + .04, 0], .035, .035, M.FRAME, { group: 1 });
      m.seg([x, .045, -D / 2 + .05], [x, .045, D / 2 - .05], .04, .04, M.FRAME, { group: 1 });
      m.ell([x, rail + .08, 0], [.06, .06, .06], M.FLOWER, { group: 1 });
    }
    m.seg([xa, rail, 0], [xb, rail, 0], .03, .03, M.FRAME, { group: 1 });
    // the clothes: fewer and bolder than the mock's, hung forward of the rail so the room's light reaches them
    const clothes = [[M.HAT2, .95, .24, "cloak"], [M.POM, .7, .2, "dress"], [M.HAT1, .45, .24, "cape"], [M.JACKET, .55, .26, "puffer"], [M.IRIS, .95, .24, "cloak"]];
    const n = clothes.length, span = W - .35;
    clothes.forEach(([mat, len, half, kind], i) => {
      const x = -span / 2 + (i + .5) * span / n, y = rail - .06, z = .05;
      m.seg([x, rail + .02, 0], [x, y, z], .01, .01, M.FRAME, { group: 2 });
      m.seg([x - half * .8, y - .03, z], [x + half * .8, y - .03, z], .016, .016, M.WOOD, { group: 2 });
      const g = 30 + i, mid = y - len / 2 - .03;
      if (kind === "cloak") { m.box([x, mid, z], [half * .9, len / 2, .05], mat, { round: .05, group: g, paint: p => (Math.abs(p[0] - x) < .02 ? M.FLOWER : undefined) }); m.ell([x, y - .06, z + .05], [.1, .06, .08], mat, { group: g }); }
      else if (kind === "dress") m.seg([x, y - .04, z], [x, y - len, z], half * .55, half * 1.15, mat, { group: g, paint: p => (hash2(Math.round(p[0] * 30), Math.round(p[1] * 30), i) > .78 ? M.BELLY : undefined) });
      else if (kind === "puffer") for (let j = 0; j < 3; j++) m.ell([x, y - .1 - j * len / 3, z], [half, len / 7, .1], mat, { group: g });
      else m.box([x, mid, z], [half, len / 2, .045], mat, { round: .03, group: g, paint: p => (p[1] < mid - len / 2 + .06 ? M.FLOWER : undefined) });
    });
    // shoe boxes, three, stacked two and one, their lids another colour; a trainer peeping out of the open one
    [[-W * .28, 0, M.ACCENT, M.BELLY], [-W * .28, 1, M.CLOTH, M.FLOWER], [W * .2, 0, M.BODY2, null]].forEach(([x, row, body, lid], i) => {
      const y = .12 + row * .2;
      m.box([x, y, 0], [.24, .09, .15], body, { round: .015, group: 50 + i });
      if (lid) m.box([x, y + .1, 0], [.25, .025, .16], lid, { round: .012, group: 50 + i });
    });
    m.ell([W * .2 - .02, .27, .03], [.16, .07, .08], M.SHOES, { group: 60, dir: [1, .15, 0] });
    m.ell([W * .2 - .06, .22, .03], [.14, .03, .08], M.POM, { group: 60 });
    for (let i = 0; i <= 12; i++) { const t = i / 12, x = xa + (xb - xa) * t, sag = .08 * Math.sin(t * Math.PI * 3) ** 2; bulb(m, [x, rail - .03 - sag, .07], .035, i % 2 ? M.COLLAR : M.WOKEN, 70, i % 4 === 2 ? [i % 2 ? FAIRY : WARM, 12, .3] : null); }
    ivy(m, xb, 0, rail * .4, rail, 80, .07);
    sprig(m, [xb - .1, rail + .1, 0], 5, .14, 81);
    m.seg([xa, rail + .12, 0], [xa + .02, rail + .45, 0], .13, .01, M.HAT1, { group: 82, paint: p => (Math.floor(p[1] * 14) % 2 ? M.POM : undefined) });
    m.ell([xa + .02, rail + .47, 0], [.05, .05, .05], M.FLOWER, { group: 82 });
  },

  // A bulb-lit vanity: a little painted table with drawers and curved legs, a tall mirror over it ringed by round bulbs (soft, so the
  // table isn't drowned in their light), a big potion bottle glowing, a pot of glitter, a lipstick and a powder compact, a trailing
  // plant; a scarf slung over the mirror.
  dressingTable(m, { W, D, H }) {
    const top = .76, t = .04, zf = D / 2;
    m.box([0, top, 0], [W / 2, t, D / 2], M.WOOD, { round: .02, group: 1 });
    m.box([0, top - .13, .02], [W / 2 - .04, .1, D / 2 - .05], M.BODY3, { group: 2, paint: p => (Math.abs(p[0]) < .015 || Math.abs(Math.abs(p[0]) - W / 4) < .015 ? M.BARKD : undefined) });
    for (const x of [-W / 4, W / 4]) m.ell([x, top - .13, zf - .02], [.035, .035, .025], M.FLOWER, { group: 3 });
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) m.chain([[x * (W / 2 - .06), top - .2, z * (D / 2 - .06), .035], [x * (W / 2 - .02), .35, z * (D / 2 - .04), .026], [x * (W / 2 - .07), .02, z * (D / 2 - .07), .03]], M.WOOD, { group: 4 });
    const mx = W * .4, my0 = top + .05, my1 = H, mz = -D / 2 + .06, mc = (my0 + my1) / 2, mh = (my1 - my0) / 2;
    m.box([0, mc, mz], [mx, mh, .035], M.BARKD, { round: .025, group: 5 });
    for (const sx of [-1, 1]) { m.seg([sx * (mx + .04), top, mz], [sx * (mx + .04), my1 + .08, mz], .025, .022, M.WOOD, { group: 5 }); m.ell([sx * (mx + .04), my1 + .11, mz], [.04, .05, .04], M.FLOWER, { group: 5 }); } // (its own posts: it stands free)
    m.flat([0, mc + .02, mz + .06], X, Y, mx - .1, mh - .1, (s, tt) => (s + tt * .6 > .45 && s + tt * .6 < .7 ? M.BELLY : M.WEB), { group: 6, bend: 0 });
    const ring = [];
    for (let i = 0; i < 4; i++) ring.push([-mx + .05 + i * (2 * mx - .1) / 3, my1 - .03]);
    for (let i = 1; i < 4; i++) for (const s of [-1, 1]) ring.push([s * (mx - .04), my1 - .03 - i * (2 * mh - .1) / 4]);
    ring.forEach(([x, y], i) => bulb(m, [x, y, mz + .07], .05, M.WOKEN, 7, i === 0 || i === 3 ? [WARM, 8, .12] : null));
    m.chain([[mx - .05, my1 + .03, mz + .05, .05], [mx + .07, my1 - .22, mz + .08, .045], [mx + .09, my1 - .6, mz + .07, .04]], M.PHONES, { group: 8 });
    const sit = top + t;
    // a big potion, glowing; the glitter pot; a lipstick; the compact; a pot with a plant trailing over the edge
    m.ell([-W * .32, sit + .13, .03], [.09, .13, .09], M.CRYSTAL, { group: 10 });
    m.seg([-W * .32, sit + .24, .03], [-W * .32, sit + .34, .03], .03, .03, M.CRYSTAL, { group: 10 });
    m.ell([-W * .32, sit + .36, .03], [.04, .03, .04], M.WOOD, { group: 10 });
    m.ell([-W * .32, sit + .1, .03], [.075, .085, .075], M.MAGIC, { group: 11, extra: true }); light(m, [-W * .32, sit + .14, .14], MAGICL, 10, .3);
    can(m, W * .05, .1, sit, sit + .1, .075, M.CRYSTAL, { group: 14 });
    m.ell([W * .05, sit + .1, .1], [.065, .025, .065], M.POM, { group: 15, paint: p => (hash2(Math.round(p[0] * 50), Math.round(p[2] * 50), 3) > .55 ? M.FLOWER : undefined) });
    m.seg([W * .2, sit, .13], [W * .2, sit + .14, .13], .025, .022, M.ACCENT, { group: 16 });
    m.ell([-W * .1, sit + .02, .15], [.09, .02, .08], M.FLOWER, { group: 19 });
    can(m, W * .36, -.04, sit, sit + .13, .07, M.BODY2, { group: 20 });
    sprig(m, [W * .36, sit + .17, -.04], 5, .09, 21);
    for (let i = 0; i < 3; i++) m.ell([W * .36 + .1 + i * .02, sit + .06 - i * .12, .08], [.06, .035, .05], M.LEAF2, { group: 22, dir: [1, -.5, .3] });
  },

  // The crystal ball: a round table draped in a fringed cloth to the floor, a brass stand of three claws holding the ball, which glows,
  // mist curling in it; tarot cards fanned beside it, a candle on a saucer, a little crystal cluster.
  crystalBall(m, { W, D }) {
    const R = Math.min(W, D) / 2 - .02, top = .72, ball = Math.min(.24, R * .6);
    m.ell([0, top, 0], [R, .03, R], M.CLOTH, { group: 1 });
    const drape = p => { const a = Math.atan2(p[2], p[0]); return p[1] < .07 ? M.FLOWER : Math.sin(a * 7) > .55 ? M.BODY : undefined; };
    for (let i = 0; i < 9; i++) { const t = i / 8, y = top - .04 - t * (top - .1), r = R * (1 + .13 * t * t); m.ell([0, y, 0], [r, .07, r], M.CLOTH, { group: 1, paint: drape }); }
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; m.ell([Math.cos(a) * R * 1.13, .035, Math.sin(a) * R * 1.13], [.025, .04, .025], M.FLOWER, { group: 2 }); }
    const by = top + .03 + ball * .9;
    m.ell([0, top + .05, 0], [ball * .7, .04, ball * .7], M.FRAME, { group: 3 });
    for (let i = 0; i < 3; i++) {
      const a = i * Math.PI * 2 / 3 + .3, c = Math.cos(a), s = Math.sin(a);
      m.chain([[c * ball * .45, top + .06, s * ball * .45, .026], [c * ball * .9, by - ball * .35, s * ball * .9, .024], [c * ball * .95, by + ball * .2, s * ball * .95, .018], [c * ball * .6, by + ball * .55, s * ball * .6, .01]], M.FRAME, { group: 3 });
    }
    m.ell([0, by, 0], [ball, ball, ball], M.MAGIC, { group: 4, paint: p => (Math.sin((p[0] + p[1] * 1.6) * 18 + p[2] * 12) > .5 ? M.MAGIC2 : undefined) });
    light(m, [0, by, 0], MAGICL, 22, .8);
    for (let i = 0; i < 4; i++) { const a = -.5 + i * .33, u = rotY(X, a), v = rotY(Z, a); m.flat([R * .45 + Math.sin(a) * .06, top + .035 + i * .002, R * .3 + Math.cos(a) * .02], u, v, .055, .09, (s, t) => (i === 3 ? (Math.abs(s) < .6 && Math.abs(t) < .7 ? (Math.abs(t) < .25 ? M.FLOWER : M.BELLY) : M.BODY2) : Math.abs(s) > .7 || Math.abs(t) > .8 ? M.FLOWER : M.ACCENT), { group: 5 + i, bend: 0 }); }
    m.ell([-R * .5, top + .04, R * .2], [.07, .014, .07], M.FRAME, { group: 12 });
    candle(m, [-R * .5, top + .04, R * .2], 13);
    for (let i = 0; i < 3; i++) m.seg([-R * .3, top + .03, -R * .45], [-R * .3 + (i - 1) * .04, top + .12 + i * .03, -R * .45 + (i - 1) * .01], .03, .005, M.CRYSTAL, { group: 15 });
  },

  // The bedroom's window: a round-topped window in a carved frame on its wall, the night outside (stars, the moon), velvet curtains on a
  // brass pole, drawn shut (`state` "shut": while she wakes) or open and tied back; a pelmet of leaves, a little cactus on the sill.
  curtains(m, { W, D, H }, state) {
    const zb = -D / 2 + .03, win = W * .38, wy0 = .75, wy1 = H - .2, wc = (wy0 + wy1) / 2, wh = (wy1 - wy0) / 2, shut = state === "shut";
    // the window: its glass the night, a cross of glazing bars, a moon and stars; its frame carved, a sill
    m.flat([0, wc, zb], X, Y, win, wh, (s, t) => { const u = s * win, v = t * wh; if (t > .55 && Math.hypot(s, (t - .55) / .45 * .9) > 1) return undefined; if (Math.abs(u) < .025 || Math.abs(v + wh * .1) < .025) return M.BARKD; if (Math.hypot(u + win * .45, v - wh * .4) < .1) return M.MAGIC2; return hash2(Math.round(u * 30), Math.round(v * 30), 9) > .95 ? M.MAGIC2 : M.WATER; }, { group: 1, bend: 0 });
    m.box([0, wy0 - .04, zb + .05], [win + .12, .03, .09], M.WOOD, { round: .01, group: 2 });
    m.chain([[-win - .05, wy0, zb + .02, .04], [-win - .05, wc + wh * .1, zb + .02, .04], [-win * .7, wy1 - .02, zb + .02, .04], [0, wy1 + .08, zb + .02, .04], [win * .7, wy1 - .02, zb + .02, .04], [win + .05, wc + wh * .1, zb + .02, .04], [win + .05, wy0, zb + .02, .04]], M.WOOD, { group: 3 });
    light(m, [-win * .45, wc + wh * .4, zb + .2], [190, 200, 255], 10, .2);
    // the pole and the curtains: two panels meeting (shut) or gathered back to each side
    const pole = H - .05, cz = zb + .14;
    m.seg([-W / 2 + .05, pole, cz], [W / 2 - .05, pole, cz], .025, .025, M.FLOWER, { group: 4 });
    for (const s of [-1, 1]) m.ell([s * (W / 2 - .03), pole, cz], [.05, .05, .05], M.FLOWER, { group: 4 });
    for (const s of [-1, 1]) {
      const g = 5 + (s > 0), half = shut ? W / 4 - .02 : .16, cx = shut ? s * W / 4 : s * (W / 2 - .2);
      m.flat([cx, pole / 2 + .05, cz], X, Y, half, pole / 2 - .05, (u, v) => (!shut && Math.abs(v + .05) < .1 && Math.abs(u) > .7 ? undefined : Math.sin(u * (shut ? 11 : 6)) > .35 ? M.BODY : M.ACCENT), { group: g, bend: .5 });
      if (!shut) m.ell([cx, pole * .45, cz + .06], [.18, .05, .07], M.FLOWER, { group: 8 });
    }
    // the pelmet sprouting leaves; a cactus on the sill
    for (let i = -3; i <= 3; i++) sprig(m, [i * W / 7, pole + .08, cz], 2, .12, 9 + i + 3, .2);
    can(m, win * .4, zb + .12, wy0 - .01, wy0 + .1, .06, M.BODY2, { group: 20 });
    m.ell([win * .4, wy0 + .2, zb + .12], [.05, .12, .05], M.LEAF, { group: 21, paint: p => (hash2(Math.round(p[1] * 40), Math.round(p[0] * 40), 2) > .85 ? M.FLOWER : undefined) });
  },

  // The phone on her bedside table: a cottage stool-table with a drawer, a mushroom lamp glowing on it, her phone face up and lit (the
  // alarm), a mug of cold tea; moss creeping up a leg.
  phone(m, { W, D, H }) {
    const top = H * .85, r = Math.min(W, D) / 2;
    m.box([0, top, 0], [r, .035, r * .9], M.WOOD, { round: .02, group: 1 });
    m.box([0, top - .1, .02], [r - .04, .07, r * .8], M.WOOD, { group: 2, paint: p => (p[2] > r * .78 && Math.abs(p[1] - (top - .1)) < .012 ? M.BARKD : undefined) });
    m.ell([0, top - .1, r * .84], [.03, .03, .02], M.FLOWER, { group: 3 });
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) m.seg([x * (r - .05), top - .03, z * (r * .9 - .05)], [x * (r - .02), 0, z * (r * .9 - .02)], .03, .025, M.WOOD, { group: 4 });
    ivy(m, -(r - .03), r * .9 - .03, .05, top * .6, 5, .045);
    // the mushroom lamp: a stalk and a glowing spotted cap
    const sit = top + .035;
    m.seg([-r * .45, sit, -r * .35], [-r * .45, sit + .18, -r * .35], .03, .025, M.BELLY, { group: 6 });
    m.ell([-r * .45, sit + .2, -r * .35], [.11, .07, .11], M.GLOW, { group: 7, paint: p => (hash2(Math.round(p[0] * 30), Math.round(p[2] * 30), 4) > .75 ? M.MAGIC2 : undefined) });
    light(m, [-r * .45, sit + .18, -r * .2], WARM, 12, .35);
    m.box([r * .2, sit + .012, r * .1], [.08, .012, .14], M.SHADES, { group: 8, dir: rotY(X, -.4) });
    m.flat([r * .2, sit + .026, r * .1], rotY(X, -.4), rotY(Z, -.4), .065, .12, (s, t) => (Math.abs(t) < .2 && Math.abs(s) < .5 ? M.BELLY : M.GLINT), { group: 9, bend: 0 });
    light(m, [r * .2, sit + .08, r * .1], SCREEN, 8, .25);
    can(m, r * .5, -r * .4, sit, sit + .1, .045, M.HAT1, { group: 10 });
    m.chain([[r * .5 + .04, sit + .08, -r * .4, .012], [r * .5 + .08, sit + .05, -r * .4, .012], [r * .5 + .04, sit + .02, -r * .4, .012]], M.HAT1, { group: 10 });
  },

  // A coat tree, freestanding (Ed, 2026-10-26: her house hasn't walls): a carved stem on three clawed feet, pegs branching all round
  // its top, cloaks hanging off it front and back, a striped scarf, her witch's hat crowning it, ivy up the stem, a sprig at its top.
  cloakPegs(m, { W, D, H }) {
    const top = H * .86, r = Math.min(W, D) / 2;
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + .3; m.chain([[0, .28, 0, .05], [Math.cos(a) * r * .55, .09, Math.sin(a) * r * .55, .04], [Math.cos(a) * r * .9, .02, Math.sin(a) * r * .9, .035]], M.BARKD, { group: 1 }); }
    m.chain([[0, .22, 0, .075], [0, top * .5, 0, .045], [0, top + .05, 0, .055]], M.BARKD, { group: 2, paint: p => (Math.sin(p[1] * 40) > .75 ? M.HAIR : undefined) });
    const pegs = 6, peg = i => { const a = (i / pegs) * Math.PI * 2 + .35; return { c: Math.cos(a), s: Math.sin(a), y: top - .08 - (i % 2) * .14 }; };
    for (let i = 0; i < pegs; i++) { const { c, s: sn, y } = peg(i); m.seg([0, y, 0], [c * .22, y + .1, sn * .22], .026, .02, M.WOOD, { group: 3 }); m.ell([c * .24, y + .12, sn * .24], [.035, .035, .035], M.FLOWER, { group: 3 }); }
    // a cloak off peg i: its hood over the peg, falling to len, its hem trimmed
    const cloak = (i, mat, len, half, g, trim) => { const { c, s: sn, y } = peg(i), x = c * .26, z = sn * .26 + Math.sign(sn) * .05, y0 = y + .1; m.box([x, y0 - len / 2 - .04, z], [half, len / 2, .06], mat, { round: .07, group: g, paint: p => (p[1] < y0 - len + .04 ? trim : Math.abs(p[0] - x) < .02 ? M.FLOWER : undefined) }); m.ell([x, y0 - .03, z], [half * .7, .08, .09], mat, { group: g }); };
    cloak(0, M.HAT, .95, .2, 10, M.HAT2); cloak(2, M.CLOTH, .7, .19, 11, M.ACCENT); cloak(4, M.IRIS, .8, .18, 12, M.BELLY);
    const sc = peg(1);
    m.chain([[sc.c * .26 - .05, sc.y + .12, sc.s * .26 + .04, .045], [sc.c * .3 - .08, sc.y - .3, sc.s * .3 + .06, .04], [sc.c * .3 + .02, sc.y - .62, sc.s * .3 + .08, .035]], M.ACCENT, { group: 13, paint: p => (Math.floor(p[1] * 12) % 2 ? M.BELLY : undefined) });
    m.ell([0, top + .1, 0], [.22, .02, .2], M.HAT, { group: 14 });
    m.seg([0, top + .1, 0], [.07, top + .55, -.03], .13, .01, M.HAT, { group: 14, paint: p => (p[1] < top + .17 ? M.FLOWER : undefined) });
    ivy(m, 0, 0, .3, top * .7, 15, .055);
    sprig(m, [.05, top + .1, .12], 4, .09, 16, .6);
  },

  // A shoe rack: two chunky shelves of rough wood, her shoes on them (big trainers, boots, glitter platforms, light-up trainers with a
  // glowing sole), a fern sprouting from the top's end.
  shoeRack(m, { W, D, H }) {
    const sh = [.08, H * .55], top = H * .95;
    for (const y of [...sh, top]) m.box([0, y, 0], [W / 2, .03, D / 2 - .02], M.WOOD, { round: .01, group: 1, paint: planks(.25) });
    for (const x of [-W / 2 + .03, W / 2 - .03]) { m.box([x, top / 2 + .03, 0], [.03, top / 2, D / 2 - .02], M.BARKD, { group: 2 }); for (const z of [-D / 2 + .04, D / 2 - .04]) m.ell([x, .02, z], [.05, .03, .05], M.BARKD, { group: 2 }); }
    m.seg([-W / 2 + .03, top + .18, -D / 2 + .05], [W / 2 - .03, top + .18, -D / 2 + .05], .02, .02, M.WOOD, { group: 3 });
    for (const x of [-W / 2 + .03, W / 2 - .03]) m.seg([x, top, -D / 2 + .05], [x, top + .2, -D / 2 + .05], .02, .02, M.WOOD, { group: 3 });
    const shoe = (x, y, mat, sole, g, boot = false) => {
      m.ell([x, y + .07, .02], [.08, boot ? .14 : .06, .14], mat, { group: g, dir: [0, 0, 1] });
      if (boot) m.seg([x, y + .1, -.04], [x, y + .3, -.04], .07, .065, mat, { group: g });
      m.ell([x, y + .02, .03], [.085, .025, .15], sole, { group: g + 50 });
    };
    shoe(-W * .3, sh[0] + .03, M.SHOES, M.SOLE, 10); shoe(-W * .3 + .19, sh[0] + .03, M.SHOES, M.SOLE, 11);
    shoe(W * .05, sh[0] + .03, M.BARKD, M.SHADES, 12, true); shoe(W * .05 + .19, sh[0] + .03, M.BARKD, M.SHADES, 13, true);
    shoe(-W * .25, sh[1] + .03, M.POM, M.FLOWER, 14); shoe(-W * .25 + .19, sh[1] + .03, M.POM, M.FLOWER, 15);
    shoe(W * .22, sh[1] + .03, M.SHADES, M.COLLAR, 16); shoe(W * .22 + .19, sh[1] + .03, M.SHADES, M.COLLAR, 17);
    light(m, [W * .3, sh[1] + .05, .15], FAIRY, 8, .25);
    can(m, -W / 2 + .14, 0, top + .03, top + .16, .08, M.BODY2, { group: 20 });
    sprig(m, [-W / 2 + .14, top + .22, 0], 7, .12, 21, .7);
  },

  // The telephone: a rotary phone in glossy red on a gothic side table (a twisted stem, three clawed feet), a lace doily under it, its
  // coiled cord, a notepad.
  telephone(m, { W, D, H }) {
    const r = Math.min(W, D) / 2 - .02, top = H * .72;
    disc(m, [0, top, 0], r, .03, M.BARKD, { group: 1 });
    disc(m, [0, top + .02, 0], r * .8, .008, M.BELLY, { group: 2 });
    m.chain([[0, top - .02, 0, .045], [0, top * .6, 0, .03], [0, top * .3, 0, .045], [0, .12, 0, .035]], M.BARKD, { group: 3, paint: p => (Math.sin(p[1] * 50) > .6 ? M.HAIR : undefined) });
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + .4; m.chain([[0, .12, 0, .035], [Math.cos(a) * r * .7, .05, Math.sin(a) * r * .7, .03], [Math.cos(a) * r * .9, .015, Math.sin(a) * r * .9, .025]], M.BARKD, { group: 4 }); }
    const sit = top + .03;
    m.box([0, sit + .07, 0], [.13, .07, .11], M.ACCENT, { round: .05, group: 5 });
    disc(m, [0, sit + .14, .06], .07, .015, M.BELLY, { group: 6, paint: p => (Math.hypot(p[0], p[2] - .06) > .04 && Math.sin(Math.atan2(p[2] - .06, p[0]) * 10) > .3 ? M.SHADES : undefined) });
    m.chain([[-.13, sit + .17, -.02, .035], [0, sit + .2, -.03, .03], [.13, sit + .17, -.02, .035]], M.ACCENT, { group: 7 });
    for (const s of [-1, 1]) m.ell([s * .13, sit + .17, -.02], [.05, .04, .05], M.ACCENT, { group: 7 });
    m.chain([[.1, sit + .05, -.08, .012], [.15, sit + .02, -.1, .014], [.18, sit, -.04, .012]], M.SHADES, { group: 8 });
    m.box([-.12, sit + .01, r * .45], [.07, .01, .05], M.BELLY, { group: 9, dir: rotY(X, .3), paint: p => (Math.abs(((p[2] * 60) % 1 + 1) % 1 - .5) < .08 ? M.IRIS : undefined) });
  },

  // The hat mirror: a tall cheval mirror on a gilt stand, its frame sprouting leaves at the top, her glass catching the light, a party
  // hat hung on one finial and a tall witch's hat on a hat box at its foot.
  mirror(m, { W, D, H }) {
    const fx = W / 2 - .1, y0 = .25, y1 = H - .1, cy = (y0 + y1) / 2, hh = (y1 - y0) / 2;
    for (const s of [-1, 1]) {
      m.seg([s * fx, 0, 0], [s * fx, y1 - .2, 0], .035, .03, M.FLOWER, { group: 1 });
      m.seg([s * fx, .01, -D / 2 + .03], [s * fx, .01, D / 2 - .03], .035, .035, M.FLOWER, { group: 1 });
      m.ell([s * fx, y1 - .15, 0], [.05, .06, .05], M.FLOWER, { group: 1 });
    }
    m.ell([0, cy, 0], [fx - .07, hh, .04], M.FLOWER, { group: 2 });
    m.flat([0, cy, .07], X, Y, fx - .14, hh - .07, (s, t) => (Math.hypot(s, t) > 1 ? undefined : s + t * .7 > .35 && s + t * .7 < .6 ? M.BELLY : M.WEB), { group: 3, bend: 0 });
    sprig(m, [0, y1 + .02, 0], 7, .12, 4, .6);
    // a party hat on the left finial; a hat box at its foot with her pointed hat on it
    m.seg([-fx, y1 - .1, 0], [-fx + .03, y1 + .2, 0], .09, .008, M.HAT1, { group: 5, paint: p => (Math.floor(p[1] * 16) % 2 ? M.POM : undefined) });
    can(m, fx - .1, .2, 0, .24, .17, M.ACCENT, { group: 6, paint: p => (p[1] > .2 ? M.BELLY : undefined) });
    m.ell([fx - .1, .25, .2], [.2, .02, .2], M.HAT, { group: 7 });
    m.seg([fx - .1, .25, .2], [fx - .02, .65, .18], .12, .01, M.HAT, { group: 7, paint: p => (p[1] < .31 ? M.MAGIC : undefined) });
  },

  // The hats' floor: a big oval rag rug (her hats lie on it: render/houseRooms.ts draws them), rings of colour, a fringe at each end.
  hats(m, { W, D }) {
    const rx = W / 2 - .05, rz = D / 2 - .05;
    m.ell([0, .012, 0], [rx, .012, rz], M.CLOTH, { group: 1, paint: p => { const k = Math.hypot(p[0] / rx, p[2] / rz); const band = Math.floor(k * 7); return [M.CLOTH, M.ACCENT, M.FLOWER, M.CLOTH, M.BODY3, M.ACCENT, M.FLOWER][band % 7]; } });
    for (const s of [-1, 1]) for (let i = 0; i < 9; i++) { const z = (i / 8 - .5) * rz * 1.2; m.seg([s * rx * .99, .01, z], [s * (rx + .1), .01, z], .012, .012, M.BELLY, { group: 2 }); }
  },

  // The bags: a row of iron hooks on a plank, her satchel, a backpack, a bum bag and a tote of records hanging; a little lantern.
  bags(m, { W, D, H }) {
    // (a hall stand, freestanding: two posts on sledge feet and a rail between them, its hooks forward; the bags hang off its front)
    const zb = -.02, y = H * .8;
    for (const x of [-W / 2 + .06, W / 2 - .06]) { m.seg([x, .03, 0], [x, y + .14, 0], .035, .03, M.WOOD, { group: 1 }); m.seg([x, .03, -.3], [x, .03, .3], .04, .04, M.WOOD, { group: 1 }); m.ell([x, y + .18, 0], [.05, .05, .05], M.FLOWER, { group: 1 }); }
    m.box([0, y, zb], [W / 2 - .06, .05, .03], M.WOOD, { round: .01, group: 1, paint: planks(.4) });
    // (its back: an umbrella and a long scarf off the rail's far side)
    m.seg([-W * .2, y, -.08], [-W * .22, .05, -.12], .02, .02, M.SHADES, { group: 14 }); m.seg([-W * .2, y + .03, -.08], [-W * .2 + .06, y + .12, -.08], .012, .012, M.SHADES, { group: 14 });
    m.chain([[W * .25, y, -.07, .04], [W * .27, y * .6, -.1, .035], [W * .24, y * .3, -.1, .03]], M.ACCENT, { group: 15, paint: p => (Math.floor(p[1] * 10) % 2 ? M.FLOWER : undefined) });
    const xs = [-W * .36, -W * .12, W * .12, W * .36];
    for (const x of xs) m.chain([[x, y, zb + .02, .018], [x, y - .02, zb + .12, .016], [x, y + .04, zb + .16, .014]], M.SHADES, { group: 2 });
    // the satchel (a flap, a buckle, its strap), the backpack (pockets), the bum bag, the tote
    m.chain([[xs[0] - .12, y, zb + .14, .018], [xs[0], y + .03, zb + .15, .018], [xs[0] + .12, y, zb + .14, .018]], M.BODY2, { group: 10 });
    m.box([xs[0], y - .3, zb + .14], [.18, .14, .06], M.BODY2, { round: .04, group: 10, paint: p => (p[1] > y - .26 ? M.WOOD : Math.abs(p[0] - xs[0]) < .025 && p[1] > y - .32 ? M.FLOWER : undefined) });
    m.box([xs[1], y - .3, zb + .16], [.17, .24, .09], M.IRIS, { round: .08, group: 11 });
    m.box([xs[1], y - .38, zb + .25], [.12, .1, .04], M.IRIS, { round: .04, group: 11, paint: p => (Math.abs(p[1] - (y - .3)) < .015 ? M.FLOWER : undefined) });
    m.ell([xs[2], y - .2, zb + .16], [.16, .08, .07], M.PHONES, { group: 12 });
    m.box([xs[3], y - .32, zb + .13], [.17, .2, .04], M.BELLY, { round: .02, group: 13, paint: p => (Math.hypot(p[0] - xs[3], p[1] - (y - .3)) < .07 ? M.SHADES : undefined) });
    for (const s of [-1, 1]) m.seg([xs[3] + s * .1, y - .12, zb + .13], [xs[3], y + .02, zb + .15], .012, .012, M.BELLY, { group: 13 });
    // a lantern on the floor by them
    m.box([W / 2 - .15, .12, .05], [.07, .1, .07], M.SHADES, { round: .01, group: 20 });
    bulb(m, [W / 2 - .15, .13, .05], .05, M.GLOW, 21, [WARM, 12, .35]);
    m.chain([[W / 2 - .2, .23, .05, .01], [W / 2 - .15, .3, .05, .01], [W / 2 - .1, .23, .05, .01]], M.SHADES, { group: 20 });
  },

  // The invitations desk (Ed, 2026-10-26: bigger, freestanding, and messy; rules/kit.ts): a writing table standing free in the Parlour,
  // turned legs and a drawer each side, good from any side; on it three piles of the 💌 she throws (white, a blue edge and flap,
  // a red heart: render/invites.ts's emoji), one a witch, each on her own tray (pink, teal, gold); its state how many are left in
  // each ("8,4,0"); envelopes sliding off its edges, and a spill of them on the floor all round, which stays as her pile empties.
  invitations(m, { W, D, H }, state) {
    const top = H * .78, sit = top + .03, X = [1, 0, 0], Z = [0, 0, 1], E = Math.min(W * .13, D * .3); // E: an envelope's half-width
    // the table: a thick top with a lip, four turned legs, a drawer on the front and the back
    m.box([0, top, 0], [W / 2, .035, D / 2], M.WOOD, { round: .02, group: 1 });
    m.box([0, top - .07, 0], [W / 2 - .06, .04, D / 2 - .06], M.HAIR, { group: 2 });
    for (const x of [-W / 2 + .08, W / 2 - .08]) for (const z of [-D / 2 + .08, D / 2 - .08]) {
      m.seg([x, 0, z], [x, top - .1, z], .035, .028, M.WOOD, { group: 3 });
      m.ell([x, top * .55, z], [.05, .05, .05], M.HAIR, { group: 3 });
    }
    for (const z of [-D / 2 + .05, D / 2 - .05]) { m.box([0, top - .07, z], [W * .18, .035, .01], M.BARKD, { group: 4 }); m.ell([0, top - .07, z + Math.sign(z) * .015], [.02, .02, .015], M.FLOWER, { group: 4 }); }
    // the 💌: white, a blue edge and its flap's V, and a big red heart over the flap's point, most of its face (Ed: "envelopes on the
    // desk should clearly read as hearts", at the house's camera)
    const heart = (x, y) => (x * x + y * y - 1) ** 3 - x * x * y * y * y <= 0;
    // (t runs up the face, as the camera sees it lying flat: the flap's V down from the top corners, the heart's lobes up)
    const face = (s, t) => (heart(s / .56, (t + .1) / .62) ? M.ACCENT : Math.abs(s) > .88 || Math.abs(t) > .84 || Math.abs(t - Math.abs(s) * .84) < .08 ? M.IRIS : M.BELLY);
    const env = (c, yaw, g, tilt = 0) => {
      // (tilted about its own width: its face's up, v, and its normal, up, turned together; tilt < 0 leans its face to the camera)
      const u = rotY(X, yaw), v0 = rotY([0, 0, -1], yaw), ct = Math.cos(tilt), sn = Math.sin(tilt), v = [v0[0] * ct, -sn, v0[2] * ct], up = [v0[0] * sn, ct, v0[2] * sn];
      m.box([c[0] - up[0] * .008, c[1] - up[1] * .008, c[2] - up[2] * .008], [E * .97, .004, E * .65], M.BELLY, { group: g, dir: u, up, round: .003 });
      m.flat([c[0] + up[0] * .006, c[1] + up[1] * .006, c[2] + up[2] * .006], u, v, E, E * .68, face, { group: g + 1, bend: 0 });
    };
    // three piles, one a witch, on her tray
    const left = (state ?? "8,8,8").split(",").map(Number), trays = [M.POM, M.HAT1, M.FLOWER];
    [-W * .3, 0, W * .3].forEach((x, k) => {
      const z = 0, n = Math.min(10, left[k] ?? 0);
      m.box([x, sit + .01, z], [E * 1.25, .012, E * .95], trays[k], { round: .012, group: 10 + k * 4 });
      // (fanned, so each letter's heart shows: a stack of love letters, not a white block)
      for (let i = 0; i < n; i++) env([x + (i - (n - 1) / 2) * E * .09 + (hash2(k, i, 3) - .5) * E * .2, sit + .02 + i * .014, z + (hash2(k, i, 4) - .5) * E * .3], (hash2(k, i, 5) - .5) * .9, 11 + k * 4);
      if (n > 4) env([x + E * .9, sit + .03, z + E * .6], .9 + k, 12 + k * 4); // (one slid off the top of a tall pile)
      if (n > 0) env([x, sit + .02 + n * .014 + E * .3, z + E * .25], (hash2(k, 9, 1) - .5) * .3, 13 + k * 4, -1.05); // (and one propped up on it, its heart to the room)
    });
    // sliding off the edges, and a spill on the floor all round (it stays: she's a messy witch)
    env([-W / 2 + .02, top - .02, D * .3], .3, 30, .7); env([W / 2 - .02, top - .03, -D * .25], -.4, 32, -.6); env([W * .1, top - .02, D / 2 - .01], 1.2, 34, .8);
    for (let i = 0; i < 16; i++) {
      const a = hash2(i, 7, 1) * Math.PI * 2, r = .55 + hash2(i, 7, 2) * .45, x = Math.cos(a) * (W / 2 + .1) * r * 1.15, z = Math.sin(a) * (D / 2 + .1) * r * 1.3;
      env([x, .03 + (i % 3) * .004, z], (hash2(i, 7, 3) - .5) * 2.4, 40 + (i % 6) * 2, -.3); // (fallen face up, near enough the camera's way, a little tipped up on each other)
    }
    // a quill in its ink among the piles
    can(m, W * .15, -D * .3, sit, sit + .07, .045, M.SHADES, { group: 70 });
    m.flat([W * .15 + .05, sit + .2, -D * .3], [.3, 1, 0], Z, .04, .14, (s, t) => (Math.abs(s) < (1 - t * t) * .9 ? M.BELLY : undefined), { group: 71, bend: .3 });
    // (no candle: its light washed the letters out at the house's camera)
  },

  // The pegboard (Hotel's Workshop, Ed's OK, 2026-10-23): the 3 × 3 biome board her broom's parts hang on, laid out as the islands'
  // biome map with north up: a board of holes in a wooden frame, its nine cells each framed in its biome's colour (BIOMES), a brass
  // compass rose over it; a sprig sprouting from a corner. Each cell's middle is a mark (`cell0` to `cell8`, row by row from the top
  // left) for the parts Hotel hangs on it, which glow on tonight's cell.
  pegboard(m, { W, D, H }) {
    // (freestanding: the board on two posts with sledge feet, braced at its back)
    const zb = 0, y0 = .55, y1 = H - .35, cy = (y0 + y1) / 2, hh = (y1 - y0) / 2, zf = zb + .035;
    for (const s of [-1, 1]) { const x = s * (W / 2 + .06); m.seg([x, 0, zb - .02], [x, y1 + .1, zb - .02], .04, .035, M.WOOD, { group: 3 }); m.seg([x, .03, -.32], [x, .03, .32], .045, .045, M.WOOD, { group: 3 }); m.seg([x, .05, -.28], [x, cy, zb - .04], .02, .02, M.WOOD, { group: 3 }); m.ell([x, y1 + .14, zb - .02], [.05, .05, .05], M.FLOWER, { group: 3 }); }
    for (const s of [-1, 1]) m.seg([s * W * .45, y0, zb - .035], [-s * W * .45, y1, zb - .035], .02, .02, M.BARKD, { group: 3 });
    // (a dark board, oily green, so the parts hung on it stand out against it: art/workshop.js)
    m.box([0, cy, zb], [W / 2, hh, .02], M.CLOTH, { group: 1, paint: p => (Math.abs(((p[0] * 9) % 1 + 1) % 1 - .5) < .1 && Math.abs(((p[1] * 9) % 1 + 1) % 1 - .5) < .1 ? M.BARKD : undefined) });
    m.box([0, cy, zb - .012], [W / 2 + .05, hh + .05, .015], M.WOOD, { round: .01, group: 2 });
    // the nine cells' frames, each in its biome's colour (BIOMES' materials), a gap of board between them
    const cw = (W - .12) / 3, ch = (2 * hh - .12) / 3;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const x = -W / 2 + .06 + cw * (c + .5), y = y1 - .06 - ch * (r + .5), mat = BIOME_MATS[r * 3 + c], fw = .025;
      for (const sy of [-1, 1]) m.box([x, y + sy * (ch / 2 - .03), zf], [cw / 2 - .04, fw, .012], mat, { group: 10 + r * 3 + c });
      for (const sx of [-1, 1]) m.box([x + sx * (cw / 2 - .04), y, zf], [fw, ch / 2 - .03, .012], mat, { group: 10 + r * 3 + c });
      (m.marks ??= {})[`cell${r * 3 + c}`] = [x, y, zf + .03];
      // two pegs a cell, the part hung across them at HANG's tilt (art/workshop.js), a little under its line
      for (const t of [-.2, .2]) { const px = x + t * Math.cos(HANG), py = y + t * Math.sin(HANG) - .045; m.seg([px, py, zf], [px, py, zf + .07], .016, .014, M.BARKD, { group: 40 + r * 3 + c }); }
    }
    // the compass rose over it: a brass disc, its four points, north up and red
    const rc = [0, y1 + .2, zf - .01];
    m.ell(rc, [.16, .16, .02], M.FLOWER, { group: 30 });
    for (const [dx, dy, mat] of [[0, 1, M.ACCENT], [0, -1, M.BARKD], [1, 0, M.BARKD], [-1, 0, M.BARKD]]) m.seg([rc[0], rc[1], rc[2] + .02], [rc[0] + dx * .2, rc[1] + dy * .2, rc[2] + .02], .035, .005, mat, { group: 31 });
    sprig(m, [-W / 2, y1 + .05, zb + .05], 5, .12, 32);
    sprig(m, [W / 2 + .06, y0 * .5, zb + .05], 4, .1, 33, .2);
  },

  // The broom bay (Hotel's Workshop): two trestles that hold her broom across them at waist height (the mark `rest`: Hotel draws her
  // broom there), a mechanic's creeper on the floor in front, a red tool chest at one end, an inspection lamp clamped to a trestle;
  // ivy up a trestle's leg.
  broomBay(m, { W, D, H }) {
    const rest = H * .82, xs = [-W * .28, W * .18];
    for (const [i, x] of xs.entries()) {
      for (const s of [-1, 1]) for (const zz of [-1, 1]) m.seg([x + s * .05, rest - .05, 0], [x + s * .22, 0, zz * D * .2], .03, .03, M.WOOD, { group: 1 + i });
      m.box([x, rest - .05, 0], [.06, .04, D * .22], M.WOOD, { round: .01, group: 1 + i });
      m.ell([x, rest - .01, 0], [.07, .04, .12], M.ACCENT, { group: 3 + i }); // (a padded cradle)
    }
    (m.marks ??= {}).rest = [(xs[0] + xs[1]) / 2, rest + .04, 0];
    ivy(m, xs[0] - .2, D * .2, .05, rest * .8, 5, .05);
    // the creeper: a low board on castors, a padded headrest
    m.box([-W * .05, .07, D * .32], [.45, .025, .17], M.BARKD, { round: .02, group: 10, paint: p => (p[0] < -W * .05 - .3 ? M.ACCENT : undefined) });
    for (const [dx, dz] of [[-.38, -.12], [.38, -.12], [-.38, .12], [.38, .12]]) m.ell([-W * .05 + dx, .03, D * .32 + dz], [.03, .03, .03], M.SHADES, { group: 11 });
    // the tool chest: red drawers, chrome handles, a spanner and a can on top
    const tx = W / 2 - .22;
    m.box([tx, .45, -D * .1], [.2, .43, .18], M.ACCENT, { round: .02, group: 20, paint: p => (Math.abs(((p[1] / .14) % 1 + 1) % 1 - .5) > .45 ? M.BARKD : undefined) });
    for (let i = 0; i < 6; i++) m.box([tx, .14 + i * .14, -D * .1 + .19], [.08, .01, .01], M.FRAME, { group: 21 });
    m.seg([tx - .1, .9, -D * .1], [tx + .08, .9, -D * .1 + .06], .015, .015, M.FRAME, { group: 22 });
    can(m, tx + .08, -D * .1 - .05, .88, 1, .045, M.FLOWER, { group: 23 });
    // the inspection lamp, clamped to the right trestle, glowing
    m.seg([xs[1] + .1, rest - .05, -.05], [xs[1] + .25, rest + .35, -.1], .012, .012, M.SHADES, { group: 30 });
    m.seg([xs[1] + .25, rest + .35, -.1], [xs[1] + .2, rest + .25, .05], .05, .08, M.SHADES, { group: 31 });
    bulb(m, [xs[1] + .2, rest + .24, .07], .035, M.WOKEN, 32, [WARM, 14, .4]);
  },

  // The lathe (Hotel's Workshop): a sturdy bench, the lathe on it (a headstock, its bed, a tailstock: her broom lies between them,
  // the mark `rest`), a row of paint tins with drips down their sides, brushes in a jar, a rag; shavings curling on the floor.
  lathe(m, { W, D, H }, state) {
    const top = H * .45;
    m.box([0, top, 0], [W / 2, .04, D / 2], M.WOOD, { round: .015, group: 1, paint: planks(.3) });
    for (const x of [-W / 2 + .08, W / 2 - .08]) for (const z of [-D / 2 + .06, D / 2 - .06]) m.seg([x, 0, z], [x, top, z], .04, .04, M.WOOD, { group: 2 });
    m.box([0, top * .25, 0], [W / 2 - .1, .02, D / 2 - .08], M.WOOD, { group: 3 });
    // the lathe: its bed rails, headstock (with its motor) and tailstock
    const sit = top + .04, lx = -W * .08, len = W * .55;
    for (const z of [-.05, .05]) m.seg([lx - len / 2, sit + .05, z], [lx + len / 2, sit + .05, z], .02, .02, M.FRAME, { group: 10 });
    m.box([lx - len / 2, sit + .16, 0], [.09, .14, .1], M.HAT1, { round: .02, group: 11 });
    m.ell([lx - len / 2 - .05, sit + .32, 0], [.07, .07, .07], M.SHADES, { group: 12 });
    m.box([lx + len / 2 - .05, sit + .12, 0], [.06, .1, .08], M.HAT1, { round: .02, group: 13 });
    (m.marks ??= {}).rest = [lx, sit + .22, 0];
    // paint tins, their drips; brushes in a jar; a rag
    const tins = [M.ACCENT, M.IRIS, M.FLOWER, M.POM, M.LEAF2];
    tins.forEach((mat, i) => { const x = W * .26 + (i % 3) * .14, z = -D * .2 + Math.floor(i / 3) * .2; can(m, x, z, sit, sit + .12, .055, M.FRAME, { group: 20 + i, paint: p => (p[1] > sit + .09 || (p[1] > sit + .03 && Math.sin(Math.atan2(p[2] - z, p[0] - x) * 5) > .7) ? mat : undefined) }); });
    can(m, W * .42, D * .2, sit, sit + .12, .05, M.CRYSTAL, { group: 30 });
    for (let i = 0; i < 3; i++) m.seg([W * .42 + (i - 1) * .02, sit + .08, D * .2], [W * .42 + (i - 1) * .05, sit + .3, D * .2], .01, .016, i ? M.WOOD : M.STRAW, { group: 31 + i });
    m.ell([W * .1, sit + .02, D * .25], [.12, .025, .08], M.BELLY, { group: 35, rough: .01, paint: p => (hash2(Math.round(p[0] * 40), Math.round(p[2] * 40), 4) > .7 ? M.ACCENT : undefined) });
    for (let i = 0; i < 6; i++) { const a = i * 1.1; m.ell([lx + Math.cos(a) * .3, .015, D * .35 + Math.sin(a) * .15], [.05, .012, .03], M.STRAW, { group: 40, dir: [Math.cos(a), 0, Math.sin(a)] }); }
    // Her night's brooms (Ed, 2026-10-26: "three basic brooms, one on the lathe, two resting nearby, they disappear as each witch takes one"): the
    // state the brooms left ("3", "2", "1", "0"); the first on the lathe, the others leaning on the table's ends
    const left = Number(state ?? 3), broom = (a, b, g) => { // a plain broom, its handle from a to its bristles' end b
      const t = [a[0] + (b[0] - a[0]) * .72, a[1] + (b[1] - a[1]) * .72, a[2] + (b[2] - a[2]) * .72];
      m.seg(a, t, .06, .065, M.BARKD, { group: g }); // (a dark handle, thick enough to read at the house's camera, against the lit tabletop)
      m.seg(t, [t[0] + (b[0] - a[0]) * .03, t[1] + (b[1] - a[1]) * .03, t[2] + (b[2] - a[2]) * .03], .08, .08, M.FRAME, { group: g + 1 });
      m.seg(t, b, .09, .17, M.STRAW, { group: g + 2, paint: p => (hash2(Math.round(p[0] * 60), Math.round(p[1] * 60), 7) > .8 ? M.BROOM : undefined) });
    };
    if (left >= 1) broom([lx - len * .55, sit + .42, .12], [lx + len * .6, sit + .36, .12], 50); // (up on its centres, clear of the rails)
    if (left >= 2) broom([-W / 2 - .02, top + .55, D / 2 - .1], [-W / 2 - .28, .02, D / 2 + .25], 54);
    if (left >= 3) broom([W / 2 + .02, top + .55, D / 2 - .1], [W / 2 + .3, .02, D / 2 + .2], 58);
  },

  // The record shelf: a tall shelf of records, their spines every colour, a turntable on top with a record on it, a crate of vinyl at its
  // foot, a lava lamp glowing on a shelf, a plant trailing down one side.
  recordShelf(m, { W, D, H }) {
    const zb = -D / 2 + .02, n = 4;
    for (let i = 0; i <= n; i++) m.box([0, .05 + i * (H - .1) / n, 0], [W / 2, .025, D / 2 - .02], M.WOOD, { round: .008, group: 1 });
    for (const s of [-1, 1]) m.box([s * (W / 2 - .02), H / 2, 0], [.025, H / 2, D / 2 - .02], M.BARKD, { group: 2 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.ell([sx * (W / 2 - .02), .02, sz * (D / 2 - .04)], [.04, .03, .04], M.BARKD, { group: 2 }); // (open at the back, on feet: freestanding)
    const spines = [M.ACCENT, M.FLOWER, M.HAT1, M.BELLY, M.POM, M.IRIS, M.CLOTH, M.SHADES];
    for (let i = 0; i < n; i++) {
      const y0 = .075 + i * (H - .1) / n, ht = (H - .1) / n - .06;
      if (i === 2) { m.seg([W * .25, y0, 0], [W * .25, y0 + .1, 0], .07, .05, M.FRAME, { group: 30 }); m.ell([W * .25, y0 + .2, 0], [.055, .1, .055], M.MAGIC, { group: 31, extra: true, paint: p => (hash2(Math.round(p[1] * 30), 1, 7) > .6 ? M.MAGIC2 : undefined) }); light(m, [W * .25, y0 + .2, .1], MAGICL, 12, .35); }
      // records leaning in runs, a gap or two
      for (let x = -W / 2 + .07, k = 0; x < W / 2 - .07 - (i === 2 ? W * .35 : 0); x += .045, k++) {
        if (hash2(i, k, 5) > .9) { x += .05; continue; }
        m.box([x, y0 + ht / 2, .01], [.02, ht / 2, D / 2 - .06], spines[Math.floor(hash2(k, i, 3) * spines.length)], { group: 10 + i, dir: rotY(X, 0), up: [hash2(k, i, 2) > .8 ? .15 : 0, 1, 0] });
      }
    }
    // the turntable on top
    m.box([-W * .15, H + .06, 0], [.22, .05, .18], M.SHADES, { round: .015, group: 40 });
    disc(m, [-W * .15 - .03, H + .12, 0], .15, .01, M.BARKD, { group: 41, paint: p => (Math.hypot(p[0] + W * .15 + .03, p[2]) < .04 ? M.ACCENT : undefined) });
    m.seg([-W * .15 + .17, H + .12, -.12], [-W * .15 + .05, H + .13, .05], .01, .01, M.FRAME, { group: 42 });
    // a crate of vinyl at its foot; a plant trailing down its side
    m.box([W / 2 + .25, .16, .05], [.2, .16, .2], M.WOOD, { group: 50, paint: planks(.1) });
    for (let i = 0; i < 5; i++) m.box([W / 2 + .25 - .12 + i * .06, .32, .05], [.012, .14, .17], spines[(i * 3) % spines.length], { group: 51, dir: rotY(X, 0), up: [-.25, 1, 0] });
    can(m, -W / 2 + .12, 0, H + .03, H + .15, .08, M.BODY2, { group: 60 });
    sprig(m, [-W / 2 + .12, H + .18, 0], 4, .1, 61);
    for (let i = 0; i < 6; i++) m.ell([-W / 2 - .03, H - .1 - i * .22, .05 + (i % 2) * .04], [.05, .08, .05], [M.LEAF, M.LEAF2][i % 2], { group: 62, dir: [-.3, -1, .2] });
  },

  // The cauldron: a big black pot on three legs over a ring of stones, cold ashes under it (Ed's placeholder: "The cauldron is cold"),
  // the last of a brew glowing faintly green in it, a ladle, a bundle of herbs and a bag of crisps (modern clutter) beside it.
  cauldron(m, { W, D }) {
    const R = Math.min(W, D) / 2 - .05, r = R * .78;
    for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; m.ell([Math.cos(a) * R, .06, Math.sin(a) * R], [.1, .07, .09], M.STONE, { group: 1 + (i % 2), rough: .01 }); }
    m.ell([0, .03, 0], [R * .7, .03, R * .7], M.STONED, { group: 3, paint: p => (hash2(Math.round(p[0] * 20), Math.round(p[2] * 20), 1) > .82 ? M.GLOW : undefined) });
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + .5; m.seg([Math.cos(a) * r * .8, .45, Math.sin(a) * r * .8], [Math.cos(a) * r * .95, .05, Math.sin(a) * r * .95], .04, .03, M.SHADES, { group: 4 }); }
    m.ell([0, .52, 0], [r, r * .72, r], M.SHADES, { group: 5, paint: p => (p[1] > .52 + r * .5 ? M.BARKD : undefined) });
    m.ell([0, .52 + r * .6, 0], [r * .82, .06, r * .82], M.SHADES, { group: 6 });
    m.ell([0, .52 + r * .62, 0], [r * .74, .04, r * .74], M.MAGIC, { group: 7, paint: p => (hash2(Math.round(p[0] * 14), Math.round(p[2] * 14), 6) > .75 ? M.MAGIC2 : undefined) });
    light(m, [0, .52 + r * .7, 0], GREEN, 14, .35);
    m.seg([r * .3, .52 + r * .6, 0], [r * 1.15, .52 + r * 1.3, -.05], .022, .022, M.WOOD, { group: 8 });
    // a bundle of herbs; a bag of crisps
    m.seg([-R * .9, .1, R * .7], [-R * .5, .08, R * .95], .05, .08, M.LEAF2, { group: 9, paint: p => (Math.abs(p[0] + R * .75) < .025 ? M.STRAW : undefined) });
    m.box([R * .85, .12, R * .75], [.09, .12, .04], M.FLOWER, { round: .03, group: 10, dir: rotY(X, .4), paint: p => (Math.abs(p[1] - .14) < .04 ? M.ACCENT : undefined) });
  },

  // The tea table: a round cottage table under a lace cloth, a chintz teapot, two cups on saucers, a cake on its stand, a jar of
  // flowers; its legs sprouting leaves at the floor.
  teaTable(m, { W, D, H }) {
    const R = Math.min(W, D) / 2 - .03, top = H;
    disc(m, [0, top - .03, 0], R, .03, M.WOOD, { group: 1 });
    m.ell([0, top - .01, 0], [R + .05, .02, R + .05], M.BELLY, { group: 2, paint: p => { const k = Math.hypot(p[0], p[2]); return k > R - .02 && Math.sin(Math.atan2(p[2], p[0]) * 24) > .3 ? undefined : k > R - .1 ? M.WEB : undefined; } });
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + .78; m.chain([[Math.cos(a) * R * .7, top - .05, Math.sin(a) * R * .7, .04], [Math.cos(a) * R * .76, top * .5, Math.sin(a) * R * .76, .03], [Math.cos(a) * R * .72, .02, Math.sin(a) * R * .72, .035]], M.WOOD, { group: 3 }); sprig(m, [Math.cos(a) * R * .8, .05, Math.sin(a) * R * .8], 3, .07, 4 + i, .8); }
    const sit = top + .01;
    // the teapot: round, spotted, a spout, a lid knob
    m.ell([-R * .25, sit + .14, -R * .1], [.15, .13, .14], M.BELLY, { group: 10, paint: p => (hash2(Math.round(p[0] * 25), Math.round(p[1] * 25), 3) > .78 ? M.POM : hash2(Math.round(p[0] * 25), Math.round(p[1] * 25), 4) > .9 ? M.LEAF2 : undefined) });
    m.seg([-R * .25 + .12, sit + .14, -R * .1], [-R * .25 + .25, sit + .24, -R * .1], .04, .018, M.BELLY, { group: 10 });
    m.ell([-R * .25, sit + .28, -R * .1], [.03, .03, .03], M.FLOWER, { group: 11 });
    // two cups, a cake stand with a cake, a jar of flowers
    for (const [x, z] of [[R * .3, R * .3], [-R * .45, R * .4]]) { disc(m, [x, sit + .01, z], .08, .008, M.BELLY, { group: 12 }); can(m, x, z, sit + .01, sit + .09, .045, M.HAT1, { group: 13 }); }
    m.seg([R * .35, sit, -R * .3], [R * .35, sit + .14, -R * .3], .02, .02, M.FLOWER, { group: 14 });
    disc(m, [R * .35, sit + .14, -R * .3], .13, .008, M.FLOWER, { group: 14 });
    can(m, R * .35, -R * .3, sit + .14, sit + .25, .1, M.POM, { group: 15, paint: p => (p[1] > sit + .22 ? M.BELLY : Math.abs(p[1] - (sit + .19)) < .012 ? M.ACCENT : undefined) });
    can(m, 0, R * .55, sit, sit + .12, .05, M.CRYSTAL, { group: 16 });
    for (let i = 0; i < 5; i++) { const a = i * 1.26; m.ell([Math.cos(a) * .06, sit + .2 + (i % 2) * .04, R * .55 + Math.sin(a) * .05], [.04, .035, .04], [M.FLOWER, M.POM, M.BELLY][i % 3], { group: 17 }); }
    sprig(m, [0, sit + .14, R * .55], 3, .05, 18, .9);
  },

  // The card table: a round gothic table with a green baize top and a dark rim, cards dealt and fanned, stacks of chips, a candelabra of
  // three candles, a phone face down (modern clutter).
  cardTable(m, { W, D, H }) {
    const R = Math.min(W, D) / 2 - .04, top = H;
    disc(m, [0, top - .03, 0], R, .03, M.BARKD, { group: 1 });
    disc(m, [0, top + .002, 0], R - .07, .006, M.CLOTH, { group: 2 });
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z]) => [x * .68, z * .68])) { m.chain([[x * (R - .1), top - .05, z * (R - .1), .045], [x * (R - .02), top * .5, z * (R - .02), .035], [x * (R - .12), .05, z * (R - .12), .04]], M.BARKD, { group: 3 }); m.ell([x * (R - .14), .03, z * (R - .14)], [.05, .03, .05], M.FLOWER, { group: 3 }); }
    const sit = top + .01;
    // cards in front of three places and a fanned hand; chips in stacks
    for (const [x, z, a] of [[0, R * .5, 0], [-R * .5, 0, 1.57], [R * .5, -R * .1, -1.57]]) for (let i = 0; i < 3; i++) { const b = a + (i - 1) * .25; m.flat([x + Math.sin(b) * .04, sit + i * .002, z + Math.cos(b) * .02], rotY(X, b), rotY(Z, b), .06, .09, (s, t) => (Math.abs(s) > .75 || Math.abs(t) > .82 ? M.BELLY : M.ACCENT), { group: 10 + i, bend: 0 }); }
    for (const [x, z, mat] of [[-R * .15, -R * .4, M.ACCENT], [R * .05, -R * .45, M.IRIS], [R * .25, -R * .42, M.BELLY]]) for (let i = 0; i < 4; i++) disc(m, [x, sit + .015 + i * .026, z], .055, .013, i % 2 ? mat : M.BELLY, { group: 20 });
    // the candelabra
    m.seg([-R * .45, sit, -R * .45], [-R * .45, sit + .3, -R * .45], .03, .02, M.FLOWER, { group: 30 });
    m.chain([[-R * .45 - .15, sit + .32, -R * .45, .015], [-R * .45, sit + .26, -R * .45, .015], [-R * .45 + .15, sit + .32, -R * .45, .015]], M.FLOWER, { group: 30 });
    for (const dx of [-.15, 0, .15]) candle(m, [-R * .45 + dx, sit + (dx ? .32 : .3), -R * .45], 31 + Math.round(dx * 10), .12, dx === 0);
    m.box([R * .4, sit + .01, R * .45], [.07, .01, .12], M.SHADES, { group: 40, dir: rotY(X, .6) });
  },

  // The bestiary's book: a carved gothic lectern holding the great book open, its pages carrying glowing runes, ribbons hanging from it,
  // a candle on the lectern's arm, ivy round its stem.
  book(m, { W, D, H }) {
    const top = H * .85;
    m.ell([0, .05, 0], [W * .35, .05, D * .35], M.BARKD, { group: 1 });
    m.chain([[0, .08, 0, .08], [0, top * .5, 0, .05], [0, top - .1, -.03, .07]], M.BARKD, { group: 2, paint: p => (Math.sin(p[1] * 30) > .7 ? M.HAIR : undefined) });
    ivy(m, 0, 0, .15, top * .8, 3, .06);
    m.box([0, top - .04, 0], [W / 2 - .05, .04, D / 2 - .05], M.BARKD, { group: 4, dir: [1, 0, 0], up: [0, 1, .45] });
    // the book, open: two pages, its covers' edge, the runes glowing faintly; two ribbons
    for (const s of [-1, 1]) m.flat([s * (W / 4 - .02), top + .03, .02], X, [0, .45, -1], W / 4 - .02, D / 2 - .1, (u, v) => (Math.abs(u) > .9 || Math.abs(v) > .9 ? M.ACCENT : Math.abs(((v * 4) % 1 + 1) % 1 - .5) < .12 && Math.abs(u) < .7 ? (hash2(Math.round(u * 6), Math.round(v * 8), s) > .55 ? M.RUNE : M.BARKD) : M.BELLY), { group: 5 + (s > 0), bend: .4 });
    light(m, [0, top + .15, .05], [110, 255, 196], 10, .25);
    for (const x of [-.05, .04]) m.seg([x, top, .2], [x + .01, top - .35, .25], .015, .015, x < 0 ? M.ACCENT : M.FLOWER, { group: 8 });
    m.seg([W / 2 - .05, top - .05, 0], [W / 2 + .05, top - .02, .05], .015, .015, M.FLOWER, { group: 9 });
    candle(m, [W / 2 + .05, top - .02, .05], 10);
  },

  // The skeletons and skulls: a long cabinet of curiosities against the wall, its shelves holding skulls (big and small), a deer skull
  // with antlers above, jars of specimens glowing faintly, a framed moth, ferns sprouting out of a skull.
  specimens(m, { W, D, H }) {
    const zb = -D / 2 + .02, shelves = [.05, H * .4, H * .72];
    for (const y of shelves) m.box([0, y, 0], [W / 2, .03, D / 2 - .02], M.BARKD, { round: .01, group: 1 });
    for (const x of [-W / 2 + .03, -W / 6, W / 6, W / 2 - .03]) m.box([x, H * .37, 0], [.025, H * .37, D / 2 - .02], M.BARKD, { group: 2 });
    m.box([0, H * .37, zb], [W / 2, H * .37, .012], M.BODY3, { group: 2 });
    m.box([0, H * .37, zb - .02], [W / 2 + .01, H * .37 + .01, .012], M.BARKD, { group: 2, paint: p => (Math.abs(((p[0] / .18) % 1 + 1) % 1 - .5) > .46 ? M.HAIR : undefined) }); // (its back, panelled: it stands free)
    m.box([0, H * .755, 0], [W / 2 + .03, .025, D / 2 + .01], M.BARKD, { round: .01, group: 2 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.ell([sx * (W / 2 - .03), .02, sz * (D / 2 - .05)], [.045, .035, .045], M.BARKD, { group: 2 });
    const skull = (x, y, s, g, fern = false) => {
      m.ell([x, y + s * .9, 0], [s * .8, s * .75, s * .9], M.BELLY, { group: g });
      m.ell([x, y + s * .4, s * .35], [s * .5, s * .35, s * .45], M.BELLY, { group: g });
      for (const e of [-1, 1]) m.ell([x + e * s * .32, y + s * .85, s * .7], [s * .2, s * .2, s * .08], M.SHADES, { group: g + 50 });
      if (fern) sprig(m, [x, y + s * 1.7, 0], 5, s * .6, g + 100, .8);
    };
    // the lower shelf: a big skull, two jars; the middle: three small skulls; the top: jars and a moth's frame
    skull(-W / 3, shelves[0] + .03, .16, 10, true);
    for (const [x, mat] of [[0, M.MAGIC], [W * .12, M.CRYSTAL]]) { can(m, x, 0, shelves[0] + .03, shelves[0] + .3, .09, M.CRYSTAL, { group: 20 }); m.ell([x, shelves[0] + .15, 0], [.06, .08, .06], mat === M.MAGIC ? M.MAGIC : M.LEAF2, { group: 21, extra: mat === M.MAGIC }); m.ell([x, shelves[0] + .31, 0], [.09, .02, .09], M.FLOWER, { group: 22 }); }
    light(m, [0, shelves[0] + .15, .1], GREEN, 9, .2);
    skull(W / 3, shelves[0] + .03, .13, 12);
    for (let i = 0; i < 3; i++) skull(-W / 3 + i * W / 3, shelves[1] + .03, .09, 14 + i);
    m.box([W * .3, shelves[2] + .2, zb + .02], [.17, .14, .015], M.WOOD, { group: 30 });
    m.flat([W * .3, shelves[2] + .2, zb + .04], X, Y, .12, .09, (s, t) => (Math.abs(s) < .9 * (1 - Math.abs(t) * .4) && Math.abs(s) > .08 ? (Math.hypot(Math.abs(s) - .45, t) < .15 ? M.FLOWER : M.BODY2) : Math.abs(s) < .08 ? M.SHADES : M.BELLY), { group: 31, bend: 0 });
    can(m, -W * .05, 0, shelves[2] + .03, shelves[2] + .25, .07, M.CRYSTAL, { group: 32 });
    // the deer skull over it, antlers spread
    const dy = H * .95;
    m.box([-W * .2, H * .79, 0], [.1, .04, .08], M.WOOD, { round: .01, group: 39 }); m.seg([-W * .2, H * .8, 0], [-W * .2, dy - .08, zb + .1], .02, .02, M.BARKD, { group: 39 }); // (on a plinth on the cabinet's top)
    m.ell([-W * .2, dy, zb + .1], [.1, .14, .1], M.BELLY, { group: 40 });
    for (const s of [-1, 1]) { const b = [-W * .2 + s * .06, dy + .12, zb + .1]; m.chain([[...b, .025], [b[0] + s * .18, b[1] + .2, b[2], .02], [b[0] + s * .25, b[1] + .45, b[2], .012]], M.BELLY, { group: 41 }); m.seg([b[0] + s * .18, b[1] + .2, b[2]], [b[0] + s * .35, b[1] + .3, b[2]], .015, .008, M.BELLY, { group: 41 }); }
  },

  // The telescope: a long brass tube on a wooden tripod, tilted up at the sky, its eyepiece and finder; a rolled star chart and a
  // little stool, a lantern hung on a leg.
  telescope(m, { W, D, H }) {
    const head = [0, H * .7, 0];
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + .5; m.seg(head, [Math.cos(a) * W * .45, 0, Math.sin(a) * D * .45], .03, .025, M.WOOD, { group: 1 }); }
    m.ell(head, [.06, .05, .06], M.FRAME, { group: 2 });
    const dir = [.25, .7, -.55], L = 1.1, k = Math.hypot(...dir), u = dir.map(v => v / k), a = head.map((v, i) => v - u[i] * L * .35), b = head.map((v, i) => v + u[i] * L * .65);
    m.seg(a, b, .06, .09, M.FLOWER, { group: 3, paint: p => (Math.abs(((p[1] * 6) % 1 + 1) % 1 - .5) < .05 ? M.WOOD : undefined) });
    m.ell(b, [.095, .095, .095], M.FLOWER, { group: 3, paint: () => M.FLOWER });
    m.ell(b.map((v, i) => v + u[i] * .02), [.07, .07, .07], M.CRYSTAL, { group: 4 });
    m.seg(a, a.map((v, i) => v - u[i] * .12), .03, .025, M.SHADES, { group: 5 });
    m.seg(head.map((v, i) => v + u[i] * .1 + [0, .1, 0][i]), head.map((v, i) => v + u[i] * .4 + [0, .1, 0][i]), .02, .02, M.FLOWER, { group: 6 });
    // a stool, a rolled star chart on it, a lantern on a leg
    m.box([W * .5, .3, D * .3], [.14, .025, .14], M.WOOD, { round: .02, group: 10 });
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) m.seg([W * .5 + x * .1, .3, D * .3 + z * .1], [W * .5 + x * .12, 0, D * .3 + z * .12], .02, .02, M.WOOD, { group: 10 });
    m.seg([W * .5 - .12, .36, D * .3], [W * .5 + .12, .36, D * .3 + .03], .035, .035, M.BELLY, { group: 11, paint: p => (Math.abs(p[0] - W * .5) < .02 ? M.IRIS : undefined) });
    m.box([-W * .25, .5, D * .25], [.05, .07, .05], M.SHADES, { round: .01, group: 12 });
    bulb(m, [-W * .25, .5, D * .25], .035, M.GLOW, 13, [WARM, 10, .3]);
  },

  // The map table: a round table on a carved trunk, a parchment map spread over it (blue sea, its islands, a compass rose), weighed
  // down by a compass, a candle and a mug; roots of the trunk spreading over the floor, sprouting.
  mapTable(m, { W, D, H }) {
    const R = Math.min(W, D) / 2 - .05, top = H;
    disc(m, [0, top - .04, 0], R, .04, M.WOOD, { group: 1, paint: p => (Math.hypot(p[0], p[2]) > R - .06 ? M.BARKD : undefined) });
    m.chain([[0, top - .06, 0, .14], [0, top * .5, 0, .1], [0, .05, 0, .17]], M.BARKD, { group: 2, rough: .01 });
    for (let i = 0; i < 5; i++) { const a = i * 1.26 + .3; m.chain([[0, .08, 0, .08], [Math.cos(a) * R * .5, .05, Math.sin(a) * R * .5, .05], [Math.cos(a) * R * .8, .02, Math.sin(a) * R * .8, .025]], M.BARKD, { group: 3 }); if (i % 2) sprig(m, [Math.cos(a) * R * .75, .06, Math.sin(a) * R * .75], 3, .07, 4 + i, .8); }
    // the map: parchment, the sea, islands scattered, a compass rose
    const isl = [[.3, .2, .16], [-.35, -.1, .2], [.05, -.4, .12], [-.1, .45, .1], [.5, -.3, .08]];
    m.flat([0, top + .005, 0], X, Z, R * .82, R * .62, (s, t) => { if (Math.abs(s) > .95 || Math.abs(t) > .93) return M.BODY2; for (const [x, y, r] of isl) if (Math.hypot(s - x, t - y) < r * (1 + .3 * Math.sin(s * 20 + t * 13))) return Math.hypot(s - x, t - y) > r * .75 ? M.STRAW : M.LEAF2; const c = Math.hypot(s + .65, t - .6); if (c < .12 && Math.abs(Math.atan2(t - .6, s + .65) % (Math.PI / 2)) < .25) return M.ACCENT; return M.WATER; }, { group: 10, bend: .05 });
    // a compass, a candle, a mug
    disc(m, [R * .45, top + .03, R * .35], .08, .02, M.FLOWER, { group: 11, paint: p => (Math.hypot(p[0] - R * .45, p[2] - R * .35) < .06 ? M.BELLY : undefined) });
    candle(m, [-R * .55, top, -R * .3], 12, .14);
    can(m, R * .5, -R * .4, top, top + .1, .05, M.ACCENT, { group: 13 });
  },

  // The Studio's drum kit (Ed's pick, 2026-10-23: glam rock): glitter-wrapped shells, a kick drum with a neon star on its head, two
  // rack toms and a floor tom, a snare, the hi-hat and two brass cymbals on chrome stands, a throne with a hoodie over it, sticks.
  // Its kick faces the room, the throne behind.
  drumKit(m, { W, D }) {
    const glitter = g => p => (hash2(Math.round(p[0] * 40), Math.round(p[1] * 40) + Math.round(p[2] * 40), g) > .72 ? M.BELLY : undefined);
    const zk = D * .12, R = Math.min(.32, W * .15);
    // the kick, on its side, its front head facing the room with a neon star; its hoops
    m.seg([0, R + .02, zk - .25], [0, R + .02, zk + .2], R, R, M.POM, { group: 1, paint: glitter(1) });
    m.flat([0, R + .02, zk + .23], X, Y, R * .92, R * .92, (s, t) => { if (Math.hypot(s, t) > 1) return undefined; const a = Math.atan2(t, s), k = Math.hypot(s, t), star = .32 + .18 * Math.cos(a * 5); return k < star ? M.COLLAR : M.SHADES; }, { group: 2, bend: 0 });
    light(m, [0, R, zk + .4], FAIRY, 12, .35);
    for (const z of [zk - .25, zk + .2]) m.ell([0, R + .02, z], [R + .02, R + .02, .015], M.FRAME, { group: 3 });
    // toms on the kick, a floor tom, a snare: each a shell (glitter), a pale head, a chrome hoop
    const drum = (c, r, h, g, tilt = 0) => { m.seg(c, [c[0], c[1] + h, c[2] + tilt], r, r, M.POM, { group: g, paint: glitter(g) }); m.ell([c[0], c[1] + h + .01, c[2] + tilt], [r * .96, .012, r * .96], M.BELLY, { group: g + 1 }); };
    drum([-.15, R * 2 + .1, zk - .05], .13, .14, 10, -.05); drum([.17, R * 2 + .1, zk - .05], .15, .15, 12, -.05);
    drum([W * .33, .02, zk - .1], .19, .42, 14);
    for (const s of [-1, 1]) m.seg([W * .33 + s * .15, 0, zk - .1], [W * .33 + s * .16, .12, zk - .1], .015, .015, M.FRAME, { group: 16 });
    m.seg([-W * .22, 0, zk - .2], [-W * .22, .5, zk - .2], .015, .015, M.FRAME, { group: 17 }); drum([-W * .22, .5, zk - .2], .16, .1, 18);
    // the hi-hat, the crash and the ride: chrome stands, brass cymbals tilted to the room
    const cymbal = (x, z, h, r, g) => { m.seg([x, 0, z], [x, h, z], .014, .012, M.FRAME, { group: g }); for (const a of [0, 2.1, 4.2]) m.seg([x, .03, z], [x + Math.cos(a) * .14, 0, z + Math.sin(a) * .14], .01, .01, M.FRAME, { group: g }); m.ell([x, h + .02, z], [r, .012, r], M.FLOWER, { group: g + 1, dir: [1, .25, 0], up: [0, 1, .3] }); };
    cymbal(-W * .38, zk - .3, .78, .17, 20); m.ell([-W * .38, .82, zk - .3], [.17, .012, .17], M.FLOWER, { group: 22 });
    cymbal(-W * .2, zk - .45, 1.2, .23, 23); cymbal(W * .3, zk - .5, 1.1, .26, 25);
    // the throne behind, a hoodie flung over it; sticks on the snare
    const zt = -D * .38;
    m.seg([0, 0, zt], [0, .45, zt], .03, .03, M.FRAME, { group: 30 });
    m.ell([0, .5, zt], [.17, .06, .17], M.SHADES, { group: 31 });
    m.ell([.05, .55, zt + .02], [.18, .08, .16], M.HAT1, { group: 32, rough: .01 });
    m.seg([.15, .52, zt + .1], [.22, .2, zt + .18], .06, .05, M.HAT1, { group: 32 });
    for (const s of [-1, 1]) m.seg([-W * .22 + s * .03, .62, zk - .3], [-W * .22 + s * .05 + .1, .63, zk - .02], .012, .01, M.WOOD, { group: 33 });
    // a neon lightning bolt sign on a little stand behind, and a plant (cottage creeping in)
    m.seg([W * .42, 0, -D * .45], [W * .42, .9, -D * .45], .015, .015, M.FRAME, { group: 40 });
    for (let i = 0; i < 5; i++) { const a = i * 1.26 - Math.PI / 2, b = a + 1.26; m.seg([W * .42 + Math.cos(a) * .14, 1.05 + Math.sin(a) * .14, -D * .45], [W * .42 + Math.cos(b) * .14, 1.05 + Math.sin(b) * .14, -D * .45], .016, .016, M.MAGIC, { group: 41, extra: true }); }
    light(m, [W * .42, 1.05, -D * .35], MAGICL, 10, .3);
    can(m, -W * .44, -D * .4, 0, .2, .1, M.BODY2, { group: 42 }); sprig(m, [-W * .44, .26, -D * .4], 6, .12, 43, .7);
  },

  // The synth (Ed, 2026-10-26, his photo: previews/ed/refs/studio-synth-modular.jpg on claude/ed-shots: "The keyboard looks like this,
  // with a keyboard in front of it"): a big modular on a dark desk, three tiers of silver cases full of knobs and little modules, the
  // top tier set back and the wings angled in towards her, a messy web of bright patch cables draped over it all (the messy witch),
  // small LEDs glowing every colour; a keyboard on the desk in front, lit blue from under its edge.
  synthRack(m, { W, D, H }) {
    const desk = .6, zf = D / 2 - .03, back = -D / 2 + .12, X = [1, 0, 0];
    // the desk: a dark top on two panel legs, a shelf under it, a blue glow strip along its front edge
    m.box([0, desk, 0], [W / 2, .03, D / 2], M.WOOD, { round: .01, group: 1 });
    for (const x of [-W / 2 + .05, W / 2 - .05]) for (const z of [-D / 2 + .05, D / 2 - .05]) m.seg([x, 0, z], [x, desk, z], .025, .025, M.FRAME, { group: 1 });
    m.box([0, desk - .035, zf], [W / 2 - .03, .008, .008], M.GLINT, { group: 2 });
    light(m, [0, desk - .05, zf + .05], SCREEN, 14, .3);
    // the cases: three tiers stepping back and up, each a row of panels (the middle one face on, the two wings turned in), their faces
    // silver with dark seams between modules; knobs in rows, a few big ones; LEDs every colour
    const LEDS = [M.COLLAR, M.RUNE, M.GLINT, M.GLOW, M.WOKEN, M.MAGIC];
    const tiers = [[desk + .27, .24, back + .2, .25], [desk + .76, .24, back + .1, .12], [desk + 1.25, .24, back, 0]]; // [middle y, half height, z, tilt back]
    const faces = []; // (each panel's face: its middle, its across and up directions, its half sizes: where cables plug in)
    tiers.forEach(([y, hh, z, tilt], t) => {
      for (const [side, x0, x1, turn] of [[-1, -W / 2 + .03, -W * .17, .45], [0, -W * .17, W * .17, 0], [1, W * .17, W / 2 - .03, -.45]]) {
        const hw = (x1 - x0) / 2, cx = (x0 + x1) / 2 + side * .02, cz = z + Math.abs(side) * .1, across = rotY(X, side ? turn : 0), up = [0, Math.cos(tilt), Math.sin(tilt)];
        const out = [across[1] * up[2] - across[2] * up[1], across[2] * up[0] - across[0] * up[2], across[0] * up[1] - across[1] * up[0]];
        m.box([cx, y, cz], [hw, hh, .05], M.FRAME, { round: .006, group: 10 + t * 3 + side + 1, dir: across, up, paint: p => { const u = (p[0] - cx) * across[0] + (p[2] - cz) * across[2]; return Math.abs(((u / .075) % 1 + 1) % 1 - .5) > .44 || Math.abs(p[1] - y) > hh - .012 ? M.SHADES : undefined; } });
        const at = (u, v, o = .055) => [cx + across[0] * u + out[0] * o, y + up[1] * v + out[1] * o, cz + across[2] * u + up[2] * v + out[2] * o];
        faces.push({ at, hw, hh });
        // knobs: little dark ones in rows, a big one now and then; LEDs between
        for (let r = 0; r < 5; r++) for (let k = 0; k < Math.round(hw * 15); k++) {
          const u = -hw + .03 + (k + .5) * (2 * hw - .06) / Math.round(hw * 15), v = hh - .04 - r * (2 * hh - .06) / 5, hk = hash2(t * 31 + side, r * 17 + k, 9);
          if (hk > .8) bulb(m, at(u, v, .06), .014, LEDS[Math.floor(hash2(k, r + t * 4, 3) * LEDS.length)], 40 + t, hk > .97 ? [[FAIRY, GREEN, SCREEN, WARM][Math.floor(hk * 97) % 4], 7, .18] : null);
          else if (hk > .3) m.ell(at(u, v, .065), [hk > .74 ? .024 : .014, hk > .74 ? .024 : .014, .014], hk > .74 ? M.BELLY : M.SHADES, { group: 30 + t, dir: out });
        }
      }
    });
    // the patch cables: dozens, plugged into one panel and another, sagging forward and down between, red, orange, yellow, blue, pink
    const CAB = [M.ACCENT, M.JACKET, M.FLOWER, M.IRIS, M.POM, M.HAT1, M.BODY2];
    for (let i = 0; i < 30; i++) {
      const a = faces[Math.floor(hash2(i, 1, 21) * faces.length)], b = faces[Math.floor(hash2(i, 2, 21) * faces.length)];
      const p0 = a.at((hash2(i, 3, 21) * 2 - 1) * a.hw * .9, (hash2(i, 4, 21) * 2 - 1) * a.hh * .8, .075), p1 = b.at((hash2(i, 5, 21) * 2 - 1) * b.hw * .9, (hash2(i, 6, 21) * 2 - 1) * b.hh * .8, .075);
      const sag = .08 + hash2(i, 7, 21) * .3, mid = [(p0[0] + p1[0]) / 2, Math.min(p0[1], p1[1]) - sag, Math.max(p0[2], p1[2]) + .06 + sag * .4];
      const q = t => { const s = 1 - t; return [s * s * p0[0] + 2 * s * t * mid[0] + t * t * p1[0], s * s * p0[1] + 2 * s * t * mid[1] + t * t * p1[1], s * s * p0[2] + 2 * s * t * mid[2] + t * t * p1[2], .008]; };
      m.chain([0, .25, .5, .75, 1].map(t => [...q(t).slice(0, 3), .012]), CAB[i % CAB.length], { group: 60 + (i % 8) });
    }
    // a few cables falling off the desk's front to the floor in loops (her mess)
    for (let i = 0; i < 4; i++) { const x = -W * .3 + i * W * .2; m.chain([[x, desk + .25, back + .3, .009], [x + .05, desk + .02, zf + .03, .009], [x + .02, desk * .5, zf + .1, .009], [x + .1, .01, zf + .2, .009]], CAB[(i * 3) % CAB.length], { group: 70 + i }); }
    // the keyboard on the desk in front: its case, white keys, the black keys over them, a strip of LEDs over the keys
    const kz = zf - .17, kw = W * .42;
    m.box([0, desk + .05, kz], [kw, .03, .13], M.SHADES, { round: .01, group: 80 });
    m.box([0, desk + .075, kz + .04], [kw - .03, .012, .08], M.BELLY, { group: 81, paint: p => (Math.abs(((p[0] / .045) % 1 + 1) % 1 - .5) > .42 ? M.SHADES : undefined) });
    for (let k = 0; k < Math.floor(kw * 2 / .045); k++) if ([1, 2, 4, 5, 6].includes(k % 7)) m.box([-kw + .03 + k * .045, desk + .09, kz + .015], [.012, .008, .045], M.SHADES, { group: 82 });
    for (let k = 0; k < 9; k++) bulb(m, [-kw + .08 + k * (kw * 2 - .16) / 8, desk + .085, kz - .09], .008, LEDS[k % LEDS.length], 83, null);
    light(m, [0, desk + .9, back + .4], FAIRY, 16, .25);
    light(m, [-W * .3, desk + .5, back + .4], GREEN, 10, .2);
  },

  // The microphone, spotlit: a chrome stand on a round base, a big vintage capsule mic, its cable coiling away; a spot lamp hanging over
  // it on its cable (its own warm bulb; the cone of light is the view's: the music builder's), a round rug under it.
  microphone(m, { W, D, H }) {
    const r = Math.min(W, D) / 2;
    disc(m, [0, .006, 0], r * 1.3, .006, M.CLOTH, { group: 1, paint: p => (Math.hypot(p[0], p[2]) > r * 1.1 ? M.FLOWER : Math.hypot(p[0], p[2]) < r * .5 ? M.ACCENT : undefined) });
    disc(m, [0, .03, 0], r * .45, .02, M.FRAME, { group: 2 });
    m.seg([0, .03, 0], [0, H * .78, 0], .016, .014, M.FRAME, { group: 3 });
    m.ell([0, H * .78, 0], [.035, .035, .035], M.FRAME, { group: 3 });
    const mic = [0, H * .78 + .1, .05];
    m.ell(mic, [.07, .1, .07], M.FRAME, { group: 4, paint: p => (Math.abs(((p[1] - mic[1]) / .03) % 1 - .5) < .12 || p[1] < mic[1] - .06 ? M.SHADES : undefined), dir: [0, 1, .3] });
    m.chain([[0, H * .7, 0, .01], [-.1, H * .4, -.05, .01], [-.2, .02, -.1, .01], [-.35, .01, .1, .01], [-.2, .01, .25, .01]], M.SHADES, { group: 5 });
    // the spot lamp over it, hanging from above on its cable
    const lamp = [0, H * 1.25, .05];
    m.seg([lamp[0], H * 1.5, lamp[2]], lamp, .006, .006, M.SHADES, { group: 10, extra: true });
    m.seg(lamp, [lamp[0], lamp[1] - .14, lamp[2] + .03], .05, .1, M.SHADES, { group: 11, extra: true });
    bulb(m, [lamp[0], lamp[1] - .15, lamp[2] + .03], .05, M.WOKEN, 12, [WARM, 20, .55]);
    (m.marks ??= {}).spot = [lamp[0], lamp[1] - .15, lamp[2] + .03];
  },

  // A locked friend's room's door: a pointed gothic door of planks in its frame, iron straps and a ring, a wreath of leaves with a heart,
  // a little neon "do not disturb" glow (a crescent) over it, a glowing lock.
  bedroom2Door(m, s) { PIECES.door(m, s, 0); },
  bedroom3Door(m, s) { PIECES.door(m, s, 1); },
  door(m, { W, D, H }, k = 0) {
    const w = Math.min(W, 1.1) / 2, h = Math.min(H, 2.2), z = 0;
    m.flat([0, h / 2, z], X, Y, w, h / 2, (s, t) => { if (t > .5 && Math.hypot(s, (t - .5) / .5 * .95) > 1) return undefined; return Math.abs(((s * 3) % 1 + 1) % 1 - .5) > .45 ? M.BARKD : M.WOOD; }, { group: 1, bend: 0 });
    m.chain([[-w - .06, 0, z, .06], [-w - .06, h * .6, z, .06], [-w * .6, h * .92, z, .06], [0, h + .05, z, .06], [w * .6, h * .92, z, .06], [w + .06, h * .6, z, .06], [w + .06, 0, z, .06]], M.BARKD, { group: 2 });
    for (const y of [h * .25, h * .62]) m.box([-w * .4, y, z + .03], [w * .5, .025, .012], M.SHADES, { group: 3 });
    m.ell([w * .55, h * .45, z + .04], [.05, .05, .02], M.SHADES, { group: 4, paint: p => (Math.hypot(p[0] - w * .55, p[1] - h * .45) < .025 ? undefined : M.SHADES) });
    bulb(m, [w * .55, h * .38, z + .05], .025, M.MAGIC, 5, [MAGICL, 6, .2]);
    // a wreath of leaves with a heart in it; a neon crescent over the door, each its own colour
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; m.ell([Math.cos(a) * .17, h * .72 + Math.sin(a) * .17, z + .06], [.06, .045, .03], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: 6, dir: [-Math.sin(a), Math.cos(a), 0] }); }
    m.ell([0, h * .72, z + .07], [.06, .05, .02], M.ACCENT, { group: 7 });
    const neon = k ? M.COLLAR : M.MAGIC;
    for (let i = 0; i < 8; i++) { const a = -1.9 + i * .45, b = a + .45; m.seg([Math.cos(a) * .14, h + .3 + Math.sin(a) * .14, z + .05], [Math.cos(b) * .14, h + .3 + Math.sin(b) * .14, z + .05], .018, .018, neon, { group: 8, extra: true }); }
    light(m, [0, h + .3, z + .2], k ? FAIRY : MAGICL, 10, .3);
  },
  // the two locked bedrooms' placeholders, under dust sheets (art/sheeted.js)
  ...SHEETED_PIECES,
};

/** The pieces' helpers, for the rooms' dressing (art/houseDecor.js): a light, a bulb, a candle, a sprig, ivy, a pot, a disc. */
export const PARTS = { light, bulb, candle, sprig, ivy, can, disc, planks, WARM, FAIRY, MAGICL, SCREEN, GREEN };

/** The ids drawn as art (every interactive object of the house; the hats on the hats' floor are its own, render/houseRooms.ts). */
export const FURNITURE_IDS = Object.keys(PIECES).filter(id => id !== "door");
/** Each piece's states, drawn once each (the first the default). */
export const FURNITURE_STATES = { curtains: ["open", "shut"], invitations: ["8,8,8", "4,8,8", "0,8,8", "8,3,0", "0,0,0"], lathe: ["3", "2", "1", "0"] };

// ---------- colours, a palette a room ----------
// Each room its own (Ed: "per room"); materials: BARKD dark carved wood, WOOD warm wood, HAIR its carving's light, CLOTH the room's main
// cloth (a duvet, a drape, a table's baize), ACCENT velvet, BODY its folds' shade, BELLY linen, paper and bone, FLOWER brass and gold,
// FRAME metal, CRYSTAL glass, WEB a mirror, WATER the night or the sea, STONE and STONED stone, MOSS moss, BROOM and STRAW a broom; her
// things: JACKET the hoodie and a puffer, TOP its print, HAT and HAT2 her cloaks, POM pink, IRIS blue, PHONES hot pink, SHOES and SOLE
// trainers, SHADES black, HAT1 teal, BODY2 terracotta, card and cork, BODY3 a painted drawer, a duvet's stripe, a cabinet's back.
// Glowing: WOKEN bulbs and flames, COLLAR neon and fairy lights, MAGIC and MAGIC2 magic, GLINT a screen, GLOW lamps, RUNE runes.
// The woods take Golf's floors' browns (render/houseArt.ts), a step darker and lighter.
const BASE = {
  [M.BARKD]: [58, 38, 30], [M.WOOD]: [138, 96, 60], [M.HAIR]: [98, 70, 52], [M.CLOTH]: [92, 40, 96], [M.ACCENT]: [160, 36, 64], [M.BODY]: [104, 22, 46],
  [M.BELLY]: [236, 226, 206], [M.FLOWER]: [222, 176, 78], [M.FRAME]: [196, 200, 212], [M.CRYSTAL]: [176, 220, 240], [M.WEB]: [176, 196, 226], [M.WATER]: [30, 44, 92],
  [M.STONE]: [118, 112, 108], [M.STONED]: [44, 38, 38], [M.MOSS]: hsv2rgb(.27, .5, .45), [M.BROOM]: [128, 84, 50], [M.STRAW]: [214, 180, 112],
  [M.JACKET]: [236, 186, 62], [M.TOP]: [60, 46, 70], [M.HAT]: [64, 40, 98], [M.HAT2]: [120, 84, 168], [M.POM]: [252, 132, 200], [M.IRIS]: [80, 136, 226],
  [M.PHONES]: [255, 92, 176], [M.SHOES]: [240, 240, 248], [M.SOLE]: [246, 246, 246], [M.SHADES]: [34, 30, 40], [M.HAT1]: [92, 210, 200], [M.BODY2]: [204, 124, 84],
  [M.BODY3]: [110, 78, 132], [M.LEAF]: hsv2rgb(.3, .6, .52), [M.LEAF2]: hsv2rgb(.26, .55, .7), [M.LEAF3]: hsv2rgb(.36, .65, .34),
  [M.WOKEN]: [255, 222, 160], [M.COLLAR]: [255, 110, 214], [M.MAGIC]: [178, 120, 255], [M.MAGIC2]: [236, 220, 255], [M.GLINT]: [160, 226, 255], [M.GLOW]: [255, 184, 100], [M.RUNE]: [110, 255, 196],
  [M.LINE]: [24, 20, 30], [M.NOSE]: [14, 12, 18],
};
const ROOM_COLOURS = {
  bedroom: {}, // plum velvet and oxblood over dark oak, brass
  boudoir: { [M.CLOTH]: [36, 96, 102], [M.BODY]: [24, 66, 74], [M.ACCENT]: [196, 64, 92], [M.FRAME]: [214, 166, 80] }, // teal and rose, warm brass
  parlour: { [M.CLOTH]: [40, 104, 70], [M.ACCENT]: [178, 120, 48], [M.BODY]: [26, 70, 48] }, // emerald and old gold
  study: { [M.CLOTH]: [40, 56, 104], [M.ACCENT]: [170, 110, 46] }, // navy and ochre
  workshop: { [M.CLOTH]: [74, 92, 64], [M.ACCENT]: [184, 74, 44] }, // oily green and rust
  studio: { [M.CLOTH]: [52, 30, 80], [M.ACCENT]: [226, 60, 140] }, // midnight purple and neon pink
  kitchen: { [M.CLOTH]: [110, 138, 104], [M.ACCENT]: [196, 104, 60] }, // sage and copper
  solarium: { [M.CLOTH]: [224, 206, 150], [M.ACCENT]: [226, 120, 120], [M.WOOD]: [176, 132, 86] }, // cream and sunny rose, pale wood
  drawingRoom: { [M.CLOTH]: [34, 98, 62], [M.ACCENT]: [150, 30, 44] }, // baize green and crimson
  bestiary: { [M.CLOTH]: [70, 84, 56], [M.ACCENT]: [120, 40, 40], [M.BODY3]: [40, 50, 40] }, // moss and dried blood
  crowsNest: { [M.CLOTH]: [40, 74, 110], [M.ACCENT]: [200, 84, 56] }, // sea blue and a buoy's red
  atrium: { [M.CLOTH]: [92, 62, 40], [M.ACCENT]: [186, 60, 52] }, // bark and a wax seal's red
  ...SHEETED_COLOURS, // the two locked bedrooms: dull dust sheets (art/sheeted.js)
};
/** A piece's own colours over its room's (the biome board's frames). */
/** (the biome frames dimmed, so the board's bright ones don't bloom over the parts hung in them) */
const FRAME_DIM = .6;
// (the letters' paper slightly off-white; the whole desk dimmed, PIECE_DIM)
const PIECE_COLOURS = { invitations: { [M.BELLY]: [228, 222, 208], [M.IRIS]: [110, 162, 218], [M.ACCENT]: [238, 44, 70] }, pegboard: Object.fromEntries(BIOME_MATS.map((mm, i) => [mm, hexRgb(BIOMES[i]).map(v => Math.round(v * FRAME_DIM))])) };
/** Pieces mostly flat to the light, their colours times this (as render/houseDecor.ts RUG_DIM a rug's): the invitations desk, its top
 *  and its letters lying face up, lit to a glare that bloomed at the house's camera (2026-10-26). */
const PIECE_DIM = { invitations: .62 };
export function furnitureColours(st = {}, room = "bedroom", id = "") {
  const c = { ...BASE, ...(ROOM_COLOURS[room] ?? {}), ...(PIECE_COLOURS[id] ?? {}) }, k = PIECE_DIM[id];
  return k ? Object.fromEntries(Object.entries(c).map(([m, rgb]) => [m, rgb.map(v => Math.round(v * k))])) : c;
}

/** A piece, drawn: its sprite (cropped), where its footprint's middle on the floor lands (`origin`, pixels from its top-left) and its
 *  lights in pixels ({ x, y, z, R, rgb, power }, as art/lighting.js shade takes them). foot: { w, d, h } in metres as house.json gives
 *  it (twice the real piece's, SIZE), w along the wall it backs on (its front along d); yaw: which way it faces; ppm: art pixels a
 *  metre (the house's: 1 / the view's metres an art pixel); pitch: the view's; state: one of its FURNITURE_STATES; curve: the radius (m,
 *  house.json's) of the round wall it backs on, its back that far from the room's middle (0: straight), for the pieces in BEND. */
/** @param {string} id @param {{ w: number, d: number, h: number }} foot @param {object} [st] @param {{ ppm?: number, pitch?: number, yaw?: number, state?: string, curve?: number }} [o] */
export function furnitureSprite(id, foot, st = {}, { ppm = 32 / 3, pitch = .6, yaw = Math.PI / 4, state = undefined, curve = 0 } = {}) {
  const build = PIECES[id];
  if (!build || id === "door") throw new Error(`no furniture "${id}"`);
  const m = new Model({ blend: .025 });
  const k = sizeOf(id);
  build(m, { W: foot.w / k, D: foot.d / k, H: foot.h / k }, state ?? FURNITURE_STATES[id]?.[0]);
  if (curve > 0 && BEND.has(id)) bendModel(m, curve / k, foot.d / k);
  return modelSprite(m, { ppm, pitch, yaw, size: k });
}

/** A model of the house's (metres of the real piece) drawn at the house's pixel, SIZE times over, turned by yaw: its sprite, cropped,
 *  where its middle on the floor lands (`origin`), its lights and its marks in pixels (furnitureSprite's; art/houseDecor.js's too). */
export function modelSprite(m, { ppm = 32 / 3, pitch = .6, yaw = 0, size = SIZE } = {}) {
  m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); // (a common ground line)
  const { sp, project } = render(m, { scale: ppm * size, yaw, pitch, lineGap: .1 });
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const W = x1 - x0 + 1, Hh = y1 - y0 + 1, crop = new Sprite(W, Hh);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (mm) crop.put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  const [ox, oy] = project([0, 0, 0]);
  const lights = (m.lights ?? []).map(L => { const [lx, ly] = project(L.c); return { x: +(lx - x0).toFixed(1), y: +(ly - y0).toFixed(1), z: 8 * size, R: L.R * size, rgb: L.rgb, power: L.power }; });
  // (its marks: named points of it in pixels, for the view: the mic's spot lamp, where the music builder's cone of light hangs from)
  const marks = Object.fromEntries(Object.entries(m.marks ?? {}).map(([k, c]) => { const [mx, my] = project(c); return [k, { x: +(mx - x0).toFixed(1), y: +(my - y0).toFixed(1) }]; }));
  return { sp: crop, origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, lights, marks };
}

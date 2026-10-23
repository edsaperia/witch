// The treehouse's furniture (Ed, 2026-10-23: real art for the house's objects, config/house.json, in place of the plain boxes
// render/houseRooms.ts drew). Ed's style: "a charming mismatched combination ... cozy cottage vibes sprouting leaves, occasional
// gothic pieces, and random modern clutter"; a palette per room; rich detail; its lights "a mix of magic, candles, gas lamps, modern
// lamps, fairy lights, neon lamps". Each piece is a 3D model (model3d.js) built to its object's footprint (w, d, h in metres, as
// house.json gives them), never to where it stands, so the house's plan can move it (Golf's layout): drawn by id, at the house's
// own art pixel and isometric view.
//   - Model space: metres; x along the wall it backs on (-W/2 to W/2), z out from that wall into the room (its back at -D/2, its
//     front at D/2), y up from the floor. Seen at yaw 45° its front faces down-left on the screen: a piece backing on the plan's x1
//     wall; one backing on its z0 wall is the same drawing mirrored (render/houseRooms.ts).
//   - Its lights (`m.lights`, model points with a colour, reach and power) come back as pixels, for the lighting pass.
// The mock (Ed's picks, 2026-10-23): the bed a gothic canopy bed (dark carved posts, velvet curtains half drawn, a moth-eaten canopy,
// a hoodie and a phone on its charger left on it); the wardrobe an open clothes rail (cloaks and party clothes over shoe boxes, a
// string of lights along it); the dressing table a bulb-lit vanity (a stage mirror ringed by bulbs, make-up, potions, a glitter pot);
// the crystal ball on a clawed brass stand on a draped round table, tarot cards fanned beside it.
import { M, Sprite, hsv2rgb, hash2 } from "./core.js";
import { Model, render } from "./model3d.js";

const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];
const rotY = (v, a) => [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
/** A light at model point c: its colour, its reach in pixels and its power (art/lighting.js shade's). */
const light = (m, c, rgb, R, power) => { (m.lights ??= []).push({ c, rgb, R, power }); };
/** A glowing bulb, flame or bead (drawn unlit), its light with it. */
const bulb = (m, c, r, mat, g, lit) => { m.ell(c, [r, r, r], mat, { group: g, extra: true }); if (lit) light(m, c, ...lit); };
const WARM = [255, 190, 110], FAIRY = [255, 120, 210], MAGICL = [170, 120, 255];

// ---------- the pieces ----------
// Each builds model m from its footprint (W along the wall, D out from it, H its height) and returns nothing; k a seed.
const PIECES = {
  // A gothic canopy bed: four dark carved posts with spires, a carved headboard with a pointed arch, velvet curtains drawn back to the
  // head posts, a moth-eaten canopy over it; ivy up a foot post with leaves breaking out at the top; a hoodie flung on the duvet, a
  // phone on the pillow glowing, its charger's lead trailing to the floor.
  bed(m, { W, D, H }) {
    const x0 = -W / 2 + .07, x1 = W / 2 - .07, zb = -D / 2 + .07, zf = D / 2 - .07, top = 2.25, mat = H * .78, base = .26;
    // the frame: a deep rail round it, the mattress and the duvet over its foot two thirds
    m.box([0, base, 0], [W / 2 - .1, .11, D / 2 - .1], M.BARKD, { round: .02, group: 1, paint: p => (Math.abs(p[1] - base) < .02 ? M.WOOD : undefined) });
    m.box([0, mat - .08, -.05], [W / 2 - .16, .1, D / 2 - .18], M.BELLY, { round: .06, group: 2 });
    m.box([0, mat + .02, .25], [W / 2 - .12, .07, D / 2 - .45], M.CLOTH, { round: .07, group: 3, paint: p => (Math.sin(p[0] * 9 + p[2] * 3) > .82 ? M.BODY3 : Math.abs(p[2] - (-D / 2 + .7)) < .06 ? M.BELLY : undefined) });
    // the duvet's fold hanging over the foot
    m.box([0, mat - .12, zf - .02], [W / 2 - .12, .2, .05], M.CLOTH, { round: .04, group: 3 });
    // pillows, plump, against the headboard
    for (const s of [-1, 1]) m.ell([s * W * .22, mat + .1, zb + .28], [W * .2, .1, .16], M.BELLY, { group: 4 + (s > 0) });
    // the headboard: a carved panel with a pointed arch rising over it and a quatrefoil cut in it
    m.box([0, .95, zb], [W / 2 - .06, .55, .045], M.BARKD, { group: 6, paint: p => (Math.abs(p[0]) < W / 2 - .2 && Math.abs(p[1] - .95) < .4 && ((p[0] * 14 + p[1] * 4) % 1 + 1) % 1 < .18 ? M.HAIR : undefined) });
    for (let i = -3; i <= 3; i++) { const t = i / 3, hgt = 1.55 + .35 * (1 - Math.abs(t)) ** 1.6; m.seg([t * (W / 2 - .12), 1.4, zb], [t * (W / 2 - .2), hgt, zb], .05, .035, M.BARKD, { group: 6 }); }
    m.ell([0, 1.95, zb], [.08, .1, .05], M.BARKD, { group: 6 });
    m.ell([0, 1.15, zb + .05], [.12, .12, .02], M.MAGIC, { group: 7 }); // a little rose window, glowing faintly
    light(m, [0, 1.15, zb + .12], MAGICL, 10, .2);
    // the footboard, low and carved
    m.box([0, .52, zf], [W / 2 - .06, .2, .04], M.BARKD, { group: 8, paint: p => (Math.abs(p[0] % .3) < .03 ? M.HAIR : undefined) });
    // four posts, turned, with knobs and spires
    const posts = [[x0, zb], [x1, zb], [x0, zf], [x1, zf]];
    posts.forEach(([x, z], i) => {
      m.seg([x, 0, z], [x, top, z], .06, .045, M.BARKD, { group: 10 + i });
      for (const y of [.3, .75, 1.4]) m.ell([x, y, z], [.085, .06, .085], M.BARKD, { group: 10 + i });
      m.seg([x, top, z], [x, top + .28, z], .05, .005, M.BARKD, { group: 10 + i });
    });
    // the canopy's rails and its cloth, holed by moths, its edge scalloped
    for (const z of [zb, zf]) m.box([0, top - .02, z], [W / 2 - .07, .035, .035], M.BARKD, { group: 14 });
    for (const x of [x0, x1]) m.box([x, top - .02, 0], [.035, .035, D / 2 - .07], M.BARKD, { group: 14 });
    // (the cloth over the head half only, so the bed shows from above; the foot half bare rails, the cloth's torn edge ragged)
    m.flat([0, top + .04, -D / 4 + .02], X, Z, W / 2 - .06, D / 4, (s, t) => (hash2(Math.floor((s + 1) * 9), Math.floor((t + 1) * 6), 41) > .82 || t > .7 + .3 * Math.sin(s * 11) ? undefined : M.ACCENT), { group: 15, bend: .1 });
    for (const z of [zb, zf]) m.flat([0, top - .1, z + (z < 0 ? -.01 : .01)], X, [0, -1, 0], W / 2 - .06, .1, (s, t) => (t > .3 && (Math.abs(((s + 1) * 6) % 1 - .5) > .35) ? undefined : M.ACCENT), { group: 15, bend: .1 });
    for (const x of [x0, x1]) m.flat([x, top - .1, 0], Z, [0, -1, 0], D / 2 - .06, .1, (s, t) => (t > .3 && (Math.abs(((s + 1) * 7) % 1 - .5) > .35) ? undefined : M.ACCENT), { group: 15, bend: .1 });
    // the velvet curtains, drawn back and tied at the head posts, falling in folds; the near one half drawn along the foot
    for (const x of [x0, x1]) {
      const s = Math.sign(x);
      m.flat([x + s * .02, top * .55, zb + .32], Z, Y, .26, top * .45, (u, v) => (Math.abs(u) > 1 - (1 - v) * .55 + (v > .1 ? 0 : 0) ? undefined : Math.sin(u * 14 + v) > .5 ? M.BODY : M.ACCENT), { group: 16 + (s > 0), bend: .5 });
      m.ell([x + s * .03, top * .5, zb + .15], [.05, .04, .1], M.FLOWER, { group: 18 }); // its gold tie-back
    }
    m.flat([x0 + .02, top * .55, zf - .25], Z, Y, .24, top * .45, (u, v) => (Math.abs(u) > 1 - (1 - v) * .4 ? undefined : Math.sin(u * 13) > .45 ? M.BODY : M.ACCENT), { group: 19, bend: .6 });
    // ivy up the near foot post, leaves breaking out where it tops the canopy
    for (let i = 0; i < 9; i++) { const y = .2 + i * .24, a = i * 1.9; m.ell([x0 + Math.cos(a) * .09, y, zf + Math.sin(a) * .09], [.07, .045, .07], i % 3 ? M.LEAF : M.LEAF2, { group: 20, dir: [Math.cos(a), .4, Math.sin(a)] }); }
    for (let i = 0; i < 7; i++) { const a = i * .9; m.ell([x0 + Math.cos(a) * .2, top + .08 + (i % 2) * .05, zf + Math.sin(a) * .2 - .05], [.11, .05, .08], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: 21, dir: [Math.cos(a), .2, Math.sin(a)] }); }
    // her hoodie, flung on the duvet, its hood and a sleeve hanging off
    m.ell([W * .15, mat + .16, .15], [.32, .1, .26], M.JACKET, { group: 22, rough: .015 });
    m.ell([W * .15 + .22, mat + .2, .32], [.13, .09, .12], M.JACKET, { group: 22 });
    m.seg([W * .15 - .2, mat + .14, .3], [x0 + .04, mat - .1, .5], .07, .06, M.JACKET, { group: 22 });
    m.flat([W * .15, mat + .265, .15], X, Z, .12, .09, () => M.TOP, { group: 23 }); // its print
    // her phone on the pillow, its screen lit, and its charger's lead looping off the side to the floor
    m.box([-W * .22, mat + .21, zb + .32], [.07, .012, .12], M.SHADES, { group: 24, dir: rotY(X, .3) });
    m.flat([-W * .22, mat + .225, zb + .32], rotY(X, .3), rotY(Z, .3), .055, .1, () => M.GLINT, { group: 25, bend: 0 });
    light(m, [-W * .22, mat + .3, zb + .32], [150, 214, 255], 12, .35);
    m.chain([[-W * .22, mat + .2, zb + .45, .012], [x0 + .05, mat + .1, zb + .55, .012], [x0 - .08, .3, zb + .5, .012], [x0 - .12, .02, zb + .2, .012]], M.SOLE, { group: 26 });
  },

  // An open clothes rail: two uprights and a rail, her cloaks and party clothes on hangers (a long cloak, a sequinned dress, a short
  // cape, a shirt, a puffer, a party top), shoe boxes stacked under them, a string of fairy lights wound along the rail, a vine
  // sprouting off one end; a party hat perched on top.
  wardrobe(m, { W, D, H }) {
    const rail = H * .86, xa = -W / 2 + .06, xb = W / 2 - .06;
    for (const x of [xa, xb]) {
      m.seg([x, .06, 0], [x, rail + .04, 0], .03, .03, M.FRAME, { group: 1 });
      m.seg([x, .04, -D / 2 + .05], [x, .04, D / 2 - .05], .035, .035, M.FRAME, { group: 1 }); // its foot
      for (const z of [-D / 2 + .05, D / 2 - .05]) m.ell([x, .04, z], [.05, .04, .05], M.SHADES, { group: 1 }); // castors
      m.ell([x, rail + .07, 0], [.05, .05, .05], M.FLOWER, { group: 1 }); // brass knobs
    }
    m.seg([xa, rail, 0], [xb, rail, 0], .025, .025, M.FRAME, { group: 1 });
    // the clothes: each on its hanger, from one end to the other
    const clothes = [[M.HAT, .82, .2, "cloak"], [M.POM, .62, .17, "dress"], [M.BODY, .38, .2, "cape"], [M.TOP, .5, .16, "shirt"], [M.IRIS, .48, .22, "puffer"], [M.HAT2, .9, .2, "cloak"], [M.PHONES, .42, .17, "dress"]];
    const n = clothes.length, span = W - .3;
    clothes.forEach(([mat, len, half, kind], i) => {
      const x = -span / 2 + (i + .5) * span / n + (hash2(i, 3, 7) - .5) * .05, y = rail - .06;
      m.seg([x, rail + .02, 0], [x, y, 0], .008, .008, M.FRAME, { group: 2 }); // the hook
      m.seg([x - half * .8, y - .03, 0], [x + half * .8, y - .03, 0], .012, .012, M.WOOD, { group: 2 }); // the hanger
      const g = 30 + i, mid = y - len / 2 - .03;
      if (kind === "cloak") { m.box([x, mid, 0], [half * .9, len / 2, .05], mat, { round: .04, group: g, paint: p => (Math.sin(p[0] * 40) > .7 ? M.HAT2 : undefined) }); m.ell([x, y - .05, .04], [.08, .05, .07], mat, { group: g }); }
      else if (kind === "dress") m.seg([x, y - .04, 0], [x, y - len, 0], half * .55, half * 1.1, mat, { group: g, paint: p => (hash2(Math.round(p[0] * 60), Math.round(p[1] * 60), i) > .8 ? M.BELLY : undefined) }); // sequins catching the light
      else if (kind === "puffer") for (let j = 0; j < 4; j++) m.ell([x, y - .07 - j * len / 4, 0], [half, len / 9, .09], mat, { group: g });
      else m.box([x, mid, 0], [half, len / 2, .045], mat, { round: .03, group: g, paint: kind === "shirt" ? p => (Math.abs(p[0] - x) < .015 ? M.BELLY : undefined) : undefined });
    });
    // shoe boxes, stacked, their lids a different colour, one open with a trainer in it
    const boxes = [[-W * .32, 0, M.ACCENT, M.BELLY], [-W * .32, 1, M.HAT1, M.HAT2], [-W * .04, 0, M.BODY2, M.SHADES], [W * .25, 0, M.CLOTH, M.BELLY], [W * .25, 1, M.POM, M.TOP], [W * .25, 2, M.SHADES, M.ACCENT]];
    boxes.forEach(([x, row, body, lid], i) => {
      const y = .1 + row * .17, jx = (hash2(i, 1, 9) - .5) * .06;
      m.box([x + jx, y, 0], [.2, .075, .13], body, { round: .01, group: 50 + i });
      if (i !== 2) m.box([x + jx, y + .085, 0], [.21, .02, .14], lid, { round: .01, group: 50 + i });
    });
    m.ell([-W * .04 - .05, .22, .02], [.12, .05, .06], M.SHOES, { group: 60, dir: [1, .1, 0] }); // the trainer
    m.ell([-W * .04 - .1, .19, .02], [.1, .02, .06], M.SOLE, { group: 60 });
    // fairy lights wound along the rail, sagging between the pins
    for (let i = 0; i <= 18; i++) { const t = i / 18, x = xa + (xb - xa) * t, sag = .06 * Math.sin(t * Math.PI * 4) ** 2; bulb(m, [x, rail - .02 - sag, .05], .025, i % 2 ? M.COLLAR : M.WOKEN, 70, i % 6 === 3 ? [i % 2 ? FAIRY : WARM, 18, .5] : null); }
    // a vine sprouting from the far upright, leaves along it, and a party hat on the near knob
    for (let i = 0; i < 7; i++) { const a = i * 1.7; m.ell([xb + Math.cos(a) * .07 + (i > 4 ? -.1 * (i - 4) : 0), rail * (.45 + i * .085), Math.sin(a) * .07], [.08, .045, .07], [M.LEAF, M.LEAF2, M.LEAF3][i % 3], { group: 80, dir: [Math.cos(a), .5, Math.sin(a)] }); }
    m.seg([xa, rail + .1, 0], [xa + .02, rail + .4, 0], .11, .01, M.HAT1, { group: 81, paint: p => (Math.floor(p[1] * 18) % 2 ? M.HAT2 : undefined) });
    m.ell([xa + .02, rail + .42, 0], [.04, .04, .04], M.POM, { group: 81 });
  },

  // A bulb-lit vanity: a little table with drawers and curved legs, a tall mirror over it ringed by round bulbs, make-up and potions
  // crowding its top (a glitter pot, lipstick, a powder compact, a glowing potion or two), a trailing plant in a pot, a scarf over
  // the mirror's corner.
  dressingTable(m, { W, D, H }) {
    const top = .76, t = .035, zf = D / 2;
    m.box([0, top, 0], [W / 2, t, D / 2], M.WOOD, { round: .015, group: 1 });
    m.box([0, top - .12, .02], [W / 2 - .04, .09, D / 2 - .05], M.WOOD, { group: 2, paint: p => (Math.abs(p[0]) < .015 || Math.abs(Math.abs(p[0]) - W / 4) < .012 ? M.BARKD : undefined) });
    for (const x of [-W / 4, W / 4]) m.ell([x, top - .12, zf - .02], [.025, .025, .02], M.FLOWER, { group: 3 }); // drawer knobs
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) m.chain([[x * (W / 2 - .06), top - .2, z * (D / 2 - .06), .03], [x * (W / 2 - .03), .35, z * (D / 2 - .04), .022], [x * (W / 2 - .07), .02, z * (D / 2 - .07), .025]], M.WOOD, { group: 4 });
    // the mirror: a tall frame on the table's back, its glass, its bulbs all round
    const mx = W * .4, my0 = top + .05, my1 = H, mz = -D / 2 + .06, mc = (my0 + my1) / 2, mh = (my1 - my0) / 2;
    m.box([0, mc, mz], [mx, mh, .035], M.BARKD, { round: .02, group: 5 });
    m.flat([0, mc + .02, mz + .06], X, Y, mx - .1, mh - .1, (s, tt) => (s + tt * .6 > .55 && s + tt * .6 < .75 ? M.BELLY : M.WEB), { group: 6, bend: 0 });
    const ring = [];
    for (let i = 0; i < 5; i++) ring.push([-mx + .04 + i * (2 * mx - .08) / 4, my1 - .03]);
    for (let i = 1; i < 5; i++) for (const s of [-1, 1]) ring.push([s * (mx - .04), my1 - .03 - i * (2 * mh - .1) / 5]);
    ring.forEach(([x, y], i) => bulb(m, [x, y, mz + .06], .04, M.WOKEN, 7, i % 4 === 0 ? [WARM, 16, .22] : null));
    // its scarf, slung over the top corner
    m.chain([[mx - .05, my1 + .02, mz + .05, .04], [mx + .06, my1 - .2, mz + .07, .035], [mx + .08, my1 - .55, mz + .06, .03]], M.PHONES, { group: 8 });
    // on the table: potions (one glowing), the glitter pot, lipsticks, a compact, a brush jar, a little trailing plant
    const sit = top + t;
    m.seg([-W * .36, sit, .02], [-W * .36, sit + .2, .02], .055, .04, M.CRYSTAL, { group: 10 }); m.seg([-W * .36, sit + .2, .02], [-W * .36, sit + .26, .02], .015, .015, M.CRYSTAL, { group: 10 });
    m.ell([-W * .36, sit + .08, .02], [.045, .06, .045], M.MAGIC, { group: 11, extra: true }); light(m, [-W * .36, sit + .12, .1], MAGICL, 16, .5);
    m.ell([-W * .36, sit + .28, .02], [.022, .02, .022], M.WOOD, { group: 10 });
    m.ell([-W * .25, sit + .07, .1], [.05, .07, .05], M.CRYSTAL, { group: 12 }); m.ell([-W * .25, sit + .05, .1], [.035, .04, .035], M.MAGIC2, { group: 13, extra: true });
    m.seg([W * .08, sit, .08], [W * .08, sit + .07, .08], .06, .06, M.CRYSTAL, { group: 14 }); // the glitter pot, its glitter
    m.ell([W * .08, sit + .06, .08], [.05, .02, .05], M.POM, { group: 15, paint: p => (hash2(Math.round(p[0] * 90), Math.round(p[2] * 90), 3) > .6 ? M.FLOWER : undefined) });
    for (let i = 0; i < 3; i++) m.seg([W * .2 + i * .05, sit, .12], [W * .2 + i * .05, sit + .09 + i * .02, .12], .014, .012, i === 1 ? M.FRAME : M.ACCENT, { group: 16 + i });
    m.ell([-W * .08, sit + .015, .15], [.07, .015, .06], M.FLOWER, { group: 19 });
    m.seg([W * .36, sit, -.05], [W * .36, sit + .1, -.05], .05, .055, M.BODY2, { group: 20 }); // a pot, a plant trailing over the edge
    for (let i = 0; i < 8; i++) { const a = i * 1.3, r = i < 4 ? .07 : .12; m.ell([W * .36 + Math.cos(a) * r + (i > 5 ? .06 : 0), sit + .14 - (i > 5 ? (i - 4) * .1 : 0), -.05 + Math.sin(a) * r * .8 + (i > 5 ? .12 : 0)], [.06, .03, .05], [M.LEAF, M.LEAF2][i % 2], { group: 21, dir: [Math.cos(a), .3, Math.sin(a)] }); }
  },

  // The crystal ball: a round table draped in a fringed cloth to the floor, a brass stand of three claws holding the ball, which
  // glows, mist curling in it; tarot cards fanned beside it, a candle on a saucer, a little crystal.
  crystalBall(m, { W, D, H }) {
    const R = Math.min(W, D) / 2 - .02, top = .72, ball = Math.min(.24, R * .6);
    m.ell([0, top, 0], [R, .03, R], M.CLOTH, { group: 1 });
    // (the drape: a bell of stacked rings melted into one, flaring to the floor, folds round it and a gold hem)
    const drape = p => { const a = Math.atan2(p[2], p[0]); return p[1] < .07 ? M.FLOWER : Math.sin(a * 9) > .55 ? M.BODY : undefined; };
    for (let i = 0; i < 9; i++) { const t = i / 8, y = top - .04 - t * (top - .1), r = R * (1 + .13 * t * t); m.ell([0, y, 0], [r, .07, r], M.CLOTH, { group: 1, paint: drape }); }
    for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; m.ell([Math.cos(a) * R * 1.13, .03, Math.sin(a) * R * 1.13], [.02, .035, .02], M.FLOWER, { group: 2 }); } // its tassels
    // the stand: a brass foot, three claws curling up round the ball
    const by = top + .03 + ball * .9;
    m.ell([0, top + .05, 0], [ball * .7, .035, ball * .7], M.FRAME, { group: 3 });
    for (let i = 0; i < 3; i++) {
      const a = i * Math.PI * 2 / 3 + .3, c = Math.cos(a), s = Math.sin(a);
      m.chain([[c * ball * .45, top + .06, s * ball * .45, .022], [c * ball * .9, by - ball * .35, s * ball * .9, .02], [c * ball * .95, by + ball * .2, s * ball * .95, .015], [c * ball * .6, by + ball * .55, s * ball * .6, .008]], M.FRAME, { group: 3 });
    }
    m.ell([0, by, 0], [ball, ball, ball], M.MAGIC, { group: 4, paint: p => (Math.sin((p[0] + p[1] * 1.6) * 30 + p[2] * 20) > .55 ? M.MAGIC2 : undefined) });
    light(m, [0, by, 0], MAGICL, 34, 1.1);
    // tarot cards fanned on the cloth, a card turned over
    for (let i = 0; i < 5; i++) { const a = -.6 + i * .3, u = rotY(X, a), v = rotY(Z, a); m.flat([R * .45 + Math.sin(a) * .06, top + .035 + i * .002, R * .25 + Math.cos(a) * .02], u, v, .045, .075, (s, t) => (i === 4 ? (Math.abs(s) < .6 && Math.abs(t) < .7 ? (Math.abs(t) < .25 ? M.FLOWER : M.BELLY) : M.BODY2) : Math.abs(s) > .7 || Math.abs(t) > .8 ? M.FLOWER : M.ACCENT), { group: 5 + i, bend: 0 }); }
    // a candle on a saucer
    m.ell([-R * .5, top + .04, R * .2], [.06, .012, .06], M.FRAME, { group: 12 });
    m.seg([-R * .5, top + .04, R * .2], [-R * .5, top + .14, R * .2], .022, .02, M.BELLY, { group: 13 });
    bulb(m, [-R * .5, top + .17, R * .2], .018, M.WOKEN, 14, [WARM, 18, .6]);
    // a little crystal cluster
    for (let i = 0; i < 3; i++) m.seg([-R * .3, top + .03, -R * .45], [-R * .3 + (i - 1) * .03, top + .1 + i * .02, -R * .45 + (i - 1) * .01], .025, .004, M.CRYSTAL, { group: 15 });
  },
};

/** The ids drawn so far (the rest are still boxes). */
export const FURNITURE_IDS = Object.keys(PIECES);

// ---------- colours, a palette a room ----------
// Each room its own (Ed: "per room"); materials: BARKD dark carved wood, WOOD warm wood, HAIR its carving's light, CLOTH the main cloth
// (the duvet, the table's drape), ACCENT velvet, BODY its folds' shade, BELLY linen and paper, FLOWER brass and gold, FRAME metal
// (chrome on the rail, brass on the stand), CRYSTAL glass, WEB the mirror; her things: JACKET the hoodie, TOP its print, HAT and HAT2 a
// cloak and its trim, POM pink, IRIS blue, PHONES a hot pink, SHOES and SOLE a trainer, SHADES black, HAT1 a party hat's stripe, BODY2
// card and terracotta, BODY3 the duvet's pattern. Glowing: WOKEN bulbs and flames, COLLAR fairy lights, MAGIC and MAGIC2 magic, GLINT a
// screen.
const BASE = {
  [M.BARKD]: [52, 32, 38], [M.WOOD]: [150, 100, 62], [M.HAIR]: [92, 62, 66], [M.CLOTH]: [92, 40, 96], [M.ACCENT]: [146, 30, 58], [M.BODY]: [98, 18, 42],
  [M.BELLY]: [232, 222, 202], [M.FLOWER]: [214, 168, 72], [M.FRAME]: [190, 196, 208], [M.CRYSTAL]: [168, 214, 236], [M.WEB]: [150, 172, 204],
  [M.JACKET]: [226, 176, 58], [M.TOP]: [60, 46, 70], [M.HAT]: [48, 30, 72], [M.HAT2]: [86, 58, 118], [M.POM]: [246, 120, 196], [M.IRIS]: [70, 120, 210],
  [M.PHONES]: [255, 84, 170], [M.SHOES]: [236, 236, 244], [M.SOLE]: [244, 244, 244], [M.SHADES]: [30, 28, 36], [M.HAT1]: [92, 210, 210], [M.BODY2]: [196, 120, 82],
  [M.BODY3]: [120, 60, 120], [M.LEAF]: hsv2rgb(.3, .6, .5), [M.LEAF2]: hsv2rgb(.26, .55, .66), [M.LEAF3]: hsv2rgb(.36, .65, .32),
  [M.WOKEN]: [255, 214, 140], [M.COLLAR]: [255, 110, 214], [M.MAGIC]: [178, 120, 255], [M.MAGIC2]: [236, 220, 255], [M.GLINT]: [160, 226, 255], [M.LINE]: [24, 20, 30], [M.NOSE]: [14, 12, 18],
};
const ROOM_COLOURS = {
  // the bedroom: plum velvet and oxblood over near-black oak, brass
  bedroom: {},
  // the hub (a boudoir by Golf's layout): teal and rose, the stand's brass warmer
  hub: { [M.CLOTH]: [36, 92, 98], [M.BODY]: [24, 64, 72], [M.ACCENT]: [176, 70, 104], [M.FRAME]: [206, 160, 74] },
};
export function furnitureColours(st = {}, room = "bedroom") { return { ...BASE, ...(ROOM_COLOURS[room] ?? {}) }; }

/** A piece, drawn: its sprite (cropped), where its footprint's middle on the floor lands (`origin`, pixels from its top-left) and its
 *  lights in pixels ({ x, y, z, R, rgb, power }, as art/lighting.js shade takes them). foot: { w, d, h } in metres as house.json gives
 *  it, w along the wall it backs on; ppm: art pixels a metre (the house's: 1 / the view's metres an art pixel); pitch: the view's. */
export function furnitureSprite(id, foot, st = {}, { ppm = 32 / 3, pitch = .6 } = {}) {
  const build = PIECES[id];
  if (!build) throw new Error(`no furniture "${id}"`);
  const m = new Model({ blend: .025 });
  build(m, { W: foot.w, D: foot.d, H: foot.h });
  m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); // (a common ground line)
  const { sp, project } = render(m, { scale: ppm, yaw: Math.PI / 4, pitch, lineGap: .1 });
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const W = x1 - x0 + 1, Hh = y1 - y0 + 1, crop = new Sprite(W, Hh);
  for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (mm) crop.put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  const [ox, oy] = project([0, 0, 0]);
  const lights = (m.lights ?? []).map(L => { const [lx, ly] = project(L.c); return { x: +(lx - x0).toFixed(1), y: +(ly - y0).toFixed(1), z: 8, R: L.R, rgb: L.rgb, power: L.power }; });
  return { sp: crop, origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, lights };
}

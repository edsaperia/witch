// The treehouse's rooms dressed (Ed, 2026-10-23: the second pass after the furniture, art/furniture.js): what isn't used, only looked
// at, in Ed's mismatched style (cottage with leaves sprouting, the odd gothic piece, modern clutter) and his picks: a middle density (a
// rug and four to six pieces a room, grouped by the walls), and lights of every kind he chose (candles and lanterns, fairy lights,
// small neon signs with no words, glowing mushrooms and magic). Each piece a small 3D model in the furniture's metres (a real piece's,
// drawn SIZE times over), built from a seed so no two alike; render/houseDecor.ts places them by the walls, clear of the doorways, the
// stations and the way in, and draws a room's together as one picture.
//   - Model space as the furniture's: x across, z towards the room's middle (its front), y up; a piece's middle on the floor at 0.
import { M, hash2 } from "./core.js";
import { Model } from "./model3d.js";
import { PARTS, modelSprite } from "./furniture.js";

const { light, bulb, candle, sprig, can, disc, WARM, FAIRY, MAGICL, GREEN } = PARTS;
const X = [1, 0, 0], Z = [0, 0, 1];
/** A seeded random in [0, 1) for piece k's i-th choice. */
const rnd = (k, i) => hash2(k * 7919 + i, i * 31 + 3, 17);
const pick = (k, i, list) => list[Math.floor(rnd(k, i) * list.length) % list.length];

const PIECES = {
  // A rug: round or oval, rings or a check, the room's cloth and accent with a gold edge, a fringe at its ends; flat on the floor.
  rug(m, k, { r = 1.5 } = {}) {
    const oval = rnd(k, 1) > .5, rx = r, rz = oval ? r * .7 : r, check = rnd(k, 2) > .55;
    // (in the room's cloth and its shade, a darker border: no bright gold or accent, which a flat floor facing the light blooms into a glare)
    m.ell([0, .008, 0], [rx, .008, rz], M.CLOTH, { group: 1, paint: p => { const q = Math.hypot(p[0] / rx, p[2] / rz); if (q > .9) return M.HAIR; if (check) return (Math.floor(p[0] * 3) + Math.floor(p[2] * 3)) % 2 ? M.BODY : undefined; return Math.floor(q * 6) % 2 ? M.BODY : undefined; } });
    if (oval) for (const s of [-1, 1]) for (let i = 0; i < 7; i++) { const z = (i / 6 - .5) * rz; m.seg([s * rx * .99, .008, z], [s * (rx + .08), .008, z], .01, .01, M.BELLY, { group: 2 }); }
  },
  // A floor lamp: a gas lamp (an iron post, a glass lantern head burning warm) or a modern arc lamp (a chrome arc, a dome shade glowing).
  lamp(m, k) {
    if (rnd(k, 1) > .5) {
      disc(m, [0, .03, 0], .16, .03, M.SHADES, { group: 1 });
      m.seg([0, .03, 0], [0, 1.45, 0], .025, .02, M.SHADES, { group: 1, paint: p => (Math.abs(p[1] - .4) < .04 ? M.FLOWER : undefined) });
      m.box([0, 1.58, 0], [.09, .12, .09], M.SHADES, { round: .01, group: 2 });
      bulb(m, [0, 1.58, 0], .07, M.GLOW, 3, [WARM, 18, .45]);
      m.seg([0, 1.7, 0], [0, 1.78, 0], .05, .005, M.SHADES, { group: 2 });
    } else {
      disc(m, [-.25, .03, -.1], .14, .03, M.FRAME, { group: 1 });
      m.chain([[-.25, .03, -.1, .02], [-.2, 1.2, -.1, .018], [0, 1.65, 0, .016], [.3, 1.55, .1, .015]], M.FRAME, { group: 1 });
      m.ell([.32, 1.45, .12], [.16, .1, .16], M.ACCENT, { group: 2 });
      bulb(m, [.32, 1.37, .12], .05, M.WOKEN, 3, [WARM, 16, .4]);
    }
  },
  // A cluster of candles: three to five church candles of different heights on a little iron stand or a stack of old books, wax pooled.
  candles(m, k) {
    const books = rnd(k, 1) > .5, n = 3 + Math.floor(rnd(k, 2) * 3), top = books ? .3 : .45;
    if (books) for (let i = 0; i < 4; i++) m.box([(rnd(k, 10 + i) - .5) * .05, .04 + i * .075, 0], [.2 - i * .015, .035, .14], [M.ACCENT, M.CLOTH, M.BODY2, M.HAT][i], { round: .01, group: 1 + i, dir: [Math.cos(i * .3), 0, Math.sin(i * .3)] });
    else { m.seg([0, 0, 0], [0, top, 0], .03, .03, M.SHADES, { group: 1 }); disc(m, [0, top, 0], .18, .015, M.SHADES, { group: 1 }); for (const a of [0, 2.1, 4.2]) m.seg([0, .05, 0], [Math.cos(a) * .15, 0, Math.sin(a) * .15], .015, .012, M.SHADES, { group: 1 }); }
    for (let i = 0; i < n; i++) { const a = i * 2.4, r = i ? .09 : 0; m.seg([Math.cos(a) * r, top, Math.sin(a) * r], [Math.cos(a) * r, top + .1 + rnd(k, 20 + i) * .2, Math.sin(a) * r], .035, .033, M.BELLY, { group: 10 + i }); bulb(m, [Math.cos(a) * r, top + .14 + rnd(k, 20 + i) * .2, Math.sin(a) * r], .022, M.WOKEN, 30 + i, i === 0 ? [WARM, 14, .4] : null); }
    m.ell([0, top + .01, 0], [.14, .015, .12], M.BELLY, { group: 9 });
  },
  // A lantern on the floor: a pierced tin lantern or a glass storm lantern glowing, a sprig of ivy round its foot.
  lantern(m, k) {
    const tin = rnd(k, 1) > .5;
    m.box([0, .2, 0], [.11, .18, .11], tin ? M.FLOWER : M.SHADES, { round: .02, group: 1, paint: tin ? p => (hash2(Math.round(p[0] * 40) + Math.round(p[2] * 40), Math.round(p[1] * 40), 3) > .7 ? M.GLOW : undefined) : undefined });
    if (!tin) bulb(m, [0, .2, 0], .08, M.GLOW, 2);
    light(m, [0, .22, .1], WARM, 14, .4);
    m.seg([0, .38, 0], [0, .48, 0], .1, .01, tin ? M.FLOWER : M.SHADES, { group: 3 });
    m.chain([[-.07, .46, 0, .01], [0, .56, 0, .01], [.07, .46, 0, .01]], M.SHADES, { group: 3 });
    sprig(m, [.12, .04, .05], 4, .07, 4, .8);
  },
  // A big plant in a pot: a monstera's split leaves, a fern's fronds or a trailing pothos; the pot terracotta, glazed or a tin can.
  plant(m, k) {
    const kind = pick(k, 1, ["monstera", "fern", "trailing"]), pot = pick(k, 2, [M.BODY2, M.HAT1, M.FRAME]);
    can(m, 0, 0, 0, .32, .17, pot, { group: 1, paint: p => (p[1] > .28 ? M.BARKD : undefined) });
    if (kind === "monstera") for (let i = 0; i < 7; i++) { const a = i * .9, h = .55 + rnd(k, 10 + i) * .55; m.seg([0, .3, 0], [Math.cos(a) * .2, h, Math.sin(a) * .15], .012, .01, M.LEAF3, { group: 2 }); m.flat([Math.cos(a) * .28, h + .05, Math.sin(a) * .2], [Math.cos(a), .4, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], .2, .17, (s, t) => (Math.hypot(s, t) > 1 || (Math.abs(t) < .9 && Math.abs(((s * 2.5) % 1 + 1) % 1 - .5) < .1 && Math.abs(t) > .15) ? undefined : t > 0 ? M.LEAF2 : M.LEAF), { group: 3 + i, bend: .4 }); }
    else if (kind === "fern") for (let i = 0; i < 9; i++) { const a = i * .7; m.chain([[0, .3, 0, .03], [Math.cos(a) * .25, .65, Math.sin(a) * .2, .05], [Math.cos(a) * .5, .55, Math.sin(a) * .4, .03]], i % 2 ? M.LEAF : M.LEAF2, { group: 3 }); }
    else { sprig(m, [0, .4, 0], 6, .12, 3, .6); for (let i = 0; i < 4; i++) { const a = i * 1.6; m.chain([[Math.cos(a) * .15, .32, Math.sin(a) * .15, .035], [Math.cos(a) * .3, .15, Math.sin(a) * .3, .035], [Math.cos(a) * .35, .02, Math.sin(a) * .35, .03]], M.LEAF2, { group: 4 + i }); } }
  },
  // Glowing mushrooms: a mossy stump with a cluster of toadstools glowing in the magic's colours, motes over them.
  mushrooms(m, k) {
    m.seg([0, 0, 0], [0, .25, 0], .2, .18, M.BARKD, { group: 1, rough: .01, paint: p => (p[1] > .22 ? M.MOSS : undefined) });
    const n = 4 + Math.floor(rnd(k, 1) * 4), cols = [M.MAGIC, M.GLINT, M.COLLAR];
    for (let i = 0; i < n; i++) {
      const a = i * 2.3, r = .1 + rnd(k, 10 + i) * .2, h = .1 + rnd(k, 20 + i) * .2, onStump = i < 2, y0 = onStump ? .25 : 0, x = Math.cos(a) * (onStump ? .05 : r + .15), z = Math.sin(a) * (onStump ? .05 : r + .15);
      m.seg([x, y0, z], [x, y0 + h, z], .02, .018, M.BELLY, { group: 30 + i });
      m.ell([x, y0 + h + .02, z], [.06 + h * .2, .04, .06 + h * .2], cols[i % 3], { group: 40 + i, extra: true, paint: p => (hash2(Math.round(p[0] * 60), Math.round(p[2] * 60), i) > .8 ? M.MAGIC2 : undefined) });
    }
    light(m, [0, .35, .15], rnd(k, 3) > .5 ? MAGICL : GREEN, 16, .45);
  },
  // A stack of old books with a skull or a cat-shaped bookend on top and a candle; a few lying open.
  books(m, k) {
    const cols = [M.ACCENT, M.CLOTH, M.BODY2, M.HAT, M.IRIS, M.FLOWER];
    for (let i = 0; i < 6; i++) m.box([(rnd(k, i) - .5) * .06, .04 + i * .07, 0], [.18 - (i % 3) * .02, .033, .13], cols[(i + k) % cols.length], { round: .01, group: 1 + i, dir: [Math.cos((rnd(k, 10 + i) - .5) * .8), 0, Math.sin((rnd(k, 10 + i) - .5) * .8)], paint: p => (Math.abs(p[2]) > .11 ? M.BELLY : undefined) });
    if (rnd(k, 2) > .5) { m.ell([0, .52, 0], [.07, .065, .08], M.BELLY, { group: 10 }); for (const e of [-1, 1]) m.ell([e * .028, .53, .06], [.016, .016, .01], M.SHADES, { group: 11 }); }
    else candle(m, [0, .45, 0], 10, .1);
    m.flat([.32, .02, .12], X, Z, .14, .1, (s, t) => (Math.abs(s) < .04 ? M.BARKD : Math.abs(((t * 4) % 1 + 1) % 1 - .5) < .12 && Math.abs(s) > .2 && Math.abs(s) < .8 ? M.BARKD : M.BELLY), { group: 20, bend: .25 });
  },
  // A small neon sign with no words on a stand: a crescent moon, a heart or a star, in the party's neons.
  neon(m, k) {
    const shape = pick(k, 1, ["moon", "heart", "star"]), mat = pick(k, 2, [M.COLLAR, M.MAGIC, M.GLINT]), cy = .75, s = .22;
    m.box([0, .03, 0], [.18, .03, .1], M.SHADES, { round: .01, group: 1 });
    m.seg([0, .03, 0], [0, cy - s, 0], .015, .015, M.SHADES, { group: 1 });
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const t = (i / 24) * Math.PI * 2;
      if (shape === "heart") pts.push([16 * Math.sin(t) ** 3 / 17, (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17]);
      else if (shape === "star") { const r = i % 2 ? .45 : 1, a = (i / 24) * Math.PI * 2 * 5 / 2.5; pts.push([Math.sin(a) * r, Math.cos(a) * r]); }
      else { const a = .6 + (i / 24) * 4.9; pts.push(i <= 12 ? [Math.cos(a), Math.sin(a)] : [Math.cos(a) * .7 + .3, Math.sin(a) * .7]); }
    }
    for (let i = 0; i + 1 < pts.length; i++) m.seg([pts[i][0] * s, cy + pts[i][1] * s, 0], [pts[i + 1][0] * s, cy + pts[i + 1][1] * s, 0], .016, .016, mat, { group: 2, extra: true });
    light(m, [0, cy, .15], mat === M.COLLAR ? FAIRY : mat === M.MAGIC ? MAGICL : [150, 214, 255], 16, .45);
  },
  // A low shelf by the wall: two shelves of jars, pots and a plant, a string of fairy lights draped along its top.
  shelf(m, k) {
    const W = .9, H = .9, D = .3;
    for (const y of [.05, H * .5, H]) m.box([0, y, 0], [W / 2, .02, D / 2], M.WOOD, { round: .01, group: 1 });
    for (const x of [-W / 2 + .02, W / 2 - .02]) m.box([x, H / 2, 0], [.02, H / 2, D / 2], M.BARKD, { group: 2 });
    const jars = [M.CRYSTAL, M.BODY2, M.HAT1, M.CRYSTAL, M.POM];
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { if (rnd(k, r * 10 + i) < .25) continue; const x = -W / 2 + .12 + i * (W - .24) / 3, y0 = (r ? H * .5 : .05) + .02; can(m, x, 0, y0, y0 + .12 + rnd(k, 30 + i) * .1, .05, jars[(i + r + k) % jars.length], { group: 10 + r * 4 + i }); }
    sprig(m, [W * .3, H + .1, 0], 4, .08, 30, .7);
    for (let i = 0; i <= 10; i++) { const t = i / 10, x = -W / 2 + W * t, sag = .05 * Math.sin(t * Math.PI * 2) ** 2; bulb(m, [x, H + .02 - sag, D / 2 + .02], .02, i % 2 ? M.COLLAR : M.WOKEN, 40, i === 5 ? [FAIRY, 12, .3] : null); }
  },
  // Crates stacked: two or three wooden crates, one full of records, one with a lantern on it.
  crates(m, k) {
    const crate = (x, y, z, g) => m.box([x, y, z], [.22, .16, .2], M.WOOD, { group: g, paint: p => (Math.abs(((p[1] - y + .16) / .08) % 1 - .5) > .4 ? M.BARKD : undefined) });
    crate(0, .16, 0, 1); crate(.46, .16, .05, 2); if (rnd(k, 1) > .4) crate(.2, .48, 0, 3);
    for (let i = 0; i < 5; i++) m.box([.46 - .14 + i * .07, .34, .05], [.01, .14, .17], [M.ACCENT, M.FLOWER, M.HAT1, M.SHADES, M.POM][i], { group: 4 });
    m.box([0, .38, 0], [.06, .07, .06], M.SHADES, { round: .01, group: 5 }); bulb(m, [0, .38, 0], .045, M.GLOW, 6, [WARM, 12, .35]);
  },
};
export const DECOR_KINDS = Object.keys(PIECES);

/** A decor piece, drawn as the furniture is (art/furniture.js modelSprite): its sprite, origin, lights. k: its seed; o: its size where
 *  it has one (a rug's r, metres of the real piece); yaw: which way it faces (0 the camera). */
/** @param {string} kind @param {number} k @param {object} [st] @param {{ ppm?: number, pitch?: number, yaw?: number, r?: number }} [opts] */
export function decorSprite(kind, k, st = {}, { ppm = 32 / 3, pitch = .6, yaw = 0, ...o } = {}) {
  const build = PIECES[kind];
  if (!build) throw new Error(`no decor "${kind}"`);
  const m = new Model({ blend: .025 });
  build(m, k, o);
  return modelSprite(m, { ppm, pitch, yaw });
}

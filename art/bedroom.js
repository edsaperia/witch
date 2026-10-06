// The witch's bedroom (Ed, 2026-10-05: "The character picker should be set in an isometric drawing of a room in the
// treehouse; a large messy bedroom with clothes all over, musical instruments, "PARTY TONIGHT" banner, lots of books
// sitting open with glowing runes in them, some magical items, DJ decks, a laptop on the bed with a glowing screen,
// headphones"). The character creator's scene and the loading screen: one 3D model (model3d.js) seen isometrically
// (turned 45°, looked down on at about 35°), built to the witch's own size (a unit is about 1.9 m; she is about 1.3
// tall), so she stands in it at her own art pixel and the whole thing is drawn at one art pixel, baked like every
// sprite (so `?style=` and `?px=` apply).
//   - the room: a plank floor on a thick deck, its two far walls of boards (the near two cut away, a diorama), a
//     round window on the night with the moon and branches, the treehouse's own tree pushing a bough in through the
//     wall and a root up through the floor, fairy lights along the walls' tops, the banner's string with "PARTY" on
//     one wall and "TONIGHT" on the other (anchors `letters`: its pennants and their letters are drawn upright over
//     the room in BANNER_FONT, so they read at any art pixel);
//   - the heroes and the mess (the art director's review: "fewer, bigger, grouped", piles and clear floor between): the bed,
//     the biggest thing, the laptop open on it its screen the brightest glow, headphones by it; the DJ decks on their desk
//     under a shelf of potions, crystals and candles; the instruments in one corner (a guitar against the wall, a drum,
//     a synth on its stand) under a lantern; clothes and her other hats (a top hat, a cowboy hat, a party hat, a pointed
//     witch's hat) heaped at the bed's foot and over a chair; books stacked in the corner by the bed's head, one open
//     with glowing runes, and one more on the floor by them; the rug in the clear middle, where she stands.
// BEDROOM_PROPS are the pieces, each `(m, at, o)` adding its parts to a model at a point on the floor (x, z; y up),
// to reuse anywhere. bedroomModel builds the room; bedroomSprite renders it and returns its anchors in pixels: the
// spot where the witch stands and the glowing things (for the light and the animated glows). A mirror and a broom are
// among the pieces, not placed.
import { M, hsv2rgb, runeGlyph, hash2 } from "./core.js";
import { Model, render } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

// The room's size in model units: the floor S across each way, the walls H tall. (Ed, 2026-10-06: "twice as large, and you
// should be able to walk around in it": S 3 to 4.25, twice the floor; the first room's things keep their places in its far
// corner, and the new floor has more of her mess. DECISION FOR ED: twice the floor, not twice each way; `?room=6` tries that.)
export const ROOM = { S: 4.25, H: 1.75, deck: .16, wall: .08 };
// Seen from the room's open corner: turned 45°, looked down on at the isometric angle.
export const ROOM_VIEW = { yaw: Math.PI / 4, pitch: .6 };

// Materials. Wood: WOOD floor boards, BARKD seams, BARKL trim, HAT1/HAT2 wall boards; the tree TRUNK/BARK2, leaves
// LEAF/LEAF2/LEAF3. Cloth: BELLY cream (sheets, pages, wax, keys), CLOTH the duvet, ACCENT/BODY2 the rug (and the drum),
// TOP/JACKET/JEANS/SHOES/SOLE/EYE her clothes, HAT the witch's hat, POM/FLOWER the party hat, BROOM the cowboy hat and
// the broom, SHADES black (the top hat, the decks, the speaker, the synth), EAR the guitar, BODY/BODY3/IRIS book covers,
// FRAME steel and the laptop, PHONES the headphones, CRYSTAL glass and crystals, WATER the night outside, WEB the
// mirror's glass. Glowing: RUNE the books' runes, GLINT the laptop's screen, WOKEN candle flames, GLOW the lantern,
// MAGIC potions, MAGIC2 the moon, stars and the decks' lights, COLLAR fairy lights and the crystal's heart.
export function bedroomColours(st = {}) {
  return {
    [M.WOOD]: [156, 106, 64], [M.HAIR]: [138, 92, 56], [M.BARKD]: [44, 28, 22], [M.BARKL]: [190, 144, 96], [M.HAT1]: [92, 58, 42], [M.HAT2]: [118, 78, 52],
    [M.TRUNK]: [92, 72, 62], [M.BARK2]: [66, 52, 46], [M.LEAF]: hsv2rgb(.37, .62, .38), [M.LEAF2]: hsv2rgb(.33, .55, .55), [M.LEAF3]: hsv2rgb(.41, .7, .22),
    [M.BELLY]: [236, 226, 204], [M.CLOTH]: [46, 128, 124], [M.ACCENT]: [170, 52, 82], [M.BODY2]: [236, 194, 118],
    [M.TOP]: [228, 230, 240], [M.JACKET]: [126, 72, 196], [M.JEANS]: [68, 96, 168], [M.SHOES]: [226, 70, 84], [M.SOLE]: [244, 244, 244], [M.EYE]: [96, 200, 150],
    [M.HAT]: [58, 36, 80], [M.POM]: [255, 120, 196], [M.FLOWER]: [255, 214, 80], [M.BROOM]: [128, 84, 50], [M.STRAW]: [206, 174, 112],
    [M.SHADES]: [30, 28, 36], [M.EAR]: [196, 98, 52], [M.BODY]: [168, 48, 60], [M.BODY3]: [46, 112, 84], [M.IRIS]: [52, 76, 150],
    [M.FRAME]: [178, 184, 198], [M.PHONES]: [255, 92, 176], [M.CRYSTAL]: [150, 214, 250], [M.WATER]: [16, 18, 50], [M.WEB]: [120, 150, 200],
    [M.SKIN]: [236, 220, 190], [M.STONE]: [120, 118, 128], [M.MOSS]: [84, 116, 62],
    [M.RUNE]: [110, 255, 196], [M.GLINT]: [150, 226, 255], [M.WOKEN]: [255, 204, 96], [M.GLOW]: [255, 168, 76], [M.MAGIC]: [196, 112, 255], [M.MAGIC2]: [255, 242, 204], [M.COLLAR]: [255, 84, 204],
    [M.LINE]: [24, 20, 30], [M.NOSE]: [14, 12, 18],
  };
}

// A 3 × 5 pixel font for the banner's letters (drawn upright over the pennants, so they read at any art pixel).
export const BANNER_FONT = {
  P: ["111", "101", "111", "100", "100"], A: ["010", "101", "111", "101", "101"], R: ["110", "101", "110", "101", "101"], T: ["111", "010", "010", "010", "010"],
  Y: ["101", "101", "010", "010", "010"], O: ["111", "101", "101", "101", "111"], N: ["110", "101", "101", "101", "101"], I: ["111", "010", "010", "010", "111"],
  G: ["111", "100", "101", "101", "111"], H: ["101", "101", "111", "101", "101"],
};
const bLetterAt = (ch, s, t) => { const g = BANNER_FONT[ch]; if (!g) return false; const x = Math.floor((s + 1) / 2 * 3), y = Math.floor((t + 1) / 2 * 5); return g[y]?.[x] === "1"; };

// Directions on the floor: along the right-hand far wall (x), along the left-hand one (z), and the view's own.
const bX = [1, 0, 0], bZ = [0, 0, 1], bUP = [0, 1, 0], bDOWN = [0, -1, 0];
const bRotY = (v, a) => [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];

// ---------- the pieces ----------
// Each adds its parts to model m at the floor point at = [x, z] (or [x, y, z] for things on furniture), turned by
// o.turn radians about the vertical, with o.mat for its main material where it has a choice and o.k a seed.
const bP3 = (at, y = 0) => at.length === 3 ? at : [at[0], y, at[1]];
const bOff = (at, d, a = 0) => { const r = bRotY(d, a); return [at[0] + r[0], at[1] + r[1], at[2] + r[2]]; };
export const BEDROOM_PROPS = {
  // an open book lying flat, its pages carrying a glowing rune each (k picks the runes); o.cover its cover's material
  openBook(m, at, o = {}) {
    const c = bP3(at, .012), a = o.turn || 0, k = o.k || 0, u = bRotY(bX, a), v = bRotY(bZ, a);
    m.box(bOff(c, [0, -.004, 0]), [.19, .01, .13], o.cover ?? M.BODY, { dir: u, group: 40 + (k % 9), round: .006 });
    for (const side of [-1, 1]) {
      const pc = bOff(c, [side * .092, .026, 0], a), g = (k + (side > 0 ? 1 : 0)) % 4;
      m.flat(pc, u, v, .09, .12, (s, t) => runeGlyph((s + 1) / 2 * 1.25 - .12, (t + 1) / 2 * 1.25 - .12, g, .15) ? M.RUNE : Math.abs(t) > .9 || Math.abs(s) > .92 ? M.BARKL : M.BELLY, { group: 60 + (k % 9), bend: .15 });
    }
    m.anchors.runes = [...(m.anchors.runes || []), bOff(c, [0, .02, 0])];
  },
  // a pile of shut books, n high; returns its top's height
  bookPile(m, at, o = {}) {
    const n = o.n || 3, k = o.k || 0, covers = [M.BODY, M.BODY3, M.IRIS, M.CLOTH, M.EAR];
    let y = 0;
    for (let i = 0; i < n; i++) {
      const h = .025 + .012 * hash2(i, k, 3), a = (o.turn || 0) + (hash2(i, k, 5) - .5) * .7, c = covers[(i + k) % covers.length];
      m.box([at[0], y + h, at[1]], [.11, h, .075], c, { dir: bRotY(bX, a), group: 70 + ((i + k) % 8), round: .008, paint: p => Math.abs(p[1] - y - h) < h * .5 && hash2(Math.floor(p[0] * 40), Math.floor(p[2] * 40), 9) > .4 ? c : M.BELLY });
      y += h * 2;
    }
    return y; // its top
  },
  // a bed: a low wooden frame, a mattress, a rumpled duvet, two pillows; the head at -z (o.turn turns it)
  bed(m, at, o = {}) {
    const [x, z] = at, L = o.L || .62, W = o.W || .42, a = o.turn || 0, c = [x, 0, z], d = (p) => bOff(c, p, a);
    m.box(d([0, .09, 0]), [W, .07, L], M.WOOD, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: 80, round: .02 });
    m.box(d([0, .38, -L - .03]), [W + .02, .3, .035], M.WOOD, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: 80, round: .03 }); // the headboard
    for (const sx of [-1, 1]) m.seg(d([sx * (W + .01), 0, -L - .03]), d([sx * (W + .01), .72, -L - .03]), .035, .03, M.BARKL, { group: 80 });
    m.box(d([0, .2, .02]), [W - .02, .05, L - .03], M.BELLY, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: 81, round: .04 }); // the mattress
    // the duvet, thrown back and rumpled
    m.box(d([0, .27, .2]), [W, .04, L * .62], M.CLOTH, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: 82, round: .04, rough: .012 });
    m.ell(d([.1, .3, -.05]), [.3, .07, .14], M.CLOTH, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: 82, rough: .01 });
    m.ell(d([-.2, .29, .5]), [.16, .05, .2], M.CLOTH, { group: 82 });
    for (const sx of [-.2, .2]) m.ell(d([sx, .3, -L + .14]), [.17, .055, .1], M.BELLY, { group: 83 });
  },
  // a laptop, open, its screen glowing (code and a little waveform)
  laptop(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, u = bRotY(bX, a), v = bRotY(bZ, a);
    m.box(bOff(c, [0, .008, 0]), [.12, .008, .085], M.FRAME, { dir: u, group: 90, round: .006 });
    m.flat(bOff(c, [0, .018, .01], a), u, v, .1, .06, (s, t) => (Math.floor((s + 1) * 12) + Math.floor((t + 1) * 6)) % 2 ? M.SHADES : M.LINE, { group: 91, bend: 0 }); // the keys
    const tilt = -.32, sv = [0, Math.cos(tilt), Math.sin(tilt)], scr = bOff(c, [0, .095, -.09 - .03], a), sv2 = bRotY(sv, a);
    m.box(bOff(scr, [0, 0, -.006], a), [.125, .09, .006], M.FRAME, { axes: [u, sv2, bRotY([0, -Math.sin(tilt), Math.cos(tilt)], a)], group: 92, round: .004 });
    m.flat(bOff(scr, [0, 0, .004], a), u, sv2, .11, .078, (s, t) => { const line = Math.floor((t + 1) * 7), w = hash2(line, 3, 11) * 1.4 - .6; if (t > .4) return Math.abs(t - .7 - Math.sin(s * 9) * .12) < .08 ? M.MAGIC2 : M.GLINT; return s < w && line % 2 ? M.MAGIC2 : M.GLINT; }, { group: 93, bend: 0 });
    m.anchors.screen = bOff(scr, [0, 0, .02], a);
  },
  // headphones, lying on their side
  headphones(m, at, o = {}) {
    const c = bP3(at, .03), a = o.turn || 0;
    for (const s of [-1, 1]) m.ell(bOff(c, [s * .07, 0, 0], a), [.03, .035, .04], M.PHONES, { group: 95 });
    m.chain([[...bOff(c, [-.07, .02, 0], a), .012], [...bOff(c, [-.04, .07, 0], a), .012], [...bOff(c, [0, .085, 0], a), .012], [...bOff(c, [.04, .07, 0], a), .012], [...bOff(c, [.07, .02, 0], a), .012]], M.SHADES, { group: 96 });
  },
  // a garment dropped on the floor or over furniture: kind "jacket", "jeans", "top", "sock", "scarf"
  clothes(m, at, o = {}) {
    const c = bP3(at, .015), a = o.turn || 0, k = o.k || 0, kind = o.kind || "top", g = 100 + (k % 20);
    const r = (p) => bOff(c, p, a);
    if (kind === "jeans") { m.box(r([0, 0, 0]), [.13, .018, .09], M.JEANS, { dir: bRotY(bX, a), group: g, round: .015, rough: .006 }); for (const s of [-1, 1]) m.seg(r([.1, 0, s * .045]), r([.32, 0, s * .07 + .05 * s]), .045, .04, M.JEANS, { group: g, rough: .006 }); }
    else if (kind === "sock") m.chain([[...r([0, 0, 0]), .025], [...r([.09, 0, .02]), .025], [...r([.12, 0, .06]), .028]], o.mat ?? M.EYE, { group: g, paint: p => Math.floor(p[0] * 60) % 3 ? undefined : M.BELLY });
    else if (kind === "scarf") m.chain([[...r([0, 0, 0]), .03], [...r([.14, .005, .08]), .03], [...r([.3, 0, .02]), .028], [...r([.42, 0, .12]), .026]], o.mat ?? M.SHOES, { group: g, paint: p => ((Math.floor((p[0] + p[2]) * 25) % 2) + 2) % 2 ? M.BELLY : undefined });
    else { // a top or a jacket: a body and two arms flung out
      const mat = o.mat ?? (kind === "jacket" ? M.JACKET : M.TOP);
      m.box(r([0, 0, 0]), [.15, .018, .13], mat, { dir: bRotY(bX, a), group: g, round: .016, rough: .007 });
      m.seg(r([-.06, 0, .12]), r([-.2, 0, .32]), .04, .035, mat, { group: g, rough: .006 });
      m.seg(r([.06, 0, -.12]), r([.3, 0, -.2]), .04, .035, mat, { group: g, rough: .006 });
    }
  },
  // a sneaker, its sole white
  sneaker(m, at, o = {}) {
    const c = bP3(at, .035), a = o.turn || 0, g = 120 + ((o.k || 0) % 6);
    m.box(bOff(c, [0, -.02, 0], a), [.1, .012, .04], M.SOLE, { dir: bRotY(bX, a), group: g, round: .01 });
    m.ell(bOff(c, [.0, .015, 0], a), [.095, .035, .038], o.mat ?? M.SHOES, { dir: bRotY(bX, a), group: g });
  },
  // her other hats: "top", "cowboy", "party", "witch", lying about
  hat(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, kind = o.kind || "witch", g = 130 + ((o.k || 0) % 6), tip = o.tip || 0, up = [Math.sin(tip), Math.cos(tip), 0];
    const r = (p) => bOff(c, p, a), axesUp = [bRotY(bX, a), bRotY(up, a), bRotY(bZ, a)];
    if (kind === "top") { m.ell(r([0, .012, 0]), [.14, .012, .14], M.SHADES, { axes: axesUp, group: g }); m.box(r([0, .12, 0]), [.085, .11, .085], M.SHADES, { axes: axesUp, group: g, round: .07, paint: p => p[1] - c[1] < .05 ? M.BODY : undefined }); }
    else if (kind === "cowboy") { m.ell(r([0, .02, 0]), [.2, .018, .15], M.BROOM, { axes: axesUp, group: g }); m.ell(r([0, .07, 0]), [.1, .065, .085], M.BROOM, { axes: axesUp, group: g, paint: p => p[1] - c[1] < .045 ? M.BARKD : undefined }); }
    else if (kind === "party") { m.seg(r([0, 0, 0]), r([0, .22, 0]), .08, .006, M.POM, { group: g, paint: p => Math.floor((p[1] - c[1]) * 30) % 2 ? M.FLOWER : undefined }); m.ell(r([0, .23, 0]), [.025, .025, .025], M.FLOWER, { group: g }); }
    else { m.ell(r([0, .012, 0]), [.19, .012, .18], M.HAT, { axes: axesUp, group: g }); m.chain([[...r([0, .02, 0]), .1], [...r([-.02, .17, 0]), .055], [...r([-.12, .27, .02]), .014]], M.HAT, { group: g, paint: p => p[1] - c[1] < .06 ? M.MAGIC : undefined }); }
  },
  // an acoustic guitar leaning back against a wall (at its foot; o.lean the wall's direction)
  guitar(m, at, o = {}) {
    const foot = bP3(at), lean = o.lean || [0, 0, -1], back = .18, top = [foot[0] + lean[0] * back, .9, foot[2] + lean[2] * back];
    const along = (t) => [foot[0] + (top[0] - foot[0]) * t, foot[1] + (top[1] - foot[1]) * t, foot[2] + (top[2] - foot[2]) * t];
    const across = o.across || [1, 0, 0];
    m.ell(along(.12), [.15, .12, .045], o.mat ?? M.EAR, { dir: across, up: [0, 1, 0], group: 140 });
    m.ell(along(.3), [.12, .1, .045], o.mat ?? M.EAR, { dir: across, up: [0, 1, 0], group: 140 });
    m.ell(along(.24), [.035, .035, .02], M.NOSE, { group: 141, extra: true });
    m.seg(along(.35), along(.9), .025, .022, M.BARKD, { group: 142 });
    m.box(along(.95), [.03, .055, .02], M.BARKD, { dir: across, group: 142 });
  },
  // a synth on an bX stand, its keys white and black, a row of glowing buttons
  synth(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, u = bRotY(bX, a), w = bRotY(bZ, a), y = .46;
    for (const s of [-1, 1]) m.seg(bOff(c, [-.22, 0, s * .1], a), bOff(c, [.22, y - .03, -s * .1], a), .015, .015, M.FRAME, { group: 150 }), m.seg(bOff(c, [.22, 0, s * .1], a), bOff(c, [-.22, y - .03, -s * .1], a), .015, .015, M.FRAME, { group: 150 });
    m.box(bOff(c, [0, y, 0], a), [.3, .03, .1], M.SHADES, { axes: [u, bUP, w], group: 151, round: .015 });
    m.flat(bOff(c, [0, y + .032, .03], a), u, w, .27, .055, (s, t) => { const key = Math.floor((s + 1) * 22); return t < -.2 && key % 7 !== 2 && key % 7 !== 6 && key % 2 ? M.SHADES : key % 1 === 0 && Math.abs((s + 1) * 22 - key) < .12 ? M.LINE : M.BELLY; }, { group: 152, bend: 0 });
    for (let i = 0; i < 6; i++) m.ell(bOff(c, [-.24 + i * .09, y + .035, -.07], a), [.012, .006, .012], i % 2 ? M.COLLAR : M.MAGIC2, { group: 153 });
  },
  // a drum on the floor (a floor tom), its skin pale
  drum(m, at, o = {}) {
    const c = bP3(at);
    m.seg([c[0], 0, c[2]], [c[0], .26, c[2]], .15, .15, M.ACCENT, { group: 160, paint: p => p[1] > .23 || p[1] < .03 ? M.FRAME : undefined });
    m.ell([c[0], .262, c[2]], [.14, .006, .14], M.SKIN, { group: 161 });
    m.seg([c[0] + .12, .3, c[2] - .05], [c[0] - .02, .36, c[2] + .1], .008, .008, M.BARKL, { group: 162 }); // a stick resting on it
  },
  // DJ decks: two turntables and a mixer on a table, the mixer's lights glowing; and a speaker beside
  decks(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, u = bRotY(bX, a), w = bRotY(bZ, a), y = .5;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.seg(bOff(c, [sx * .42, 0, sz * .16], a), bOff(c, [sx * .42, y - .02, sz * .16], a), .025, .025, M.WOOD, { group: 170 });
    m.box(bOff(c, [0, y, 0], a), [.48, .025, .2], M.WOOD, { axes: [u, bUP, w], group: 170, round: .015 });
    for (const sx of [-1, 1]) {
      const t = bOff(c, [sx * .27, y + .05, 0], a);
      m.box(t, [.17, .025, .15], M.SHADES, { axes: [u, bUP, w], group: 171, round: .015 });
      m.ell(bOff(t, [0, .028, 0]), [.12, .006, .12], M.FRAME, { group: 172, paint: p => Math.hypot(p[0] - t[0], p[2] - t[2]) < .035 ? M.BODY : undefined });
      m.seg(bOff(t, [.1 * sx, .04, -.08], a), bOff(t, [.04 * sx, .035, .05], a), .007, .006, M.FRAME, { group: 173 }); // the tone arm
    }
    m.box(bOff(c, [0, y + .055, 0], a), [.08, .03, .14], M.SHADES, { axes: [u, bUP, w], group: 174, round: .01 });
    m.flat(bOff(c, [0, y + .087, 0], a), u, w, .07, .12, (s, t) => { const col = Math.floor((s + 1) * 2.5), row = Math.floor((t + 1) * 6); return row % 2 && (col % 2 === 0) ? (row < 6 ? M.MAGIC2 : M.COLLAR) : M.LINE; }, { group: 175, bend: 0 });
    m.anchors.decks = bOff(c, [0, y + .12, 0], a);
    if (!o.speaker) return;
    // the speaker on the floor beside it (o.speaker)
    const sp = bOff(c, [.68, 0, 0], a);
    m.box(bOff(sp, [0, .32, 0]), [.14, .32, .14], M.SHADES, { axes: [u, bUP, w], group: 176, round: .02 });
    for (const [yy, r] of [[.42, .085], [.17, .055]]) m.flat(bOff(sp, [0, yy, .145], a), u, bUP, r, r, (s, t) => { const d = Math.hypot(s, t); return d > 1 ? undefined : d < .35 ? M.FRAME : d > .82 ? M.LINE : M.STONE; }, { group: 177, bend: .6 });
  },
  // a shelf on the wall at height y, with potion bottles (glowing) and crystals
  potionShelf(m, at, o = {}) {
    const c = bP3(at, o.y ?? 1.05), a = o.turn || 0, u = bRotY(bX, a), w = bRotY(bZ, a);
    m.box(c, [.4, .02, .09], M.WOOD, { axes: [u, bUP, w], group: 180, round: .01 });
    for (const sx of [-.32, .32]) m.seg(bOff(c, [sx, -.01, -.06], a), bOff(c, [sx, -.14, -.08], a), .015, .012, M.BARKD, { group: 180 });
    const bottles = [[-.3, .09, .045], [-.18, .14, .035], [-.06, .07, .05], [.24, .12, .04], [.34, .08, .035]];
    bottles.forEach(([sx, h, r], i) => {
      const b = bOff(c, [sx, .02 + h * .5, 0], a);
      m.ell(b, [r, h * .5, r], M.CRYSTAL, { group: 181 + i, paint: p => p[1] < b[1] + h * (.05 + .1 * (i % 2)) ? M.MAGIC : undefined });
      m.seg(bOff(b, [0, h * .5, 0]), bOff(b, [0, h * .5 + .045, 0]), r * .35, r * .3, M.CRYSTAL, { group: 181 + i });
      m.ell(bOff(b, [0, h * .5 + .05, 0]), [r * .4, .012, r * .4], M.BROOM, { group: 181 + i });
    });
    // a cluster of crystals, its heart glowing
    const cr = bOff(c, [.08, .02, 0], a);
    for (const [dx, h, lean] of [[0, .16, 0], [-.035, .1, -.4], [.04, .11, .35], [.015, .07, .1]]) m.seg(bOff(cr, [dx, 0, 0], a), bOff(cr, [dx + Math.sin(lean) * h, Math.cos(lean) * h, 0], a), .025, .004, M.CRYSTAL, { group: 188, paint: p => p[1] < cr[1] + h * .45 ? M.COLLAR : undefined });
    m.anchors.potions = bOff(c, [0, .12, 0], a);
  },
  // a candle (o.h tall), its flame glowing
  candle(m, at, o = {}) {
    const c = bP3(at), h = o.h || .1, g = 190 + ((o.k || 0) % 8);
    m.seg(c, bOff(c, [0, h, 0]), .022, .02, M.BELLY, { group: g });
    m.ell(bOff(c, [0, h + .025, 0]), [.012, .025, .012], M.WOKEN, { group: g + 10 });
    m.anchors.flames = [...(m.anchors.flames || []), bOff(c, [0, h + .03, 0])];
  },
  // a broom leaning against a wall (foot at `at`, its bristles down), o.lean the wall's direction
  broom(m, at, o = {}) {
    const foot = bP3(at, .02), lean = o.lean || [0, 0, -1], top = [foot[0] + lean[0] * .2, 1.15, foot[2] + lean[2] * .2];
    m.seg(foot, top, .018, .016, M.BROOM, { group: 200 });
    m.seg([foot[0], .02, foot[2]], [foot[0] + lean[0] * .05, .26, foot[2] + lean[2] * .05], .085, .03, M.STRAW, { group: 201, paint: p => p[1] > .22 ? M.BARKD : undefined });
  },
  // a hanging lantern from a hook in the wall (at its top), glowing warm
  lantern(m, at, o = {}) {
    const c = bP3(at, o.y ?? 1.35);
    m.seg(c, bOff(c, [0, -.12, 0]), .006, .006, M.SHADES, { group: 210 });
    m.box(bOff(c, [0, -.2, 0]), [.05, .07, .05], M.GLOW, { group: 211, round: .02, paint: p => { const lx = Math.abs(p[0] - c[0]), lz = Math.abs(p[2] - c[2]), ly = p[1] - (c[1] - .2); return ly > .05 || ly < -.055 || (lx > .038 && lz > .03) || (lz > .038 && lx > .03) ? M.SHADES : undefined; } }); // glass panes in a dark frame
    m.anchors.lantern = bOff(c, [0, -.2, 0]);
  },
  // a standing mirror, its glass facing the view (o.face the direction it faces)
  mirror(m, at, o = {}) {
    const c = bP3(at), f = o.face || [Math.SQRT1_2, 0, Math.SQRT1_2], u = [f[2], 0, -f[0]], gc = bOff(c, [0, .78, 0]);
    m.seg(bOff(c, [-.16 * u[0], 0, -.16 * u[2]]), bOff(c, [.16 * u[0], 0, .16 * u[2]]), .025, .025, M.WOOD, { group: 220 });
    m.seg(c, bOff(c, [0, .3, 0]), .02, .02, M.WOOD, { group: 220 });
    m.flat(gc, u, bUP, .27, .5, (s, t) => { const d = Math.hypot(s, t); return d > 1 ? undefined : d > .86 ? M.WOOD : Math.abs(s + t * .5 - .1) < .08 || Math.abs(s + t * .5 + .25) < .04 ? M.TOP : M.WEB; }, { group: 221, bend: 0 });
    m.ell(bOff(gc, [0, .52, 0]), [.025, .025, .025], M.FLOWER, { group: 220 }); // a carved star on top
    m.anchors.mirror = { c: gc, u, ru: .27 * .86, rv: .5 * .86 };
  },
  // a wooden chair (o.turn turns it; its back at -z)
  chair(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, r = p => bOff(c, p, a), axes = [bRotY(bX, a), bUP, bRotY(bZ, a)];
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) m.seg(r([sx * .15, 0, sz * .15]), r([sx * .15, .3, sz * .15]), .02, .02, M.BARKL, { group: 240 });
    m.box(r([0, .32, 0]), [.19, .022, .19], M.WOOD, { axes, group: 240, round: .015 });
    for (const sx of [-1, 1]) m.seg(r([sx * .15, .32, -.16]), r([sx * .15, .72, -.17]), .02, .018, M.BARKL, { group: 240 });
    m.box(r([0, .62, -.17]), [.17, .07, .018], M.WOOD, { axes, group: 240, round: .012 });
  },
  // a clothes rail along a wall (o.len long, along x unless o.turn), its garments hanging, a hanger or two empty
  rail(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, L = o.len || .7, y = 1.02, r = p => bOff(c, p, a), k = o.k || 0;
    for (const sx of [-1, 1]) { m.seg(r([sx * L / 2, 0, 0]), r([sx * L / 2, y, 0]), .02, .018, M.FRAME, { group: 250 }); m.seg(r([sx * L / 2, .01, -.12]), r([sx * L / 2, .01, .12]), .02, .02, M.FRAME, { group: 250 }); }
    m.seg(r([-L / 2 - .02, y, 0]), r([L / 2 + .02, y, 0]), .014, .014, M.FRAME, { group: 250 });
    const mats = [M.JACKET, M.TOP, M.EYE, M.SHOES, M.CLOTH, M.JEANS, M.POM, M.HAT];
    const n = Math.max(3, Math.round(L / .1));
    for (let i = 0; i < n; i++) {
      const x = -L / 2 + .06 + (L - .12) * i / (n - 1), mat = mats[(i * 3 + k) % mats.length], h = .2 + .14 * hash2(i, k, 4), g = 251 + (i % 12);
      m.seg(r([x, y, 0]), r([x, y - .06, 0]), .006, .006, M.FRAME, { group: g });
      if (hash2(i, k, 7) < .15) continue; // an empty hanger
      m.box(r([x, y - .06 - h, 0]), [.025, h, .13 + .03 * hash2(i, k, 2)], mat, { axes: [bRotY(bX, a), bUP, bRotY(bZ, a)], group: g, round: .02, rough: .004 });
    }
  },
  // a bookcase against the left wall (its back on x = 0, o.len along z, o.h tall), its shelves full of book spines, a rune
  // book open on top
  bookcase(m, at, o = {}) {
    const [x0, z] = at, L = o.len || .7, h = o.h || 1.2, D = .28, k = o.k || 0, covers = [M.BODY, M.BODY3, M.IRIS, M.CLOTH, M.EAR, M.ACCENT, M.HAT];
    m.box([x0 + D / 2, h / 2, z], [D / 2, h / 2, L / 2], M.WOOD, { group: 260, round: .015, paint: p => p[0] > x0 + D - .025 || Math.abs(p[2] - z) > L / 2 - .03 || p[1] > h - .03 ? M.WOOD : M.BARKD });
    const shelves = 4, gap = (h - .04) / shelves;
    for (let si = 0; si < shelves; si++) {
      const y0 = .03 + si * gap;
      let zz = z - L / 2 + .04, i = 0;
      while (zz < z + L / 2 - .06) {
        const w = .025 + .02 * hash2(i, si + k, 3), bh = gap * (.55 + .35 * hash2(i, si + k, 5)), mat = covers[(i + si * 3 + k) % covers.length], lean = hash2(i, si, 9) < .1;
        m.box([x0 + D * .55, y0 + bh / 2, zz + w / 2], [D * .38, bh / 2, w / 2 - .002], mat, { group: 261 + ((i + si) % 10), round: .004, dir: lean ? [Math.cos(.3), Math.sin(.3), 0] : bX, paint: p => Math.abs(p[1] - y0 - bh * .75) < .008 ? M.BODY2 : undefined });
        zz += w + .004; i++;
      }
      m.box([x0 + D / 2, y0 - .005, z], [D / 2 - .01, .012, L / 2 - .02], M.BARKL, { group: 271, round: .005 });
    }
    BEDROOM_PROPS.openBook(m, [x0 + D / 2, h + .012, z], { turn: Math.PI / 2 + .2, k: k + 3, cover: M.BODY });
  },
  // a beanbag slumped on the floor
  beanbag(m, at, o = {}) {
    const c = bP3(at), r = o.r || .32;
    m.ell([c[0], r * .55, c[2]], [r, r * .55, r * .92], o.mat ?? M.ACCENT, { group: 280, rough: .015 });
    m.ell([c[0] - r * .25, r * .95, c[2] - r * .25], [r * .6, r * .3, r * .55], o.mat ?? M.ACCENT, { group: 280, rough: .012 });
  },
  // a crate of records, a couple out on the floor
  records(m, at, o = {}) {
    const c = bP3(at), a = o.turn || 0, r = p => bOff(c, p, a), axes = [bRotY(bX, a), bUP, bRotY(bZ, a)], sleeves = [M.POM, M.FLOWER, M.EYE, M.JACKET, M.SHOES, M.IRIS, M.BELLY];
    m.box(r([0, .1, 0]), [.17, .1, .13], M.BARKL, { axes, group: 290, round: .01, paint: p => Math.abs(p[1] - .1) < .03 ? M.WOOD : undefined });
    for (let i = 0; i < 7; i++) m.box(r([-.13 + i * .043, .19, 0]), [.012, .085, .12], sleeves[i % sleeves.length], { axes: [bRotY([Math.cos(.15 * (i % 3 - 1)), Math.sin(.15 * (i % 3 - 1)), 0], a), bUP, bRotY(bZ, a)], group: 291 + (i % 4), round: .004 });
    for (const [dx, dz, mat] of [[.34, .1, M.SHOES], [.2, .32, M.IRIS]]) { const p = r([dx, .006, dz]); m.ell(p, [.15, .006, .15], M.SHADES, { group: 296 }); m.ell([p[0], .012, p[2]], [.05, .004, .05], mat, { group: 297 }); }
  },
  // a rug, patterned
  rug(m, at, o = {}) {
    const c = bP3(at, .016), r = o.r || .7;
    m.flat(c, bX, bZ, r, r * .75, (s, t) => { const d = Math.hypot(s, t); if (d > 1) return undefined; return d > .85 ? M.BODY2 : (Math.floor(d * 7) % 2 ? M.ACCENT : (Math.abs(s * t) < .08 ? M.BODY2 : M.ACCENT)); }, { group: 230, bend: 0 });
  },
};

// The room: the deck, the floor's boards, the two far walls of boards, the window, the tree's bough and root, the
// fairy lights and the banner; then the furniture and the mess.
export function bedroomModel({ S = ROOM.S } = {}) {
  const { H, deck, wall } = ROOM, m = new Model({ blend: .02 }), K = 3 / 3.4; // (the first room's furniture is placed for a room 3.4 across; K fits it to the 3 it was)
  const B = Object.fromEntries(Object.entries(BEDROOM_PROPS).map(([id, f]) => [id, (mm, at, o) => f(mm, at.length === 3 ? [at[0] * K, at[1], at[2] * K] : [at[0] * K, at[1] * K], o)]));
  m.anchors.runes = []; m.anchors.flames = []; m.anchors.fairy = []; m.anchors.letters = [];
  // where she can't walk (x0, z0, x1, z1 on the floor): the furniture's footprints (the things lying flat she steps over)
  const blocks = m.anchors.blocks = [], block = (x, z, hx, hz) => blocks.push([x - hx, z - hz, x + hx, z + hz]);
  // the deck under the floor, and the floor's boards (running along x, their seams dark, a knot here and there)
  m.box([S / 2, -deck / 2, S / 2], [S / 2 + .04, deck / 2, S / 2 + .04], M.BARKL, { group: 2, round: .02, paint: p => p[1] > -.02 ? (Math.floor(p[2] * 4.5) % 2 ? M.WOOD : M.HAIR) : M.HAT1 });
  // the far walls: boards running up, seams dark, a sill and a top rail
  const boards = (p, along) => { const q = along * 5; return Math.abs(q - Math.round(q)) < .06 ? M.BARKD : Math.floor(q) % 2 ? M.HAT1 : M.HAT2; };
  m.box([S / 2, H / 2, -wall / 2], [S / 2 + wall, H / 2, wall / 2], M.HAT2, { group: 3, round: .01, paint: p => p[1] > H - .06 ? M.BARKL : boards(p, p[0]) });
  m.box([-wall / 2, H / 2, S / 2], [wall / 2, H / 2, S / 2], M.HAT2, { group: 4, round: .01, paint: p => p[1] > H - .06 ? M.BARKL : boards(p, p[2]) });
  // the round window in the left wall: the night, the moon, stars and a branch outside; a frame and a sill
  const wc = [.005, .98, 1.3], wr = .3;
  m.flat([wc[0] + .002, wc[1], wc[2]], bZ, bUP, wr, wr, (s, t) => {
    const d = Math.hypot(s, t); if (d > 1) return undefined;
    if (d > .86 || Math.abs(s) < .05 || Math.abs(t) < .05) return M.BARKL;
    if (Math.hypot(s - .3, t - .38) < .2) return Math.hypot(s - .4, t - .45) < .17 ? M.WATER : M.MAGIC2; // the moon, a crescent
    if (Math.abs(t + .55 + s * .3 + Math.sin(s * 6) * .06) < .07 || Math.abs(s + .35 - (t + .2) * .25) < .045 && t < .2) return M.LEAF3; // a branch outside
    return hash2(Math.floor(s * 18), Math.floor(t * 18), 21) > .93 ? M.MAGIC2 : M.WATER;
  }, { group: 5, bend: 0 });
  m.box([.05, wc[1] - wr - .02, wc[2]], [.05, .02, wr * .8], M.BARKL, { group: 6, round: .01 }); // the sill
  for (const [dz, h, k] of [[-.18, .09, 1], [.2, .13, 2], [.1, .06, 3]]) BEDROOM_PROPS.candle(m, [.06, wc[1] - wr, wc[2] + dz], { h, k }); // (in the room's own units)
  // the tree's bough pushing in through the left wall, leaves on it; a root through the floor in the corner
  m.chain([[0, 1.42, 2.4, .13], [.35, 1.4, 2.5, .1], [.75, 1.52, 2.62, .07], [1.05, 1.66, 2.66, .04]], M.TRUNK, { group: 7, rough: .012, paint: p => hash2(Math.floor(p[0] * 20), Math.floor(p[1] * 20), 8) > .7 ? M.BARK2 : undefined });
  m.seg([.6, 1.48, 2.58], [.75, 1.25, 2.35], .04, .02, M.TRUNK, { group: 7 });
  for (const [x, y, z, r] of [[.75, 1.22, 2.32, .12], [1.0, 1.65, 2.72, .14], [.5, 1.55, 2.68, .1], [.85, 1.78, 2.55, .11], [1.15, 1.6, 2.6, .09]]) m.ell([x, y, z], [r, r * .7, r], M.LEAF2, { group: 8, rough: .02, paint: p => p[1] < y - r * .2 ? M.LEAF3 : p[1] > y + r * .3 ? M.LEAF : undefined });
  m.chain([[.05, .05, 2.0, .14], [.3, .06, 2.1, .1], [.55, .03, 1.95, .06], [.75, 0, 2.0, .03]], M.TRUNK, { group: 9, rough: .012, paint: p => p[1] > .1 && hash2(Math.floor(p[0] * 16), Math.floor(p[2] * 16), 2) > .6 ? M.MOSS : undefined });
  // fairy lights along the tops of the walls, in sags between pins
  const fairy = (a, b, n) => { for (let i = 0; i <= n; i++) { const t = i / n, sag = Math.sin(t * Math.PI * 4) ** 2 * .08, p = [a[0] + (b[0] - a[0]) * t, a[1] - sag, a[2] + (b[2] - a[2]) * t]; m.ell(p, [.018, .018, .018], i % 3 ? M.COLLAR : M.MAGIC2, { group: 10 }); m.anchors.fairy.push(p); } };
  const nf = Math.round(24 * S / 3);
  fairy([.25, H - .06, .06], [S - .1, H - .06, .06], nf); fairy([.06, H - .06, .25], [.06, H - .06, S - .1], nf);
  // the banner: PARTY on the left wall, TONIGHT on the right, a pennant a letter, on a string
  const flags = (word, start, dir, along, n) => { [...word].forEach((ch, i) => { const t = (i + .5) / n, sag = Math.sin(t * Math.PI) * .06, c = [start[0] + dir[0] * along * t, H - .36 - sag, start[2] + dir[2] * along * t], nrm = dir[0] ? [0, 0, 1] : [1, 0, 0];
        m.anchors.letters.push([ch, [c[0] + nrm[0] * .03, c[1], c[2] + nrm[2] * .03], dir]); });
    m.chain([[start[0], H - .16, start[2], .006], ...Array.from({ length: 9 }, (_, k) => { const t = (k + 1) / 9, sag = Math.sin(t * Math.PI) * .06; return [start[0] + dir[0] * along * t, H - .16 - sag, start[2] + dir[2] * along * t, .006]; })], M.STRAW, { group: 13 }); };
  flags("PARTY", [.06, 0, 2.15], [0, 0, -1], 1.95, 5);
  flags("TONIGHT", [.2, 0, .06], bX, 2.75, 7);

  // the heroes (art director: "fewer, bigger, grouped"): the bed, the biggest thing in the room, its laptop the brightest glow;
  // the DJ decks on their desk; the guitar against the wall; the banner. Then the mess in piles, with clear floor between:
  // clothes heaped at the bed's foot and over a chair, books stacked by the bed (one open, glowing), the instruments in one
  // corner. A ring of floor round where she stands is kept clear, the rug under her.
  B.bed(m, [.62, 1.62], { W: .52, L: .82 });
  B.laptop(m, [.66, .34, 1.6], { turn: .3 });
  B.headphones(m, [.3, .34, 1.75], { turn: .6 });
  // books by the bed's head: a tall stack, one open on it glowing, a shut one leaning
  const pileTop = B.bookPile(m, [.3, .3], { n: 6, k: 1 }); B.openBook(m, [.3, pileTop + .005, .3], { turn: .3, k: 2, cover: M.BODY3 });
  B.bookPile(m, [.6, .35], { n: 2, k: 4 });
  // clothes heaped at the bed's foot and spilling off a chair
  B.chair(m, [1.4, 2.95], { turn: -.5 });
  B.clothes(m, [1.4, .36, 2.95], { kind: "jacket", turn: 2.4, k: 1, mat: M.JACKET });
  B.clothes(m, [1.05, 3.25], { kind: "scarf", turn: 1.0, k: 5 });
  B.clothes(m, [.55, 2.75], { kind: "jeans", turn: .4, k: 2 }); B.clothes(m, [.8, .03, 2.85], { kind: "top", turn: -.6, k: 3, mat: M.TOP });
  B.clothes(m, [.35, .05, 2.95], { kind: "jacket", turn: 1.7, k: 4, mat: M.EYE }); B.clothes(m, [1.0, 2.65], { kind: "sock", turn: .5, k: 6, mat: M.POM });
  B.hat(m, [.55, .07, 2.9], { kind: "witch", turn: -.8, k: 1 }); B.hat(m, [.95, 3.05], { kind: "party", k: 2 }); B.hat(m, [.25, 3.2], { kind: "top", k: 3 }); B.hat(m, [.75, .06, 2.62], { kind: "cowboy", turn: .5, k: 4 });
  B.sneaker(m, [1.75, 3.2], { turn: .5, k: 1 }); B.sneaker(m, [1.9, 3.05], { turn: 1.8, k: 2 });
  // the decks on their desk against the right wall, the potion shelf and candles over them
  B.decks(m, [2.05, .3]);
  B.potionShelf(m, [2.1, .1], { y: .92 });
  B.candle(m, [2.62, .55, .2], { h: .08, k: 4 }); B.candle(m, [2.56, .55, .14], { h: .12, k: 5 });
  // the instruments in the far right corner: the guitar against the wall, the drum, the synth on its stand; the lantern over them
  B.guitar(m, [2.95, .2], { lean: [0, 0, -1], across: [1, 0, 0] });
  B.drum(m, [3.1, .62]);
  B.synth(m, [2.95, 1.05], { turn: Math.PI / 2 });
  B.lantern(m, [2.85, .1], { y: 1.1 });
  // a second open book, glowing, by the window's candles; the rug under her
  B.openBook(m, [1.0, .03, .35], { turn: 1.2, k: 7, cover: M.IRIS });
  B.rug(m, [2.8, 1.95], { r: .78 });
  m.anchors.stand = [2.8 * K, 0, 1.95 * K];
  block(.55, 1.4, .56, .88); block(.27, .27, .13, .13); block(.53, .31, .1, .09); block(1.24, 2.6, .22, .22); // the bed, the books, the chair
  block(1.81, .27, .5, .22); block(2.6, .2, .16, .16); block(2.73, .55, .17, .17); block(2.6, .93, .14, .27); // the decks, the guitar, the drum, the synth
  // The room's new floor (Ed, 2026-10-06: "twice as large"), placed in its own units: more of her mess.
  if (S >= 3.6) {
    const R = S - 3; // (what's new past the first room, along each wall)
    // along the right-hand wall: a clothes rail, the long mirror by it, a bass against the wall; a heap at the rail's foot
    const rx = 3 + R * .55;
    BEDROOM_PROPS.rail(m, [rx, .3], { len: Math.min(1.1, R * .75), k: 2 }); block(rx, .3, Math.min(1.1, R * .75) / 2 + .04, .16);
    BEDROOM_PROPS.guitar(m, [3.06, .18], { lean: [0, 0, -1], across: [1, 0, 0], mat: M.SHOES }); block(3.06, .2, .15, .14);
    BEDROOM_PROPS.mirror(m, [S - .3, .85]); block(S - .3, .85, .2, .2);
    BEDROOM_PROPS.clothes(m, [rx - .2, .75], { kind: "top", turn: 2.1, k: 7, mat: M.POM }); BEDROOM_PROPS.clothes(m, [rx + .15, .95], { kind: "jeans", turn: -1.1, k: 8 });
    BEDROOM_PROPS.hat(m, [rx - .45, .9], { kind: "cowboy", turn: 1.4, k: 5 }); BEDROOM_PROPS.sneaker(m, [rx + .4, .62], { turn: 2.6, k: 3, mat: M.JACKET }); BEDROOM_PROPS.sneaker(m, [rx + .52, .7], { turn: .4, k: 4, mat: M.JACKET });
    // along the left-hand wall: the broom by the bed, a bookcase full of spines, rune books open on the floor before it, a candle
    BEDROOM_PROPS.broom(m, [.1, 2.68], { lean: [-1, 0, 0] }); block(.12, 2.68, .12, .12);
    const bz = 3 + R * .55;
    BEDROOM_PROPS.bookcase(m, [0, bz], { len: Math.min(1, R * .75), k: 1 }); block(.15, bz, .2, Math.min(1, R * .75) / 2 + .03);
    BEDROOM_PROPS.openBook(m, [.62, bz - .35], { turn: .6, k: 11, cover: M.BODY3 }); BEDROOM_PROPS.openBook(m, [.85, bz + .2], { turn: -.4, k: 12, cover: M.IRIS }); BEDROOM_PROPS.openBook(m, [.5, bz + .55], { turn: 1.9, k: 13, cover: M.EAR });
    const top = BEDROOM_PROPS.bookPile(m, [.45, 3.05], { n: 4, k: 6 }); BEDROOM_PROPS.candle(m, [.45, top, 3.05], { h: .1, k: 6 }); block(.45, 3.05, .1, .1);
    // in the middle of the new floor: a beanbag with headphones on it, the records out of their crate, a party hat, a sock
    BEDROOM_PROPS.beanbag(m, [1.75, S - .9], { mat: M.JEANS }); block(1.75, S - .9, .32, .3);
    BEDROOM_PROPS.headphones(m, [1.65, .4, S - .95], { turn: .3 });
    BEDROOM_PROPS.records(m, [2.55, S - .55], { turn: .25 }); block(2.55, S - .55, .2, .16);
    BEDROOM_PROPS.hat(m, [3.3, 2.75], { kind: "party", k: 6 }); BEDROOM_PROPS.clothes(m, [3.1, 3.3], { kind: "sock", turn: 2.2, k: 9, mat: M.EYE });
    BEDROOM_PROPS.clothes(m, [1.2, S - .45], { kind: "scarf", turn: -.3, k: 10, mat: M.FLOWER });
  }
  m.anchors.floor = { S, wall, blocks };
  return m;
}

// The room rendered at the witch's own art pixel: its sprite and its anchors, in pixels from the top-left: stand (where
// her feet go), letters (the banner's), mirror ({ x, y, rx, ry }, its glass, if one is placed), and the glowing things (runes, flames, fairy, screen, lantern,
// potions, decks), for the room's lights and its animated glows.
export function bedroomSprite(st = {}, { S } = {}) {
  const m = bedroomModel({ S }), { sp, project, s, depth, depthOf } = render(m, { scale: witchPixelsPerUnit(st), yaw: ROOM_VIEW.yaw, pitch: ROOM_VIEW.pitch, lineGap: .12, keepDepth: true });
  const A = m.anchors, pt = p => project(p), anchors = {};
  for (const k of ["runes", "flames", "fairy"]) anchors[k] = A[k].map(pt);
  for (const k of ["screen", "lantern", "potions", "decks", "stand"]) anchors[k] = pt(A[k]);
  anchors.letters = A.letters.map(([ch, p, dir]) => { const a = pt(p), b = pt([p[0] + dir[0] * .1, p[1], p[2] + dir[2] * .1]); return [ch, a, (b[1] - a[1]) / (b[0] - a[0] || 1)]; }); // each letter, where its pennant hangs and the wall's slope on screen
  if (A.mirror) { const mr = A.mirror, c = pt(mr.c), e = pt([mr.c[0] + mr.u[0] * mr.ru, mr.c[1] + mr.rv, mr.c[2] + mr.u[2] * mr.ru]); anchors.mirror = { x: c[0], y: c[1], rx: Math.abs(e[0] - c[0]), ry: Math.abs(e[1] - c[1]) }; }
  sp.anchors = anchors; sp.scale = s;
  // to walk in it (src/ui/roomWalk.ts): its floor (size, walls, footprints), where a floor point lands, and how far each pixel is
  sp.walk = { ...A.floor, start: [A.stand[0], A.stand[2]], project, depth, depthOf, pitch: ROOM_VIEW.pitch };
  return sp;
}

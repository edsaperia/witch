// The witch's treehouse (Ed, second go: "mostly wood, but with modern elements. It can be larger than it is now;
// the top of the treehouse should be tall, standing above the treeline ... the inside - this is where we should have
// her sitting at the start"). The home landmark, a tall timber tower of storeys stacked up a giant living tree:
//   - the tree: a huge trunk running up through every storey, roots spilling over the ground, branches curling up
//     round the studio's deck, and a leafy crown round the third storey;
//   - the porch storey: a round board-clad room on a braced deck on posts, big multi-pane windows, the front door,
//     lanterns on posts, a wraparound railing;
//   - the studio (where she sits at the start): a round plank deck with a timber room on it, its near wall and the
//     near half of its roof cut away so we see inside: an upright piano, a synth on a stand, a groovebox on the
//     floor, a speaker stack, a patterned rug, a stool (her seat), sheet music on the walls, fairy lights along the
//     bare rafters, a multi-pane window, warm light; an LED strip in the party's colours under the deck's edge;
//   - the third storey: a smaller room with a loudspeaker on its balcony and solar panels on its skirt roof;
//   - the top: a round shingled tower standing clear above the canopy (and the treeline) with pointed-arch windows,
//     a little balcony with a satellite dish, and a tall conical witch's-hat roof, its tip bent, an antenna and a
//     pennant on the finial (the last nod to the old castle);
//   - a dark metal spiral stair from the ground to the studio, wooden ladders up from there.
// Built in 3D (model3d.js) to the witch's own size (about 1.9 m a unit at 16 px a metre), so her sit pose fits the
// stool; turned towards or away (the studio's open side faces the camera either way). Split into a base (the trunk,
// the porch and the studio: seen from the ground) and a top (the crown and everything above the studio's roof:
// drawn in treetop mode, cut out round the witch). Anchors: base, seat, door, camera (the studio, for the opening
// zoom) and the light sources, in pixels.
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3, YAW } from "./model3d.js";
import { witchPixelsPerUnit, WITCH_SEAT_HEIGHT, DJ_DECKS } from "./witch.js";

// Its parts' materials. Wood: WOOD boards with BARKD seams, BARKL trim; shingles HAT1/HAT2; dark iron BODY3 (the
// stair), steel FRAME; solar cells BODY; the rug CLOTH with BODY2 pattern and ACCENT; piano and speakers SHADES with
// BELLY keys. The windows glow warm (GLOW, brightest MAGIC2); fairy lights and the LED strip are party neons
// (COLLAR pink, RUNE cyan, WOKEN gold, MAGIC violet).
const LEAVES = new Set([M.LEAF, M.LEAF2, M.LEAF3]);
export function treehouseColours(st = {}) {
  return {
    [M.TRUNK]: [88, 70, 62], [M.BARK2]: [64, 50, 46], [M.BARKD]: [26, 20, 20], [M.BARKL]: [132, 110, 94], // the giant's bark: ancient, grey-brown, deeply furrowed
    [M.LEAF]: hsv2rgb(.37, .62, .34), [M.LEAF2]: hsv2rgb(.33, .55, .5), [M.LEAF3]: hsv2rgb(.41, .7, .19), // its own deep, blue-green leaves, unlike any forest species
    [M.WOOD]: [150, 104, 64], [M.STRAW]: [196, 168, 112], [M.HAT1]: [96, 66, 52], [M.HAT2]: [122, 86, 62], // boards, rope, shingles in two rows
    [M.BODY3]: [44, 44, 52], [M.FRAME]: [190, 196, 206], [M.BODY]: [40, 62, 118], // dark iron, steel, solar cells
    [M.CLOTH]: [196, 64, 72], [M.BODY2]: [236, 196, 120], [M.ACCENT]: hsv2rgb(.62, .55, .75), // the rug, its pattern, the pennant
    [M.SHADES]: [26, 24, 30], [M.BELLY]: [236, 232, 220], [M.EAR]: [176, 96, 64], // piano and speaker black, keys and paper, terracotta
    [M.STONE]: [118, 116, 124], [M.MOSS]: [80, 112, 60],
    [M.GLOW]: [255, 190, 96], [M.MAGIC2]: [255, 236, 190], // warm window light
    [M.COLLAR]: [255, 80, 200], [M.RUNE]: [80, 230, 255], [M.WOKEN]: [255, 214, 80], [M.MAGIC]: [180, 110, 255], // fairy lights, LEDs
    [M.LINE]: [24, 22, 30], [M.NOSE]: [14, 12, 18],
  };
}

// Heights in model units (the witch is about 1.3 tall; a unit is about 1.9 m): each storey's floor, its room's
// radius and height, its deck's radius.
export const TREEHOUSE_STOREYS = {
  porch: { y: 1.7, R: 2.3, h: 1.6, deck: 3.1 },
  studio: { y: 4.9, R: 3.0, h: 2.1, deck: 3.7 },
  loft: { y: 8.6, R: 1.9, h: 1.5, deck: 2.5 },
  tower: { y: 12.9, R: 1.3, h: 1.75, deck: 1.85 },
};
const FAIRY = [M.COLLAR, M.RUNE, M.WOKEN, M.MAGIC];
const OPEN = a => Math.abs(((a - Math.PI / 2 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < 1.35; // the studio's open side: round +z, towards the camera
// The DJ booth (Ed, 2026-10-06: "The witch should have a 'DJing' animation for when she's standing behind the decks. Feel free
// to redesign the treehouse to make it better for this"): a desk squared up to the camera (whichever way the house is turned)
// right in front of where she stands, laid out to her own reach (DJ_DECKS in witch.js, in her model's units: a forward, b up,
// c to her near side, the screen's left): two turntables, their platters' labels glowing pink and cyan, a white mark on each
// going round (frame by frame), tonearms, start lights; a mixer between them, its knobs, channel faders, crossfader and two
// level meters jumping; a raised lip along the front edge, and on the front panel a chasing strip of party LEDs top and
// bottom, round a glowing crescent moon. Built into the house (frame 0) and, alone, into the fore frames the game draws over
// her (DJ_FRAMES of them: the platters turn an eighth of a turn and the LEDs chase on each).
export const DJ_FRAMES = 8;
const DJ_STAND = [0, TREEHOUSE_STOREYS.studio.y, 1.75]; // where she stands (her seat anchor), in the house's units
function djFrame3(facing) { // her model's (a, b, c) in the house's: squared to the camera at the house's yaw for this facing
  const yaw = YAW[facing] ?? YAW.towards, f = [Math.sin(yaw), 0, Math.cos(yaw)], r = [Math.cos(yaw), 0, -Math.sin(yaw)], o = v3.sub(DJ_STAND, v3.mul(f, .02)); // (her ground anchor .02 ahead of her origin)
  const to = ([a, b, c]) => v3.add(o, v3.add(v3.mul(f, a), v3.add(v3.mul(r, -c), [0, b, 0])));
  const from = p => { const d = v3.sub(p, o); return [v3.dot(d, f), d[1], -v3.dot(d, r)]; };
  return { to, from, f, r };
}
function djTable(m, { frame = 0, facing = "towards" } = {}) {
  const D = DJ_DECKS, F = djFrame3(facing), { to, from, f, r } = F, G0 = 60, TOP = D.top, [a0, a1] = D.depth, am = (a0 + a1) / 2, W = D.width; // its own groups (60..79), apart from the house's
  const box = (c, h, mat, o = {}) => m.box(to(c), h, mat, { dir: r, up: [0, 1, 0], ...o }); // half sizes: across, up, deep
  const chase = (c, k) => FAIRY[((Math.floor((c + 9) * 22) + frame + k) % 4 + 4) % 4];
  // the desk: a panelled front with LED strips top and bottom round a crescent moon, wood sides, a dark top
  box([am, TOP / 2, 0], [W, TOP / 2, (a1 - a0) / 2], M.WOOD, { round: .02, group: G0, paint: p => {
    const [a, b, c] = from(p);
    if (b > TOP - .012) return undefined; // the top (bare wood, so the dark decks stand out on it)
    if (a < a1 - .015) return Math.abs(c) > W - .02 ? M.BARKL : undefined; // the sides
    if (b > TOP - .06 || b < .05) return Math.abs(c) > W - .03 ? M.BARKD : chase(c, b < .05 ? 2 : 0); // the LED strips
    const mc = [c - .0, b - .27], d1 = Math.hypot(mc[0], mc[1]), d2 = Math.hypot(mc[0] - .05, mc[1] - .03); // the moon: a disc less a disc
    if (d1 < .11 && d2 > .095) return M.MAGIC2;
    return Math.abs(((c + 9) * 7.5) % 1 - .5) > .46 ? M.BARK2 : undefined; // slats
  } });
  box([a1 - .01, TOP + .012, 0], [W + .015, .014, .018], M.BARKL, { round: .008, group: G0 + 1 }); // the lip along its front edge
  // the turntables
  for (const [k, side] of [[0, 1], [1, -1]]) {
    const P = D.platter, c0 = side * P.c, gk = G0 + 2 + k * 4, mark = (frame / DJ_FRAMES) * Math.PI * 2 * -side + k * 1.7; // (both turning clockwise seen from above)
    box([P.a, TOP + .01, c0], [P.r + .04, .012, P.r + .03], M.SHADES, { round: .01, group: gk });
    const pc = to([P.a, TOP + .03, c0]);
    m.ell(pc, [P.r, .008, P.r], M.BODY3, { group: gk + 1, paint: p => {
      const [a, , c] = from(p), da = a - P.a, dc = c - c0, d = Math.hypot(da, dc);
      if (d < .04) return d < .012 ? M.FRAME : k ? M.RUNE : M.COLLAR; // the label (and its spindle)
      const ang = Math.atan2(dc, da), off = Math.abs(((ang - mark) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
      if (off < .32 && d > .065 && d < P.r - .015) return M.BELLY; // the mark going round
      return Math.abs(d - .085) < .006 || Math.abs(d - .11) < .005 ? M.SHADES : undefined; // grooves
    } });
    const pivot = to([P.a - .1, TOP + .05, c0 - side * (P.r + .02)]), stylus = to([P.a + .06, TOP + .04, c0 - side * .07]);
    m.seg(pivot, stylus, .009, .007, M.FRAME, { group: gk + 2 }); m.ell(pivot, [.02, .02, .02], M.FRAME, { group: gk + 2 }); // the tonearm
    m.ell(to([P.a + P.r - .005, TOP + .03, c0 - side * (P.r + .015)]), [.014, .01, .014], (frame + k) % 4 < 2 ? (k ? M.WOKEN : M.RUNE) : M.SHADES, { group: gk + 3 }); // its start light, blinking
  }
  // the mixer: knobs at the back, two level meters, channel faders, the crossfader in front
  const X = D.mixer, gm = G0 + 12, lv = [5, 3, 4, 2, 5, 2, 4, 3][frame % 8], lv2 = [4, 5, 2, 4, 3, 5, 2, 4][frame % 8];
  box([X.a, TOP + .02, 0], [X.w, .02, .15], M.SHADES, { round: .01, group: gm, paint: p => {
    const [a, b, c] = from(p); if (b < TOP + .035) return undefined;
    for (const [cc, L] of [[.02, lv], [-.02, lv2]]) if (Math.abs(c - cc) < .009) { const n = Math.floor((.31 - a) / .016); if (n >= 0 && n < 5 && ((.31 - a) / .016) % 1 < .7) return n < L ? (n < 2 ? M.RUNE : n < 4 ? M.WOKEN : M.COLLAR) : M.BODY3; } // the meters, low to high
    return undefined;
  } });
  for (const cc of [-.06, .06]) for (const aa of [.16, .2, .24]) m.ell(to([aa, TOP + .045, cc]), [.012, .008, .012], M.FRAME, { group: gm + 1 }); // knobs
  for (const cc of [-.045, .045]) m.box(to([.34, TOP + .045, cc]), [.008, .006, .016], M.BELLY, { dir: r, up: [0, 1, 0], group: gm + 2 }); // channel faders
  m.box(to([D.fader, TOP + .045, [.03, .01, -.03, -.01][frame % 4]]), [.018, .007, .008], M.BELLY, { dir: r, up: [0, 1, 0], group: gm + 3 }); // the crossfader, riding
  return F;
}
function treehouseModel(facing = "towards") {
  const m = new Model({ blend: .04 }), lights = [];
  const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
  let G = 100; const g = () => G++;
  const S = TREEHOUSE_STOREYS;
  // ---- the giant tree: far thicker than any in the forest, gnarled, deeply furrowed, buttress roots, heavy branches ----
  const bark = p => { const a = Math.atan2(p[2], p[0]), k = Math.sin(a * 14 + p[1] * .6 + 1.5 * Math.sin(p[1] * .7 + a * 3)); return k > .5 ? M.BARKD : k > .15 ? M.BARK2 : k < -.8 ? M.BARKL : (hash(Math.floor(a * 6), Math.floor(p[1] * 2)) < .05 ? M.MOSS : undefined); };
  m.chain([[0, -.05, 0, 2.0], [.1, 1.6, -.05, 1.6], [-.1, 3.4, .05, 1.45], [.05, 4.9, -.05, 1.3], [-.08, 7.0, 0, 1.15], [.06, 8.6, -.05, 1.0], [-.04, 10.8, 0, .85], [0, 12.9, 0, .7]], M.TRUNK, { group: 1, rough: .06, paint: bark });
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + .15 + (hash(i, 7) - .5) * .3, r1 = 3.0 + hash(i, 1) * 1.1; // buttress roots, spreading wide
    m.chain([[Math.cos(a) * 1.3, 1.5, Math.sin(a) * 1.3, .7], [Math.cos(a) * 2.0, .7, Math.sin(a) * 2.0, .5], [Math.cos(a) * r1 * .75, .22, Math.sin(a) * r1 * .75, .26], [Math.cos(a + .15) * r1, .03, Math.sin(a + .15) * r1, .08]], M.TRUNK, { group: 1, rough: .04, paint: bark }); }
  const branch = pts => m.chain(pts, M.TRUNK, { group: g(), rough: .04, paint: bark });
  for (const a of [-2.7, -1.57, -.45, Math.PI + .35]) { const c = Math.cos(a), s = Math.sin(a); // heavy limbs cradling the studio's deck and reaching past it (never across its open side)
    branch([[c * 1.0, S.studio.y - .7, s * 1.0, .62], [c * 2.6, S.studio.y - .45, s * 2.6, .45], [c * 3.9, S.studio.y - .05, s * 3.9, .3], [c * 4.6, S.studio.y + .9, s * 4.6, .2], [c * 4.4, S.studio.y + 1.9, s * 4.4, .1]]); }
  for (const a of [-2.55, -.6]) { const c = Math.cos(a), s = Math.sin(a); branch([[c * 1.2, 3.0, s * 1.2, .55], [c * 3.0, 3.4, s * 3.0, .35], [c * 4.8, 4.0, s * 4.8, .18], [c * 5.6, 4.9, s * 5.6, .07]]); } // low limbs out to the sides
  for (const a of [-2.3, -1.3, -.25, Math.PI - .2, .9 + Math.PI / 2]) { const c = Math.cos(a), s = Math.sin(a); branch([[c * .8, 9.6, s * .8, .5], [c * 2.8, 10.4, s * 2.8, .32], [c * 4.8, 11.3, s * 4.8, .17], [c * 6.0, 12.1, s * 6.0, .06]]); } // up and out into the broad crown
  // ---- a round storey: deck, walls of vertical boards (with windows), a door; open: the panels left out ----
  const boards = (st, { open = false, windows = [], door = null, arch = false }) => {
    const { y, R, h } = st, n = Math.max(14, Math.round(R * 11)), gw = g();
    for (let k = 0; k < n; k++) {
      const a = (k + .5) / n * Math.PI * 2; if (open && OPEN(a)) continue;
      const c = [Math.cos(a) * R, y + h / 2, Math.sin(a) * R], w = Math.PI * R / n + .006, win = windows.find(wa => Math.abs(((a - wa + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .32), isDoor = door !== null && Math.abs(((a - door + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .2;
      m.box(c, [w, h / 2, .05], M.WOOD, { dir: [-Math.sin(a), 0, Math.cos(a)], up: [0, 1, 0], round: .01, group: gw, paint: p => {
        const t = (p[1] - y) / h, edge = Math.abs(v3.dot(v3.sub(p, c), [-Math.sin(a), 0, Math.cos(a)])) > w - .025;
        if (isDoor) return t < .78 ? (edge || t > .74 ? M.BARKL : Math.abs(t - .45) < .03 && v3.dot(v3.sub(p, c), [-Math.sin(a), 0, Math.cos(a)]) > 0 ? M.FRAME : M.BARK2) : undefined;
        if (win && t > .3 && t < (arch ? .82 + .12 * Math.cos(((a - win + Math.PI * 3) % (Math.PI * 2) - Math.PI) * 5) : .82)) return (Math.abs(t - .56) < .025 || edge) ? M.BARKL : M.GLOW; // big panes, a glazing bar across
        if (t < .04 || t > .96) return M.BARKL; // the sill and the plate
        return edge ? M.BARKD : (p[1] * 7) % 1 < .07 ? M.BARK2 : undefined; // board seams, a little grain
      } });
    }
    for (const wa of windows) lights.push({ at: [Math.cos(wa) * (R + .2), y + h * .56, Math.sin(wa) * (R + .2)], rgb: [255, 190, 96], kind: "window" });
  };
  const deck = (st, { ring = true, posts = 0, under = 0 } = {}) => {
    const { y, deck: D } = st, gd = g();
    m.ell([0, y - .05, 0], [D, .07, D], M.WOOD, { group: gd, paint: p => ((p[0] + 9) * 5.5) % 1 < .1 ? M.BARKD : Math.hypot(p[0], p[2]) > D - .14 ? M.BARKL : undefined }); // planks, a trim round the edge
    if (ring) { const gr = g(), n = Math.round(D * 9); for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, b = (k + 1) / n * Math.PI * 2; m.seg([Math.cos(a) * (D - .08), y + .5, Math.sin(a) * (D - .08)], [Math.cos(b) * (D - .08), y + .5, Math.sin(b) * (D - .08)], .025, .025, M.BARKL, { group: gr }); m.seg([Math.cos(a) * (D - .08), y, Math.sin(a) * (D - .08)], [Math.cos(a) * (D - .08), y + .5, Math.sin(a) * (D - .08)], .022, .022, M.WOOD, { group: gr }); } }
    for (let k = 0; k < posts; k++) { const a = (k + .5) / posts * Math.PI * 2, c = Math.cos(a) * (D - .3), s = Math.sin(a) * (D - .3), gp = g(); m.seg([c, 0, s], [c, y - .08, s], .09, .08, M.WOOD, { group: gp }); m.seg([c, y * .35, s], [c * .3, y - .1, s * .3], .05, .05, M.WOOD, { group: gp }); } // posts and braces
    for (let k = 0; k < under; k++) { const a = (k + .5) / under * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); m.seg([c * .5, y - .9, s * .5], [c * (D - .2), y - .1, s * (D - .2)], .06, .05, M.WOOD, { group: g() }); } // brackets under it
  };
  // a roof from radius rb at y0 rising h. Steep (h > rb): a true cone; a rounded cone's base is a ball, so the cone is
  // run on down below the eaves until its ball sits under them, and everything below the eaves is carved off.
  // Shallow: a low dome (a skirt). open: its near half cut away too. solar: panels on its camera side.
  const roof = (y0, rb, h, { tip = [0, 0], rows = 7, open = false, solar = false } = {}) => {
    const gr = g(), k = rb / h, b = [tip[0], y0 + h, tip[1]];
    const paint = p => { const t = (p[1] - y0) / h; if (solar && t < .5 && Math.abs(((Math.atan2(p[2], p[0]) - Math.PI / 2 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < .9) return ((p[0] + 9) * 9) % 1 < .14 || (t * 14) % 1 < .14 ? M.FRAME : M.BODY; return Math.floor(t * rows * 2) % 2 ? M.HAT2 : (hash(Math.floor(Math.atan2(p[2], p[0]) * 7), Math.floor(t * rows * 2)) < .12 ? M.MOSS : undefined); };
    if (k < .9) { const e = rb / (1 - k) * 1.05, ra = rb + k * e; m.seg([0, y0 - e, 0], b, ra, .03, M.HAT1, { group: gr, paint }); m.box([0, y0 - e - ra, 0], [ra + .3, e + ra, ra + .3], M.HAT1, { group: gr, cut: true }); }
    else { m.ell([0, y0, 0], [rb, h, rb], M.HAT1, { group: gr, paint }); m.box([0, y0 - h, 0], [rb + .3, h, rb + .3], M.HAT1, { group: gr, cut: true }); }
    if (open) m.box([0, y0 + h / 2, rb * 1.05], [rb + .3, h, rb * 1.05], M.HAT1, { group: gr, cut: true });
    return b;
  };
  const string = (a, b, sag, n, each) => { for (let i = 0; i <= n; i++) { const t = i / n, p = v3.lerp(a, b, t); p[1] -= Math.sin(t * Math.PI) * sag; each(p, i); } };
  const fairy = (a, b, sag, n, k0 = 0) => { const gf = g(); string(a, b, sag, n, (p, i) => m.ell(p, [.035, .035, .035], FAIRY[(i + k0) % 4], { group: gf, extra: true })); };
  // ---- the porch storey: on a braced deck on posts, big windows, the front door ----
  deck(S.porch, { posts: 6 });
  boards(S.porch, { windows: [Math.PI / 2 - .9, Math.PI / 2 + .95, Math.PI + .3, -.2], door: Math.PI / 2 + .05 });
  roof(S.porch.y + S.porch.h, S.porch.R + .3, .55, { rows: 3 });
  for (const a of [Math.PI / 2 - .55, Math.PI / 2 + .6]) { const c = [Math.cos(a) * (S.porch.deck - .12), S.porch.y, Math.sin(a) * (S.porch.deck - .12)], gl = g(); m.seg(c, v3.add(c, [0, .95, 0]), .03, .03, M.BODY3, { group: gl }); m.ell(v3.add(c, [0, 1.02, 0]), [.07, .09, .07], M.MAGIC2, { group: gl, paint: p => p[1] > c[1] + 1.08 ? M.BODY3 : undefined }); lights.push({ at: v3.add(c, [0, 1.02, 0]), rgb: [255, 220, 150], kind: "lantern" }); }
  fairy([Math.cos(.4) * (S.porch.deck - .1), S.porch.y + .55, Math.sin(.4) * (S.porch.deck - .1)], [Math.cos(2.7) * (S.porch.deck - .1), S.porch.y + .55, Math.sin(2.7) * (S.porch.deck - .1)], .12, 11, 1);
  // ---- the studio, a DJ booth: a cutaway room on a round deck ----
  const sy = S.studio.y, SR = S.studio.R;
  deck(S.studio, { ring: false, under: 7 });
  { const gr = g(), D = S.studio.deck, n = 26; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, b = (k + 1) / n * Math.PI * 2; if (!OPEN((a + b) / 2)) continue; m.seg([Math.cos(a) * (D - .08), sy + .42, Math.sin(a) * (D - .08)], [Math.cos(b) * (D - .08), sy + .42, Math.sin(b) * (D - .08)], .022, .022, M.BARKL, { group: gr }); m.seg([Math.cos(a) * (D - .08), sy, Math.sin(a) * (D - .08)], [Math.cos(a) * (D - .08), sy + .42, Math.sin(a) * (D - .08)], .018, .018, M.WOOD, { group: gr }); } } // a low railing on the open side
  boards(S.studio, { open: true, windows: [-Math.PI / 2 - .62, -Math.PI / 2 + .62] });
  roof(sy + S.studio.h, SR + .35, 1.4, { rows: 4, open: true });
  for (let k = 0; k < 7; k++) { const a = Math.PI / 2 - 1.2 + k * .4, rim = [Math.cos(a) * SR, sy + S.studio.h, Math.sin(a) * SR], apex = [0, sy + S.studio.h + 1.3, 0], gb = g(); m.seg(rim, v3.lerp(rim, apex, .6), .045, .04, M.BARKL, { group: gb }); if (k % 2 === 0) fairy(v3.add(rim, [0, -.06, 0]), v3.add(v3.lerp(rim, apex, .58), [0, -.06, 0]), .05, 6, k); } // the bare rafters (meeting the trunk), fairy lights along them
  fairy([Math.cos(Math.PI / 2 - 1.2) * SR, sy + S.studio.h - .08, Math.sin(Math.PI / 2 - 1.2) * SR], [Math.cos(Math.PI / 2 + 1.2) * SR, sy + S.studio.h - .08, Math.sin(Math.PI / 2 + 1.2) * SR], .4, 16, 2); // and across the open front
  m.ell([0, sy + .02, 1.75], [1.65, .012, .95], M.CLOTH, { group: g(), paint: p => { const r = Math.hypot(p[0] / 1.65, (p[2] - 1.75) / .95); return r > .86 ? M.BODY2 : Math.abs(r - .55) < .07 || Math.abs(r - .25) < .05 ? M.ACCENT : undefined; } }); // the patterned rug
  m.ell([1.35, sy + .015, -1.55], [.75, .008, .5], M.STRAW, { group: g() }); // warm light pooling on the floor under the window
  { const a = -Math.PI / 2 - 1.05, c = [Math.cos(a) * (SR - .25), sy, Math.sin(a) * (SR - .25)], d = [-Math.sin(a), 0, Math.cos(a)], gs = g(); m.box(v3.add(c, [0, .75, 0]), [.6, .75, .17], M.WOOD, { dir: d, round: .02, group: gs, paint: p => { const t = (p[1] - sy) / 1.5; if ((t * 4) % 1 < .1) return M.BARKL; const u = Math.floor(v3.dot(v3.sub(p, c), d) * 28); return [M.ACCENT, M.CLOTH, M.BODY2, M.EAR, M.SHADES][(u * 7 + Math.floor(t * 4) * 3) % 5]; } }); } // a wall of records
  { const c = [-2.15, sy, .55], gs = g(); for (const dx of [-.3, .3]) m.seg(v3.add(c, [dx, 0, .12]), v3.add(c, [-dx * .2, .6, 0]), .02, .02, M.FRAME, { group: gs }); m.box(v3.add(c, [0, .64, 0]), [.42, .04, .15], M.SHADES, { dir: [Math.cos(-.9), 0, Math.sin(-.9)], round: .01, group: gs, paint: p => (((p[0] + p[2] + 9) * 9) % 1 < .3 ? M.RUNE : ((p[0] + 9) * 26) % 1 < .4 ? M.SHADES : M.BELLY) }); } // a synth on an X stand
  { const c = [2.15, sy, -1.65], gk = g(), d = [Math.cos(-2.4), 0, Math.sin(-2.4)], f = v3.norm([-d[2], 0, d[0]]); m.box(v3.add(c, [0, .45, 0]), [.36, .45, .32], M.SHADES, { dir: d, round: .03, group: gk }); m.box(v3.add(c, [0, 1.15, 0]), [.26, .25, .24], M.SHADES, { dir: d, round: .03, group: gk }); for (const [dy, r, o] of [[.45, .27, .33], [1.15, .15, .25]]) { const cc = v3.add(v3.add(c, [0, dy, 0]), v3.mul(f, o)); m.ell(cc, [r, r, .03], M.BODY3, { dir: f, up: [0, 1, 0], group: gk, paint: p => Math.hypot(...v3.sub(p, cc)) < r * .4 ? M.MAGIC : M.BODY3 }); } } // a speaker stack in the corner
  for (const x of [-1.2, 1.25]) { const c = [x, sy, 2.25], gm = g(); m.seg(c, v3.add(c, [0, .8, 0]), .025, .025, M.BODY3, { group: gm }); m.box(v3.add(c, [0, 1.0, 0]), [.15, .2, .14], M.SHADES, { dir: [x < 0 ? .95 : -.95, 0, -.3], round: .02, group: gm }); } // monitors on stands either side of the decks
  for (const [x, z] of [[-1.75, 1.75], [1.75, 2.0]]) { const c = [x, sy, z], gc = g(); m.box(v3.add(c, [0, .17, 0]), [.27, .17, .2], M.WOOD, { round: .015, group: gc, paint: p => p[1] > sy + .3 ? M.BARKL : undefined }); for (let k = 0; k < 6; k++) m.box(v3.add(c, [-.2 + k * .08, .3 + hash(k, x) * .04, 0]), [.012, .16, .16], [M.ACCENT, M.CLOTH, M.BODY2, M.EAR][k % 4], { round: .005, group: gc }); } // record crates, the sleeves showing
  const dj = djTable(m, { facing });
  const stool = DJ_STAND, gst = g(); m.ell(v3.add(stool, [0, WITCH_SEAT_HEIGHT - .03, 0]), [.2, .04, .2], M.CLOTH, { group: gst }); for (let k = 0; k < 3; k++) { const a = k / 3 * Math.PI * 2; m.seg(v3.add(stool, [Math.cos(a) * .14, 0, Math.sin(a) * .14]), v3.add(stool, [0, WITCH_SEAT_HEIGHT - .05, 0]), .02, .02, M.FRAME, { group: gst }); } // her stool, behind the decks
  for (const [a, y, k] of [[-Math.PI / 2 - 1.55, 1.1, 0], [-Math.PI / 2 + 1.5, 1.2, 1], [-Math.PI / 2 + .1, 1.55, 2], [Math.PI + .55, 1.0, 3]]) { const c = [Math.cos(a) * (SR - .07), sy + y, Math.sin(a) * (SR - .07)], d = [-Math.sin(a), 0, Math.cos(a)]; m.box(c, [.17, .23, .01], [M.ACCENT, M.CLOTH, M.BODY2, M.EAR][k], { dir: d, up: [0, 1, 0], round: .005, group: g(), paint: p => { const u = v3.dot(v3.sub(p, c), d) / .17, v = (p[1] - c[1]) / .23; return Math.hypot(u, v - .2) < .45 ? [M.BODY2, M.ACCENT, M.CLOTH, M.ACCENT][k] : v < -.55 && Math.abs(u) < .7 && ((u + 2) * 6) % 1 < .5 ? M.SHADES : undefined; } }); } // party flyers on the walls
  { const gl = g(), top = [0, sy + S.studio.h + .6, 1.0], bulb = [0, sy + 1.6, 1.0]; m.seg(top, v3.add(bulb, [0, .16, 0]), .008, .008, M.BODY3, { group: gl }); m.seg(v3.add(bulb, [0, .17, 0]), v3.add(bulb, [0, .02, 0]), .03, .16, M.BODY3, { group: gl }); m.ell(bulb, [.07, .06, .07], M.MAGIC2, { group: gl }); } // a pendant lamp over the decks
  { const gl = g(), f = [-1.6, sy, -1.7]; m.seg(f, v3.add(f, [0, 1.25, 0]), .02, .02, M.BODY3, { group: gl }); m.seg(v3.add(f, [0, 1.25, 0]), v3.add(f, [0, 1.05, 0]), .04, .14, M.STRAW, { group: gl }); m.ell(v3.add(f, [0, 1.1, 0]), [.06, .05, .06], M.MAGIC2, { group: gl }); } // a floor lamp
  lights.push({ at: [0, sy + 1.55, 1.0], rgb: [255, 214, 150], kind: "studio lamp" }, { at: [-1.6, sy + 1.1, -1.7], rgb: [255, 200, 130], kind: "studio lamp" });
  lights.push({ at: [0, sy + 1.6, .7], rgb: [255, 200, 120], kind: "studio" }, { at: [Math.cos(-Math.PI / 2 + .62) * SR, sy + 1.2, Math.sin(-Math.PI / 2 + .62) * SR], rgb: [255, 190, 96], kind: "studio window" }, { at: [-.6, sy + S.studio.h - .1, 1.6], rgb: [255, 120, 220], kind: "fairy lights" });
  for (const [c, rgb] of [[DJ_DECKS.platter.c, [255, 80, 200]], [0, [255, 214, 80]], [-DJ_DECKS.platter.c, [80, 230, 255]]]) lights.push({ at: dj.to([DJ_DECKS.depth[1] + .35, DJ_DECKS.top * .5, c]), rgb, kind: "decks" }); // the decks' LEDs, lighting the booth's front (out in front of it, not on her), for the game to pulse
  { const gl = g(), D = S.studio.deck, n = 40; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; m.ell([Math.cos(a) * (D - .05), sy - .16, Math.sin(a) * (D - .05)], [.05, .035, .05], FAIRY[k % 4], { group: gl, extra: true }); } lights.push({ at: [0, sy - .2, S.studio.deck], rgb: [80, 230, 255], kind: "LED strip" }); } // an LED strip under the deck's edge
  // ---- the loft: a smaller storey, a loudspeaker on its balcony, solar panels on its roof ----
  deck(S.loft, { under: 5 });
  boards(S.loft, { windows: [Math.PI / 2 - .5, Math.PI / 2 + .55, -.4, Math.PI + .4], door: Math.PI / 2 + 1.25 });
  roof(S.loft.y + S.loft.h, S.loft.R + .45, .75, { rows: 3, solar: true });
  { const a = Math.PI / 2 - 1.15, c = [Math.cos(a) * (S.loft.deck - .35), S.loft.y, Math.sin(a) * (S.loft.deck - .35)], gk = g(), f = [Math.cos(a), 0, Math.sin(a)]; m.box(v3.add(c, [0, .35, 0]), [.2, .35, .2], M.SHADES, { dir: [-f[2], 0, f[0]], round: .03, group: gk }); const cc = v3.add(c, v3.add([0, .38, 0], v3.mul(f, .2))); m.ell(cc, [.15, .15, .03], M.BODY3, { dir: [-f[2], 0, f[0]], up: [0, 1, 0], group: gk, paint: p => Math.hypot(...v3.sub(p, cc)) < .06 ? M.MAGIC : undefined }); } // a loudspeaker pointing out over the forest
  fairy([Math.cos(.2) * (S.loft.deck - .1), S.loft.y + .5, Math.sin(.2) * (S.loft.deck - .1)], [Math.cos(2.9) * (S.loft.deck - .1), S.loft.y + .5, Math.sin(2.9) * (S.loft.deck - .1)], .1, 9, 3);
  // ---- the crown: leafy clumps round the loft, mostly behind and to the sides ----
  const leafy = c => p => { const n = hash(Math.floor(p[0] * 7), Math.floor(p[1] * 7) + Math.floor(p[2] * 7) * 7); return p[1] < c[1] - .3 || n < .18 ? M.LEAF3 : n > .82 ? M.LEAF2 : undefined; };
  const crown = [];
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + .1, front = Math.sin(a) > .35, rr = (front ? 4.6 : 3.4) + hash(k, 3) * (front ? 1.6 : 2.6), y = (front ? 11.2 : 9.8) + hash(k, 5) * 1.8; if (front && Math.abs(Math.cos(a)) < .55) continue; crown.push([[Math.cos(a) * rr, y, Math.sin(a) * rr * (front ? .8 : 1)], [1.5 + hash(k, 9) * .7, .95 + hash(k, 2) * .35, 1.25 + hash(k, 4) * .4]]); } // a broad ring, low behind and to the sides, open in front so the loft shows
  for (const [c, r] of [[[0, 11.8, -2.6], [2.4, 1.2, 1.5]], [[-1.6, 12.4, -1.4], [1.6, 1.0, 1.1]], [[1.7, 12.5, -1.3], [1.6, 1.0, 1.1]], [[0, 10.2, -3.4], [2.0, 1.1, 1.2]]]) crown.push([c, r]);
  for (const [c, r] of crown) m.ell(c, r, M.LEAF, { group: 40, rough: .07, paint: leafy(c) });
  const crownR = Math.max(...crown.map(([c, r]) => Math.hypot(c[0], c[2]) + Math.max(r[0], r[2])));
  // ---- the tower above the treeline: shingled walls, pointed-arch windows, a balcony, the witch's-hat roof ----
  const ty = S.tower.y, TR = S.tower.R;
  deck(S.tower, { under: 4 });
  boards(S.tower, { windows: [Math.PI / 2 - .45, Math.PI / 2 + .5, -.6, Math.PI + .6, -Math.PI / 2], arch: true });
  const tip = roof(ty + S.tower.h, TR + .38, 3.3, { rows: 9, tip: [0, 0] });
  { const gt = g(), base = v3.add(tip, [0, -.55, 0]); m.chain([[...base, .14], [...v3.add(tip, [-.25, .25, .05]), .06], [...v3.add(tip, [-.6, .3, .1]), .02]], M.HAT1, { group: gt, paint: p => p[1] < base[1] + .15 ? M.HAT2 : undefined }); } // the tip, bent like a witch's hat
  { const gf = g(), f0 = v3.add(tip, [-.05, -.3, 0]), f1 = v3.add(f0, [0, 1.0, 0]); m.seg(f0, f1, .02, .015, M.FRAME, { group: gf }); for (const k of [.45, .65, .85]) m.seg(v3.lerp(f0, f1, k), v3.add(v3.lerp(f0, f1, k), [.14, 0, 0]), .008, .008, M.FRAME, { group: gf }); m.box(v3.add(f1, [.2, -.12, 0]), [.18, .07, .01], M.ACCENT, { dir: [1, -.15, .1], round: .005, group: gf }); m.ell(f1, [.04, .04, .04], M.WOKEN, { group: gf }); lights.push({ at: f1, rgb: [255, 214, 80], kind: "aerial light" }); } // an antenna, a pennant, a little light on top
  { const a = Math.PI / 2 + 1.0, c = [Math.cos(a) * (S.tower.deck - .25), ty, Math.sin(a) * (S.tower.deck - .25)], gs = g(); m.seg(c, v3.add(c, [0, .55, 0]), .025, .025, M.FRAME, { group: gs }); const dc = v3.add(c, [0, .65, 0]); m.ell(dc, [.26, .26, .06], M.FRAME, { dir: v3.norm([Math.cos(a), .9, Math.sin(a)]), group: gs, paint: p => Math.hypot(...v3.sub(p, dc)) < .05 ? M.BODY3 : undefined }); m.seg(dc, v3.add(dc, v3.mul(v3.norm([Math.cos(a), .9, Math.sin(a)]), .3)), .012, .01, M.BODY3, { group: gs }); } // a satellite dish
  fairy([Math.cos(.3) * (S.tower.deck - .1), ty + .5, Math.sin(.3) * (S.tower.deck - .1)], [Math.cos(2.8) * (S.tower.deck - .1), ty + .5, Math.sin(2.8) * (S.tower.deck - .1)], .08, 8, 0);
  // ---- the spiral stair: dark iron, from the ground up to the studio's deck ----
  { const sc = [3.25, 0, 2.3], gs = g(), r = .62, top = sy, n = 28; m.seg(sc, v3.add(sc, [0, top + .9, 0]), .05, .05, M.BODY3, { group: gs });
    const rail = []; for (let k = 0; k <= n; k++) { const t = k / n, a = t * Math.PI * 3.2 + 2.2, y = .2 + (top - .2) * t, q = [sc[0] + Math.cos(a) * r, y, sc[2] + Math.sin(a) * r]; m.box(v3.lerp(v3.add(sc, [0, y, 0]), q, .5), [r / 2 + .02, .025, .11], M.BODY3, { dir: [Math.cos(a), 0, Math.sin(a)], round: .01, group: gs }); rail.push([...v3.add(q, [0, .55, 0]), .018]); }
    m.chain(rail, M.BODY3, { group: g() }); }
  for (const [a, y0, y1] of [[Math.PI / 2 + 1.55, S.studio.y, S.loft.y], [Math.PI / 2 + 1.45, S.loft.y, S.tower.y]]) { const gl = g(), D = y0 < 6 ? 2.6 : 2.05; for (const off of [-.18, .18]) { const b = a + off / D; m.seg([Math.cos(b) * D, y0, Math.sin(b) * D], [Math.cos(b) * D, y1, Math.sin(b) * D], .025, .025, M.WOOD, { group: gl }); } for (let y = y0 + .3; y < y1; y += .32) m.seg([Math.cos(a - .18 / D) * D, y, Math.sin(a - .18 / D) * D], [Math.cos(a + .18 / D) * D, y, Math.sin(a + .18 / D) * D], .02, .02, M.WOOD, { group: gl }); } // ladders up the outside
  m.ell([0, .005, 0], [4.6, .005, 3.6], M.NOSE, { group: 0 }); // its shadow on the ground
  return { m, lights, dj, seat: stool, door: [Math.cos(Math.PI / 2 + .05) * S.porch.R, S.porch.y, Math.sin(Math.PI / 2 + .05) * (S.porch.R + .05)], camera: [0, sy + .95, 1.9], splitY: sy + S.studio.h + 1.5, footprint: 4.3, crownR, trunkR: 1.55 }; // trunkR: its radius 3 m up
}

// The treehouse at the witch's scale: { whole, top, bot, fore, crownY, anchors: { base, seat, door, camera, lights: [{ x, y, rgb, kind }] }, metres }.
// base: the trunk's foot on the ground (place the treehouse by it); seat: where her sit pose's anchor goes (the studio's floor under her
// stool); door: the porch's front door; camera: the studio's middle, near her seat (to frame for the opening zoom); lights: its light sources.
// top is the crown and everything above the studio's roof (the loft and the tower over the treeline: drawn in treetop mode, cut out round
// the witch); bot the rest. metres: height and width; towerFloor and roofTip (the top storey's floor and the roof's tip, above the ground);
// footprint (the radius it takes on the ground round the trunk: roots, posts and the stair) and overhang (its widest deck's radius);
// trunk (the giant tree's diameter 3 m up) and crown (its crown's radius). fore: the DJ table alone, at the same size and origin
// as whole, for the game to draw over the witch sitting behind it.
export function treehouseSprite(st = {}, { facing = "towards", ppm = 16 } = {}) {
  const T = treehouseModel(facing), ppu = witchPixelsPerUnit(st), r = render(T.m, { scale: ppu, facing }), full = r.sp, um = u => +(u * ppu / ppm).toFixed(1); // model units to metres
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
  // fore: the DJ table alone, where it shows in the whole sprite (same size and origin), for the game to draw over her; and
  // foreFrames, its DJ_FRAMES turns cropped to the box they share (foreBox: its top-left in the whole sprite's pixels)
  const P0 = T.dj.to([DJ_DECKS.platter.a, DJ_DECKS.top, 0]), [ax, ay] = r.project(P0), frames = [];
  for (let k = 0; k < DJ_FRAMES; k++) {
    const fm = new Model({ blend: .04 }); djTable(fm, { frame: k, facing }); const rf = render(fm, { scale: ppu, facing }), [bx, by] = rf.project(P0), fs = new Sprite(sp.w, sp.h);
    for (let y = 0; y < rf.sp.h; y++) for (let x = 0; x < rf.sp.w; x++) { const i = y * rf.sp.w + x, mm = rf.sp.m[i]; if (!mm) continue; const X = Math.round(x + ax - bx - x0), Y = Math.round(y + ay - by - y0); if (X < 0 || Y < 0 || X >= sp.w || Y >= sp.h) continue; fs.put(X, Y, mm, rf.sp.n[i * 3], rf.sp.n[i * 3 + 1], rf.sp.n[i * 3 + 2]); }
    frames.push(fs);
  }
  const fore = frames[0]; let fx0 = sp.w, fx1 = -1, fy0 = sp.h, fy1 = -1;
  for (const fs of frames) for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (fs.m[y * sp.w + x]) { fx0 = Math.min(fx0, x); fx1 = Math.max(fx1, x); fy0 = Math.min(fy0, y); fy1 = Math.max(fy1, y); }
  const foreFrames = frames.map(fs => { const c = new Sprite(fx1 - fx0 + 1, fy1 - fy0 + 1); for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) { const i = (y + fy0) * sp.w + x + fx0; if (fs.m[i]) c.put(x, y, fs.m[i], fs.n[i * 3], fs.n[i * 3 + 1], fs.n[i * 3 + 2]); } return c; });
  const S = TREEHOUSE_STOREYS;
  return { whole: sp, top, bot, fore, foreFrames, foreBox: { x: fx0, y: fy0 }, crownY, anchors: { base: at([0, 0, 0]), seat: at(T.seat), door: at(T.door), camera: at(T.camera), lights: T.lights.map(L => ({ ...at(L.at), rgb: L.rgb, kind: L.kind })) },
    metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1), towerFloor: um(S.tower.y), roofTip: um(S.tower.y + S.tower.h + 3.3 + .3), footprint: um(T.footprint), overhang: um(S.studio.deck), trunk: um(T.trunkR * 2), crown: um(T.crownR) } };
}

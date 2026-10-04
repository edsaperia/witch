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
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit, WITCH_SEAT_HEIGHT } from "./witch.js";

// Its parts' materials. Wood: WOOD boards with BARKD seams, BARKL trim; shingles HAT1/HAT2; dark iron BODY3 (the
// stair), steel FRAME; solar cells BODY; the rug CLOTH with BODY2 pattern and ACCENT; piano and speakers SHADES with
// BELLY keys. The windows glow warm (GLOW, brightest MAGIC2); fairy lights and the LED strip are party neons
// (COLLAR pink, RUNE cyan, WOKEN gold, MAGIC violet).
const LEAVES = new Set([M.LEAF, M.LEAF2, M.LEAF3]);
export function treehouseColours(st = {}) {
  const leaf = st.leafHue ?? .3;
  return {
    [M.TRUNK]: [92, 66, 48], [M.BARK2]: [70, 50, 38], [M.BARKD]: [52, 36, 28], [M.BARKL]: [176, 128, 80],
    [M.LEAF]: hsv2rgb(leaf, .55, .42), [M.LEAF2]: hsv2rgb(leaf + .02, .5, .55), [M.LEAF3]: hsv2rgb(leaf + .04, .6, .26),
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
  porch: { y: 1.7, R: 1.45, h: 1.6, deck: 2.3 },
  studio: { y: 4.9, R: 2.2, h: 2.0, deck: 2.9 },
  loft: { y: 8.6, R: 1.35, h: 1.5, deck: 2.0 },
  tower: { y: 12.9, R: 1.2, h: 1.75, deck: 1.75 },
};
const FAIRY = [M.COLLAR, M.RUNE, M.WOKEN, M.MAGIC];
const OPEN = a => Math.abs(((a - Math.PI / 2 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < 1.35; // the studio's open side: round +z, towards the camera
function treehouseModel() {
  const m = new Model({ blend: .04 }), lights = [];
  const hash = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
  let G = 100; const g = () => G++;
  const S = TREEHOUSE_STOREYS;
  // ---- the tree: a giant trunk up through the storeys, roots, branches ----
  const bark = p => { const k = Math.sin(Math.atan2(p[2], p[0]) * 9 + p[1] * 2.3); return k > .75 ? M.BARKD : k < -.6 ? M.BARKL : k > .35 ? M.BARK2 : undefined; };
  m.chain([[0, -.05, 0, .8], [.05, 2.5, -.05, .66], [-.05, 5.5, 0, .58], [.05, 9, -.05, .5], [0, 12.9, 0, .42]], M.TRUNK, { group: 1, rough: .03, paint: bark });
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + .2, r1 = 1.5 + hash(i, 1) * .6;
    m.chain([[Math.cos(a) * .55, .55, Math.sin(a) * .55, .26], [Math.cos(a) * r1 * .55, .18, Math.sin(a) * r1 * .55, .16], [Math.cos(a) * r1, .02, Math.sin(a) * r1, .06]], M.TRUNK, { group: 1, rough: .02, paint: bark }); }
  const branch = pts => m.chain(pts, M.TRUNK, { group: g(), rough: .02, paint: bark });
  for (const a of [-2.6, -1.57, -.5, .3 + Math.PI]) { const c = Math.cos(a), s = Math.sin(a); // curling up round the studio's deck (not on its open side)
    branch([[c * .4, S.studio.y - .5, s * .4, .3], [c * 1.8, S.studio.y - .35, s * 1.8, .2], [c * 3.0, S.studio.y + .1, s * 3.0, .13], [c * 3.35, S.studio.y + .9, s * 3.35, .08], [c * 3.1, S.studio.y + 1.5, s * 3.1, .04]]); }
  for (const a of [-2.2, -1, -.1, Math.PI - .3]) { const c = Math.cos(a), s = Math.sin(a); branch([[c * .3, 10.2, s * .3, .24], [c * 1.9, 10.9, s * 1.9, .14], [c * 3.2, 11.7, s * 3.2, .07]]); } // up into the crown
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
  // ---- the studio: a cutaway room on a round deck ----
  const sy = S.studio.y, SR = S.studio.R;
  deck(S.studio, { ring: false, under: 6 });
  { const gr = g(), D = S.studio.deck, n = 22; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, b = (k + 1) / n * Math.PI * 2; if (!OPEN((a + b) / 2)) continue; m.seg([Math.cos(a) * (D - .08), sy + .42, Math.sin(a) * (D - .08)], [Math.cos(b) * (D - .08), sy + .42, Math.sin(b) * (D - .08)], .022, .022, M.BARKL, { group: gr }); m.seg([Math.cos(a) * (D - .08), sy, Math.sin(a) * (D - .08)], [Math.cos(a) * (D - .08), sy + .42, Math.sin(a) * (D - .08)], .018, .018, M.WOOD, { group: gr }); } } // a low railing on the open side
  boards(S.studio, { open: true, windows: [-Math.PI / 2 - .55, -Math.PI / 2 + .55] });
  roof(sy + S.studio.h, SR + .35, 1.2, { rows: 4, open: true });
  for (let k = 0; k < 7; k++) { const a = Math.PI / 2 - 1.2 + k * .4, rim = [Math.cos(a) * SR, sy + S.studio.h, Math.sin(a) * SR], apex = [0, sy + S.studio.h + 1.1, 0], gb = g(); m.seg(rim, v3.lerp(rim, apex, .85), .04, .035, M.BARKL, { group: gb }); if (k % 2 === 0) fairy(v3.add(rim, [0, -.06, 0]), v3.add(v3.lerp(rim, apex, .8), [0, -.06, 0]), .05, 6, k); } // the bare rafters, fairy lights along them
  fairy([Math.cos(Math.PI / 2 - 1.2) * SR, sy + S.studio.h - .08, Math.sin(Math.PI / 2 - 1.2) * SR], [Math.cos(Math.PI / 2 + 1.2) * SR, sy + S.studio.h - .08, Math.sin(Math.PI / 2 + 1.2) * SR], .35, 14, 2); // and across the open front
  m.ell([0, sy + .02, .55], [1.5, .012, 1.05], M.CLOTH, { group: g(), paint: p => { const r = Math.hypot((p[0]) / 1.5, (p[2] - .55) / 1.05); return r > .86 ? M.BODY2 : Math.abs(r - .55) < .07 || Math.abs(r - .25) < .05 ? M.ACCENT : undefined; } }); // the patterned rug
  { const c = [-1.35, sy, -1.0], gp = g(); m.box(v3.add(c, [0, .55, 0]), [.55, .55, .28], M.SHADES, { dir: [Math.cos(.6), 0, Math.sin(.6)], round: .03, group: gp }); m.box(v3.add(c, [.13, .72, .2]), [.5, .04, .1], M.BELLY, { dir: [Math.cos(.6), 0, Math.sin(.6)], round: .01, group: gp, paint: p => (((p[0] + p[2]) * 30) % 1) < .3 ? M.SHADES : undefined }); m.box(v3.add(c, [-.05, 1.2, -.05]), [.25, .12, .015], M.BELLY, { dir: [Math.cos(.6), 0, Math.sin(.6)], up: [0, 1, -.2], round: .005, group: gp }); } // the upright piano, its keys, sheet music on its stand
  { const c = [-1.0, sy, .7], gs = g(); for (const dx of [-.35, .35]) m.seg(v3.add(c, [dx, 0, .15]), v3.add(c, [-dx * .2, .62, 0]), .02, .02, M.FRAME, { group: gs }); m.box(v3.add(c, [0, .66, 0]), [.5, .04, .16], M.SHADES, { round: .01, group: gs, paint: p => p[2] > c[2] + .04 ? (((p[0] + 9) * 28) % 1 < .35 ? M.SHADES : M.BELLY) : (((p[0] + 9) * 9) % 1 < .3 ? M.RUNE : undefined) }); } // a synth on an X stand, knobs lit
  { const c = [.1, sy, 1.15], gm = g(); m.box(v3.add(c, [0, .05, 0]), [.32, .05, .22], M.SHADES, { round: .02, group: gm, paint: p => { const u = Math.floor((p[0] - c[0] + .32) * 11), v = Math.floor((p[2] - c[2] + .22) * 11); return p[1] > c[1] + .085 && (u + v) % 2 === 0 ? FAIRY[(u + 2 * v) % 4] : undefined; } }); } // a groovebox on the floor, pads lit in the party's colours
  for (const [x, z, rot] of [[1.45, -.8, -.6], [1.75, .1, -1.2]]) { const c = [x, sy, z], gk = g(), d = [Math.cos(rot), 0, Math.sin(rot)]; // the speaker stacks (studio monitors over a bass cab)
    m.box(v3.add(c, [0, .42, 0]), [.32, .42, .3], M.SHADES, { dir: d, round: .03, group: gk }); m.box(v3.add(c, [0, 1.06, 0]), [.22, .22, .2], M.SHADES, { dir: d, round: .03, group: gk });
    const f = v3.norm([-d[2], 0, d[0]]); /* its front, facing into the room */ for (const [dy, r] of [[.42, .24], [1.06, .13]]) { const cc = v3.add(v3.add(c, [0, dy, 0]), v3.mul(f, .3 - (dy > 1 ? .1 : 0))); m.ell(cc, [r, r, .03], M.FRAME, { dir: f, up: [0, 1, 0], group: gk, paint: p => Math.hypot(...v3.sub(p, cc)) < r * .4 ? M.MAGIC : M.BODY3 }); } }
  const stool = [.65, sy, .75], gst = g(); m.ell(v3.add(stool, [0, WITCH_SEAT_HEIGHT - .03, 0]), [.2, .04, .2], M.CLOTH, { group: gst }); for (let k = 0; k < 3; k++) { const a = k / 3 * Math.PI * 2; m.seg(v3.add(stool, [Math.cos(a) * .14, 0, Math.sin(a) * .14]), v3.add(stool, [0, WITCH_SEAT_HEIGHT - .05, 0]), .02, .02, M.FRAME, { group: gst }); } // her stool
  for (const [a, y] of [[-Math.PI / 2 - 1.2, .8], [-Math.PI / 2 + 1.25, 1.2], [Math.PI + .9, 1.0]]) m.box([Math.cos(a) * (SR - .07), sy + y, Math.sin(a) * (SR - .07)], [.12, .16, .01], M.BELLY, { dir: [-Math.sin(a), 0, Math.cos(a)], up: [0, 1, 0], round: .005, group: g(), paint: p => ((p[1] * 40) % 1) < .2 ? M.SHADES : undefined }); // sheet music pinned to the walls
  { const gl = g(), top = [.15, sy + S.studio.h + .5, .55], bulb = [.15, sy + 1.55, .55]; m.seg(top, v3.add(bulb, [0, .16, 0]), .008, .008, M.BODY3, { group: gl }); m.seg(v3.add(bulb, [0, .17, 0]), v3.add(bulb, [0, .02, 0]), .03, .16, M.BODY3, { group: gl }); m.ell(bulb, [.07, .06, .07], M.MAGIC2, { group: gl }); } // a pendant lamp over her
  { const gl = g(), f = [-.55, sy, -1.45]; m.seg(f, v3.add(f, [0, 1.25, 0]), .02, .02, M.BODY3, { group: gl }); m.seg(v3.add(f, [0, 1.25, 0]), v3.add(f, [0, 1.05, 0]), .04, .14, M.STRAW, { group: gl }); m.ell(v3.add(f, [0, 1.1, 0]), [.06, .05, .06], M.MAGIC2, { group: gl }); } // a floor lamp by the piano
  lights.push({ at: [.15, sy + 1.5, .55], rgb: [255, 214, 150], kind: "studio lamp" }, { at: [-.55, sy + 1.1, -1.45], rgb: [255, 200, 130], kind: "studio lamp" });
  lights.push({ at: [0, sy + 1.0, .4], rgb: [255, 200, 120], kind: "studio" }, { at: [0, sy + 1.2, -SR], rgb: [255, 190, 96], kind: "studio window" }, { at: [-.6, sy + S.studio.h - .1, .9], rgb: [255, 120, 220], kind: "fairy lights" });
  { const gl = g(), D = S.studio.deck, n = 34; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; m.ell([Math.cos(a) * (D - .05), sy - .16, Math.sin(a) * (D - .05)], [.05, .035, .05], FAIRY[k % 4], { group: gl, extra: true }); } lights.push({ at: [0, sy - .2, S.studio.deck], rgb: [80, 230, 255], kind: "LED strip" }); } // an LED strip under the deck's edge
  // ---- the loft: a smaller storey, a loudspeaker on its balcony, solar panels on its roof ----
  deck(S.loft, { under: 5 });
  boards(S.loft, { windows: [Math.PI / 2 - .5, Math.PI / 2 + .55, -.4, Math.PI + .4], door: Math.PI / 2 + 1.25 });
  roof(S.loft.y + S.loft.h, S.loft.R + .45, .75, { rows: 3, solar: true });
  { const a = Math.PI / 2 - 1.15, c = [Math.cos(a) * (S.loft.deck - .35), S.loft.y, Math.sin(a) * (S.loft.deck - .35)], gk = g(), f = [Math.cos(a), 0, Math.sin(a)]; m.box(v3.add(c, [0, .35, 0]), [.2, .35, .2], M.SHADES, { dir: [-f[2], 0, f[0]], round: .03, group: gk }); const cc = v3.add(c, v3.add([0, .38, 0], v3.mul(f, .2))); m.ell(cc, [.15, .15, .03], M.BODY3, { dir: [-f[2], 0, f[0]], up: [0, 1, 0], group: gk, paint: p => Math.hypot(...v3.sub(p, cc)) < .06 ? M.MAGIC : undefined }); } // a loudspeaker pointing out over the forest
  fairy([Math.cos(.2) * (S.loft.deck - .1), S.loft.y + .5, Math.sin(.2) * (S.loft.deck - .1)], [Math.cos(2.9) * (S.loft.deck - .1), S.loft.y + .5, Math.sin(2.9) * (S.loft.deck - .1)], .1, 9, 3);
  // ---- the crown: leafy clumps round the loft, mostly behind and to the sides ----
  const leafy = c => p => { const n = hash(Math.floor(p[0] * 7), Math.floor(p[1] * 7) + Math.floor(p[2] * 7) * 7); return p[1] < c[1] - .3 || n < .18 ? M.LEAF3 : n > .82 ? M.LEAF2 : undefined; };
  for (const [c, r] of [[[-2.9, 10.6, -1.2], [1.5, 1.0, 1.2]], [[2.9, 10.7, -1.0], [1.5, 1.0, 1.2]], [[0, 11.5, -2.4], [2.2, 1.2, 1.4]], [[-2.2, 12.0, -.2], [1.3, .9, 1.1]], [[2.3, 12.1, .1], [1.3, .9, 1.1]], [[-3.6, 9.7, .6], [1.0, .75, .9]], [[3.6, 9.8, .7], [1.0, .75, .9]], [[-1.3, 11.9, -1.6], [1.4, 1.0, 1.0]], [[1.4, 12.0, -1.5], [1.4, 1.0, 1.0]], [[0, 9.6, -2.6], [1.6, 1.0, 1.0]]])
    m.ell(c, r, M.LEAF, { group: 40, rough: .06, paint: leafy(c) });
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
  { const sc = [2.65, 0, 1.75], gs = g(), r = .62, top = sy, n = 26; m.seg(sc, v3.add(sc, [0, top + .9, 0]), .05, .05, M.BODY3, { group: gs });
    const rail = []; for (let k = 0; k <= n; k++) { const t = k / n, a = t * Math.PI * 3.2 + 2.2, y = .2 + (top - .2) * t, q = [sc[0] + Math.cos(a) * r, y, sc[2] + Math.sin(a) * r]; m.box(v3.lerp(v3.add(sc, [0, y, 0]), q, .5), [r / 2 + .02, .025, .11], M.BODY3, { dir: [Math.cos(a), 0, Math.sin(a)], round: .01, group: gs }); rail.push([...v3.add(q, [0, .55, 0]), .018]); }
    m.chain(rail, M.BODY3, { group: g() }); }
  for (const [a, y0, y1] of [[Math.PI / 2 + 1.55, S.studio.y, S.loft.y], [Math.PI / 2 + 1.45, S.loft.y, S.tower.y]]) { const gl = g(), D = 1.9; for (const off of [-.18, .18]) { const b = a + off / D; m.seg([Math.cos(b) * D, y0, Math.sin(b) * D], [Math.cos(b) * D, y1, Math.sin(b) * D], .025, .025, M.WOOD, { group: gl }); } for (let y = y0 + .3; y < y1; y += .32) m.seg([Math.cos(a - .18 / D) * D, y, Math.sin(a - .18 / D) * D], [Math.cos(a + .18 / D) * D, y, Math.sin(a + .18 / D) * D], .02, .02, M.WOOD, { group: gl }); } // ladders up the outside
  m.ell([0, .005, 0], [3.2, .005, 2.4], M.NOSE, { group: 0 }); // its shadow on the ground
  return { m, lights, seat: stool, door: [Math.cos(Math.PI / 2 + .05) * S.porch.R, S.porch.y, Math.sin(Math.PI / 2 + .05) * (S.porch.R + .05)], camera: [.2, sy + .9, .55], splitY: sy + S.studio.h + 1.3, footprint: 3.75 };
}

// The treehouse at the witch's scale: { whole, top, bot, crownY, anchors: { base, seat, door, camera, lights: [{ x, y, rgb, kind }] }, metres }.
// base: the trunk's foot on the ground (place the treehouse by it); seat: where her sit pose's anchor goes (the studio's floor under her
// stool); door: the porch's front door; camera: the studio's middle, near her seat (to frame for the opening zoom); lights: its light sources.
// top is the crown and everything above the studio's roof (the loft and the tower over the treeline: drawn in treetop mode, cut out round
// the witch); bot the rest. metres: height and width; towerFloor and roofTip (the top storey's floor and the roof's tip, above the ground);
// footprint (the radius it takes on the ground round the trunk: roots, posts and the stair) and overhang (its widest deck's radius).
export function treehouseSprite(st = {}, { facing = "towards", ppm = 16 } = {}) {
  const T = treehouseModel(), ppu = witchPixelsPerUnit(st), r = render(T.m, { scale: ppu, facing }), full = r.sp, um = u => +(u * ppu / ppm).toFixed(1); // model units to metres
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
  const S = TREEHOUSE_STOREYS;
  return { whole: sp, top, bot, crownY, anchors: { base: at([0, 0, 0]), seat: at(T.seat), door: at(T.door), camera: at(T.camera), lights: T.lights.map(L => ({ ...at(L.at), rgb: L.rgb, kind: L.kind })) },
    metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1), towerFloor: um(S.tower.y), roofTip: um(S.tower.y + S.tower.h + 3.3 + .3), footprint: um(T.footprint), overhang: um(S.studio.deck) } };
}

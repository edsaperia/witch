// Creature sigils (Ed: "a magical symbol for each type of creature"; then, 2026-10-06: "The animal sigils are too abstract",
// with a reference set): each is the animal itself as a monoline icon, one thick round-capped stroke, no fills, reduced to its two
// or three defining features (see SIGILS). One family: the same stroke weight, smooth curves, a few strokes each.
//
// Main use (Ed): the leashing rune, written on the ground under a creature, seen from the game's
// camera 30-40° down, so squashed to about half its height. So: strong verticals, open curves,
// well-spaced marks, no fine horizontal hatching and no tiny closed loops.
//
// Data: strokes in a unit box (x right, y down, both 0..1), in writing order, each drawn from
// its first point to its last:
//   { l: [[x, y], ...] }             a polyline
//   { a: [cx, cy, r, from, to] }     an arc, angles in degrees (0 right, 90 down), from -> to
//   { d: [x, y] }                    an end dot (a filled disc)
// They glow neon (Ed): a near-white core line in a coloured halo, each species in its own neon.
// Each creature level has a frame that grows (Ed: "for each level of creature, the sigil is more
// impressive"): bigger, thicker, brighter, then rings, then ornament, as a function of level.
// Renderers: SVG and canvas (crisp, any size, neon, with a draw-on), a pixel glyph (12-24 px, for
// carving), and a neon pixel field: on the ground (foreshortened by the camera's pitch) as the
// leashing rune, or upright as the floating form in the leash stack over the witch's head.
// The leash stack: a chain of springs that sways and trails behind her as she flies.
import { hash2 } from "./core.js";
import { SPECIES } from "./creatures.js";
import { L, A, D, C, E, at, stave, FOOT, mirror, pair, bow, wave, spiral, rays } from "./sigils/strokes.js";
import { CREATURE_SIGILS, CREATURE_NEONS, CREATURE_BOLD } from "./creatures/index.js";

export const SIGIL_STROKE = .07;  // stroke width, in the unit box
export const SIGIL_DOT = .048;    // end-dot radius
export const SIGIL_DRAW_TIME = .6; // seconds for the draw-on

// ---- building blocks ----
// an arc through two points, bulging by k (sagitta / chord; positive bulges to the left of p0 -> p1)

// ---- the sigils ----
// (Ed, 2026-10-06: "The animal sigils are too abstract", with a reference set: monoline icons, one thick round-capped stroke, no
// fills, each the actual animal by its two or three defining features; mostly front-on symmetrical heads filling the square;
// animals whose head isn't their identity drawn whole, top-down and symmetrical (a spider, a beetle, a moth, a woodlouse); long
// bodies curled round into a ring (the snake, the stoat, the newt, the dormouse). One family: the same stroke, smooth curves,
// a few strokes each.) Each comment says what makes it the animal.
export const SIGILS = {
  ...CREATURE_SIGILS,
};

// ---- the islands' sigils ----
// (Ed, 2026-10-11, with a reference: a Celtic tree of life.) An island's own sigil, in the creature sigils' stroke family, so every
// renderer draws it at every level: home's is the World Tree (journey.md: "symbolically the Ent legend's placed sigil"), shown on the
// dancefloor through the boot (rules/dancefloor.ts islandTiles). A thick trunk, its crown above and its flatter roots below, every branch and root reaching out into a band of knotwork round it (two strands weaving over and under), so crown
// and roots join in one ring.
const bezier = (p0, c0, c1, p1, n = 20) => L(...Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * c0[k] + 3 * u * t * t * c1[k] + t * t * t * p1[k]); })); // a cubic Bezier
const KNOT_R = .405, KNOT_A = .036, KNOT_N = 6, KNOT_GAP = 9; // the band: its radius, how far each strand weaves in and out, its waves round, the gap (degrees) where a strand passes under
// The knotwork band (Ed's reference): two strands weaving round, crossing 2 x KNOT_N times, each crossing over and under in turn.
function knotBand() {
  const out = [], step = 3;
  for (const side of [1, -1]) {
    let run = [];
    for (let d = 0; d <= 360; d += step) {
      const k = Math.round(d / (180 / KNOT_N)), near = Math.abs(d - k * 180 / KNOT_N) < KNOT_GAP, under = (k % 2 === 0) === (side === 1);
      if (near && under) { if (run.length > 1) out.push(L(...run)); run = []; continue; }
      const a = (d - 90) * Math.PI / 180, r = KNOT_R + side * KNOT_A * Math.sin(KNOT_N * a);
      run.push([.5 + r * Math.cos(a), .5 + r * Math.sin(a)]);
    }
    if (run.length > 1) out.push(L(...run));
  }
  return out;
}
const treeBand = deg => at(.5, .5, KNOT_R - KNOT_A * .6, deg); // where a branch meets the band's inside
// Drawn freehand like Ed's reference rather than mirrored: the crown's limbs climbing high into the band, the roots spreading
// flatter and lower, the trunk a little off true.
const CROWN = [
  bezier([.43, .4], [.36, .3], [.25, .24], treeBand(-143)),  // the low limb rising over the left lobe
  bezier([.44, .37], [.41, .26], [.33, .18], treeBand(-125)),    // up and out to the left
  bezier([.46, .35], [.45, .24], [.39, .14], treeBand(-110)), // climbing to the top
  bezier([.53, .34], [.55, .23], [.61, .15], treeBand(-73)),  // up and over to the right
  bezier([.56, .37], [.6, .26], [.67, .19], treeBand(-55)),  // out to the right
  bezier([.57, .4], [.64, .3], [.74, .25], treeBand(-36)),  // the low limb rising over the right lobe
];
const ROOTS = [
  bezier([.44, .68], [.36, .7], [.24, .72], treeBand(150)),  // spreading flat to the left
  bezier([.46, .69], [.42, .75], [.34, .79], treeBand(126)),
  bezier([.5, .7], [.51, .76], [.48, .8], treeBand(97)),      // down
  bezier([.54, .69], [.6, .74], [.66, .77], treeBand(62)),
  bezier([.57, .68], [.66, .7], [.77, .7], treeBand(32)),    // spreading flat to the right
];
// The trunk: thick, narrowest at its middle, flaring into the crown and the roots.
const TRUNK = [bezier([.43, .69], [.47, .6], [.46, .45], [.43, .36]), bezier([.58, .69], [.54, .6], [.55, .44], [.57, .36]), L([.505, .7], [.5, .34])];
export const WORLD_TREE = [...ROOTS, ...TRUNK, ...CROWN, ...knotBand()];
SIGILS.worldTree = WORLD_TREE;
// Each island's sigil (island or legend kind -> sigil id): home's (the Ent's) the World Tree, every map's for now (Ed, 2026-10-11).
// Every other island is the home of one kind of legend (journey.md), and its sigil is that kind's own.
export const ISLAND_SIGILS = { home: "worldTree", ent: "worldTree" };
export const islandSigil = (island = "home") => ISLAND_SIGILS[island] || (SIGILS[island] ? island : ISLAND_SIGILS.home);

// ---- legendary sigils ----
// (Ed, 2026-10-06: "let's have the legendary sigils be huge, twice as wide and more detailed than the normal ones, with a
// decorative border"; then his reference, an occult magic circle: "it would have the animal shape in the centre".) A legendary
// sigil is a summoning circle in the species' neon (legendCircle): a double outer ring with a band of runes between, a track of
// small cells inside it, an inner band of runes broken by three round medallions (sun, moon, star, eye, spiral: three of them,
// seeded by species, like the runes), a great triangle inscribed in the inner ring, a few stray runes in its gaps, and at the
// centre an octagon framing the animal: its own icon with more of it (LEGEND_DETAIL: tufts, inner ears, brows, whiskers,
// ridges), in the same stroke family. Runes are made-up glyphs drawn as strokes (runeStrokes), so no font. Every renderer takes
// `legendary: true` and draws it LEGEND_SCALE times the size it would draw a normal sigil (twice as wide, and, a circle, as
// tall). Small, it simplifies (legendTier): under LEGEND_FULL_PX across no runes, cells or stray runes; under
// LEGEND_DETAIL_PX no animal detail either. legendSigilStrokes and legendSigilMask give its plain line geometry (for carving).
export const LEGEND_SCALE = 2;
export const LEGEND_FULL_PX = 150;  // across, in pixels: the full circle (runes, cells) from here
export const LEGEND_DETAIL_PX = 80; // the animal's extra detail from here
export const legendTier = px => px >= LEGEND_FULL_PX ? 2 : px >= LEGEND_DETAIL_PX ? 1 : 0;
export const LEGEND_DETAIL = {
  wolf: [...pair(L([.25, .17], [.3, .35]), L([.17, .46], [.08, .53], [.19, .57], [.12, .66], [.27, .69]), L([.28, .41], [.4, .44])), L([.5, .56], [.5, .72])],
  fox: [...pair(bow([.28, .6], [.44, .74], .25), D(.42, .76)), L([.5, .34], [.5, .46])],
  arcticfox: [...pair(L([.24, .26], [.28, .36]), L([.14, .56], [.06, .6]), L([.18, .64], [.1, .7])), L([.5, .4], [.5, .5])],
  badger: [...pair(L([.37, .8], [.2, .84]), bow([.18, .7], [.34, .88], .2)), L([.5, .16], [.5, .26])],
  boar: [...pair(L([.29, .37], [.41, .35]), L([.2, .5], [.08, .5]), L([.22, .58], [.1, .64]))],
  stag: [...pair(L([.41, .72], [.34, .95]), L([.33, .24], [.27, .32]))],
  elk: [...pair(L([.4, .76], [.3, .94]), D(.46, .8))],
  hare: [...pair(L([.39, .13], [.39, .35]), L([.29, .7], [.22, .82], [.36, .83]))],
  owl: [...pair(bow([.47, .36], [.22, .37], .25)), L([.4, .79], [.45, .84], [.5, .79], [.55, .84], [.6, .79])],
  bear: [...pair(A(.23, .27, .05, 110, 330), L([.31, .42], [.41, .4]), L([.18, .62], [.11, .7], [.21, .73])), L([.5, .7], [.5, .76])],
  hedgehog: [L(...Array.from({ length: 11 }, (_, i) => at(.5, .55, i % 2 ? .23 : .29, 192 + i * 156 / 10))), ...pair(L([.43, .8], [.32, .82]))],
  squirrel: [L([.85, .28], [.95, .24]), L([.88, .42], [.97, .42]), L([.85, .56], [.94, .6]), L([.32, .82], [.35, .9]), L([.48, .82], [.45, .9])],
  toad: [D(.32, .76), D(.68, .76), D(.5, .8), ...pair(L([.2, .86], [.13, .95]), L([.27, .87], [.27, .96]))],
  otter: [...pair(L([.3, .38], [.41, .4]), L([.25, .78], [.3, .95])), bow([.42, .76], [.58, .76], -.3)],
  lynx: [...pair(L([.24, .19], [.28, .34]), L([.12, .6], [.23, .63]), L([.31, .42], [.43, .45]))],
  raven: [L([.6, .44], [.86, .465]), L([.63, .6], [.67, .72]), L([.55, .64], [.58, .76]), L([.26, .56], [.4, .72], [.44, .86])],
  bat: [...pair(L([.25, .31], [.2, .58]), L([.26, .31], [.33, .52]), L([.47, .68], [.45, .76]))],
  mole: [...pair(L([.44, .72], [.3, .7]), L([.45, .77], [.32, .81]), L([.42, .18], [.44, .12]))],
  beaver: [...pair(L([.38, .6], [.22, .58]), L([.39, .65], [.24, .7]), L([.31, .37], [.42, .38]), A(.22, .22, .035, 120, 330))],
  stoat: [L([.77, .3], [.88, .3]), L([.76, .34], [.86, .39]), L([.3, .8], [.27, .9]), L([.44, .86], [.44, .95])],
  snail: [...rays(.44, .5, .21, .29, [195, 245, 295]), D(.14, .9), D(.28, .91), D(.42, .9)],
  ram: [...pair(...rays(.24, .38, .12, .2, [75, 135, 195, 255]), D(.46, .78)), L([.4, .34], [.45, .41], [.5, .35], [.55, .41], [.6, .34])],
  ibex: [...pair(L([.36, .15], [.32, .18]), L([.25, .07], [.21, .1]), L([.42, .6], [.36, .62])), L([.46, .86], [.5, .9], [.54, .86])],
  snowleopard: [...pair(L([.12, .62], [.04, .6]), L([.14, .68], [.06, .72]), D(.3, .36)), D(.5, .4), L([.5, .7], [.5, .76])],
  frosttroll: [...pair(L([.36, .6], [.3, .66]), D(.28, .36)), L([.5, .62], [.5, .7])],
  woodlouse: [...pair(L([.24, .06], [.16, .1]), L([.43, .9], [.39, .97]), D(.43, .27))],
  rattlesnake: [...pair(L([.62, .26], [.6, .2])), D(.4, .6), D(.5, .66)],
  scorpion: [D(.5, .54), D(.5, .62), D(.5, .7)],
  snake: [D(.53, .46), ...[.5, .62, .74, .86].map(t => D(...at(.5, .54, .07 + .24 * t, t * 468)))],
  moth: [...pair(C(.34, .7, .045), L([.45, .4], [.14, .24]))],
  marten: [...pair(A(.24, .24, .045, 110, 340), L([.42, .7], [.28, .72]))],
  salamander: [...pair(D(.46, .38), D(.46, .5), L([.2, .7], [.16, .76]))],
  roe: [...pair(L([.41, .74], [.36, .9]), L([.3, .4], [.36, .44]))],
  redpanda: [...pair(L([.27, .78], [.2, .9]), L([.33, .82], [.3, .94])), L([.5, .82], [.5, .9])],
  newt: [D(.28, .62), D(.38, .63), D(.48, .62), L([.22, .76], [.18, .82])],
  crocodile: [...pair(D(.42, .3), D(.36, .3), L([.465, .5], [.465, .76])), D(.5, .28)],
  hydra: [L([.45, .6], [.55, .6]), ...pair(L([.17, .62], [.27, .62]), D(.24, .41)), D(.5, .28)],
  tiger: [...pair(L([.2, .44], [.3, .47]), L([.45, .79], [.44, .86]))],
  jaguar: [...pair(C(.37, .36, .03), L([.17, .56], [.26, .58]), D(.42, .8)), L([.44, .84], [.56, .84])],
  elephant: [...pair(A(.24, .42, .1, 110, 250), L([.43, .26], [.47, .24])), L([.46, .63], [.54, .63]), L([.46, .7], [.54, .7]), L([.47, .77], [.55, .78])],
  griffin: [L([.36, .5], [.3, .58]), D(.62, .46)],
  sphinx: [...pair(L([.3, .52], [.4, .52]), L([.3, .72], [.4, .72])), L([.5, .34], [.5, .24]), L([.46, .82], [.54, .82])], // the lappets' stripes, the cobra on its brow, the beard's plait
  featheredserpent: [...[0, 1, 2].map(i => L([.36 + i * .06, .78 - i * .06], [.4 + i * .06, .74 - i * .06])), D(.7, .4), L([.62, .36], [.66, .3])], // the scales' chevrons up its rising body, its eye's ring, a crest plume
  frostwyrm: [...pair(L([.336, .27], [.303, .205])), ...pair(D(.475, .746))],
  cheetah: [...pair(D(.3, .62)), ...pair(D(.34, .42)), D(.5, .36)],
  lion: [...pair(L([.3, .38], [.38, .34])), ...pair(L([.36, .66], [.24, .68]))],
  unicorn: [...rays(.82, .1, .03, .07, [-150, -90, -30, 30, 90])],
  komodo: [...pair(L([.21, .26], [.17, .23]), L([.2, .69], [.16, .72]), D(.46, .25)), L([.46, .36], [.5, .32], [.54, .36]), L([.46, .6], [.5, .56], [.54, .6])],
  fennec: [...pair(L([.36, .36], [.22, .22])), ...pair(bow([.32, .66], [.44, .72], .25))],
  dragonfly: [...pair(L([.47, .46], [.3, .52], [.16, .6], [.2, .64], [.47, .5]))],
  crab: [L([.74, .28], [.76, .24]), L([.8, .26], [.82, .22]), D(.42, .6), D(.5, .64), D(.58, .6)],
  rhino: [...pair(L([.27, .72], [.33, .77]), L([.26, .26], [.31, .29]), bow([.33, .5], [.39, .45], .3))],
  polarbear: [L([.84, .55], [.68, .58]), L([.2, .62], [.12, .67]), L([.22, .76], [.14, .81]), L([.38, .76], [.43, .82])],
  heron: [L([.35, .48], [.31, .6]), L([.4, .5], [.37, .62]), bow([.32, .56], [.64, .6], -.25), L([.42, .94], [.36, .97]), L([.56, .94], [.63, .97])],
  penguin: [...pair(D(.41, .35)), D(.5, .37), C(.8, .86, .05)], // the elder: a collar of offerings, its chick at its feet
  meerkat: [...pair(L([.39, .2], [.37, .14])), L([.5, .48], [.5, .74]), ...pair(L([.42, .86], [.37, .92]))],
  flyingsquirrel: [D(.32, .44), D(.66, .52), D(.4, .58), D(.6, .4), D(.28, .6)],
  armadillo: [L([.32, .4], [.32, .64]), L([.64, .4], [.64, .64]), D(.82, .58), L([.24, .5], [.24, .64])],
  raccoon: [...pair(L([.3, .36], [.44, .4]), D(.36, .9), D(.42, .93))],
  cat: [L([.42, .31], [.42, .21], [.46, .26], [.5, .18], [.54, .26], [.58, .21], [.58, .31])],
  stegosaurus: [D(.27, .42), D(.44, .36), D(.6, .4), L([.4, .62], [.56, .62])],
  spider: [...pair(D(.47, .37)), L([.5, .54], [.5, .7]), L([.44, .6], [.56, .6])],
  dormouse: [C(.32, .3, .035), L([.3, .44], [.18, .42]), L([.3, .47], [.19, .5]), ...rays(.52, .58, .23, .28, [120, 160, 200])],
  beetle: [...pair(L([.41, .46], [.41, .84]), D(.45, .31))],
};
// The circle, in a unit box (centre .5, .5), as stroke data like SIGILS, each tagged: "ring" (rings, cells, triangle,
// octagon, medallions) or "rune" (the script, drawn thinner). tier: 2 full, 1 or 0 without the runes and cells.
const sHash = id => { let h = 7; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 100003; return h; };
const RUNE_ARMS = [[0, 1, .5, .72], [0, 1, -.5, .72], [0, .55, .5, .85], [0, .55, -.5, .25], [0, .3, .5, 0], [-.5, .5, .5, .5], [0, .75, .5, .45], [0, .2, -.5, .45], [-.5, .9, .5, .9]];
// one made-up rune, n by seed, in local (u across -.5..5, v up 0..1): a stem and one or two arms, now and then a ring
function runeLocal(n) {
  const r = k => hash2(n, k, 97), out = [], stem = r(1) > .15;
  if (stem) out.push([[0, 0], [0, 1]]); else out.push([[-.5, 0], [0, 1], [.5, 0]]);
  const a1 = Math.floor(r(2) * RUNE_ARMS.length), a2 = Math.floor(r(3) * RUNE_ARMS.length);
  out.push(RUNE_ARMS[a1].length && [[RUNE_ARMS[a1][0], RUNE_ARMS[a1][1]], [RUNE_ARMS[a1][2], RUNE_ARMS[a1][3]]]);
  if (r(4) > .45 && a2 !== a1) out.push([[RUNE_ARMS[a2][0], RUNE_ARMS[a2][1]], [RUNE_ARMS[a2][2], RUNE_ARMS[a2][3]]]);
  return out;
}
// a rune at angle deg on the circle of radius rc, h tall (outward) and w wide
const runeAt = (n, deg, rc, h, w) => {
  const a = deg * Math.PI / 180, er = [Math.cos(a), Math.sin(a)], et = [-Math.sin(a), Math.cos(a)];
  return runeLocal(n).map(seg => L(...seg.map(([u, v]) => [.5 + er[0] * (rc - h / 2 + v * h) + et[0] * u * w, .5 + er[1] * (rc - h / 2 + v * h) + et[1] * u * w])));
};
// a band of runes between radii r0 and r1, leaving gaps (degrees: [centre, half-width]) for the medallions
function runeBand(seed, r0, r1, gaps = []) {
  const rc = (r0 + r1) / 2, h = (r1 - r0) * .7, step = (h * .95) / rc * 180 / Math.PI, out = [];
  for (let d = 0, i = 0; d < 360 - step * .5; d += step, i++) {
    const deg = d - 90; if (gaps.some(([c, hw]) => Math.abs(((deg - c) % 360 + 540) % 360 - 180) < hw)) continue;
    out.push(...runeAt(seed * 131 + i, deg, rc, h, h * .62));
  }
  return out;
}
const MEDALLIONS = {
  sun: (cx, cy, r) => [C(cx, cy, r * .38), ...Array.from({ length: 8 }, (_, i) => { const a = i * 45, p = at(cx, cy, r * .52, a), q = at(cx, cy, r * .68, a + 12), t = at(cx, cy, r * .8, a); return L(p, q, t); })],
  moon: (cx, cy, r) => [A(cx, cy, r * .62, 60, 300), bow(at(cx, cy, r * .62, 60), at(cx, cy, r * .62, 300), -.22)],
  star: (cx, cy, r) => [L(...Array.from({ length: 17 }, (_, i) => at(cx, cy, i % 2 ? r * .34 : r * .72, -90 + i * 22.5)))],
  eye: (cx, cy, r) => [bow([cx - r * .72, cy], [cx + r * .72, cy], .3), bow([cx - r * .72, cy], [cx + r * .72, cy], -.3), D(cx, cy)],
  spiral: (cx, cy, r) => [spiral(cx, cy, r * .08, r * .66, 1.8, 0)],
};
const MEDALLION_KINDS = Object.keys(MEDALLIONS);
const circleCache = new Map();
export function legendCircle(id, tier = 2) {
  const key = id + ":" + tier; if (circleCache.has(key)) return circleCache.get(key);
  const seed = sHash(id), out = [], ring = s => out.push({ ...s, kind: "ring" }), rune = s => out.push({ ...s, kind: "rune" });
  const O = .485, Oi = .43, T1 = .405, T0 = .375, I1 = .365, I0 = .3, MR = .052;
  ring(C(.5, .5, O)); ring(C(.5, .5, tier === 2 ? Oi : T1));
  if (tier === 2) {
    runeBand(seed, Oi + .006, O - .006).forEach(rune);                               // the outer script
    ring(C(.5, .5, T1)); ring(C(.5, .5, T0));                                           // the cell track
    for (let i = 0; i < 72; i++) { const a = i * 5; ring(L(at(.5, .5, T0, a), at(.5, .5, T1, a))); }
  }
  // the inner band: its ring, its script, and three medallions at 10, 3 and 7 o'clock
  ring(C(.5, .5, I0));
  const mAt = [210, 0, 120], picks = [], mc = (I0 + I1) / 2;
  for (let i = 0, k = seed; picks.length < 3; i++, k++) { const m = MEDALLION_KINDS[Math.floor(hash2(k, 5, 23) * MEDALLION_KINDS.length)]; if (!picks.includes(m)) picks.push(m); }
  if (tier === 2) runeBand(seed + 7, I0 + .006, I1, mAt.map(a => [a, 14])).forEach(rune);
  mAt.forEach((deg, i) => { const [cx, cy] = at(.5, .5, mc, deg); ring(C(cx, cy, MR)); ring(C(cx, cy, MR * .78)); MEDALLIONS[picks[i]](cx, cy, MR * .78).forEach(ring); });
  // the great triangle in the inner ring, its sides broken where they would cross the octagon
  const V = [-90, 30, 150].map(a => at(.5, .5, I0, a)), OCT = .215, clear = OCT + .012;
  for (let e = 0; e < 3; e++) {
    const p = V[e], q = V[(e + 1) % 3], n = 60; let run = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = p[0] + (q[0] - p[0]) * t, y = p[1] + (q[1] - p[1]) * t, dx = x - .5, dy = y - .5;
      const ang = Math.atan2(dy, dx) - Math.PI / 8, sector = Math.PI / 4, local = ((ang % sector) + sector) % sector - sector / 2, inside = Math.hypot(dx, dy) * Math.cos(local) < clear * Math.cos(Math.PI / 8);
      if (!inside) run.push([x, y]); else if (run.length) { if (run.length > 1) ring(L(...run)); run = []; }
    }
    if (run.length > 1) ring(L(...run));
  }
  // the octagon round the animal, and its ticks
  ring(L(...Array.from({ length: 9 }, (_, i) => at(.5, .5, OCT, 22.5 + i * 45))));
  if (tier === 2) {
    for (let i = 0; i < 8; i++) ring(L(at(.5, .5, OCT, 22.5 + i * 45), at(.5, .5, OCT + .025, 22.5 + i * 45)));
    [90, 210, 330].forEach((deg, i) => runeAt(seed * 17 + i, deg, (OCT + I0 * .5) / 1.5 + .045, .05, .032).forEach(rune)); // stray runes in the triangle's gaps
  }
  circleCache.set(key, out);
  return out;
}
// The animal in the middle: its icon and, from tier 1, its detail, scaled into the octagon.
const LEGEND_K = .33;
const legendAnimal = (id, tier) => [...(SIGILS[id] || []), ...(tier >= 1 && LEGEND_DETAIL[id] || [])];
// Stroke widths, in the unit box: the circle's lines, its runes, the animal's (at its scale).
export const LEGEND_STROKES = { ring: .011, rune: .006, animal: SIGIL_STROKE * LEGEND_K * 1.15 };
// The legendary sigil's plain line geometry, in a unit square (the outer ring touching its edge): polylines and discs, each
// with its width w (or radius r) and kind ("ring", "rune", "animal"). For carving it (art builder 1's legend circle floors).
export function legendSigilStrokes(id, { tier = 2 } = {}) {
  const ox = .5 - LEGEND_K / 2, W = LEGEND_STROKES, out = [];
  for (const s of legendCircle(id, tier)) { const p = polyline(s); out.push({ kind: s.kind, dot: p.dot, pts: p.pts, w: W[s.kind], r: SIGIL_DOT * .35 }); }
  for (const s of legendAnimal(id, tier)) { const p = polyline(s); out.push({ kind: "animal", dot: p.dot, pts: p.pts.map(([x, y]) => [ox + x * LEGEND_K, ox + y * LEGEND_K]), w: W.animal, r: SIGIL_DOT * LEGEND_K * 1.15 }); }
  return out;
}
// The same as a size × size mask, 0..1 per pixel (antialiased by a pixel), no glow; strokes at least `minPx` wide.
export function legendSigilMask(id, size = 256, { tier = legendTier(size), minPx = 1 } = {}) {
  const m = new Float32Array(size * size);
  for (const s of legendSigilStrokes(id, { tier })) {
    const half = s.dot ? s.r * size : Math.max(minPx / 2, s.w * size / 2), P = s.pts.map(([x, y]) => [x * size, y * size]);
    const segs = s.dot ? [[P[0], P[0]]] : P.slice(1).map((b, i) => [P[i], b]);
    for (const [a, b] of segs) {
      const x0 = Math.max(0, Math.floor(Math.min(a[0], b[0]) - half - 1)), x1 = Math.min(size - 1, Math.ceil(Math.max(a[0], b[0]) + half + 1));
      const y0 = Math.max(0, Math.floor(Math.min(a[1], b[1]) - half - 1)), y1 = Math.min(size - 1, Math.ceil(Math.max(a[1], b[1]) + half + 1));
      const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const px = x + .5, py = y + .5, t = l2 ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / l2)) : 0;
        const v = Math.max(0, Math.min(1, half + .5 - Math.hypot(px - a[0] - dx * t, py - a[1] - dy * t))), i = y * size + x;
        if (v > m[i]) m[i] = v;
      }
    }
  }
  return m;
}

// ---- neon: a colour per species, kept as a palette slot ----
// The palette; recolour by changing an entry (or passing `colour` to any renderer).
export const NEON = { pink: [255, 64, 200], cyan: [50, 235, 255], acid: [175, 255, 45], violet: [165, 95, 255], orange: [255, 135, 35], lemon: [255, 238, 70], red: [255, 55, 95], mint: [70, 255, 175], blue: [70, 145, 255], magenta: [235, 70, 255] };
// Each species' slot, given in the order of the area types they live in (areas.js), ten apart,
// so area types near each other in the list never share a colour.
export const SIGIL_NEON = { ...CREATURE_NEONS, worldTree: "mint" };
export const sigilColour = id => NEON[SIGIL_NEON[id]] || NEON.cyan;
const WHITE = [255, 255, 250], toward = (c, w, k) => c.map((v, j) => Math.round(v + (w[j] - v) * k));
const rgb = c => `rgb(${c.join(",")})`;

// ---- level frames ----
// A creature level's frame, for any level number (0 baby, 1 young, 2 adult, 3 legend, and
// beyond): size steps first, then rings, then ornament. Ed: the young's ring is dotted, the
// adult's a full circle; the legend's double ring is banded with ticks and rayed.
//   metres: across on the ground (about 2, 3, 4, 5.5); core: the core line's thickness (x a
//   baby's); halo: its brightness (0..1); rings: how many; band: rune ticks between the outer two
//   rings; rays: short points outside the outer ring; shimmer: a slow sparkle.
export const SIGIL_LEVELS = ["baby", "young", "adult", "legend"];
export function sigilFrame(level = 0) {
  const L = Math.max(0, level);
  return { level: L, metres: 2 + L + Math.max(0, L - 2) * .5, core: 1 + .2 * L, halo: Math.min(1, .45 + .19 * L), rings: L >= 4 ? 3 : L >= 3 ? 2 : L >= 2 ? 1 : 0, dots: L >= 1 && L < 2 ? 12 : 0, band: L >= 3, rays: L >= 4 ? 8 : L >= 3 ? 4 : 0, shimmer: L >= 3 };
}

// ---- geometry: strokes as polylines, with their lengths ----
function polyline(s) {
  if (s.d) return { dot: true, pts: [s.d], len: SIGIL_DOT * 2 };
  let pts = s.l;
  if (s.a) {
    const [cx, cy, r, a0, a1] = s.a, n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 8));
    pts = Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  }
  let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { dot: false, pts, len };
}
const timeline = (list, from = 0, to = 1) => { const total = list.reduce((a, s) => a + s.len, 0) || 1; let at = 0; for (const s of list) { s.start = from + (to - from) * at / total; at += s.len; s.end = from + (to - from) * at / total; } return list; };
// The sigil's own strokes in its unit box, each with its share of the draw-on (start, end in 0..1).
const sigilCache = new Map();
export function sigilStrokes(id) {
  if (!sigilCache.has(id)) sigilCache.set(id, timeline((SIGILS[id] || []).map(s => ({ ...polyline(s), w: SIGIL_STROKE, part: "sigil" }))));
  return sigilCache.get(id);
}
// Everything drawn for a creature of a level, in a "mark" box (unit square, the frame's full
// size): the frame (rings, band, rays: drawn first, in the first 15% of the draw-on), then the
// sigil, scaled into the middle. w: each stroke's width in mark units. level null: the bare sigil.
const markCache = new Map();
export function sigilMark(id, level = 0, legendary = false, tier = 2) {
  if (legendary) return legendMark(id, tier);
  const key = id + ":" + level; if (markCache.has(key)) return markCache.get(key);
  const F = level === null ? null : sigilFrame(level), k = !F ? 1 : F.rings >= 2 ? .6 : F.rings || F.dots ? .66 : .8, o = (1 - k) / 2;
  const thick = F ? F.core : 1, ring = SIGIL_STROKE * .55 * ((F?.level ?? 0) < 3 ? 1 : Math.min(1.6, .8 + .25 * F.level)), frame = []; // an adult's ring at the normal line weight; the legend's heavier
  if (F) {
    const R = .44, circle = r => polyline({ a: [.5, .5, r, 90, 450] }); // from the front, round
    for (let i = 0; i < F.rings; i++) frame.push({ ...circle(R - i * .06), w: ring, part: "ring" });
    // a young creature's dotted circle: round dots spaced well apart, so they stay distinct on the ground and small in the stack
    for (let i = 0; i < F.dots; i++) { const a = (90 + i * 360 / F.dots) * Math.PI / 180; frame.push({ dot: true, pts: [[.5 + R * Math.cos(a), .5 + R * Math.sin(a)]], len: .05, r: .042, w: ring, part: "ring" }); }
    if (F.band && F.rings >= 2) for (let i = 0; i < 16; i++) { const a = (90 + i * 22.5) * Math.PI / 180, r0 = R - .06 + .014, r1 = R - .014; frame.push({ ...polyline({ l: [[.5 + r0 * Math.cos(a), .5 + r0 * Math.sin(a)], [.5 + r1 * Math.cos(a), .5 + r1 * Math.sin(a)]] }), w: ring * .8, part: "band" }); }
    for (let i = 0; i < F.rays; i++) { const a = (90 + i * 360 / F.rays) * Math.PI / 180, r0 = R + .02, r1 = .5 - ring / 2; frame.push({ ...polyline({ l: [[.5 + r0 * Math.cos(a), .5 + r0 * Math.sin(a)], [.5 + r1 * Math.cos(a), .5 + r1 * Math.sin(a)]] }), w: ring * 1.3, part: "ray" }); }
  }
  const gk = Math.min(1.25, thick); // the glyph thickens a little with level, never enough to clog (the rings carry the rest)
  const sig = sigilStrokes(id).map(s => ({ dot: s.dot, len: s.len * k, pts: s.pts.map(([x, y]) => [o + x * k, o + y * k]), w: s.w * k * gk, r: SIGIL_DOT * k * gk, part: "sigil" }));
  const out = { level, frame: F, k, aspect: 1, strokes: [...timeline(frame, 0, frame.length ? .15 : 0), ...timeline(sig, frame.length ? .15 : 0, 1)] };
  markCache.set(key, out);
  return out;
}
// A legendary sigil's mark (see legendCircle), at a tier: the circle first (its first 35% of the draw-on), then the animal.
// Its frame is the legend level's (for its glow and shimmer).
function legendMark(id, tier = 2) {
  const key = id + ":legendary:" + tier; if (markCache.has(key)) return markCache.get(key);
  const F = sigilFrame(3), frame = legendSigilStrokes(id, { tier }).filter(s => s.kind !== "animal").map(s => ({ ...s, len: polyLen(s.pts), part: s.kind }));
  const sig = legendSigilStrokes(id, { tier }).filter(s => s.kind === "animal").map(s => ({ ...s, len: s.dot ? SIGIL_DOT : polyLen(s.pts), part: "sigil" }));
  const out = { level: 3, frame: F, k: LEGEND_K, aspect: 1, scale: LEGEND_SCALE, legendary: true, tier, strokes: [...timeline(frame, 0, .35), ...timeline(sig, .35, 1)] };
  markCache.set(key, out);
  return out;
}
const polyLen = pts => { let l = 0; for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return l || .01; };

// ---- vector: SVG and canvas, neon ----
function partial(s, p) { // the part of a stroke drawn at overall progress p: its points, or null
  if (p >= s.end) return s.pts;
  if (p <= s.start) return null;
  if (s.dot) return s.pts;
  let want = (p - s.start) / (s.end - s.start) * s.len; const pts = [s.pts[0]];
  for (let i = 1; i < s.pts.length; i++) {
    const a = s.pts[i - 1], b = s.pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (want <= d) { pts.push([a[0] + (b[0] - a[0]) * want / d, a[1] + (b[1] - a[1]) * want / d]); break; }
    pts.push(b); want -= d;
  }
  return pts;
}
// An SVG string: the neon halo under a near-white core. level: null (default) the bare sigil,
// or a creature level for its frame. progress below 1 draws it partly written.
export function sigilSVG(id, { size = 64, level = null, colour = sigilColour(id), glow = true, progress = 1, legendary = false } = {}) {
  const px = legendary ? size * LEGEND_SCALE : size, M = sigilMark(id, level, legendary, legendTier(px)), fid = `sigil-glow-${id}-${legendary ? "legendary" : level}`, halo = M.frame ? M.frame.halo : .7, core = toward(colour, WHITE, .72), lines = [];
  for (const s of M.strokes) {
    const pts = partial(s, progress); if (!pts) continue;
    lines.push(s.dot ? `<circle cx="${(pts[0][0] * 100).toFixed(2)}" cy="${(pts[0][1] * 100).toFixed(2)}" r="${(s.r * 100).toFixed(2)}" fill="CURRENT" stroke="none"/>` : `<polyline points="${pts.map(p => (p[0] * 100).toFixed(2) + "," + (p[1] * 100).toFixed(2)).join(" ")}" stroke-width="${(s.w * 100).toFixed(2)}"/>`);
  }
  const g = (col, scale, extra, ls = lines) => `<g fill="none" stroke="${rgb(col)}" stroke-linecap="round" stroke-linejoin="round"${extra}>${ls.join("").replaceAll("CURRENT", rgb(col)).replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${(+w * scale).toFixed(2)}"`)}</g>`;
  const filter = glow ? `<defs><filter id="${fid}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>` : "";
  const halos = glow ? g(colour, legendary ? 1.8 : 2.2, ` opacity="${halo.toFixed(2)}" filter="url(#${fid})"`) : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${px}" height="${px}">${filter}${halos}${g(glow ? core : colour, glow ? .62 : 1, "")}</svg>`;
}
// Draws a sigil on a canvas, neon: the mark box maps to (x, y, size, size) (a legendary one's to LEGEND_SCALE times that). Transform the
// context first to lay it on a plane. level: null (default) the bare sigil, or a creature level.
export function drawSigil(ctx, id, { x = 0, y = 0, size = 64, level = null, colour = sigilColour(id), progress = 1, glow = true, legendary = false } = {}) {
  if (legendary) size *= LEGEND_SCALE;
  const M = sigilMark(id, level, legendary, legendTier(size)), halo = M.frame ? M.frame.halo : .7;
  ctx.save(); ctx.translate(x, y); ctx.scale(size, size); ctx.lineCap = "round"; ctx.lineJoin = "round";
  const pass = (col, wk, alpha, blur) => {
    ctx.globalAlpha = alpha; ctx.strokeStyle = ctx.fillStyle = rgb(col); ctx.shadowColor = rgb(colour); ctx.shadowBlur = blur;
    for (const s of M.strokes) {
      const pts = partial(s, progress); if (!pts) continue;
      ctx.beginPath();
      if (s.dot) { ctx.arc(pts[0][0], pts[0][1], s.r * (wk > 1 ? 1.5 : 1), 0, Math.PI * 2); ctx.fill(); continue; }
      ctx.lineWidth = s.w * wk; pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    }
  };
  if (glow) { pass(colour, M.legendary ? 2 : 2.4, Math.min(halo, .7) * .55, size / (M.legendary ? 30 : 12)); pass(toward(colour, WHITE, .72), M.legendary ? .75 : .62, 1, size / (M.legendary ? 80 : 30)); }
  else pass(colour, 1, 1, 0);
  ctx.restore();
}

// ---- pixels ----
// For a point (u, v) of a box: the progress at which ink first reaches it, or Infinity.
function inkAt(strokes, u, v, half) {
  let best = Infinity;
  for (const s of strokes) {
    if (s.start >= best) break;
    if (s.dot) { if (Math.hypot(u - s.pts[0][0], v - s.pts[0][1]) < (s.r ?? SIGIL_DOT) + half - (s.w ?? SIGIL_STROKE) / 2) best = s.start; continue; }
    let run = 0;
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1], b = s.pts[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, l = Math.sqrt(l2);
      const t = l2 ? Math.max(0, Math.min(1, ((u - a[0]) * dx + (v - a[1]) * dy) / l2)) : 0;
      if (Math.hypot(u - a[0] - dx * t, v - a[1] - dy * t) < half) { const at = s.start + (run + t * l) / s.len * (s.end - s.start); if (at < best) best = at; }
      run += l;
    }
  }
  return best;
}
// True where the bare sigil has ink: for carving it into stone like runeGlyph(u, v, k, w); w
// is the stroke's half-width (default: the sigil's own).
export function sigilHit(id, u, v, w = SIGIL_STROKE / 2) { return inkAt(sigilStrokes(id), u, v, w) < Infinity; }
// A pixel glyph of the bare sigil, `size` px tall: { w, h, m }, m 1 where there is ink. Strokes
// are at least one pixel thick at any size. For carving and small icons.
// legendary: the legendary sigil, LEGEND_SCALE times `size` across, its circle's pixels (not the animal's) also marked in `frame`.
export function sigilGlyph(id, size = 16, { progress = 1, legendary = false } = {}) {
  if (legendary) {
    const n = size * LEGEND_SCALE, M = legendMark(id, legendTier(n)), m = new Uint8Array(n * n), frame = new Uint8Array(n * n);
    const art = M.strokes.filter(s => s.part === "sigil"), rim = M.strokes.filter(s => s.part !== "sigil"), half = Math.max(LEGEND_STROKES.animal / 2, .62 / n), rh = Math.max(LEGEND_STROKES.ring / 2, .5 / n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const u = (x + .5) / n, v = (y + .5) / n, i = y * n + x;
      if (inkAt(art, u, v, half) <= progress) m[i] = 1; else if (inkAt(rim, u, v, rh) <= progress) m[i] = frame[i] = 1;
    }
    return { w: n, h: n, m, frame };
  }
  const at = sigilArrival(id, size), m = new Uint8Array(size * size);
  for (let i = 0; i < at.length; i++) if (at[i] <= progress) m[i] = 1;
  return { w: size, h: size, m };
}
// When the draw-on reaches each pixel of the bare sigil's `size` px glyph (0 to 1; Infinity: no ink): sigilGlyph at any
// progress is this at most that progress. Worked out once, a draw-on's steps are cheap (the dancefloor's area patterns
// made all eight from scratch, most of the game's start-up after the map: overnight start-up pass).
export function sigilArrival(id, size = 16, { stroke = SIGIL_STROKE } = {}) { // stroke: a thinner line for more room (the floor's island sigil)
  const strokes = sigilStrokes(id), at = new Float64Array(size * size), half = Math.max(stroke / 2, .62 / size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) at[y * size + x] = inkAt(strokes, (x + .5) / size, (y + .5) / size, half);
  return at;
}

// ---- the bold sigils ----
// (Ed, 2026-10-29: the monoline sigils can't be read at stack size, about 12 px with 1 px strokes: "perhaps 1.5x ... and then
// redraw?") Each species' animal reduced to its one defining feature (antlers, ears, tusks, shell, wings...), drawn for a 24 px
// grid with 2 px strokes and fat dots, in art/creatures/<id>/bold.js (`BOLD_<ID> = { strokes }`, the same building blocks as
// sigil.js: art/sigils/strokes.js; docs/notes/art-checks.md **Bold sigils**). Where the leash shows a creature's sigil small
// (her stack, the stones' columns, runes, placed sigils, the pointers: render/leash.ts bareSlot, render/indicator.ts) with
// tuning leash.ranks.bold on; the monoline sigil stays on the rune stones' runes and the chart, and wherever a species has no
// bold one yet.
export const BOLD = { ...CREATURE_BOLD };
export const BOLD_GRID = 24;            // the grid it's drawn for (px)
export const BOLD_STROKE = 2 / BOLD_GRID; // stroke width, in the unit box: 2 px
export const BOLD_DOT = 1.5 / BOLD_GRID;  // a dot's radius: 3 px across
export const hasBold = id => !!BOLD[id];
// A pixel glyph of the bold sigil, `size` px square ({ w, h, m }, m 1 where there is ink): a pixel is ink where its middle is within
// half a stroke of a line, or a dot's radius of a dot; strokes are at least a pixel thick at any size. null without a bold sigil.
export function boldGlyph(id, size = BOLD_GRID) {
  if (!BOLD[id]) return null;
  const segs = BOLD[id].map(polyline), half = Math.max(BOLD_STROKE / 2, .55 / size), dotR = Math.max(BOLD_DOT, .7 / size), m = new Uint8Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) / size, v = (y + .5) / size;
    for (const s of segs) {
      if (s.dot) { if (Math.hypot(u - s.pts[0][0], v - s.pts[0][1]) <= dotR) { m[y * size + x] = 1; break; } continue; }
      let hit = false;
      for (let i = 1; i < s.pts.length && !hit; i++) {
        const [ax, ay] = s.pts[i - 1], [bx, by] = s.pts[i], dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1e-12, t = Math.max(0, Math.min(1, ((u - ax) * dx + (v - ay) * dy) / l2));
        if (Math.hypot(u - ax - dx * t, v - ay - dy * t) <= half) hit = true;
      }
      if (hit) { m[y * size + x] = 1; break; }
    }
  }
  return { w: size, h: size, m };
}

// ---- the neon pixel field: on the ground, or floating upright ----
// A creature's sigil with its level's frame as neon pixels, `size` px across, squashed to
// `squash` of its height (sin of the camera's pitch on the ground; 1 upright). Precomputed once:
// each pixel's arrival in the draw-on and its distance from the nearest core line, so painting a
// frame is cheap. The core is at least 1 px thick both ways; the halo reaches 2-4 px past it.
export const GROUND_PITCH = 35 * Math.PI / 180;
export function sigilField(id, { level = 0, size = 64, squash = 1, legendary = false } = {}) {
  const M = legendary ? legendMark(id, legendTier(size)) : sigilMark(id, level), F = M.frame || sigilFrame(0), w = Math.ceil(size) + 4, h = Math.ceil(size * squash) + 4;
  // halo, in pixels past the core: the glyph's stays tight so its lines stay distinct at every level; the rings and ornament carry the extra glow
  const reach = 2 + 2 * F.halo, reachOf = kind => kind === 1 || M.legendary ? Math.min(2, reach) : reach + 1; // (a legendary circle's many lines: a tight halo, or they blur together)
  const atCore = new Float32Array(w * h).fill(Infinity), atHalo = new Float32Array(w * h).fill(Infinity), fall = new Float32Array(w * h).fill(Infinity), part = new Uint8Array(w * h), haloPart = new Uint8Array(w * h);
  // segments in pixel space, each with its core radius and its place in the draw-on
  const segs = [];
  for (const s of M.strokes) {
    // the glyph's core lines stay thin in pixels, however big the mark, so its marks never run together
    const P = s.pts.map(([u, v]) => [2 + u * size, 2 + v * size * squash]), kind = s.part === "sigil" ? 1 : 2, core = Math.max(.6, Math.min((s.dot ? s.r : s.w / 2) * size, kind === 1 ? (s.dot ? 1.6 : 1) + .15 * F.level : Infinity));
    if (s.dot) { segs.push({ a: P[0], b: P[0], at0: s.start, at1: s.start, core, kind }); continue; }
    let run = 0;
    for (let i = 1; i < P.length; i++) { const l = Math.hypot(s.pts[i][0] - s.pts[i - 1][0], s.pts[i][1] - s.pts[i - 1][1]); segs.push({ a: P[i - 1], b: P[i], at0: s.start + run / s.len * (s.end - s.start), at1: s.start + (run + l) / s.len * (s.end - s.start), core, kind }); run += l; }
  }
  for (const g of segs) { // only the pixels near each segment
    const R = reachOf(g.kind), x0 = Math.max(0, Math.floor(Math.min(g.a[0], g.b[0]) - g.core - R)), x1 = Math.min(w - 1, Math.ceil(Math.max(g.a[0], g.b[0]) + g.core + R));
    const y0 = Math.max(0, Math.floor(Math.min(g.a[1], g.b[1]) - g.core - R)), y1 = Math.min(h - 1, Math.ceil(Math.max(g.a[1], g.b[1]) + g.core + R));
    const dx = g.b[0] - g.a[0], dy = g.b[1] - g.a[1], l2 = dx * dx + dy * dy;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const px = x + .5, py = y + .5, t = l2 ? Math.max(0, Math.min(1, ((px - g.a[0]) * dx + (py - g.a[1]) * dy) / l2)) : 0;
      // the core line is round in the plane it lies in: undo the squash to measure it
      const ex = px - g.a[0] - dx * t, ey = py - g.a[1] - dy * t, dPlane = Math.hypot(ex, ey / squash), dScreen = Math.hypot(ex, ey), at = g.at0 + (g.at1 - g.at0) * t, i = y * w + x;
      const inCore = dPlane <= g.core || dScreen <= .6, d = Math.max(0, Math.min(dScreen, dPlane) - g.core);
      if (inCore && at < atCore[i]) { atCore[i] = at; part[i] = g.kind; }
      if (d <= R && at < atHalo[i]) atHalo[i] = at;
      if (d / R < fall[i]) { fall[i] = d / R; haloPart[i] = g.kind; }
    }
  }
  return { id, level, legendary: !!M.legendary, frame: F, w, h, size, squash, reach, atCore, atHalo, fall, part, haloPart };
}
// The leashing rune on the ground: a sigilField foreshortened by the pitch, sized by its
// level's frame (metres) at pxPerMetre.
// legendary: the legendary sigil, LEGEND_SCALE times a legend's rune across.
export function groundSigil(id, { level = 0, pxPerMetre = 16, pitch = GROUND_PITCH, legendary = false } = {}) { return sigilField(id, { level, legendary, size: sigilFrame(legendary ? 3 : level).metres * pxPerMetre * (legendary ? LEGEND_SCALE : 1), squash: Math.sin(pitch) }); }
// The floating form, upright and facing the camera, for the leash stack over the witch's head:
// `px` across for a baby, larger for higher levels (the same frames, scaled down).
// legendary: LEGEND_SCALE times a legend's across.
export function floatSigil(id, { level = 0, px = 16, legendary = false } = {}) { return sigilField(id, { level, legendary, size: px * floatScale(legendary ? 3 : level) * (legendary ? LEGEND_SCALE : 1) }); }
const floatScale = level => Math.pow(sigilFrame(level).metres / 2, .6);
// A floating sigil's height in metres, for the leash stack (a baby's is tuning.size).
// A legendary one is LEGEND_SCALE times a legend's.
export const floatSize = (level, tuning = STACK_TUNING, legendary = false) => tuning.size * floatScale(legendary ? 3 : level) * (legendary ? LEGEND_SCALE : 1);

// Paints a field at t seconds after its draw-on began: the strokes trace in order over
// SIGIL_DRAW_TIME with a bright, flickering pen tip, then glow and pulse (legends shimmer).
// Writes into a canvas (made with makeCanvas, or the one given) and returns it. Every pixel glows:
// draw it unlit, additively ("lighter") for the bloom. progress overrides the draw-on.
export function paintSigilField(g, t, { colour = sigilColour(g.id), canvas, progress, makeCanvas = (w, h) => Object.assign(document.createElement("canvas"), { width: w, height: h }) } = {}) {
  const c = canvas || makeCanvas(g.w, g.h), ctx = c.getContext("2d"), img = ctx.createImageData(g.w, g.h), d = img.data;
  const p = progress ?? Math.min(1, t / SIGIL_DRAW_TIME), written = p >= 1, F = g.frame;
  const pulse = written ? .5 - .5 * Math.cos((t - SIGIL_DRAW_TIME) * Math.PI * 2 / 1.6) : 0;
  const flicker = written ? 1 : .82 + .18 * hash2(Math.floor(t * 30), 7, 3); // a faint flicker while it is written
  const core = toward(colour, WHITE, .62 + .2 * pulse), haloK = F.halo * (.75 + .25 * pulse) * flicker;
  for (let i = 0; i < g.atHalo.length; i++) {
    if (!(g.atHalo[i] <= p)) continue;
    const tip = written ? 0 : Math.max(0, 1 - (p - g.atCore[i]) * 10);
    const sh = F.shimmer && written ? .86 + .14 * Math.sin(t * 2.4 - ((i % g.w) + Math.floor(i / g.w) * 1.7) * .12) : 1; // a slow wave of light across it
    if (g.atCore[i] <= p) {
      const col = g.part[i] === 2 ? toward(colour, WHITE, .35 + .2 * pulse) : toward(core, WHITE, tip);
      d.set([col[0], col[1], col[2], Math.round(255 * Math.min(1, (g.part[i] === 2 ? .8 : 1) * flicker * sh))], i * 4);
    } else {
      const f = Math.max(0, 1 - g.fall[i]), k = g.haloPart[i] === 1 ? Math.min(haloK, .6) : haloK; // soft falloff; the glyph's own halo capped
      d.set([colour[0], colour[1], colour[2], Math.round(255 * f * f * k * sh)], i * 4);
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ---- the leash stack ----
// Leashed creatures' sigils float above the witch's head (Ed): newest at the bottom, just above
// her head, pushing the others up; placing takes the bottom one (last in, first out) and the rest
// settle down. The stack is a chain of springs: each sigil follows the one below with lag and
// damping, so it sways gently when she is still and teeters behind her when she flies fast,
// overshooting a little when she stops or turns; higher sigils lag and swing more; rising and
// descending tilt it too.
// World units are metres: x right, y up, z towards the camera. Positions given back are offsets
// from her head.
export const SIGIL_TRANSITION_TIME = .4;
export const STACK_TUNING = {
  size: .55,       // a baby's floating sigil, metres tall (higher levels larger: floatSize)
  gap: .1,         // metres between one sigil and the next
  stiffness: 70,   // how hard each sigil is pulled to its place above the one below (per second²)
  damping: 7,      // how fast a swing dies away (per second); below 2·√stiffness it overshoots
  trail: .09,      // how far behind it leans per metre per second of her speed (metres)
  growth: .45,     // how much more each sigil higher up lags, trails and sways
  idleSway: .05,   // the gentle sway when she is still (metres)
  idleRate: .35,   // its rate (cycles per second)
  maxLean: .5,     // the furthest a sigil leans from the one below, as a share of their spacing
};
export class SigilStack {
  constructor(tuning = {}) { this.tuning = { ...STACK_TUNING, ...tuning }; this.items = []; this.head = [0, 0, 0]; this.vel = [0, 0, 0]; this.time = 0; this.seed = 0; }
  // A new sigil joins at the bottom (newest), lifting off from `from` (a world point, e.g. the
  // ground rune it was picked up from) or appearing just above her head.
  // legendary: its legendary sigil, LEGEND_SCALE times a legend's.
  push(id, level = 0, from, { legendary = false } = {}) {
    const size = floatSize(level, this.tuning, legendary), start = from ? [...from] : [this.head[0], this.head[1] + size / 2, this.head[2]];
    this.items.unshift({ id, level, legendary, width: size, size, pos: start, vel: [0, 0, 0], phase: hash2(this.seed++, 3, 11) * Math.PI * 2, enter: from ? 0 : 1, from: from ? [...from] : null });
    return this.items[0];
  }
  // Takes the bottom sigil to place it: returns { id, level, legendary, pos } (where it was, in the world).
  place() { const it = this.items.shift(); return it ? { id: it.id, level: it.level, legendary: it.legendary, pos: [...it.pos] } : null; }
  get length() { return this.items.length; }
  // Advances by dt seconds. Give her head's world position (`head`), or her velocity (`velocity`,
  // metres per second, which moves the head).
  update(dt, { head, velocity } = {}) {
    const T = this.tuning;
    if (!(dt > 0)) { // no time passed: just move to the head (the first call places the stack)
      if (head) { const d = head.map((x, j) => x - this.head[j]); this.head = [...head]; for (const it of this.items) it.pos = it.pos.map((x, j) => x + d[j]); }
      return;
    }
    const steps = Math.ceil(dt / (1 / 120)), h = dt / steps;
    const newHead = head ? [...head] : this.head.map((v, j) => v + (velocity?.[j] ?? 0) * dt);
    let v = head ? newHead.map((x, j) => (x - this.head[j]) / dt) : [...(velocity || [0, 0, 0])];
    const sp = Math.hypot(...v); if (sp > 40) v = v.map(x => x * 40 / sp); // a jump (a teleport) is not a flight
    for (let s = 0; s < steps; s++) {
      this.time += h;
      const hp = this.head.map((x, j) => x + (newHead[j] - x) * (s + 1) / steps);
      this.items.forEach((it, i) => {
        const below = i === 0 ? hp : this.items[i - 1].pos, belowVel = i === 0 ? v : this.items[i - 1].vel, g = 1 + T.growth * i;
        const spacing = (i === 0 ? T.gap : this.items[i - 1].size / 2 + T.gap) + it.size / 2;
        const sway = Math.sin(this.time * Math.PI * 2 * T.idleRate + it.phase) * T.idleSway * g, sway2 = Math.cos(this.time * Math.PI * 2 * T.idleRate * .8 + it.phase) * T.idleSway * .5 * g;
        // its place: above the one below, leaning back against her motion (rising pulls it down too)
        let lean = [-v[0] * T.trail * g + sway, -v[1] * T.trail * g * .6, -v[2] * T.trail * g + sway2];
        const ll = Math.hypot(lean[0], lean[2]), cap = T.maxLean * spacing; if (ll > cap) lean = [lean[0] * cap / ll, lean[1], lean[2] * cap / ll];
        const target = [below[0] + lean[0], below[1] + Math.max(spacing * .5, spacing + lean[1]), below[2] + lean[2]];
        const k = T.stiffness / g;
        for (let j = 0; j < 3; j++) { const a = k * (target[j] - it.pos[j]) - T.damping * (it.vel[j] - belowVel[j]); it.vel[j] += a * h; it.pos[j] += it.vel[j] * h; }
        if (it.enter < 1) it.enter = Math.min(1, it.enter + h / SIGIL_TRANSITION_TIME);
      });
    }
    this.head = newHead; this.vel = v;
  }
  // Where each sigil is, bottom (newest) first: { id, level, legendary, size (metres tall), width (metres; a legendary one's circle as wide as tall), offset (from her head; its centre), tilt
  // (radians, leaning from the one below; positive to the right), enter (0..1 of its lift-off) }.
  layout() {
    return this.items.map((it, i) => {
      const below = i === 0 ? this.head : this.items[i - 1].pos, dx = it.pos[0] - below[0], dy = it.pos[1] - below[1];
      return { id: it.id, level: it.level, legendary: it.legendary, size: it.size, width: it.width, offset: it.pos.map((x, j) => x - this.head[j]), tilt: Math.atan2(dx, Math.max(.05, dy)), enter: it.enter };
    });
  }
}
// The lift-off and set-down transitions (each SIGIL_TRANSITION_TIME), for t from 0 to 1:
//   rise: 0 on the ground .. 1 in its place in the stack (ease it along a gentle arc);
//   upright: 0 lying flat (the ground rune) .. 1 standing, facing the camera (squash the
//   ground form's height from sin(pitch) to 1 as it peels up); scale: 0 the ground rune's size ..
//   1 the floating size; draw: how much of the ground rune is drawn (the set-down writes itself).
export function liftOff(t) { const e = Math.min(1, Math.max(0, t)), s = e * e * (3 - 2 * e); return { rise: s, upright: Math.min(1, e * 1.6), scale: s, draw: 1 }; }
export function setDown(t) { const e = Math.min(1, Math.max(0, t)), drop = Math.min(1, e / .55), s = drop * drop; return { rise: 1 - s, upright: 1 - Math.min(1, drop * 1.2), scale: 1 - s, draw: Math.max(0, (e - .45) / .55) }; }

export const SIGIL_IDS = SPECIES.map(s => s.id);

// ---- the detailed sigil's strokes (art/sigilDetail.js) ----
// A sigil's own strokes as polylines in its unit box (no circle, no frame): its plain strokes, and from tier 1 the animal's
// extra detail (LEGEND_DETAIL, the same strokes the legend circle carries, here at full size).
export function sigilDetailStrokes(id, tier = 2) {
  return [...(SIGILS[id] || []), ...(tier >= 1 && LEGEND_DETAIL[id] || [])].map(polyline);
}

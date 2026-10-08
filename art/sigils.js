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

export const SIGIL_STROKE = .07;  // stroke width, in the unit box
export const SIGIL_DOT = .048;    // end-dot radius
export const SIGIL_DRAW_TIME = .6; // seconds for the draw-on

// ---- building blocks ----
const L = (...pts) => ({ l: pts }), A = (cx, cy, r, from, to) => ({ a: [cx, cy, r, from, to] }), D = (x, y) => ({ d: [x, y] });
const stave = (top, bottom = .86) => L([.5, bottom], [.5, top]); // written upwards
const FOOT = A(.5, .76, .13, 25, 155);                            // the crescent under every stave
const mirror = s => s.l ? { l: s.l.map(([x, y]) => [1 - x, y]) } : s.a ? { a: [1 - s.a[0], s.a[1], s.a[2], 180 - s.a[3], 180 - s.a[4]] } : { d: [1 - s.d[0], s.d[1]] };
const pair = (...ss) => ss.flatMap(s => [s, mirror(s)]); // a left stroke and its mirror
// an arc through two points, bulging by k (sagitta / chord; positive bulges to the left of p0 -> p1)
function bow(p0, p1, k) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], c = Math.hypot(dx, dy), h = k * c, r = (c * c / 4 + h * h) / (2 * Math.abs(h));
  const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, nx = dy / c, ny = -dx / c, off = (r - Math.abs(h)) * Math.sign(h);
  const cx = mx - nx * off, cy = my - ny * off, a0 = Math.atan2(p0[1] - cy, p0[0] - cx) * 180 / Math.PI;
  let a1 = Math.atan2(p1[1] - cy, p1[0] - cx) * 180 / Math.PI;
  // go the short way round when the bulge is small, the long way when it is more than half a circle
  let sweep = a1 - a0; while (sweep > 180) sweep -= 360; while (sweep < -180) sweep += 360;
  return A(cx, cy, r, a0, a0 + sweep);
}
const wave = (x0, y0, y1, amp, turns, n = 24) => L(...Array.from({ length: n + 1 }, (_, i) => [x0 + amp * Math.sin(i / n * turns * 2 * Math.PI), y0 + (y1 - y0) * i / n]));
const spiral = (cx, cy, r0, r1, turns, start = 0, n = 40) => L(...Array.from({ length: n + 1 }, (_, i) => { const t = i / n, a = (start + t * turns * 360) * Math.PI / 180, r = r0 + (r1 - r0) * t; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }));
const rays = (cx, cy, r0, r1, angles) => angles.map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return L([cx + r0 * c, cy + r0 * s], [cx + r1 * c, cy + r1 * s]); });

// ---- the sigils ----
// (Ed, 2026-10-06: "The animal sigils are too abstract", with a reference set: monoline icons, one thick round-capped stroke, no
// fills, each the actual animal by its two or three defining features; mostly front-on symmetrical heads filling the square;
// animals whose head isn't their identity drawn whole, top-down and symmetrical (a spider, a beetle, a moth, a woodlouse); long
// bodies curled round into a ring (the snake, the stoat, the newt, the dormouse). One family: the same stroke, smooth curves,
// a few strokes each.) Each comment says what makes it the animal.
const C = (cx, cy, r) => A(cx, cy, r, -90, 270); // a circle, drawn from the top
const E = (cx, cy, rx, ry, a0 = -90, a1 = 270, n = 36) => L(...Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; }));
const at = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
export const SIGILS = {
  // a sharp, angular face: tall pointed ears, a long wedge of a muzzle, slanted eyes
  wolf: [...pair(L([.4, .3], [.22, .07], [.17, .44], [.32, .7], [.5, .92])), L([.4, .3], [.6, .3]), ...pair(L([.31, .46], [.42, .5])), D(.5, .82)],
  // big triangle ears, a cheek ruff flaring wide, a narrow pointed snout
  fox: [...pair(L([.4, .3], [.15, .07], [.13, .44], [.05, .54], [.3, .62], [.5, .88]), L([.2, .2], [.26, .32])), L([.4, .3], [.6, .3]), ...pair(D(.37, .5)), D(.5, .8)],
  // the striped face: a round head, two stripes running from the snout over the eyes, little round ears
  badger: [E(.5, .54, .34, .38), ...pair(bow([.45, .88], [.38, .17], .1), A(.2, .26, .07, 110, 330)), ...pair(D(.32, .52)), D(.5, .82)],
  // tusks curling up beside a round snout with nostrils, pointed ears, a bristly crest
  boar: [...pair(L([.5, .2], [.3, .22], [.2, .42], [.28, .62], [.36, .7]), L([.3, .22], [.12, .08], [.2, .34]), bow([.38, .84], [.24, .62], .4), D(.45, .76), D(.36, .44), L([.42, .2], [.4, .11])), E(.5, .76, .15, .1), L([.5, .2], [.5, .08])],
  // branching antlers over a slim face, ears out to the sides
  stag: [...pair(L([.4, .42], [.4, .68], [.5, .9]), L([.4, .44], [.2, .4], [.36, .52]), L([.43, .4], [.35, .26], [.24, .07]), L([.37, .3], [.17, .25]), L([.3, .17], [.38, .07]), D(.44, .56)), L([.4, .42], [.6, .42])],
  // broad palmate antlers like open hands, a long overhanging nose, the bell under the chin
  elk: [...pair(L([.42, .38], [.3, .34], [.16, .28], [.07, .12], [.15, .18], [.2, .08], [.27, .2], [.33, .1], [.38, .26], [.42, .38]), L([.42, .38], [.4, .74], [.44, .86], [.5, .87]), D(.44, .52)), L([.42, .38], [.58, .38]), L([.5, .87], [.5, .95])],
  // two long ears standing up, a round face, a little nose and whiskers
  hare: [...pair(E(.39, .24, .07, .19), D(.42, .58), L([.36, .72], [.16, .68])), C(.5, .62, .23), L([.46, .7], [.5, .74], [.54, .7]), L([.5, .74], [.5, .78])],
  // big eye discs, ear tufts and a hooked beak
  owl: [...pair(L([.5, .3], [.3, .25], [.15, .08], [.13, .5], [.3, .83], [.5, .92]), C(.34, .47, .12), D(.34, .47)), L([.45, .62], [.5, .72], [.55, .62])],
  // round ears on a big round head, a broad muzzle
  bear: [C(.5, .56, .33), ...pair(A(.23, .27, .1, 110, 330), D(.37, .48)), E(.5, .7, .15, .11), D(.5, .66)],
  // a hood of spines round a small face, a pointed snout
  hedgehog: [L(...Array.from({ length: 15 }, (_, i) => at(.5, .55, i % 2 ? .3 : .42, 180 + i * 180 / 14))), ...pair(L([.2, .55], [.5, .88]), D(.4, .62)), D(.5, .88)],
  // a front-on face with tufted ears and round cheeks, its great bushy tail curling up behind
  squirrel: [E(.4, .6, .2, .22), ...[[.27, .43], [.53, .43]].map(([x, y]) => L([x - .04, y + .02], [x, y - .16], [x + .05, y + .01])), D(.33, .58), D(.47, .58), D(.4, .7), bow([.58, .76], [.78, .1], -.38), bow([.78, .1], [.6, .3], -.7)],
  // bulging eyes sitting on top of a wide, flat head; a wide smiling mouth
  toad: [E(.5, .62, .42, .25, -12, 192), ...pair(C(.3, .36, .13), L([.25, .36], [.35, .36])), bow([.22, .67], [.78, .67], -.12), L([.08, .62], [.92, .62])],
  // a flat round head with tiny ears, a whiskered muzzle in two lobes
  otter: [E(.5, .52, .36, .3), ...pair(A(.18, .32, .07, 140, 330), D(.36, .45), A(.43, .63, .07, -20, 180), L([.3, .66], [.07, .62]), L([.31, .72], [.1, .78])), D(.5, .59)],
  // tufted ears and a ruff of fur round the cheeks
  lynx: [...pair(L([.38, .27], [.22, .12], [.18, .4], [.07, .55], [.2, .61], [.13, .72], [.32, .78], [.5, .85]), L([.22, .12], [.22, .05]), D(.37, .48)), L([.38, .27], [.62, .27]), L([.45, .6], [.55, .6], [.5, .66], [.45, .6]), ...pair(bow([.5, .66], [.41, .71], -.4))],
  // the raven side on: a great thick beak, a bright eye, its throat and back
  raven: [A(.4, .42, .22, 200, 395), L([.59, .32], [.94, .46], [.6, .55]), D(.45, .37), L([.21, .5], [.28, .88]), L([.6, .55], [.58, .88])],
  // wings spread wide with scalloped edges, pointed ears
  bat: [E(.5, .54, .07, .14), ...pair(L([.46, .42], [.44, .32], [.49, .38]), L([.45, .46], [.24, .3], [.05, .38]), bow([.05, .38], [.18, .6], .25), bow([.18, .6], [.32, .54], .3), bow([.32, .54], [.45, .62], .3))],
  // a velvet head with tiny eyes, a long pointed snout, two broad clawed digging hands
  mole: [C(.5, .4, .24), L([.4, .6], [.5, .86], [.6, .6]), D(.5, .86), ...pair(D(.42, .4), E(.17, .66, .1, .09), L([.1, .72], [.06, .82]), L([.17, .75], [.16, .86]), L([.24, .73], [.27, .83]))],
  // two big front teeth, little round ears, a round face
  beaver: [E(.5, .5, .32, .34), ...pair(A(.22, .22, .07, 120, 330), D(.38, .44)), D(.5, .6), L([.43, .7], [.43, .83], [.57, .83], [.57, .7]), L([.5, .7], [.5, .83])],
  // a long slender body curled round in a ring, its dark tail tip (a dot) by its nose
  stoat: [A(.5, .54, .33, -40, 250), C(.68, .26, .1), ...[[.62, .18], [.72, .16]].map(([x, y]) => L([x, y + .02], [x - .02, y - .07], [x + .03, y - .01])), D(.71, .27), D(...at(.5, .54, .33, 250))],
  // a spiral shell on its foot, two eye stalks
  snail: [spiral(.44, .5, .03, .28, 2.1, -90), L([.08, .82], [.82, .82], [.9, .74]), L([.82, .8], [.78, .52]), L([.86, .76], [.92, .5]), D(.78, .52), D(.92, .5)],
  // great horns curling round beside a long face
  ram: [...pair(L([.4, .34], [.41, .74], [.5, .86]), spiral(.24, .38, .05, .19, 1.15, 330), D(.44, .52)), L([.4, .34], [.6, .34])],
  // a segmented oval shell seen from above, its feelers and little legs
  woodlouse: [E(.5, .55, .24, .36), ...[.36, .48, .6, .72].map(y => L([.5 - Math.sqrt(1 - ((y - .55) / .36) ** 2) * .24, y], [.5 + Math.sqrt(1 - ((y - .55) / .36) ** 2) * .24, y])), ...pair(L([.43, .2], [.24, .06]), L([.27, .44], [.14, .42]), L([.26, .58], [.12, .6]), L([.29, .72], [.16, .78]))],
  // coiled round in a ring, its head raised in the middle, a forked tongue
  snake: [spiral(.5, .54, .16, .4, 1.3, 0), C(.5, .48, .1), D(.47, .46), L([.5, .58], [.5, .66]), ...pair(L([.5, .66], [.45, .7]))],
  // wings spread, the forewings broad and the hindwings rounded, a furry body and feathery antennae
  moth: [E(.5, .54, .05, .24), ...pair(L([.46, .34], [.2, .14], [.06, .3], [.2, .5], [.46, .5]), L([.46, .52], [.26, .62], [.22, .82], [.4, .84], [.46, .66]), bow([.47, .31], [.34, .07], .3), C(.21, .32, .05))],
  // round ears high on a pointed face, a pale bib under the chin
  marten: [...pair(L([.5, .26], [.28, .3], [.2, .48], [.36, .72], [.5, .8]), A(.24, .24, .09, 110, 340), D(.37, .5)), D(.5, .72), bow([.36, .88], [.64, .88], -.2)],
  // seen from above: a round head, a plump body, four legs with splayed toes and a tail curling round
  salamander: [E(.5, .14, .1, .08), E(.5, .42, .1, .2), bow([.5, .62], [.76, .9], .4), ...pair(L([.42, .32], [.24, .26], [.18, .18]), L([.24, .26], [.14, .3]), L([.42, .52], [.24, .6], [.2, .7]), L([.24, .6], [.13, .6]), D(.46, .12))],
  // side on: a long low body, a wavy crest running along its back and tail, small bent legs
  newt: [E(.36, .58, .24, .08), C(.17, .55, .07), D(.15, .53), L([.6, .58], [.94, .52]), L(...Array.from({ length: 25 }, (_, i) => [.2 + .72 * i / 24, .47 - .012 * i / 24 * 6 - .035 * Math.abs(Math.sin(i / 24 * 5 * Math.PI))])), L([.26, .65], [.22, .76], [.15, .78]), L([.46, .65], [.5, .76], [.57, .78])],
  // the heron side on: the dagger bill, a plume behind its head, an S-neck, long legs
  heron: [C(.36, .18, .07), D(.38, .17), L([.43, .19], [.92, .26]), L([.3, .15], [.1, .1]), bow([.33, .25], [.42, .5], .35), E(.48, .58, .2, .1), L([.44, .68], [.42, .94]), L([.52, .68], [.56, .94])],
  // a segmented grub arching round to its glowing lantern tail, rays shining out
  glowworm: [A(.4, .58, .26, 180, 340), ...[200, 235, 270, 305].map(a => L(at(.4, .58, .2, a), at(.4, .58, .32, a))), D(.14, .58), C(.69, .55, .1), ...rays(.69, .55, .15, .24, [-90, -30, 30, 90, 150])],
  // seen from above: a round body and a small head, eight bent legs
  spider: [C(.5, .62, .15), C(.5, .38, .08), ...pair(L([.44, .36], [.26, .24], [.2, .06]), L([.43, .42], [.2, .38], [.08, .26]), L([.4, .55], [.18, .58], [.07, .72]), L([.42, .68], [.24, .8], [.2, .94]))],
  // curled up asleep in a ball: its tail wrapped round, a round ear and a closed eye
  dormouse: [C(.5, .55, .34), spiral(.52, .58, .06, .2, .9, 90), C(.32, .3, .08), bow([.36, .44], [.48, .44], -.45)],
  // seen from above: great antler mandibles, a head, wing cases split down the middle, legs
  beetle: [E(.5, .64, .2, .26), L([.5, .4], [.5, .9]), E(.5, .32, .12, .08), ...pair(L([.43, .27], [.32, .14], [.3, .04]), L([.33, .16], [.4, .11]), L([.31, .54], [.14, .48]), L([.3, .66], [.12, .68]), L([.33, .78], [.18, .9]))],
};

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
  woodlouse: [...pair(L([.24, .06], [.16, .1]), L([.43, .9], [.39, .97]), D(.43, .27))],
  snake: [D(.53, .46), ...[.5, .62, .74, .86].map(t => D(...at(.5, .54, .07 + .24 * t, t * 468)))],
  moth: [...pair(C(.34, .7, .045), L([.45, .4], [.14, .24]))],
  marten: [...pair(A(.24, .24, .045, 110, 340), L([.42, .7], [.28, .72]))],
  salamander: [...pair(D(.46, .38), D(.46, .5), L([.2, .7], [.16, .76]))],
  newt: [D(.28, .62), D(.38, .63), D(.48, .62), L([.22, .76], [.18, .82])],
  heron: [L([.35, .48], [.31, .6]), L([.4, .5], [.37, .62]), bow([.32, .56], [.64, .6], -.25), L([.42, .94], [.36, .97]), L([.56, .94], [.63, .97])],
  glowworm: [...rays(.69, .55, .15, .2, [-60, 0, 60, 120]), L([.14, .58], [.08, .5]), D(.69, .55)],
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
export const SIGIL_NEON = { heron: "blue", badger: "pink", boar: "cyan", snail: "acid", fox: "violet", ram: "orange", woodlouse: "lemon", hedgehog: "red", squirrel: "mint", wolf: "blue", stag: "magenta", stoat: "pink", snake: "cyan", hare: "acid", owl: "violet", bear: "orange", toad: "lemon", otter: "red", lynx: "mint", elk: "blue", raven: "magenta", bat: "pink", mole: "cyan", beaver: "acid", beetle: "violet", moth: "orange", marten: "lemon", salamander: "red", glowworm: "mint", spider: "blue", dormouse: "magenta", newt: "acid" };
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
export function sigilArrival(id, size = 16) {
  const strokes = sigilStrokes(id), at = new Float64Array(size * size), half = Math.max(SIGIL_STROKE / 2, .62 / size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) at[y * size + x] = inkAt(strokes, (x + .5) / size, (y + .5) / size, half);
  return at;
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

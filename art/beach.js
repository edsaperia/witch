// The beach's decorations (Ed, 2026-10-06: "The beach should have a few beach decorations, sparsely: shells, star fish,
// conch, footprints of people and creatures. No towels or deckchairs or human items, just nature."): small pieces lying
// on the sand, and the prints a trail of footprints is stamped from. Nothing man-made. Built in 3D at the witch's scale
// (she is about 1.3 units tall), a little larger than life so they read at the game's size, as the relics are.
//   finds    shells (a cockle, a scallop, a whelk), starfish (orange and violet), a conch, seaweed, pebbles, and the
//            rocks of the beach's rocky stretches;
//   prints   one footprint each (a bare human foot, a paw, a cloven hoof, a bird's three toes), pressed into the sand,
//            baked at PRINT_HEADINGS headings so a trail can wander any way (the game draws a left foot mirrored).
import { M, Sprite, hsv2rgb, sinHash } from "./core.js";
import { Model, render } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

const bCell = (p, k, s = 0) => sinHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));

// ---------------- the finds ----------------
const FINDS = {
  "shell-cockle": { desc: "a ribbed cockle shell, pale cream", size: 1.3, build(m) { m.ell([0, .03, 0], [.11, .045, .1], M.BELLY, { group: 1, paint: p => ((Math.atan2(p[2], p[0]) * 7 + 20) % 1) < .25 ? M.CLOTH : undefined }); } },
  "shell-scallop": { desc: "a fan-ribbed scallop shell, blush pink", size: 1.3, build(m) { m.ell([0, .025, 0], [.13, .04, .11], M.ACCENT, { group: 1, paint: p => { const a = Math.atan2(p[2] + .08, p[0]); return ((a * 9 + 20) % 1) < .3 ? M.BELLY : undefined; } }); m.ell([0, .02, .1], [.04, .02, .03], M.ACCENT, { group: 2 }); } },
  "shell-whelk": { desc: "a small spiral whelk, sandy brown", size: 1.3, build(m) { m.chain([[-.1, .04, 0, .07], [0, .05, 0, .055], [.08, .05, 0, .035], [.14, .045, 0, .012]], M.BODY3, { group: 1, paint: p => ((p[0] * 14 + 9) % 1) < .35 ? M.BELLY : undefined }); } },
  "starfish": { desc: "a five-armed starfish, sunset orange", size: 1.2, build(m) { for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 + .3; m.seg([0, .02, 0], [Math.cos(a) * .2, .015, Math.sin(a) * .2], .055, .015, M.BODY, { group: 1, paint: p => bCell(p, 30) < .2 ? M.BELLY : undefined }); } m.ell([0, .025, 0], [.06, .025, .06], M.BODY, { group: 1 }); } },
  "starfish-violet": { desc: "a five-armed starfish, deep violet", size: .9, build(m) { for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 + 1.1; m.seg([0, .02, 0], [Math.cos(a) * .19, .015, Math.sin(a) * .19], .05, .014, M.BODY2, { group: 1, paint: p => bCell(p, 30) < .2 ? M.ACCENT : undefined }); } m.ell([0, .025, 0], [.055, .025, .055], M.BODY2, { group: 1 }); } },
  "conch": { desc: "a conch shell, its lip flared pink", size: 1.2, build(m) { m.chain([[-.2, .07, 0, .1], [-.05, .09, 0, .11], [.1, .07, 0, .07], [.22, .05, 0, .02]], M.BELLY, { group: 1, paint: p => ((p[0] * 10 + 9) % 1) < .25 ? M.BODY3 : bCell(p, 24) < .15 ? M.CLOTH : undefined }); m.ell([-.06, .07, .08], [.11, .06, .05], M.ACCENT, { group: 2 }); for (let k = 0; k < 4; k++) m.ell([-.15 + k * .08, .17 - k * .02, -.02], [.025, .03, .025], M.BELLY, { group: 3 }); } },
  "seaweed": { desc: "a tangle of dark seaweed washed up", size: 1, build(m) { for (let k = 0; k < 4; k++) { const a = sinHash(k, 3) * 6.283, l = .18 + sinHash(k, 5) * .14; m.chain([[0, .015, 0, .03], [Math.cos(a) * l * .5, .015, Math.sin(a) * l * .5 + .03, .025], [Math.cos(a + .5) * l, .012, Math.sin(a + .5) * l, .012]], k % 2 ? M.LEAF3 : M.BARK2, { group: 1 + k }); } } },
  "pebbles": { desc: "a few smooth pebbles", size: 1, build(m) { for (let k = 0; k < 4; k++) m.ell([(sinHash(k) - .5) * .3, .025, (sinHash(k, 2) - .5) * .2], [.05 + sinHash(k, 4) * .03, .03, .04], k % 2 ? M.STONE : M.STONED, { group: 1 + k }); } },
  "rock": { desc: "a rock on a rocky stretch, wet at its foot, weed on it", size: 1, build(m) { m.ell([0, .16, 0], [.42, .24, .32], M.STONE, { group: 1, rough: .05, paint: p => p[1] < .06 ? M.STONED : p[1] > .3 && bCell(p, 8) < .3 ? M.LEAF3 : bCell(p, 12) < .12 ? M.STONED : undefined }); m.ell([.3, .08, .15], [.18, .1, .14], M.STONE, { group: 2, rough: .04, paint: p => p[1] < .04 ? M.STONED : undefined }); } },
  "rocks": { desc: "a low spread of rocks on a rocky stretch", size: 1, build(m) { for (let k = 0; k < 3; k++) m.ell([(k - 1) * .3 + (sinHash(k) - .5) * .1, .08 + sinHash(k, 3) * .05, (sinHash(k, 2) - .5) * .25], [.18 + sinHash(k, 4) * .1, .1 + sinHash(k, 5) * .06, .15], k % 2 ? M.STONE : M.STONED, { group: 1 + k, rough: .04, paint: p => p[1] > .14 && bCell(p, 9) < .25 ? M.LEAF3 : undefined }); } },
};

// ---------------- the prints ----------------
// One print, along +x (toes at +x), pressed into the sand: a soft shadow a little darker than the sand (M.HAIR here).
const PRINTS = {
  "print-foot": { desc: "a bare human footprint", size: .9, build(m) { m.ell([-.07, .002, 0], [.05, .002, .04], M.HAIR, { group: 1 }); m.ell([.04, .002, .005], [.07, .002, .045], M.HAIR, { group: 1 }); for (let k = 0; k < 4; k++) m.ell([.12 + (k === 0 ? .01 : 0), .002, -.04 + k * .025], [.015, .002, .012], M.HAIR, { group: 2 }); } },
  "print-paw": { desc: "a paw print", size: .9, build(m) { m.ell([-.01, .002, 0], [.04, .002, .045], M.HAIR, { group: 1 }); for (let k = 0; k < 4; k++) { const a = -.75 + k * .5; m.ell([.035 + Math.cos(a) * .05, .002, Math.sin(a) * .06], [.017, .002, .016], M.HAIR, { group: 2 }); } } },
  "print-hoof": { desc: "a cloven hoof print", size: .9, build(m) { for (const z of [-.025, .025]) m.ell([0, .002, z], [.06, .002, .02], M.HAIR, { group: 1 }); } },
  "print-bird": { desc: "a bird's three-toed print", size: .9, build(m) { for (const a of [-.55, 0, .55]) m.seg([0, .002, 0], [Math.cos(a) * .09, .002, Math.sin(a) * .09], .01, .007, M.HAIR, { group: 1 }); m.seg([0, .002, 0], [-.04, .002, 0], .008, .006, M.HAIR, { group: 1 }); } },
};
/** How many headings each print is baked at (heading k: toes toward angle k / PRINT_HEADINGS of a turn, on the ground). */
export const PRINT_HEADINGS = 8;

export const BEACH_FINDS = Object.entries(FINDS).map(([id, d]) => ({ id, kind: "find", ...d }));
export const BEACH_PRINTS = Object.entries(PRINTS).map(([id, d]) => ({ id, kind: "print", ...d }));
const BY_ID = Object.fromEntries([...BEACH_FINDS, ...BEACH_PRINTS].map(d => [d.id, d]));

export function beachColours(st = {}) {
  const sand = st.sandHue ?? .1;
  return {
    [M.BELLY]: [232, 220, 196], [M.CLOTH]: [250, 244, 228], [M.ACCENT]: [228, 150, 150], [M.BODY3]: [130, 92, 62], // shell cream and white, blush pink, whelk brown
    [M.BODY]: [232, 120, 60], [M.BODY2]: [120, 70, 150], // the starfish
    [M.STONE]: [104, 104, 112], [M.STONED]: hsv2rgb(sand, .35, .38), // rock grey; the dark of wet sand at a rock's foot
    [M.HAIR]: hsv2rgb(sand, .32, .7), // a footprint: the sand a shade darker in its hollow
    [M.LEAF3]: [46, 62, 40], [M.BARK2]: [70, 60, 36], // seaweed
    [M.NOSE]: [14, 12, 18], [M.LINE]: [24, 22, 30],
  };
}

/** One beach piece, drawn: { whole, origin, metres }. A print takes `heading` (0 .. PRINT_HEADINGS - 1). */
export function beachSprite(id, st = {}, { ppm = 16, heading = 0 } = {}) {
  const d = BY_ID[id]; if (!d) throw new Error(`no beach piece "${id}"`);
  const m = new Model({ blend: .03 }); d.build(m);
  if (d.kind === "print" && heading) { const a = heading / PRINT_HEADINGS * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); for (const q of m.parts) { const rot = v => [v[0] * c - v[2] * s, v[1], v[0] * s + v[2] * c]; if (q.type === "cone") { q.a = rot(q.a); q.b = rot(q.b); } else { q.c = rot(q.c); q.axes = q.axes.map(rot); } } }
  m.ell([0, .004, 0], [.005, .002, .005], M.NOSE, { group: 0, extra: true }); // (keeps the origin in the frame)
  const s = witchPixelsPerUnit(st) * d.size, { sp, project } = render(m, { scale: s });
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) { x0 = 0; x1 = 0; y0 = 0; y1 = 0; }
  const W = x1 - x0 + 1, H = y1 - y0 + 1, crop = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (mm && mm !== M.NOSE) crop.put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  crop.bodyH = sp.bodyH;
  const [px, py] = project([0, 0, 0]);
  return { whole: crop, origin: { x: +(px - x0).toFixed(1), y: +(py - y0).toFixed(1) }, metres: { width: +(W / ppm).toFixed(2), height: +(H / ppm).toFixed(2) } };
}

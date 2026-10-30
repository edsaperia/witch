// Witch creatures built in 3D (see model3d.js), so they stand in true three-quarter view.
// Units: the shoulder is about 1 high; x forward, y up, z towards the near side.
import { M, rng, uni, hash2 } from "./core.js";
import { Model, render, v3, spotty, masks } from "./model3d.js";
import { faceUp, JAW_FACES } from "./genome/expressions.js";
import { textureLumps } from "./genome/texture.js";
import { compileGraph } from "./body-graph/graph.js";
import { quadrupedTorsoGraph, quadrupedEarSocket, wrappedRosette, regionMarking, rosetteSizing } from "./body-graph/quadruped.js";
import { mandiblePart } from "./body-graph/mandibles.js";
import { elderQuad, grizzle, notch, surfaceFrom, ring, fitRing, frontPts, closed, charm, crown, drawOn, meerkatDress, sentinelHeap } from "./elders.js";

// Levels (Ed): 0 baby, 1 young, 2 adult, 3 legend.
// Height on screen in art pixels: babies about 30; young about 45 at the default style, about the
// witch's height for the bigger species, built on what was the adult model; adults a clear step up
// (Ed, 2026-10-04: "the size difference should be obvious ... use the current Adult models for
// Youths, and come up with something larger for Adults"): 1.65 times their young, heavier in build
// (thicker body, legs and neck, a bigger head, bigger horns, antlers and tusks) with a few glowing
// motes; legends about 4.5 times their young and never less than 2.2 times their adult. They keep
// their size on screen as pixels grow.
export const ADULT_SCALE = 1.65, LEGEND_OVER_ADULT = 2.2;
const LEVEL_SCALE = st => [1, Math.sqrt(st.growth), Math.sqrt(st.growth) * ADULT_SCALE, st.growth];
export const height3d = (level, st, hgt = 1) => Math.round(st.size * LEVEL_SCALE(st)[Math.max(0, Math.min(3, level))] * (2 / (st.pixel || 2)) * 1.9 * hgt);

const glowMotes = (sp, seed, n = 9) => { // a few glowing motes around a legend (9) or an adult (3)
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const x = Math.floor(uni(r, 2, sp.w - 2)), y = Math.floor(uni(r, 2, sp.h * .6));
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    sp.px(x, y, M.MAGIC2); if (i % 3 === 0) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) sp.px(x + dx, y + dy, M.MAGIC);
  }
};

// A feathered wing: a fan of long flat feathers from shoulder to tip, lifted and swept back.
// A dragon's wing membrane (the wings feature): a straight leading edge, its trailing edge scalloped between the finger bones and
// narrowing to the tip (s: -1 at the shoulder to 1 at the tip; t: -1 the trailing edge to 1 the leading).
const dragonWing = mat => (s, t) => { const u = (s + 1) / 2, trail = -1 + 1.75 * u * u + .28 * Math.abs(Math.sin(u * Math.PI * 3)); return t < trail || t > 1 - .15 * u ? null : mat; };
function wing3d(m, root, side, span, up, mat, mat2, group) {
  // one shaped plane: a feathered outline, raised and swept back, its leading edge forward
  const tip = v3.add(root, [-span * .7, span * (.75 + up), side * span * .35]), u = v3.norm(v3.sub(tip, root));
  const v = v3.norm(v3.sub([1, 0, 0], v3.mul(u, v3.dot([1, 0, 0], u)))), L = Math.hypot(...v3.sub(tip, root));
  m.flat(v3.add(v3.lerp(root, tip, .5), v3.mul(v, -span * .14)), u, v, L * .55, span * .34, masks.wing(mat, mat2), { group, extra: true });
}

// The size a creature is drawn at: babies are chunky, about 28 to 32 pixels (the coordinator), times st.creatureScale (Ed,
// 2026-10-08: "creatures are quite hard to make out ... I think +50% is ok"): babies, young and adults alike, baked at the
// art pixel (docs/STYLE.md §1; ?creatures= in the game tries others). A legend keeps its own size unless that would bring it
// within LEGEND_OVER_SCALED of its scaled adult's full height, which keeps it 2.1+ times the adult by body height (the legend's
// motes and crests add to its full height, not its body's).
export const LEGEND_OVER_SCALED = 2.35;
const drawHeight = (level, st, k = 1) => { const c = st.creatureScale || 1; return c === 1 ? drawHeight1(level, st, k)
  : level === 3 ? Math.round(Math.max(height3d(3, st) * k, Math.round(height3d(2, st, k) * c) * LEGEND_OVER_SCALED)) : Math.round(drawHeight1(level, st, k) * c); };
const drawHeight1 = (level, st, k = 1) => level === 0 ? Math.round(Math.max(12, Math.min(30 * Math.max(.75, Math.min(1.1, k)), height3d(1, st) * k * .72))) // a baby: about 30, never taller than 3/4 of its young
  : level === 2 ? height3d(2, st, k) // an adult: 1.65 times its young
  : level === 3 ? Math.round(Math.max(height3d(3, st) * k, height3d(2, st, k) * LEGEND_OVER_ADULT)) // a legend: far above its adult
  : height3d(level, st) * k;
// An adult's heavier build for the body plans without their own: every part thicker across (x and z), not taller.
const beef = (m, k) => { for (const q of m.parts) { if (q.lean) continue; // (stilts, toes and the like keep their slenderness)
    if (q.type === "ell") q.r = [q.r[0] * k, q.r[1], q.r[2] * k]; else if (q.type === "box") q.h = [q.h[0] * k, q.h[1], q.h[2] * k]; else { q.r1 *= k; q.r2 *= k; } } };

// ================= party gear =================
// Party animals (creatures the witch has invited) wear a glowing collar, and some a party hat,
// sunglasses or fancy shoes (Ed). Each builder records anchors on its model (head, eyes, neck,
// feet); gearUp adds the parts before it is drawn. The gear in force is set by critter.
let GEAR = null;
// The texture in force while a creature is built (critter: genome/texture.js): its lumps go on its volumes.
let TEX = null;
export function withTexture(tex, f) { const was = TEX; TEX = tex; try { return f(); } finally { TEX = was; } }
// A creature's form, if not its ordinary one: a hook that draws the finished model instead of
// render (legends.js: the sleeping legends, sunk and overgrown, waking, and woken). It returns the
// sprite; form.motes says whether the glowing motes still float round it.
let FORM = null;
export function withForm(form, f) { const was = FORM; FORM = form; try { return f(); } finally { FORM = was; } }
// A genome's spine (quad3d) as a height along the body, x in body lengths from the hip station (-.5) to the shoulder's (.48): a
// number for the whole back, or heights at the profile's stations, straight lines between, fading to nothing past the ends.
function spineOf(s) {
  if (s == null) return null;
  const at = [-.5, -.25, 0, .25, .48], h = typeof s === "number" ? [s, s, s, s, s] : ["hip", "loin", "waist", "ribcage", "shoulder"].map(k => s[k] ?? 0);
  if (!h.some(v => v)) return null;
  return x => { if (x <= at[0] - .35 || x >= at[4] + .35) return 0; if (x <= at[0]) return h[0] * (1 - (at[0] - x) / .35); if (x >= at[4]) return h[4] * (1 - (x - at[4]) / .35); for (let i = 0; i < 4; i++) if (x <= at[i + 1]) return h[i] + (h[i + 1] - h[i]) * (x - at[i]) / (at[i + 1] - at[i]); return 0; };
}
// Another view for the tools (a sheet from above: art/preview.mjs TOP=1): { yaw, pitch } for model3d's render, at the scale the
// usual view would give, so the two line up. Never in the game.
let VIEW = null;
export function withView(view, f) { const was = VIEW; VIEW = view; try { return f(); } finally { VIEW = was; } }
export const viewKey = () => VIEW ? `view${VIEW.yaw ?? ""},${VIEW.pitch ?? ""}` : "";
const drawForm = (m, o, S, level) => { if (VIEW) o = { ...o, scale: o.scale ?? render(m, { ...o, measure: true }).s, ...VIEW }; return FORM ? FORM(m, o, S, level) : render(m, o).sp; }, formMotes = () => !FORM || FORM.motes;
export function withGear(gear, f) { const was = GEAR; GEAR = gear; try { return f(); } finally { GEAR = was; } }
// A little party shoe (Ed, 2026-10-05: "yes, little party shoes"): on a foot { c, r, group, fit } in a style
// (SHOE_STYLES: sneakers, glitter, platform, heels, boots, lightup), fitted to the foot: "hoof" (narrow and
// upright, a cuff over the hoof), "paw" (round, the toes filling its front) or "claw" (an open toe, the talons
// poking out). The shoe is SHOE, its sole SOLE (a light-up sole glows in the animal's neon: COLLAR). The live
// rig bakes the same shoe as a piece at each heading (genome/parts.js), so it steps and lifts with the leg.
export function shoe3d(m, f, style, o = {}) {
  const r = f.r, fit = f.fit || "paw", group = f.group, ex = { group, extra: true, ...o };
  const hoof = fit === "hoof", claw = fit === "claw", plat = style === "platform", heels = style === "heels";
  const soleH = r * (plat ? .55 : heels ? .2 : .28), lift = (heels ? r * .35 : 0) + (plat ? soleH * .5 : 0);
  const c = v3.add(f.c, [r * .25, r * .15 + lift, 0]), L = r * (hoof ? 1.2 : claw ? 1.5 : 1.45), W = r * (hoof ? .95 : 1.15), H = r * (hoof ? 1 : .85);
  const solePaint = p => style === "lightup" ? M.COLLAR : M.SOLE;
  // the upper: tipped toe-down on heels, a glitter fleck here and there, a white flash on trainers
  m.ell(c, [L, H, W], M.SHOE, { ...ex, dir: heels ? [1, -.35, 0] : [1, 0, 0], paint: p => p[1] < c[1] - H * .45 ? solePaint(p) : style === "glitter" && spotty(p, 60, .28) ? M.GLINT : style === "sneakers" && Math.abs(p[0] - c[0] - L * .1) < r * .12 && p[1] > c[1] ? M.SOLE : undefined });
  // the sole: a slab under it (thick on platforms)
  m.ell(v3.add(c, [0, -H * .55 - (plat ? soleH * .3 : 0), 0]), [L * 1.02, soleH, W * 1.02], style === "lightup" ? M.COLLAR : M.SOLE, ex);
  if (heels) m.seg(v3.add(c, [-L * .7, -H * .2, 0]), v3.add(f.c, [-L * .45, -r * .05, 0]), r * .14, r * .1, M.SOLE, ex); // the heel: a thin post at the back
  if (style === "boots") m.seg(v3.add(c, [-r * .2, H * .2, 0]), v3.add(c, [-r * .3, H + r * 1.3, 0]), W * .85, W * .8, M.SHOE, { ...ex, paint: p => p[1] > c[1] + H + r * 1.05 ? M.SOLE : undefined }); // a cuff up the leg, its top trimmed
  if (hoof) m.ell(v3.add(c, [-r * .15, H * .75, 0]), [L * .7, r * .25, W * .9], M.SOLE, ex); // the cuff's trim round the pastern
  if (claw) for (const dz of [-.45, 0, .45]) m.seg(v3.add(c, [L * .75, -H * .2, dz * W]), v3.add(c, [L * 1.25, -H * .45, dz * W * 1.2]), r * .14, r * .05, M.ACCENT, ex); // talons out of the open toe
}

const star = (s, t) => { const a = Math.atan2(t, s), r = Math.hypot(s, t); return r < .55 + .4 * Math.pow(Math.abs(Math.cos(a * 2.5 + Math.PI / 2)), 3); };
const heart = (s, t) => { const x = s * 1.2, y = -t * 1.2 + .25; return Math.pow(x * x + y * y - .6, 3) - x * x * y * y * y < 0; };
function gearUp(m) {
  if (TEX) textureLumps(m, TEX.S, TEX.level, TEX.st); // its body's lumps (before anything's added to it)
  const g = GEAR, A = m.anchors; if (!g) return;
  faceUp(m, g.face, g.faceStyle); // its expression, part of its face (genome/expressions.js)
  const was = m.part; m.part = "head"; // the collar, hat and glasses ride on the head (the live rig's head piece: genome/parts.js)
  const head = A.head, hr = head ? Math.max(...head.r) : .2;
  // the collar: a glowing ring round the neck (or the body's front)
  if (g.collar && (A.neck || head)) {
    const n = A.neck || { c: v3.add(head.c, [-head.r[0] * .8, -head.r[1] * .4, 0]), r: head.r[1] * .75, dir: v3.norm([1, .4, 0]) };
    // fitted to the body: round the ring, march out from the neck's centre to the surface
    const d = v3.norm(n.dir), u = v3.norm(v3.cross(d, Math.abs(d[2]) < .9 ? [0, 0, 1] : [1, 0, 0])), w = v3.cross(d, u), pts = [], tube = Math.max(.03, n.r * .2);
    for (let i = 0; i <= 16; i++) {
      const a = i / 16 * Math.PI * 2, dir = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a)));
      let t = 0; while (t < .8 && m.field(v3.add(n.c, v3.mul(dir, t))) < 0) t += .01;
      if (t >= .8) t = n.r; // deep inside the body: fall back to the neck's own radius
      pts.push([...v3.add(n.c, v3.mul(dir, t + tube * .7)), tube]);
    }
    m.chain(pts, M.COLLAR, { group: 60, extra: true });
    // a glowing tag hanging at its front, under the chin: it shows even where a big head hides the ring
    const front = pts.reduce((b, p) => (p[0] - p[1] * .6 + p[2] * .5 > b[0] - b[1] * .6 + b[2] * .5 ? p : b)), tr = tube * 1.3 * (n.tag || 1);
    const td = v3.norm(v3.add(v3.norm(v3.sub(front.slice(0, 3), n.c)), [.3, -.5, .3])); let tp = front.slice(0, 3); // out and down from the collar's front, clear of the body
    for (let k = 0; k < 60 && m.field(tp) < tr * .4; k++) tp = v3.add(tp, v3.mul(td, .01));
    m.ell(tp, [tr, tr, tr * .6], M.COLLAR, { group: 60, extra: true });
  }
  // a party hat: a striped cone with a pompom, tilted at a jaunty angle
  if (g.hat != null && head) {
    const hs = Math.max(hr, .13), base = head.top || v3.add(Model.surface(head.c, head.r, v3.norm([-.15, 1, .1])), [0, hr * .1, 0]), dir = v3.norm([.3, 1, .35]), h = hs * 1.5, tip = v3.add(base, v3.mul(dir, h)); // never too small to read
    m.seg(v3.add(base, v3.mul(dir, -hs * .1)), tip, hs * .48, hs * .04, M.HAT1, { group: 61, extra: true, paint: p => Math.floor(v3.dot(v3.sub(p, base), dir) / (h / 5) + 10) % 2 ? M.HAT2 : undefined });
    m.ell(tip, [hs * .17, hs * .17, hs * .17], M.POM, { group: 61, extra: true });
  }
  // sunglasses: a dark bar across the eyes, or star or heart frames
  if (g.glasses && A.eyes && head) {
    const [e1, e2] = A.eyes.pts, out = e => v3.add(e, v3.mul(v3.norm(v3.sub(e, head.c)), A.eyes.size * .45)), s = Math.max(A.eyes.size * 1.05, hr * .1);
    if (g.glasses === "bar") { m.seg(out(e1), out(e2), s, s, M.SHADES, { group: 62, extra: true }); m.ell(v3.add(out(e2), [s * .3, s * .5, s * .2]), [s * .25, s * .25, s * .25], M.GLINT, { group: 62, extra: true }); }
    else for (const e of [e1, e2]) {
      const n = v3.norm(v3.sub(e, head.c)), u = v3.norm(v3.cross([0, 1, 0], n)), v = v3.cross(n, u), shape = g.glasses === "heart" ? heart : star, k = s * 1.5;
      m.flat(out(e), u, v, k, k, (a, b) => shape(a, b) ? (shape(a * 1.3, b * 1.3) ? M.SHADES : M.FRAME) : null, { group: 62, bend: .1, extra: true });
      m.seg(out(e1), out(e2), s * .18, s * .18, M.FRAME, { group: 62, extra: true });
    }
  }
  m.part = was;
  // little party shoes on each foot (or, for the snake, one tiny shoe on its tail tip)
  if (g.shoes) for (const f of A.feet) shoe3d(m, f, g.shoes);
}

// ================= the evolution kit =================
// A level's own features (genome levels[n].features), each from the model's landmarks. Every one's
// parts are tapered and curved, so a row of them reads as a mane or a crest, never a hand of fingers.
//   mane: { from, to (along the back, 0 rump to 1 head), height, count, lean, mat, belly (along the underside instead) }
//   eyeglint: { size }: its eyes' glint brought out to the surface, where its body hides its face.
//   wisps: { at: "tusks" | "horns" | "mane", size, mat, (mane: count, from, to, lift: above a mane) }: flames off its tusks' or horns' tips, or rising along its spine (glowing).
//   stones: { from, to, count, height, mat }: standing stones growing out of its back, each with a moonlit rune on its face (RUNE).
//   claws: { size, mat, fore (default true), hind }: long claws curving down and forward from its feet.
//   moss: { count, size }: moss and heather clumps along its flanks, low.
//   tails: { count, length, spread, tip, replace }: brush tails rooted along its rump, sweeping up and back together like flames, of
//     different lengths, their tips pale (BELLY) or in fox-fire (tip: "MAGIC2"); replace: instead of its own tail.
//   ruff: { size, count, mat }: a ruff of fur round its neck and cheeks, locks swept back.
//   garland: { count, size, mat, alt, every, drop, out }: a garland of flowers or beads round its neck (an elder's offerings), mat (FLOWER:
//     its palette's flower colour) with every `every`th bead alt, hanging lower at the front by drop, out times the neck's girth.
//   bells: { count, from, to, size, mat, bell }: a saddle-cloth over its back from `from` to `to` along it (mat, FLOWER), its hem in
//     bronze (bell, WOOD), count temple bells hanging down each side from it.
//   headcloth: { size, mat }: a jewelled cloth over its brow hanging between its eyes, bronze-edged, three beads along its hem.
//   nemes: { size, mat, alt, beard, uraeus }: a pharaoh's striped headcloth (the sphinx's, Ed 2026-10-23): a cap over the top and back of
//     its head, the face left bare, a lappet hanging down each side of its neck, bands of mat (FLOWER, gold) and alt (NIGHT2, lapis);
//     beard: a plaited false beard under its chin (its length in head radii); uraeus: a cobra rearing on its brow.
//   brambles: { count, berries }: bramble vines winding over its body, thorny, leafed, with berries (its palette's flower colour).
//   scars: { count, mat, len }: old healed scars on its flanks, each three parallel claw rakes, pale (WEB) by default: the wear of epochs.
//   dewlap: { size, mat }: a heavy fold of loose skin hanging under its throat (a big monitor lizard's).
//   beads: { count, size, mat, pendant }: a necklace of offerings round its neck, bronze (WOOD) by default, a bigger pendant (its mat,
//     STONE by default) hanging at its throat: something worshipped once.
//   The elder kit (Ed, 2026-10-13: a legend shows age, wear, and jewellery, armour and offerings; docs/ART-GUIDE.md 0c), for any legend:
//   grizzle: { amount, back, mat }: an old one's muzzle and brows (and shoulders) speckled grey-white.
//   worn: { ear: "near" | "far" | "both" | false, tusk: "far" | "near", horn: "far" | "near", at }: a notch bitten out of an ear; a tusk or horn broken short.
//   torc: { mat, size }: an open bronze ring round its neck, knobbed at the throat.  rings: { on: "horns" | "tusks" | "antlers", count, from, to, mat, width }: bands round them.
//   earrings: { which, size, mat }: rings hung from its ears' tips.  bands: { at, width, height, fore, hind, mat }: cuffs round its legs above the feet.
//   wreath: { count, size }: flowers and leaves wound round its neck, sagging in front.  bells with an `at` ("horns" | "antlers" | "ears" | "throat" | "tail"; size, mat): little bronze bells hung there, instead of the saddle-cloth.
//   wings: { size, at, mat, bone, nub }: leathery wings off its shoulders, a dragon's (bones and a membrane between them, as the
//     bat's), rising up and back, size times its body's length, flapping a little with its walk; nub: folded stubs (a young one's).
function evolve3d(m, feats, c) {
  for (const f of feats) {
    if (f.kind === "scars") { // old claw rakes down its flanks, three to a scar, healed pale
      m.part = "body";
      const n = f.count ?? 3, mat = M[f.mat || "WEB"], L0 = f.len ?? .22;
      for (let i = 0; i < n; i++) {
        const t = .2 + .6 * (n > 1 ? i / (n - 1) : .5), b = c.backAt(t), side = i % 2 ? -1 : 1, y = (b[1] + c.chest) / 2 + .04 * Math.sin(i * 2.3);
        const onSkin = p => { let z = side * c.bw * 2; while (Math.abs(z) > .01 && m.field([p[0], p[1], z]) >= 0) z -= side * .01; return [p[0], p[1], z + side * .012]; }; // (pressed onto its flank, not stuck out)
        for (let k = -1; k <= 1; k++) { const pts = Array.from({ length: 7 }, (_, j) => { const u = j / 6 - .5; return onSkin([b[0] + k * .1 + u * L0 * .6, y - u * L0 * .7]); });
          for (let j = 0; j < 6; j++) m.seg(pts[j], pts[j + 1], .018 * (f.width ?? 1), .018 * (f.width ?? 1), mat, { group: 150 + i, extra: true }); }
      }
    }
    if (f.kind === "beads" && f.at === "snout") { // rings of offering beads round its jaws (a crocodile's: its neck is lost in its body), ry and rz the ring's half-heights in head radii
      m.part = "head";
      const n = f.count ?? 16, s = (f.size ?? .045) * c.hr / .3;
      for (const at of f.rings ?? [.15, .35]) { const x = c.sn[0] - c.L * .5 + at * c.L * 1.2;
        for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; m.ell([x, c.sn[1] + Math.sin(a) * c.hr * (f.ry ?? .3), Math.cos(a) * c.hr * (f.rz ?? .8)], [s * .8, s, s], M[f.mat || "WOOD"], { group: 160, extra: true }); } }
    }
    else if (f.kind === "beads" && m.anchors.neck) { // a necklace of offerings: beads round its neck, a pendant hanging at its throat
      m.part = "head";
      const { c: N, r: R0, dir } = m.anchors.neck, n = f.count ?? 14, s = f.size ?? .045, R = R0 * 1.08 + s * .6;
      const u = v3.norm(v3.cross(dir, [0, 0, 1])), w = v3.norm(v3.cross(dir, u)); // two axes round the neck
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, p = v3.add(N, v3.add(v3.mul(u, Math.cos(a) * R), v3.mul(w, Math.sin(a) * R))); m.ell(p, [s, s, s], M[f.mat || "WOOD"], { group: 160, extra: true }); }
      const low = v3.add(N, v3.mul(u, -R)), dn = v3.add(low, [0, -s * 2.2, 0]); // its lowest point, under the throat
      m.seg(low, dn, s * .25, s * .25, M[f.mat || "WOOD"], { group: 160, extra: true }); m.ell(v3.add(dn, [0, -s * 1.1, 0]), [s * 1.5, s * 2, s * 1.1], M[f.pendant || "STONE"], { group: 161, extra: true });
    }
    if (f.kind === "dewlap" && m.anchors.neck) { // a heavy fold of loose skin hanging under its throat (a big monitor's), size times the neck's girth
      m.part = "head";
      const { c: N, r: R } = m.anchors.neck, s = f.size ?? 1, at = [N[0] + R * .25, N[1] - R * (.75 + .25 * s), 0];
      m.ell(at, [R * .85 * s, R * .7 * s, R * .55], M[f.mat || "BODY"], { group: 162, extra: true });
      m.ell(v3.add(at, [R * .35 * s, -R * .25 * s, 0]), [R * .5 * s, R * .45 * s, R * .45], M[f.mat || "BODY"], { group: 162, extra: true });
    }
    if (f.kind === "mane") {
      m.part = "body";
      const n = f.count ?? 12, mat = M[f.mat || "BODY3"], h0 = f.height ?? .2, lean = f.lean ?? .5;
      for (let i = 0; i < n; i++) {
        const t = (f.from ?? .2) + ((f.to ?? .95) - (f.from ?? .2)) * (i + .5) / n, wob = .75 + .5 * Math.abs(Math.sin(i * 2.7 + 1.3)), h = h0 * wob * (1 - .35 * Math.abs(t - .7));
        let b, dir;
        if (f.belly) { const x = -c.len * .9 + t * c.len * 1.65; b = [x, c.chest - .02 + (c.tuck - c.chest) * (1 - t), 0]; dir = v3.norm([-lean, -1, 0]); }
        else { b = c.backAt(t); b = [b[0], b[1] - .03, b[2]]; dir = v3.norm([-lean, 1, 0]); }
        const z = ((i % 3) - 1) * c.bw * .25, tip = v3.add(b, v3.mul(dir, h)), mid = v3.add(v3.lerp(b, tip, .5), [-h * lean * .25, 0, 0]);
        m.chain([[b[0], b[1], z, h * .2], [mid[0], mid[1], z, h * .11], [tip[0], tip[1], z, h * .02]], mat, { group: 70 + (i % 2), extra: true });
      }
    }
    if (f.kind === "eyeglint" && m.anchors.eyes) { // its eyes' glint, pushed out to the surface where the body hides the head (a charging legend's under its hump)
      m.part = "head";
      const r = f.size ?? .035, H = m.anchors.head?.c ?? [0, 0, 0];
      for (const e of m.anchors.eyes.pts) { // out along the camera's line (model3d's view, facing us) past the last surface in the way, so it shows where the eye would
        const d = v3.norm([.49, .5, .72]); let last = e, inside = true;
        for (let k = 1; k <= 300; k++) { const q = v3.add(e, v3.mul(d, k * .01)), now = m.field(q) < 0; if (inside && !now) last = q; inside = now; }
        m.ell(last, [r, r * .8, r], M.MAGIC2, { group: 120, extra: true }); m.ell(v3.add(last, v3.mul(d, r * .6)), [r * .55, r * .45, r * .55], M.MAGIC, { group: 121, extra: true }); } // a bright core in its glowing rim
    }
    if (f.kind === "stones") { // standing stones out of its back, tallest at the middle, leaning a little apart, each with a rune facing us
      m.part = "body";
      const n = f.count ?? 5, H0 = f.height ?? .32, mat = M[f.mat || "STONE"];
      for (let i = 0; i < n; i++) {
        const t = (f.from ?? .2) + ((f.to ?? .85) - (f.from ?? .2)) * (n > 1 ? i / (n - 1) : .5), b = c.backAt(t), k = (.7 + .3 * Math.sin(Math.PI * (i + .5) / n)) * (.85 + .3 * Math.abs(Math.sin(i * 3.7 + 1.1)));
        const h = H0 * k, w = h * .42, z = ((i % 2) * 2 - 1) * c.bw * .12, up = v3.norm([(i - (n - 1) / 2) * -.08, 1, z * 1.5]), base = [b[0], b[1] - h * .15, z], mid = v3.add(base, v3.mul(up, h * .5));
        m.box(mid, [h * .5, w * .5, w * .38], mat, { group: 130 + i, extra: true, dir: up, up: [1, 0, 0], round: w * .12, rough: w * .06, paint: p => spotty(p, 22, .22) ? M.MOSS : spotty(p, 34, .12) ? M.STONED : undefined });
        // its rune: a glowing mark on the face towards us (a vertical stroke with two branches)
        const face = v3.add(mid, [0, 0, w * .4]), R = (a, b2) => v3.add(face, v3.add(v3.mul(up, b2 * h), [a * w, 0, 0]));
        m.seg(R(0, -.24), R(0, .24), w * .11, w * .11, M.RUNE, { group: 140 + i, extra: true });
        m.seg(R(0, .05), R(.24, .22), w * .09, w * .09, M.RUNE, { group: 140 + i, extra: true });
        m.seg(R(0, -.08), R(-.24, .09), w * .09, w * .09, M.RUNE, { group: 140 + i, extra: true });
      }
    }
    if (f.kind === "claws" && m.rig?.legs) { // long claws off its feet, curving down and forward (a digger's, or stone blades)
      const s2 = f.size ?? .12, mat = M[f.mat || "ACCENT"];
      for (const L of m.rig.legs) { if (L.fore ? f.fore === false : !f.hind) continue; m.part = L.name;
        for (const dz of [-1, 0, 1]) { const b = v3.add(L.foot, [L.fl * .9, .02, dz * L.fl * .45]); m.chain([[...b, s2 * .2], [...v3.add(b, [s2 * .55, -.01, dz * s2 * .1]), s2 * .13], [...v3.add(b, [s2, -.05, dz * s2 * .15]), s2 * .03]], mat, { group: L.side > 0 ? 6 + (L.fore ? 1 : 0) : 2, extra: true }); } }
    }
    if (f.kind === "tails") { // brush tails along its rump, fanned up and back, the longest in the middle
      m.part = "tail";
      const n = f.count ?? 2, L0 = f.length ?? .8, spread = f.spread ?? .55;
      for (let i = 0; i < n; i++) {
        const u = n > 1 ? i / (n - 1) : .5, mid = 1 - Math.abs(u - .5) * (n > 2 ? 1 : 0), k = (f.replace ? .7 + .3 * mid : i ? .65 : 1) * (.9 + .2 * Math.abs(Math.sin(i * 2.9))), Lt = L0 * k;
        const a = Math.PI * (.62 + (u - .5) * spread * (n > 2 ? 1 : .5)), z = (u - .5) * c.bw * (n > 2 ? 1.4 : .9), root = v3.add(c.tb, [-i * .015, i % 2 ? .03 : 0, z * .4]);
        const e = v3.add(root, [Math.cos(a) * Lt, Math.sin(a) * Lt * .95, z]), b1 = v3.add(v3.lerp(root, e, .45), [-Lt * .18, Lt * .05, 0]) /* bowed back, so they sweep together like flames */, w = .13 * (f.width ?? 1) * Math.sqrt(k);
        m.chain([[...root, w * .55], [...b1, w * 1.25], [...v3.lerp(b1, e, .6), w * .95], [...e, w * .35]], i % 2 ? M.BODY2 : M.BODY, { group: 72 + (i % 2), extra: true, paint: p => Math.hypot(...v3.sub(p, e)) < w * 1.1 ? (f.tip === "MAGIC2" ? M.MAGIC2 : M.BELLY) : undefined });
        if (f.tip === "MAGIC2") m.flat(v3.add(e, [-.02, w * .6, 0]), [1, 0, 0], v3.norm([-.35, 1, 0]), w * .9, w * 1.6, masks.flame(M.MAGIC2, M.MAGIC), { group: 74 + (i % 2), extra: true }); // fox-fire at its tip
      }
    }
    if (f.kind === "garland" && m.anchors.neck) { // a garland of flowers (marigolds, jade beads...) round its neck: an offering
      m.part = "head";
      const N = m.anchors.neck, n = f.count ?? 16, sz = f.size ?? .07, d = v3.norm(N.dir), u = v3.norm(v3.cross(d, [0, 0, 1])), w = v3.cross(d, u);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, out = v3.norm(v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a)))), b = v3.add(v3.add(N.c, v3.mul(out, N.r * (f.out ?? 1.3))), v3.mul(d, -N.r * (f.drop ?? .3) * Math.max(0, -Math.cos(a)))); m.ell(b, [sz, sz, sz], M[i % (f.every ?? 3) === 0 && f.alt ? f.alt : f.mat || "FLOWER"], { group: 78, extra: true }); }
    }
    if (f.kind === "bells" && !f.at) { // a saddle-cloth over its back, its hem trimmed in bronze, temple bells hanging from it: an elder hung with offerings
      m.part = "body";
      const n = f.count ?? 4, cloth = M[f.mat || "FLOWER"], bell = M[f.bell || "WOOD"], sz = f.size ?? .07, W = c.bw * (c.front ?? 1), mid = c.backAt(((f.from ?? .25) + (f.to ?? .8)) / 2), half = c.len * ((f.to ?? .8) - (f.from ?? .25)) * .85, hem = (c.top - c.chest) * .55;
      m.ell([mid[0], mid[1] - hem * .75, 0], [half * 1.1, hem * 1.05, W * 1.1], cloth, { group: 79, extra: true, paint: p => p[1] < mid[1] - hem * 1.55 ? bell : undefined });
      for (let i = 0; i < n; i++) { const x = mid[0] - half * .8 + half * 1.6 * (n > 1 ? i / (n - 1) : .5); for (const side of [-1, 1]) { const e = [x, mid[1] - hem * 1.7, side * W * 1.02]; m.seg(e, v3.add(e, [0, -sz * .8, 0]), .012, .012, bell, { group: 79, extra: true }); m.ell(v3.add(e, [0, -sz * 1.6, 0]), [sz * .75, sz, sz * .75], bell, { group: 79, extra: true, paint: p => p[1] < e[1] - sz * 2.3 ? M.NOSE : undefined }); } }
    }
    if (f.kind === "headcloth") { // a jewelled cloth over its brow, hanging down between its eyes, bells along its hem
      m.part = "head";
      const { H, hr } = c, cl = [H[0] + hr * .82, H[1] + hr * .1, 0], dim = [hr * .14, hr * (f.size ?? .6), hr * .5];
      m.ell(cl, dim, M[f.mat || "FLOWER"], { group: 80, extra: true, dir: [1, -.35, 0], paint: p => Math.abs(p[2]) > dim[2] * .78 || p[1] < cl[1] - dim[1] * .75 ? M.WOOD : undefined });
      for (let i = 0; i < 3; i++) m.ell([cl[0] + hr * .12, cl[1] - dim[1] * .95, (i - 1) * hr * .25], [hr * .06, hr * .07, hr * .06], M.WOOD, { group: 80, extra: true });
    }
    if (f.kind === "nemes") { // a pharaoh's striped headcloth: a cap over its crown and the back of its head, its face bare, lappets down either side of its neck
      m.part = "head";
      const { H, hr } = c, k = f.size ?? 1, gold = M[f.mat || "FLOWER"], blue = M[f.alt || "NIGHT2"], band = hr * .2 * k, stripe = p => Math.floor((H[1] + hr * 3 - p[1]) / band) % 2 ? blue : gold;
      const cap = [H[0] - hr * .12, H[1] + hr * .18, 0], capR = [hr * 1.02 * k, hr * .92 * k, hr * 1.08 * k];
      m.ell(cap, capR, gold, { group: 190, extra: true, paint: p => { const a = Math.atan2(p[2], p[1] - H[1]); return Math.floor((a + 4) * 4.2) % 2 ? blue : gold; } }); // the cap, striped from its crown down
      m.ell([H[0] + hr * .95, H[1] - hr * .3, 0], [hr * .62, hr * .62, hr * .9], gold, { group: 190, cut: true }); // its face left bare
      m.ell([H[0] + hr * .85, H[1] + hr * .5, 0], [hr * .14, hr * .1, hr * .95 * k], gold, { group: 190, extra: true }); // the gold band across its brow
      for (const side of [-1, 1]) { // the lappets: flaring as they fall either side of its face onto its chest
        const top = [H[0] + hr * .3, H[1] - hr * .1, side * hr * .82 * k], low = [H[0] + hr * .42, H[1] - hr * 1.35 * k, side * hr * .9 * k];
        m.seg(top, low, hr * .3 * k, hr * .4 * k, gold, { group: 191 + (side > 0 ? 0 : 1), extra: true, paint: stripe });
      }
      m.seg([H[0] - hr * .8, H[1] - hr * .05, 0], [H[0] - hr * 1.0, H[1] - hr * .9 * k, 0], hr * .3 * k, hr * .14 * k, gold, { group: 193, extra: true, paint: stripe }); // its queue, gathered at the back
      if (f.beard) m.seg([H[0] + hr * .78, H[1] - hr * .62, 0], [H[0] + hr * .86, H[1] - hr * (.62 + f.beard), 0], hr * .12, hr * .09, gold, { group: 194, extra: true, paint: p => Math.floor((H[1] - p[1]) / (hr * .1)) % 2 ? blue : gold }); // a plaited false beard
      if (f.uraeus) m.chain([[H[0] + hr * .9, H[1] + hr * .52, 0, hr * .08], [H[0] + hr * 1.02, H[1] + hr * .72, 0, hr * .1], [H[0] + hr * 1.08, H[1] + hr * .82, 0, hr * .06]], gold, { group: 195, extra: true }); // the cobra rearing on its brow
    }
    if (f.kind === "plates") { // an elder's armour: its hide's bony plates grown into weathered stone, standing proud down its back and over its flanks
      m.part = "body";
      const n = f.count ?? 11, mat = M[f.mat || "STONE"], dark = M[f.dark || "STONED"], sz = f.size ?? .17;
      for (let i = 0; i < n; i++) for (const side of [-1, 0, 1]) {
        const t = (f.from ?? .14) + ((f.to ?? .9) - (f.from ?? .14)) * (i + .5) / n, b = c.backAt(t), k = sz * (side ? .75 : 1) * (.75 + .4 * Math.abs(Math.sin(i * 2.1 + side * 1.7)));
        m.ell([b[0], b[1] + k * .3 - Math.abs(side) * .07, b[2] + side * c.bw * .55], [k, k * .7, k * .85], (i + side) % 3 ? mat : dark, { group: 72, extra: true, rough: .02, paint: p => spotty(p, 18, .12) ? M.MOSS : undefined });
      }
    }
    if (f.kind === "scars") { // old pale scars raked across its near flank, the wear of epochs
      m.part = "body";
      for (let i = 0; i < (f.count ?? 4); i++) { const b = c.backAt((f.from ?? .3) + i * .13), z = c.bw * .9, x = b[0] + .04 * i; m.seg([x, b[1] - .1, z], [x + .2, b[1] - .36, z * .96], .022, .012, M[f.mat || "WEB"], { group: 73, extra: true }); }
    }
    if (f.kind === "offerings") { // offerings hung on it by those who revere it: a string of bones, fangs and pebbles slung over its shoulders
      m.part = "body";
      const n = f.count ?? 9, a = c.backAt(f.at ?? .97), z = c.bw * .95;
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1), b = [a[0] - .2 + t * .34, a[1] - .04 - Math.sin(t * Math.PI * .9) * .38, z * (1 - .1 * Math.sin(t * Math.PI))];
        if (i % 3 === 1) m.seg(b, v3.add(b, [-.01, -.16, 0]), .035, .01, M.WEB, { group: 75, extra: true }); // a fang
        else m.ell(b, [.05, .045, .045], i % 3 ? M.WEB : M.STONE, { group: 75, extra: true }); // a bone bead, a pebble
      }
    }
    if (f.kind === "howl") { // its howl made visible: rings of sound rolling up from its jaws, widening as they rise
      m.part = "head";
      const d = v3.norm(f.dir ?? [.45, 1, 0]), u = v3.norm(v3.cross(d, [0, 0, 1])), w = [0, 0, 1];
      for (let k = 0; k < (f.count ?? 3); k++) {
        const R = (f.size ?? .13) * (1 + k * .75), cen = v3.add(c.sn, v3.mul(d, .2 + k * .3 + (c.frame ? .06 : 0)));
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; m.ell(v3.add(cen, v3.add(v3.mul(u, Math.cos(a) * R), v3.mul(w, Math.sin(a) * R))), [R * .13, R * .13, R * .13], k % 2 ? M.MAGIC2 : M.MAGIC, { group: 77, extra: true }); }
      }
    }
    if (f.kind === "furrow") { // the ground ploughed up ahead of its tusks: a churned furrow, clods flying
      m.part = "body";
      const x0 = c.sn[0];
      for (let i = 0; i < 5; i++) m.ell([x0 + .08 + i * .13, .04 + i * .015, ((i % 2) - .5) * .22], [.17, .07, .2 - i * .02], i % 2 ? M.TRUNK : M.BODY3, { group: 78, extra: true, rough: .02 });
      for (let i = 0; i < 8; i++) m.ell([x0 + .12 + i * .09, .22 + Math.abs(Math.sin(i * 1.9)) * .2 + i * .04 + (c.frame ? .05 : 0), ((i % 3) - 1) * .2], [.045, .04, .045], i % 2 ? M.TRUNK : M.BODY3, { group: 78, extra: true });
    }
    if (f.kind === "plates") { // an elder's armour: its hide's bony plates grown into weathered stone, standing proud down its back and over its flanks
      m.part = "body";
      const n = f.count ?? 11, mat = M[f.mat || "STONE"], dark = M[f.dark || "STONED"], sz = f.size ?? .17;
      for (let i = 0; i < n; i++) for (const side of [-1, 0, 1]) {
        const t = (f.from ?? .14) + ((f.to ?? .9) - (f.from ?? .14)) * (i + .5) / n, b = c.backAt(t), k = sz * (side ? .75 : 1) * (.75 + .4 * Math.abs(Math.sin(i * 2.1 + side * 1.7)));
        m.ell([b[0], b[1] + k * .3 - Math.abs(side) * .07, b[2] + side * c.bw * .55], [k, k * .7, k * .85], (i + side) % 3 ? mat : dark, { group: 72, extra: true, rough: .02, paint: p => spotty(p, 18, .12) ? M.MOSS : undefined });
      }
    }
    if (f.kind === "scars") { // old pale scars raked across its near flank, the wear of epochs
      m.part = "body";
      for (let i = 0; i < (f.count ?? 4); i++) { const b = c.backAt((f.from ?? .3) + i * .13), z = c.bw * .9, x = b[0] + .04 * i; m.seg([x, b[1] - .1, z], [x + .2, b[1] - .36, z * .96], .022, .012, M[f.mat || "WEB"], { group: 73, extra: true }); }
    }
    if (f.kind === "offerings") { // offerings hung on it by those who revere it: a string of bones, fangs and pebbles slung over its shoulders
      m.part = "body";
      const n = f.count ?? 9, a = c.backAt(f.at ?? .97), z = c.bw * .95;
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1), b = [a[0] - .2 + t * .34, a[1] - .04 - Math.sin(t * Math.PI * .9) * .38, z * (1 - .1 * Math.sin(t * Math.PI))];
        if (i % 3 === 1) m.seg(b, v3.add(b, [-.01, -.16, 0]), .035, .01, M.WEB, { group: 75, extra: true }); // a fang
        else m.ell(b, [.05, .045, .045], i % 3 ? M.WEB : M.STONE, { group: 75, extra: true }); // a bone bead, a pebble
      }
    }
    if (f.kind === "ruff" && m.anchors.neck) { // locks of fur round its neck and cheeks, swept back
      m.part = "head";
      const N = m.anchors.neck, n = f.count ?? 12, sz = f.size ?? .14, mat = M[f.mat || "BELLY"], d = v3.norm(N.dir), u = v3.norm(v3.cross(d, [0, 0, 1])), w = v3.cross(d, u);
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2, out = v3.norm(v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a)))), b = v3.add(N.c, v3.mul(out, N.r * .85)), k = sz * (.75 + .5 * Math.abs(Math.sin(i * 2.3)));
        const tip = v3.add(b, v3.add(v3.mul(out, k * .8), v3.mul(d, -k * .6)));
        m.chain([[...b, k * .32], [...v3.lerp(b, tip, .55), k * .2], [...tip, k * .04]], i % 3 ? mat : M.BODY, { group: 76, extra: true });
      }
    }
    if (f.kind === "brambles") { // vines wandering over its body's surface, round and along it
      m.part = "body";
      const n = f.count ?? 4, cy = (c.top + c.chest) / 2;
      for (let v = 0; v < n; v++) {
        const pts = []; let th = .4 + v * 1.3;
        for (let i = 0; i <= 10; i++) {
          const x = -c.len * .85 + (c.len * 1.5) * (i / 10), dir = [0, Math.cos(th), Math.sin(th)]; let p = [x, cy, 0];
          for (let j = 0; j < 100 && m.field(p) < 0; j++) p = v3.add(p, v3.mul(dir, .01));
          if (Math.cos(th) > -.2) pts.push([...p, .018]);
          th += Math.sin(i * 1.7 + v * 2.3) * .55;
        }
        if (pts.length > 1) m.chain(pts, M.TRUNK, { group: 160 + v, extra: true });
        pts.forEach((p, i) => { const q2 = p.slice(0, 3);
          if (i % 2) m.seg(q2, v3.add(q2, [.02, .035, .015]), .008, .002, M.TRUNK, { group: 160 + v, extra: true }); // a thorn
          if (i % 3 === 1) m.ell(v3.add(q2, [0, .02, 0]), [.035, .015, .025], M.LEAF3, { group: 165, extra: true }); // a leaf
          if (i % 4 === 2 && (f.berries ?? true)) for (const d of [[0, .03, .02], [.025, .02, -.01]]) m.ell(v3.add(q2, d), [.022, .022, .022], M.FLOWER, { group: 166, extra: true }); }); // berries
      }
    }
    if (f.kind === "moss") { // moss and heather along its flanks, low, on both sides
      m.part = "body";
      const n = f.count ?? 8, s2 = f.size ?? .1;
      for (let i = 0; i < n; i++) for (const side of [-1, 1]) {
        const t = (i + .5) / n, x = -c.len * .8 + t * c.len * 1.5, y = c.chest + (c.top - c.chest) * (.3 + .25 * Math.abs(Math.sin(i * 2.3 + side))), k = s2 * (.7 + .5 * Math.abs(Math.sin(i * 1.7 + side)));
        let p = [x, y, 0]; for (let j = 0; j < 120 && m.field(p) < -k * .2; j++) p = [x, y, p[2] + side * .01]; // out to its flank's surface
        if (m.field(p) > k) continue; // nothing there
        m.ell(p, [k * 1.2, k * .55, k * .7], M.MOSS, { group: 150 + (side > 0 ? 0 : 1), extra: true, rough: k * .15 });
        if (i % 2) m.ell(v3.add(p, [0, k * .45, side * k * .2]), [k * .35, k * .3, k * .35], M.FLOWER, { group: 152, extra: true }); // a sprig of heather
      }
    }
    if (f.kind === "wings") { // leathery wings off its shoulders (Ed, 2026-10-11: the east's Cinder Wyrm), bat-built: bones, a membrane between
      m.part = "body";
      const S = (f.size ?? .9) * c.len * (f.nub ? .32 : 1), b = c.backAt(f.at ?? .66), mem = M[f.mat || "BODY2"], bone = M[f.bone || "BODY3"], lift = c.frame ? -.08 : .06;
      if (f.feathered) { // a griffin's: an eagle's wings, a fan of long flight feathers off the wrist, pale-tipped, the coverts over their roots
        const tipMat = M[f.mat2 || "BELLY"], k = f.nub ? .45 : 1, n = f.nub ? 4 : 8;
        for (const side of [-1, 1]) {
          const g = 180 + (side > 0 ? 1 : 0), sh = [b[0], b[1] - .02, side * c.bw * .45], wr = v3.add(sh, [.05 * S * k, (.42 + lift) * S * k, side * .3 * S * k]), hand = v3.add(wr, [.1 * S * k, .3 * S * k, side * .12 * S * k]);
          m.chain([[...sh, S * .08 * k], [...wr, S * .06 * k], [...hand, S * .035 * k]], mem, { group: g, extra: true }); // its arm: shoulder, wrist, hand (the leading edge)
          for (let i = 0; i < n; i++) { // the flight feathers: the primaries off the hand reaching furthest, the secondaries off the arm shorter, all swept back
            const t = i / (n - 1), root = t < .5 ? v3.lerp(hand, wr, t * 2) : v3.lerp(wr, sh, (t - .5) * 2), len = S * k * (.95 - .5 * t), dir = v3.norm([-.55 - .4 * t, .35 - .55 * t, side * (.15 - .1 * t)]);
            const tip = v3.add(root, v3.mul(dir, len)), mid = v3.lerp(root, tip, .5), w = S * k * (.06 - .015 * t);
            m.chain([[...root, w * .8], [...mid, w], [...tip, w * .3]], mem, { group: g + 2, extra: true, paint: p => v3.dot(v3.sub(p, root), dir) > len * .62 ? tipMat : undefined });
          }
          m.ell(v3.lerp(sh, hand, .45), [S * .3 * k, S * .14 * k, S * .07 * k], mem, { group: g + 4, extra: true, dir: v3.norm(v3.sub(hand, sh)) }); // the coverts over the feathers' roots
        }
        continue;
      }
      for (const side of [-1, 1]) {
        const sh = [b[0], b[1] - .02, side * c.bw * .45], wr = v3.add(sh, [-.12 * S, (.5 + lift) * S, side * .32 * S]);
        const tips = f.nub ? [v3.add(sh, [-.55 * S, .55 * S, side * .3 * S]), v3.add(sh, [-.65 * S, .2 * S, side * .25 * S])]
          : [v3.add(sh, [-.62 * S, (.78 + lift) * S, side * .62 * S]), v3.add(sh, [-.95 * S, (.38 + lift * .5) * S, side * .5 * S]), v3.add(sh, [-.75 * S, .05 * S, side * .3 * S])];
        const g = 180 + (side > 0 ? 1 : 0), r = Math.max(.012, S * .04);
        m.seg(sh, wr, r, r * .8, bone, { group: g, extra: true });
        for (const t of tips) m.seg(wr, t, r * .7, r * .3, bone, { group: g, extra: true });
        const span = v3.sub(tips[0], sh), u = v3.norm(span), back = v3.norm(v3.sub(tips[tips.length - 1], wr)), v = v3.norm(v3.sub(back, v3.mul(u, v3.dot(back, u))));
        m.flat(v3.add(v3.lerp(sh, tips[0], .5), v3.mul(v, S * (f.nub ? .1 : .2))), u, v, Math.hypot(...span) * .55, S * (f.nub ? .22 : .4), dragonWing(mem), { group: g + 2, extra: true, bend: .2 });
      }
    }
    // ---- the elder kit (Ed, 2026-10-13, docs/ART-GUIDE.md 0c: a legend shows age, wear and the trappings of something revered) ----
    if (f.kind === "grizzle") { // an old one's muzzle, brows and (back) shoulders gone pale and grey: speckled white hairs over its own coat
      const k = f.amount ?? .5, H = c.H, hr = c.hr, pale = M[f.mat || "WEB"];
      const old = p => (p[0] > H[0] + hr * (.45 - k * .35) && p[1] < H[1] + hr * .35 && spotty(p, 24, .25 + k * .45)) // the muzzle
        || (p[1] > H[1] + hr * .3 && p[0] > H[0] + hr * .25 && Math.abs(p[2]) > hr * .3 && spotty(p, 26, .2 + k * .4)) // over the eyes
        || (f.back && p[1] > c.top - .12 && p[0] > c.len * .2 && spotty(p, 20, k * .3)); // the shoulders
      for (const q of m.parts) { if (q.part !== "head" && !(f.back && q.part === "body")) continue; if (q.mat !== M.BODY && q.mat !== M.BODY2 && q.mat !== M.BODY3) continue; const base = q.paint; q.paint = p => old(p) ? pale : base?.(p); }
    }
    if (f.kind === "worn") { // the wear of epochs: a bite out of an ear, a tusk or a horn broken short
      if (f.ear !== false) for (const fl of m.flats) { if (fl.group !== 5 && fl.group !== 25) continue; if (f.ear === "far" ? fl.group !== 25 : f.ear === "both" ? false : fl.group !== 5) continue; const mask = fl.mask; fl.mask = (s2, t) => (s2 > .2 && t > -.1 && t < .7 && (s2 - .2) > Math.abs(t - .3) * 1.6) ? null : mask(s2, t); } // a bite out of one edge, a third of the way across
      const breakAt = (path, group, k) => { if (!path) return; const n = path.length, at = Math.round((n - 1) * (k ?? .55)); for (let i = at; i < n; i++) { const q = path[i], r = Math.max(q[3] * (i === at ? 1.6 : 2.6), .04); m.ell(q.slice(0, 3), [r, r, r], M.ACCENT, { group, cut: true, rough: i === at ? r * .35 : 0 }); } }; // everything past the break carved away (hollows cut out of the tusk's or horn's group), a rough stump left
      if (f.tusk) breakAt(c.tuskPaths[f.tusk === "near" ? 1 : 0], 8, f.at);
      if (f.horn) breakAt(c.hornPaths[f.horn === "near" ? 1 : 0], 14, f.at);
    }
    if (f.kind === "torc" && m.anchors.neck) { // an open ring of bronze (or stone, or its own magic) round its neck, its two ends knobbed at the throat
      m.part = "head";
      const N = m.anchors.neck, mat = M[f.mat || "WOOD"], d = v3.norm(N.dir), u = v3.norm(v3.cross(d, Math.abs(d[2]) < .9 ? [0, 0, 1] : [1, 0, 0])), w = v3.cross(d, u), tube = Math.max(.025, N.r * (f.size ?? .16)), pts = [];
      for (let i = 0; i <= 20; i++) { const a = -.35 + (i / 20) * (Math.PI * 2 - .7) + Math.PI, dir = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a))); let t = 0; while (t < .9 && m.field(v3.add(N.c, v3.mul(dir, t))) < 0) t += .01; if (t >= .9) t = N.r; pts.push([...v3.add(N.c, v3.mul(dir, t + tube * .8)), tube]); }
      m.chain(pts, mat, { group: 170, extra: true }); // (the gap faces down and forward: its open throat)
      for (const e of [pts[0], pts[pts.length - 1]]) m.ell(e.slice(0, 3), [tube * 1.6, tube * 1.6, tube * 1.6], mat, { group: 170, extra: true });
    }
    if (f.kind === "rings") { // bands of bronze round its horns, tusks or antlers
      const paths = f.on === "tusks" ? c.tuskPaths : f.on === "antlers" ? c.antlerPaths : c.hornPaths, mat = M[f.mat || "WOOD"], n = f.count ?? 2;
      m.part = "head";
      for (const [pi, path] of (paths || []).entries()) for (let k = 0; k < n; k++) {
        const t = (f.from ?? .3) + ((f.to ?? .7) - (f.from ?? .3)) * (n > 1 ? k / (n - 1) : .5), i = Math.max(1, Math.min(path.length - 2, Math.round((path.length - 1) * t))), a = path[i - 1], b = path[i + 1], r = path[i][3] * (f.width ?? 1.3);
        m.seg(v3.lerp(a.slice(0, 3), path[i].slice(0, 3), .55), v3.lerp(path[i].slice(0, 3), b.slice(0, 3), .45), r, r, mat, { group: 172 + pi, extra: true });
      }
    }
    if (f.kind === "earrings" && c.earTips?.length) { // a ring through each ear (or the near one), hung from its outer edge half way up, facing us
      m.part = "head";
      const mat = M[f.mat || "WOOD"], R = c.hr * (f.size ?? .34); // (big enough that its hole survives the blend at the legend's scale)
      for (const e of c.earTips) { if (f.which === "near" && e.side < 0) continue; const g = 176 + (e.side > 0 ? 0 : 1), edge = v3.add(v3.add(e.base, v3.mul(e.dir, e.h * (f.at ?? .9))), v3.mul(e.across, e.side * e.w * .8)), hang = v3.add(edge, [0, -R * .9, e.side * R * .25]), pts = []; for (let k = 0; k <= 12; k++) { const a = k / 12 * Math.PI * 2; pts.push([hang[0] + Math.sin(a) * R, hang[1] + Math.cos(a) * R, hang[2], R * .15]); } m.chain(pts, mat, { group: g, extra: true }); m.ell(hang, [R * .82, R * .82, R * 1.6], mat, { group: g, cut: true }); } // (its middle cut out, so it's a ring, not a disc)
    }
    if (f.kind === "bands" && m.rig?.legs) { // bands round its legs (anklets, or an old harness's cuffs), on the cannon above each foot
      const mat = M[f.mat || "WOOD"], k = f.at ?? .3;
      for (const L of m.rig.legs) { if (L.fore ? f.fore === false : f.hind === false) continue; m.part = L.name; const a = L.hock ?? L.knee, b = L.foot, p = v3.lerp(b, a, k), d = v3.norm(v3.sub(a, b)), r = L.r[2] * (f.width ?? 1.4), h = L.r[2] * (f.height ?? .6); m.seg(v3.add(p, v3.mul(d, -h)), v3.add(p, v3.mul(d, h)), r, r, mat, { group: 180 + (L.side > 0 ? 0 : 1), extra: true }); }
    }
    if (f.kind === "darken") { // an old coat gone darker with the years (the stoat's elder, an old brown ermine): its coat's own colour drawn in a deeper shade of it
      const to = M[f.mat || "BODY2"];
      for (const q of m.parts) if (q.mat === M.BODY) q.mat = to;
      for (const F of m.flats) if (F.mat === M.BODY) F.mat = to;
    }
    if (f.kind === "crown") { // a crown of spikes round the top of its head, leaning out (the polar bear's of ice, the komodo's of spines): count, size, mat
      m.part = "head";
      const H = c.H, hr = c.hr, n = f.count ?? 7, L = hr * (f.size ?? .9), mat = M[f.mat || "CRYSTAL"], spread = f.spread ?? .9; // spread: how far round the crown runs (1 a full ring)
      for (let i = 0; i < n; i++) {
        const a = (n > 1 ? i / (n - 1) - .5 : 0) * Math.PI * 2 * spread * .5, out = v3.norm([Math.cos(a) * .35 - .1, 1, Math.sin(a) * .9]), base = v3.add(H, v3.mul(out, hr * .78));
        const len = L * (1 - Math.abs(a) / Math.PI * .6) * (i % 2 ? .75 : 1); // taller in the middle, every other one shorter
        m.seg(base, v3.add(base, v3.mul(v3.norm(v3.add(out, [0, .6, 0])), len)), hr * .13, hr * .02, mat, { group: 186, extra: true });
      }
    }
    if (f.kind === "wreath" && m.anchors.neck) { // the elder kit's wreath: flowers and leaves wound round its neck, sagging at the front (an offering)
      m.part = "head";
      const N = m.anchors.neck, d = v3.norm(N.dir), u = v3.norm(v3.cross(d, Math.abs(d[2]) < .9 ? [0, 0, 1] : [1, 0, 0])), w = v3.cross(d, u), n = f.count ?? 14, sz = Math.max(.03, N.r * (f.size ?? .2));
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2, dir = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a))); let t = 0; while (t < .9 && m.field(v3.add(N.c, v3.mul(dir, t))) < 0) t += .01; if (t >= .9) t = N.r;
        const down = Math.max(0, -dir[1]), p = v3.add(v3.add(N.c, v3.mul(dir, t + sz * .5)), [0, -down * sz * 1.2 + down * sz * .6 * Math.sin(i * 2.1), 0]); // (sagging on the underside)
        m.ell(p, i % 3 === 1 ? [sz * .9, sz * .7, sz * .9] : [sz * 1.2, sz * .5, sz * .8], i % 3 === 1 ? M.FLOWER : i % 2 ? M.LEAF : M.LEAF2, { group: 184, extra: true, rough: sz * .15, dir: i % 3 === 1 ? [0, 1, 0] : dir, up: [0, 1, 0] });
      }
    }
    if (f.kind === "bells" && f.at) { // little bronze bells hung from its horn or antler tips, its ears, or under its throat
      m.part = "head";
      const mat = M[f.mat || "WOOD"], R = c.hr * (f.size ?? .14), at = f.at || "horns";
      const spots = at === "throat" && m.anchors.neck ? [(() => { const N = m.anchors.neck; let p = v3.add(N.c, [0, -N.r * .5, 0]); for (let k = 0; k < 90 && m.field(p) < 0; k++) p = v3.add(p, [0, -.01, 0]); return p; })()] : at === "ears" ? c.earTips.map(e => v3.add(e.tip, [0, -R * .4, 0])) : at === "tail" ? [v3.add(c.tb, [-.12, -.05, 0])] : (at === "antlers" ? c.antlerPaths : c.hornPaths).map(path => path[path.length - 1].slice(0, 3));
      spots.forEach((p, i) => { const hang = v3.add(p, [0, -R * 1.4, 0]); m.seg(p, hang, R * .12, R * .12, mat, { group: 188 + i, extra: true }); m.ell(v3.add(hang, [0, -R * .6, 0]), [R * .75, R * .85, R * .75], mat, { group: 188 + i, extra: true, paint: q => q[1] < hang[1] - R * 1.2 ? M.NOSE : undefined }); m.ell(v3.add(hang, [R * .3, -R * .35, R * .5]), [R * .16, R * .16, R * .16], M.GLINT, { group: 188 + i, extra: true }); }); // its ring, the bell, its dark mouth, a glint
    }
    if (f.kind === "backPlates") { // a stegosaur's plates: two staggered rows of flat kite-shaped plates along its back, tallest over its hips; glow: lava in their veins (a legend's)
      m.part = "body";
      const n = f.count ?? 11, H0 = f.height ?? .32, mat = M[f.mat || "BODY3"], rim = M[f.rim || "BODY2"], vein = f.glow ? M.GLOW : null;
      for (let i = 0; i < n; i++) {
        const t = (f.from ?? .12) + ((f.to ?? .92) - (f.from ?? .12)) * i / (n - 1), prof = Math.max(0, 1 - Math.abs(t - .3) / .7) ** .8, h = H0 * (.35 + .65 * prof) * (.9 + .2 * Math.abs(Math.sin(i * 2.3)));
        const b = c.backAt(t), z = (i % 2 ? 1 : -1) * c.bw * .14, up = v3.norm([(t - .45) * .25, 1, z * .6]), mid = v3.add([b[0], b[1] - .02, z], v3.mul(up, h * .48));
        m.flat(mid, [1, 0, 0], up, h * (f.width ?? .42), h * .52, (a, bb) => { let w = bb < 0 ? .62 + .38 * Math.sqrt(1 - bb * bb) : Math.pow(1 - bb, .75); if (f.chips && Math.abs(Math.sin(bb * 9 + i * 2.3)) > .86) w -= .22; if (Math.abs(a) > w) return null; if (Math.abs(a) > w - .14 || bb > .86) return rim; if (vein && (Math.abs(a - Math.sin(bb * 5) * .12) < .07 || Math.abs(bb - .2 - a * .3) < .05)) return vein; return mat; }, { group: 190 + (i % 4), extra: true, bend: .05 });
      }
    }
    if (f.kind === "patagium" && m.rig?.legs) { // a flying squirrel's gliding membrane: loose furred skin from each wrist to its ankle along the flank, its rim pale; spread: how far it hangs out (a legend's, its night sky)
      m.part = "body";
      const mat = M[f.mat || "BODY"], rim = M[f.rim || "BELLY"], spread = f.spread ?? .5, sky = f.stars;
      for (const side of [-1, 1]) {
        const F = m.rig.legs.find(L => L.fore && L.side === side), Hd = m.rig.legs.find(L => !L.fore && L.side === side); if (!F || !Hd) continue;
        if (c.glide) { // spread taut, a flat square kite from wrist to ankle, its rim pale (a legend's the night sky)
          const fa = F.foot, ha = Hd.foot, mid = [(fa[0] + ha[0]) / 2, (fa[1] + ha[1]) / 2 + .03, side * c.bw * 1.6], w2 = side * c.bw * 1.55;
          m.flat(mid, [1, 0, 0], [0, 0, side], (fa[0] - ha[0]) / 2 + .04, w2 * side, (a, b) => { const e = .98 - .32 * (1 - a * a) * (a < 0 ? 1.2 : 1); if (b > e) return null; if (b > e - .12 || Math.abs(a) > .93) return rim; return sky && spotty([a * 3, b * 3, side], 40, .1) ? M.GLINT : mat; }, { group: side > 0 ? 160 : 161, extra: true, bend: .1 });
          continue;
        }
        const wr = v3.lerp(F.knee, F.foot, .5), an = v3.lerp(Hd.knee, Hd.foot, .45), u = v3.norm(v3.sub(wr, an)), half = Math.hypot(...v3.sub(wr, an)) * .58;
        const y0 = (wr[1] + an[1]) / 2, y1 = (F.hip[1] + Hd.hip[1]) / 2 - .02, ctr = [(wr[0] + an[0]) / 2, (y0 + y1) / 2, side * c.bw * (.72 + spread * .12)], dy = (y1 - y0) / 2 * (1 + spread * .15), low = ctr[1] - dy * .55;
        m.ell(ctr, [half, dy, .04 + spread * .03], mat, { group: side > 0 ? 160 : 161, extra: true, dir: u, paint: p => p[1] < low ? rim : sky && spotty(p, 40, .1) ? M.GLINT : undefined });
      }
    }
    if (f.kind === "sail") { // a newt's breeding crest grown into a tall wavy sail along its back and tail, edged in glow (the legend audit's ★, Ed 2026-10-13)
      m.part = "body";
      const H = f.height ?? .45, x0 = -c.len * 2.1, x1 = c.len * .75, tailY = .32, top = c.top;
      const base = x => x > -c.len * .9 ? c.backAt(Math.max(0, Math.min(1, (x + c.len * .9) / (c.len * 1.65))))[1] - .02 : tailY + (top - tailY) * Math.max(0, (x - x0) / (-c.len * .9 - x0)) ** 1.4;
      const y0 = tailY - .05, y1 = top + H + .05, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, hx = (x1 - x0) / 2, hy = (y1 - y0) / 2;
      m.flat([cx, cy, 0], [1, 0, 0], [0, 1, 0], hx, hy, (a, b) => { const x = cx + a * hx, y = cy + b * hy, bs = base(x), torn = Math.sin(x * 23) > .86 ? .65 : 1, ends = Math.min(1, (x - x0) / .25, (x1 - x) / .35), h = H * Math.max(0, ends) * (.75 + .25 * Math.sin(x * 9)) * (.6 + .4 * Math.min(1, (x - x0) / c.len)) * torn; // (torn here and there by ages)
        if (y < bs - .03 || y > bs + h) return null; if (y > bs + h - .045) return M[f.rim || "MAGIC"]; return Math.abs(Math.sin(x * 34)) < .12 ? M.BODY3 : M[f.mat || "BODY2"]; }, { group: 165, extra: true, bend: .05 });
    }
    if (f.kind === "wisps" && f.at === "mane") { // flames rising off the spine, over the hump
      m.part = "body";
      const n = f.count ?? 5, s = f.size ?? .22;
      for (let i = 0; i < n; i++) { const t = (f.from ?? .35) + ((f.to ?? .85) - (f.from ?? .35)) * (i + .5) / n, b = c.backAt(t), up = v3.norm([-.35 - (c.frame ? .1 : 0), 1, 0]), k = s * (.75 + .5 * Math.abs(Math.sin(i * 2.1 + .7)));
        m.flat(v3.add([b[0], b[1] + s * .4 + (f.lift ?? 0), b[2]], v3.mul(up, k * .55)), [1, 0, 0], up, k * .3, k * .6, masks.flame(M[f.mat || "MAGIC2"], M.MAGIC), { group: 110 + i, extra: true }); }
    }
    if (f.kind === "wisps" && (f.at === "tusks" || f.at === "horns")) {
      m.part = "head";
      const s = f.size ?? .18;
      (f.at === "horns" ? c.hornTips : c.tuskTips).forEach((p, i) => { const up = v3.norm([-.3 - (c.frame ? .1 : 0), 1, 0]); m.flat(v3.add(p, v3.mul(up, s * .55)), [1, 0, 0], up, s * .3, s * .6, masks.flame(M[f.mat || "MAGIC2"], M.MAGIC), { group: 96 + i, extra: true }); });
    }
  }
  m.part = "body";
}

// ================= four-legged animals =================
// A genome's body profile (quad3d: its girth along its length) as stations { w, d }, 1 where it says nothing; null without one.
export const PROFILE_STATIONS = ["shoulder", "ribcage", "waist", "loin", "hip"];
function profileOf(p) {
  if (!p) return null;
  const P = {};
  for (const k of PROFILE_STATIONS) { const v = p[k]; P[k] = typeof v === "number" ? { w: v, d: v } : { w: v?.w ?? 1, d: v?.d ?? 1 }; }
  return P;
}
export function quad3d(S, level, frame, st, facing = "towards") {
  // its evolution at this level (genome levels: its own proportions and parts, not a rescale; q.features: legend features it grows early)
  const q = { legW: 1, earS: 1, hgt: 1, bw: .3, ...S.q, ...(S.levelQ?.[level] || {}) }, legend = level === 3, juv = level === 1, baby = level === 0, has = f => (legend && !S.levelFeatures?.[3] && S.legend.includes(f)) || (q.features || []).includes(f) || !!S.levelNamed?.[level]?.includes(f); // (an evolved legend, its genome levels[3], replaces its old legend feature)
  const feats = S.levelFeatures?.[level], elder = legend && S.elder; // (an elder legend: art/elders.js)
  const sz = k => S.sizes[k][level]; // its template's size curves (art/genome/templates.js): baby, young, adult, legend
  const m = new Model();
  const hr = q.hr * sz("head") * (st.head / .44) ** .5, len = q.len * sz("len") * st.long;
  const legK = sz("legK");
  const bob = frame ? -.04 : 0, top = 1 + bob, rawChest = q.chest * sz("chestDeep") * sz("chestBig") / legK + bob, rawTuck = q.tuck * sz("tuck") / legK + bob; // a big one's deeper chest and belly
  // Only the new graph corrects an inverted torso: retain the genome's own
  // belly ratio without short-leg division, rather than put belly above back.
  const chest = q.graph && rawChest >= top ? Math.min(top - .12, q.chest * sz("chestDeep") * sz("chestBig") + bob) : rawChest;
  const tuck = q.graph && rawTuck >= top ? Math.min(top - .12, q.tuck * sz("tuck") + bob) : rawTuck;
  const bw = q.bw * sz("body") * (q.legW > 1.2 ? 1.15 : 1), lw = .06 * q.legW * sz("limbA") * sz("limbB");
  const hump = q.back === "hump" ? q.hump ?? .1 * (q.humpK ?? 1) : 0, arch = q.back === "arch" ? .1 * (q.archK ?? 1) : 0, front = q.front ?? 1; // front: a heavier front (an adult boar's)
  // ---- markings, painted by where a point is on the body ----
  const bellyY = chest + .12;
  let markingScale = null; // assigned by Model.atScale before any paint callback is sampled
  // rosettes (a jaguar's): broken rings over its back and flanks, none on its belly; on a black coat only a shade darker (faint in the light);
  // ripple: each ring shifted along the body by the frame, so they ripple like light on water as it moves
  const rosetteAt = p => { const R = q.rosettes, k = R.k ?? 8, u = p[0] * k, v = p[1] * k, w = p[2] * k * .6, i = Math.floor(u), j = Math.floor(v), l = Math.floor(w); if (p[1] < chest + .06 || hash2(i, j + l * 31, 11) > (R.density ?? .7)) return false; const cx = i + .3 + hash2(i, j, 12) * .4 + (R.ripple ? Math.sin(v * 1.7 + frame * 2.2) * R.ripple : 0), cy = j + .3 + hash2(j, i, 13) * .4, d = Math.hypot(u - cx, v - cy), a = Math.atan2(v - cy, u - cx); return d > .2 && d < .36 && Math.sin(a * 3 + i) > -.55; };
  // an elder's marks (docs/ART-GUIDE.md 0c): old scars across its hide, a hoard frozen into it, an old gold harness
  const SCARS = [[.4, .75, .3, -.6, .9], [-.2, .7, .35, .5, .85], [.15, .6, -.32, -.4, .9], [-.5, .65, -.3, .7, .7], [.65, .7, .25, .2, 1], [0, .55, .3, -.9, .4]];
  const scarAt = p => { for (let i = 0; i < (q.scars || 0); i++) { const [x, y, z, a, b] = SCARS[i % SCARS.length], c = [x * len, y * top + (1 - y) * chest, z], d = v3.norm([Math.cos(a), Math.sin(a) * b, 0]), w = v3.sub(p, c), along = v3.dot(w, d), across = Math.abs(v3.dot(w, v3.norm([-d[1], d[0], 0]))); if (Math.abs(along) < .16 && across < .014 && p[2] * Math.sign(z || 1) > -bw * .2) return M.BELLY; } return undefined; };
  // stripes (a tiger's): dark bands across its body from the spine down, wavering, narrowing toward the belly, none on it
  const stripeAt = p => { const T = q.stripes, n = T.n ?? 10, w = T.w ?? .3, low = (p[1] - chest) / Math.max(.01, top + hump - chest); if (low < .05) return false; const u = (p[0] + len * 1.2) / (len * 2.4) * n + Math.sin(p[1] * 9 + p[2] * 5 + p[0] * 3) * (T.wave ?? .2) + Math.abs(p[2]) * 1.1, f = u - Math.floor(u); return f < w * Math.min(1, .35 + low); };
  const paintBody = p => {
    const sc = scarAt(p); if (sc) return sc;
    if (q.hoard && p[1] < (chest + top) / 2 && spotty(p, 34, .14)) return M.FLOWER; // its hoard frozen into its underside: coins and cups in the ice of its belly
    if (q.harness && (Math.abs(p[0] - len * .32) < .045 || (p[0] > len * .9 && p[1] < top - .12))) return M.FLOWER; // the girth strap and the breastplate of an old gold harness
    if (q.belly && p[1] < bellyY && p[0] > -len * .5) return M.BELLY;
    if (q.regions?.torso) {
      const mark = regionMarking(p, q.regions.torso, { centreY: (top + chest) / 2, depth: Math.max(.04, Math.abs(top - chest) / 2), width: bw, bellyY: chest + .06, len, pixelsPerUnit: markingScale });
      if (mark !== null) return mark;
    }
    if (!q.regions?.torso && q.stripes && stripeAt(p)) return M[q.stripes.mat || "BODY3"];
    if (!q.regions?.torso && q.rosettes && (q.rosettes.wrap ? wrappedRosette(p, q.rosettes, { centreY: (top + chest) / 2, depth: (top - chest) / 2, width: bw, bellyY: chest + .06 }) : rosetteAt(p))) return M[q.rosettes.mat || "BODY3"];
    if (q.saddle && p[1] > top - .18 && p[0] < len * .55) return M.BODY2;
    if (q.scarred && p[2] > bw * .5 && p[1] > chest + .05 && Math.abs(((p[0] * 2.2 + p[1] * 1.6) % .55 + .55) % .55 - .1) < .025 && Math.sin(p[0] * 7) > -.2) return M.BELLY; // old pale scars raked across its flank (an elder's)
    if (q.coals && p[1] > chest + .02) { const k = 4.4, cx = p[0] * k, cz = p[2] * k, cy = p[1] * k; if (spotty(p, k, .42)) { const d = Math.hypot(cx - Math.floor(cx) - .5, cy - Math.floor(cy) - .5, cz - Math.floor(cz) - .5); if (d < .24) return M.MAGIC2; if (d < .4) return M.BELLY; } } // its warning spots grown large and glowing like coals (a salamander legend's: the legend audit's ★, Ed 2026-10-13)
    if (!q.regions?.torso && q.spots === "solid") { const k = 24, f = p.map(c => c * k - Math.floor(c * k) - .5); if (f[0] * f[0] + f[1] * f[1] + f[2] * f[2] < .16 && spotty(p, k, .6)) return M.NOSE; } // a cheetah's: small round solid dots all over
    if (!q.regions?.torso && q.spots && q.spots !== "solid" && p[1] > chest + .1 && spotty(p, 10, .22)) return q.spotMat === "belly" || (q.spots === "young" && juv) ? M.BELLY : q.spots === "young" ? undefined : M.BODY3;
    if (q.ridge && p[1] > top - .08 + hump * .5) return M[q.ridgeMat || "BODY3"]; // (ridgeMat: its crest's own material, the frost wyrm's ice-pale BELLY)
    if (!q.regions?.torso && q.tabby && p[1] > chest + .04) { const t = (p[0] + Math.sin(p[1] * 17 + p[2] * 9) * .035) / (len * 2 / q.tabby.n) + 64; if (t - Math.floor(t) < (q.tabby.w ?? .32)) return M[q.tabby.mat || "BODY3"]; } // a tabby's stripes, thin, across its body, a little wavy
    if (!q.regions?.torso && q.bands && p[1] > chest && p[0] > -len * 1.1 && Math.floor((p[1] - chest) / Math.max(.01, top + hump - chest) * q.bands.n * 2 + .5) % 2) return M[q.bands.mat || "BELLY"]; // a piglet's stripes, running its length
    if (q.folds && p[1] < top - .02 && Math.abs(p[2]) > bw * .45 && q.folds.some(f => Math.abs(p[0] - f * len - (p[1] - chest) * .25) < .016 * (q.foldW ?? 1))) return M.BODY3; // a rhino's armour: deep folds of hide down its flanks (folds: where, -1 rump to 1 chest)
    return undefined;
  };
  // how it stands (its legs, below): on its toes, on hooves, flat-footed or sprawling; the torso's frame follows it
  const stance = q.stance || (q.paw === "hoof" ? "hoof" : "digit"), hoof = stance === "hoof", flat = stance === "flat", sprawl = stance === "sprawl";
  // ---- torso: a deep chest, a tucked waist, a rump; and over them the frame a back hangs on (the menagerie review, 2026-10-13):
  // withers (the shoulder mass, the back's high point), a pelvis (the croup, a deer's raised rump), a loin dipping between, and a
  // brisket (the chest's keel in front of the forelegs). Each a knob (q.withers, q.croup, q.loin, q.brisket, model units) with a
  // default by how it stands: a hoofed one's withers and croup stand up and its brisket is deep, a flat-footed one's shoulders are
  // rounder, a sprawler has none. ----
  const withers = q.withers ?? (sprawl ? 0 : hoof ? .07 : flat ? .04 : .05), croup = q.croup ?? (sprawl ? 0 : hoof ? .05 : .02), loin = q.loin ?? (sprawl ? 0 : .015), brisket = q.brisket ?? (hoof ? .08 : flat ? .04 : .03);
  // ---- its girth along its length (Ed, 2026-10-13: "a key issue with a lot of animals is that they end up sausage shaped; we need
  // them to be able to have a thicker chest and a slimmer abdomen; this needs separate width and depth in the body"): q.profile, its
  // stations from the front back (shoulder, ribcage, waist, loin, hip), each { w, d } (or one number for both): w its width side to
  // side, d its depth back to belly, as multiples of the body as built there, the back line kept and the belly lifting as d falls; a
  // station left out is 1. With no profile the three loaves draw exactly as before; with one the torso is lofted through the
  // stations (and the rump's end and the chest's front, shaped as their neighbours), each slice the loaves' own envelope there, scaled.
  // The forelegs stand as wide as the shoulder, the hind legs as the hip. ----
  const loaves = [
    [[len * .48, (top + chest) / 2 + hump * .5, 0], [len * .62, (top - chest) / 2 * front + hump * .5, bw * front]], // the chest
    [[-len * .5, (top + tuck) / 2 + arch * .6, 0], [len * .58, (top - tuck) / 2 + arch * .6, bw * .93]], // the rump
    [[0, (top + (chest + tuck) / 2) / 2 + .02 - loin, 0], [len * .6, (top - (chest + tuck) / 2) / 2, bw * .9]], // the middle
  ];
  const P = profileOf(q.profile), wAt = k => P ? P[k].w : 1;
  if (q.graph) {
    const graph = quadrupedTorsoGraph(loaves, len, P, q.graph.flex ?? 0, frame);
    graph.diagnostics.clampedBellyHeights = Number(chest !== rawChest) + Number(tuck !== rawTuck);
    const torso = compileGraph(graph).model;
    for (const part of torso.parts) m.parts.push({ ...part, paint: paintBody });
    m.bodyGraph = graph;
  } else if (!P) for (const [c, r] of loaves) m.ell(c, r, M.BODY, { paint: paintBody });
  else {
    const envelope = x => { let w = 0, t = -Infinity, b = Infinity; for (const [c, r] of loaves) { const u = (x - c[0]) / r[0]; if (Math.abs(u) >= 1) continue; const f = Math.sqrt(1 - u * u); w = Math.max(w, r[2] * f); t = Math.max(t, c[1] + r[1] * f); b = Math.min(b, c[1] - r[1] * f); } return { w, t, b }; }; // the loaves at x: their widest, their back, their belly
    const AT = [-.5, -.25, 0, .25, .48], K = ["hip", "loin", "waist", "ribcage", "shoulder"], station = u => { // the profile between its stations, straight lines, held past the ends
      if (u <= AT[0]) return P.hip; if (u >= AT[4]) return P.shoulder;
      for (let i = 0; i < 4; i++) if (u <= AT[i + 1]) { const f = (u - AT[i]) / (AT[i + 1] - AT[i]), a = P[K[i]], b = P[K[i + 1]]; return { w: a.w + (b.w - a.w) * f, d: a.d + (b.d - a.d) * f }; }
      return P.shoulder;
    };
    for (let u = -.82; u <= .81; u += .09) { // a slice every .09 of the length, each reaching its neighbours, so the loft between the stations runs smooth
      const x = u * len, e = envelope(x), s = station(u), depth = (e.t - e.b) * s.d;
      if (e.w <= 0 || depth <= 0) continue;
      m.ell([x, e.t - depth / 2, 0], [len * .2, depth / 2, e.w * s.w], M.BODY, { paint: paintBody });
    }
  }
  if (withers) m.ell([len * .58, top - .1 + withers + hump * .4, 0], [len * .3, .13 + withers, bw * .8 * front * wAt("shoulder")], M.BODY, { paint: paintBody }); // the withers, over the shoulders
  if (croup) m.ell([-len * .66, top - .11 + croup + arch * .5, 0], [len * .24, .12 + croup, bw * .74 * wAt("hip")], M.BODY, { paint: paintBody }); // the pelvis
  if (brisket) m.ell([len * .8, chest + .06 + brisket * .5, 0], [len * .22, .1 + brisket, bw * .62 * front * wAt("shoulder")], M.BODY, { paint: paintBody }); // the brisket, the chest's keel
  // ---- its spine (Ed, 2026-10-13: "giving animals the possibility of having a distinct spine along its back, which can be anything
  // from a tall crest to a recessed depression"): q.spine, a height in model units at each of the profile's stations (or one number
  // for the whole back): + a crest standing up along the back line (a boar's bristles, a stag's shoulder line), 0 flat (as built),
  // - a groove sunk into it (a big cat's or a lean dog's spine lying in the dip between its back muscles), interpolated between the
  // stations and fading out at the neck and the rump. The back line is the body's own (the loaves, the withers and the croup) at each
  // place, so a crest rides over the withers and a groove runs down into the loin. The ridge's spikes stand on the crest. ----
  const spineAt = spineOf(q.spine), backTop = x => { let y = -Infinity; for (const P of m.parts) { if (P.type !== "ell" || P.cut || P.extra || P.part !== "body") continue; const u = (x - P.c[0]) / P.r[0]; if (Math.abs(u) >= 1) continue; y = Math.max(y, P.c[1] + P.r[1] * Math.sqrt(1 - u * u)); } return y; };
  if (spineAt) for (let i = 0; i <= 12; i++) {
    const x = (-.85 + i * 1.7 / 12) * len, s = spineAt(x / len), y = backTop(x); if (!s || y === -Infinity) continue;
    const dx = len * 1.7 / 12 * .75;
    if (s > 0) m.ell([x, y + s * .3, 0], [dx, s * .8, bw * .11 + s * .15], M.BODY, { paint: paintBody }); // a crest: a fin of flesh and hair standing along the back line
    else m.ell([x, y + s * .15, 0], [dx, -s * .85, bw * .16 - s * .3], M.BODY, { paint: paintBody, cut: true }); // a groove: a valley cut down into the back between its muscles, its walls the body's own
  }
  if (q.ridge) for (let i = 0, rk = typeof q.ridge === "number" ? q.ridge : 1, n = Math.round((legend ? 16 : 10) * Math.max(1, rk * .7)); i < n; i++) { const x = -len * .8 + i * len * 1.75 / (n - 1), h = (.07 + (legend ? .04 : 0)) * (1 + .5 * Math.max(0, x / len)) * rk * (rk > 1 && i % 2 ? .6 : 1); m.ell([x, top + .02 + hump * Math.max(0, 1 - Math.abs(x / len - .5) * 2) + h * .5 + Math.max(0, spineAt?.(x / len) ?? 0), 0], [h, .03, bw * .25], M[q.ridgeMat || "BODY3"], { dir: [-.3, 1, 0], up: [1, 0, 0] }); }
  if (q.wool) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; m.ell([len * Math.cos(a) * .7, (top + chest) / 2 + Math.sin(a) * .2, bw * (i % 2 ? .5 : -.5)], [.16, .14, .14], M.BODY); }
  // ---- legs: a real skeleton (the menagerie review, 2026-10-13: every leg was hip, a knee straight below it, a ball) ----
  // Fore: shoulder, elbow (behind), wrist (ahead), paw; hind: hip, stifle (ahead), hock (behind), paw; the stance by how the species
  // stands (q.stance, else by its feet: paw "digit", hoof "hoof"): "digit" up on its toes, elbow and hock bent (a dog's, a cat's);
  // "hoof" a long slim upright cannon and a sharp hock (a deer's, a boar's); "flat" a flat sole along the ground (a bear's, a
  // badger's); "sprawl" the elbows and stifles out to the side (a newt's). Near legs lighter, far legs in shade. In the walk the whole
  // leg swings from its shoulder or hip, and the leg swinging forward lifts and flexes (its paw trailing), the planted one stays extended.
  const sw = [.32, -.32][frame];
  m.rig = { legs: [], len, bw, top, chest, tuck }; // the live rig's joints (art/genome/parts.js), in model units
  const leg = (fore, side) => {
    m.part = `leg${fore ? "F" : "H"}${side > 0 ? "N" : "F"}`; // fore or hind, near or far
    const z = side * bw * .62 * wAt(fore ? "shoulder" : "hip"), x = fore ? len * .62 : -len * .62, a = (fore ? 1 : -1) * side * sw, topY = fore ? chest + .1 : tuck + .15, Y = topY + .12;
    const swing = (fore ? side : -side) * (frame ? 1 : -1) > 0, lift = swing ? .06 : 0, flex = swing ? 1 : 0; // the leg swinging forward is lifted and flexed
    const hf = !fore ? (q.hindFoot || 1) : 1, out = sprawl ? side * (q.sprawl ?? .14) : 0, g = { group: side > 0 ? 6 + (fore ? 1 : 0) : 2 }; // (q.sprawl: how far out the elbows and stifles go, .14 as built)
    const hipTop = [x, Y, z * .8], mat = side > 0 ? (q.legMat || M.BODY) : (q.legMat ? M.BODY3 : M.BODY2);
    // the joints at rest, [dx from the hip, height as a share of the hip's, dz out], hip to paw
    const J = fore
      ? hoof ? [[-.04, .6, 0], [.02, .33, 0], [.03, .1, 0], [.05, .03, 0]] : flat ? [[-.07, .5, 0], [-.01, .17, 0], [.1, .04, 0]] : sprawl ? [[.0, .62, out], [.05, .2, out * 1.2], [.07, .04, out * 1.2]] : [[-.06, .55, 0], [.03, .22, 0], [.05, .05, 0]]
      : hoof ? [[.12, .62, 0], [-.1, .35, 0], [-.04, .1, 0], [-.02, .03, 0]] : flat ? [[.14, .55, 0], [-.1, .2, 0], [.08 * hf, .04, 0]] : sprawl ? [[.02, .62, out], [-.06, .25, out * 1.2], [.02, .04, out * 1.2]] : [[.14, .6, 0], [-.08 - .04 * (hf - 1), .3, 0], [.02, .05, 0]];
    const pts = [hipTop], last = J.length - 1;
    for (let k = 0; k <= last; k++) { const [dx, hy, dz] = J[k], y = Y * hy + (k === last ? lift : lift * .6 * (k / last)), drop = Y - y, trail = flex * (k >= last - 1 ? -.05 : k ? -.02 : 0); pts.push([x + dx + Math.sin(a) * Math.min(drop, .75) * .7 + trail, y, z + dz]); }
    if (q.glide) { // gliding: its legs spread out sideways, taut, holding the membrane open (the joints from knee to paw along it)
      const o = side * bw, gy = (top + chest) / 2, kn = [x * 1.15, gy, o * 1.9], ft = [x * 1.35 + (fore ? .14 : -.1), gy - .04, o * 3.1];
      for (let k = 1; k < pts.length; k++) pts[k] = v3.lerp(kn, ft, last ? (k - 1) / last : 1);
    }
    // thick at the hip and thigh, slimming to the paw; a hoofed leg's cannon slim as a deer's; a hind thigh fuller (haunch)
    const R = fore ? (hoof ? [1.45, 1.0, .62, .55, .55] : flat ? [1.5, 1.05, .85, .75] : sprawl ? [1.3, .95, .75, .7] : [1.5, 1.05, .8, .75]) : (hoof ? [2 * (q.haunch || 1), 1.25, .7, .5, .5] : flat ? [2 * (q.haunch || 1), 1.25, .9, .75] : sprawl ? [1.7 * (q.haunch || 1), 1.0, .75, .7] : [2 * (q.haunch || 1), 1.3, .85, .75]);
    const chainPts = pts.map((p, k) => [...p, lw * R[k]]);
    m.chain(chainPts, mat, { ...g, paint: q.regions?.legs ? p => regionMarking(p, q.regions.legs) ?? undefined : q.stripes ? p => p[1] > .1 && p[1] < topY && ((p[1] * (q.stripes.legN ?? 6) + p[0] * .8 + side * .3) % 1 + 1) % 1 < (q.stripes.w ?? .3) * .75 ? M[q.stripes.mat || "BODY3"] : undefined : q.socks || q.beads ? p => q.beads && p[1] > .12 && p[1] < (q.socks ?? 0) + .45 && Math.floor(p[1] * 16) % 3 === 0 && spotty(p, 30, .55) ? M.STONE : q.socks && p[1] < q.socks ? M.BODY3 : undefined : undefined }); // beads: stone-grey prayer beads round its legs
    // the foot: a hoof (a dark wedge, flat-fronted), a paw (a pad, its toes in front from adult up) or a flat sole (long, its toes at the end)
    const foot = pts[pts.length - 1], pk = q.pawK ?? 1, fl = (hoof ? .07 : .09) * (q.legW ** .5) * hf * pk, fw = lw * 1.1 * pk; // (q.pawK: its feet's size, 1 as built: a snow leopard's big paws)
    if (hoof) m.box(v3.add(foot, [fl * .35, fl * .5 - .01, 0]), [fl * .62, fl * .5, fw * .85], M.NOSE, { ...g, round: fl * .22, dir: [1, -.15, 0] });
    else {
      m.ell(v3.add(foot, [fl * (flat ? .6 : .5), -.01, 0]), [fl * (flat ? 1.3 : 1), lw * .85, fw], mat, g);
      if (level >= 2) for (const dz of [-.6, 0, .6]) m.ell(v3.add(foot, [fl * (flat ? 1.65 : 1.3), -.02, dz * fw * .75]), [fl * .32, lw * .5, fw * .3], mat, g); // toes
    }
    const fc = v3.add(foot, [fl * .5, -.01, 0]);
    m.anchors.feet.push({ c: fc, r: Math.max(fl, fw), group: g.group, fit: hoof ? "hoof" : "paw" });
    // the live rig: hip, knee (the elbow or stifle), foot, and the hock or wrist between (a later rig can bend it); r: hip, knee, foot
    m.rig.legs.push({ name: m.part, fore, side, hip: hipTop, knee: pts[1], hock: pts[2], foot, r: [chainPts[0][3], chainPts[1][3], chainPts[chainPts.length - 1][3]], fl, mat, hoof });
    m.part = "body";
  };
  for (const side of [-1, 1]) { leg(true, side); leg(false, side); }
  // ---- neck and head, turned towards us ----
  m.part = "head"; // the neck, head, ears, eyes, horns, antlers and tusks: one piece, hung from the neck's base
  const nb = [len * .82, top - .12, 0], H = [nb[0] + Math.cos(q.neckAng) * q.neck * .9, nb[1] + Math.sin(q.neckAng) * q.neck * .9 + sz("headLift"), 0];
  const neckPaint = p => q.belly && p[1] < (nb[1] + H[1]) / 2 - .05 ? M.BELLY : q.face === "dark" ? M.BODY2 : undefined;
  m.seg(nb, H, q.neckW * .55 * sz("neckBase"), q.neckW * .42 * sz("neckTop"), M.BODY, { paint: neckPaint });
  // the nape: a crest along the top of the neck, from the withers to the back of the skull, so the head hangs from the neck rather
  // than being pierced by it; and the throat under it (q.nape, q.throat: their fullness, 1 as built; 0 none)
  if (q.neck > .12 && (q.nape ?? 1)) { const nd = v3.norm(v3.sub(H, nb)), up = v3.norm([-nd[1], nd[0], 0]), k = q.neckW * .3 * (q.nape ?? 1) * sz("neckTop"); m.seg(v3.add(nb, v3.add(v3.mul(up, k * .9), [-.04, .04, 0])), v3.add(H, v3.add(v3.mul(up, hr * .35), [-hr * .45, 0, 0])), k * 1.15, k * .85, M.BODY, { paint: p => q.face === "dark" ? M.BODY2 : undefined }); }
  if (q.neck > .12 && (q.throat ?? 1)) { const nd = v3.norm(v3.sub(H, nb)), dn = v3.norm([nd[1], -nd[0], 0]), k = q.neckW * .26 * (q.throat ?? 1) * sz("neckBase"); m.seg(v3.add(nb, v3.add(v3.mul(dn, k * .7), [.02, -.02, 0])), v3.add(H, v3.add(v3.mul(dn, hr * .35), [hr * .2, -hr * .2, 0])), k * 1.1, k * .7, M.BODY, { paint: neckPaint }); }
  const tearAt = p => { // a cheetah's black tear lines, eye to mouth (lit on its legend)
    if (!q.tears) return undefined;
    const z = Math.sign(p[2]) || 1, E = [H[0] + hr * .78, H[1] + hr * .28, z * hr * .5], F = [H[0] + hr * 1.2, H[1] - hr * .62, z * hr * .28], d = v3.sub(F, E), t = Math.max(0, Math.min(1, v3.dot(v3.sub(p, E), d) / v3.dot(d, d))), w = v3.sub(p, v3.add(E, v3.mul(d, t)));
    return v3.dot(w, w) < (hr * .13) ** 2 ? (q.tears === "glow" ? M.MAGIC2 : M.NOSE) : undefined;
  };
  const headPaint = p => {
    if (q.regions?.head) { const mark = regionMarking(v3.sub(p, H), q.regions.head); if (mark !== null) return mark; }
    if (q.face === "badger") return Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) + (p[0] - H[0]) * .1 || p[1] < H[1] - hr * .1 ? (q.blazeGlow && Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) && p[1] > H[1] - hr * .1 ? M.RUNE : M.BELLY) : M.BODY3; // blaze: the stripe's width; blazeGlow: it glows in moonlight
    if (q.face === "dark") return M.BODY2;
    if (q.face === "raccoon") { const band = H[1] + hr * .12; if (p[0] > H[0] - hr * .35 && Math.abs(p[1] - band) < hr * .27) return M.BODY3; if (p[0] > H[0] - hr * .1 && p[1] >= band + hr * .27 && p[1] < band + hr * .5) return M.BELLY; if (p[0] > H[0] + hr * .2 && p[1] < band - hr * .27) return M.BELLY; return undefined; } // the bandit mask: black across its eyes, white brows over it and a white muzzle under
    if (q.face === "meerkat" && p[0] > H[0] - hr * .05 && Math.abs(p[1] - (H[1] + hr * .27)) < hr * .3 && Math.abs(Math.abs(p[2]) - hr * .5) < hr * .38) return M.BODY3; // dark patches round its eyes
    if (q.frost && p[0] > H[0] + hr * .7 && spotty(p, 26, .45)) return M.WEB; // frost on its muzzle
    if (q.scars && Math.abs((p[0] - H[0] - hr * .3) * .8 + (p[1] - H[1] - hr * .1)) < hr * .035 && Math.abs(p[0] - H[0] - hr * .3) < hr * .45 && p[2] > 0) return M.BELLY; // a scar across its brow and eye
    if (q.stripes && p[1] > H[1] - hr * .1 && p[0] < H[0] + hr * .55 && (((p[1] - H[1]) / hr * 3.2 + Math.abs(p[2]) / hr * 1.6 - (p[0] - H[0]) / hr) % 1 + 1) % 1 < .24) return M[q.stripes.mat || "BODY3"]; // stripes over its brow and cheeks
    const tear = tearAt(p); if (tear) return tear;
    if (q.mask && p[0] > H[0] + hr * .15 && p[1] > H[1] - hr * .4 && p[1] < H[1] + hr * .45) return M.BELLY; // a white mask over its eyes and muzzle
    if ((q.belly || q.muzzle) && p[1] < H[1] - hr * .35 && !(q.jawCoat && p[0] > H[0])) return M.BELLY; // (jawCoat: not its chin)
    return undefined;
  };
  const HR = [hr * 1.05, hr * .92 * (q.skullY ?? 1), hr * .88 * (q.skullZ ?? 1)]; // (skullY, skullZ: the head flatter or wider, 1 as built)
  m.ell(H, HR, M.BODY, { paint: headPaint });
  const L = hr * q.snout * sz("snout"), Dm = hr * q.snoutD * .55, sn = [H[0] + hr * .65 + L * .5, H[1] - hr * .28, 0];
  // its jaw open (Ed, 2026-10-13: bites, roars and yawns; gear.jaw 0 shut to 1 wide): turned about a hinge at the back of the cheek
  // by up to q.gape radians, a third of it lifting the muzzle (so the mouth shows from the camera's height above) and the rest dropping
  // the lower jaw; teeth by q.bite: "fangs" (a meat eater's canines, small teeth between), "flat" (a grazer's), "croc" (rows of cones)
  const jawK0 = q.beak ? 0 : (q.jaw ?? 1) * (baby ? .7 : 1), open = jawK0 ? Math.max(0, Math.min(1, GEAR?.jaw ?? JAW_FACES[GEAR?.face]?.jaw ?? 0)) : 0, bite = q.bite || (q.flatJaw ? "croc" : hoof ? "flat" : "fangs");
  const gapeAll = open * (q.gape ?? (bite === "flat" ? .55 : bite === "croc" ? .65 : 1)), lift = gapeAll * .35, gape = gapeAll - lift;
  const mouthY = sn[1] - Dm * (.45 + .12 * jawK0), hinge = [H[0] + hr * .25, mouthY + Dm * .08, 0];
  const rotAbout = a => { const c = Math.cos(a), s = Math.sin(a); return [p => [hinge[0] + (p[0] - hinge[0]) * c - (p[1] - hinge[1]) * s, hinge[1] + (p[0] - hinge[0]) * s + (p[1] - hinge[1]) * c, p[2]], d => [d[0] * c - d[1] * s, d[0] * s + d[1] * c, d[2]]]; };
  const [lifted, liftD] = rotAbout(lift), [turn, turnD] = rotAbout(-gape), snU = lifted(sn), jawG = open > .05 ? 63 : 1; // (snU: the muzzle, lifted; jawG: open, the lower jaw a hard edge apart from the muzzle, not blended into it)
  const [unlift] = rotAbout(-lift), [unturn] = rotAbout(gape), roof = p => open > .05 && Math.abs(p[2]) < Dm * .6 && unlift(p)[1] < mouthY + Dm * .1 && p[0] > hinge[0]; // (open: the muzzle's underside is the mouth's dark roof)
  if (q.beak) m.chain([[H[0] + hr * .7, H[1] - hr * .05, 0, hr * .34], [H[0] + hr * 1.2 * q.beak, H[1] - hr * .12, 0, hr * .22], [H[0] + hr * 1.5 * q.beak, H[1] - hr * .38, 0, hr * .1], [H[0] + hr * 1.42 * q.beak, H[1] - hr * .62, 0, hr * .03]], M.ACCENT, { group: 1 }); // a griffin's hooked beak (beak: its length), in its accent
  const tip = q.beak ? [H[0] + hr * 1.42 * q.beak, H[1] - hr * .62, 0] : lifted([sn[0] + L * .62 + hr * .1, sn[1] - .02, 0]); // (its snout's tip, or its beak's)
  if (q.flatJaw && !q.beak) { // a crocodile's: long, flat and wide, lying low, a row of teeth along its edge
    // the mouth (q.jawLine; Ed, 2026-10-13: "the jaw line showing"): a dark line along the jaw's side where the upper jaw meets the lower, which is as wide as the upper and hangs under it (shut: open, the mouth shows instead)
    const lineY = sn[1] - Dm * .5, onLine = p => q.jawLine && open <= .05 && Math.abs(p[1] - lineY) < .012 && p[0] > sn[0] - L * .55 && p[0] < sn[0] + L * .66;
    m.ell(snU, [L * .62 + hr * .2, Dm * .55, hr * (q.jawW ?? .5)], M.BODY, { dir: liftD([1, -.08, 0]), paint: p => roof(p) ? M.MOUTH : onLine(p) ? M.LINE : p[1] < snU[1] - Dm * .25 ? M.BELLY : headPaint(p) });
    if (!baby) for (let i = 0; i < 6; i++) for (const side of [-1, 1]) m.ell(lifted([sn[0] - L * .4 + i * L * .17, sn[1] - Dm * .3, side * hr * ((q.jawW ?? .5) - .06)]), [hr * .035, hr * .06, hr * .03], M.ACCENT, { group: 1 });
    if (q.jawLine) m.ell(turn([sn[0] - L * .04, sn[1] - Dm * .72, 0]), [L * .6 + hr * .16, Dm * .45, hr * ((q.jawW ?? .5) - .02)], M.BODY, { group: jawG, dir: turnD([1, -.08, 0]), paint: p => onLine(p) ? M.LINE : p[1] < lineY ? M.BELLY : headPaint(p) }); // (its lower jaw, turned down with the bite)
    for (const side of [-1, 1]) { // its nostrils on a knob at its snout's tip, up above the water line with its eyes (its legend's glowing)
      const n = [tip[0] - hr * .2, tip[1] + Dm * .4, side * hr * .09];
      m.ell(n, [hr * .13, hr * .1, hr * .1], M.BODY, {}); m.ell(v3.add(n, [0, hr * .08, 0]), [hr * .06, hr * .04, hr * .05], legend ? M.MAGIC2 : M.NOSE, { group: 1 });
    }
  } else if (!q.beak) {
    m.ell(snU, [L * .62 + hr * .2, Dm, Dm * .95], M.BODY, { dir: liftD([1, -.25, 0]), paint: p => (roof(p) ? M.MOUTH : undefined) ?? tearAt(p) ?? ((q.muzzle || q.belly) && !q.jawCoat && p[1] < snU[1] - Dm * .1 ? M.BELLY : headPaint(p)) });
    if (q.jaw) m.ell(turn([sn[0] - L * .05, sn[1] - Dm * .55, 0]), [L * .55 + hr * .18, Dm * .55 * q.jaw, Dm * .85 * Math.min(1.3, q.jaw)], M.BODY, { group: jawG, dir: turnD([1, -.15, 0]), paint: headPaint }); // a heavy lower jaw (a jaguar legend's crushing bite)
    if (!q.trunk) m.ell(tip, [hr * (q.disc ? .1 : .12), hr * (q.disc ? .2 : .12), hr * (q.disc ? .2 : .15)], M.NOSE, { group: 1 });
    else { // a trunk (an elephant's): from its snout, hanging down and forward, wrinkled, its tip curling forward and up by curl
      const T = q.trunk, Lt = (T.len ?? 1) * hr * 2.4, r0 = (T.r ?? .34) * hr, pts = [], n = 12;
      let p = [snU[0] + L * .2, snU[1] - Dm * .2, 0], ang = -.45;
      // raise (a legend's: 0 hanging to 1 held high in a trumpet): up from its brow, its tip flared and curled back over
      const up = T.raise ?? 0;
      if (up) ang = -.45 + (.35 + .45) * up;
      for (let i = 0; i <= n; i++) { const t = i / n, hang = -.45 - Math.min(t, .7) * 1.6 + Math.max(0, t - .7) * (T.curl ?? .5) * 5, high = .35 + t * 1.25 + Math.max(0, t - .72) * (T.curl ?? .5) * 4.5; pts.push([...p, r0 * (1 - t * .62) * (up && t > .9 ? 1.5 : 1)]); ang = hang + (high - hang) * up; p = [p[0] + Math.cos(ang) * Lt / n, p[1] + Math.sin(ang) * Lt / n, 0]; }
      m.chain(pts, M.BODY, { group: 1, paint: q => Math.sin(q[1] * 70 + q[0] * 20) > .75 ? M.BODY2 : undefined });
      m.ell(pts[n].slice(0, 3), [r0 * .4, r0 * .4, r0 * .4], M.NOSE, { group: 1 });
    }
  }
  // eyes: both show; legends' glow
  for (const side of [-1, 1]) { const e = Model.surface(H, HR, v3.norm([.75, .32, side * .62])); m.ell(e, [hr * .13, hr * .16, hr * .13].map(v => v * (q.eyeK || 1) * sz("eye")), elder ? M[elder.eye || "MAGIC2"] : (legend && !q.tusks) || q.eyeGlow ? M.MAGIC2 : M.EYE, { group: 1 }); } // (eyeGlow: an evolved level's eye catching the light, the legend boar's under its hump)
  // the face's bones (the menagerie review, 2026-10-13: the head was one egg with a snout): a brow ridge over the eyes, so they sit
  // in sockets under it; cheeks (the zygomatic arch and the jowls below it) widening the face under the eyes; a lower jaw under the
  // snout with the mouth's line along it; and whiskers (q.whiskers) as a few pale lines off the muzzle. Knobs q.brow, q.jowl, q.jaw
  // (their size, 1 as built, 0 none), softer on a baby; the jaw only on a snouted head (not a beak's).
  const browK = (q.brow ?? 1) * (baby ? .55 : 1) * (q.beak ? .5 : 1), jowlK = (q.jowl ?? (q.cheeks ? 1.35 : 1)) * (baby ? .7 : 1), jawK = q.beak || (q.flatJaw && q.jawLine) ? 0 : (q.jaw ?? 1) * (baby ? .7 : 1); // (a flat jaw with its own jaw line draws no generic jaw)
  if (browK) m.ell([H[0] + hr * .42, H[1] + hr * .46, 0], [hr * .4, hr * .2 * browK, hr * .78], M.BODY, { group: 1, dir: [1, .35, 0], paint: headPaint });
  if (jowlK) for (const side of [-1, 1]) m.ell([H[0] + hr * .3, H[1] - hr * .3, side * hr * .66], [hr * .5, hr * .36 * jowlK, hr * .3 * jowlK], M.BODY, { group: 1, paint: headPaint });
  if (jawK) {
    const jc = [sn[0] - L * .08, sn[1] - Dm * .5 * jawK, 0];
    const lip0 = Math.max(hinge[0] + hr * .1, sn[0] - L * .2), lip1 = sn[0] + L * .5 + hr * .05; // the gape, from the corner of the mouth to the front
    m.ell(turn(jc), [L * .5 + hr * .12, Dm * .42 * jawK * (1 - open * .2), Dm * .78 * (1 - open * .15)], M.BODY, { group: jawG, dir: turnD([1, -.22, 0]), paint: p => gape && Math.abs(p[2]) < Dm * .6 && unturn(p)[1] > jc[1] + Dm * .15 * jawK ? M.MOUTH : !gape && p[1] > mouthY - .012 && p[1] < mouthY + .012 && p[0] > sn[0] - L * .05 && p[0] < sn[0] + L * .62 ? M.LINE : q.jawCoat ? M.BODY : ((q.muzzle || q.belly) ? M.BELLY : headPaint(p)) }); // (jawCoat: its lower jaw in its coat, not its pale belly or muzzle, as its muzzle's underside and its chin: Ed's animal review, 2026-10-13) (shut: its mouth a dark line where the jaw meets the muzzle)
    if (gape) {
      // the lips, found on the model as built: down from inside the muzzle to its underside, and up from inside the turned jaw to its top
      const exit = (p, d, most) => { let t = 0; while (t < most && m.field(v3.add(p, v3.mul(d, t))) < 0) t += Dm * .02; return v3.add(p, v3.mul(d, t)); }; // (no further than most: where the jaws still meet, not out through the far side)
      const upLip = (x, z) => exit(lifted([x, sn[1] - Dm * .2, z]), liftD([0, -1, 0]), Dm * 1.1), loLip = (x, z) => exit(turn([x, jc[1], z]), turnD([0, 1, 0]), Dm * .5 * jawK);
      const N = 6, lipAt = t => lip0 + (lip1 - lip0) * t, tg = [];
      for (let i = 0; i <= N; i++) { // the throat at the back, between the muzzle's underside and the jaw's top (warm, not black); in front of it open air, the background showing between the jaws
        const t = i / N, x = lipAt(t), up = upLip(x, 0), lo = loLip(x, 0), h = Math.max(hr * .03, (up[1] - lo[1]) * .5 + Dm * .05);
        if (t <= .2) m.ell(v3.lerp(up, lo, .5), [(lip1 - lip0) / N * .9, h, Dm * .45], M.MOUTH, { group: jawG });
        if (i % 3 === 0 && i < N) tg.push([...v3.add(lo, v3.mul(turnD([0, 1, 0]), hr * .04)), hr * (.16 - i * .006)]);
      }
      m.chain(tg, M.SKIN, { group: jawG }); // a tongue lying on the jaw's floor
      if (!baby) { // its teeth, each side, from the upper lip down and from the jaw's lip up
        const tooth = (x, len, w, down, side) => { const z = side * Dm * .55, a = down ? upLip(x, z) : loLip(x, z), d = down ? liftD([0, -1, 0]) : turnD([0, 1, 0]); m.seg(v3.sub(a, v3.mul(d, w)), v3.add(a, v3.mul(d, len)), w, w * (bite === "flat" ? .9 : .25), M.WEB, { group: 64 }); }; // (ivory, whatever its horns; a group of their own, so they are not blended into the jaw)
        for (const side of [-1, 1]) {
          if (bite === "fangs") { tooth(lip1 - L * .05, Dm * .9, Dm * .22, true, side); tooth(lip1 - L * .16, Dm * .65, Dm * .2, false, side); } // just its canines (sized by the snout's depth): rows of small teeth merged into one pale block at game size
          else if (bite === "flat") tooth(lip1 - L * .04, Dm * .25, Dm * .16, false, side); // a grazer's: a small pair of lower incisors at the front (no upper ones, as a deer)
          else for (let i = 0; i < 7; i++) { const x = lip0 + (lip1 - lip0) * (.08 + i * .14); tooth(x, Dm * .5, Dm * .14, true, side); tooth(x + (lip1 - lip0) * .07, Dm * .46, Dm * .14, false, side); }
        }
      }
    }
    if (q.whiskers && !baby) for (const side of [-1, 1]) for (let w = 0; w < 3; w++) { const b = lifted([sn[0] + L * .35, sn[1] - Dm * .15 + (w - 1) * Dm * .18, side * Dm * .75]), d = v3.norm([.35, (w - 1) * .25 - .1, side]); m.seg(b, v3.add(b, v3.mul(d, hr * (.55 + .12 * (w % 2)))), hr * .018, hr * .006, M.BELLY, { group: 30 + w + (side > 0 ? 0 : 3), extra: true }); }
  }
  m.anchors.head = { c: H, r: HR, top: [H[0] - hr * .1, H[1] + hr * .82, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(H, HR, v3.norm([.75, .32, side * .62]))), size: hr * .16 * (q.eyeK || 1) * sz("eye") };
  if (q.maneHair) { // a horse's mane: a crest of hair along the top of its neck, falling a little to one side, and a forelock (a unicorn's)
    const back = v3.norm([-Math.sin(q.neckAng), Math.cos(q.neckAng), 0]), w = q.neckW * .55 + .06;
    for (let i = 0; i <= 7; i++) { const t = i / 7, c = v3.add(v3.lerp(nb, H, .05 + t * .95), v3.mul(back, w * (1 - t * .3))); m.ell(v3.add(c, [0, 0, .05]), [.12, .1 + .04 * Math.sin(i * 1.7), .09], M[q.maneHair.mat || "BODY3"], { group: 30 + (i % 2) }); }
  }
  m.anchors.neck = { c: v3.lerp(nb, H, sz("neckAnchor")), r: q.neckW * .5 * sz("neckR"), dir: v3.norm(v3.sub(H, nb)), tag: sz("tag") }; // lower on the neck when the head is big
  // ears
  const earTips = []; // each ear's tip (for the elder kit's earrings)
  for (const side of [-1, 1]) {
    const E = q.ear, base = q.earRoot ? quadrupedEarSocket(H, hr, side, [0, 1, 0], q.earRoot).base : [H[0] - hr * .15, H[1] + hr * .7, side * hr * .5], k = q.earS * sz("ear") * (q.ear === "long" ? .62 / (baby ? sz("head") : 1) : 1); // (long ears don't grow with a baby's big head: a leveret's are short for its head, and its young must stand clear above it)
    if (E === "none" || elder?.ears) continue;
    if (E === "fan") { const c = [H[0] - hr * .55, H[1] - hr * .12, side * hr * .82], d = [hr * .46 * k, hr * .62 * k, hr * .07]; m.ell(c, d, M.BODY2, { group: 5 + (side > 0 ? 0 : 20), dir: [1, .25, 0], paint: p => Math.hypot((p[0] - c[0]) / d[0], (p[1] - c[1]) / d[1]) > .8 ? M.BODY3 : undefined }); continue; } // an elephant's: a great flat fan against the side of its head, its edge ragged and darker
    if (E === "round") { m.ell(base, [hr * .22, hr * .25 * k, hr * .1], M.BODY, { group: elder ? 9 : 1, paint: p => p[0] > base[0] + hr * .02 ? M.EAR : undefined }); continue; }
    const long = E === "long", sail = E === "sail", droop = E === "small" ? -.6 : 0, eh = hr * .55 * k * (E === "big" ? 1.35 : long ? 2.2 : 1), ew = hr * .3 * (E === "big" ? 1.2 : long ? 1.35 : sail ? .8 * k : 1); // sail: a fennec's, as wide as it's tall, flared out
    const oldDir = v3.norm([droop * .6 - (long ? .3 : .12), 1, side * (sail ? .6 : .3)]), dirE = q.earAngle ? quadrupedEarSocket(H, hr, side, oldDir, q.earRoot, q.earAngle).direction : oldDir, n = v3.norm([.55, .2, side]), across = v3.norm(v3.cross(n, dirE)); // the ear opens forward and out, towards us on the near side
    m.flat(v3.add(base, v3.mul(dirE, eh)), across, dirE, ew, eh, masks.ear(M.BODY, M.EAR, sail ? M.BODY : M.BODY3), { group: 5 + (side > 0 ? 0 : 20), extra: long });
    earTips.push({ tip: v3.add(base, v3.mul(dirE, eh * 1.9)), base, h: eh * 2, across, side, dir: dirE, w: ew });
    if (E === "tuft" && q.plume) { const a0 = v3.add(base, [0, eh * 1.3, side * .02]); m.chain([[...a0, hr * .09], [...v3.add(a0, [-hr * .2, eh * 1.4, side * .05]), hr * .1], [...v3.add(a0, [-hr * .55, eh * 2.6, side * .08]), hr * .06], [...v3.add(a0, [-hr * .95, eh * 3.3, side * .1]), hr * .015]], M.BODY3, { group: 1, extra: true }); m.ell(v3.add(a0, [-hr * .95, eh * 3.35, side * .1]), [hr * .07, hr * .07, hr * .07], M.MAGIC2, { group: 1, extra: true }); } // its ear tufts grown into long black plumes like flames, their tips alight
    else if (E === "tuft") m.seg(v3.add(base, [0, eh * 1.4, side * .02]), v3.add(base, [0, eh * 1.85, side * .04]), hr * .05, hr * .02, M.BODY3, { group: 1 });
  }
  // ---- tail ----
  const tb = [-len * 1.05, top - .1 + arch * .5, 0], tw = frame ? .04 : -.02;
  m.part = "tail"; m.rig.head = { nb, H, hr }; m.rig.tail = tb;
  if (!elder?.tail && !has("tails") && !feats?.some(f => f.kind === "tails" && f.replace)) tail3d(m, has("starTail") ? "star" : q.tail, tb, len, top, tw, q.tailL ?? 1, q.tailK ?? 1);
  m.part = "head";
  // ---- horns, antlers, tusks ----
  const hornTips = [];
  if (q.horns === "single") {} else if (q.horns === "twist") for (const side of [-1, 1]) hornTips.push(horn3d(m, [H[0] - hr * (.05 + (q.horn?.back ?? 0)), H[1] + hr * (.6 + (q.horn?.up ?? 0)), side * hr * (.45 + (q.horn?.wide ?? 0))], side, /* back, up, wide: its base moved, in head radii (clear of the brows) */ { ...q.horn, length: (q.horn?.length ?? 2) * hr * (q.hornBroken && side < 0 ? .45 : 1), r: (q.horn?.r ?? .3) * hr }));
  else if (q.horns) for (const side of [-1, 1]) { const k = has("hornsGlow") ? 1.5 : sz("horns"), pts = []; for (let i = 0; i <= 8; i++) { const a = .3 - i / 8 * Math.PI * 1.6, r = hr * .65 * k * (1 - .45 * i / 8); pts.push([H[0] - hr * .1 + Math.cos(a) * r, H[1] + hr * .45 + Math.sin(a) * r, side * (hr * .6 + i * .015)]); pts[i].push(hr * .2 * k * (1 - .6 * i / 8)); } m.chain(pts, has("hornsGlow") ? M.MAGIC : M.ACCENT, { group: 13 }); }
  if (has("crown")) crown3d(m, [H[0] - hr * .05, H[1] + hr * .9, 0], hr * .5); // (a wildcat elder's: her crown, as the toad's and the mole's)
  if (q.horns === "single") { // a unicorn's: one spiral horn from its brow, forward and up, longer by level; its legend's of light
    const k = sz("horns") * (has("hornsGlow") ? 1.25 : 1), b = [H[0] + hr * .35, H[1] + hr * .62, 0], d = v3.norm([.55, 1, 0]), Lh = hr * 2.1 * k, pts = [];
    for (let i = 0; i <= 8; i++) { const t = i / 8; pts.push([...v3.add(b, v3.mul(d, Lh * t)), hr * .2 * k * (1 - .85 * t) + .006]); }
    const lit = has("hornsGlow") || q.hornLight, spiral = p => { const s = v3.dot(v3.sub(p, b), d) / Math.max(1e-3, Lh), a = Math.atan2(p[2], (p[0] - b[0]) * d[1] - (p[1] - b[1]) * d[0]); return Math.floor(s * 9 + a / Math.PI) % 2 ? (lit ? M.MAGIC : M.BODY3) : (lit ? M.MAGIC2 : M.BELLY); };
    m.chain(pts, lit ? M.MAGIC2 : M.ACCENT, { group: 9, paint: q.hornLight ? undefined : spiral }); // (an elder's of light: smooth, Ed 2026-10-13) hornTips.push(v3.add(b, v3.mul(d, Lh)));
  }
  if (q.antlers || has("jackalope")) for (const side of [-1, 1]) antlers3d(m, q, [H[0] - hr * .05, H[1] + hr * .75, side * hr * .4], side, sz("antlers"), has);
  const tuskTips = [], tuskPaths = []; // (each tusk's path, for the elder kit's rings)
  if (q.tusks) for (const side of [-1, 1]) {
    const k = has("tusksBig") ? 1.4 : q.tuskSize ?? sz("tusks"); if (!k) continue; const b = [sn[0] + L * .25, sn[1] - Dm * .4, side * Dm * .8];
    if (q.tuskCurl === undefined) { const tp = [[...b, .045 * k], [...v3.add(b, [.1 * k, .1 * k, side * .03]), .04 * k], [...v3.add(b, [.06 * k, .24 * k, side * .05]), .02 * k]]; m.chain(tp, M.ACCENT, { group: 8 }); tuskTips.push(v3.add(b, [.06 * k, .24 * k, side * .05])); tuskPaths.push(tp); continue; }
    // an evolved tusk (genome levels): a tapering curve out, up and back round by tuskCurl (half turns), its tip fine
    const pts = [], n = 9, R = .13 * k;
    for (let i = 0; i <= n; i++) { const t = i / n, a = t * q.tuskCurl * Math.PI, r = R * (1 - t * .35); pts.push([b[0] + Math.sin(a) * r * 1.2, b[1] + (1 - Math.cos(a)) * r, b[2] + side * t * .07 * k, .034 * k * (1 - t * .8)]); }
    m.chain(pts, M.ACCENT, { group: 8, paint: q.tuskBands ? p => { const t = Math.hypot(...v3.sub(p, b)) / (R * 2.4); return t > .15 && Math.floor(t * q.tuskBands * 2) % 2 && (t * q.tuskBands * 2) % 1 < .35 ? M.WOOD : undefined; } : undefined }); tuskTips.push(pts[n].slice(0, 3)); tuskPaths.push(pts); // tuskBands: bronze rings round tusks worn with age
  }
  // a monitor's long forked tongue, flicking: out long on one frame, half in on the other (q.tongue: its length, a share of the head)
  if (q.tongue) { const out = hr * q.tongue * (frame ? 1 : .45), a = [tip[0] + hr * .05, tip[1] - hr * .12, 0], b = [a[0] + out, a[1] - out * .12, 0]; m.seg(a, b, hr * .045, hr * .035, M[q.tongueMat || "BELLY"], { group: 62, extra: true }); for (const side of [-1, 1]) m.seg(b, [b[0] + out * .3, b[1] + side * out * .06, side * out * .12], hr * .03, hr * .02, M[q.tongueMat || "BELLY"], { group: 62, extra: true }); }
  if (q.bigTeeth) for (const side of [-1, 1]) m.ell([tip[0] - hr * .05, tip[1] - hr * .42, side * hr * .09], [hr * .1, hr * .32, hr * .08], M.GLOW, { group: 1, extra: true }); // two great orange incisors, alight
  if (q.log) { const lc = [tip[0] - hr * .05, tip[1] - hr * .55, 0], LL = hr * 1.6; for (const side of [-1, 1]) m.seg([lc[0], lc[1], side * LL], [lc[0], lc[1], side * LL * .12], hr * .3, hr * .1, side > 0 ? M.TRUNK : M.WOOD, { group: 1, extra: true }); } // a log in its jaws, gnawed to an hourglass
  if (q.teeth && !baby && !q.bigTeeth) m.ell([tip[0] - hr * .1, tip[1] - hr * .25, 0], [hr * .08, hr * .14, hr * .12], M.ACCENT, { group: 1 });
  // ---- legendary features ----
  m.part = "body";
  const backAt = t => [-len * .9 + t * len * 1.65, top + hump * Math.max(0, 1 - Math.abs(t - .8) * 3) + arch * (1 - Math.abs(t - .4) * 2), 0];
  if (q.noseHorn) { // a rhino's: a great horn near the tip of its nose and a smaller one behind it, in line, curving up and back (noseHorn: the front one's size;
    // oneHorn: the front one alone, its legend's; hornRings: bronze bands round it, offerings)
    const k = q.noseHorn * Math.max(.35, sz("tusks") || 0);
    for (const [at, s] of q.oneHorn ? [[.4, 1]] : [[.4, 1], [.02, .45]]) {
      const b = [sn[0] + L * at, sn[1] + Dm * .5, 0], h = hr * .9 * k * s, tip = [b[0] - h * .22, b[1] + h * 1.05, 0];
      const pts = [[...b, h * .22], [b[0] + h * .06, b[1] + h * .45, 0, h * .13], [b[0] - h * .06, b[1] + h * .85, 0, h * .06], [...tip, h * .015]];
      m.chain(pts, M.ACCENT, { group: 8 }); tuskTips.push(tip);
      if (q.hornRings && s === 1) for (const t of [.22, .4]) { const i = Math.floor(t * 3), f = t * 3 - i, a = pts[i], z = pts[i + 1], p = a.map((v, j) => v + (z[j] - v) * f);
        m.ell(p.slice(0, 3), [p[3] * .3, p[3] * 1.3, p[3] * 1.3], M.WOOD, { group: 9, dir: v3.norm(v3.sub(z.slice(0, 3), a.slice(0, 3))) }); }
    }
  }
  if (feats?.length) evolve3d(m, feats, { H, hr, sn, L, Dm, tuskTips, hornTips, tuskPaths, hornPaths: m.hornPaths || [], antlerPaths: m.antlerPaths || [], earTips, tb, backAt, len, top, chest, tuck, bw, frame, front, glide: q.glide });
  if (elder) { elderQuad(m, S, { H, hr, sn, L, Dm, nb, tb, backAt, len, top, chest, tuck, bw, frame }); m.part = "body"; }
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [len * .2, top, side * bw * .5], side, 1.15, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("mane") || has("flames")) for (let i = 0; i < 7; i++) { const t = i / 6, b = v3.lerp(v3.add(H, [-hr * .5, hr * .3, 0]), backAt(.55), t), h = [.4, .3, .45, .28, .38, .25, .3][i], up = v3.norm([-.35 - (frame ? .1 : 0), 1, 0]); m.flat(v3.add(b, v3.mul(up, h * .5)), [1, 0, 0], up, h * .32, h * .55, masks.flame(i % 2 ? M.MAGIC : M.MAGIC2, M.MAGIC2), { group: 60 + i % 2, extra: true }); }
  if (has("tails")) for (let i = 0; i < 7; i++) { m.part = "tail"; const a = Math.PI * (.55 + i * .08), z = (i - 3) * .1, e = v3.add(tb, [Math.cos(a) * .9, Math.sin(a) * .85, z]); m.chain([[...tb, .1], [...v3.lerp(tb, e, .5), .17], [...e, .08]], i % 2 ? M.BODY2 : M.BODY, { group: 70, extra: true }); m.ell(e, [.09, .09, .09], M.MAGIC2, { group: 71, extra: true }); }
  m.part = "body";
  if (has("crystals")) [.15, .3, .45, .6, .75].forEach((t, i) => { const b = backAt(t), h = [.3, .5, .4, .6, .35][i]; m.ell(v3.add(b, [0, h * .45, (i % 2 - .5) * .1]), [h * .55, .08, .08], M.MAGIC, { dir: [(i - 2) * .12, 1, 0], group: 80 + i % 2, extra: true, paint: p => p[2] > 0 ? M.MAGIC2 : undefined }); });
  if (has("moss")) {
    for (let i = 0; i < 6; i++) m.ell(backAt(.08 + i * .15), [len * .22, .07, bw * .85], M.LEAF, { group: 85, extra: true });
    // a little wood growing on its back (Ed, 2026-10-06: bigger generated trees, not the lollipops that read as flat "mint domes"
    // from the game's camera, the art director's round 2): two or three, grown by backTree3d
    // in the species' own kind (BACK_TREES), each from its own seed, the tallest in the middle
    const kind = BACK_TREES[S.id] ?? "broad", seed = [...S.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0, r = rng(seed);
    for (const [i, t, h] of [[0, .22, .95], [1, .5, 1.35], [2, .78, .8]]) backTree3d(m, backAt(t + uni(r, -.04, .04)), h * len * uni(r, .9, 1.1), seed + i * 977, kind, 86);
    for (const t of [.12, .4, .65, .9]) { const b = backAt(t); m.ell(v3.add(b, [0, .12, bw * .3]), [.07, .035, .07], M.MAGIC, { group: 89, extra: true }); }
  }
  if (has("ribbons")) for (let i = 0; i < 3; i++) { const pts = []; for (let k = 0; k < 9; k++) { const t = k / 8; pts.push([len * (.5 - t * 2.2), top + .05 + i * .1 + t * (.25 + i * .12) + Math.sin(t * 6 + frame + i) * .07, (i - 1) * .18, .04 * (1 - t * .6)]); } m.chain(pts, i % 2 ? M.MAGIC2 : M.MAGIC, { group: 90 + i, extra: true }); }
  if (q.pearl && m.anchors.neck) { // the otter legend's treasures, worn (Ed, 2026-10-13: creatures never go in the water, so it stands): a smooth stone and a glowing pearl on a cord at its throat
    const was = m.part, N = m.anchors.neck, R = N.r * .38; m.part = "head";
    let p = v3.add(N.c, [0, -N.r * .5, 0]); for (let k = 0; k < 90 && m.field(p) < 0; k++) p = v3.add(p, [0, -.01, 0]); // the underside of its neck
    m.seg(p, v3.add(p, [0, -R * 1.1, 0]), R * .08, R * .08, M.WOOD, { group: 79, extra: true });
    m.ell(v3.add(p, [-R * .55, -R * 1.55, 0]), [R * .85, R * .6, R * .7], M.STONE, { group: 79, extra: true, rough: .01 });
    m.ell(v3.add(p, [R * .65, -R * 1.45, 0]), [R * .55, R * .55, R * .55], M.MAGIC2, { group: 79, extra: true });
    m.part = was;
  }
  gearUp(m);
  if (q.regions?.torso?.outerPx) {
    const previous = m.atScale;
    m.atScale = scale => {
      markingScale = scale;
      m.markingMetrics = { pixelsPerUnit: scale, ...rosetteSizing(q.regions.torso, { depth: Math.max(.04, Math.abs(top - chest) / 2), width: bw, pixelsPerUnit: scale }) };
      previous?.(scale);
    };
  }
  const sp = drawForm(m, { height: drawHeight(level, st, q.hgt), facing }, S, level);
  if (m.markingMetrics) sp.markingMetrics = m.markingMetrics;
  if (m.bodyGraph) sp.graphDiagnostics = m.bodyGraph.diagnostics;
  if (formMotes() && sz("motes")) glowMotes(sp, S.id.length * 7919, sz("motes"));
  return sp;
}

// Trees growing on a legend's back (its legend feature "moss"; and the sleeping legends' sapling, art/legends.js): a little
// tree grown from a seed rather than drawn by hand, Weber–Penn style in miniature. A trunk h tall that leans and bends a
// little, flared at its foot with a root or two; then its kind's crown:
//   broad: three to five boughs forking up and out from the top third, each ending in one or two leaf blobs, and one on top;
//   pine: a spire of tiers, widest at the bottom, each a ragged disc of needles, with stubs of branch;
//   willow: a broad crown whose blobs hang in long drooping curtains.
// The blobs are ragged (rough) and lit in three tones, their tops the light leaf and their undersides the dark, so the crown
// reads as a crown at night and from the treetops, not a flat dome. group: the first of the four groups it uses.
export const BACK_TREES = { elk: "pine", beaver: "willow", bear: "broad" };
export function backTree3d(m, base, h, seed, kind = "broad", group = 86) {
  const r = rng(seed), o = { group, extra: true }, lean = [uni(r, -.18, .18), 0, uni(r, -.12, .12)], bend = uni(r, -.08, .08);
  const at = t => v3.add(base, [lean[0] * h * t * t + Math.sin(t * Math.PI) * bend * h, h * t, lean[2] * h * t * t]);
  const R0 = h * (kind === "pine" ? .06 : .075);
  const trunk = []; for (let k = 0; k <= 4; k++) { const t = k / 4 * (kind === "pine" ? 1 : .78); trunk.push([...at(t), R0 * (1 - t * .7) + (k ? 0 : R0 * .4)]); }
  m.chain(trunk, M.TRUNK, o);
  for (let k = 0; k < 2; k++) { const a = uni(r, 0, 6.28); m.seg(at(.04), v3.add(base, [Math.cos(a) * h * .16, -h * .05, Math.sin(a) * h * .16]), R0 * .7, R0 * .25, M.TRUNK, o); } // roots
  const leaf = (c, rad, tall = 1) => m.ell(c, [rad, rad * .82 * tall, rad], M.LEAF, { group: group + 1, extra: true, rough: rad * .12, paint: p => p[1] > c[1] + rad * .3 * tall ? M.LEAF2 : p[1] < c[1] - rad * .25 * tall ? M.LEAF3 : undefined });
  if (kind === "pine") {
    const n = 5;
    for (let i = 0; i < n; i++) { const t = .3 + i * .15, w = h * (.3 - i * .05) * uni(r, .9, 1.1), c = at(t); m.ell(c, [w, h * .07, w], i % 2 ? M.LEAF : M.LEAF3, { group: group + 1 + (i % 2), extra: true, rough: h * .025, paint: p => p[1] > c[1] + h * .03 ? M.LEAF2 : undefined }); }
    m.ell(at(1.02), [h * .05, h * .1, h * .05], M.LEAF, { group: group + 1, extra: true });
    return;
  }
  const top = at(.78), n = 3 + Math.floor(r() * 3), a0 = uni(r, 0, 6.28), willow = kind === "willow";
  for (let i = 0; i < n; i++) {
    const a = a0 + i * 6.28 / n + uni(r, -.4, .4), from = at(uni(r, .5, .72)), len = h * uni(r, .32, .45), up = willow ? uni(r, .35, .6) : uni(r, .6, .95);
    const dir = v3.norm([Math.cos(a), up, Math.sin(a) * .8]), mid = v3.add(from, v3.mul(dir, len * .55)), end = v3.add(from, v3.mul(dir, len));
    m.chain([[...from, R0 * .55], [...mid, R0 * .38], [...end, R0 * .22]], M.TRUNK, { group: group + 3, extra: true });
    const rad = h * uni(r, .16, .22);
    leaf(v3.add(end, [0, rad * .3, 0]), rad);
    if (r() < .5) leaf(v3.add(mid, [Math.cos(a + 1.2) * rad * .6, rad * .5, Math.sin(a + 1.2) * rad * .4]), rad * .7);
    if (willow) for (let k = 0; k < 2; k++) { const d = v3.add(end, [uni(r, -.5, .5) * rad, -rad * (.7 + k * .5), uni(r, -.4, .4) * rad]); m.ell(d, [rad * .32, rad * .75, rad * .32], k ? M.LEAF3 : M.LEAF, { group: group + 2, extra: true, rough: rad * .1 }); }
  }
  leaf(v3.add(top, [0, h * .16, 0]), h * uni(r, .19, .24));
}

// A twisted horn (the parts kit's "horn that sweeps and curls"; genome parts horns: "twist", its shape in head.horn): from
// `base` it rises up and out, then sweeps back by `curl` (half turns), two strands spiralling round each other `twist` times
// along it (so it reads as twisted at game size), ridged every `ridges`th step (the second strand in `mat2`, if given, so the twist shows as a spiral band), tapering to a fine point; `tip` (a material
// name) glows its last fifth. ease: how late the sweep comes (1 even, a ram's curl); tighten: its steps shortening toward the tip
// (0 to 1: a spiral winding in); thorns: spikes off every ridge (the ram legend's). length and r in model units. Returns its tip.
export function horn3d(m, base, side, { length = .5, r = .08, curl = .6, twist = 2, ridges = 3, segs = 18, out = .45, tip, mat = "ACCENT", mat2, group = 14, ease = 1.5, tighten = 0, thorns = 0 } = {}) {
  const n = Math.max(4, segs), ds = length / n, A = [[], []];
  let p = base;
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = -.15 + Math.pow(t, ease) * curl * Math.PI, o = out * (1 - t * .7); // straight up first, then sweeping back
    const dir = v3.norm([-Math.sin(a), Math.cos(a), side * o]), u = v3.norm(v3.cross(dir, [0, 0, 1])), w = v3.norm(v3.cross(u, dir));
    const rr = r * (1 - t * .88) * (ridges && i % ridges === 0 && i < n ? 1.14 : 1), ph = t * twist * Math.PI * 2 * side;
    for (const k of [0, 1]) { const f = ph + k * Math.PI, off = v3.add(v3.mul(u, Math.cos(f) * rr * .5), v3.mul(w, Math.sin(f) * rr * .5)); A[k].push([...v3.add(p, off), rr * .58]); }
    if (thorns && ridges && i % ridges === 0 && i > 1 && i < n - 1 && (i / ridges) % Math.max(1, Math.round(n / ridges / thorns)) === 0) { const sp = v3.norm(v3.add(u, v3.mul(dir, -.3))); m.seg(v3.add(p, v3.mul(sp, rr * .5)), v3.add(p, v3.mul(sp, rr * 2.1)), rr * .22, rr * .03, M.BODY3, { group: group + 2, extra: true }); } // a thorn off the ridge
    if (i < n) p = v3.add(p, v3.mul(dir, ds * (1 - tighten * t) / (1 - tighten / 2)));
  }
  (m.hornPaths ||= []).push(A[0].map(q => q.slice())); // its path, for the elder kit's rings and bells
  const cut = Math.round(n * .8);
  for (const [k, s] of A.entries()) { m.chain(s.slice(0, tip ? cut + 1 : n + 1), M[k && mat2 ? mat2 : mat] ?? M.ACCENT, { group, extra: true }); if (tip) m.chain(s.slice(cut), M[tip] ?? M.MAGIC2, { group: group + 1, extra: true }); }
  return p;
}

// The model's chain, seg and ell with every point moved k times as far from the tail's root and every girth w times as thick.
function grownTail(m, tb, k, w) {
  const at = p => [tb[0] + (p[0] - tb[0]) * k, tb[1] + (p[1] - tb[1]) * k, tb[2] + (p[2] - tb[2]) * k];
  const g = Object.create(m);
  g.chain = (pts, mat, o) => m.chain(pts.map(p => [...at(p), p[3] * w]), mat, o);
  g.seg = (a, b, ra, rb, mat, o) => m.seg(at(a), at(b), ra * w, rb * w, mat, o);
  g.ell = (c, r, mat, o) => m.ell(at(c), [r[0] * k, r[1] * w, r[2] * w], mat, o);
  return g;
}
// k, w: its tail's length and thickness, 1 as built (body.tailL, body.tailK: a young one's shorter, an old one's bushier, a snow
// leopard's thick), scaled from its root, whatever its kind.
function tail3d(m0, kind, tb, len, top, tw, k = 1, w = 1) {
  const m = k === 1 && w === 1 ? m0 : grownTail(m0, tb, k, w);
  const o = { group: 3 }, X = k => -len * k;
  if (kind === "brush") m.chain([[...tb, .1], [X(1.3), top - .25 + tw, 0, .15], [X(1.4), top - .55, 0, .14], [X(1.35), .38 + tw, 0, .09]], M.BODY, { ...o, paint: p => p[1] < .32 ? M.BODY3 : undefined });
  else if (kind === "panda") m.chain([[...tb, .11], [X(1.05) - .35, top - .1 + tw, 0, .17], [X(1.05) - .75, top - .3 + tw, 0, .18], [X(1.05) - 1.05, top - .5 + tw, 0, .13]], M.BODY, { ...o, paint: p => Math.floor((X(1.05) - p[0]) * 6.5) % 2 ? M.BODY3 : undefined }); // a red panda's: thick, its rings dark
  else if (kind === "bushy") m.chain([[...tb, .1], [X(1.05) - .35, top - .05 + tw, 0, .17], [X(1.05) - .75, top - .2 + tw, 0, .18], [X(1.05) - 1.0, top - .35 + tw, 0, .1]], M.BODY, { ...o, paint: p => p[0] < X(1.05) - .82 ? M.BELLY : undefined });
  else if (kind === "stub" || kind === "deer" || kind === "bob") m.ell(v3.add(tb, [-.06, .02 + tw, 0]), [.1, .08, .07], kind === "deer" ? M.BELLY : M.BODY, { ...o, paint: kind === "bob" ? p => p[0] < tb[0] - .08 ? M.BODY3 : undefined : undefined });
  else if (kind === "puff") m.ell(v3.add(tb, [-.04, .02, 0]), [.11, .11, .1], M.BELLY, o);
  else if (kind === "banner") m.chain([[...tb, .1], [X(1.15), top - .28 + tw, 0, .13], [X(1.6), .5, 0, .145], [X(2.15), .36 + tw, 0, .15], [X(2.6), .42, 0, .14], [X(2.9), .62 + tw, 0, .12], [X(2.95), .8, 0, .09]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.8) || Math.floor(-p[0] * 7) % 4 === 0 ? M.BODY3 : undefined }); // the snow leopard's: as long as its body and more, thick, trailing low, ringed, curling up at the end
  else if (kind === "scarf") { // an elder's: so long it wraps snug round its shoulders and chest like a stole, ringed, its fur in tufts
    const L = len, pts = [[...tb, .1], [X(.95), top - .32 + tw, .1, .1], [-L * .1, top - .12, .34, .11], [L * .35, top - .02, .38, .12], [L * .62, top + .04, .3, .12], [L * .78, top - .1, .08, .12], [L * .7, top + .02, -.22, .11], [L * .48, top + .14, -.3, .09]];
    const ring = p => Math.floor((p[0] * 3 + p[2] * 4) * 2.2) % 4 === 0 ? M.BODY3 : undefined;
    m.chain(pts, M.BODY, { ...o, extra: true, paint: ring });
    for (let k = 0; k < 22; k++) { const u = .15 + .8 * k / 21, seg = Math.min(pts.length - 2, Math.floor(u * (pts.length - 1))), f2 = u * (pts.length - 1) - seg, a = pts[seg], b = pts[seg + 1];
      const c = [0, 1, 2].map(q => a[q] + (b[q] - a[q]) * f2), r = a[3] + (b[3] - a[3]) * f2, th = k * 2.1, d = [Math.cos(th) * .4, .7 + Math.sin(th) * .3, Math.sin(th * 1.7) * .6], n = Math.hypot(...d), dn = d.map(v => v / n);
      const base = v3.add(c, v3.mul(dn, r * .8)); m.seg(base, v3.add(base, v3.mul(dn, r * .45)), r * .28, r * .05, k % 4 ? M.BODY : M.BODY3, { group: 3, extra: true }); }
  }
  else if (kind === "plume") { // an elder's vast brush, swept low and back, its tip snow-white, its fur in tufts along it
    const pts = [[...tb, .12], [X(1.1) - .35, top + .02 + tw, 0, .22], [X(1.1) - .85, top - .12 + tw, 0, .27], [X(1.1) - 1.35, top - .34 + tw, 0, .22], [X(1.1) - 1.6, top - .5, 0, .1]];
    m.chain(pts, M.BODY, { ...o, paint: p => p[0] < X(1.1) - 1.38 ? M.BELLY : undefined });
    for (let k = 0; k < 26; k++) { // tufts: short locks standing out of its surface, swept back, more at the tip
      const u = .12 + .86 * (k / 25), seg = Math.min(pts.length - 2, Math.floor(u * (pts.length - 1))), f = u * (pts.length - 1) - seg, a = pts[seg], b = pts[seg + 1];
      const c = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f], r = a[3] + (b[3] - a[3]) * f, th = k * 2.4;
      const out = [Math.cos(th) * .25, Math.sin(th) * .8 + .2, Math.cos(th * 1.3) * .8], n = Math.hypot(...out), d = out.map(v => v / n);
      const base = v3.add(c, v3.mul(d, r * .8)), tip = v3.add(base, v3.add(v3.mul(d, r * .55), [-r * .5, 0, 0]));
      m.seg(base, tip, r * .32, r * .06, u > .85 ? M.BELLY : k % 3 ? M.BODY : M.BODY2, { group: 3 });
    }
  }
  else if (kind === "dormouse") m.chain([[...tb, .1], [X(1.3), top - .2 + tw, 0, .12], [X(1.7), top - .42, 0, .13], [X(2.05), top - .3 + tw, 0, .12], [X(2.2), top - .08, 0, .08]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.0) ? M.BODY2 : undefined }); // long, low and furry, curling up at its tip (the silhouette check: it read as a squirrel's)
  else if (kind === "squirrel" || kind === "star") m.chain([[...tb, .12], [X(1.3), top + .05 + tw, 0, .25], [X(1.3), top + .6 + tw, 0, .3], [X(1.0), top + .95 + tw, 0, .27], [X(.65), top + .9 + tw, 0, .16]], kind === "star" ? M.MAGIC : M.BODY, { ...o, extra: true, paint: kind === "star" ? p => spotty(p, 14, .12) ? M.GLINT : undefined : undefined });
  else if (kind === "croc") m.chain([[...tb, .3], [X(1.25), top - .25 + tw, 0, .26], [X(1.75), .3, 0, .19], [X(2.25), .18 + tw * .5, 0, .11], [X(2.7), .1 + tw, 0, .04]], M.BODY, { ...o, paint: p => p[1] > .28 && Math.sin(p[0] * 22) > .55 ? M.BODY2 : undefined }); // a crocodile's: thick at the root, long, low along the ground, scutes along its top
  else if (kind === "otter") m.chain([[...tb, .22], [X(1.3), top - .4 + tw, 0, .17], [X(1.65), .12, 0, .1], [X(1.95), .07 + tw, 0, .04]], M.BODY, o); // a thick tapering rudder (its signature)
  else if (kind === "stoat") m.chain([[...tb, .08], [X(1.25), top + .08 + tw, 0, .07], [X(1.45), top + .3 + tw, 0, .085], [X(1.5), top + .45 + tw, 0, .07]], M.BODY, { ...o, paint: p => p[1] > top + .26 ? M.BODY3 : undefined }); // held up, its big black tip its signature
  else if (kind === "marten") m.chain([[...tb, .12], [X(1.15) - .3, top - .02 + tw, 0, .2], [X(1.15) - .75, top - .05 + tw, 0, .22], [X(1.15) - 1.15, top + .1 + tw, 0, .17], [X(1.15) - 1.35, top + .3, 0, .08]], M.BODY, { ...o, paint: p => p[0] < X(1.15) - 1.0 ? M.BODY3 : undefined }); // a long, thick brush held out level, curling up at its dark end
  else if (kind === "newt") { m.chain([[...tb, .1], [X(1.35), .3 + tw, 0, .07], [X(1.85), .2 + tw * .5, 0, .04]], M.BODY, o); m.ell([X(1.55), .33 + tw * .7, 0], [.42, .2, .03], M.BODY2, { ...o, dir: [1, -.12, 0] }); } // a newt's tail: a tall flat crested fin (its signature)
  else if (kind === "salamander") m.chain([[...tb, .12], [X(1.3), .18 + tw, 0, .08], [X(1.75), .1, 0, .055], [X(2.1), .16 + tw, 0, .035], [X(2.25), .3 + tw, 0, .02]], M.BODY, { ...o, paint: p => p[0] < X(1.6) && Math.sin(p[0] * 18) > .4 ? M.BELLY : undefined }); // long and slim, banded, curling up at its tip
  else if (kind === "monitor") m.chain([[tb[0] + .1, tb[1] * .6, 0, .2], [X(1.3), .2 + tw * .5, .08, .14], [X(1.65), .1, .3, .09], [X(1.9), .06 + tw * .4, .6, .05], [X(2.0), .05, .85, .02]], M.BODY, { ...o, paint: p => p[0] < X(1.4) && Math.sin(p[0] * 9) > .55 ? M.BODY2 : undefined }); // a monitor lizard's: thick at its root, long, dragged low and curling round toward us, faintly ringed
  else if (kind === "flat") { m.seg(tb, [X(1.15), .3, 0], .1, .09, M.BODY2, o); m.ell([X(1.5), .17 + tw * .5, 0], [.44, .07, .3], M.BODY3, { ...o, dir: [1, .25, 0], paint: p => (Math.floor(p[0] * 14) + Math.floor(p[2] * 14)) % 2 ? M.BODY2 : undefined }); } // the broad scaly paddle, tipped up so it shows (its signature)
  else if (kind === "stego" || kind === "stegoElder") { // a stegosaur's: long, thick and tapering, held off the ground, its thagomizer of four spikes near the tip (an elder's: a gold ring round each spike's foot, offerings of those who revere it; one spike broken short)
    const mid = [X(1.75), top - .62 + tw * .5, 0], tip = [X(2.25), top - .75 + tw, 0]; m.chain([[tb[0] + .05, tb[1] - .2, 0, .24], [X(1.35), top - .5 + tw * .3, 0, .18], [...mid, .11], [...tip, .05]], M.BODY, { ...o, paint: p => p[1] < top - .5 ? M.BODY2 : undefined });
    for (const [k, side] of [[.3, 1], [.3, -1], [.78, 1], [.78, -1]]) { const b = v3.lerp(mid, tip, k), L = (.62 + k * .1) * (kind === "stegoElder" && side > 0 && k > .5 ? .7 : 1); if (kind === "stegoElder") m.ell(v3.add(b, [-.04 * L, .1 * L, side * .24 * L]), [.1, .08, .1], M.GLINT, { ...o, extra: true }); m.seg(b, v3.add(b, [-.3 * L, .32 * L, side * .78 * L]), .075, .01, M.BELLY, { ...o, extra: true, paint: p => Math.hypot(p[0] - b[0], p[2] - b[2]) > .55 * L ? M.NOSE : undefined }); } // its thagomizer: four long bone spikes splayed up and out, their tips dark
  }
  else if (kind === "jaguar") m.chain([[...tb, .07], [X(1.3), top - .3 + tw, 0, .065], [X(1.6), top - .62, 0, .055], [X(1.78), .4 + tw, 0, .05], [X(1.9), .48 + tw, 0, .045]], M.BODY, o); // long and even, its end lifting
  else if (kind === "tiger") m.chain([[...tb, .09], [X(1.3), top - .25 + tw, 0, .08], [X(1.55), top - .6, 0, .07], [X(1.7), .45 + tw, 0, .065], [X(1.82), .5 + tw, 0, .06]], M.BODY, { ...o, paint: p => p[0] < X(1.75) || Math.sin((p[0] + p[1]) * 26) > .45 ? M.BODY3 : undefined }); // long and thick, ringed, its tip black and lifting
  else if (kind === "ringed") m.chain([[...tb, .085], [X(1.2), top - .3, 0, .075], [X(1.5), top - .62 + tw, 0, .068], [X(1.85), .24 + tw, 0, .06], [X(2.1), .36 + tw, 0, .05]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.0) && p[1] > .3 + tw ? M.BELLY : p[0] < X(1.45) && Math.sin(p[0] * 26) > .25 ? M.BODY3 : undefined }); // a cheetah's: long and heavy (its rudder), low, curling up at its end, black rings and a white tip
  else if (kind === "tuft") { m.chain([[...tb, .06], [X(1.2), top - .35, 0, .045], [X(1.45), .32 + tw, 0, .04], [X(1.7), .26 + tw, 0, .035]], M.BODY, o); m.ell([X(1.78), .3 + tw, 0], [.08, .11, .07], M.BODY3, o); } // a lion's: long, hanging low and curling up, a dark tuft at its end
  else if (kind === "meerkat") m.chain([[...tb, .06], [X(1.2), top - .05 + tw, 0, .045], [X(1.55), top + .12 + tw, 0, .035], [X(1.7), top + .3 + tw, 0, .02]], M.BODY, { ...o, paint: p => p[1] > top + .2 ? M.BODY3 : undefined }); // long and thin, held up in a curve, dark-tipped (the meerkat's)
  else if (kind === "glider") { m.seg(tb, [X(1.2), top - .12 + tw, 0], .09, .1, M.BODY, o); m.ell([X(1.65), top - .16 + tw * .7, 0], [.5, .06, .2], M.BODY, { ...o, dir: [1, .12, 0], paint: p => p[0] < X(1.95) ? M.BODY3 : Math.abs(p[2]) > .13 ? M.BODY2 : undefined }); } // a flying squirrel's: flat and feathered either side, held level behind (its rudder in a glide), its tip dark
  else if (kind === "ringed") m.chain([[...tb, .1], [X(1.05) - .3, top - .1 + tw, 0, .15], [X(1.05) - .7, top - .25 + tw, 0, .15], [X(1.05) - .95, top - .4 + tw, 0, .09]], M.BODY, { ...o, paint: p => Math.floor(-p[0] * 7) % 2 || p[0] < X(1.05) - .85 ? M.BODY3 : undefined }); // thick, held low, ringed in black, its tip black (the raccoon's)
  else if (kind === "thin") { m.chain([[...tb, .04], [X(1.1), top - .3, 0, .03], [X(1.12) + tw, top - .55, 0, .025]], M.BODY, o); m.ell([X(1.12) + tw, top - .62, 0], [.04, .07, .04], M.BODY3, o); }
}

function antlers3d(m, q, b, side, size, has) { // size: its antler size curve at this level (the template's)
  const glow = has("antlersGlow") || q.antlerGlow, jack = !q.antlers, A = jack ? .45 : size * (glow ? 1.15 : 1) * (q.antlerK ?? 1), mat = glow ? (side > 0 ? M.MAGIC2 : M.MAGIC) : M.ACCENT, o = { group: 11 + (side > 0 ? 1 : 0), extra: true };
  if (!A) return;
  const w = .045 * Math.max(.8, A), out = side * .35 * A;
  if (q.antlers === "palm") { // a short beam, then broad fingers fanning back and out from one root
    const k = v3.add(b, [-.06 * A, .12 * A, out * .3]);
    m.seg(b, k, w * 1.3, w * 1.2, mat, o);
    // (q.pools: the elk's legend: its palms grown into broad flat dishes, each holding a pool that mirrors the moon)
    for (let i = 0; i < 5; i++) { const a = .35 + i * .3, d = v3.norm([-Math.cos(a) * (q.pools ? .5 : 1), Math.sin(a) * (q.pools ? .7 : .9) + (q.pools ? .35 : 0), side * (q.pools ? .75 : .55)]), L = (.24 + .05 * (i % 2)) * A, cc = v3.add(k, v3.mul(d, L * .55)); m.ell(cc, [L * .6, w * 1.5, q.pools ? L * .35 : w * .6], mat, { ...o, dir: d, up: q.pools ? [0, 1, 0] : [0, 0, 1] }); if (q.pools) { m.ell(v3.add(cc, [0, w * 1.4, 0]), [L * .45, w * .4, L * .26], M.MAGIC, { ...o, dir: d, up: [0, 1, 0] }); m.ell(v3.add(cc, [L * .08, w * 1.9, 0]), [w * .9, w * .4, w * .9], M.MAGIC2, o); } }
    return;
  }
  // q.antlerLean: tilted back about their base by this many radians (a stag legend's: Ed's animal review, 2026-10-13, so a great rack doesn't tower)
  const ln = q.antlerLean ?? 0, cl = Math.cos(ln), sl = Math.sin(ln), back = d => [d[0] * cl - d[1] * sl, d[0] * sl + d[1] * cl, d[2]], at = d => v3.add(b, back(d));
  const p1 = at([-.18 * A, .3 * A, out * .4]), p2 = at([-.25 * A, .62 * A, out * .8]), p3 = at([-.1 * A, .95 * A, out]);
  m.chain([[...b, w * 1.2], [...p1, w], [...p2, w * .85], [...p3, w * .4]], mat, o);
  const tips = [p3], tine = (p, d, l, ww) => { const e = v3.add(p, v3.mul(v3.norm(back(d)), l)); tips.push(e); m.seg(p, e, ww, ww * .35, mat, o); };
  (m.antlerPaths ||= []).push([[...b, w * 1.2], [...p1, w], [...p2, w * .85], [...p3, w * .4]]); // its beam, for the elder kit's rings
  tine(at([-.04 * A, .1 * A, out * .1]), [1, .6, 0], .28 * A, w * .8);
  if (A > .4 || jack) tine(p1, [1, .9, 0], .3 * A, w * .7);
  if (A > .7) { tine(p2, [.8, 1, 0], .28 * A, w * .6); tine(p3, [.3, 1, side * .2], .18 * A, w * .5); }
  if (A > 1.2) { const p15 = v3.lerp(p1, p2, .5), p25 = v3.lerp(p2, p3, .5); tine(p15, [.5, 1, side * .4], .22 * A, w * .55); tine(p25, [-.6, 1, side * .3], .2 * A, w * .5); tine(p25, [.9, .7, 0], .16 * A, w * .45); } // a candelabra: more tines as it grows
  if (q.tineFlames) for (const t of tips) { m.ell(v3.add(t, [0, w * .9, 0]), [w * 1.1, w * .42, w * .42], M.GLOW, { ...o, dir: [0, 1, 0], up: [1, 0, 0] }); m.ell(v3.add(t, [0, w * 1.5, 0]), [w * .5, w * .2, w * .2], M.MAGIC2, { ...o, dir: [0, 1, 0], up: [1, 0, 0] }); } // each tine tipped with a flame
}

// ================= owl =================
// The owl. Its genome levels shape it (docs/art-guide/EVOLUTIONS.md): body.down (an owlet's fluffy down), head.tufts (ear tufts'
// length, 0 none) and tuftsBack (swept back like horns), head.discRim (a dark rim round the facial disc), body.bars (a barred
// chest), body.wingTips (patterned tips), body.cloak (wings half spread like a cloak, its feathers edged in moonlight), head.eyesRing
// (a ring of glowing eyes in the disc's rim). Without levels, as it was.
export function owl3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, young = false, baby = level === 0, has = f => legend && !S.levelFeatures?.[3] && S.legend.includes(f), m = new Model(), q = { ...(S.levelQ?.[level] || {}) };
  const bob = frame ? .03 : 0, hr = S.sizes.head[level], hy = S.sizes.headY[level] + bob; // its template's size curves (art/genome/templates.js)
  // feet and a short tail
  for (const side of [-1, 1]) { const f = (frame ? -1 : 1) * side * .07; m.seg([.05, .2, side * .14], [.08 + f, .05, side * .15], .07, .06, M.BODY2, { group: 2 }); for (const dz of [-.04, 0, .04]) m.ell([.16 + f, .03, side * .15 + dz], [.06, .025, .02], M.ACCENT, { group: 2 }); m.anchors.feet.push({ c: [.13 + f, .04, side * .15], r: .08, group: side > 0 ? 6 : 2, fit: "claw" }); } // (each frame a step: one foot ahead, the other behind, in turn)
  m.ell([-.32, .32, 0], [.22, .06, .14], M.BODY2, { dir: [-1, -.6, 0], group: 3 });
  // body: an upright egg, pale breast streaked (barred, an adult's; all down, an owlet's)
  m.ell([0, .55 + bob, 0], [.36, .52, .36], M.BODY, { rough: q.down ? .03 : undefined, paint: p => q.down ? (spotty(p, 14, .3) ? M.BODY : M.BELLY) : p[0] > .12 && p[1] < hy - hr * .5 ? (q.spotted ? (Math.floor(p[1] * 20 + Math.sin(p[2] * 17) * .6) % 2 && !spotty(p, 18, .3) ? M.BODY2 : M.BELLY) : q.bars ? (Math.floor(p[1] * 22) % 2 ? M.BODY2 : M.BELLY) : (Math.floor(p[1] * 18) % 3 === 0 && spotty(p, 16, .5)) ? M.BODY2 : M.BELLY) : undefined });
  // wings: folded (their tips patterned, an adult's), spread like a cloak and edged in moonlight (a legend's), or the old spirit wings
  if (q.cloak) for (const side of [-1, 1]) wing3d(m, [-.05, .78 + bob, side * .3], side, 1.25, frame ? .08 : -.05, M.BODY2, M.WEB, side > 0 ? 40 : 50); // half spread like a cloak, its feathers edged in moonlight
  else if (!has("wings")) for (const side of [-1, 1]) m.ell([-.06, .58 + bob, side * .3], [.4, .3, .08], M.BODY2, { dir: [-.3, -1, 0], up: [1, 0, 0], group: side > 0 ? 4 : 2, paint: p => q.wingTips && p[1] < .42 + bob ? (Math.floor(p[1] * 30) % 2 ? M.BODY3 : M.BELLY) : q.spotted && spotty(p, 16, .28) ? M.BELLY : spotty(p, 12, .15) ? M.BODY3 : undefined });
  // head: big and round, sunk into the shoulders
  m.ell([0, hy, 0], [hr, hr * .9, hr], M.BODY, { rough: q.down ? .02 : undefined, paint: q.spotted ? p => spotty(p, 22, .22) ? M.BELLY : undefined : undefined }); // (a spotted owl's white-flecked crown)
  // facial disc: two pale bowls facing forward, with huge eyes
  const tl = q.tufts ?? (baby ? 0 : 1);
  for (const side of [-1, 1]) {
    // the face looks out between forward and the near side, as owls turn their heads to us
    const fd = v3.norm([.75, -.05, side * .4 + .35]), c = v3.add(Model.surface([0, hy, 0], [hr, hr * .9, hr], fd), v3.mul(fd, -hr * .05));
    // (q.dish: the legend's disc grown into a great dish of feathers, its rim alight, its eyes two moons)
    const D = q.dish ? 1.75 : 1;
    m.ell(c, [hr * .22 * (q.dish ? 1.3 : 1), hr * .46 * D, hr * .4 * D], M.BELLY, { group: 1, dir: fd, extra: !!q.dish, paint: q.discRim || q.dish ? p => { const d = v3.sub(p, c), r = Math.hypot(...v3.sub(d, v3.mul(fd, v3.dot(d, fd)))); return r > hr * .34 * D ? (q.dish ? M.MAGIC2 : M.BODY3) : q.dish && Math.floor(r / (hr * .09)) % 2 ? M.BODY2 : undefined; } : undefined });
    const ec = v3.add(c, v3.mul(fd, hr * .14 * (q.dish ? 1.3 : 1))), E = (baby ? 1.15 : 1) * (q.dish ? 1.45 : 1);
    m.ell(ec, [hr * .1, hr * .26, hr * .24].map(v => v * E), legend ? M.MAGIC : M.IRIS, { group: 1, dir: fd });
    m.ell(v3.add(ec, v3.mul(fd, hr * .07)), [hr * .08, hr * .14, hr * .13].map(v => v * E), legend ? M.MAGIC2 : M.EYE, { group: 1, dir: fd });
    (m.anchors.eyes ||= { pts: [], size: hr * .22 }).pts.push(v3.add(ec, v3.mul(fd, hr * .07)));
    if (q.eyesRing) { const a1 = v3.norm(v3.cross(fd, [0, 1, 0])), a2 = v3.cross(a1, fd); for (let k = 0; k < 5; k++) { const a = Math.PI * (.15 + k * .175) * (side > 0 ? 1 : -1) + (side > 0 ? 0 : Math.PI), p = v3.add(v3.add(c, v3.mul(fd, hr * .12)), v3.add(v3.mul(a1, Math.cos(a) * hr * .42), v3.mul(a2, Math.sin(a) * hr * .48))); m.ell(p, [hr * .07, hr * .07, hr * .07], M.MAGIC2, { group: 96, extra: true }); } } // a ring of glowing eyes round the disc's rim
    // ear tufts (swept back like horns, a legend's)
    if (tl) m.ell([hr * (q.tuftsBack ? -.15 : .05), hy + hr * (.8 + .15 * (tl - 1)), side * hr * .6], [hr * .32 * tl, hr * .12, hr * .08], M.BODY2, { dir: q.tuftsBack ? [-.8, .8, side * .5] : [-.1, 1, side * .7], up: [1, 0, 0], group: 1 });
  }
  m.ell(Model.surface([0, hy, 0], [hr, hr * .9, hr], v3.norm([.75, -.35, .35])), [hr * .2, hr * .12, hr * .1], M.ACCENT, { dir: [.6, -1, .3], group: 1 }); // beak
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [-.05, .8 + bob, side * .3], side, 1.3, frame ? .12 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("eyesRing")) for (let i = 0; i < 7; i++) { const a = Math.PI * (.15 + i / 6 * .7); m.ell([Math.cos(a) * .2 - .1, hy + .1 + Math.sin(a) * .6, (i - 3) * .15], [.07, .07, .07], M.MAGIC2, { group: 95 + i, extra: true }); m.ell([Math.cos(a) * .2 - .05, hy + .1 + Math.sin(a) * .6, (i - 3) * .15], [.035, .035, .035], M.EYE, { group: 95 + i, extra: true }); }
  m.anchors.head = { c: [0, hy, 0], r: [hr, hr * .9, hr] };
  m.anchors.neck = { c: [0, hy - hr * .75, 0], r: hr * .85, dir: [0, 1, 0] };
  if (S.sizes.build[level] !== 1) beef(m, S.sizes.build[level]);
  gearUp(m);
  const sp = drawForm(m, { height: drawHeight(level, st, .95), facing }, S, level);
  if (formMotes() && S.sizes.motes[level]) glowMotes(sp, 31, S.sizes.motes[level]);
  return sp;
}

// ================= the other body plans, in 3D =================
// The penguin (unknown-14's icy shore, Ed 2026-10-12: more animals for later islands; art builder 2's): upright, a black back and a
// white front, flippers held out at its sides, a small head and a long beak, short orange feet; it waddles, rocking from foot to foot
// (its two frames). A downy grey chick, a brown-grey young, a black-and-white adult with an orange patch at its neck, and the legend
// crowned. (Its belly-slide is a movement, the game's to draw from this sprite laid down.)
export function penguin3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, baby = level === 0, has = f => legend && !S.levelFeatures?.[3] && S.legend.includes(f), m = new Model(), q = { ...(S.levelQ?.[level] || {}) };
  const rock = frame ? .12 : -.12, hr = S.sizes.head[level], hy = S.sizes.headY[level], down = !!q.down, young = !!q.young;
  // feet: short and flat, orange (a chick's grey), one ahead of the other as it rocks
  for (const side of [-1, 1]) { const f = side * rock * .5; m.ell([.1 + f, .03, side * .13], [.12, .03, .07], down ? M.BODY3 : M.FLOWER, { group: 2 }); m.anchors.feet.push({ c: [.1 + f, .03, side * .13], r: .07, group: 2 }); }
  // the tail: a short stiff wedge at the back
  m.ell([-.26, .14, 0], [.14, .04, .08], M.BODY, { dir: [-1, -.4, 0], group: 3 });
  // body: a tall egg leaning a little forward, rocking side to side; its front white (a chick all grey down)
  const tilt = [.12, 1, rock];
  m.ell([0, .6, 0], [.58, .33, .3], down ? M.BELLY : young ? M.BODYL : M.BODY, { dir: tilt, up: [1, 0, 0], rough: down ? .035 : undefined, paint: p => down ? (spotty(p, 14, .45) ? M.BODYL : undefined) : p[0] > .1 - p[1] * .05 && p[1] < hy - hr * .6 ? (q.elder && spotty(p, 22, .12) ? M.STONE : M.BELLY) : q.elder ? (p[1] > .95 && spotty(p, 16, .5) ? M.WEB : spotty(p, 11, .3) ? M.STONED : spotty(p, 19, .1) ? M.MOSS : undefined) : undefined });
  // flippers: flat, held out a little from its sides, their undersides pale (an adult's)
  for (const side of [-1, 1]) m.ell([-.02, .6 + (q.oars ? .06 : 0), side * .32], [q.oars ? .56 : .4, .08, .035], down ? M.BELLY : young ? M.BODYL : M.BODY, { dir: q.oars ? [.05, -.75, side * (frame ? 1 : .8)] : [.2, -1, side * (frame ? .65 : .45)], up: [1, 0, 0], group: side > 0 ? 4 : 2, paint: !down && !young ? p => p[0] > .02 ? M.BELLY : undefined : undefined });
  // head: small and round on a short neck, black (a young's grey-brown, a chick's down with a dark cap)
  m.ell([.04, hy, 0], [hr, hr * .92, hr * .9], down ? M.BELLY : young ? M.BODYL : M.BODY, { rough: down ? .02 : undefined, paint: down ? p => p[1] > hy - hr * .1 ? M.BODY : undefined : young ? p => p[0] > .04 + hr * .3 && p[1] < hy ? M.BELLY : undefined : q.elder ? p => p[1] > hy + hr * .5 && spotty(p, 14, .5) ? M.WEB : spotty(p, 11, .3) ? M.STONED : undefined : undefined });
  // the adult's orange patch at either side of its neck, fading down onto its breast
  if (!down && !young) for (const side of [-1, 1]) m.ell([.1, hy - hr * .7, side * hr * .62], [hr * .55, hr * .3, hr * .16], M.FLOWER, { group: 1, dir: [.35, -1, side * .45] });
  if (q.gorget) m.ell([.31, 1.0, 0], [.24, .045, .13], M.FLOWER, { group: 1, dir: [.12, -1, 0], up: [1, 0, 0] }); // the legend's gorget, blazing down its breast
  // beak: long and pointed, dark with an orange stripe along it (an adult's)
  const bc = Model.surface([.04, hy, 0], [hr, hr * .92, hr * .9], v3.norm([1, -.15, 0]));
  m.ell(v3.add(bc, [hr * .4 * (q.beak ?? 1), -hr * .05, 0]), [hr * .55 * (q.beak ?? 1), hr * .13, hr * .12], M.BODY3, { dir: [1, -.18, 0], group: 1, paint: !down && !young ? p => p[1] < bc[1] - hr * .06 ? M.FLOWER : undefined : undefined });
  if (q.elder) {
    for (let k = 0; k < 3; k++) m.seg([.31, .74 - k * .14, .02 + k * .06], [.34, .52 - k * .14, .16 + k * .06], .02, .012, M.STONED, { group: 1, extra: true }); // old scars across its breast
    for (let k = 0; k < 11; k++) { const a = Math.PI * (-.5 + k / 10), p = [.08 + Math.cos(a) * .3, hy - hr * .95 - Math.cos(a) * .05, Math.sin(a) * .27]; if (p[0] < -.05) continue; m.ell(p, k % 2 ? [.06, .05, .05] : [.07, .03, .07], k % 2 ? M.STONE : M.WEB, { group: 1, extra: true, dir: [0, 1, 0], up: [1, 0, 0] }); } // a necklace of offerings: pebbles and shells from the rookery
  }
  if (q.chick) { const c = [.34, .16, 0]; m.ell(c, [.17, .16, .15], M.BODYL, { group: 7, rough: .035, dir: [0, 1, 0], up: [1, 0, 0], paint: p => spotty(p, 30, .35) ? M.BELLY : undefined }); m.ell([c[0] + .03, c[1] + .2, 0], [.1, .095, .095], M.BELLY, { group: 7, paint: p => p[1] > c[1] + .21 || p[0] < c[0] - .02 ? M.BODY : undefined }); m.ell([c[0] + .14, c[1] + .19, 0], [.045, .014, .014], M.BODY3, { dir: [1, -.2, 0], group: 7 }); eyesOn(m, [c[0] + .03, c[1] + .2, 0], [.1, .095, .095], [[.6, .35, .55], [.6, .35, -.55]], .018, M.EYE, 7); } // its downy chick standing on its feet before it
  eyesOn(m, [.04, hy, 0], [hr, hr * .92, hr * .9], [[.55, .3, .6], [.55, .3, -.6]], hr * .12, M.EYE);
  if (has("crown")) crown3d(m, [.02, hy + hr * .95, 0], hr * .75);
  m.anchors.neck = { c: [.02, hy - hr * .8, 0], r: hr * .8, dir: [0, 1, 0] };
  return finish(m, S, level, st, .5, facing);
}


const eyesOn = (m, c, r, dirs, size, mat, group = 1) => {
  for (const d of dirs) m.ell(Model.surface(c, r, v3.norm(d)), [size, size * 1.2, size], mat, { group });
  m.anchors.head ||= { c, r }; m.anchors.eyes ||= { pts: dirs.map(d => Model.surface(c, r, v3.norm(d))), size };
};
const shadow = (m, x, w) => m.ell([x, .005, 0], [w, .005, w * .6], M.NOSE, { group: 0 }); // a flyer's shadow on the ground
function finish(m, S, level, st, k, facing, ref = null) {
  if (S.sizes.build[level] !== 1) beef(m, S.sizes.build[level]); // the adult's and legend's heavier build (its template's size curve)
  gearUp(m);
  // ref: a model in the walk's first pose, its scale taken for every frame (a cycle's frames at one scale, not each fitted to its own height)
  let scale;
  if (ref) { if (S.sizes.build[level] !== 1) beef(ref, S.sizes.build[level]); scale = render(ref, { height: drawHeight(level, st, k), facing, measure: true }).s; }
  const sp = drawForm(m, { height: drawHeight(level, st, k), facing, scale }, S, level);
  if (formMotes() && S.sizes.motes[level]) glowMotes(sp, S.id.length * 131, S.sizes.motes[level]);
  return sp;
}
const crown3d = (m, c, w) => { m.ell(c, [w, w * .35, w], M.MAGIC, { group: 95, extra: true, paint: p => p[1] > c[1] ? M.MAGIC2 : undefined }); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; m.ell(v3.add(c, [Math.cos(a) * w * .8, w * .55, Math.sin(a) * w * .8]), [w * .38, w * .12, w * .12], M.MAGIC, { dir: [0, 1, 0], up: [1, 0, 0], group: 96, extra: true }); } };
const crystals3d = (m, pts) => pts.forEach(([b, h], i) => m.ell(v3.add(b, [0, h * .45, 0]), [h * .55, .07, .07], M.MAGIC, { dir: [(i % 3 - 1) * .25, 1, (i % 2 - .5) * .3], group: 80 + i % 2, extra: true, paint: p => p[2] > b[2] ? M.MAGIC2 : undefined }));

// Its levels grow it (the menagerie review: "a baby with soft short spines, a young half-spined"; the genome's levels): body.spines
// (their length, 1 the adult's), body.spineFrom (how far forward they reach: 1 over its whole back, lower only its rump and back),
// body.soft (a hoglet's pale, soft spines), body.head (its snout's size), body.round (its body rounder and shorter), body.legs (a hoglet up on longer legs).
export function hedgehog3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), f = frame ? .03 : 0, q = { ...S.q, ...(S.levelQ?.[level] || {}) };
  if (legend && S.elder) return hedgehogElder(S, frame, st, facing);
  const sp = q.spines ?? 1, reach = q.spineFrom ?? 1, soft = q.soft ?? 0, hk = q.head ?? 1, rd = q.round ?? 0, lift = ((q.legs ?? 1) - 1) * .12;
  for (const [x, z] of [[.28, .2], [.28, -.2], [-.28, .2], [-.28, -.2]]) { const d = (frame ? -1 : 1) * Math.sign(x * z) * .08; m.seg([x * (1 - rd * .3), .15 + lift, z], [x * (1 - rd * .3) + d, .03, z], .06, .05, M.BODY3, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x * (1 - rd * .3) + .03 + d, .03, z], r: .065, group: z > 0 ? 6 : 2 }); } // (a trot: diagonal pairs ahead, then behind)
  const c = [0, .32 + lift, 0], r = [.5 * (1 - rd * .25), .32 * (1 + rd * .1), .38];
  m.ell(c, r, soft ? M.BELLY : M.BODY2, { paint: p => soft ? (spotty(p, 22, .25) ? M.BODY2 : undefined) : spotty(p, 22, .3) ? M.BODY3 : spotty(p, 19, .12) ? M.BELLY : undefined });
  for (let i = 0; i < 64; i++) { const a = (i * 2.399) % (Math.PI * 2), t = (i / 64) * .9 + .05, d = v3.norm([Math.cos(a) * Math.sin(t * Math.PI * .5) - .25, Math.cos(t * Math.PI * .5) * .9 + .1, Math.sin(a) * Math.sin(t * Math.PI * .5)]); if (d[0] > .55 - (1 - reach) * .9) continue; const len = .17 * sp, w = .028 * (soft ? 1.3 : 1); m.ell(v3.add(Model.surface(c, r, d), v3.mul(d, len * .47)), [len, w, w], soft ? (i % 3 ? M.BELLY : M.BODY2) : i % 4 ? M.BODY2 : M.BODY3, { dir: v3.add(d, [-.3 - (soft ? .4 : 0), .05, 0]), group: 1 }); } // signature: long spines bristling past the outline (a hoglet's short, soft and pale, laid back)
  const sn = [.48 - rd * .08, .22 + lift + (hk - 1) * .08, 0], snr = [.22 * hk, .14 * hk, .15 * hk];
  m.ell(sn, snr, M.BELLY, { dir: [1, -.3, 0], group: 1 });
  m.ell([sn[0] + .21 * hk, sn[1] - .06 * hk, 0], [.04 * hk, .04 * hk, .04 * hk], M.NOSE, { group: 1 });
  eyesOn(m, sn, snr, [[.3, .6, .55], [.3, .6, -.55]], .035 * hk, legend ? M.MAGIC2 : M.EYE);
  if (legend) crystals3d(m, [[[-.3, .55, .1], .35], [[-.05, .62, -.1], .5], [[.2, .55, .12], .4], [[-.15, .58, .2], .3]]);
  return finish(m, S, level, st, .6, facing);
}

// The hedgehog's elder legend (the elder brief, ART-GUIDE 0c): the ancient hedgehog: grizzled pale, its quills grown into a vast mantle of long spines sweeping back,
// some broken, skewered with a lifetime's offerings (apples, leaves, mushrooms, a bronze charm or two), pins of light at the
// longest tips; old eyes, a pale muzzle.
function hedgehogElder(S, frame, st, facing) {
  const m = new Model();
  for (const [x, z] of [[.28, .2], [.28, -.2], [-.28, .2], [-.28, -.2]]) { const d = (frame ? -1 : 1) * Math.sign(x * z) * .08; m.seg([x, .15, z], [x + d, .03, z], .06, .05, M.BODY3, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x + .03 + d, .03, z], r: .065, group: z > 0 ? 6 : 2 }); }
  const c = [0, .32, 0], r = [.5, .32, .38], tips = [];
  m.ell(c, r, M.BODY2, { paint: p => spotty(p, 22, .3) ? M.BODY3 : spotty(p, 19, .2) ? M.WEB : undefined });
  for (let i = 0; i < 150; i++) {
    const a = (i * 2.399) % (Math.PI * 2), t = (i / 150) * .92 + .04, d = v3.norm([Math.cos(a) * Math.sin(t * Math.PI * .5) - .45, Math.cos(t * Math.PI * .5) * .85 + .1, Math.sin(a) * Math.sin(t * Math.PI * .5)]);
    if (d[0] > .45) continue;
    const back = Math.max(0, -d[0]), broken = i % 11 === 5, L = broken ? .12 : (.2 + .28 * back + .08 * Math.abs(Math.sin(i * 1.7))), b = Model.surface(c, r, d), dir = v3.norm(v3.add(d, [-.55, .08, 0])), tip = v3.add(b, v3.mul(dir, L));
    m.seg(v3.add(b, v3.mul(dir, -.03)), tip, .03, broken ? .02 : .006, i % 4 ? M.BODY2 : M.BODY3, { group: 1, extra: true, paint: p => v3.dot(v3.sub(p, b), dir) > L * .62 ? M.WEB : undefined });
    if (!broken) tips.push([L, tip, dir, b]);
  }
  tips.sort((a, b) => b[0] - a[0]);
  tips.slice(0, 7).forEach(([, t], i) => i % 2 || m.ell(t, [.014, .014, .014], M.MAGIC2, { group: 120, extra: true })); // pins of light at the longest tips
  // its offerings, skewered on its quills (the ones in view: up and towards us)
  const seen = tips.filter(([, , , b]) => b[2] > .05 && b[1] > .4).sort((a, b) => a[3][0] - b[3][0]), pick = k => seen[Math.floor(k * (seen.length - 1))];
  [["apple", .1], ["leaf", .25], ["mushroom", .4], ["apple", .55], ["charm", .7], ["leaf", .85], ["mushroom", .95]].forEach(([kind, k], i) => {
    const sp = pick(k); if (!sp) return; const [L, , dir, b] = sp, at = v3.add(v3.add(b, v3.mul(dir, L * .8)), [0, .03, .04]), o = { group: 130 + i % 3, extra: true };
    if (kind === "apple") { m.ell(at, [.1, .09, .1], M.FLOWER, { ...o, paint: p => p[1] > at[1] + .03 && p[0] > at[0] ? M.ACCENT : undefined }); m.seg(v3.add(at, [0, .06, 0]), v3.add(at, [-.01, .1, 0]), .008, .006, M.TRUNK, o); }
    if (kind === "leaf") m.ell(at, [.13, .02, .06], i % 2 ? M.LEAF : M.LEAF2, { ...o, dir: [.3, .3, 1], up: [0, 1, 0] });
    if (kind === "mushroom") { m.seg(v3.add(at, [0, -.04, 0]), v3.add(at, [0, .05, 0]), .022, .026, M.WEB, o); m.ell(v3.add(at, [0, .07, 0]), [.085, .042, .085], M.FLOWER, { ...o, paint: p => spotty(p, 70, .25) ? M.BELLY : undefined }); }
    if (kind === "charm") { m.ell(at, [.016, .065, .065], M.WOOD, { ...o, dir: [.49, .5, .72] }); }
  });
  const sn = [.48, .22, 0];
  m.ell(sn, [.22, .14, .15], M.BELLY, { dir: [1, -.3, 0], group: 1, paint: p => spotty(p, 50, .35) ? M.WEB : undefined });
  m.ell([.69, .16, 0], [.04, .04, .04], M.NOSE, { group: 1 });
  eyesOn(m, sn, [.22, .14, .15], [[.3, .6, .55], [.3, .6, -.55]], .035, M.EYE);
  return finish(m, S, 3, st, .75, facing);
}

export function toad3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), hop = frame ? .05 : 0;
  // growing up (the menagerie review 2d): a toadlet fresh from the water, narrow, smooth, all head and eyes, the last of its
  // tadpole's tail behind; a young toad still slim and only lightly warted; then the adult's squat, wide, warty build (and its legend's)
  const g = Math.min(level, 2), W = [.54, .7, 1][g], E = [1.75, 1.35, 1][g], warts = [.06, .12, .22][g], legK = [1.15, 1.05, 1][g];
  for (const side of [-1, 1]) { // folded hind legs, thin front legs
    m.ell([-.24, .15, side * .44 * W], [.28 * legK, .13, .13], side > 0 ? M.BODY : M.BODY2, { dir: [1, .3, 0], group: side > 0 ? 6 : 2, paint: p => spotty(p, 14, [.04, .09, .15][g]) ? M.BODY3 : undefined });
    m.ell([.06, .04, side * .52 * W], [.2 * legK, .04, .09], side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 6 : 2 });
    m.seg([.35, .2 + hop, side * .24 * W], [.42, .03, side * .3 * W], .05, .04, side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 7 : 2 });
    m.anchors.feet.push({ c: [.45, .03, side * .3 * W], r: .06, group: side > 0 ? 7 : 2 }, { c: [.14, .04, side * .52 * W], r: .08, group: side > 0 ? 6 : 2 });
  }
  const c = [0, .26 + hop, 0], r = [.5 * [.76, .82, 1][g], .23 * [1.26, 1.18, 1][g], .46 * W]; // signature: squat and wide, eye domes standing proud
  m.ell(c, r, M.BODY, { paint: p => p[1] < c[1] - .12 ? M.BELLY : p[0] > .38 && Math.abs(p[1] - (c[1] - .02)) < .018 ? M.LINE : spotty(p, 14, warts) ? M.BODY3 : undefined });
  if (g === 0) m.seg([-.34, .24 + hop, 0], [-.72, .19 + hop, 0], .08, .015, M.BODY2, { group: 3 }); // the toadlet's tail stub
  for (const side of [-1, 1]) { const e = [.3, .55 + hop, side * .2 * Math.max(W, .8)]; m.ell(e, [.12 * E, .12 * E, .12 * E], M.BODY, { group: 1 }); m.ell(Model.surface(e, [.12 * E, .12 * E, .12 * E], v3.norm([.6, .5, side * .5])), [.06 * E, .06 * E, .06 * E], legend ? M.MAGIC2 : M.IRIS, { group: 1 }); m.ell(Model.surface(e, [.13 * E, .13 * E, .13 * E], v3.norm([.65, .45, side * .5])), [.035 * E, .018 * E, .035 * E], M.EYE, { group: 1 }); }
  m.anchors.head = { c: [.22, .45 + hop, 0], r: [.3, .2, .3], top: [.18, .62 + hop, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([.3, .55 + hop, side * .2 * Math.max(W, .8)], [.12 * E, .12 * E, .12 * E], v3.norm([.6, .5, side * .5]))), size: [.04, .045, .05][g] };
  m.anchors.neck = { c: [.32, .3 + hop, 0], r: .25, dir: [1, .3, 0] };
  if (legend && S.legend.includes("sac")) m.ell([.42, .14 + hop, 0], frame ? [.3, .27, .3] : [.24, .21, .25], M.MAGIC2, { group: 8, extra: true, paint: p => spotty(p, 12, .2) ? M.MAGIC : undefined }); // its throat sac swollen into a great glowing balloon, pulsing with each croak
  else if (legend) crown3d(m, [.15, .66 + hop, 0], .16);
  return finish(m, S, level, st, .55, facing);
}

// The frost troll (Ed, 2026-10-13: "a face turned towards us, a big nose, a beard, long arms with knuckles down, and a hunched
// upright back ... cute with big eyes"): upright on short legs, hunched, its face turned to us, long arms down to its knuckles.
// Its genome levels shape it: body.hr (its head), body.bw (its shoulders' width), body.hunch; head.nose (its rosy bulb), head.beard
// (length, 0 none), head.eyeK (its eyes), head.lids (an old troll's heavy lids), head.tooth (a kid's tooth over its lip);
// coat.moss (moss tufts on its shoulders), coat.stone (0 to 1: how far up it has turned to stone, an elder's), coat.beads.
export function troll3d(S, level, frame, st, facing = "towards") {
  const m = new Model(), q = { ...S.q, ...(S.levelQ?.[level] || {}) }, sw = frame ? 1 : -1;
  const F = [.8, 0, .6], R = [-.6, 0, .8]; // its front, turned to the camera, and its side
  const P = (f, u, s) => [F[0] * f + R[0] * s, u, F[2] * f + R[2] * s], D = (f, u, s) => v3.norm(P(f, u, s)), at = (c, f, u, s) => v3.add(c, P(f, u, s));
  const hr = q.hr ?? .24, bw = q.bw ?? .42, hunch = q.hunch ?? 1, nose = q.nose ?? 1, beard = q.beard ?? 1, eyeK = q.eyeK ?? 1, stoneTo = q.stone ?? 0, reach = q.reach ?? 1, tusk = q.tusks ?? 0, mossK = q.mossK ?? 1, hump = q.boulder ?? 0;
  const fr = p => p[0] * F[0] + p[2] * F[2]; // how far forward a point is
  const stoned = (p, base) => stoneTo && p[1] < stoneTo + .05 * Math.sin(p[0] * 29 + p[2] * 23) + .03 * Math.sin(p[0] * 61 - p[2] * 47) ? (spotty(p, 22, .12) ? M.STONED : M.STONE) : base;
  const fur = (p, base) => stoned(p, spotty(p, 16, .1) ? M.BODY2 : base);
  // short legs and big flat feet, a step a frame
  for (const side of [-1, 1]) {
    const g = side > 0 ? 6 : 2, d = sw * side * .05, foot = P(.06 + d, .045, side * .2);
    m.chain([[...P(0, .3, side * .16), .11], [...P(.03 + d * .5, .18, side * .18), .095], [...P(.03 + d, .07, side * .2), .09]], M.BODY, { group: g, paint: p => fur(p, M.BODY) });
    m.ell(foot, [.15, .055, .1], M.BODY2, { dir: F, group: g, paint: p => stoned(p, M.BODY2) });
    m.anchors.feet.push({ c: foot, r: .1, group: g });
  }
  // a pear of a body, pale-bellied, hunched over: its shoulders and back rising behind its head
  const belly = P(.02, .42, 0), up = D(.3 * hunch, 1, 0);
  m.ell(belly, [.27, .28, .32], M.BODY, { dir: F, paint: p => fr(v3.sub(p, belly)) > .13 && p[1] < .5 ? stoned(p, M.BODY3) : fur(p, M.BODY) }); // (its tummy darker, so the white beard shows against it)
  m.ell(P(-.03, .72, 0), [.25, .23, bw * .88], M.BODY, { dir: F, up, paint: p => fur(p, M.BODY) });
  m.ell(P(-.14, .84 + .04 * hunch, 0), [.2, .16, bw * .62], M.BODY2, { dir: F, up, paint: p => fur(p, M.BODY2) });
  // the head, low and forward, turned to us
  const hc = P(.16, .98 + hr * .2, 0), Hr = [hr, hr * 1.02, hr * 1.06];
  m.ell(hc, Hr, M.BODY, { dir: F, paint: p => fr(v3.sub(p, hc)) > hr * .45 && p[1] < hc[1] + hr * .35 ? M.BELLY : undefined }); // a pale face
  for (let i = 0; i < 5; i++) { const s = (i / 4 - .5) * hr * 1.1, top = at(hc, -hr * .1, hr * .9, s); m.chain([[...top, hr * .18], [...at(top, -hr * .4, hr * (.18 + .08 * (i % 2)), s * .3), hr * .09]], M.BODY2, { group: 1, extra: true }); } // a shock of hair
  for (const side of [-1, 1]) m.chain([[...at(hc, -hr * .1, hr * .2, side * hr * .9), hr * .22], [...at(hc, -hr * .2, hr * .42, side * hr * 1.55), hr * .1], [...at(hc, -hr * .25, hr * .5, side * hr * 1.8), hr * .02]], M.BODY, { group: 1 }); // pointed ears out to the side
  // big round eyes, a glint in each; an old troll's heavy lids
  const eyeDirs = [-1, 1].map(side => D(1, .38, side * .45)), es = hr * .22 * eyeK;
  eyesOn(m, hc, Hr, eyeDirs, es, M.EYE);
  for (const d of eyeDirs) { const e = Model.surface(hc, Hr, d); m.ell(v3.add(e, v3.add(v3.mul(d, es * .5), [0, es * .45, 0])), [es * .38, es * .38, es * .38], M.GLINT, { group: 1 });
    if (q.lids) m.ell(v3.add(e, v3.add(v3.mul(d, es * .2), [0, es * 1.0, 0])), [es * 1.1, es * .38, es * 1.1], M.BODY2, { group: 1 }); }
  // a big rosy bulb of a nose, and a beard hanging in locks (white; a kid's a tooth over its lip instead)
  const tip = at(hc, hr * 1.02, -hr * .2, 0);
  m.ell(tip, [hr * .34 * nose, hr * .3 * nose, hr * .34 * nose], M.EAR, { group: 1 });
  if (q.tooth) m.ell(at(hc, hr * .9, -hr * .62, hr * .12), [hr * .07, hr * .11, hr * .07], M.BELLY, { group: 1 });
  if (tusk) for (const side of [-1, 1]) { const b = at(hc, hr * .8, -hr * .62, side * hr * .38); m.chain([[...b, hr * .09 * tusk], [...at(b, hr * .12, hr * .32 * tusk, side * hr * .08), hr * .05 * tusk], [...at(b, hr * .02, hr * .55 * tusk, side * hr * .02), hr * .012]], M.BELLY, { group: 10, extra: true }); } // its first tusks, up past its nose (the young's; the adult's longer)
  if (beard) for (let i = 0; i < 7; i++) { const s = (i / 6 - .5) * hr * 1.4, root = at(hc, hr * .85, -hr * .5, s), bl = hr * 1.5 * beard * (1 - Math.abs(i / 6 - .5) * .7), w = Math.sin(i * 2.3) * hr * .1;
    m.chain([[...root, hr * .24], [...at(root, hr * .3, -bl * .55, s * .15 + w), hr * .2], [...at(root, hr * .22, -bl, s * .1 - w), hr * .07]], M.BELLY, { group: 5 + (i % 2) * 3 }); } // (its own groups: not melted into its chest)
  // long arms hanging to its knuckles on the ground, a swing a frame
  for (const side of [-1, 1]) {
    const g = side > 0 ? 7 : 2, d = -sw * side * .05, wy = .78 - .63 * reach, sh = P(.02, .78, side * bw * .85), el = P(.1 * reach + d * .5, .78 - .33 * reach, side * (bw + .05)), wr = P(.2 * reach + d, wy, side * (bw + .03));
    m.chain([[...sh, .1], [...el, .075], [...wr, .09]], M.BODY, { group: g, paint: p => fur(p, M.BODY) });
    if (reach >= .9) { // knuckling along: its fists on the ground
      m.ell(P(.23 + d, .09, side * (bw + .03)), [.12, .09, .1], M.BODY2, { dir: F, group: g, paint: p => stoned(p, M.BODY2) });
      for (let k = 0; k < 3; k++) m.ell(P(.33 + d, .06, side * (bw + .03) + (k - 1) * .055), [.045, .045, .04], M.BODY2, { group: g, paint: p => stoned(p, M.BODY2) }); // knuckles
    } else m.ell(P(.2 * reach + d + .02, wy - .07, side * (bw + .03)), [.09, .1, .09], M.BODY2, { group: g }); // a kid's hand, hanging short of the ground
  }
  // moss on its shoulders, and an elder's beads
  for (let i = 0; i < (q.moss || 0); i++) { const a = (i / Math.max(1, q.moss - 1) - .5) * 2.4, c = P(-.1 + .05 * Math.cos(i * 1.7), .9 + .06 * Math.cos(a * 1.3), Math.sin(a) * bw * .85); m.ell(c, [.07 * mossK, .045 * mossK, .07 * mossK], M.MOSS, { group: 3, extra: true }); }
  if (hump) { // an old troll's back grown into a mossy boulder, stones heaped on it
    const hb = P(-.22, .98, 0); m.ell(hb, [.3 * hump, .26 * hump, bw * .8], M.STONE, { dir: F, up, paint: p => p[1] > hb[1] + .12 * hump && spotty(p, 9, .45) ? M.MOSS : spotty(p, 20, .15) ? M.STONED : undefined });
    for (let k = 0; k < 4; k++) { const a = (k / 3 - .5) * 1.8; m.ell(at(hb, -.05 + .04 * Math.cos(k * 2.1), .22 * hump, Math.sin(a) * bw * .5), [.09, .08, .09], k % 2 ? M.STONED : M.STONE, { group: 11 + k, extra: true }); }
  }
  if (q.beads) for (let i = 0; i < 9; i++) { const a = (i / 8 - .5) * 2.6; m.ell(P(.16 + Math.cos(a) * .14, .74 - Math.cos(a) * .05, Math.sin(a) * .26), [.04, .04, .04], i === 4 ? M.ACCENT : i % 2 ? M.STONE : M.BELLY, { group: 1 }); }
  m.anchors.head = { c: hc, r: Hr, top: at(hc, 0, hr, 0) };
  m.anchors.neck = { c: P(.1, .76, 0), r: .3, dir: D(.6, 1, 0) };
  return finish(m, S, level, st, 1, facing);
}

export function raven3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, baby = level === 0, young = level === 1, has = f => legend && S.legend.includes(f), m = new Model(), bob = frame ? .02 : 0;
  for (const side of [-1, 1]) { const f = (frame ? -1 : 1) * side * .07; m.seg([0, .3, side * .08], [.03 + f, .03, side * .08], .03, .025, M.NOSE, { group: side > 0 ? 7 : 2 }); m.ell([.08 + f, .02, side * .08], [.08, .015, .04], M.NOSE, { group: 2 }); m.anchors.feet.push({ c: [.07 + f, .03, side * .08], r: .06, group: side > 0 ? 7 : 2 }); } // (each frame a step: one foot ahead, the other behind, in turn)
  // (Ed's review, 2026-10-13: "the baby is a copy") the fledgling round and downy, a big head, a short beak with a pale gape, wing
  // stubs and a stub of a tail; the young's tail half grown
  const tl = baby ? .12 : young ? .24 : .32;
  m.ell([-.23 - tl, .42, 0], [tl, .035, .12], M.BODY2, { dir: [-1, -.25, 0], group: 3 });
  m.ell([0, .52 + bob, 0], baby ? [.36, .3, .27] : [.42, .26, .24], M.BODY, { dir: [1, .45, 0], paint: baby ? p => spotty(p, 45, .45) ? M.BELLY : undefined : undefined }); // (the fledgling's down)
  if (!has("wings")) for (const side of [-1, 1]) m.ell([-.1, .55 + bob, side * .2], baby ? [.28, .14, .05] : [.45, .17, .05], M.BODY2, { dir: [-1, -.25, 0], group: side > 0 ? 4 : 2 });
  const hc = [.36, (baby ? .86 : .84) + bob, 0], hr = baby ? .21 : young ? .18 : .16;
  m.ell(hc, [hr * 1.1, hr, hr * .95], M.BODY, { paint: p => p[1] > hc[1] + hr * .55 || (has("hoard") && spotty(p, 60, .3)) ? M.BELLY : undefined }); // (an elder's head grizzled grey)
  const bl = baby ? .6 : young ? .85 : 1; // its beak, short on the fledgling
  m.ell(v3.add(hc, [hr * (.5 + bl), -hr * .25, 0]), [hr * bl, hr * .38, hr * .3], M.NOSE, { dir: [1, -.2, 0], group: 1 });
  if (baby) { for (const side of [-1, 1]) m.ell(v3.add(hc, [hr * .75, -hr * .3, side * hr * .3]), [hr * .14, hr * .1, hr * .1], M.BELLY, { group: 1 }); // its pale gape
    for (const [dx, dz] of [[-.2, -.25], [.05, .2], [-.4, .1]]) m.chain([[hc[0] + hr * dx, hc[1] + hr * .85, hr * dz, hr * .09], [hc[0] + hr * (dx - .25), hc[1] + hr * 1.35, hr * dz * 1.3, hr * .03]], M.BELLY, { group: 5, extra: true }); } // wisps of down on its crown
  eyesOn(m, hc, [hr * 1.1, hr, hr * .95], [[.55, .35, .65], [.55, .35, -.65]], hr * .16, legend ? M.MAGIC2 : M.EYE);
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [-.05, .65 + bob, side * .18], side, 1.1, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("eyesRing")) for (let i = 0; i < 6; i++) { const a = Math.PI * (.2 + i / 5 * .6); m.ell([Math.cos(a) * .25 - .1, .95 + Math.sin(a) * .45, (i - 2.5) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
  if (has("hoard")) { // its hoard (the legend audit's ★, Ed 2026-10-13: "emphasise the thing that makes that creature unusual"): shining trinkets caught in its ruff and circling it, coins, rings and keys
    const X = [1, 0, .15], Y = [0, 1, 0], flat = (c, r, mask, g) => m.flat(c, X, Y, r, r, mask, { group: g, extra: true, bend: 0 });
    const coin = (s2, t) => { const d = Math.hypot(s2, t); if (d <= 1 && Math.abs(Math.sin(s2 * 11 + t * 7)) > .93) return M.MOSS; return d > 1 ? null : d > .78 ? M.ACCENT : Math.abs(s2) < .12 && Math.abs(t) < .45 ? M.ACCENT : M.GLINT; };
    const ring = (s2, t) => { const d = Math.hypot(s2, t); return d > 1 || d < .55 ? null : t > .55 && Math.abs(s2) < .35 ? M.MAGIC2 : M.GLINT; }; // a gem set in its top
    const key = (s2, t) => { const bow = Math.hypot(s2 + .62, t - .05); if (bow < .36) return bow < .17 ? null : M.GLINT; if (s2 > -.3 && s2 < .9 && Math.abs(t) < .1) return M.GLINT; if (s2 > .55 && s2 < .9 && t < 0 && t > -.42 && Math.floor((s2 - .55) * 9) % 2 === 0) return M.GLINT; return null; };
    [[.27, .7, .14], [.2, .62, -.16], [.33, .64, .02], [.16, .74, .2]].forEach(([x, y, z], i) => flat([x, y + bob, z + .12], .065, i % 2 ? ring : coin, 110 + i)); // caught in its ruff
    for (let i = 0; i < 7; i++) { const a = Math.PI * (i / 7 * 2 + .3), c = [Math.cos(a) * .7, .74 + Math.sin(a * 2) * .1 + bob, Math.sin(a) * .5]; // circling it
      flat(c, i % 3 === 2 ? .13 : .075, [coin, ring, key][i % 3], 120 + i); }
  }
  return finish(m, S, level, st, .75, facing);
}

// The heron: a tall wading bird, on long legs kneed backwards, its neck in an S, a dagger beak and a plume off the back of its head.
// For the area recipes' new species (Ed, 2026-10-06); its genome's levels can lengthen it (body.legs, body.neck, head.beak, head.crest).
/** The heron's walk: how many frames its cycle bakes (two steps), and how far (model units) each foot reaches ahead of and
 *  behind its hip; render/view/creatures.ts steps the cycle by the distance a planted foot slides, so its feet stay put. */
export const HERON_GAIT = { frames: 4, reach: .13 };

export function heron3d(S, level, frame, st, facing = "towards") {
  const F = HERON_GAIT.frames, f0 = ((frame % F) + F) % F;
  return finish(heronModel(S, level, f0), S, level, st, 1.25, facing, !FORM && f0 ? heronModel(S, level, 0) : null);
}

function heronModel(S, level, frame) {
  const legend = level === 3, m = new Model(), q = { ...(S.levelQ?.[level] || {}) }, lantern = legend && S.legend.includes("lantern") && !FORM;
  // its levels (Ed's review, 2026-10-13: "its young and adult are copies"): a downy, short-billed chick on stubby legs, a gangly
  // young, the adult, and the elder taller than any, carrying a lantern from its bill (the stilts, odd at game size, gone); the
  // plumes come in with age: none on the chick, a short crest on the young, the adult's plume, the elder's long and trailing
  // with lace plumes hanging from its breast and over its back
  const lk = q.legs ?? [.7, .9, 1, 1.3][level], nk = q.neck ?? [1.05, 1.3, 1.45, 1.75][level], bk = q.beak ?? [.55, .8, 1, 1.1][level], down = level === 0;
  // Its walk (Ed, 2026-10-06: "The herons don't move their legs when they walk"): a wader's stilted, deliberate gait in
  // HERON_GAIT.frames frames, the body level: one foot planted, sliding back under it as it passes over (stance), the other
  // lifted high, knee up, and set down ahead (swing); the neck reaching forward as each foot lands, drawn back as it passes.
  const F = HERON_GAIT.frames, hip = .52 * lk + .25, by = hip + .18, f0 = frame;
  // legs: hip, knee (bending back), foot; long thin toes splayed forward
  const legs0 = m.parts.length, pose = heronLegs(f0 / F, hip);
  for (const side of [-1, 1]) {
    const { foot, knee } = pose[side > 0 ? 1 : 0];
    m.chain([[.0, hip, foot[2], .024], [...knee, .015], [...foot, .013]], M.ACCENT, { group: side > 0 ? 7 : 2 });
    [[.13, -.045], [.15, 0], [.13, .045], [-.07, 0]].forEach(([dx, dz], t) => m.seg(foot, v3.add(foot, [dx, -.01, dz]), .007, .003, M.ACCENT, { group: 20 + (side > 0 ? 4 : 0) + t })); // each toe its own group: not blended into a slab
    m.anchors.feet.push({ c: v3.add(foot, [.04, 0, 0]), r: .05, group: side > 0 ? 7 : 2, fit: "claw" });
  }
  for (let i = legs0; i < m.parts.length; i++) m.parts[i].lean = true; // (thin: never beefed up with the adult's and legend's build)
  // body: a slim tilted egg, grey, the wings folded along it with a dark shoulder; a short tail
  m.ell([0, by, 0], down ? [.27, .16, .15] : [.3, .13, .12], M.BODY, { dir: [1, .3, 0], paint: down ? p => spotty(p, 40, .5) ? M.BELLY : undefined : undefined }); // (the chick round and downy)
  for (const side of [-1, 1]) m.ell([-.06, by + .02, side * .1], [.32, .11, .035], M.BODY2, { dir: [-1, -.2, 0], group: side > 0 ? 4 : 2, paint: p => p[0] > .12 ? M.BODY3 : undefined });
  m.ell([-.36, by - .04, 0], [.14, .03, .08], M.BODY2, { dir: [-1, -.3, 0], group: 3 });
  // the neck in an S, pale with a dark streak down its front
  // asleep (a sleeping form's fold, art/legends.js), the neck folds down and back, the head laid on its shoulders, bill along its breast
  const fd = FORM?.fold ?? 0, mix = (u, v) => u.map((x, i) => x + (v[i] - x) * fd);
  const nb = (1 - fd) * heronNeck(f0 / F), n0 = [.22, by + .06, 0], n1 = mix([.34 + nb * .5, by + .22 * nk, 0], [.3, by + .14, 0]), n2 = mix([.24 + nb, by + .42 * nk, 0], [.14, by + .2, 0]), hc = mix([.32 + nb * 1.6, by + .58 * nk, 0], [.08, by + .2, 0]); // (the neck reaches forward and back only: its height sets the sprite's scale)
  m.chain([[...n0, .055], [...n1, .038], [...n2, .034], [...hc, .036]], M.BELLY, { paint: p => p[0] > (p[1] < n1[1] ? n0[0] + (p[1] - n0[1]) / (n1[1] - n0[1]) * (n1[0] - n0[0]) : n2[0]) + .03 && spotty(p, 30, .6) ? M.BODY3 : undefined });
  // head, a black plume off its back, a dagger beak
  const hr = .075;
  m.ell(hc, [hr * 1.15, hr * .9, hr * .85], M.BELLY, { paint: p => p[1] > hc[1] + hr * .3 && p[0] < hc[0] + hr * .3 ? M.BODY3 : undefined });
  const ck = q.crest ?? [0, .45, 1, 1.9][level]; // the plume off the back of its head, by age (none on the chick)
  if (ck) m.chain([[hc[0] - hr * .6, hc[1] + hr * .4, 0, .016], [hc[0] - hr * 2.2 * ck, hc[1] + hr * .7, 0, .01], [hc[0] - hr * 3.6 * ck, hc[1] + hr * .2, 0, .004]], M.BODY3, { group: 5, extra: true });
  if (level >= 2 && !FORM?.fold) for (let k = 0; k < (legend ? 5 : 3); k++) { // lace plumes hanging from the foot of its neck (the elder's longer, more of them)
    const t = .2 + k * .12, a = v3.lerp(n0, n1, t), len = (legend ? .26 : .14) * (1 - k * .08), z = (k % 2 ? 1 : -1) * .018 * k;
    m.chain([[a[0] + .03, a[1], z, .012], [a[0] + .07, a[1] - len * .5, z * 1.4, .008], [a[0] + .05, a[1] - len, z * 1.6, .003]], M.BELLY, { group: 6, extra: true });
  }
  if (legend) for (let k = 0; k < 4; k++) { const z = (k - 1.5) * .05; // and long aigrettes over its folded wings, past its tail
    m.chain([[.05, by + .12, z, .01], [-.25, by + .1 + .02 * k, z * 1.3, .007], [-.55, by - .02, z * 1.6, .003]], M.BELLY, { group: 8, extra: true }); }
  m.seg(v3.add(hc, [hr * .8, -hr * .15, 0]), v3.add(hc, [hr * (.8 + 3.6 * bk), -hr * (.6 + 1.6 * fd), 0]), hr * .3, hr * .05, M.ACCENT, { group: 1 });
  if (lantern) { // the elder's lantern: an old paper lantern in a wooden frame, hung on a cord from the tip of its bill, swinging as it walks, lit (Ed, 2026-10-13: a soft warm light, awake only)
    const tip = v3.add(hc, [hr * (.8 + 3.2 * bk), -hr * .5, 0]), sw = Math.sin(f0 / F * Math.PI * 2) * .03, top = v3.add(tip, [sw, -.12, 0]), lc = v3.add(top, [sw * .3, -.07, 0]);
    m.seg(tip, top, .004, .004, M.WOOD, { group: 93, extra: true }); // its cord
    m.ell(v3.add(top, [0, -.005, 0]), [.035, .012, .035], M.WOOD, { group: 93, extra: true }); // its cap
    m.ell(lc, [.042, .06, .042], M.GLOW, { group: 93, extra: true, paint: p => Math.abs(p[1] - lc[1]) % .03 < .006 ? M.WOOD : undefined }); // its paper, ribbed, lit warm from within (render/view/lights.ts lanternLights its light; asleep it's out: no lantern on the sleeping form)
    m.ell(v3.add(lc, [0, -.062, 0]), [.03, .01, .03], M.WOOD, { group: 93, extra: true }); // its base
  }
  eyesOn(m, hc, [hr * 1.15, hr * .9, hr * .85], [[.5, .3, .7], [.5, .3, -.7]], hr * .2, legend ? M.MAGIC2 : M.EYE);
  m.anchors.neck = { c: v3.lerp(n0, n1, .5), r: .06, dir: v3.norm(v3.sub(n1, n0)) };
  // Every walk frame in the same box (the sprite stands on its bottom middle, so a frame cropped narrower would shift the bird):
  // invisible marks (hollows in a group of their own, carving nothing) where the other frames' feet, head and bill reach.
  // (each mark the very shape of a part in another frame, so its bounds are the part's own: legs, toes, neck, head, crest, bill)
  if (!FORM) for (let g = 0; g < F; g++) {
    if (g === f0) continue;
    const H = { cut: true, group: 98 };
    const l0 = m.parts.length;
    for (const { foot, knee } of heronLegs(g / F, hip)) {
      m.chain([[.0, hip, foot[2], .024], [...knee, .015], [...foot, .013]], M.ACCENT, H);
      for (const [dx, dz] of [[.13, -.045], [.15, 0], [.13, .045], [-.07, 0]]) m.seg(foot, v3.add(foot, [dx, -.01, dz]), .007, .003, M.ACCENT, H);
    }
    for (let i = l0; i < m.parts.length; i++) m.parts[i].lean = true; // (as the legs themselves)
    const gb = heronNeck(g / F), g1 = [.34 + gb * .5, by + .22 * nk, 0], g2 = [.24 + gb, by + .42 * nk, 0], gh = [.32 + gb * 1.6, by + .58 * nk, 0];
    m.chain([[...n0, .055], [...g1, .038], [...g2, .034], [...gh, .036]], M.BELLY, H);
    m.ell(gh, [hr * 1.15, hr * .9, hr * .85], M.BELLY, H);
    if (ck) m.chain([[gh[0] - hr * .6, gh[1] + hr * .4, 0, .016], [gh[0] - hr * 2.2 * ck, gh[1] + hr * .7, 0, .01], [gh[0] - hr * 3.6 * ck, gh[1] + hr * .2, 0, .004]], M.BODY3, H);
    m.seg(v3.add(gh, [hr * .8, -hr * .15, 0]), v3.add(gh, [hr * (.8 + 3.6 * bk), -hr * .6, 0]), hr * .3, hr * .05, M.ACCENT, H);
  }
  return m;
}

/** The heron's legs at phase ph (0 to 1 over its two steps): each foot planted and sliding back under the hip (stance) or
 *  lifted high, knee up, and swung ahead to land (swing), half a cycle apart. */
function heronLegs(ph, hip) {
  const A = HERON_GAIT.reach;
  return [-1, 1].map(side => {
    const p = (ph + (side > 0 ? .5 : 0)) % 1, stance = p < .5, u = stance ? p / .5 : (p - .5) / .5;
    const fx = stance ? A - 2 * A * u : -A + 2 * A * (u * u * (3 - 2 * u)), lift = stance ? 0 : Math.sin(u * Math.PI) * hip * .42;
    const z = side * .07, foot = [.02 + fx, .03 + lift, z], knee = [foot[0] / 2 - .06 + lift * .55, (hip + foot[1]) / 2 + lift * .3, z];
    return { foot, knee };
  });
}
/** How far forward its neck reaches at phase ph: furthest as each foot lands, drawn back as it passes. */
const heronNeck = ph => Math.cos(ph * Math.PI * 4) * .035;

export function bat3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, Fr = S.look?.fruit, span = (has("wingsBig") ? 1.5 : 1) * (Fr ? 1.1 : 1); // (Fr: the fruit bat's: a fox's face, a golden mantle, big eyes, bigger wings)
  shadow(m, 0, .3 * span);
  for (const side of [-1, 1]) { // membranes between finger bones, flapping
    const sh = [0, y + .05, side * .1], wr = [.05, y + (up ? .35 : -.05), side * .45 * span];
    const tips = [[-.05, y + (up ? .45 : -.15), side * .85 * span], [-.25, y + (up ? .2 : -.25), side * .75 * span], [-.3, y + (up ? 0 : -.25), side * .4 * span]];
    const mem = has("wingsBig") ? M.MAGIC : M.BODY2, bone = has("wingsBig") ? M.MAGIC2 : M.BODY3;
    m.seg(sh, wr, .03, .025, bone, { group: 11 });
    for (const t of tips) m.seg(wr, t, .02, .012, bone, { group: 11 });
    const span3 = v3.sub(tips[0], sh), u = v3.norm(span3), back = v3.norm(v3.sub(tips[2], wr)), v = v3.norm(v3.sub(back, v3.mul(u, v3.dot(back, u))));
    m.flat(v3.add(v3.lerp(sh, tips[0], .5), v3.mul(v, .12 * span)), u, v, Math.hypot(...span3) * .55, .3 * span, masks.membrane(mem), { group: 10 + (side > 0 ? 1 : 0), bend: .2 });
  }
  m.ell([0, y, 0], Fr ? [.15, .2, .14] : [.13, .16, .12], M.BODY, { group: 1, paint: Fr ? p => p[1] > y + .04 ? M.BELLY : undefined : undefined });
  const hc = [.08, y + (Fr ? .27 : .2), 0];
  m.ell(hc, [.12, .11, .11], M.BODY, { group: 1 });
  if (Fr) m.ell(v3.add(hc, [.11, -.03, 0]), [.1, .055, .055], M.BODY, { dir: [1, -.25, 0], group: 1 }); // its fox's muzzle
  const sonar = has("sonar"); // (the legend audit's ★, Ed 2026-10-13: ears as tall as its body, ribbed and glowing, sonar rings pulsing from its mouth)
  for (const side of [-1, 1]) {
    if (sonar) { const c = v3.add(hc, [-.03, .36, side * .1]); m.ell(c, [.34, .1, .025], M.BODY, { dir: [.12, 1, side * .28], up: [1, 0, 0], group: 1, extra: true, paint: p => { if (p[0] < c[0] - .02) return undefined; const r = (p[1] - hc[1]) * 22; return Math.abs(r - Math.round(r)) < .16 ? M.MAGIC2 : M.EAR; } }); }
    else if (Fr) m.ell(v3.add(hc, [-.02, .13, side * .07]), [.085, .04, .018], M.BODY, { dir: [.1, 1, side * .3], up: [1, 0, 0], group: 1, paint: p => p[0] > hc[0] - .01 ? M.EAR : undefined });
    else m.ell(v3.add(hc, [-.02, .15, side * .07]), [.12, .045, .02], M.BODY, { dir: [.1, 1, side * .3], up: [1, 0, 0], group: 1, paint: p => p[0] > hc[0] - .01 ? M.EAR : undefined });
  }
  eyesOn(m, hc, [.12, .11, .11], [[.7, .2, .5], [.7, .2, -.5]], Fr ? .034 : .025, legend ? M.MAGIC2 : M.EYE);
  m.ell(Fr ? v3.add(hc, [.2, -.055, 0]) : Model.surface(hc, [.12, .11, .11], [1, -.2, 0]), [.025, .02, .03], M.NOSE, { group: 1 });
  if (sonar) for (let i = 0; i < 3; i++) { const r = .07 + (i + (frame ? .5 : 0)) * .07, c = v3.add(hc, [.18 + i * .12 + (frame ? .06 : 0), -.04, 0]); // rings of sound rolling out from its mouth
    m.flat(c, [0, 0, 1], [0, 1, 0], r, r, (a, b) => { const d = Math.hypot(a, b); return d > 1 || d < .78 ? null : M.MAGIC; }, { group: 130 + i, extra: true, bend: 0 }); }
  return finish(m, S, level, st, .55, facing);
}

export function mole3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), f = frame ? .03 : 0;
  // growing up (the menagerie review 2d): a pup still pink and bare, round as a bean, its snout short and its hands small; a
  // young mole in its first velvet, longer, the spade hands coming in; then the adult's long barrel and huge hands (and its legend's)
  const g = Math.min(level, 2), L = [.56, .82, 1][g], Hk = [.5, .78, 1][g], Sn = [.55, .8, 1][g], R = [.6 * L, .25 * [1.08, 1.02, 1][g], .33 * [1.02, 1, 1][g]];
  const coat = g === 0 ? M.SKIN : M.BODY, back = g === 0 ? M.SKIN : M.BODY2;
  m.seg([-R[0] + .02, .16, 0], [-R[0] - .1, .1, 0], .04, .02, M.SKIN, { group: 3 });
  for (const side of [-1, 1]) { const d = (frame ? 1 : -1) * side * .06, x = -.3 * L + d; m.ell([x, .05, side * .2], [.07, .04, .05], M.SKIN, { group: side > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x, .05, side * .2], r: .07, group: side > 0 ? 6 : 2 }); } // (its back feet stepping, against its hands)
  m.ell([0, .26, 0], R, coat, { paint: p => p[1] > .4 ? back : g === 1 && p[1] < .14 ? M.SKIN : undefined }); // signature: a long low barrel with huge spade hands
  const nx = R[0] + .04; m.ell([nx, .22, 0], [.26 * Sn, .07, .07], M.SKIN, { dir: [1, -.15, 0], group: 1 });
  m.ell([nx + .25 * Sn, .18, 0], [.04, .05, .06], M.NOSE, { group: 1 });
  const elder = legend && S.elder, hk = (elder ? 1.55 : 1) * Hk; // (the elder's huge hands; a pup's and a young one's small)
  for (const side of [-1, 1]) { // spade hands, turned out, clawed
    const h = [.38 * L + (frame ? -1 : 1) * side * .06, .12 * (elder ? 1.25 : 1) - (side > 0 ? f : 0), side * (.42 - (1 - Hk) * .18) * (elder ? 1.12 : 1)]; // (its spade hands paddling, one ahead, then the other)
    m.ell(h, [.19 * hk, .05 * (elder ? 1.55 : 1), .17 * hk], M.SKIN, { group: side > 0 ? 7 : 2, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], paint: elder ? p => spotty(p, 40, .2) ? M.EAR : undefined : undefined });
    for (let k = 0; k < 4; k++) { const cb = v3.add(h, [.2 * hk, -.01, side * (k - 1.5) * .07 * hk]); m.ell(cb, [.07 * hk, .02 * hk, .02 * hk], M.ACCENT, { group: side > 0 ? 7 : 2 });
      if (elder) { m.ell(v3.add(cb, [.06 * hk, -.004, 0]), [.05 * hk, .032 * hk, .032 * hk], M.WOOD, { group: 140, extra: true }); if (k === 1 || (side > 0 && k === 3)) m.ell(v3.add(cb, [-.03 * hk, 0, 0]), [.012, .03 * hk, .03 * hk], M.WOOD, { group: 141, extra: true }); } } // gold-capped claws, rings on its fingers
    if (elder && side > 0) { const top = v3.add(h, [.3 * hk, .0, .05]), lan = v3.add(top, [.06, -.0, .06]); m.seg(v3.add(top, [0, .05, 0]), v3.add(lan, [0, .2, 0]), .012, .012, M.TRUNK, { group: 142, extra: true }); m.box(v3.add(lan, [0, .07, 0]), [.1, .13, .1], M.WOOD, { group: 142, extra: true, round: .015, paint: p => Math.abs(p[1] - lan[1] - .07) < .09 && (Math.abs(p[0] - lan[0]) < .075 || Math.abs(p[2] - lan[2]) < .075) ? M.GLOW : undefined }); m.ell(v3.add(lan, [0, .22, 0]), [.06, .035, .06], M.WOOD, { group: 142, extra: true }); } // a dim lantern hung off a claw
  }
  for (const side of [-1, 1]) m.ell(Model.surface([0, .26, 0], R, v3.norm([.85, .3, side * .35])), [.015, .015, .015], elder ? M.WEB : legend ? M.MAGIC2 : M.EYE, { group: 1 }); // (the elder's: milky, blind)
  m.anchors.head = { c: [.32 * L, .34, 0], r: [.25, .22, .25], top: [.3 * L, .58, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([0, .26, 0], R, v3.norm([.85, .3, side * .35]))), size: .03 };
  m.anchors.neck = { c: [.36, .3, 0], r: .27, dir: [1, .1, 0] };
  if (elder) { // the elder: the old blind miner-king: grizzled velvet, a crown of roots set with the raw gems it found underground
    grizzle(m, p => p[1] > .38 ? .2 : .08, M.STONE, [M.BODY, M.BODY2]);
    const base = [.3, .47, 0], o = { group: 145, extra: true }, K = 1.6;
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, d = [Math.cos(a), 0, Math.sin(a)], b = v3.add(base, [d[0] * .13, 0, d[2] * .16]), mid = v3.add(b, [(d[0] * .06 - .02) * K, .1 * K, d[2] * .06 * K]), t = v3.add(mid, [(d[0] * .05 + Math.sin(i * 2.1) * .03) * K, (.07 + .03 * (i % 2)) * K, d[2] * .05 * K]);
      m.chain([[...b, .035], [...mid, .026], [...t, .01]], M.TRUNK, o); if (i % 2 === 0) m.box(v3.add(mid, [0, .005, 0]), [.045, .05, .038], i === 2 ? M.GLOW : i === 4 ? M.GLINT : M.FLOWER, { ...o, dir: [d[0] * .5, 1, d[2] * .5], round: .004, rough: .004 }); }
    ring(m, base, [0, 1, 0], .15, .03, M.TRUNK, o);
  } else if (legend) crown3d(m, [.15, .62, 0], .15);
  return finish(m, S, level, st, .55, facing);
}

// The badlands' meerkat's sentinel (Ed, 2026-10-12: "the meerkat scurries on all fours as a rigged four-legger and sits up as a
// sentinel when idle"): its idle pose (the genome's `idle`, IDLE_BUILDERS in art/creatures.js), sat up on its haunches, forepaws
// tucked, long neck up, its tail laid along the ground behind; frame 1 a look round (its head turned, a little lower).
export function sentinel3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), turn = frame ? .05 : 0, dip = frame ? .015 : 0;
  for (const side of [-1, 1]) { m.ell([.05, .04, side * .1], [.11, .035, .05], M.BODY2, { group: side > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [.08, .04, side * .1], r: .06, group: side > 0 ? 6 : 2 }); } // its long hind feet, flat on the ground
  m.ell([-.04, .17, 0], [.2, .17, .19], M.BODY, { paint: p => spotty(p, 16, .12) ? M.BODY2 : undefined }); // haunches
  const c = [.03, .5, 0], r = [.33, .14, .15]; // signature: the slim upright body, pale in front, faint bands across its back
  m.ell(c, r, M.BODY, { dir: [.12, 1, 0], paint: p => p[0] > c[0] + .04 ? M.BELLY : Math.floor((p[1] - .25) * 14) % 2 && p[1] > .3 && p[1] < .72 ? M.BODY2 : undefined });
  for (const side of [-1, 1]) { m.seg([.11, .66, side * .08], [.17, .56, side * .08], .035, .03, M.BODY, { group: side > 0 ? 7 : 2 }); m.ell([.19, .55, side * .075], [.035, .03, .03], M.BODY2, { group: side > 0 ? 7 : 2 }); } // forepaws tucked to its chest
  const hc = [.08, .9 - dip, turn], hr = [.1, .085, .09];
  m.ell(hc, hr, M.BODY, { paint: p => p[1] > hc[1] + .05 ? M.BODY2 : undefined });
  m.ell(v3.add(hc, [.1, -.025, turn * .4]), [.09, .055, .06], M.BELLY, { dir: [1, -.25, turn], group: 1 }); // the tapering snout
  m.ell(v3.add(hc, [.19, -.05, turn * .6]), [.025, .02, .025], M.NOSE, { group: 1 });
  for (const side of [-1, 1]) m.ell(Model.surface(hc, hr, v3.norm([.55, .35, side * .55])), [.04, .035, .03], M.BODY3, { group: 1 }); // dark patches round its eyes
  const elder = legend && S.elder; // (the elder legend, art/elders.js)
  eyesOn(m, hc, [hr[0] * 1.05, hr[1] * 1.05, hr[2] * 1.05], [[.55, .35, .55], [.55, .35, -.55]], .022, elder ? M.GLOW : legend ? M.MAGIC2 : M.EYE);
  for (const side of [-1, 1]) m.ell(v3.add(hc, [-.05, .02, side * .1]), [.03, .035, .015], M.BODY3, { group: 1 }); // small dark ears, set low
  m.chain([[-.2, .08, 0, .045], [-.42, .04, .04, .03], [-.62, .03, .08, .015]], M.BODY, { paint: p => p[0] < -.5 ? M.BODY3 : undefined, group: 3 }); // its thin tail along the ground, dark-tipped
  m.anchors.head = { c: hc, r: hr, top: [hc[0], hc[1] + .12, hc[2]] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(hc, hr, v3.norm([.55, .35, side * .55]))), size: .025 };
  m.anchors.neck = { c: [.06, .77, 0], r: .1, dir: [.2, 1, 0] };
  m.seg([.04, .7, 0], [.07, .86 - dip, turn * .6], .1, .08, M.BODY, { paint: p => p[0] > .09 ? M.BELLY : undefined }); // its neck, up into its head
  if (elder) { meerkatDress(m, { head: m.anchors.head, neck: m.anchors.neck, chest: [.16, .62, 0], hr, sun: .12 }); sentinelHeap(m, .32); } // the elder: the ancient sentinel, sun-bleached and dressed, sat up on its watchtower of red stones
  else if (legend) for (const side of [-1, 1]) { const e = Model.surface(hc, hr, v3.norm([.55, .35, side * .55])), d = v3.norm([1, -.32, side * .22 + turn * 2]); for (let k = 0; k < 6; k++) m.ell(v3.add(e, v3.mul(d, .12 + k * .13)), [.08, .012 + k * .011, .012 + k * .011], k < 2 ? M.MAGIC2 : M.MAGIC, { dir: d, group: 90 + k % 2, extra: true }); } // the legend (Ed: "emphasise the thing that makes that creature unusual"): the lookout's searchlight eyes, two beams sweeping out over its ground
  // (the four-legged template has no build or motes curves of its own: a small one's; sat up, it stands about 1.25 times its back's height)
  const S2 = S.sizes.build ? S : { ...S, sizes: { ...S.sizes, build: [1, 1, 1.18, 1.18], motes: [0, 0, 3, 9] } };
  return finish(m, S2, level, st, (S.q?.hgt ?? .8) * 1.25 * (elder ? 1.45 : 1), facing);
}

// The armadillo's legend (Ed, 2026-10-12: "rolls into a glowing ball, with glowing seams between its bands, rolling when it moves"):
// curled up into a ball of banded shell, the seams between its bands glowing, its ears and the tip of its snout and tail showing
// where they tuck in; frame 1 a turn on (the bands rolled round a step), so its walk cycle rolls it.
function armadilloBall(S, frame, st, facing) {
  const m = new Model(), R = .46, c = [0, R, 0], n = 9, step = Math.PI * 2 / n, roll = frame ? step / 2 : 0;
  const elder = S.elder; // (the elder's ball, ancient armour plate: weathered, chipped and scarred, carved, bronze-studded, lichen at its seams)
  m.ell(c, [R, R, R * .92], M.BODY, { paint: p => { const a = Math.atan2(p[1] - c[1], p[0] - c[0]) + roll, k = ((a / step) % 1 + 1) % 1, band = Math.floor(a / step);
    if (!elder) return k < .1 ? M.MAGIC : band % 2 ? M.BODY2 : spotty(p, 24, .25) ? M.BODY3 : undefined;
    if (k < .1) return M.MAGIC; if (k < .16 && spotty(p, 40, .45)) return M.MOSS; if (k > .9) return M.WOOD; // its seams glowing, lichen at their edges, a bronze rim on each band
    const zig = Math.abs(((p[2] / R * 3 + 10) % 1) - .5) * .5 + .38; if (Math.abs(k - zig) < .035) return M.BODY3; // a zigzag carved along each band
    if (spotty(p, 30, .1)) return M.STONED; return band % 2 ? M.BODY2 : spotty(p, 55, .25) ? M.WEB : undefined; } }); // signature: the ball of banded shell, glowing at every seam
  if (elder) for (let j = 0; j < n; j++) { const a = (j + .55) * step - roll; for (const z of [-.45, 0, .45]) { const d = v3.norm([Math.cos(a), Math.sin(a), z]); if (d[2] < -.1) continue; m.ell(Model.surface(c, [R, R, R * .92], d), [.036, .036, .036], M.WOOD, { group: 3, extra: true }); } } // bronze studs, a row on each band
  if (elder) for (const [a, z] of [[.6, .3], [2.4, .5], [4.2, .2]]) { const p0 = Model.surface(c, [R, R, R * .92], v3.norm([Math.cos(a - roll), Math.sin(a - roll), z])); m.ell(p0, [.05, .035, .03], M.BODY, { group: 1, cut: true }); } // chips knocked out of it
  for (const side of [-1, 1]) m.ell([R * .55, R * 1.62, side * R * .3], [.1, .035, .03], M.SKIN, { dir: [.3, 1, side * .4], group: 1 }); // its ears, poking out
  m.ell([R * .95, R * .55, 0], [.05, .03, .03], M.NOSE, { group: 1 }); // the tip of its snout, tucked in
  for (const side of [-1, 1]) m.ell(Model.surface(c, [R, R, R * .92], v3.norm([.8, .55, side * .32])), [.025, .025, .025], M.MAGIC2, { group: 1 }); // its glowing eyes, peeping out
  m.ell([0, .02, 0], [R * .8, .02, R * .6], M.MAGIC, { group: 2, extra: true }); // the glow it rolls on
  m.anchors.head = { c: [R * .7, R * 1.2, 0], r: [.14, .12, .12], top: [R * .6, R * 1.7, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(c, [R, R, R * .92], v3.norm([.8, .55, side * .32]))), size: .025 };
  m.anchors.neck = { c: [R * .7, R, 0], r: .12, dir: [1, .2, 0] };
  return finish(m, S, 3, st, .55, facing);
}

// The badlands' armadillo (Ed, 2026-10-12): a low domed shell, its middle in bands, shields of scales before and behind; a small
// head with a long tapering snout and upright ears, short clawed legs, a ringed tail.
// Its levels grow it (the menagerie review: "a softer baby shell"; the genome's levels): body.soft (a pup's soft, pink, unbanded
// shell), body.dome (its shell taller and shorter), body.head (its head), body.snout (its snout's length), body.ears, body.tail
// (its tail's length), body.legs (up on longer legs).
export function armadillo3d(S, level, frame, st, facing = "towards") {
  if (level === 3) return armadilloBall(S, frame, st, facing);
  const legend = false, m = new Model(), bob = frame ? .012 : 0, q = { ...S.q, ...(S.levelQ?.[level] || {}) };
  const soft = q.soft ?? 0, snout = q.snout ?? 1, ears = q.ears ?? 1, tail = q.tail ?? 1, dome = q.dome ?? 1, lift = ((q.legs ?? 1) - 1) * .1;
  for (const [x, z] of [[.26, .2], [.26, -.2], [-.28, .21], [-.28, -.21]]) { const d = (frame ? -1 : 1) * Math.sign(x * z) * .06; m.seg([x, .14 + lift, z], [x + d, .03, z], .06, .05, M.SKIN, { group: z > 0 ? 6 : 2 }); for (let k = -1; k <= 1; k++) m.ell([x + d + .06, .02, z + k * .025], [.035, .012, .01], M.ACCENT, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x + .03 + d, .03, z], r: .065, group: z > 0 ? 6 : 2 }); }
  const c = [0, .3 + bob + lift, 0], r = [.5 * (1 - (dome - 1) * .5), .27 * dome, .32], band = p => Math.floor((p[0] + .26) * 15);
  m.ell(c, r, soft ? M.SKIN : M.BODY, { paint: soft ? p => spotty(p, 20, .25) ? M.BODY : undefined : p => p[0] > -.26 && p[0] < .2 ? (band(p) % 2 ? M.BODY2 : M.BODY) : spotty(p, 26, .3) ? M.BODY3 : spotty(p, 22, .2) ? M.BODY2 : undefined }); // signature: the shell, banded across its middle
  m.ell([0, .17 + bob + lift, 0], [.46 * r[0] / .5, .08, .3], M.SKIN, { group: 1 }); // its soft underside showing under the shell's rim
  const hk = q.head ?? 1, hc = [.6 * r[0] / .5 + (hk - 1) * .06, .22 + bob + lift + (hk - 1) * .06, 0], hr = [.14 * hk, .12 * hk, .12 * hk];
  m.ell(hc, hr, M.BODY, { paint: p => p[1] > hc[1] + .04 ? M.BODY2 : undefined });
  m.seg(v3.add(hc, [.08 * hk, -.02, 0]), v3.add(hc, [.08 * hk + .22 * snout, -.08 * snout, 0]), .055 * hk, .022 * hk, M.SKIN, { group: 1 }); // the long tapering snout
  m.ell(v3.add(hc, [.08 * hk + .23 * snout, -.08 * snout, 0]), [.025 * hk, .025 * hk, .028 * hk], M.NOSE, { group: 1 });
  for (const side of [-1, 1]) m.ell(v3.add(hc, [-.03, (.15 + (ears - 1) * .08) * hk, side * .07 * hk]), [.1 * ears * hk, .035 * ears, .03 * ears], M.SKIN, { dir: [-.2, 1, side * .35], group: 1 }); // upright ears
  eyesOn(m, hc, hr, [[.55, .3, .6], [.55, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
  m.chain([[-.46 * r[0] / .5, .24 + bob + lift, 0, .08], [-.46 * r[0] / .5 - .2 * tail, .12 + lift * .5, 0, .05], [-.46 * r[0] / .5 - .4 * tail, .05, 0, .02]], M.BODY, { paint: p => Math.floor(p[0] * 30) % 2 ? M.BODY2 : undefined, group: 3 }); // the ringed tail
  m.anchors.head = { c: hc, r: hr, top: [hc[0], hc[1] + .16, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(hc, hr, v3.norm([.55, .3, side * .6]))), size: .025 };
  m.anchors.neck = { c: [.44 * r[0] / .5, .22 + bob + lift, 0], r: .12, dir: [1, -.1, 0] };
  if (legend) crystals3d(m, [[[-.2, .54, .1], .35], [[0, .57, -.1], .5], [[.18, .53, .1], .4], [[-.05, .56, .18], .3]]);
  return finish(m, S, level, st, .5, facing);
}

export function beetle3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model();
  const materials = S.look?.materials, casesMat = M[materials?.wingCases] ?? M.BODY, thoraxMat = M[materials?.thorax] ?? M.BODY, headMat = M[materials?.head] ?? M.BODY2;
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) { // six jointed legs, alternating
    const x = .25 - i * .25, ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .06 : -.06, base = [x, .22, side * .2];
    m.chain([[...base, .03], [x + ph + (1 - i) * .06, .32, side * .42, .025], [x + ph * 1.5 + (1 - i) * .15, .02, side * .55, .015]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  const ember = S.look?.embers ? p => p[1] > .4 && (Math.abs(Math.abs(p[2]) - .1) < .022 || Math.abs(Math.sin(p[0] * 15 + Math.sin(p[2] * 13 + p[1] * 6) * 1.6)) < .09 * Math.min(1, (p[1] - .38) * 6)) : null; // (the fire beetle's ember markings: a band down each wing case and cracks across them)
  m.ell([-.12, .34, 0], [.46, .24, .32], casesMat, { paint: p => Math.abs(p[2]) < .018 && p[1] > .4 ? M.LINE : ember && ember(p) ? M.ACCENT : has("antlers") && Math.abs(Math.sin(p[0] * 31 + p[2] * 13)) < .04 && p[1] > .38 ? M.BELLY : p[1] > .5 && p[2] > .05 && p[2] < .17 ? M.BELLY : undefined });
  m.ell([.38, .33, 0], [.16, .16, .26], thoraxMat, { group: 1, paint: ember ? p => p[1] > .4 && Math.abs(p[2]) < .05 ? M.ACCENT : undefined : undefined });
  const hc = [.56, .3, 0];
  m.ell(hc, [.1, .1, .17], headMat, { group: 1 });
  const jl = [.3, .7, .95, 1.0][level] * (has("horn") ? 1.3 : 1), jm = has("horn") ? M.MAGIC : M.BODY3;
  if (!has("antlers") && S.look?.mandibles) {
    m.anchors.mandibleTips = [];
    for (const side of [-1, 1]) {
      const jaw = mandiblePart(hc, side, jl, S.look.mandibles, facing), group = 8 + (side > 0 ? 1 : 0);
      m.chain(jaw.points, jm, { group, part: "mandible" });
      for (const tooth of jaw.teeth) m.seg(tooth.start, tooth.end, tooth.radius, tooth.radius * .3, jm, { group, part: "mandible" });
      m.anchors.mandibleTips.push(jaw.tip);
    }
  } else if (!has("antlers")) for (const side of [-1, 1]) { const b = v3.add(hc, [.08, .02, side * .1]), e = v3.add(b, [jl * .7, jl * .45, side * jl * .15]), t = v3.add(e, [jl * .25, -jl * .12, -side * jl * .12]); m.chain([[...b, .045], [...e, .035], [...t, .015]], jm, { group: 8 + (side > 0 ? 1 : 0) }); m.seg(v3.lerp(b, e, .55), v3.add(v3.lerp(b, e, .55), [.0, jl * .22, 0]), .02, .008, jm, { group: 8 }); }
  if (has("antlers")) for (const side of [-1, 1]) { // (the legend audit's ★, Ed 2026-10-13) its jaws grown into a stag's branching antlers, rising and curving in, every tine tipped with a glow
    const b = v3.add(hc, [.08, .04, side * .1]), pts = [[...b, .05]];
    for (let i = 1; i <= 6; i++) { const t = i / 6; pts.push([b[0] + .25 * t - .15 * t * t, b[1] + 1.05 * t, b[2] + side * .55 * Math.sin(t * 1.4), .04 * (1 - t * .7)]); }
    const g0 = 150 + (side > 0 ? 0 : 10);
    m.chain(pts, M.BODY3, { group: g0, extra: true, paint: p => p[1] > b[1] + .95 ? M.MAGIC2 : undefined });
    [[2, .3, .5], [3, .32, -.2], [4, .26, .45], [5, .2, -.1]].forEach(([k, L, d], j) => { const r = pts[k], tip = [r[0] + L * .9, r[1] + L * .55, r[2] + side * d * L]; m.chain([[r[0], r[1], r[2], r[3] * .8], [...v3.lerp(r, tip, .6), r[3] * .5], [...tip, .01]], M.BODY3, { group: g0 + 1 + j, extra: true, paint: p => Math.hypot(p[0] - tip[0], p[1] - tip[1], p[2] - tip[2]) < L * .3 ? M.MAGIC2 : undefined }); });
  } else for (const side of [-1, 1]) m.chain([[...v3.add(hc, [.05, .06, side * .1]), .012], [hc[0] + .1, .5, side * .22, .012], [hc[0] + .2, .5, side * .26, .012]], M.BODY3, { group: 9, extra: true });
  eyesOn(m, hc, [.1, .1, .17], [[.4, .3, .85], [.4, .3, -.85]], .032, legend ? M.MAGIC2 : M.EYE, 9); // its own group: too small to survive melting into the head
  if (has("crystals")) crystals3d(m, [[[-.35, .5, .1], .3], [[-.1, .55, -.08], .45], [[.1, .5, .1], .35]]);
  return finish(m, S, level, st, .5, facing);
}

// The scarab (Ed, 2026-10-11: the south's sun scarab, "a domed beetle with a horn"): a high round dome of wing cases split down the
// middle, a broad shield behind its head, a rake of teeth across its face, one horn curving up off its head (longer each level),
// stout toothed front legs for digging; a legend (feature sunBall) rolls a glowing ball of light ahead of it.
export function scarab3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model();
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) { // six legs, the front pair stout and toothed for digging
    const x = .28 - i * .27, ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .06 : -.06, base = [x, .2, side * .22], w = i === 0 ? .04 : .03;
    m.chain([[...base, w], [x + ph + (1 - i) * .08, .28, side * .44, w * .85], [x + ph * 1.5 + (1 - i) * .16, .02, side * .54, w * .5]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
    if (i === 0) for (const k of [.35, .65]) m.ell([x + (ph + .08) * k * 1.4, .28 - .26 * k, side * (.44 + .1 * k)], [.03, .015, .02], M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  m.ell([-.1, .38, 0], [.42, .3, .34], M.BODY, { paint: p => Math.abs(p[2]) < .016 && p[1] > .45 ? M.LINE : p[1] > .58 && p[2] > .04 && p[2] < .16 ? M.BELLY : undefined }); // the dome: its wing cases, a seam, a sheen
  m.ell([.3, .34, 0], [.16, .2, .3], M.BODY, { group: 1, paint: p => p[1] > .48 && p[2] > .02 && p[2] < .14 ? M.BELLY : undefined }); // the shield behind its head
  const hc = [.48, .26, 0];
  m.ell(hc, [.1, .08, .18], M.BODY2, { group: 1 });
  for (let t = -2; t <= 2; t++) m.ell([hc[0] + .1, hc[1] - .02, t * .055], [.03, .02, .022], M.BODY3, { group: 1 }); // the rake of teeth across its face
  const hl = [.16, .3, .46, .56][level], hm = legend ? M.MAGIC : M.BODY3; // its horn, curving up and back
  m.chain([[hc[0] + .08, hc[1] + .04, 0, .06], [hc[0] + .16, hc[1] + .04 + hl * .55, 0, .042], [hc[0] + .1, hc[1] + .04 + hl, 0, .016]], hm, { group: 8 });
  eyesOn(m, hc, [.1, .08, .18], [[.4, .3, .85], [.4, .3, -.85]], .03, legend ? M.MAGIC2 : M.EYE, 9);
  m.anchors.head = { c: hc, r: [.1, .08, .18], top: [hc[0], hc[1] + .08, 0] };
  if (has("sunBall")) m.ell([hc[0] + .62, .26, 0], [.25, .25, .25], M.GLOW, { group: 10, extra: true, paint: p => spotty(p, 14, .25) ? M.BELLY : undefined }); // the sun it rolls
  if (has("crystals")) crystals3d(m, [[[-.3, .62, .1], .3], [[-.05, .66, -.08], .42], [[.15, .58, .1], .32]]);
  return finish(m, S, level, st, .55, facing);
}

// The snail: its foot, eye stalks and shell. Its genome levels shape it (each level its own design: docs/art-guide/EVOLUTIONS.md):
// body.shell { turns, cone (0 a flat spiral seen side on, 1+ raised into a tower), r (its mouth's whorl radius), ridge (a ridge on
// each whorl), bands (stripes per turn, amber and umber), pale (a baby's near-clear shell), glow (its mouth glowing amber),
// buttress (props down to the ground), mud (caked at its base), trees (tiny trees and fungi on its whorls) }, body.stalks (eye stalk
// length), body.mantle (a frill round its foot), body.sheen (a slime highlight). Without levels, as it was.
export function snail3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), g = frame ? .04 : 0, q = { ...S.q, ...(S.levelQ?.[level] || {}) }, sh = q.shell;
  const skin = sh ? (sh.pale ? M.SKIN : sh.stars ? M.STONE : M.BELLY) : M.SKIN, stalk = q.stalks ?? 1; // (the elder's: old grey skin)
  m.ell([0, .07, 0], [.6 + g, .07, .17], skin, { group: 1 });
  m.chain([[.45 + g, .08, 0, .1], [.6 + g, .25, 0, .09], [.68 + g, .28, 0, .08]], skin, { group: 1 });
  const tipOf = side => [.7 + g + .08 * stalk, .32 + .23 * stalk, side * (.04 + .06 * stalk)];
  for (const side of [-1, 1]) { const t = tipOf(side); m.seg([.7 + g, .32, side * .04], t, .018 * Math.max(1, stalk * .8), .014 * Math.max(1, stalk * .7), skin, { group: 5 }); m.ell(t, [.03, .03, .03].map(v => v * Math.max(1, stalk * .75)), legend || q.eyeGlow ? M.MAGIC2 : M.EYE, { group: 5 }); }
  m.anchors.head = { c: [.68 + g, .3, 0], r: [.09, .08, .09], top: [.66 + g, .38, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(tipOf), size: .03 * Math.max(1, stalk * .75) };
  m.anchors.neck = { c: [.55 + g, .17, 0], r: .1, dir: [1, 1.2, 0] };
  if (q.mantle) for (let i = 0; i < 9; i++) { const x = -.45 + i * .11, w = Math.sin(i * 1.9) * .015; for (const side of [-1, 1]) m.ell([x + g * (i / 9), .06 + w, side * .19], [.07, .025, .05], M.BELLY, { group: 1, dir: [1, 0, side * .3] }); } // a broad frill
  if (q.sheen) m.seg([-.45, .13, .1], [.55 + g, .14, .1], .012, .01, M.WEB, { group: 2, extra: true }); // the slime's one pale highlight
  if (!sh) { // its old shell
    const c = [-.12, .4, 0], shell = legend ? M.MAGIC : M.BODY;
    m.ell(c, [.32, .32, .22], shell, { group: 3, paint: p => { const a = Math.atan2(p[1] - c[1], p[0] - c[0]), rr = Math.hypot(p[0] - c[0], p[1] - c[1]) / .32, k = ((rr - a / (Math.PI * 2) * .3) % .3 + .3) % .3; return k < .06 ? (legend ? M.MAGIC2 : M.BODY3) : undefined; } });
    return finish(m, S, level, st, .45, facing);
  }
  // the shell: a tube winding inward round its axis, from its mouth (low, at the front) to its apex; the axis lies across (a flat
  // spiral, seen side on) or tilts up into a tower by `cone`
  const turns = sh.turns ?? 2, cone = sh.cone ?? 0, R0 = sh.r ?? .3, n = Math.round(turns * 14), base = [-.1, .08 + R0 * .9, 0];
  const ax = v3.norm([-.15 * cone, cone, 1 - Math.min(1, cone) * .85]), e1 = v3.norm(v3.cross(ax, [0, 0, 1]).some(v => Math.abs(v) > 1e-3) ? v3.cross(ax, [0, 0, 1]) : [1, 0, 0]), e2 = v3.cross(ax, e1);
  const bandMat = k => sh.pale ? M.SKIN : sh.bands && Math.floor(k * sh.bands) % 2 ? M.BODY3 : M.BODY;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n, a = -Math.PI * .6 + u * turns * Math.PI * 2, R = R0 * Math.pow(1 - u * .82, 1.1), h = cone * R0 * 2.4 * u;
    const p = v3.add(v3.add(base, v3.mul(ax, h)), v3.add(v3.mul(e1, Math.cos(a) * R * .55), v3.mul(e2, Math.sin(a) * R * .55)));
    pts.push([...p, R * (sh.stars ? .44 : .5) + .015, u, v3.add(base, v3.mul(ax, h))]); // (and its axis point there)
  }
  // the elder (the elder brief): stars: the elder's shell, dark as the night sky and full of stars, its growth lines the epochs it's lived
  const starPaint = i => p => { if (i % 4 === 0 && Math.hypot(...v3.sub(p, pts[i].slice(0, 3))) < pts[i][3] * .45) return M.NIGHT2; if (spotty(p, 70, .05)) return M.GLINT; if (spotty(p, 47, .014)) return M.MAGIC2; return spotty(p, 24, .12) ? M.NIGHT2 : undefined; };
  for (let i = 0; i < n; i++) m.seg(pts[i].slice(0, 3), pts[i + 1].slice(0, 3), pts[i][3], pts[i + 1][3], sh.stars ? M.NIGHT : bandMat(pts[i][4] * turns), { group: 3, paint: sh.stars ? starPaint(i) : undefined });
  if (sh.stars) { const C = v3.norm([.49, .5, .72]), line = []; for (let i = 1; i <= n; i++) { const p = pts[i], c0 = p.slice(0, 3), t = v3.norm(v3.sub(pts[Math.min(n, i + 1)].slice(0, 3), pts[i - 1].slice(0, 3))), o0 = v3.norm(v3.sub(c0, p[5])), out = v3.norm(v3.sub(o0, v3.mul(t, v3.dot(o0, t)))); let q = v3.add(c0, v3.mul(out, p[3] * .8)), k = 0; while (k < 1.5 && m.field(q) < 0) { q = v3.add(q, v3.mul(C, .005)); k += .005; } line.push([...q, .04]); } m.chain(line, M.WOOD, { group: 152, extra: true }); } // a gold line inlaid along its whorl's crest, so its spiral reads on the dark
  if (sh.chipped) for (const [a, k] of [[.4, .5], [2.1, .4], [3.6, .45]]) { const p0 = pts[0], d = [Math.cos(a) * .4, Math.sin(a), .7]; m.ell(v3.add(p0.slice(0, 3), v3.mul(v3.norm(d), p0[3] * .95)), [p0[3] * k, p0[3] * k * .7, p0[3] * k], M.NIGHT2, { group: 3, cut: true }); } // its lip chipped and worn
  if (sh.runes) for (let i = 4; i < n * .8; i += 5) { // spiral runes carved along its whorl, glowing faintly (moonlit)
    const p = pts[i], ax = p[5], out = v3.norm(v3.add(v3.norm(v3.sub(p.slice(0, 3), ax)), [.2, .2, .9])), f = v3.add(p.slice(0, 3), v3.mul(out, p[3] * .95)), t = v3.norm(v3.sub(pts[i + 1].slice(0, 3), p.slice(0, 3))), up = v3.norm(v3.cross(out, t)), w = p[3] * .5, o = { group: 150 + i % 2, extra: true }, R = (a, b) => v3.add(f, v3.add(v3.mul(t, a * w), v3.mul(up, b * w)));
    const k = i % 3; m.seg(R(0, -.6), R(0, .6), w * .14, w * .14, M.RUNE, o); m.seg(R(0, k ? .1 : -.2), R(.55, k === 2 ? -.35 : .5), w * .12, w * .12, M.RUNE, o); m.seg(R(0, -.1), R(-.55, k === 1 ? .5 : -.45), w * .12, w * .12, M.RUNE, o); }
  if (sh.ridge) for (let w = 1; w < turns; w++) { const i = Math.round(w / turns * n), p = pts[i]; m.ell(p.slice(0, 3), [p[3] * 1.12, p[3] * 1.12, p[3] * 1.12], M.BODY3, { group: 3 }); } // a ridge on each whorl
  const mouth = pts[0].slice(0, 3);
  if (sh.glow) m.ell(v3.add(mouth, [.04, -.02, pts[0][3] * .75]), [pts[0][3] * .75, pts[0][3] * .85, pts[0][3] * .4], M.GLOW, { group: 4, extra: true }); // amber light from its mouth
  if (sh.buttress) for (const [k, side] of [[.25, 1], [.5, -1], [.7, 1], [.4, -1]]) { const p = pts[Math.round(k * n)]; m.seg(p.slice(0, 3), [p[0] - .15 + k * .2, .02, side * (.22 + k * .1)], p[3] * .45, p[3] * .7, M.BODY3, { group: 3, paint: p2 => p2[1] < .12 ? M.MOSS : undefined }); } // stone-like props down to the ground
  if (sh.mud) m.ell([base[0], .08, 0], [R0 * 1.25, .09, R0 * .9], M.BODY3, { group: 6, extra: true, rough: .02, paint: p => spotty(p, 18, .3) ? M.MOSS : spotty(p, 25, .15) ? M.TRUNK : undefined }); // mud and roots caked at its base
  if (sh.trees) for (let t = 0; t < sh.trees; t++) { // tiny trees and fungi on its whorls
    const p = pts[Math.round((.25 + .65 * t / Math.max(1, sh.trees - 1)) * n * .95)], out = v3.norm(v3.add(v3.norm(v3.sub(p.slice(0, 3), p[5])), [0, .6, .5])), top = v3.add(p.slice(0, 3), v3.mul(out, p[3] * .85)); // on the whorl's outer face, up and towards us
    if (t % 3 === 2) { m.seg(top, v3.add(top, [0, .07, 0]), .016, .016, M.WEB, { group: 7, extra: true }); m.ell(v3.add(top, [0, .08, 0]), [.055, .028, .055], M.SKIN, { group: 7, extra: true }); continue; } // a fungus
    const h = .16 + .06 * (t % 2); m.seg(top, v3.add(top, [0, h, 0]), .016, .01, M.TRUNK, { group: 8, extra: true }); m.ell(v3.add(top, [0, h + .05, 0]), [.075, .09, .075], t % 2 ? M.LEAF : M.LEAF2, { group: 8, extra: true, rough: .008 });
  }
  return finish(m, S, level, st, .45, facing);
}

// The woodlouse: its legs, feelers and plated back. Its genome levels shape it (docs/art-guide/EVOLUTIONS.md): body.plates (how many),
// rim (each plate's back edge a raised pale rim), pale (a baby's near-white shell), feelers (their length), jointed (feelers in
// segments), tailSpikes, flecks (pale flecks on the rims only), shields (a legend's plates grown into overlapping shields with spiked
// edges), crystals (moonstones along its spine), leaves (dry leaves caught in its plates). Without levels, as it was.
export function woodlouse3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), q = { ...S.q, ...(S.levelQ?.[level] || {}) };
  for (const side of [-1, 1]) for (let i = 0; i < 7; i++) { const x = -.45 + i * .15, ph = (i + frame) % 2 ? .03 : -.03; m.seg([x, .1, side * .22], [x + ph, .01, side * .33], .025, .015, M.BODY3, { group: side > 0 ? 7 : 2 }); }
  if (!q.plates) {
    for (const side of [-1, 1]) m.chain([[.5, .15, side * .08, .02], [.7, .3, side * .2, .015], [.82, .22, side * .26, .012]], M.BODY3, { group: 9, extra: true });
    m.ell([0, .18, 0], [.58, .2, .3], M.BODY, { paint: p => ((Math.floor((p[0] + .6) * 9) % 2) && p[1] > .2 ? M.BODY2 : undefined) || (Math.abs(((p[0] + .6) * 9) % 1) < .12 ? M.LINE : undefined) });
    eyesOn(m, [0, .18, 0], [.58, .2, .3], [[.92, .3, .25], [.92, .3, -.25]], .02, legend ? M.MAGIC2 : M.EYE);
    if (legend) crystals3d(m, [[[-.3, .32, .05], .3], [[0, .37, -.05], .45], [[.25, .32, .05], .32]]);
    return finish(m, S, level, st, .4, facing);
  }
  const n = q.plates, shell = q.pale ? M.BELLY : M.BODY, rimMat = q.pale ? M.BELLY : M.ACCENT, fl = q.feelers ?? 1;
  // feelers: from its head, out and forward, jointed (a chain of segments with knuckles) or plain
  for (const side of [-1, 1]) {
    const pts = []; for (let k = 0; k <= 4; k++) { const t = k / 4, wob = q.jointed ? (k % 2 ? .03 : -.02) : 0; pts.push([.5 + t * .4 * fl, .15 + Math.sin(t * Math.PI * .8) * .2 * fl + wob, side * (.08 + t * .22 * fl), .02 - t * .012]); }
    m.chain(pts, M.BODY3, { group: 9, extra: true });
    if (q.jointed) pts.slice(1, -1).forEach(p => m.ell(p.slice(0, 3), [.018, .018, .018], M.BODY3, { group: 9, extra: true }));
  }
  m.ell([0, .16, 0], [.56, .17, .29], shell, { group: 1 }); // its underbody
  // the plates, front to back: each a slice of the dome, its back edge a raised rim; a legend's grown into spiked shields
  for (let i = 0; i < n; i++) {
    const t = (i + .5) / n, x = .5 - t * 1.05, prof = Math.sqrt(Math.max(.05, 1 - Math.pow((x - .02) / .6, 2))), w = 1.05 / n;
    const sh = q.shields ? 1.18 : 1, hk = q.house ? 1.75 : 1, c = [x, .19 + (q.shields ? .02 : 0), 0], r = [w * .62 * sh, .2 * prof * sh * hk, .31 * prof * sh];
    m.ell(c, r, shell, { group: 1, dir: [1, q.shields ? -.15 : 0, 0], paint: p => q.house && p[1] > c[1] + r[1] * .6 && spotty(p, 30, .35) ? M.MOSS : q.house && Math.abs(((Math.atan2(p[1] - c[1], p[2]) * 5 + (i % 2) * .5) % 1 + 1) % 1 - .5) < .08 ? M.BODY3 : q.flecks && p[0] < x - w * .3 && spotty(p, 40, .35) ? M.BELLY : undefined }); // (a house: its dome rolled up high, its plates laid in courses like roof tiles)
    if (q.rim) m.ell(v3.add(c, [-w * .45, .01, 0]), [w * .16, r[1] * 1.04 + .01, r[2] * 1.04 + .01], q.flecks ? rimMat : rimMat, { group: 2, paint: p => q.flecks && spotty(p, 50, .4) ? M.BELLY : undefined });
    if (q.shields) for (const side of [-1, 1]) m.seg(v3.add(c, [0, -.02, side * r[2] * .9]), v3.add(c, [-w * .3, -.08, side * (r[2] + .17)]), .04, .004, M.BODY3, { group: 3, extra: true }); // spiked edges
    if (q.crystals && i % 2 === 1) { const b = v3.add(c, [0, r[1] * .8, 0]), tip = v3.add(b, [-.04, .26 + (i % 4 ? .06 : 0), (i % 4 - 1.5) * .04]); m.seg(b, tip, .055, .006, M.RUNE, { group: 80 + i, extra: true }); m.seg(v3.add(b, [.02, 0, .05]), v3.add(b, [.06, .14, .1]), .03, .004, M.MAGIC2, { group: 80 + i, extra: true }); } // a moonstone, pointed, with a smaller one beside it
    if (q.leaves && i % 3 === 0) m.flat(v3.add(c, [-w * .3, r[1] * .8, (i % 2 ? 1 : -1) * r[2] * .5]), v3.norm([1, .2, 0]), v3.norm([0, .5, i % 2 ? 1 : -1]), .07, .045, (a, b) => a * a + b * b * 1.6 < 1 ? (Math.abs(b) < .12 ? M.TRUNK : M.ACCENT) : null, { group: 90 + i, extra: true }); // a dry leaf caught in its plates
  }
  if (q.tailSpikes) for (const side of [-1, 1]) m.seg([-.55, .12, side * .08], [-.75, .08, side * .14], .03, .006, M.BODY3, { group: 4, extra: true });
  if (q.house) { // (the legend audit's ★, Ed 2026-10-13) a little house: an arched door and a cross-barred window glowing in its near side
    const Z = .44;
    m.flat([.02, .24, Z], [1, 0, 0], [0, 1, 0], .11, .15, (a, b) => { const inside = b < .3 ? Math.abs(a) < .8 : Math.hypot(a, (b - .3) * 1.1) < .8; if (!inside) return Math.abs(a) < 1 && (b < .3 || Math.hypot(a, (b - .3) * 1.1) < 1) ? M.BODY3 : null; return Math.abs(a - .35) < .1 && Math.abs(b + .1) < .1 ? M.BODY2 : M.MAGIC2; }, { group: 170, extra: true, bend: .3 });
    m.flat([.28, .36, Z - .06], [1, 0, -.3], [0, 1, 0], .07, .07, (a, b) => Math.max(Math.abs(a), Math.abs(b)) > 1 ? null : Math.max(Math.abs(a), Math.abs(b)) > .72 || Math.abs(a) < .12 || Math.abs(b) < .12 ? M.BODY3 : M.MAGIC2, { group: 171, extra: true, bend: .2 });
    m.flat([-.26, .38, Z - .06], [1, 0, .3], [0, 1, 0], .07, .07, (a, b) => Math.max(Math.abs(a), Math.abs(b)) > 1 ? null : Math.max(Math.abs(a), Math.abs(b)) > .72 || Math.abs(a) < .12 || Math.abs(b) < .12 ? M.BODY3 : M.MAGIC2, { group: 172, extra: true, bend: .2 });
  }
  const hc = [.58, .15, 0], hr = [.12, .1, .17]; m.ell(hc, hr, M.BODY2, { group: 1 }); // its head, in front of the plates
  m.anchors.head = { c: hc, r: hr, top: [.3, .58, 0] }; // (its top: a party hat sits on its front plate, above its head)
  eyesOn(m, hc, hr, [[.8, .45, .45], [.8, .45, -.45]], .026, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .4, facing);
}

export function snake3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, baby = level === 0, young = level === 1, has = f => legend && S.legend.includes(f), m = new Model(), ph = frame ? .7 : 0, pts = [];
  const Py = S.look?.python, girth = [.9, .82, 1, 1][level] * (Py ? 1.3 : 1), rise = [1, .85, 1.15, 1.15][level]; // (the young a slim whip, the adult heavy, its head held high)
  for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([-.9 + t * 1.2, .07, Math.sin(t * Math.PI * 2 + ph) * .25 * (1 - t * .5), (.03 + .045 * Math.sin(Math.min(1, t * 1.4) * Math.PI / 2)) * girth]); }
  pts.push([.38, .07 + .18 * rise, pts[12][2], .07 * girth], [.42, .07 + .38 * rise, pts[12][2] * .8, .065 * girth]);
  // (Ed's review, 2026-10-13: "the baby and young are copies") its pattern comes in with age: the hatchling plain, the young
  // faintly spotted, the adult's spots and dark bands across its back; and the hatchling's head big for its body
  const spots = Py ? 0 : baby ? 0 : young ? .15 : .3, bands = !Py && level >= 2, flecks = Py && !baby; // (the jungle python's: plain emerald with white flecks along its spine, no bands)
  m.chain(pts, M.BODY, { paint: p => flecks && p[1] > .07 + .07 * girth && spotty([p[0] * 1.6, p[1], p[2]], 26, young ? .14 : .22) && !(has("shed") && Math.abs(Math.sin(p[0] * 19 + p[2] * 9)) < .05) ? M.BELLY : has("shed") && Math.abs(Math.sin(p[0] * 19 + p[2] * 9)) < .05 && p[1] > .06 ? M.BELLY : p[1] < .05 && p[0] < .35 ? M.BELLY : (bands && p[1] > .07 && Math.sin(p[0] * 26) > .72) || (spots && spotty([p[0] * 1.5, p[1], p[2]], 14, spots)) ? M.BODY3 : undefined });
  const hc = [.5, .07 + .43 * rise, pts[13][2] * .8], hr = baby ? .13 : young ? .105 : .09;
  m.rig = { spine: pts.map(p => p.slice()), head: hc, hr }; // the live rig's spine (tail to head, each [x, y, z, radius]) and head, in model units
  m.part = "head";
  const HR = [hr * 1.5, hr * .75, hr * (Py ? 1.25 : 1)]; // (a python's broad head)
  m.ell(hc, HR, M.BODY, { dir: [1, -.15, 0], group: 1 });
  eyesOn(m, hc, HR, [[.5, .5, .7], [.5, .5, -.7]], hr * .22, legend ? M.MAGIC2 : M.EYE);
  if (!frame) m.seg(v3.add(hc, [hr * 1.4, -hr * .2, 0]), v3.add(hc, [hr * 2.3, -hr * .3, 0]), .01, .008, M.SKIN, { group: 1 });
  m.anchors.feet.push({ c: v3.add(pts[0].slice(0, 3), [-.02, -.01, 0]), r: .06, group: 3, tail: true }); // no feet: a tiny shoe on the tail tip
  m.anchors.neck = { c: [.42, .36, pts[12][2] * .9], r: .075, dir: [.2, 1, 0] };
  m.part = "body";
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [0, .2, side * .05], side, .9, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("shed")) { // (the legend audit's ★, Ed 2026-10-13) its shed skin: a ghostly glowing copy of itself sliding off its tail, scaled in a lattice
    const skin = []; for (let i = 0; i <= 10; i++) { const t = i / 10; skin.push([-1.8 + t * .86, .035, Math.sin(t * Math.PI * 1.6 + ph + 2.2) * .2 + .12 * (1 - t), .02 + .022 * t]); }
    skin.push([pts[0][0] - .02, .04, pts[0][2] + .04, .03]); // (still caught on its tail tip)
    m.chain(skin, M.MAGIC, { group: 60, extra: true, paint: p => (Math.floor(p[0] * 26 + p[2] * 26) + Math.floor(p[0] * 26 - p[2] * 26)) % 2 ? M.MAGIC2 : undefined });
    m.ell([skin[0][0] - .03, .06, skin[0][2]], [.08, .04, .05], M.MAGIC2, { group: 60, extra: true }); // its empty head, mouth open
  }
  return finish(m, S, level, st, .45, facing);
}

// The rattlesnake (Ed, 2026-10-13: the badlands' cactus desert, unknown-21): a desert sidewinder, sandy with dark diamonds down its
// back, a broad wedge of a head, its tail held up off the sand ending in the rattle (a stack of pale buttons, levelQ rattle: how many),
// shaken between its two frames, the body throwing its S the other way. Its legend its own traits outsized (Ed: a legend "emphasises
// the thing that makes that creature unusual"): great coils stacked under its raised head (levelQ coil) and a colossal rattle held
// high, its shake rippling out through the sand in rings (feature ripple); the elder of its kind (Ed, docs/ART-GUIDE.md §0c): the
// sidewinder's horns over its eyes grown great (feature horns), its scales scarred by epochs.
/** Its warning (the genome's idle "rattle", IDLE_BUILDERS in art/creatures.js): still, its rattle raised and shaking between the frames. */
export const rattle3d = (S, level, frame, st, facing) => { RATTLING = true; try { return rattlesnake3d(S, level, frame, st, facing); } finally { RATTLING = false; } };
let RATTLING = false;
export function rattlesnake3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), q = S.levelQ?.[level] || {};
  const ph = frame && !RATTLING ? Math.PI : 0, th = q.thick ?? 1, coil = q.coil ?? 0, nR = q.rattle ?? 3, pts = [];
  const r0 = .055 * th, diamonds = p => { const u = Math.abs(((p[0] * 7 + p[2] * 7) % 1 + 1) % 1 - .5) + Math.abs(((p[0] * 7 - p[2] * 7) % 1 + 1) % 1 - .5); return p[1] > .05 * th && u < .32 ? M.BODY3 : undefined; };
  if (coil) { // the legend's coils: three turns stacked, rising, under its raised neck
    for (let i = 0; i <= 30; i++) { const t = i / 30, a = t * Math.PI * 2 * 2.6, R = (.55 - t * .25) * coil; pts.push([Math.cos(a) * R - .1, r0 + t * .32 * coil, Math.sin(a) * R * .8, r0 * (1.15 - t * .2)]); }
  } else { // sidewinding: an S across the sand, thrown the other way each frame
    for (let i = 0; i <= 14; i++) { const t = i / 14; pts.push([-.85 + t * 1.15, r0 * .9, Math.sin(t * Math.PI * 2 + ph) * .2 * (1 - t * .4), r0 * (.55 + .45 * Math.sin(Math.min(1, t * 1.3) * Math.PI / 2))]); }
  }
  const last = pts[pts.length - 1], neckTop = [last[0] + .12, last[1] + .26 * th + (coil ? .2 : 0), last[2] * .6];
  pts.push([last[0] + .1, last[1] + .12 * th, last[2] * .8, r0 * .9], [...neckTop, r0 * .85]);
  const scarred = p => has("horns") && Math.abs(Math.sin(p[0] * 23 + p[2] * 31)) < .05 ? M.BELLY : undefined;
  m.chain(pts, M.BODY, { paint: p => p[1] < r0 * .5 ? M.BELLY : scarred(p) ?? diamonds(p) });
  // the rattle: the tail's end lifted, a stack of buttons pointing up and back, shaken (tilted the other way) between frames
  const sh = RATTLING ? (frame ? 1 : -1) : 0, tail = pts[0], up = [-.45 + sh * .08, 1, sh * .25], rk = has("rattleBig") ? 1.9 : 1;
  let b = v3.add(tail.slice(0, 3), [-.02, .02, 0]);
  for (let i = 0; i < nR; i++) { const w = r0 * .9 * rk * (1 - i * .04); m.ell(b, [w * .9, w * .55, w * .8], i % 2 ? M.BELLY : M.ACCENT, { dir: up, group: 12, paint: p => p[1] > b[1] + w * .3 ? M.BODYL : undefined }); b = v3.add(b, v3.mul(v3.norm(up), w * 1.05)); }
  if (has("ripple") && RATTLING && frame) for (const R of [.5, .8, 1.1]) m.ell([tail[0] - .05, .004, tail[2]], [R * rk * .6, .004, R * rk * .45], M.LINE, { group: 0, paint: p => Math.hypot((p[0] - tail[0] + .05) / (R * rk * .6), (p[2] - tail[2]) / (R * rk * .45)) > .9 ? M.LINE : null }); // its shake through the sand
  // the head: a broad flat wedge, heat pits, eyes under a brow, a forked tongue out on one frame
  const hr = .085 * th, hc = v3.add(neckTop, [hr * 1.1, hr * .2, 0]);
  m.ell(hc, [hr * 1.5, hr * .65, hr * 1.1], M.BODY, { dir: [1, -.2, 0], group: 1, paint: p => p[1] > hc[1] + hr * .3 ? M.BODY2 : undefined });
  eyesOn(m, hc, [hr * 1.5, hr * .65, hr * 1.1], [[.45, .55, .7], [.45, .55, -.7]], hr * .2, legend ? M.MAGIC2 : M.EYE);
  if (has("horns")) for (const sd of [-1, 1]) m.chain([[...v3.add(hc, [hr * .3, hr * .5, sd * hr * .6]), hr * .22], [...v3.add(hc, [hr * .1, hr * 1.2, sd * hr * .8]), hr * .12], [...v3.add(hc, [-hr * .4, hr * 1.7, sd * hr * .7]), hr * .02]], M.BELLY, { group: 1 }); // the elder's horns
  if (!frame) for (const s2 of [-1, 1]) m.seg(v3.add(hc, [hr * 1.4, -hr * .25, 0]), v3.add(hc, [hr * 2.3, -hr * .35, s2 * hr * .25]), .008, .006, M.SKIN, { group: 1 });
  m.anchors.feet.push({ c: v3.add(tail.slice(0, 3), [.04, -.01, 0]), r: .06, group: 3, tail: true }); // no feet: a tiny shoe on its tail
  m.anchors.neck = { c: v3.lerp(pts[pts.length - 2].slice(0, 3), neckTop, .5), r: r0 * 1.2, dir: [.2, 1, 0] };
  return finish(m, S, level, st, .5, facing);
}

// The scorpion (Ed, 2026-10-13: the badlands' red rock canyon, unknown-22; "raised curled sting and pincers"): a flat plated body low
// on eight legs, two great pincers reaching ahead, its tail of five segments arched up over its back and curling forward to the
// bulb and sting. Its levels (levelQ: tail and pincer sizes): the baby pale and short-tailed, the adult dark with heavy pincers; the
// legend its own traits outsized (Ed: a legend "emphasises the thing that makes that creature unusual"): a colossal curled tail and
// sting (levelQ tail) and the scorpion's own trick, glowing blue-green under the moon along every plate's edge (feature fluoresce);
// the elder of its kind (Ed, docs/ART-GUIDE.md §0c): its armour scarred by epochs, its young riding on its back as scorpions carry
// them (feature brood), a mother of all scorpions.
export function scorpion3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), q = S.levelQ?.[level] || {};
  const tk = q.tail ?? 1, pk = q.pincer ?? 1, glowEdge = has("fluoresce"), y = .14;
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, kneed up, stepping in alternate sets
    const x = .12 - i * .12, ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .04 : -.04, base = [x, y, side * .1];
    m.chain([[...base, .022], [x + ph + (1.5 - i) * .05, y + .1, side * .3, .018], [x + ph * 1.5 + (1.5 - i) * .1, .01, side * .42, .01]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  // the body: a head shield and seven plates, each edged (the legend's edges glowing)
  const edge = (c, r) => p => p[0] < c[0] - r[0] * .7 ? (glowEdge ? M.MAGIC : M.BODY3) : glowEdge && Math.abs(Math.sin(p[0] * 47 + p[2] * 19)) < .05 ? M.BELLY : undefined; // (each plate's back edge: a dark seam, the legend's glowing; an elder's plates scarred)
  m.ell([.16, y + .03, 0], [.12, .05, .11], M.BODY, { group: 1, paint: edge([.16, y + .03, 0], [.12, .05, .11]) });
  for (let i = 0; i < 7; i++) { const c = [.04 - i * .065, y + .035, 0], r = [.045, .05, .12 - i * .004]; m.ell(c, r, i % 2 ? M.BODY2 : M.BODY, { group: 3, paint: edge(c, r) }); }
  // the tail: five segments arching up over the back and forward, then the bulb and the curved sting
  const r0 = [-.4, y + .04], K = [[0, 0], [-.12, .2], [-.08, .42], [.08, .55], [.24, .52], [.32, .42]]; // (up from its rear, back, over and forward)
  const T = K.map(([dx, dy]) => [r0[0] + dx * tk, r0[1] + dy * tk, 0]);
  for (let i = 0; i < 5; i++) m.seg(T[i], T[i + 1], (.042 - i * .003) * Math.sqrt(tk), (.04 - i * .003) * Math.sqrt(tk), i % 2 ? M.BODY2 : M.BODY, { group: 4, paint: glowEdge ? p => (Math.hypot(p[0] - T[i + 1][0], p[1] - T[i + 1][1]) < .02 * tk ? M.MAGIC : undefined) : undefined });
  const bulb = v3.add(T[5], [.02 * tk, -.03 * tk, 0]);
  m.ell(bulb, [.05 * tk, .04 * tk, .04 * tk], M.ACCENT, { group: 4 });
  m.chain([[...v3.add(bulb, [.03 * tk, -.03 * tk, 0]), .018 * tk], [...v3.add(bulb, [.05 * tk, -.09 * tk, 0]), .01 * tk], [...v3.add(bulb, [.02 * tk, -.13 * tk, 0]), .003]], M.BODY3, { group: 4 }); // the sting, curving down
  // the pincers: an arm forward each side, a broad claw and its two fingers
  for (const side of [-1, 1]) {
    const sh = [.24, y + .03, side * .07], el = [.36, y + .08, side * .2 * pk], hand = [.5 + .06 * pk, y + .06, side * .2 * pk];
    m.chain([[...sh, .025], [...el, .03 * pk], [...hand, .035 * pk]], M.BODY2, { group: side > 0 ? 6 : 5 });
    m.ell(hand, [.08 * pk, .045 * pk, .055 * pk], M.BODY, { group: side > 0 ? 6 : 5, dir: [1, 0, -side * .3] }); // (Ed: its glow at the seams only)
    for (const dz of [.02, -.02]) m.chain([[...v3.add(hand, [.06 * pk, 0, side * dz * pk]), .025 * pk], [...v3.add(hand, [.15 * pk, 0, side * (dz * 2.2 - .02) * pk]), .004]], M.BODY3, { group: side > 0 ? 6 : 5 });
  }
  const hc = [.24, y + .06, 0];
  eyesOn(m, hc, [.06, .03, .06], [[.2, 1, .25], [.2, 1, -.25]], .016, legend ? M.MAGIC2 : M.EYE);
  if (has("brood")) for (let i = 0; i < 7; i++) { // its young riding on its back, pale, each a tiny body and tail curled up
    const c = [.12 - i * .075, y + .12, ((i % 3) - 1) * .07], k = .9 + (i % 2) * .2;
    m.ell(c, [.04 * k, .02 * k, .03 * k], M.BELLY, { group: 30 + i });
    m.seg(v3.add(c, [-.035 * k, .01, 0]), v3.add(c, [-.04 * k, .05 * k, 0]), .01 * k, .006 * k, M.BELLY, { group: 30 + i });
  }
  m.anchors.neck = { c: [.2, y + .05, 0], r: .1, dir: [1, 0, 0] };
  return finish(m, S, level, st, .45, facing);
}

// The hydra (Ed's magical outer islands, phase 4: unknown-25's): a many-headed swamp serpent. A thick body coiled low in the
// black water, its heads by level (a hatchling's one, then 3, 5, the legend's 7), each on its own long neck fanned out and up,
// swaying in turn, every head a serpent's in three-quarter view: a long snout, a jaw line (some open, fangs showing), a glinting
// eye. Its legend (Ed's brief, ART-GUIDE §0c: the elder of its kind; "emphasise the thing that makes that creature unusual"):
// the most heads, and two necks cut short long ago, in front, each sprouting two new heads (heads that regrow), bronze offering
// rings high on its necks, old scars. S.hydra: { heads: [per level], crest: true (a draconic crest of spines and frills) }.
// The feathered serpent (Ed, 2026-10-23: the jungle's fantastic kind, unknown-27's slot, ring 5; "the serpent template plus feathers,
// in bright plumage"): an emerald serpent, gold-bellied, its front raised in an S, a ruff of long scarlet, gold and turquoise feathers
// fanned round its neck, a crest of plumes off the back of its head and long streamers off its tail. Its levels (levelQ): thick (its
// girth), rise (how high its neck stands), ruff (the ruff's feathers' length, 0 none), plumes (tail streamers), crest (head plumes),
// wings (feathered wings off its back: 0 none, their size), glow (its feathers' tips burning in its magic: the legend's).
export function quetzal3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), q = S.levelQ?.[level] || {}, ph = frame ? .7 : 0, flut = frame ? .06 : 0, pts = [];
  const th = q.thick ?? 1, rise = q.rise ?? 1, r0 = .05 * th, tipMat = q.glow ? M.MAGIC : M.ACCENT, PLUME = [M.FLOWER, M.BODY2, M.ACCENT, M.FLOWER, M.MAGIC2];
  for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([-.7 + t * 1.0, r0 * .9, Math.sin(t * Math.PI * 2 + ph) * .26 * (1 - t * .5), r0 * (.35 + .65 * Math.sin(Math.min(1, t * 1.3) * Math.PI / 2))]); }
  const last = pts[12], neck = [last[0] + .1, last[1] + .26 * rise, last[2] * .7], top = [last[0] + .2, last[1] + .5 * rise, last[2] * .5];
  pts.push([...neck, r0 * .95], [...top, r0 * .85]);
  m.chain(pts, M.BODY, { paint: p => p[1] < r0 * .45 ? M.BELLY : Math.abs(((p[0] * 9 + Math.abs(p[2]) * 6) % 1 + 1) % 1 - .5) < .1 && p[1] > r0 * .7 ? M.BODY3 : undefined }); // emerald, its belly gold, dark chevrons down its back
  const feather = (root, dir, len, w, mat, group, tip = tipMat) => { const d = v3.norm(dir), end = v3.add(root, v3.mul(d, len)), mid = v3.add(v3.lerp(root, end, .5), [0, len * .06, 0]); m.chain([[...root, w * .6], [...mid, w], [...end, w * .25]], mat, { group, extra: true, paint: p => v3.dot(v3.sub(p, root), d) > len * .7 ? tip : undefined }); };
  // the ruff: feathers fanned round its neck, below its head, all round but underneath, swept a little back
  const N = v3.lerp(neck, top, .55), rf = q.ruff ?? 1, nR = Math.round(10 + rf * 8);
  if (rf > 0) for (let i = 0; i < nR; i++) { const a = -2.5 + 5 * i / (nR - 1), dir = [-.45 - flut, Math.cos(a) + .15, Math.sin(a) * 1.1]; feather(N, dir, (.16 + .1 * (i % 2)) * rf, .022 * Math.max(.7, rf), PLUME[i % 3], 30 + (Math.sin(a) > 0 ? 1 : 0)); }
  // the head: a broad serpent's head, a hooked snout, eyes under a brow, a forked tongue out on one frame
  const hr = .085 * Math.max(.9, th * .95), hc = v3.add(top, [hr * 1.1, hr * .25, 0]);
  m.part = "head";
  m.ell(hc, [hr * 1.45, hr * .72, hr * 1.05], M.BODY, { dir: [1, -.2, 0], group: 1, paint: p => p[1] < hc[1] - hr * .3 ? M.BELLY : undefined });
  m.ell(v3.add(hc, [hr * 1.15, -hr * .12, 0]), [hr * .55, hr * .36, hr * .55], M.ACCENT, { group: 1 }); // its snout, gold like a beak
  eyesOn(m, hc, [hr * 1.45, hr * .72, hr * 1.05], [[.45, .55, .7], [.45, .55, -.7]], hr * .2, legend ? M.MAGIC2 : M.EYE);
  if (!frame) for (const s2 of [-1, 1]) m.seg(v3.add(hc, [hr * 1.5, -hr * .3, 0]), v3.add(hc, [hr * 2.3, -hr * .4, s2 * hr * .25]), .008, .006, M.SKIN, { group: 1 });
  const cr = q.crest ?? 1; for (let k = 0; k < Math.round(2 + cr * 3); k++) feather(v3.add(hc, [-hr * .5, hr * .55, (k - 2) * hr * .18]), [-.7 - k * .08 - flut, .9 - k * .12, (k - 2) * .15], (.12 + .05 * (k % 2)) * cr * (legend ? 1.6 : 1), .018, k % 2 ? M.MAGIC2 : M.FLOWER, 34);
  m.part = "body";
  // its tail's streamers: long plumes trailing back and up off its tail
  const T = pts[0], np = q.plumes ?? 2; for (let k = 0; k < np; k++) { const z = (k - (np - 1) / 2) * .05, a = [T[0] - .02, T[1], T[2] + z], b = [T[0] - .12 - k * .02, T[1] + .14 + flut, T[2] + z * 3], c = [T[0] - .22 - k * .03, T[1] + .26 - flut, T[2] + z * 5 + Math.sin(k + ph) * .04]; m.chain([[...a, .014], [...b, .02], [...c, .008]], PLUME[(k + 1) % PLUME.length], { group: 36 + (k % 2), extra: true, paint: p => p[0] < c[0] + .06 ? tipMat : undefined }); }
  // its wings: a pair of feathered wings off its back behind the ruff, flight feathers fanned up and back
  const W = q.wings ?? 0; if (W) for (const side of [-1, 1]) {
    const sh = v3.add(pts[6].slice(0, 3), [0, r0 * .8, side * r0 * .6]), wr = v3.add(sh, [-.05 * W, .32 * W + flut, side * .22 * W]);
    m.chain([[...sh, .03 * W], [...wr, .022 * W]], M.BODY, { group: 40 + (side > 0 ? 1 : 0), extra: true });
    for (let i = 0; i < 7; i++) { const t = i / 6, root = v3.lerp(wr, sh, t * .8); feather(root, [-.6 - .4 * t, .6 - .5 * t, side * .1], W * (.42 - .2 * t), .03 * W, i % 2 ? M.FLOWER : M.BODY2, 42 + (side > 0 ? 1 : 0)); }
  }
  m.anchors.feet.push({ c: v3.add(T.slice(0, 3), [-.02, -.01, 0]), r: .06, group: 3, tail: true }); // no feet: a tiny shoe on its tail tip
  m.anchors.neck = { c: v3.lerp(neck, top, .3), r: r0 * 1.2, dir: [.2, 1, 0] };
  return finish(m, S, level, st, .5, facing);
}

export function hydra3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), ph = frame ? .6 : 0, heads = (S.hydra?.heads || [1, 3, 5, 7])[level], crest = !!S.hydra?.crest, pts = [];
  for (let i = 0; i <= 10; i++) { const t = i / 10; pts.push([-.75 + t * .95, .07, Math.sin(t * Math.PI * 1.6 + ph) * .2 * (1 - t * .4), .035 + .05 * Math.sin(Math.min(1, t * 1.3) * Math.PI / 2)]); }
  m.chain(pts, M.BODY, { paint: p => p[1] < .06 ? M.BELLY : spotty([p[0] * 1.5, p[1], p[2]], 12, .28) ? M.BODY3 : undefined });
  const root = pts[10].slice(0, 3), hr = .058; const eyes = []; // every head's eyes (the face's anchors: each head shuts its eyes asleep, frowns angry)
  // a serpent's head at `at` pointing along `dir` (mostly forward and towards us, a little down): skull, long snout, lower jaw
  // (open by `open`, its mouth dark, two fangs), a glinting eye each side, a crest of spines and side frills if draconic
  const head = (at, dir, h, open, group) => {
    const d = v3.norm(dir), side = v3.norm(v3.cross(d, [0, 1, 0])), up = v3.norm(v3.cross(side, d));
    m.ell(at, [h * 1.05, h * .72, h * .8], M.BODY, { dir: d, group, paint: p => v3.dot(v3.sub(p, at), up) > h * .45 ? M.BODY3 : undefined }); // its brow darker
    const sn = v3.add(at, v3.add(v3.mul(d, h * 1.5), v3.mul(up, -h * .15)));
    m.ell(sn, [h * 1.3, h * .36, h * .5], M.BODY, { dir: d, group, paint: p => v3.dot(v3.sub(p, sn), up) < -h * .15 ? M.BELLY : undefined });
    const jd = v3.norm(v3.add(d, v3.mul(up, -open * .9))), jc = v3.add(at, v3.add(v3.mul(jd, h * 1.2), v3.mul(up, -h * .42)));
    m.ell(jc, [h * 1.1, h * .22, h * .48], M.BELLY, { dir: jd, group });
    if (open > .1) { m.ell(v3.lerp(sn, jc, .5), [h * .75, h * .2, h * .38], M.NOSE, { dir: v3.norm(v3.add(d, jd)), group });
      for (const s2 of [-1, 1]) { const f = v3.add(sn, v3.add(v3.mul(d, h * .7), v3.mul(side, s2 * h * .3))); m.seg(f, v3.add(f, v3.mul(up, -h * .35)), h * .07, h * .02, M.ACCENT, { group }); } }
    for (const s2 of [-1, 1]) { const e = v3.add(at, v3.add(v3.add(v3.mul(d, h * .35), v3.mul(up, h * .48)), v3.mul(side, s2 * h * .55)));
      m.ell(e, [h * .17, h * .13, h * .17], M.PUPIL, { group: 1 }); eyes.push(e); m.ell(v3.add(e, [h * .05, h * .06, h * .09]), [h * .055, h * .055, h * .055], M.GLINT, { group: 1 }); } // a dark slit eye, a glint in it (no glow, its legend's either: ART-GUIDE §0c)
    m.anchors.head ||= { c: at, r: [h, h * .8, h * .8] };
    if (crest) { for (let k = 0; k < 4; k++) { const b = v3.add(at, v3.add(v3.mul(d, -h * (.1 + k * .3)), v3.mul(up, h * .7))); m.chain([[...b, h * .16], [...v3.add(b, v3.add(v3.mul(up, h * (1.2 - k * .15)), v3.mul(d, -h * .6))), h * .02]], M.BODY3, { group, extra: true }); }
      for (const s2 of [-1, 1]) m.flat(v3.add(at, v3.add(v3.mul(side, s2 * h * 1.1), v3.mul(d, -h * .45))), v3.norm(v3.add(v3.mul(side, s2), v3.mul(d, -.6))), up, h * .85, h * 1.1, masks.ear(M.BODY2, M.BODY3, M.BODY3), { group }); }
  };
  const neck = (from, to, r0, r1, group, hK, open, ring) => { // an S-bent neck from `from` up to its head at `to`
    const dv = v3.sub(to, from), mid = v3.add(from, [dv[0] * .35 + .07, dv[1] * .45, dv[2] * .5]), mid2 = v3.add(from, [dv[0] * .75 - .03, dv[1] * .85, dv[2] * .85]);
    m.chain([[...from, r0], [...mid, r0 * .75 + r1 * .25], [...mid2, r0 * .3 + r1 * .7], [...to, r1]], M.BODY, { group, extra: true, paint: p => p[1] < v3.lerp(from, to, .5)[1] - .02 && spotty(p, 30, .15) ? M.BODY3 : undefined });
    if (ring) for (const t of [.7, .85]) m.ell(v3.lerp(mid2, to, t - .6), [r1 * .45, r1 * 1.7, r1 * 1.7], M.WOOD, { dir: v3.norm(v3.sub(to, mid)), group: 60 }); // a bronze offering ring high on the neck
    head(v3.add(to, [hr * hK * .6, .01, hr * hK * .25]), [1, -.25, .45 * Math.sign(to[2] - from[2] + .001) * .6 + .25], hr * hK, open, 1);
  };
  let main = null;
  for (let k = 0; k < heads; k++) {
    const u = heads > 1 ? k / (heads - 1) - .5 : 0, sway = Math.sin(k * 1.7 + ph * 2.5) * .035, len = (.5 + .12 * Math.cos(u * 2.4)) * (legend ? 1.1 : 1);
    const tip = [root[0] + .14 + sway - Math.abs(u) * .22 + (k % 2) * .08, root[1] + len * (1 - Math.abs(u) * .4) + .09 * Math.sin(k * 2.3), root[2] + u * len * 2.1 - (legend ? .12 : 0)];
    neck(root, tip, .034, .022, 20 + k, legend ? 1.25 : 1.1, k % 3 === 1 ? .55 : 0, legend);
    if (!main || Math.abs(u) < .01) main = tip;
  }
  if (legend) for (const [dz, dy] of [[.62, .02], [.42, .12]]) { // two necks cut short long ago, in front, each sprouting two new heads
    const stump = [root[0] + .22, root[1] + dy + .1, root[2] + dz];
    m.chain([[...root, .034], [...v3.lerp(root, stump, .5), .032], [...stump, .03]], M.BODY, { group: 40, extra: true });
    m.ell(stump, [.034, .014, .034], M.WEB, { group: 40 }); // the old cut, healed pale
    for (const k of [-1, 1]) neck(v3.add(stump, [0, .01, k * .015]), [stump[0] + .1, stump[1] + .14, stump[2] + k * .08 + .04], .018, .013, 42, .6, k > 0 ? .5 : 0, false);
  }
  m.rig = { spine: pts.map(p => p.slice()), head: main, hr };
  m.anchors.eyes = { pts: eyes, size: hr * (legend ? 1.25 : 1.1) * .17 };
  m.anchors.feet.push({ c: v3.add(pts[0].slice(0, 3), [-.02, -.01, 0]), r: .06, group: 3, tail: true }); // no feet: a tiny shoe on the tail tip
  m.anchors.neck = { c: v3.lerp(root, main, .3), r: .06, dir: v3.norm(v3.sub(main, root)) };
  m.part = "body";
  return finish(m, S, level, st, .45, facing);
}

// The butterfly (the biome roster, 2026-10-23: the moth turned a swallowtail, its id kept): S.look.butterfly. Yellow wings held up
// over its back or spread flat (its two frames), black veins and borders flecked pale, a tail off each hind wing over blue
// crescents; a slender dark body, long antennae ending in clubs. Its legend's hind wings the old great eyes.
const bflyFore = (s, t) => { const u = (s + 1) / 2, half = (.5 + .5 * u) * (u > .78 ? Math.sqrt(Math.max(0, 1 - ((u - .78) / .22) ** 2)) : 1); if (Math.abs(t) > half) return null;
  if (u > .8 || Math.abs(t) > half * .86) return Math.floor(Math.abs(t) * 5 + u * 4) % 3 === 0 && u > .82 ? M.BELLY : M.NOSE; // the black border, flecked pale
  return Math.abs((t + 1) * 1.6 - Math.round((t + 1) * 1.6)) < .07 || u < .08 ? M.NOSE : M.BODY; };
const bflyHind = (s, t) => { const u = (s + 1) / 2, r = Math.hypot(s * .95, t); if (r > .95) return null;
  if (r > .7) return r > .76 && r < .86 && Math.floor((Math.atan2(t, s) + 4) * 4) % 2 ? M.ACCENT : M.NOSE; // blue crescents in its black hem
  return Math.abs(Math.atan2(t, s + 1.1) * 3 - Math.round(Math.atan2(t, s + 1.1) * 3)) < .06 || u < .06 ? M.NOSE : M.BODY; };
export function moth3d(S, level, frame, st, facing = "towards") {
  if (S.look?.butterfly) return butterfly3d(S, level, frame, st, facing);
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = has("wingsBig") ? 1.45 : 1;
  const wm = has("wingsBig") ? M.MAGIC : M.BODY;
  shadow(m, 0, .3 * span);
  for (const side of [-1, 1]) {
    const lift = up ? .5 : -.1, fore = v3.norm([.35, lift, side]), hind = v3.norm([-.3, lift * .6, side]);
    m.flat(v3.add([0, y, side * .05], v3.mul(fore, .38 * span)), fore, v3.norm(v3.cross(fore, [0, 1, 0])), .4 * span, .24 * span, masks.spotted(wm, M.BELLY, M.BODY3), { group: 10 + (side > 0 ? 1 : 0) });
    if (has("eyespots")) { // (the legend audit's ★, Ed 2026-10-13: its wings' eye spots opened into two staring glowing eyes) its hind wings grown broad, each a great eye
      const eye = (a, b) => { if (Math.hypot(a, b) > 1 - .14 * Math.max(0, Math.sin(Math.atan2(b, a) * 7))) return null; /* (tattered by ages) */ const e = Math.hypot((a - .05) / .62, b / .78); if (e < .2) return Math.hypot(a + .02, b - .12) < .07 ? M.GLINT : M.NOSE; if (e < .32) return M.MAGIC2; if (e < .55) return M.MAGIC; if (e < .72) return M.NOSE; if (e < .8) return M.BELLY; return M.BODY2; };
      m.flat(v3.add([-.05, y, side * .05], v3.mul(hind, .36)), hind, v3.norm(v3.cross(hind, [0, 1, 0])), .38, .3, eye, { group: 12 + (side > 0 ? 1 : 0), extra: true });
    } else m.flat(v3.add([-.05, y, side * .05], v3.mul(hind, .26 * span)), hind, v3.norm(v3.cross(hind, [0, 1, 0])), .27 * span, .17 * span, masks.spotted(has("wingsBig") ? M.MAGIC2 : M.BODY2, M.BODY2, M.BODY2), { group: 12 + (side > 0 ? 1 : 0) });
    m.chain([[.12, y + .08, side * .03, .015], [.2, y + .25, side * .1, .025], [.24, y + .32, side * .14, .012]], M.BODY2, { group: 11 });
  }
  m.ell([0, y, 0], [.22, .09, .09], M.BELLY, { group: 1, paint: p => spotty(p, 30, .25) ? M.BODY2 : undefined });
  m.ell([.17, y + .03, 0], [.07, .07, .07], M.BELLY, { group: 1 });
  eyesOn(m, [.17, y + .03, 0], [.07, .07, .07], [[.7, .3, .6], [.7, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .5, facing);
}

function butterfly3d(S, level, frame, st, facing) {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = 1.15;
  shadow(m, 0, .32 * span);
  for (const side of [-1, 1]) {
    const lift = up ? .85 : -.08, fore = v3.norm([.3, lift, side]), hind = v3.norm([-.32, lift * .8, side]);
    m.flat(v3.add([.02, y, side * .04], v3.mul(fore, .4 * span)), fore, v3.norm(v3.cross(fore, [0, 1, 0])), .42 * span, .3 * span, bflyFore, { group: 10 + (side > 0 ? 1 : 0) });
    const hc = v3.add([-.06, y, side * .04], v3.mul(hind, .26 * span));
    if (has("eyespots")) { // its hind wings grown into two great staring eyes (the legend audit's ★, the moth's kept)
      const eye = (a, b) => { if (Math.hypot(a, b) > 1 - .14 * Math.max(0, Math.sin(Math.atan2(b, a) * 7))) return null; const e = Math.hypot((a - .05) / .62, b / .78); if (e < .2) return Math.hypot(a + .02, b - .12) < .07 ? M.GLINT : M.NOSE; if (e < .32) return M.MAGIC2; if (e < .55) return M.MAGIC; if (e < .72) return M.NOSE; if (e < .8) return M.BELLY; return M.BODY; };
      m.flat(v3.add([-.05, y, side * .05], v3.mul(hind, .36)), hind, v3.norm(v3.cross(hind, [0, 1, 0])), .38, .3, eye, { group: 12 + (side > 0 ? 1 : 0), extra: true });
    } else {
      m.flat(hc, hind, v3.norm(v3.cross(hind, [0, 1, 0])), .28 * span, .22 * span, bflyHind, { group: 12 + (side > 0 ? 1 : 0) });
      const tb = v3.add(hc, v3.mul(hind, .22 * span)); m.seg(tb, v3.add(tb, v3.add(v3.mul(hind, .14 * span), [-.1, -.04, 0])), .022, .014, M.NOSE, { group: 12 + (side > 0 ? 1 : 0) }); // its swallow's tail
    }
    m.chain([[.12, y + .06, side * .02, .008], [.24, y + .3, side * .1, .008], [.3, y + .44, side * .15, .008]], M.NOSE, { group: 11 }); // long antennae...
    m.ell([.3, y + .45, side * .15], [.025, .025, .025], M.NOSE, { group: 11 }); // ...ending in clubs
  }
  m.ell([-.04, y - .02, 0], [.24, .045, .045], M.BODY3, { group: 1, paint: p => p[1] < y - .03 ? M.BODY : undefined });
  m.ell([.14, y + .02, 0], [.07, .06, .06], M.BODY3, { group: 1 });
  m.ell([.22, y + .03, 0], [.05, .05, .05], M.BODY3, { group: 1 });
  eyesOn(m, [.22, y + .03, 0], [.05, .05, .05], [[.7, .3, .6], [.7, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .5, facing);
}

// The dragonfly (Ed, 2026-10-12: the mangrove swamp's, unknown-10; "it flies, darting and hovering over water"): a hawker hovering
// with four long glassy wings, veined, a dark mark near each tip; a long thin segmented tail, a stout thorax, a head that is nearly
// all eye. Its levels (the genome's levelQ: wing and tail lengths): every level flies (Ed: the baby a small dragonfly, not a nymph),
// the baby stubby and big-eyed, the young's wings short, the adult bright and metallic; the legend the elder of its kind (Ed, docs/
// ART-GUIDE.md §0c): a giant of the coal forests, all eye and wing, eyes wrapping its whole head (feature eyesHuge), its vast wings
// tattered by epochs (ancient), its body scarred. Two frames: wings raised, wings lowered.
const dfWing = (mat, vein, stig, torn = 0) => (s, t) => {
  const u = (s + 1) / 2, half = .9 * Math.pow(Math.sin(Math.PI * Math.min(1, .06 + u * .97)), .55) * (1 - .2 * u);
  if (Math.abs(t) > half) return null;
  if (torn && t < -half * .45 && Math.sin(u * 37 + t * 9) > 1 - torn) return null; // an ancient wing's tattered trailing edge
  if (u > .76 && u < .86 && t > half * .25) return stig; // the pterostigma
  if (Math.abs(t) > half * .8 || (Math.floor(u * 8) % 2 === 0 && Math.abs(t - half * .1) < .07)) return vein;
  return mat;
};
export function dragonfly3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), q = S.levelQ?.[level] || {};
  const up = frame === 0, y = .55, span = q.wing ?? 1, tl = q.tail ?? 1;
  const pairs = [[0, .05, .62], [1, -.06, .58]], old = has("ancient"), scar = p => old && Math.abs(Math.sin(p[0] * 41 + p[2] * 13)) < .06 ? M.BELLY : undefined;
  shadow(m, -.15, .2 * span);
  for (const side of [-1, 1]) for (const [k, dx, len] of pairs) { // the wings, straight out, flicking up and down
    const lift = (up ? .45 : -.25) * (k ? .8 : 1), root = [dx, y + .07, side * .05], dir = v3.norm([k ? -.18 : .12, lift, side]);
    const across = v3.norm(v3.cross(dir, [0, 1, 0]));
    m.flat(v3.add(root, v3.mul(dir, len * span * .5)), dir, across, len * span * .5, (k ? .16 : .13) * span, dfWing(M.BELLY, M.BODY3, M.BODY3, old ? .35 : 0), { group: 10 + k * 2 + (side > 0 ? 1 : 0), extra: true });
  }
  // the tail: ten segments, long and thin, banded, curving a little down
  for (let i = 0; i < 10; i++) { const t = i / 9, x = -.12 - t * .78 * tl, yy = y - .02 - t * t * .1; m.ell([x, yy, 0], [.05 * tl, .036 - t * .008, .036 - t * .008], i % 3 === 2 ? M.BODY3 : i % 2 ? M.BODY2 : M.BODY, { group: 3, paint: scar }); }
  m.ell([0, y, 0], [.13, .1, .09], M.BODY, { group: 1, paint: p => scar(p) ?? (p[1] > y + .05 ? M.BODY2 : undefined) }); // the thorax (an elder's scarred)
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) m.seg([.03 - i * .04, y - .07, side * .04], [.08 - i * .07, y - .13, side * .09], .01, .006, M.BODY3, { group: side > 0 ? 7 : 2 }); // its legs, held under it
  const ek = has("eyesHuge") ? 1.6 : 1, hc = [.16, y + .02, 0], hr = [.08 * ek, .085 * ek, .11 * ek], ed = side => v3.norm([.3, .4, side]);
  m.ell(hc, hr, M.BODY2, { group: 1 });
  for (const side of [-1, 1]) m.ell(Model.surface(hc, hr, ed(side)), [.07 * ek, .075 * ek, .06 * ek], legend ? M.MAGIC2 : M.EYE, { group: 8 + (side > 0 ? 1 : 0), paint: p => p[1] > hc[1] + .07 * ek ? M.BELLY : undefined }); // the great eyes
  m.anchors.head = { c: hc, r: hr, top: [hc[0], hc[1] + hr[1], 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(hc, hr, ed(side))), size: .06 * ek };
  m.anchors.neck = { c: [.09, y, 0], r: .08, dir: [1, 0, 0] };
  return finish(m, S, level, st, .5, facing);
}

// The crab (Ed, 2026-10-12: the mangrove swamp's mudflats and roots, unknown-26; "sideways scuttling movement"): a broad carapace
// carried sideways, so it scuttles the way it faces: its length across the screen, its claws and stalked eyes towards the camera,
// four walking legs out to each side, stepping in two alternating sets. Its levels (levelQ: shell and great-claw sizes): the baby
// small, round and pale, its claws alike; the young one claw growing; the adult a fiddler's great claw, barnacles on its shell; the
// legend the elder of its kind (Ed, docs/ART-GUIDE.md §0c): one colossal gleaming claw, bigger than its body, raised and lowered frame
// to frame in a slow beckoning wave (feature wave), its stalked eyes lit, its shell aged like a reef (feature reef): crusted with
// barnacles, knobs of coral and old scars.
// Its levels grow it (the menagerie review: "claws growing with age"): body.shell (its carapace), body.claw (the great claw, on the
// right), body.small (the other claw), body.stalk (its eye stalks' length: a juvenile's long).
export function crab3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), q = S.levelQ?.[level] || {};
  const cw = q.shell ?? 1, big = q.claw ?? 1, small = q.small ?? 1, stalk = q.stalk ?? 1, span = q.legs ?? 1, y = .3 * cw;
  const shell = [0, y, 0], sr = [.42 * cw, .15 * cw, .28 * cw];
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, four a side, out along x (the way it scuttles): kneed high
    const z = .12 - i * .1, ph = ((i + (side > 0 ? 1 : 0) + frame) % 2 ? 1 : -1) * .05, base = [side * sr[0] * .8, y - .02, z * cw];
    m.chain([[...base, .035 * cw], [side * (sr[0] + .2 * span) * cw + ph, y + .14 * cw * span, (z - .04) * cw, .03 * cw], [side * (sr[0] + .34 * span) * cw + ph * 1.6, .02, (z - .1) * cw, .015 * cw]], i % 2 ? M.BODY2 : M.BODY, { group: side > 0 ? 7 : 2 });
  }
  const reef = has("reef");
  m.ell(shell, sr, M.BODY, { paint: p => (q.barnacles && spotty(p, 18, reef ? .3 : .12)) ? M.BELLY : reef && Math.abs(Math.sin(p[0] * 30 + p[2] * 11)) < .05 ? M.BODY3 : p[1] > y + sr[1] * .55 ? M.BODYL : undefined }); // the carapace, its top lit (an elder's crusted and scarred)
  if (reef) for (let i = 0; i < 12; i++) { const a = i * 2.4, rr = .2 + (i % 4) * .2, c = [Math.cos(a) * sr[0] * rr - .08, y + sr[1] * (.95 - rr * .45), Math.sin(a) * sr[2] * rr * .8 - .04], h = (.07 + (i % 4) * .025) * cw; m.ell(v3.add(c, [0, h * .5, 0]), [h * .6, h, h * .6], M.BELLY, { group: 4, paint: p => p[1] > c[1] + h * 1.2 ? M.BODY3 : p[0] < c[0] - h * .2 ? M.BODY2 : undefined }); } // knobs of coral and barnacle cones
  m.ell([0, y - sr[1] * .4, sr[2] * .3], [sr[0] * .85, sr[1] * .55, sr[2] * .8], M.BELLY, { group: 1 }); // its pale underside in front
  for (const side of [-1, 1]) { // the claws, at the front (towards the camera); the right one a fiddler's great claw
    const k = side > 0 ? big : small, great = side > 0 && big > 1.2, cm = great ? M.BODY : M.BODY2, out = great ? .12 * (k - 1) : 0; // (the great claw held out to the side, clear of its face)
    const lift = side > 0 && has("wave") && !FORM ? (frame % 2 ? .1 : .32) : 0; // the legend's beckoning wave: raised, then lowered (not asleep)
    const sh = [side * .16 * cw, y - .04, sr[2] * .6], el = [side * .22 * cw, y - .02 + lift * .5, sr[2] * .9], hand = [side * (.24 + .06 * k + out) * cw, y + (.06 + .05 * k + lift) * cw, (sr[2] + .1 + .06 * k) * cw];
    m.seg(sh, el, .04 * cw, .035 * cw, M.BODY2, { group: side > 0 ? 6 : 5 });
    m.seg(el, hand, .035 * cw, .03 * k * cw, M.BODY2, { group: side > 0 ? 6 : 5 });
    const pr = [.1 * k * cw, .07 * k * cw, .08 * k * cw];
    m.ell(hand, pr, cm, { group: side > 0 ? 6 : 5, dir: [side * .3, .25, 1], paint: great ? p => (p[1] > hand[1] + pr[1] * .62 && p[2] > hand[2] - pr[2] * .1 ? M.BELLY : p[1] > hand[1] + pr[1] * .2 ? M.BODYL : undefined) : undefined }); // the palm, lit along its top, a gleam on its crest
    // its pincer: a fixed finger and a moving one, long, pointed and parted, their tips pale
    const tipU = v3.add(hand, [side * .04 * k * cw, .1 * k * cw, .26 * k * cw]), tipD = v3.add(hand, [side * .06 * k * cw, -.05 * k * cw, .22 * k * cw]);
    m.chain([[...v3.add(hand, [0, .03 * k * cw, .05 * k * cw]), .04 * k * cw], [...v3.lerp(hand, tipU, .6).map((v, j) => j === 1 ? v + .02 * k * cw : v), .025 * k * cw], [...tipU, .006]], cm, { group: side > 0 ? 6 : 5, paint: p => Math.hypot(...v3.sub(p, tipU)) < .05 * k * cw ? M.BELLY : undefined });
    m.chain([[...v3.add(hand, [0, -.03 * k * cw, .05 * k * cw]), .035 * k * cw], [...v3.lerp(hand, tipD, .6), .022 * k * cw], [...tipD, .006]], cm, { group: side > 0 ? 6 : 5 });
  }
  for (const side of [-1, 1]) { const b = [side * .07 * cw, y + sr[1] * .6, sr[2] * .7], e = v3.add(b, [side * .02, .14 * cw * stalk, .04 * cw]); m.seg(b, e, .018 * cw, .014 * cw, M.BODY2, { group: 9 }); m.ell(e, [.04 * cw, .045 * cw, .04 * cw], legend ? M.MAGIC2 : M.EYE, { group: 9 }); } // eyes on stalks (a legend's lit)
  m.anchors.head = { c: [0, y + sr[1] * .7, sr[2] * .7], r: [.12, .1, .1], top: [0, y + sr[1] + .12, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => [side * .09 * cw, y + sr[1] * .6 + .14 * cw * stalk, sr[2] * .7 + .04 * cw]), size: .04 * cw };
  m.anchors.neck = { c: [0, y + sr[1] * .2, sr[2] * .6], r: .14 * cw, dir: [0, 0, 1] };
  return finish(m, S, level, st, .45, facing);
}

export function spider3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model();
  const ce = [.15, .28, 0], T = S.look?.tarantula, lk = T ? 1.5 : 1; // (the tarantula's: thick hairy legs banded at each joint, a big furry abdomen)
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, knees high
    const a = (-.6 + i * .4), ph = (i + (side > 0 ? 0 : 1) + frame) % 2 ? .05 : -.05, base = v3.add(ce, [.05 - i * .04, 0, side * .1]);
    const knee = v3.add(base, [Math.cos(a) * .3 * (i < 2 ? 1 : -.6) + ph, .3, side * .3]), foot = v3.add(base, [Math.cos(a) * .55 * (i < 2 ? 1 : -.8) + ph * 1.5, -.28, side * .55]);
    const band = T ? p => { const a = Math.hypot(...v3.sub(p, knee)), b = Math.hypot(...v3.sub(p, foot)); return (a > .035 && a < .07) || (b > .07 && b < .11) ? M.ACCENT : undefined; } : undefined;
    m.chain([[...base, .03 * lk], [...knee, .028 * lk], [...foot, .015 * lk]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2, rough: T ? .008 : undefined, paint: band });
  }
  if (T) m.ell([-.3, .4, 0], [.38, .31, .33], M.BODY, { rough: .02, paint: p => p[1] > .5 && spotty(p, 22, .25) ? M.BELLY : undefined });
  else m.ell([-.28, .38, 0], [.34, .28, .3], M.BODY, { paint: p => (Math.abs(p[2]) < .03 || Math.abs(p[0] + .28) < .03) && p[1] > .45 ? M.BELLY : undefined });
  m.ell(ce, [.18, .13, .17], M.BODY2, { group: 1 });
  m.anchors.head = { c: ce, r: [.18, .13, .17] };
  m.anchors.eyes = { pts: [[.05, .05], [.05, -.05]].map(([dy, dz]) => Model.surface(ce, [.18, .13, .17], v3.norm([.9, dy * 6, dz * 4]))), size: .03 };
  m.anchors.neck = { c: [-.02, .32, 0], r: .15, dir: [1, 0, 0] };
  const ring = has("eyesRing");
  for (const [dy, dz] of [[.05, .05], [.05, -.05], [.02, .1], [.02, -.1]]) m.ell(Model.surface(ce, [.18, .13, .17], v3.norm([.9, dy * 6, dz * 4])), [.025, .025, .025], ring ? M.MAGIC2 : M.EYE, { group: 1 });
  if (ring) for (let i = 0; i < 5; i++) { const a = Math.PI * (.2 + i / 4 * .6); m.ell([-.3 + Math.cos(a) * .2, .75 + Math.sin(a) * .35, (i - 2) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
  if (has("rose")) { // (the legend audit's ★, Ed 2026-10-13) its web behind it like a stained-glass rose window: twelve spokes, rings of thread, the inner panes lit in two glows, dew glowing on the threads
    const n = 12, rings = [.22, .4, .58, .76, .94];
    m.flat([-.25, .95, -.5], [1, 0, 0], [0, 1, 0], .95, .95, (a, b) => {
      const r = Math.hypot(a, b); if (r > 1) return null; const th = Math.atan2(b, a), k = th / (Math.PI * 2 / n), sp = Math.abs(k - Math.round(k)) * r * Math.PI * 2 / n;
      const ringD = Math.min(...rings.map(R => Math.abs(r * Math.cos(Math.PI / n) / Math.max(.3, Math.cos(sp / Math.max(.05, r))) - R)));
      const broken = r > .62 && (Math.round(k) % 5 === 2 || (ringD < .016 && Math.abs(Math.sin(th * 5)) > .9)), thread = !broken && (sp < .018 || ringD < .016); // (ages old: some spokes and threads broken)
      if (thread) return (sp < .03 && ringD < .03) ? M.GLINT : M.BELLY; // a dew drop where a ring crosses a spoke
      if (r < .58) return (Math.floor(k + 10) + (r < .4 ? 1 : 0)) % 2 ? M.MAGIC : M.MAGIC2; // the rose: lit panes
      return null; }, { group: 140, extra: true, bend: 0 });
  }
  return finish(m, S, level, st, .5, facing);
}

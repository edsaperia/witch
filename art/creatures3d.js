// Witch creatures built in 3D (see model3d.js), so they stand in true three-quarter view.
// Units: the shoulder is about 1 high; x forward, y up, z towards the near side.
import { M, rng, uni, hash2 } from "./core.js";
import { Model, render, v3, spotty, masks } from "./model3d.js";
import { faceUp } from "./genome/expressions.js";
import { textureLumps } from "./genome/texture.js";
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
const drawForm = (m, o, S, level) => FORM ? FORM(m, o, S, level) : render(m, o).sp, formMotes = () => !FORM || FORM.motes;
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
//   brambles: { count, berries }: bramble vines winding over its body, thorny, leafed, with berries (its palette's flower colour).
//   scars: { count, mat, len }: old healed scars on its flanks, each three parallel claw rakes, pale (WEB) by default: the wear of epochs.
//   beads: { count, size, mat, pendant }: a necklace of offerings round its neck, bronze (WOOD) by default, a bigger pendant (its mat,
//     STONE by default) hanging at its throat: something worshipped once.
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
    if (f.kind === "bells") { // a saddle-cloth over its back, its hem trimmed in bronze, temple bells hanging from it: an elder hung with offerings
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
export function quad3d(S, level, frame, st, facing = "towards") {
  // its evolution at this level (genome levels: its own proportions and parts, not a rescale; q.features: legend features it grows early)
  const q = { legW: 1, earS: 1, hgt: 1, bw: .3, ...S.q, ...(S.levelQ?.[level] || {}) }, legend = level === 3, juv = level === 1, baby = level === 0, has = f => (legend && !S.levelFeatures?.[3] && S.legend.includes(f)) || (q.features || []).includes(f) || !!S.levelNamed?.[level]?.includes(f); // (an evolved legend, its genome levels[3], replaces its old legend feature)
  const feats = S.levelFeatures?.[level], elder = legend && S.elder; // (an elder legend: art/elders.js)
  const sz = k => S.sizes[k][level]; // its template's size curves (art/genome/templates.js): baby, young, adult, legend
  const m = new Model();
  const hr = q.hr * sz("head") * (st.head / .44) ** .5, len = q.len * sz("len") * st.long;
  const legK = sz("legK");
  const bob = frame ? -.04 : 0, top = 1 + bob, chest = q.chest * sz("chestDeep") * sz("chestBig") / legK + bob, tuck = q.tuck * sz("tuck") / legK + bob; // a big one's deeper chest and belly
  const bw = q.bw * sz("body") * (q.legW > 1.2 ? 1.15 : 1), lw = .06 * q.legW * sz("limbA") * sz("limbB");
  const hump = q.back === "hump" ? q.hump ?? .1 * (q.humpK ?? 1) : 0, arch = q.back === "arch" ? .1 * (q.archK ?? 1) : 0, front = q.front ?? 1; // front: a heavier front (an adult boar's)
  // ---- markings, painted by where a point is on the body ----
  const bellyY = chest + .12;
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
    if (q.stripes && stripeAt(p)) return M[q.stripes.mat || "BODY3"];
    if (q.rosettes && rosetteAt(p)) return M[q.rosettes.mat || "BODY3"];
    if (q.saddle && p[1] > top - .18 && p[0] < len * .55) return M.BODY2;
    if (q.spots === "solid") { const k = 24, f = p.map(c => c * k - Math.floor(c * k) - .5); if (f[0] * f[0] + f[1] * f[1] + f[2] * f[2] < .16 && spotty(p, k, .6)) return M.NOSE; } // a cheetah's: small round solid dots all over
    if (q.spots && q.spots !== "solid" && p[1] > chest + .1 && spotty(p, 10, .22)) return q.spotMat === "belly" || (q.spots === "young" && juv) ? M.BELLY : q.spots === "young" ? undefined : M.BODY3;
    if (q.ridge && p[1] > top - .08 + hump * .5) return M[q.ridgeMat || "BODY3"]; // (ridgeMat: its crest's own material, the frost wyrm's ice-pale BELLY)
    if (q.tabby && p[1] > chest + .04) { const t = (p[0] + Math.sin(p[1] * 17 + p[2] * 9) * .035) / (len * 2 / q.tabby.n) + 64; if (t - Math.floor(t) < (q.tabby.w ?? .32)) return M[q.tabby.mat || "BODY3"]; } // a tabby's stripes, thin, across its body, a little wavy
    if (q.bands && p[1] > chest && p[0] > -len * 1.1 && Math.floor((p[1] - chest) / Math.max(.01, top + hump - chest) * q.bands.n * 2 + .5) % 2) return M[q.bands.mat || "BELLY"]; // a piglet's stripes, running its length
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
  m.ell([len * .48, (top + chest) / 2 + hump * .5, 0], [len * .62, (top - chest) / 2 * front + hump * .5, bw * front], M.BODY, { paint: paintBody });
  m.ell([-len * .5, (top + tuck) / 2 + arch * .6, 0], [len * .58, (top - tuck) / 2 + arch * .6, bw * .93], M.BODY, { paint: paintBody });
  m.ell([0, (top + (chest + tuck) / 2) / 2 + .02 - loin, 0], [len * .6, (top - (chest + tuck) / 2) / 2, bw * .9], M.BODY, { paint: paintBody });
  if (withers) m.ell([len * .58, top - .1 + withers + hump * .4, 0], [len * .3, .13 + withers, bw * .8 * front], M.BODY, { paint: paintBody }); // the withers, over the shoulders
  if (croup) m.ell([-len * .66, top - .11 + croup + arch * .5, 0], [len * .24, .12 + croup, bw * .74], M.BODY, { paint: paintBody }); // the pelvis
  if (brisket) m.ell([len * .8, chest + .06 + brisket * .5, 0], [len * .22, .1 + brisket, bw * .62 * front], M.BODY, { paint: paintBody }); // the brisket, the chest's keel
  if (q.ridge) for (let i = 0, rk = typeof q.ridge === "number" ? q.ridge : 1, n = Math.round((legend ? 16 : 10) * Math.max(1, rk * .7)); i < n; i++) { const x = -len * .8 + i * len * 1.75 / (n - 1), h = (.07 + (legend ? .04 : 0)) * (1 + .5 * Math.max(0, x / len)) * rk * (rk > 1 && i % 2 ? .6 : 1); m.ell([x, top + .02 + hump * Math.max(0, 1 - Math.abs(x / len - .5) * 2) + h * .5, 0], [h, .03, bw * .25], M[q.ridgeMat || "BODY3"], { dir: [-.3, 1, 0], up: [1, 0, 0] }); }
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
    const z = side * bw * .62, x = fore ? len * .62 : -len * .62, a = (fore ? 1 : -1) * side * sw, topY = fore ? chest + .1 : tuck + .15, Y = topY + .12;
    const swing = (fore ? side : -side) * (frame ? 1 : -1) > 0, lift = swing ? .06 : 0, flex = swing ? 1 : 0; // the leg swinging forward is lifted and flexed
    const hf = !fore ? (q.hindFoot || 1) : 1, out = sprawl ? side * .14 : 0, g = { group: side > 0 ? 6 + (fore ? 1 : 0) : 2 };
    const hipTop = [x, Y, z * .8], mat = side > 0 ? (q.legMat || M.BODY) : (q.legMat ? M.BODY3 : M.BODY2);
    // the joints at rest, [dx from the hip, height as a share of the hip's, dz out], hip to paw
    const J = fore
      ? hoof ? [[-.04, .6, 0], [.02, .33, 0], [.03, .1, 0], [.05, .03, 0]] : flat ? [[-.07, .5, 0], [-.01, .17, 0], [.1, .04, 0]] : sprawl ? [[.0, .62, out], [.05, .2, out * 1.2], [.07, .04, out * 1.2]] : [[-.06, .55, 0], [.03, .22, 0], [.05, .05, 0]]
      : hoof ? [[.12, .62, 0], [-.1, .35, 0], [-.04, .1, 0], [-.02, .03, 0]] : flat ? [[.14, .55, 0], [-.1, .2, 0], [.08 * hf, .04, 0]] : sprawl ? [[.02, .62, out], [-.06, .25, out * 1.2], [.02, .04, out * 1.2]] : [[.14, .6, 0], [-.08 - .04 * (hf - 1), .3, 0], [.02, .05, 0]];
    const pts = [hipTop], last = J.length - 1;
    for (let k = 0; k <= last; k++) { const [dx, hy, dz] = J[k], y = Y * hy + (k === last ? lift : lift * .6 * (k / last)), drop = Y - y, trail = flex * (k >= last - 1 ? -.05 : k ? -.02 : 0); pts.push([x + dx + Math.sin(a) * Math.min(drop, .75) * .7 + trail, y, z + dz]); }
    // thick at the hip and thigh, slimming to the paw; a hoofed leg's cannon slim as a deer's; a hind thigh fuller (haunch)
    const R = fore ? (hoof ? [1.45, 1.0, .62, .55, .55] : flat ? [1.5, 1.05, .85, .75] : sprawl ? [1.3, .95, .75, .7] : [1.5, 1.05, .8, .75]) : (hoof ? [2 * (q.haunch || 1), 1.25, .7, .5, .5] : flat ? [2 * (q.haunch || 1), 1.25, .9, .75] : sprawl ? [1.7 * (q.haunch || 1), 1.0, .75, .7] : [2 * (q.haunch || 1), 1.3, .85, .75]);
    const chainPts = pts.map((p, k) => [...p, lw * R[k]]);
    m.chain(chainPts, mat, { ...g, paint: q.stripes ? p => p[1] > .1 && p[1] < topY && ((p[1] * (q.stripes.legN ?? 6) + p[0] * .8 + side * .3) % 1 + 1) % 1 < (q.stripes.w ?? .3) * .75 ? M[q.stripes.mat || "BODY3"] : undefined : q.socks || q.beads ? p => q.beads && p[1] > .12 && p[1] < (q.socks ?? 0) + .45 && Math.floor(p[1] * 16) % 3 === 0 && spotty(p, 30, .55) ? M.STONE : q.socks && p[1] < q.socks ? M.BODY3 : undefined : undefined }); // beads: stone-grey prayer beads round its legs
    // the foot: a hoof (a dark wedge, flat-fronted), a paw (a pad, its toes in front from adult up) or a flat sole (long, its toes at the end)
    const foot = pts[pts.length - 1], fl = (hoof ? .07 : .09) * (q.legW ** .5) * hf, fw = lw * 1.1;
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
    if (q.face === "badger") return Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) + (p[0] - H[0]) * .1 || p[1] < H[1] - hr * .1 ? (q.blazeGlow && Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) && p[1] > H[1] - hr * .1 ? M.RUNE : M.BELLY) : M.BODY3; // blaze: the stripe's width; blazeGlow: it glows in moonlight
    if (q.face === "dark") return M.BODY2;
    if (q.face === "raccoon") { const band = H[1] + hr * .12; if (p[0] > H[0] - hr * .35 && Math.abs(p[1] - band) < hr * .27) return M.BODY3; if (p[0] > H[0] - hr * .1 && p[1] >= band + hr * .27 && p[1] < band + hr * .5) return M.BELLY; if (p[0] > H[0] + hr * .2 && p[1] < band - hr * .27) return M.BELLY; return undefined; } // the bandit mask: black across its eyes, white brows over it and a white muzzle under
    if (q.face === "meerkat" && p[0] > H[0] - hr * .05 && Math.abs(p[1] - (H[1] + hr * .27)) < hr * .3 && Math.abs(Math.abs(p[2]) - hr * .5) < hr * .38) return M.BODY3; // dark patches round its eyes
    if (q.frost && p[0] > H[0] + hr * .7 && spotty(p, 26, .45)) return M.WEB; // frost on its muzzle
    if (q.scars && Math.abs((p[0] - H[0] - hr * .3) * .8 + (p[1] - H[1] - hr * .1)) < hr * .035 && Math.abs(p[0] - H[0] - hr * .3) < hr * .45 && p[2] > 0) return M.BELLY; // a scar across its brow and eye
    if (q.stripes && p[1] > H[1] - hr * .1 && p[0] < H[0] + hr * .55 && (((p[1] - H[1]) / hr * 3.2 + Math.abs(p[2]) / hr * 1.6 - (p[0] - H[0]) / hr) % 1 + 1) % 1 < .24) return M[q.stripes.mat || "BODY3"]; // stripes over its brow and cheeks
    const tear = tearAt(p); if (tear) return tear;
    if (q.mask && p[0] > H[0] + hr * .15 && p[1] > H[1] - hr * .4 && p[1] < H[1] + hr * .45) return M.BELLY; // a white mask over its eyes and muzzle
    if ((q.belly || q.muzzle) && p[1] < H[1] - hr * .35) return M.BELLY;
    return undefined;
  };
  m.ell(H, [hr * 1.05, hr * .92, hr * .88], M.BODY, { paint: headPaint });
  const L = hr * q.snout * sz("snout"), Dm = hr * q.snoutD * .55, sn = [H[0] + hr * .65 + L * .5, H[1] - hr * .28, 0];
  if (q.beak) m.chain([[H[0] + hr * .7, H[1] - hr * .05, 0, hr * .34], [H[0] + hr * 1.2 * q.beak, H[1] - hr * .12, 0, hr * .22], [H[0] + hr * 1.5 * q.beak, H[1] - hr * .38, 0, hr * .1], [H[0] + hr * 1.42 * q.beak, H[1] - hr * .62, 0, hr * .03]], M.ACCENT, { group: 1 }); // a griffin's hooked beak (beak: its length), in its accent
  const tip = q.beak ? [H[0] + hr * 1.42 * q.beak, H[1] - hr * .62, 0] : [sn[0] + L * .62 + hr * .1, sn[1] - .02, 0]; // (its snout's tip, or its beak's)
  if (q.flatJaw && !q.beak) { // a crocodile's: long, flat and wide, lying low, a row of teeth along its edge
    m.ell(sn, [L * .62 + hr * .2, Dm * .55, hr * (q.jawW ?? .5)], M.BODY, { dir: [1, -.08, 0], paint: p => p[1] < sn[1] - Dm * .25 ? M.BELLY : headPaint(p) });
    if (!baby) for (let i = 0; i < 6; i++) for (const side of [-1, 1]) m.ell([sn[0] - L * .4 + i * L * .17, sn[1] - Dm * .3, side * hr * ((q.jawW ?? .5) - .06)], [hr * .035, hr * .06, hr * .03], M.ACCENT, { group: 1 });
    for (const side of [-1, 1]) { // its nostrils on a knob at its snout's tip, up above the water line with its eyes (its legend's glowing)
      const n = [tip[0] - hr * .2, tip[1] + Dm * .4, side * hr * .09];
      m.ell(n, [hr * .13, hr * .1, hr * .1], M.BODY, {}); m.ell(v3.add(n, [0, hr * .08, 0]), [hr * .06, hr * .04, hr * .05], legend ? M.MAGIC2 : M.NOSE, { group: 1 });
    }
  } else if (!q.beak) {
    m.ell(sn, [L * .62 + hr * .2, Dm, Dm * .95], M.BODY, { dir: [1, -.25, 0], paint: p => tearAt(p) ?? ((q.muzzle || q.belly) && p[1] < sn[1] - Dm * .1 ? M.BELLY : headPaint(p)) });
    if (q.jaw) m.ell([sn[0] - L * .05, sn[1] - Dm * .55, 0], [L * .55 + hr * .18, Dm * .55 * q.jaw, Dm * .85 * Math.min(1.3, q.jaw)], M.BODY, { dir: [1, -.15, 0], paint: headPaint }); // a heavy lower jaw (a jaguar legend's crushing bite)
    if (!q.trunk) m.ell(tip, [hr * (q.disc ? .1 : .12), hr * (q.disc ? .2 : .12), hr * (q.disc ? .2 : .15)], M.NOSE, { group: 1 });
    else { // a trunk (an elephant's): from its snout, hanging down and forward, wrinkled, its tip curling forward and up by curl
      const T = q.trunk, Lt = (T.len ?? 1) * hr * 2.4, r0 = (T.r ?? .34) * hr, pts = [], n = 12;
      let p = [sn[0] + L * .2, sn[1] - Dm * .2, 0], ang = -.45;
      // raise (a legend's: 0 hanging to 1 held high in a trumpet): up from its brow, its tip flared and curled back over
      const up = T.raise ?? 0;
      if (up) ang = -.45 + (.35 + .45) * up;
      for (let i = 0; i <= n; i++) { const t = i / n, hang = -.45 - Math.min(t, .7) * 1.6 + Math.max(0, t - .7) * (T.curl ?? .5) * 5, high = .35 + t * 1.25 + Math.max(0, t - .72) * (T.curl ?? .5) * 4.5; pts.push([...p, r0 * (1 - t * .62) * (up && t > .9 ? 1.5 : 1)]); ang = hang + (high - hang) * up; p = [p[0] + Math.cos(ang) * Lt / n, p[1] + Math.sin(ang) * Lt / n, 0]; }
      m.chain(pts, M.BODY, { group: 1, paint: q => Math.sin(q[1] * 70 + q[0] * 20) > .75 ? M.BODY2 : undefined });
      m.ell(pts[n].slice(0, 3), [r0 * .4, r0 * .4, r0 * .4], M.NOSE, { group: 1 });
    }
  }
  // eyes: both show; legends' glow
  for (const side of [-1, 1]) { const e = Model.surface(H, [hr * 1.05, hr * .92, hr * .88], v3.norm([.75, .32, side * .62])); m.ell(e, [hr * .13, hr * .16, hr * .13].map(v => v * (q.eyeK || 1) * sz("eye")), elder ? M[elder.eye || "MAGIC2"] : (legend && !q.tusks) || q.eyeGlow ? M.MAGIC2 : M.EYE, { group: 1 }); } // (eyeGlow: an evolved level's eye catching the light, the legend boar's under its hump)
  // the face's bones (the menagerie review, 2026-10-13: the head was one egg with a snout): a brow ridge over the eyes, so they sit
  // in sockets under it; cheeks (the zygomatic arch and the jowls below it) widening the face under the eyes; a lower jaw under the
  // snout with the mouth's line along it; and whiskers (q.whiskers) as a few pale lines off the muzzle. Knobs q.brow, q.jowl, q.jaw
  // (their size, 1 as built, 0 none), softer on a baby; the jaw only on a snouted head (not a beak's).
  const browK = (q.brow ?? 1) * (baby ? .55 : 1) * (q.beak ? .5 : 1), jowlK = (q.jowl ?? (q.cheeks ? 1.35 : 1)) * (baby ? .7 : 1), jawK = q.beak ? 0 : (q.jaw ?? 1) * (baby ? .7 : 1);
  if (browK) m.ell([H[0] + hr * .42, H[1] + hr * .46, 0], [hr * .4, hr * .2 * browK, hr * .78], M.BODY, { group: 1, dir: [1, .35, 0], paint: headPaint });
  if (jowlK) for (const side of [-1, 1]) m.ell([H[0] + hr * .3, H[1] - hr * .3, side * hr * .66], [hr * .5, hr * .36 * jowlK, hr * .3 * jowlK], M.BODY, { group: 1, paint: headPaint });
  if (jawK) {
    const jc = [sn[0] - L * .08, sn[1] - Dm * .5 * jawK, 0], mouthY = sn[1] - Dm * (.45 + .12 * jawK);
    m.ell(jc, [L * .5 + hr * .12, Dm * .42 * jawK, Dm * .78], M.BODY, { group: 1, dir: [1, -.22, 0], paint: p => p[1] > mouthY - .012 && p[1] < mouthY + .012 && p[0] > sn[0] - L * .05 && p[0] < sn[0] + L * .62 ? M.LINE : ((q.muzzle || q.belly) ? M.BELLY : headPaint(p)) }); // (its mouth: a dark line where the jaw meets the muzzle)
    if (q.whiskers && !baby) for (const side of [-1, 1]) for (let w = 0; w < 3; w++) { const b = [sn[0] + L * .35, sn[1] - Dm * .15 + (w - 1) * Dm * .18, side * Dm * .75], d = v3.norm([.35, (w - 1) * .25 - .1, side]); m.seg(b, v3.add(b, v3.mul(d, hr * (.55 + .12 * (w % 2)))), hr * .018, hr * .006, M.BELLY, { group: 30 + w + (side > 0 ? 0 : 3), extra: true }); }
  }
  m.anchors.head = { c: H, r: [hr * 1.05, hr * .92, hr * .88], top: [H[0] - hr * .1, H[1] + hr * .82, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(H, [hr * 1.05, hr * .92, hr * .88], v3.norm([.75, .32, side * .62]))), size: hr * .16 * (q.eyeK || 1) * sz("eye") };
  m.anchors.neck = { c: v3.lerp(nb, H, sz("neckAnchor")), r: q.neckW * .5 * sz("neckR"), dir: v3.norm(v3.sub(H, nb)), tag: sz("tag") }; // lower on the neck when the head is big
  // ears
  for (const side of [-1, 1]) {
    const E = q.ear, base = [H[0] - hr * .15, H[1] + hr * .7, side * hr * .5], k = q.earS * sz("ear") * (q.ear === "long" ? .62 / (baby ? sz("head") : 1) : 1); // (long ears don't grow with a baby's big head: a leveret's are short for its head, and its young must stand clear above it)
    if (E === "none" || elder?.ears) continue;
    if (E === "fan") { const c = [H[0] - hr * .55, H[1] - hr * .12, side * hr * .82], d = [hr * .46 * k, hr * .62 * k, hr * .07]; m.ell(c, d, M.BODY2, { group: 5 + (side > 0 ? 0 : 20), dir: [1, .25, 0], paint: p => Math.hypot((p[0] - c[0]) / d[0], (p[1] - c[1]) / d[1]) > .8 ? M.BODY3 : undefined }); continue; } // an elephant's: a great flat fan against the side of its head, its edge ragged and darker
    if (E === "round") { m.ell(base, [hr * .22, hr * .25 * k, hr * .1], M.BODY, { group: elder ? 9 : 1, paint: p => p[0] > base[0] + hr * .02 ? M.EAR : undefined }); continue; }
    const long = E === "long", sail = E === "sail", droop = E === "small" ? -.6 : 0, eh = hr * .55 * k * (E === "big" ? 1.35 : long ? 2.2 : 1), ew = hr * .3 * (E === "big" ? 1.2 : long ? 1.35 : sail ? .8 * k : 1); // sail: a fennec's, as wide as it's tall, flared out
    const dirE = v3.norm([droop * .6 - (long ? .3 : .12), 1, side * (sail ? .6 : .3)]), n = v3.norm([.55, .2, side]), across = v3.norm(v3.cross(n, dirE)); // the ear opens forward and out, towards us on the near side
    m.flat(v3.add(base, v3.mul(dirE, eh)), across, dirE, ew, eh, masks.ear(M.BODY, M.EAR, sail ? M.BODY : M.BODY3), { group: 5 + (side > 0 ? 0 : 20), extra: long });
    if (E === "tuft" && q.plume) { const a0 = v3.add(base, [0, eh * 1.3, side * .02]); m.chain([[...a0, hr * .09], [...v3.add(a0, [-hr * .2, eh * 1.4, side * .05]), hr * .1], [...v3.add(a0, [-hr * .55, eh * 2.6, side * .08]), hr * .06], [...v3.add(a0, [-hr * .95, eh * 3.3, side * .1]), hr * .015]], M.BODY3, { group: 1, extra: true }); m.ell(v3.add(a0, [-hr * .95, eh * 3.35, side * .1]), [hr * .07, hr * .07, hr * .07], M.MAGIC2, { group: 1, extra: true }); } // its ear tufts grown into long black plumes like flames, their tips alight
    else if (E === "tuft") m.seg(v3.add(base, [0, eh * 1.4, side * .02]), v3.add(base, [0, eh * 1.85, side * .04]), hr * .05, hr * .02, M.BODY3, { group: 1 });
  }
  // ---- tail ----
  const tb = [-len * 1.05, top - .1 + arch * .5, 0], tw = frame ? .04 : -.02;
  m.part = "tail"; m.rig.head = { nb, H, hr }; m.rig.tail = tb;
  if (!elder?.tail && !has("tails") && !feats?.some(f => f.kind === "tails" && f.replace)) tail3d(m, has("starTail") ? "star" : q.tail, tb, len, top, tw);
  m.part = "head";
  // ---- horns, antlers, tusks ----
  const hornTips = [];
  if (q.horns === "twist") for (const side of [-1, 1]) hornTips.push(horn3d(m, [H[0] - hr * (.05 + (q.horn?.back ?? 0)), H[1] + hr * (.6 + (q.horn?.up ?? 0)), side * hr * (.45 + (q.horn?.wide ?? 0))], side, /* back, up, wide: its base moved, in head radii (clear of the brows) */ { ...q.horn, length: (q.horn?.length ?? 2) * hr * (q.hornBroken && side < 0 ? .45 : 1), r: (q.horn?.r ?? .3) * hr }));
  else if (q.horns) for (const side of [-1, 1]) { const k = has("hornsGlow") ? 1.5 : sz("horns"), pts = []; for (let i = 0; i <= 8; i++) { const a = .3 - i / 8 * Math.PI * 1.6, r = hr * .65 * k * (1 - .45 * i / 8); pts.push([H[0] - hr * .1 + Math.cos(a) * r, H[1] + hr * .45 + Math.sin(a) * r, side * (hr * .6 + i * .015)]); pts[i].push(hr * .2 * k * (1 - .6 * i / 8)); } m.chain(pts, has("hornsGlow") ? M.MAGIC : M.ACCENT, { group: 13 }); }
  if (has("crown")) crown3d(m, [H[0] - hr * .05, H[1] + hr * .9, 0], hr * .5); // (a wildcat elder's: her crown, as the toad's and the mole's)
  if (q.antlers || has("jackalope")) for (const side of [-1, 1]) antlers3d(m, q, [H[0] - hr * .05, H[1] + hr * .75, side * hr * .4], side, sz("antlers"), has);
  const tuskTips = [];
  if (q.tusks) for (const side of [-1, 1]) {
    const k = has("tusksBig") ? 1.4 : q.tuskSize ?? sz("tusks"); if (!k) continue; const b = [sn[0] + L * .25, sn[1] - Dm * .4, side * Dm * .8];
    if (q.tuskCurl === undefined) { m.chain([[...b, .045 * k], [...v3.add(b, [.1 * k, .1 * k, side * .03]), .04 * k], [...v3.add(b, [.06 * k, .24 * k, side * .05]), .02 * k]], M.ACCENT, { group: 8 }); tuskTips.push(v3.add(b, [.06 * k, .24 * k, side * .05])); continue; }
    // an evolved tusk (genome levels): a tapering curve out, up and back round by tuskCurl (half turns), its tip fine
    const pts = [], n = 9, R = .13 * k;
    for (let i = 0; i <= n; i++) { const t = i / n, a = t * q.tuskCurl * Math.PI, r = R * (1 - t * .35); pts.push([b[0] + Math.sin(a) * r * 1.2, b[1] + (1 - Math.cos(a)) * r, b[2] + side * t * .07 * k, .034 * k * (1 - t * .8)]); }
    m.chain(pts, M.ACCENT, { group: 8, paint: q.tuskBands ? p => { const t = Math.hypot(...v3.sub(p, b)) / (R * 2.4); return t > .15 && Math.floor(t * q.tuskBands * 2) % 2 && (t * q.tuskBands * 2) % 1 < .35 ? M.WOOD : undefined; } : undefined }); tuskTips.push(pts[n].slice(0, 3)); // tuskBands: bronze rings round tusks worn with age
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
  if (feats?.length) evolve3d(m, feats, { H, hr, sn, L, Dm, tuskTips, hornTips, tb, backAt, len, top, chest, tuck, bw, frame, front });
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
  if (q.onBack && !FORM?.rig) { // floating on its back (not in the live rig's pieces, which stand), a stone on its belly and its paws round a glowing pearl (the otter's legend)
    rollOver(m);
    let top = -Infinity; for (const P of m.parts) if (!P.extra) top = Math.max(top, (P.c ? P.c[1] + Math.max(...(P.r || P.h || [0])) : Math.max(P.a[1] + P.r1, P.b[1] + P.r2)));
    m.ell([len * .1, top - .02, 0], [.17, .09, .15], M.STONE, { group: 79, extra: true, rough: .015 });
    m.ell([len * .45, top + .06, 0], [.08, .08, .08], M.MAGIC2, { group: 79, extra: true });
    for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2; m.ell([Math.cos(a) * len * 1.7, .03, Math.sin(a) * bw * 3], [.06, .015, .04], i % 2 ? M.MAGIC : M.MAGIC2, { group: 79, extra: true }); } // the ripples round it
  }
  gearUp(m);
  const sp = drawForm(m, { height: drawHeight(level, st, q.hgt), facing }, S, level);
  if (formMotes() && sz("motes")) glowMotes(sp, S.id.length * 7919, sz("motes"));
  return sp;
}

// Rolled half over about its long axis (onto its back), then set down again with its lowest point on the ground; each paint reads
// its part where it was before the roll, and the anchors roll with it.
function rollOver(m) {
  const R = p => [p[0], -p[1], -p[2]];
  for (const P of m.parts) { if (P.c) P.c = R(P.c); if (P.a) { P.a = R(P.a); P.b = R(P.b); } if (P.axes) P.axes = P.axes.map(R); if (P.paint) { const f = P.paint; P.paint = p => f(R(p)); } }
  for (const F of m.flats) { F.c = R(F.c); F.u = R(F.u); F.v = R(F.v); }
  let low = Infinity; for (const P of m.parts) low = Math.min(low, P.c ? P.c[1] - Math.max(...(P.r || P.h || [0])) : Math.min(P.a[1] - P.r1, P.b[1] - P.r2));
  const up = .04 - low, U = p => [p[0], p[1] + up, p[2]];
  for (const P of m.parts) { if (P.c) P.c = U(P.c); if (P.a) { P.a = U(P.a); P.b = U(P.b); } if (P.paint) { const f = P.paint; P.paint = p => f([p[0], p[1] - up, p[2]]); } }
  for (const F of m.flats) F.c = U(F.c);
  const A = m.anchors, RU = p => U(R(p));
  for (const k of ["head", "neck"]) if (A[k]?.c) A[k] = { ...A[k], c: RU(A[k].c), ...(A[k].top ? { top: RU(A[k].top) } : {}), ...(A[k].dir ? { dir: R(A[k].dir) } : {}) };
  if (A.eyes?.pts) A.eyes = { ...A.eyes, pts: A.eyes.pts.map(RU) };
  A.feet = (A.feet || []).map(f => ({ ...f, c: RU(f.c) }));
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
  const cut = Math.round(n * .8);
  for (const [k, s] of A.entries()) { m.chain(s.slice(0, tip ? cut + 1 : n + 1), M[k && mat2 ? mat2 : mat] ?? M.ACCENT, { group, extra: true }); if (tip) m.chain(s.slice(cut), M[tip] ?? M.MAGIC2, { group: group + 1, extra: true }); }
  return p;
}

function tail3d(m, kind, tb, len, top, tw) {
  const o = { group: 3 }, X = k => -len * k;
  if (kind === "brush") m.chain([[...tb, .1], [X(1.3), top - .25 + tw, 0, .15], [X(1.4), top - .55, 0, .14], [X(1.35), .38 + tw, 0, .09]], M.BODY, { ...o, paint: p => p[1] < .32 ? M.BODY3 : undefined });
  else if (kind === "panda") m.chain([[...tb, .11], [X(1.05) - .35, top - .1 + tw, 0, .17], [X(1.05) - .75, top - .3 + tw, 0, .18], [X(1.05) - 1.05, top - .5 + tw, 0, .13]], M.BODY, { ...o, paint: p => Math.floor((X(1.05) - p[0]) * 6.5) % 2 ? M.BODY3 : undefined }); // a red panda's: thick, its rings dark
  else if (kind === "bushy") m.chain([[...tb, .1], [X(1.05) - .35, top - .05 + tw, 0, .17], [X(1.05) - .75, top - .2 + tw, 0, .18], [X(1.05) - 1.0, top - .35 + tw, 0, .1]], M.BODY, { ...o, paint: p => p[0] < X(1.05) - .82 ? M.BELLY : undefined });
  else if (kind === "stub" || kind === "deer" || kind === "bob") m.ell(v3.add(tb, [-.06, .02 + tw, 0]), [.1, .08, .07], kind === "deer" ? M.BELLY : M.BODY, { ...o, paint: kind === "bob" ? p => p[0] < tb[0] - .08 ? M.BODY3 : undefined : undefined });
  else if (kind === "puff") m.ell(v3.add(tb, [-.04, .02, 0]), [.11, .11, .1], M.BELLY, o);
  else if (kind === "dormouse") m.chain([[...tb, .1], [X(1.3), top - .2 + tw, 0, .12], [X(1.7), top - .42, 0, .13], [X(2.05), top - .3 + tw, 0, .12], [X(2.2), top - .08, 0, .08]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.0) ? M.BODY2 : undefined }); // long, low and furry, curling up at its tip (the silhouette check: it read as a squirrel's)
  else if (kind === "squirrel" || kind === "star") m.chain([[...tb, .12], [X(1.3), top + .05 + tw, 0, .25], [X(1.3), top + .6 + tw, 0, .3], [X(1.0), top + .95 + tw, 0, .27], [X(.65), top + .9 + tw, 0, .16]], kind === "star" ? M.MAGIC : M.BODY, { ...o, extra: true, paint: kind === "star" ? p => spotty(p, 14, .12) ? M.GLINT : undefined : undefined });
  else if (kind === "croc") m.chain([[...tb, .3], [X(1.25), top - .25 + tw, 0, .26], [X(1.75), .3, 0, .19], [X(2.25), .18 + tw * .5, 0, .11], [X(2.7), .1 + tw, 0, .04]], M.BODY, { ...o, paint: p => p[1] > .28 && Math.sin(p[0] * 22) > .55 ? M.BODY2 : undefined }); // a crocodile's: thick at the root, long, low along the ground, scutes along its top
  else if (kind === "otter") m.chain([[...tb, .22], [X(1.3), top - .4 + tw, 0, .17], [X(1.65), .12, 0, .1], [X(1.95), .07 + tw, 0, .04]], M.BODY, o); // a thick tapering rudder (its signature)
  else if (kind === "stoat") m.chain([[...tb, .08], [X(1.25), top + .08 + tw, 0, .07], [X(1.45), top + .3 + tw, 0, .085], [X(1.5), top + .45 + tw, 0, .07]], M.BODY, { ...o, paint: p => p[1] > top + .26 ? M.BODY3 : undefined }); // held up, its big black tip its signature
  else if (kind === "marten") m.chain([[...tb, .12], [X(1.15) - .3, top - .02 + tw, 0, .2], [X(1.15) - .75, top - .05 + tw, 0, .22], [X(1.15) - 1.15, top + .1 + tw, 0, .17], [X(1.15) - 1.35, top + .3, 0, .08]], M.BODY, { ...o, paint: p => p[0] < X(1.15) - 1.0 ? M.BODY3 : undefined }); // a long, thick brush held out level, curling up at its dark end
  else if (kind === "newt") { m.chain([[...tb, .1], [X(1.35), .3 + tw, 0, .07], [X(1.85), .2 + tw * .5, 0, .04]], M.BODY, o); m.ell([X(1.55), .33 + tw * .7, 0], [.42, .2, .03], M.BODY2, { ...o, dir: [1, -.12, 0] }); } // a newt's tail: a tall flat crested fin (its signature)
  else if (kind === "salamander") m.chain([[...tb, .12], [X(1.3), .18 + tw, 0, .08], [X(1.75), .1, 0, .055], [X(2.1), .16 + tw, 0, .035], [X(2.25), .3 + tw, 0, .02]], M.BODY, { ...o, paint: p => p[0] < X(1.6) && Math.sin(p[0] * 18) > .4 ? M.BELLY : undefined }); // long and slim, banded, curling up at its tip
  else if (kind === "flat") { m.seg(tb, [X(1.15), .3, 0], .1, .09, M.BODY2, o); m.ell([X(1.5), .17 + tw * .5, 0], [.44, .07, .3], M.BODY3, { ...o, dir: [1, .25, 0], paint: p => (Math.floor(p[0] * 14) + Math.floor(p[2] * 14)) % 2 ? M.BODY2 : undefined }); } // the broad scaly paddle, tipped up so it shows (its signature)
  else if (kind === "jaguar") m.chain([[...tb, .07], [X(1.3), top - .3 + tw, 0, .065], [X(1.6), top - .62, 0, .055], [X(1.78), .4 + tw, 0, .05], [X(1.9), .48 + tw, 0, .045]], M.BODY, o); // long and even, its end lifting
  else if (kind === "tiger") m.chain([[...tb, .09], [X(1.3), top - .25 + tw, 0, .08], [X(1.55), top - .6, 0, .07], [X(1.7), .45 + tw, 0, .065], [X(1.82), .5 + tw, 0, .06]], M.BODY, { ...o, paint: p => p[0] < X(1.75) || Math.sin((p[0] + p[1]) * 26) > .45 ? M.BODY3 : undefined }); // long and thick, ringed, its tip black and lifting
  else if (kind === "ringed") m.chain([[...tb, .085], [X(1.2), top - .3, 0, .075], [X(1.5), top - .62 + tw, 0, .068], [X(1.85), .24 + tw, 0, .06], [X(2.1), .36 + tw, 0, .05]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.0) && p[1] > .3 + tw ? M.BELLY : p[0] < X(1.45) && Math.sin(p[0] * 26) > .25 ? M.BODY3 : undefined }); // a cheetah's: long and heavy (its rudder), low, curling up at its end, black rings and a white tip
  else if (kind === "tuft") { m.chain([[...tb, .06], [X(1.2), top - .35, 0, .045], [X(1.45), .32 + tw, 0, .04], [X(1.7), .26 + tw, 0, .035]], M.BODY, o); m.ell([X(1.78), .3 + tw, 0], [.08, .11, .07], M.BODY3, o); } // a lion's: long, hanging low and curling up, a dark tuft at its end
  else if (kind === "meerkat") m.chain([[...tb, .06], [X(1.2), top - .05 + tw, 0, .045], [X(1.55), top + .12 + tw, 0, .035], [X(1.7), top + .3 + tw, 0, .02]], M.BODY, { ...o, paint: p => p[1] > top + .2 ? M.BODY3 : undefined }); // long and thin, held up in a curve, dark-tipped (the meerkat's)
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
  const p1 = v3.add(b, [-.18 * A, .3 * A, out * .4]), p2 = v3.add(b, [-.25 * A, .62 * A, out * .8]), p3 = v3.add(b, [-.1 * A, .95 * A, out]);
  m.chain([[...b, w * 1.2], [...p1, w], [...p2, w * .85], [...p3, w * .4]], mat, o);
  const tips = [p3], tine = (p, d, l, ww) => { const e = v3.add(p, v3.mul(v3.norm(d), l)); tips.push(e); m.seg(p, e, ww, ww * .35, mat, o); };
  tine(v3.add(b, [-.04 * A, .1 * A, out * .1]), [1, .6, 0], .28 * A, w * .8);
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
  m.ell([0, .55 + bob, 0], [.36, .52, .36], M.BODY, { rough: q.down ? .03 : undefined, paint: p => q.down ? (spotty(p, 14, .3) ? M.BODY : M.BELLY) : p[0] > .12 && p[1] < hy - hr * .5 ? (q.bars ? (Math.floor(p[1] * 22) % 2 ? M.BODY2 : M.BELLY) : (Math.floor(p[1] * 18) % 3 === 0 && spotty(p, 16, .5)) ? M.BODY2 : M.BELLY) : undefined });
  // wings: folded (their tips patterned, an adult's), spread like a cloak and edged in moonlight (a legend's), or the old spirit wings
  if (q.cloak) for (const side of [-1, 1]) wing3d(m, [-.05, .78 + bob, side * .3], side, 1.25, frame ? .08 : -.05, M.BODY2, M.WEB, side > 0 ? 40 : 50); // half spread like a cloak, its feathers edged in moonlight
  else if (!has("wings")) for (const side of [-1, 1]) m.ell([-.06, .58 + bob, side * .3], [.4, .3, .08], M.BODY2, { dir: [-.3, -1, 0], up: [1, 0, 0], group: side > 0 ? 4 : 2, paint: p => q.wingTips && p[1] < .42 + bob ? (Math.floor(p[1] * 30) % 2 ? M.BODY3 : M.BELLY) : spotty(p, 12, .15) ? M.BODY3 : undefined });
  // head: big and round, sunk into the shoulders
  m.ell([0, hy, 0], [hr, hr * .9, hr], M.BODY, { rough: q.down ? .02 : undefined });
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

export function hedgehog3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), f = frame ? .03 : 0;
  if (legend && S.elder) return hedgehogElder(S, frame, st, facing);
  for (const [x, z] of [[.28, .2], [.28, -.2], [-.28, .2], [-.28, -.2]]) { const d = (frame ? -1 : 1) * Math.sign(x * z) * .08; m.seg([x, .15, z], [x + d, .03, z], .06, .05, M.BODY3, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x + .03 + d, .03, z], r: .065, group: z > 0 ? 6 : 2 }); } // (a trot: diagonal pairs ahead, then behind)
  const c = [0, .32, 0], r = [.5, .32, .38];
  m.ell(c, r, M.BODY2, { paint: p => spotty(p, 22, .3) ? M.BODY3 : spotty(p, 19, .12) ? M.BELLY : undefined });
  for (let i = 0; i < 64; i++) { const a = (i * 2.399) % (Math.PI * 2), t = (i / 64) * .9 + .05, d = v3.norm([Math.cos(a) * Math.sin(t * Math.PI * .5) - .25, Math.cos(t * Math.PI * .5) * .9 + .1, Math.sin(a) * Math.sin(t * Math.PI * .5)]); if (d[0] > .55) continue; m.ell(v3.add(Model.surface(c, r, d), v3.mul(d, .08)), [.17, .028, .028], i % 4 ? M.BODY2 : M.BODY3, { dir: v3.add(d, [-.3, .05, 0]), group: 1 }); } // signature: long spines bristling past the outline
  const sn = [.48, .22, 0];
  m.ell(sn, [.22, .14, .15], M.BELLY, { dir: [1, -.3, 0], group: 1 });
  m.ell([.69, .16, 0], [.04, .04, .04], M.NOSE, { group: 1 });
  eyesOn(m, sn, [.22, .14, .15], [[.3, .6, .55], [.3, .6, -.55]], .035, legend ? M.MAGIC2 : M.EYE);
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
  for (const side of [-1, 1]) { // folded hind legs, thin front legs
    m.ell([-.24, .15, side * .44], [.28, .13, .13], side > 0 ? M.BODY : M.BODY2, { dir: [1, .3, 0], group: side > 0 ? 6 : 2, paint: p => spotty(p, 14, .15) ? M.BODY3 : undefined });
    m.ell([.06, .04, side * .52], [.2, .04, .09], side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 6 : 2 });
    m.seg([.35, .2 + hop, side * .24], [.42, .03, side * .3], .05, .04, side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 7 : 2 });
    m.anchors.feet.push({ c: [.45, .03, side * .3], r: .06, group: side > 0 ? 7 : 2 }, { c: [.14, .04, side * .52], r: .08, group: side > 0 ? 6 : 2 });
  }
  const c = [0, .26 + hop, 0], r = [.5, .23, .46]; // signature: squat and wide, eye domes standing proud
  m.ell(c, r, M.BODY, { paint: p => p[1] < c[1] - .12 ? M.BELLY : p[0] > .38 && Math.abs(p[1] - (c[1] - .02)) < .018 ? M.LINE : spotty(p, 14, .22) ? M.BODY3 : undefined });
  for (const side of [-1, 1]) { const e = [.3, .55 + hop, side * .2]; m.ell(e, [.12, .12, .12], M.BODY, { group: 1 }); m.ell(Model.surface(e, [.12, .12, .12], v3.norm([.6, .5, side * .5])), [.06, .06, .06], legend ? M.MAGIC2 : M.IRIS, { group: 1 }); m.ell(Model.surface(e, [.13, .13, .13], v3.norm([.65, .45, side * .5])), [.035, .018, .035], M.EYE, { group: 1 }); }
  m.anchors.head = { c: [.22, .45 + hop, 0], r: [.3, .2, .3], top: [.18, .62 + hop, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([.3, .55 + hop, side * .2], [.12, .12, .12], v3.norm([.6, .5, side * .5]))), size: .05 };
  m.anchors.neck = { c: [.32, .3 + hop, 0], r: .25, dir: [1, .3, 0] };
  if (legend && S.legend.includes("sac")) m.ell([.42, .14 + hop, 0], frame ? [.3, .27, .3] : [.24, .21, .25], M.MAGIC2, { group: 8, extra: true, paint: p => spotty(p, 12, .2) ? M.MAGIC : undefined }); // its throat sac swollen into a great glowing balloon, pulsing with each croak
  else if (legend) crown3d(m, [.15, .66 + hop, 0], .16);
  return finish(m, S, level, st, .55, facing);
}

export function raven3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, young = false, has = f => legend && S.legend.includes(f), m = new Model(), bob = frame ? .02 : 0;
  for (const side of [-1, 1]) { const f = (frame ? -1 : 1) * side * .07; m.seg([0, .3, side * .08], [.03 + f, .03, side * .08], .03, .025, M.NOSE, { group: side > 0 ? 7 : 2 }); m.ell([.08 + f, .02, side * .08], [.08, .015, .04], M.NOSE, { group: 2 }); m.anchors.feet.push({ c: [.07 + f, .03, side * .08], r: .06, group: side > 0 ? 7 : 2 }); } // (each frame a step: one foot ahead, the other behind, in turn)
  m.ell([-.55, .42, 0], [.32, .035, .12], M.BODY2, { dir: [-1, -.25, 0], group: 3 });
  m.ell([0, .52 + bob, 0], [.42, .26, .24], M.BODY, { dir: [1, .45, 0] });
  if (!has("wings")) for (const side of [-1, 1]) m.ell([-.1, .55 + bob, side * .2], [.45, .17, .05], M.BODY2, { dir: [-1, -.25, 0], group: side > 0 ? 4 : 2 });
  const hc = [.36, .84 + bob, 0], hr = young ? .19 : .16;
  m.ell(hc, [hr * 1.1, hr, hr * .95], M.BODY, { paint: p => p[1] > hc[1] + hr * .55 ? M.BELLY : undefined });
  m.ell(v3.add(hc, [hr * 1.5, -hr * .25, 0]), [hr * 1.0, hr * .38, hr * .3], M.NOSE, { dir: [1, -.2, 0], group: 1 });
  eyesOn(m, hc, [hr * 1.1, hr, hr * .95], [[.55, .35, .65], [.55, .35, -.65]], hr * .16, legend ? M.MAGIC2 : M.EYE);
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [-.05, .65 + bob, side * .18], side, 1.1, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("eyesRing")) for (let i = 0; i < 6; i++) { const a = Math.PI * (.2 + i / 5 * .6); m.ell([Math.cos(a) * .25 - .1, .95 + Math.sin(a) * .45, (i - 2.5) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
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
  const legend = level === 3, m = new Model(), q = { ...(S.levelQ?.[level] || {}) }, lk = q.legs ?? 1, nk = q.neck ?? 1.45, bk = q.beak ?? 1;
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
  for (let i = legs0; i < m.parts.length; i++) m.parts[i].lean = true; // stilts: never beefed up with the adult's and legend's build
  // body: a slim tilted egg, grey, the wings folded along it with a dark shoulder; a short tail
  m.ell([0, by, 0], [.3, .13, .12], M.BODY, { dir: [1, .3, 0] });
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
  const ck = q.crest ?? 1; if (ck) m.chain([[hc[0] - hr * .6, hc[1] + hr * .4, 0, .016], [hc[0] - hr * 2.2 * ck, hc[1] + hr * .7, 0, .01], [hc[0] - hr * 3.6 * ck, hc[1] + hr * .2, 0, .004]], M.BODY3, { group: 5, extra: true });
  m.seg(v3.add(hc, [hr * .8, -hr * .15, 0]), v3.add(hc, [hr * (.8 + 3.6 * bk), -hr * (.6 + 1.6 * fd), 0]), hr * .3, hr * .05, M.ACCENT, { group: 1 });
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
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = has("wingsBig") ? 1.5 : 1;
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
  m.ell([0, y, 0], [.13, .16, .12], M.BODY, { group: 1 });
  const hc = [.08, y + .2, 0];
  m.ell(hc, [.12, .11, .11], M.BODY, { group: 1 });
  for (const side of [-1, 1]) m.ell(v3.add(hc, [-.02, .15, side * .07]), [.12, .045, .02], M.BODY, { dir: [.1, 1, side * .3], up: [1, 0, 0], group: 1, paint: p => p[0] > hc[0] - .01 ? M.EAR : undefined });
  eyesOn(m, hc, [.12, .11, .11], [[.7, .2, .5], [.7, .2, -.5]], .025, legend ? M.MAGIC2 : M.EYE);
  m.ell(Model.surface(hc, [.12, .11, .11], [1, -.2, 0]), [.025, .02, .03], M.NOSE, { group: 1 });
  return finish(m, S, level, st, .55, facing);
}

export function mole3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), f = frame ? .03 : 0;
  m.seg([-.58, .16, 0], [-.7, .1, 0], .04, .02, M.SKIN, { group: 3 });
  for (const side of [-1, 1]) { const d = (frame ? 1 : -1) * side * .06; m.ell([-.3 + d, .05, side * .2], [.07, .04, .05], M.SKIN, { group: side > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [-.3 + d, .05, side * .2], r: .07, group: side > 0 ? 6 : 2 }); } // (its back feet stepping, against its hands)
  m.ell([0, .26, 0], [.6, .25, .33], M.BODY, { paint: p => p[1] > .4 ? M.BODY2 : undefined }); // signature: a long low barrel with huge spade hands
  m.ell([.64, .22, 0], [.26, .07, .07], M.SKIN, { dir: [1, -.15, 0], group: 1 });
  m.ell([.89, .18, 0], [.04, .05, .06], M.NOSE, { group: 1 });
  const elder = legend && S.elder, hk = elder ? 1.55 : 1; // (the elder's huge hands)
  for (const side of [-1, 1]) { // spade hands, turned out, clawed
    const h = [.38 + (frame ? -1 : 1) * side * .06, .12 * (elder ? 1.25 : 1) - (side > 0 ? f : 0), side * .42 * (elder ? 1.12 : 1)]; // (its spade hands paddling, one ahead, then the other)
    m.ell(h, [.19 * hk, .05 * hk, .17 * hk], M.SKIN, { group: side > 0 ? 7 : 2, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], paint: elder ? p => spotty(p, 40, .2) ? M.EAR : undefined : undefined });
    for (let k = 0; k < 4; k++) { const cb = v3.add(h, [.2 * hk, -.01, side * (k - 1.5) * .07 * hk]); m.ell(cb, [.07 * hk, .02 * hk, .02 * hk], M.ACCENT, { group: side > 0 ? 7 : 2 });
      if (elder) { m.ell(v3.add(cb, [.06 * hk, -.004, 0]), [.05 * hk, .032 * hk, .032 * hk], M.WOOD, { group: 140, extra: true }); if (k === 1 || (side > 0 && k === 3)) m.ell(v3.add(cb, [-.03 * hk, 0, 0]), [.012, .03 * hk, .03 * hk], M.WOOD, { group: 141, extra: true }); } } // gold-capped claws, rings on its fingers
    if (elder && side > 0) { const top = v3.add(h, [.3 * hk, .0, .05]), lan = v3.add(top, [.06, -.0, .06]); m.seg(v3.add(top, [0, .05, 0]), v3.add(lan, [0, .2, 0]), .012, .012, M.TRUNK, { group: 142, extra: true }); m.box(v3.add(lan, [0, .07, 0]), [.1, .13, .1], M.WOOD, { group: 142, extra: true, round: .015, paint: p => Math.abs(p[1] - lan[1] - .07) < .09 && (Math.abs(p[0] - lan[0]) < .075 || Math.abs(p[2] - lan[2]) < .075) ? M.GLOW : undefined }); m.ell(v3.add(lan, [0, .22, 0]), [.06, .035, .06], M.WOOD, { group: 142, extra: true }); } // a dim lantern hung off a claw
  }
  for (const side of [-1, 1]) m.ell(Model.surface([0, .26, 0], [.6, .25, .33], v3.norm([.85, .3, side * .35])), [.015, .015, .015], elder ? M.WEB : legend ? M.MAGIC2 : M.EYE, { group: 1 }); // (the elder's: milky, blind)
  m.anchors.head = { c: [.32, .34, 0], r: [.25, .22, .25], top: [.3, .58, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([0, .26, 0], [.6, .25, .33], v3.norm([.85, .3, side * .35]))), size: .03 };
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
export function armadillo3d(S, level, frame, st, facing = "towards") {
  if (level === 3) return armadilloBall(S, frame, st, facing);
  const legend = false, m = new Model(), bob = frame ? .012 : 0;
  for (const [x, z] of [[.26, .2], [.26, -.2], [-.28, .21], [-.28, -.21]]) { const d = (frame ? -1 : 1) * Math.sign(x * z) * .06; m.seg([x, .14, z], [x + d, .03, z], .06, .05, M.SKIN, { group: z > 0 ? 6 : 2 }); for (let k = -1; k <= 1; k++) m.ell([x + d + .06, .02, z + k * .025], [.035, .012, .01], M.ACCENT, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x + .03 + d, .03, z], r: .065, group: z > 0 ? 6 : 2 }); }
  const c = [0, .3 + bob, 0], r = [.5, .27, .32], band = p => Math.floor((p[0] + .26) * 15);
  m.ell(c, r, M.BODY, { paint: p => p[0] > -.26 && p[0] < .2 ? (band(p) % 2 ? M.BODY2 : M.BODY) : spotty(p, 26, .3) ? M.BODY3 : spotty(p, 22, .2) ? M.BODY2 : undefined }); // signature: the shell, banded across its middle
  m.ell([0, .17 + bob, 0], [.46, .08, .3], M.SKIN, { group: 1 }); // its soft underside showing under the shell's rim
  const hc = [.6, .22 + bob, 0], hr = [.14, .12, .12];
  m.ell(hc, hr, M.BODY, { paint: p => p[1] > hc[1] + .04 ? M.BODY2 : undefined });
  m.seg(v3.add(hc, [.08, -.02, 0]), v3.add(hc, [.3, -.08, 0]), .055, .022, M.SKIN, { group: 1 }); // the long tapering snout
  m.ell(v3.add(hc, [.31, -.08, 0]), [.025, .025, .028], M.NOSE, { group: 1 });
  for (const side of [-1, 1]) m.ell(v3.add(hc, [-.03, .15, side * .07]), [.1, .035, .03], M.SKIN, { dir: [-.2, 1, side * .35], group: 1 }); // upright ears
  eyesOn(m, hc, hr, [[.55, .3, .6], [.55, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
  m.chain([[-.46, .24 + bob, 0, .08], [-.66, .12, 0, .05], [-.86, .05, 0, .02]], M.BODY, { paint: p => Math.floor(p[0] * 30) % 2 ? M.BODY2 : undefined, group: 3 }); // the ringed tail
  m.anchors.head = { c: hc, r: hr, top: [hc[0], hc[1] + .16, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(hc, hr, v3.norm([.55, .3, side * .6]))), size: .025 };
  m.anchors.neck = { c: [.44, .22 + bob, 0], r: .12, dir: [1, -.1, 0] };
  if (legend) crystals3d(m, [[[-.2, .54, .1], .35], [[0, .57, -.1], .5], [[.18, .53, .1], .4], [[-.05, .56, .18], .3]]);
  return finish(m, S, level, st, .5, facing);
}

export function beetle3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model();
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) { // six jointed legs, alternating
    const x = .25 - i * .25, ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .06 : -.06, base = [x, .22, side * .2];
    m.chain([[...base, .03], [x + ph + (1 - i) * .06, .32, side * .42, .025], [x + ph * 1.5 + (1 - i) * .15, .02, side * .55, .015]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  m.ell([-.12, .34, 0], [.46, .24, .32], M.BODY, { paint: p => Math.abs(p[2]) < .018 && p[1] > .4 ? M.LINE : p[1] > .5 && p[2] > .05 && p[2] < .17 ? M.BELLY : undefined });
  m.ell([.38, .33, 0], [.16, .16, .26], M.BODY, { group: 1 });
  const hc = [.56, .3, 0];
  m.ell(hc, [.1, .1, .17], M.BODY2, { group: 1 });
  const jl = [.3, .7, .95, 1.0][level] * (has("horn") ? 1.3 : 1), jm = has("horn") ? M.MAGIC : M.BODY3;
  for (const side of [-1, 1]) { const b = v3.add(hc, [.08, .02, side * .1]), e = v3.add(b, [jl * .7, jl * .45, side * jl * .15]), t = v3.add(e, [jl * .25, -jl * .12, -side * jl * .12]); m.chain([[...b, .045], [...e, .035], [...t, .015]], jm, { group: 8 + (side > 0 ? 1 : 0) }); m.seg(v3.lerp(b, e, .55), v3.add(v3.lerp(b, e, .55), [.0, jl * .22, 0]), .02, .008, jm, { group: 8 }); }
  for (const side of [-1, 1]) m.chain([[...v3.add(hc, [.05, .06, side * .1]), .012], [hc[0] + .1, .5, side * .22, .012], [hc[0] + .2, .5, side * .26, .012]], M.BODY3, { group: 9, extra: true });
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
    const sh = q.shields ? 1.18 : 1, c = [x, .19 + (q.shields ? .02 : 0), 0], r = [w * .62 * sh, .2 * prof * sh, .31 * prof * sh];
    m.ell(c, r, shell, { group: 1, dir: [1, q.shields ? -.15 : 0, 0], paint: p => q.flecks && p[0] < x - w * .3 && spotty(p, 40, .35) ? M.BELLY : undefined });
    if (q.rim) m.ell(v3.add(c, [-w * .45, .01, 0]), [w * .16, r[1] * 1.04 + .01, r[2] * 1.04 + .01], q.flecks ? rimMat : rimMat, { group: 2, paint: p => q.flecks && spotty(p, 50, .4) ? M.BELLY : undefined });
    if (q.shields) for (const side of [-1, 1]) m.seg(v3.add(c, [0, -.02, side * r[2] * .9]), v3.add(c, [-w * .3, -.08, side * (r[2] + .17)]), .04, .004, M.BODY3, { group: 3, extra: true }); // spiked edges
    if (q.crystals && i % 2 === 1) { const b = v3.add(c, [0, r[1] * .8, 0]), tip = v3.add(b, [-.04, .26 + (i % 4 ? .06 : 0), (i % 4 - 1.5) * .04]); m.seg(b, tip, .055, .006, M.RUNE, { group: 80 + i, extra: true }); m.seg(v3.add(b, [.02, 0, .05]), v3.add(b, [.06, .14, .1]), .03, .004, M.MAGIC2, { group: 80 + i, extra: true }); } // a moonstone, pointed, with a smaller one beside it
    if (q.leaves && i % 3 === 0) m.flat(v3.add(c, [-w * .3, r[1] * .8, (i % 2 ? 1 : -1) * r[2] * .5]), v3.norm([1, .2, 0]), v3.norm([0, .5, i % 2 ? 1 : -1]), .07, .045, (a, b) => a * a + b * b * 1.6 < 1 ? (Math.abs(b) < .12 ? M.TRUNK : M.ACCENT) : null, { group: 90 + i, extra: true }); // a dry leaf caught in its plates
  }
  if (q.tailSpikes) for (const side of [-1, 1]) m.seg([-.55, .12, side * .08], [-.75, .08, side * .14], .03, .006, M.BODY3, { group: 4, extra: true });
  const hc = [.58, .15, 0], hr = [.12, .1, .17]; m.ell(hc, hr, M.BODY2, { group: 1 }); // its head, in front of the plates
  m.anchors.head = { c: hc, r: hr, top: [.3, .58, 0] }; // (its top: a party hat sits on its front plate, above its head)
  eyesOn(m, hc, hr, [[.8, .45, .45], [.8, .45, -.45]], .026, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .4, facing);
}

export function snake3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, young = false, has = f => legend && S.legend.includes(f), m = new Model(), ph = frame ? .7 : 0, pts = [];
  for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([-.9 + t * 1.2, .07, Math.sin(t * Math.PI * 2 + ph) * .25 * (1 - t * .5), .03 + .045 * Math.sin(Math.min(1, t * 1.4) * Math.PI / 2)]); }
  pts.push([.38, .25, pts[12][2], .07], [.42, .45, pts[12][2] * .8, .065]);
  m.chain(pts, M.BODY, { paint: p => p[1] < .05 && p[0] < .35 ? M.BELLY : spotty([p[0] * 1.5, p[1], p[2]], 14, .3) ? M.BODY3 : undefined });
  const hc = [.5, .5, pts[13][2] * .8], hr = young ? .11 : .09;
  m.rig = { spine: pts.map(p => p.slice()), head: hc, hr }; // the live rig's spine (tail to head, each [x, y, z, radius]) and head, in model units
  m.part = "head";
  m.ell(hc, [hr * 1.5, hr * .75, hr], M.BODY, { dir: [1, -.15, 0], group: 1 });
  eyesOn(m, hc, [hr * 1.5, hr * .75, hr], [[.5, .5, .7], [.5, .5, -.7]], hr * .22, legend ? M.MAGIC2 : M.EYE);
  if (!frame) m.seg(v3.add(hc, [hr * 1.4, -hr * .2, 0]), v3.add(hc, [hr * 2.3, -hr * .3, 0]), .01, .008, M.SKIN, { group: 1 });
  m.anchors.feet.push({ c: v3.add(pts[0].slice(0, 3), [-.02, -.01, 0]), r: .06, group: 3, tail: true }); // no feet: a tiny shoe on the tail tip
  m.anchors.neck = { c: [.42, .36, pts[12][2] * .9], r: .075, dir: [.2, 1, 0] };
  m.part = "body";
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [0, .2, side * .05], side, .9, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  return finish(m, S, level, st, .45, facing);
}

export function moth3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = has("wingsBig") ? 1.45 : 1;
  const wm = has("wingsBig") ? M.MAGIC : M.BODY;
  shadow(m, 0, .3 * span);
  for (const side of [-1, 1]) {
    const lift = up ? .5 : -.1, fore = v3.norm([.35, lift, side]), hind = v3.norm([-.3, lift * .6, side]);
    m.flat(v3.add([0, y, side * .05], v3.mul(fore, .38 * span)), fore, v3.norm(v3.cross(fore, [0, 1, 0])), .4 * span, .24 * span, masks.spotted(wm, M.BELLY, M.BODY3), { group: 10 + (side > 0 ? 1 : 0) });
    m.flat(v3.add([-.05, y, side * .05], v3.mul(hind, .26 * span)), hind, v3.norm(v3.cross(hind, [0, 1, 0])), .27 * span, .17 * span, masks.spotted(has("wingsBig") ? M.MAGIC2 : M.BODY2, M.BODY2, M.BODY2), { group: 12 + (side > 0 ? 1 : 0) });
    m.chain([[.12, y + .08, side * .03, .015], [.2, y + .25, side * .1, .025], [.24, y + .32, side * .14, .012]], M.BODY2, { group: 11 });
  }
  m.ell([0, y, 0], [.22, .09, .09], M.BELLY, { group: 1, paint: p => spotty(p, 30, .25) ? M.BODY2 : undefined });
  m.ell([.17, y + .03, 0], [.07, .07, .07], M.BELLY, { group: 1 });
  eyesOn(m, [.17, y + .03, 0], [.07, .07, .07], [[.7, .3, .6], [.7, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
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
export function crab3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), q = S.levelQ?.[level] || {};
  const cw = q.shell ?? 1, big = q.claw ?? 1, y = .3 * cw;
  const shell = [0, y, 0], sr = [.42 * cw, .15 * cw, .28 * cw];
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, four a side, out along x (the way it scuttles): kneed high
    const z = .12 - i * .1, ph = ((i + (side > 0 ? 1 : 0) + frame) % 2 ? 1 : -1) * .05, base = [side * sr[0] * .8, y - .02, z * cw];
    m.chain([[...base, .035 * cw], [side * (sr[0] + .2) * cw + ph, y + .14 * cw, (z - .04) * cw, .03 * cw], [side * (sr[0] + .34) * cw + ph * 1.6, .02, (z - .1) * cw, .015 * cw]], i % 2 ? M.BODY2 : M.BODY, { group: side > 0 ? 7 : 2 });
  }
  const reef = has("reef");
  m.ell(shell, sr, M.BODY, { paint: p => (q.barnacles && spotty(p, 18, reef ? .3 : .12)) ? M.BELLY : reef && Math.abs(Math.sin(p[0] * 30 + p[2] * 11)) < .05 ? M.BODY3 : p[1] > y + sr[1] * .55 ? M.BODYL : undefined }); // the carapace, its top lit (an elder's crusted and scarred)
  if (reef) for (let i = 0; i < 12; i++) { const a = i * 2.4, rr = .2 + (i % 4) * .2, c = [Math.cos(a) * sr[0] * rr - .08, y + sr[1] * (.95 - rr * .45), Math.sin(a) * sr[2] * rr * .8 - .04], h = (.07 + (i % 4) * .025) * cw; m.ell(v3.add(c, [0, h * .5, 0]), [h * .6, h, h * .6], M.BELLY, { group: 4, paint: p => p[1] > c[1] + h * 1.2 ? M.BODY3 : p[0] < c[0] - h * .2 ? M.BODY2 : undefined }); } // knobs of coral and barnacle cones
  m.ell([0, y - sr[1] * .4, sr[2] * .3], [sr[0] * .85, sr[1] * .55, sr[2] * .8], M.BELLY, { group: 1 }); // its pale underside in front
  for (const side of [-1, 1]) { // the claws, at the front (towards the camera); the right one a fiddler's great claw
    const k = side > 0 ? big : 1, great = side > 0 && big > 1.2, cm = great ? M.BODY : M.BODY2, out = great ? .12 * (k - 1) : 0; // (the great claw held out to the side, clear of its face)
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
  for (const side of [-1, 1]) { const b = [side * .07 * cw, y + sr[1] * .6, sr[2] * .7], e = v3.add(b, [side * .02, .14 * cw, .04 * cw]); m.seg(b, e, .018 * cw, .014 * cw, M.BODY2, { group: 9 }); m.ell(e, [.04 * cw, .045 * cw, .04 * cw], legend ? M.MAGIC2 : M.EYE, { group: 9 }); } // eyes on stalks (a legend's lit)
  m.anchors.head = { c: [0, y + sr[1] * .7, sr[2] * .7], r: [.12, .1, .1], top: [0, y + sr[1] + .12, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => [side * .09 * cw, y + sr[1] * .6 + .14 * cw, sr[2] * .7 + .04 * cw]), size: .04 * cw };
  m.anchors.neck = { c: [0, y + sr[1] * .2, sr[2] * .6], r: .14 * cw, dir: [0, 0, 1] };
  return finish(m, S, level, st, .45, facing);
}

export function spider3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model();
  const ce = [.15, .28, 0];
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, knees high
    const a = (-.6 + i * .4), ph = (i + (side > 0 ? 0 : 1) + frame) % 2 ? .05 : -.05, base = v3.add(ce, [.05 - i * .04, 0, side * .1]);
    const knee = v3.add(base, [Math.cos(a) * .3 * (i < 2 ? 1 : -.6) + ph, .3, side * .3]), foot = v3.add(base, [Math.cos(a) * .55 * (i < 2 ? 1 : -.8) + ph * 1.5, -.28, side * .55]);
    m.chain([[...base, .03], [...knee, .028], [...foot, .015]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  m.ell([-.28, .38, 0], [.34, .28, .3], M.BODY, { paint: p => (Math.abs(p[2]) < .03 || Math.abs(p[0] + .28) < .03) && p[1] > .45 ? M.BELLY : undefined });
  m.ell(ce, [.18, .13, .17], M.BODY2, { group: 1 });
  m.anchors.head = { c: ce, r: [.18, .13, .17] };
  m.anchors.eyes = { pts: [[.05, .05], [.05, -.05]].map(([dy, dz]) => Model.surface(ce, [.18, .13, .17], v3.norm([.9, dy * 6, dz * 4]))), size: .03 };
  m.anchors.neck = { c: [-.02, .32, 0], r: .15, dir: [1, 0, 0] };
  const ring = has("eyesRing");
  for (const [dy, dz] of [[.05, .05], [.05, -.05], [.02, .1], [.02, -.1]]) m.ell(Model.surface(ce, [.18, .13, .17], v3.norm([.9, dy * 6, dz * 4])), [.025, .025, .025], ring ? M.MAGIC2 : M.EYE, { group: 1 });
  if (ring) for (let i = 0; i < 5; i++) { const a = Math.PI * (.2 + i / 4 * .6); m.ell([-.3 + Math.cos(a) * .2, .75 + Math.sin(a) * .35, (i - 2) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
  return finish(m, S, level, st, .5, facing);
}

// Witch creatures built in 3D (see model3d.js), so they stand in true three-quarter view.
// Units: the shoulder is about 1 high; x forward, y up, z towards the near side.
import { M, rng, uni } from "./core.js";
import { Model, render, v3, spotty, masks } from "./model3d.js";
import { faceUp } from "./genome/expressions.js";
import { textureLumps } from "./genome/texture.js";

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
function wing3d(m, root, side, span, up, mat, mat2, group) {
  // one shaped plane: a feathered outline, raised and swept back, its leading edge forward
  const tip = v3.add(root, [-span * .7, span * (.75 + up), side * span * .35]), u = v3.norm(v3.sub(tip, root));
  const v = v3.norm(v3.sub([1, 0, 0], v3.mul(u, v3.dot([1, 0, 0], u)))), L = Math.hypot(...v3.sub(tip, root));
  m.flat(v3.add(v3.lerp(root, tip, .5), v3.mul(v, -span * .14)), u, v, L * .55, span * .34, masks.wing(mat, mat2), { group, extra: true });
}

// The size a creature is drawn at: babies are chunky, about 28 to 32 pixels (the coordinator).
const drawHeight = (level, st, k = 1) => level === 0 ? Math.round(Math.max(12, Math.min(30 * Math.max(.75, Math.min(1.1, k)), height3d(1, st) * k * .72))) // a baby: about 30, never taller than 3/4 of its young
  : level === 2 ? height3d(2, st, k) // an adult: 1.65 times its young
  : level === 3 ? Math.round(Math.max(height3d(3, st) * k, height3d(2, st, k) * LEGEND_OVER_ADULT)) // a legend: far above its adult
  : height3d(level, st) * k;
// An adult's heavier build for the body plans without their own: every part thicker across (x and z), not taller.
const beef = (m, k) => { for (const q of m.parts) { if (q.type === "ell") q.r = [q.r[0] * k, q.r[1], q.r[2] * k]; else if (q.type === "box") q.h = [q.h[0] * k, q.h[1], q.h[2] * k]; else { q.r1 *= k; q.r2 *= k; } } };

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
export const SHOE_FITS = ["hoof", "paw", "claw"];
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
//   brambles: { count, berries }: bramble vines winding over its body, thorny, leafed, with berries (its palette's flower colour).
export const EVOLVE_KINDS = ["mane", "wisps", "eyeglint", "stones", "claws", "moss", "tails", "ruff", "brambles"];
function evolve3d(m, feats, c) {
  for (const f of feats) {
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
  const q = { legW: 1, earS: 1, hgt: 1, bw: .3, ...S.q, ...(S.levelQ?.[level] || {}) }, legend = level === 3, juv = level === 1, baby = level === 0, has = f => (legend && !S.levelFeatures?.[3] && S.legend.includes(f)) || (q.features || []).includes(f); // (an evolved legend, its genome levels[3], replaces its old legend feature)
  const feats = S.levelFeatures?.[level];
  const sz = k => S.sizes[k][level]; // its template's size curves (art/genome/templates.js): baby, young, adult, legend
  const m = new Model();
  const hr = q.hr * sz("head") * (st.head / .44) ** .5, len = q.len * sz("len") * st.long;
  const legK = sz("legK");
  const bob = frame ? -.04 : 0, top = 1 + bob, chest = q.chest * sz("chestDeep") * sz("chestBig") / legK + bob, tuck = q.tuck * sz("tuck") / legK + bob; // a big one's deeper chest and belly
  const bw = q.bw * sz("body") * (q.legW > 1.2 ? 1.15 : 1), lw = .06 * q.legW * sz("limbA") * sz("limbB");
  const hump = q.back === "hump" ? q.hump ?? .1 * (q.humpK ?? 1) : 0, arch = q.back === "arch" ? .1 : 0, front = q.front ?? 1; // front: a heavier front (an adult boar's)
  // ---- markings, painted by where a point is on the body ----
  const bellyY = chest + .12;
  const paintBody = p => {
    if (q.belly && p[1] < bellyY && p[0] > -len * .5) return M.BELLY;
    if (q.saddle && p[1] > top - .18 && p[0] < len * .55) return M.BODY2;
    if (q.spots && p[1] > chest + .1 && spotty(p, 10, .22)) return q.spotMat === "belly" || (q.spots === "young" && juv) ? M.BELLY : q.spots === "young" ? undefined : M.BODY3;
    if (q.ridge && p[1] > top - .08 + hump * .5) return M.BODY3;
    if (q.bands && p[1] > chest && p[0] > -len * 1.1 && Math.floor((p[1] - chest) / Math.max(.01, top + hump - chest) * q.bands.n * 2 + .5) % 2) return M[q.bands.mat || "BELLY"]; // a piglet's stripes, running its length
    return undefined;
  };
  // ---- torso: a deep chest, a tucked waist, a rump ----
  m.ell([len * .48, (top + chest) / 2 + hump * .5, 0], [len * .62, (top - chest) / 2 * front + hump * .5, bw * front], M.BODY, { paint: paintBody });
  m.ell([-len * .5, (top + tuck) / 2 + arch * .6, 0], [len * .58, (top - tuck) / 2 + arch * .6, bw * .93], M.BODY, { paint: paintBody });
  m.ell([0, (top + (chest + tuck) / 2) / 2 + .02, 0], [len * .6, (top - (chest + tuck) / 2) / 2, bw * .9], M.BODY, { paint: paintBody });
  if (q.ridge) for (let i = 0; i < (legend ? 16 : 10); i++) { const x = -len * .8 + i * len * 1.75 / (legend ? 15 : 9), h = (.07 + (legend ? .04 : 0)) * (1 + .5 * Math.max(0, x / len)); m.ell([x, top + .02 + hump * Math.max(0, 1 - Math.abs(x / len - .5) * 2) + h * .5, 0], [h, .03, bw * .25], M.BODY3, { dir: [-.3, 1, 0], up: [1, 0, 0] }); }
  if (q.wool) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; m.ell([len * Math.cos(a) * .7, (top + chest) / 2 + Math.sin(a) * .2, bw * (i % 2 ? .5 : -.5)], [.16, .14, .14], M.BODY); }
  // ---- legs: shoulder/hip, knee, ankle, foot; near legs lighter, far legs in shade ----
  const sw = [.32, -.32][frame];
  m.rig = { legs: [], len, bw, top, chest, tuck }; // the live rig's joints (art/genome/parts.js), in model units
  const leg = (fore, side) => {
    m.part = `leg${fore ? "F" : "H"}${side > 0 ? "N" : "F"}`; // fore or hind, near or far
    const z = side * bw * .62, x = fore ? len * .62 : -len * .62, a = (fore ? 1 : -1) * side * sw, topY = fore ? chest + .1 : tuck + .15;
    const lift = (fore ? side : -side) * (frame ? 1 : -1) > 0 ? .06 : 0;  // the leg swinging forward is lifted
    const knee = [x + Math.sin(a) * .2 + (fore ? .02 : .1), Math.max(.3, topY * .55), z], foot = [x + Math.sin(a) * .42, .05 + lift, z];
    const hipTop = [x, topY + .12, z * .8], mat = side > 0 ? (q.legMat || M.BODY) : (q.legMat ? M.BODY3 : M.BODY2);
    const pts = fore ? [[...hipTop, lw * 1.5], [...knee, lw * 1.05], [...foot, lw * .9]] : [[...hipTop, lw * 2 * (q.haunch || 1)], [...v3.add(knee, [-.12, .06, 0]), lw * 1.2], [...v3.add(foot, [-.06 * (q.hindFoot || 1), .12, 0]), lw * .9], [...foot, lw * .9]];
    m.chain(pts, mat, { group: side > 0 ? 6 + (fore ? 1 : 0) : 2, paint: q.socks || q.beads ? p => q.beads && p[1] > .12 && p[1] < (q.socks ?? 0) + .45 && Math.floor(p[1] * 16) % 3 === 0 && spotty(p, 30, .55) ? M.STONE : q.socks && p[1] < q.socks ? M.BODY3 : undefined : undefined }); // beads: stone-grey prayer beads round its legs
    const fl = (q.paw === "hoof" ? .07 : .09) * (q.legW ** .5) * (!fore ? (q.hindFoot || 1) : 1);
    m.ell(v3.add(foot, [fl * .5, -.01, 0]), [fl, lw * .9, lw * 1.1], q.paw === "hoof" ? M.NOSE : mat, { group: side > 0 ? 6 + (fore ? 1 : 0) : 2 });
    m.anchors.feet.push({ c: v3.add(foot, [fl * .5, -.01, 0]), r: Math.max(fl, lw * 1.1), group: side > 0 ? 6 + (fore ? 1 : 0) : 2, fit: q.paw === "hoof" ? "hoof" : "paw" });
    m.rig.legs.push({ name: m.part, fore, side, hip: hipTop, knee: fore ? knee : v3.add(knee, [-.12, .06, 0]), foot, r: [pts[0][3], pts[1][3], lw * .9], fl, mat, hoof: q.paw === "hoof" });
    m.part = "body";
  };
  for (const side of [-1, 1]) { leg(true, side); leg(false, side); }
  // ---- neck and head, turned towards us ----
  m.part = "head"; // the neck, head, ears, eyes, horns, antlers and tusks: one piece, hung from the neck's base
  const nb = [len * .82, top - .12, 0], H = [nb[0] + Math.cos(q.neckAng) * q.neck * .9, nb[1] + Math.sin(q.neckAng) * q.neck * .9 + sz("headLift"), 0];
  m.seg(nb, H, q.neckW * .55 * sz("neckBase"), q.neckW * .42 * sz("neckTop"), M.BODY, { paint: p => q.belly && p[1] < (nb[1] + H[1]) / 2 - .05 ? M.BELLY : q.face === "dark" ? M.BODY2 : undefined });
  const headPaint = p => {
    if (q.face === "badger") return Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) + (p[0] - H[0]) * .1 || p[1] < H[1] - hr * .1 ? (q.blazeGlow && Math.abs(p[2]) < hr * .22 * (q.blaze ?? 1) && p[1] > H[1] - hr * .1 ? M.RUNE : M.BELLY) : M.BODY3; // blaze: the stripe's width; blazeGlow: it glows in moonlight
    if (q.face === "dark") return M.BODY2;
    if (q.frost && p[0] > H[0] + hr * .7 && spotty(p, 26, .45)) return M.WEB; // frost on its muzzle
    if (q.mask && p[0] > H[0] + hr * .15 && p[1] > H[1] - hr * .4 && p[1] < H[1] + hr * .45) return M.BELLY; // a white mask over its eyes and muzzle
    if ((q.belly || q.muzzle) && p[1] < H[1] - hr * .35) return M.BELLY;
    return undefined;
  };
  m.ell(H, [hr * 1.05, hr * .92, hr * .88], M.BODY, { paint: headPaint });
  const L = hr * q.snout * sz("snout"), Dm = hr * q.snoutD * .55, sn = [H[0] + hr * .65 + L * .5, H[1] - hr * .28, 0];
  m.ell(sn, [L * .62 + hr * .2, Dm, Dm * .95], M.BODY, { dir: [1, -.25, 0], paint: p => (q.muzzle || q.belly) && p[1] < sn[1] - Dm * .1 ? M.BELLY : headPaint(p) });
  const tip = [sn[0] + L * .62 + hr * .1, sn[1] - .02, 0];
  m.ell(tip, [hr * (q.disc ? .1 : .12), hr * (q.disc ? .2 : .12), hr * (q.disc ? .2 : .15)], M.NOSE, { group: 1 });
  // eyes: both show; legends' glow
  for (const side of [-1, 1]) { const e = Model.surface(H, [hr * 1.05, hr * .92, hr * .88], v3.norm([.75, .32, side * .62])); m.ell(e, [hr * .13, hr * .16, hr * .13].map(v => v * (q.eyeK || 1) * sz("eye")), (legend && !q.tusks) || q.eyeGlow ? M.MAGIC2 : M.EYE, { group: 1 }); } // (eyeGlow: an evolved level's eye catching the light, the legend boar's under its hump)
  m.anchors.head = { c: H, r: [hr * 1.05, hr * .92, hr * .88], top: [H[0] - hr * .1, H[1] + hr * .82, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface(H, [hr * 1.05, hr * .92, hr * .88], v3.norm([.75, .32, side * .62]))), size: hr * .16 * (q.eyeK || 1) * sz("eye") };
  m.anchors.neck = { c: v3.lerp(nb, H, sz("neckAnchor")), r: q.neckW * .5 * sz("neckR"), dir: v3.norm(v3.sub(H, nb)), tag: sz("tag") }; // lower on the neck when the head is big
  // ears
  for (const side of [-1, 1]) {
    const E = q.ear, base = [H[0] - hr * .15, H[1] + hr * .7, side * hr * .5], k = q.earS * sz("ear") * (q.ear === "long" ? .62 : 1);
    if (E === "none") continue;
    if (E === "round") { m.ell(base, [hr * .22, hr * .25 * k, hr * .1], M.BODY, { group: 1, paint: p => p[0] > base[0] + hr * .02 ? M.EAR : undefined }); continue; }
    const long = E === "long", droop = E === "small" ? -.6 : 0, eh = hr * .55 * k * (E === "big" ? 1.35 : long ? 2.2 : 1), ew = hr * .3 * (E === "big" ? 1.2 : long ? 1.35 : 1);
    const dirE = v3.norm([droop * .6 - (long ? .3 : .12), 1, side * .3]), n = v3.norm([.55, .2, side]), across = v3.norm(v3.cross(n, dirE)); // the ear opens forward and out, towards us on the near side
    m.flat(v3.add(base, v3.mul(dirE, eh)), across, dirE, ew, eh, masks.ear(M.BODY, M.EAR, M.BODY3), { group: 5 + (side > 0 ? 0 : 20), extra: long });
    if (E === "tuft") m.seg(v3.add(base, [0, eh * 1.4, side * .02]), v3.add(base, [0, eh * 1.85, side * .04]), hr * .05, hr * .02, M.BODY3, { group: 1 });
  }
  // ---- tail ----
  const tb = [-len * 1.05, top - .1 + arch * .5, 0], tw = frame ? .04 : -.02;
  m.part = "tail"; m.rig.head = { nb, H, hr }; m.rig.tail = tb;
  if (!has("tails") && !feats?.some(f => f.kind === "tails" && f.replace)) tail3d(m, has("starTail") ? "star" : q.tail, tb, len, top, tw);
  m.part = "head";
  // ---- horns, antlers, tusks ----
  const hornTips = [];
  if (q.horns === "twist") for (const side of [-1, 1]) hornTips.push(horn3d(m, [H[0] - hr * (.05 + (q.horn?.back ?? 0)), H[1] + hr * (.6 + (q.horn?.up ?? 0)), side * hr * (.45 + (q.horn?.wide ?? 0))], side, /* back, up, wide: its base moved, in head radii (clear of the brows) */ { ...q.horn, length: (q.horn?.length ?? 2) * hr, r: (q.horn?.r ?? .3) * hr }));
  else if (q.horns) for (const side of [-1, 1]) { const k = has("hornsGlow") ? 1.5 : sz("horns"), pts = []; for (let i = 0; i <= 8; i++) { const a = .3 - i / 8 * Math.PI * 1.6, r = hr * .65 * k * (1 - .45 * i / 8); pts.push([H[0] - hr * .1 + Math.cos(a) * r, H[1] + hr * .45 + Math.sin(a) * r, side * (hr * .6 + i * .015)]); pts[i].push(hr * .2 * k * (1 - .6 * i / 8)); } m.chain(pts, has("hornsGlow") ? M.MAGIC : M.ACCENT, { group: 13 }); }
  if (q.antlers || has("jackalope")) for (const side of [-1, 1]) antlers3d(m, q, [H[0] - hr * .05, H[1] + hr * .75, side * hr * .4], side, sz("antlers"), has);
  const tuskTips = [];
  if (q.tusks) for (const side of [-1, 1]) {
    const k = has("tusksBig") ? 1.4 : q.tuskSize ?? sz("tusks"); if (!k) continue; const b = [sn[0] + L * .25, sn[1] - Dm * .4, side * Dm * .8];
    if (q.tuskCurl === undefined) { m.chain([[...b, .045 * k], [...v3.add(b, [.1 * k, .1 * k, side * .03]), .04 * k], [...v3.add(b, [.06 * k, .24 * k, side * .05]), .02 * k]], M.ACCENT, { group: 8 }); tuskTips.push(v3.add(b, [.06 * k, .24 * k, side * .05])); continue; }
    // an evolved tusk (genome levels): a tapering curve out, up and back round by tuskCurl (half turns), its tip fine
    const pts = [], n = 9, R = .13 * k;
    for (let i = 0; i <= n; i++) { const t = i / n, a = t * q.tuskCurl * Math.PI, r = R * (1 - t * .35); pts.push([b[0] + Math.sin(a) * r * 1.2, b[1] + (1 - Math.cos(a)) * r, b[2] + side * t * .07 * k, .034 * k * (1 - t * .8)]); }
    m.chain(pts, M.ACCENT, { group: 8 }); tuskTips.push(pts[n].slice(0, 3));
  }
  if (q.teeth && !baby) m.ell([tip[0] - hr * .1, tip[1] - hr * .25, 0], [hr * .08, hr * .14, hr * .12], M.ACCENT, { group: 1 });
  // ---- legendary features ----
  m.part = "body";
  const backAt = t => [-len * .9 + t * len * 1.65, top + hump * Math.max(0, 1 - Math.abs(t - .8) * 3) + arch * (1 - Math.abs(t - .4) * 2), 0];
  if (feats?.length) evolve3d(m, feats, { H, hr, sn, L, Dm, tuskTips, hornTips, tb, backAt, len, top, chest, tuck, bw, frame });
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [len * .2, top, side * bw * .5], side, 1.15, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("mane") || has("flames")) for (let i = 0; i < 7; i++) { const t = i / 6, b = v3.lerp(v3.add(H, [-hr * .5, hr * .3, 0]), backAt(.55), t), h = [.4, .3, .45, .28, .38, .25, .3][i], up = v3.norm([-.35 - (frame ? .1 : 0), 1, 0]); m.flat(v3.add(b, v3.mul(up, h * .5)), [1, 0, 0], up, h * .32, h * .55, masks.flame(i % 2 ? M.MAGIC : M.MAGIC2, M.MAGIC2), { group: 60 + i % 2, extra: true }); }
  if (has("tails")) for (let i = 0; i < 7; i++) { m.part = "tail"; const a = Math.PI * (.55 + i * .08), z = (i - 3) * .1, e = v3.add(tb, [Math.cos(a) * .9, Math.sin(a) * .85, z]); m.chain([[...tb, .1], [...v3.lerp(tb, e, .5), .17], [...e, .08]], i % 2 ? M.BODY2 : M.BODY, { group: 70, extra: true }); m.ell(e, [.09, .09, .09], M.MAGIC2, { group: 71, extra: true }); }
  m.part = "body";
  if (has("crystals")) [.15, .3, .45, .6, .75].forEach((t, i) => { const b = backAt(t), h = [.3, .5, .4, .6, .35][i]; m.ell(v3.add(b, [0, h * .45, (i % 2 - .5) * .1]), [h * .55, .08, .08], M.MAGIC, { dir: [(i - 2) * .12, 1, 0], group: 80 + i % 2, extra: true, paint: p => p[2] > 0 ? M.MAGIC2 : undefined }); });
  if (has("moss")) {
    for (let i = 0; i < 6; i++) m.ell(backAt(.08 + i * .15), [len * .22, .07, bw * .85], M.LEAF, { group: 85, extra: true });
    for (const [t, h] of [[.25, .55], [.5, .8], [.75, .45]]) { const b = backAt(t); m.seg(b, v3.add(b, [0, h * .7, 0]), .04, .025, M.TRUNK, { group: 86, extra: true }); m.ell(v3.add(b, [0, h * .8, 0]), [h * .28, h * .26, h * .28], M.LEAF2, { group: 87, extra: true, paint: p => p[1] < b[1] + h * .72 ? M.LEAF3 : undefined }); }
    for (const t of [.12, .4, .65, .9]) { const b = backAt(t); m.ell(v3.add(b, [0, .12, bw * .3]), [.07, .035, .07], M.MAGIC, { group: 89, extra: true }); }
  }
  if (has("ribbons")) for (let i = 0; i < 3; i++) { const pts = []; for (let k = 0; k < 9; k++) { const t = k / 8; pts.push([len * (.5 - t * 2.2), top + .05 + i * .1 + t * (.25 + i * .12) + Math.sin(t * 6 + frame + i) * .07, (i - 1) * .18, .04 * (1 - t * .6)]); } m.chain(pts, i % 2 ? M.MAGIC2 : M.MAGIC, { group: 90 + i, extra: true }); }
  gearUp(m);
  const sp = drawForm(m, { height: drawHeight(level, st, q.hgt), facing }, S, level);
  if (formMotes() && sz("motes")) glowMotes(sp, S.id.length * 7919, sz("motes"));
  return sp;
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
  else if (kind === "bushy") m.chain([[...tb, .1], [X(1.05) - .35, top - .05 + tw, 0, .17], [X(1.05) - .75, top - .2 + tw, 0, .18], [X(1.05) - 1.0, top - .35 + tw, 0, .1]], M.BODY, { ...o, paint: p => p[0] < X(1.05) - .82 ? M.BELLY : undefined });
  else if (kind === "stub" || kind === "deer" || kind === "bob") m.ell(v3.add(tb, [-.06, .02 + tw, 0]), [.1, .08, .07], kind === "deer" ? M.BELLY : M.BODY, { ...o, paint: kind === "bob" ? p => p[0] < tb[0] - .08 ? M.BODY3 : undefined : undefined });
  else if (kind === "puff") m.ell(v3.add(tb, [-.04, .02, 0]), [.11, .11, .1], M.BELLY, o);
  else if (kind === "dormouse") m.chain([[...tb, .1], [X(1.3), top - .2 + tw, 0, .12], [X(1.7), top - .42, 0, .13], [X(2.05), top - .3 + tw, 0, .12], [X(2.2), top - .08, 0, .08]], M.BODY, { ...o, extra: true, paint: p => p[0] < X(2.0) ? M.BODY2 : undefined }); // long, low and furry, curling up at its tip (the silhouette check: it read as a squirrel's)
  else if (kind === "squirrel" || kind === "star") m.chain([[...tb, .12], [X(1.3), top + .05 + tw, 0, .25], [X(1.3), top + .6 + tw, 0, .3], [X(1.0), top + .95 + tw, 0, .27], [X(.65), top + .9 + tw, 0, .16]], kind === "star" ? M.MAGIC : M.BODY, { ...o, extra: true, paint: kind === "star" ? p => spotty(p, 14, .12) ? M.GLINT : undefined : undefined });
  else if (kind === "otter") m.chain([[...tb, .17], [X(1.3), top - .45 + tw, 0, .12], [X(1.6), .1, 0, .07], [X(1.85), .06 + tw, 0, .03]], M.BODY, o);
  else if (kind === "stoat") m.chain([[...tb, .08], [X(1.3), top - .12 + tw, 0, .07], [X(1.6), top - .05 + tw, 0, .06]], M.BODY, { ...o, paint: p => p[0] < X(1.45) ? M.BODY3 : undefined });
  else if (kind === "flat") { m.seg(tb, [X(1.15), .3, 0], .08, .07, M.BODY2, o); m.ell([X(1.4), .1 + tw * .5, 0], [.28, .03, .14], M.BODY3, o); }
  else if (kind === "thin") { m.chain([[...tb, .04], [X(1.1), top - .3, 0, .03], [X(1.12) + tw, top - .55, 0, .025]], M.BODY, o); m.ell([X(1.12) + tw, top - .62, 0], [.04, .07, .04], M.BODY3, o); }
}

function antlers3d(m, q, b, side, size, has) { // size: its antler size curve at this level (the template's)
  const jack = !q.antlers, A = jack ? .45 : size * (has("antlersGlow") ? 1.15 : 1), mat = has("antlersGlow") ? (side > 0 ? M.MAGIC2 : M.MAGIC) : M.ACCENT, o = { group: 11 + (side > 0 ? 1 : 0), extra: true };
  if (!A) return;
  const w = .045 * Math.max(.8, A), out = side * .35 * A;
  if (q.antlers === "palm") { // a short beam, then broad fingers fanning back and out from one root
    const k = v3.add(b, [-.06 * A, .12 * A, out * .3]);
    m.seg(b, k, w * 1.3, w * 1.2, mat, o);
    for (let i = 0; i < 5; i++) { const a = .35 + i * .3, d = v3.norm([-Math.cos(a), Math.sin(a) * .9, side * .55]), L = (.24 + .05 * (i % 2)) * A; m.ell(v3.add(k, v3.mul(d, L * .55)), [L * .6, w * 1.5, w * .6], mat, { ...o, dir: d, up: [0, 0, 1] }); }
    return;
  }
  const p1 = v3.add(b, [-.18 * A, .3 * A, out * .4]), p2 = v3.add(b, [-.25 * A, .62 * A, out * .8]), p3 = v3.add(b, [-.1 * A, .95 * A, out]);
  m.chain([[...b, w * 1.2], [...p1, w], [...p2, w * .85], [...p3, w * .4]], mat, o);
  const tine = (p, d, l, ww) => m.seg(p, v3.add(p, v3.mul(v3.norm(d), l)), ww, ww * .35, mat, o);
  tine(v3.add(b, [-.04 * A, .1 * A, out * .1]), [1, .6, 0], .28 * A, w * .8);
  if (A > .4 || jack) tine(p1, [1, .9, 0], .3 * A, w * .7);
  if (A > .7) { tine(p2, [.8, 1, 0], .28 * A, w * .6); tine(p3, [.3, 1, side * .2], .18 * A, w * .5); }
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
  for (const side of [-1, 1]) { const f = frame && side > 0 ? .04 : 0; m.seg([.05, .2, side * .14], [.08, .05 + f, side * .15], .07, .06, M.BODY2, { group: 2 }); for (const dz of [-.04, 0, .04]) m.ell([.16, .03 + f, side * .15 + dz], [.06, .025, .02], M.ACCENT, { group: 2 }); m.anchors.feet.push({ c: [.13, .04 + f, side * .15], r: .08, group: side > 0 ? 6 : 2, fit: "claw" }); }
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
    m.ell(c, [hr * .22, hr * .46, hr * .4], M.BELLY, { group: 1, dir: fd, paint: q.discRim ? p => { const d = v3.sub(p, c), r = Math.hypot(...v3.sub(d, v3.mul(fd, v3.dot(d, fd)))); return r > hr * .34 ? M.BODY3 : undefined; } : undefined });
    const ec = v3.add(c, v3.mul(fd, hr * .14));
    m.ell(ec, [hr * .1, hr * .26, hr * .24].map(v => v * (baby ? 1.15 : 1)), legend ? M.MAGIC : M.IRIS, { group: 1, dir: fd });
    m.ell(v3.add(ec, v3.mul(fd, hr * .07)), [hr * .08, hr * .14, hr * .13].map(v => v * (baby ? 1.15 : 1)), legend ? M.MAGIC2 : M.EYE, { group: 1, dir: fd });
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
function finish(m, S, level, st, k, facing) {
  if (S.sizes.build[level] !== 1) beef(m, S.sizes.build[level]); // the adult's and legend's heavier build (its template's size curve)
  gearUp(m);
  const sp = drawForm(m, { height: drawHeight(level, st, k), facing }, S, level);
  if (formMotes() && S.sizes.motes[level]) glowMotes(sp, S.id.length * 131, S.sizes.motes[level]);
  return sp;
}
const crown3d = (m, c, w) => { m.ell(c, [w, w * .35, w], M.MAGIC, { group: 95, extra: true, paint: p => p[1] > c[1] ? M.MAGIC2 : undefined }); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; m.ell(v3.add(c, [Math.cos(a) * w * .8, w * .55, Math.sin(a) * w * .8]), [w * .38, w * .12, w * .12], M.MAGIC, { dir: [0, 1, 0], up: [1, 0, 0], group: 96, extra: true }); } };
const crystals3d = (m, pts) => pts.forEach(([b, h], i) => m.ell(v3.add(b, [0, h * .45, 0]), [h * .55, .07, .07], M.MAGIC, { dir: [(i % 3 - 1) * .25, 1, (i % 2 - .5) * .3], group: 80 + i % 2, extra: true, paint: p => p[2] > b[2] ? M.MAGIC2 : undefined }));

export function hedgehog3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), f = frame ? .03 : 0;
  for (const [x, z] of [[.28, .2], [.28, -.2], [-.28, .2], [-.28, -.2]]) { m.seg([x, .15, z], [x + (z > 0 ? f : -f), .03, z], .06, .05, M.BODY3, { group: z > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [x + .03 + (z > 0 ? f : -f), .03, z], r: .065, group: z > 0 ? 6 : 2 }); }
  const c = [0, .32, 0], r = [.5, .32, .38];
  m.ell(c, r, M.BODY2, { paint: p => spotty(p, 22, .3) ? M.BODY3 : spotty(p, 19, .12) ? M.BELLY : undefined });
  for (let i = 0; i < 46; i++) { const a = (i * 2.399) % (Math.PI * 2), t = (i / 46) * .9 + .05, d = v3.norm([Math.cos(a) * Math.sin(t * Math.PI * .5) - .25, Math.cos(t * Math.PI * .5) * .9 + .1, Math.sin(a) * Math.sin(t * Math.PI * .5)]); if (d[0] > .55) continue; m.ell(v3.add(Model.surface(c, r, d), v3.mul(d, .02)), [.1, .025, .025], i % 4 ? M.BODY2 : M.BODY3, { dir: v3.add(d, [-.4, 0, 0]), group: 1 }); }
  const sn = [.48, .22, 0];
  m.ell(sn, [.22, .14, .15], M.BELLY, { dir: [1, -.3, 0], group: 1 });
  m.ell([.69, .16, 0], [.04, .04, .04], M.NOSE, { group: 1 });
  eyesOn(m, sn, [.22, .14, .15], [[.3, .6, .55], [.3, .6, -.55]], .035, legend ? M.MAGIC2 : M.EYE);
  if (legend) crystals3d(m, [[[-.3, .55, .1], .35], [[-.05, .62, -.1], .5], [[.2, .55, .12], .4], [[-.15, .58, .2], .3]]);
  return finish(m, S, level, st, .6, facing);
}

export function toad3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), hop = frame ? .05 : 0;
  for (const side of [-1, 1]) { // folded hind legs, thin front legs
    m.ell([-.22, .16, side * .36], [.24, .13, .12], side > 0 ? M.BODY : M.BODY2, { dir: [1, .3, 0], group: side > 0 ? 6 : 2, paint: p => spotty(p, 14, .15) ? M.BODY3 : undefined });
    m.ell([.05, .04, side * .4], [.16, .04, .08], side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 6 : 2 });
    m.seg([.35, .2 + hop, side * .24], [.42, .03, side * .3], .05, .04, side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 7 : 2 });
    m.anchors.feet.push({ c: [.45, .03, side * .3], r: .06, group: side > 0 ? 7 : 2 }, { c: [.12, .04, side * .4], r: .08, group: side > 0 ? 6 : 2 });
  }
  const c = [0, .3 + hop, 0], r = [.5, .28, .4];
  m.ell(c, r, M.BODY, { paint: p => p[1] < c[1] - .12 ? M.BELLY : p[0] > .38 && Math.abs(p[1] - (c[1] - .02)) < .018 ? M.LINE : spotty(p, 14, .22) ? M.BODY3 : undefined });
  for (const side of [-1, 1]) { const e = [.3, .55 + hop, side * .17]; m.ell(e, [.1, .09, .1], M.BODY, { group: 1 }); m.ell(Model.surface(e, [.1, .09, .1], v3.norm([.6, .5, side * .5])), [.05, .05, .05], legend ? M.MAGIC2 : M.IRIS, { group: 1 }); m.ell(Model.surface(e, [.11, .1, .11], v3.norm([.65, .45, side * .5])), [.03, .015, .03], M.EYE, { group: 1 }); }
  m.anchors.head = { c: [.22, .45 + hop, 0], r: [.3, .2, .3], top: [.18, .62 + hop, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([.3, .55 + hop, side * .17], [.1, .09, .1], v3.norm([.6, .5, side * .5]))), size: .05 };
  m.anchors.neck = { c: [.32, .3 + hop, 0], r: .25, dir: [1, .3, 0] };
  if (legend) crown3d(m, [.15, .66 + hop, 0], .16);
  return finish(m, S, level, st, .55, facing);
}

export function raven3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, young = false, has = f => legend && S.legend.includes(f), m = new Model(), bob = frame ? .02 : 0;
  for (const side of [-1, 1]) { const f = frame && side > 0 ? .04 : 0; m.seg([0, .3, side * .08], [.03, .03 + f, side * .08], .03, .025, M.NOSE, { group: side > 0 ? 7 : 2 }); m.ell([.08, .02 + f, side * .08], [.08, .015, .04], M.NOSE, { group: 2 }); m.anchors.feet.push({ c: [.07, .03 + f, side * .08], r: .06, group: side > 0 ? 7 : 2 }); }
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
  m.seg([-.5, .18, 0], [-.62, .12, 0], .04, .02, M.SKIN, { group: 3 });
  for (const side of [-1, 1]) { m.ell([-.3, .05, side * .2], [.07, .04, .05], M.SKIN, { group: side > 0 ? 6 : 2 }); m.anchors.feet.push({ c: [-.3, .05, side * .2], r: .07, group: side > 0 ? 6 : 2 }); }
  m.ell([0, .3, 0], [.52, .29, .33], M.BODY, { paint: p => p[1] > .45 ? M.BODY2 : undefined });
  m.ell([.55, .24, 0], [.2, .07, .07], M.SKIN, { dir: [1, -.15, 0], group: 1 });
  m.ell([.74, .21, 0], [.04, .05, .06], M.NOSE, { group: 1 });
  for (const side of [-1, 1]) { // spade hands, turned out, clawed
    const h = [.32, .1 - (side > 0 ? f : 0), side * .34];
    m.ell(h, [.13, .035, .12], M.SKIN, { group: side > 0 ? 7 : 2, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] });
    for (let k = 0; k < 4; k++) m.ell(v3.add(h, [.14, -.01, side * (k - 1.5) * .05]), [.05, .015, .015], M.ACCENT, { group: side > 0 ? 7 : 2 });
  }
  for (const side of [-1, 1]) m.ell(Model.surface([0, .3, 0], [.52, .29, .33], v3.norm([.85, .3, side * .35])), [.015, .015, .015], legend ? M.MAGIC2 : M.EYE, { group: 1 });
  m.anchors.head = { c: [.32, .34, 0], r: [.25, .22, .25], top: [.3, .58, 0] };
  m.anchors.eyes = { pts: [-1, 1].map(side => Model.surface([0, .3, 0], [.52, .29, .33], v3.norm([.85, .3, side * .35]))), size: .03 };
  m.anchors.neck = { c: [.36, .3, 0], r: .27, dir: [1, .1, 0] };
  if (legend) crown3d(m, [.15, .62, 0], .15);
  return finish(m, S, level, st, .55, facing);
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

// The snail: its foot, eye stalks and shell. Its genome levels shape it (each level its own design: docs/art-guide/EVOLUTIONS.md):
// body.shell { turns, cone (0 a flat spiral seen side on, 1+ raised into a tower), r (its mouth's whorl radius), ridge (a ridge on
// each whorl), bands (stripes per turn, amber and umber), pale (a baby's near-clear shell), glow (its mouth glowing amber),
// buttress (props down to the ground), mud (caked at its base), trees (tiny trees and fungi on its whorls) }, body.stalks (eye stalk
// length), body.mantle (a frill round its foot), body.sheen (a slime highlight). Without levels, as it was.
export function snail3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, m = new Model(), g = frame ? .04 : 0, q = { ...S.q, ...(S.levelQ?.[level] || {}) }, sh = q.shell;
  const skin = sh ? (sh.pale ? M.SKIN : M.BELLY) : M.SKIN, stalk = q.stalks ?? 1;
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
    pts.push([...p, R * .5 + .015, u, v3.add(base, v3.mul(ax, h))]); // (and its axis point there)
  }
  for (let i = 0; i < n; i++) m.seg(pts[i].slice(0, 3), pts[i + 1].slice(0, 3), pts[i][3], pts[i + 1][3], bandMat(pts[i][4] * turns), { group: 3 });
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
  m.anchors.head = { c: hc, r: hr, top: [.42, .46, 0] }; // (its top: a party hat sits on its front plate, above its head)
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

export function glowworm3d(S, level, frame, st, facing = "towards") {
  const legend = level === 3, has = f => legend && S.legend.includes(f), m = new Model(), ph = frame ? .05 : 0;
  for (let i = 0; i < 9; i++) { const t = i / 8, x = -.6 + t * 1.15; m.ell([x, .12 + Math.sin(t * Math.PI) * (.06 + ph), 0], [.08, .1 - t * .02, .12 - t * .03], i < 2 ? M.MAGIC2 : i % 2 ? M.BODY2 : M.BODY, { group: 1 }); }
  if (has("lantern")) m.ell([-.75, .3, 0], [.22, .22, .22], M.MAGIC2, { group: 3, paint: p => p[1] < .2 ? M.MAGIC : undefined });
  for (let i = 0; i < 6; i++) m.seg([-.2 + i * .12, .05, .08], [-.2 + i * .12 + (i % 2 ? .02 : -.02) * (frame ? -1 : 1), 0, .12], .015, .01, M.BODY3, { group: 7 });
  m.ell([.6, .14, 0], [.06, .06, .08], M.BODY3, { group: 1 });
  eyesOn(m, [.6, .14, 0], [.06, .06, .08], [[.6, .3, .7], [.6, .3, -.7]], .015, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .4, facing);
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

// MOCK (Ed's elder brief, docs/ART-GUIDE.md 0c, 2026-10-13): each species' legend as the elder of its kind. It starts from the
// animal's own nature, exaggerating its defining trait; it shows its age (grizzled, scarred, notched, weathered); it carries what
// that animal would be revered for; and it wears what an object of worship might (jewellery, torcs, offerings, robes). No crystals,
// flame crests, spirit wings, rings of eyes, ribbons or trees on its back. The genome's `elder` ({ kind, tail, ears, eye }) says
// which; the builders (creatures3d.js) call these at level 3 only. Glow sparingly: one glint, its eyes, a few motes of it.
import { M } from "./core.js";
import { Model, v3, spotty } from "./model3d.js";

const CAM = v3.norm([.49, .5, .72]); // towards the camera (model3d's view, facing us)
const ex = (group, o = {}) => ({ group, extra: true, ...o });

// Out from p along d to the body's surface (its solid parts), plus `gap`.
export function surfaceFrom(m, p, d, gap = 0, max = 2) { d = v3.norm(d); let t = 0; while (t < max && m.field(v3.add(p, v3.mul(d, t))) < 0) t += .008; return v3.add(p, v3.mul(d, t + gap)); }
// Its coat grizzled: pale hairs flecked through the coat materials, by density (a number, or p -> a number).
export function grizzle(m, dens, to = M.STONE, mats = [M.BODY, M.BODY2], k = 40) {
  for (const q of m.parts) { if (q.cut || !mats.includes(q.mat)) continue; const was = q.paint, mat = q.mat;
    q.paint = p => { const r = was?.(p) ?? mat; if (!mats.includes(r)) return r; const d = typeof dens === "function" ? dens(p, r) : dens; return d > 0 && spotty(p, k, d) ? to : r; }; }
}
// Its coat's materials swapped (a stoat's winter white).
export function recolour(m, map) {
  for (const q of m.parts) { if (q.cut || map[q.mat] === undefined) continue; const was = q.paint, mat = q.mat; q.paint = p => { const r = was?.(p) ?? mat; return map[r] ?? r; }; }
}
// A ring (torus) round the axis n at c.
export function ring(m, c, n, R, tube, mat, o) {
  n = v3.norm(n); const u = v3.norm(v3.cross(n, Math.abs(n[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), w = v3.cross(n, u), pts = [];
  for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI * 2; pts.push([...v3.add(c, v3.add(v3.mul(u, Math.cos(a) * R), v3.mul(w, Math.sin(a) * R))), tube]); }
  m.chain(pts, mat, o);
}
// A loop fitted round the body (the collar's way): round the axis dir at c, out to the surface, the front-and-below of it sagging
// down by sag (a necklace hanging on the chest). Its points, in order round.
export function fitRing(m, c, dir, tube, sag = 0, n = 20) {
  const d = v3.norm(dir), u = v3.norm(v3.cross(d, Math.abs(d[2]) < .9 ? [0, 0, 1] : [1, 0, 0])), w = v3.cross(d, u), pts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, dv = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a)));
    let p = surfaceFrom(m, c, dv, tube * .8, .45); // (not down a leg to the ground)
    const low = Math.max(0, -dv[1] * .8 + dv[0] * .4); // under and in front of the neck: hanging lower
    if (sag && low > 0) { p = v3.add(p, [sag * low * .35, -sag * low, 0]); p = surfaceFrom(m, p, v3.norm([dv[0] + .3, Math.max(-.2, dv[1]), dv[2]]), tube * .8, .2); }
    pts.push(p);
  }
  return pts;
}
export const closed = (pts, r) => [...pts, pts[0]].map(p => [...p, r]);
// The points of a loop most in view (in front, near side, low), spread round it: where its charms hang.
export function frontPts(pts, n) {
  const sc = p => p[0] * .9 + p[2] * 1.1 - p[1] * .6, idx = pts.map((p, i) => [sc(p), i]).sort((a, b) => b[0] - a[0]), out = [];
  for (const [, i] of idx) { if (out.every(j => Math.min(Math.abs(i - j), pts.length - Math.abs(i - j)) >= 2)) out.push(i); if (out.length >= n) break; }
  return out.sort((a, b) => a - b).map(i => pts[i]);
}
// A charm hanging from p, size s: its cord, then the thing, kept clear of the body.
export function charm(m, kind, p, s, g = 150) {
  const o = ex(g), down = v3.norm([.25, -1, .3]); let c = v3.add(p, v3.mul(down, s * .55));
  const c2 = surfaceFrom(m, c, v3.norm([.6, -.1, .8]), s * .45, 1); c = Math.hypot(...v3.sub(c2, c)) > s * 1.3 ? v3.add(c, v3.mul(CAM, s * .4)) : c2; // (inside a leg: out towards us from where it hangs instead)
  m.seg(p, c, s * .045, s * .045, M.TRUNK, o);
  const disc = (at, R, mat, t = .14) => m.ell(at, [R * t, R, R], mat, { ...o, dir: CAM, up: [0, 1, 0] });
  const lo = v3.add(c, [0, -s * .35, 0]);
  if (kind === "key") { ring(m, c, CAM, s * .22, s * .07, M.WOOD, o); m.seg(v3.add(c, [0, -s * .2, 0]), v3.add(c, [0, -s * 1.05, 0]), s * .07, s * .06, M.WOOD, o); m.box(v3.add(c, [s * .12, -s * .92, s * .05]), [s * .12, s * .1, s * .04], M.WOOD, o); }
  else if (kind === "spoon") { m.seg(c, v3.add(c, [0, -s * .8, 0]), s * .06, s * .05, M.STONE, o); m.ell(v3.add(c, [0, -s * 1.05, s * .03]), [s * .3, s * .42, s * .12], M.STONE, { ...o, dir: [0, 1, 0], up: [1, 0, 0], paint: p2 => p2[1] > c[1] - s * .95 ? M.WEB : undefined }); }
  else if (kind === "cap") { disc(lo, s * .36, M.FLOWER); ring(m, lo, CAM, s * .36, s * .06, M.STONE, o); }
  else if (kind === "watch") { disc(lo, s * .5, M.WOOD, .2); disc(v3.add(lo, v3.mul(CAM, s * .06)), s * .38, M.WEB, .08); m.seg(v3.add(lo, v3.mul(CAM, s * .1)), v3.add(lo, v3.add(v3.mul(CAM, s * .1), [s * .05, s * .25, 0])), s * .04, s * .03, M.BODY3, o); m.ell(v3.add(lo, [0, s * .56, 0]), [s * .1, s * .1, s * .1], M.WOOD, o); }
  else if (kind === "coin") disc(lo, s * .32, M.WOOD, .18);
  else if (kind === "ring") ring(m, lo, CAM, s * .3, s * .09, M.WOOD, o);
  else if (kind === "acorn" || kind === "acornGlow") { m.ell(lo, [s * .26, s * .34, s * .26], kind === "acornGlow" ? M.GLOW : M.WOOD, o); m.ell(v3.add(lo, [0, s * .24, 0]), [s * .3, s * .14, s * .3], M.TRUNK, o); }
  else if (kind === "amber") { m.ell(v3.add(lo, [0, -s * .1, 0]), [s * .34, s * .5, s * .3], M.GLOW, o); m.ell(v3.add(lo, [0, s * .35, 0]), [s * .2, s * .1, s * .2], M.WOOD, o); }
  else if (kind === "sun") { disc(lo, s * .5, M.WOOD, .16); disc(v3.add(lo, v3.mul(CAM, s * .06)), s * .2, M.GLOW, .1); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, u = v3.norm(v3.cross(CAM, [0, 1, 0])), w = v3.cross(u, CAM), d = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a))); m.seg(v3.add(lo, v3.mul(d, s * .5)), v3.add(lo, v3.mul(d, s * .82)), s * .08, s * .02, M.WOOD, o); } }
}
// A crown on a head: a band round the axis up at base, points rising from it, gems in it (one maybe glowing at its front).
export function crown(m, base, up, R, h, { n = 5, mat = M.WOOD, gem = M.FLOWER, glow = M.GLOW, g = 160 } = {}) {
  up = v3.norm(up); const o = ex(g), u = v3.norm(v3.cross(up, [0, 0, 1])), w = v3.cross(up, u);
  ring(m, base, up, R, R * .2, mat, o);
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + .4, d = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a))), b = v3.add(base, v3.mul(d, R)), t = v3.add(b, v3.add(v3.mul(up, h), v3.mul(d, R * .15)));
    m.seg(b, t, R * .2, R * .05, mat, o); m.ell(t, [R * .1, R * .1, R * .1], mat, o); }
  const front = v3.add(base, v3.mul(v3.norm(v3.add(v3.mul(u, .4), [0, 0, 1])), R * 1.05));
  m.ell(front, [R * .22, R * .26, R * .14], glow, { ...o, dir: CAM });
  for (const a of [1.6, -1.2]) { const d = v3.add(v3.mul(u, Math.cos(a)), v3.mul(w, Math.sin(a))); m.ell(v3.add(base, v3.mul(d, R * 1.05)), [R * .16, R * .18, R * .1], gem, { ...o, dir: d }); }
}
// Lines drawn on the body's surface (scars, chalk figures): each a list of points just inside it, pushed out along d.
export function drawOn(m, lines, d, r, mat, g = 170) { for (const L of lines) m.chain(L.map(p => [...surfaceFrom(m, p, d, -r * .3), r]), mat, ex(g)); }
// Its ears notched: bites out of their rims (each { c, r }), on their own group.
export const notch = (m, cuts, g = 9) => cuts.forEach(({ c, r }) => m.ell(c, r, M.BODY, { group: g, cut: true }));
// Everything moved up by dy (a sentinel sat up on its heap of stones), its anchors too.
export function lift(m, dy) {
  const up = p => [p[0], p[1] + dy, p[2]];
  for (const q of m.parts) { if (q.c) q.c = up(q.c); if (q.a) { q.a = up(q.a); q.b = up(q.b); } }
  for (const f of m.flats) f.c = up(f.c);
  const A = m.anchors; for (const k of ["head", "neck"]) if (A[k]) { A[k] = { ...A[k], c: up(A[k].c) }; if (A[k].top) A[k].top = up(A[k].top); }
  if (A.eyes) A.eyes = { ...A.eyes, pts: A.eyes.pts.map(up) };
}

// ---------- the four-legged elders (quad3d; c: its landmarks) ----------
const X = (c, k) => -c.len * k;
export function elderQuad(m, S, c) {
  const kind = S.elder.kind, { H, hr, nb, len, top, chest, bw, tb } = c, N = m.anchors.neck, earBase = side => [H[0] - hr * .15, H[1] + hr * .7, side * hr * .5];
  if (kind === "raccoon") {
    // the thief-king: grizzled grey, its mask worn deep, hung with a lifetime's stolen trinkets, a stolen crown askew
    grizzle(m, p => p[0] > H[0] - hr * .4 ? .3 : .12, M.WEB);
    notch(m, [{ c: v3.add(earBase(1), [hr * .1, hr * .24, 0]), r: [hr * .07, hr * .08, hr * .2] }]);
    const r1 = fitRing(m, v3.lerp(nb, H, .3), N.dir, .014, .05), r2 = fitRing(m, v3.add(nb, [-.06, -.06, 0]), N.dir, .016, .12), r3 = fitRing(m, v3.add(nb, [-.1, -.02, 0]), [1, .15, 0], .013, .18);
    m.chain(closed(r1, .013), M.TRUNK, ex(150)); m.chain(closed(r2, .016), M.WOOD, ex(151)); m.chain(closed(r3, .012), M.TRUNK, ex(152));
    const hi = r => r.filter(p => p[1] > chest + .15);
    frontPts(hi(r1), 3).forEach((p, i) => charm(m, ["ring", "key", "cap"][i], p, .11, 153));
    frontPts(hi(r2), 3).forEach((p, i) => charm(m, ["spoon", "watch", "key"][i], p, .14, 154));
    frontPts(hi(r3), 4).forEach((p, i) => charm(m, ["cap", "coin", "ring", "cap"][i], p, .11, 155));
    crown(m, v3.add(m.anchors.head.top, [hr * .05, -hr * .08, hr * .22]), [.2, 1, .5], hr * .42, hr * .48, { n: 5 }); // too small for it, askew
  }
  if (kind === "squirrel") {
    // the elder squirrel: grey-muzzled, its tail a vast curled question mark bigger than it, acorns strung as prayer beads, an acorn-cup crown
    const tw = c.frame ? .04 : 0;
    m.part = "tail";
    m.chain([[...tb, .12], [X(c, 1.3), top + .2 + tw, 0, .2], [X(c, 1.55), top + .75 + tw, 0, .25], [X(c, 1.35), top + 1.35 + tw, 0, .27], [X(c, .85), top + 1.6 + tw, 0, .26], [X(c, .3), top + 1.45, 0, .23], [X(c, .1), top + 1.05, 0, .19], [X(c, .35), top + .78, 0, .15], [X(c, .65), top + .88, 0, .1]], M.BODY, { group: 3, extra: true, paint: p => spotty(p, 16, .2) ? M.BODY2 : undefined }); // the question mark: up, over and curling in
    m.part = "body";
    grizzle(m, p => p[0] > H[0] + hr * .1 ? .6 : p[0] > H[0] - hr * .6 ? .25 : 0);
    const r1 = fitRing(m, v3.add(nb, [-.02, -.04, 0]), N.dir, .02, .22, 22);
    m.chain(closed(r1, .018), M.TRUNK, ex(150));
    frontPts(r1, 6).forEach((p, i) => charm(m, i === 2 || i === 4 ? "acornGlow" : "acorn", p, .19, 151 + i % 2));
    const t = m.anchors.head.top, cup = v3.add(t, [hr * .3, hr * .12, hr * .1]);
    m.ell(cup, [hr * .55, hr * .26, hr * .55], M.TRUNK, ex(160, { paint: p => spotty(p, 60, .35) ? M.BODY3 : undefined })); // the cup, upside down: its scales
    m.seg(v3.add(cup, [0, hr * .15, 0]), v3.add(cup, [hr * .05, hr * .38, 0]), hr * .06, hr * .04, M.TRUNK, ex(160));
    for (const [dx, dz] of [[-.35, .3], [.2, .4], [-.1, -.4]]) m.ell(v3.add(cup, [dx * hr, -hr * .02, dz * hr]), [hr * .32, hr * .05, hr * .14], M.LEAF, ex(161, { dir: [dx, -.15, dz] })); // oak leaves round it
  }
  if (kind === "dormouse") {
    // the drowsy elder: half-lidded, its long tail wrapped round it like a stole, a crown of hazelnut shells, long grey whiskers
    const s = bw * 1.05, mid = (top + chest) / 2;
    m.part = "tail";
    m.chain([[...tb, .1], [X(c, 1.05), mid + .02, s * .7, .13], [X(c, .5), mid - .02, s * 1.12, .15], [len * .2, mid + .02, s * 1.2, .15], [len * .75, mid + .08, s * 1.05, .15], [len * 1.05, chest + .2, s * .35, .14], [len * 1, top - .02, -s * .5, .14], [len * .62, top + .16, -s * .15, .13], [len * .5, top + .18, s * .6, .12], [len * .42, mid + .02, s * 1.25, .09]], M.BODY2, { group: 3, extra: true, paint: p => spotty(p, 22, .22) ? M.BODY3 : undefined });
    m.part = "head";
    grizzle(m, p => p[0] > H[0] + hr * .3 ? .6 : p[0] > H[0] - hr * .5 ? .2 : 0);
    for (const e of m.anchors.eyes.pts) m.ell(v3.add(e, v3.add(v3.mul(v3.norm(v3.sub(e, H)), hr * .06), [0, hr * .1, 0])), [hr * .3, hr * .16, hr * .28], M.BODY2, { group: 1 }); // heavy lids, half down
    const t = v3.add(m.anchors.head.top, [0, -hr * .05, 0]);
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2, p = v3.add(t, [Math.cos(a) * hr * .34, hr * .1, Math.sin(a) * hr * .34]); m.ell(p, [hr * .2, hr * .24, hr * .2], M.WOOD, ex(160, { dir: [Math.cos(a) * .3, 1, Math.sin(a) * .3], paint: q => q[1] > p[1] + hr * .12 ? M.TRUNK : undefined })); for (const k of [-1, 1]) m.ell(v3.add(p, [Math.cos(a + k) * hr * .12, -hr * .12, Math.sin(a + k) * hr * .12]), [hr * .18, hr * .05, hr * .1], M.LEAF2, ex(161, { dir: [Math.cos(a + k), -.4, Math.sin(a + k)] })); } // hazelnuts in their frilled husks
    ring(m, v3.add(t, [0, hr * .02, 0]), [0, 1, 0], hr * .36, hr * .05, M.TRUNK, ex(160)); // bound on a hazel twig
    m.part = "body";
  }
  if (kind === "stoat") {
    // the ermine elder: winter-white, robed in crimson and ermine (black-tipped tails on white), its own tail tip black, a thin gold circlet
    recolour(m, { [M.BODY]: M.WEB, [M.BODY2]: M.BELLY });
    const mid = (top + chest) / 2, ermine = p => spotty(p, 18, .16) ? M.BODY3 : M.WEB;
    for (const side of [-1, 1]) m.ell([-len * .05, mid + .04, side * (bw * 1.02)], [len * .78, (top - chest) * .5, .035], M.FLOWER, ex(150 + (side > 0 ? 1 : 0), { paint: p => p[1] < mid + .04 - (top - chest) * .32 ? ermine(p) : undefined })); // its robe, hanging at its sides, its hem trimmed with ermine
    m.ell([-len * .05, top - .02, 0], [len * .82, .09, bw * 1.04], M.FLOWER, ex(152)); // over its back
    m.ell([len * .6, top - .01, 0], [len * .38, .15, bw * 1.22], M.WEB, ex(153, { paint: ermine })); // the ermine cape over its shoulders
    ring(m, v3.add(m.anchors.head.top, [0, -c.hr * .2, 0]), [-.2, 1, 0], c.hr * .62, c.hr * .06, M.WOOD, ex(160)); // a thin gold circlet
    m.ell(v3.add(H, [c.hr * .55, c.hr * .62, 0]), [c.hr * .08, c.hr * .1, c.hr * .08], M.GLOW, ex(161));
  }
  if (kind === "marten") {
    // the elder marten: its cream bib grown into a shield-shaped blaze over its chest, scarred, grizzled at the muzzle, an amber pendant
    const yb = chest - .1, yt = top + .3, shield = p => { if (p[0] < len * .55) return false; const u = (p[1] - yb) / (yt - yb); return u > 0 && Math.abs(p[2]) < bw * 1.1 * Math.min(1, Math.sqrt(Math.max(0, u)) * 1.15); };
    const rim = p => shield(p) && !shield([p[0], p[1] - .05, p[2] * 1.12]); for (const q of m.parts) { if (q.cut || q.mat !== M.BODY) continue; const was = q.paint; q.paint = p => rim(p) ? M.BODY3 : shield(p) ? M.BELLY : was?.(p); }
    grizzle(m, p => p[0] > H[0] + hr * .3 ? .35 : .08);
    notch(m, [{ c: v3.add(earBase(1), [hr * .14, hr * .3, 0]), r: [hr * .08, hr * .1, hr * .2] }, { c: v3.add(earBase(-1), [-hr * .1, hr * .3, 0]), r: [hr * .07, hr * .08, hr * .2] }]);
    drawOn(m, [0, 1, 2].map(k => [[len * (.05 - k * .12), top - .05, 0], [len * (-.12 - k * .12), mid(c) - .05, 0], [len * (-.25 - k * .12), chest + .05, 0]]), [0, .1, 1], .03, M.BELLY); // three old claw scars down its flank
    drawOn(m, [[v3.add(H, [hr * .2, hr * .55, 0]), v3.add(H, [hr * .5, hr * .1, 0]), v3.add(H, [hr * .85, -hr * .2, 0])]], [0, .2, 1], .022, M.BELLY); // one across its face
    const r1 = fitRing(m, v3.lerp(nb, H, .2), N.dir, .016, .2);
    m.chain(closed(r1, .016), M.TRUNK, ex(150));
    charm(m, "amber", frontPts(r1, 1)[0], .2, 151);
  }
  if (kind === "hare") {
    // the moon-hare: grizzled, its ears immensely long and veined with light, rings through them, the moon behind its head
    grizzle(m, .2);
    for (const side of [-1, 1]) {
      const base = earBase(side), eh = hr * 3.4, ew = hr * .5, dirE = v3.norm([-.32 - (side < 0 ? .18 : 0), 1, side * .28]), across = v3.norm(v3.cross(v3.norm([.2, .3, 1]), dirE)); // (turned to face us, so the veins show)
      const mask = (s, t) => { const u = (t + 1) / 2, half = .95 * Math.sin(Math.PI * Math.min(1, .15 + u * .85)) * (1 - u * .35); if (Math.abs(s) > half) return null; if (u > .88) return M.BODY3;
        const vein = (Math.abs(s) < .08 && u > .08 && u < .86) || [.25, .42, .6].some(b => u > b && u < b + .22 && Math.abs(Math.abs(s) - (u - b) * 1.4) < .07);
        return vein ? M.MAGIC2 : Math.abs(s) < half * .55 && u < .8 ? M.EAR : M.BODY; };
      m.flat(v3.add(base, v3.mul(dirE, eh)), across, dirE, ew, eh, mask, { group: 5 + (side > 0 ? 0 : 20), extra: true });
      for (const k of side > 0 ? [.3, .42] : [.36]) ring(m, v3.add(v3.add(base, v3.mul(dirE, eh * 2 * k)), v3.mul(across, ew * .82)), dirE, hr * .14, hr * .035, M.WOOD, ex(162)); // rings through its ear's rim
    }
    const u = v3.norm(v3.cross([0, 1, 0], CAM)), w = v3.cross(CAM, u), R = hr * 1.7, mc = v3.add(H, [-hr * 1.6, hr * 2.1, -hr * 1.2]);
    const craters = [[-.3, .2, .16], [.25, -.35, .12], [-.1, -.45, .09], [.1, .4, .1]];
    m.flat(mc, u, w, R, R, (s, t) => { const r = Math.hypot(s, t); if (r > 1) return null; if (Math.hypot(s + .42, t - .2) > .86) return M.GLOW; return craters.some(([a, b, k]) => Math.hypot(s - a, t - b) < k) ? M.STONE : M.WEB; }, { group: 99, extra: true, bend: 0 }); // the moon: a crescent lit gold, the rest of it pale
  }
  if (kind === "badger") {
    // the elder badger: grizzled and scarred, notched ears, its face stripes running on down its back as chalk hill-figure lines, faintly
    // lit by the moon, and a bronze torc at its neck
    grizzle(m, p => p[0] > len * .7 ? .2 : .07, M.WEB, [M.BODY, M.BODY2, M.BODY3]);
    notch(m, [{ c: v3.add(earBase(1), [hr * .08, hr * .2, 0]), r: [hr * .06, hr * .07, hr * .2] }, { c: v3.add(earBase(-1), [-hr * .06, hr * .22, 0]), r: [hr * .05, hr * .06, hr * .2] }]);
    const back = c.backAt, lines = [];
    for (const side of [-1, 1]) { const L = []; for (let i = 0; i <= 10; i++) { const t = .98 - i * .085, b = back(t); L.push([b[0], b[1] - .12, side * bw * (.22 + .1 * Math.sin(i * .9))]); } lines.push(L); }
    const hc = [-len * .55, (top + c.tuck) / 2 + .06]; // a spiral on its haunch, as the hill figures' eyes and hips are cut
    const sp = []; for (let i = 0; i <= 16; i++) { const a = i * .55, r = .03 + i * .011; sp.push([hc[0] + Math.cos(a) * r * 1.3, hc[1] + Math.sin(a) * r, 0]); }
    drawOn(m, lines, [0, 1, 0], .045, M.RUNE); drawOn(m, [sp], [0, 0, 1], .035, M.RUNE);
    drawOn(m, [[[len * .5, top - .1, 0], [len * .25, mid(c), 0], [len * .15, chest + .05, 0]], [[len * .38, top - .05, 0], [len * .18, mid(c) + .03, 0]]], [0, 0, 1], .016, M.BELLY); // old scars
    const r1 = fitRing(m, v3.lerp(nb, H, .18), N.dir, .045, .04, 22), front = frontPts(r1, 1)[0], fi = r1.indexOf(front);
    const open = [...r1.slice(fi + 2), ...r1.slice(0, Math.max(0, fi - 1))]; // the torc: an open ring, its gap at the front
    m.chain(open.map(p => [...p, .045]), M.WOOD, ex(150, { paint: p => spotty(p, 70, .3) ? M.ACCENT : undefined }));
    for (const p of [open[0], open[open.length - 1]]) m.ell(p, [.08, .08, .08], M.WOOD, ex(151)); // its terminals
  }
  if (kind === "meerkat") meerkatDress(m, { head: m.anchors.head, neck: N, chest: [len * .95, chest + .14, 0], len, hr });
}
const mid = c => (c.top + c.chest) / 2;

// The meerkat's elder dress, standing or sat up: sun-bleached and scarred, a collar of beads, a sun-disc pectoral on its chest, a
// lookout's banded headdress.
export function meerkatDress(m, { head, neck, chest, hr, sun = .2 }) {
  grizzle(m, .3, M.WEB, [M.BODY, M.BODY2]);
  const r1 = fitRing(m, neck.c, neck.dir, .02, .06, 18);
  r1.forEach((p, i) => m.ell(p, [.03, .03, .03], [M.WEB, M.FLOWER, M.BODY3][i % 3], ex(150 + i % 2)));
  const fp = surfaceFrom(m, chest, v3.norm([1, -.1, .5]), .02);
  charm(m, "sun", v3.add(fp, [0, sun * .45, 0]), sun, 152);
  const H = head.c, R = Array.isArray(hr) ? Math.max(...hr) : hr, band = fitRing(m, v3.add(H, [-R * .1, R * .3, 0]), [-.3, 1, 0], R * .12, 0, 16);
  for (let i = 0; i < band.length; i++) m.seg(band[i], band[(i + 1) % band.length], R * .12, R * .12, i % 2 ? M.FLOWER : M.WOOD, ex(160));
  drawOn(m, [[v3.add(H, [R * .1, R * .5, 0]), v3.add(H, [R * .4, R * .05, 0])]], [0, .2, 1], R * .07, M.BELLY);
}
// The meerkat elder sat up (sentinel3d): everything up on a heap of red stones, a watchtower.
export function sentinelHeap(m, dy) {
  lift(m, dy);
  const st = [[0, 0, 0, .2], [.2, -.02, .14, .14], [-.18, -.02, .12, .15], [.12, -.02, -.18, .13], [-.12, .0, -.16, .12], [.3, -.04, -.05, .1], [-.3, -.04, .02, .11], [.05, .14, .05, .14], [-.08, .12, -.05, .12], [.16, .1, -.02, .1]];
  st.forEach(([x, y, z, r], i) => m.box([x, dy * .45 + y * dy * 1.4 + r * .3, z], [r, r * .7, r * .85], i % 3 ? M.FLOWER : M.ACCENT, { group: 200 + i % 3, round: r * .3, rough: r * .12, dir: [1, .1 * (i % 3 - 1), .2 * (i % 2 - .5)], paint: p => spotty(p, 30, .12) ? M.STONED : undefined }));
}

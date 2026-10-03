// Witch creatures built in 3D (see model3d.js), so they stand in true three-quarter view.
// Units: the shoulder is about 1 high; x forward, y up, z towards the near side.
import { M, rng, uni } from "./core.js";
import { Model, render, v3, spotty } from "./model3d.js";

// Height on screen in art pixels: young about 45 at the default style (the coordinator's
// "40 to 55"), legends about 4.5 times that; they keep their size on screen as pixels grow.
export const height3d = (level, st, hgt = 1) => Math.round(st.size * Math.pow(Math.sqrt(st.growth), level) * (2 / (st.pixel || 2)) * 1.9 * hgt);

const glowMotes = (sp, seed) => { // a few glowing motes around a legend
  const r = rng(seed);
  for (let i = 0; i < 9; i++) {
    const x = Math.floor(uni(r, 2, sp.w - 2)), y = Math.floor(uni(r, 2, sp.h * .6));
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    sp.px(x, y, M.MAGIC2); if (i % 3 === 0) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) sp.px(x + dx, y + dy, M.MAGIC);
  }
};

// A feathered wing: a fan of long flat feathers from shoulder to tip, lifted and swept back.
function wing3d(m, root, side, span, up, mat, mat2, group) {
  const tip = v3.add(root, [-span * .7, span * (.75 + up), side * span * .35]);
  for (let i = 0; i < 14; i++) {
    const t = i / 13, base = v3.lerp(root, tip, t), len = span * (.3 + .3 * t), dir = v3.norm([-.6 - t * .5, -.75 + t * .55, side * .1]);
    m.ell(v3.add(base, v3.mul(dir, len * .5)), [len * .55, span * .16, span * .02], i % 2 ? mat : mat2, { dir, up: [0, 0, 1], group: group + (i % 2), extra: true });
  }
  for (let i = 0; i < 6; i++) { const t = .1 + i / 6 * .85, b = v3.lerp(root, tip, t); m.ell(v3.add(b, [-.05, -.05, 0]), [span * .14, span * .09, span * .03], mat2, { dir: [-.7, -.4, 0], group: group + 3, extra: true }); } // coverts
  m.seg(root, tip, span * .035, span * .02, mat2, { group: group + 2, extra: true });
}

// ================= four-legged animals =================
export function quad3d(S, level, frame, st) {
  const q = { legW: 1, earS: 1, hgt: 1, bw: .3, ...S.q }, legend = level === 2, young = level === 1, baby = level === 0, has = f => legend && S.legend.includes(f);
  const m = new Model();
  const hr = q.hr * (baby ? 1.6 : young ? 1.25 : 1) * (st.head / .44) ** .5, len = q.len * (baby ? .8 : young ? .9 : 1.02) * st.long;
  const legK = baby ? .62 : young ? .9 : 1.04;
  const bob = frame ? -.04 : 0, top = 1 + bob, chest = q.chest * (legend ? 1.06 : 1) / legK + bob, tuck = q.tuck / legK + bob;
  const bw = q.bw * (baby ? 1.15 : 1) * (q.legW > 1.2 ? 1.15 : 1), lw = .06 * q.legW * (legend ? 1.1 : baby ? 1.7 : 1);
  const hump = q.back === "hump" ? .1 : 0, arch = q.back === "arch" ? .1 : 0;
  // ---- markings, painted by where a point is on the body ----
  const bellyY = chest + .12;
  const paintBody = p => {
    if (q.belly && p[1] < bellyY && p[0] > -len * .5) return M.BELLY;
    if (q.saddle && p[1] > top - .18 && p[0] < len * .55) return M.BODY2;
    if (q.spots && p[1] > chest + .1 && spotty(p, 10, .22)) return q.spotMat === "belly" || (q.spots === "young" && young) ? M.BELLY : q.spots === "young" ? undefined : M.BODY3;
    if (q.ridge && p[1] > top - .08 + hump * .5) return M.BODY3;
    return undefined;
  };
  // ---- torso: a deep chest, a tucked waist, a rump ----
  m.ell([len * .48, (top + chest) / 2 + hump * .5, 0], [len * .62, (top - chest) / 2 + hump * .5, bw], M.BODY, { paint: paintBody });
  m.ell([-len * .5, (top + tuck) / 2 + arch * .6, 0], [len * .58, (top - tuck) / 2 + arch * .6, bw * .93], M.BODY, { paint: paintBody });
  m.ell([0, (top + (chest + tuck) / 2) / 2 + .02, 0], [len * .6, (top - (chest + tuck) / 2) / 2, bw * .9], M.BODY, { paint: paintBody });
  if (q.ridge) for (let i = 0; i < (legend ? 16 : 10); i++) { const x = -len * .8 + i * len * 1.75 / (legend ? 15 : 9), h = (.07 + (legend ? .04 : 0)) * (1 + .5 * Math.max(0, x / len)); m.ell([x, top + .02 + hump * Math.max(0, 1 - Math.abs(x / len - .5) * 2) + h * .5, 0], [h, .03, bw * .25], M.BODY3, { dir: [-.3, 1, 0], up: [1, 0, 0] }); }
  if (q.wool) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; m.ell([len * Math.cos(a) * .7, (top + chest) / 2 + Math.sin(a) * .2, bw * (i % 2 ? .5 : -.5)], [.16, .14, .14], M.BODY); }
  // ---- legs: shoulder/hip, knee, ankle, foot; near legs lighter, far legs in shade ----
  const sw = [.32, -.32][frame];
  const leg = (fore, side) => {
    const z = side * bw * .62, x = fore ? len * .62 : -len * .62, a = (fore ? 1 : -1) * side * sw, topY = fore ? chest + .1 : tuck + .15;
    const lift = (fore ? side : -side) * (frame ? 1 : -1) > 0 ? .06 : 0;  // the leg swinging forward is lifted
    const knee = [x + Math.sin(a) * .2 + (fore ? .02 : .1), Math.max(.3, topY * .55), z], foot = [x + Math.sin(a) * .42, .05 + lift, z];
    const hipTop = [x, topY + .12, z * .8], mat = side > 0 ? (q.legMat || M.BODY) : (q.legMat ? M.BODY3 : M.BODY2);
    const pts = fore ? [[...hipTop, lw * 1.5], [...knee, lw * 1.05], [...foot, lw * .9]] : [[...hipTop, lw * 2 * (q.haunch || 1)], [...v3.add(knee, [-.12, .06, 0]), lw * 1.2], [...v3.add(foot, [-.06 * (q.hindFoot || 1), .12, 0]), lw * .9], [...foot, lw * .9]];
    m.chain(pts, mat, { group: side > 0 ? 6 + (fore ? 1 : 0) : 2, paint: q.socks ? p => p[1] < q.socks ? M.BODY3 : undefined : undefined });
    const fl = (q.paw === "hoof" ? .07 : .09) * (q.legW ** .5) * (!fore ? (q.hindFoot || 1) : 1);
    m.ell(v3.add(foot, [fl * .5, -.01, 0]), [fl, lw * .9, lw * 1.1], q.paw === "hoof" ? M.NOSE : mat, { group: side > 0 ? 6 + (fore ? 1 : 0) : 2 });
  };
  for (const side of [-1, 1]) { leg(true, side); leg(false, side); }
  // ---- neck and head, turned towards us ----
  const nb = [len * .82, top - .12, 0], H = [nb[0] + Math.cos(q.neckAng) * q.neck * .9, nb[1] + Math.sin(q.neckAng) * q.neck * .9 + (baby ? .1 : 0), 0];
  m.seg(nb, H, q.neckW * .55, q.neckW * .42, M.BODY, { paint: p => q.belly && p[1] < (nb[1] + H[1]) / 2 - .05 ? M.BELLY : q.face === "dark" ? M.BODY2 : undefined });
  const headPaint = p => {
    if (q.face === "badger") return Math.abs(p[2]) < hr * .22 + (p[0] - H[0]) * .1 || p[1] < H[1] - hr * .1 ? M.BELLY : M.BODY3;
    if (q.face === "dark") return M.BODY2;
    if ((q.belly || q.muzzle) && p[1] < H[1] - hr * .35) return M.BELLY;
    return undefined;
  };
  m.ell(H, [hr * 1.05, hr * .92, hr * .88], M.BODY, { paint: headPaint });
  const L = hr * q.snout * (baby ? .55 : young ? .78 : 1), Dm = hr * q.snoutD * .55, sn = [H[0] + hr * .65 + L * .5, H[1] - hr * .28, 0];
  m.ell(sn, [L * .62 + hr * .2, Dm, Dm * .95], M.BODY, { dir: [1, -.25, 0], paint: p => (q.muzzle || q.belly) && p[1] < sn[1] - Dm * .1 ? M.BELLY : headPaint(p) });
  const tip = [sn[0] + L * .62 + hr * .1, sn[1] - .02, 0];
  m.ell(tip, [hr * (q.disc ? .1 : .12), hr * (q.disc ? .2 : .12), hr * (q.disc ? .2 : .15)], M.NOSE, { group: 1 });
  // eyes: both show; legends' glow
  for (const side of [-1, 1]) { const e = Model.surface(H, [hr * 1.05, hr * .92, hr * .88], v3.norm([.75, .32, side * .62])); m.ell(e, [hr * .13, hr * .16, hr * .13].map(v => v * (q.eyeK || 1) * (baby ? 1.5 : young ? 1.2 : 1)), legend && !q.tusks ? M.MAGIC2 : M.EYE, { group: 1 }); }
  // ears
  for (const side of [-1, 1]) {
    const E = q.ear, base = [H[0] - hr * .15, H[1] + hr * .7, side * hr * .5], k = q.earS * (baby ? 1.2 : 1) * (q.ear === "long" ? .62 : 1);
    if (E === "none") continue;
    if (E === "round") { m.ell(base, [hr * .22, hr * .25 * k, hr * .1], M.BODY, { group: 1, paint: p => p[0] > base[0] + hr * .02 ? M.EAR : undefined }); continue; }
    if (E === "long") { m.ell(v3.add(base, [-hr * .25 * k, hr * 1.0 * k, 0]), [hr * 1.05 * k, hr * .2, hr * .07], M.BODY, { group: 1, dir: [-.3, 1, side * .15], up: [1, 0, 0], extra: true, paint: p => p[1] > base[1] + hr * 1.7 * k ? M.BODY3 : p[0] > base[0] - hr * .2 ? M.EAR : undefined }); continue; }
    const droop = E === "small" ? -.6 : 0, eh = hr * .55 * k * (E === "big" ? 1.35 : 1);
    m.ell(v3.add(base, [droop * hr * .2, eh * .7, side * hr * .08]), [eh, hr * .24 * (E === "big" ? 1.2 : 1), hr * .07], M.BODY, { group: 1, dir: [droop, 1, side * .35], up: [1, 0, 0], paint: p => p[1] > base[1] + eh * 1.15 ? M.BODY3 : p[0] > base[0] ? M.EAR : undefined });
    if (E === "tuft") m.seg(v3.add(base, [0, eh * 1.4, side * .02]), v3.add(base, [0, eh * 1.85, side * .04]), hr * .05, hr * .02, M.BODY3, { group: 1 });
  }
  // ---- tail ----
  const tb = [-len * 1.05, top - .1 + arch * .5, 0], tw = frame ? .04 : -.02;
  if (!has("tails")) tail3d(m, has("starTail") ? "star" : q.tail, tb, len, top, tw);
  // ---- horns, antlers, tusks ----
  if (q.horns) for (const side of [-1, 1]) { const k = young ? .6 : baby ? .35 : has("hornsGlow") ? 1.4 : 1, pts = []; for (let i = 0; i <= 8; i++) { const a = .3 - i / 8 * Math.PI * 1.6, r = hr * .65 * k * (1 - .45 * i / 8); pts.push([H[0] - hr * .1 + Math.cos(a) * r, H[1] + hr * .45 + Math.sin(a) * r, side * (hr * .6 + i * .015)]); pts[i].push(hr * .2 * k * (1 - .6 * i / 8)); } m.chain(pts, has("hornsGlow") ? M.MAGIC : M.ACCENT, { group: 13 }); }
  if (q.antlers || has("jackalope")) for (const side of [-1, 1]) antlers3d(m, q, [H[0] - hr * .05, H[1] + hr * .75, side * hr * .4], side, level, has);
  if (q.tusks) for (const side of [-1, 1]) { const k = young ? .4 : baby ? 0 : has("tusksBig") ? 1.3 : .75; if (!k) continue; const b = [sn[0] + L * .25, sn[1] - Dm * .4, side * Dm * .8]; m.chain([[...b, .045 * k], [...v3.add(b, [.1 * k, .1 * k, side * .03]), .04 * k], [...v3.add(b, [.06 * k, .24 * k, side * .05]), .02 * k]], M.ACCENT, { group: 8 }); }
  if (q.teeth && !baby) m.ell([tip[0] - hr * .1, tip[1] - hr * .25, 0], [hr * .08, hr * .14, hr * .12], M.ACCENT, { group: 1 });
  // ---- legendary features ----
  const backAt = t => [-len * .9 + t * len * 1.65, top + hump * Math.max(0, 1 - Math.abs(t - .8) * 3) + arch * (1 - Math.abs(t - .4) * 2), 0];
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [len * .2, top, side * bw * .5], side, 1.15, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("mane") || has("flames")) for (let i = 0; i < 7; i++) { const t = i / 6, b = v3.lerp(v3.add(H, [-hr * .5, hr * .5, 0]), backAt(.55), t), h = [.4, .3, .45, .28, .38, .25, .3][i]; m.chain([[...b, .07], [...v3.add(b, [-.1, h * .6, 0]), .06], [...v3.add(b, [-.25 - (frame ? .05 : 0), h, 0]), .015]], i % 2 ? M.MAGIC : M.MAGIC2, { group: 60 + i % 2, extra: true }); }
  if (has("tails")) for (let i = 0; i < 7; i++) { const a = Math.PI * (.55 + i * .08), z = (i - 3) * .1, e = v3.add(tb, [Math.cos(a) * .9, Math.sin(a) * .85, z]); m.chain([[...tb, .1], [...v3.lerp(tb, e, .5), .17], [...e, .08]], i % 2 ? M.BODY2 : M.BODY, { group: 70, extra: true }); m.ell(e, [.09, .09, .09], M.MAGIC2, { group: 71, extra: true }); }
  if (has("crystals")) [.15, .3, .45, .6, .75].forEach((t, i) => { const b = backAt(t), h = [.3, .5, .4, .6, .35][i]; m.ell(v3.add(b, [0, h * .45, (i % 2 - .5) * .1]), [h * .55, .08, .08], M.MAGIC, { dir: [(i - 2) * .12, 1, 0], group: 80 + i % 2, extra: true, paint: p => p[2] > 0 ? M.MAGIC2 : undefined }); });
  if (has("moss")) {
    for (let i = 0; i < 6; i++) m.ell(backAt(.08 + i * .15), [len * .22, .07, bw * .85], M.LEAF, { group: 85, extra: true });
    for (const [t, h] of [[.25, .55], [.5, .8], [.75, .45]]) { const b = backAt(t); m.seg(b, v3.add(b, [0, h * .7, 0]), .04, .025, M.TRUNK, { group: 86, extra: true }); m.ell(v3.add(b, [0, h * .8, 0]), [h * .28, h * .26, h * .28], M.LEAF2, { group: 87, extra: true, paint: p => p[1] < b[1] + h * .72 ? M.LEAF3 : undefined }); }
    for (const t of [.12, .4, .65, .9]) { const b = backAt(t); m.ell(v3.add(b, [0, .12, bw * .3]), [.07, .035, .07], M.MAGIC, { group: 89, extra: true }); }
  }
  if (has("ribbons")) for (let i = 0; i < 3; i++) for (let k = 0; k < 12; k++) { const t = k / 11; m.ell([len * (.6 - t * 2.3), top + .05 + i * .12 + t * (.3 + i * .15) + Math.sin(t * 6 + frame + i) * .08, (i - 1) * .2], [.06, .025, .04], i % 2 ? M.MAGIC2 : M.MAGIC, { group: 90 + i, extra: true }); }
  const { sp } = render(m, { height: height3d(level, st, q.hgt) * (baby ? 1.8 : 1) });
  if (legend) glowMotes(sp, S.id.length * 7919);
  return sp;
}

function tail3d(m, kind, tb, len, top, tw) {
  const o = { group: 3 }, X = k => -len * k;
  if (kind === "brush") m.chain([[...tb, .1], [X(1.3), top - .25 + tw, 0, .15], [X(1.4), top - .55, 0, .14], [X(1.35), .38 + tw, 0, .09]], M.BODY, { ...o, paint: p => p[1] < .32 ? M.BODY3 : undefined });
  else if (kind === "bushy") m.chain([[...tb, .1], [X(1.05) - .35, top - .05 + tw, 0, .17], [X(1.05) - .75, top - .2 + tw, 0, .18], [X(1.05) - 1.0, top - .35 + tw, 0, .1]], M.BODY, { ...o, paint: p => p[0] < X(1.05) - .82 ? M.BELLY : undefined });
  else if (kind === "stub" || kind === "deer" || kind === "bob") m.ell(v3.add(tb, [-.06, .02 + tw, 0]), [.1, .08, .07], kind === "deer" ? M.BELLY : M.BODY, { ...o, paint: kind === "bob" ? p => p[0] < tb[0] - .08 ? M.BODY3 : undefined : undefined });
  else if (kind === "puff") m.ell(v3.add(tb, [-.04, .02, 0]), [.11, .11, .1], M.BELLY, o);
  else if (kind === "squirrel" || kind === "star") m.chain([[...tb, .12], [X(1.3), top + .05 + tw, 0, .25], [X(1.3), top + .6 + tw, 0, .3], [X(1.0), top + .95 + tw, 0, .27], [X(.65), top + .9 + tw, 0, .16]], kind === "star" ? M.MAGIC : M.BODY, { ...o, extra: true, paint: kind === "star" ? p => spotty(p, 14, .12) ? M.GLINT : undefined : undefined });
  else if (kind === "otter") m.chain([[...tb, .17], [X(1.3), top - .45 + tw, 0, .12], [X(1.6), .1, 0, .07], [X(1.85), .06 + tw, 0, .03]], M.BODY, o);
  else if (kind === "stoat") m.chain([[...tb, .08], [X(1.3), top - .12 + tw, 0, .07], [X(1.6), top - .05 + tw, 0, .06]], M.BODY, { ...o, paint: p => p[0] < X(1.45) ? M.BODY3 : undefined });
  else if (kind === "flat") { m.seg(tb, [X(1.15), .3, 0], .08, .07, M.BODY2, o); m.ell([X(1.4), .1 + tw * .5, 0], [.28, .03, .14], M.BODY3, o); }
  else if (kind === "thin") { m.chain([[...tb, .04], [X(1.1), top - .3, 0, .03], [X(1.12) + tw, top - .55, 0, .025]], M.BODY, o); m.ell([X(1.12) + tw, top - .62, 0], [.04, .07, .04], M.BODY3, o); }
}

function antlers3d(m, q, b, side, level, has) {
  const jack = !q.antlers, A = jack ? .45 : [0, .5, .95][level] * (has("antlersGlow") ? 1.15 : 1), mat = has("antlersGlow") ? (side > 0 ? M.MAGIC2 : M.MAGIC) : M.ACCENT, o = { group: 11 + (side > 0 ? 1 : 0), extra: true };
  if (!A) return;
  const w = .045 * Math.max(.8, A), out = side * .35 * A;
  if (q.antlers === "palm") {
    const k = v3.add(b, [-.15 * A, .15 * A, out * .5]), c = v3.add(k, [-.25 * A, .25 * A, out * .6]);
    m.seg(b, k, w * 1.3, w * 1.1, mat, o);
    m.ell(c, [.32 * A, .2 * A, .05], mat, { ...o, dir: [-1, .5, side * .6] });
    for (let i = 0; i < 4; i++) m.seg(v3.add(c, [(-.25 + i * .15) * A, .12 * A, 0]), v3.add(c, [(-.3 + i * .15) * A, .32 * A, out * .1]), w * .6, w * .3, mat, o);
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
export function owl3d(S, level, frame, st) {
  const legend = level === 2, young = level === 1, baby = level === 0, has = f => legend && S.legend.includes(f), m = new Model();
  const bob = frame ? .03 : 0, hr = baby ? .48 : young ? .42 : .36, hy = (baby ? .95 : 1.08) + bob;
  // feet and a short tail
  for (const side of [-1, 1]) { const f = frame && side > 0 ? .04 : 0; m.seg([.05, .2, side * .14], [.08, .05 + f, side * .15], .07, .06, M.BODY2, { group: 2 }); for (const dz of [-.04, 0, .04]) m.ell([.16, .03 + f, side * .15 + dz], [.06, .025, .02], M.ACCENT, { group: 2 }); }
  m.ell([-.32, .32, 0], [.22, .06, .14], M.BODY2, { dir: [-1, -.6, 0], group: 3 });
  // body: an upright egg, pale breast streaked
  m.ell([0, .55 + bob, 0], [.36, .52, .36], M.BODY, { paint: p => p[0] > .12 && p[1] < hy - hr * .5 ? ((Math.floor(p[1] * 18) % 3 === 0 && spotty(p, 16, .5)) ? M.BODY2 : M.BELLY) : undefined });
  // folded wings, unless the spirit wings spread
  if (!has("wings")) for (const side of [-1, 1]) m.ell([-.06, .58 + bob, side * .3], [.4, .3, .08], M.BODY2, { dir: [-.3, -1, 0], up: [1, 0, 0], group: side > 0 ? 4 : 2, paint: p => spotty(p, 12, .15) ? M.BODY3 : undefined });
  // head: big and round, sunk into the shoulders
  m.ell([0, hy, 0], [hr, hr * .9, hr], M.BODY);
  // facial disc: two pale bowls facing forward, with huge eyes
  for (const side of [-1, 1]) {
    // the face looks out between forward and the near side, as owls turn their heads to us
    const fd = v3.norm([.75, -.05, side * .4 + .35]), c = v3.add(Model.surface([0, hy, 0], [hr, hr * .9, hr], fd), v3.mul(fd, -hr * .05));
    m.ell(c, [hr * .22, hr * .46, hr * .4], M.BELLY, { group: 1, dir: fd });
    const ec = v3.add(c, v3.mul(fd, hr * .14));
    m.ell(ec, [hr * .1, hr * .26, hr * .24].map(v => v * (baby ? 1.15 : 1)), legend ? M.MAGIC : M.IRIS, { group: 1, dir: fd });
    m.ell(v3.add(ec, v3.mul(fd, hr * .07)), [hr * .08, hr * .14, hr * .13].map(v => v * (baby ? 1.15 : 1)), legend ? M.MAGIC2 : M.EYE, { group: 1, dir: fd });
    // ear tufts
    if (!baby) m.ell([hr * .05, hy + hr * .8, side * hr * .6], [hr * .32, hr * .12, hr * .08], M.BODY2, { dir: [-.1, 1, side * .7], up: [1, 0, 0], group: 1 });
  }
  m.ell(Model.surface([0, hy, 0], [hr, hr * .9, hr], v3.norm([.75, -.35, .35])), [hr * .2, hr * .12, hr * .1], M.ACCENT, { dir: [.6, -1, .3], group: 1 }); // beak
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [-.05, .8 + bob, side * .3], side, 1.3, frame ? .12 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("eyesRing")) for (let i = 0; i < 7; i++) { const a = Math.PI * (.15 + i / 6 * .7); m.ell([Math.cos(a) * .2 - .1, hy + .1 + Math.sin(a) * .6, (i - 3) * .15], [.07, .07, .07], M.MAGIC2, { group: 95 + i, extra: true }); m.ell([Math.cos(a) * .2 - .05, hy + .1 + Math.sin(a) * .6, (i - 3) * .15], [.035, .035, .035], M.EYE, { group: 95 + i, extra: true }); }
  const { sp } = render(m, { height: height3d(level, st) * (baby ? 1.8 : 1) * .95 });
  if (legend) glowMotes(sp, 31);
  return sp;
}

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
    m.ell(v3.add(base, v3.mul(dir, len * .5)), [len * .55, span * .1, span * .015], i % 2 ? mat : mat2, { dir, up: v3.sub(tip, root), group: group + (i % 2), extra: true }); // flat in the wing's plane
  }
  for (let i = 0; i < 6; i++) { const t = .1 + i / 6 * .85, b = v3.lerp(root, tip, t); m.ell(v3.add(b, [-.05, -.05, 0]), [span * .16, span * .1, span * .025], mat2, { dir: [-.7, -.4, 0], up: v3.sub(tip, root), group: group + 3, extra: true }); } // coverts
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
  if (has("ribbons")) for (let i = 0; i < 3; i++) { const pts = []; for (let k = 0; k < 9; k++) { const t = k / 8; pts.push([len * (.5 - t * 2.2), top + .05 + i * .1 + t * (.25 + i * .12) + Math.sin(t * 6 + frame + i) * .07, (i - 1) * .18, .04 * (1 - t * .6)]); } m.chain(pts, i % 2 ? M.MAGIC2 : M.MAGIC, { group: 90 + i, extra: true }); }
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

// ================= the other body plans, in 3D =================
const eyesOn = (m, c, r, dirs, size, mat) => { for (const d of dirs) m.ell(Model.surface(c, r, v3.norm(d)), [size, size * 1.2, size], mat, { group: 1 }); };
const shadow = (m, x, w) => m.ell([x, .005, 0], [w, .005, w * .6], M.NOSE, { group: 0 }); // a flyer's shadow on the ground
function finish(m, S, level, st, k) {
  const { sp } = render(m, { height: level === 0 ? Math.max(14, height3d(0, st) * k * 1.8) : height3d(level, st) * k }); // a baby is at least 14 pixels
  if (level === 2) glowMotes(sp, S.id.length * 131);
  return sp;
}
const crown3d = (m, c, w) => { m.ell(c, [w, w * .35, w], M.MAGIC, { group: 95, extra: true, paint: p => p[1] > c[1] ? M.MAGIC2 : undefined }); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; m.ell(v3.add(c, [Math.cos(a) * w * .8, w * .55, Math.sin(a) * w * .8]), [w * .38, w * .12, w * .12], M.MAGIC, { dir: [0, 1, 0], up: [1, 0, 0], group: 96, extra: true }); } };
const crystals3d = (m, pts) => pts.forEach(([b, h], i) => m.ell(v3.add(b, [0, h * .45, 0]), [h * .55, .07, .07], M.MAGIC, { dir: [(i % 3 - 1) * .25, 1, (i % 2 - .5) * .3], group: 80 + i % 2, extra: true, paint: p => p[2] > b[2] ? M.MAGIC2 : undefined }));

export function hedgehog3d(S, level, frame, st) {
  const legend = level === 2, m = new Model(), f = frame ? .03 : 0;
  for (const [x, z] of [[.28, .2], [.28, -.2], [-.28, .2], [-.28, -.2]]) m.seg([x, .15, z], [x + (z > 0 ? f : -f), .03, z], .06, .05, M.BODY3, { group: z > 0 ? 6 : 2 });
  const c = [0, .32, 0], r = [.5, .32, .38];
  m.ell(c, r, M.BODY2, { paint: p => spotty(p, 22, .3) ? M.BODY3 : spotty(p, 19, .12) ? M.BELLY : undefined });
  for (let i = 0; i < 46; i++) { const a = (i * 2.399) % (Math.PI * 2), t = (i / 46) * .9 + .05, d = v3.norm([Math.cos(a) * Math.sin(t * Math.PI * .5) - .25, Math.cos(t * Math.PI * .5) * .9 + .1, Math.sin(a) * Math.sin(t * Math.PI * .5)]); if (d[0] > .55) continue; m.ell(v3.add(Model.surface(c, r, d), v3.mul(d, .02)), [.1, .025, .025], i % 4 ? M.BODY2 : M.BODY3, { dir: v3.add(d, [-.4, 0, 0]), group: 1 }); }
  const sn = [.48, .22, 0];
  m.ell(sn, [.22, .14, .15], M.BELLY, { dir: [1, -.3, 0], group: 1 });
  m.ell([.69, .16, 0], [.04, .04, .04], M.NOSE, { group: 1 });
  eyesOn(m, sn, [.22, .14, .15], [[.3, .6, .55], [.3, .6, -.55]], .035, legend ? M.MAGIC2 : M.EYE);
  if (legend) crystals3d(m, [[[-.3, .55, .1], .35], [[-.05, .62, -.1], .5], [[.2, .55, .12], .4], [[-.15, .58, .2], .3]]);
  return finish(m, S, level, st, .6);
}

export function toad3d(S, level, frame, st) {
  const legend = level === 2, m = new Model(), hop = frame ? .05 : 0;
  for (const side of [-1, 1]) { // folded hind legs, thin front legs
    m.ell([-.22, .16, side * .36], [.24, .13, .12], side > 0 ? M.BODY : M.BODY2, { dir: [1, .3, 0], group: side > 0 ? 6 : 2, paint: p => spotty(p, 14, .15) ? M.BODY3 : undefined });
    m.ell([.05, .04, side * .4], [.16, .04, .08], side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 6 : 2 });
    m.seg([.35, .2 + hop, side * .24], [.42, .03, side * .3], .05, .04, side > 0 ? M.BODY : M.BODY2, { group: side > 0 ? 7 : 2 });
  }
  const c = [0, .3 + hop, 0], r = [.5, .28, .4];
  m.ell(c, r, M.BODY, { paint: p => p[1] < c[1] - .12 ? M.BELLY : p[0] > .38 && Math.abs(p[1] - (c[1] - .02)) < .018 ? M.LINE : spotty(p, 14, .22) ? M.BODY3 : undefined });
  for (const side of [-1, 1]) { const e = [.3, .55 + hop, side * .17]; m.ell(e, [.1, .09, .1], M.BODY, { group: 1 }); m.ell(Model.surface(e, [.1, .09, .1], v3.norm([.6, .5, side * .5])), [.05, .05, .05], legend ? M.MAGIC2 : M.IRIS, { group: 1 }); m.ell(Model.surface(e, [.11, .1, .11], v3.norm([.65, .45, side * .5])), [.03, .015, .03], M.EYE, { group: 1 }); }
  if (legend) crown3d(m, [.15, .66 + hop, 0], .16);
  return finish(m, S, level, st, .55);
}

export function raven3d(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), m = new Model(), bob = frame ? .02 : 0;
  for (const side of [-1, 1]) { const f = frame && side > 0 ? .04 : 0; m.seg([0, .3, side * .08], [.03, .03 + f, side * .08], .03, .025, M.NOSE, { group: side > 0 ? 7 : 2 }); m.ell([.08, .02 + f, side * .08], [.08, .015, .04], M.NOSE, { group: 2 }); }
  m.ell([-.55, .42, 0], [.32, .035, .12], M.BODY2, { dir: [-1, -.25, 0], group: 3 });
  m.ell([0, .52 + bob, 0], [.42, .26, .24], M.BODY, { dir: [1, .45, 0] });
  if (!has("wings")) for (const side of [-1, 1]) m.ell([-.1, .55 + bob, side * .2], [.45, .17, .05], M.BODY2, { dir: [-1, -.25, 0], group: side > 0 ? 4 : 2 });
  const hc = [.36, .84 + bob, 0], hr = young ? .19 : .16;
  m.ell(hc, [hr * 1.1, hr, hr * .95], M.BODY, { paint: p => p[1] > hc[1] + hr * .55 ? M.BELLY : undefined });
  m.ell(v3.add(hc, [hr * 1.5, -hr * .25, 0]), [hr * 1.0, hr * .38, hr * .3], M.NOSE, { dir: [1, -.2, 0], group: 1 });
  eyesOn(m, hc, [hr * 1.1, hr, hr * .95], [[.55, .35, .65], [.55, .35, -.65]], hr * .16, legend ? M.MAGIC2 : M.EYE);
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [-.05, .65 + bob, side * .18], side, 1.1, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  if (has("eyesRing")) for (let i = 0; i < 6; i++) { const a = Math.PI * (.2 + i / 5 * .6); m.ell([Math.cos(a) * .25 - .1, .95 + Math.sin(a) * .45, (i - 2.5) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
  return finish(m, S, level, st, .75);
}

export function bat3d(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = has("wingsBig") ? 1.5 : 1;
  shadow(m, 0, .3 * span);
  for (const side of [-1, 1]) { // membranes between finger bones, flapping
    const sh = [0, y + .05, side * .1], wr = [.05, y + (up ? .35 : -.05), side * .45 * span];
    const tips = [[-.05, y + (up ? .45 : -.15), side * .85 * span], [-.25, y + (up ? .2 : -.25), side * .75 * span], [-.3, y + (up ? 0 : -.25), side * .4 * span]];
    const mem = has("wingsBig") ? M.MAGIC : M.BODY2, bone = has("wingsBig") ? M.MAGIC2 : M.BODY3;
    m.seg(sh, wr, .03, .025, bone, { group: 11 });
    for (const t of tips) { m.seg(wr, t, .02, .012, bone, { group: 11 }); const mid = v3.lerp(v3.lerp(sh, wr, .5), t, .5), d = v3.sub(t, sh); m.ell(mid, [Math.hypot(...d) * .45, .22 * span, .012], mem, { dir: d, up: v3.sub(wr, sh), group: 10 }); }
  }
  m.ell([0, y, 0], [.13, .16, .12], M.BODY, { group: 1 });
  const hc = [.08, y + .2, 0];
  m.ell(hc, [.12, .11, .11], M.BODY, { group: 1 });
  for (const side of [-1, 1]) m.ell(v3.add(hc, [-.02, .15, side * .07]), [.12, .045, .02], M.BODY, { dir: [.1, 1, side * .3], up: [1, 0, 0], group: 1, paint: p => p[0] > hc[0] - .01 ? M.EAR : undefined });
  eyesOn(m, hc, [.12, .11, .11], [[.7, .2, .5], [.7, .2, -.5]], .025, legend ? M.MAGIC2 : M.EYE);
  m.ell(Model.surface(hc, [.12, .11, .11], [1, -.2, 0]), [.025, .02, .03], M.NOSE, { group: 1 });
  return finish(m, S, level, st, .55);
}

export function mole3d(S, level, frame, st) {
  const legend = level === 2, m = new Model(), f = frame ? .03 : 0;
  m.seg([-.5, .18, 0], [-.62, .12, 0], .04, .02, M.SKIN, { group: 3 });
  for (const side of [-1, 1]) m.ell([-.3, .05, side * .2], [.07, .04, .05], M.SKIN, { group: side > 0 ? 6 : 2 });
  m.ell([0, .3, 0], [.52, .29, .33], M.BODY, { paint: p => p[1] > .45 ? M.BODY2 : undefined });
  m.ell([.55, .24, 0], [.2, .07, .07], M.SKIN, { dir: [1, -.15, 0], group: 1 });
  m.ell([.74, .21, 0], [.04, .05, .06], M.NOSE, { group: 1 });
  for (const side of [-1, 1]) { // spade hands, turned out, clawed
    const h = [.32, .1 - (side > 0 ? f : 0), side * .34];
    m.ell(h, [.13, .035, .12], M.SKIN, { group: side > 0 ? 7 : 2, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] });
    for (let k = 0; k < 4; k++) m.ell(v3.add(h, [.14, -.01, side * (k - 1.5) * .05]), [.05, .015, .015], M.ACCENT, { group: side > 0 ? 7 : 2 });
  }
  for (const side of [-1, 1]) m.ell(Model.surface([0, .3, 0], [.52, .29, .33], v3.norm([.85, .3, side * .35])), [.015, .015, .015], legend ? M.MAGIC2 : M.EYE, { group: 1 });
  if (legend) crown3d(m, [.15, .62, 0], .15);
  return finish(m, S, level, st, .55);
}

export function beetle3d(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), m = new Model();
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) { // six jointed legs, alternating
    const x = .25 - i * .25, ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .06 : -.06, base = [x, .22, side * .2];
    m.chain([[...base, .03], [x + ph + (1 - i) * .06, .32, side * .42, .025], [x + ph * 1.5 + (1 - i) * .15, .02, side * .55, .015]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  m.ell([-.12, .34, 0], [.46, .24, .32], M.BODY, { paint: p => Math.abs(p[2]) < .018 && p[1] > .4 ? M.LINE : p[1] > .5 && p[2] > .05 && p[2] < .17 ? M.BELLY : undefined });
  m.ell([.38, .33, 0], [.16, .16, .26], M.BODY, { group: 1 });
  const hc = [.56, .3, 0];
  m.ell(hc, [.1, .1, .17], M.BODY2, { group: 1 });
  const jl = [.3, .5, .75][level] * (has("horn") ? 1.3 : 1), jm = has("horn") ? M.MAGIC : M.BODY3;
  for (const side of [-1, 1]) { const b = v3.add(hc, [.08, .02, side * .1]), e = v3.add(b, [jl * .7, jl * .45, side * jl * .15]), t = v3.add(e, [jl * .25, -jl * .12, -side * jl * .12]); m.chain([[...b, .045], [...e, .035], [...t, .015]], jm, { group: 8 + (side > 0 ? 1 : 0) }); m.seg(v3.lerp(b, e, .55), v3.add(v3.lerp(b, e, .55), [.0, jl * .22, 0]), .02, .008, jm, { group: 8 }); }
  for (const side of [-1, 1]) m.chain([[...v3.add(hc, [.05, .06, side * .1]), .012], [hc[0] + .1, .5, side * .22, .012], [hc[0] + .2, .5, side * .26, .012]], M.BODY3, { group: 9, extra: true });
  eyesOn(m, hc, [.1, .1, .17], [[.4, .3, .85], [.4, .3, -.85]], .02, legend ? M.MAGIC2 : M.GLINT);
  if (has("crystals")) crystals3d(m, [[[-.35, .5, .1], .3], [[-.1, .55, -.08], .45], [[.1, .5, .1], .35]]);
  return finish(m, S, level, st, .5);
}

export function snail3d(S, level, frame, st) {
  const legend = level === 2, m = new Model(), g = frame ? .04 : 0;
  m.ell([0, .07, 0], [.6 + g, .07, .17], M.SKIN, { group: 1 });
  m.chain([[.45 + g, .08, 0, .1], [.6 + g, .25, 0, .09], [.68 + g, .28, 0, .08]], M.SKIN, { group: 1 });
  for (const side of [-1, 1]) { m.seg([.7 + g, .32, side * .04], [.78 + g, .55, side * .1], .018, .014, M.SKIN, { group: 5 }); m.ell([.78 + g, .57, side * .1], [.03, .03, .03], legend ? M.MAGIC2 : M.EYE, { group: 5 }); }
  const c = [-.12, .4, 0], shell = legend ? M.MAGIC : M.BODY;
  m.ell(c, [.32, .32, .22], shell, { group: 3, paint: p => { const a = Math.atan2(p[1] - c[1], p[0] - c[0]), rr = Math.hypot(p[0] - c[0], p[1] - c[1]) / .32, k = ((rr - a / (Math.PI * 2) * .3) % .3 + .3) % .3; return k < .06 ? (legend ? M.MAGIC2 : M.BODY3) : undefined; } });
  return finish(m, S, level, st, .45);
}

export function woodlouse3d(S, level, frame, st) {
  const legend = level === 2, m = new Model();
  for (const side of [-1, 1]) for (let i = 0; i < 7; i++) { const x = -.45 + i * .15, ph = (i + frame) % 2 ? .03 : -.03; m.seg([x, .1, side * .22], [x + ph, .01, side * .33], .025, .015, M.BODY3, { group: side > 0 ? 7 : 2 }); }
  for (const side of [-1, 1]) m.chain([[.5, .15, side * .08, .02], [.7, .3, side * .2, .015], [.82, .22, side * .26, .012]], M.BODY3, { group: 9, extra: true });
  m.ell([0, .18, 0], [.58, .2, .3], M.BODY, { paint: p => ((Math.floor((p[0] + .6) * 9) % 2) && p[1] > .2 ? M.BODY2 : undefined) || (Math.abs(((p[0] + .6) * 9) % 1) < .12 ? M.LINE : undefined) });
  eyesOn(m, [0, .18, 0], [.58, .2, .3], [[.92, .3, .25], [.92, .3, -.25]], .02, legend ? M.MAGIC2 : M.EYE);
  if (legend) crystals3d(m, [[[-.3, .32, .05], .3], [[0, .37, -.05], .45], [[.25, .32, .05], .32]]);
  return finish(m, S, level, st, .4);
}

export function snake3d(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), m = new Model(), ph = frame ? .7 : 0, pts = [];
  for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([-.9 + t * 1.2, .07, Math.sin(t * Math.PI * 2 + ph) * .25 * (1 - t * .5), .03 + .045 * Math.sin(Math.min(1, t * 1.4) * Math.PI / 2)]); }
  pts.push([.38, .25, pts[12][2], .07], [.42, .45, pts[12][2] * .8, .065]);
  m.chain(pts, M.BODY, { paint: p => p[1] < .05 && p[0] < .35 ? M.BELLY : spotty([p[0] * 1.5, p[1], p[2]], 14, .3) ? M.BODY3 : undefined });
  const hc = [.5, .5, pts[13][2] * .8], hr = young ? .11 : .09;
  m.ell(hc, [hr * 1.5, hr * .75, hr], M.BODY, { dir: [1, -.15, 0], group: 1 });
  eyesOn(m, hc, [hr * 1.5, hr * .75, hr], [[.5, .5, .7], [.5, .5, -.7]], hr * .22, legend ? M.MAGIC2 : M.EYE);
  if (!frame) m.seg(v3.add(hc, [hr * 1.4, -hr * .2, 0]), v3.add(hc, [hr * 2.3, -hr * .3, 0]), .01, .008, M.SKIN, { group: 1 });
  if (has("wings")) for (const side of [-1, 1]) wing3d(m, [0, .2, side * .05], side, .9, frame ? .1 : 0, side > 0 ? M.MAGIC2 : M.MAGIC, M.MAGIC, 40 + (side > 0 ? 10 : 0));
  return finish(m, S, level, st, .45);
}

export function moth3d(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), m = new Model(), up = frame === 0, y = .55, span = has("wingsBig") ? 1.45 : 1;
  const wm = has("wingsBig") ? M.MAGIC : M.BODY;
  shadow(m, 0, .3 * span);
  for (const side of [-1, 1]) {
    const lift = up ? .5 : -.1, fore = v3.norm([.35, lift, side]), hind = v3.norm([-.3, lift * .6, side]);
    m.ell(v3.add([0, y, side * .05], v3.mul(fore, .38 * span)), [.4 * span, .2 * span, .012], wm, { dir: fore, up: [1, 0, 0], group: 10, paint: p => Math.hypot(p[0] - .12 * span, Math.abs(p[2]) - .4 * span) < .07 * span ? M.BELLY : undefined });
    m.ell(v3.add([-.05, y, side * .05], v3.mul(hind, .26 * span)), [.27 * span, .15 * span, .012], has("wingsBig") ? M.MAGIC2 : M.BODY2, { dir: hind, up: [1, 0, 0], group: 9 });
    m.chain([[.12, y + .08, side * .03, .015], [.2, y + .25, side * .1, .025], [.24, y + .32, side * .14, .012]], M.BODY2, { group: 11 });
  }
  m.ell([0, y, 0], [.22, .09, .09], M.BELLY, { group: 1, paint: p => spotty(p, 30, .25) ? M.BODY2 : undefined });
  m.ell([.17, y + .03, 0], [.07, .07, .07], M.BELLY, { group: 1 });
  eyesOn(m, [.17, y + .03, 0], [.07, .07, .07], [[.7, .3, .6], [.7, .3, -.6]], .02, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .5);
}

export function glowworm3d(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), m = new Model(), ph = frame ? .05 : 0;
  for (let i = 0; i < 9; i++) { const t = i / 8, x = -.6 + t * 1.15; m.ell([x, .12 + Math.sin(t * Math.PI) * (.06 + ph), 0], [.08, .1 - t * .02, .12 - t * .03], i < 2 ? M.MAGIC2 : i % 2 ? M.BODY2 : M.BODY, { group: 1 }); }
  if (has("lantern")) m.ell([-.75, .3, 0], [.22, .22, .22], M.MAGIC2, { group: 3, paint: p => p[1] < .2 ? M.MAGIC : undefined });
  for (let i = 0; i < 6; i++) m.seg([-.2 + i * .12, .05, .08], [-.2 + i * .12 + (i % 2 ? .02 : -.02) * (frame ? -1 : 1), 0, .12], .015, .01, M.BODY3, { group: 7 });
  m.ell([.6, .14, 0], [.06, .06, .08], M.BODY3, { group: 1 });
  eyesOn(m, [.6, .14, 0], [.06, .06, .08], [[.6, .3, .7], [.6, .3, -.7]], .015, legend ? M.MAGIC2 : M.EYE);
  return finish(m, S, level, st, .4);
}

export function spider3d(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), m = new Model();
  const ce = [.15, .28, 0];
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) { // eight legs, knees high
    const a = (-.6 + i * .4), ph = (i + (side > 0 ? 0 : 1) + frame) % 2 ? .05 : -.05, base = v3.add(ce, [.05 - i * .04, 0, side * .1]);
    const knee = v3.add(base, [Math.cos(a) * .3 * (i < 2 ? 1 : -.6) + ph, .3, side * .3]), foot = v3.add(base, [Math.cos(a) * .55 * (i < 2 ? 1 : -.8) + ph * 1.5, -.28, side * .55]);
    m.chain([[...base, .03], [...knee, .028], [...foot, .015]], side > 0 ? M.BODY2 : M.BODY3, { group: side > 0 ? 7 : 2 });
  }
  m.ell([-.28, .38, 0], [.34, .28, .3], M.BODY, { paint: p => (Math.abs(p[2]) < .03 || Math.abs(p[0] + .28) < .03) && p[1] > .45 ? M.BELLY : undefined });
  m.ell(ce, [.18, .13, .17], M.BODY2, { group: 1 });
  const ring = has("eyesRing");
  for (const [dy, dz] of [[.05, .05], [.05, -.05], [.02, .1], [.02, -.1]]) m.ell(Model.surface(ce, [.18, .13, .17], v3.norm([.9, dy * 6, dz * 4])), [.025, .025, .025], ring ? M.MAGIC2 : M.EYE, { group: 1 });
  if (ring) for (let i = 0; i < 5; i++) { const a = Math.PI * (.2 + i / 4 * .6); m.ell([-.3 + Math.cos(a) * .2, .75 + Math.sin(a) * .35, (i - 2) * .12], [.06, .06, .06], M.MAGIC2, { group: 95 + i, extra: true }); }
  return finish(m, S, level, st, .5);
}

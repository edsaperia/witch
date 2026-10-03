// Witch 3D sprites: a creature (or the witch, or a prop) is a handful of 3D parts, turned
// about 35° and seen from about 30° above (Ed's reference: farm animals in three-quarter
// view), then drawn one ray per pixel.
//   - Volumes (ellipsoids, tapered rounded cones) are a signed distance field. Parts in the
//     same `group` melt into one mass (a smooth union), so a body reads as one creature, not
//     beads; different groups meet with a crease, and where a near group stands in front of
//     another an interior line is drawn.
//   - Flat features (wings, ears, flames) are shaped planes: a 2D mask placed in 3D.
//   - Normals come from the field's gradient, so the normal map is true.
// Model space: x forward (towards the head), y up (ground at 0), z towards the near side.
// Facing: "towards" turns the head towards the viewer; "away" turns it away (we see the rump
// and the back of the head). Both face right; the game mirrors for left.
import { M, Sprite, hash2 } from "./core.js";

const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const v3 = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub, mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k], lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], norm, cross, dot };

// A frame (three unit axes) whose first axis points along `dir`, second towards `up`.
function frameAlong(dir, upHint = [0, 1, 0]) {
  const a = norm(dir); let b = cross(upHint, a);
  if (Math.hypot(...b) < 1e-4) b = cross([0, 0, 1], a);
  b = norm(b); const c = cross(a, b);
  return [a, c, b]; // along, roughly up, sideways
}

// ---- signed distances ----
function sdEllipsoid(p, q) {
  const x = dot(p, q.axes[0]), y = dot(p, q.axes[1]), z = dot(p, q.axes[2]), [a, b, c] = q.r;
  const k0 = Math.hypot(x / a, y / b, z / c), k1 = Math.hypot(x / (a * a), y / (b * b), z / (c * c));
  return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(a, b, c);
}
function sdRoundCone(p, q) { // from a (radius r1) to b (radius r2); after Inigo Quilez
  const { ba, l2, rr, a2, il2, r1, r2 } = q, y = dot(p, ba), z = y - l2;
  const xv = [p[0] * l2 - ba[0] * y, p[1] * l2 - ba[1] * y, p[2] * l2 - ba[2] * y], x2 = dot(xv, xv), y2 = y * y * l2, z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}
function sdRoundBox(p, q) { // half-sizes q.h along q.axes, edges rounded by q.round
  const x = Math.abs(dot(p, q.axes[0])) - q.h[0] + q.round, y = Math.abs(dot(p, q.axes[1])) - q.h[1] + q.round, z = Math.abs(dot(p, q.axes[2])) - q.h[2] + q.round;
  return Math.hypot(Math.max(x, 0), Math.max(y, 0), Math.max(z, 0)) + Math.min(Math.max(x, y, z), 0) - q.round;
}
// hewn, uneven surfaces: a small bumpiness from a few crossed waves
const rough = (p, a) => a * (Math.sin(p[0] * 23 + p[1] * 7) * Math.sin(p[1] * 19 - p[2] * 11) + .5 * Math.sin(p[2] * 41 + p[0] * 29));
const sdf0 = (q, p) => q.type === "ell" ? sdEllipsoid(sub(p, q.cw), q) : q.type === "box" ? sdRoundBox(sub(p, q.cw), q) : sdRoundCone(sub(p, q.aw), q);
const sdf = (q, p) => q.rough ? sdf0(q, p) + rough(p, q.rough) : sdf0(q, p);

export class Model {
  constructor({ blend = .07 } = {}) { this.parts = []; this.flats = []; this.blend = blend; }
  // Every volume also takes o.rough (a hewn, bumpy surface, as a distance) and o.cut: a cut
  // part carves a hollow out of its group instead of adding to it (a horn mouth, a socket);
  // the hollow's walls are drawn in the cut part's material.
  // An ellipsoid at c with radii r. With `dir`, r[0] runs along dir, r[1] roughly up (or
  // along `up`), r[2] across. o: { group, extra (not counted in the height), paint(p) -> material }
  ell(c, r, mat, o = {}) {
    const axes = o.axes || (o.dir ? frameAlong(o.dir, o.up) : [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    this.parts.push({ type: "ell", c, r, axes, mat, group: o.group ?? 1, extra: !!o.extra, paint: o.paint, rough: o.rough, cut: !!o.cut });
    return this;
  }
  // A box centred at c with half-sizes h, its edges rounded by o.round. With `dir`, h[0] runs
  // along dir, h[1] roughly up (or along `up`), h[2] across.
  box(c, h, mat, o = {}) {
    const axes = o.axes || (o.dir ? frameAlong(o.dir, o.up) : [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    this.parts.push({ type: "box", c, h, round: Math.min(o.round ?? .02, ...h), axes, mat, group: o.group ?? 1, extra: !!o.extra, paint: o.paint, rough: o.rough, cut: !!o.cut });
    return this;
  }
  // A tapered limb from a (radius ra) to b (radius rb): a rounded cone, smooth along its length.
  seg(a, b, ra, rb, mat, o = {}) { this.parts.push({ type: "cone", a, b, r1: ra, r2: rb, mat, group: o.group ?? 1, extra: !!o.extra, paint: o.paint, rough: o.rough, cut: !!o.cut }); return this; }
  // A limb through several points, each [x, y, z, radius].
  chain(pts, mat, o = {}) { for (let i = 0; i + 1 < pts.length; i++) this.seg(pts[i].slice(0, 3), pts[i + 1].slice(0, 3), pts[i][3], pts[i + 1][3], mat, o); return this; }
  // A shaped flat plane centred at c, spanning ±su along u and ±sv along v; mask(s, t) with
  // s, t in [-1, 1] returns a material (or nothing for a hole). o: { group, extra, bend }
  flat(c, u, v, su, sv, mask, o = {}) { this.flats.push({ c, u: norm(u), v: norm(v), su, sv, mask, group: o.group ?? 30, extra: !!o.extra, bend: o.bend ?? .35 }); return this; }
  // The point on an ellipsoid's surface (centre c, radii r along the model axes) in direction dir.
  static surface(c, r, dir) { const k = 1 / Math.hypot(dir[0] / r[0], dir[1] / r[1], dir[2] / r[2]); return [c[0] + dir[0] * k, c[1] + dir[1] * k, c[2] + dir[2] * k]; }
}

export const YAW = { towards: .6, away: -.6 }; // radians; the head turned 35° towards or away from us
export const PITCH = .52;                       // the camera looks down about 30°

// Renders a model to a Sprite `height` art pixels tall (measured over the parts not marked extra).
// With `scale` (pixels per model unit) instead, several models share one scale.
export function render(model, { height, scale, facing = "towards", yaw = YAW[facing] ?? YAW.towards, pitch = PITCH, lineGap = .12 } = {}) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), spp = Math.sin(pitch);
  const toWorld = p => [p[0] * cy - p[2] * sy, p[1], p[0] * sy + p[2] * cy];
  const toModel = p => [p[0] * cy + p[2] * sy, p[1], -p[0] * sy + p[2] * cy];
  const D = [0, -spp, -cp], U = [0, cp, -spp], R = [1, 0, 0], B = [0, spp, cp];
  const k = model.blend;
  // parts in world space, each with a bounding sphere
  const parts = model.parts.map(q => {
    if (q.type === "ell") { const cw = toWorld(q.c), axes = q.axes.map(toWorld), rad = Math.max(...q.r); return { ...q, cw, axes, bc: cw, br: rad + (q.rough || 0) * 1.5 }; }
    if (q.type === "box") { const cw = toWorld(q.c), axes = q.axes.map(toWorld); return { ...q, cw, axes, bc: cw, br: Math.hypot(...q.h) + (q.rough || 0) * 1.5 }; }
    const aw = toWorld(q.a), bw = toWorld(q.b), ba = sub(bw, aw), l2 = Math.max(1e-9, dot(ba, ba)), rr = q.r1 - q.r2;
    return { ...q, aw, ba, l2, rr, a2: l2 - rr * rr, il2: 1 / l2, bc: v3.lerp(aw, bw, .5), br: Math.sqrt(l2) / 2 + Math.max(q.r1, q.r2) };
  });
  const flats = model.flats.map(f => { const c = toWorld(f.c), u = toWorld(f.u), v = toWorld(f.v); return { ...f, cw: c, uw: u, vw: v, nw: norm(cross(u, v)), bc: c, br: Math.hypot(f.su, f.sv) }; });
  const all = [...parts, ...flats];
  const bounds = q => { const sx = dot(q.bc, R), su = dot(q.bc, U), e = q.br + (q.uw ? 0 : k); return [sx - e, sx + e, su - e, su + e]; };
  for (const q of all) [q.x0, q.x1, q.u0, q.u1] = bounds(q);
  const body = all.filter(q => !q.extra && !q.cut);
  const u0b = Math.min(...body.map(q => q.u0 + (q.uw ? 0 : k))), u1b = Math.max(...body.map(q => q.u1 - (q.uw ? 0 : k)));
  const s = scale ?? height / Math.max(1e-6, u1b - u0b);
  const X0 = Math.min(...all.map(q => q.x0)), X1 = Math.max(...all.map(q => q.x1)), U0 = Math.min(...all.map(q => q.u0)), U1 = Math.max(...all.map(q => q.u1));
  const W = Math.ceil((X1 - X0) * s) + 4, H = Math.ceil((U1 - U0) * s) + 2, sp = new Sprite(W, H);
  const depth = new Float32Array(W * H).fill(Infinity), grp = new Int16Array(W * H).fill(-1);
  // which parts can touch each 8 x 8 tile of pixels
  const T = 8, TW = Math.ceil(W / T), TH = Math.ceil(H / T), tiles = Array.from({ length: TW * TH }, () => []);
  all.forEach((q, qi) => {
    const tx0 = Math.max(0, Math.floor(((q.x0 - X0) * s) / T)), tx1 = Math.min(TW - 1, Math.floor(((q.x1 - X0) * s + 2) / T));
    const ty0 = Math.max(0, Math.floor(((U1 - q.u1) * s) / T)), ty1 = Math.min(TH - 1, Math.floor(((U1 - q.u0) * s + 1) / T));
    for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) tiles[ty * TW + tx].push(qi);
  });
  const eps = .25 / s;
  const smin = (a, b) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * .25; };
  for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
    const cand = tiles[Math.floor(iy / T) * TW + Math.floor(ix / T)];
    if (!cand.length) continue;
    const sx = X0 + (ix + .5 - 1) / s, su = U1 - (iy + .5) / s;
    const O = v3.add(v3.add(v3.mul(R, sx), v3.mul(U, su)), v3.mul(B, 50));
    // the ray's interval through the candidates' bounding spheres
    let tmin = Infinity, tmax = -Infinity; const vol = [], fl = [];
    for (const qi of cand) {
      const q = all[qi], oc = sub(O, q.bc), b = dot(oc, D), rb = q.br + (q.uw ? 0 : k), c = dot(oc, oc) - rb * rb, h = b * b - c;
      if (h < 0) continue;
      if (q.uw) { fl.push(q); continue; }
      if (q.cut) { vol.push(q); continue; } // a hollow adds no surface of its own
      const r = Math.sqrt(h); tmin = Math.min(tmin, -b - r); tmax = Math.max(tmax, -b + r); vol.push(q);
    }
    let hitT = Infinity, hitG = -1, hitMat = 0, hitN = null;
    if (vol.length) {
      // group the candidates; the field is a smooth union within a group, a hard union across
      const groups = new Map(); for (const q of vol) { let g = groups.get(q.group); if (!g) groups.set(q.group, g = []); g.push(q); }
      const gfield = (qs, p) => { let d = Infinity; for (const q of qs) if (!q.cut) d = d === Infinity ? sdf(q, p) : smin(d, sdf(q, p)); for (const q of qs) if (q.cut) d = Math.max(d, -sdf(q, p)); return d; };
      let t = Math.max(0, tmin);
      for (let step = 0; step < 96 && t < tmax; step++) {
        const p = v3.add(O, v3.mul(D, t));
        let d = Infinity, g = null; for (const [gk, qs] of groups) { const gd = gfield(qs, p); if (gd < d) { d = gd; g = gk; } }
        if (d < eps) {
          const qs = groups.get(g), e = .5 / s;
          hitN = norm([gfield(qs, [p[0] + e, p[1], p[2]]) - gfield(qs, [p[0] - e, p[1], p[2]]), gfield(qs, [p[0], p[1] + e, p[2]]) - gfield(qs, [p[0], p[1] - e, p[2]]), gfield(qs, [p[0], p[1], p[2] + e]) - gfield(qs, [p[0], p[1], p[2] - e])]);
          // the material: the part whose own surface is nearest
          let mq = qs[0], md = Infinity; for (const q of qs) { if (q.cut) continue; const dd = sdf(q, p); if (dd < md) { md = dd; mq = q; } }
          for (const q of qs) if (q.cut && -sdf(q, p) > md - eps * 2) { mq = q; break; } // on a hollow's wall
          hitT = t; hitG = g; hitMat = mq.paint ? (mq.paint(toModel(p), mq) ?? mq.mat) : mq.mat;
          break;
        }
        t += Math.max(d * .9, eps * .5);
      }
    }
    for (const f of fl) { // shaped planes
      const dn = dot(D, f.nw); if (Math.abs(dn) < 1e-4) continue;
      const t = dot(sub(f.cw, O), f.nw) / dn; if (t >= hitT) continue;
      const p = v3.add(O, v3.mul(D, t)), rel = sub(p, f.cw), sS = dot(rel, f.uw) / f.su, tT = dot(rel, f.vw) / f.sv;
      if (Math.abs(sS) > 1 || Math.abs(tT) > 1) continue;
      const m = f.mask(sS, tT); if (!m) continue;
      let n = dn > 0 ? v3.mul(f.nw, -1) : f.nw; n = norm(v3.add(n, v3.add(v3.mul(f.uw, sS * f.bend), v3.mul(f.vw, tT * f.bend * .5))));
      hitT = t; hitG = f.group; hitMat = m; hitN = n;
    }
    if (!hitN || !hitMat) continue;
    const i = iy * W + ix; depth[i] = hitT; grp[i] = hitG;
    sp.px(ix, iy, hitMat, dot(hitN, R), -dot(hitN, U), dot(hitN, B));
  }
  // interior lines: where a nearer group stands in front of a clearly further one
  const lines = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!sp.m[i]) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
      const j = Y * W + X;
      if (sp.m[j] && grp[j] !== grp[i] && depth[j] - depth[i] > lineGap) { lines.push(i); break; }
    }
  }
  for (const i of lines) if (![M.EYE, M.GLINT, M.MAGIC, M.MAGIC2, M.NOSE].includes(sp.m[i])) sp.m[i] = M.LINE;
  // a glint in each eye 2 x 2 or bigger: its top-left pixel
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (sp.m[i] !== M.EYE) continue;
    const up = y > 0 && sp.m[i - W] === M.EYE, left = x > 0 && sp.m[i - 1] === M.EYE, more = x + 1 < W && sp.m[i + 1] === M.EYE && y + 1 < H && sp.m[i + W] === M.EYE;
    if (!up && !left && more) sp.m[i] = M.GLINT;
  }
  // stand on the bottom row: drop the empty rows under the lowest pixels
  let low = -1; for (let y = H - 1; y >= 0 && low < 0; y--) for (let x = 0; x < W; x++) if (sp.m[y * W + x]) { low = y; break; }
  if (low >= 0 && low < H - 1) {
    const d = H - 1 - low;
    for (let y = H - 1; y >= 0; y--) for (let x = 0; x < W; x++) { const i = y * W + x, j = (y - d) * W + x, ok = y - d >= 0; sp.m[i] = ok ? sp.m[j] : 0; sp.g[i] = ok ? sp.g[j] : 0; for (let c = 0; c < 3; c++) sp.n[i * 3 + c] = ok ? sp.n[j * 3 + c] : 0; }
  }
  return { sp, s };
}

// Paint helpers: a pattern from model coordinates.
export const spotty = (p, k = 9, density = .3) => hash2(Math.floor(p[0] * k), Math.floor(p[1] * k) + Math.floor(p[2] * k) * 97, 7) < density;

// Masks for shaped planes (s along the span or length, t across; both in [-1, 1]).
export const masks = {
  // a feathered wing: s from the shoulder (-1) to the tip (1), t from the leading edge (1)
  // to the trailing edge (-1); long primaries with notched tips, coverts along the front
  wing: (mat, mat2) => (s, t) => {
    const u = (s + 1) / 2, lead = 1 - .35 * u * u, trail = -1 + .55 * u + .18 * Math.abs(Math.sin(u * Math.PI * 6));
    if (t > lead || t < trail) return null;
    if (t > lead - .35 * (1 - u * .5)) return mat2;
    return Math.floor(u * 9) % 2 ? mat : mat2;
  },
  // a leaf-shaped ear: t from the base (-1) to the tip (1); inner ear and a dark tip
  ear: (mat, inner = M.EAR, tip = M.BODY3) => (s, t) => {
    const u = (t + 1) / 2, half = .95 * Math.sin(Math.PI * Math.min(1, .15 + u * .85)) * (1 - u * .35);
    if (Math.abs(s) > half) return null;
    if (u > .82) return tip;
    return Math.abs(s) < half * .5 && u < .7 && u > .12 ? inner : mat;
  },
  // a flame: t from the base (-1) to the tip (1); a bright core
  flame: (mat, core) => (s, t) => { const u = (t + 1) / 2, half = Math.sin(Math.PI * Math.min(1, u * 1.1)) * (1 - u) * 1.4; if (Math.abs(s) > half) return null; return Math.abs(s) < half * .45 && u < .6 ? core : mat; },
  // a membrane between fingers (bat): scalloped trailing edge
  membrane: mat => (s, t) => { const u = (s + 1) / 2, trail = -1 + .35 * Math.abs(Math.sin(u * Math.PI * 3)); return t < trail || t > 1 - .2 * u ? null : mat; },
  // an oval with an eyespot (moth wings)
  spotted: (mat, spot, ring) => (s, t) => { const r = Math.hypot(s, t * 1.2); if (r > 1) return null; const e = Math.hypot(s - .35, t - .1); return e < .18 ? ring : e < .3 ? spot : mat; },
};

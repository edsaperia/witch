// Witch 3D sprites: a creature is a handful of posed ellipsoids, turned about 35° towards
// the viewer and seen from about 30° above (Ed's reference: farm animals in three-quarter
// view), then rasterised one ray per pixel. That gives the diagonal pose, the top of the
// back as a lit surface, legs staggered in depth, and true normals for the normal map.
// Model space: x forward (towards the head), y up (ground at 0), z towards the creature's
// near side. Everything faces right; the game mirrors for left.
import { M, Sprite, hash2 } from "./core.js";

const norm = v => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const v3 = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k], lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], norm, cross, dot };

// A frame (three unit axes) whose first axis points along `dir`.
function frameAlong(dir, upHint = [0, 1, 0]) {
  const a = norm(dir); let b = cross(upHint, a);
  if (Math.hypot(...b) < 1e-4) b = cross([0, 0, 1], a);
  b = norm(b); const c = cross(a, b);
  return [a, c, b]; // along, roughly up, sideways
}

export class Model {
  constructor() { this.parts = []; }
  // An ellipsoid at c with radii r along its axes (default: the model's axes; with `dir`, r[0]
  // runs along dir, r[1] roughly up (or along `up`), r[2] across).
  // o: { group, axes: [ax, ay, az], dir (first axis along this), extra (not counted in the
  //      creature's height), paint(p, part) -> material for a hit at model point p }
  ell(c, r, mat, o = {}) {
    const axes = o.axes || (o.dir ? frameAlong(o.dir, o.up) : [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    this.parts.push({ c, r, axes, mat, group: o.group ?? 1, extra: !!o.extra, paint: o.paint });
    return this;
  }
  // A tapering limb from a to b: a run of overlapping spheres (radius ra to rb).
  // A smooth limb from a to b, tapering from ra to rb: one long ellipsoid per stretch (a
  // run of spheres would shade as ribs), with a sphere at the joint so chains stay round.
  seg(a, b, ra, rb, mat, o = {}) {
    const d = v3.sub(b, a), L = Math.hypot(...d);
    if (L < 1e-6) return this.ell(a, [ra, ra, ra], mat, o);
    const n = Math.max(1, Math.round(Math.abs(ra - rb) / Math.max(ra, rb) * 3)); // tapering: a few pieces
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n, r = ra + (rb - ra) * (t0 + t1) / 2;
      this.ell(v3.lerp(a, b, (t0 + t1) / 2), [L / n / 2 + r * .6, r, r], mat, { ...o, dir: d });
    }
    if (!o.noJoint) this.ell(b, [rb, rb, rb], mat, o);
    return this;
  }
  // The point on an ellipsoid's surface (centre c, radii r along the model axes) in direction dir.
  static surface(c, r, dir) { const k = 1 / Math.hypot(dir[0] / r[0], dir[1] / r[1], dir[2] / r[2]); return [c[0] + dir[0] * k, c[1] + dir[1] * k, c[2] + dir[2] * k]; }
  // A limb through several points, each [x, y, z, radius].
  chain(pts, mat, o = {}) { for (let i = 0; i + 1 < pts.length; i++) this.seg(pts[i].slice(0, 3), pts[i + 1].slice(0, 3), pts[i][3], pts[i + 1][3], mat, o); return this; }
}

// Renders a model to a Sprite `height` art pixels tall (measured over the parts not marked
// extra). yaw turns the head towards the viewer; pitch is how far the camera looks down.
export function render(model, { height, yaw = .6, pitch = .52, lineGap = .14, outlineGroups = true } = {}) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), spp = Math.sin(pitch);
  const toWorld = p => [p[0] * cy - p[2] * sy, p[1], p[0] * sy + p[2] * cy];          // yaw about y
  const toModel = p => [p[0] * cy + p[2] * sy, p[1], -p[0] * sy + p[2] * cy];
  const D = [0, -spp, -cp], U = [0, cp, -spp], R = [1, 0, 0], B = [0, spp, cp];        // camera: view dir, up, right, back
  const parts = model.parts.map(q => {
    const c = toWorld(q.c), axes = q.axes.map(toWorld);
    // screen-space bounds: the ellipsoid's extent along screen right and up
    const ext = v => Math.sqrt(axes.reduce((s, a, k) => s + (dot(a, v) * q.r[k]) ** 2, 0));
    const ex = ext(R), eu = ext(U), sx = dot(c, R), su = dot(c, U);
    return { ...q, cw: c, axes, x0: sx - ex, x1: sx + ex, u0: su - eu, u1: su + eu };
  });
  const body = parts.filter(p => !p.extra);
  const u0 = Math.min(...body.map(p => p.u0)), u1 = Math.max(...body.map(p => p.u1));
  const s = height / (u1 - u0);
  const X0 = Math.min(...parts.map(p => p.x0)), X1 = Math.max(...parts.map(p => p.x1)), U0 = Math.min(...parts.map(p => p.u0)), U1 = Math.max(...parts.map(p => p.u1));
  const W = Math.ceil((X1 - X0) * s) + 4, H = Math.ceil((U1 - U0) * s) + 2, sp = new Sprite(W, H);
  const depth = new Float32Array(W * H).fill(Infinity), grp = new Int16Array(W * H).fill(-1);
  for (const q of parts) {
    const ix0 = Math.max(0, Math.floor((q.x0 - X0) * s + 1)), ix1 = Math.min(W - 1, Math.ceil((q.x1 - X0) * s + 1));
    const iy0 = Math.max(0, Math.floor((U1 - q.u1) * s)), iy1 = Math.min(H - 1, Math.ceil((U1 - q.u0) * s));
    const [a0, a1, a2] = q.axes, [r0, r1, r2] = q.r;
    // the ray direction in the ellipsoid's unit-sphere space is the same for every pixel
    const dl = [dot(D, a0) / r0, dot(D, a1) / r1, dot(D, a2) / r2], A = dot(dl, dl);
    for (let iy = iy0; iy <= iy1; iy++) for (let ix = ix0; ix <= ix1; ix++) {
      const sx = X0 + (ix + .5 - 1) / s, su = U1 - (iy + .5) / s;
      const O = v3.add(v3.add(v3.mul(R, sx), v3.mul(U, su)), v3.mul(B, 50)), oc = v3.sub(O, q.cw);
      const ol = [dot(oc, a0) / r0, dot(oc, a1) / r1, dot(oc, a2) / r2];
      const Bq = 2 * dot(ol, dl), C = dot(ol, ol) - 1, disc = Bq * Bq - 4 * A * C;
      if (disc < 0) continue;
      const t = (-Bq - Math.sqrt(disc)) / (2 * A), i = iy * W + ix;
      if (t >= depth[i]) continue;
      const hl = [ol[0] + dl[0] * t, ol[1] + dl[1] * t, ol[2] + dl[2] * t];             // hit, unit-sphere space
      const g = [hl[0] / r0, hl[1] / r1, hl[2] / r2];                                    // gradient, local
      const nw = norm([a0[0] * g[0] + a1[0] * g[1] + a2[0] * g[2], a0[1] * g[0] + a1[1] * g[1] + a2[1] * g[2], a0[2] * g[0] + a1[2] * g[1] + a2[2] * g[2]]);
      const hw = v3.add(O, v3.mul(D, t));
      const mat = q.paint ? (q.paint(toModel(hw), q) ?? q.mat) : q.mat;
      if (mat === 0) continue;
      depth[i] = t; grp[i] = q.group;
      sp.px(ix, iy, mat, dot(nw, R), -dot(nw, U), dot(nw, B));
    }
  }
  // interior lines: where a nearer part stands in front of a clearly further one
  if (outlineGroups) {
    const lines = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (!sp.m[i]) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
        const j = Y * W + X;
        if (sp.m[j] && grp[j] !== grp[i] && depth[j] - depth[i] > lineGap) { lines.push(i); break; }
      }
    }
    for (const i of lines) if (![M.EYE, M.GLINT, M.MAGIC, M.MAGIC2].includes(sp.m[i])) sp.m[i] = M.LINE;
  }
  // a glint in each eye: its top-left pixel
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (sp.m[i] !== M.EYE) continue;
    const up = y > 0 && sp.m[i - W] === M.EYE, left = x > 0 && sp.m[i - 1] === M.EYE, more = x + 1 < W && sp.m[i + 1] === M.EYE && y + 1 < H && sp.m[i + W] === M.EYE; // only eyes 2 x 2 or bigger
    if (!up && !left && more) sp.m[i] = M.GLINT;
  }
  return { sp, s, toScreen: p => { const w = toWorld(p); return [(dot(w, R) - X0) * s + 1, (U1 - dot(w, U)) * s]; } };
}

// Paint helpers: a pattern from model coordinates.
export const spotty = (p, k = 9, density = .3) => hash2(Math.floor(p[0] * k), Math.floor(p[1] * k) + Math.floor(p[2] * k) * 97, 7) < density;

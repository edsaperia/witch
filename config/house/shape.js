// The oak's floor as one shape (Ed, 2026-10-24, the treehouse layout v4 on claude/treehouse-trunk-mock,
// previews/ed/treehouse-layout-v4: "it is a large old oak tree with wide, thick, decumbent branches ... The room and corridor shapes
// are irregular, and don't have clear joins between them"): the trunk's rooms, the bent limbs of the trunk between them (its soft S),
// the branches out to the branch rooms, and the floor's hint of each branch room's limb carrying on (a stub), smooth-unioned into
// one distance field (metres, negative inside), exactly as the mock's source/house-v4.html draws it. The rules walk it
// (rules/houseRooms.ts), the drawing paints it (render/houseArt.ts) and the tools trace its outline (tools/house/organic.mjs), all
// from here, so she walks exactly where the floor is drawn. Pure; metres on the house's plan (x east, z south, the Terrace's middle 0).
//
// A shape (config/house/assemble.js makes it from the room files): `trunk`, its rooms bottom to top ({ id, x, z, r }); `spine`, the
// limbs between them ({ a, b: trunk room ids, bend }); `branches`, the branch rooms ({ id, from, x, z, r, bend, locked }); `stubs`,
// the floor's bulge where each branch room's limb leaves ({ room, a: { x, z }, b: { x, z }, w0, w1 }); `noiseAt`, where the plan's 0
// lay on the mock's own (its noise and each room's wobble are seeded by place, so the field is worked out there: the shapes the
// mock's, exactly).

/** The mock's own noise (its sine hash, value noise, three octaves), so the shapes are its shapes. */
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
export function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export const fbm = (x, y) => noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15;
/** A smooth minimum: two shapes run into each other over `k` metres, with no seam. */
const smin = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; };

/** A room: a lumpy blob, its radius wobbling with the angle and a little noise, so no two are round. */
export function blob(r, x, z) {
  const dx = x - r.x, dz = z - r.z, a = Math.atan2(dz, dx), seed = r.x * 0.37 + r.z * 0.21;
  const rr = r.r * (1 + 0.1 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 2.3) + 0.05 * (fbm(dx * 0.15 + seed, dz * 0.15) - 0.5) * 2);
  return Math.hypot(dx, dz) - rr;
}
/** A limb's middle line: a quadratic from a to b, bowed `bend` (its control point twice that off the chord's middle). */
export function limbCurve(a, b, bend) {
  const L = Math.hypot(b.x - a.x, b.z - a.z), nx = -(b.z - a.z) / L, nz = (b.x - a.x) / L;
  return { a, b, c: { x: (a.x + b.x) / 2 + nx * bend * 2, z: (a.z + b.z) / 2 + nz * bend * 2 } };
}
export const curveAt = (q, t) => ({ x: (1 - t) * (1 - t) * q.a.x + 2 * (1 - t) * t * q.c.x + t * t * q.b.x, z: (1 - t) * (1 - t) * q.a.z + 2 * (1 - t) * t * q.c.z + t * t * q.b.z });
/** A bent limb from a to b, its half-width easing from w0 to w1: [distance, t along it, signed side]. `n` samples along it (the
 *  mock's 24 for the trunk and the branches; finer for a short stub). */
export function limb(a, b, bend, w0, w1, x, z, n = 24, rough = 0.35, roughScale = 0.2) {
  { const ex = b.x - a.x, ez = b.z - a.z, L2 = ex * ex + ez * ez, t = Math.max(0, Math.min(1, ((x - a.x) * ex + (z - a.z) * ez) / L2)), far = Math.hypot(x - a.x - ex * t, z - a.z - ez * t) - Math.abs(bend) * 2 - Math.max(w0, w1) - 6;
    if (far > 0) return [far + 6, t, 0]; } // (far from it: no need to find its nearest point)
  const q = limbCurve(a, b, bend);
  let best = 1e9, bt = 0, side = 0;
  for (let i = 0; i <= n; i++) {
    const t = i / n, p = curveAt(q, t), d = Math.hypot(x - p.x, z - p.z);
    if (d < best) { best = d; bt = t; const tx = 2 * (1 - t) * (q.c.x - a.x) + 2 * t * (b.x - q.c.x), tz = 2 * (1 - t) * (q.c.z - a.z) + 2 * t * (b.z - q.c.z); side = ((x - p.x) * -tz + (z - p.z) * tx) / Math.hypot(tx, tz); }
  }
  const w = w0 + (w1 - w0) * bt + rough * (fbm(x * roughScale, z * roughScale) - 0.5);
  return [best - w, bt, side];
}
/** A stub (the mock's limbFine): a short limb sampled finely, its edge a little less rough. */
const stubAt = (l, x, z) => limb(l.a, l.b, 0, l.w0, l.w1, x, z, Math.max(8, Math.ceil(Math.hypot(l.b.x - l.a.x, l.b.z - l.a.z) * 3)), 0.25, 0.4);

/** The spine's limb between trunk rooms i-1 and i (its half-widths 0.82 of their sizes, bowing one way then the other: the soft S). */
export const spineLimb = (a, b, i) => ({ a, b, bend: (i % 2 ? 1 : -1) * 1, w0: a.r * 0.82, w1: b.r * 0.82 });
/** A branch's limb from its trunk room (its half-width at most 5.5 m there, the room's own at least 2.8 m at the far end). */
export const branchLimb = (p, r) => ({ a: p, b: r, bend: r.bend, w0: Math.min(5.5, p.r * 0.45), w1: Math.max(2.8, r.r * 0.42) });

/** The shape in the mock's own frame (worked out once): every place moved by `noiseAt`. */
function inMock(S) {
  if (S.m) return S.m;
  const [ox, oz] = S.noiseAt ?? [0, 0], mv = r => ({ ...r, x: r.x + ox, z: r.z + oz }), pt = p => ({ x: p.x + ox, z: p.z + oz });
  const trunk = S.trunk.map(mv), branches = S.branches.map(mv), byId = Object.fromEntries([...trunk, ...branches].map(r => [r.id, r]));
  // (its bounds, every room's wobble and limb's width in: far outside them the field's only how far it is to them, at least)
  const all = [...trunk, ...branches], pad = 12; // (a branch bows up to 4 m off its chord, 5.5 m wide)
  const box = { x0: Math.min(...all.map(r => r.x - r.r * 1.3)) - pad, x1: Math.max(...all.map(r => r.x + r.r * 1.3)) + pad, z0: Math.min(...all.map(r => r.z - r.r * 1.3)) - pad, z1: Math.max(...all.map(r => r.z + r.r * 1.3)) + pad };
  return (S.m = { ox, oz, trunk, branches, byId, box, stubs: S.stubs.map(l => ({ ...l, a: pt(l.a), b: pt(l.b) })) });
}
/** How far (x, z), in the mock's frame, lies outside the shape's bounds (0 within them). */
const outside = (B, x, z) => Math.hypot(Math.max(0, B.x0 - x, x - B.x1), Math.max(0, B.z0 - z, z - B.z1));
/** The floor's distance at (x, z) (negative inside). `walk`: only what she walks on (a locked room and its stub left out, its branch
 *  stopping at its door, the room's own rim). `parts`: also each part's distance, for the grain (render/houseArt.ts).
 *  @param {any} S0 @param {number} x0 @param {number} z0 @param {boolean} [walk] @param {any[] | null} [parts] */
export function field(S0, x0, z0, walk = false, parts = null) {
  const S = inMock(S0), byId = S.byId, x = x0 + S.ox, z = z0 + S.oz, far = outside(S.box, x, z);
  if (far > 0 && !parts) return far; // (clear of it: no nearer than its bounds)
  let d = 1e9, lockedIn = 1e9;
  for (const r of S.trunk) { const s = blob(r, x, z); if (parts) parts.push({ kind: "ring", r, s }); d = smin(d, s, 6); }
  for (let i = 1; i < S.trunk.length; i++) {
    const l = spineLimb(S.trunk[i - 1], S.trunk[i], i), [s, t, side] = limb(l.a, l.b, l.bend, l.w0, l.w1, x, z);
    if (parts) parts.push({ kind: "spine", s, side, t, a: l.a, b: l.b }); d = smin(d, s, 6);
  }
  for (const r of S.branches) {
    const p = byId[r.from], l = branchLimb(p, r), [s, t, side] = limb(l.a, l.b, l.bend, l.w0, l.w1, x, z), sb = blob(r, x, z);
    if (parts) parts.push({ kind: "branch", r, s, side, t }, { kind: "ring", r, s: sb });
    if (walk && r.locked) { d = smin(d, s, 5); lockedIn = Math.min(lockedIn, sb); } // (its branch up to its door: the room itself shut)
    else d = smin(d, smin(s, sb, 3.5), 5);
  }
  for (const l of S.stubs) { if (walk && byId[l.room]?.locked) continue; const [s] = stubAt(l, x, z); d = smin(d, s, 3); }
  return walk && lockedIn < 1e8 ? Math.max(d, -lockedIn) : d;
}

/** The trunk's floor from room `from` to room `to` along it (rules/treehouse.ts: where she lands by herself, Ed 2026-10-26): their
 *  blobs and the trunk's limbs between them, smoothed as the floor's (negative inside), metres on the plan; 1e9 for rooms not on it.
 *  @param {any} S0 @param {number} x0 @param {number} z0 @param {string} from @param {string} to */
export function trunkField(S0, x0, z0, from, to) {
  const S = inMock(S0), x = x0 + S.ox, z = z0 + S.oz, i0 = S.trunk.findIndex(r => r.id === from), i1 = S.trunk.findIndex(r => r.id === to);
  if (i0 < 0 || i1 < i0) return 1e9;
  const far = outside(S.box, x, z);
  if (far > 0) return far;
  let d = 1e9;
  for (let i = i0; i <= i1; i++) d = smin(d, blob(S.trunk[i], x, z), 6);
  for (let i = i0 + 1; i <= i1; i++) { const l = spineLimb(S.trunk[i - 1], S.trunk[i], i), [s] = limb(l.a, l.b, l.bend, l.w0, l.w1, x, z); d = smin(d, s, 6); }
  return d;
}

/** The room whose floor (x, z) is on: the nearest blob that holds it, else null (on a branch between rooms). */
export function roomAt(S0, x0, z0) {
  const S = inMock(S0), x = x0 + S.ox, z = z0 + S.oz;
  let best = null, bd = 0;
  for (const r of [...S.trunk, ...S.branches]) { const d = blob(r, x, z); if (d < bd) { bd = d; best = r; } }
  return best && (S0.trunk.find(q => q.id === best.id) ?? S0.branches.find(q => q.id === best.id));
}
/** A room's own floor at (x, z) (its blob alone: negative inside), metres on the plan. */
export function inRoom(S0, id, x0, z0) {
  const S = inMock(S0), r = S.byId[id];
  return r ? blob(r, x0 + S.ox, z0 + S.oz) : 1e9;
}

/** The nearest point to (x, z) where `fn` (a distance: negative inside) is at most -inset, and how far it was: Newton's steps down its
 *  slope (a central difference; the smooth union's slope is smooth), the best of them kept. */
export function project(fn, x, z, inset = 0, h = 0.05) {
  let d = fn(x, z) + inset;
  if (d <= 0) return { x, z, d: 0 };
  let px = x, pz = z, best = { x, z, e: d };
  for (let i = 0; i < 12; i++) {
    const gx = (fn(px + h, pz) - fn(px - h, pz)) / (2 * h), gz = (fn(px, pz + h) - fn(px, pz - h)) / (2 * h), gl = Math.hypot(gx, gz) || 1, step = (d + 0.01) / gl;
    px -= (gx / gl) * step; pz -= (gz / gl) * step;
    d = fn(px, pz) + inset;
    if (d < best.e) best = { x: px, z: pz, e: d };
    if (d <= 0) break;
  }
  return { x: best.x, z: best.z, d: Math.hypot(best.x - x, best.z - z) };
}
/** The nearest point to (x, z) on what she walks, `inset` metres in from its edge, and how far it was. */
export const nearestFloor = (S, x, z, inset = 0) => project((a, b) => field(S, a, b, true), x, z, inset);
/** The nearest point to (x, z) on room `id`'s own floor (its blob), `inset` metres in. */
export const nearestInRoom = (S, id, x, z, inset = 0) => project((a, b) => inRoom(S, id, a, b), x, z, inset);

/** The floor's outline (marching squares over `step`-metre cells within the box): closed rings of [x, z] points, metres on the plan.
 *  `inside(x, z)` says which side a point is on (defaults to the whole floor, drawn). For the crown builder and the tools. */
export function outline(S, box, step = 0.5, inside = (x, z) => field(S, x, z) < 0) {
  const nx = Math.ceil((box.x1 - box.x0) / step) + 1, nz = Math.ceil((box.z1 - box.z0) / step) + 1, v = new Uint8Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) v[j * nx + i] = inside(box.x0 + i * step, box.z0 + j * step) ? 1 : 0;
  // each cell's edges as segments between the mid-points of its sides, then joined into rings
  const key = (x, z) => `${Math.round(x * 100)},${Math.round(z * 100)}`, next = new Map();
  const mid = (i, j, side) => { const x = box.x0 + i * step, z = box.z0 + j * step; return side === 0 ? [x + step / 2, z] : side === 1 ? [x + step, z + step / 2] : side === 2 ? [x + step / 2, z + step] : [x, z + step / 2]; };
  const SEG = { 1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[1, 0]], 5: [[3, 0], [1, 2]], 6: [[2, 0]], 7: [[3, 0]], 8: [[0, 3]], 9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[0, 1]], 12: [[1, 3]], 13: [[1, 2]], 14: [[2, 3]] };
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const c = v[j * nx + i] * 8 + v[j * nx + i + 1] * 4 + v[(j + 1) * nx + i + 1] * 2 + v[(j + 1) * nx + i];
    for (const [s0, s1] of SEG[c] ?? []) { const p = mid(i, j, s0), q = mid(i, j, s1); next.set(key(p[0], p[1]), q); }
  }
  const rings = [], seen = new Set();
  for (const [k0, q0] of next) {
    if (seen.has(k0)) continue;
    const ring = []; let k = k0, q = q0;
    while (q && !seen.has(k)) { seen.add(k); ring.push([+q[0].toFixed(2), +q[1].toFixed(2)]); k = key(q[0], q[1]); q = next.get(k); }
    if (ring.length > 2) rings.push(ring);
  }
  return rings;
}

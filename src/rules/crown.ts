// The great oak's crown over the treehouse (Ed, 2026-10-24: "one great crown sounds good. it should have thicker and thinner
// patches. Perhaps there's also a layer that shows the bark of the tree underneath"; the mock, previews/ed/treehouse-layout-v4/crown/
// on claude/treehouse-trunk-mock): one canopy over the whole house in place of a dome of leaves per room. Where its lobes, limbs and
// string lights are, from the house's plan (config/house/) and a seed, so it follows the rooms wherever they go; no drawing here
// (render/crown.ts draws it, render/strings.ts its lights, render/sky.ts its far landmark).
//
// Every point is on the house's plan: x and z metres from the hub's centre (rules/houseRooms.ts fromPlan turns them into the
// world), y metres over the house's floor (negative below it), so the same crown is laid over the floors indoors and stands in the
// world outside.
import type { HouseConfig, Rect } from "./houseRooms";
import { hash2, rng, vnoise } from "./random";

export type V3 = [number, number, number];
/** A knot of a limb: x, y, z on the plan (y over the floor) and its radius (m). */
export type Knot = [number, number, number, number];
/** One lobe of leaves, a billowing clump: its middle, its radius, how thin it is (0 thick to about 0.5 a gappy spray) and its own
 *  seed (its leaves' speckle and ragged edge). */
export interface Lobe { x: number; y: number; z: number; r: number; thin: number; seed: number }
/** A run of the oak's bark (a Catmull-Rom tube through its knots): the trunk, its roots and great limbs, the house's own limbs under
 *  the floors, each branch room's limb carrying on past it and forking to twigs, the top limbs over the topmost room. */
export interface Limb { kind: "trunk" | "root" | "great" | "house" | "branch" | "fork" | "top"; knots: Knot[] }
/** A string of lights (Ed: "strewn with colourful string lights"): a swag under a limb, a string draped from clump to clump or the
 *  ring round the Terrace's gap, as spans hung between points (`sag` m at the middle); or a garland looped round a clump. Each
 *  switches on running along from its start (its first span's `a`, or the garland's angle `o`). */
export type CrownString =
  | { kind: "swag" | "drape" | "ring"; spans: { a: V3; b: V3; sag: number }[] }
  | { kind: "garland"; x: number; y: number; z: number; r: number; el: number; o: number };

/** What the crown is grown from: the house's plan, the Terrace (the hub's disc and the balcony's, on the plan), the floor's height
 *  over the ground and a seed. */
export interface CrownInput { house: HouseConfig; hub: number; balcony: { x: number; z: number; r: number }; floor: number; seed: number }

export interface Crown {
  lobes: Lobe[]; limbs: Limb[]; strings: CrownString[];
  /** The crown's dome on the plan: its middle and half-widths (its ragged edge lies about there). */
  dome: { cx: number; cz: number; rx: number; rz: number; base: number; top: number };
  /** The Terrace on the plan (the hub's disc and the balcony's) and the way she takes off from it (a unit vector on the plan). */
  terrace: { x: number; z: number; r: number }[]; takeoff: [number, number];
  /** The floor's height over the ground (m). */
  floor: number;
}

/** How the north-facing camera looks down at the Terrace from outside (degrees: the treetops' angleIn to angleOut and the landing): a
 *  clump on any of these lines of sight down to it would hide it (Ed, 2026-10-24: "the terrace should be very visible all the time"). */
export const SIGHT_PITCHES = [30, 40, 50];

const DEG = Math.PI / 180;

/** The Terrace's notch (Ed, 2026-10-24: "perhaps terrace crown gap should be a cutout extending from the terrace to the edge of the
 *  crown, not just a hole"): how far (x, z) on the plan is from the open ground over the Terrace and the channel running from it out
 *  to the crown's edge the way she takes off (negative inside). `width` the channel's half-width. */
export function notchDistance(c: Pick<Crown, "terrace" | "takeoff">, x: number, z: number, width: number): number {
  let d = Infinity;
  for (const t of c.terrace) d = Math.min(d, Math.hypot(x - t.x, z - t.z) - t.r);
  const o = c.terrace[c.terrace.length - 1], [tx, tz] = c.takeoff, along = (x - o.x) * tx + (z - o.z) * tz;
  if (along > 0) d = Math.min(d, Math.abs((x - o.x) * tz - (z - o.z) * tx) - width);
  return d;
}
/** The channel's half-width: as wide as the Terrace's widest disc, so the clearing reads as one open way out to the crown's edge. */
export const notchWidth = (c: Pick<Crown, "terrace">): number => Math.max(...c.terrace.map(t => t.r)) + 2;

/** How clear a point over the plan (y over the floor) keeps the Terrace: the least, over the camera's lines of sight, of how far the
 *  floor it hides is from the notch (negative: it would hide the Terrace or its way out). */
export function sightClearance(c: Pick<Crown, "terrace" | "takeoff">, x: number, y: number, z: number): number {
  const w = notchWidth(c);
  let m = notchDistance(c, x, z, w);
  for (const p of SIGHT_PITCHES) m = Math.min(m, notchDistance(c, x, z - Math.max(0, y) / Math.tan(p * DEG), w)); // (slid back down the line of sight to the floor: further north)
  return m;
}

/** The house's floor shapes (rooms and branches) and its bounds on the plan. */
function bounds(H: HouseConfig, terrace: { x: number; z: number; r: number }[]) {
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const r of [...H.rooms, ...H.corridors] as Rect[]) { x0 = Math.min(x0, r.x0); x1 = Math.max(x1, r.x1); z0 = Math.min(z0, r.z0); z1 = Math.max(z1, r.z1); }
  for (const t of terrace) { x0 = Math.min(x0, t.x - t.r); x1 = Math.max(x1, t.x + t.r); z0 = Math.min(z0, t.z - t.r); z1 = Math.max(z1, t.z + t.r); }
  return { x0, x1, z0, z1 };
}
const mid = (r: Rect): [number, number] => [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];

/** The great oak's crown for a house. The same house and seed always grow the same crown. */
export function makeCrown({ house: H, hub, balcony, floor, seed }: CrownInput): Crown {
  const R = rng(seed * 7919 + 4111), U = (a: number, b: number) => a + (b - a) * R();
  const terrace = [{ x: 0, z: 0, r: hub }, { x: balcony.x, z: balcony.z, r: balcony.r }];
  const bl = Math.hypot(balcony.x, balcony.z), takeoff: [number, number] = bl > 1e-6 ? [balcony.x / bl, balcony.z / bl] : [0, 1];
  const shape = { terrace, takeoff };
  const B = bounds(H, terrace), margin = 26;
  const dome = { cx: (B.x0 + B.x1) / 2, cz: (B.z0 + B.z1) / 2, rx: (B.x1 - B.x0) / 2 + margin, rz: (B.z1 - B.z0) / 2 + margin, base: 14, top: 0 };
  const size = Math.max(dome.rx, dome.rz), RY = size * 0.45, K = size / 92; // (K: the mock's lobes, for its 185 m crown, scaled to this one)
  dome.top = dome.base + RY;
  const lobes: Lobe[] = [], limbs: Limb[] = [], strings: CrownString[] = [];
  const clear = (x: number, y: number, z: number, r: number) => sightClearance(shape, x, y, z) > r * 0.8;

  // ---- the bark: the trunk under the hub, its roots on the ground, its great limbs up into the crown ----
  const g = -floor; // the ground, on the plan's heights
  limbs.push({ kind: "trunk", knots: [[0, g - 2, 0, 9], [0, g + floor * 0.4, 0, 7], [0.8, g + floor * 0.75, -0.8, 6], [0, -4, 0, 5.5]] });
  for (let i = 0; i < 5; i++) { // five roots flaring out under it, with a smaller one off each
    const a = (i / 5) * Math.PI * 2 + 0.35 + U(-0.2, 0.2), c = Math.cos(a), s = Math.sin(a), L = U(18, 26);
    limbs.push({ kind: "root", knots: [[c * 4, g + 5, s * 4, 4.2], [c * L * 0.45, g + 1.5, s * L * 0.45, 3], [c * L, g - 0.5, s * L, 1.4], [c * (L + 6), g - 1, s * (L + 6), 0.6]] });
    const b = a + U(-0.7, 0.7);
    limbs.push({ kind: "root", knots: [[c * L * 0.45, g + 1, s * L * 0.45, 1.6], [c * L * 0.45 + Math.cos(b) * 9, g - 0.5, s * L * 0.45 + Math.sin(b) * 9, 0.5]] });
  }
  const shell = (th: number, f: number): [number, number] => [dome.cx + dome.rx * f * Math.cos(th), dome.cz + dome.rz * f * Math.sin(th)];
  const ends: V3[] = []; // (each fork's end, under a clump)
  for (let i = 0; i < 6; i++) { // the great limbs: up in a V from the low split, out nearly level, dipping and rising, forking towards the edge
    const th = (i / 6) * Math.PI * 2 + 0.5 + U(-0.25, 0.25), [ex, ez] = shell(th, 0.92), [mx, mz] = shell(th, 0.55), [qx, qz] = shell(th, 0.25);
    const k: Knot[] = [[0, -6, 0, 5.2], [qx * 0.6, U(4, 9), qz * 0.6, 4.2], [mx, U(8, 14), mz, 3.2], [ex, U(12, 18), ez, 1.6]];
    limbs.push({ kind: "great", knots: k });
    for (let j = 1; j < k.length - 1; j++) for (let f = 0; f < 2; f++) {
      const [x, y, z, r] = k[j], out = Math.atan2(z - dome.cz, x - dome.cx) + U(-0.9, 0.9), len = U(14, 24) * K * 1.3, up = U(6, 18);
      const e: V3 = [x + Math.cos(out) * len, y + up, z + Math.sin(out) * len];
      limbs.push({ kind: "fork", knots: [[x, y, z, r * 0.55], [(x + e[0]) / 2 + U(-3, 3), y + up * 0.45, (z + e[2]) / 2 + U(-3, 3), r * 0.35], [e[0], e[1], e[2], 0.4]] });
      ends.push(e);
    }
  }
  // the house's own limbs: each branch under its walk, the rooms riding on them, the bark showing below their floors
  for (const c of H.corridors) {
    const p = c.pts ?? [[c.x0, (c.z0 + c.z1) / 2], [c.x1, (c.z0 + c.z1) / 2]], w = c.w ?? 3, n = p.length - 1;
    limbs.push({ kind: "house", knots: [p[0], p[Math.floor(n / 2)], p[n]].map(([x, z], i) => [x, -2.6 - w * 0.4 + (i === 1 ? -0.4 : 0), z, w * 0.55] as Knot) });
  }
  // revision 4 (Ed, 2026-10-24: "The branch rooms themselves are not the ends of the branches"): each room's limb carries on past it
  // as bark, the way its branch was heading, rising a little, forking twice into smaller branches and twigs out to the crown's edge;
  // a second, smaller twig leaves it a little way out
  const way = (r: Rect): [number, number] => {
    const [cx, cz] = mid(r);
    let best: [number, number] | null = null, bd = Infinity;
    for (const c of H.corridors) { const p = c.pts; if (!p || p.length < 2) continue;
      for (const [a, b] of [[p[p.length - 2], p[p.length - 1]], [p[1], p[0]]] as [number, number][][]) { const d = Math.hypot(b[0] - cx, b[1] - cz); if (d < bd) { bd = d; best = [b[0] - a[0], b[1] - a[1]]; } } }
    const v = best && bd < (r.r ?? 8) + 4 ? best : [cx, cz], L = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / L, v[1] / L];
  };
  for (const r of H.rooms) {
    const [cx, cz] = mid(r), [ux, uz] = way(r), rr = r.r ?? Math.max(r.x1 - r.x0, r.z1 - r.z0) / 2;
    const L = rr + U(10, 18), bend = U(-0.35, 0.35), dir = (a: number): [number, number] => [ux * Math.cos(a) - uz * Math.sin(a), ux * Math.sin(a) + uz * Math.cos(a)];
    const [dx, dz] = dir(bend), e: V3 = [cx + dx * L, U(4, 9), cz + dz * L], m: V3 = [cx + ux * L * 0.5, 0.5, cz + uz * L * 0.5];
    limbs.push({ kind: "branch", knots: [[cx, -3, cz, 1.9], [m[0], m[1], m[2], 1.3], [e[0], e[1], e[2], 0.8]] });
    for (const at of [m, e]) for (const s of [-1, 1]) { // forking twice: smaller branches, then twigs
      const [fx, fz] = dir(bend + s * U(0.45, 0.8)), len = U(8, 14), f: V3 = [at[0] + fx * len, at[1] + U(3, 8), at[2] + fz * len];
      limbs.push({ kind: "fork", knots: [[at[0], at[1], at[2], at === m ? 0.9 : 0.6], [(at[0] + f[0]) / 2, (at[1] + f[1]) / 2 + 0.6, (at[2] + f[2]) / 2, 0.5], [f[0], f[1], f[2], 0.25]] });
      ends.push(f);
    }
    const [tx, tz] = dir(bend + (R() < 0.5 ? -1 : 1) * 1.1), t0: V3 = [cx + ux * (rr + 2), -1, cz + uz * (rr + 2)];
    limbs.push({ kind: "fork", knots: [[t0[0], t0[1], t0[2], 0.7], [t0[0] + tx * 7, t0[1] + 4, t0[2] + tz * 7, 0.3]] });
  }
  // the top: over the topmost room (the furthest north), three limbs up into the crown, each forking once
  const top = [...H.rooms].sort((a, b) => mid(a)[1] - mid(b)[1])[0];
  if (top) { const [cx, cz] = mid(top);
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i - 1) * 0.9 + U(-0.2, 0.2), e: V3 = [cx + Math.cos(a) * U(12, 18), U(18, 26), cz + Math.sin(a) * U(10, 16)];
      limbs.push({ kind: "top", knots: [[cx, -2, cz, 2.6], [(cx + e[0]) / 2, e[1] * 0.45, (cz + e[2]) / 2, 1.8], [e[0], e[1], e[2], 1]] });
      const b = a + U(-0.8, 0.8), f: V3 = [e[0] + Math.cos(b) * 9, e[1] + U(4, 9), e[2] + Math.sin(b) * 8];
      limbs.push({ kind: "fork", knots: [[e[0], e[1], e[2], 0.9], [f[0], f[1], f[2], 0.3]] }); ends.push(f);
    }
  }
  // (none across the Terrace's notch: a limb whose knot would stand on its line of sight ducks under the floor there)
  for (const l of limbs) if (l.kind !== "root" && l.kind !== "trunk") for (const k of l.knots) if (k[1] > -k[3] && sightClearance(shape, k[0], k[1], k[2]) < k[3] * 1.25 + 1) k[1] = -k[3] - 1;

  // ---- the leaves: billowing lobes on a broad low dome (2:1), its outer ends sagging, its inner, lower crown left open ----
  for (let n = 0; n < 380; n++) {
    const th = U(0, Math.PI * 2), ph = (Math.asin(R()) * 1.4) / (Math.PI / 2), sh = U(0.8, 1.02), sag = 12 * Math.pow(Math.cos(ph), 6);
    const x = dome.cx + dome.rx * Math.cos(ph) * Math.cos(th) * sh, z = dome.cz + dome.rz * Math.cos(ph) * Math.sin(th) * sh, y = dome.base + RY * Math.sin(ph) * sh - sag;
    const r = U(9, 14) * K * (1 - 0.3 * (1 - ph / 1.4) * Math.cos(ph)) * (ph > 0.9 ? 1.25 : 1);
    if (!clear(x, y, z, r + U(0, 4) * K)) continue; // the Terrace and its way out: open to the sky
    const dn = vnoise(th * 1.6 + 3, ph * 2.6 + 1, seed + 17); if (dn < 0.3 && ph < 1.1) continue; // the gaps between the clumps
    lobes.push({ x, y, z, r, thin: dn < 0.45 ? 0.5 : 0, seed: Math.floor(R() * 1e6) });
    if (ph < 0.55 && R() < 0.45) { // a spray sticking out of the edge
      const a = th + U(-0.5, 0.5), q: V3 = [x + Math.cos(a) * (r + U(1, 5) * K), y - U(0, 7), z + Math.sin(a) * (r + U(1, 5) * K)], qr = U(2, 3.5) * K * 1.2;
      if (clear(q[0], q[1], q[2], qr)) lobes.push({ x: q[0], y: q[1], z: q[2], r: qr, thin: 0.3, seed: Math.floor(R() * 1e6) });
    }
  }
  for (const e of ends) { const r = U(4, 7) * K * 1.3; if (clear(e[0], e[1] + 2, e[2], r)) lobes.push({ x: e[0], y: e[1] + 2, z: e[2], r, thin: 0.35, seed: Math.floor(R() * 1e6) }); } // a clump at each fork's end

  // ---- the string lights: swags under the limbs, strings draped from clump to clump over the top, garlands round the clumps, a ring
  // round the Terrace's gap ----
  for (const l of limbs) {
    if (l.kind === "root" || l.kind === "trunk" || l.knots[0][3] < 0.7) continue;
    const pts: V3[] = []; let acc = 0;
    for (let i = 1; i < l.knots.length; i++) {
      const a = l.knots[i - 1], b = l.knots[i], L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      for (let d = i === 1 ? 0 : 8 - acc; d < L; d += 8) { const u = d / L, r = a[3] + (b[3] - a[3]) * u; pts.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - r * 0.95, a[2] + (b[2] - a[2]) * u]); }
      acc = (acc + L) % 8;
    }
    if (pts.length > 1) strings.push({ kind: "swag", spans: pts.slice(1).map((b, i) => ({ a: pts[i], b, sag: 1.4 })) });
  }
  const tops = lobes.filter(q => q.r >= 7.5 * K && q.y > dome.base - 4), seen = new Set<string>();
  for (const a of tops) {
    let best: Lobe | null = null, bd = Infinity;
    for (const b of tops) { const d = Math.hypot(b.x - a.x, b.z - a.z); if (b !== a && d > 12 * K && d < bd) { bd = d; best = b; } }
    if (!best || bd > 34 * K) continue;
    const key = [lobes.indexOf(a), lobes.indexOf(best)].sort().join();
    if (seen.has(key)) continue; seen.add(key);
    const dx = (best.x - a.x) / bd, dz = (best.z - a.z) / bd;
    strings.push({ kind: "drape", spans: [{ a: [a.x + dx * a.r * 0.55, a.y + a.r * 0.9, a.z + dz * a.r * 0.55], b: [best.x - dx * best.r * 0.55, best.y + best.r * 0.9, best.z - dz * best.r * 0.55], sag: 1.5 }] });
  }
  for (const a of tops) if (hash2(a.seed, 3, seed) < 0.45) strings.push({ kind: "garland", x: a.x, y: a.y, z: a.z, r: a.r * 1.02, el: 0.25 + 0.45 * hash2(a.seed, 5, seed), o: hash2(a.seed, 7, seed) * Math.PI * 2 });
  { const o = terrace[0], rr = Math.max(hub, Math.hypot(balcony.x, balcony.z) + balcony.r) + 9, pts: V3[] = [];
    for (let i = 0; i <= 12; i++) { const a = (i / 12) * Math.PI * 2; pts.push([o.x + Math.cos(a) * rr, 14 + 3 * Math.sin(a * 3), o.z + Math.sin(a) * rr]); }
    strings.push({ kind: "ring", spans: pts.slice(1).map((b, i) => ({ a: pts[i], b, sag: 2.2 })) }); }

  return { lobes, limbs, strings, dome, terrace, takeoff, floor };
}

/** A bulb of the crown's lights: where (on the plan, y over the floor), its colour's place in the palette, how far along its string
 *  (0 its start to 1 its end: it switches on and off in that order), its string and its own phase (its twinkle). */
export interface Bulb { x: number; y: number; z: number; colour: number; u: number; string: number; phase: number }

/** Every bulb of the crown's strings, `spacing` metres apart along them (the clearings' stringLights.bulbSpacing). */
export function crownBulbs(c: Crown, spacing: number, seed = 0): Bulb[] {
  const out: Bulb[] = [];
  c.strings.forEach((s, si) => {
    const o = Math.floor(hash2(si, 11, seed) * 6), push = (x: number, y: number, z: number, i: number, u: number) => out.push({ x, y, z, colour: (i + o) % 6, u, string: si, phase: hash2(si * 977 + i, 13, seed) });
    if (s.kind === "garland") {
      const n = Math.max(6, Math.round((2 * Math.PI * s.r * Math.cos(s.el)) / spacing));
      for (let i = 0; i < n; i++) { const th = s.o + (i / n) * Math.PI * 2, w = s.el + 0.12 * Math.sin(th * 3); push(s.x + s.r * Math.cos(w) * Math.cos(th), s.y + s.r * Math.sin(w), s.z + s.r * Math.cos(w) * Math.sin(th), i, i / n); }
      return;
    }
    const lens = s.spans.map(p => Math.hypot(p.b[0] - p.a[0], p.b[1] - p.a[1], p.b[2] - p.a[2])), total = lens.reduce((a, b) => a + b, 0) || 1;
    let at = 0, i = 0;
    s.spans.forEach((p, k) => {
      const n = Math.max(1, Math.round(lens[k] / spacing));
      for (let j = k === 0 ? 0 : 1; j <= n; j++) { const u = j / n; push(p.a[0] + (p.b[0] - p.a[0]) * u, p.a[1] + (p.b[1] - p.a[1]) * u - p.sag * 4 * u * (1 - u), p.a[2] + (p.b[2] - p.a[2]) * u, i++, (at + lens[k] * u) / total); }
      at += lens[k];
    });
  });
  return out;
}

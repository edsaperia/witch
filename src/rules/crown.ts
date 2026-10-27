// The great oak's crown over the treehouse (Ed, 2026-10-24: "one great crown sounds good. it should have thicker and thinner
// patches. Perhaps there's also a layer that shows the bark of the tree underneath"; the mock, previews/ed/treehouse-layout-v4/crown/
// on claude/treehouse-trunk-mock): one canopy over the whole house in place of a dome of leaves per room. Where its lobes, limbs and
// string lights are, from the house's outline (config/house/outline.json, traced from its shape by tools/house/organic.mjs --outline) and a seed, so it
// follows the rooms wherever they go; no drawing here
// (render/crown.ts draws it, render/strings.ts its lights, render/sky.ts its far landmark).
//
// Every point is on the house's plan: x and z metres from the Terrace's middle (rules/houseRooms.ts fromPlan turns them into the
// world), y metres over the house's floor (negative below it), so the same crown is laid over the floors indoors and stands in the
// world outside.
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
/** A string of lights (Ed: "strewn with colourful string lights"): a swag under a limb, a string draped from clump to clump, a tail
 *  hanging down off a limb, a spiral wound round one or the ring round the Terrace's gap, as spans hung between points (`sag` m at the
 *  middle); or a garland looped round a clump, part way or all round, tilted, wavering (garlandPoint). Each its own bulb spacing
 *  (`space`, times the clearings' bulbSpacing; Ed, 2026-10-27: "String lights on the treehouse seem to all have the same shape"), and
 *  each switches on running along from its start (its first span's `a`, or the garland's angle `o`). */
export type CrownString =
  | { kind: "swag" | "drape" | "ring" | "tail" | "spiral"; spans: { a: V3; b: V3; sag: number }[]; space?: number }
  | { kind: "garland"; x: number; y: number; z: number; r: number; el: number; o: number; /** how far round (1 all the way) */ arc?: number; /** its tilt (radians) and the bearing it dips toward */ tilt?: number; tiltAt?: number; /** its waver: how far (radians) and how many times round */ wob?: number; freq?: number; space?: number };

/** A point `u` (0 to 1) of the way along a garland, from its start angle `o` round its arc. */
export function garlandPoint(s: Extract<CrownString, { kind: "garland" }>, u: number): V3 {
  const th = s.o + u * (s.arc ?? 1) * Math.PI * 2, w = s.el + (s.wob ?? 0.12) * Math.sin(th * (s.freq ?? 3)), c = Math.cos(w);
  return [s.x + s.r * c * Math.cos(th), s.y + s.r * Math.sin(w) + s.r * (s.tilt ?? 0) * Math.cos(th - (s.tiltAt ?? 0)), s.z + s.r * c * Math.sin(th)];
}

/** The house's floor as traced for the crown (config/house/outline.json, written by tools/house/organic.mjs --outline: metres on the
 *  plan, x east, z south, the Terrace's middle 0): each room (its middle, size, its own outline, a trunk room or the trunk room its
 *  branch leaves), each branch's middle line and width, the stubs where each branch room's limb carries on past its floor, and the
 *  Terrace's open rim (its point, its span in degrees round from east, clockwise). */
export interface HouseOutline {
  rooms: { id: string; x: number; z: number; r: number; trunk?: boolean; from?: string; locked?: boolean; outline: [number, number][] }[];
  branches: { id: string; w: number; pts: [number, number][] }[];
  stubs: { room: string; from: [number, number]; to: [number, number]; w0: number; w1: number }[];
  takeoff: { x: number; z: number; from: number; to: number };
}
/** What the crown is grown from: the house's outline, the floor's height over the ground and a seed. */
/** `open`: ground the crown keeps open to the sky as it does the Terrace (the dancefloor and its speakers, on the plan). `gap`
 *  (true unless false): the Terrace's gap and its notch out to the crown's edge, with the ring of lights round them; false, the crown
 *  whole over the Terrace as over every room (Ed, 2026-10-26: "I'd like to try the treehouse canopy not being cut-through while she's
 *  in treehouse mode - this will make it easier for her to land in the treehouse successfully, as the area is bigger"; the tuning's
 *  treehouse.house.crown.gap, a switch on the pause page). */
export interface CrownInput { outline: HouseOutline; floor: number; seed: number; open?: { x: number; z: number; r: number }[]; gap?: boolean }

export interface Crown {
  lobes: Lobe[]; limbs: Limb[]; strings: CrownString[];
  /** The crown's dome on the plan: its middle and half-widths (its ragged edge lies about there). */
  dome: { cx: number; cz: number; rx: number; rz: number; base: number; top: number };
  /** The Terrace on the plan (its disc), where its open rim is (the take-off's point) and the way she takes off from it (a unit
   *  vector on the plan). */
  terrace: { x: number; z: number; r: number }[]; notchFrom: [number, number]; takeoff: [number, number];
  /** The Terrace's own floor outline on the plan (config/house/outline.json): the gap frames all of it, its DJ desk on the rim too. */
  terraceOutline: [number, number][];
  /** Ground kept open as the Terrace is (CrownInput.open). */
  open: { x: number; z: number; r: number }[];
  /** The Terrace's gap and notch kept open (CrownInput.gap): false, the crown's whole over it. */
  gap: boolean;
  /** The floor's height over the ground (m). */
  floor: number;
}

/** How the north-facing camera looks down at the Terrace from outside (degrees: the treetops' angleIn to angleOut and the landing): a
 *  clump on any of these lines of sight down to it would hide it (Ed, 2026-10-24: "the terrace should be very visible all the time"). */
export const SIGHT_PITCHES = [26, 34, 42, 50]; // (26: the ground camera's angleIn, low on the broom near the oak; 2026-10-26)
/** How far past the Terrace's outline the gap opens (m): its rim and her DJ desk on it framed, not cut. */
export const GAP_MARGIN = 3;

const DEG = Math.PI / 180;

/** The Terrace's notch (Ed, 2026-10-24: "perhaps terrace crown gap should be a cutout extending from the terrace to the edge of the
 *  crown, not just a hole"): how far (x, z) on the plan is from the open ground over the Terrace and the channel running from it out
 *  to the crown's edge the way she takes off (negative inside). `width` the channel's half-width. */
export function notchDistance(c: Pick<Crown, "terrace" | "takeoff" | "notchFrom"> & { open?: Crown["open"]; terraceOutline?: Crown["terraceOutline"]; gap?: boolean }, x: number, z: number, width: number): number {
  let d = Infinity;
  if (c.gap === false) { for (const t of c.open ?? []) d = Math.min(d, Math.hypot(x - t.x, z - t.z) - t.r); return d; } // (no gap: only the open ground)
  for (const t of c.terrace) d = Math.min(d, Math.hypot(x - t.x, z - t.z) - t.r);
  // (the Terrace's own outline, GAP_MARGIN past it: Ed, 2026-10-26, the gap "doesn't seem to surround the balcony": its disc, r 12.5,
  // left its floor's bulges, out to 15 m, and the desk on its rim under the leaves)
  if (c.terraceOutline?.length) d = Math.min(d, polySigned(c.terraceOutline, x, z) - GAP_MARGIN);
  for (const t of c.open ?? []) d = Math.min(d, Math.hypot(x - t.x, z - t.z) - t.r);
  const [ox, oz] = c.notchFrom, [tx, tz] = c.takeoff, along = (x - ox) * tx + (z - oz) * tz;
  if (along > -width) d = Math.min(d, Math.abs((x - ox) * tz - (z - oz) * tx) - width);
  return d;
}
/** How far (x, z) is from a closed outline: negative inside it. */
export function polySigned(p: [number, number][], x: number, z: number): number {
  let d = Infinity, inside = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [ax, az] = p[j], [bx, bz] = p[i], dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-9, dx * dx + dz * dz)));
    d = Math.min(d, Math.hypot(x - ax - dx * t, z - az - dz * t));
    if ((az > z) !== (bz > z) && x < (dx * (z - az)) / dz + ax) inside = !inside;
  }
  return inside ? -d : d;
}
/** The channel's half-width: as wide as the Terrace's widest disc, so the clearing reads as one open way out to the crown's edge. */
export const notchWidth = (c: Pick<Crown, "terrace">): number => Math.max(...c.terrace.map(t => t.r)) * 0.6 + 2;

/** How clear a point over the plan (y over the floor) keeps the Terrace: the least, over the camera's lines of sight, of how far the
 *  floor it hides is from the notch (negative: it would hide the Terrace or its way out). Under the floor (y negative), the floor
 *  point in front of it on the line of sight: the house's floors are drawn in a plane of their own, not in front of the bark by
 *  depth, so bark under the Terrace showed over it (Ed, 2026-10-26: "there are branches in front of the balcony"). */
export function sightClearance(c: Pick<Crown, "terrace" | "takeoff" | "notchFrom"> & { open?: Crown["open"]; terraceOutline?: Crown["terraceOutline"]; gap?: boolean }, x: number, y: number, z: number): number {
  const w = notchWidth(c);
  let m = notchDistance(c, x, z, w);
  for (const p of SIGHT_PITCHES) m = Math.min(m, notchDistance(c, x, z - y / Math.tan(p * DEG), w)); // (slid along the line of sight to the floor: back, north, from over it; forward, south, from under it)
  return m;
}

type Shape = Parameters<typeof sightClearance>[0];
/** A limb's tube as the bark draws it (render/crown.ts barkGeometry: a Catmull-Rom through its knots), sampled about every metre:
 *  each point (x, y, z, its radius) and the knot it's nearest. */
export function limbSamples(l: Limb, step = 1): { p: Knot; knot: number }[] {
  const k: Knot[] = [l.knots[0], ...l.knots, l.knots[l.knots.length - 1]], out: { p: Knot; knot: number }[] = [];
  for (let i = 1; i < k.length - 2; i++) {
    const [p0, p1, p2, p3] = [k[i - 1], k[i], k[i + 1], k[i + 2]], L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]), n = Math.max(2, Math.ceil(L / step));
    for (let s = 0; s <= n; s++) {
      const t = s / n, t2 = t * t, t3 = t2 * t, q = [0, 1, 2, 3].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)) as Knot;
      out.push({ p: q, knot: i - 1 + (t < 0.5 ? 0 : 1) });
    }
  }
  return out;
}
/** The knots of a limb whose tube stands on a line of sight to the Terrace's gap, over the floor or under it (within its radius and a metre). */
export function limbOverGap(shape: Shape, l: Limb): number[] {
  const bad = new Set<number>();
  for (const { p: [x, y, z, r], knot } of limbSamples(l)) if (Math.min(sightClearance(shape, x, y + r, z), sightClearance(shape, x, y - r, z)) < r + 1) bad.add(knot);
  return [...bad];
}
/** Whether a string's span (its wire, sagging) keeps off every line of sight to the gap. */
function spanClear(shape: Shape, p: { a: V3; b: V3; sag: number }): boolean {
  for (let i = 0; i <= 10; i++) { const u = i / 10, y = p.a[1] + (p.b[1] - p.a[1]) * u - p.sag * 4 * u * (1 - u);
    if (y > 0 && sightClearance(shape, p.a[0] + (p.b[0] - p.a[0]) * u, y, p.a[2] + (p.b[2] - p.a[2]) * u) < 1) return false; }
  return true;
}

/** The house's bounds on the plan: its rooms and branches. */
function bounds(O: HouseOutline) {
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const r of O.rooms) { x0 = Math.min(x0, r.x - r.r); x1 = Math.max(x1, r.x + r.r); z0 = Math.min(z0, r.z - r.r); z1 = Math.max(z1, r.z + r.r); }
  for (const b of O.branches) for (const [x, z] of b.pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
  return { x0, x1, z0, z1 };
}

/** The great oak's crown for a house. The same house and seed always grow the same crown. */
export function makeCrown({ outline: O, floor, seed, open = [], gap = true }: CrownInput): Crown {
  const R = rng(seed * 7919 + 4111), U = (a: number, b: number) => a + (b - a) * R();
  const T = O.rooms.find(r => r.id === "terrace") ?? { x: 0, z: 0, r: 10, outline: [] as [number, number][] }, terrace = [{ x: T.x, z: T.z, r: T.r }], terraceOutline = T.outline;
  const ta = ((O.takeoff.from + O.takeoff.to) / 2) * DEG, takeoff: [number, number] = [Math.cos(ta), Math.sin(ta)], notchFrom: [number, number] = [O.takeoff.x, O.takeoff.z];
  const shape = { terrace, takeoff, notchFrom, open, terraceOutline, gap };
  const B = bounds(O), margin = 26;
  const dome = { cx: (B.x0 + B.x1) / 2, cz: (B.z0 + B.z1) / 2, rx: (B.x1 - B.x0) / 2 + margin, rz: (B.z1 - B.z0) / 2 + margin, base: 14, top: 0 };
  const size = Math.max(dome.rx, dome.rz), RY = size * 0.45, K = size / 92; // (K: the mock's lobes, for its 185 m crown, scaled to this one)
  dome.top = dome.base + RY;
  const lobes: Lobe[] = [], limbs: Limb[] = [], strings: CrownString[] = [];
  const clear = (x: number, y: number, z: number, r: number) => sightClearance(shape, x, y, z) > r + 1; // (its whole disc: the octagon's edge reaches r)
  const trunkRooms = O.rooms.filter(r => r.trunk).sort((a, b) => b.z - a.z), base = trunkRooms[0] ?? T; // (the trunk's foot: under its lowest room, the furthest south)

  // ---- the bark: the trunk under its lowest room, its roots on the ground, its great limbs up into the crown ----
  const g = -floor, bx = base.x, bz = base.z; // the ground, on the plan's heights
  limbs.push({ kind: "trunk", knots: [[bx, g - 2, bz, 11], [bx, g + floor * 0.4, bz, 8.5], [bx + 0.8, g + floor * 0.75, bz - 0.8, 7.5], [bx, -4, bz, 7]] });
  for (let i = 0; i < 5; i++) { // five roots flaring out under it, with a smaller one off each
    const a = (i / 5) * Math.PI * 2 + 0.35 + U(-0.2, 0.2), c = Math.cos(a), s = Math.sin(a), L = U(20, 28);
    limbs.push({ kind: "root", knots: [[bx + c * 5, g + 5, bz + s * 5, 4.6], [bx + c * L * 0.45, g + 1.5, bz + s * L * 0.45, 3.2], [bx + c * L, g - 0.5, bz + s * L, 1.5], [bx + c * (L + 6), g - 1, bz + s * (L + 6), 0.6]] });
    const b2 = a + U(-0.7, 0.7);
    limbs.push({ kind: "root", knots: [[bx + c * L * 0.45, g + 1, bz + s * L * 0.45, 1.6], [bx + c * L * 0.45 + Math.cos(b2) * 9, g - 0.5, bz + s * L * 0.45 + Math.sin(b2) * 9, 0.5]] });
  }
  const shell = (th: number, f: number): [number, number] => [dome.cx + dome.rx * f * Math.cos(th), dome.cz + dome.rz * f * Math.sin(th)];
  const ends: V3[] = []; // (each fork's end, under a clump)
  for (let i = 0; i < 6; i++) { // the great limbs: up in a V from the low split, out nearly level, dipping and rising, forking towards the edge
    const th = (i / 6) * Math.PI * 2 + 0.5 + U(-0.25, 0.25), [ex, ez] = shell(th, 0.92), [mx, mz] = shell(th, 0.55);
    const k: Knot[] = [[bx, -6, bz, 5.6], [(bx + mx) / 2, U(4, 9), (bz + mz) / 2, 4.4], [mx, U(8, 14), mz, 3.3], [ex, U(12, 18), ez, 1.7]];
    limbs.push({ kind: "great", knots: k });
    for (let j = 1; j < k.length - 1; j++) for (let f = 0; f < 2; f++) {
      const [x, y, z, r] = k[j], out = Math.atan2(z - dome.cz, x - dome.cx) + U(-0.9, 0.9), len = U(14, 24) * K * 1.3, up = U(6, 18);
      const e: V3 = [x + Math.cos(out) * len, y + up, z + Math.sin(out) * len];
      limbs.push({ kind: "fork", knots: [[x, y, z, r * 0.55], [(x + e[0]) / 2 + U(-3, 3), y + up * 0.45, (z + e[2]) / 2 + U(-3, 3), r * 0.35], [e[0], e[1], e[2], 0.4]] });
      ends.push(e);
    }
  }
  // the house's own limbs: each branch under its walk, the rooms riding on them, the bark showing below their floors
  for (const c of O.branches) {
    const p = c.pts, n = p.length - 1, r = Math.min(5, c.w * 0.3);
    limbs.push({ kind: "house", knots: [p[0], p[Math.floor(n / 2)], p[n]].map(([x, z], i) => [x, -2.5 - r + (i === 1 ? -0.5 : 0), z, r] as Knot) });
  }
  // revision 4 (Ed, 2026-10-24: "The branch rooms themselves are not the ends of the branches"): each branch room's limb carries on
  // past it as bark from its stub (the way its branch was heading), rising a little, forking twice into smaller branches and twigs
  // out to the crown's edge; a second, smaller twig leaves it a little way out
  for (const st of O.stubs) {
    const [fx, fz] = st.from, [sx, sz] = st.to, L0 = Math.hypot(sx - fx, sz - fz) || 1, ux = (sx - fx) / L0, uz = (sz - fz) / L0;
    const L = U(10, 18), bend = U(-0.35, 0.35), dir = (a: number): [number, number] => [ux * Math.cos(a) - uz * Math.sin(a), ux * Math.sin(a) + uz * Math.cos(a)];
    const [dx, dz] = dir(bend), e: V3 = [sx + dx * L, U(4, 9), sz + dz * L], m: V3 = [sx + ux * L * 0.5, 0.5, sz + uz * L * 0.5];
    limbs.push({ kind: "branch", knots: [[fx, -3, fz, Math.max(1.2, st.w0 * 0.6)], [sx, -1.5, sz, Math.max(0.9, st.w1 * 0.8)], [m[0], m[1], m[2], 0.9], [e[0], e[1], e[2], 0.6]] });
    for (const at of [m, e]) for (const sg of [-1, 1]) { // forking twice: smaller branches, then twigs
      const [gx, gz] = dir(bend + sg * U(0.45, 0.8)), len = U(8, 14), f: V3 = [at[0] + gx * len, at[1] + U(3, 8), at[2] + gz * len];
      limbs.push({ kind: "fork", knots: [[at[0], at[1], at[2], at === m ? 0.75 : 0.5], [(at[0] + f[0]) / 2, (at[1] + f[1]) / 2 + 0.6, (at[2] + f[2]) / 2, 0.4], [f[0], f[1], f[2], 0.22]] });
      ends.push(f);
    }
    const [tx, tz] = dir(bend + (R() < 0.5 ? -1 : 1) * 1.1);
    limbs.push({ kind: "fork", knots: [[sx, -1, sz, 0.6], [sx + tx * 7, 3, sz + tz * 7, 0.25]] });
  }
  // the top: over the topmost room (the furthest north), three limbs up into the crown, each forking once
  const top = trunkRooms[trunkRooms.length - 1]; // (the trunk's topmost room, the furthest north: the Turret)
  if (top) { const cx = top.x, cz = top.z;
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i - 1) * 0.9 + U(-0.2, 0.2), e: V3 = [cx + Math.cos(a) * U(12, 18), U(18, 26), cz + Math.sin(a) * U(10, 16)];
      limbs.push({ kind: "top", knots: [[cx, -2, cz, 2.6], [(cx + e[0]) / 2, e[1] * 0.45, (cz + e[2]) / 2, 1.8], [e[0], e[1], e[2], 1]] });
      const b = a + U(-0.8, 0.8), f: V3 = [e[0] + Math.cos(b) * 9, e[1] + U(4, 9), e[2] + Math.sin(b) * 8];
      limbs.push({ kind: "fork", knots: [[e[0], e[1], e[2], 0.9], [f[0], f[1], f[2], 0.3]] }); ends.push(f);
    }
  }
  // (none across the Terrace's notch: a limb whose tube, anywhere along it, would stand on a line of sight to it ducks under the floor
  // there, knot by knot; one that still would after that is left out. Ed, 2026-10-26: "there are branches in front of the balcony":
  // only the knots were tested, and the tube bowed up between them over the Terrace)
  for (let i = limbs.length - 1; i >= 0; i--) {
    const l = limbs[i]; if (l.kind === "root" || l.kind === "trunk") continue;
    for (let round = 0; round < 8; round++) {
      const bad = limbOverGap(shape, l); if (!bad.length) break;
      for (const j of bad) { const k = l.knots[j]; k[1] = Math.min(k[1], -k[3] - 1.5 - round * 2); }
    }
    if (limbOverGap(shape, l).length) limbs.splice(i, 1);
  }

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

  // ---- the string lights, each hung its own way (Ed, 2026-10-27: "String lights on the treehouse seem to all have the same shape"):
  // swags under the limbs, their sag and steps each their own, some with tails hanging down; a few spirals wound round the big limbs;
  // strings draped from clump to clump, near and short or long across a gap; garlands round clumps, part way or all round, tilted and
  // wavering; a ring round the Terrace's gap. Each its own bulb spacing.
  const H = (i: number, k: number) => hash2(i, k, seed), space = (i: number, k: number) => 0.75 + 0.6 * H(i, k);
  limbs.forEach((l, li) => {
    if (l.kind === "root" || l.kind === "trunk" || l.knots[0][3] < 0.7) return;
    const step = 6 + 5 * H(li, 21), sag = 0.6 + 1.8 * H(li, 22), pts: V3[] = []; let acc = 0;
    for (let i = 1; i < l.knots.length; i++) {
      const a = l.knots[i - 1], b = l.knots[i], L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      for (let d = i === 1 ? 0 : step - acc; d < L; d += step) { const u = d / L, r = a[3] + (b[3] - a[3]) * u; pts.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - r * 0.95, a[2] + (b[2] - a[2]) * u]); }
      acc = (acc + L) % step;
    }
    // (a share of the limbs' swags only part way along, so not every limb's lit end to end)
    const from = H(li, 23) < 0.35 ? Math.floor(pts.length * 0.4 * H(li, 24)) : 0, to = H(li, 25) < 0.35 ? Math.ceil(pts.length * (0.6 + 0.4 * H(li, 26))) : pts.length;
    const run = pts.slice(from, to);
    if (run.length > 1) strings.push({ kind: "swag", spans: run.slice(1).map((b, i) => ({ a: run[i], b, sag: sag * (0.8 + 0.4 * H(li * 31 + i, 27)) })), space: space(li, 28) });
    // tails: a strand let hang off a point of the swag, 2 to 7 m, swinging a little out
    for (let t = 0; t < run.length; t++) if (H(li * 53 + t, 29) < 0.12) { const p = run[t], L = 2 + 5 * H(li * 53 + t, 30), ang = H(li * 53 + t, 31) * Math.PI * 2;
      strings.push({ kind: "tail", spans: [{ a: p, b: [p[0] + Math.cos(ang) * 0.8, p[1] - L, p[2] + Math.sin(ang) * 0.8], sag: 0.15 }], space: space(li * 53 + t, 32) }); }
    // spirals: wound round a big limb, a turn every 3 to 6 m, 1.1 to 1.3 of its radius out
    if ((l.kind === "great" || l.kind === "branch" || l.kind === "top") && H(li, 33) < 0.3) {
      const pitch = 3 + 3 * H(li, 34), out = 1.1 + 0.2 * H(li, 35), ph = H(li, 36) * Math.PI * 2, sp: V3[] = [];
      const S = limbSamples(l, 0.5);
      S.forEach(({ p: [x, y, z, r] }, n) => { // (a sample every half metre along it, wound round it in a frame across its own heading)
        const q = S[Math.min(S.length - 1, n + 1)].p, o = S[Math.max(0, n - 1)].p, tl = Math.hypot(q[0] - o[0], q[1] - o[1], q[2] - o[2]) || 1, T = [(q[0] - o[0]) / tl, (q[1] - o[1]) / tl, (q[2] - o[2]) / tl];
        let ax = [-T[2], 0, T[0]], al = Math.hypot(ax[0], ax[2]); if (al < 1e-3) { ax = [1, 0, 0]; al = 1; } ax = [ax[0] / al, 0, ax[2] / al];
        const up = [T[1] * ax[2] - T[2] * ax[1], T[2] * ax[0] - T[0] * ax[2], T[0] * ax[1] - T[1] * ax[0]], th = ph + ((n * 0.5) / pitch) * Math.PI * 2, c = Math.cos(th) * r * out, si = Math.sin(th) * r * out;
        sp.push([x + ax[0] * c + up[0] * si, y + ax[1] * c + up[1] * si, z + ax[2] * c + up[2] * si]);
      });
      const k0 = Math.floor(sp.length * 0.5 * H(li, 37)), seg = sp.slice(k0, k0 + Math.max(8, Math.floor(sp.length * (0.3 + 0.4 * H(li, 38)))));
      if (seg.length > 1) strings.push({ kind: "spiral", spans: seg.slice(1).map((b, i) => ({ a: seg[i], b, sag: 0 })), space: space(li, 39) });
    }
  });
  const tops = lobes.filter(q => q.r >= 7.5 * K && q.y > dome.base - 4), seen = new Set<string>();
  tops.forEach((a, ai) => {
    // (most to the nearest clump past 12 m; now and then a long one across a gap, to a clump 30 to 55 m off)
    const long = H(ai, 41) < 0.18, near = long ? 30 * K : 12 * K, far = long ? 55 * K : 34 * K;
    let best: Lobe | null = null, bd = Infinity;
    for (const b of tops) { const d = Math.hypot(b.x - a.x, b.z - a.z); if (b !== a && d > near && d < bd) { bd = d; best = b; } }
    if (!best || bd > far) return;
    const key = [lobes.indexOf(a), lobes.indexOf(best)].sort().join();
    if (seen.has(key)) return; seen.add(key);
    const dx = (best.x - a.x) / bd, dz = (best.z - a.z) / bd, ha = 0.5 + 0.5 * H(ai, 42), hb = 0.5 + 0.5 * H(ai, 43);
    strings.push({ kind: "drape", spans: [{ a: [a.x + dx * a.r * 0.55, a.y + a.r * ha, a.z + dz * a.r * 0.55], b: [best.x - dx * best.r * 0.55, best.y + best.r * hb, best.z - dz * best.r * 0.55], sag: (long ? 2.5 : 0.8) + (long ? 3 : 2) * H(ai, 44) }], space: space(ai, 45) });
  });
  for (const a of tops) if (hash2(a.seed, 3, seed) < 0.45) {
    const h = (k: number) => hash2(a.seed, k, seed);
    strings.push({ kind: "garland", x: a.x, y: a.y, z: a.z, r: a.r * (0.9 + 0.2 * h(8)), el: 0.1 + 0.6 * h(5), o: h(7) * Math.PI * 2,
      arc: h(9) < 0.4 ? 1 : 0.35 + 0.5 * h(10), tilt: 0.35 * h(11), tiltAt: h(12) * Math.PI * 2, wob: 0.04 + 0.22 * h(13), freq: 2 + Math.floor(4 * h(14)), space: 0.75 + 0.6 * h(15) });
  }
  if (gap) { const o = terrace[0], rr = o.r + 9, pts: V3[] = [];
    for (let i = 0; i <= 12; i++) { const a = (i / 12) * Math.PI * 2, y = 14 + 3 * Math.sin(a * 3); let d = rr; // (out past every line of sight down to the gap)
      while (d < rr + 80 && sightClearance(shape, o.x + Math.cos(a) * d, y, o.z + Math.sin(a) * d) < 1.5) d += 1;
      pts.push([o.x + Math.cos(a) * d, y, o.z + Math.sin(a) * d]); }
    strings.push({ kind: "ring", spans: pts.slice(1).map((b, i) => ({ a: pts[i], b, sag: 2.2 })) }); }

  // (no string across the gap either: a span whose wire would hang on a line of sight to the Terrace is left out)
  for (const s of strings) if (s.kind !== "garland") s.spans = s.spans.filter(p => spanClear(shape, p));
  const kept = strings.filter(s => s.kind === "garland" || s.spans.length);
  return { lobes, limbs, strings: kept, dome, terrace, terraceOutline, notchFrom, takeoff, open, gap, floor };
}

/** A bulb of the crown's lights: where (on the plan, y over the floor), its colour's place in the palette, how far along its string
 *  (0 its start to 1 its end: it switches on and off in that order), its string and its own phase (its twinkle). */
export interface Bulb { x: number; y: number; z: number; colour: number; u: number; string: number; phase: number }

/** Is the crown's `si`th string hung, with `density` of them kept (0 to 1: whole strings, by a hash, so thinning keeps each one's look)? */
export const stringHung = (si: number, density: number, seed = 0): boolean => density >= 1 || hash2(si, 17, seed) < density;

/** Every bulb of the crown's strings, `spacing` metres apart along them (the clearings' stringLights.bulbSpacing), `density` of the
 *  strings hung (stringHung). */
export function crownBulbs(c: Crown, spacing: number, seed = 0, density = 1): Bulb[] {
  const out: Bulb[] = [];
  c.strings.forEach((s, si) => {
    if (!stringHung(si, density, seed)) return;
    const o = Math.floor(hash2(si, 11, seed) * 6), push = (x: number, y: number, z: number, i: number, u: number) => out.push({ x, y, z, colour: (i + o) % 6, u, string: si, phase: hash2(si * 977 + i, 13, seed) });
    const gap = spacing * (s.space ?? 1);
    if (s.kind === "garland") {
      const arc = s.arc ?? 1, whole = arc >= 1, n = Math.max(whole ? 6 : 3, Math.round((2 * Math.PI * s.r * Math.cos(s.el) * arc) / gap));
      for (let i = 0; i < n; i++) { const u = whole ? i / n : i / (n - 1), p = garlandPoint(s, u); push(p[0], p[1], p[2], i, u); }
      return;
    }
    const lens = s.spans.map(p => Math.hypot(p.b[0] - p.a[0], p.b[1] - p.a[1], p.b[2] - p.a[2])), total = lens.reduce((a, b) => a + b, 0) || 1;
    let at = 0, i = 0;
    s.spans.forEach((p, k) => {
      const n = Math.max(1, Math.round(lens[k] / gap));
      for (let j = k === 0 ? 0 : 1; j <= n; j++) { const u = j / n; push(p.a[0] + (p.b[0] - p.a[0]) * u, p.a[1] + (p.b[1] - p.a[1]) * u - p.sag * 4 * u * (1 - u), p.a[2] + (p.b[2] - p.a[2]) * u, i++, (at + lens[k] * u) / total); }
      at += lens[k];
    });
  });
  return out;
}

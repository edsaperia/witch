// The leashes as chains (Ed, 2026-10-28, after the runestone mocks): every leash line, from its sigil in her stack (or its placed
// sigil) to its creature, drawn as a chain of links in its rank's colour, each link as long as its rank's (tuning leash.ranks.chain),
// a legend's tether's bigger still. Real chain physics (Ed, 2026-10-28: "a) real chain physics that still arc above the ground"):
// verlet points with their links' lengths held, both ends pinned, gravity, and a spring toward a still arc bowing up off the ground
// so they hang in the air as the threads did; the step clamped and cut into substeps, a chain laid afresh on a jump, every point
// kept above the ground, and `damping` for calm or lively. As a chain lengthens or shortens it gains or loses links at the
// creature's end.
import type { LeashView } from "../leash";
import { SLOT, SLOTS } from "./glyphs";

/** A chain's point: where it is and where it was (verlet). */
export interface ChainLink { x: number; y: number; z: number; px: number; py: number; pz: number }
/** A chain: its points from her end (0) to the creature's (the last), and where her end was last frame (to see a jump). */
export interface Chain { links: ChainLink[]; ax?: number; az?: number }

/** The chain's motion (tuning leash.ranks.chain). */
export interface ChainMotion {
  /** How much of a point's speed it keeps a substep (0.9 calm, 0.99 lively). */
  damping: number;
  /** Its fall (m/s²). */
  gravity: number;
  /** The spring toward its still arc (1/s²): what holds it up off the ground. */
  arcPull: number;
  /** Passes over the links' lengths a substep. */
  iterations: number;
  /** Her end moving further than this (m) in a frame lays the chain afresh (a blink, a new night, the stack cycling far). */
  jump: number;
}

/** Where point i of n sits on the still arc from a to b, bowing up h in the middle (y is over the ground there). */
function arcAt(i: number, n: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, h: number): [number, number, number] {
  const k = i / n;
  return [ax + (bx - ax) * k, ay + (by - ay) * k + Math.sin(k * Math.PI) * h, az + (bz - az) * k];
}

/** How high a held chain of `len` metres bows over a span of `span` (a parabola of its length: s ≈ d + 8h²/3d), or `arc`, the higher. */
export const bowOf = (span: number, len: number, arc: number): number => Math.max(arc, len > span ? Math.sqrt((3 * span * (len - span)) / 8) : 0);

/** Lay `ch` still, n links from a to b, bowing up h: its points on the arc, at rest. */
export function layChain(ch: Chain, n: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, h: number): void {
  ch.links.length = Math.min(ch.links.length, n + 1);
  while (ch.links.length < n + 1) ch.links.push({ x: 0, y: 0, z: 0, px: 0, py: 0, pz: 0 });
  for (let i = 0; i <= n; i++) { const [x, y, z] = arcAt(i, n, ax, ay, az, bx, by, bz, h), L = ch.links[i]; L.x = L.px = x; L.y = L.py = y; L.z = L.pz = z; }
  ch.ax = ax; ch.az = az;
}

/** One frame of a chain of `n` links each `link` m long, pinned at a (her end) and b (the creature's), pulled toward the arc bowing
 *  up `h` m: gains or loses links at b's end, then steps (dt clamped, in substeps of at most 1/120 s). */
export function stepChain(ch: Chain, n: number, link: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, h: number, dt: number, M: ChainMotion): void {
  n = Math.max(1, Math.round(n));
  if (!ch.links.length || ch.ax === undefined || Math.hypot(ax - ch.ax, az - (ch.az ?? az)) > M.jump) { layChain(ch, n, ax, ay, az, bx, by, bz, h); return; }
  ch.ax = ax; ch.az = az;
  const P = ch.links;
  // (links on or off at the creature's end: a new one where the last but one was, an old one gone from beside the end)
  while (P.length < n + 1) { const q = P[P.length - 1]; P.splice(P.length - 1, 0, { ...q }); }
  while (P.length > n + 1 && P.length > 2) P.splice(P.length - 2, 1);
  const T = Math.min(Math.max(0, dt), 1 / 20), sub = Math.max(1, Math.ceil(T / (1 / 120))), s = T / sub, s2 = s * s;
  for (let k = 0; k < sub; k++) {
    for (let i = 1; i < n; i++) {
      const L = P[i], [tx, ty, tz] = arcAt(i, n, ax, ay, az, bx, by, bz, h);
      const vx = (L.x - L.px) * M.damping, vy = (L.y - L.py) * M.damping, vz = (L.z - L.pz) * M.damping;
      L.px = L.x; L.py = L.y; L.pz = L.z;
      L.x += vx + M.arcPull * (tx - L.x) * s2; L.y += vy + (M.arcPull * (ty - L.y) - M.gravity) * s2; L.z += vz + M.arcPull * (tz - L.z) * s2;
    }
    const a = P[0], b = P[n];
    a.x = a.px = ax; a.y = a.py = ay; a.z = a.pz = az; b.x = b.px = bx; b.y = b.py = by; b.z = b.pz = bz;
    for (let it = 0; it < M.iterations; it++) {
      for (let i = 0; i < n; i++) {
        const p = P[i], q = P[i + 1], dx = q.x - p.x, dy = q.y - p.y, dz = q.z - p.z, d = Math.hypot(dx, dy, dz) || 1e-6, e = (d - link) / d;
        const wp = i === 0 ? 0 : 1, wq = i + 1 === n ? 0 : 1, w = wp + wq;
        if (!w) continue;
        p.x += dx * e * (wp / w); p.y += dy * e * (wp / w); p.z += dz * e * (wp / w);
        q.x -= dx * e * (wq / w); q.y -= dy * e * (wq / w); q.z -= dz * e * (wq / w);
      }
    }
    for (let i = 1; i < n; i++) if (P[i].y < 0.15) { P[i].y = 0.15; if (P[i].py < 0.15) P[i].py = 0.15; } // (never into the ground)
  }
}

/** The atlas's link glyphs (made once into the leash view's atlas): a link face on (an oval ring) and edge on (a bar). */
export function linkSlots(lv: LeashView): { face: number[]; edge: number[] } {
  const slot = (key: string, draw: (g: CanvasRenderingContext2D, ox: number, oy: number) => void): number[] => {
    const had = lv.slots.get(key);
    if (had !== undefined) return lv.uv(had);
    const s = lv.nextSlot++, g = lv.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
    g.clearRect(ox, oy, SLOT, SLOT); g.fillStyle = "#fff"; draw(g, ox, oy);
    lv.slots.set(key, s); lv.tex.needsUpdate = true;
    return lv.uv(s);
  };
  return {
    face: slot("chain:face", (g, ox, oy) => { for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const r = Math.hypot((x + 0.5 - 16) / 13, (y + 0.5 - 16) / 8); if (r <= 1 && r >= 0.62) g.fillRect(ox + x, oy + y, 1, 1); } }),
    edge: slot("chain:edge", (g, ox, oy) => g.fillRect(ox + 3, oy + 13, 26, 6)),
  };
}

/** Draw a chain: a link on each span between its points, alternately face on and edge on, crisp (the solid batch), each with a faint
 *  glow of its colour. */
export function drawChain(lv: LeashView, ch: Chain, link: number, r: number, g: number, b: number, a: number, dot: number[], glow = 0.12): void {
  const S = linkSlots(lv), P = ch.links;
  for (let i = 0; i + 1 < P.length; i++) {
    const p = P[i], q = P[i + 1], x = (p.x + q.x) / 2, y = (p.y + q.y) / 2, z = (p.z + q.z) / 2, face = i % 2 === 1;
    lv.solid.add(x, y, z, link * (face ? 1.25 : 1.1), face ? S.face : S.edge, r, g, b, a);
    if (glow > 0) lv.over.add(x, y, z, link * 1.6, dot, r, g, b, glow * a, 1, true);
  }
}

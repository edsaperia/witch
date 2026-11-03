// The leashes as chains (Ed, 2026-10-28, after the runestone mocks): every leash line, from its sigil in her stack (or its placed
// sigil) to its creature, drawn as a chain of links in its rank's colour, each link as long as its rank's (tuning leash.ranks.chain),
// a legend's tether's bigger still. Since the chain rework (Ed, 2026-11-03: "Chains lie on the floor at full length so you can see
// how taut they are"), every chain is its full length (rules/chains.ts, leash.chain.length) and lies on the ground: verlet points
// `segment` m apart (each span drawn as as many links as fit), both ends pinned, gravity, and on the ground friction, so a slack chain
// stays in loose curves where it was dragged, and a taut one pulls straight. No spring bows it up any more (the old arcPull). The
// constraints are a rope's: a span pulled longer than `segment` is drawn back, one bunched under 0.9 of it pushed apart, so slack
// lies in loose curves its full length. The step
// clamped and cut into substeps, a chain laid afresh on a jump, every point kept above the ground, and `damping` for calm or lively.
// A refused take-off rattles the chains weighing her down (rattleChain).
import type { PosePoint, TravelPose } from "./travelPose";
import type { LeashView } from "../leash";
import { SLOT, SLOTS } from "./glyphs";
import { SPRITE_UNIFORMS } from "../sprites";

/** A chain's point: where it is and where it was (verlet). */
export interface ChainLink { x: number; y: number; z: number; px: number; py: number; pz: number }
/** A chain: its points from her end (0) to the creature's (the last), and where her end was last frame (to see a jump); `rattle`, a
 *  refused take-off's jangle: when it began (on the view's clock). */
export interface Chain { links: ChainLink[]; ax?: number; az?: number; pose?: TravelPose; rattle?: number }

/** The chain's motion (tuning leash.ranks.chain). */
export interface ChainMotion {
  /** How much of a point's speed it keeps a substep (0.9 calm, 0.99 lively). */
  damping: number;
  /** Its fall (m/s²). */
  gravity: number;
  /** The share of a point's sideways speed it keeps a substep while it lies on the ground (lower: it stays where it was dragged). */
  friction: number;
  /** Passes over the links' lengths a substep. */
  iterations: number;
  /** Her end moving further than this (m) in a frame lays the chain afresh (a blink, a new night, the stack cycling far). */
  jump: number;
}

/** How high (m) a chain's points rest: just off the ground. */
export const CHAIN_FLOOR = 0.15;

/** The points of a chain of n spans `seg` m long from a to b laid on the ground (a's own point where it is): straight when the span is
 *  as long as the chain, else snaking to and fro either side of the line between them, as wide as takes up the chain's length. */
function layPoints(n: number, seg: number, ax: number, ay: number, az: number, bx: number, bz: number, out: [number, number, number][]): void {
  const D = Math.hypot(bx - ax, bz - az) || 1e-6, ux = (bx - ax) / D, uz = (bz - az) / D, S = n * seg, waves = Math.max(1, Math.round((S - D) / 12));
  const at = (A: number) => { out.length = 0; for (let i = 0; i <= n; i++) { const k = i / n, w = A * Math.sin(k * Math.PI * waves); out.push([ax + ux * D * k - uz * w, i === 0 ? ay : CHAIN_FLOOR, az + uz * D * k + ux * w]); } };
  const len = () => { let l = 0; for (let i = 1; i < out.length; i++) l += Math.hypot(out[i][0] - out[i - 1][0], out[i][2] - out[i - 1][2]); return l; };
  if (S <= D) { at(0); return; }
  let lo = 0, hi = S;
  for (let k = 0; k < 24; k++) { const m = (lo + hi) / 2; at(m); if (len() < S) lo = m; else hi = m; }
  at(lo);
}
const LAY: [number, number, number][] = [];

/** Lay `ch` still, n spans `seg` m long from a (her end) to b (the creature's), on the ground (layPoints), at rest. */
export function layChain(ch: Chain, n: number, seg: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number): void {
  ch.links.length = Math.min(ch.links.length, n + 1);
  while (ch.links.length < n + 1) ch.links.push({ x: 0, y: 0, z: 0, px: 0, py: 0, pz: 0 });
  layPoints(n, seg, ax, ay, az, bx, bz, LAY);
  for (let i = 0; i <= n; i++) { const L = ch.links[i], [x, y, z] = LAY[i]; L.x = L.px = x; L.y = L.py = i === n ? by : y; L.z = L.pz = z; }
  ch.ax = ax; ch.az = az;
}

/** One frame of a chain of n spans each `seg` m long (its full length n × seg), pinned at a (her end) and b (the creature's), lying
 *  on the ground (dt clamped, in substeps of at most 1/120 s). Laid afresh when new, when its length changed, or on a jump. */
export function stepChain(ch: Chain, n: number, seg: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, dt: number, M: ChainMotion): void {
  n = Math.max(1, Math.round(n));
  if (ch.links.length !== n + 1 || ch.ax === undefined || Math.hypot(ax - ch.ax, az - (ch.az ?? az)) > M.jump) { layChain(ch, n, seg, ax, ay, az, bx, by, bz); return; }
  ch.ax = ax; ch.az = az;
  const P = ch.links;
  const T = Math.min(Math.max(0, dt), 1 / 20), sub = Math.max(1, Math.ceil(T / (1 / 120))), s = T / sub, s2 = s * s;
  for (let k = 0; k < sub; k++) {
    for (let i = 1; i < n; i++) {
      const L = P[i], floor = L.y <= CHAIN_FLOOR + 1e-3, f = floor ? M.friction : 1;
      const vx = (L.x - L.px) * M.damping * f, vy = (L.y - L.py) * M.damping, vz = (L.z - L.pz) * M.damping * f;
      L.px = L.x; L.py = L.y; L.pz = L.z;
      L.x += vx; L.y += vy - M.gravity * s2; L.z += vz;
    }
    const a = P[0], b = P[n];
    a.x = a.px = ax; a.y = a.py = ay; a.z = a.pz = az; b.x = b.px = bx; b.y = b.py = by; b.z = b.pz = bz;
    for (let it = 0; it < M.iterations; it++) {
      for (let i = 0; i < n; i++) {
        const p = P[i], q = P[i + 1], dx = q.x - p.x, dy = q.y - p.y, dz = q.z - p.z, d = Math.hypot(dx, dy, dz) || 1e-6;
        if (d <= seg && d >= seg * 0.9) continue; // (a rope: pulled straight past its length, pushed apart only bunched past a tenth, so slack lies in loose curves)
        const e = (d - (d > seg ? seg : seg * 0.9)) / d, wp = i === 0 ? 0 : 1, wq = i + 1 === n ? 0 : 1, w = wp + wq;
        if (!w) continue;
        p.x += dx * e * (wp / w); p.y += dy * e * (wp / w); p.z += dz * e * (wp / w);
        q.x -= dx * e * (wq / w); q.y -= dy * e * (wq / w); q.z -= dz * e * (wq / w);
      }
    }
    for (let i = 1; i < n; i++) if (P[i].y < CHAIN_FLOOR) { P[i].y = CHAIN_FLOOR; if (P[i].py < CHAIN_FLOOR) P[i].py = CHAIN_FLOOR; } // (never into the ground)
  }
}

/** A refused take-off's rattle (Ed, 2026-11-03: "When you try and take off but you're weighed down by creatures, the chains rattle"):
 *  a jolt into the points at her end that runs down the chain, `strength` m at her end (half up, half to and fro along it), less
 *  further down; `seed` keeps each chain's jolt its own. Called each frame of the rattle with its strength falling, so the links
 *  jangle (render/leash/stack.ts). */
export function rattleChain(ch: Chain, strength: number, seed: number): void {
  const P = ch.links, n = P.length - 1;
  if (n < 2 || !(strength > 0)) return;
  for (let i = 1; i < n; i++) {
    const k = strength * Math.exp((-4 * i) / n), h = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453, r = (h - Math.floor(h)) * 2 - 1;
    P[i].py -= k * 0.5; P[i].px -= r * k * 0.35; P[i].pz += r * k * 0.35; // (a kick: verlet's speed is where it was against where it is)
  }
}

/** How many angles a link is drawn at (over half a turn: a link reads the same turned round). */
export const LINK_ANGLES = 8;

/** Which of the LINK_ANGLES a span (dx, dy) on the screen (x right, y up) runs at, the nearest. */
export const linkAngle = (dx: number, dy: number): number => { const k = Math.round(Math.atan2(dy, dx) / (Math.PI / LINK_ANGLES)); return ((k % LINK_ANGLES) + LINK_ANGLES) % LINK_ANGLES; };

/** The atlas's link glyphs (made once into the leash view's atlas), at each of LINK_ANGLES: a link face on (an oval ring, long along
 *  the chain) and edge on (a bar), so a chain reads as joined whichever way it runs across the screen (Ed's playtest, 2026-10-29:
 *  "the links don't join together when seen from all directions, esp north-south"). */
export function linkSlots(lv: LeashView): { face: number[][]; edge: number[][] } {
  const slot = (key: string, draw: (g: CanvasRenderingContext2D, ox: number, oy: number) => void): number[] => {
    const had = lv.slots.get(key);
    if (had !== undefined) return lv.uv(had);
    const s = lv.nextSlot++, g = lv.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
    g.clearRect(ox, oy, SLOT, SLOT); g.fillStyle = "#fff"; draw(g, ox, oy);
    lv.slots.set(key, s); lv.tex.needsUpdate = true;
    return lv.uv(s);
  };
  // (each pixel's place along the link (u) and across it (v), the link turned to its angle; the atlas's y runs down the screen)
  const shape = (a: number, inside: (u: number, v: number) => boolean) => (g: CanvasRenderingContext2D, ox: number, oy: number) => {
    const c = Math.cos(a), sn = Math.sin(a);
    for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const px = x + 0.5 - 16, py = -(y + 0.5 - 16), u = px * c + py * sn, v = -px * sn + py * c; if (inside(u, v)) g.fillRect(ox + x, oy + y, 1, 1); }
  };
  const face: number[][] = [], edge: number[][] = [];
  for (let k = 0; k < LINK_ANGLES; k++) {
    const a = (k * Math.PI) / LINK_ANGLES;
    face.push(slot(`chain:face:${k}`, shape(a, (u, v) => { const r = Math.hypot(u / 13, v / 8); return r <= 1 && r >= 0.62; })));
    edge.push(slot(`chain:edge:${k}`, shape(a, (u, v) => Math.abs(u) <= 13 && Math.abs(v) <= 3)));
  }
  return { face, edge };
}

/** Draw a chain: a link on each span between its points, alternately face on and edge on, each turned along its span as the screen
 *  shows it (the sprites' right and up: render/sprites.ts), crisp (the solid batch), each with a faint glow of its colour. */
export function drawChain(lv: LeashView, ch: { links: readonly PosePoint[] }, link: number, r: number, g: number, b: number, a: number, dot: number[], glow = 0.12, batch = lv.solid): void {
  if (a <= 0.004) return; // (faded out: nothing drawn)
  const S = linkSlots(lv), P = ch.links, R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value;
  // (each span as many links as fit along it, a link a link's length: a span between the physics' points may be several links long)
  for (let i = 0, j = 0; i + 1 < P.length; i++) {
    const p = P[i], q = P[i + 1], dx = q.x - p.x, dy = q.y - p.y, dz = q.z - p.z, m = Math.max(1, Math.round(Math.hypot(dx, dy, dz) / link));
    const k = linkAngle(dx * R.x + dy * R.y + dz * R.z, dx * U.x + dy * U.y + dz * U.z);
    for (let h = 0; h < m; h++, j++) {
      const f = (h + 0.5) / m, x = p.x + dx * f, y = p.y + dy * f, z = p.z + dz * f, face = j % 2 === 1;
      batch.add(x, y, z, link * (face ? 1.25 : 1.1), face ? S.face[k] : S.edge[k], r, g, b, a);
      if (glow > 0) lv.over.add(x, y, z, link * 1.6, dot, r, g, b, glow * a, 1, true);
    }
  }
}

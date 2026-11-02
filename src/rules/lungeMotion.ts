import { FIGHT } from "./movement";

export interface LungePoint { x: number; z: number }

/** One travelling dotted front, from the animal at preparation start to the far edge at release. */
export function lungeWave(points: readonly LungePoint[], progress: number): LungePoint[] {
  const k = Math.max(0, Math.min(1, progress));
  if (k === 0) return [{ x: 0, z: 0 }];
  if (points.some(p => p.x < -1e-6)) return points.map(p => ({ x: p.x * k, z: p.z * k }));
  const x = Math.max(...points.map(p => p.x)) * k;
  let half = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    if (Math.min(a.x, b.x) <= x && Math.max(a.x, b.x) >= x) {
      const q = a.x === b.x ? 0 : (x - a.x) / (b.x - a.x);
      half = Math.max(half, Math.abs(a.z + (b.z - a.z) * q));
    }
  }
  half *= Math.min(1, k * 8); // Grow smoothly from a point instead of appearing at full width.
  const n = Math.max(1, Math.ceil(half * 2 / 0.7));
  return Array.from({ length: n + 1 }, (_, i) => ({ x, z: -half + 2 * half * i / n }));
}

/** Shared by the strike and its warning; direction does not change this travel budget. */
export function lungeAdvance(left: number, speed: number, dt: number): { speed: number; step: number } {
  const a = 300 * FIGHT.speed / FIGHT.momentum;
  const next = Math.min(60 * FIGHT.speed, speed + a * dt, Math.sqrt(Math.max(0, 2 * a * left + (12 * FIGHT.speed) ** 2)));
  return { speed: next, step: Math.min(left, next * dt) };
}

/** Conservative reachable corridor in release-local coordinates. The sides flare as turning time accumulates.
 * Every heading stays between the two maximum-turn trajectories. While those headings face forward,
 * their forward progress is the minimum and lateral progress the maximum. The far cap covers straighter paths.
 * If a lunge can turn back, its warning expands to the full travel disc instead of implying a safe flank. */
export function lungeWarning(length: number, speed: number, turn: number, half: number): LungePoint[] {
  const dt = 1 / 60, side: LungePoint[] = [{ x: 0, z: half }];
  let left = length, x = 0, z = 0, angle = 0;
  while (left > 1e-6) {
    const next = lungeAdvance(left, speed, dt);
    angle += Math.max(0, turn) * Math.PI / 180 * dt / FIGHT.momentum;
    if (angle >= Math.PI / 2 || next.step <= 0) {
      return Array.from({ length: 65 }, (_, i) => ({ x: Math.cos(i * Math.PI / 32) * (length + half), z: Math.sin(i * Math.PI / 32) * (length + half) }));
    }
    x += Math.cos(angle) * next.step; z += Math.sin(angle) * next.step;
    side.push({ x, z: z + half });
    left -= next.step; speed = next.speed;
  }
  // Include the damaging body's width at both the start and far cap.
  side.push({ x: length + half, z: z + half });
  return [...side, ...side.slice().reverse().map(p => ({ x: p.x, z: -p.z })), side[0]];
}

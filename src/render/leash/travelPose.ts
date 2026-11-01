// Display geometry only. Both poses run from the sigil to the creature.
import knobs from '../../../config/playtest-render.json';
export interface PosePoint { x: number; y: number; z: number }
export interface TravelPose {
  ground?: boolean;
  displayed?: readonly PosePoint[];
  start?: readonly PosePoint[];
  at?: number;
}

function interpolate(a: PosePoint, b: PosePoint, t: number): PosePoint {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t };
}

function sample(points: readonly PosePoint[], u: number): PosePoint {
  const pos = u * (points.length - 1), i = Math.floor(pos);
  return interpolate(points[i], points[Math.min(i + 1, points.length - 1)], pos - i);
}

/** Uniform link spacing around bends. Travel routes arrive in creature-to-sigil order. */
export function groundLinks(route: readonly { x: number; z: number }[], link: number): PosePoint[] {
  const points = Array.from(route, p => ({ ...p, y: knobs.chainGroundHeight })).reverse();
  const distances = [0];
  for (let i = 1; i < points.length; i++) distances.push(distances[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z));
  const total = distances[points.length - 1], count = Math.max(1, Math.ceil(total / link));
  let end = 1;
  return Array.from({ length: count + 1 }, (_, i) => {
    const distance = total * i / count;
    while (end < points.length - 1 && distances[end] < distance) end++;
    return interpolate(points[end - 1], points[end], (distance - distances[end - 1]) / (distances[end] - distances[end - 1] || 1));
  });
}

/** Capture the pose actually on screen, including a partially reversed transition. */
export function travelPose(state: TravelPose, ground: boolean, target: readonly PosePoint[], time: number, seconds: number): readonly PosePoint[] {
  if (state.ground !== ground) {
    state.start = state.displayed?.map(p => ({ ...p }));
    state.at = time;
    state.ground = ground;
  }
  const progress = seconds > 0 ? Math.min(1, Math.max(0, (time - (state.at ?? time)) / seconds)) : 1;
  if (!state.start || progress === 1) {
    state.start = undefined;
    return state.displayed = target;
  }
  const start = state.start;
  if (!progress) return state.displayed = start;
  const count = Math.max(1, Math.round(start.length - 1 + (target.length - start.length) * progress));
  return state.displayed = Array.from({ length: count + 1 }, (_, i) => {
    const u = i / count;
    // The sigil end starts lifting first. Both ends arrive within the same interval.
    const delay = Math.min(.99, Math.max(0, knobs.chainLiftStagger)) * u;
    const t = ground ? progress : Math.max(0, (progress - delay) / (1 - delay));
    return interpolate(sample(start, u), sample(target, u), t * t * (3 - 2 * t));
  });
}

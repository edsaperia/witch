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

/** A point `distance` along a polyline whose running lengths are `distances`. */
function along(points: readonly PosePoint[], distances: readonly number[], distance: number): PosePoint {
  let end = 1;
  while (end < points.length - 1 && distances[end] < distance) end++;
  return interpolate(points[end - 1], points[end], (distance - distances[end - 1]) / (distances[end] - distances[end - 1] || 1));
}

/** A travelling follower's chain, from its sigil to it (Ed, 2026-11-02: "the chains of my leashed creatures are attached to me instead
 *  of to their sigils ... When I'm in the air, it should still attach to their sigils, but fall to the ground quickly and become their
 *  walking path"): pinned at `sigil` (its place in her stack, or a placed sigil), it hangs down to the ground, steepest under the sigil
 *  and meeting the ground flat, `fall` metres along the walking path for every metre it falls (tuning leash.ranks.chain.fall), and
 *  from there lies along the path (`route`, creature-to-sigil order as the rules keep it) to the creature. Links `link` m apart. */
export function sigilPath(sigil: PosePoint, route: readonly { x: number; z: number }[], link: number, fall: number): PosePoint[] {
  const gh = knobs.chainGroundHeight, ground = Array.from(route, p => ({ x: p.x, y: gh, z: p.z })).reverse();
  if (!ground.length) ground.push({ ...sigil, y: gh });
  if (ground.length < 2) ground.push({ ...ground[0] });
  const gd = [0];
  for (let i = 1; i < ground.length; i++) gd.push(gd[i - 1] + Math.hypot(ground[i].x - ground[i - 1].x, ground[i].z - ground[i - 1].z));
  const total = gd[ground.length - 1], high = Math.max(0, sigil.y - gh), reach = Math.min(total, high * Math.max(0, fall));
  // (the hanging part, the walking path under it shifted to start under the sigil, the shift easing out by the ground)
  const line: PosePoint[] = [], ox = sigil.x - ground[0].x, oz = sigil.z - ground[0].z, steps = high > 0 ? Math.max(4, Math.ceil(Math.hypot(high, reach) / Math.max(0.05, link))) : 0;
  for (let j = 0; j <= steps; j++) {
    const u = steps ? j / steps : 1, g = along(ground, gd, reach * u), w = 1 - u;
    line.push({ x: g.x + ox * w, y: gh + high * w * w, z: g.z + oz * w });
  }
  for (let i = 0; i < ground.length; i++) if (gd[i] > reach) line.push(ground[i]);
  // (links evenly spaced along it, the fall's length counted too)
  if (line.length < 2) line.push({ ...line[0] });
  const ld = [0];
  for (let i = 1; i < line.length; i++) ld.push(ld[i - 1] + Math.hypot(line[i].x - line[i - 1].x, line[i].y - line[i - 1].y, line[i].z - line[i - 1].z));
  const length = ld[ld.length - 1], count = Math.max(1, Math.ceil(length / link));
  return Array.from({ length: count + 1 }, (_, i) => along(line, ld, (length * i) / count));
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

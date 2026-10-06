// The boot-up as a ley ring (Ed, 2026-10-06): "the 12 speakers that are around the dancefloor; they start as smaller
// runestones, and the bootup phase is the leyline going around the dancefloor speaker ring (now a small runestone ring)
// and the pulse turning them into speakers ... The leyline can still travel three times faster than the pulse. The game
// starts when the witch casts the party spell, which sets off the pulse that starts turning stones into speakers." And:
// "the pulse should go around the dancefloor speaker/runestone ring clockwise, starting from the top".
//
// One path: from the treehouse's front down to the ring's top (due north of the floor, under the treehouse), then round
// the ring clockwise as seen from the default camera (north up: north, east, south, west) back to the top. The pulse sets
// off from the treehouse as she casts the party spell and runs at one pace along it, reaching the last stone as the boot
// ends (boot.time on); each stone turns into a speaker as it passes. The line runs ahead of it at `reveal` times its pace,
// drawing the whole ring in the first part of the boot. Measures are metres along the path (render/leylines.ts draws it
// by the same arc length).
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import type { Tuning } from "./tuning";
import { departureClear } from "./departure";

type P2 = [number, number];
type Floor = Pick<ForestMap, "dancefloor" | "treehouseFront"> & { tuning: { boot: { time: number; firstAfter?: number } } };

/** A stone's bearing from the floor's middle, clockwise from north (radians, 0 to 2π): east π/2 (the camera looks north). */
const bearingOf = (d: Floor["dancefloor"], x: number, z: number) => { const b = Math.atan2(x - d.x, -(z - d.z)); return b < 0 ? b + Math.PI * 2 : b; };

/** The ring's radius: the stones' mean distance from the floor's middle. */
export const ringRadius = (map: Floor): number => {
  const d = map.dancefloor, s = d.speakers, T = map.tuning as Partial<Tuning>;
  // On the first line's own circle round home (rules/departure.ts: out past the speakers' feet, or at the treehouse's front if
  // that's further), so the line leaving home runs on the ring from the treehouse and leaves it at a point on it, one path
  // (Ed, 2026-10-06: "it doesn't connect with the leyline around the dancefloor": the ring went through the speakers, the
  // way out round outside them).
  if (T.dancefloor && T.leyLines) return Math.max(departureClear(map as unknown as ForestMap, T.leyLines.depart.avoid), Math.hypot(map.treehouseFront.x - d.x, map.treehouseFront.z - d.z));
  return s.length ? s.reduce((a, p) => a + Math.hypot(p.x - d.x, p.z - d.z), 0) / s.length : d.radius;
};

/** The stones in the order the pulse turns them: indices into dancefloor.speakers, the first clockwise from the top. */
export function ringOrder(map: Floor): number[] {
  const d = map.dancefloor;
  return d.speakers.map((s, i) => ({ i, b: bearingOf(d, s.x, s.z) })).sort((a, b) => a.b - b.b).map(o => o.i);
}

const cache = new WeakMap<object, { path: P2[]; length: number; stoneAt: number[]; order: number[] }>();
/** The boot path (the treehouse's front, the ring's top, round clockwise to the top again), its length, and where along it
 *  (m) each stone is passed, by speaker index. */
export function bootPath(map: Floor): { path: P2[]; length: number; stoneAt: number[]; order: number[] } {
  const hit = cache.get(map.dancefloor);
  if (hit) return hit;
  const d = map.dancefloor, f = map.treehouseFront, R = ringRadius(map), top: P2 = [d.x, d.z - R];
  const path: P2[] = [[f.x, f.z], top], drop = Math.hypot(top[0] - f.x, top[1] - f.z);
  for (let k = 1; k <= 72; k++) { const b = (k / 72) * Math.PI * 2; path.push([d.x + R * Math.sin(b), d.z - R * Math.cos(b)]); }
  const order = ringOrder(map), stoneAt: number[] = [];
  d.speakers.forEach((s, i) => { stoneAt[i] = drop + R * bearingOf(d, s.x, s.z); });
  const out = { path, length: drop + R * Math.PI * 2, stoneAt, order };
  cache.set(map.dancefloor, out);
  return out;
}

/** Where the boot's pulse is along the path (m). Ed, 2026-10-06: "The time between the game start and the first mini-runestone
 *  turning into a speaker should be about three seconds ... after you leave your decks ... You can start the boot time from
 *  when the first speaker is activated." So: nothing before the party spell; cast, it waits at the treehouse until she
 *  leaves her decks (`p.bootFrom`); then it runs down to the first stone in `boot.firstAfter` seconds, and on round the ring
 *  from the first stone to the last over `boot.time`, the boot's minutes. */
export function bootPulseAt(p: PartyState, map: Floor, time: number): number {
  const B = map.tuning.boot.time, F = Math.max(0, map.tuning.boot.firstAfter ?? 0), P = bootPath(map);
  if (p.spellAt === null) return 0;
  const first = P.order.length ? P.stoneAt[P.order[0]] : P.length, last = P.order.length ? P.stoneAt[P.order[P.order.length - 1]] : P.length;
  if (!(B > 0) && !(F > 0)) return last;
  if (p.bootFrom === undefined) return 0; // (cast, but still at her decks: it waits at the treehouse)
  const t = time - p.bootFrom;
  if (t <= 0) return 0;
  if (t < F) return (t / F) * first;
  return B > 0 ? first + Math.min(1, (t - F) / B) * (last - first) : last;
}

/** How far the boot has run (0 to 1): 0 before the party spell (and while she's still at her decks), 1 once the last stone
 *  has turned: the pulse's share of the way to the last stone. */
export function bootShare(p: PartyState, map: Floor, time: number): number {
  const P = bootPath(map), last = P.order.length ? P.stoneAt[P.order[P.order.length - 1]] : P.length;
  return last > 0 ? Math.max(0, Math.min(1, bootPulseAt(p, map, time) / last)) : 1;
}

/** How far along the path the line is drawn (m): `reveal` times the pulse, the whole ring at most. */
export const bootLineAt = (p: PartyState, map: Floor, time: number, reveal: number): number => Math.min(bootPath(map).length, reveal * bootPulseAt(p, map, time));

/** Whether stone `i` (an index into dancefloor.speakers) has turned into a speaker: the pulse has reached it. */
export function stoneTurned(p: PartyState, map: Floor, time: number, i: number): boolean {
  if (p.spellAt === null) return false;
  const at = bootPulseAt(p, map, time);
  return at > 0 && (at >= bootPath(map).stoneAt[i] || bootShare(p, map, time) >= 1);
}

/** How many stones have turned. */
export function stonesTurned(p: PartyState, map: Floor, time: number): number {
  let n = 0;
  for (let i = 0; i < map.dancefloor.speakers.length; i++) if (stoneTurned(p, map, time, i)) n++;
  return n;
}

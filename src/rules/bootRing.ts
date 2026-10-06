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

type P2 = [number, number];
type Floor = Pick<ForestMap, "dancefloor" | "treehouseFront"> & { tuning: { boot: { time: number } } };

/** A stone's bearing from the floor's middle, clockwise from north (radians, 0 to 2π): east π/2 (the camera looks north). */
const bearingOf = (d: Floor["dancefloor"], x: number, z: number) => { const b = Math.atan2(x - d.x, -(z - d.z)); return b < 0 ? b + Math.PI * 2 : b; };

/** The ring's radius: the stones' mean distance from the floor's middle. */
export const ringRadius = (map: Floor): number => {
  const d = map.dancefloor, s = d.speakers;
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

/** How far the boot has run (0 to 1): 0 before the party spell, 1 once the last stone has turned. A build without the
 *  party spell (spellAt undefined) counts from the boot's start as before. */
export function bootShare(p: PartyState, map: Floor, time: number): number {
  const B = map.tuning.boot.time;
  if (p.spellAt === null) return 0;
  if (!(B > 0)) return 1;
  const start = p.spellAt ?? p.bootUntil - B;
  return Math.max(0, Math.min(1, (time - start) / B));
}

/** Where the boot's pulse is along the path (m): at the treehouse as the spell is cast, at the last stone as the boot ends. */
export function bootPulseAt(p: PartyState, map: Floor, time: number): number {
  const P = bootPath(map), last = P.order.length ? P.stoneAt[P.order[P.order.length - 1]] : P.length;
  return bootShare(p, map, time) * last;
}

/** How far along the path the line is drawn (m): `reveal` times the pulse, the whole ring at most. */
export const bootLineAt = (p: PartyState, map: Floor, time: number, reveal: number): number => Math.min(bootPath(map).length, reveal * bootPulseAt(p, map, time));

/** Whether stone `i` (an index into dancefloor.speakers) has turned into a speaker: the pulse has reached it. */
export function stoneTurned(p: PartyState, map: Floor, time: number, i: number): boolean {
  if (p.spellAt === null) return false;
  if (bootShare(p, map, time) >= 1) return true;
  return bootPulseAt(p, map, time) >= bootPath(map).stoneAt[i];
}

/** How many stones have turned. */
export function stonesTurned(p: PartyState, map: Floor, time: number): number {
  let n = 0;
  for (let i = 0; i < map.dancefloor.speakers.length; i++) if (stoneTurned(p, map, time, i)) n++;
  return n;
}

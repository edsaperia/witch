// The boot-up as a ley ring (Ed, 2026-10-06): "the 12 speakers that are around the dancefloor; they start as smaller
// runestones, and the bootup phase is the leyline going around the dancefloor speaker ring (now a small runestone ring)
// and the pulse turning them into speakers ... The leyline can still travel three times faster than the pulse. The game
// starts when the witch casts the party spell, which sets off the pulse that starts turning stones into speakers." And:
// "the pulse should go around the dancefloor speaker/runestone ring clockwise, starting from the top".
//
// One path: from the treehouse's front down to the ring's top (due north of the floor, under the treehouse), then round
// the ring clockwise as seen from the default camera (north up: north, east, south, west) back to the top. The pulse sets
// off from the treehouse as she leaves her decks and runs along it at the ley pulse's own speed (Ed, 2026-10-09: "Pure
// constant speed", leyLines.pulseSpeed, boot included), the boot ending as it comes round to where it came on to the ring,
// where the first ley line's pulse takes over; each stone turns into a speaker as it passes. The line runs ahead of it at `reveal` times its pace,
// drawing the whole ring in the first part of the boot. Measures are metres along the path (render/leylines.ts draws it
// by the same arc length).
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { ringApproach, speakerCircle } from "./departure";

type P2 = [number, number];
type Floor = Pick<ForestMap, "dancefloor" | "treehouseFront"> & { tuning: { leyLines?: { pulseSpeed?: number } } };

/** The pulse's speed in the boot (m/s): the ley pulse's, at the base tempo. */
const bootSpeed = (map: Floor): number => Math.max(0, map.tuning.leyLines?.pulseSpeed ?? 4);
/** How long the boot takes (s): the whole boot path at the pulse's speed (179 m at 4 m/s: about 45 s); 0 with no speed. */
export const bootSeconds = (map: Floor): number => { const v = bootSpeed(map); return v > 0 ? bootPath(map).length / v : 0; };

/** A stone's bearing from the floor's middle, clockwise from north (radians, 0 to 2π): east π/2 (the camera looks north). */

/** The ring's radius: the stones' own circle, so the boot's pulse runs through each stone as it turns it (Ed, 2026-10-07: "The
 *  boot leyline does not go around the dancefloor where the speakers are": it ran on the treehouse front's circle, 6.5 m outside
 *  them, across the ground in front of the near ones). The first line's way out runs on this same circle (rules/departure.ts),
 *  so the line leaving home is still one path with the ring, leaving it at a point on it (Ed, 2026-10-06: "it doesn't connect
 *  with the leyline around the dancefloor"). */
export const ringRadius = (map: Floor): number => speakerCircle(map);

/** The stones in the order the pulse turns them: indices into dancefloor.speakers, the first clockwise from the top. */
export function ringOrder(map: Floor): number[] { return bootPath(map).order; }

const cache = new WeakMap<object, { path: P2[]; length: number; stoneAt: number[]; order: number[]; ringFrom: number; a0: number }>();
/** The boot path (the treehouse's front, the ring's top, round clockwise to the top again), its length, and where along it
 *  (m) each stone is passed, by speaker index. */
export function bootPath(map: Floor): { path: P2[]; length: number; stoneAt: number[]; order: number[]; ringFrom: number; a0: number } {
  const hit = cache.get(map.dancefloor);
  if (hit) return hit;
  const d = map.dancefloor, R = ringRadius(map), TAU = Math.PI * 2;
  // On to the ring as the first line goes (rules/departure.ts ringApproach: meeting it along it, clockwise), then once round.
  const ap = ringApproach(map, R, -1, 2), path: P2[] = ap.pts.slice(), a0 = ap.at; // (angles round home: 0 south, clockwise decreasing)
  for (let k = 1; k <= 72; k++) { const a = a0 - (k / 72) * TAU; path.push([d.x + R * Math.sin(a), d.z + R * Math.cos(a)]); }
  const stoneAt: number[] = [];
  d.speakers.forEach((s, i) => { stoneAt[i] = ap.length + R * ((((a0 - Math.atan2(s.x - d.x, s.z - d.z)) % TAU) + TAU) % TAU); });
  const order = d.speakers.map((_, i) => i).sort((a, b) => stoneAt[a] - stoneAt[b]);
  const out = { path, length: ap.length + R * TAU, stoneAt, order, ringFrom: ap.length, a0 };
  cache.set(map.dancefloor, out);
  return out;
}

/** Where the boot's pulse is along the path (m): nothing before the party spell; cast, it waits at the treehouse until she
 *  leaves her decks (`p.bootFrom`); then it runs along the path at the pulse's speed (Ed, 2026-10-09: "Pure constant speed";
 *  the first stone, 11.5 m on, about three seconds later: Ed, 2026-10-06, "about three seconds ... after you leave your
 *  decks"), all the way round to where it came on to the ring. */
export function bootPulseAt(p: PartyState, map: Floor, time: number): number {
  const P = bootPath(map), v = bootSpeed(map);
  if (p.spellAt === null) return 0;
  if (!(v > 0)) return P.length;
  if (p.bootFrom === undefined) return 0; // (cast, but still at her decks: it waits at the treehouse)
  return Math.max(0, Math.min(P.length, (time - p.bootFrom) * v));
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

/** How far along the boot path (m) the pulse passes the point of the ring nearest (x, z): round it clockwise from where the
 *  path meets it (as each stone's stoneAt). The first ley line leaves the ring at one such point (render/leylines.ts). */
export function ringAlong(map: Floor, x: number, z: number): number {
  const P = bootPath(map), d = map.dancefloor, R = ringRadius(map), TAU = Math.PI * 2;
  return P.ringFrom + R * ((((P.a0 - Math.atan2(x - d.x, z - d.z)) % TAU) + TAU) % TAU);
}

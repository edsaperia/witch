// The ley pulse at a constant speed (Ed, 2026-10-09: "Pure constant speed", 4 m/s, boot included): it runs along the route's
// own curves (rules/leyroute.ts, the line's base: the drawn line wanders a little about it, render/leylines.ts) at
// leyLines.pulseSpeed metres a second times the party's tempo (rules/beat.ts tempoRate: a knockdown's BPM speeds it), and a
// wave lands as it reaches the next stone. So a wave's gap is its link's length over that speed: no clamp, no hurry. Here: each
// link's length (m), the stretch of links the next wave's pulse runs (from the last stone reached through each of the next
// wave's stones in turn), and the pulse's speed.
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { routeOf } from "./party";
import { departureRoute, leyChain, type LeyStone } from "./leylines";
import { speakerCircle } from "./departure";

type P2 = readonly [number, number];

/** A polyline's length (m). */
export function polyLength(line: readonly P2[]): number {
  let L = 0;
  for (let i = 1; i < line.length; i++) L += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
  return L;
}

/** The pulse's speed (m/s) before the tempo: leyLines.pulseSpeed; 0 or less, no waves (the bedroom's "off"). */
export const pulseSpeed = (map: Pick<ForestMap, "tuning">): number => Math.max(0, map.tuning.leyLines?.pulseSpeed ?? 4);

/** The first link (the treehouse's front out to the first stone, rules/departure.ts) from where it comes on to the boot ring:
 *  the boot's pulse runs down to the ring and round it (rules/bootRing.ts), and the wave's takes over there. Its share of the
 *  link (0 to 1) and the rest's length (m). */
export function departureFromRing(map: ForestMap, line: readonly P2[]): { share: number; length: number } {
  const d = map.dancefloor, rho = speakerCircle(map), total = polyLength(line);
  let upTo = -1, L = 0;
  for (let i = 1; i < line.length; i++) {
    L += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
    if (upTo < 0 && Math.hypot(line[i][0] - d.x, line[i][1] - d.z) <= rho + 0.5) upTo = L;
  }
  const share = total > 0 && upTo >= 0 ? upTo / total : 0;
  return { share, length: total * (1 - share) };
}

const lengths = new WeakMap<object, Map<string, number>>();
const routeLinks = new WeakMap<object, Map<string, P2[]>>();
/** A link's length along the route (m): the route's own curve between two stones next to each other on it; from the
 *  treehouse, the departure from where it meets the boot ring; else (off the route: the noisy picker's) straight across. */
export function linkLength(map: ForestMap, a: LeyStone, b: LeyStone): number {
  const key = `${a.x},${a.z}>${b.x},${b.z}`;
  let m = lengths.get(map.dancefloor);
  if (!m) lengths.set(map.dancefloor, (m = new Map()));
  const hit = m.get(key);
  if (hit !== undefined) return hit;
  let L: number;
  if (a.depart) L = departureFromRing(map, departureRoute(map, b, map.tuning.leyLines?.depart?.avoid ?? 2, 2)).length;
  else {
    let links = routeLinks.get(map.dancefloor);
    if (!links) routeLinks.set(map.dancefloor, (links = new Map(routeOf(map).links.slice(1).map(l => [`${l[0][0]},${l[0][1]}>${l[l.length - 1][0]},${l[l.length - 1][1]}`, l]))));
    const l = links.get(key);
    L = l ? polyLength(l) : Math.hypot(b.x - a.x, b.z - a.z);
  }
  L = Math.max(1, L);
  m.set(key, L);
  return L;
}

/** The links the next wave's pulse runs, in metres: from the last stone reached to the first of the next wave's, and on
 *  through each of the others in turn (two witches, two stones a wave). Empty with no next stone. */
export function stretchLengths(p: PartyState, map: ForestMap): number[] {
  const n = Math.max(1, p.next?.length ?? 1), c = leyChain(p, map, n, 0), out: number[] = [];
  for (let k = c.current; k + 1 < c.stones.length && out.length < n; k++) out.push(linkLength(map, c.stones[k], c.stones[k + 1]));
  return out;
}

/** The route's length behind the last stone reached (m), from where the first link leaves the boot ring: where the pulse's
 *  run along the whole route starts each wave from. */
export function behindLength(p: PartyState, map: ForestMap): number {
  const c = leyChain(p, map, 0);
  let L = 0;
  for (let k = 0; k < c.current; k++) L += linkLength(map, c.stones[k], c.stones[k + 1]);
  return L;
}

/** Seconds the next wave's pulse takes along its stretch at `speed` m/s (a balance simulator's gap: rules/balance.ts, states.ts). */
export function stretchSeconds(p: PartyState, map: ForestMap, speed: number): number {
  const lens = stretchLengths(p, map);
  let L = 0;
  for (const l of lens) L += l;
  return speed > 0 && lens.length ? L / speed : Infinity; // (none past the route's last stone)
}

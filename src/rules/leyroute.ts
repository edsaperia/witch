// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"; before it,
// "Is it possible for the leylines to never have to cross? even if it means the route they describe
// is much longer"). With the route picker (party.picker "route", the default) the waves wake the
// areas in one order worked out once per map, here, and the line runs through all of them, home
// first: its first link the treehouse's departure curve (rules/departure.ts), the rest straight
// from stone to stone. The order: a spiral out from the dancefloor (party.route.spacing times the
// ring round home between its turns, starting at one of the ring's stones, due south first, where
// the departure curve heads), then untangled: any two links that cross have the stones between them
// reversed (2-opt), and a stone whose links still meet another's is moved to wherever its links
// cross fewest; of the starts, the one that crosses least (none, on every seed tried: a strong
// wish, not a rule). Seeded only by the map; no drawing here.
import type { ForestMap } from "./map";
import { departureRoute } from "./departure";
import { polylinesMeet, segmentsMeet, type P2 } from "./crossing";

export type { P2 };

export interface LeyRoute {
  /** The areas' keys in the order the waves wake them (home not among them). */
  order: string[];
  /** Each one's stone (its soundsystem's spot), in that order. */
  stones: P2[];
  /** links[i] runs into order[i]: links[0] the departure curve from the treehouse, the rest straight. */
  links: P2[][];
}

const ROUTES = new WeakMap<ForestMap, LeyRoute>();

/** The map's route, worked out once. */
export function leyRoute(map: ForestMap): LeyRoute {
  let r = ROUTES.get(map);
  if (!r) ROUTES.set(map, (r = planRoute(map)));
  return r;
}

function planRoute(map: ForestMap): LeyRoute {
  // The spiral may start at any of the stones round home (due south first, where the departure
  // curve heads): the one whose route crosses itself least, untangled.
  let best: LeyRoute | null = null, bestC = Infinity;
  for (let start = 0; start < 12 && bestC > 0; start++) {
    const r = planFrom(map, start);
    if (!r) break;
    const c = crossingsOf(r.links);
    if (c < bestC) { best = r; bestC = c; }
  }
  return best ?? { order: [], stones: [], links: [] };
}

const crossingsOf = (links: readonly (readonly P2[])[]) => {
  let c = 0;
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) c++;
  return c;
};

/** The route with the spiral starting at the `start`-th stone round home (by how far round from
 *  due south), or null if there's no such stone. */
function planFrom(map: ForestMap, start: number): LeyRoute | null {
  const home = `${map.centreCell[0]},${map.centreCell[1]}`, d = map.dancefloor;
  // A turn's spacing: the ring of areas round home's (their stones' distance from the dancefloor, on average).
  const ring = [...(map.neighbours.get(home) ?? [])].map(k => { const [x, y] = k.split(",").map(Number), q = map.soundsystemSpot(x, y); return Math.hypot(q.x - d.x, q.z - d.z); });
  const w = Math.max(1, (ring.length ? ring.reduce((a, b) => a + b, 0) / ring.length : map.areaSize) * (map.tuning.party.route?.spacing ?? 1));
  // The spiral: each stone's turn (its distance out, less how far round it is from due south, half a
  // turn in, so the ring round home is the first) and how far round.
  const all: { key: string; p: P2; s: number; round: number; r: number }[] = [];
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    const key = `${cx},${cy}`;
    if (key === home) continue;
    const q = map.soundsystemSpot(cx, cy), r = Math.hypot(q.x - d.x, q.z - d.z), round = (((Math.atan2(q.x - d.x, q.z - d.z) / (2 * Math.PI)) % 1) + 1) % 1;
    all.push({ key, p: [q.x, q.z], s: 0, round, r });
  }
  const first = all.filter(a => Math.floor(a.r / w - a.round - 0.5) <= 0).sort((a, b) => a.round - b.round)[start];
  if (!first) return null;
  for (const a of all) { const round = (a.round - first.round + 1) % 1; a.s = Math.max(0, Math.floor(a.r / w - round - 0.5)) + round; }
  all.sort((a, b) => a.s - b.s || (a.key < b.key ? -1 : 1));
  const st = all.map(a => a.p), keys = all.map(a => a.key), n = st.length;
  if (!n) return null;
  const D = map.tuning.leyLines.depart, depart = departureRoute(map, { x: st[0][0], z: st[0][1] }, D.past, D.avoid, 4) as P2[];
  // (The first stone stays first: the departure curve leads to it.)
  const swap = (i: number, j: number) => { for (; i < j; i++, j--) { [st[i], st[j]] = [st[j], st[i]]; [keys[i], keys[j]] = [keys[j], keys[i]]; } };
  const meets = (i: number, j: number) => (i === 0 ? polylinesMeet(depart, [st[j - 1], st[j]]) : segmentsMeet(st[i - 1], st[i], st[j - 1], st[j], j === i + 1));
  const twoOpt = () => {
    for (let pass = 0; pass < 200; pass++) {
      let changed = false;
      for (let i = 1; i < n; i++) for (let j = i + 2; j < n; j++) if (meets(i, j)) { swap(i, j - 1); changed = true; }
      if (!changed) return;
    }
  };
  twoOpt();
  // Then a stone at a crossing moved, while that helps: wherever the links it changes (into it, into
  // the stone after it, and into the one that followed it where it was) cross the fewest others.
  const crossingsAt = (idx: number[]) => {
    const set = [...new Set(idx.filter(i => i >= 0 && i < n))];
    let c = 0;
    for (const k of set) for (let i = 0; i < n; i++) if (i !== k && !(set.includes(i) && i < k) && meets(Math.min(i, k), Math.max(i, k))) c++;
    return c;
  };
  for (let round = 0; round < 8; round++) {
    let at = -1;
    for (let i = 0; i < n && at < 0; i++) for (let j = i + 1; j < n && at < 0; j++) if (meets(i, j)) at = j;
    if (at < 0) break;
    let moved = false;
    for (const k of [at, at - 1]) {
      if (k < 1 || moved) continue;
      const before = crossingsAt([k, k + 1]), sk = st[k], kk = keys[k], next = keys[k + 1];
      st.splice(k, 1); keys.splice(k, 1);
      let best = -1, bestC = before;
      for (let p = 1; p <= st.length; p++) {
        if (p === k) continue;
        st.splice(p, 0, sk); keys.splice(p, 0, kk);
        const c = crossingsAt([p, p + 1, next === undefined ? -1 : keys.indexOf(next)]);
        st.splice(p, 1); keys.splice(p, 1);
        if (c < bestC) { bestC = c; best = p; if (c === 0) break; }
      }
      st.splice(best >= 0 ? best : k, 0, sk); keys.splice(best >= 0 ? best : k, 0, kk);
      moved = best >= 0;
    }
    if (!moved) break;
    twoOpt();
  }
  const links: P2[][] = [depart];
  for (let i = 1; i < n; i++) links.push([st[i - 1], st[i]]);
  return { order: keys, stones: st, links };
}

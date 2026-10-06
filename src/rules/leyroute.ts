// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"; then "I
// thought the idea was to have no crossings?", and "Long spirals are okay, but ideally it shouldn't
// be just spirals"). With the route picker (party.picker "route", the default) the waves wake the
// areas in one order worked out once per map, here, and the line runs through all of them, home
// first: its first link the treehouse's departure curve (rules/departure.ts), the rest straight
// from stone to stone (drawn wandering a little, render/leylines.ts). The order starts as the noisy
// picker's (its lobes and wanderings, so no two maps' routes look alike) and is untangled: any two
// links that cross have the stones between them reversed (2-opt), and a stone whose links still
// meet another's is moved to wherever they cross fewest; nudged and untangled again until none
// cross. Seeded only by the map; no drawing here.
import type { ForestMap } from "./map";
import { departureRoute } from "./departure";
import { polylinesMeet, segmentsMeet, type P2 } from "./crossing";
import { rng } from "./random";

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

/** The map's route, worked out once: from `initial`, the order the waves would wake the areas in
 *  without it (the noisy picker's: its lobes and wanderings, so every map's differs), untangled;
 *  if it still crosses itself, the order nudged a little (a few neighbouring stones swapped, seeded)
 *  and untangled again, up to TRIES times, the least crossed kept (none, on every seed tried). */
export function leyRoute(map: ForestMap, initial: () => string[]): LeyRoute {
  let r = ROUTES.get(map);
  if (!r) ROUTES.set(map, (r = planRoute(map, initial())));
  return r;
}

const TRIES = 30;

function planRoute(map: ForestMap, order: string[]): LeyRoute {
  let best = untangle(map, order) ?? { order: [], stones: [], links: [] }, bestC = crossingsOf(best.links);
  const R = rng(map.seed * 4099 + 17);
  for (let t = 1; t <= TRIES && bestC > 0; t++) {
    const o = [...order];
    for (let k = 0; k < 3 + t; k++) { const i = 1 + Math.floor(R() * (o.length - 2)); [o[i], o[i + 1]] = [o[i + 1], o[i]]; }
    const r = untangle(map, o), c = r ? crossingsOf(r.links) : Infinity;
    if (r && c < bestC) { best = r; bestC = c; }
  }
  return best;
}

const crossingsOf = (links: readonly (readonly P2[])[]) => {
  let c = 0;
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) c++;
  return c;
};

/** A route through these areas in this order (home's not among them, the first kept first: the
 *  departure curve leads to it), untangled: wherever two links cross, the stones between them
 *  reversed (2-opt), then a stone at a crossing moved to wherever its links cross fewest. */
export function untangle(map: ForestMap, order: readonly string[]): LeyRoute | null {
  const keys = [...order], st = keys.map(k => { const [x, y] = k.split(",").map(Number), q = map.soundsystemSpot(x, y); return [q.x, q.z] as P2; }), n = st.length;
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

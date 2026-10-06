// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"; then "I
// thought the idea was to have no crossings?", and "Long spirals are okay, but ideally it shouldn't
// be just spirals"). With the route picker (party.picker "route", the default) the waves wake the
// areas in one order worked out once per map, here, and the line runs through all of them, home
// first: its first link the treehouse's departure curve (rules/departure.ts), the rest straight
// from stone to stone (drawn wandering a little, render/leylines.ts). The order starts varied
// (variedOrder; Ed, 2026-10-06: "mix in back-and-forth sweeps and lobes so maps aren't all
// spirals"): petals round home, then sweeps, lobes or combs, seeded; and is untangled: any two links
// that cross have the stones between them reversed (2-opt), and a stone whose links still meet
// another's is moved to wherever they cross fewest; nudged and untangled again until none cross.
// Crossings may stand within Ed's rules (CROSSING_RULES: at most 4, 12 waves apart, none in the
// first 12); past them, the noisy picker's order untangled instead. Seeded only by the map; no
// drawing here.
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
export function leyRoute(map: ForestMap, initial: () => string[], fallback?: () => string[]): LeyRoute {
  let r = ROUTES.get(map);
  if (!r) {
    r = planRoute(map, initial());
    if (fallback && !withinCrossingRules(r.links)) r = planRoute(map, fallback());
    ROUTES.set(map, r);
  }
  return r;
}

/** Ed's limits on crossings (2026-10-06: "A map can have at most four crossings, and the crossing lines
 *  must be from waves at least 12 apart, and not in the first 12 waves"): links[i] runs into the
 *  (i + 1)th wave's stone. */
export const CROSSING_RULES = { max: 4, gap: 12, first: 12 };
export function crossingPairs(links: readonly (readonly P2[])[]): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) out.push([i, j]);
  return out;
}
export function withinCrossingRules(links: readonly (readonly P2[])[]): boolean {
  const ps = crossingPairs(links);
  return ps.length <= CROSSING_RULES.max && ps.every(([i, j]) => j - i >= CROSSING_RULES.gap && i >= CROSSING_RULES.first);
}

/** A varied order to start from (Ed, 2026-10-06: "mix in back-and-forth sweeps and lobes so maps aren't
 *  all spirals"), seeded by the map: first petals round home (lobes: wedges of random width, out along
 *  one half and back along the other, to a random reach), then the rest of the map in a few sectors
 *  round it, each filled one of three ways: sweeps (back and forth round in bands, each band the other
 *  way), lobes (narrower petals), or a comb (out and back in, stepping round); which way round home it
 *  goes and where it starts, seeded too. */
export function variedOrder(map: ForestMap): string[] {
  const R = rng(map.seed * 6151 + 29), d = map.dancefloor, home = `${map.centreCell[0]},${map.centreCell[1]}`, TAU = Math.PI * 2;
  const wrap = (a: number) => ((a % TAU) + TAU) % TAU;
  type Pt = { k: string; r: number; a: number };
  const all: Pt[] = [];
  for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) {
    const k = `${x},${y}`;
    if (k === home) continue;
    const q = map.soundsystemSpot(x, y);
    all.push({ k, r: Math.hypot(q.x - d.x, q.z - d.z), a: Math.atan2(q.x - d.x, q.z - d.z) });
  }
  const near = all.filter(p => map.neighbours.get(home)?.has(p.k)), ring = near.length ? near.reduce((t, p) => t + p.r, 0) / near.length : map.areaSize;
  const a0 = R() * TAU, dir = R() < 0.5 ? 1 : -1, rel = (p: Pt) => (dir > 0 ? wrap(p.a - a0) : wrap(a0 - p.a));
  const out: string[] = [], used = new Set<string>();
  const take = (list: Pt[]) => { for (const p of list) if (!used.has(p.k)) { used.add(p.k); out.push(p.k); } };
  const petal = (ps: Pt[], from: number, w: number) => {
    const mid = from + w / 2, q = ps.filter(p => !used.has(p.k) && rel(p) >= from && rel(p) < from + w);
    take(q.filter(p => rel(p) < mid).sort((u, v) => u.r - v.r));
    take(q.filter(p => rel(p) >= mid).sort((u, v) => v.r - u.r));
  };
  // Petals round home.
  const inner = 1.4 + R() * 1.4;
  for (let at = 0; at < TAU - 0.3; ) {
    const w = Math.min(TAU - at, 0.6 + R() * 1.2), reach = ring * (inner + R() * 2.2);
    petal(all.filter(p => p.r <= reach), at, w);
    at += w;
  }
  // The rest, sector by sector.
  const sectors = 2 + Math.floor(R() * 3), bounds: number[] = [];
  for (let i = 0; i < sectors; i++) bounds.push((i / sectors) * TAU + (R() - 0.5) * 0.6);
  bounds.push(TAU);
  for (let i = 0; i < sectors; i++) {
    const lo = Math.max(0, bounds[i]), hi = bounds[i + 1], ps = all.filter(p => !used.has(p.k) && rel(p) >= lo && rel(p) < hi);
    if (!ps.length) continue;
    const kind = Math.floor(R() * 3);
    if (kind === 0) { // sweeps
      const band = ring * (0.9 + R() * 0.6), rmin = Math.min(...ps.map(p => p.r)), bands = new Map<number, Pt[]>();
      for (const p of ps) { const b = Math.floor((p.r - rmin) / band); let l = bands.get(b); if (!l) bands.set(b, (l = [])); l.push(p); }
      [...bands.keys()].sort((u, v) => u - v).forEach((b, j) => take(bands.get(b)!.sort((u, v) => (j % 2 ? rel(v) - rel(u) : rel(u) - rel(v)))));
    } else if (kind === 1) { // lobes
      for (let s = lo; s < hi - 1e-6; ) { const w = Math.min(hi - s, 0.3 + R() * 0.5); petal(ps, s, w); s += w; }
    } else { // a comb
      const step = 0.12 + R() * 0.12;
      for (let s = lo, j = 0; s < hi - 1e-6; s += step, j++) take(ps.filter(p => !used.has(p.k) && rel(p) >= s && rel(p) < s + step).sort((u, v) => (j % 2 ? v.r - u.r : u.r - v.r)));
    }
  }
  take(all.filter(p => !used.has(p.k)).sort((u, v) => rel(u) - rel(v)));
  return out;
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

// Where the challenge area goes, and the ley route kept off its circle (Ed, 2026-11-04: "The route should avoid going through the
// challenge area"; asked how, "ideally it should be on the edge, and far from the home area. Consider an elegant way of doing that").
// The map (rules/map.ts) takes the challenge area from the areas it may be (as before: never home or touching it, not a legend
// area's pair, not one whose going would cut the island in two), each asked three things, in this order:
//   1. on the edge: does it touch the buffer ring (the land past the playable areas, before the sea; not a lake, not a legend's
//      area)? Its circle is still kept inland, the buffer's depth from the sea (map.ts fitClaim);
//   2. clear of the route: does every straight line between two of the areas round it pass outside its circle and margin (and
//      PLACE.pad more)? The route runs stone to stone, mostly between neighbours, so a corner those lines go round is one the
//      route needn't cross;
//   3. far: is it at least PLACE.far of the way out from home to the island's farthest area (counted in areas crossed)?
// Those answering yes to more of them, in that order, come first, the night's seeded order among equals (so it still moves night to
// night); the first whose area holds its circle is taken (map.ts fitClaim). One that misses any is logged. The backstop: the route
// (rules/leyroute.ts) counts a link over the circle as PLACE.weight crossings, so its order goes round it where it can. No drawing.

/** far: the share of the way out (in areas crossed, home to the island's farthest area) from which an area counts as far (half: the
 *  island's outer half); pad: the clear test's metres past the circle's margin (a stone stands a few metres off its area's centre);
 *  swing: the route's backstop's (overChallenge) metres past the margin (the ley line curves off the straight line between stones
 *  by up to about this); weight: what a link over the circle costs the route's untangling, in crossings. */
export const PLACE = { far: 0.5, pad: 10, swing: 25, weight: 4 };

/** How near straight line a-b comes to point p (m). */
export function lineGap(p: readonly [number, number], a: readonly [number, number], b: readonly [number, number]): number {
  const vx = b[0] - a[0], vz = b[1] - a[1], l2 = vx * vx + vz * vz || 1, t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vz) / l2));
  return Math.hypot(a[0] + vx * t - p[0], a[1] + vz * t - p[1]);
}

/** What the map knows when it chooses: home's key, the playable areas (home among them), which touch which, the lakes, the legend
 *  areas, each area's site (its centre, m) and the circle's clearing (its radius and margin, m). */
export interface PlaceAsk {
  home: string;
  playable: ReadonlySet<string>;
  neighbours: ReadonlyMap<string, ReadonlySet<string>>;
  lakes: ReadonlySet<string>;
  legends: ReadonlySet<string>;
  site: (k: string) => { x: number; z: number };
  clear: number;
}
/** A candidate's answers: on the edge, clear of the route, far; and how many areas out from home it is. */
export interface Placing { key: string; edge: boolean; clear: boolean; far: boolean; steps: number }

/** The candidates (keys, in the night's seeded order), each asked the three questions, those answering yes to more first (edge,
 *  then clear, then far), the seeded order kept among equals. */
export function placeChallenge(cands: readonly string[], ask: PlaceAsk): Placing[] {
  const steps = new Map([[ask.home, 0]]), todo = [ask.home];
  for (let i = 0; i < todo.length; i++) for (const q of ask.neighbours.get(todo[i]) ?? []) if (ask.playable.has(q) && !steps.has(q)) { steps.set(q, steps.get(todo[i])! + 1); todo.push(q); }
  const most = Math.max(0, ...steps.values());
  const out = cands.map((key): Placing => {
    const nb = [...(ask.neighbours.get(key) ?? [])], s = ask.site(key), p: [number, number] = [s.x, s.z];
    const edge = nb.some(q => !ask.playable.has(q) && !ask.lakes.has(q) && !ask.legends.has(q));
    const round = nb.filter(q => q !== ask.home && ask.playable.has(q)).map((q): [number, number] => { const o = ask.site(q); return [o.x, o.z]; });
    let clear = true;
    for (let i = 0; i < round.length && clear; i++) for (let j = i + 1; j < round.length; j++) if (lineGap(p, round[i], round[j]) < ask.clear + PLACE.pad) { clear = false; break; }
    const st = steps.get(key) ?? 0;
    return { key, edge, clear, far: st >= most * PLACE.far, steps: st };
  });
  const rank = (q: Placing) => (q.edge ? 4 : 0) + (q.clear ? 2 : 0) + (q.far ? 1 : 0);
  return out.sort((a, b) => rank(b) - rank(a));
}

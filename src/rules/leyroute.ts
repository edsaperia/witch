// The ley line's route never crosses itself (Ed, 2026-10-06: "Is it possible for the leylines to
// never have to cross? even if it means the route they describe is much longer"). The route runs
// through the runestones in the order the waves wake them (home first, then each area in the order
// it joined the party, rules/party.ts): its first link the treehouse's departure curve
// (rules/departure.ts), the rest straight from stone to stone. The line shows only a few links at
// once (leyLines.ahead + behind), so it's those that must never meet: each link keeps clear of the
// ones before it that it's ever shown with (older ones, no longer drawn, it may pass over). The wave
// picker (party.ts) chooses areas the line can reach straight that way, with a way on from them;
// when none can, the link bends round the links it's shown with (the shortest way round them) and
// render/leylines.ts draws it along that. Worked out once per route and kept; no drawing here.
import type { ForestMap } from "./map";
import { departureRoute } from "./departure";
import { polylinesMeet, type P2 } from "./crossing";

export type { P2 };

/** How far round a link's corner a bent link passes (m). */
const CLEAR = 10;
/** How far a straight link keeps from the stones of the links it's shown with (but its own ends),
 *  so it never seems to run through one (m). */
const STONE_CLEAR = 20;
const distToSegment = (p: P2, a: P2, b: P2) => {
  const dx = b[0] - a[0], dz = b[1] - a[1], l2 = dx * dx + dz * dz, t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / l2)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dz);
};

const keyOf = (c: readonly [number, number]) => `${c[0]},${c[1]}`;
const SPOTS = new WeakMap<ForestMap, Map<string, P2>>();
/** Where an area's runestone (its soundsystem) stands. */
export function stoneAt(map: ForestMap, key: string): P2 {
  let m = SPOTS.get(map);
  if (!m) SPOTS.set(map, (m = new Map()));
  let s = m.get(key);
  if (!s) { const [x, y] = key.split(",").map(Number), p = map.soundsystemSpot(x, y); m.set(key, (s = [p.x, p.z])); }
  return s;
}

const NEAREST = new WeakMap<ForestMap, Map<string, string[]>>();
/** Every other area's key, nearest `key`'s stone first (worked out once per map). */
function nearestTo(map: ForestMap, key: string, keys: readonly string[]): string[] {
  let m = NEAREST.get(map);
  if (!m) NEAREST.set(map, (m = new Map()));
  let out = m.get(key);
  if (!out) {
    const c = stoneAt(map, key), d = (k: string) => { const s = stoneAt(map, k); return Math.hypot(s[0] - c[0], s[1] - c[1]); };
    m.set(key, (out = keys.filter(k => k !== key).map(k => [k, d(k)] as const).sort((a, b) => a[1] - b[1]).map(e => e[0])));
  }
  return out;
}

/** How many links before one it's ever shown with (the line shows ahead + behind of them). */
export const shownWith = (map: ForestMap) => Math.max(1, map.tuning.leyLines.ahead + map.tuning.leyLines.behind);

const clearOf = (links: readonly (readonly P2[])[], link: readonly P2[]) => !links.some(l => polylinesMeet(l, link));

/** The link from `a` to `b` after `links`: straight if that meets none of the last `shownWith` of
 *  them, else the shortest way round them (passing CLEAR metres off their corners), or straight if
 *  there's none (never: a line that doesn't cross itself never closes a loop). */
export function linkOnto(map: ForestMap, links: readonly (readonly P2[])[], a: P2, b: P2): P2[] {
  const straight: P2[] = [a, b], near = links.slice(-shownWith(map));
  if (clearOf(near, straight)) return straight;
  // The corners to pass: every point of the links near (the departure curve's every few), a ring of
  // eight round each; the shortest way from a to b through them that meets none of the links
  // (passing closer where the gaps are narrow, each ring turned a little from the last).
  for (let k = 0; k < 5; k++) {
    const way = shortestRound(near, a, b, CLEAR / 3 ** k, k * 0.37);
    if (way) return way;
  }
  return straight;
}

function shortestRound(near: readonly (readonly P2[])[], a: P2, b: P2, r: number, turn: number): P2[] | null {
  const nodes: P2[] = [a];
  for (const l of near) l.forEach((p, i) => { if (l.length > 12 && i % 3 && i !== l.length - 1) return; for (let k = 0; k < 8; k++) nodes.push([p[0] + r * Math.cos((k * Math.PI) / 4 + turn), p[1] + r * Math.sin((k * Math.PI) / 4 + turn)]); });
  nodes.push(b);
  // (A*: the nearest way so far plus the straight distance on to b, first.)
  const n = nodes.length, dist = new Float64Array(n).fill(Infinity), prev = new Int32Array(n).fill(-1), done = new Uint8Array(n);
  const h = nodes.map(q => Math.hypot(b[0] - q[0], b[1] - q[1]));
  dist[0] = 0;
  for (;;) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!done[i] && dist[i] < Infinity && (u < 0 || dist[i] + h[i] < dist[u] + h[u])) u = i;
    if (u < 0 || u === n - 1) break;
    done[u] = 1;
    for (let v = 1; v < n; v++) {
      if (done[v]) continue;
      const d = dist[u] + Math.hypot(nodes[v][0] - nodes[u][0], nodes[v][1] - nodes[u][1]);
      if (d < dist[v] && clearOf(near, [nodes[u], nodes[v]])) { dist[v] = d; prev[v] = u; }
    }
  }
  if (prev[n - 1] < 0) return null;
  const out: P2[] = [];
  for (let v = n - 1; v >= 0; v = prev[v]) out.unshift(nodes[v]);
  return out;
}

/** Links worked out from a route's end, by its last link (each route's own) and the area they go to. */
const ONTO = new WeakMap<readonly P2[], Map<string, P2[]>>();
function linkFrom(map: ForestMap, links: readonly P2[][], a: P2, key: string): P2[] {
  const lastLink = links[links.length - 1];
  let m = ONTO.get(lastLink);
  if (!m) ONTO.set(lastLink, (m = new Map()));
  let l = m.get(key);
  if (!l) m.set(key, (l = linkOnto(map, links, a, stoneAt(map, key))));
  return l;
}

interface Node { link: P2[]; next: Map<string, Node> }
const TRIES = new WeakMap<ForestMap, Node>();

/** The route's links through these areas in order (home's key first, then each area's, the order
 *  they joined the party): links[i] runs into keys[i + 1]. Worked out once per route (kept by prefix). */
export function routeLinks(map: ForestMap, keys: Iterable<string>): P2[][] {
  let node: Node | undefined = TRIES.get(map);
  if (!node) TRIES.set(map, (node = { link: [], next: new Map() }));
  const home = keyOf(map.centreCell), links: P2[][] = [];
  let last: P2 | null = null;
  for (const k of keys) {
    if (k === home) continue;
    const to = stoneAt(map, k);
    let child: Node | undefined = node.next.get(k);
    if (!child) {
      const D = map.tuning.leyLines.depart;
      const link = !last ? (departureRoute(map, { x: to[0], z: to[1] }, D.past, D.avoid, 4) as P2[]) : map.tuning.party.uncrossed ? linkFrom(map, links, last, k) : [last, to];
      node.next.set(k, (child = { link, next: new Map() }));
    }
    links.push(child.link);
    node = child; last = to;
  }
  return links;
}

/** The wave picker's tests (party.ts) for an area the route could go to next, after `links` ending
 *  at `end` (null: none yet), best first: its straight link meets none of the links it's ever shown
 *  with (best keeping STONE_CLEAR off their stones too), and there's a way on from it after (some
 *  other dormant area its next link could reach straight the same way, so the line never walks into
 *  a pocket of its own links), unless it's the last area; else its link bent round those (linkOnto)
 *  meets none of them. */
export function uncrossedTests(map: ForestMap, links: readonly P2[][], end: P2 | null, dormant: readonly { key: string }[], all: readonly { key: string }[]): ((key: string) => boolean)[] {
  if (!end) return [() => true]; // (the first link, the departure curve: nothing before it to cross)
  const open = new Set(dormant.map(d => d.key)), keys = all.map(c => c.key);
  const back = shownWith(map);
  const straight = (away: number) => (key: string) => {
    const c = stoneAt(map, key), link: P2[] = [end, c], before = links.slice(-back);
    if (!clearOf(before, link)) return false;
    for (const l of before) { const s = l[l.length - 1]; if (s !== end && distToSegment(s, end, c) < away) return false; }
    if (open.size <= 1) return true;
    const after = [...links, link].slice(-back);
    for (const d of nearestTo(map, key, keys)) if (open.has(d) && clearOf(after, [c, stoneAt(map, d)])) return true;
    return false;
  };
  // Last, any it can reach bent round the links it's shown with (linkOnto): a few, it costs more.
  let tries = 0;
  const bent = (key: string) => ++tries <= BENT_TRIES && clearOf(links.slice(-back), linkFrom(map, links, end, key));
  return [straight(STONE_CLEAR), straight(0), bent];
}

/** How many areas the last test tries a pick (bending round is the dear one). */
const BENT_TRIES = 4;

// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a line from the last runestone reached on to the
// next objectives, the next areas in the order the waves wake them, and back through the stones
// reached before it (Ed, 2026-10-05: "six sections long, showing the next three and the past three
// runestones": leyLines.ahead and behind).
// A stone is reached when its area's wave arrives or its quest is done (onAreaDone), whichever
// comes first, and the line moves on to the next one not yet reached. The order is the party's
// own (party.ts): the next and after-next waves are already planned there, and the waves after
// them are what the same seeded picker will choose once those have woken, so the line shows what
// will happen, not a guess. Drawing them is render/leylines.ts.
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { cellKey, pickSet, type PartyState, type Partified } from "./party";
import { routeLinks } from "./leyroute";
export { departureClear, departureRoute } from "./departure";

export interface LeyStone { cell: Cell; x: number; z: number; /** The wave that wakes (or woke) it: 0 home. */ wave: number; /** Home's start (Ed, 2026-10-05): the line leaves from the treehouse's front, setting off due south. */ depart?: boolean;
  /** The bends of the link into this stone from the one before it, when it can't run straight without meeting the links it's shown with (rules/leyroute.ts; Ed, 2026-10-06: the line never crosses itself). */
  via?: [number, number][] }

/** Where a stone stands: an area's soundsystem spot; home's, the treehouse's front (Ed, 2026-10-05:
 *  "The start of the first leyline should go from the front of the treehouse"), the line leaving it
 *  due south (departureRoute). */
function stoneOf(map: ForestMap, cell: Cell, wave: number): LeyStone {
  if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) return { cell, x: map.treehouseFront.x, z: map.treehouseFront.z, wave, depart: true };
  const s = map.soundsystemSpot(cell[0], cell[1]);
  return { cell, x: s.x, z: s.z, wave };
}

/** An area's quest is done (the hook for rules/quest.ts): its stone is reached, so the line moves
 *  on from it to the next objective, without waiting for its wave. */
export function onAreaDone(p: PartyState, cell: Cell, time: number): void {
  const k = cellKey(cell);
  if (p.areas.has(k)) return; // its wave came first
  (p.leyDone ??= new Map()).set(k, time);
}

/** The chain (Ed, 2026-10-05: "six sections long, showing the next three and the past three
 *  runestones"): the stones in wave order, `behind` of those reached before the last one reached,
 *  that last one (home before anything else), and `ahead` of the next ones not yet reached; fewer
 *  where the run or the map runs out. `current` is the last reached one's place in `stones`: the
 *  sections before it are behind her, the ones after it ahead. */
export function leyChain(p: PartyState, map: ForestMap, ahead: number, behind = 0): { stones: LeyStone[]; current: number } {
  const done = p.leyDone ?? new Map<string, number>();
  const reached = (k: string) => p.areas.has(k) || done.has(k);
  // The stones reached, in the order they were: woken (by its wave) or done (by its quest), the
  // earlier of the two; home first.
  const home = cellKey(map.centreCell), past = new Map<string, { s: LeyStone; at: number }>([[home, { s: stoneOf(map, map.centreCell, 0), at: -Infinity }]]);
  for (const a of p.areas.values()) { const k = cellKey(a.cell); if (k !== home) past.set(k, { s: stoneOf(map, a.cell, a.wave), at: a.at }); }
  for (const [k, t] of done) {
    const was = past.get(k);
    if (!was || t < was.at) { const [x, y] = k.split(",").map(Number); past.set(k, { s: stoneOf(map, [x, y], was?.s.wave ?? p.wave + 1), at: t }); }
  }
  const order = [...past.values()].sort((u, v) => u.at - v.at || u.s.wave - v.s.wave).map(u => u.s);
  const back = order.slice(Math.max(0, order.length - 1 - Math.max(0, behind))), last = back[back.length - 1];
  const out: LeyStone[] = [], seen = new Set([cellKey(last.cell)]);
  // The waves to come: next and after-next as planned, then the picker run on from there.
  let v: PartyState = p, wave = p.wave;
  const wake = (set: Cell[]): PartyState => {
    const areas = new Map<string, Partified>(v.areas);
    for (const c of set) areas.set(cellKey(c), { cell: c, wave: wave + 1, at: 0, from: null, soundsystem: null });
    return { ...v, areas, wave: wave + 1, last: set[set.length - 1] };
  };
  for (let k = 0; out.length < ahead && k < ahead + 8; k++) {
    const set = k === 0 ? p.next : k === 1 && p.afterNext.length ? p.afterNext : pickSet(v, map, p.areasPerWave);
    if (!set.length) break;
    for (const c of set) {
      const key = cellKey(c);
      if (!reached(key) && !seen.has(key)) { seen.add(key); out.push(stoneOf(map, c, wave + 1)); }
    }
    v = wake(set); wave++;
  }
  const stones = [...back, ...out.slice(0, Math.max(0, ahead))];
  // The bends (party.uncrossed): the route's links, in the order its areas joined the party and will.
  if (map.tuning.party.uncrossed) {
    // (keys[0] is home's, so links[j - 1] runs into keys[j].)
    const keys = [...p.areas.keys(), ...out.map(s => cellKey(s.cell))], links = routeLinks(map, keys), at = new Map(keys.map((k, i) => [k, i]));
    for (let i = 1; i < stones.length; i++) {
      const j = at.get(cellKey(stones[i].cell)), link = j && keys[j - 1] === cellKey(stones[i - 1].cell) ? links[j - 1] : undefined;
      if (link && link.length > 2 && !stones[i - 1].depart) stones[i] = { ...stones[i], via: link.slice(1, -1).map(q => [q[0], q[1]]) };
    }
  }
  return { stones, current: back.length - 1 };
}

/** A key that changes whenever the chain would (a wave, the plan, a quest done): to know when to redraw it. */
export function leyKey(p: PartyState): string {
  return `${p.wave}|${p.next.map(cellKey).join(";")}|${p.afterNext.map(cellKey).join(";")}|${p.areasPerWave}|${p.ruined?.size ?? 0}|${[...(p.leyDone?.keys() ?? [])].join(";")}`;
}

// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a line through every wave's runestone in the
// order the waves wake them, home first, the stones already reached and those to come (Ed,
// 2026-10-06: "I think the leylines should cover the entire set of waves the whole time"; before
// it, six sections, the next three and the past three). The route picker (rules/leyroute.ts) keeps
// it from crossing itself.
// A stone is reached when its area's wave arrives or its quest is done (onAreaDone), whichever
// comes first (an area cleared before its wave isn't: the line and its pulse keep their pace; waveReached), and the line moves on to the next one not yet reached. The order is the party's
// own (party.ts): the next and after-next waves are already planned there, and the waves after
// them are what the same seeded picker will choose once those have woken, so the line shows what
// will happen, not a guess. Drawing them is render/leylines.ts.
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { cellKey, wavePlan, type PartyState } from "./party";
export { departureClear, departureRoute } from "./departure";

export interface LeyStone { cell: Cell; x: number; z: number; /** The wave that wakes (or woke) it: 0 home. */ wave: number; /** Home's start (Ed, 2026-10-05): the line leaves from the treehouse's front, setting off due south. */ depart?: boolean;
}

/** Where a stone stands: an area's soundsystem spot; home's, the treehouse's front (Ed, 2026-10-05:
 *  "The start of the first leyline should go from the front of the treehouse"), the line leaving it
 *  due south (departureRoute). */
function stoneOf(map: ForestMap, cell: Cell, wave: number): LeyStone {
  if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) return { cell, x: map.treehouseFront.x, z: map.treehouseFront.z, wave, depart: true };
  const s = map.soundsystemSpot(cell[0], cell[1]);
  return { cell, x: s.x, z: s.z, wave };
}

/** When the line reached an area's stone by its wave: the wave's time; undefined while its wave is still to come, even if
 *  the area was cleared early (Ed, 2026-10-08: clearing an area transforms its runestone at once, but the pulse keeps its
 *  own pace along the route; its wave, when it comes, only celebrates: party.ts `ahead`, the same as its passed()). Kept
 *  when its soundsystem is lost since (the area ruined, gone from `areas`): the line still went through its stone.
 *  (`waveReached` is each wave's own record, party.ts spreadWave; an area partified another way, the arena's or a test's,
 *  falls back on its own record.) */
export function waveReached(p: PartyState, key: string): number | undefined {
  const w = p.waveReached?.get(key);
  if (w) return w.at;
  const a = p.areas.get(key);
  if (!a || p.ahead?.has(key)) return undefined;
  return a.celebrated ?? a.at;
}

/** An area's quest is done (the hook for rules/quest.ts): its stone is reached, so the line moves
 *  on from it to the next objective, without waiting for its wave. */
export function onAreaDone(p: PartyState, cell: Cell, time: number): void {
  const k = cellKey(cell);
  if (p.areas.has(k)) return; // its wave came first
  (p.leyDone ??= new Map()).set(k, time);
}

/** The chain (Ed, 2026-10-06: the whole route; `ahead` and `behind` cut it to fewer, for tests):
 *  the stones in wave order, `behind` of those reached before the last one reached, that last one
 *  (home before anything else), and `ahead` of the next ones not yet reached. `current` is the last reached one's place in `stones`: the
 *  sections before it are behind her, the ones after it ahead. */
export function leyChain(p: PartyState, map: ForestMap, ahead = Infinity, behind = Infinity): { stones: LeyStone[]; current: number } {
  const done = p.leyDone ?? new Map<string, number>();
  const reached = (k: string) => waveReached(p, k) !== undefined || done.has(k); // (cleared early isn't reached: waveReached)
  // The stones reached, in the order they were: woken (by its wave) or done (by its quest), the
  // earlier of the two; home first.
  const home = cellKey(map.centreCell), past = new Map<string, { s: LeyStone; at: number }>([[home, { s: stoneOf(map, map.centreCell, 0), at: -Infinity }]]);
  for (const a of p.areas.values()) { const k = cellKey(a.cell), at = waveReached(p, k); if (k !== home && at !== undefined) past.set(k, { s: stoneOf(map, a.cell, a.wave), at }); }
  for (const [k, w] of p.waveReached ?? []) if (k !== home && !past.has(k)) { const [x, y] = k.split(",").map(Number); past.set(k, { s: stoneOf(map, [x, y], w.wave), at: w.at }); } // (ruined since: still on the line)
  for (const [k, t] of done) {
    const was = past.get(k);
    if (!was || t < was.at) { const [x, y] = k.split(",").map(Number); past.set(k, { s: stoneOf(map, [x, y], was?.s.wave ?? p.wave + 1), at: t }); }
  }
  const order = [...past.values()].sort((u, v) => u.at - v.at || u.s.wave - v.s.wave).map(u => u.s);
  const back = order.slice(Math.max(0, order.length - 1 - Math.max(0, behind))), last = back[back.length - 1];
  // The waves to come, in the order the picker will choose them (wavePlan: next, after-next and on).
  const out: LeyStone[] = [];
  // (One or two ahead, as the pulse asks every frame: the next and after-next as planned, without planning on.)
  const plan: Iterable<[string, number]> = ahead <= 2 ? [...p.next.map(c => [cellKey(c), p.wave + 1] as [string, number]), ...p.afterNext.map(c => [cellKey(c), p.wave + 2] as [string, number])] : wavePlan(p, map);
  if (ahead > 0) for (const [key, wave] of plan) {
    if (out.length >= ahead) break;
    if (!reached(key) && key !== cellKey(last.cell)) { const [x, y] = key.split(",").map(Number); out.push(stoneOf(map, [x, y], wave)); }
  }
  const stones = [...back, ...out];
  return { stones, current: back.length - 1 };
}

/** A key that changes whenever the chain would (a wave, the plan, a quest done): to know when to redraw it. */
export function leyKey(p: PartyState): number {
  // (A number, worked out every frame without allocating: Ed, 2026-10-06, the whole line must stay cheap.)
  let h = p.wave * 131 + p.areasPerWave * 7 + (p.ruined?.size ?? 0) * 1009 + (p.leyDone?.size ?? 0) * 7919 + p.areas.size * 50021; // (areas: one cleared before its wave is reached at once)
  for (const c of p.next) h = (Math.imul(h, 31) + c[0] * 97 + c[1]) | 0;
  for (const c of p.afterNext) h = (Math.imul(h, 31) + c[0] * 97 + c[1]) | 0;
  return h;
}

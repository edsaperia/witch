// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a line from the last runestone reached to the
// next objective, the next area in the order the waves wake them (and, if asked for, a few after).
// A stone is reached when its area's wave arrives or its quest is done (onAreaDone), whichever
// comes first, and the line moves on to the next one not yet reached. The order is the party's
// own (party.ts): the next and after-next waves are already planned there, and the waves after
// them are what the same seeded picker will choose once those have woken, so the line shows what
// will happen, not a guess. Drawing them is render/leylines.ts.
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { cellKey, pickSet, type PartyState, type Partified } from "./party";

export interface LeyStone { cell: Cell; x: number; z: number; /** The wave that wakes (or woke) it: 0 home. */ wave: number }

/** Where a stone stands: an area's soundsystem spot, or home's dancefloor. */
function stoneOf(map: ForestMap, cell: Cell, wave: number): LeyStone {
  if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) return { cell, x: map.dancefloor.x, z: map.dancefloor.z, wave };
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

/** The stones in wave order, `count` of them (count - 1 links): the last one reached (home before
 *  anything else), then the next ones not yet reached. Fewer if the map runs out. */
export function leyChain(p: PartyState, map: ForestMap, count: number): LeyStone[] {
  const done = p.leyDone ?? new Map<string, number>();
  const reached = (k: string) => p.areas.has(k) || done.has(k);
  // The last reached: the latest woken (by its wave) or done (by its quest).
  let last: LeyStone = stoneOf(map, map.centreCell, 0), at = -Infinity;
  for (const a of p.areas.values()) if (a.at > at || (a.at === at && a.wave > last.wave)) { at = a.at; last = stoneOf(map, a.cell, a.wave); }
  for (const [k, t] of done) if (t > at) { at = t; const [x, y] = k.split(",").map(Number); last = stoneOf(map, [x, y], p.wave + 1); }
  const out: LeyStone[] = [last], seen = new Set([cellKey(last.cell)]);
  // The waves to come: next and after-next as planned, then the picker run on from there.
  let v: PartyState = p, wave = p.wave;
  const wake = (set: Cell[]): PartyState => {
    const areas = new Map<string, Partified>(v.areas);
    for (const c of set) areas.set(cellKey(c), { cell: c, wave: wave + 1, at: 0, from: null, soundsystem: null });
    return { ...v, areas, wave: wave + 1, last: set[set.length - 1] };
  };
  for (let k = 0; out.length < count && k < count + 8; k++) {
    const set = k === 0 ? p.next : k === 1 && p.afterNext.length ? p.afterNext : pickSet(v, map, p.areasPerWave);
    if (!set.length) break;
    for (const c of set) {
      const key = cellKey(c);
      if (!reached(key) && !seen.has(key)) { seen.add(key); out.push(stoneOf(map, c, wave + 1)); }
    }
    v = wake(set); wave++;
  }
  return out.slice(0, count);
}

/** A key that changes whenever the chain would (a wave, the plan, a quest done): to know when to redraw it. */
export function leyKey(p: PartyState): string {
  return `${p.wave}|${p.next.map(cellKey).join(";")}|${p.afterNext.map(cellKey).join(";")}|${p.areasPerWave}|${p.ruined?.size ?? 0}|${[...(p.leyDone?.keys() ?? [])].join(";")}`;
}

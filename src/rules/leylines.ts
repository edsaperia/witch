// The ley lines (Ed, 2026-10-04): a chain through the runestones in the order the waves wake them,
// from the previous wave's stone, through the current one, to the next and on. The order is the
// party's own (party.ts): the next and after-next waves are already planned there, and the waves
// after them are what the same seeded picker will choose once those have woken, so the chain
// shows what will happen, not a guess. Drawing them is render/leylines.ts.
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

/** The stones in wave order, `count` of them (count - 1 links): the previous wave's, the current
 *  one's (home before the first wave), then the waves to come. Fewer if the map runs out. */
export function leyChain(p: PartyState, map: ForestMap, count: number): LeyStone[] {
  const out: LeyStone[] = [];
  const woken = (w: number) => [...p.areas.values()].filter(a => a.wave === w).sort((a, b) => a.at - b.at);
  for (const w of [p.wave - 1, p.wave]) if (w >= 0) for (const a of woken(w)) out.push(stoneOf(map, a.cell, w));
  // The waves to come: next and after-next as planned, then the picker run on from there.
  let v: PartyState = p, wave = p.wave;
  const wake = (set: Cell[]): PartyState => {
    const areas = new Map<string, Partified>(v.areas);
    for (const c of set) areas.set(cellKey(c), { cell: c, wave: wave + 1, at: 0, from: null, soundsystem: null });
    return { ...v, areas, wave: wave + 1, last: set[set.length - 1] };
  };
  for (let k = 0; out.length < count + 8 && k < count; k++) {
    const set = k === 0 ? p.next : k === 1 && p.afterNext.length ? p.afterNext : pickSet(v, map, p.areasPerWave);
    if (!set.length) break;
    for (const c of set) out.push(stoneOf(map, c, wave + 1));
    v = wake(set); wave++;
  }
  // Start at the previous wave's stone, or as far back as there is.
  return out.slice(0, count);
}

/** A key that changes whenever the chain would (a wave, the plan): to know when to redraw it. */
export function leyKey(p: PartyState): string {
  return `${p.wave}|${p.next.map(cellKey).join(";")}|${p.afterNext.map(cellKey).join(";")}|${p.areasPerWave}|${p.ruined?.size ?? 0}`;
}

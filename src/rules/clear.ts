// Clearing an area (Ed, 2026-10-07: his new core design): an area none of whose own wild creatures is left (every one of
// them invited, or run off) transforms its runestone at once, as its wave would: its soundsystem rises, its babies turn
// happy and dance (its legend circle's too), a party witch comes, its music plays and the ley line counts its stone as
// reached (all of which follow from its being partified: rules/party.ts clearArea, game.ts stepFights). Its sleeping
// legend and the wild baby in its legend's circle don't count. Its wave, when it comes, changes nothing in the rules: it
// only celebrates (rules/party.ts spreadWave). No drawing here.
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import type { PartyState } from "./party";

/** Whether a creature keeps its home area from being cleared: one of its own, not leashed, not happy (wild or enraged),
 *  still about (not gone, not running off for good); never its legend or the wild baby in its legend's circle. */
export function holdsArea(c: Creature): boolean {
  if (c.gone || c.leashed || c.boss || c.circle || c.fleeUntil === Infinity) return false;
  return c.state !== "happy" && c.legendState !== "happy";
}

/** The map's cells numbered (by `cx * 65536 + cy` offset into the positive), worked out once a map. */
const INDEX = new WeakMap<ForestMap, { of: Map<number, number>; keys: string[]; cells: [number, number][] }>();
const cellNo = (cx: number, cy: number) => (cx + 32768) * 65536 + (cy + 32768);
function indexOf(map: ForestMap) {
  let ix = INDEX.get(map);
  if (!ix) {
    ix = { of: new Map(), keys: [], cells: [] };
    for (const [cx, cy] of map.cells) { ix.of.set(cellNo(cx, cy), ix.keys.length); ix.keys.push(`${cx},${cy}`); ix.cells.push([cx, cy]); }
    INDEX.set(map, ix);
  }
  return ix;
}

let counts = new Int32Array(0); // (kept from look to look: no allocation a step)

/** The areas cleared now: not home, not partified, not ruined, and none of their own creatures holding them (holdsArea).
 *  Without allocating per creature (a late game's thousands, a few times a second). */
export function clearedAreas(p: PartyState, map: ForestMap, creatures: readonly Creature[]): [number, number][] {
  const ix = indexOf(map), n = ix.keys.length;
  if (counts.length < n) counts = new Int32Array(n);
  counts.fill(0, 0, n);
  for (const c of creatures) {
    if (!holdsArea(c)) continue;
    const i = ix.of.get(cellNo(c.cell[0], c.cell[1]));
    if (i !== undefined) counts[i]++;
  }
  const out: [number, number][] = [], [hx, hy] = map.centreCell;
  for (let i = 0; i < n; i++) {
    if (counts[i] > 0) continue;
    const cell = ix.cells[i], key = ix.keys[i];
    if ((cell[0] === hx && cell[1] === hy) || p.areas.has(key) || p.ruined?.has(key)) continue;
    out.push(cell);
  }
  return out;
}

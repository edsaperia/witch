// Clearing an area (Ed, 2026-10-07: his new core design): an area none of whose own wild creatures is left (every one of
// them invited, or run off) transforms its runestone at once, as its wave would: its soundsystem rises, its babies turn
// happy and dance (its legend circle's too), a party witch comes, its music plays and the ley line counts its stone as
// reached (all of which follow from its being partified: rules/party.ts clearArea, game.ts stepFights). Its sleeping
// legend and the wild baby in its legend's circle don't count. Only an area's natives count, wherever they've wandered (Ed, 2026-10-07: visitors from next door
// "wouldn't get enraged when the runestone transforms"): a creature belongs to its own area (c.cell), never to where it stands. Its wave, when it comes, changes nothing in the rules: it
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

/** An area's own creatures still holding it (holdsArea): what she must yet invite, or see run off, to clear it. */
export function wildLeft(creatures: readonly Creature[], cell: readonly [number, number]): Creature[] {
  const out: Creature[] = [];
  for (const c of creatures) if (c.cell[0] === cell[0] && c.cell[1] === cell[1] && holdsArea(c)) out.push(c);
  return out;
}

/** The wild area a witch at (x, z) is in, if clearing it would transform its runestone (not home, not partified or
 *  ruined): its cell, else null. */
export function clearableAt(p: PartyState, map: ForestMap, x: number, z: number): [number, number] | null {
  const cell = map.cellSafe(x, z).cell, key = `${cell[0]},${cell[1]}`, [hx, hy] = map.centreCell;
  if ((cell[0] === hx && cell[1] === hy) || p.areas.has(key) || p.ruined?.has(key)) return null;
  return [cell[0], cell[1]];
}

/** What the HUD says of the wild area she's in (Ed's playtest, 2026-10-07: "When I invite all the animals in an area ... the
 *  soundsystem doesn't transform": some of its own were out of sight, asleep or lying knocked down): how many of its own
 *  still hold it, of them asleep and dazed (lying knocked down, still to invite or to run off), and the words. */
export function clearCue(left: readonly Creature[]): { n: number; asleep: number; dazed: number; text: string } {
  let asleep = 0, dazed = 0;
  for (const c of left) { if (c.asleep) asleep++; if (c.dazed) dazed++; }
  const n = left.length, extra = [asleep ? `${asleep} asleep` : "", dazed ? `${dazed} knocked down` : ""].filter(Boolean).join(", ");
  const text = n === 0 ? "" : `${n} wild ${n === 1 ? "animal" : "animals"} left here${extra ? ` (${extra})` : ""}`;
  return { n, asleep, dazed, text };
}

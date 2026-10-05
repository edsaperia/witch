// The ley line: from the last runestone reached to the next objective in the order the waves really
// wake them, moving on when that area's wave arrives or its quest is done, whichever comes first
// (Ed, 2026-10-04, 2026-10-05).
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { newParty, spreadWave, cellKey } from "./party";
import { leyChain, leyKey, onAreaDone } from "./leylines";

const map = generateMap(123, TUNING);
const keys = (c: { cell: readonly [number, number] }[]) => c.map(s => cellKey(s.cell));

describe("ley lines", () => {
  it("start at home, pointing to the next wave's stone, then the ones after in the order they will wake", () => {
    const p = newParty(map), one = leyChain(p, map, 2), chain = leyChain(p, map, 7);
    expect(keys(one)).toEqual([cellKey(map.centreCell), cellKey(p.next[0])]);
    expect(one[0]).toMatchObject({ x: map.dancefloor.x, z: map.dancefloor.z, wave: 0 });
    expect(keys(chain).slice(0, 3)).toEqual([map.centreCell, ...p.next, ...p.afterNext].map(cellKey).slice(0, 3));
    expect(new Set(keys(chain)).size).toBe(7); // no stone twice
  });
  it("foretell what the waves really wake, and move on to the next stone as each wave arrives", () => {
    const p = newParty(map);
    let time = 100;
    for (let w = 0; w < 5; w++) {
      const before = leyChain(p, map, 4), key = leyKey(p);
      const woke = spreadWave(p, map, (time += 100));
      expect(leyKey(p)).not.toBe(key);
      expect(cellKey(woke[0].cell)).toBe(keys(before)[1]); // the line pointed to the stone the wave woke
      expect(keys(leyChain(p, map, 3))).toEqual(keys(before).slice(1, 4)); // and now runs on from it
    }
  });
  it("move on when the next area's quest is done, before its wave, and stay put when that wave comes", () => {
    const p = newParty(map);
    spreadWave(p, map, 100);
    const before = leyChain(p, map, 3), next = before[1].cell, key = leyKey(p);
    onAreaDone(p, next, 120);
    expect(leyKey(p)).not.toBe(key);
    const after = leyChain(p, map, 2);
    expect(keys(after)).toEqual(keys(before).slice(1, 3)); // from the quest's stone to the one after
    // Its wave arrives: the line already moved on, so it keeps pointing to the same next stone.
    const woke = spreadWave(p, map, 200);
    expect(cellKey(woke[0].cell)).toBe(cellKey(next));
    expect(keys(leyChain(p, map, 2))).toEqual(keys(after));
  });
});

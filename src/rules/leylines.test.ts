// The ley lines' chain: the runestones in the order the waves really wake them, advancing a link
// a wave (Ed, 2026-10-04).
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { newParty, spreadWave, cellKey } from "./party";
import { leyChain, leyKey } from "./leylines";

const map = generateMap(123, TUNING);
const keys = (c: { cell: readonly [number, number] }[]) => c.map(s => cellKey(s.cell));

describe("ley lines", () => {
  it("start at home, then the next waves' stones in the order they will wake", () => {
    const p = newParty(map), chain = leyChain(p, map, 7);
    expect(chain.length).toBe(7);
    expect(keys(chain)[0]).toBe(cellKey(map.centreCell));
    expect(chain[0]).toMatchObject({ x: map.dancefloor.x, z: map.dancefloor.z, wave: 0 });
    expect(keys(chain).slice(1, 3)).toEqual([...p.next, ...p.afterNext].map(cellKey).slice(0, 2));
    expect(new Set(keys(chain)).size).toBe(7); // no stone twice
  });
  it("foretell what the waves really wake, and move on a link each wave", () => {
    const p = newParty(map);
    let time = 100;
    spreadWave(p, map, time);
    for (let w = 1; w < 5; w++) {
      const before = leyChain(p, map, 7), key = leyKey(p);
      const woke = spreadWave(p, map, (time += 100));
      expect(leyKey(p)).not.toBe(key);
      // The stone the chain had after the current one is the one this wave woke.
      expect(cellKey(woke[0].cell)).toBe(keys(before)[2]);
      const after = leyChain(p, map, 7);
      expect(keys(after).slice(0, 6)).toEqual(keys(before).slice(1, 7));
    }
  });
});

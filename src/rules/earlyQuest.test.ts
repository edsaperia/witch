// The early easy quest (Ed, 2026-10-07; rules/quest.ts earlyQuest): one of the first three areas the waves wake, with a
// legend, dreams of the baby of another of those three's kind; seeded per run, off with legends.earlyQuest false.
import { describe, expect, it } from "vitest";
import { spawnCreatures } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { cellKey, routeOf } from "./party";
import { earlyQuest } from "./quest";
import { TUNING, withTuning } from "./tuning";

const kindOf = (map: ReturnType<typeof generateMap>, k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; };

describe("the early easy quest", () => {
  for (const seed of [1, 2, 3, 7, 42, 123, 777, 2024, 31337, 871136]) it(`seed ${seed}: a legend among the first areas wants another first area's baby`, () => {
    const map = generateMap(seed, TUNING), E = earlyQuest(map)!, first = routeOf(map).order.slice(0, 3);
    expect(E).not.toBeNull();
    expect(E.first).toEqual(first);
    expect(map.legendCells.has(E.host)).toBe(true);
    // its host is one of the first three whenever one of them has a legend
    if (first.some(k => map.legendCells.has(k))) expect(first).toContain(E.host);
    expect(E.wants).not.toBe(kindOf(map, E.host));
    expect(first.filter(k => k !== E.host).map(k => kindOf(map, k))).toContain(E.wants);
    const L = spawnCreatures(map).find(c => c.legendState && cellKey(c.cell) === E.host)!;
    expect(L.quest).toMatchObject({ species: E.wants, level: 0 });
  });

  it("is the same every time for a seed", () => {
    expect(earlyQuest(generateMap(123, TUNING))).toEqual(earlyQuest(generateMap(123, TUNING)));
  });

  it("is off with legends.earlyQuest false: every dream as before", () => {
    const off = withTuning({ legends: { ...TUNING.legends, earlyQuest: false } } as never), map = generateMap(123, off);
    expect(earlyQuest(map)).toBeNull();
  });
});

// Quests point to later areas (legends.questLater; Ed's core design, relayed 2026-10-07): a sleeping legend dreams of a kind
// living in an area later on the route than its own, deeper in; the early easy quest (earlyQuest) keeps its own pick.
import { describe, expect, it } from "vitest";
import { spawnCreatures } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { cellKey, routeOf } from "./party";
import { earlyQuest } from "./quest";
import { TUNING, withTuning } from "./tuning";

const SEEDS = [1, 2, 3, 7, 42, 123, 777, 2024, 31337, 871136];

describe("quests point to later areas (legends.questLater)", () => {
  for (const seed of SEEDS) it(`seed ${seed}: every legend but the early quest's dreams of a kind from later on the route`, () => {
    const map = generateMap(seed, TUNING), order = routeOf(map).order, early = earlyQuest(map);
    const kindAt = (k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; };
    let checked = 0;
    for (const L of spawnCreatures(map).filter(c => c.boss && c.quest)) {
      const key = cellKey(L.cell), i = order.indexOf(key), q = L.quest!;
      expect(q.species).not.toBe(L.species);
      if (early?.host === key) { expect(q).toMatchObject({ species: early.wants, level: 0 }); continue; } // (kept exactly as it was)
      const laterKinds = new Set(order.slice(i + 1).map(kindAt).filter(sp => sp !== L.species));
      if (!laterKinds.size) continue; // (the last areas: any kind, as before)
      expect(laterKinds.has(q.species)).toBe(true);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  }, 60000);

  it("dreams from deeper in than before: the dream's nearest later area lies later on the route than the old pick's", () => {
    let on = 0, off = 0;
    for (const seed of [1, 123, 4242]) for (const later of [true, false]) {
      const map = generateMap(seed, withTuning({ legends: { ...TUNING.legends, questLater: later } })), order = routeOf(map).order;
      const kindAt = (k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; };
      for (const L of spawnCreatures(map).filter(c => c.boss && c.quest)) {
        const i = order.indexOf(cellKey(L.cell)), j = order.findIndex((k, n) => n > i && kindAt(k) === L.quest!.species);
        const pos = j >= 0 ? j : order.findIndex(k => kindAt(k) === L.quest!.species);
        if (later) on += pos - i; else off += pos - i;
      }
    }
    expect(on).toBeGreaterThan(off);
  }, 120000);

  it("is the old gamble with legends.questLater false", () => {
    const map = generateMap(123, withTuning({ legends: { ...TUNING.legends, questLater: false } }));
    expect(spawnCreatures(map).filter(c => c.boss && c.quest).length).toBeGreaterThan(5);
  }, 60000);
});

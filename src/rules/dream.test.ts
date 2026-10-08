import { describe, expect, it } from "vitest";
import { COMPASS, compassPoint, dreamStone, dreamWay, questOpen, restlessness } from "./dream";
import type { Creature } from "./creatures";
import type { PartyState } from "./party";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING } from "./tuning";

describe("a dream's direction", () => {
  it("points at the runestone of the nearest area of the dreamed creature's kind, explored or not", () => {
    const map = generateMap(123, TUNING);
    const species = AREA_TYPES[map.typeOf(2, 3)].creature, from = map.siteOf(7, 7);
    const s = dreamStone(map, species, from.x, from.z)!;
    expect(AREA_TYPES[map.typeOf(s.cell[0], s.cell[1])].creature).toBe(species);
    // none of its kind is nearer
    const d = Math.hypot(map.siteOf(s.cell[0], s.cell[1]).x - from.x, map.siteOf(s.cell[0], s.cell[1]).z - from.z);
    for (const [i, j] of map.cells) if (AREA_TYPES[map.typeOf(i, j)].creature === species) expect(Math.hypot(map.siteOf(i, j).x - from.x, map.siteOf(i, j).z - from.z)).toBeGreaterThanOrEqual(d);
    expect(dreamStone(map, "no-such-creature", from.x, from.z)).toBeNull();
  });

  it("reads a legend's restlessness clamped to 0..1, calm when nothing has set it", () => {
    expect(restlessness({} as Creature)).toBe(0);
    expect(restlessness({ restlessness: 0.4 } as unknown as Creature)).toBe(0.4);
    expect(restlessness({ restlessness: 3 } as unknown as Creature)).toBe(1);
  });

  it("keeps a legend's quest open while it sleeps, soundsystem on or not (Ed, 2026-10-06), unless the rules say otherwise", () => {
    const party = { areas: new Map([["5,6", {}]]) } as unknown as PartyState;
    const q = { species: "wolf", level: 1 };
    expect(questOpen(party, { cell: [4, 6], quest: q } as unknown as Creature)).toBe(true);
    expect(questOpen(party, { cell: [5, 6], quest: q } as unknown as Creature)).toBe(true); // (its area partified: still open)
    expect(questOpen(party, { cell: [5, 6], quest: { ...q, done: 3 } } as unknown as Creature)).toBe(false);
    expect(questOpen(party, { cell: [5, 6], quest: q, questOpen: false } as unknown as Creature)).toBe(false); // (awake: the rules' flag)
  });

  it("says the way in compass words, north up the screen (toward -z)", () => {
    expect(COMPASS[compassPoint(0, -10)]).toBe("north"); expect(COMPASS[compassPoint(10, 0)]).toBe("east");
    expect(COMPASS[compassPoint(0, 10)]).toBe("south"); expect(COMPASS[compassPoint(-10, 0)]).toBe("west");
    expect(COMPASS[compassPoint(10, -10)]).toBe("north-east"); expect(COMPASS[compassPoint(-10, 10)]).toBe("south-west");
    expect(dreamWay({ x: 0, z: 0 }, { x: 300, z: -300 }).word).toBe("north-east, 420 m");
    expect(dreamWay({ x: 0, z: 0 }, { x: 0, z: 1500 }).word).toBe("south, 1.5 km");
    expect(dreamWay({ x: 0, z: 0 }, { x: 5, z: 5 }).word).toBe("here");
  });
});

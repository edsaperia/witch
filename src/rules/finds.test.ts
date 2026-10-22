// Things to wear found in the forest (rules/finds.ts; Ed, 2026-10-21): tonight's travel trunk, what's in it, taking it, and the
// crystal ball's way to it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { FINDABLE, fillTrunk, trunkAt, trunkItem, wayTo, TRUNK_CLEAR } from "./finds";
import { SHELVES } from "./wardrobe";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function game(seed = 123): Game {
  const g = newGame(seed, TUNING);
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
  return g;
}
/** Her on foot at (x, z), off her decks. */
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 }; };
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); };

describe("tonight's travel trunk", () => {
  it("stands in a wild area's woods, never home's, off its clearings and clear of the relics", () => {
    for (const seed of [123, 7, 4242, 90210]) {
      const g = game(seed), T = g.trunk!;
      expect(T, `seed ${seed}`).toBeTruthy();
      const home = g.map.centreCell;
      expect(T.cell[0] === home[0] && T.cell[1] === home[1], `seed ${seed}`).toBe(false);
      expect(g.map.playable(T.cell[0], T.cell[1])).toBe(true);
      expect(g.map.hardClear(T.x, T.z)).toBe(false);
      for (const r of g.relics) expect(Math.hypot(r.x - T.x, r.z - T.z)).toBeGreaterThanOrEqual(TRUNK_CLEAR);
      expect(T.item).toBeNull(); // (the page fills it, from what she owns)
    }
  });

  it("is the night's: the same seed puts it in the same place, and nights differ", () => {
    const a = game(123).trunk!, b = game(123).trunk!;
    expect([a.x, a.z]).toEqual([b.x, b.z]);
    const spots = new Set([1, 2, 3, 4, 5, 6].map(s => { const t = game(s).trunk!; return `${t.x.toFixed(1)},${t.z.toFixed(1)}`; }));
    expect(spots.size).toBeGreaterThan(3);
  });

  it("holds a wearable she lacks, never a broom (the garage's), the night's pick; nothing once she has them all", () => {
    const brooms = new Set(SHELVES.broom.items.map(i => i.id));
    expect(FINDABLE.length).toBeGreaterThan(5);
    for (const i of FINDABLE) { expect(i.start, i.id).toBeFalsy(); expect(brooms.has(i.id), i.id).toBe(false); }
    const none = new Set<string>(), item = trunkItem(123, none)!;
    expect(FINDABLE.map(i => i.id)).toContain(item);
    expect(trunkItem(123, none)).toBe(item);
    expect(trunkItem(123, new Set([item]))).not.toBe(item);
    const picks = new Set([1, 2, 3, 4, 5, 6, 7, 8].map(s => trunkItem(s, none)));
    expect(picks.size).toBeGreaterThan(2);
    expect(trunkItem(5, new Set(FINDABLE.map(i => i.id)))).toBeNull();
    const g = game(); fillTrunk(g, new Set(FINDABLE.map(i => i.id)));
    expect(g.trunk).toBeNull();
  });

  it("opens with E on foot: what's in it is hers (a found event), once", () => {
    const g = game(); fillTrunk(g, new Set());
    const T = g.trunk!, item = T.item!;
    at(g, T.x + 5, T.z);
    expect(trunkAt(g.trunk, g.witch.x, g.witch.z)).toBeNull(); // (too far)
    at(g, T.x + 1, T.z);
    press(g);
    const found = g.leashEvents.filter(e => e.kind === "found");
    expect(found.map(e => e.obj)).toEqual([item]);
    expect(T.found).toBe(true);
    press(g);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
  });

  it("can't be opened once the party's over", () => {
    const g = game(); fillTrunk(g, new Set());
    const T = g.trunk!;
    g.partyOver = { at: 0, ease: 1 } as Game["partyOver"];
    at(g, T.x, T.z);
    press(g);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
    expect(T.found).toBe(false);
  });
});

describe("the way to the trunk (never how far)", () => {
  it("names the compass point from the treehouse to the trunk, north up the screen", () => {
    expect(wayTo(0, 0, 0, -100).point).toBe("north");
    expect(wayTo(0, 0, 100, 0).point).toBe("east");
    expect(wayTo(0, 0, 0, 100).point).toBe("south");
    expect(wayTo(0, 0, -100, 0).point).toBe("west");
    expect(wayTo(0, 0, 70, -70).point).toBe("north-east");
    expect(wayTo(0, 0, -5, 5).point).toBe("south-west");
    expect(wayTo(0, 0, 100, 0).bearing).toBeCloseTo(Math.PI / 2);
  });
});

// Things to wear found in the forest (rules/finds.ts; Ed, 2026-10-21): tonight's travel trunk, what's in it, taking it, and the
// crystal ball's way to it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { FINDABLE, fillTrunk, findPiece, nightPick, trunkAt, wayTo, TRUNK_CLEAR } from "./finds";
import { PART_IDS, fittedKey } from "./broomParts";

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

  it("holds what the night's one draw picks over everything she lacks, of every kind (Ed, 2026-10-23); nothing once she has it all", () => {
    expect(FINDABLE.length).toBeGreaterThan(5);
    for (const i of FINDABLE) { expect(i.start, i.id).toBeFalsy(); expect(i.set["broom.kind"], i.id).toBeUndefined(); } // (no broom shapes: brooms are parts)
    const wearables = new Set(FINDABLE.map(i => i.id)), parts = new Set(PART_IDS);
    // the same night, the same find; nights differ, and over many both kinds come up
    const pick = nightPick(123, {})!;
    expect(nightPick(123, {})).toEqual(pick);
    const picks = Array.from({ length: 60 }, (_, s) => nightPick(s + 1, {})!);
    expect(new Set(picks.map(p => p.item)).size).toBeGreaterThan(10);
    expect(picks.some(p => p.kind === "wearable") && picks.some(p => p.kind === "part")).toBe(true);
    for (const p of picks) expect(p.kind === "part" ? parts.has(p.item) : wearables.has(p.item), p.item).toBe(true);
    // what she has is never drawn; a kind with nothing left never comes up
    expect(nightPick(123, { [pick.kind]: new Set([pick.item]) })).not.toEqual(pick);
    for (let s = 1; s <= 40; s++) { expect(nightPick(s, { part: parts })!.kind).toBe("wearable"); expect(nightPick(s, { wearable: wearables })!.kind).toBe("part"); }
    // everything found: nothing to find, and no trunk or wreck tonight
    expect(nightPick(5, { wearable: wearables, part: parts })).toBeNull();
    const g = game(); fillTrunk(g, { wearable: wearables, part: parts });
    expect(g.trunk).toBeNull();
    // one find a night: the draw fills the one spot placeTrunk chose, as a trunk or a wreck
    const h = game(); fillTrunk(h, {});
    expect([h.trunk!.kind, h.trunk!.item]).toEqual([nightPick(h.map.seed, {})!.kind, nightPick(h.map.seed, {})!.item]);
    expect(findPiece(h.trunk!)).toBe(h.trunk!.kind === "part" ? `wreck-${h.trunk!.item}` : "travel-trunk");
  });

  it("opens with E on foot: what's in it is hers (a found event), once", () => {
    const g = game(); fillTrunk(g, {});
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
    const g = game(); fillTrunk(g, {});
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

describe("tonight's wreck (the Workshop, Ed 2026-10-23: a broom part to find)", () => {
  /** A night whose find is a wreck holding `part`. */
  const wreck = (part: string, t = TUNING) => {
    const g = newGame(123, t);
    g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
    fillTrunk(g, {}); g.trunk!.kind = "part"; g.trunk!.item = part;
    return g;
  };
  it("E at it while the party's on: the part is hers at once (a found event of its kind), not fitted: it waits at the Workshop's bay", () => {
    const g = wreck("nozzles"), T = g.trunk!, W = g.witches[0];
    at(g, T.x + 1, T.z);
    press(g);
    const found = g.leashEvents.filter(e => e.kind === "found");
    expect(found.map(e => [e.obj, e.find])).toEqual([["nozzles", "part"]]);
    expect(T.found).toBe(true);
    expect(fittedKey(W.spells.parts)).toBe("-,-,-"); // (no more fitting on pickup: Ed wanted fitting at the bay)
  });
  it("a part found leaves her broom as it was: her fitted part stays, her set and spell too", () => {
    const g = wreck("nozzles", { ...TUNING, spells: { ...TUNING.spells, parts: "ladder" } }), T = g.trunk!, W = g.witches[0];
    at(g, T.x, T.z); press(g);
    expect(g.leashEvents.some(e => e.kind === "found" && e.obj === "nozzles")).toBe(true);
    expect(fittedKey(W.spells.parts)).toBe("-,ladder,-");
    expect(W.spells.broom).toBe("none"); // (the Pile driver waits till she fits the nozzles at the bay)
  });
  it("only while the party's on", () => {
    const g = wreck("canoe"), T = g.trunk!;
    g.partyOver = { at: 0, ease: 1 } as Game["partyOver"];
    at(g, T.x, T.z); press(g);
    expect(T.found).toBe(false);
    expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
  });
});

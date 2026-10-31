import { describe, expect, it } from "vitest";
import { floorPatterns, islandKinds, islandOf, islandSigilOf, pickPattern } from "./dancefloor";
import { floorInputs, newGame } from "./game";
import { AREA_TYPES } from "./map";
import { TUNING, withTuning } from "./tuning";
import { largestWorldTuning, smallWorldTuning } from "../test/worlds";

const creatureOf = (t: number) => AREA_TYPES[t].creature;
// Keep named-island and roster-free fixtures distinct: the tests compare authored roster semantics with the radius-map fallback.

describe("the dancefloor's sigils: only this island's kinds, and the World Tree (Ed, 2026-10-11)", () => {
  it("never picks an off-island kind's shape, whatever has the party, and does pick the World Tree", () => {
    const lib = floorPatterns(), every = new Set(lib.filter(p => p.kind === "area").map(p => p.area!)), kinds = new Set(["wolf", "fox", "owl"]);
    const seen = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) for (let played = 0; played < 200; played++) {
      const p = lib[pickPattern(-1, played, 4, every, seed, kinds)];
      if (p.kind === "area") expect(kinds.has(p.creature!)).toBe(true);
      if (p.sigil) seen.add(p.sigil);
    }
    expect(seen.has("worldTree")).toBe(true);
    for (const k of kinds) expect(seen.has(k)).toBe(true); // (each island kind's shape still comes round)
    expect([...seen].filter(s => s !== "worldTree" && !kinds.has(s))).toEqual([]);
  });
  it("takes a game's kinds from its island's roster, not from home's own cell, and the floor keeps to them", () => {
    // Largest shipped home world: sigil filtering must cover the complete authored area roster.
    const g = newGame(123, largestWorldTuning(TUNING)), kinds = islandKinds(g.map, creatureOf);
    expect(g.map.island).not.toBeNull();
    expect([...kinds].sort()).toEqual([...new Set(g.map.island!.roster.map(r => r.kind))].sort());
    for (const [x, y] of g.map.cells) if (g.map.playable(x, y) && (x !== g.map.centreCell[0] || y !== g.map.centreCell[1])) expect(kinds.has(creatureOf(g.map.typeOf(x, y)))).toBe(true);
    // every area type partified, as if the whole map had the party: still only the island's kinds
    const lib = floorPatterns(), every = new Set(lib.filter(p => p.kind === "area").map(p => p.area!));
    for (let played = 0; played < 400; played++) { const p = lib[pickPattern(-1, played, 4, every, g.seed, kinds)]; if (p.kind === "area") expect(kinds.has(p.creature!)).toBe(true); }
  });
  it("on a map with no roster, takes the kinds of its playable areas, home's own cell left out", () => {
    const g = newGame(7, smallWorldTuning(TUNING, "Roster-free fallback derives types from the cells present; nine cells suffice to distinguish home and wild.")), kinds = islandKinds(g.map, creatureOf), want = new Set<string>();
    expect(g.map.island).toBeNull();
    for (const [x, y] of g.map.cells) if (g.map.playable(x, y) && (x !== g.map.centreCell[0] || y !== g.map.centreCell[1])) want.add(creatureOf(g.map.typeOf(x, y)));
    expect([...kinds].sort()).toEqual([...want].sort());
  });
  it("writes the island's own sigil through the boot: a kind's island its kind's, home's the World Tree", () => {
    const fox = newGame(5, withTuning({ map: { ...TUNING.map!, island: "fox" } }));
    expect(fox.map.island?.kind).toBe("fox");
    expect(islandOf(fox.map)).toBe("fox");
    expect(islandSigilOf(fox.map)).toBe("fox");
    expect(floorInputs(fox).island!.sigil).toBe("fox");
    const home = newGame(5, withTuning({ map: { ...TUNING.map!, island: "home", islandAreas: 10 } }));
    expect(home.map.island?.kind).toBe("home");
    expect(floorInputs(home).island!.sigil).toBe("worldTree");
    const none = newGame(5, smallWorldTuning(TUNING, "The no-roster identity branch needs no distant areas."));
    expect(none.map.island).toBeNull();
    expect(floorInputs(none).island!.sigil).toBe("worldTree");
  });
});

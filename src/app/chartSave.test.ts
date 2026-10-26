// The sea chart's save (wave 2, part C; app/chartSave.ts): what a night unlocks, kept in the browser.
import { describe, expect, it } from "vitest";
import { allSave, clearSave, emptySave, loadSave, newCampaign, nightOver, recordNight, sailNight, SAVE_KEY, storeSave, unlocked, unvisited, worldSeed } from "./chartSave";
import { KIND_NAMES } from "../rules/rosters";

function memory(items: Record<string, string> = {}) {
  return { items, getItem: (k: string) => items[k] ?? null, setItem: (k: string, v: string) => { items[k] = v; }, removeItem: (k: string) => { delete items[k]; } };
}

describe("the sea chart's save", () => {
  it("starts with home alone unlocked", () => {
    const s = loadSave(memory());
    expect(s).toEqual(emptySave());
    expect(unlocked(s)).toEqual(["home"]);
  });

  it("unlocks the islands of the legends a won night woke, each with its voyage from where she set out; a lost night only plays", () => {
    let s = recordNight(emptySave(), "home", { won: false, found: ["fox"] });
    expect(s.found).toEqual([]); // (lost: nothing found, nothing lost)
    expect(s.played).toEqual(["home"]);
    s = recordNight(s, "home", { won: true, found: ["fox", "owl"] });
    expect(unlocked(s)).toEqual(["home", "fox", "owl"]);
    expect(s.won).toEqual(["home"]);
    expect(s.voyages).toEqual([{ from: "home", to: "fox" }, { from: "home", to: "owl" }]);
    // the fox's island: an island found again keeps its first voyage
    s = recordNight(s, "fox", { won: true, found: ["owl", "raven"] });
    expect(s.voyages).toEqual([{ from: "home", to: "fox" }, { from: "home", to: "owl" }, { from: "fox", to: "raven" }]);
    expect(s.won).toEqual(["home", "fox"]);
    // not an island of the chart (a numbered map): nothing recorded
    expect(recordNight(s, "", { won: true, found: ["bear"] })).toBe(s);
  });

  it("keeps it in the browser, forgets it on Start over, and survives bad or blocked storage", () => {
    const m = memory(), s = recordNight(emptySave(), "home", { won: true, found: ["hare"] });
    storeSave(s, m);
    expect(loadSave(m)).toEqual(s);
    clearSave(m);
    expect(loadSave(m)).toEqual(emptySave());
    expect(loadSave(memory({ [SAVE_KEY]: "{not json" }))).toEqual(emptySave());
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify({ found: ["fox", "dragon", 3], won: ["home", "x"], voyages: [{ from: "home", to: "fox" }, { from: "home" }] }) })))
      .toEqual({ world: 0, found: ["fox"], won: ["home"], played: [], voyages: [{ from: "home", to: "fox" }] });
    const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); }, removeItem: () => { throw new Error("blocked"); } };
    expect(loadSave(blocked)).toEqual(emptySave());
    expect(() => { storeSave(s, blocked); clearSave(blocked); }).not.toThrow();
  });

  it("opens the whole chart for ?chart=all", () => {
    const s = allSave();
    expect([...s.found].sort()).toEqual([...KIND_NAMES].sort()); // (all 64: the placeholders' '?' islands too)
    expect(s.voyages.length).toBe(KIND_NAMES.length);
    // a real save never holds a placeholder: none found, none played
    expect(recordNight(emptySave(), "unknown-01", { won: true, found: ["fox"] })).toEqual(emptySave());
    expect(recordNight(emptySave(), "home", { won: true, found: ["unknown-01", "fox"] }).found).toEqual(["fox"]);
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify({ found: ["unknown-01", "fox"] }) })).found).toEqual(["fox"]);
  });

  it("keeps the campaign's world seed (0 with no save: the first world); Start over begins a new world, typed or random", () => {
    const m = memory();
    expect(loadSave(m).world).toBe(0);
    let s = newCampaign(worldSeed("123456"), m);
    expect(s.world).toBe(123456);
    s = nightOver("home", { won: true, found: ["fox"] }, m, 123456);
    expect(loadSave(m)).toEqual({ ...emptySave(123456), found: ["fox"], won: ["home"], played: ["home"], voyages: [{ from: "home", to: "fox" }] });
    // a night in another world (someone's link) isn't this campaign's
    expect(nightOver("home", { won: true, found: ["owl"] }, m, 99).found).toEqual(["fox"]);
    expect(loadSave(m).found).toEqual(["fox"]);
    // seeds: a number as typed, words hashed, nothing random
    expect(worldSeed("0")).toBe(0);
    expect(worldSeed("hello")).toBe(worldSeed(" hello "));
    expect(worldSeed("hello")).not.toBe(worldSeed("goodbye"));
    expect(worldSeed("")).toBeGreaterThan(0);
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify({ world: "x" }) })).world).toBe(0);
  });

  it("sailing off from the treehouse's map table mid-night ends the night unwon, as a loss; once the night's over, it's already recorded (Ed, 2026-10-11: \"Sail anytime\")", () => {
    const before = recordNight(emptySave(), "home", { won: true, found: ["fox"] });
    const mid = sailNight(before, "home", true);
    expect(mid.played).toContain("home");
    expect(mid.found).toEqual(before.found); expect(mid.won).toEqual(before.won); expect(mid.voyages).toEqual(before.voyages); // (nothing found, no legends woken)
    const fresh = sailNight(emptySave(), "home", true);
    expect(fresh.played).toEqual(["home"]); expect(fresh.won).toEqual([]); expect(fresh.found).toEqual([]);
    expect(sailNight(before, "home", false)).toBe(before); // (won or over: as it ended)
  });

  it("knows the islands she's found and not been to: found, no night played there, not where she is (Ed, 2026-10-26)", () => {
    // (a night won at home finds the lion's and the fox's; she sails to the lion's)
    let s = recordNight(emptySave(), "home", { won: true, found: ["lion", "fox"] });
    expect(unvisited(s)).toEqual(["lion", "fox"]);
    expect(unvisited(s, "lion")).toEqual(["fox"]); // (landed there: been to)
    s = recordNight(s, "lion", { won: false }); // (a night played there, lost or won)
    expect(unvisited(s)).toEqual(["fox"]);
    s = sailNight(s, "fox", true); // (sailed off mid-night: played, as a loss)
    expect(unvisited(s)).toEqual([]);
  });
});

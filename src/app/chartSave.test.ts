// The sea chart's save (wave 2, part C; app/chartSave.ts): what a night unlocks, kept in the browser.
import { describe, expect, it } from "vitest";
import { allSave, clearSave, emptySave, loadSave, recordNight, SAVE_KEY, storeSave, unlocked } from "./chartSave";
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
      .toEqual({ found: ["fox"], won: ["home"], played: [], voyages: [{ from: "home", to: "fox" }] });
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
});

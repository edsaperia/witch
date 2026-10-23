// Her broom's parts kept on this browser (app/broomSave.ts; the Workshop, Ed 2026-10-23), and the migration from the brooms
// before parts.
import { describe, expect, it } from "vitest";
import { BROOM_KEY, fitBroom, loadBroom, migrateBroom, partFound, saveBroom } from "./broomSave";
import { LOADOUT_KEY, loadLoadout } from "./loadout";
import { fittedKey, fittedOf } from "../rules/broomParts";

const store = (init: Record<string, string> = {}) => { const m = new Map(Object.entries(init)); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m }; };

describe("the broom's save (witch.broom)", () => {
  it("a first game's: no parts found, a bare broom", () => {
    const b = loadBroom(store());
    expect(b.found).toEqual([]);
    expect(fittedKey(b.fitted)).toBe("-,-,-");
  });
  it("a part found is kept (even if the night's then lost: saved the moment she picks it up), not fitted: the bay fits it", () => {
    const s = store();
    partFound("nozzles", s);
    partFound("ladder", s);
    const b = loadBroom(s);
    expect(new Set(b.found)).toEqual(new Set(["ladder", "nozzles"]));
    expect(fittedKey(b.fitted)).toBe("-,-,-");
    fitBroom(fittedOf("ladder,nozzles"), s);
    expect(fittedKey(loadBroom(s).fitted)).toBe("-,ladder,nozzles");
    partFound("missile", s); // (another found keeps her broom as fitted)
    expect(fittedKey(loadBroom(s).fitted)).toBe("-,ladder,nozzles");
  });
  it("the bay keeps only parts she's found (a ?parts= broom fitted for a load isn't saved)", () => {
    const s = store();
    partFound("ladder", s);
    fitBroom(fittedOf("missile,ladder,nozzles"), s);
    expect(fittedKey(loadBroom(s).fitted)).toBe("-,ladder,-");
  });
  it("fits only parts she has found, each in its own slot; unknown ones dropped", () => {
    const s = store();
    saveBroom({ v: 1, found: ["missile", "bogus"], fitted: { tip: "missile", chassis: "canoe", exhaust: "missile" } }, s);
    const b = loadBroom(s);
    expect(b.found).toEqual(["missile"]);
    expect(fittedKey(b.fitted)).toBe("missile,-,-");
  });
});

describe("the migration from the brooms before parts", () => {
  it("an old save's broom shape goes back to the Classic look (its colours and fit kept) and its broom spell is dropped, once", () => {
    const genome = { hat: { shape: "classic" }, broom: { kind: "jetbike", length: 1.3, bend: 0.2, bristles: 1.4, thickness: 1.1 }, palette: { broom: [0.1, 0.8, 0.9], bristles: [0.5, 0.5, 0.5] } };
    const s = store({ "witch.genome": JSON.stringify(genome), [LOADOUT_KEY]: JSON.stringify({ hat: "helmet", broom: "speed" }) });
    expect(migrateBroom(s)).toBe(true);
    const g = JSON.parse(s.m.get("witch.genome")!);
    expect(g.broom).toEqual({ ...genome.broom, kind: "classic" });
    expect(g.palette).toEqual(genome.palette);
    expect(JSON.parse(s.m.get(LOADOUT_KEY)!)).toEqual({ hat: "helmet" });
    expect(loadLoadout(s)).toEqual({ hat: "helmet" });
    expect(s.m.has(BROOM_KEY)).toBe(true);
    expect(fittedKey(loadBroom(s).fitted)).toBe("-,-,-"); // (no part owned: a first broom is bare)
    // once: a shape picked since stays
    g.broom.kind = "canoe"; s.m.set("witch.genome", JSON.stringify(g));
    expect(migrateBroom(s)).toBe(false);
    expect(JSON.parse(s.m.get("witch.genome")!).broom.kind).toBe("canoe");
  });
  it("a fresh browser: nothing to change", () => {
    const s = store();
    expect(migrateBroom(s)).toBe(false);
    expect(s.m.has(BROOM_KEY)).toBe(true);
  });
});

// The finds' keepers (app/finds.ts) and the dev control's grants (Ed, 2026-10-23: "a debug control that allows devs to give
// themselves collectible items"): a find given is exactly a find found, rules and saves alike.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { newGame as fullGame, stepGame, type Controls, type Game } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Find grants and local pickup saves use one placed trunk, independent of area count.");
import { FIND_KINDS, FINDABLE, fillTrunk, type FindKindId } from "../rules/finds";
import { fitBroom, loadBroom } from "./broomSave";
import { setParts } from "../rules/spells";
import { loadOwned } from "./owned";
import { KEEPERS, applyOwn, dropFind, grantAll, grantFind, keepFound, ownWanted, type FindsCtx } from "./finds";
import { SLOT_INDEX } from "./saveSlots";

/** A localStorage of our own for each test (the saves are this browser's). */
let store: Map<string, string>;
const real = (globalThis as { localStorage?: Storage }).localStorage;
beforeEach(() => {
  store = new Map();
  (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, String(v)), removeItem: (k: string) => void store.delete(k) };
});
afterEach(() => { (globalThis as { localStorage?: unknown }).localStorage = real; });

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** A night whose find is `kind`'s `item`, her on foot by it. */
function night(kind: FindKindId, item: string): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = undefined;
  fillTrunk(g, {}); g.trunk!.kind = kind; g.trunk!.item = item;
  g.witch = { ...g.witch, x: g.trunk!.x, z: g.trunk!.z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 };
  return g;
}
const ctxOf = (g: Game): FindsCtx => { let o: Set<string> | null = null; return { spells: g.witches[0].spells, owned: () => (o ??= loadOwned(null)) }; };
/** A real find: E at it, then the page keeps what the "found" event says (as main.ts does). */
function findIt(g: Game): void {
  stepGame(g, { ...C, place: true }, 1 / 60);
  const c = ctxOf(g);
  for (const e of g.leashEvents) if (e.kind === "found" && e.obj) keepFound(c, (e.find ?? "wearable") as FindKindId, e.obj);
}
// Compare actual progress bytes; slot-index creation dates are metadata, not collectible grants.
const saves = () => Object.fromEntries([...store].filter(([key]) => key !== SLOT_INDEX).sort());
const spellsOf = (g: Game) => { const s = g.witches[0].spells; return { parts: s.parts, broom: s.broom }; };

describe("a find given through the dev control is a find found", () => {
  const cases: [FindKindId, string][] = [["wearable", FINDABLE[0].id], ["part", "nozzles"], ["part", "ladder"], ["hat", "sentry"], ["bag", "backpack"]];
  for (const [kind, item] of cases) it(`${kind} ${item}: the same saves and the same broom`, () => {
    const a = night(kind, item);
    findIt(a);
    expect(a.trunk!.found).toBe(true);
    const found = { saves: saves(), spells: spellsOf(a) };
    store.clear();
    const b = night(kind, item);
    grantFind(ctxOf(b), kind, item);
    expect({ saves: saves(), spells: spellsOf(b) }).toEqual(found);
    expect(KEEPERS[kind].has(ctxOf(b)).has(item)).toBe(true);
  });
  it("granting a set's parts keeps them as finding them does: found, not fitted (the Workshop's bay fits them), so no spell yet", () => {
    const a = night("part", "ladder");
    findIt(a);
    a.trunk!.found = false; a.trunk!.item = "nozzles";
    findIt(a);
    const found = { saves: saves(), spells: spellsOf(a) };
    expect(found.spells.broom).toBe("none");
    expect(loadBroom().found.sort()).toEqual(["ladder", "nozzles"]);
    store.clear();
    const b = newGame(123, TUNING);
    for (const p of ["ladder", "nozzles"]) grantFind(ctxOf(b), "part", p);
    expect({ saves: saves(), spells: spellsOf(b) }).toEqual(found);
  });
});

describe("the dev control's other buttons", () => {
  it("every kind it lists has a keeper and names (a new kind joins by adding one: the typecheck asks)", () => {
    for (const k of FIND_KINDS) { expect(KEEPERS[k.id]).toBeTruthy(); for (const id of k.items) expect(KEEPERS[k.id].label(id)).toBeTruthy(); }
  });
  it("all and none per kind, and letting a fitted part go takes it off her broom", () => {
    const g = newGame(123, TUNING), c = ctxOf(g);
    grantAll(c, "part", true);
    expect([...KEEPERS.part.has(c)].sort()).toEqual([...FIND_KINDS.find(k => k.id === "part")!.items].sort());
    // (granted is found, not fitted: fit one as the bay does)
    expect(Object.values(g.witches[0].spells.parts).filter(Boolean)).toEqual([]);
    setParts(g.witches[0].spells, { ...g.witches[0].spells.parts, exhaust: "nozzles" }); fitBroom(g.witches[0].spells.parts);
    const fitted = ["nozzles"];
    expect(loadBroom().fitted.exhaust).toBe("nozzles");
    dropFind(c, "part", fitted[0]);
    expect(Object.values(g.witches[0].spells.parts)).not.toContain(fitted[0]);
    expect(Object.values(loadBroom().fitted)).not.toContain(fitted[0]);
    grantAll(c, "part", false);
    expect(loadBroom().found).toEqual([]);
    grantAll(c, "wearable", true);
    expect(FINDABLE.every(i => loadOwned(null).has(i.id))).toBe(true);
    grantAll(c, "wearable", false);
    expect(FINDABLE.some(i => loadOwned(null).has(i.id))).toBe(false);
  });
});

describe("?own=", () => {
  it("reads all, none, kind:item, kind:* and a bare item, and ignores what it doesn't know", () => {
    const total = FIND_KINDS.reduce((n, k) => n + k.items.length, 0);
    expect(ownWanted("all").grants.length).toBe(total);
    expect(ownWanted("none")).toEqual({ none: true, grants: [] });
    expect(ownWanted("part:nozzles,nope:x,zzz").grants).toEqual([{ kind: "part", id: "nozzles" }]);
    expect(ownWanted("part:*").grants.length).toBe(FIND_KINDS.find(k => k.id === "part")!.items.length);
    expect(ownWanted("nozzles").grants).toEqual([{ kind: "part", id: "nozzles" }]);
  });
  it("writes the saves as the control does: all, then none leaves only what follows it", () => {
    applyOwn("all");
    expect(loadBroom().found.length).toBe(FIND_KINDS.find(k => k.id === "part")!.items.length);
    applyOwn("none,part:nozzles");
    expect(loadBroom().found).toEqual(["nozzles"]);
    expect(loadBroom().fitted.exhaust).toBeNull(); // (found, not fitted: the bay fits it)
    expect(FINDABLE.some(i => loadOwned(null).has(i.id))).toBe(false);
  });
});

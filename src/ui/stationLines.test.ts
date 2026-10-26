// The Workshop's station menus (Ed, 2026-10-22/23; docs/backlog/workshop.md; ui/stationLines.ts, drawn by ui/stationPanel.ts): the
// bay's part cards (the empty slot first, unfound parts not choosable), its sets' chips, the lathe's colours and fit, the pegboard
// read-only in its 3 × 3 biome order; and a part chosen at the bay on her broom at once, its set and spell with it.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { newGame, witchTuning } from "../rules/game";
import { BOARD, PARTS, bareBroom, fittedKey, fittedOf, partById } from "../rules/broomParts";
import { setParts } from "../rules/spells";
import { SHELVES, shelvesAt, type Shelf } from "../rules/wardrobe";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { broomSummary, canChoose, cardAt, choose, panelPad, partStats, setChips, stationLines, type Line } from "./stationLines";

const ctx = (owned: string[] = []) => ({ owned: new Set(owned), fitOn: () => true, grid: (s: Shelf) => ({ cols: s.grid === "skin" ? 6 : 13, rows: 5 }) });
const linesAt = (id: string) => { const sh = shelvesAt(id)!; return { sh, L: stationLines(sh, ctx()) }; };
const cards = (sh: Shelf[], l: Line) => Array.from({ length: l.n }, (_, c) => cardAt(sh[l.shelf], l, c));

describe("the bay", () => {
  it("has a line of cards for each slot, the empty slot first then its three parts, and a line of the five sets' chips", () => {
    const { sh, L } = linesAt("broomBay");
    expect(L.map(l => l.kind)).toEqual(["cards", "cards", "cards", "chips"]);
    expect(L.slice(0, 3).map(l => sh[l.shelf].slot)).toEqual(["tip", "chassis", "exhaust"]);
    for (const l of L.slice(0, 3)) {
      const ids = cards(sh, l);
      expect(ids[0]).toBeNull();
      expect(ids.slice(1)).toEqual(PARTS.filter(p => p.slot === sh[l.shelf].slot).map(p => p.id));
      expect(l.readOnly).toBeFalsy();
    }
    expect(L[3]).toMatchObject({ n: 5, readOnly: true });
    expect(SHELVES.tip.frame).toBe("broom");
  });
  it("only the empty slot and the parts she's found can be chosen (an unfound one is a silhouette)", () => {
    const { sh, L } = linesAt("broomBay"), tip = L[0], found = new Set(["missile"]);
    expect(canChoose(sh[tip.shelf], tip, 0, found)).toBe(true); // ∅
    expect(canChoose(sh[tip.shelf], tip, 1, found)).toBe(true); // the Missile nose, found
    expect(canChoose(sh[tip.shelf], tip, 2, found)).toBe(false);
    expect(canChoose(sh[tip.shelf], tip, 3, found)).toBe(false);
    expect(canChoose(sh[L[3].shelf], L[3], 0, found)).toBe(false); // (the chips only focus)
  });
  it("a card chosen fits the part in its slot (∅ empties it); on her, the set and its spell come at once, mid-night", () => {
    let f = bareBroom();
    f = choose(f, "tip", "missile"); f = choose(f, "chassis", "fairing"); f = choose(f, "exhaust", "nozzles");
    expect(fittedKey(f)).toBe("missile,fairing,nozzles");
    const g = newGame(123, TUNING), W = g.witches[0], base = witchTuning(g, W).treetopSpeed;
    setParts(W.spells, f);
    expect(W.spells.broom).toBe("speed");
    expect(witchTuning(g, W).treetopSpeed).toBeCloseTo(base * 1.1); // (its stats with it, the next step)
    setParts(W.spells, choose(f, "tip", null));
    expect([fittedKey(W.spells.parts), W.spells.broom]).toEqual(["-,fairing,nozzles", "none"]);
  });
  it("its chips count each set's pieces fitted and light up whole", () => {
    const c = setChips(fittedOf("missile,fairing,nozzles"));
    expect(c.find(x => x.id === "rocket")).toMatchObject({ fitted: 3, of: 3, whole: true, spell: "Speed" });
    expect(c.find(x => x.id === "joust")).toMatchObject({ fitted: 1, of: 2, whole: false });
    expect(c.filter(x => x.whole).length).toBe(1);
  });
  it("shows a part's stats, better green and worse red, and her broom bare → now", () => {
    const m = partStats("missile", TUNING);
    expect(m.find(r => r.key === "treetopSpeed")).toMatchObject({ from: "48 m/s", to: "53 m/s", better: true });
    expect(m.find(r => r.key === "treetop.turnRate")).toMatchObject({ from: "150°/s", to: "120°/s", better: false });
    expect(partStats("canoe", TUNING).find(r => r.key === "pull")).toMatchObject({ from: "×1", to: "×0.65", better: true });
    expect(broomSummary(bareBroom(), TUNING)).toEqual([]);
    const s = broomSummary(fittedOf("missile,ladder,nozzles"), TUNING);
    expect(s.map(r => r.key)).toEqual(expect.arrayContaining(["treetopSpeed", "riseTime", "groundSpeed", "cooldown.rise"]));
    expect(s.find(r => r.key === "riseTime")!.better).toBe(true);
  });
});

describe("the lathe", () => {
  it("holds the broom's two colour grids (body and trim, 5 rows each) and its fit, no items, no shapes, no power", () => {
    const { sh, L } = linesAt("lathe");
    expect(sh.map(s => s.id)).toEqual(["broomBody", "broomTrim", "broomFit"]);
    expect(L.filter(l => l.kind === "grid").length).toBe(10);
    expect(L.filter(l => l.kind === "fit").map(l => l.axis)).toEqual(["broomLength", "broomThickness", "broomBend", "bristles"]);
    expect(L.some(l => l.kind === "items" || l.kind === "cards")).toBe(false);
    for (const s of sh) expect(s.frame).toBe("broom");
  });
});

describe("the pegboard", () => {
  it("is read-only: three lines of three cards, the 3 × 3 biome map row by row from the north-west", () => {
    const { sh, L } = linesAt("pegboard");
    expect(L.map(l => [l.kind, l.n, l.readOnly])).toEqual([["cards", 3, true], ["cards", 3, true], ["cards", 3, true]]);
    const order = L.flatMap(l => cards(sh, l));
    expect(order).toEqual(["oar", "ladder", "missile", "horse", "twigs", "fairing", "canoe", "curl", "nozzles"]);
    expect(BOARD.map(c => c.point)).toEqual(["North-west", "North", "North-east", "West", "Home", "East", "South-west", "South", "South-east"]);
    for (const l of L) for (let c = 0; c < 3; c++) expect(canChoose(sh[l.shelf], l, c, new Set(PARTS.map(p => p.id)))).toBe(false);
  });
  it("its columns are the three-piece sets: west Ferry, middle Hedge, east Rocket", () => {
    const col = (c: number) => [0, 1, 2].map(r => BOARD[r * 3 + c].part).sort();
    expect(col(0)).toEqual(["canoe", "horse", "oar"]);
    expect(col(1)).toEqual(["curl", "ladder", "twigs"]);
    expect(col(2)).toEqual(["fairing", "missile", "nozzles"]);
    for (const c of BOARD) expect(partById(c.part), c.part).toBeTruthy();
  });
});

describe("the stations", () => {
  it("the Workshop's bay, lathe and pegboard are stations; the broom stand is gone", () => {
    const ids = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator").map(o => o.id);
    expect(ids).toEqual(expect.arrayContaining(["broomBay", "lathe", "pegboard"]));
    expect(ids).not.toContain("broomStand");
    for (const id of ids) expect(shelvesAt(id), id).not.toBeNull();
  });
});

describe("panelPad (a gamepad on a station's panel)", () => {
  const pressed = (...i: number[]) => { const b = Array(17).fill(false); for (const k of i) b[k] = true; return b; };
  it("the bottom face button chooses (Ed's playtest, 2026-10-23: he pressed it to choose; 2026-10-26: \"square and X on controller\", square closes)", () => {
    expect(panelPad(pressed(0), [0, 0, 0, 0]).choose).toBe(true);
    expect(panelPad(pressed(2), [0, 0, 0, 0]).choose).toBe(false);
    expect(panelPad(pressed(1), [0, 0, 0, 0]).choose).toBe(false);
  });
  it("the d-pad and either stick move the selector (Ed: \"right stick is probably more natural\"; 2026-10-26, she stands still at it, the movement keys its buttons)", () => {
    expect(panelPad(pressed(15), [0, 0, 0, 0]).dir).toBe("right");
    expect(panelPad(pressed(12), [0, 0, 0, 0]).dir).toBe("up");
    expect(panelPad(pressed(), [0, 0, 0.9, 0.2]).dir).toBe("right");
    expect(panelPad(pressed(), [0, 0, -0.1, -0.8]).dir).toBe("up");
    expect(panelPad(pressed(), [0, 0, 0.3, 0.2]).dir).toBe("");
    expect(panelPad(pressed(), [0, 1, 0, 0]).dir).toBe("down"); // (the left stick too)
  });
});

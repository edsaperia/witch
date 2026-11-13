// The Workshop's station menus (Ed, 2026-10-22/23; docs/backlog/workshop.md; ui/stationLines.ts, drawn by ui/stationPanel.ts): the
// bay's part cards (the empty slot first, unfound parts not choosable), its sets' chips, the lathe's colours and fit, the pegboard
// read-only in its 3 × 3 biome order; and a part chosen at the bay on her broom at once, its set and spell with it.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { newGame as fullGame, witchTuning } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { BOARD, PARTS, bareBroom, fittedKey, fittedOf, partById } from "../rules/broomParts";
import { setParts } from "../rules/spells";
import { SHELVES, shelvesAt, type Shelf } from "../rules/wardrobe";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { broomSummary, canChoose, cardAt, choose, fromTo, ITEMS_PER_LINE, itemAt, panelPad, partStats, setChips, stationLines, type Line } from "./stationLines";

const newGame = smallWorld(fullGame, "Station menu integration reads fitted broom stats on one witch, independent of world extent.");
const ctx = (owned: string[] = []) => ({ owned: new Set(owned), fitOn: () => true, grid: (s: Shelf) => ({ cols: s.grid === "skin" ? 3 : 13, rows: 5 }) });
const linesAt = (id: string) => { const sh = shelvesAt(id)!; return { sh, L: stationLines(sh, ctx()) }; };
const cards = (sh: Shelf[], l: Line) => Array.from({ length: l.n }, (_, c) => cardAt(sh[l.shelf], l, c));

describe("the broom's parts, a slot at each of its three stations (Ed, 2026-11-07: the workbench the tip, the lathe the chassis, the lift the exhaust)", () => {
  it("each station's first line its slot's cards, the empty slot first then its three parts; the sets' chips its last", () => {
    for (const [id, slot] of [["broomBay", "tip"], ["lathe", "chassis"], ["broomLift", "exhaust"]] as const) {
      const { sh, L } = linesAt(id), l = L[0], ids = cards(sh, l);
      expect(l.kind, id).toBe("cards"); expect(sh[l.shelf].slot, id).toBe(slot);
      expect(ids[0]).toBeNull();
      expect(ids.slice(1)).toEqual(PARTS.filter(p => p.slot === slot).map(p => p.id));
      expect(l.readOnly).toBeFalsy();
      expect(L[L.length - 1], id).toMatchObject({ kind: "chips", n: 5, readOnly: true }); // ("The sets line and 'Her broom' sit at the bottom of all three")
    }
    expect(SHELVES.tip.frame).toBe("broom");
  });
  it("only the empty slot and the parts she's found can be chosen (an unfound one is a silhouette)", () => {
    const { sh, L } = linesAt("broomBay"), tip = L[0], found = new Set(["missile"]), chips = L[L.length - 1];
    expect(canChoose(sh[tip.shelf], tip, 0, found)).toBe(true); // the empty slot
    expect(canChoose(sh[tip.shelf], tip, 1, found)).toBe(true); // the Missile nose, found
    expect(canChoose(sh[tip.shelf], tip, 2, found)).toBe(false);
    expect(canChoose(sh[tip.shelf], tip, 3, found)).toBe(false);
    expect(canChoose(sh[chips.shelf], chips, 0, found)).toBe(false); // (the chips only focus)
  });
  it("a card chosen fits the part in its slot (the empty slot empties it); on her, the set and its spell come at once, mid-night", () => {
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

describe("the broom's three stations (Ed, 2026-11-07)", () => {
  it("the workbench the tip; the lathe the chassis, the Body colour and its length, thickness and bend; the lift the exhaust, the Trim colour, its bristle size and the trail; the sets and her broom at each one's foot; no items, no shapes, no power, no pegboard", () => {
    expect(shelvesAt("broomBay")!.map(s => s.id)).toEqual(["tip", "sets"]);
    expect(shelvesAt("lathe")!.map(s => s.id)).toEqual(["chassis", "broomBody", "sets"]);
    expect(shelvesAt("broomLift")!.map(s => s.id)).toEqual(["exhaust", "broomTrim", "sets"]); // (her trail's colours, the Trail row: Ed, 2026-11-03)
    const lathe = linesAt("lathe").L, lift = linesAt("broomLift").L;
    expect(lathe.filter(l => l.kind === "grid").length).toBe(5); expect(lift.filter(l => l.kind === "grid").length).toBe(5);
    expect(lathe.filter(l => l.kind === "fit").map(l => l.axis)).toEqual(["broomLength", "broomThickness", "broomBend"]);
    expect(lift.filter(l => l.kind === "fit").map(l => l.axis)).toEqual(["bristles"]);
    for (const id of ["broomBay", "lathe", "broomLift"]) { const { sh, L } = linesAt(id); expect(L.some(l => l.kind === "items"), id).toBe(false); expect(sh.some(s => s.board), id).toBe(false); }
  });
});

describe("the pegboard", () => {
  it("is read-only: three lines of three cards, the 3 × 3 biome map row by row from the north-west (its shelf, on no station's panel since Ed, 2026-11-07: scenery)", () => {
    const sh = [SHELVES.pegboard], all = stationLines(sh, ctx()), L = all.filter(l => sh[l.shelf].board);
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

describe("item lines wrap (Ed, 2026-11-07, the bags: \"compact cards like the jacket's\")", () => {
  it("the bags' nine are two lines of cards, five and four, in order", () => {
    const sh = shelvesAt("bags")!, L = stationLines(sh, ctx(["satchel", "bumbag"]));
    const bag = sh.findIndex(s => s.id === "bag"), lines = L.filter(l => l.shelf === bag && l.kind === "items");
    expect(sh[bag].preview).toBe(true);
    expect(lines.map(l => [l.n, l.from ?? 0])).toEqual([[ITEMS_PER_LINE, 0], [sh[bag].items.length - ITEMS_PER_LINE, ITEMS_PER_LINE]]);
    expect(lines.flatMap(l => Array.from({ length: l.n }, (_, c) => itemAt(sh[bag], l, c).id))).toEqual(sh[bag].items.map(i => i.id));
  });
});

describe("the stations", () => {
  it("the broom's three modding stations (the workbench, the lathe, the lift), the pegboard scenery, the rack its pickup; the broom stand is gone", () => {
    const ids = HOUSE_ROOMS.objects.filter(o => o.use.kind === "creator").map(o => o.id);
    for (const id of ["broomBay", "lathe", "broomLift"]) expect(ids).toContain(id);
    expect(ids).not.toContain("pegboard"); expect(ids).not.toContain("broomRack");
    expect(ids).not.toContain("broomStand");
    for (const id of ids) expect(shelvesAt(id), id).not.toBeNull();
  });
});

describe("panelPad (a gamepad on a station's panel)", () => {
  const pressed = (...i: number[]) => { const b = Array(17).fill(false); for (const k of i) b[k] = true; return b; };
  it("cross chooses (Ed's playtest, 2026-10-23: he pressed it to choose; his layout, 2026-10-28: circle goes back), nothing else", () => {
    expect(panelPad(pressed(0), [0, 0, 0, 0]).choose).toBe(true);
    expect(panelPad(pressed(2), [0, 0, 0, 0]).choose).toBe(false);
    expect(panelPad(pressed(1), [0, 0, 0, 0]).choose).toBe(false);
  });
  it("the d-pad and the left stick move the selector (Ed's layout, 2026-10-28: \"the left stick or d-pad moves the highlight\"; she stands still at it)", () => {
    expect(panelPad(pressed(15), [0, 0, 0, 0]).dir).toBe("right");
    expect(panelPad(pressed(12), [0, 0, 0, 0]).dir).toBe("up");
    expect(panelPad(pressed(), [0.9, 0.2, 0, 0]).dir).toBe("right");
    expect(panelPad(pressed(), [-0.1, -0.8, 0, 0]).dir).toBe("up");
    expect(panelPad(pressed(), [0.3, 0.2, 0, 0]).dir).toBe("");
    expect(panelPad(pressed(), [0, 0, 1, 0]).dir).toBe(""); // (the right stick no longer)
  });
});

describe("a number's change, shortened (Ed, 2026-11-07: every panel fits the screen)", () => {
  it("the unit once, no spaces round the arrow", () => {
    expect([fromTo("48 m/s", "53 m/s"), fromTo("3", "1.5"), fromTo("×1.7", "×1.5"), fromTo("150°/s", "120°/s"), fromTo("2 s", "1 m")]).toEqual(["48→53 m/s", "3→1.5", "×1.7→1.5", "150→120°/s", "2 s → 1 m"]);
  });
});

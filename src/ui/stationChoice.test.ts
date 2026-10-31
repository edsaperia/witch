// A station panel's focus and choices (ui/stationChoice.ts; Ed, 2026-10-28: "she should change only when I press the 'choose'
// button"): at every station, moving the focus anywhere never changes her or her broom; choosing does; and leaving without choosing
// leaves her as she came.
import { describe, expect, it } from "vitest";
import { ITEMS, shelvesAt, shownItems, wears, type Shelf } from "../rules/wardrobe";
import { bareBroom, PARTS } from "../rules/broomParts";
import { pleasingWitch } from "./looks";
import { PanelChoice, type Genome } from "./stationChoice";
import { bindings, PAD_BUTTONS } from "../platform/bindings";
import { panelPad, itemAt } from "./stationLines";

const STATIONS = ["mirror", "dressingTable", "wardrobe", "cloakPegs", "shoeRack", "bags", "lathe"];
const ctx = {
  grid: (s: Shelf) => ({ cols: s.grid === "skin" ? 6 : 13, rows: 5 }),
  swatch: (_s: Shelf, col: number, row: number) => [col / 13, 0.3 + row / 10, 0.5],
  palette: (g: Genome) => ({ ...(g.palette ?? {}) }),
  fitOn: () => true,
};
/** A panel at `station` with her look, every item hers (or none), every part found (or none). */
function panel(station: string, all = true): PanelChoice {
  const shelves = shelvesAt(station);
  if (!shelves) throw new Error(`no station ${station}`);
  return new PanelChoice(shelves, pleasingWitch(7) as unknown as Genome, new Set(all ? ITEMS.map(i => i.id) : []), new Set(all ? PARTS.map(p => p.id) : []), bareBroom(), ctx);
}
/** Every place on the panel, walked by moves alone: along each line and down to the next, then back up. */
function walk(p: PanelChoice): number {
  let steps = 0;
  for (let guard = 0; guard < 200; guard++) {
    while (p.move(1, 0)) steps++;
    if (!p.move(0, 1)) break;
    steps++;
    while (p.move(-1, 0)) steps++;
  }
  while (p.move(0, -1)) steps++;
  return steps;
}

describe("a station panel: moving only moves the focus, choosing changes her (Ed, 2026-10-28)", () => {
  it("every morning clothing station dresses her when its unchanged default is chosen", () => {
    for (const station of ["wardrobe", "cloakPegs", "shoeRack", "bags"]) {
      const p = panel(station);
      p.awaitingDress = true;
      const before = JSON.stringify(p.g);
      const L = p.lines();
      const line = L.findIndex(l => l.kind === "items" && Array.from({ length: l.n }, (_, col) => itemAt(p.shelves[l.shelf], l, col)).some(it => wears(p.g, it)));
      const l = L[line];
      expect(l, station).toBeDefined();
      const col = Array.from({ length: l.n }, (_, i) => i).find(i => wears(p.g, itemAt(p.shelves[l.shelf], l, i)))!;
      const item = itemAt(p.shelves[l.shelf], l, col);
      p.focus(line, col);
      expect(p.wears(item), station).toBe(false);
      expect(JSON.stringify(p.g)).toBe(before);
      expect(p.choose().look, station).toBeDefined(); // the page receives the dressing callback even with an unchanged saved outfit
      expect(p.awaitingDress, station).toBe(false);
      expect(p.wears(item), station).toBe(true);
      expect(JSON.stringify(p.g)).toBe(before);
      expect(p.choose().look, station).toBeUndefined();
    }
  });

  it("at every station, moving through every place never changes her look or her broom", () => {
    for (const st of STATIONS) {
      const p = panel(st), look = JSON.stringify(p.g), broom = JSON.stringify(p.fitted);
      const steps = walk(p);
      expect(steps, st).toBeGreaterThan(0);
      expect(JSON.stringify(p.g), st).toBe(look);
      expect(JSON.stringify(p.fitted), st).toBe(broom);
    }
  });

  it("choosing an unchanged colour also dresses her, including a shoe rack with no item row", () => {
    for (const station of ["wardrobe", "cloakPegs", "shoeRack", "bags"]) {
      const p = panel(station, false), L = p.lines(), line = L.findIndex(l => l.kind === "grid"), l = L[line];
      p.focus(line, 0);
      p.g.palette = { ...p.g.palette, [p.partOf(p.shelves[l.shelf])]: ctx.swatch(p.shelves[l.shelf], 0, l.row!) };
      const before = JSON.stringify(p.g);
      p.awaitingDress = true;
      expect(p.choose().look, station).toBeDefined();
      expect(JSON.stringify(p.g), station).toBe(before);
      expect(p.awaitingDress, station).toBe(false);
      expect(p.choose().look, station).toBeUndefined();
    }
  });

  it("choosing an item she owns and isn't wearing puts it on; choosing again changes nothing more", () => {
    let tried = 0;
    for (const st of STATIONS) {
      const p = panel(st), L = p.lines();
      L.forEach((l, line) => {
        if (l.kind !== "items") return;
        const items = l.item !== undefined ? [itemAt(p.shelves[l.shelf], l, 0)] : shownItems(p.shelves[l.shelf]), col = items.findIndex(it => !wears(p.g, it)); // (a list's line: its own one item)
        if (col < 0) return;
        p.focus(line, col);
        const before = JSON.stringify(p.g), r = p.choose();
        expect(r.look, `${st} ${items[col].id}`).toBeDefined();
        expect(wears(p.g, items[col]), `${st} ${items[col].id}`).toBe(true);
        expect(JSON.stringify(p.g)).not.toBe(before);
        expect(p.choose().look).toBeUndefined(); // (worn already)
        tried++;
      });
    }
    expect(tried).toBeGreaterThan(5);
  });

  it("choosing a colour puts it on the part the colours are for, and choosing a part first moves the colours to it", () => {
    const p = panel("wardrobe"), L = p.lines();
    const grid = L.findIndex(l => l.kind === "grid"), s = p.shelves[L[grid].shelf];
    p.focus(grid, 3); const r = p.choose();
    expect(r.look?.palette?.[s.colour![0]]).toEqual(ctx.swatch(s, 3, L[grid].row!));
    const parts = L.findIndex(l => l.kind === "parts" && l.shelf === L[grid].shelf);
    if (parts >= 0 && L[parts].n > 1) {
      p.focus(parts, 1); expect(p.choose().look).toBeUndefined(); // (a part chosen: nothing on her yet)
      expect(p.partOf(s)).toBe(s.colour![1]);
      p.focus(grid, 5); expect(p.choose().look?.palette?.[s.colour![1]]).toEqual(ctx.swatch(s, 5, L[grid].row!));
    }
  });

  it("at the bags, a list: down moves bag to bag changing nothing, choosing a bag's line wears that bag", () => {
    const p = panel("bags"), L = p.lines(), bag = p.shelves.findIndex(s => s.id === "bag"), lines = L.map((l, i) => [l, i] as const).filter(([l]) => l.shelf === bag && l.kind === "items");
    expect(lines.length).toBe(p.shelves[bag].items.length);
    p.focus(lines[0][1], 0);
    const before = JSON.stringify(p.g);
    for (let k = 1; k < lines.length; k++) { expect(p.move(0, 1)).toBe(true); expect(p.at.line).toBe(lines[k][1]); }
    expect(JSON.stringify(p.g)).toBe(before);
    const want = lines.map(([l]) => itemAt(p.shelves[bag], l, 0)).find(it => !wears(p.g, it))!, at = lines.find(([l]) => itemAt(p.shelves[bag], l, 0) === want)![1];
    p.focus(at, 0); p.choose();
    expect(wears(p.g, want)).toBe(true);
  });

  it("an item still to be found, chosen, changes nothing and is marked till the focus moves", () => {
    const p = panel("wardrobe", false), L = p.lines(), items = L.findIndex(l => l.kind === "items");
    if (items < 0) return; // (nothing to choose among with none owned)
    p.focus(items, 0);
    const before = JSON.stringify(p.g), r = p.choose();
    expect(r).toEqual({ locked: true });
    expect(JSON.stringify(p.g)).toBe(before);
    expect(p.nope).toEqual(p.at);
    p.move(1, 0);
    expect(p.nope).toBeNull();
  });

  it("at the broom's station, moving over the cards fits nothing; choosing one fits it", () => {
    const p = panel("lathe"), L = p.lines();
    walk(p);
    expect(p.fitted).toEqual(bareBroom());
    p.focus(0, 1);
    const r = p.choose();
    expect(r.fitted).toBeDefined();
    expect(Object.values(p.fitted!).filter(Boolean).length).toBe(1);
    expect(L[0].kind).toBe("cards");
  });

  it("leaving without choosing leaves her as she came, however much the focus moved", () => {
    for (const st of STATIONS) {
      const came = pleasingWitch(7) as unknown as Genome, p = panel(st);
      walk(p); walk(p);
      // (the panel closes: what she wears is what the choice holds, unchosen)
      expect(p.g, st).toEqual(came);
    }
  });

  it("choose and back are the bindings' (platform/bindings.ts): the pad's choose button chooses, its back doesn't", () => {
    const press = (i: number) => { const b = Array(17).fill(false); b[i] = true; return b; };
    for (const p of bindings.pad("menu.choose")) expect(panelPad(press(PAD_BUTTONS[p]), [0, 0, 0, 0]).choose).toBe(true);
    for (const p of bindings.pad("menu.back")) expect(panelPad(press(PAD_BUTTONS[p]), [0, 0, 0, 0]).choose).toBe(false);
    expect(bindings.keys("menu.choose")).toContain("Space");
    expect(bindings.keys("menu.back")).toContain("KeyE");
  });
});

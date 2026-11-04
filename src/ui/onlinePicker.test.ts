import { expect, it, vi } from "vitest";
import { StationPanel } from "./stationPanel";
import { PanelChoice, type Genome } from "./stationChoice";
import { BoothNav, DjBooth } from "./djBooth";
import { shelvesAt, ITEMS } from "../rules/wardrobe";
import { WITCH_GENOME } from "../../art/witchGenome.js";
import { RECORDS } from "../rules/records";
it("reconciles an open station without choosing/sliding, retains focus and cancels a stale delayed look", () => {
  vi.useFakeTimers();
  try {
    const g = structuredClone(WITCH_GENOME) as unknown as Genome, shelves = shelvesAt("cloakPegs")!, c = new PanelChoice(shelves, g, new Set(), new Set(), null, { grid: () => ({ cols: 13, rows: 5 }), swatch: () => [0, 0, 0], palette: () => ({}), fitOn: () => true });
    const look = vi.fn(), paint = vi.fn(), timer = setTimeout(look, 100), panel = { id: "cloakPegs", c, ws: null, lookTimer: timer, paint };
    Object.setPrototypeOf(panel, StationPanel.prototype); c.focus(0, 0);
    const authoritative = { ...g, cloak: "long" };
    StationPanel.prototype.reconcile.call(panel as unknown as StationPanel, authoritative, new Set([ITEMS[0].id]));
    expect(c.at).toEqual({ line: 0, col: 0 }); expect(c.g.cloak).toBe("long"); expect([...c.owned]).toEqual([ITEMS[0].id]);
    vi.runAllTimers(); expect(look).not.toHaveBeenCalled(); expect(paint).toHaveBeenCalledTimes(1);
  } finally { vi.useRealTimers(); }
});
it("refreshes DJ ownership without moving focus or retaining a revoked record selection", () => {
  const nav = new BoothNav(new Set([RECORDS[0].id]), RECORDS[0].id), panel = { nav, said: "", paint: vi.fn() };
  nav.focus = RECORDS.length; Object.setPrototypeOf(panel, DjBooth.prototype);
  DjBooth.prototype.refresh.call(panel as unknown as DjBooth, [RECORDS[1].id]);
  expect(panel.nav.focus).toBe(RECORDS.length); expect(panel.nav.chosen).toBeNull(); expect(panel.nav.ready).toBe(false);
  expect([...panel.nav.owned]).toEqual([RECORDS[1].id]);
});

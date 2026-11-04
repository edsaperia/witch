// The Broom station's Trail row (Ed, 2026-11-03: "set the colour set of your trail in the broom station and there are a few presets"):
// a tile a preset, moving only focuses, choosing sets her trail's colours; and the choice kept with her broom (app/broomSave.ts).
import { describe, expect, it } from "vitest";
import { ITEMS, shelvesAt, type Shelf } from "../rules/wardrobe";
import { bareBroom, PARTS } from "../rules/broomParts";
import { pleasingWitch } from "./looks";
import { PanelChoice, type Genome } from "./stationChoice";
import { stationLines } from "./stationLines";
import { TRAIL_PRESETS } from "../render/trailColours";
import { chooseTrail, fitBroom, loadBroom } from "../app/broomSave";
import { fittedOf } from "../rules/broomParts";

const ctx = { grid: (s: Shelf) => ({ cols: s.grid === "skin" ? 6 : 13, rows: 5 }), swatch: () => [0, 0, 0], palette: (g: Genome) => ({ ...(g.palette ?? {}) }), fitOn: () => true };
const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

describe("the Broom station's Trail row", () => {
  it("is on the Broom station, a tile a preset", () => {
    const shelves = shelvesAt("lathe")!, L = stationLines(shelves, { owned: new Set(), fitOn: () => true, grid: () => ({ cols: 13, rows: 5 }) });
    const t = L.find(l => l.kind === "trail");
    expect(t).toBeTruthy(); expect(t!.n).toBe(TRAIL_PRESETS.length); expect(shelves[t!.shelf].label).toBe("Trail");
  });
  it("sets her trail's colours when a tile is chosen (moving onto it changes nothing)", () => {
    const p = new PanelChoice(shelvesAt("lathe")!, pleasingWitch(3) as unknown as Genome, new Set(ITEMS.map(i => i.id)), new Set(PARTS.map(x => x.id)), bareBroom(), ctx);
    const line = p.lines().findIndex(l => l.kind === "trail");
    p.focus(line, 0); expect(p.choose().trail).toBeUndefined(); // (the one she has: nothing to change)
    p.move(1, 0); expect(p.trail).toBe("warm");
    const r = p.choose(); expect(r.trail).toBe(TRAIL_PRESETS[1].id); expect(r.look).toBeUndefined(); expect(r.fitted).toBeUndefined();
    expect(p.trail).toBe(TRAIL_PRESETS[1].id);
  });
  it("keeps her choice with her broom, through a refit; an unknown preset isn't kept", () => {
    const s = store();
    expect(loadBroom(s).trail).toBeUndefined();
    chooseTrail("ice", s); expect(loadBroom(s).trail).toBe("ice");
    fitBroom(fittedOf("-,-,-"), s); expect(loadBroom(s).trail).toBe("ice");
    chooseTrail("nonsense", s); expect(loadBroom(s).trail).toBe("ice");
  });
});

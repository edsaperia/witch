// The no-scroll rule's estimate (Ed, 2026-11-07: "no station menu is taller than the screen at 1280×720, so there's no scrolling";
// "Up to about two items per station is what fits"): each station's panel (the clothes' and the broom's three), as its lines would draw it (ui/stationLines.ts
// panelEm, the CSS's heights in em), on a fresh save and with everything owned, fits the screen's height at 1280×720 (the panel's
// type 1.45vw there: 18.56 px). Rough by a line or so: the built game's own measure, tools/stations/check.cjs, is the judge.
import { describe, expect, it } from "vitest";
import { ITEMS, STARTING_SET, shelvesAt } from "../rules/wardrobe";
import { panelEm, stationLines } from "./stationLines";

export const CLOTHES_STATIONS = ["mirror", "dressingTable", "basin", "wardrobe", "shoeRack", "cloakPegs", "bags", "broomBay", "lathe", "broomLift"]; // (and the broom's three: Ed, 2026-11-07)
const SCREEN_EM = 720 / Math.min(26, Math.max(15, 1280 * 0.0145));
// (every fit slider shown: the most there can be)
const lines = (station: string, owned: Iterable<string>) => stationLines(shelvesAt(station)!, { owned: new Set(owned), fitOn: () => true, grid: s => ({ cols: s.grid === "skin" ? 3 : 13, rows: 5 }) });

describe("every station's panel fits the screen at 1280×720 (Ed, 2026-11-07)", () => {
  for (const station of CLOTHES_STATIONS) for (const [state, owned] of [["fresh", STARTING_SET], ["everything owned", ITEMS.map(i => i.id)]] as const) {
    it(`${station}, ${state}`, () => {
      const em = panelEm(shelvesAt(station)!, lines(station, owned));
      expect(em, `${station} ${state}: ${em.toFixed(1)} em of ${SCREEN_EM.toFixed(1)}`).toBeLessThanOrEqual(SCREEN_EM);
    });
  }
  it("holds about two items each (cards, not counting the basin's Teeth button)", () => {
    for (const station of CLOTHES_STATIONS) expect(shelvesAt(station)!.filter(s => !s.action && !s.sets && !s.trail).length, station).toBeLessThanOrEqual(3); // (the broom's sets and her broom at each one's foot, and the lift's trail, aside)
  });
});

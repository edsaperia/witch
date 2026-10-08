import { describe, expect, it } from "vitest";
import { ROBE_JACKET, HAND_HAT_TIP, handHatTip } from "./body";
import { HAIR_LONG_BACK, HAIR_LONG_CROWN, HAIR_LONG_FRONT, HAIR_LONG_HAT_SHADOW } from "./hairLong";
import { HAT_CLASSIC, classicHat } from "./hatClassic";
import { POINTED_HATS } from "./hatsPointed";
import { HAIR_MAPS } from "./hairStyles";
import * as Gen from "../../../../art/witchGenome.js";
import { missingLetters, type PixMap } from "./pixmap";
import { LEGEND } from "../sprite";

// Art builder 1's round-2 maps (docs/PORTRAIT-STYLE.md): well-formed, the sliders always changing something, few orphans.
const MAPS: Record<string, PixMap> = { HAT_CLASSIC, HAIR_LONG_BACK, HAIR_LONG_FRONT, HAIR_LONG_CROWN, HAIR_LONG_HAT_SHADOW, ROBE_JACKET, HAND_HAT_TIP };
/** Lone pixels: a material none of its eight neighbours has (the glints, and the fringe's 1 px shadow on her forehead, aside).
 *  Hand anti-aliasing (an in-between tone of the same material) isn't lone. */
const orphans = (m: PixMap, skip = "+") => {
  let n = 0; const mat = (c: string | undefined) => (c && c !== "." ? Math.floor((LEGEND[c] - 2) / 6) : -1);
  m.rows.forEach((r, y) => [...r].forEach((c, x) => {
    if (c === "." || skip.includes(c)) return;
    let same = false; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && mat(m.rows[y + dy]?.[x + dx]) === mat(c)) same = true;
    if (!same) n++;
  }));
  return n;
};
const D = { hatHeight: 1, hatBrim: 1, hatTilt: 0 };
const key = (m: PixMap) => m.rows.join("\n") + m.anchor.join(",");

describe("the portrait's round-2 maps (art builder 1)", () => {
  it("are well formed: every row the same width, every letter in the legend, the anchor inside", () => {
    for (const [name, m] of Object.entries(MAPS)) {
      expect(new Set(m.rows.map(r => r.length)).size, name).toBe(1);
      expect(missingLetters(m), name).toEqual([]);
      expect(m.rows.length, name).toBeGreaterThan(2);
    }
  });
  it("leave no lone pixels", () => { for (const [name, m] of Object.entries(MAPS)) expect(orphans(m, name === "HAIR_LONG_FRONT" ? "+k" : "+"), name).toBe(0); });
  it("draws the classic hat as drawn at the creator's defaults, its anchor the brim's centre", () => {
    const h = classicHat(D);
    expect(h.rows.map(r => r.replace(/^\.{8}|\.{8}$/g, ""))).toEqual(HAT_CLASSIC.rows);
    expect(h.anchor).toEqual([HAT_CLASSIC.anchor[0] + 8, HAT_CLASSIC.anchor[1]]);
  });
  it("changes the hat with every slider across its range (height in rows, brim in columns, tilt by shearing)", () => {
    for (const [axis, vals] of [["hatHeight", [0.3, 0.7, 1, 1.6, 2.2, 3]], ["hatBrim", [0.3, 0.7, 1, 1.6, 2.2, 2.6]], ["hatTilt", [-0.9, -0.4, 0, 0.4, 0.7, 1]]] as const) {
      const maps = vals.map(v => classicHat({ ...D, [axis]: v }));
      expect(new Set(maps.map(key)).size, axis).toBe(vals.length);
    }
    expect(classicHat({ ...D, hatHeight: 2 }).rows.length).toBe(HAT_CLASSIC.rows.length + 18);
    expect(classicHat({ ...D, hatBrim: 2 }).rows[0].length).toBe(HAT_CLASSIC.rows[0].length + 16 + 24);
    const tip = (m: PixMap) => m.rows.findIndex(r => r.includes("O")) >= 0 ? m.rows.find(r => r !== ".".repeat(r.length))!.search(/[^.]/) - m.anchor[0] : 0;
    expect(tip(classicHat({ ...D, hatTilt: 1 }))).toBeGreaterThan(tip(classicHat(D)) + 4);
    expect(tip(classicHat({ ...D, hatTilt: -0.9 }))).toBeLessThan(tip(classicHat(D)) - 4);
  });
  it("keeps the hat-tip hand on the brim's end as the brim grows", () => {
    expect(handHatTip({ hatBrim: 2 }).anchor[0]).toBe(HAND_HAT_TIP.anchor[0] - 12);
    expect(handHatTip({ hatBrim: 1 }).anchor).toEqual(HAND_HAT_TIP.anchor);
  });
  it("makes the other pointed hats from the classic, each its own and each still following the sliders", () => {
    const base = key(classicHat(D)), seen = new Set<string>();
    for (const [name, f] of Object.entries(POINTED_HATS)) {
      const m = f(D); seen.add(key(m));
      expect(missingLetters(m), name).toEqual([]);
      expect(new Set(m.rows.map(r => r.length)).size, name).toBe(1);
      if (name !== "classic") expect(key(m), name).not.toBe(base);
      for (const axis of ["hatHeight", "hatBrim", "hatTilt"] as const) expect(key(f({ ...D, [axis]: D[axis] + 0.6 })), `${name} ${axis}`).not.toBe(key(m));
    }
    expect(seen.size).toBe(Object.keys(POINTED_HATS).length);
  });
  it("draws every hair style the creator has, in four layers, each well formed with no lone pixels", () => {
    for (const hair of (Gen.WITCH_AXES as unknown as { hair: string[] }).hair) {
      const h = HAIR_MAPS[hair]; expect(h, hair).toBeDefined();
      for (const [layer, m] of Object.entries(h) as [string, PixMap][]) {
        expect(missingLetters(m), `${hair} ${layer}`).toEqual([]);
        expect(new Set(m.rows.map((r: string) => r.length)).size, `${hair} ${layer}`).toBe(1);
        expect(orphans(m, layer === "front" ? "+k" : "+"), `${hair} ${layer}`).toBe(0);
      }
    }
    const fronts = Object.values(HAIR_MAPS).map(h => key(h.front));
    expect(new Set(fronts).size).toBe(fronts.length);
  });
});

import { describe, expect, it } from "vitest";
import { TUNING } from "../../rules/tuning";
import { toEvolve } from "../../rules/berries";
import { dotAt, rankColour, rankOf, shownDots, youthDots, RANKS_DEFAULT } from "./ranks";

describe("rank sigils", () => {
  it("a youth's dots are its berries to adult less the last (eaten at a placed sigil), read from the rules", () => {
    for (const species of ["snail", "fox", "bear"]) {
      const need = toEvolve(1, TUNING, species);
      expect(youthDots({ level: 1, species }, 0, TUNING)).toEqual({ n: Math.round(need) - 1, lit: 0 });
      expect(youthDots({ level: 1, species }, 99, TUNING).lit).toBe(Math.round(need) - 1); // (never more lit than it has)
    }
    // follows the berry tuning: a cost of 4 (Foxtrot's normal) is three dots
    const t = structuredClone(TUNING), d = youthDots({ level: 1, species: "fox" }, 2, t);
    expect(d.n).toBe(Math.round(toEvolve(1, t, "fox")) - 1);
    expect(d.lit).toBe(2);
  });
  it("at most two rows of four drawn, lit in proportion", () => {
    expect(shownDots({ n: 7, lit: 3 })).toEqual({ n: 7, lit: 3 });
    expect(shownDots({ n: 15, lit: 15 })).toEqual({ n: 8, lit: 8 });
    expect(shownDots({ n: 15, lit: 7 })).toEqual({ n: 8, lit: 3 });
  });
  it("only a youth has dots", () => {
    for (const level of [0, 2, 3] as const) expect(youthDots({ level, species: "fox" }, 3, TUNING).n).toBe(0);
  });
  it("two rows off to the right, at most four a row, the rows interlocking", () => {
    const pts = Array.from({ length: 8 }, (_, i) => dotAt(i, 8));
    expect(pts.every(p => p.x > 0.5)).toBe(true); // (right of the glyph)
    expect(new Set(pts.map(p => p.y)).size).toBe(2);
    expect(new Set(pts.map(p => p.x)).size).toBe(8); // (no two on top of each other)
    expect(Math.max(...pts.map(p => p.x))).toBeLessThan(0.66 + 4 * 0.3);
  });
  it("ranks: baby turquoise, youth purple, adult red, legend yellow", () => {
    expect(rankOf({ level: 3 })).toBe(3);
    const [t, p, r, y] = [0, 1, 2, 3].map(k => rankColour(TUNING, k));
    expect(t[1] > t[0] && t[2] > t[0]).toBe(true); // turquoise: green and blue
    expect(p[2] > p[1] && p[0] > p[1]).toBe(true); // purple: blue and red over green
    expect(r[0] > 0.9 && r[1] < 0.4).toBe(true); // red
    expect(y[0] > 0.9 && y[1] > 0.8 && y[2] < 0.4).toBe(true); // yellow
    expect(TUNING.leash.ranks?.on ?? RANKS_DEFAULT.on).toBe(false); // (off until Ed has played it: ?sigils=new)
  });
});

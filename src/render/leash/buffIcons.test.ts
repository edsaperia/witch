// The follower buffs' icons (render/leash/buffIcons.ts): one a group, 12 × 12, each its own.
import { describe, expect, it } from "vitest";
import { BUFF_ICONS, ICON_GRID, iconTwinkle } from "./buffIcons";
import { BUFF_GROUPS } from "../../rules/buffs";

describe("buff icons", () => {
  it("one for every group, 12 rows of 12, none blank, no two alike", () => {
    const seen = new Set<string>();
    for (const g of BUFF_GROUPS) {
      const rows = BUFF_ICONS[g];
      expect(rows.length, g).toBe(ICON_GRID);
      for (const r of rows) expect(r, g).toMatch(/^[.#]{12}$/);
      expect(rows.join("").includes("#"), g).toBe(true);
      seen.add(rows.join(""));
    }
    expect(seen.size).toBe(BUFF_GROUPS.length);
  });
  it("an unfed icon twinkles once a period, dim to bright", () => {
    const k = Array.from({ length: 80 }, (_, i) => iconTwinkle(i * 0.01, 0.8, 3));
    expect(Math.min(...k)).toBeLessThan(0.35);
    expect(Math.max(...k)).toBeGreaterThan(1);
    expect(iconTwinkle(0.1, 0.8, 3)).toBeCloseTo(iconTwinkle(0.9, 0.8, 3), 9);
  });
});

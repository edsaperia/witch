// The follower buffs' icons (render/leash/buffIcons.ts): one a group, 12 × 12, each its own.
import { describe, expect, it } from "vitest";
import { BUFF_ICONS, ICON_GRID } from "./buffIcons";
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
});

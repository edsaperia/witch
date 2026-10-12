// The trunks' shadows' tuning (render/trunkShadows.ts; Ed, 2026-10-12): his tuned values as the defaults, the fades at the trunk's
// foot and as she nears it, the taper for wide roots, and the shadow darkening the ground cover.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";

describe("trunk shadows' defaults", () => {
  it("are Ed's tuned values", () => {
    expect(TUNING.shadows.trunks).toMatchObject({ mode: "soft", strength: 0.75, long: 2.5, glowReach: 50, glowHeight: 1.25, core: 0.8, across: 1 });
    expect(TUNING.lights.campfire.reach).toBe(40);
  });
  it("fade at the foot and near her, taper at the foot, and darken the ground cover", () => {
    const T = TUNING.shadows.trunks!;
    expect(T.foot).toBeGreaterThan(0);
    expect(T.taper).toBeGreaterThan(0);
    expect(T.near).toBeGreaterThan(0);
    expect(T.cover).toBeGreaterThan(0);
  });
});

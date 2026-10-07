import { describe, expect, it } from "vitest";
import { AREA_TEXTURE_MAX, areaTexelsPerMetre } from "./ground";

describe("the ground's area texture", () => {
  it("keeps 2 texels a metre while the map fits", () => {
    expect(areaTexelsPerMetre(2000)).toBe(2);
    expect(areaTexelsPerMetre(4000)).toBe(2);
  });
  it("never asks for more than the GPU's largest texture (the 4176 m map was 8352 texels across)", () => {
    for (const size of [4096, 4176, 6000, 9000]) for (const max of [4096, 8192]) {
      const tpm = areaTexelsPerMetre(size, max), side = Math.ceil((size * tpm) / 32) * 32;
      expect(side).toBeLessThanOrEqual(max);
      expect(tpm).toBeGreaterThan(0);
    }
    expect(Math.ceil((4176 * areaTexelsPerMetre(4176)) / 32) * 32).toBeLessThanOrEqual(AREA_TEXTURE_MAX);
  });
});

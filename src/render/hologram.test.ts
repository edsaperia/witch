import { describe, expect, it } from "vitest";
import { damageStage } from "./hologram";

describe("hologram damage stages", () => {
  it("steps at 75%, 50% and 25% of the soundsystem's health, as the projector's art does", () => {
    expect(damageStage(0)).toBe(0);
    expect(damageStage(0.2)).toBe(0);
    expect(damageStage(0.3)).toBe(1);
    expect(damageStage(0.55)).toBe(2);
    expect(damageStage(0.8)).toBe(3);
    expect(damageStage(1)).toBe(3);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import type { Baked, MakeCanvas } from "./artBuild";

const m = vi.hoisted(() => ({ critter: vi.fn(), bake: vi.fn(), override: vi.fn(), poses: vi.fn() }));
vi.mock("./creatureArt.primitives", () => ({
  M: { EYE: 1, IRIS: 2, PUPIL: 3 }, walkGait: () => ({ frames: 3 }),
  critter: m.critter, bake: m.bake, speciesColours: () => [],
}));
vi.mock("./overrides", () => ({ overrideFor: m.override, poseName: m.poses }));
import { creatureSprites } from "./creatureArt";

afterEach(() => vi.clearAllMocks());
describe("party current-age drawing", () => {
  it("requests exactly the selected age in both facings with the unchanged outfit and pose inputs", () => {
    m.critter.mockReturnValue({ m: new Uint8Array([1, 0, 0, 0]) });
    m.bake.mockImplementation(() => ({ w: 2, h: 2 }) as Baked); m.override.mockReturnValue(undefined);
    const style = { cOutline: "same" } as unknown as Parameters<typeof creatureSprites>[0];
    const gear = { hat: 1, face: "happy" }, mk = (() => { throw Error("mock bake should not draw"); }) as MakeCanvas;
    for (let age = 0; age < 4; age++) {
      vi.clearAllMocks();
      const sprites = creatureSprites(style, "fox", mk, gear, age);
      expect(sprites).toHaveLength(6); expect(m.critter).toHaveBeenCalledTimes(6);
      expect(m.critter.mock.calls.map(c => [c[1], c[2], c[4], c[5]])).toEqual(
        ["towards", "away"].flatMap(facing => [0, 1, 2].map(f => [age, f, facing, gear])));
      expect(m.poses.mock.calls).toEqual([false, true].flatMap(away => [0, 1, 2].map(f => [age, f, away])));
    }
    vi.clearAllMocks();
    expect(creatureSprites(style, "fox", mk)).toHaveLength(24);
    expect(new Set(m.critter.mock.calls.map(c => c[1]))).toEqual(new Set([0, 1, 2, 3]));
  });
});

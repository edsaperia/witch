import { describe, expect, it } from "vitest";
import { LAYERS, parseLayers } from "./layers";

describe("?layers= (render/layers.ts)", () => {
  it("turns off the layers named, with or without a minus, and ignores unknown names", () => {
    expect([...parseLayers("?layers=-cutout,-mist")].sort()).toEqual(["cutout", "mist"]);
    expect([...parseLayers("?layers=glow, -fog ,nonsense")].sort()).toEqual(["fog", "glow"]);
    expect(parseLayers("?seed=1").size).toBe(0);
  });
  it("names every candidate the canopy-circle hunt asked for", () => {
    for (const k of ["cutout", "trunkfade", "tufts", "canopyshadow", "glow", "nightlight", "fog", "mist", "rings", "tilt", "bloom", "holograms", "clearing"]) expect(LAYERS).toHaveProperty(k);
  });
});

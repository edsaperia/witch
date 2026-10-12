// The hats' art in play (render/view/hatArt.ts): the Cyclone's whirlwind rises once, loops for the spell, falls apart over its
// fling, then is gone; every frame it names is baked (render/artBuild.ts CYCLONE_FRAMES); and the sprouts and frames exist.
import { describe, expect, it } from "vitest";
import { cycloneFrame } from "./hatArt";
import { CYCLONE_FRAMES, HARVEST_SPROUTS } from "../artBuild";
import * as Art from "../../../art/generator.js";

describe("the Cyclone's whirlwind", () => {
  it("rises, loops a turn a second, falls apart over its fling, then is gone", () => {
    expect(cycloneFrame(-0.1, 3, 0.5)).toBeNull();
    expect(cycloneFrame(0, 3, 0.5)).toBe("fx:cycloneRise/0");
    expect(cycloneFrame(0.3, 3, 0.5)).toBe("fx:cycloneRise/2");
    expect(cycloneFrame(1, 3, 0.5)).toBe("fx:cyclone/0");
    expect(cycloneFrame(1.25, 3, 0.5)).toBe("fx:cyclone/2");
    expect(cycloneFrame(3, 3, 0.5)).toBe("fx:cycloneFall/0");
    expect(cycloneFrame(3.45, 3, 0.5)).toBe("fx:cycloneFall/2");
    expect(cycloneFrame(3.5, 3, 0.5)).toBeNull();
  });

  it("names only frames the art has, and the sprouts are real pieces", () => {
    const baked = new Set(CYCLONE_FRAMES.flatMap(([id, n]) => Array.from({ length: n }, (_, f) => `fx:${id}/${f}`)));
    for (let e = 0; e < 3.6; e += 1 / 60) { const f = cycloneFrame(e, 3, 0.5); if (f) expect(baked.has(f)).toBe(true); }
    for (const [id, n] of CYCLONE_FRAMES) expect((Art.EFFECT_BY_ID as Record<string, { frames: number }>)[id].frames).toBe(n);
    for (const ref of HARVEST_SPROUTS) expect(Art.sceneRefExists(ref)).toBe(true);
  });
});

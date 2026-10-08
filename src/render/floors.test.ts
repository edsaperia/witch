// Floors never draw over actors (Ed's playtest, 2026-10-06: "Animal appears to be sunk in the ground - I think the sports field
// isn't sitting flat on the ground properly"): every floor's batch (render/sprites.ts asFloor) draws right after the ground and
// before anything standing, and writes no depth, so nothing on it or at its edge is ever hidden by it.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { FLOOR_ORDER, SpriteBatch, asFloor } from "./sprites";

const atlas = () => ({ albedo: new THREE.Texture(), normal: new THREE.Texture(), frames: [{ x: 0, y: 0, w: 4, h: 4 }], width: 4, height: 4 }) as never;

describe("floors under every actor", () => {
  it("draws a floor after the ground and before creatures, scenery and shadows, writing no depth", () => {
    const floor = asFloor(new SpriteBatch(atlas(), 0.1, { scenery: true, flat: true }));
    const creature = new SpriteBatch(atlas(), 0.1, { solid: true, rim: true });
    const scenery = new SpriteBatch(atlas(), 0.1, { scenery: true });
    expect(FLOOR_ORDER).toBeGreaterThan(-1); // (the ground's, render/view.ts)
    for (const m of floor.meshes) {
      expect(m.renderOrder).toBe(FLOOR_ORDER);
      expect((m.material as THREE.Material).depthWrite).toBe(false);
      expect(m.renderOrder).toBeLessThan(creature.mesh.renderOrder);
      expect(m.renderOrder).toBeLessThan(scenery.mesh.renderOrder);
      expect(m.renderOrder).toBeLessThan(1); // (the shadows')
    }
  });
});

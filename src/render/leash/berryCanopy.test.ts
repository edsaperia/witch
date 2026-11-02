import { describe, expect, it, vi } from "vitest";
import { LeashView } from "../leash";

// Ed, 2026-11-02: "I can see berries through the canopy, and I shouldn't be able to." From the treetops a berry's glint goes in
// the depth-tested glow layer (`standing`), so a crown nearer the camera hides it, as it hides any ground thing; never in `over`
// (no depth test, drawn after the see-through passes), which put it on top of every crown.
function view(lift: number) {
  const standing = { add: vi.fn() }, over = { add: vi.fn() }, flat = { add: vi.fn() };
  const game = {
    tuning: { beat: { bpm: 120 }, berries: { glow: 1, babyReach: 10 } },
    witch: { x: 0, z: 0, lift, mode: lift > 0.5 ? "treetop" : "ground" },
    berries: { events: [], berries: [{ id: 0, bush: 0, gone: false, claimedBy: null }, { id: 1, bush: 1, gone: false, claimedBy: null }], bushes: [{ x: 30, z: 20 }, { x: -80, z: 5 }], evolving: new Map(), fed: new Map(), ateAt: new Map() },
    creatures: [],
    leash: { stack: [], relics: [] },
  };
  const v = Object.assign(Object.create(LeashView.prototype), {
    game, standing, over, flat, evolved: new Map(), berryRgb: [0.6, 0.05, 0.1],
    uv: () => [0, 0, 1, 1], look: { magic: { draw: vi.fn() } },
  }) as LeashView;
  return { v, standing, over };
}

describe("berries under the canopy", () => {
  it("from the treetops, each berry's glint is depth-tested, never drawn over the crowns", () => {
    const { v, standing, over } = view(0.75);
    v.drawBerries(1);
    expect(over.add).not.toHaveBeenCalled();
    expect(standing.add).toHaveBeenCalledTimes(2);
  });
  it("on the ground, the halos stay depth-tested too", () => {
    const { v, standing, over } = view(0);
    v.drawBerries(1);
    expect(over.add).not.toHaveBeenCalled();
    expect(standing.add).toHaveBeenCalled();
  });
  it("the glow layer the glints go in tests depth; the over layer doesn't", async () => {
    const src = (await import("node:fs")).readFileSync(new URL("../leash.ts", import.meta.url), "utf8");
    expect(src).toMatch(/this\.standing = new Instances\(mat\(0\)\)/); // (mat's depthTest defaults to true)
    expect(src).toMatch(/this\.over = new Instances\(mat\(0, false\)\)/);
  });
});

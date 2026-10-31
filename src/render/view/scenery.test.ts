import { afterEach, expect, it, vi } from "vitest";
import type { View } from "../view";

vi.mock("../../rules/game", () => ({ poseOf: () => ({ distance: 100, angle: 45 }) }));
vi.mock("../../rules/partyOver", () => ({ relicsOut: () => [] }));
vi.mock("./culling", () => ({ focusOf: () => ({ x: 0, z: 0 }), viewRect: () => ({ minX: -100, maxX: 100, minZ: -100, maxZ: 100 }), inView: () => false }));

afterEach(() => vi.restoreAllMocks());

it.each(["trees", "bushes"])("yields while scanning %s rejected before sprite creation", async kind => {
  // (a fresh copy under the mocks above: tests share module state, isolate false, and another file may have loaded the real one)
  vi.resetModules();
  const { cancelRefresh, refresh } = await import("./scenery");
  // A deterministic work clock: missing art/off-screen candidates used to bypass every yield.
  let now = 0, visited = 0;
  vi.spyOn(performance, "now").mockImplementation(() => now++);
  const v = {
    game: {
      witch: { vx: 0, vz: 0, mode: "ground" }, camera: { zoomStep: 0 },
      tuning: { viewMargin: 12, haze: { far: 100 }, treeCap: { from: 80, keep: 1 }, shadows: { trunks: {} } },
      forest: {
        *treesNearChunks() { if (kind === "trees") yield Array.from({ length: 1000 }, () => ({ x: 0, z: 0, type: 1 })); },
        *bushesNearChunks() { yield Array.from({ length: 1000 }, () => ({ x: 0, z: 0, type: 1 })); },
      },
    },
    camera: { position: { x: 10, y: 10, z: 10 } },
    lastBuild: { x: 0, y: 0, z: 0, radius: 100, version: 0 }, lastPose: {},
    budget: { fps: 10, radius: 100 }, canopyNow: 100, assets: { version: 1, hasType: () => { visited++; return false; } },
    v3: { set: () => ({}) }, mpp: 1,
  } as unknown as View;
  try {
    for (let frame = 0; frame < 8; frame++) {
      const before = visited;
      refresh(v);
      expect(visited - before).toBeGreaterThan(0);
      expect(visited - before).toBeLessThan(10);
    }
    expect(visited).toBeLessThan(1000); // Low fps and an old job still cannot drain it.
  } finally { cancelRefresh(v); }
});

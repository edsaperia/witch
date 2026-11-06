// The work done ahead under a sail's dive goes where the camera's going (Ed's dive plan, 2026-11-06, its step 8: the hills' next
// strip and the forest ahead were made along her movement, and she's in bed, still, while the camera flies in at 110 m/s; render/
// view/ahead.ts, rules/arrive.ts aimVelocity). (Headless: the view a stand-in that logs what's asked of it.)
import { describe, expect, it, vi } from "vitest";
vi.mock("./culling", async orig => ({ ...(await orig<typeof import("./culling")>()), viewRect: () => ({ minX: -10, maxX: 10, minZ: -10, maxZ: 10 }) }));
import { workAhead } from "./ahead";
import { TUNING } from "../../rules/tuning";
import { aimVelocity, arrivePlan, shotAt } from "../../rules/arrive";
import { preppedGame } from "../../test/preppedGame";

function stand(fly: object | null) {
  const log: Record<string, unknown[]> = {};
  const v = {
    game: { tuning: TUNING, witch: { x: 0, z: 0, vx: 0, vz: 0 }, forest: { prefetch: (...a: unknown[]) => { log.forest = a; return 0; }, buildMs: 0 } },
    fly, frameStart: performance.now(), drawEst: 0, stats: {}, lastView: { x: 0, z: 0, half: 100 },
    heights: { prepare: (...a: unknown[]) => { log.heights = a; return true; } },
    assets: { work: () => {}, pending: 0 },
    ground: { fill: (_r: unknown, rect: unknown) => { log.ground = [rect]; return 0; } },
    time: () => {},
  };
  return { v, log };
}

describe("the work ahead under the dive", () => {
  it("in bed, without a flight, goes nowhere (she's still): as before", () => {
    const { v, log } = stand(null);
    workAhead(v as never);
    expect(log.heights.slice(0, 2)).toEqual([0, 0]);
    expect(log.forest.slice(0, 2)).toEqual([0, 0]);
  });
  it("under the dive, goes along the aim's way: the hills' strip north, the forest two seconds on, the ground's band ahead", () => {
    const { v, log } = stand({ tx: 0, tz: 0, vx: 0, vz: -110 });
    workAhead(v as never);
    expect(log.heights.slice(0, 2)).toEqual([0, -110]);
    expect(log.forest.slice(0, 2)).toEqual([0, -220]);
    expect(log.ground[0]).toEqual({ minX: -10, maxX: 10, minZ: -230, maxZ: 10 });
  });
  it("the aim's own speed along the dive: north at its pace over the low leg", () => {
    const g = preppedGame(123, TUNING), A = TUNING.arrive!, d = g.map.dancefloor;
    const pitch = 0.6, hand = { cam: { x: 0, z: 900, height: Math.sin(pitch) * 500, pitch, fov: 20, speed: 100 } };
    const p = arrivePlan(hand, g.map, A, () => 0, { tx: d.x, ty: 0, tz: d.z, angle: 40, distance: 30, fov: 20 });
    const s = (p.times[1] + p.times[2]) / 2, u = aimVelocity(p, s);
    expect(u.vz).toBeLessThan(-40); // (heading north)
    expect(Math.abs(u.vx)).toBeLessThan(Math.abs(u.vz) / 4);
    expect(u.vz).toBeCloseTo((shotAt(p, s + 0.25).tz - shotAt(p, s).tz) / 0.25, 6);
  });
});

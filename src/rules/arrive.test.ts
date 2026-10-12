// Arriving on an island from the sea chart (rules/arrive.ts): the flight from the chart's hand-off (app/arrival.ts reads it) to her decks.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, poseOf } from "./game";
import { arrivePlan, planLength, shotAt, shotCamera, southCoast, type Handoff, type Shot } from "./arrive";

const A = TUNING.arrive!;

describe("arriving from the sea chart", () => {
  it("flies on from the chart's own camera, down low over the forest, up to frame the dancefloor and the Ent's spot, and down to her decks", () => {
    const g = newGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, ground = () => 0;
    const coast = southCoast(map);
    expect(coast).toBeGreaterThan(d.z + 100); // (the south coast, well south of home)
    // (Charlie's hand-off, as the chart makes it: high over the south coast, its aim 40 m inland, heading north at 100 m/s)
    const pitch = 0.873, back = 600, hand: Handoff = { cam: { x: 0, z: coast - 40 - d.z + Math.cos(pitch) * back, height: Math.sin(pitch) * back, pitch, fov: 20, speed: 100 } };
    const p0 = poseOf(g), end: Shot = { tx: p0.tx, ty: p0.ty, tz: p0.tz, angle: p0.angle, distance: p0.distance, fov: TUNING.camera.fov };
    const plan = arrivePlan(hand, map, A, ground, end), T = planLength(plan);
    expect(T).toBeGreaterThan(6); expect(T).toBeLessThan(30);
    // it starts exactly where the chart left off
    const c0 = shotCamera(shotAt(plan, 0));
    expect(c0.x).toBeCloseTo(d.x + hand.cam.x, 6); expect(c0.y).toBeCloseTo(hand.cam.height, 6); expect(c0.z).toBeCloseTo(d.z + hand.cam.z, 6);
    expect(shotAt(plan, 0).fov).toBeCloseTo(20, 6);
    // carrying on north at the chart's speed (its aim's speed at the start)
    const e = 0.01, v = (shotAt(plan, e).tz - shotAt(plan, 0).tz) / e;
    expect(v).toBeCloseTo(-100, 0);
    // and ends on the opening shot
    expect(shotAt(plan, T)).toEqual(end);
    // north all the way to the frame (the camera never turns back south), and never into the ground
    let lastZ = Infinity;
    for (let s = 0; s <= plan.times[plan.times.length - 2]; s += 0.1) { const c = shotCamera(shotAt(plan, s)); expect(c.z).toBeLessThanOrEqual(lastZ + 1e-6); lastZ = c.z; }
    for (let s = 0; s <= T; s += 0.1) expect(shotCamera(shotAt(plan, s)).y).toBeGreaterThan(8);
    // down to treetop height over the forest: low there (the chart hands over high, over the coast)
    expect(shotCamera(shotAt(plan, plan.times[1])).y).toBeLessThan(60);
    // the frame: the dancefloor and the treehouse's spot both inside the picture (its vertical half-angle, a margin kept)
    const f = shotAt(plan, plan.times[plan.times.length - 2]), c = shotCamera(f), half = (TUNING.camera.fov / 2) * 0.9;
    for (const p of [{ x: d.x, y: 0, z: d.z }, { x: th.x, y: 22, z: th.z }]) {
      const along = Math.atan2(c.y - p.y, c.z - p.z) * 180 / Math.PI; // (down from level to the point)
      expect(Math.abs(along - f.angle)).toBeLessThan(half);
    }
  });
});

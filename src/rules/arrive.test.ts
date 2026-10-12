// Arriving on an island from the sea chart (rules/arrive.ts): the hand-off record, and the flight from it to her decks.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, poseOf } from "./game";
import { arrivePlan, planLength, readArrival, shotAt, shotCamera, southCoast, type ArriveRecord, type Shot } from "./arrive";

const A = TUNING.arrive!, NOW = 1_800_000_000_000;
const rec = (o: Partial<ArriveRecord> = {}): ArriveRecord => ({ v: 1, island: "home", at: NOW - 2000, still: "data:image/jpeg;base64,AAAA", cam: { x: 0, z: 0, height: 40, pitch: 0.3, fov: 20 }, ...o });

describe("arriving from the sea chart", () => {
  it("reads the chart's hand-off only for this island, fresh and whole", () => {
    expect(readArrival(JSON.stringify(rec()), "home", NOW, A.maxAge)?.island).toBe("home");
    expect(readArrival(JSON.stringify(rec()), "fox", NOW, A.maxAge)).toBeNull(); // (another island's)
    expect(readArrival(JSON.stringify(rec({ at: NOW - (A.maxAge + 1) * 1000 })), "home", NOW, A.maxAge)).toBeNull(); // (stale)
    expect(readArrival(JSON.stringify({ ...rec(), cam: { x: 0, z: 0, height: 40 } }), "home", NOW, A.maxAge)).toBeNull(); // (half a camera)
    expect(readArrival("{not json", "home", NOW, A.maxAge)).toBeNull();
    expect(readArrival(null, "home", NOW, A.maxAge)).toBeNull();
  });

  it("flies from the chart's own camera over the sea, north low over the forest, up to frame the dancefloor and the Ent's spot, and down to her decks", () => {
    const g = newGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, ground = () => 0;
    const coast = southCoast(map);
    expect(coast).toBeGreaterThan(d.z + 100); // (the south coast, well south of home)
    const hand = rec({ cam: { x: 0, z: coast - d.z + 300, height: 60, pitch: 0.25, fov: 24 } });
    const p0 = poseOf(g), end: Shot = { tx: p0.tx, ty: p0.ty, tz: p0.tz, angle: p0.angle, distance: p0.distance, fov: TUNING.camera.fov };
    const plan = arrivePlan(hand, map, A, ground, end), T = planLength(plan);
    expect(T).toBeGreaterThan(6); expect(T).toBeLessThan(30);
    // it starts exactly where the chart left off
    const c0 = shotCamera(shotAt(plan, 0));
    expect(c0.x).toBeCloseTo(d.x + hand.cam.x, 6); expect(c0.y).toBeCloseTo(60, 6); expect(c0.z).toBeCloseTo(d.z + hand.cam.z, 6);
    expect(shotAt(plan, 0).fov).toBeCloseTo(24, 6);
    // and ends on the opening shot
    expect(shotAt(plan, T)).toEqual(end);
    // north all the way to the frame (the camera never turns back south), and never into the ground
    let lastZ = Infinity;
    for (let s = 0; s <= plan.times[3]; s += 0.1) { const c = shotCamera(shotAt(plan, s)); expect(c.z).toBeLessThanOrEqual(lastZ + 1e-6); lastZ = c.z; }
    for (let s = 0; s <= T; s += 0.1) expect(shotCamera(shotAt(plan, s)).y).toBeGreaterThan(8);
    // low over the land: under 60 m up from the coast to the forest
    for (let s = plan.times[1]; s <= plan.times[2]; s += 0.1) expect(shotCamera(shotAt(plan, s)).y).toBeLessThan(60);
    // the frame: the dancefloor and the treehouse's spot both inside the picture (its vertical half-angle, a margin kept)
    const f = shotAt(plan, plan.times[3]), c = shotCamera(f), half = (TUNING.camera.fov / 2) * 0.9;
    for (const p of [{ x: d.x, y: 0, z: d.z }, { x: th.x, y: 22, z: th.z }]) {
      const along = Math.atan2(c.y - p.y, c.z - p.z) * 180 / Math.PI; // (down from level to the point)
      expect(Math.abs(along - f.angle)).toBeLessThan(half);
    }
  });
});

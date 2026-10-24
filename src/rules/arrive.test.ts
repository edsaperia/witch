// Arriving on an island from the sea chart (rules/arrive.ts): the flight from the chart's hand-off (app/arrival.ts reads it) to her decks.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, poseOf } from "./game";
import { arrivePlan, diveReach, dueAt, dueRate, inShot, newFlightClock, treeShot, planLength, shotAt, shotCamera, southCoast, stepFlightClock, type Handoff, type Shot } from "./arrive";

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
    const fi = plan.times.length - (A.tree ? 3 : 2); // (the frame's key: then the whole tree's, if it's on, then her decks)
    for (let s = 0; s <= plan.times[fi]; s += 0.1) { const c = shotCamera(shotAt(plan, s)); expect(c.z).toBeLessThanOrEqual(lastZ + 1e-6); lastZ = c.z; }
    for (let s = 0; s <= T; s += 0.1) expect(shotCamera(shotAt(plan, s)).y).toBeGreaterThan(8);
    // down to treetop height over the forest: low there (the chart hands over high, over the coast)
    expect(shotCamera(shotAt(plan, plan.times[1])).y).toBeLessThan(60);
    // the frame: the dancefloor and the treehouse's spot both inside the picture (its vertical half-angle, a margin kept)
    const f = shotAt(plan, plan.times[fi]), c = shotCamera(f), half = (TUNING.camera.fov / 2) * 0.9;
    for (const p of [{ x: d.x, y: 0, z: d.z }, { x: th.x, y: 22, z: th.z }]) {
      const along = Math.atan2(c.y - p.y, c.z - p.z) * 180 / Math.PI; // (down from level to the point)
      expect(Math.abs(along - f.angle)).toBeLessThan(half);
    }
  });

  it("waits out the heavy first frames behind the still and then flies in full, a stall holding the flight, never skipping it (Ed's playtest, 2026-10-12: \"froze for about ten seconds, and then cut straight to the witch on the decks\")", () => {
    const c = newFlightClock(), T = 12;
    let now = 1000, faded = -1, frames = 0;
    const frame = (dt: number) => { now += dt; frames++; if (stepFlightClock(c, now, A).faded) faded = frames; };
    frame(0); frame(5000); // (the first frame at the hand-off: seconds)
    expect(c.phase).toBe("warm"); expect(c.s).toBe(0);
    frame(900); frame(400); // (still heavy: still warming)
    expect(c.phase).toBe("warm");
    for (let i = 0; i < A.warm.frames; i++) frame(16);
    expect(c.phase).toBe("fly"); expect(faded).toBe(frames); expect(c.s).toBe(0);
    // flying at 60 frames a second, with a 6 s stall halfway: the flight's own time only ever moves by a frame's worth
    let flown = 0;
    while (c.s < T) { const before = c.s; frame(flown++ === 300 ? 6000 : 1000 / 60); expect(c.s - before).toBeLessThanOrEqual(A.maxStep + 1e-9); }
    expect(flown).toBeGreaterThan(T * 60 - 5); // (every second of it drawn)
    // and the warm-up gives up waiting after warm.max seconds of frames that never come calm
    const d = newFlightClock(); let t = 0; stepFlightClock(d, t, A);
    while (d.phase === "warm") { t += 700; stepFlightClock(d, t, A); }
    expect(t).toBeGreaterThanOrEqual(A.warm.max * 1000); expect(t).toBeLessThan(A.warm.max * 1000 + 701);
  });
});

describe("the dive's view first (Ed, 2026-10-24: \"we only really need the scenery south of the treehouse for the dive\")", () => {
  it("counts the land along the dive's track, south of the treehouse, nearer than the land north of it", () => {
    const g = newGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, near = diveReach(map, A), coast = southCoast(map);
    // on the track: the coast below the dancefloor, halfway up, the treehouse itself
    expect(near(d.x, coast)).toBeLessThan(1);
    expect(near(d.x, (coast + d.z) / 2)).toBeLessThan(1);
    expect(near(th.x, th.z)).toBeLessThan(1);
    // a spot as far north of the treehouse as the coast is south of it is well off the track
    const north = near(th.x, th.z - (coast - th.z));
    expect(north).toBeGreaterThan((coast - th.z) * 0.9);
    // and the treehouse is read from the map: move it and the track follows
    const moved = { ...map, treehouse: { ...th, x: th.x - 200, z: th.z - 150 } } as typeof map;
    expect(diveReach(moved, A)(th.x - 200, th.z - 150)).toBeLessThan(1);
  });
});

describe("the house due in view (Ed, 2026-10-24: \"the treehouse doesn't have to be ready at the start of the dive - only once it's in view\")", () => {
  it("sees what's ahead of the camera and not what's behind or off to the side, and finds when the house comes on screen", () => {
    const shot: Shot = { tx: 0, ty: 0, tz: 0, angle: 30, distance: 100, fov: 20 };
    expect(inShot(shot, { x: 0, y: 0, z: 0 }, 16 / 9)).toBe(true); // (its own target)
    expect(inShot(shot, { x: 0, y: 0, z: 200 }, 16 / 9)).toBe(false); // (behind the camera)
    expect(inShot(shot, { x: 300, y: 0, z: 0 }, 16 / 9)).toBe(false); // (far off to the side)
    expect(inShot(shot, { x: 0, y: 0, z: -1000 }, 16 / 9)).toBe(false); // (far ahead, above the top of the frame at this tilt)
    const g = newGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, coast = southCoast(map);
    const pitch = 0.66, back = 520, hand: Handoff = { cam: { x: 0, z: coast + 420 - d.z + Math.cos(pitch) * back, height: Math.sin(pitch) * back, pitch, fov: 20, speed: 100 } };
    const p0 = poseOf(g), end: Shot = { tx: p0.tx, ty: p0.ty, tz: p0.tz, angle: p0.angle, distance: p0.distance, fov: TUNING.camera.fov };
    const plan = arrivePlan(hand, map, A, () => 0, end), T = planLength(plan), house = { x: th.x, y: 8, z: th.z };
    const due = dueAt(plan, [house], 16 / 9);
    expect(due).toBeGreaterThan(0.5); // (not on screen as the dive starts, far out at sea)
    expect(due).toBeLessThan(T);
    expect(inShot(shotAt(plan, due), house, 16 / 9)).toBe(true);
    expect(inShot(shotAt(plan, Math.max(0, due - 0.2)), house, 16 / 9)).toBe(false);
    // the guard's pace: full well before it's due, slowing in, stopped at it
    expect(dueRate(due - 5, due, 2)).toBe(1); expect(dueRate(due - 1, due, 2)).toBeCloseTo(0.5, 6); expect(dueRate(due, due, 2)).toBe(0);
  });
});

describe("the whole treehouse tree (Ed, 2026-10-24: \"pan up to see the whole treehouse tree before we fly into her bedroom\")", () => {
  it("comes round to the whole tree, its foot and its top on screen, between the frame and her decks, by the art's own height", () => {
    const g = newGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, coast = southCoast(map), T = A.tree!;
    const pitch = 0.66, back = 520, hand: Handoff = { cam: { x: 0, z: coast + 420 - d.z + Math.cos(pitch) * back, height: Math.sin(pitch) * back, pitch, fov: 20, speed: 100 } };
    const p0 = poseOf(g), end: Shot = { tx: p0.tx, ty: p0.ty, tz: p0.tz, angle: p0.angle, distance: p0.distance, fov: TUNING.camera.fov };
    for (const height of [18, 34]) { // (fox's tree and home's, as their art has them)
      const plan = arrivePlan(hand, map, A, () => 0, end, undefined, height), n = plan.keys.length, tree = plan.keys[n - 2];
      expect(tree).toEqual(treeShot(map, T, () => 0, end.fov, height));
      expect(plan.times[n - 2] - plan.times[n - 3]).toBeCloseTo(T.time, 6);
      for (const y of [0.5, height - 0.5]) expect(inShot(tree, { x: th.x, y, z: th.z }, 16 / 9, 1)).toBe(true);
      expect(tree.angle).toBeLessThan(A.frame.angle); // (lower than the frame's: the camera's come down and looks up the tree)
      expect(shotAt(plan, planLength(plan))).toEqual(end);
    }
  });
});

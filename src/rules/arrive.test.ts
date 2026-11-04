// Arriving on an island from the sea chart (rules/arrive.ts): the flight from the chart's hand-off (app/arrival.ts reads it) to her decks.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { poseOf } from "./game";
import { arrivePlan, diveBend, diveIndoors, diveReach, dueAt, dueRate, handoffShot, inShot, newFlightClock, planLength, shotAt, shotCamera, southCoast, stepFlightClock, type Handoff, type Shot } from "./arrive";
import { preppedGame } from "../test/preppedGame"; // (games on a map made once a file from its prep)

const A = TUNING.arrive!;
// Keep this seeded spatial fixture: arrival duration and framing depend on its real south coast and treehouse distance.

describe("arriving from the sea chart", () => {
  it("flies on from the chart's own camera, down low over the forest, up to frame the dancefloor and the Ent's spot, and down to her decks", () => {
    const g = preppedGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, ground = () => 0;
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
    const fi = plan.times.length - 2; // (the frame's key: then her decks)
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
    const g = preppedGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, near = diveReach(map, A), coast = southCoast(map);
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
    const g = preppedGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, coast = southCoast(map);
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

// Ed, 2026-11-03: "The reason why we fly out over the sea is to do the transition between these scenes while looking at the water,
// which should make the transition less obvious because we can fade between while looking at a simple blue texture"; and "I think we
// can get the 'Coming round to the treehouse' effect by using the bend shader rather than using the camera angle; I want to see the
// treehouse crown coming over the horizon, and this will achieve that straightforwardly."
describe("the sail's hand-off over the water and the crown over the bent horizon (Ed, 2026-11-03)", () => {
  const g = preppedGame(123, TUNING), map = g.map, d = map.dancefloor, th = map.treehouse, coast = southCoast(map), ground = () => 0;
  // (the chart's hand-off as its flight makes it from the tuning's arrive.handoff: render/chart/seaChart.ts flightEnd)
  const H = A.handoff!, pitch = (H.pitchDeg * Math.PI) / 180;
  const hand: Handoff = { cam: { x: 0, z: coast + H.sea - d.z + Math.cos(pitch) * H.dist, height: Math.sin(pitch) * H.dist, pitch, fov: TUNING.camera.fov, speed: 100 } };
  const p0 = poseOf(g), end: Shot = { tx: p0.tx, ty: p0.ty, tz: p0.tz, angle: p0.angle, distance: p0.distance, fov: TUNING.camera.fov };
  const plan = arrivePlan(hand, map, A, ground, end), T = planLength(plan), B = A.bend!;
  /** Whether a point shows over the horizon of ground bent by `k` ahead of shot `s`'s aim, seen from its camera (render/height.ts
   *  overBendAt's sum, the bend's focus the shot's aim, looking north; level ground). */
  const overBend = (s: Shot, k: number, p: { x: number; y: number; z: number }): boolean => {
    const c = shotCamera(s), ahead = s.tz - p.z;
    if (k <= 0 || ahead <= 0) return true;
    const D = Math.max(1, c.z - s.tz), h = c.y - s.ty + 3, dh = -D + Math.sqrt(D * D + h / k);
    if (ahead <= dh) return true;
    const m = (h + k * dh * dh) / (dh + D);
    return (h - (p.y - s.ty) + k * ahead * ahead) / (ahead + D) <= m + 0.02;
  };
  /** How far below level (degrees) the bent ground's horizon lies, seen from shot `s`'s camera (0 unbent: the flat sea's, far off). */
  const horizonDip = (s: Shot, k: number): number => {
    if (k <= 0) return 0;
    const c = shotCamera(s), D = Math.max(1, c.z - s.tz), h = c.y - s.ty, dh = -D + Math.sqrt(D * D + h / k);
    return (Math.atan(2 * k * dh) * 180) / Math.PI;
  };

  it("hands over looking only at the open sea, and the dive's bend leaves it flat through the crossfade, as the chart's sea is", () => {
    const s0 = handoffShot(hand, map), c = shotCamera(s0), land = map.bounds.land!;
    expect(shotAt(plan, 0)).toEqual(s0);
    // every ray across the frame (a 16:9 screen and a tall one) meets the sea, south of the coast, none the island's land
    for (const aspect of [16 / 9, 3 / 4]) for (let u = -1; u <= 1; u += 0.25) for (let v = -1; v <= 1; v += 0.25) {
      const t = Math.tan(((s0.fov * Math.PI) / 180) / 2), a = (s0.angle * Math.PI) / 180;
      const dy = -Math.sin(a) + v * t * Math.cos(a), dz = -Math.cos(a) - v * t * Math.sin(a), dx = u * t * aspect; // (forward, up and right)
      expect(dy).toBeLessThan(0); // (looking down: no sky in it)
      const k = c.y / -dy, x = c.x + dx * k, z = c.z + dz * k;
      expect(z).toBeGreaterThan(coast + 20);
      expect(land.inside(x, z)).toBe(false);
    }
    // the bend none at the hand-off, and through the crossfade (A.fade s) its horizon stays above the top of the frame
    expect(diveBend(plan, 0, B)).toBe(0);
    for (let s = 0; s <= A.fade; s += 0.05) { const k = shotAt(plan, s); expect(horizonDip(k, diveBend(plan, s, B))).toBeLessThan(k.angle - k.fov / 2 - 2); }
  });

  it("bends the world strongly through the dive, the crown rising over the horizon as it flies straight in, and relaxes exactly to the night's own as it lands", () => {
    // no swing round: the hand-off, the low passes over the sea and the forest, the frame over the dancefloor and the treehouse, her bedroom
    const lows = plan.keys.length - 3;
    expect(lows).toBeGreaterThanOrEqual(1);
    expect(plan.keys.slice(1, 1 + lows).every(k => k.angle === A.low.angle && k.distance === A.low.distance)).toBe(true);
    expect(plan.keys.at(-2)).toMatchObject({ angle: A.frame.angle, distance: A.frame.distance });
    expect(plan.keys.at(-1)).toEqual(end);
    expect("tree" in A).toBe(false);
    // the camera's angle never comes down below the low passes' to look up at a tree (the old swing's 10 degrees)
    for (let s = plan.times[1]; s <= T; s += 0.1) expect(shotAt(plan, s).angle).toBeGreaterThan(A.low.angle - 3);
    // the bend: none at the hand-off, at its strongest as the camera's down low over the sea, back to none exactly as it lands
    expect(B.curve).toBeGreaterThan(TUNING.camera.curve.treetop); // (stronger than the treetops')
    const low = plan.times[1];
    expect(diveBend(plan, low, B)).toBeGreaterThan(B.curve * 0.95);
    let peak = 0;
    for (let s = 0; s <= T; s += 0.05) peak = Math.max(peak, diveBend(plan, s, B));
    expect(peak).toBeCloseTo(B.curve, 6);
    expect(diveBend(plan, T, B)).toBe(0);
    expect(diveBend(plan, T + 1, B)).toBe(0);
    expect(diveBend(plan, T - 1e-6, B)).toBeLessThan(B.curve * 1e-9);
    for (let s = T - B.relax, last = Infinity; s <= T; s += 0.05) { const k = diveBend(plan, s, B); expect(k).toBeLessThanOrEqual(last + 1e-12); last = k; }
    // the crown (the great oak's, about 60 m over the ground; the old Ent's, 18): hidden under the bent horizon as the camera comes
    // down low over the sea, then risen over it before the bend relaxes, and never sinking back once up
    for (const top of [18, 60]) {
      const crown = { x: th.x, y: top, z: th.z };
      expect(overBend(shotAt(plan, low), diveBend(plan, low, B), crown)).toBe(false);
      let up = -1;
      for (let s = low; s <= T; s += 0.05) {
        const seen = overBend(shotAt(plan, s), diveBend(plan, s, B), crown);
        if (seen && up < 0) up = s;
        if (up >= 0) expect(seen).toBe(true);
      }
      expect(up).toBeGreaterThan(low);
      expect(up).toBeLessThan(T - B.relax);
    }
    // the oak seen from outside (standing in the world, bent with it) till the last leg down into her room, then the house from inside
    const down = plan.times.at(-2)!;
    for (let s = 0; s < down; s += 0.25) expect(diveIndoors(plan, s)).toBe(false);
    for (let s = down; s <= T + 1; s += 0.25) expect(diveIndoors(plan, s)).toBe(true);
    // with no bend knob, or none, the dive is unbent
    expect(diveBend(plan, low, undefined)).toBe(0);
    expect(diveBend(plan, low, { ...B, curve: 0 })).toBe(0);
  });
});

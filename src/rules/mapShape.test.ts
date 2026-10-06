// The circular map (Ed, 2026-10-06: "The map as a whole should be circular rather than square, with
// a buffer zone with no runestones around the edge"): the playable areas a circle round home, about
// as many as the old 14 x 14; nothing placed for play in the buffer ring; her flight's edge a soft circle.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { spawnCreatures } from "./creatures";
import { soundsystemFor, wavePlan, newParty } from "./party";
import { placeRelics } from "./legends";
import { edgeRadius, exitPoint, isInside, keepIn, makeCoast, softEdge } from "./mapShape";
import { newWitch, stepWitch, type WitchState } from "./witch";
import { TUNING } from "./tuning";

const SEEDS = [1, 123, 4242, 90210, 925469];

describe("the circular map", () => {
  for (const seed of SEEDS) {
    it(`about 196 playable areas, home among them, everything placed for play inside the buffer (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), M = TUNING.map!, A = map.areaSize, c = map.bounds.circle!;
      expect(map.shape).toBe("circle");
      expect(c).toBeTruthy();
      expect(map.cells.length).toBeGreaterThanOrEqual(170);
      expect(map.cells.length).toBeLessThanOrEqual(225);
      expect(map.playable(map.centreCell[0], map.centreCell[1])).toBe(true);
      expect(Math.hypot(c.x - map.dancefloor.x, c.z - map.dancefloor.z)).toBeLessThan(1); // (centred on home)
      expect(c.r).toBeCloseTo((M.radius + 0.5 + M.buffer) * A, 3); // (round: times the coast at each angle)
      // the buffer ring is there, all round, and plays no part
      const ring = new Set<number>();
      for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) if (map.inBuffer(x, y)) {
        expect(map.playable(x, y)).toBe(false);
        expect(map.legendClearing(x, y)).toBeNull();
        const s = map.siteOf(x, y);
        ring.add(Math.floor(((Math.atan2(s.z - c.z, s.x - c.x) + Math.PI) / (2 * Math.PI)) * 8));
      }
      expect(ring.size).toBe(8);
      // runestones, soundsystems, legends' clearings, creatures, relics: inside the edge less the buffer (at least buffer x (1 - amp) deep, along the coast)
      const inner = (x: number, z: number) => edgeRadius(c, x, z) - M.buffer * A * (1 - M.coast!.amp), from = (x: number, z: number) => Math.hypot(x - c.x, z - c.z);
      for (const [cx, cy] of map.cells) { const s = soundsystemFor(map, [cx, cy]); expect(from(s.x, s.z), `soundsystem ${cx},${cy}`).toBeLessThan(inner(s.x, s.z)); }
      for (const lc of map.legendClearings) expect(from(lc.x, lc.z) + lc.r).toBeLessThan(inner(lc.x, lc.z));
      const creatures = spawnCreatures(map);
      for (const k of creatures) expect(map.playable(k.cell[0], k.cell[1])).toBe(true);
      for (const r of placeRelics(map, new Forest(map))) { expect(map.playable(r.cell[0], r.cell[1])).toBe(true); expect(from(r.x, r.z)).toBeLessThan(inner(r.x, r.z)); }
      // waves only ever wake playable areas
      for (const k of wavePlan(newParty(map), map).keys()) { const [x, y] = k.split(",").map(Number); expect(map.playable(x, y), k).toBe(true); }
      // the forest goes on past the edge, into the fog
      const e = map.extent;
      for (let k = 0; k < 64; k++) { const a = (k / 64) * Math.PI * 2, r = c.r * map.coast(a) + A, x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r; expect(x > e.minX && x < e.maxX && z > e.minZ && z < e.maxZ, `past the coast at ${a.toFixed(2)}`).toBe(true); }
    });
  }

  it("has an irregular coast (Ed, 2026-10-06): gentle, seeded, round on the whole, the same function for every edge", () => {
    const k = TUNING.map!.coast!, a = (i: number) => (i / 360) * Math.PI * 2;
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), f = Array.from({ length: 360 }, (_, i) => map.coast(a(i)));
      expect(Math.max(...f)).toBeLessThanOrEqual(1 + k.amp + 1e-9);
      expect(Math.min(...f)).toBeGreaterThanOrEqual(1 - k.amp - 1e-9);
      expect(Math.max(...f) - Math.min(...f)).toBeGreaterThan(k.amp * 0.6); // (not round: bays and headlands)
      expect(Math.abs(f.reduce((t, v) => t + v, 0) / f.length - 1)).toBeLessThan(0.01); // (as big as the round island on the whole)
      let steepest = 0; for (let i = 0; i < 360; i++) steepest = Math.max(steepest, Math.abs(f[(i + 1) % 360] - f[i]) / (Math.PI / 180));
      expect(steepest).toBeLessThan(0.5); // (gentle: the coast never turns more than about 27 degrees off round)
      expect(map.bounds.circle!.coast).toBe(map.coast); // (her flight's edge is the coast)
    }
    expect(generateMap(1, TUNING).coast(1)).toBe(generateMap(1, TUNING).coast(1));
    expect(makeCoast(1, k)(1)).not.toBe(makeCoast(2, k)(1));
    expect(makeCoast(1, { ...k, amp: 0 })(1)).toBe(1);
  });

  it("?shape=square: the old 14 x 14 square, exactly", () => {
    const T = { ...TUNING, map: { ...TUNING.map!, shape: "square" as const } }, map = generateMap(1, T), old = generateMap(1, { ...TUNING, map: undefined });
    expect(map.shape).toBe("square");
    expect(map.n).toBe(TUNING.mapAreas);
    expect(map.cells.length).toBe(TUNING.mapAreas ** 2);
    expect(map.bounds.circle).toBeUndefined();
    expect(map.coast(1)).toBe(1);
    expect(map.bounds).toEqual(old.bounds);
    expect(map.extent).toEqual(old.extent);
    expect(map.legendClearings).toEqual(old.legendClearings);
  });
});

describe("her flight's edge", () => {
  const map = generateMap(1, TUNING), c = map.bounds.circle!, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

  it("is a circle: kept in, whichever way she goes", () => {
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      let w: WitchState = { ...newWitch(c.x, c.z), mode: "treetop", lift: 1 };
      for (let i = 0; i < 60 * 40; i++) w = stepWitch(w, { ...idle, moveX: Math.cos(a), moveZ: Math.sin(a) }, 1 / 60, TUNING, map.bounds);
      const d = Math.hypot(w.x - c.x, w.z - c.z);
      expect(d).toBeLessThanOrEqual(edgeRadius(c, w.x, w.z) + 1e-6);
      expect(d).toBeGreaterThan(edgeRadius(c, w.x, w.z) - TUNING.map!.push); // (she gets into the soft band)
    }
    // the corners of its box are out of it
    expect(isInside(map.bounds, map.bounds.maxX - 5, map.bounds.maxZ - 5)).toBe(false);
    expect(keepIn(map.bounds, c.x + c.r * 2, c.z)).toEqual({ x: c.x + c.r * map.coast(0), z: c.z });
    const e = exitPoint(map.bounds, c.x, c.z + c.r - 10, 30);
    expect(Math.hypot(e.x - c.x, e.z - c.z)).toBeCloseTo(c.r * map.coast(Math.PI / 2) + 30, 6);
  });

  it("is soft: her speed outward eases off over its band, and she drifts back in when she lets go", () => {
    const P = TUNING.map!.push, r = c.r * map.coast(0), v = (d: number) => softEdge(map.bounds, c.x + d, c.z, 50, 0, 50, P, TUNING.map!.drift).vx;
    expect(v(r - P - 1)).toBe(50);
    expect(v(r - P * 0.75)).toBeLessThan(50);
    expect(v(r - P * 0.75)).toBeGreaterThan(v(r - P * 0.4));
    expect(v(r)).toBeLessThan(0);
    // tangential flight along the edge is left alone
    expect(softEdge(map.bounds, c.x + r - 5, c.z, 0, 40, 50, P, 0).vz).toBe(40);
    let w: WitchState = newWitch(c.x + r - 2, c.z);
    for (let i = 0; i < 60 * 3; i++) w = stepWitch(w, idle, 1 / 60, TUNING, map.bounds);
    expect(Math.hypot(w.x - c.x, w.z - c.z)).toBeLessThan(r - 2);
  });
});

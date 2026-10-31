// The circular map (Ed, 2026-10-06: "The map as a whole should be circular rather than square, with
// a buffer zone with no runestones around the edge"): the playable areas a circle round home, about
// about 96 (radius 5.6; Ed, 2026-10-07); nothing placed for play in the buffer ring; her flight's edge the island's coast
// (the land map, rules/land.ts: round its areas' borders, Ed 2026-10-11), soft.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { spawnCreatures } from "./creatures";
import { soundsystemFor, wavePlan, newParty } from "./party";
import { placeRelics } from "./legends";
import { exitPoint, isInside, keepIn, makeCoast, softEdge } from "./mapShape";
import { newWitch, stepWitch, type WitchState } from "./witch";
import { TUNING } from "./tuning";

// Keep radius-5.6 and legacy square fixtures: 80–115 playable cells, full buffer/coast and 40-second radial flight are explicit size/shape assertions.
const SEEDS = [1, 123, 4242, 90210, 925469];

describe("the circular map", () => {
  for (const seed of SEEDS) {
    it(`about 96 playable areas, home among them, everything placed for play inside the buffer (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), A = map.areaSize, L = map.bounds.land!, home = map.dancefloor;
      expect(map.shape).toBe("circle");
      expect(L).toBeTruthy();
      expect(map.cells.length).toBeGreaterThanOrEqual(80);
      expect(map.cells.length).toBeLessThanOrEqual(115);
      expect(map.playable(map.centreCell[0], map.centreCell[1])).toBe(true);
      expect(L.loops.filter(l => l.sea).length).toBe(1); // (one island)
      expect(L.distAt(home.x, home.z)).toBeGreaterThan(5 * A); // (home in the middle, far inland)
      // the buffer ring is there, all round, and plays no part
      const ring = new Set<number>();
      for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++) if (map.inBuffer(x, y)) {
        expect(map.playable(x, y)).toBe(false);
        expect(map.legendClearing(x, y)).toBeNull();
        const s = map.siteOf(x, y);
        ring.add(Math.floor(((Math.atan2(s.z - home.z, s.x - home.x) + Math.PI) / (2 * Math.PI)) * 8));
      }
      expect(ring.size).toBe(8);
      // runestones, soundsystems, legends' clearings, creatures, relics: well inland (past the widest sand and more)
      const inner = 150;
      for (const [cx, cy] of map.cells) { const s = soundsystemFor(map, [cx, cy]); expect(L.distAt(s.x, s.z), `soundsystem ${cx},${cy}`).toBeGreaterThan(inner); }
      for (const lc of map.legendClearings) expect(L.distAt(lc.x, lc.z) - lc.r).toBeGreaterThan(inner);
      const creatures = spawnCreatures(map);
      for (const k of creatures) expect(map.playable(k.cell[0], k.cell[1])).toBe(true);
      for (const r of placeRelics(map, new Forest(map))) { expect(map.playable(r.cell[0], r.cell[1])).toBe(true); expect(L.distAt(r.x, r.z)).toBeGreaterThan(inner); }
      // waves only ever wake playable areas
      for (const k of wavePlan(newParty(map), map).keys()) { const [x, y] = k.split(",").map(Number); expect(map.playable(x, y), k).toBe(true); }
      // the forest's areas go on past the coast, under the sea
      const e = map.extent, b = L.box;
      expect(e.minX < b.minX - A && e.maxX > b.maxX + A && e.minZ < b.minZ - A && e.maxZ > b.maxZ + A).toBe(true);
    });
  }

  it("has a coast round its areas' borders (Ed, 2026-10-11): the land the playable areas and the buffer's, the sea the rest", () => {
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), L = map.bounds.land!, sea = L.loops.find(l => l.sea)!, landArea = (x: number, z: number) => { const [cx, cy] = map.areaAt(x, z).cell; return map.playable(cx, cy) || map.inBuffer(cx, cy); };
      let agree = 0, n = 0;
      for (let s = 0; s < sea.length; s += 37) {
        const p = L.along(L.loops.indexOf(sea), s);
        n++;
        if (landArea(p.x - p.nx * 12, p.z - p.nz * 12) && !landArea(p.x + p.nx * 12, p.z + p.nz * 12)) agree++;
      }
      expect(agree / n).toBeGreaterThan(0.9); // (inside, an island's area; outside, none: but where a crumb of one area pokes into another, or a sliver under 16 m was smoothed away)
      // not round: its headlands well out past its bays
      const home = map.dancefloor, far: number[] = [];
      for (let k = 0; k < sea.pts.length; k += 2) far.push(Math.hypot(sea.pts[k] - home.x, sea.pts[k + 1] - home.z));
      expect(Math.max(...far) / Math.min(...far)).toBeGreaterThan(1.1);
    }
    const k = TUNING.map!.coast!;
    expect(makeCoast(1, k)(1)).not.toBe(makeCoast(2, k)(1));
    expect(makeCoast(1, { ...k, amp: 0 })(1)).toBe(1);
  });

  it("?shape=square: the old 14 x 14 square, exactly", () => {
    const T = { ...TUNING, map: { ...TUNING.map!, shape: "square" as const } }, map = generateMap(1, T), old = generateMap(1, { ...TUNING, map: undefined });
    expect(map.shape).toBe("square");
    expect(map.n).toBe(TUNING.mapAreas);
    expect(map.cells.length).toBe(TUNING.mapAreas ** 2);
    expect(map.bounds.land).toBeUndefined();
    expect(map.coast(1)).toBe(1);
    expect(map.bounds).toEqual(old.bounds);
    expect(map.extent).toEqual(old.extent);
    expect(map.legendClearings).toEqual(old.legendClearings);
  });
});

describe("her flight's edge", () => {
  const map = generateMap(1, TUNING), L = map.bounds.land!, home = map.dancefloor, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  const sea = L.loops.findIndex(l => l.sea);

  it("is the coast: kept in, whichever way she goes", () => {
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      let w: WitchState = { ...newWitch(home.x, home.z), mode: "treetop", lift: 1 };
      for (let i = 0; i < 60 * 40; i++) w = stepWitch(w, { ...idle, moveX: Math.cos(a), moveZ: Math.sin(a) }, 1 / 60, TUNING, map.bounds);
      const d = L.distAt(w.x, w.z);
      expect(d).toBeGreaterThanOrEqual(-1e-3);
      expect(d).toBeLessThan(TUNING.map!.push); // (she gets into the soft band)
    }
    // the corners of its box are out of it
    expect(isInside(map.bounds, map.bounds.maxX - 5, map.bounds.maxZ - 5)).toBe(false);
    const out = keepIn(map.bounds, home.x + 5000, home.z);
    expect(Math.abs(L.distAt(out.x, out.z))).toBeLessThan(0.5);
    for (let s = 0; s < 2000; s += 250) { const p = L.along(sea, s), e = exitPoint(map.bounds, p.x - p.nx * 10, p.z - p.nz * 10, 30); expect(L.distAt(e.x, e.z)).toBeLessThan(0); } // (out to sea: 30 m past the coast nearest, or across a bay)
  });

  it("is soft: her speed outward eases off over its band, and she drifts back in when she lets go", () => {
    // (a straight stretch of coast: its way in true for the band's depth)
    const P = TUNING.map!.push, straight = (s: number) => { const c = L.along(sea, s); return [0.25, 0.5, 0.75, 1.2].every(f => Math.abs(L.distAt(c.x - c.nx * P * f, c.z - c.nz * P * f) - P * f) < 1.5); };
    let s0 = 0; while (!straight(s0)) s0 += 20;
    const c = L.along(sea, s0), at = (d: number) => ({ x: c.x - c.nx * d, z: c.z - c.nz * d });
    const v = (d: number) => { const q = at(d), r = softEdge(map.bounds, q.x, q.z, c.nx * 50, c.nz * 50, 50, P, TUNING.map!.drift); return r.vx * c.nx + r.vz * c.nz; };
    expect(v(P * 1.1)).toBeCloseTo(50, 6);
    expect(v(P * 0.75)).toBeLessThan(50);
    expect(v(P * 0.75)).toBeGreaterThan(v(P * 0.4));
    expect(v(0)).toBeLessThan(0);
    // flight along the coast is left alone
    { const q = at(5), r = softEdge(map.bounds, q.x, q.z, -c.nz * 40, c.nx * 40, 50, P, 0), n = L.inward(q.x, q.z); expect(Math.abs(r.vx * n.x + r.vz * n.z)).toBeLessThan(6); expect(Math.hypot(r.vx, r.vz)).toBeGreaterThan(39); }
    const q = at(2);
    let w: WitchState = newWitch(q.x, q.z);
    for (let i = 0; i < 60 * 3; i++) w = stepWitch(w, idle, 1 / 60, TUNING, map.bounds);
    expect(L.distAt(w.x, w.z)).toBeGreaterThan(2);
  });
});

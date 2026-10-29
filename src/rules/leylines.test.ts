// The ley line: from the last runestone reached to the next objective in the order the waves really
// wake them, moving on when that area's wave arrives or its quest is done, whichever comes first
// (Ed, 2026-10-04, 2026-10-05).
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, withTuning } from "./tuning";
import { newParty, spreadWave, cellKey } from "./party";
import { departureRoute, leyChain, leyKey, onAreaDone } from "./leylines";
import { polylinesMeet } from "./crossing";
import { bootPath } from "./bootRing";
import { speakerCircle } from "./departure";
import { leyRadius } from "./leyroute";

const map = generateMap(123, TUNING);
/** The same map with leyLines.advance "first": a quest done moves the line on (the default since Ed, 2026-10-08, is "wave": it doesn't). */
const firstMap = generateMap(123, withTuning({ leyLines: { ...TUNING.leyLines, advance: "first" } }));
const keys = (c: { cell: readonly [number, number] }[]) => c.map(s => cellKey(s.cell));
/** The last stone reached and `count - 1` after it (no stones behind). */
const ahead = (p: Parameters<typeof leyChain>[0], m: typeof map, count: number) => leyChain(p, m, count - 1, 0).stones;

describe("ley lines", () => {
  it("start at home, pointing to the next wave's stone, then the ones after in the order they will wake", () => {
    const p = newParty(map), one = ahead(p, map, 2), chain = ahead(p, map, 7);
    expect(keys(one)).toEqual([cellKey(map.centreCell), cellKey(p.next[0])]);
    expect(one[0]).toMatchObject({ x: map.treehouseFront.x, z: map.treehouseFront.z, wave: 0, depart: true }); // (home's: the treehouse's front, Ed 2026-10-05)
    expect(keys(chain).slice(0, 3)).toEqual([map.centreCell, ...p.next, ...p.afterNext].map(cellKey).slice(0, 3));
    expect(new Set(keys(chain)).size).toBe(7); // no stone twice
  });
  it("foretell what the waves really wake, and move on to the next stone as each wave arrives", () => {
    const p = newParty(map);
    let time = 100;
    for (let w = 0; w < 5; w++) {
      const before = ahead(p, map, 4), key = leyKey(p);
      const woke = spreadWave(p, map, (time += 100));
      expect(leyKey(p)).not.toBe(key);
      expect(cellKey(woke[0].cell)).toBe(keys(before)[1]); // the line pointed to the stone the wave woke
      expect(keys(ahead(p, map, 3))).toEqual(keys(before).slice(1, 4)); // and now runs on from it
    }
  });
  it("under advance \"first\", move on when the next area's quest is done, before its wave, and stay put when that wave comes", () => {
    const p = newParty(firstMap);
    spreadWave(p, firstMap, 100);
    const before = ahead(p, firstMap, 3), next = before[1].cell, key = leyKey(p);
    onAreaDone(p, next, 120);
    expect(leyKey(p)).not.toBe(key);
    const after = ahead(p, firstMap, 2);
    expect(keys(after)).toEqual(keys(before).slice(1, 3)); // from the quest's stone to the one after
    // Its wave arrives: the line already moved on, so it keeps pointing to the same next stone.
    const woke = spreadWave(p, firstMap, 200);
    expect(cellKey(woke[0].cell)).toBe(cellKey(next));
    expect(keys(ahead(p, firstMap, 2))).toEqual(keys(after));
  });
  it("by default (advance \"wave\": Ed, 2026-10-08, 'The pulse should never skip'), stay put when a quest is done; its wave moves them on", () => {
    const p = newParty(map);
    spreadWave(p, map, 100);
    const before = ahead(p, map, 3), next = before[1].cell;
    onAreaDone(p, next, 120);
    expect(keys(ahead(p, map, 3))).toEqual(keys(before));
    spreadWave(p, map, 200);
    expect(keys(ahead(p, map, 2))).toEqual(keys(before).slice(1, 3));
  });
});

describe("the whole route, the whole time (Ed, 2026-10-06: \"I think the leylines should cover the entire set of waves the whole time\")", () => {
  const all = map.cells.length;
  it("at the start runs from home through every area, in the order the waves will wake them", () => {
    const p = newParty(map), c = leyChain(p, map);
    expect(c.current).toBe(0);
    expect(c.stones.length).toBe(all);
    expect(c.stones[0].depart).toBe(true); // (leaving the treehouse's front)
    expect(new Set(keys(c.stones)).size).toBe(all);
    expect(keys(c.stones.slice(1, 3))).toEqual([...p.next, ...p.afterNext].map(cellKey).slice(0, 2));
  });
  it("stays the same line as the waves come, the last stone reached moving on along it", () => {
    const p = newParty(map), first = keys(leyChain(p, map).stones), woken = [cellKey(map.centreCell)];
    let time = 100;
    for (let w = 0; w < 6; w++) {
      const key = leyKey(p);
      for (const a of spreadWave(p, map, (time += 100))) woken.push(cellKey(a.cell));
      const c = leyChain(p, map);
      expect(leyKey(p)).not.toBe(key);
      expect(keys(c.stones)).toEqual(first);
      expect(c.current).toBe(woken.length - 1);
      expect(keys(c.stones.slice(0, c.current + 1))).toEqual(woken);
    }
  });
  it("under advance \"first\", moves on when the next area's quest is done", () => {
    const p = newParty(firstMap);
    spreadWave(p, firstMap, 100);
    const next = leyChain(p, firstMap).stones[2].cell;
    onAreaDone(p, next, 120);
    const c = leyChain(p, firstMap);
    expect(cellKey(c.stones[c.current].cell)).toBe(cellKey(next));
    expect(c.current).toBe(2); // home, the first wave's, then the quest's
  });
});

describe("the first ley line leaves the treehouse's front, towards the dancefloor (Ed, 2026-10-05; the oak north-west of it, 2026-10-24)", () => {
  const D = TUNING.leyLines.depart;
  it("starts at the treehouse's front at the start of a run", () => {
    const m = generateMap(123, TUNING), p = newParty(m), first = ahead(p, m, 2)[0];
    expect(first.depart).toBe(true);
    expect([first.x, first.z]).toEqual([m.treehouseFront.x, m.treehouseFront.z]);
    expect(m.treehouseFront.z).toBeGreaterThan(m.treehouse.z); // (south: towards the camera)
  });
  it("stands north-west of the dancefloor (Ed, 2026-10-24; due north from 2026-10-05), its footprint gap metres outside the ring of speakers", () => {
    for (const seed of [123, 293912, 31337]) {
      const m = generateMap(seed, TUNING), d = m.dancefloor, th = m.treehouse, S = TUNING.dancefloor.speakers, a = (TUNING.treehouse.angle * Math.PI) / 180, L = Math.hypot(th.x - d.x, th.z - d.z);
      expect((th.x - d.x) / L).toBeCloseTo(Math.cos(a), 6); expect((th.z - d.z) / L).toBeCloseTo(Math.sin(a), 6);
      expect(th.x).toBeLessThan(d.x); expect(th.z).toBeLessThan(d.z); // (north-west: up the screen and to the left)
      const edge = Math.hypot(th.x - d.x, th.z - d.z) - TUNING.treehouse.clear, ring = TUNING.dancefloor.radius * S.radiusFactor + S.footprint;
      expect(edge - ring).toBeCloseTo(TUNING.treehouse.gap, 6);
    }
  });
  it("never crosses the dancefloor: on from where the boot's lap ends, round the speakers the same way (clockwise) till the objective lies out to the side, then off and round to it, smoothly, never across the boot's way down (Ed, 2026-10-06; 2026-10-29)", () => {
    // (The noisy picker's first objective lies anywhere round home.)
    for (const T of [TUNING, { ...TUNING, party: { ...TUNING.party, picker: "noisy" } }]) for (const seed of [123, 293912, 7, 1000, 42, 31337, 5, 99]) {
      const m = generateMap(seed, T), p = newParty(m), [, b] = ahead(p, m, 2), d = m.dancefloor, Q = bootPath(m);
      const pts = departureRoute(m, b, D.avoid, 4), R = speakerCircle(m) - 0.6; // (on the speakers' own circle at the closest: the boot ring's, Ed 2026-10-07)
      expect(pts[0]).toEqual(Q.path[Q.path.length - 1]); // (from where the boot's lap ends)
      const last = pts[pts.length - 1];
      expect(Math.hypot(last[0] - b.x, last[1] - b.z)).toBeLessThan(1);
      // Never over the dancefloor, nor inside its ring of speakers.
      for (const q of pts) expect(Math.hypot(q[0] - d.x, q[1] - d.z), `seed ${seed}`).toBeGreaterThanOrEqual(R - 1e-6);
      // On round the ring the way the boot goes: clockwise on the screen (the angle round home, 0 south, falling), whichever side the objective is.
      const ang = (q: readonly number[]) => Math.atan2(q[0] - d.x, q[1] - d.z);
      const k = Math.min(4, pts.length - 1), turn = Math.atan2(Math.sin(ang(pts[k]) - ang(pts[0])), Math.cos(ang(pts[k]) - ang(pts[0])));
      expect(turn, `seed ${seed}: clockwise`).toBeLessThan(0);
      // Smooth: no sharp corners.
      for (let i = 2; i < pts.length; i++) {
        const u = [pts[i - 1][0] - pts[i - 2][0], pts[i - 1][1] - pts[i - 2][1]], v = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
        const cos = (u[0] * v[0] + u[1] * v[1]) / ((Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1])) || 1);
        expect(cos, `seed ${seed} at ${i}`).toBeGreaterThan(Math.cos((50 * Math.PI) / 180));
      }
      // Off the ring, it never crosses the boot's own way down from the treehouse's front (the one path never meets itself).
      const r = (q: readonly number[]) => Math.hypot(q[0] - d.x, q[1] - d.z), approach = Q.path.slice(0, Q.path.length - 72), off = pts.slice(Math.max(0, pts.findIndex(q => r(q) > R + 2)));
      expect(polylinesMeet(approach, off), `seed ${seed}: across the way down`).toBe(false);
    }
  }, 60000);
  it("leaves the ring in a sweep no tighter than the line's own radius, like every other turn (Ed, 2026-10-23)", () => {
    // (the turn's radius by three points 12 m apart along it, from where it leaves the speakers' circle to the first stone)
    const radius = (a: number[], b: number[], c: number[]) => {
      const ab = Math.hypot(b[0] - a[0], b[1] - a[1]), bc = Math.hypot(c[0] - b[0], c[1] - b[1]), ca = Math.hypot(a[0] - c[0], a[1] - c[1]);
      const area2 = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
      return area2 < 1e-9 ? Infinity : (ab * bc * ca) / (2 * area2);
    };
    let tightest = Infinity;
    for (const T of [TUNING, { ...TUNING, party: { ...TUNING.party, picker: "noisy" } }]) for (const seed of [123, 293912, 7, 1000, 42, 31337, 5, 99]) {
      const m = generateMap(seed, T), p = newParty(m), [, b] = ahead(p, m, 2), d = m.dancefloor, rho = speakerCircle(m), R = leyRadius(m);
      const pts = departureRoute(m, b, D.avoid, 4), k = 3;
      // (where it leaves the speakers' circle: its last point on it, or, where it only touches it, its nearest to home)
      let off = 0, near = Infinity;
      pts.forEach((q, i) => { const r = Math.hypot(q[0] - d.x, q[1] - d.z); if (r <= rho + 0.5 || r < near) off = i; near = Math.min(near, r); });
      for (let i = off + k; i < pts.length - k; i++) {
        const r = radius(pts[i - k], pts[i], pts[i + k]);
        tightest = Math.min(tightest, r / R);
        expect(r, `seed ${seed} at ${i} of ${pts.length}`).toBeGreaterThanOrEqual(R);
      }
    }
    expect(tightest).toBeLessThan(1.5); // (it does turn: the test sees the sweep)
  }, 60000);
});

// The ley line's curvature (rules/leycurve.ts; Ed, 2026-10-06: no hairpins, no V at a runestone).
import { describe, expect, it } from "vitest";
import { curveLink, curvedLinks, headingOf, tightestTurn, wayThrough } from "./leycurve";
import type { P2 } from "./crossing";

const R = 30;
const endHeading = (p: readonly P2[]) => headingOf(p[p.length - 2], p[p.length - 1]);
const startHeading = (p: readonly P2[]) => headingOf(p[0], p[1]);
const angDiff = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));

describe("the ley line's curves", () => {
  it("joins any two stones on their headings, landing exactly, never tighter than the radius", () => {
    let seed = 1;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let n = 0; n < 400; n++) {
      const a: P2 = [r() * 400 - 200, r() * 400 - 200], b: P2 = [r() * 400 - 200, r() * 400 - 200], ha = r() * 6.3, hb = r() * 6.3;
      const p = curveLink(a, ha, b, hb, R, 2);
      expect(p[0]).toEqual([a[0], a[1]]);
      expect(p[p.length - 1]).toEqual([b[0], b[1]]);
      expect(angDiff(startHeading(p), ha)).toBeLessThan(0.08);
      expect(angDiff(endHeading(p), hb)).toBeLessThan(0.08);
      expect(tightestTurn(p, 6)).toBeGreaterThan(R * 0.97);
    }
  });
  it("goes through a stone it must double back from in a wide loop, not a hairpin", () => {
    // in from the south-east, on to a stone back the way it came
    const st: P2[] = [[100, 100], [0, 0], [110, 80]], depart: P2[] = [[150, 150], [100, 100]];
    const links = curvedLinks(depart, st, R, 2);
    for (const l of links.slice(1)) expect(tightestTurn(l, 6)).toBeGreaterThan(R * 0.97);
    // smooth through the middle stone: in on its heading, out on the same
    expect(angDiff(endHeading(links[1]), startHeading(links[2]))).toBeLessThan(0.08);
    // and the way through a dead-on hairpin is across it
    expect(angDiff(wayThrough([0, 100], [0, 0], [0, 100]), 0)).toBeLessThan(1e-9);
  });
  it("passes through every stone without a corner (a V at a stone is the in and out headings apart)", () => {
    const st: P2[] = [[0, 0], [200, 60], [260, 260], [60, 330], [-100, 200]], depart: P2[] = [[-60, -60], [-20, -20], [0, 0]];
    const links = curvedLinks(depart, st, R, 2);
    for (let i = 1; i < links.length - 1; i++) expect(angDiff(endHeading(links[i]), startHeading(links[i + 1]))).toBeLessThan(0.08);
    expect(angDiff(endHeading(links[0]), startHeading(links[1]))).toBeLessThan(0.08);
  });
});

describe("the route's curves on real maps (Ed, 2026-10-06: no hairpins, no V at a runestone)", () => {
  it("never turns tighter than leyLines.minRadius, sweeps through every stone without a corner, and keeps off the dancefloor", async () => {
    const { generateMap } = await import("./map"), { TUNING } = await import("./tuning"), { routeOf } = await import("./party");
    const { leyRadius } = await import("./leyroute"), { departureClear } = await import("./departure");
    for (const seed of [1, 2, 3, 123, 4242, 925469]) {
      const map = generateMap(seed, TUNING), r = routeOf(map), Rm = leyRadius(map), d = map.dancefloor, clear = departureClear(map, TUNING.leyLines.depart.avoid);
      expect(Rm).toBe(TUNING.leyLines.minRadius);
      for (let i = 1; i < r.links.length; i++) {
        expect(tightestTurn(r.links[i], 6), `seed ${seed}: link ${i}`).toBeGreaterThan(Rm * 0.97);
        expect(angDiff(endHeading(r.links[i - 1]), startHeading(r.links[i])), `seed ${seed}: at stone ${i}`).toBeLessThan(4 / Rm + 0.03); // (sampled every 4 m: the chords either side of a stone on the tightest arc differ by 4 / R, no more)
        for (const p of r.links[i]) expect(Math.hypot(p[0] - d.x, p[1] - d.z), `seed ${seed}: link ${i} over the dancefloor`).toBeGreaterThan(clear - 0.5);
      }
      expect(new Set(r.stones.map(s => s.join())).size).toBe(r.stones.length); // (every stone once; its shape: leyroute.test.ts "spirals out")
    }
  }, 300_000);
});

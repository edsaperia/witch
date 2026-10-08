// The legend relics' places (Ed, 2026-10-06: "each one should appear on the map once. One appears
// near an edge of the home area, the rest are scattered across the map, none can be within 150m of
// another"), over many seeds: one of each kind, one just inside home's edge, every pair minGap
// apart, none in a cleared place, all in bounds; and the same map gives the same relics.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { LEGENDS, placeRelics } from "./legends";
import { newGame, stepGame } from "./game";

const SEEDS = [1, 2, 3, 7, 42, 123, 999, 4242, 31337, 165272, 922199, 2026];

describe("legend relics on the map", () => {
  it("one of each kind, one just inside the home area's edge, the rest out in the map, every pair minGap apart", () => {
    const R = LEGENDS.relics;
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), relics = placeRelics(map, new Forest(map));
      expect(relics.length, `seed ${seed}`).toBe(R.kinds.length);
      expect([...relics.map(r => r.kind)].sort(), `seed ${seed}`).toEqual([...R.kinds].sort());
      const C = map.centreCell, home = map.siteOf(C[0], C[1]);
      const inHome = relics.filter(r => r.cell[0] === C[0] && r.cell[1] === C[1]);
      expect(inHome.length, `seed ${seed}: one in the home area`).toBe(1);
      // Near its edge: within homeInset (and a step) of leaving it, out past home's circle.
      const h = inHome[0], d = Math.hypot(h.x - home.x, h.z - home.z), dx = (h.x - home.x) / d, dz = (h.z - home.z) / d;
      const out = (k: number) => { const c = map.cellSafe(h.x + dx * k, h.z + dz * k).cell; return c[0] !== C[0] || c[1] !== C[1]; };
      expect(Array.from({ length: R.homeInset + 5 }, (_, k) => out(k + 1)).some(Boolean), `seed ${seed}: near home's edge`).toBe(true); // (leaving it somewhere along the way: a wiggly border may come back in)
      expect(d, `seed ${seed}: past home's circle`).toBeGreaterThan(map.homeRadius);
      expect(Math.hypot(h.x - map.treehouse.x, h.z - map.treehouse.z), `seed ${seed}: clear of the treehouse`).toBeGreaterThanOrEqual(R.clearOfTreehouse);
      for (const r of relics) {
        expect(map.hardClear(r.x, r.z), `seed ${seed}: ${r.kind} not in a cleared place`).toBe(false);
        expect(r.x > map.bounds.minX && r.x < map.bounds.maxX && r.z > map.bounds.minZ && r.z < map.bounds.maxZ).toBe(true);
        if (r !== h) expect(map.remoteness(r.cell[0], r.cell[1])).toBeGreaterThanOrEqual(R.minRemoteness);
      }
      // Every pair minGap apart, the relics and their sigils (south of them) alike.
      const spots = relics.flatMap(r => [{ r, x: r.x, z: r.z }, { r, x: r.sx, z: r.sz }]);
      for (const a of spots) for (const c of spots) if (a.r !== c.r) expect(Math.hypot(a.x - c.x, a.z - c.z), `seed ${seed}: ${a.r.kind}–${c.r.kind}`).toBeGreaterThanOrEqual(R.minGap);
      for (const r of relics) { expect(r.sx).toBe(r.x); expect(r.sz - r.z).toBeCloseTo(R.sigilOffset); }
    }
  }, 240000);

  it("are picked up by standing on their sigil and pressing the button, like any sigil; not from beside the relic itself", () => {
    const g = newGame(123, TUNING), r = g.relics[0], C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    g.clock.paused = false;
    const at = (x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
    // Beside the relic (on it, and a step off), but not on its sigil: nothing.
    for (const [x, z] of [[r.x, r.z], [r.x + 1.5, r.z - 1]]) { at(x, z); stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); }
    expect(r.state).toBe("lying");
    expect(g.leash.relics).toEqual([]);
    // On its sigil: picked up, carried.
    at(r.sx, r.sz);
    stepGame(g, { ...C, place: true }, 1 / 60);
    expect(r.state).toBe("carried");
    expect(g.leash.relics).toEqual([r.id]);
  }, 60000);

  it("are the same for the same seed", () => {
    const a = generateMap(123, TUNING), b = generateMap(123, TUNING);
    expect(placeRelics(a, new Forest(a))).toEqual(placeRelics(b, new Forest(b)));
  }, 60000);
});

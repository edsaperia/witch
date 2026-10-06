import { describe, expect, it } from "vitest";
import { feed, newBerries, stepBerries, toEvolve, type BerryState, berryCounts } from "./berries";
import { LEGEND, spawnCreatures, type Creature, type Level } from "./creatures";
import { invitable, leashSpeed, newLeash } from "./leash";
import { generateMap } from "./map";
import { TUNING } from "./tuning";

const map = generateMap(123, TUNING), t = TUNING;
const bushesOk = (s: BerryState) => {
  const seen = new Set<number>();
  for (const b of s.berries) { expect(seen.has(b.bush)).toBe(false); seen.add(b.bush); expect(s.onBush[b.bush]).toBe(b.id); }
  expect([...s.onBush].filter(i => i >= 0).length).toBe(s.berries.length);
};
// A creature standing next to a berry, as a party animal (leashed) or a wild one.
const beside = (s: BerryState, c: Creature, i: number, leashed: boolean, level: Level) => {
  const p = s.bushes[s.berries[i].bush];
  Object.assign(c, { x: p.x + 1, z: p.z + 1, leashed, level, rest: 0 });
  return { x: p.x + 1, z: p.z + 1 };
};
const run = (s: BerryState, cs: Creature[], points: Map<number, { x: number; z: number }>, secs: number, from = 0) => {
  let time = from;
  for (let i = 0; i < secs * 20; i++) { time += 0.05; stepBerries(s, cs, id => points.get(id) ?? null, time, 0.05, t); }
  return time;
};

describe("berries and evolving", () => {
  it("every area has perArea berries, one per bush, and the same seed gives the same berries", () => {
    const s = newBerries(map, t), [lo, hi] = berryCounts(map, t).perArea; // (scaled to the areas' size)
    bushesOk(s);
    const per = new Map<string, number>();
    for (const b of s.berries) { const c = map.areaAt(s.bushes[b.bush].x, s.bushes[b.bush].z).cell.join(","); per.set(c, (per.get(c) ?? 0) + 1); }
    const counts = [...per.values()];
    expect(counts.length).toBeGreaterThan(map.cells.length * 0.9);
    expect(counts.every(n => n >= Math.min(lo, 1) && n <= hi)).toBe(true);
    expect(counts.filter(n => n >= lo).length / counts.length).toBeGreaterThan(0.9);
    const again = newBerries(map, t);
    expect(again.berries.map(b => b.bush)).toEqual(s.berries.map(b => b.bush));
    expect(again.bushes.slice(0, 50)).toEqual(s.bushes.slice(0, 50));
  });

  it("party animals walk to a berry and eat it; it grows again elsewhere, so the total never changes", () => {
    const s = newBerries(map, t), cs = spawnCreatures(map).slice(0, 3), total = s.berries.length;
    const points = new Map<number, { x: number; z: number }>();
    cs.forEach((c, i) => points.set(c.id, beside(s, c, i * 40, true, 0)));
    const before = s.berries.map(b => b.bush);
    run(s, cs, points, 6);
    expect(s.berries.length).toBe(total);
    bushesOk(s);
    for (const c of cs) expect(s.ateAt.has(c.id)).toBe(true); // (a baby evolves after one, so fed is back to 0)
    expect(s.berries.filter((b, i) => b.bush !== before[i]).length).toBeGreaterThanOrEqual(3); // eaten ones moved
  });

  it("wild animals and legends never eat", () => {
    const s = newBerries(map, t), cs = spawnCreatures(map).slice(0, 2), points = new Map<number, { x: number; z: number }>();
    beside(s, cs[0], 0, false, 0); // wild
    points.set(cs[1].id, beside(s, cs[1], 5, true, LEGEND)); // a party legend
    run(s, cs, points, 6);
    expect(s.fed.size).toBe(0);
    expect(s.feeding.size).toBe(0);
    expect(s.berries.every(b => b.claimedBy === null)).toBe(true);
  });

  it("evolves after 4 and 4 berries (its strength gained, Ed 2026-10-05; doubled 2026-10-06), on a bar line, up to adult and no further (Ed, 2026-10-04); legends can't be invited", () => {
    const s = newBerries(map, t), [c, wild] = spawnCreatures(map), leash = newLeash();
    Object.assign(c, { leashed: true, level: 0 });
    leash.stack.push(c.id);
    expect([0, 1, 2].map(l => toEvolve(l as Level, t))).toEqual([4, 4, Infinity]);
    let time = 0;
    for (const level of [0, 1] as Level[]) {
      expect(c.level).toBe(level);
      for (let i = 0; i < toEvolve(level, t) - 1; i++) feed(s, c, time, t);
      expect(s.evolving.has(c.id)).toBe(false);
      feed(s, c, time, t);
      const e = s.evolving.get(c.id)!;
      expect(e.to).toBe(level + 1);
      const bar = (60 / t.beat.bpm) * 4;
      expect(Math.abs(e.at / bar - Math.round(e.at / bar))).toBeLessThan(1e-9); // on a bar line
      time = run(s, [c], new Map([[c.id, { x: c.x, z: c.z }]]), e.at - time + 0.1, time);
      expect(c.level).toBe(level + 1);
    }
    expect(c.level).toBe(2);
    for (let i = 0; i < 20; i++) feed(s, c, time, t); // an adult eats (a hurt one heals) but doesn't evolve
    expect(s.evolving.has(c.id)).toBe(false);
    expect(c.leashed).toBe(true);
    Object.assign(wild, { leashed: false, level: LEGEND });
    expect(invitable(wild)).toBe(false);
  });

  it("bushes grow in patches: each bush has others of its patch close by", () => {
    const s = newBerries(map, t), R = t.berries.patch.radius;
    const near = s.bushes.filter(b => s.bushes.some(o => o !== b && Math.hypot(o.x - b.x, o.z - b.z) <= R * 2));
    expect(near.length / s.bushes.length).toBeGreaterThan(0.9);
  });

  it("a party animal takes a berry on its way (within the detour), not one off to the side", () => {
    const s = newBerries(map, t), [a, b] = spawnCreatures(map), D = t.berries.detour;
    // Lone berries, for a clean test: everything else is taken.
    for (const x of s.berries) x.claimedBy = -1;
    // the second the furthest from the first (two close by would put both on a's way, whatever the map)
    const on = s.berries[0], po = s.bushes[on.bush], far = (x: typeof on) => Math.hypot(s.bushes[x.bush].x - po.x, s.bushes[x.bush].z - po.z);
    const off = s.berries.reduce((m, x) => (far(x) > far(m) ? x : m)), pf = s.bushes[off.bush];
    on.claimedBy = off.claimedBy = null;
    // a walks towards its leash point past the first berry, 1 m off its line; b's line passes far from the second.
    Object.assign(a, { x: po.x - 5, z: po.z + 1, leashed: true, level: 0, rest: 0 });
    Object.assign(b, { x: pf.x - 5, z: pf.z + D + 3, leashed: true, level: 0, rest: 0 });
    const points = new Map([[a.id, { x: po.x + 5, z: po.z + 1 }], [b.id, { x: pf.x + 5, z: pf.z + D + 3 }]]);
    stepBerries(s, [a, b], id => points.get(id) ?? null, 0.05, 0.05, t);
    expect(s.feeding.get(a.id)?.berry).toBe(on.id);
    expect(s.feeding.has(b.id)).toBe(false);
  });

  it("a party animal goes to a berry at its leash pace, not its idle amble", () => {
    const s = newBerries(map, t), [a] = spawnCreatures(map);
    for (const x of s.berries) x.claimedBy = -1;
    const on = s.berries[0], p = s.bushes[on.bush];
    on.claimedBy = null;
    Object.assign(a, { x: p.x - 4, z: p.z + 0.6, leashed: true, level: 1, rest: 0 });
    const lp = { x: p.x + 4, z: p.z + 0.6 };
    stepBerries(s, [a], () => lp, 0.05, 0.05, t); // claims it
    const x0 = a.x;
    stepBerries(s, [a], () => lp, 0.1, 0.05, t);
    expect((a.x - x0) / 0.05).toBeCloseTo(leashSpeed(a, t), 5);
    expect(leashSpeed(a, t)).toBeGreaterThan(a.speed * 1.5);
  });
});

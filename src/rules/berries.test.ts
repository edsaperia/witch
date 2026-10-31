import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { COMBAT } from "./combat";
import { feed, lastBerry, newBerries, stepBerries, toEvolve, type BerryState, berryCounts } from "./berries";
import { LEGEND, spawnCreatures, type Creature, type Level } from "./creatures";
import { invitable, leashSpeed, newLeash } from "./leash";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { smallWorldTuning } from "../test/worlds";

/** Every species at strength 1 for these tests (Ed, 2026-10-08, gave the species strengths by class; these test other
 *  mechanics, written when every species was 1): combat.json strength.species emptied for the block, put back after. */
const SAVED_STRENGTH = { ...COMBAT.strength!.species };
const plainStrength = () => { for (const k of Object.keys(COMBAT.strength!.species)) delete COMBAT.strength!.species[k]; };
const restoreStrength = () => Object.assign(COMBAT.strength!.species, SAVED_STRENGTH);

// Retain the full population for area-distribution ratios, patch coverage and the separated berry-index fixtures.
const map = generateMap(123, TUNING), t = TUNING;
const mechanicsMap = () => generateMap(123, smallWorldTuning(TUNING, "Evolution counters and one creature's leash pace do not depend on world size."));
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
  beforeAll(plainStrength); afterAll(restoreStrength);
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

  it("evolves after 1 and 4 berries (a baby's one: Ed, 2026-10-11; the youth's by its strength gained, Ed 2026-10-05; 3 / 4 / 8 by strength, Ed 2026-10-27), on a bar line, up to adult and no further (Ed, 2026-10-04); legends can't be invited", () => {
    const map = mechanicsMap();
    const s = newBerries(map, t), [c, wild] = spawnCreatures(map), leash = newLeash();
    Object.assign(c, { leashed: true, level: 0 });
    leash.stack.push(c.id);
    expect([0, 1, 2].map(l => toEvolve(l as Level, t))).toEqual([1, 4, Infinity]);
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

  it("following her, a youth eats the berries it passes up to one short of adult and leaves the rest; only at a sigil she's put down does it eat the last and grow (Ed, 2026-10-27); a baby following her eats none", () => {
    const s = newBerries(map, t), [y, baby] = spawnCreatures(map), need = toEvolve(1, t);
    // a patch of eight berries round one spot, the youth and the baby there, their leash points (her, following) there too
    const at = s.bushes[s.berries[0].bush], spot = { x: at.x, z: at.z };
    for (let i = 0; i < 8; i++) { const p = s.bushes[s.berries[i].bush]; p.x = spot.x + Math.cos(i) * 2; p.z = spot.z + Math.sin(i) * 2; }
    Object.assign(y, { x: spot.x, z: spot.z + 1, leashed: true, level: 1, rest: 0 });
    Object.assign(baby, { x: spot.x + 1, z: spot.z + 1, leashed: true, level: 0, rest: 0 });
    s.fed.set(y.id, need - 4); // four short: three to eat on the move
    let time = 0, sigil: { x: number; z: number } | null = null;
    const step = (secs: number) => { for (let i = 0; i < secs * 20; i++) { time += 0.05; stepBerries(s, [y, baby], () => spot, time, 0.05, t, undefined, id => (id === y.id ? sigil : null)); expect(y.level, "never an adult on the move").toBe(1); } };
    step(40);
    expect(s.fed.get(y.id), "one short of adult").toBe(need - 1);
    expect(lastBerry(y, s, t)).toBe(true);
    expect(s.evolving.has(y.id)).toBe(false);
    expect(s.feeding.has(y.id), "the berries it passes are left").toBe(false);
    expect(baby.level, "a baby following her eats none").toBe(0);
    expect(s.fed.get(baby.id) ?? 0).toBe(0);
    // she puts its sigil down here: it eats the last berry and grows
    sigil = spot;
    for (let i = 0; i < 40 * 20 && y.level === 1; i++) { time += 0.05; stepBerries(s, [y], () => spot, time, 0.05, t, undefined, () => sigil); }
    expect(y.level, "at her sigil it grows").toBe(2);
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
    const map = mechanicsMap();
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

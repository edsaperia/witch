// The attack grammar's step 3 blocks in the engine (rules/attacks/engine.ts), headless: what other animals take (hit.allies: Ed,
// 2026-10-27, little friendly damage but its effects sometimes), beams (charging, sweeping, tracking, spinning, pulsing, a strike),
// areas (a shrinking safe circle, cross/line/grid patterns, waves, rain), traps (mines, seeds, lures), force fields, burns, turrets, and
// one of Ed's legend shapes (a huge bomb whose landing sows a ring of delayed blasts) held to the reaction floor.
import { describe, expect, it } from "vitest";
import { cast, newSpells, stepSpells, type Hittable, type SpellState, type SpellWorld } from "./engine";
import { parseAttack, readability, REACTION_FLOOR, type AttackSpec } from "./index";
import type { Effect } from "./types";

const STEP = 1 / 60;
type Hit = { id: number | string; damage: number; effect?: Effect; at: number };

/** A pretend world: the caster is creature 1 of side "wild"; targets stand where put (their side decides foe or ally); forces recorded. */
function world(targets: Hittable[]) {
  const hits: Hit[] = [], forces: { id: number | string; push: number }[] = [];
  let now = 0;
  const caster = { kind: "creature" as const, id: 1, x: 0, z: 0, r: 0.5, side: "wild", species: "wolf" };
  const W: SpellWorld = {
    seed: 11,
    near: (x, z, r) => targets.filter(t => Math.hypot(t.x - x, t.z - z) <= r + 3),
    hostile: (side, t) => t.side !== side,
    harm: (t, damage, effect) => { hits.push({ id: t.id, damage, effect, at: now }); },
    where: (kind, id) => (kind === "creature" && id === 1 ? caster : targets.find(t => t.kind === kind && t.id === id) ?? null),
    force: (t, _fx, _fz, push) => { forces.push({ id: t.id, push }); },
  };
  const tick = (S: SpellState, until: number, each?: (t: number) => void) => { for (let t = STEP; t <= until + 1e-9; t += STEP) { now = t; each?.(t); stepSpells(S, W, {}, t, STEP); } };
  return { W, hits, forces, tick };
}
const her = (x: number, z: number): Hittable => ({ kind: "witch", id: "her", x, z, r: 0.3, side: "party" });
const foe = (id: number, x: number, z: number): Hittable => ({ kind: "creature", id, x, z, r: 0.5, side: "party" });
const ally = (id: number, x: number, z: number): Hittable => ({ kind: "creature", id, x, z, r: 0.5, side: "wild", species: "boar" });
const fire = (spec: AttackSpec, targets: Hittable[], until: number, each?: (t: number, S: SpellState) => void) => {
  const w = world(targets), S = newSpells(11);
  cast(S, w.W, spec, "test", { id: 1, x: 0, z: 0, side: "wild", species: "wolf" }, targets[0] ?? null, 0, 10);
  w.tick(S, until, t => each?.(t, S));
  return { S, ...w };
};
const dmg = (hits: Hit[], id: number | string) => hits.filter(h => h.id === id).reduce((s, h) => s + h.damage, 0);

describe("other animals (hit.allies)", () => {
  const blast: AttackSpec = { cast: { windup: 0 }, body: { kind: "area" }, area: { r: 6 }, hit: { effect: { knockback: 8, slow: { mult: 0.5, time: 1 } } } };
  it("leaves them be unless it says, then takes its share of damage and only the effects it names", () => {
    expect(fire(blast, [foe(2, 3, 0), ally(3, -3, 0)], 0.2).hits.map(h => h.id)).toEqual([2]);
    const spill = fire({ ...blast, hit: { ...blast.hit, allies: { effects: ["knockback"] } } }, [foe(2, 3, 0), ally(3, -3, 0)], 0.2).hits;
    expect(spill.find(h => h.id === 3)).toMatchObject({ damage: 0, effect: { knockback: 8 } });
    expect(spill.find(h => h.id === 3)!.effect!.slow).toBeUndefined();
    expect(dmg(fire({ ...blast, hit: { ...blast.hit, allies: { damage: 0.5 } } }, [foe(2, 3, 0), ally(3, -3, 0)], 0.2).hits, 3)).toBe(5);
  });
});

describe("beams", () => {
  it("charges (no harm, its line thin) then burns; hurts her once, a creature each tick", () => {
    const beam: AttackSpec = { cast: { windup: 0.5 }, body: { kind: "beam" }, beam: { length: 20, width: 2, duration: 1, tick: 0.25, charge: 0.6 } };
    const r = fire(beam, [foe(5, 10, 0)], 3);
    expect(r.hits[0].at).toBeGreaterThanOrEqual(0.5 + 0.6 - 1e-9);
    expect(r.hits.length).toBe(4); expect(dmg(r.hits, 5)).toBeCloseTo(10);
    expect(r.S.telegraphs.find(t => t.kind === "beamLine")).toMatchObject({ start: 0, fire: 1.1, shape: { type: "segment", x: 0, z: 0 } });
    expect(fire(beam, [her(10, 0)], 3).hits.filter(h => h.damage > 0).length).toBe(1);
  });
  it("sweeps across its aim, spins round, pulses off and on, and strikes in a flash", () => {
    // (a sweep of 90° a second for a second starts 45° off her and passes over her halfway)
    const sweep = fire({ cast: { windup: 0 }, body: { kind: "beam" }, beam: { length: 20, width: 1, duration: 1, tick: 0.05, sweep: 90 } }, [foe(5, 10, 0)], 2);
    expect(sweep.hits.length).toBeGreaterThan(0); expect(sweep.hits[0].at).toBeGreaterThan(0.3); expect(sweep.hits[0].at).toBeLessThan(0.7);
    const spin = fire({ cast: { windup: 0 }, emit: { aim: "ahead" }, body: { kind: "beam" }, beam: { length: 15, width: 1, duration: 2, tick: 0.05, spin: 360 } }, [foe(5, 0, 10)], 3);
    expect(spin.hits.length).toBeGreaterThan(0);
    const pulse = fire({ cast: { windup: 0 }, body: { kind: "beam" }, beam: { length: 20, width: 2, duration: 2, tick: 0.1, pulse: [0.5, 0.5] } }, [foe(5, 10, 0)], 3);
    expect(pulse.hits.every(h => ((h.at - 1 / 60 + 1e-6) % 1) < 0.5 + 1e-6)).toBe(true); // (live the first half of each second from its release)
    const strike = fire({ cast: { windup: 0.4 }, body: { kind: "beam" }, beam: { length: 20, width: 2, strike: true } }, [foe(5, 10, 0)], 2);
    expect(strike.hits.length).toBe(1); expect(dmg(strike.hits, 5)).toBe(10);
  });
  it("tracks her, turning at most its rate", () => {
    const t = foe(5, 10, 0), r = fire({ cast: { windup: 0 }, body: { kind: "beam" }, beam: { length: 30, width: 1, duration: 3, tick: 0.1, track: 60 } }, [t], 3, time => { t.x = 10 * Math.cos(time * 0.5); t.z = 10 * Math.sin(time * 0.5); });
    expect(r.hits.length).toBeGreaterThan(20);
  });
});

describe("areas", () => {
  it("keeps a shrinking safe circle: harm only outside it", () => {
    const safe: AttackSpec = { cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "safeCircle", r: 15, inner: 10, to: 2, time: 4 }, zone: { time: 5, tick: 0.25 } };
    const r = fire(safe, [foe(5, 6, 0)], 6);
    expect(r.hits[0].at).toBeGreaterThan(1.5); // (safe at 6 m till the circle shrinks past it: 10 → 2 over 4 s passes 6 m at 2 s)
  });
  it("sets off a cross, a line and a grid in turn, each cell where it was telegraphed", () => {
    const cross = fire({ cast: { windup: 0.5 }, body: { kind: "area" }, area: { shape: "cross", n: 2, r: 1.5, spacing: 3, delay: 0.2 } }, [her(30, 0)], 3);
    const cells = cross.S.telegraphs.filter(t => t.kind === "landing");
    expect(cells.length).toBe(9);
    expect(cells.map(t => +t.fire.toFixed(2))).toEqual([0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.9, 2.1]);
    expect(cross.S.stats.zones[0]).toBe(9);
    expect(fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "grid", n: 3, r: 1, spacing: 2, delay: 0.05 } }, [her(30, 0)], 1).S.stats.zones[0]).toBe(9);
    const line = fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "line", n: 5, r: 1.5, spacing: 3, delay: 0.1 } }, [foe(5, 9, 0)], 1);
    expect(line.hits.length).toBe(1); expect(line.hits[0].at).toBeCloseTo(0.2, 1); // (the third cell, 9 m out)
  });
  it("sends waves of rings and rains seeded drops, each landing shown its lead before it falls", () => {
    expect(fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "ring", r: 8, width: 1.5, grow: 16, waves: 3, gap: 0.5 } }, [her(30, 0)], 3).S.stats.zones[0]).toBe(3);
    const rain: AttackSpec = { cast: { windup: 0.3 }, body: { kind: "area" }, area: { r: 1.5, at: "target", rain: { n: 12, r: 8, time: 2 } }, telegraph: { lead: 0.8 } };
    const a = fire(rain, [her(20, 0)], 4), b = fire(rain, [her(20, 0)], 4);
    const drops = a.S.telegraphs.filter(t => t.kind === "landing");
    expect(drops.length).toBe(12);
    for (const d of drops) { expect(d.fire - d.start).toBeCloseTo(0.8); expect(Math.hypot(d.shape.x - 20, d.shape.z)).toBeLessThanOrEqual(8 + 1e-9); }
    expect(drops.map(d => d.shape.x)).toEqual(b.S.telegraphs.filter(t => t.kind === "landing").map(d => d.shape.x));
    expect(readability(rain, {}).warning).toBeCloseTo(0.8);
  });
});

describe("traps, forces, burns and turrets", () => {
  it("lays a mine where she stood, arms it, and sets it off when a foe steps in", () => {
    const t = foe(5, 12, 0), mine: AttackSpec = { cast: { windup: 0.3 }, body: { kind: "mine", arm: 1, trigger: 2 }, area: { r: 3 }, life: { time: 10 } };
    const r = fire(mine, [t], 4, time => { t.x = time < 2 ? 30 : 12; }); // (away while it arms, back on it at 2 s)
    expect(r.S.events.map(e => e.kind)).toEqual(expect.arrayContaining(["armed", "sprung"]));
    expect(r.hits.length).toBe(1); expect(r.hits[0].at).toBeGreaterThanOrEqual(2);
    const arming = r.S.telegraphs.find(x => x.kind === "arming")!;
    expect(arming.fire).toBeCloseTo(1.3, 1); expect(arming.shape).toMatchObject({ type: "disc", x: 12, r: 2 });
    expect(fire(mine, [foe(5, 12, 0)], 0.9).hits.length).toBe(0); // (not yet armed)
  });
  it("sprouts a seed into what it sows, and a lure pulls her in", () => {
    const seed: AttackSpec = { cast: { windup: 0.3 }, body: { kind: "seed", arm: 1.2 }, on: { land: [{ attack: { body: { kind: "zone" }, zone: { r: 3, time: 2, tick: 0.5 } } }] } };
    const r = fire(seed, [foe(5, 8, 0)], 4);
    expect(r.S.events.some(e => e.kind === "sprout")).toBe(true); expect(r.S.stats.zones[1]).toBe(1); expect(r.hits[0].at).toBeGreaterThanOrEqual(1.5);
    expect(readability(seed, {}).warning).toBeCloseTo(1.2); // (what it sows warned of by its countdown from when it's laid)
    const lure = fire({ cast: { windup: 0 }, body: { kind: "lure", reach: 10, pull: 5 }, speed: { v: 2 }, life: { range: 8 } }, [her(6, 0)], 1);
    expect(lure.forces.length).toBeGreaterThan(10); expect(lure.forces.every(f => f.push === -5)).toBe(true);
  });
  it("pushes whoever its force says: everyone, or only its foes", () => {
    const wind = (who: "all" | "others" | "foes") => fire({ cast: { windup: 0 }, body: { kind: "zone" }, zone: { r: 6, time: 1 }, hit: { damage: 0 }, force: { push: 8, who } }, [her(2, 0), foe(2, 0, 2), ally(3, 0, -2)], 0.5).forces;
    expect(new Set(wind("all").map(f => f.id))).toEqual(new Set(["her", 2, 3]));
    expect(new Set(wind("others").map(f => f.id))).toEqual(new Set([2, 3]));
    expect(new Set(wind("foes").map(f => f.id))).toEqual(new Set(["her", 2]));
  });
  it("burns a creature over time, and lets a turret cast its shots in turn, each warned of", () => {
    const burn = fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { r: 4 }, hit: { damage: 0.1, effect: { burn: { dps: 4, time: 2 } } } }, [foe(5, 2, 0)], 3);
    expect(dmg(burn.hits, 5)).toBeCloseTo(1 + 8, 0);
    const turret: AttackSpec = { cast: { windup: 0 }, body: { kind: "seed", arm: 0.5 }, hit: { damage: 0 }, on: { land: [{ attack: { cast: { windup: 0.5, casts: 3, cooldown: 0.6 }, emit: { aim: "target" }, speed: { v: 30 }, life: { range: 20 } } }] } };
    const t = fire(turret, [foe(5, 15, 0)], 4);
    expect(t.S.stats.bodies[1]).toBe(3);
    expect(t.hits.length).toBe(3);
    expect(t.S.events.filter(e => e.kind === "telegraph" && e.attack === "land").length).toBe(3); // (each of its casts warned of)
  });
});

describe("a legend's shape (Ed: a huge bomb that lands and explodes into a ring of bombs)", () => {
  const bomb: AttackSpec = {
    cast: { range: 300, windup: 2, tell: { pose: "rear", glow: 1.5 } }, telegraph: { kind: "landing" },
    body: { kind: "lob", flight: 3, radius: 6, element: "earth" }, hit: { damage: 0.3 },
    on: { land: [{ attack: { emit: { pattern: "ring", n: 6, spacing: 8 }, body: { kind: "seed", arm: 1.5, radius: 3 }, telegraph: { kind: "countdown" }, hit: { damage: 0 }, on: { land: [{ attack: { body: { kind: "area" }, area: { r: 3 }, hit: { damage: 0.2 } } }] } } }] },
  };
  it("is readable, lands where shown, and its ring goes off after its countdowns", () => {
    expect(parseAttack(bomb, {}, { strict: true }).errors).toEqual([]);
    expect(readability(bomb, {}).warning).toBeGreaterThanOrEqual(REACTION_FLOOR);
    const r = fire(bomb, [foe(5, 40, 0), foe(6, 48, 0)], 9);
    expect(r.S.events.filter(e => e.kind === "sprout").length).toBe(6);
    expect(r.S.telegraphs.filter(t => t.kind === "countdown").length).toBe(6);
    expect(r.hits.find(h => h.id === 6)!.at).toBeGreaterThan(2 + 3 + 1.5 - 0.05); // (caught by the ring, after its countdown)
  });
});

// The composable attacks' engine (rules/attacks/engine.ts, the plan's step 2), headless on a pretend world: each module on its own
// (paths, speeds, patterns, life, events and children, zones, telegraphs and tells), seeded and repeatable, and the composed example
// (a curving bolt that splits into a ring of homing bolts that each leave a puddle).
import { describe, expect, it } from "vitest";
import { cancel, cast, newSpells, predictPath, rnd, speedAt, stepSpells, type Hittable, type SpellState, type SpellWorld } from "./engine";
import { parseAttack, readability, REACTION_FLOOR, type AttackSpec } from "./index";
import type { Effect } from "./types";

const STEP = 1 / 60;

/** A pretend world: the caster (creature 1, wild) and targets of the party's side that stand where they're put. */
function world(targets: Hittable[] = [], seed = 7) {
  const hits: { id: number | string; damage: number; effect?: Effect; at: number }[] = [];
  let now = 0;
  const caster = { kind: "creature" as const, id: 1, x: 0, z: 0, r: 0.5, side: "wild", species: "wolf" };
  const W: SpellWorld = {
    seed,
    near: (x, z, r) => targets.filter(t => Math.hypot(t.x - x, t.z - z) <= r + 3),
    hostile: (side, t) => t.side !== side,
    harm: (t, damage, effect) => { hits.push({ id: t.id, damage, effect, at: now }); },
    where: (kind, id) => (kind === "creature" && id === 1 ? caster : targets.find(t => t.kind === kind && t.id === id) ?? null),
  };
  return { W, hits, caster, tick: (S: SpellState, lib: Record<string, AttackSpec>, until: number, t0 = 0) => { for (let t = t0 + STEP; t <= until + 1e-9; t += STEP) { now = t; stepSpells(S, W, lib, t, STEP); } } };
}
const her = (x: number, z: number, id: number | string = "her"): Hittable => ({ kind: "witch", id, x, z, r: 0.3, side: "party" });
const LIB: Record<string, AttackSpec> = { puddle: { body: { kind: "zone" }, zone: { r: 2, time: 2, tick: 0.5 }, hit: { damage: 0.5, effect: { slow: { mult: 0.5, time: 1 } } } } };
const fire = (spec: AttackSpec, targets: Hittable[], until: number, seed = 7) => {
  const w = world(targets, seed), S = newSpells();
  cast(S, w.W, spec, "test", { id: 1, x: 0, z: 0, side: "wild", species: "wolf" }, targets[0] ?? null, 0, 10);
  w.tick(S, LIB, until);
  return { S, ...w };
};

describe("the attacks' engine: bodies", () => {
  it("flies a plain bolt from its release at its speed, hitting her once", () => {
    const { hits, S } = fire({ cast: { windup: 0.5 }, speed: { v: 20 } }, [her(10, 0)], 2);
    expect(hits.length).toBe(1); expect(hits[0].damage).toBe(10);
    expect(hits[0].at).toBeGreaterThan(0.5 + (10 - 0.9) / 20 - 0.05); expect(hits[0].at).toBeLessThan(0.5 + 10 / 20 + 0.05);
    expect(S.events.map(e => e.kind)).toEqual(expect.arrayContaining(["cast", "telegraph", "release", "hit", "fire"]));
  });

  it("curves, sways, homes, comes back and orbits as its path terms say", () => {
    // (curve: a quarter turn a second bends it off its line; its lane is the path it will fly)
    const curved = predictPath({ path: [{ curve: 90 }], speed: { v: 10 } }, 0, 0, 0, 1, world().W);
    expect(curved[curved.length - 1]).toBeGreaterThan(3); // (it has bent toward +z)
    // (wave: never more than its amplitude off its line)
    const wave = predictPath({ path: [{ wave: { amp: 1.5, freq: 2 } }], speed: { v: 10 } }, 0, 0, 0, 1, world().W);
    for (let i = 1; i < wave.length; i += 2) expect(Math.abs(wave[i])).toBeLessThanOrEqual(1.5 + 1e-6);
    // (home: aimed 40° off her, it turns onto her; with no homing it misses)
    const off: AttackSpec = { cast: { windup: 0 }, emit: { aim: "ahead" }, speed: { v: 15 }, path: [{ home: { turn: 120, after: 0.1, giveUp: 1 } }] };
    const W1 = world([her(12, 0)]), S1 = newSpells();
    cast(S1, W1.W, off, "home", { id: 1, x: 0, z: 0, side: "wild", species: "wolf", heading: 40 * Math.PI / 180 }, her(12, 0), 0, 1);
    W1.tick(S1, LIB, 2.5);
    expect(W1.hits.length).toBe(1);
    expect(S1.telegraphs.some(t => t.kind === "lockOn")).toBe(true);
    const W2 = world([her(12, 0)]), S2 = newSpells();
    cast(S2, W2.W, { ...off, path: [] }, "straight", { id: 1, x: 0, z: 0, side: "wild", species: "wolf", heading: 40 * Math.PI / 180 }, her(12, 0), 0, 1);
    W2.tick(S2, LIB, 2.5);
    expect(W2.hits.length).toBe(0);
    // (boomerang: out its distance, then back to its caster)
    const boom = predictPath({ path: [{ boomerang: { out: 8 } }], speed: { v: 10 }, life: { range: 16 } }, 0, 0, 0, 1, world().W);
    expect(Math.max(...boom.filter((_, i) => i % 2 === 0))).toBeLessThan(9.5);
    expect(Math.abs(boom[boom.length - 2])).toBeLessThan(2);
    // (orbit: round its caster at its radius while it orbits)
    const orb = predictPath({ path: [{ orbit: { r: 3, time: 2 } }], speed: { v: 6 } }, 3, 0, 0, 1, world().W);
    for (let i = 2; i < 30; i += 2) expect(Math.hypot(orb[i], orb[i + 1])).toBeCloseTo(3, 1);
  });

  it("changes speed by its profile: accelerating, stalling, stopping and going", () => {
    expect(speedAt({ speed: { profile: "accel", v: 5, to: 25, time: 2 } }, 1)).toBe(15);
    expect(speedAt({ speed: { profile: "decel", v: 20, to: 0, time: 1 } }, 2)).toBe(0);
    const sg = { speed: { profile: "stopGo" as const, v: 10, go: 0.5, pause: 0.5, n: 2 } };
    expect([0.2, 0.7, 1.2, 1.7, 2.2].map(t => speedAt(sg, t))).toEqual([10, 0, 10, 0, 0]);
    expect(speedAt({ speed: { profile: "slow" } }, 1)).toBe(6);
  });

  it("pierces, sticks with a countdown that blows up where it's stuck, and bounces a lob", () => {
    const line = [her(5, 0, "a"), her(9, 0, "b"), her(13, 0, "c")];
    expect(fire({ cast: { windup: 0 }, speed: { v: 20 }, life: { pierce: 2 } }, line, 2).hits.map(h => h.id)).toEqual(["a", "b", "c"]);
    expect(fire({ cast: { windup: 0 }, speed: { v: 20 }, life: { pierce: 0 } }, line, 2).hits.map(h => h.id)).toEqual(["a"]);
    const sticky: AttackSpec = { cast: { windup: 0 }, speed: { v: 20 }, life: { stick: true }, hit: { damage: 0 }, on: { timer: [{ at: 1.2, attack: { body: { kind: "area" }, area: { r: 3 } } }] } };
    const st = fire(sticky, [her(6, 0)], 3);
    const blast = st.hits.filter(h => h.damage > 0);
    expect(blast.length).toBe(1); expect(blast[0].at).toBeGreaterThanOrEqual(1.2 - 1e-9);
    expect(st.S.telegraphs.some(t => t.kind === "countdown" && t.follows?.body !== undefined)).toBe(true);
    const lob = fire({ cast: { windup: 0 }, body: { kind: "lob", flight: 0.5, radius: 1 }, life: { bounce: { n: 2, keep: 0.5 } } }, [her(8, 0)], 3);
    expect(lob.S.events.filter(e => e.kind === "bounce").length).toBe(2);
    expect(lob.S.events.filter(e => e.kind === "land").length).toBe(1);
  });
});

describe("the attacks' engine: patterns, children, zones", () => {
  it("releases a fan, a ring, a burst and a wall with holes as they say", () => {
    const bodies = (spec: AttackSpec, until = 0.05) => fire({ cast: { windup: 0 }, ...spec }, [her(30, 0)], until).S.bodies;
    const fan = bodies({ emit: { pattern: "fan", n: 5, angle: 60 } });
    expect(fan.length).toBe(5);
    expect(Math.atan2(fan[0].hz, fan[0].hx) * 180 / Math.PI).toBeCloseTo(-30, 3);
    const ring = bodies({ emit: { pattern: "ring", n: 8 } });
    expect(ring.length).toBe(8);
    const burst = fire({ cast: { windup: 0 }, emit: { pattern: "burst", n: 3, gap: 0.25 } }, [her(30, 0)], 0.6).S.events.filter(e => e.kind === "release" || e.kind === "emit");
    expect(burst.map(e => Math.round(e.at * 100) / 100)).toEqual([0.02, 0.25, 0.5]);
    const wall = bodies({ emit: { pattern: "wall", n: 5, spacing: 2, holes: [2] } });
    expect(wall.length).toBe(4);
    expect(wall.map(b => Math.round(b.z))).toEqual([-4, -2, 2, 4]);
  });

  it("caps children by depth and by the cast's count", () => {
    const deep = (d: number): AttackSpec => ({ cast: { windup: 0 }, speed: { v: 30 }, life: { range: 2 }, ...(d ? { on: { expire: [{ attack: deep(d - 1) }] } } : {}) });
    const r = fire(deep(5), [], 3);
    expect(Math.max(...r.S.bodies.map(b => b.depth))).toBe(3); expect(r.S.capped).toBeGreaterThan(0);
    const many: AttackSpec = { cast: { windup: 0 }, life: { range: 2 }, on: { expire: [{ attack: { emit: { pattern: "ring", n: 8 }, life: { range: 2 }, on: { expire: [{ attack: { emit: { pattern: "ring", n: 16 }, life: { range: 2 } } }] } } }] } };
    const m = fire(many, [], 3).S;
    expect(m.stats.bodies[1] + m.stats.bodies[2]).toBe(64); expect(m.capped).toBeGreaterThan(0); // (8, then 56 of the 128 the rings would make)
  });

  it("strikes an area once, grows a ring over what it passes, and lets a puddle tick its share", () => {
    const area = fire({ cast: { windup: 0.3 }, body: { kind: "area" }, area: { r: 5 } }, [her(3, 0, "in"), her(8, 0, "out")], 1);
    expect(area.hits.map(h => h.id)).toEqual(["in"]);
    expect(area.S.telegraphs[0]).toMatchObject({ kind: "ring", start: 0, fire: 0.3 });
    const nova = fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "ring", r: 10, width: 1.5, grow: 10 } }, [her(4, 0, "a"), her(9, 0, "b")], 2);
    expect(nova.hits.map(h => h.id)).toEqual(["a", "b"]);
    const donut = fire({ cast: { windup: 0 }, body: { kind: "area" }, area: { shape: "donut", r: 6, inner: 3 } }, [her(1, 0, "safe"), her(5, 0, "hit")], 1);
    expect(donut.hits.map(h => h.id)).toEqual(["hit"]);
    // (a creature takes a puddle's damage tick by tick; she's hurt once by it, its slow each tick)
    const wolf = (x: number, z: number): Hittable => ({ kind: "creature", id: 9, x, z, r: 0.5, side: "party" });
    const puddle: AttackSpec = { cast: { windup: 0 }, body: { kind: "zone" }, zone: { r: 2, time: 2, tick: 0.5 }, hit: { damage: 1, effect: { slow: { mult: 0.5, time: 1 } } } };
    const pud = fire(puddle, [wolf(1, 0)], 3);
    expect(pud.hits.length).toBe(4); expect(pud.hits.reduce((s, h) => s + h.damage, 0)).toBeCloseTo(10); expect(pud.hits[0].effect?.slow?.mult).toBe(0.5);
    const onHer = fire(puddle, [her(1, 0)], 3);
    expect(onHer.hits.map(h => h.damage > 0)).toEqual([true, false, false, false]); expect(onHer.hits.every(h => h.effect?.slow)).toBe(true);
  });

  it("shows its telegraphs from the windup's start, with the caster's tell, and drops them if the cast is cancelled", () => {
    const w = world([her(10, 0)]), S = newSpells();
    const id = cast(S, w.W, { cast: { windup: 0.8, tell: { pose: "rear", glow: 0.5 } }, speed: { v: 20 } }, "spit", { id: 1, x: 0, z: 0, side: "wild", species: "wolf" }, her(10, 0), 0, 1);
    expect(S.telegraphs[0]).toMatchObject({ kind: "lane", start: 0, fire: 0.8, shape: { type: "segment", x: 0, z: 0 } });
    expect(S.tells.get(1)).toMatchObject({ pose: "rear", glow: 0.5, from: 0, until: 0.8 });
    w.tick(S, LIB, 0.3);
    cancel(S, id);
    w.tick(S, LIB, 2, 0.3);
    expect(w.hits.length).toBe(0);
    expect(S.bodies.length).toBe(0);
    // (a lob's warning is where it will land, through its flight)
    const lob = fire({ cast: { windup: 0.5 }, body: { kind: "lob", flight: 1, radius: 3 } }, [her(10, 0)], 0.1);
    expect(lob.S.telegraphs[0]).toMatchObject({ kind: "landing", fire: 1.5, shape: { type: "disc", x: 10, z: 0, r: 3 } });
  });

  it("is seeded: the same seed aims at random the same way, another seed another way", () => {
    const spray = (seed: number) => fire({ cast: { windup: 0 }, emit: { pattern: "ring", n: 1, aim: "random" } }, [], 0.05, seed).S.bodies.map(b => b.hx.toFixed(6));
    expect(spray(3)).toEqual(spray(3)); expect(spray(3)).not.toEqual(spray(4));
    expect(rnd(1, 2, 3)).toBe(rnd(1, 2, 3)); expect(rnd(1, 2, 3)).not.toBe(rnd(1, 2, 4));
  });
});

describe("composition", () => {
  // Ed's example: a curving bolt that splits into a ring of homing bolts that each leave a puddle.
  const bloom: AttackSpec = {
    cast: { windup: 0.8, tell: { pose: "rear", glow: 0.6 } },
    body: { kind: "bolt", element: "venom" }, path: [{ curve: 45 }], speed: { v: 14 }, life: { range: 10 }, hit: { damage: 0.4 },
    on: { expire: [{ attack: {
      emit: { pattern: "ring", n: 6 }, body: { kind: "bolt", radius: 0.5 }, speed: { v: 10 }, life: { range: 14 },
      path: [{ home: { turn: 90, after: 0.3, giveUp: 2 } }], hit: { damage: 0.3 },
      on: { expire: [{ attack: "puddle" }], hit: [{ attack: "puddle", from: "hit" }] },
    } }] },
  };

  it("composes, lengthening the children's warning to the floor, and plays the same every run", () => {
    const p = parseAttack(bloom, LIB);
    expect(p.errors).toEqual([]);
    expect(p.warnings.join()).toMatch(/lengthened/); // (the ring's bolts were released at once at the split)
    expect(readability(p.attack!, LIB).warning).toBeGreaterThanOrEqual(REACTION_FLOOR - 1e-9);
    const run = () => {
      const r = fire(p.attack!, [her(6, 9)], 6);
      return { bodies: r.S.stats.bodies, zones: r.S.stats.zones, hits: r.hits.length, telegraphs: r.S.telegraphs.length, events: r.S.events.map(e => `${e.kind}@${e.at.toFixed(3)}`).join(" ") };
    };
    const a = run(), b = run();
    expect(a).toEqual(b);
    expect(a.bodies).toEqual([1, 6, 0, 0]); // (the bolt, then its ring of six)
    expect(a.zones[2]).toBe(6); // (a puddle where each of the six ended or hit)
    expect(a.telegraphs).toBeGreaterThanOrEqual(1 + 6); // (the bolt's path, and each child's lane before it flies)
  });
});

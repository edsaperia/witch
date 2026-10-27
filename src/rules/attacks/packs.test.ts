// The attack grammar's step 4, the pack's interplay (rules/attacks/engine.ts attack.pack), headless: a bolt chaining from foe to foe
// (each hop shown, chainNext, the floor before it goes), relayed through packmates (held at each, its next lane shown), amplified passing
// them; a beam tethered between two (following both, snapping when one goes); the ground between three erupting (its triangle shown
// for its delay); and none of it with no packmates near: nothing unwarned, ever.
import { describe, expect, it } from "vitest";
import { cast, newSpells, stepSpells, type Hittable, type SpellState, type SpellWorld, type Telegraph } from "./engine";
import { readability, REACTION_FLOOR, type AttackSpec } from "./index";

const STEP = 1 / 60;
type Hit = { id: number | string; damage: number; at: number };
type Mate = { id: number; x: number; z: number };

/** A pretend world: the caster is wild creature 1 at the origin; `mates` its packmates (wild wolves); `targets` the rest. */
function fire(spec: AttackSpec, targets: Hittable[], mates: Mate[], until: number, each?: (t: number, S: SpellState) => void) {
  const hits: Hit[] = [];
  let now = 0;
  const caster = { x: 0, z: 0 };
  const all = (): Hittable[] => [...targets, ...mates.map(m => ({ kind: "creature" as const, id: m.id, x: m.x, z: m.z, r: 0.5, side: "wild", species: "wolf" }))];
  const W: SpellWorld = {
    seed: 7,
    near: (x, z, r) => all().filter(t => Math.hypot(t.x - x, t.z - z) <= r + 3),
    hostile: (side, t) => t.side !== side,
    harm: (t, damage) => { hits.push({ id: t.id, damage, at: now }); },
    where: (kind, id) => (kind === "creature" && id === 1 ? caster : all().find(t => t.kind === kind && t.id === id) ?? null),
    packmates: (source, x, z, r) => mates.filter(m => m.id !== source && Math.hypot(m.x - x, m.z - z) <= r).sort((p, q) => Math.hypot(p.x - x, p.z - z) - Math.hypot(q.x - x, q.z - z)),
  };
  const S = newSpells(7);
  cast(S, W, spec, "test", { id: 1, x: 0, z: 0, side: "wild", species: "wolf" }, targets[0] ?? null, 0, 10);
  for (let t = STEP; t <= until + 1e-9; t += STEP) { now = t; each?.(t, S); stepSpells(S, W, {}, t, STEP); }
  return { S, hits };
}
const foe = (id: number, x: number, z: number): Hittable => ({ kind: "creature", id, x, z, r: 0.5, side: "party", species: "boar" });
const kinds = (S: SpellState) => S.events.map(e => e.kind);

describe("chain", () => {
  const spec: AttackSpec = { cast: { windup: 0.6 }, body: { kind: "bolt", radius: 0.6 }, speed: { v: 30 }, life: { range: 20 }, pack: { chain: { n: 2, range: 8 } } };
  it("jumps from foe to foe in range, each jump shown the floor before it goes, never the same one twice", () => {
    const seen = new Map<number, Telegraph>();
    const { S, hits } = fire(spec, [foe(2, 10, 0), foe(3, 15, 0), foe(4, 15, 6), foe(5, 40, 0)], [], 4, (_t, S) => { for (const t of S.telegraphs) if (t.alive) seen.set(t.id, { ...t }); });
    expect(hits.map(h => h.id)).toEqual([2, 3, 4]); // (two hops; 5 too far)
    const hops = [...seen.values()].filter(t => t.kind === "chainNext");
    expect(hops.length).toBe(2);
    for (const t of hops) expect(t.fire - t.start).toBeCloseTo(REACTION_FLOOR);
    expect(hits[1].at - hits[0].at).toBeGreaterThanOrEqual(REACTION_FLOOR);
    expect(kinds(S).filter(k => k === "chain").length).toBe(2);
  });
  it("ends as a bolt does with no foe in range", () => {
    expect(fire(spec, [foe(2, 10, 0), foe(3, 30, 0)], [], 3).hits.map(h => h.id)).toEqual([2]);
  });
});

describe("relay", () => {
  const spec: AttackSpec = { cast: { windup: 0.6 }, body: { kind: "bolt" }, speed: { v: 25 }, life: { range: 30 }, pack: { relay: { n: 2, hop: 0.5 } } };
  it("flies by way of its packmates, held at each with its next lane shown, then at its target", () => {
    const { S, hits } = fire(spec, [foe(2, 0, 20)], [{ id: 8, x: 6, z: 0 }, { id: 9, x: 10, z: 6 }], 4);
    expect(kinds(S).filter(k => k === "relay").length).toBe(2);
    const relays = S.events.filter(e => e.kind === "relay");
    expect(relays[0]).toMatchObject({ x: 6, z: 0 }); expect(relays[1]).toMatchObject({ x: 10, z: 6 });
    expect(hits.map(h => h.id)).toEqual([2]); // (never its packmates)
    const last = S.telegraphs.filter(t => t.kind === "lane").at(-1)!;
    expect(last.shape).toMatchObject({ x: 10, z: 6, x2: 0, z2: 20 }); expect(last.fire - last.start).toBeCloseTo(0.5);
    expect(hits[0].at).toBeGreaterThan(relays[1].at + 0.5);
  });
  it("goes straight at its target with no packmate near", () => {
    const { S, hits } = fire(spec, [foe(2, 0, 20)], [], 3);
    expect(kinds(S)).not.toContain("relay"); expect(hits.map(h => h.id)).toEqual([2]);
  });
});

describe("amplify", () => {
  it("grows passing its packmates, each once, up to its max", () => {
    const spec: AttackSpec = { cast: { windup: 0.6 }, body: { kind: "bolt", radius: 0.5 }, speed: { v: 20 }, life: { range: 40 }, pack: { amplify: { r: 2, per: 0.5, max: 2 } } };
    const mates = [{ id: 8, x: 5, z: 1 }, { id: 9, x: 10, z: -1 }, { id: 10, x: 15, z: 1 }];
    let r = 0;
    const { S, hits } = fire(spec, [foe(2, 25, 0)], mates, 3, (_t, S) => { const b = S.bodies.find(q => q.alive); if (b) r = Math.max(r, b.radius); });
    expect(kinds(S).filter(k => k === "amplify").length).toBe(2); // (1.5, 2: the third finds it at its max)
    expect(r).toBeCloseTo(1); expect(hits[0].damage).toBeCloseTo(20);
  });
});

describe("tether", () => {
  const spec: AttackSpec = { cast: { windup: 0.6, range: 20 }, body: { kind: "beam" }, beam: { tick: 0.25 }, pack: { tether: { time: 2, width: 1 } } };
  it("strings a beam to the nearest packmate, charging the floor first, hurting whoever is across it", () => {
    const { S, hits } = fire(spec, [foe(2, 6, 0.3)], [{ id: 8, x: 12, z: 0 }, { id: 9, x: 18, z: 4 }], 3.5);
    const t = S.telegraphs.find(q => q.kind === "tetherLine")!;
    expect(t.shape).toMatchObject({ type: "segment", x: 0, z: 0, x2: 12, z2: 0 });
    expect(hits[0].at).toBeGreaterThanOrEqual(0.6 + REACTION_FLOOR - 1e-9);
    expect(hits.length).toBe(8); expect(hits.every(h => h.id === 2)).toBe(true);
    expect(readability(spec, {}).warning).toBeCloseTo(0.6 + REACTION_FLOOR);
  });
  it("follows its packmate as it moves, snaps when it's gone, and does nothing with none near", () => {
    const mates = [{ id: 8, x: 12, z: 0 }];
    const { S } = fire(spec, [foe(2, 30, 30)], mates, 3, t => { if (t > 2) mates.length = 0; else mates[0].z = t * 2; });
    expect(S.beams[0].to).toBe(8); expect(S.beams[0].alive).toBe(false);
    expect(S.events.find(e => e.kind === "expire" && e.beam !== undefined)!.at).toBeLessThan(2.1);
    const none = fire(spec, [foe(2, 6, 0)], [], 2);
    expect(none.hits).toEqual([]); expect(none.S.telegraphs).toEqual([]); expect(kinds(none.S)).toContain("fizzle");
  });
});

describe("triangulate", () => {
  const spec: AttackSpec = { cast: { windup: 0.6 }, body: { kind: "area" }, pack: { triangulate: { delay: 0.8, r: 20 } } };
  it("erupts between it and its two nearest packmates after its delay, its triangle shown from the cast", () => {
    const { S, hits } = fire(spec, [foe(2, 4, 2), foe(3, -5, -5)], [{ id: 8, x: 10, z: 0 }, { id: 9, x: 5, z: 10 }, { id: 10, x: 30, z: 30 }], 2);
    const t = S.telegraphs.find(q => q.shape.type === "polygon")!;
    expect(t.shape.points).toEqual([0, 0, 10, 0, 5, 10]); expect(t.start).toBe(0); expect(t.fire).toBeCloseTo(1.4);
    expect(hits.map(h => h.id)).toEqual([2]); expect(hits[0].at).toBeGreaterThanOrEqual(1.4 - 1e-9);
    expect(S.zones.find(z => z.shape === "polygon")).toBeDefined();
    expect(readability(spec, {}).warning).toBeCloseTo(1.4);
  });
  it("does nothing with fewer than two packmates near: no triangle, no harm", () => {
    const { S, hits } = fire(spec, [foe(2, 4, 2)], [{ id: 8, x: 10, z: 0 }], 2);
    expect(hits).toEqual([]); expect(S.telegraphs).toEqual([]); expect(kinds(S)).toContain("fizzle");
    // (packmates arriving after the cast: still nothing, as nothing was shown)
    const mates: Mate[] = [];
    const late = fire(spec, [foe(2, 4, 2)], mates, 2, t => { if (t > 0.3 && !mates.length) mates.push({ id: 8, x: 10, z: 0 }, { id: 9, x: 5, z: 10 }); });
    expect(late.hits).toEqual([]);
  });
});

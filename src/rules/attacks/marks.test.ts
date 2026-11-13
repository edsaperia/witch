// Shot marks (rules/attacks/marks.ts; Ed, 2026-11-13: "Mark the ground"), headless on a pretend world: which shots leave one, what
// it does to who stands in it and for how long, the cap and the merge, and the tuning's own table.
import { describe, expect, it } from "vitest";
import { ELEMENTS } from "../attackLook";
import { TUNING } from "../tuning";
import { cast, newSpells, stepSpells, type Hittable, type SpellState, type SpellWorld } from "./engine";
import { leaveMark, markKind, type ShotMarksTuning } from "./marks";
import { SPECIES_ATTACKS } from "./species";
import type { AttackSpec, Effect } from "./types";

const STEP = 1 / 60, M: ShotMarksTuning = TUNING.shotMarks!;

/** A pretend world: the caster (creature 1, wild), targets that stand where they're put, and marks laid as the fight lays them. */
function world(targets: Hittable[], marks: ShotMarksTuning | null = M) {
  const hits: { id: number | string; damage: number; effect?: Effect; at: number }[] = [];
  let now = 0;
  const caster = { kind: "creature" as const, id: 1, x: 0, z: 0, r: 0.5, side: "wild", species: "fox" };
  const W: SpellWorld = {
    seed: 7,
    near: (x, z, r) => targets.filter(t => Math.hypot(t.x - x, t.z - z) <= r + 3),
    hostile: (side, t) => t.side !== side,
    harm: (t, damage, effect) => { hits.push({ id: t.id, damage, effect, at: now }); },
    where: (kind, id) => (kind === "creature" && id === 1 ? caster : targets.find(t => t.kind === kind && t.id === id) ?? null),
    shotEnded: (S, b, time) => { leaveMark(S, marks ?? undefined, { x: b.x, z: b.z, species: b.species, side: b.side, source: b.source, element: b.element || undefined, damage: b.damage * (b.attack.hit?.damage ?? 1), effect: b.attack.hit?.effect, cast: b.cast }, time); },
  };
  const S = newSpells();
  return { W, S, hits, tick: (until: number, t0 = 0) => { for (let t = t0 + STEP; t <= until + 1e-9; t += STEP) { now = t; stepSpells(S, W, {}, t, STEP); } } };
}
const her = (x: number, z: number): Hittable => ({ kind: "witch", id: 0, x, z, r: 0.3, side: "party" });
const fire = (spec: AttackSpec, targets: Hittable[], until: number, marks: ShotMarksTuning | null = M) => {
  const w = world(targets, marks);
  cast(w.S, w.W, spec, "test", { id: 1, x: 0, z: 0, side: "wild", species: "fox" }, null, 0, 10);
  w.tick(until);
  return w;
};
const marksOf = (S: SpellState) => S.zones.filter(z => z.alive && z.mark);
// (a bolt along +x that runs out 10 to 11 m off, a fifth of a second after its release; her(10.5, 1.1) stands beside its path, in its mark)
const bolt = (element: string, more: AttackSpec = {}): AttackSpec => ({ cast: { windup: 0 }, emit: { aim: "ahead" }, body: { kind: "bolt", element }, speed: { v: 60 }, life: { range: 10 }, ...more });

describe("shot marks", () => {
  it("a bolt that runs out leaves one small brief mark in its element where it ended", () => {
    const w = fire(bolt("fire"), [], 0.5);
    const [z, ...rest] = marksOf(w.S);
    expect(rest).toHaveLength(0);
    expect(z.x).toBeGreaterThanOrEqual(10); expect(z.x).toBeLessThanOrEqual(11.01); expect(z.z).toBeCloseTo(0);
    expect(z.r).toBe(M.radius); expect(z.until - z.from).toBeCloseTo(M.time); expect(z.element).toBe("fire"); expect(z.mark!.kind).toBe("hurt");
    w.tick(M.time + 1, 0.5);
    expect(marksOf(w.S)).toHaveLength(0); // (gone again)
  });

  it("a lob's landing leaves one; a bolt that hits leaves none", () => {
    expect(marksOf(fire({ cast: { windup: 0 }, emit: { aim: "ahead" }, body: { kind: "lob", flight: 0.3, element: "water" } }, [], 0.5).S)).toHaveLength(1);
    const hit = fire(bolt("fire"), [her(5, 0)], 0.5);
    expect(hit.hits).toHaveLength(1);
    expect(marksOf(hit.S)).toHaveLength(0);
  });

  it("a kind that leaves something of its own keeps that, and its burst's pieces leave no marks", () => {
    const own = fire(bolt("frost", { on: { expire: [{ attack: { emit: { pattern: "ring", n: 4 }, body: { kind: "bolt", element: "frost" }, speed: { v: 100 }, life: { range: 5 } } }] } }), [], 1);
    expect(own.S.stats.bodies[1]).toBe(4);
    expect(marksOf(own.S)).toHaveLength(0);
  });

  it("off (?shotmarks=0), nothing is left, as before", () => {
    expect(fire(bolt("fire"), [], 0.5, { ...M, on: false }).S.zones).toHaveLength(0);
    expect(fire(bolt("fire"), [], 0.5, null).S.zones).toHaveLength(0);
  });

  it("a hurting mark bites a foe once, and only one that has stood in it", () => {
    const stood = fire(bolt("fire"), [her(10.5, 1.1)], M.time + 1), dmg = stood.hits.filter(h => h.damage > 0);
    expect(dmg).toHaveLength(1);
    expect(dmg[0].damage).toBeCloseTo(10 * M.damage);
    expect(dmg[0].at).toBeGreaterThanOrEqual(0.15 + M.stand - 0.01);
    // (walking through it: in for less than `stand`, then out)
    const walker = her(10.5, 1.1), w = world([walker]);
    cast(w.S, w.W, bolt("fire"), "test", { id: 1, x: 0, z: 0, side: "wild", species: "fox" }, null, 0, 10);
    w.tick(0.2 + M.stand * 0.6);
    walker.x = 30;
    w.tick(M.time + 1, 0.2 + M.stand * 0.6);
    expect(w.hits).toHaveLength(0);
    // (its own side, standing in it: untouched)
    expect(fire(bolt("fire"), [{ kind: "creature", id: 5, x: 10.5, z: 1.1, r: 0.5, side: "wild", species: "owl" }], M.time + 1).hits).toHaveLength(0);
  });

  it("a slowing mark slows whoever of its foes is in it while they are, and never hurts", () => {
    const w = fire(bolt("frost"), [her(10.5, 1.1)], M.time + 1);
    expect(w.hits.length).toBeGreaterThan(3);
    expect(w.hits.every(h => h.damage === 0 && h.effect?.slow?.mult === M.slow)).toBe(true);
    expect(Math.max(...w.hits.map(h => h.at))).toBeLessThanOrEqual(0.3 + M.time);
    const rough = fire(bolt("earth"), [her(10.5, 1.1)], 1);
    expect(rough.hits[0].effect?.slow?.mult).toBe(M.rough);
  });

  it("a shot whose own hit slows leaves a slowing mark whatever its element; a burning one a hurting mark", () => {
    expect(markKind(M, "turtle", "fire", { slow: { mult: 0.7, time: 1 } })).toBe("slow");
    expect(markKind(M, "fox", "frost", { burn: { dps: 1, time: 1 } })).toBe("hurt");
    expect(markKind(M, "fox", "foxfire", undefined)).toBe("hurt");
    expect(markKind({ ...M, kinds: { ...M.kinds, wood: "none" } }, "marten", "wood", undefined)).toBe("none");
  });

  it("a volley's marks are capped, and shots ending on a mark renew it rather than adding one", () => {
    // (a ring of 64 bolts ending 60 m out, about 6 m apart: `max` marks, the rest skipped)
    const ring = fire(bolt("fire", { emit: { pattern: "ring", n: 64 }, life: { range: 60 } }), [], 1);
    expect(marksOf(ring.S)).toHaveLength(M.max);
    expect(ring.S.capped).toBe(0);
    // (a burst of four down one lane: one mark, lasting from the last of them)
    const burst = fire(bolt("fire", { emit: { pattern: "burst", n: 4, gap: 0.3, aim: "ahead" } }), [her(10.5, 1.1)], 1.2);
    const [z, ...rest] = marksOf(burst.S);
    expect(rest).toHaveLength(0);
    expect(z.until).toBeGreaterThan(1 + M.time);
    burst.tick(z.until + 0.5, 1.2);
    expect(burst.hits.filter(h => h.damage > 0)).toHaveLength(1); // (renewed, it still bites her only once)
  });

  it("the tuning says what every element's mark does, and which species' shots mark the ground is as counted", () => {
    expect(Object.keys(M.kinds).sort()).toEqual([...ELEMENTS].sort());
    const shots = Object.entries(SPECIES_ATTACKS).filter(([, a]) => ["bolt", "lob", "runner"].includes(a.body?.kind ?? "bolt"));
    const marking = shots.filter(([, a]) => !(a.body?.kind === "lob" ? a.on?.land : a.on?.expire)).map(([k]) => k);
    expect(shots).toHaveLength(37);
    expect(marking).toHaveLength(29);
    for (const [k, a] of shots) expect(["hurt", "slow", "rough"], k).toContain(markKind(M, k, a.body?.element, a.hit?.effect));
  });
});

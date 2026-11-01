import { afterEach, describe, expect, it } from "vitest";
import { SPACING, bodyGap, clearWaitingSlot, drawnRadius, spacingOn, waitingAvoidance, waitingSlot, type SpacingData } from "./combatSpacing";
import { MOVEMENT, resetFight, steer } from "./movement";
import { spaceOut } from "./spacing";
import { PACKS, spreadLull } from "./combat/packs";
import { TUNING, withTuning } from "./tuning";
import { tuningFromLink } from "../app/linkParams";
import type { Creature, Level } from "./creatures";
import { newCombat, stepCombat, type CombatWorld } from "./combat";
import { rng } from "./random";

const data: SpacingData = { ...SPACING, body: { pixelSize: 3, source: "synthetic geometry fixture, not measured game radii", radii: { wolf: [10, 20, 30, 40], elephant: [20, 40, 60, 80] } } };
const t = withTuning({ combatSpacing: true });
const creature = (id: number, x: number, z: number, species = "wolf", level: Level = 2) => ({ id, species, level, x, z, vx: 0, vz: 0, walk: 0, facing: 1 } as Creature);
const original = SPACING.body;
afterEach(() => { SPACING.body = original; resetFight(); });

describe("opt-in combat waiting spacing", () => {
  it("is off by default and only spacing=1 enables the per-load experiment", () => {
    expect(spacingOn(TUNING)).toBe(false);
    expect(spacingOn(tuningFromLink(new URLSearchParams("spacing=1")).tuning)).toBe(true);
    expect(spacingOn(tuningFromLink(new URLSearchParams("spacing=0")).tuning)).toBe(false);
    expect(tuningFromLink(new URLSearchParams()).tuning.combatSpacing).toBeUndefined();
    expect(tuningFromLink(new URLSearchParams("spacing=1")).tuning.invites.orbit).toEqual(TUNING.invites.orbit);
  });
  it("uses fitted per-species/age drawing support, world pixel conversion and legend scale without changing hit radii", () => {
    const small = creature(0, 0, 0), big = creature(1, 0, 0, "elephant");
    expect(drawnRadius(small, t, data)).toBe(30 * 3 / 32);
    expect(drawnRadius(big, t, data)).toBe(drawnRadius(small, t, data) * 2);
    expect(drawnRadius({ ...big, level: 1 }, t, data)).toBeLessThan(drawnRadius(big, t, data));
    expect(drawnRadius(small, { ...t, pixelSize: 6 }, data)).toBe(drawnRadius(small, t, data));
    expect(() => drawnRadius({ ...small, species: "unknown" }, t, data)).toThrow(/Missing calibrated/);
    expect(bodyGap(small, big, t, data)).toBe(drawnRadius(small, t, data) + drawnRadius(big, t, data) + data.clearance);
  });
  it("keeps charger, circler, flanker, hopper and steady goals distinct and continuous", () => {
    const c = creature(17, 20, 0), p = { x: 0, z: 0 }, styles = ["charger", "circler", "flanker", "hopper", "steady"] as const;
    const goals = styles.map(style => waitingSlot(c, p, style, 10, 3, 1, PACKS.styles, data, { x: 1, z: 0 }));
    expect(new Set(goals.map(g => `${g.x},${g.z}`)).size).toBe(styles.length);
    styles.forEach((style, i) => {
      const next = waitingSlot(c, p, style, 10, 3.0001, 1, PACKS.styles, data, { x: 1, z: 0 });
      expect(Math.hypot(next.x - goals[i].x, next.z - goals[i].z)).toBeLessThan(0.01);
    });
    expect(goals[2].x).toBeLessThan(0); // flanker repositions beside/behind the perceived heading
  });
  it("moves a waiting goal clear of large drawn bodies without moving the bodies", () => {
    const c = creature(1, 15, 0), attacker = creature(2, 0, 0, "elephant"), before = { ...attacker };
    const goal = clearWaitingSlot(c, { x: 0, z: 0 }, [c, attacker], t, data);
    expect(Math.hypot(goal.x, goal.z)).toBeGreaterThanOrEqual(bodyGap(c, attacker, t, data));
    expect(attacker).toEqual(before);
  });
  it("steers the waiting animal away while respecting acceleration and leaving the attacker unchanged", () => {
    const c = creature(1, 1, 0), attacker = creature(2, 0, 0), before = { ...attacker }, dt = 1 / 60;
    const force = waitingAvoidance(c, [attacker], t, data);
    expect(force.x).toBeGreaterThan(0);
    steer(c, { accel: 12, fight: [{ kind: "separation", w: 1 }] }, { px: 0, pz: 0, pr: 0, want: 0, range: 0, speed: 10, time: 2, dt, pack: null, neighbours: [attacker], threats: [], side: "wild", ready: false, beat: 1, spacing: { tuning: t, data, waiting: true } });
    expect(c.x).toBeGreaterThan(1);
    expect(Math.hypot(c.vx!, c.vz!)).toBeLessThanOrEqual(12 * dt + 1e-9);
    expect(attacker).toEqual(before);
  });
  it("post-movement spacing cannot displace either a committed attacker or a waiting fighter", () => {
    const attacker = creature(1, 0, 0), waiter = creature(2, 0.1, 0);
    const before = [attacker, waiter].map(c => [c.x, c.z]);
    spaceOut([attacker, waiter], 1 / 60, () => false, MOVEMENT, { radius: c => drawnRadius(c, t, data), steered: () => true });
    expect([attacker, waiter].map(c => [c.x, c.z])).toEqual(before);
  });
  it("settles seeded waiting goal discs without overlap and uses the same body-gap helper for a lull", () => {
    SPACING.body = data.body;
    const members = Array.from({ length: 5 }, (_, i) => creature(i, 0, 0, i % 2 ? "elephant" : "wolf"));
    const slots = members.map(m => ({ m, d: { slot: { x: 10 + m.id * 0.1, z: m.id * 0.3 } } }));
    spreadLull(slots, { x: 0, z: 0 }, PACKS, undefined, t);
    for (let i = 0; i < slots.length; i++) for (let j = i + 1; j < slots.length; j++) {
      const a = slots[i], b = slots[j];
      expect(Math.hypot(a.d.slot.x - b.d.slot.x, a.d.slot.z - b.d.slot.z)).toBeGreaterThanOrEqual(bodyGap(a.m, b.m, t, data) - 0.01);
    }
  });
  it("keeps the old soft separation arithmetic exactly when opt-in context is absent", () => {
    const a = creature(1, 0, 0), b = creature(2, 0.1, 0);
    const copy = structuredClone([a, b]);
    spaceOut([a, b], 1 / 60, () => false);
    spaceOut(copy, 1 / 60, () => false, MOVEMENT, undefined);
    expect([a, b]).toEqual(copy);
  });
  const fight = (flag?: boolean) => {
    const tuning = withTuning({ ...(flag === undefined ? {} : { combatSpacing: flag }), attacks: { ...TUNING.attacks!, species: false } });
    const r = rng(1620), creatures = Array.from({ length: 4 }, (_, id) => {
      const a = r() * Math.PI * 2;
      return { ...creature(id, Math.cos(a) * 40, Math.sin(a) * 40), homeX: 0, homeZ: 0, cell: [0, 0], rand: rng(id + 1620), moveReadyAt: Infinity, hunting: 0,
        fight: { target: { kind: "witch", id: 0 }, readyAt: 100, windupUntil: 0, aimX: 0, aimZ: 0, seenAt: -10 } } as Creature;
    });
    const state = newCombat();
    const world = { creatures, active: creatures, t: tuning, time: 0, dt: 1 / 60, witches: [{ id: 0, x: 0, z: 0, onGround: true, down: false }], busy: () => false, leashPoint: () => null, parked: () => false, talkingTo: () => -1, exit: () => ({ x: 1000, z: 1000 }), unseen: () => false, asleep: () => false, inArea: () => true, hitWitch: () => {}, loseParty: () => {} } as CombatWorld;
    return { state, world };
  };
  it("runs a small seeded waiting-fight fixture without drawn-disc overlap", () => {
    SPACING.body = data.body;
    const { state, world } = fight(true);
    for (let i = 0; i < 60; i++) {
      world.time = i / 60;
      stepCombat(state, world);
      for (let a = 0; a < world.creatures.length; a++) for (let b = a + 1; b < world.creatures.length; b++) {
        const A = world.creatures[a], B = world.creatures[b];
        expect(Math.hypot(A.x - B.x, A.z - B.z)).toBeGreaterThanOrEqual(drawnRadius(A, t, data) + drawnRadius(B, t, data));
      }
    }
  });
  it("preserves seeded combat state exactly for absent versus explicitly off spacing", () => {
    const a = fight(), b = fight(false);
    for (let i = 0; i < 30; i++) {
      a.world.time = b.world.time = i / 60;
      stepCombat(a.state, a.world); stepCombat(b.state, b.world);
    }
    const snapshot = (f: ReturnType<typeof fight>) => JSON.stringify({ creatures: f.world.creatures, state: f.state }, (_, value) => value instanceof Map ? [...value.entries()] : value);
    expect(snapshot(a)).toBe(snapshot(b));
  });
});

import { afterEach, describe, expect, it } from "vitest";
import { SPACING, bodyGap, clearWaitingSlot, drawnRadius, pathClearsHazard, spacingOn, waitingAvoidance, waitingDrive, waitingProfile, waitingSlot, type SpacingData } from "./combatSpacing";
import { MOVEMENT, resetFight, steer } from "./movement";
import { spaceOut } from "./spacing";
import { PACKS, packAttack, spreadLull } from "./combat/packs";
import { TUNING, withTuning } from "./tuning";
import { tuningFromLink } from "../app/linkParams";
import type { Creature, Level } from "./creatures";
import { newCombat, stepCombat, type CombatWorld } from "./combat";
import { rng } from "./random";
import { withCombatRoles } from "../test/combatRoles";
import { queueCombatHit } from "../test/combatHit";
import type { Game } from "./game";
import { observeAttacks, type AttackOutcome } from "./attackObservation";

const data: SpacingData = { ...SPACING, body: { pixelSize: 3, source: "synthetic geometry fixture, not measured game radii", radii: { wolf: [10, 20, 30, 40], elephant: [20, 40, 60, 80] } } };
const t = withTuning({ combatSpacing: true });
const creature = (id: number, x: number, z: number, species = "wolf", level: Level = 2) => ({ id, species, level, x, z, vx: 0, vz: 0, walk: 0, facing: 1 } as Creature);
const original = SPACING.body;
afterEach(() => { SPACING.body = original; resetFight(); });

describe("combat waiting spacing", () => {
  it("allows close passes while rejecting hops through the target body", () => {
    const c = creature(1, -10, 0), hazard = { x: 0, z: 0, radius: 1 };
    expect(pathClearsHazard(c, { x: 10, z: 0 }, hazard, t, data)).toBe(false);
    expect(pathClearsHazard({ ...c, z: 6 }, { x: 10, z: 6 }, hazard, t, data)).toBe(true);
    expect(pathClearsHazard(c, { x: 10, z: 0 }, { x: 0, z: -10, endX: 0, endZ: 10, radius: 1 }, t, data)).toBe(false);
  });
  it("ships the early system by default without a public legacy-spacing switch", () => {
    expect(spacingOn(TUNING)).toBe(true);
    expect(spacingOn(tuningFromLink(new URLSearchParams("spacing=1")).tuning)).toBe(true);
    expect(spacingOn(tuningFromLink(new URLSearchParams("spacing=0")).tuning)).toBe(true);
    expect(tuningFromLink(new URLSearchParams()).tuning.combatSpacing).toBeUndefined();
    expect(tuningFromLink(new URLSearchParams("spacing=1")).tuning.invites.orbit).toEqual(TUNING.invites.orbit);
  });
  it("uses fitted per-species/age drawing support, world pixel conversion and legend scale without changing hit radii", () => {
    const small = creature(0, 0, 0), big = creature(1, 0, 0, "elephant");
    expect(drawnRadius(small, t, data)).toBe(30 * 3 / 32);
    expect(drawnRadius(big, t, data)).toBe(drawnRadius(small, t, data) * 2);
    expect(drawnRadius({ ...big, level: 1 }, t, data)).toBeLessThan(drawnRadius(big, t, data));
    expect(drawnRadius(small, { ...t, pixelSize: 6 }, data)).toBe(drawnRadius(small, t, data));
    expect(drawnRadius({ ...small, species: "unknown" }, t, data)).toBeGreaterThan(0);
    expect(() => drawnRadius({ ...small, species: "fox" }, t, data)).toThrow(/Missing calibrated/);
    expect(bodyGap(small, big, t, data)).toBe(drawnRadius(small, t, data) + drawnRadius(big, t, data) + data.clearance);
  });
  it("gives species distinct continuous goals through one numerical path calculation", () => {
    const c = creature(17, 20, 0), p = { x: 0, z: 0 }, species = ["boar", "wolf", "fox", "hare", "badger"];
    const goals = species.map(species => waitingSlot({ ...c, species }, p, 10, 3, 1, data, { x: 1, z: 0 }));
    expect(new Set(goals.map(g => `${g.x},${g.z}`)).size).toBe(species.length);
    species.forEach((species, i) => {
      const next = waitingSlot({ ...c, species }, p, 10, 3.0001, 1, data, { x: 1, z: 0 });
      expect(Math.hypot(next.x - goals[i].x, next.z - goals[i].z)).toBeLessThan(0.01);
    });
    const turned = waitingSlot({ ...c, species: "fox" }, p, 10, 3, 1, data, { x: -1, z: 0 });
    expect(Math.hypot(turned.x - goals[2].x, turned.z - goals[2].z)).toBeGreaterThan(5);
  });
  it("coordinates members by shared phase, returns by the deadline and expresses rests through cadence", () => {
    const c = creature(17, 20, 0, "hare"), p = { x: 0, z: 0 }, group = { seed: 0.3, index: 0, count: 4, gap: 8, until: 10 };
    const a = waitingSlot(c, p, 5, 3, 1, data, null, group), b = waitingSlot({ ...c, id: 18 }, p, 5, 3, 1, data, null, { ...group, index: 1 });
    expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThan(1);
    const returned = waitingSlot(c, p, 5, 10, 1, data, null, group);
    expect(returned).toEqual({ x: 5, z: 0 });
    const speeds = Array.from({ length: 40 }, (_, i) => waitingDrive({ ...c, hopNext: 0.8 }, i / 20, data).speed);
    expect(speeds.some(v => v === 0)).toBe(true);
    expect(speeds.some(v => v > 0)).toBe(true);
    expect(waitingDrive({ ...c, hopNext: 0.8 }, 0.8, data).airborne).toBe(true);
    expect(waitingProfile(creature(1, 0, 0, "boar"), data).turn).toBeLessThan(waitingProfile(c, data).turn);
    const signatures = Object.keys(SPACING.body.radii).map(species => JSON.stringify(waitingProfile({ species }, data)));
    expect(signatures).toHaveLength(64);
    expect(new Set(signatures).size).toBe(64);
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
    stepCombat(state, world);
    // This fixture measures waiting, not the newly restored engagement pursuit.
    // Hold the director in its tell while all attack cooldowns remain unready.
    for (const pack of state.packs?.values() ?? []) { pack.phase = "tell"; pack.until = 100; }
    for (const team of state.waitingTeams?.values() ?? []) { team.phase = "tell"; team.nextAt = 100; }
    for (let i = 0; i < 60; i++) {
      world.time = i / 60;
      stepCombat(state, world);
      for (let a = 0; a < world.creatures.length; a++) for (let b = a + 1; b < world.creatures.length; b++) {
        const A = world.creatures[a], B = world.creatures[b];
        expect(Math.hypot(A.x - B.x, A.z - B.z)).toBeGreaterThanOrEqual(drawnRadius(A, t, data) + drawnRadius(B, t, data));
      }
    }
  });
  it("default combat matches the explicitly selected new system on the same seed", () => {
    const a = fight(), b = fight(true);
    for (let i = 0; i < 30; i++) {
      a.world.time = b.world.time = i / 60;
      stepCombat(a.state, a.world); stepCombat(b.state, b.world);
    }
    const snapshot = (f: ReturnType<typeof fight>) => JSON.stringify({ creatures: f.world.creatures, state: f.state }, (_, value) => value instanceof Map ? [...value.entries()] : value);
    expect(snapshot(a)).toBe(snapshot(b));
  });
  it("does not replace independent pursuit with a waiting circuit", () => {
    const a = fight(false), b = fight(true);
    for (const f of [a, b]) {
      f.world.t = { ...f.world.t, combat: { ...f.world.t.combat, packs: { on: false } } };
      f.world.creatures.splice(1); f.world.active = f.world.creatures;
      f.world.creatures[0].fight!.readyAt = 0;
      f.world.time = 1;
      stepCombat(f.state, f.world);
    }
    expect(b.world.creatures[0].hop).toBeUndefined();
    expect(b.world.creatures[0].x).toBeCloseTo(a.world.creatures[0].x, 10);
    expect(b.world.creatures[0].z).toBeCloseTo(a.world.creatures[0].z, 10);
  });
  it("a hunting ambusher approaches a distant chosen target instead of lying in wait", withCombatRoles({snake: "melee"}, () => {
    const {state, world} = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures; c.species = "snake"; c.x = 100; c.z = 0;
    for (let i = 0; i < 60; i++) {world.time = i * world.dt; stepCombat(state, world);}
    expect(c.fight?.target).toEqual({kind: "witch", id: 0}); expect(c.x).toBeLessThan(100);
  }));
  it("advances an active waiting hop exactly once, including its landing step", () => {
    const { state, world } = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures;
    const x = c.x, z = c.z;
    c.hop = { fx: x, fz: z, tx: x + 10, tz: z, at: 0, lands: 1, height: 2 };
    world.time = 0.5; stepCombat(state, world);
    expect(c.x).toBeCloseTo(x + 5, 10); expect(c.z).toBeCloseTo(z, 10);
    world.time = 1; stepCombat(state, world);
    expect(c.x).toBeCloseTo(x + 10, 10); expect(c.z).toBeCloseTo(z, 10);
    expect(c.hop).toBeUndefined();
  });
  it("admits a chosen spore leap only after its waiting route lands", withCombatRoles({ toad: "special" }, () => {
    const { state, world } = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures; c.species = "toad"; c.x = 15; c.z = 0;
    stepCombat(state, world);
    const team = [...state.waitingTeams!.values()][0]; team.phase = "combo"; team.nextAt = 10;
    c.hop = { fx: 15, fz: 0, tx: 17, tz: 0, at: 0, lands: 1, height: 2 };
    world.time = 0.5; stepCombat(state, world);
    expect(c.hop).toBeDefined(); expect(c.leap).toBeUndefined(); expect(c.x).toBe(16);
    world.time = 1; stepCombat(state, world);
    expect(c.hop).toBeUndefined(); expect(c.leap).toBeUndefined(); expect(c.x).toBe(17);
    world.time = 1 + world.dt; stepCombat(state, world);
    expect(c.leap).toBeDefined(); expect(c.hop).toBeUndefined(); expect(c.x).toBe(17);
  }));
  it("a controlled landed hit reaches the real stun state without an AI role choice", () => {
    const { state, world } = fight(true), victim = world.creatures[0], attacker = world.creatures[1];
    world.creatures.splice(2); world.active = world.creatures;
    victim.species = "boar"; victim.level = 1; attacker.leashed = true;
    queueCombatHit({ combat: state, clock: { time: 0 } } as Game, attacker, victim);
    world.time = world.dt; stepCombat(state, world);
    expect(victim.dazed).toBe(true); expect(state.shots).toHaveLength(0);
  });
  it("attributes an explicitly missed charge's self-stun to that animal", () => {
    const {state, world} = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures; c.species = "boar";
    c.charge = {dx: 1, dz: 0, speed: 0, until: 0, braking: true}; c.vx = 0; c.vz = 0;
    const rows: Readonly<AttackOutcome>[] = [];
    observeAttacks(state, row => rows.push(row));
    world.time = 1; stepCombat(state, world);
    expect(rows.find(row => row.phase === "self-miss")).toMatchObject({source: c.id, targetId: c.id, attack: "move:charge", damageAccepted: false, stunApplied: true});
  });
  for (const species of ["boar", "stoat", "bat"]) it(`${species} prepares and executes its chosen action`, withCombatRoles({ [species]: species === "boar" ? "melee" : "special" }, () => {
    const { state, world } = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures; c.species = species; c.x = 20; c.z = 0;
    c.moveReadyAt = 0; c.fight!.readyAt = 0;
    let seen = false;
    world.packWorld = { confuse: () => { seen = true; } };
    for (let i = 0; i < 240; i++) { world.time = i * world.dt; stepCombat(state, world); if (species === "boar") seen ||= !!c.charge; }
    expect(seen).toBe(true);
  }));
  for (const species of ["ram", "bat"]) it(`${species} executes a selected projectile rather than its native close attack`, withCombatRoles({[species]: "ranged"}, () => {
    const {state, world} = fight(true), c = world.creatures[0];
    world.creatures.splice(1); world.active = world.creatures; c.species = species; c.x = 10; c.z = 0; c.moveReadyAt = 0; c.fight!.readyAt = 0;
    world.t = withTuning({combatSpacing: true});
    let fired = false;
    for (let i = 0; i < 240; i++) {
      world.time = i * world.dt; stepCombat(state, world); fired ||= state.shots.length > 0;
      expect(c.charge).toBeUndefined(); expect(c.swoop?.phase).not.toBe("dive");
    }
    expect(fired).toBe(true);
  }));
  it("a party bat executes its selected close screech against a nearby foe", withCombatRoles({bat: "melee"}, () => {
    const {state, world} = fight(true), c = world.creatures[0], foe = world.creatures[1];
    world.creatures.splice(2); world.active = world.creatures;
    Object.assign(c, {species: "bat", leashed: true, x: 2, z: 0, moveReadyAt: 0}); c.fight!.target = {kind: "creature", id: 1}; c.fight!.readyAt = 0;
    Object.assign(foe, {x: 0, z: 0, stunUntil: Infinity, fight: undefined});
    stepCombat(state, world);
    const team = [...state.waitingTeams!.values()].find(t => t.members.includes(c.id))!;
    team.phase = "combo"; team.nextAt = 5; c.x = 2; c.z = 0; c.vx = 0; c.vz = 0;
    let pulsed = false;
    for (let i = 0; i < 120; i++) {world.time = i * world.dt; stepCombat(state, world); pulsed ||= state.events.some(e => e.kind === "pulse" && e.id === c.id);}
    expect(pulsed, JSON.stringify({gap: bodyGap(c, foe, world.t), attack: packAttack("bat", 2, "melee")?.attack, fight: c.fight, x: c.x, z: c.z, foe: {x: foe.x, z: foe.z}, team: [...state.waitingTeams!.values()][0], events: state.events.map(e => e.kind)})).toBe(true);
  }));
});

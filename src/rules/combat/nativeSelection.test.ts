import {describe, expect, it} from "vitest";
import {newCombat, stepCombat, type CombatWorld} from "../combat";
import type {Creature} from "../creatures";
import {withTuning} from "../tuning";
import {rng} from "../random";
import {MOVEMENT, swoopStriking} from "../movement";
import {withCombatRoles} from "../../test/combatRoles";

/** Direct actors only: these tests exercise selection/execution without generating a world or measuring fight balance. */
function fixture(species: string, count = 1) {
  const creatures = Array.from({length: count}, (_, id) => ({id, species, level: 2, x: 20 + id * 8, z: id * 8, vx: 0, vz: 0, walk: 0, facing: -1,
    homeX: 0, homeZ: 0, cell: [0, 0], rand: rng(1634 + id), moveReadyAt: 0, hunting: 0,
    fight: {target: {kind: "witch", id: 0}, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0, seenAt: -10}} as Creature));
  const state = newCombat(), t = withTuning({combatSpacing: true});
  const world = {creatures, active: creatures, t, time: 0, dt: 1 / 60, witches: [{id: 0, x: 0, z: 0, onGround: true, down: false}],
    busy: () => false, leashPoint: () => null, parked: () => false, talkingTo: () => -1, exit: () => ({x: 1000, z: 1000}),
    unseen: () => false, asleep: () => false, inArea: () => true, hitWitch: () => {}, loseParty: () => {}} as CombatWorld;
  const run = (seconds: number, each: () => void) => {for (let i = 0; i < seconds / world.dt; i++) {world.time += world.dt; stepCombat(state, world); each();}};
  return {creatures, state, world, run};
}

describe("selected native attacks remain executable alongside composed weapons", () => {
  it("a chosen boar charge accelerates, carries through and brakes", withCombatRoles({boar: "melee"}, () => {
    const {creatures: [c], run} = fixture("boar");
    let speed = 0, braked = false, crossed = false;
    run(12, () => {if (c.charge) {speed = Math.max(speed, Math.hypot(c.vx ?? 0, c.vz ?? 0)); braked ||= !!c.charge.braking; crossed ||= c.x < 0;}});
    expect(speed).toBeGreaterThan(MOVEMENT.profiles.boar.move!.speed! * 0.9);
    expect(braked).toBe(true); expect(crossed).toBe(true);
  }));
  it("a chosen snake strike springs and starts its windup together", withCombatRoles({snake: "melee"}, () => {
    const {creatures: [c], world, state, run} = fixture("snake"); c.x = 8;
    let sprung = -1, windup = -1;
    run(6, () => {
      for (const event of state.events) if (event.at === world.time && event.id === c.id) {
        if (event.kind === "sprung" && sprung < 0) sprung = world.time;
        if (event.kind === "windup" && windup < 0) windup = world.time;
      }
    });
    expect(sprung).toBeGreaterThan(0); expect(windup).toBeGreaterThanOrEqual(sprung); expect(windup - sprung).toBeLessThan(0.1);
  }));
  it("a selected bat bout completes its dives with a warning for each, respecting the token cap", withCombatRoles({bat: "melee"}, () => {
    const {creatures, world, run} = fixture("bat", 4);
    const last = new Map<number, string>(), dives = new Map<number, number>(), tells = new Map<number, number>();
    let peak = 0;
    run(30, () => {
      peak = Math.max(peak, creatures.filter(c => swoopStriking(c)).length);
      for (const c of creatures) {
        const phase = c.swoop?.phase ?? "";
        if (phase !== last.get(c.id)) {
          if (phase === "dive") dives.set(c.id, (dives.get(c.id) ?? 0) + 1);
          if (phase === "tele") tells.set(c.id, (tells.get(c.id) ?? 0) + 1);
        }
        last.set(c.id, phase);
      }
    });
    expect(Math.max(...dives.values())).toBeGreaterThanOrEqual(MOVEMENT.profiles.bat.move!.dives!);
    expect([...dives.values()].reduce((a, b) => a + b, 0)).toBeGreaterThan(3);
    for (const [id, n] of dives) expect(tells.get(id)).toBeGreaterThanOrEqual(n);
    expect(peak).toBeLessThanOrEqual(world.t.dodge!.a.tokens);
  }));
});

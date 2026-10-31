import { describe, expect, it } from "vitest";
import type { Creature } from "../creatures";
import { TUNING } from "../tuning";
import { FIGHT } from "../movement";
import { newCombat } from "../combat";
import { COMBAT, type CombatWorld } from "./data";
import { Grid, targetable } from "./targeting";
import { stepLegendAttack, walkFriendlyRoute } from "./legend";

const creature = (id: number, x: number, more: Partial<Creature> = {}) => ({ id, species: "wolf", level: 1, x, z: 0, gone: false, leashed: false, walk: 0, ...more }) as Creature;
function scene(enemies: Creature[], witchX = 1000) {
  FIGHT.scale = 1; FIGHT.speed = 1;
  const legend = creature(0, 0, { species: "toad", level: 3, boss: true, legendState: "happy", fight: { target: null, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 } });
  const creatures = [legend, ...enemies], s = newCombat();
  const w = { creatures, active: creatures, witches: [{ id: 0, x: witchX, z: 0, onGround: true, down: false }], time: 10, dt: 1 / 60,
    t: { ...TUNING, attacks: { ...TUNING.attacks, species: false } }, asleep: () => false, inArea: () => true } as unknown as CombatWorld;
  const step = () => stepLegendAttack(w, s, legend, COMBAT, new Grid(creatures));
  return { legend, w, s, step };
}

describe("friendly legends: defend, engage, walk (Ed, 31 Oct)", () => {
  it("keeps absent-callback combat parity: an empty decision stands still and schedules the same recheck", () => {
    const { legend, w, step } = scene([]);
    legend.x = 15; legend.z = 10;
    step();
    expect([legend.x, legend.z, legend.moving, legend.vx, legend.vz]).toEqual([15, 10, false, 0, 0]);
    expect(legend.fight).toMatchObject({ target: null, readyAt: w.time + 0.5, windupUntil: 0 });
  });

  it("walks only when no defence or engagement is needed, even during its attack cooldown", () => {
    const { legend, w, step } = scene([]), line = [[0, 0], [100, 0]] as const;
    w.friendlyRoute = () => ({ line, tip: 50 });
    w.dt = 1; legend.fight!.readyAt = 1000;
    step();
    expect(legend.x).toBeCloseTo(w.t.combat.legendRun);
    const at = legend.x;
    w.creatures.push(creature(1, at + 10, { enraged: true }));
    step();
    expect(legend.x).toBe(at); expect(legend.moving).toBe(false);
    w.creatures[1].gone = true;
    step();
    expect(legend.x).toBeGreaterThan(at);
  });

  it("a friendly charger finishes braking then resumes the route instead of walking to its lair", () => {
    const { legend, w, step } = scene([]), line = [[0, 0], [100, 0]] as const;
    Object.assign(legend, { species: "boar", x: 50, lairX: -100, lairZ: 0, run: { phase: "home", at: 0, angle: 0, speed: 0, turn: 1, target: null, tx: 0, tz: 0, ran: 0, hit: [], fromX: 0, fromZ: 0 } });
    w.friendlyRoute = () => ({ line, tip: 80 }); w.dt = 1;
    step(); expect(legend.run).toBeUndefined(); expect(legend.x).toBe(50);
    step(); expect(legend.x).toBeGreaterThan(50);
  });

  it("joins the nearest route point, follows a bend towards the drawing tip, waits there and follows its growth", () => {
    const c = creature(0, 5, { z: 5, speed: 10 });
    const route = [[0, 0], [20, 0], [20, 20]] as const;
    walkFriendlyRoute(c, route, 30, 0.5);
    expect([c.x, c.z]).toEqual([5, 0]);
    walkFriendlyRoute(c, route, 30, 2);
    expect([c.x, c.z]).toEqual([20, 5]);
    walkFriendlyRoute(c, route, 30, 1);
    expect([c.x, c.z]).toEqual([20, 10]);
    walkFriendlyRoute(c, route, 30, 1);
    expect(c.moving).toBe(false);
    walkFriendlyRoute(c, route, 35, 1);
    expect([c.x, c.z]).toEqual([20, 15]);
  });

  it("walks back along the route if its nearest join lies ahead of the tip", () => {
    const c = creature(0, 30, { z: 10, speed: 10 }), line = [[0, 0], [100, 0]] as const;
    walkFriendlyRoute(c, line, 10, 1);
    expect([c.x, c.z]).toEqual([30, 0]);
    walkFriendlyRoute(c, line, 10, 3);
    expect([c.x, c.z]).toEqual([10, 0]);
  });
  it("defends the witch before a nearer enraged enemy, including an attacker beyond its engagement radius", () => {
    const attacker = creature(1, 100, { fight: { target: { kind: "witch", id: 0 }, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 } });
    const { legend, step } = scene([attacker, creature(2, 5, { enraged: true })], 85);
    step();
    expect(legend.fight?.target).toEqual({ kind: "creature", id: 1 });
  });

  it("counts hunting as an attack and defends any witch, not just witch zero", () => {
    const { legend, w, step } = scene([creature(1, 100, { hunting: 1 }), creature(2, 5, { enraged: true })]);
    w.witches.push({ id: 1, x: 84, z: 0, onGround: true, down: false });
    step();
    expect(legend.fight?.target).toEqual({ kind: "creature", id: 1 });
  });

  it("engages wild attackers and enraged enemies at the inclusive 85 m boundary; calm wild creatures are left alone", () => {
    for (const enemy of [creature(1, 85, { enraged: true }), creature(1, 85, { hunting: 0 })]) {
      const { legend, step } = scene([enemy, creature(2, 1)]);
      step(); expect(legend.fight?.target).toEqual({ kind: "creature", id: 1 });
    }
    const { legend, step } = scene([creature(1, 85.01, { enraged: true }), creature(2, 1)]);
    step(); expect(legend.fight?.target).toBeNull();
  });

  it("does not defend an out-of-range witch against an out-of-range attacker, and cannot itself be targeted", () => {
    const { legend, step } = scene([creature(1, 100, { hunting: 0 }), creature(2, 10, { enraged: true })], 85.01);
    step();
    expect(legend.fight?.target).toEqual({ kind: "creature", id: 2 });
    expect(targetable(legend)).toBe(false);
  });
});

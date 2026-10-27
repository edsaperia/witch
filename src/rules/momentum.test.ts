// Creature momentum chasing the witch (Ed, 2026-10-27; rules/momentum.ts): a turn limit falling with speed, a reaction delay,
// and lead only for telegraphed attacks, per species over its class, the sliders global.
import { describe, expect, it } from "vitest";
import { chaseAt, classOf, limitTurn, momentumOf, noteWitches, witchWas, type Resolved } from "./momentum";
import { newCombat } from "./combat/data";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import type { Creature } from "./creatures";

const M = TUNING.creatureMomentum!;
const OFF = withTuning({ creatureMomentum: { ...M, on: false } });
const deg = (r: number) => (r * 180) / Math.PI;

describe("each species' momentum", () => {
  it("is its class's (heavy, light, normal) under its own, the sliders over all", () => {
    expect(classOf("bear", TUNING)).toBe("heavy");
    expect(classOf("hare", TUNING)).toBe("light");
    expect(classOf("fox", TUNING)).toBe("normal");
    const fox = momentumOf("fox", TUNING)!, bear = momentumOf("bear", TUNING)!, hare = momentumOf("hare", TUNING)!;
    expect(deg(fox.turn)).toBeCloseTo(M.classes.normal.turn);
    expect(bear.delay).toBe(M.classes.heavy.delay);
    expect(hare.delay).toBeLessThan(fox.delay);
    expect(fox.delay).toBeLessThan(bear.delay);
    expect(fox.chaseLead).toBe(0); // (no prediction just chasing)
    expect(fox.strikeLead).toBe(1);
    // its own: the boar turns slower than its class, the fox reads her a little sooner and leads a little
    expect(deg(momentumOf("boar", TUNING)!.turn)).toBeCloseTo(160);
    expect(momentumOf("wolf", TUNING)!.chaseLead).toBeGreaterThan(0);
    // the sliders: turn, delay and strike lead multiply; chase lead adds
    const t = withTuning({ creatureMomentum: { ...M, turn: 2, delay: 0.5, chaseLead: 0.3, strikeLead: 0 } });
    const f2 = momentumOf("fox", t)!;
    expect(f2.turn).toBeCloseTo(fox.turn * 2);
    expect(f2.delay).toBeCloseTo(fox.delay * 0.5);
    expect(f2.chaseLead).toBeCloseTo(0.3);
    expect(f2.strikeLead).toBe(0);
    expect(momentumOf("fox", OFF)).toBeNull();
  });
});

describe("the turn limit", () => {
  const m: Resolved = { turn: (420 * Math.PI) / 180, k: 6, delay: 0, chaseLead: 0, strikeLead: 1 };
  /** Degrees it turns in one second running at v asked to turn round. */
  const swing = (v: number) => { const [x, z] = limitTurn(v, 0, -v, 0.001, m, 1 / 60); return deg(Math.atan2(z, x)) * 60; };
  it("falls with speed: turn / (1 + speed / k)", () => {
    expect(swing(3)).toBeCloseTo(420 / 1.5, 0);
    expect(swing(15)).toBeCloseTo(420 / 3.5, 0);
    expect(swing(15)).toBeLessThan(swing(3));
  });
  it("lets a small turn through as asked, and slows for a big one", () => {
    expect(limitTurn(15, 0, 15, 0.2, m, 1 / 60)).toEqual([15, 0.2]);
    const [x, z] = limitTurn(15, 0, -15, 0.001, m, 1 / 60);
    expect(Math.hypot(x, z)).toBeLessThan(15 * 0.5);
  });
  it("stands still or asked to stop: as asked", () => {
    expect(limitTurn(0.2, 0, -5, 0, m, 1 / 60)).toEqual([-5, 0]);
    expect(limitTurn(15, 0, 0, 0, m, 1 / 60)).toEqual([0, 0]);
  });
  /** A point running at 16 m/s with a wolf's accel (70) at a spot that jumps 10 m sideways as it gets within 6 m: how far past
   *  the spot's line it carries on (m), with the limit and without. */
  function overshoot(limit: boolean) {
    let x = 0, z = 0, vx = 16, vz = 0, px = 30, pz = 0, jumped = false, most = 0;
    for (let i = 0; i < 300; i++) {
      if (!jumped && px - x < 6) { pz = 10; jumped = true; }
      const dx = px - x, dz = pz - z, d = Math.hypot(dx, dz) || 1;
      let tx = (dx / d) * 16, tz = (dz / d) * 16;
      if (limit) [tx, tz] = limitTurn(vx, vz, tx, tz, m, 1 / 60);
      const ax = tx - vx, az = tz - vz, am = Math.hypot(ax, az), step = 70 / 60, k = am > step ? step / am : 1;
      vx += ax * k; vz += az * k; x += vx / 60; z += vz / 60;
      if (jumped) most = Math.max(most, x - px);
    }
    return most;
  }
  it("a sidestepped chaser carries on past her (an arc), where before it cut straight across", () => {
    expect(overshoot(true)).toBeGreaterThan(overshoot(false) + 1.5);
  });
});

describe("the reaction delay", () => {
  it("remembers where she was, between steps", () => {
    const s = newCombat();
    for (let i = 0; i <= 60; i++) noteWitches(s, [{ x: i, z: 0 }], i / 60);
    expect(witchWas(s, 0, 1)!.x).toBeCloseTo(60);
    expect(witchWas(s, 0, 0.75)!.x).toBeCloseTo(45);
    expect(witchWas(s, 0, 0.5 + 1 / 120)!.x).toBeCloseTo(30.5);
    expect(witchWas(s, 1, 0.5)).toBeNull();
    // (it keeps 1.5 s)
    for (let i = 61; i <= 240; i++) noteWitches(s, [{ x: i, z: 0 }], i / 60);
    expect(s.herTrail!.get(0)!.length).toBeLessThan(100);
  });
  it("chasing steers for where she was, with no lead unless asked", () => {
    const s = newCombat();
    for (let i = 0; i <= 60; i++) noteWitches(s, [{ x: i * 0.25, z: 0 }], i / 60); // (15 m/s)
    const m: Resolved = { turn: 7, k: 6, delay: 0.25, chaseLead: 0, strikeLead: 1 };
    expect(chaseAt(s, 0, 1, m)!.x).toBeCloseTo(15 * 0.75);
    expect(chaseAt(s, 0, 1, { ...m, chaseLead: 0.2 })!.x).toBeCloseTo(15 * 0.75 + 15 * 0.2);
  });
});

// In the game: a wolf chasing her.
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
function quiet(t: Tuning): Game {
  const g = newGame(77, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 150) c.gone = true;
  g.witches[0].health.hp = 1e6;
  return g;
}
function pick(g: Game, species: string, dx: number, dz: number): Creature {
  const w = g.witch, x = w.x + dx, z = w.z + dz;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && Math.hypot(k.x - w.x, k.z - w.z) > 200)!;
  Object.assign(c, { species, level: 2, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, state: "wild", enraged: true });
  c.cell = g.map.cellSafe(w.x, w.z).cell as [number, number];
  g.byArea = null;
  return c;
}

describe("in a fight", () => {
  /** A wolf (packs off: its own steering) runs at her from 40 m off; 20 m short (before or as it winds up, not lunging) she sidesteps
   *  9 m: how far its heading has swung a fifth of a second on (degrees), and how close it gets to her after. */
  function sidestep(t: Tuning, winding = false) {
    const g = quiet(withTuning({ ...t, combat: { ...t.combat, packs: { on: false } } })), wolf = pick(g, "wolf", 40, 0);
    let stepped = false, swung = 0, met = Infinity;
    for (let i = 0; i < 6 * 60; i++) {
      stepGame(g, idle, STEP);
      const w = g.witch; // (her body is a new object each step)
      const d = Math.hypot(wolf.x - w.x, wolf.z - w.z);
      if (stepped) met = Math.min(met, d);
      if (!stepped && wolf.fight?.target?.kind === "witch" && !wolf.fight.lunge && (winding ? wolf.fight.windupUntil > 0 : d < 20) && Math.hypot(wolf.vx ?? 0, wolf.vz ?? 0) > 5) {
        stepped = true; g.witch = { ...g.witch, z: g.witch.z + 9 };
        const a0 = Math.atan2(wolf.vz!, wolf.vx!);
        for (let k = 0; k < 12; k++) stepGame(g, idle, STEP);
        const a1 = Math.atan2(wolf.vz!, wolf.vx!);
        swung = deg(Math.abs(Math.atan2(Math.sin(a1 - a0), Math.cos(a1 - a0))));
      }
    }
    return { stepped, swung, met };
  }
  it("a sidestep leaves it running on the old way a moment; it still gets to her", () => {
    const on = sidestep(TUNING), off = sidestep(OFF);
    expect(on.stepped && off.stepped).toBe(true);
    expect(on.swung).toBeLessThan(off.swung / 2); // (it hasn't seen her go yet, and it can't swing round at a run)
    expect(on.met).toBeLessThan(4);
  });
  it("its wind-up's surge in has momentum too (Ed, 2026-10-27): sidestepped as it winds up, it swings round slowly", () => {
    const on = sidestep(TUNING, true), off = sidestep(OFF, true);
    expect(on.stepped && off.stepped).toBe(true);
    expect(on.swung).toBeLessThan(off.swung / 2);
  });
});

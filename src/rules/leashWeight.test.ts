// Sigil weight (Ed, 2026-10-06; rules/leashWeight.ts): her stack's sigils pull her toward their creatures by how taut
// each leash is times its weight; past a free allowance that load slows her moving away, drifts her a little toward
// it, slows her rise, and sinks her over the treetops (to a floor while she flies on; down if she stops or it's extreme).
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { creatureWeight, leashStrain, loadOf, NO_LOAD, type LeashLoad } from "./leashWeight";
import { newWitch, stepWitch, type WitchState } from "./witch";
import { leashLoad, newGame } from "./game";
import type { Creature } from "./creatures";

const t = TUNING, W = t.leash.weight;
const bounds = { minX: -1e5, maxX: 1e5, minZ: -1e5, maxZ: 1e5 };
const crit = (id: number, x: number, z: number, level = 1, species = "wolf") => ({ id, x, z, level, species, gone: false }) as unknown as Creature;
/** A load of `over` beyond the allowance, pulling toward +x. */
const pull = (over: number): LeashLoad => ({ total: over + W.free, over, x: 1, z: 0, extreme: over >= W.extreme });
/** Her speed after `s` seconds of steering (mx, mz) on the ground under `load`. */
function ground(mx: number, mz: number, load: LeashLoad, s = 2): { x: number; z: number; v: number } {
  let w: WitchState = newWitch(0, 0);
  for (let i = 0; i < s * 60; i++) w = stepWitch(w, { moveX: mx, moveZ: mz, toggleMode: false }, 1 / 60, t, bounds, load);
  return { x: w.x, z: w.z, v: Math.hypot(w.vx, w.vz) };
}

describe("sigil weight", () => {
  it("pulls by how taut each leash is: nothing while near and slack, capped however far", () => {
    expect(leashStrain(0, t)).toBe(0);
    expect(leashStrain(t.leash.length * 0.8, t)).toBe(0);
    expect(leashStrain(t.leash.length * 1.3, t)).toBeGreaterThan(0);
    expect(leashStrain(5000, t)).toBe(W.maxTension);
    // A far traveller: no more than a taut leash's worth.
    const far = loadOf([0], [crit(0, 3000, 0)], { x: 0, z: 0 }, t), taut = loadOf([0], [crit(0, t.leash.length * 2, 0)], { x: 0, z: 0 }, t);
    expect(far.total).toBeCloseTo(taut.total, 9);
    expect(far.total).toBeCloseTo(W.maxTension * creatureWeight({ species: "wolf", level: 1 }, t), 9);
    expect(far.x).toBeCloseTo(1, 9);
  });

  it("weighs adults over babies, and the species' strength", () => {
    expect(creatureWeight({ species: "wolf", level: 2 }, t)).toBeGreaterThan(creatureWeight({ species: "wolf", level: 0 }, t));
    expect(creatureWeight({ species: "wolf", level: 1 }, t)).toBeCloseTo(W.levels[1], 9);
  });

  it("only her stack weighs (placed sigils don't), and the first few weigh nothing", () => {
    const g = newGame(123, t), Wd = g.witches[0], at = g.witch;
    const cs = g.creatures.filter(c => !c.boss && c.level === 1).slice(0, 2);
    cs.forEach((c, i) => { Object.assign(c, { x: at.x + 20, z: at.z + i }); Wd.leash.stack.push(c.id); });
    const L = leashLoad(g);
    expect(L.total).toBeGreaterThan(0);
    expect(L.over).toBe(0); // (two taut young: inside the free allowance)
    Wd.leash.placed = cs.map(c => ({ id: c.id, x: c.x, z: c.z, at: 0 }));
    Wd.leash.stack = [];
    expect(leashLoad(g)).toEqual(NO_LOAD);
    // Inside the allowance she moves exactly as unloaded.
    const free = loadOf([0, 1], [crit(0, 20, 0), crit(1, 20, 1)], { x: 0, z: 0 }, t);
    expect(ground(-1, 0, free)).toEqual(ground(-1, 0, NO_LOAD));
  });

  it("loaded, she's slower moving away from the pull, not toward it or across it much, and drifts a little toward it", () => {
    const L = pull(4), away = ground(-1, 0, L), toward = ground(1, 0, L), across = ground(0, 1, L), free = ground(-1, 0, NO_LOAD);
    expect(away.v).toBeLessThan(free.v * 0.6);
    expect(toward.x).toBeGreaterThan(-away.x);
    expect(across.v).toBeGreaterThan(free.v * 0.9); // (her input still steers: no sideways yank)
    expect(across.x).toBeGreaterThan(0); // (a small drift toward the pull)
    expect(across.x).toBeLessThan(across.z * 0.2);
  });

  it("rises slower with load", () => {
    const rise = (load: LeashLoad) => { let w: WitchState = newWitch(0, 0), n = 0; w = stepWitch(w, { moveX: 0, moveZ: 0, toggleMode: true }, 1 / 60, t, bounds, load); while (w.mode !== "treetop" && n++ < 6000) w = stepWitch(w, { moveX: 0, moveZ: 0, toggleMode: false }, 1 / 60, t, bounds, load); return n; };
    expect(rise(pull(4))).toBeGreaterThan(rise(NO_LOAD) * 1.5);
  });

  it("over the treetops: sinks slowly to the floor while flying on, lands if she stops or the load is extreme, floats back up unloaded", () => {
    const top = (): WitchState => ({ ...newWitch(0, 0), lift: 1, mode: "treetop" });
    const fly = (w: WitchState, load: LeashLoad, s: number, move = 1) => { for (let i = 0; i < s * 60; i++) w = stepWitch(w, { moveX: move, moveZ: 0, toggleMode: false }, 1 / 60, t, bounds, load); return w; };
    // Slow: a second of a heavy load takes off no more than sinkMax of the climb.
    expect(1 - fly(top(), pull(6), 1).lift).toBeLessThanOrEqual(W.sinkMax + 1e-9);
    const flying = fly(top(), pull(6), 60);
    expect(flying.mode).toBe("treetop");
    expect(flying.lift).toBeCloseTo(W.floor, 9);
    const stopped = fly(top(), pull(6), 60, 0);
    expect(stopped.mode).toBe("ground");
    expect(stopped.lift).toBe(0);
    const extreme = fly(top(), pull(W.extreme + 1), 60);
    expect(extreme.mode).toBe("ground");
    const back = fly(flying, NO_LOAD, 10);
    expect(back.lift).toBe(1);
    // Unloaded, nothing sinks at all.
    expect(fly(top(), NO_LOAD, 10).lift).toBe(1);
  });
});

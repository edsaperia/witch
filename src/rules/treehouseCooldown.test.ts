// The treehouse's landing cooldown (Ed, 2026-11-03: "Taking off from the treehouse and landing on the treehouse; there should be a
// minimum time between which either these things can happen, perhaps 3 seconds, because it's easy to e.g. take off from a branch and
// land immediately on the next branch, which is probably not what the player intends to do."; rules/witch.ts perchCool).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { deckOf, flyOnto, onFloor, type Deck } from "./treehouse";
import { fromPlan, HOUSE_ROOMS } from "./houseRooms";
import { newWitch, NO_INTENT, stepWitch, type Intent, type WitchState } from "./witch";
import { NO_LOAD } from "./leashWeight";
import { rng } from "./random";

const STEP = 1 / 60, COOL = TUNING.treehouse.landCooldown!, bounds = { minX: -10000, maxX: 10000, minZ: -10000, maxZ: 10000 };
const deck = (t: Tuning = TUNING) => deckOf({ treehouse: { x: 200, z: 300 } }, t)!;
const stands = (w: WitchState) => !!w.perch && w.mode === "ground";
/** Steps of STEP for `secs`, `c` each step (or a function of the step's witch), `every` called after each. */
function run(w: WitchState, secs: number, d: Deck, c: Partial<Intent> | ((w: WitchState) => Partial<Intent>) = {}, every?: (w: WitchState) => void, t: Tuning = TUNING): WitchState {
  for (let i = 0; i < Math.round(secs / STEP); i++) { w = stepWitch(w, { ...NO_INTENT, ...(typeof c === "function" ? c(w) : c) }, STEP, t, bounds, NO_LOAD, d); every?.(w); }
  return w;
}
const press = (w: WitchState, d: Deck, t: Tuning = TUNING) => stepWitch(w, { ...NO_INTENT, toggleMode: true }, STEP, t, bounds, NO_LOAD, d, );
const room = (d: Deck, id: string) => { const r = HOUSE_ROOMS.rooms.find(q => q.id === id)!; return { ...fromPlan(d, r.x, r.z), plan: r }; };
/** A plan direction from a room's middle with only open air from just past its edge to `far` metres out: [start out there, unit
 *  direction in towards the room, in the world]. */
function airLine(d: Deck, id: string, far = 25): { x: number; z: number; ux: number; uz: number } {
  const { plan: r } = room(d, id), c = fromPlan(d, r.x, r.z);
  for (let k = 0; k < 64; k++) {
    const a = (k / 64) * 2 * Math.PI, at = (s: number) => fromPlan(d, r.x + Math.cos(a) * s, r.z + Math.sin(a) * s);
    let edge = 0, clear = true;
    while (edge < 60 && onFloor(d, at(edge).x, at(edge).z)) edge += 0.25; // (the floor's edge that way: the rooms aren't round)
    for (let s = edge + d.rail + 0.5; s <= edge + far && clear; s += 0.25) { const p = at(s); clear = !onFloor(d, p.x, p.z, d.rail); }
    if (!clear) continue;
    const p = at(edge + far), L = Math.hypot(c.x - p.x, c.z - p.z);
    return { x: p.x, z: p.z, ux: (c.x - p.x) / L, uz: (c.z - p.z) / L };
  }
  throw new Error("no open air beside " + id);
}
const perched = (d: Deck, id: string, extra: Partial<WitchState> = {}): WitchState => { const p = room(d, id); return { ...newWitch(p.x, p.z), perch: true, ...extra }; };

describe("the treehouse's landing cooldown (Ed, 2026-11-03)", () => {
  it("is 3 seconds by default, on her own clock, each witch her own", () => {
    expect(COOL).toBe(3);
    const d = deck(), up = press(perched(d, "parlour"), d);
    expect(up.mode).toBe("rising"); expect(up.perchCool).toBe(COOL);
    const later = run(up, 1, d);
    expect(later.perchCool).toBeCloseTo(COOL - 1, 9);
    expect(run(later, COOL, d).perchCool).toBeUndefined(); // (gone once it's run out: nothing left in her state)
  });

  it("taking off from a floor, she flies on over the next one without landing till the cooldown's out; then flying onto one lands her", () => {
    const d = deck();
    let w = press(perched(d, "parlour"), d);
    w = run(w, 1, d);
    expect([w.mode, !!w.perch]).toEqual(["treetop", false]);
    // over to the Bedroom (put just off it, out in the air, still cooling), flying in onto it and on over it
    const a = airLine(d, "bedroom", 12);
    w = { ...w, x: a.x, z: a.z, vx: a.ux * 20, vz: a.uz * 20 };
    let crossed = -1, i = 0;
    w = run(w, 3, d, { moveX: a.ux, moveZ: a.uz }, q => { i++; if (crossed < 0 && flyOnto(d, q.x, q.z)) crossed = i; expect(q.perch, "no landing while cooling").toBeFalsy(); expect(q.mode).toBe("treetop"); });
    expect(crossed).toBeGreaterThan(0); expect(crossed * STEP).toBeLessThan(COOL - 1); // (onto it inside the cooldown)
    // the cooldown out, back out to the air and in again: she lands
    expect(w.perchCool).toBeUndefined();
    w = { ...w, x: a.x, z: a.z, vx: a.ux * 20, vz: a.uz * 20 };
    let landed = false;
    run(w, 3, d, { moveX: a.ux, moveZ: a.uz }, q => { landed ||= stands(q); });
    expect(landed).toBe(true);
  });

  it("over a floor while cooling, her press to come down is dropped (no landing, no fall through), and works once it's out", () => {
    const d = deck(), p = room(d, "bedroom");
    const w = { ...newWitch(p.x, p.z), mode: "treetop" as const, lift: 1, perchCool: 2 };
    const held = press(w, d);
    expect([held.mode, held.lift, !!held.perch]).toEqual(["treetop", 1, false]);
    const waited = run(held, 2, d);
    expect([waited.mode, !!waited.perch, waited.perchCool]).toEqual(["treetop", false, undefined]); // (hovering over it: no landing by herself)
    const down = run(press(waited, d), 1, d);
    expect(stands(down)).toBe(true); expect(onFloor(d, down.x, down.z, 1e-6)).toBe(true);
  });

  it("rising off a floor, her press to come straight back down onto it is dropped till the cooldown's out", () => {
    const d = deck();
    let w = press(perched(d, "parlour"), d);
    w = run(w, 0.2, d);
    expect(w.mode).toBe("rising");
    w = press(w, d);
    expect(w.mode).toBe("rising");
    w = run(w, 1, d);
    expect([w.mode, !!w.perch]).toEqual(["treetop", false]);
  });

  it("landed, she can't take off again till the cooldown's out; then she can", () => {
    const d = deck(), p = room(d, "bedroom");
    let w: WitchState = { ...newWitch(p.x, p.z), mode: "treetop", lift: 1 };
    w = press(w, d);
    let touched = -1, i = 0;
    w = run(w, 1, d, {}, q => { i++; if (touched < 0 && stands(q)) { touched = i; expect(q.perchCool).toBe(COOL); } });
    expect(touched).toBeGreaterThan(0);
    // presses every half second while it runs: each dropped
    for (let s = 1 - touched * STEP; s < COOL - 0.25; s += 0.5) {
      w = press(w, d); expect(stands(w), `${s.toFixed(2)} s after touching down`).toBe(true);
      w = run(w, 0.5 - STEP, d);
    }
    w = run(w, 0.5, d);
    expect(w.perchCool).toBeUndefined();
    w = press(w, d);
    expect(w.mode).toBe("rising");
  });

  it("landed, the open edges keep her in like a rail till the cooldown's out (no fall either); then she steps off flying", () => {
    expect(TUNING.treehouse.house!.look?.noWalls).toBe(true);
    for (const fall of [false, true]) {
      const t: Tuning = fall ? { ...TUNING, treehouse: { ...TUNING.treehouse, house: { ...TUNING.treehouse.house!, fall: { ...TUNING.treehouse.house!.fall, on: true } } } } : TUNING;
      const d = deck(t), a = airLine(d, "parlour", 4), out = { moveX: -a.ux, moveZ: -a.uz };
      let w = perched(d, "parlour", { perchCool: COOL });
      w = run(w, COOL - 0.1, d, out, q => {
        expect(stands(q), "on the floor").toBe(true); expect(q.falling, "no fall").toBeUndefined();
        expect(onFloor(d, q.x, q.z, 1e-6), "on the floor").toBe(true);
      }, t);
      expect(w.vx * -a.ux + w.vz * -a.uz, "held at the edge").toBeLessThan(0.5);
      let off = false;
      run(w, 0.5, d, out, q => { off ||= fall ? q.falling !== undefined : q.mode === "rising"; }, t);
      expect(off, fall ? "falls once it's out (no broom)" : "steps off flying once it's out").toBe(true);
    }
  });

  it("is never stuck: under a floor she rises through it, and can come down on it once the cooldown's out", () => {
    const d = deck(), p = room(d, "parlour");
    let w: WitchState = { ...newWitch(p.x, p.z), perchCool: 2 }; // (on the ground under the Parlour: no perch)
    w = run(press(w, d), 1, d, {}, q => expect(q.perch).toBeFalsy());
    expect(w.mode).toBe("treetop");
    w = run(w, 1.5, d);
    w = run(press(w, d), 1, d);
    expect(stands(w)).toBe(true);
  });

  it("is never stuck: cooling over a floor, she flies off it and comes down to the ground elsewhere", () => {
    const d = deck(), a = airLine(d, "bedroom", 40);
    let w: WitchState = { ...newWitch(a.x + a.ux * 40, a.z + a.uz * 40), mode: "treetop", lift: 1, perchCool: COOL };
    w = run(w, 2.5, d, { moveX: -a.ux, moveZ: -a.uz });
    expect(onFloor(d, w.x, w.z, d.grace)).toBe(false);
    w = run(press(w, d), 1, d);
    expect([w.mode, !!w.perch]).toEqual(["ground", false]);
  });

  it("with landCooldown 0 she lands and takes off at once, as before", () => {
    const t: Tuning = { ...TUNING, treehouse: { ...TUNING.treehouse, landCooldown: 0 } }, d = deck(t);
    let w = run(press(perched(d, "parlour"), d, t), 0.1, d, {}, undefined, t);
    expect(w.perchCool).toBeUndefined();
    w = press(w, d, t); expect(w.mode).toBe("descending");
    w = run(w, 1, d, {}, undefined, t); expect(stands(w)).toBe(true);
    expect(press(w, d, t).mode).toBe("rising");
  });

  it("random flying round the house: never a landing and a leaving closer than the cooldown, never off the floor standing, never stuck", () => {
    const d = deck(), r = rng(1234), centre = room(d, "terrace");
    let w = perched(d, "terrace"), last = -Infinity, turns = 0, ups = 0, c: Partial<Intent> = {}, was = stands(w);
    const N = Math.round(240 / STEP);
    for (let i = 0; i < N; i++) {
      if (i % 15 === 0) {
        const far = Math.hypot(w.x - centre.x, w.z - centre.z) > 70, a = far ? Math.atan2(centre.z - w.z, centre.x - w.x) + (r() - 0.5) : r() * 2 * Math.PI;
        c = { moveX: Math.cos(a) * (r() < 0.15 ? 0 : 1), moveZ: Math.sin(a), toggleMode: r() < 0.25 };
      } else c = { ...c, toggleMode: false };
      w = stepWitch(w, { ...NO_INTENT, ...c }, STEP, TUNING, bounds, NO_LOAD, d);
      expect(Number.isFinite(w.x) && Number.isFinite(w.z) && Number.isFinite(w.lift)).toBe(true);
      expect(w.perchCool ?? 0).toBeLessThanOrEqual(COOL);
      const now = stands(w);
      if (now) expect(onFloor(d, w.x, w.z, 1e-6)).toBe(true);
      if (now !== was) { expect((i - last) * STEP).toBeGreaterThanOrEqual(COOL - 1e-9); last = i; turns++; if (!now) ups++; }
      was = now;
    }
    expect(turns).toBeGreaterThan(4); expect(ups).toBeGreaterThan(2); // (it did land and leave, a few times over)
  });
});

import { describe, expect, it } from "vitest";
import { newGame } from "../rules/game";
import { TUNING, withTuning } from "../rules/tuning";
import { newExpert, EXPERT_LIMITS } from "./expert";
import { newObserver, viewRectangle } from "./observe";

describe("expert observation and human input boundary", () => {
  it("returns detached observations and ignores remote creature coordinates", () => {
    const g = newGame(1000, TUNING), w = g.witches[0];
    const observe = newObserver(), before = observe(g), ext = viewRectangle(g);
    expect(ext.halfWidth).toBeGreaterThan(0); expect(ext.halfDepth).toBeGreaterThan(0);
    const remote = g.creatures.find(c => Math.abs(c.x - w.body.x) > ext.halfWidth * 2 && !c.leashed);
    expect(remote).toBeDefined();
    remote!.x += 1000;
    expect(observe(g)).toEqual(before);
    w.body.x += 2;
    expect(before.self.x).not.toEqual(w.body.x);
    expect(before).not.toHaveProperty("random");
    expect(before).not.toHaveProperty("afterNext");
    expect(before.creatures.every(c => !("fight" in c) && !("charge" in c))).toBe(true);
  });

  it("delays the first action, emits only controls and never edits the leash", () => {
    const g = newGame(1000, TUNING), bot = newExpert();
    const stack = JSON.stringify(g.witches[0].leash), spells = JSON.stringify(g.witches[0].spells);
    expect(bot.decide(g)).toEqual({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, sigil: false, place: false, cycle: false, castParty: false });
    g.herTime = 0.249; expect(bot.decide(g).fire).toBeUndefined();
    g.herTime = 0.25; const c = bot.decide(g);
    expect(Object.keys(c).every(k => ["moveX", "moveZ", "toggleMode", "zoom", "fire", "aimX", "aimZ", "dash", "sigil", "place", "cycle", "sigilHeld", "castParty"].includes(k))).toBe(true);
    expect(JSON.stringify(g.witches[0].leash)).toBe(stack);
    expect(JSON.stringify(g.witches[0].spells)).toBe(spells);
    g.herTime = 0.26; const held = bot.decide(g);
    expect(held.moveX).toBe(c.moveX); expect(held.moveZ).toBe(c.moveZ);
    expect(held.toggleMode).toBe(false); expect(held.sigil).toBe(false);
  });

  it("rejects faster-than-approved reactions, inputs and perfect aim", () => {
    expect(() => newExpert({}, 1, { ...EXPERT_LIMITS, reactionSeconds: 0.24 })).toThrow();
    expect(() => newExpert({}, 1, { ...EXPERT_LIMITS, inputHz: 9 })).toThrow();
    expect(() => newExpert({}, 1, { ...EXPERT_LIMITS, aimErrorMetres: 0 })).toThrow();
    expect(() => newExpert({ kite: NaN })).toThrow();
    expect(() => newExpert({}, 1, {} as never)).toThrow();
  });

  it("continues toward a visible target during descent rather than hovering over water", () => {
    const g = newGame(1000, withTuning({ cast: { ...TUNING.cast, on: false } })), w = g.witches[0];
    w.body = { ...w.body, seated: false, perch: false, mode: "descending", lift: 0.5 };
    const target = g.creatures.find(c => !c.boss)!;
    for (const c of g.creatures) c.gone = true;
    Object.assign(target, { gone: false, leashed: false, level: 1, x: w.body.x + 12, z: w.body.z });
    const bot = newExpert(); bot.decide(g); g.herTime = 0.25;
    const controls = bot.decide(g);
    expect(Math.hypot(controls.moveX, controls.moveZ)).toBeGreaterThan(0.9);
    expect(controls.toggleMode).toBe(false);
    expect(bot.doing).toMatch(/^inviting /);
  });

  it("waits for delayed mode acknowledgement before sending a second toggle", () => {
    const g = newGame(1000, withTuning({ cast: { ...TUNING.cast, on: false } })), w = g.witches[0];
    w.body = { ...w.body, seated: false, perch: false, mode: "treetop", lift: 1 };
    const target = g.creatures.find(c => !c.boss)!;
    for (const c of g.creatures) c.gone = true;
    Object.assign(target, { gone: false, leashed: false, level: 1, x: w.body.x + 12, z: w.body.z });
    const bot = newExpert(); bot.decide(g);
    g.herTime = 0.133333333333; bot.decide(g);
    g.herTime = 0.25; expect(bot.decide(g).toggleMode).toBe(true);
    // The engine has begun descending, but the reaction-delayed snapshot still
    // says treetop. A second toggle here would reverse the landing.
    w.body.mode = "descending";
    g.herTime = 0.383333333333; expect(bot.decide(g).toggleMode).toBe(false);
  });
});

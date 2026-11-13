// The effects on her, followed for the view and the sounds (Ed, 2026-11-13: "Mark + tint + sound"; "Slow and stun are quite similar,
// maybe stun can be removed for slow and it uses circling stars").
import { describe, expect, it } from "vitest";
import { HerEffects, effectElement } from "./herEffects";
import { TUNING } from "../rules/tuning";
import { elementOf } from "../rules/attackLook";
import type { Game, Witch } from "../rules/game";

const wildOne = (species: string, x: number) => ({ species, x, z: 0, level: 1, state: "enraged", gone: false, leashed: false });
function world(creatures: unknown[] = []) {
  const W = { body: { x: 0, z: 0 }, ko: null } as unknown as Witch & { slowUntil?: number; slowMult?: number };
  const g = { tuning: TUNING, clock: { time: 10 }, herTime: 10, creatures, witches: [W] } as unknown as Game;
  return { g, W };
}

describe("the effects on her", () => {
  it("shows a slow for exactly as long as it lasts", () => {
    const { g, W } = world(), H = new HerEffects();
    H.update(g, W, 10); expect(H.slow.on).toBe(false);
    W.slowUntil = 11; W.slowMult = 0.6;
    H.update(g, W, 10); expect(H.slow.on).toBe(true); expect(H.tinting()).toBe("slow");
    g.clock.time = 10.99; H.update(g, W, 10.99); expect(H.slow.on).toBe(true);
    g.clock.time = 11; H.update(g, W, 11); expect(H.slow.on).toBe(false); expect(H.tinting()).toBe(null);
  });
  it("shows confusion on her own clock, and tints with the newest effect", () => {
    const { g, W } = world(), H = new HerEffects();
    W.slowUntil = 20; W.slowMult = 0.6; H.update(g, W, 10);
    W.confused = { until: 12, drift: 0.5 }; H.update(g, W, 10.5);
    expect(H.confuse.on).toBe(true); expect(H.tinting()).toBe("confuse");
    H.update(g, W, 12); expect(H.confuse.on).toBe(false); expect(H.tinting()).toBe("slow");
  });
  it("leaves a skid only for a hard throw, while she slides", () => {
    const { g, W } = world(), H = new HerEffects(), ease = TUNING.witch.knock.ease, min = TUNING.effectMarks.thrown.minMetres;
    W.knock = { kx: TUNING.witch.knock.base * ease, kz: 0, at: 10, stunUntil: 10.25, immuneUntil: 11 }; // (an ordinary blow)
    H.update(g, W, 10); expect(H.thrown.on).toBe(false);
    W.knock = { kx: (min + 2) * ease, kz: 0, at: 10.5, stunUntil: 11, immuneUntil: 12 };
    H.update(g, W, 10.5); expect(H.thrown.on).toBe(true); expect(H.metres).toBeCloseTo(min + 2, 3);
    W.knock.kx = 0; H.update(g, W, 10.9); expect(H.thrown.on).toBe(false);
  });
  it("gives a stagger no mark of its own", () => {
    const { g, W } = world(), H = new HerEffects();
    W.knock = { kx: 0, kz: 0, at: 10, stunUntil: 12, immuneUntil: 13 };
    H.update(g, W, 10.5); expect(H.tinting()).toBe(null);
  });
  it("is off altogether with ?effectmarks=0, the tuning off, or her knocked out", () => {
    const { g, W } = world(), H = new HerEffects();
    W.slowUntil = 20; W.slowMult = 0.6;
    H.update(g, W, 10, false); expect(H.slow.on).toBe(false);
    H.update(g, W, 10); expect(H.slow.on).toBe(true);
    (W as unknown as { ko: unknown }).ko = {}; H.update(g, W, 10); expect(H.slow.on).toBe(false);
  });
  it("takes the element of the nearest hunter that can do it, over a nearer one that can't", () => {
    const { g, W } = world([wildOne("bee", 5), wildOne("snail", 12)]), H = new HerEffects();
    expect(effectElement(g, 0, 0, "slow")).toBe(elementOf("snail"));
    W.slowUntil = 20; W.slowMult = 0.6; H.update(g, W, 10);
    expect(H.slow.el).toBe(elementOf("snail"));
    expect(effectElement(world([wildOne("bee", 5)]).g, 0, 0, "slow")).toBe(elementOf("bee")); // (none can: the nearest)
    expect(effectElement(world().g, 0, 0, "slow")).toBe(null);
  });
});

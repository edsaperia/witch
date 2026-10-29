import { describe, expect, it, vi } from "vitest";
import { Rumble, type RumblePad } from "./rumble";
import type { Game } from "../rules/game";
const game = () => ({ witches: [{ health: { hurtAt: -Infinity }, ko: null }], clock: { paused: false }, party: { wave: 0 }, win: null, partyOver: null }) as unknown as Game;
const enabled = { rumble: true, reduceFlashing: false };

describe("modest event rumble", () => {
  it("pulses once on a hit, knockout, landing, wave and win/loss, rather than every frame", () => {
    const g = game(), r = new Rumble(), playEffect = vi.fn(async () => "complete"), pads = [{ connected: true, vibrationActuator: { playEffect } }];
    let now = 0; const tick = () => r.update(g, enabled, pads, now += 100);
    tick(); expect(playEffect).not.toHaveBeenCalled();
    g.witches[0].health.hurtAt = 1; tick(); tick(); expect(playEffect).toHaveBeenCalledTimes(1);
    g.witches[0].ko = {} as never; tick(); expect(playEffect).toHaveBeenCalledTimes(2);
    g.witches[0].landedAt = 2; tick(); expect(playEffect).toHaveBeenCalledTimes(3);
    g.party.wave++; tick(); expect(playEffect).toHaveBeenCalledTimes(4);
    g.win = { phase: "won" } as never; tick(); expect(playEffect).toHaveBeenCalledTimes(5);
    g.partyOver = {} as never; tick(); expect(playEffect).toHaveBeenCalledTimes(6);
    for (const [type, e] of playEffect.mock.calls as unknown as [string, { duration: number; strongMagnitude: number; weakMagnitude: number }][]) {
      expect(type).toBe("dual-rumble"); expect(e.duration).toBeLessThanOrEqual(160); expect(e.strongMagnitude).toBeLessThanOrEqual(0.35); expect(e.weakMagnitude).toBeLessThanOrEqual(0.25);
    }
  });
  it("honours off/reduced-effects/paused states, and never replays old events when enabled", () => {
    const g = game(), r = new Rumble(), playEffect = vi.fn(async () => {}), pads = [{ vibrationActuator: { playEffect } }];
    r.update(g, enabled, pads, 0);
    g.party.wave++; r.update(g, { ...enabled, rumble: false }, pads, 100);
    g.party.wave++; r.update(g, { ...enabled, reduceFlashing: true }, pads, 200);
    g.party.wave++; g.clock.paused = true; r.update(g, enabled, pads, 300);
    g.clock.paused = false; r.update(g, enabled, pads, 400); expect(playEffect).not.toHaveBeenCalled();
    g.party.wave++; r.update(g, enabled, pads, 500); expect(playEffect).toHaveBeenCalledTimes(1);
  });
  it("silently degrades for missing/disconnected actuators, sync failures and promise rejection", async () => {
    for (const pad of [null, {}, { connected: false }, { vibrationActuator: { playEffect() { throw Error("denied"); } } }, { vibrationActuator: { playEffect: async () => { throw Error("unsupported"); } } }] as (RumblePad | null)[]) {
      const g = game(), r = new Rumble(); r.update(g, enabled, [pad], 0); g.party.wave++;
      expect(() => r.update(g, enabled, [pad], 100)).not.toThrow(); await Promise.resolve();
    }
  });
});

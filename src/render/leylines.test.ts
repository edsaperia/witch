// The ley line through the first wave and the wave's pulse (render/leylines.ts; Ed, 2026-10-06).
import { describe, expect, it } from "vitest";
import type { ForestMap } from "../rules/map";
import type { PartyState } from "../rules/party";
import { leyReveal, shaderPulse } from "./leylines";

const interval = 60, map = { tuning: { party: { interval }, boot: { time: 10 } } } as unknown as ForestMap;
// Home boots until 10 s; the first wave's countdown runs 10 to 70 s (no start delay here).
const party = (wave = 0, paused = false) => ({ wave, paused, bootUntil: 10, nextAt: 70 }) as unknown as PartyState;

describe("the ley line through the first wave", () => {
  it("isn't drawn at all while home boots up", () => {
    expect(leyReveal(party(), map, 5, 3)).toBe(0);
    expect(shaderPulse(party(), map, 5)).toBeNull();
  });
  it("grows out from the treehouse as the countdown starts", () => {
    expect(leyReveal(party(), map, 10, 3)).toBe(0);
    expect(leyReveal(party(), map, 40, 3)).toBeCloseTo(1.5);
  });
  it("reaches the third stone as the first wave lands, within a frame, with reveal 3", () => {
    expect(leyReveal(party(), map, 70 - 1 / 60, 3)!).toBeGreaterThan(3 - 3 * (1 / 60) / interval - 1e-9);
    expect(leyReveal(party(), map, 70, 3)).toBe(3);
  });
  it("is drawn whole once the first wave has come, and with no wave clock once booted", () => {
    expect(leyReveal(party(1), map, 80, 3)).toBeNull();
    expect(leyReveal(party(0, true), map, 20, 3)).toBeNull();
  });
});

describe("the wave's pulse in the shader", () => {
  it("runs by the party's clock: 0 as the countdown starts, 1 as the wave lands", () => {
    expect(shaderPulse(party(), map, 10)).toBe(0);
    expect(shaderPulse(party(), map, 55)).toBeCloseTo(0.75);
    expect(shaderPulse(party(), map, 70)).toBe(1);
  });
  it("is off with no wave clock", () => {
    expect(shaderPulse(party(0, true), map, 30)).toBeNull();
    expect(shaderPulse(party(), { tuning: { party: { interval: 1e9 }, boot: { time: 10 } } } as unknown as ForestMap, 30)).toBeNull();
  });
});

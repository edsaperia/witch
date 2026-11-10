// The creatures' spell glow's rules (Ed, 2026-11-09: "The animal magic effects need to glow"): the knobs after the link switch and
// Reduce flashing, which effect lights get a slot, and the world's lights making room without popping.
import { describe, expect, it } from "vitest";
import { CALM_GLOW, MAX_SPELL_LIGHTS, NO_GLOW, easeRoom, glowLook, pickLights } from "./spellGlow";
import { TUNING } from "../../rules/tuning";
import settings from "../../../config/fx/intensity.json";

const KNOBS = TUNING.attackFx.glow;

describe("glowLook", () => {
  it("is the tuning's knobs, on by default", () => {
    expect(KNOBS).toEqual({ core: 1, halo: 1, pool: 1, lights: 5, light: 1 });
    expect(glowLook(KNOBS, true, false)).toEqual(KNOBS);
  });
  it("is none with ?spellglow=0, no knobs, or every knob at 0", () => {
    expect(glowLook(KNOBS, false, false)).toBeNull();
    expect(glowLook(undefined, true, false)).toBeNull();
    expect(glowLook(NO_GLOW, true, false)).toBeNull();
  });
  it("is about half with Reduce flashing, the light count kept", () => {
    const calm = glowLook(KNOBS, true, true)!;
    expect(CALM_GLOW).toBe(0.5);
    expect(calm).toEqual({ core: KNOBS.core * 0.5, halo: KNOBS.halo * 0.5, pool: KNOBS.pool * 0.5, lights: KNOBS.lights, light: KNOBS.light * 0.5 });
  });
  it("caps the lights at the effects' six (Ed, 2026-10-28: about 6) and keeps every knob in range", () => {
    expect(MAX_SPELL_LIGHTS).toBe(settings.lightCap);
    const wild = glowLook({ core: 99, halo: -1, pool: NaN, lights: 40, light: 2.5 }, true, false)!;
    expect(wild).toEqual({ core: 4, halo: 0, pool: 0, lights: 6, light: 2.5 });
    expect(KNOBS.lights).toBeLessThanOrEqual(MAX_SPELL_LIGHTS);
  });
});

describe("pickLights (the light cap)", () => {
  const ask = (score: number, spell = true, held = false) => ({ score, spell, held });
  it("lights the strongest and nearest first, never more than the cap", () => {
    const asks = [ask(0.1), ask(0.9), ask(0.5), ask(0.7), ask(0.3), ask(0.2), ask(0.8), ask(0.6)];
    expect(pickLights(asks, 6, 6)).toEqual([1, 6, 3, 7, 2, 4]);
    expect(pickLights(asks, 3, 6)).toHaveLength(3);
  });
  it("lights at most attackFx.glow.lights creatures' spells, the rest of the slots the other magic's", () => {
    const asks = [ask(0.9), ask(0.8), ask(0.7), ask(0.6), ask(0.2, false), ask(0.1, false)];
    const got = pickLights(asks, 6, 2);
    expect(got.filter(i => asks[i].spell)).toEqual([0, 1]); expect(got).toEqual([0, 1, 4, 5]);
    expect(pickLights(asks, 6, 0).every(i => !asks[i].spell)).toBe(true);
  });
  it("keeps a light that held its slot unless clearly beaten (no swapping between near equals)", () => {
    expect(pickLights([ask(0.5, true, true), ask(0.55)], 1, 1)).toEqual([0]);
    expect(pickLights([ask(0.5, true, true), ask(0.9)], 1, 1)).toEqual([1]);
  });
});

describe("easeRoom (no light pops)", () => {
  const step = 1 / 60 / settings.lightEase;
  it("makes room over the lights' ease, not at once, several as fast as one", () => {
    let room = 0, frames = 0;
    while (room < 6 && frames < 600) { const next = easeRoom(room, 6, step); expect(next - room).toBeLessThanOrEqual(6 * step + 1e-9); room = next; frames++; }
    expect(room).toBe(6); expect(frames).toBeGreaterThan(5); expect(frames).toBeLessThan(40);
    let one = 0, f1 = 0; while (one < 1) { one = easeRoom(one, 1, step); f1++; }
    expect(Math.abs(frames - f1)).toBeLessThan(25);
  });
  it("gives the world its lights back the same way", () => {
    let room = 4; const seen: number[] = [];
    while (room > 0) { room = easeRoom(room, 0, step); seen.push(room); }
    for (let i = 1; i < seen.length; i++) expect(seen[i]).toBeLessThan(seen[i - 1]);
    expect(seen.length).toBeGreaterThan(3);
  });
  it("holds still when there's nothing to change, and when no time passes", () => {
    expect(easeRoom(2, 2, step)).toBe(2); expect(easeRoom(1.5, 4, 0)).toBe(1.5);
  });
});

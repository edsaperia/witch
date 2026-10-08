import { describe, expect, it } from "vitest";
import { bootSpeaker, newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

/** A stand-in for the sound effects: every call does nothing, the laments and power-ups are counted. */
function fakeSfx() {
  const laments: { urgency: number; pan: number; near: number }[] = [], powers: { step: number; pan: number; near: number; full: boolean }[] = [];
  const sfx = new Proxy({}, { get: (_, k) => k === "lament" ? (_v: unknown, urgency: number, pan: number, near: number) => laments.push({ urgency, pan, near })
    : k === "power" ? (step: number, pan: number, near: number, full: boolean) => powers.push({ step, pan, near, full }) : () => {} }) as unknown as Sfx;
  return { sfx, laments, powers };
}

describe("restless legends calling out sadly (Ed, 2026-10-06)", () => {
  it("call now and then from their clearings, more often as restlessness rises, the nearest two at most, and stop once calm", () => {
    const g = newGame(123, TUNING), L = g.tuning.sfx.lament, w = g.witch;
    const bosses = g.creatures.filter(c => c.boss && !c.gone).map(c => ({ c, d: Math.hypot(c.x - w.x, c.z - w.z) })).sort((a, b) => a.d - b.d).slice(0, 4).map(b => b.c);
    // bring four legends within earshot, all restless
    bosses.forEach((c, i) => { c.x = w.x + 40 + 10 * i; c.z = w.z; c.legendState = "restless"; c.restlessness = 0.1; });
    const { sfx, laments } = fakeSfx(), cues = new SfxCues(sfx);
    const run = (from: number, secs: number) => { for (let t = from; t < from + secs; t += 0.1) cues.update(g, t); };
    run(0, 120);
    const calm = laments.length;
    expect(calm).toBeGreaterThan(2);
    // never more than one call every gap seconds, and only the nearest max ever call
    expect(calm).toBeLessThanOrEqual(120 / L.gap + 1);
    for (const l of laments) expect(l.pan).toBeGreaterThan(0); // (from the way of their clearings: east of her)
    for (const l of laments) expect(l.pan).toBeLessThan(55 / 30); // (only the nearest two, at 40 and 50 m, ever call)
    // nearly angry: they call more often
    bosses.forEach(c => { c.restlessness = 0.95; });
    laments.length = 0;
    run(120, 120);
    expect(laments.length).toBeGreaterThan(calm);
    expect(Math.min(...laments.map(l => l.urgency))).toBeGreaterThan(0.9);
    // calm again (kin back): silence
    bosses.forEach(c => { c.legendState = "asleep"; c.restlessness = 0; });
    laments.length = 0;
    run(240, 60);
    expect(laments.length).toBe(0);
  });

  it("is heard far beyond the usual hearing, and not past its range", () => {
    const g = newGame(123, TUNING), L = g.tuning.sfx.lament, w = g.witch, c = g.creatures.find(c => c.boss && !c.gone)!;
    Object.assign(c, { x: w.x - (L.range - 30), z: w.z, legendState: "restless", restlessness: 0.5 });
    const { sfx, laments } = fakeSfx(), cues = new SfxCues(sfx);
    for (let t = 0; t < 60; t += 0.1) cues.update(g, t);
    expect(L.range).toBeGreaterThan(g.tuning.sfx.hear);
    expect(laments.length).toBeGreaterThan(0);
    expect(laments[0].pan).toBeLessThan(0);
    c.x = w.x - (L.range + 20);
    laments.length = 0;
    for (let t = 60; t < 120; t += 0.1) cues.update(g, t);
    expect(laments.length).toBe(0);
  });
});

describe("runestones crackling into life (Ed, 2026-10-06)", () => {
  it("powers up each home speaker as the boot pulse turns it (g.speakerBoot), a step up the scale round the ring, the last a chord", () => {
    const g = newGame(123, TUNING), n = g.map.dancefloor.speakers.length;
    g.speakerBoot = g.speakerBoot.map(() => null); // (every stone still a stone)
    const { sfx, powers } = fakeSfx(), cues = new SfxCues(sfx);
    cues.update(g, 0);
    // the boot pulse going round the ring, clockwise, a stone every half second
    for (let i = 0; i < n; i++) { const t = 1 + i * 0.5; g.clock.time = t; bootSpeaker(g, i); cues.update(g, t); cues.update(g, t + 0.1); }
    expect(powers.map(p => p.step)).toEqual(Array.from({ length: n }, (_, i) => i));
    expect(powers.map(p => p.full)).toEqual(Array.from({ length: n }, (_, i) => i === n - 1));
    expect(Math.min(...powers.map(p => p.near))).toBeGreaterThan(0);
    expect(new Set(powers.map(p => p.pan.toFixed(2))).size).toBeGreaterThan(3); // (from round the ring)
  });

  it("powers up a wave's soundsystem as it appears, once, from where it stands", () => {
    const g = newGame(123, TUNING), w = g.witch;
    const { sfx, powers } = fakeSfx(), cues = new SfxCues(sfx);
    cues.update(g, 0);
    const key = "soundsystem-test", ss = { x: w.x + 30, z: w.z };
    g.party.areas.set(key, { cell: [0, 0], wave: 1, at: 1, from: null, soundsystem: ss } as never);
    cues.update(g, 1); cues.update(g, 1.1);
    const mine = powers.filter(p => p.full && p.pan > 0);
    expect(mine.length).toBe(1);
    // too far off: not heard
    g.party.areas.set("far", { cell: [0, 0], wave: 2, at: 2, from: null, soundsystem: { x: w.x + g.tuning.sfx.power.range + 50, z: w.z } } as never);
    const before = powers.length;
    cues.update(g, 2);
    expect(powers.length).toBe(before);
  });
});

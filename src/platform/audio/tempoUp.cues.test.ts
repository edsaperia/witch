import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { beatAt, knockdownTempo, timeAt } from "../../rules/beat";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

describe("the crowd's cheer as a knockdown speeds the party up (+1 BPM, Ed 2026-10-07)", () => {
  it("with no knockout under way, cheers once, on the bar line the tempo starts rising from", () => {
    const g = newGame(123, TUNING), cheers: number[] = [];
    let now = 0;
    const sfx = new Proxy({}, { get: (_, k) => k === "fireworkCheer" ? () => cheers.push(now) : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx);
    const t0 = 10.3, rise = timeAt(g.beat, Math.ceil(beatAt(g.beat, t0) / 4) * 4); // (the next bar line: #527's bonusAt)
    now = t0; cues.update(g, now);
    knockdownTempo(g.beat, g.tuning, t0);
    for (now = t0; now < rise + 2; now += 1 / 60) cues.update(g, now);
    expect(cheers.length).toBe(1);
    expect(cheers[0]).toBeGreaterThanOrEqual(rise);
    expect(cheers[0]).toBeLessThan(rise + 1 / 30);
  });

  it("knocked down, cheers once as she's back at her decks (after the trumpet and the rewind), on her clock", () => {
    const g = newGame(123, TUNING), cheers: number[] = [];
    const sfx = new Proxy({}, { get: (_, k) => k === "fireworkCheer" ? () => cheers.push(g.herTime) : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx), me = g.witches[0];
    cues.update(g, 0);
    (me as { ko: unknown }).ko = { at: 1, backAt: 9, teleportAt: 4, inAt: 5, order: [], times: [], released: 0, floatUntil: 0, streak: 1, wait: 4, out: false, moved: false };
    knockdownTempo(g.beat, g.tuning, 1);
    for (let t = 1; t < 12; t += 1 / 60) { g.herTime = t; cues.update(g, t); }
    expect(cheers.length).toBe(1);
    expect(cheers[0]).toBeGreaterThanOrEqual(9);
    expect(cheers[0]).toBeLessThan(9 + 1 / 30);
  });
});

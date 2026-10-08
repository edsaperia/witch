import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { beatAt, timeAt } from "../../rules/beat";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

describe("the \"cleared!\" sting (an area cleared early, Ed 2026-10-08)", () => {
  it("plays once, on the next half-beat after the areaCleared event, louder near the new soundsystem", () => {
    const g = newGame(123, TUNING), heard: { t: number; near: number }[] = [];
    let now = 0;
    const sfx = new Proxy({}, { get: (_, k) => k === "cleared" ? (_pan: number, near: number) => heard.push({ t: now, near }) : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx), w = g.witch, at = 12.3;
    const on = timeAt(g.beat, Math.ceil(beatAt(g.beat, at) * 2) / 2);
    g.waveEvents.push({ kind: "areaCleared", key: "3,4", x: w.x + 20, z: w.z, at });
    for (now = at; now < at + 2; now += 1 / 60) cues.update(g, now);
    expect(heard.length).toBe(1);
    expect(heard[0].t).toBeGreaterThanOrEqual(on);
    expect(heard[0].t).toBeLessThan(on + 1 / 30);
    expect(heard[0].near).toBeGreaterThan(0.9);
  });
  it("from far away still heard, at the floor", () => {
    const g = newGame(123, TUNING), heard: number[] = [];
    const sfx = new Proxy({}, { get: (_, k) => k === "cleared" ? (_p: number, near: number) => heard.push(near) : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx), w = g.witch;
    g.waveEvents.push({ kind: "areaCleared", key: "9,9", x: w.x + 5000, z: w.z, at: 1 });
    for (let t = 1; t < 3; t += 1 / 60) cues.update(g, t);
    expect(heard).toEqual([g.tuning.sfx.cleared!.floor]);
  });
});

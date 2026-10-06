// The game clock's text and the wave pointer's target (rules/leypulse.ts; Ed, 2026-10-06): mm:ss from 0, minutes past 99
// as needed; the ley line's pulse a share of the current link's length by arc length, from the last stone reached at a wave
// to the next stone as the next wave comes.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame } from "./game";
import { clockText, leyPulse, pointAlong, pulseProgress, straightLink } from "./leypulse";
import { waveCountdown } from "./party";

describe("the game clock", () => {
  it("counts mm:ss from 0, whole seconds down, minutes running past 99", () => {
    expect(clockText(0)).toBe("00:00");
    expect(clockText(9.99)).toBe("00:09");
    expect(clockText(61)).toBe("01:01");
    expect(clockText(59 * 60 + 59.5)).toBe("59:59");
    expect(clockText(99 * 60 + 59)).toBe("99:59");
    expect(clockText(100 * 60)).toBe("100:00");
    expect(clockText(-3)).toBe("00:00");
    expect(clockText(NaN)).toBe("00:00");
  });
});

describe("the wave pointer's target, the ley line's pulse", () => {
  it("moves along a line by arc length", () => {
    const line: [number, number][] = [[0, 0], [10, 0], [10, 30]]; // 40 m long
    expect(pointAlong(line, 0)).toEqual({ x: 0, z: 0 });
    expect(pointAlong(line, 0.25)).toEqual({ x: 10, z: 0 });
    expect(pointAlong(line, 0.5)).toEqual({ x: 10, z: 10 });
    expect(pointAlong(line, 1)).toEqual({ x: 10, z: 30 });
    expect(pointAlong(line, 2)).toEqual({ x: 10, z: 30 });
  });
  it("runs from the last stone reached to the next as the countdown runs, along the link as drawn", () => {
    const g = newGame(123, TUNING), p = g.party, map = g.map;
    p.bootUntil = 0; // (past the boot: the countdown to wave 1)
    const link = straightLink(p, map);
    expect(link, "a next stone to run toward").not.toBeNull();
    const I = map.tuning.party.interval, at = (gone: number) => p.nextAt - I * (1 - gone);
    expect(pulseProgress(p, map, at(0))).toBeCloseTo(0, 5);
    expect(pulseProgress(p, map, at(0.5))).toBeCloseTo(0.5, 5);
    expect(pulseProgress(p, map, p.nextAt)).toBe(1);
    expect(pulseProgress(p, map, at(0.3))).toBeCloseTo(waveCountdown(p, map, at(0.3)).gone, 5);
    const start = leyPulse(p, map, at(0))!, end = leyPulse(p, map, p.nextAt)!;
    expect(start.x).toBeCloseTo(link![0][0], 3); expect(start.z).toBeCloseTo(link![0][1], 3);
    expect(end.x).toBeCloseTo(link![1][0], 3); expect(end.z).toBeCloseTo(link![1][1], 3);
    // given the link as the renderer drew it, the pulse follows that instead
    const drawn: (readonly [number, number])[] = [link![0], [link![0][0] + 50, link![0][1]], link![1]];
    expect(leyPulse(p, map, at(0.5), drawn)).toMatchObject(pointAlong(drawn, 0.5));
  });
  it("fills with the boot while home boots up", () => {
    const g = newGame(123, TUNING), p = g.party, map = g.map, B = map.tuning.boot.time;
    if (B <= 0) return;
    expect(pulseProgress(p, map, p.bootUntil - B / 2)).toBeCloseTo(0.5, 5);
  });
});

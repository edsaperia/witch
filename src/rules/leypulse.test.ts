// The game clock's text and the wave pointer's target (rules/leypulse.ts; Ed, 2026-10-06): mm:ss from 0, minutes past 99
// as needed; the ley line's pulse a share of the current link's length by arc length, from the last stone reached at a wave
// to the next stone as the next wave comes; the wave pointer hidden while home boots up.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame } from "./game";
import { awaitingSpell, clockSeconds, clockStart, clockText, columnShown, leyPulse, leyReachTimes, TIP_PACE, pointAlong, POINTER_FADE, pointerShown, pulseProgress, straightLink } from "./leypulse";
import { castPartySpell, cellKey, spawnMarkers, waveCountdown } from "./party";

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

describe("the game clock's start (Ed, 2026-10-06: at the party spell)", () => {
  it("runs from the start of play in a build without the party spell", () => {
    const g = newGame(123, TUNING), p = { ...g.party, spellAt: undefined };
    expect(clockStart(p)).toBe(0); expect(clockSeconds(p, 75)).toBe(75); expect(awaitingSpell(p)).toBe(false);
  });
  it("stays at 00:00 and prompts while waiting for the spell, then counts from the cast", () => {
    const g = newGame(123, TUNING), waiting = { ...g.party, spellAt: null }, cast = { ...g.party, spellAt: 40 };
    expect(clockStart(waiting)).toBeNull(); expect(clockText(clockSeconds(waiting, 300))).toBe("00:00"); expect(awaitingSpell(waiting)).toBe(true);
    expect(clockText(clockSeconds(cast, 101))).toBe("01:01"); expect(clockSeconds(cast, 10)).toBe(0); expect(awaitingSpell(cast)).toBe(false);
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
  it("hides while home boots up, then sets off from the link's start and fades in (Ed: \"first appears when bootup finishes\")", () => {
    const g = newGame(123, TUNING), p = g.party, map = g.map, B = map.tuning.boot.time;
    expect(B, "a boot to test").toBeGreaterThan(0);
    const mid = p.bootUntil - B / 2;
    expect(pointerShown(p, map, mid)).toBe(0);
    expect(leyPulse(p, map, mid)).toBeNull();
    expect(pulseProgress(p, map, mid)).toBe(0);
    expect(pointerShown(p, map, p.bootUntil)).toBe(0); // (just over: none yet...)
    expect(pointerShown(p, map, p.bootUntil + POINTER_FADE / 2)).toBeCloseTo(0.5, 5); // (...fading in...)
    expect(pointerShown(p, map, p.bootUntil + POINTER_FADE + 1)).toBe(1); // (...then fully)
    const start = leyPulse(p, map, p.bootUntil + 0.01)!, link = straightLink(p, map)!;
    expect(start.t).toBeLessThan(0.01);
    expect(Math.hypot(start.x - link[0][0], start.z - link[0][1])).toBeLessThan(2);
  });
});

describe("a runestone's column of light (Ed, 2026-10-06: \"first appears when the leyline meets it\")", () => {
  it("none before the line's tip reaches the stone; it shoots up with a flare when it does, then stays", () => {
    const g = newGame(123, TUNING), p = g.party, F = TUNING.runeMarkers.flare.time;
    p.spellAt = null; // waiting for the party spell
    expect(leyReachTimes(p, g.map)).toBeNull(); // the tip waits for it
    castPartySpell(p, g.map, 10);
    const times = leyReachTimes(p, g.map)!, step = TUNING.party.interval / TIP_PACE;
    const markers = spawnMarkers(p, g.map), next = markers.find(m => m.stage === "next")!, at = times.get(next.key)!;
    expect(at).toBeCloseTo(p.bootUntil + step); // the first stone after home: one link at three times the pulse, from the boot's end
    expect(times.get(cellKey(g.map.centreCell))).toBe(-Infinity); // home, reached from the start
    expect(columnShown(at, at - 0.01, F)).toBeNull(); // no column before the tip arrives
    const arrive = columnShown(at, at, F)!;
    expect(arrive.up).toBe(0); expect(arrive.flare).toBe(1); // it meets the stone: the flare-up begins
    const later = columnShown(at, at + F * 2, F)!;
    expect(later.up).toBe(1); expect(later.flare).toBe(0); // up for good
    // Further stones are reached one by one, later; any stone off the line has none.
    const order = [...times.entries()].filter(([k]) => k !== cellKey(g.map.centreCell)).map(([, t]) => t);
    for (let k = 1; k < order.length; k++) expect(order[k]).toBeGreaterThan(order[k - 1]);
    expect(columnShown(undefined, 1e6, F)).toBeNull();
    const far = markers.map(m => times.get(m.key)!).filter(t => t !== undefined);
    expect(far.filter(t => t > 10 + (g.map.cells.length / 2) * step).length).toBeGreaterThan(0); // the far ones much later (past half the map's stones)
  });
});

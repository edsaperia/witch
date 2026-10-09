// The game clock's text and the wave pointer's target (rules/leypulse.ts; Ed, 2026-10-06): mm:ss from 0, minutes past 99
// as needed; the ley line's pulse a share of the current link's length by arc length, from the last stone reached at a wave
// to the next stone as the next wave comes; the wave pointer hidden while home boots up.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame } from "./game";
import { awaitingSpell, clockSeconds, clockStart, clockText, columnShown, leyPulse, leyReachTimes, routeLengths, TIP_PACE, pointAlong, POINTER_FADE, pointerShown, pulseProgress, straightLink } from "./leypulse";
import { bootSeconds } from "./bootRing";
import { stretchLengths } from "./pulseRoute";
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
  it("runs from the last stone reached to the next at the pulse's speed (Ed, 2026-10-09: \"Pure constant speed\"), along the link as drawn", () => {
    const g = newGame(123, TUNING), p = g.party, map = g.map, v = map.tuning.leyLines.pulseSpeed;
    p.bootUntil = 0; p.pulse.at = 0; p.pulse.d = 0; p.pulse.v = v; // (past the boot: the pulse on its way to wave 1's stone)
    const link = straightLink(p, map), L = stretchLengths(p, map).reduce((a, b) => a + b, 0);
    expect(link, "a next stone to run toward").not.toBeNull();
    p.nextAt = L / v;
    const at = (gone: number) => (gone * L) / v; // (by its length: a share of the link at a constant speed)
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
    const g = newGame(123, TUNING), p = g.party, map = g.map, B = bootSeconds(map);
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
    const times = leyReachTimes(p, g.map)!, pace = TUNING.leyLines.reveal ?? TIP_PACE, v = TUNING.leyLines.pulseSpeed, step = 100 / (pace * v); // (a 100 m link at the front's pace)
    const markers = spawnMarkers(p, g.map), next = markers.find(m => m.stage === "next")!, at = times.get(next.key)!;
    expect(at).toBeCloseTo(p.bootUntil); // the first stone after home: the line branched off the boot ring and reaches it as the boot ends (Ed, 2026-10-07)
    // the third: when the front (pace times the pulse's distance along the route, from the first stone till that catches up) gets there
    const lens = routeLengths(p, g.map), C1 = lens[0], C3 = lens[0] + lens[1] + lens[2], m3 = C3 < pace * C1 ? (C3 - C1) / (pace - 1) : C3 / pace;
    expect(times.get([...times.keys()][3])!).toBeCloseTo(p.pulse.at + m3 / v, 6);
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

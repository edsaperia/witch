// The boot-up as a ley ring (rules/bootRing.ts; Ed, 2026-10-06): the party spell sets it off, the line goes round the home
// ring clockwise from the top at reveal x the pulse, and the pulse turns each stone into a speaker, the last as boot ends.
// The first stone turns firstAfter (3 s) after she leaves her decks, and the boot's minutes run from it (Ed, 2026-10-06).
import { describe, expect, it } from "vitest";
import type { ForestMap } from "./map";
import { castPartySpell, newParty, stepParty, type PartyState } from "./party";
import { bootLineAt, bootPath, bootPulseAt, ringOrder, stoneTurned, stonesTurned } from "./bootRing";

// The real ring's layout: 12 stones at ring angles 15, 45, ... 345 (0 due south, as map.ts places them), 27 m out.
const B = 300, F = 3, cx = 100, cz = 100, R = 27;
const speakers = Array.from({ length: 12 }, (_, i) => { const ring = 15 + 30 * i, a = (ring * Math.PI) / 180; return { x: cx + R * Math.sin(a), z: cz + R * Math.cos(a), ring }; });
const map = { dancefloor: { x: cx, z: cz, radius: 13.5, speakers }, treehouseFront: { x: cx, z: cz - 45 }, tuning: { boot: { time: B, firstAfter: F } } } as unknown as ForestMap;
/** Cast at `at` and off the decks at once. */
const cast = (at: number) => ({ spellAt: at, bootFrom: at, bootUntil: at + F + B, nextAt: at + F + B + 60, wave: 0, paused: false }) as unknown as PartyState;
const waiting = () => ({ spellAt: null, bootUntil: B, nextAt: B + 60, wave: 0, paused: false }) as unknown as PartyState;
const bearing = (i: number) => { const s = speakers[i], b = Math.atan2(s.x - cx, -(s.z - cz)) * 180 / Math.PI; return (b + 360) % 360; };

describe("the boot's ley ring", () => {
  it("goes round clockwise from the top: the first stone just east of north, then east, south, west", () => {
    const order = ringOrder(map), b = order.map(bearing);
    expect(b[0]).toBeCloseTo(15);
    for (let k = 1; k < b.length; k++) expect(b[k]).toBeGreaterThan(b[k - 1]);
    expect(b[3]).toBeCloseTo(105); expect(b[6]).toBeCloseTo(195); expect(b[9]).toBeCloseTo(285);
  });
  it("starts at the treehouse's front and drops to the ring's top", () => {
    const P = bootPath(map).path;
    expect(P[0]).toEqual([cx, cz - 45]);
    expect(P[1][0]).toBeCloseTo(cx); expect(P[1][1]).toBeCloseTo(cz - R, 0);
  });
  it("moves nothing before the party spell", () => {
    const p = waiting();
    expect(stonesTurned(p, map, 500)).toBe(0);
    expect(bootPulseAt(p, map, 500)).toBe(0);
    expect(bootLineAt(p, map, 500, 3)).toBe(0);
  });
  it("draws the line at reveal (3) times the pulse until the ring is whole", () => {
    const p = cast(10), P = bootPath(map);
    for (const t of [11, 30, 60]) expect(bootLineAt(p, map, t, 3)).toBeCloseTo(Math.min(P.length, 3 * bootPulseAt(p, map, t)));
    expect(bootLineAt(p, map, 10 + F + B, 3)).toBeCloseTo(P.length);
  });
  it("waits at the treehouse after the cast until she leaves her decks", () => {
    const p = { ...cast(10), bootFrom: undefined } as unknown as PartyState;
    expect(bootPulseAt(p, map, 10.5)).toBe(0); // (bootUntil not yet reckoned from her leaving: the pulse sits at its start)
    expect(stonesTurned(p, map, 10.5)).toBe(0);
  });
  it("turns the first stone firstAfter (3) seconds after she leaves her decks", () => {
    const p = cast(10), P = bootPath(map), first = P.order[0];
    expect(bootPulseAt(p, map, 10 + F / 2)).toBeCloseTo(P.stoneAt[first] / 2); // (running down from the treehouse)
    expect(stoneTurned(p, map, 10 + F - 0.01, first)).toBe(false);
    expect(stoneTurned(p, map, 10 + F, first)).toBe(true);
  });
  it("turns each stone into a speaker as the pulse reaches it, in order", () => {
    const p = cast(10), P = bootPath(map), first = P.stoneAt[P.order[0]], last = P.stoneAt[P.order[11]];
    P.order.forEach((i, k) => {
      if (k === 0) return; // (the first: above)
      const at = 10 + F + ((P.stoneAt[i] - first) / (last - first)) * B; // when the pulse is there
      expect(stoneTurned(p, map, at - 0.01, i)).toBe(false);
      expect(stoneTurned(p, map, at + 0.01, i)).toBe(true);
      expect(stonesTurned(p, map, at + 0.01)).toBe(k + 1);
    });
  });
  it("ends the boot as the 12th stone turns, boot.time after the first", () => {
    const p = cast(10);
    expect(stonesTurned(p, map, 10 + F + B - 0.01)).toBe(11);
    expect(stonesTurned(p, map, 10 + F + B)).toBe(12);
    expect(p.bootUntil).toBe(10 + F + B);
  });
});

describe("the party spell", () => {
  const T = { boot: { time: B, firstAfter: F, spell: true }, party: { startDelay: 0, interval: 60, areasPerWave: 1 } };
  const fakeMap = { ...map, tuning: T, centreCell: [0, 0] } as unknown as ForestMap;
  it("holds the party until it's cast and she leaves her decks, then the first stone turns 3 s later and the boot ends boot.time after it", () => {
    const p = { spellAt: null, bootUntil: F + B, nextAt: F + B + 60, wave: 0, paused: false, areas: new Map(), next: [], afterNext: [], probable: [], areasPerWave: 1 } as unknown as PartyState;
    for (let t = 0; t < 100; t += 1) stepParty(p, fakeMap, t, 1);
    expect(p.bootUntil).toBe(F + B + 100); // (frozen: shifted along with the clock)
    expect(castPartySpell(p, fakeMap, 100)).toBe(true);
    expect(p.spellAt).toBe(100);
    stepParty(p, fakeMap, 100, 1, true); stepParty(p, fakeMap, 101, 1, true); // (still at the decks, casting)
    expect(p.bootFrom).toBeUndefined();
    stepParty(p, fakeMap, 102, 1, false); // (off the decks)
    expect(p.bootFrom).toBe(102); expect(p.bootUntil).toBe(102 + F + B); expect(p.nextAt).toBe(102 + F + B + 60);
    expect(castPartySpell(p, fakeMap, 120)).toBe(false); // (once)
  });
  void newParty;
});

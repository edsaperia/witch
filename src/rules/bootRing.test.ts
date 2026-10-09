// The boot-up as a ley ring (rules/bootRing.ts; Ed, 2026-10-06): the party spell sets it off, the line goes round the home
// ring clockwise from the top at reveal x the pulse, and the pulse turns each stone into a speaker, the last as boot ends.
// The pulse runs at the ley pulse's own speed (Ed, 2026-10-09: "Pure constant speed", boot included): the first stone about
// 3 s off the decks (Ed, 2026-10-06), the boot over as it comes back round to where it came on to the ring.
import { describe, expect, it } from "vitest";
import type { ForestMap } from "./map";
import { castPartySpell, newParty, stepParty, type PartyState } from "./party";
import { bootLineAt, bootPath, bootPulseAt, bootSeconds, ringOrder, ringRadius, stoneTurned, stonesTurned } from "./bootRing";

// The real ring's layout: 12 stones at ring angles 15, 45, ... 345 (0 due south, as map.ts places them), 27 m out.
const V = 4, cx = 100, cz = 100, R = 27;
const speakers = Array.from({ length: 12 }, (_, i) => { const ring = 15 + 30 * i, a = (ring * Math.PI) / 180; return { x: cx + R * Math.sin(a), z: cz + R * Math.cos(a), ring }; });
const map = { dancefloor: { x: cx, z: cz, radius: 13.5, speakers }, treehouseFront: { x: cx, z: cz - 45 }, tuning: { leyLines: { pulseSpeed: V } } } as unknown as ForestMap;
const B = bootSeconds(map); // (the whole path at the pulse's speed)
/** Cast at `at` and off the decks at once. */
const cast = (at: number) => ({ spellAt: at, bootFrom: at, bootUntil: at + B, nextAt: Infinity, wave: 0, paused: false }) as unknown as PartyState;
const waiting = () => ({ spellAt: null, bootUntil: B, nextAt: Infinity, wave: 0, paused: false }) as unknown as PartyState;
const bearing = (i: number) => { const s = speakers[i], b = Math.atan2(s.x - cx, -(s.z - cz)) * 180 / Math.PI; return (b + 360) % 360; };

describe("the boot's ley ring", () => {
  it("goes round clockwise from the top: the first stone just east of north, then east, south, west", () => {
    const order = ringOrder(map), b = order.map(bearing);
    expect(b[0]).toBeCloseTo(15);
    for (let k = 1; k < b.length; k++) expect(b[k]).toBeGreaterThan(b[k - 1]);
    expect(b[3]).toBeCloseTo(105); expect(b[6]).toBeCloseTo(195); expect(b[9]).toBeCloseTo(285);
  });
  it("starts at the treehouse's front and comes down on to the ring along it, just past its top, before the first stone", () => {
    const P = bootPath(map), on = P.path[P.path.length - 73], r = Math.hypot(on[0] - cx, on[1] - cz), b = (Math.atan2(on[0] - cx, -(on[1] - cz)) * 180) / Math.PI;
    expect(P.path[0]).toEqual([cx, cz - 45]);
    expect(r).toBeCloseTo(R, 3);
    expect(b).toBeGreaterThan(0); expect(b).toBeLessThan(15); // (east of north, short of the first stone)
    expect(maxTurn(P.path.slice(0, P.path.length - 60))).toBeLessThan(35); // (no right angle on to it)
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
    expect(bootLineAt(p, map, 10 + B, 3)).toBeCloseTo(P.length);
  });
  it("waits at the treehouse after the cast until she leaves her decks", () => {
    const p = { ...cast(10), bootFrom: undefined } as unknown as PartyState;
    expect(bootPulseAt(p, map, 10.5)).toBe(0); // (bootUntil not yet reckoned from her leaving: the pulse sits at its start)
    expect(stonesTurned(p, map, 10.5)).toBe(0);
  });
  it("runs at the pulse's speed from when she leaves her decks, turning the first stone as it gets there", () => {
    const p = cast(10), P = bootPath(map), first = P.order[0], F = P.stoneAt[first] / V;
    expect(bootPath(map).length / V).toBeCloseTo(B, 9);
    expect(bootPulseAt(p, map, 10 + F / 2)).toBeCloseTo(P.stoneAt[first] / 2); // (running down from the treehouse)
    expect(bootPulseAt(p, map, 13)).toBeCloseTo(3 * V, 9); // (at a constant speed)
    expect(stoneTurned(p, map, 10 + F - 0.01, first)).toBe(false);
    expect(stoneTurned(p, map, 10 + F + 1e-9, first)).toBe(true);
  });
  it("turns each stone into a speaker as the pulse reaches it, in order", () => {
    const p = cast(10), P = bootPath(map);
    P.order.forEach((i, k) => {
      if (k === 0) return; // (the first: above)
      const at = 10 + P.stoneAt[i] / V; // when the pulse is there
      expect(stoneTurned(p, map, at - 0.01, i)).toBe(false);
      expect(stoneTurned(p, map, at + 0.01, i)).toBe(true);
      expect(stonesTurned(p, map, at + 0.01)).toBe(k + 1);
    });
  });
  it("turns the 12th stone as the pulse reaches it, and ends the boot as it comes round to where it came on to the ring", () => {
    const p = cast(10), P = bootPath(map), last = P.stoneAt[P.order[11]] / V;
    expect(stonesTurned(p, map, 10 + last - 0.01)).toBe(11);
    expect(stonesTurned(p, map, 10 + last + 1e-9)).toBe(12);
    expect(p.bootUntil).toBeCloseTo(10 + P.length / V, 9);
  });
});

describe("the party spell", () => {
  const T = { leyLines: { pulseSpeed: V }, boot: { transform: 1 }, party: { startDelay: 0, areasPerWave: 1 } };
  const fakeMap = { ...map, tuning: T, centreCell: [0, 0] } as unknown as ForestMap;
  it("holds the party until it's cast and she leaves her decks, then the boot runs at the pulse's speed and the wave's pulse sets off after it", () => {
    const p = { spellAt: null, bootUntil: B, nextAt: Infinity, wave: 0, paused: false, areas: new Map(), next: [], afterNext: [], probable: [], areasPerWave: 1, pulse: { d: 0, at: B, v: V, lens: [] } } as unknown as PartyState;
    for (let t = 0; t < 100; t += 1) stepParty(p, fakeMap, t, 1);
    expect(p.bootUntil).toBeCloseTo(B + 100, 9); // (frozen: shifted along with the clock)
    expect(castPartySpell(p, fakeMap, 100)).toBe(true);
    expect(p.spellAt).toBe(100);
    stepParty(p, fakeMap, 100, 1, true); stepParty(p, fakeMap, 101, 1, true); // (still at the decks, casting)
    expect(p.bootFrom).toBeUndefined();
    stepParty(p, fakeMap, 102, 1, false); // (off the decks)
    expect(p.bootFrom).toBe(102); expect(p.bootUntil).toBeCloseTo(102 + B, 9); expect(p.pulse.at).toBeCloseTo(102 + B, 9);
    expect(castPartySpell(p, fakeMap, 120)).toBe(false); // (once)
  });
  void newParty;
});

/** The sharpest turn (degrees) between successive steps of a polyline (steps under half a metre skipped). */
function maxTurn(pts: [number, number][]): number {
  const steps = pts.slice(1).map((p, i) => [p[0] - pts[i][0], p[1] - pts[i][1]]).filter(v => Math.hypot(v[0], v[1]) > 0.5);
  let most = 0;
  for (let i = 1; i < steps.length; i++) {
    const a = steps[i - 1], b = steps[i], c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]));
    most = Math.max(most, (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI);
  }
  return most;
}

describe("the ring and the way out are one path (Ed, 2026-10-06: \"it doesn't connect with the leyline around the dancefloor\")", () => {
  it("the first line's way out runs on the boot ring's circle from the treehouse and leaves it from a point on it", async () => {
    const { newGame } = await import("./game");
    const { TUNING } = await import("./tuning");
    const { departureRoute } = await import("./departure");
    const g = newGame(123, TUNING), d = g.map.dancefloor, R = ringRadius(g.map), P = bootPath(g.map);
    for (const to of [{ x: d.x + 400, z: d.z + 300 }, { x: d.x - 500, z: d.z - 100 }]) {
      const route = departureRoute(g.map, to, TUNING.leyLines.depart.avoid, 4), r = (p: [number, number]) => Math.hypot(p[0] - d.x, p[1] - d.z);
      expect(route[0]).toEqual(P.path[0]); // (both from the treehouse's front)
      // Never inside the ring; in from the treehouse's front onto it (the ring is the speakers' own circle, inside the front:
      // Ed, 2026-10-07), a stretch on it (within the smoothing's half metre or so), then out.
      expect(Math.min(...route.map(r))).toBeGreaterThan(R - 0.6);
      const on = route.findIndex(p => Math.abs(r(p) - R) < 1.5), onRing = on + route.slice(on).findIndex(p => r(p) > R + 1.5);
      expect(on).toBeGreaterThan(0);
      expect(onRing - on).toBeGreaterThan(2);
      for (const p of route.slice(on, onRing)) expect(Math.abs(r(p) - R)).toBeLessThan(1.5);
      // No right angle (Ed's second shot): onto the ring, round it and off it, each step turns gently.
      expect(maxTurn(route.slice(0, onRing + 12))).toBeLessThan(35);
    }
    expect(maxTurn(P.path.slice(0, 30))).toBeLessThan(35); // (the boot ring's way on, the same curve)
  }, 30000);
});

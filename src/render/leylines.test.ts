// The ley line through the first wave and the wave's pulse (render/leylines.ts; Ed, 2026-10-06).
import { describe, expect, it } from "vitest";
import type { ForestMap } from "../rules/map";
import type { PartyState } from "../rules/party";
import { leyReveal, shaderPulse } from "./leylines";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { castPartySpell } from "../rules/party";
import { bootPath } from "../rules/bootRing";

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
  it("goes on growing at the same pace after the first wave (no stone pops on at once), and is whole with no wave clock", () => {
    const second = { wave: 1, paused: false, bootUntil: 10, nextAt: 130 } as unknown as PartyState;
    expect(leyReveal(second, map, 70, 3)).toBeCloseTo(3);
    expect(leyReveal(second, map, 100, 3)).toBeCloseTo(4.5);
    expect(leyReveal(party(0, true), map, 20, 3)).toBeNull();
  });
  it("isn't drawn while waiting for the party spell", () => {
    expect(leyReveal({ ...party(), spellAt: null } as unknown as PartyState, map, 40, 3)).toBe(0);
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

describe("the whole line, from home to its tip (Ed, 2026-10-06: \"The leyline should always go from the treehouse to 3x the progress of the pulse, and I should be able to see it along its entire length\")", () => {
  it("is drawn from the treehouse's front, unbroken (every 2 m at most), to TIP_PACE times the pulse's progress, and as bright all along", async () => {
    const THREE = await import("three");
    const { newGame } = await import("../rules/game");
    const { TUNING } = await import("../rules/tuning");
    const { leyChain } = await import("../rules/leylines");
    const { TIP_PACE } = await import("../rules/leypulse");
    const { LeyLines } = await import("./leylines");
    const g = newGame(123, TUNING), T = TUNING.leyLines;
    const ley = new LeyLines(T, () => 0, g.map);
    const chain = leyChain(g.party, g.map);
    for (let i = 0; i < 2000 && !ley.currentLink(); i++) ley.update(1, () => chain, () => new THREE.Vector3(1, 1, 1), 0, 0);
    const geo = (ley as unknown as { cur: { geo: InstanceType<typeof THREE.BufferGeometry> } }).cur.geo;
    const at = (k: string) => geo.getAttribute(k) as InstanceType<typeof THREE.BufferAttribute>, P = at("position"), L = at("aLink"), A = at("aT");
    // From the treehouse's front (home's stone), link after link with no gap, to the last stone.
    expect(Math.hypot(P.getX(0) - chain.stones[0].x, P.getZ(0) - chain.stones[0].z)).toBeLessThan(0.01); // (float32)
    let last = 0;
    for (let i = 2; i < P.count; i += 2) {
      const along = L.getX(i) + A.getX(i), was = L.getX(i - 2) + A.getX(i - 2);
      expect(along).toBeGreaterThanOrEqual(was - 1e-6);
      if (L.getX(i) === L.getX(i - 2)) expect(Math.hypot(P.getX(i) - P.getX(i - 2), P.getZ(i) - P.getZ(i - 2))).toBeLessThanOrEqual(2.001); // (float32)
      last = along;
    }
    expect(last).toBeCloseTo(chain.stones.length - 1);
    // Every section as bright as the next (the shader's rank: fade^r ahead, behindBright then fade behind, none under far).
    expect([T.fade, T.behindBright, ...T.far]).toEqual([1, 1, 1, 1]);
    // Its tip at TIP_PACE times the pulse's progress (in links from the treehouse) through the first waves.
    const m = { tuning: { party: { interval: 60 }, boot: { time: 10 } } } as unknown as ForestMap;
    for (const [wave, t] of [[0, 25], [0, 69], [1, 75], [2, 160]] as const) {
      const p = { wave, paused: false, bootUntil: 10, nextAt: 70 + 60 * wave } as unknown as PartyState;
      expect(leyReveal(p, m, t, TIP_PACE)).toBeCloseTo(TIP_PACE * (wave + shaderPulse(p, m, t)!));
    }
  }, 30000);
});

describe("the line's front (Ed, 2026-10-06: \"Please come up with a better design for the front of the leyline\")", () => {
  it("sits on the drawn line where it's drawn to, tinted toward the next stone's colour; none with the whole line shown; it bursts passing a stone", async () => {
    const THREE = await import("three");
    const { newGame } = await import("../rules/game");
    const { TUNING } = await import("../rules/tuning");
    const { leyChain } = await import("../rules/leylines");
    const { LeyLines } = await import("./leylines");
    const g = newGame(123, TUNING), ley = new LeyLines(TUNING.leyLines, () => 0, g.map), chain = leyChain(g.party, g.map);
    const colours = chain.stones.map((_, i) => new THREE.Vector3(i % 2, 0.5, 1 - (i % 2)));
    for (let i = 0; i < 2000 && !ley.currentLink(); i++) ley.update(1, () => chain, s => colours[chain.stones.indexOf(s)], 0, 0);
    const routes = (ley as unknown as { drawn: { pts: [number, number][]; total: number }[] }).drawn;
    ley.grow(1.5);
    const tip = ley.front(0, 0)!;
    expect(tip).not.toBeNull();
    // Within the line's drift (1.8 m) of the second link's drawn points, about half way along it.
    const near = Math.min(...routes[1].pts.map(p => Math.hypot(p[0] - tip.x, p[1] - tip.z)));
    expect(near).toBeLessThan(2.5);
    expect(tip.colour.x).toBeLessThan(0.5); // (from stone 1's colour, red 1, toward stone 2's, red 0: past half way)
    ley.grow(null);
    expect(ley.front(1, 1)).toBeNull();
    // Passing a stone: a burst of embers.
    const embers = () => (ley.head as unknown as { embers: unknown[] }).embers.length;
    ley.grow(1.98); ley.front(2, 2);
    const before = embers();
    ley.grow(2.02); ley.front(2.05, 2.1);
    expect(embers()).toBeGreaterThanOrEqual(before + 18);
  }, 30000);
});

describe("the first line branching off the boot ring (Ed, v2001 and 2026-10-07)", () => {
  // A real map: the boot's pulse goes round the home ring; the first link leaves the ring at `branch` (a share of it, and
  // the boot path's metres there, part way round).
  const g = newGame(123, TUNING), p = g.party, map = g.map, P = bootPath(map), first = P.stoneAt[P.order[0]], last = P.stoneAt[P.order[P.order.length - 1]];
  const branch = { share: 0.3, at: first + (last - first) / 3 }, B = TUNING.boot.time, F = TUNING.boot.firstAfter ?? 0, reveal = TUNING.leyLines.reveal ?? 3;
  castPartySpell(p, map, 0); p.bootFrom = 0; p.bootUntil = F + B; p.nextAt = p.bootUntil + TUNING.party.interval;
  const when = (m: number) => F + ((m - first) / (last - first)) * B; // (the time the boot's pulse passes m along its path)
  it("isn't there before the boot's pulse reaches where it leaves the ring", () => {
    expect(leyReveal(p, map, 1, reveal, branch)).toBe(0);
    expect(leyReveal(p, map, when(branch.at) - 0.5, reveal, branch)).toBe(0);
  });
  it("branches off there as the pulse passes, and reaches the first stone as the boot ends", () => {
    expect(leyReveal(p, map, when(branch.at) + 1e-6, reveal, branch)!).toBeCloseTo(0.3, 3);
    expect(leyReveal(p, map, when((branch.at + last) / 2), reveal, branch)!).toBeCloseTo(0.65, 3);
    expect(leyReveal(p, map, p.bootUntil - 1e-6, reveal, branch)!).toBeCloseTo(1, 3);
  });
  it("goes on from the first stone without a pause, reaching the third as the first wave lands", () => {
    expect(leyReveal(p, map, p.bootUntil, reveal, branch)).toBeCloseTo(1);
    expect(leyReveal(p, map, p.bootUntil + TUNING.party.interval / 2, reveal, branch)).toBeCloseTo(1 + (reveal - 1) / 2);
    expect(leyReveal(p, map, p.nextAt, reveal, branch)).toBeCloseTo(reveal);
  });
  it("keeps to the boot pulse's progress, not the clock: a shorter boot branches as early in it", () => {
    const short = { ...p, bootUntil: F + B / 10 } as typeof p, shortMap = { ...map, tuning: { ...map.tuning, boot: { ...map.tuning.boot, time: B / 10 } } } as typeof map;
    const at = F + ((branch.at - first) / (last - first)) * (B / 10);
    expect(leyReveal(short, shortMap, at - 0.05, reveal, branch)).toBe(0);
    expect(leyReveal(short, shortMap, at + 0.05, reveal, branch)!).toBeGreaterThan(0.3);
  });
});

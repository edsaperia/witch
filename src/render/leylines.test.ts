// The ley line through the first wave and the wave's pulse (render/leylines.ts; Ed, 2026-10-06).
import { describe, expect, it } from "vitest";
import type { PartyState } from "../rules/party";
import { leyReveal, shaderPulse } from "./leylines";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { castPartySpell } from "../rules/party";
import { bootPath, bootSeconds } from "../rules/bootRing";
import { metresToLinks, pulseRouteMetres, routeLengths } from "../rules/leypulse";

/** A real game booted by 10 s, the ley pulse setting off then (Ed, 2026-10-09: "Pure constant speed"). */
const g0 = newGame(123, TUNING), map = g0.map, v = TUNING.leyLines.pulseSpeed;
const party = (paused = false): PartyState => {
  const p = { ...g0.party, paused, bootFrom: 0, bootUntil: 10, spellAt: undefined } as PartyState;
  p.pulse = { ...g0.party.pulse, d: 0, at: 10, v };
  return p;
};
const lens = routeLengths(g0.party, map), C1 = lens[0], first = 10 + C1 / v; // (the pulse at the first stone: the first wave)

describe("the ley line through the first wave", () => {
  it("isn't drawn at all while home boots up", () => {
    expect(leyReveal(party(), map, 5, 3)).toBe(0);
    expect(shaderPulse(party(), map, 5)).toBeNull();
  });
  it("grows out from the treehouse as the pulse sets off, reveal times as far along the route", () => {
    expect(leyReveal(party(), map, 10, 3)).toBe(0);
    expect(leyReveal(party(), map, 20, 3)).toBeCloseTo(metresToLinks(lens, 3 * v * 10), 9);
  });
  it("reaches reveal times the first link's length as the first wave lands", () => {
    expect(leyReveal(party(), map, first, 3)).toBeCloseTo(metresToLinks(lens, 3 * C1), 6);
  });
  it("is whole with the waves off (paused), and isn't drawn while waiting for the party spell", () => {
    expect(leyReveal(party(true), map, 20, 3)).toBeNull();
    expect(leyReveal({ ...party(), spellAt: null } as PartyState, map, 40, 3)).toBe(0);
  });
});

describe("the wave's pulse in the shader", () => {
  it("runs at the pulse's speed: 0 as it sets off, a share of the link by length, 1 as the wave lands", () => {
    expect(shaderPulse(party(), map, 10)).toBe(0);
    expect(shaderPulse(party(), map, 10 + (0.75 * C1) / v)).toBeCloseTo(0.75, 9);
    expect(shaderPulse(party(), map, first)).toBeCloseTo(1, 9);
  });
  it("is off with the waves off", () => {
    expect(shaderPulse(party(true), map, 30)).toBeNull();
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
    // Its tip at TIP_PACE times the pulse's distance along the route (in metres, as links), through the first link.
    for (const t of [12, 25, first - 1, first]) expect(leyReveal(party(), map, t, TIP_PACE)).toBeCloseTo(metresToLinks(lens, TIP_PACE * pulseRouteMetres(party(), map, t)), 9);
  }, 30000);
});

describe("the line's front (Ed, 2026-10-06: \"Please come up with a better design for the front of the leyline\")", () => {
  it("sits on the drawn line where it's drawn to, tinted toward the next stone's colour; none with the whole line shown; nothing drawn at it", async () => {
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
    // Nothing drawn there (Ed, 2026-10-07: "It can just be the leyline finishing plainly"): only the line's own meshes and the
    // two pulses' sparklers (the wave's and the boot's).
    expect(ley.meshes.filter(m => (m as { isPoints?: boolean }).isPoints).length).toBe(2);
  }, 30000);
});

describe("the first line branching off the boot ring (Ed, v2001 and 2026-10-07)", () => {
  // A real map: the boot's pulse goes round the home ring at the pulse's speed; the first link leaves the ring at `branch` (a
  // share of it, and the boot path's metres there, part way round).
  const g = newGame(123, TUNING), p = g.party, map = g.map, P = bootPath(map), first = P.stoneAt[P.order[0]], last = P.stoneAt[P.order[P.order.length - 1]];
  const branch = { share: 0.3, at: first + (last - first) / 3 }, reveal = TUNING.leyLines.reveal ?? 3, v = TUNING.leyLines.pulseSpeed;
  castPartySpell(p, map, 0); p.bootFrom = 0; p.bootUntil = bootSeconds(map); p.pulse.at = p.bootUntil; p.pulse.d = 0; p.pulse.v = v;
  const when = (m: number) => m / v; // (the time the boot's pulse passes m along its path)
  const lens = routeLengths(p, map), C1 = lens[0], wave1 = p.bootUntil + C1 / v;
  it("isn't there before the boot's pulse reaches where it leaves the ring", () => {
    expect(leyReveal(p, map, 0.1, reveal, branch)).toBe(0);
    expect(leyReveal(p, map, when(branch.at) - 0.5, reveal, branch)).toBe(0);
  });
  it("branches off there as the pulse passes, and reaches the first stone as the last speaker turns", () => {
    expect(leyReveal(p, map, when(branch.at) + 1e-6, reveal, branch)!).toBeCloseTo(0.3, 3);
    expect(leyReveal(p, map, when((branch.at + last) / 2), reveal, branch)!).toBeCloseTo(0.65, 3);
    expect(leyReveal(p, map, p.bootUntil - 1e-6, reveal, branch)!).toBeCloseTo(1, 3);
  });
  it("goes on from the first stone without a pause, at reveal times the first link as the first wave lands", () => {
    expect(leyReveal(p, map, p.bootUntil, reveal, branch)).toBeCloseTo(1);
    expect(leyReveal(p, map, p.bootUntil + C1 / v / 2, reveal, branch)).toBeCloseTo(metresToLinks(lens, C1 + ((reveal - 1) * C1) / 2), 6);
    expect(leyReveal(p, map, wave1, reveal, branch)).toBeCloseTo(metresToLinks(lens, reveal * C1), 6);
  });
  it("keeps to the boot pulse's progress, not the clock: a faster pulse branches as early in it", () => {
    const fast = { ...map, tuning: { ...map.tuning, leyLines: { ...map.tuning.leyLines, pulseSpeed: 40 } } } as typeof map;
    const short = { ...p, bootUntil: bootSeconds(fast) } as typeof p, at = branch.at / 40;
    expect(leyReveal(short, fast, at - 0.05, reveal, branch)).toBe(0);
    expect(leyReveal(short, fast, at + 0.05, reveal, branch)!).toBeGreaterThan(0.3);
  });
  it("finds where it leaves the ring with the treehouse's front outside the ring (Ed, 2026-10-07: the ring on the speakers' own circle)", async () => {
    const THREE = await import("three");
    const { leyChain } = await import("../rules/leylines");
    const { LeyLines } = await import("./leylines");
    const { ringRadius } = await import("../rules/bootRing");
    for (const seed of [123, 7, 42]) {
      const g2 = newGame(seed, TUNING), m = g2.map, d = m.dancefloor, R = ringRadius(m), ley = new LeyLines(TUNING.leyLines, () => 0, m), chain = leyChain(g2.party, m);
      for (let i = 0; i < 2000 && !ley.currentLink(); i++) ley.update(1, () => chain, () => new THREE.Vector3(1, 1, 1), 0, 0);
      expect(Math.hypot(m.treehouseFront.x - d.x, m.treehouseFront.z - d.z), `seed ${seed}`).toBeGreaterThan(R + 1); // (the front outside it)
      const b = ley.branch()!, link = ley.currentLink()!;
      expect(b.share, `seed ${seed}`).toBeGreaterThan(0.05); expect(b.share).toBeLessThan(0.9);
      // The link's point at that share is on the ring, and the boot path passes it at b.at.
      let total = 0; const lens = [0];
      for (let i = 1; i < link.length; i++) lens.push((total += Math.hypot(link[i][0] - link[i - 1][0], link[i][1] - link[i - 1][1])));
      const k = lens.findIndex(l => l >= b.share * total), q = link[Math.max(0, k)];
      expect(Math.abs(Math.hypot(q[0] - d.x, q[1] - d.z) - R), `seed ${seed}`).toBeLessThan(1.01);
      expect(b.at).toBeGreaterThan(bootPath(m).ringFrom);
    }
  }, 60000);
  it("runs the boot ring through every stone, so the pulse touches each as it turns it (Ed, 2026-10-07)", () => {
    const d = map.dancefloor, R = P.path.slice(-72);
    for (const [i, s] of d.speakers.entries()) {
      const near = Math.min(...R.map(q => Math.hypot(q[0] - s.x, q[1] - s.z)));
      expect(near, `stone ${i}`).toBeLessThan(0.5);
      // (and the boot path's own measure of it is where the pulse passes it)
      expect(P.stoneAt[i]).toBeGreaterThan(P.ringFrom);
    }
  });
});

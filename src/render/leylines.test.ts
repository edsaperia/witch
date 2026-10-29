// The ley line through the first wave and the wave's pulse (render/leylines.ts; Ed, 2026-10-06).
import { describe, expect, it } from "vitest";
import type { PartyState } from "../rules/party";
import { leyDrawnTo, leyReveal, RING_AFTER, shaderPulse } from "./leylines";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { castPartySpell } from "../rules/party";
import { bootLineAt, bootPath, bootPulseAt, bootSeconds } from "../rules/bootRing";
import { metresToLinks, pulseRouteMetres, routeLengths } from "../rules/leypulse";
import { speakerCircle } from "../rules/departure";
import * as THREE from "three";

/** A real game booted by 10 s, the ley pulse setting off then (Ed, 2026-10-09: "Pure constant speed"). */
const g0 = newGame(123, TUNING), map = g0.map, v = TUNING.leyLines.pulseSpeed;
const party = (paused = false): PartyState => {
  const p = { ...g0.party, paused, bootFrom: 0, bootUntil: 10, spellAt: undefined } as PartyState;
  p.pulse = { ...g0.party.pulse, d: 0, at: 10, v };
  return p;
};
const lens = routeLengths(g0.party, map), C1 = lens[0], first = 10 + C1 / v; // (the pulse at the first stone: the first wave)

describe("the ley line through the first wave (one path with the boot ring: Ed, 2026-10-29)", () => {
  const B = bootPath(map).length;
  it("isn't drawn while the boot's line is still going round the ring (the tip reveal times the boot's pulse, the ring first)", () => {
    expect(leyReveal(party(), map, 5, 3)).toBe(0); // (the boot's pulse 20 m on at 4 m/s: the tip 60 m round the 179 m ring)
    expect(shaderPulse(party(), map, 5)).toBeNull();
  });
  it("goes on out from where the lap ends as the pulse sets off, reveal times as far along the one path", () => {
    expect(leyReveal(party(), map, 10, 3)).toBeCloseTo(metresToLinks(lens, 3 * B - B), 9); // (the boot over: the pulse at the lap's end, the tip reveal times as far)
    expect(leyReveal(party(), map, 20, 3)).toBeCloseTo(metresToLinks(lens, 3 * (B + v * 10) - B), 9);
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
    // From the treehouse's front (home's stone: the boot ring's link, round the home ring, then the route's from where the lap
    // ends, one line), link after link with no gap, to the last stone.
    expect(Math.hypot(P.getX(0) - chain.stones[0].x, P.getZ(0) - chain.stones[0].z)).toBeLessThan(0.01); // (float32)
    let last = 0;
    for (let i = 2; i < P.count; i += 2) {
      const along = L.getX(i) + A.getX(i), was = L.getX(i - 2) + A.getX(i - 2);
      expect(along).toBeGreaterThanOrEqual(was - 1e-6);
      if (L.getX(i) === L.getX(i - 2)) expect(Math.hypot(P.getX(i) - P.getX(i - 2), P.getZ(i) - P.getZ(i - 2))).toBeLessThanOrEqual(2.001); // (float32)
      last = along;
    }
    expect(last).toBeCloseTo(chain.stones.length); // (the ring's link, then one a stone)
    // Every section as bright as the next (the shader's rank: fade^r ahead, behindBright then fade behind, none under far).
    expect([T.fade, T.behindBright, ...T.far]).toEqual([1, 1, 1, 1]);
    // Its tip at TIP_PACE times the pulse's distance along the one path (the boot path, then the route; in metres, as links).
    const B = bootPath(map).length;
    for (const t of [12, 25, first - 1, first]) expect(leyReveal(party(), map, t, TIP_PACE)).toBeCloseTo(metresToLinks(lens, TIP_PACE * (B + pulseRouteMetres(party(), map, t)) - B), 9);
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
    const routes = (ley as unknown as { drawn: { pts: [number, number][]; total: number }[] }).drawn; // (the ring's link first)
    ley.grow(1.5);
    const tip = ley.front(0, 0)!;
    expect(tip).not.toBeNull();
    // Within the line's drift (1.8 m) of the second route link's drawn points, about half way along it.
    const near = Math.min(...routes[2].pts.map(p => Math.hypot(p[0] - tip.x, p[1] - tip.z)));
    expect(near).toBeLessThan(2.5);
    expect(tip.colour.x).toBeLessThan(0.5); // (from stone 1's colour, red 1, toward stone 2's, red 0: past half way)
    ley.grow(null);
    expect(ley.front(1, 1)).toBeNull();
    // Nothing drawn there (Ed, 2026-10-07: "It can just be the leyline finishing plainly"): only the line's own meshes and the
    // one pulse's sparkler (the boot's round the ring, then the wave's; the victory lap's outward one is only made at a win).
    expect(ley.meshes.filter(m => (m as { isPoints?: boolean }).isPoints).length).toBe(1);
    ley.lap(1, 1.5, 1.5); ley.front(1, 1);
    expect(ley.meshes.filter(m => (m as { isPoints?: boolean }).isPoints).length).toBe(2);
  }, 30000);
});

describe("the ring and the route are one path (Ed, 2026-10-29: \"the boot-line/leyline/pulse goes around the dancefloor and then should continue smoothly in the same direction\")", () => {
  // A real map: the boot's pulse goes round the home ring at its own speed; the route's first link goes on from where the lap ends.
  const g = newGame(123, TUNING), p = g.party, map = g.map, P = bootPath(map), B = P.length, reveal = TUNING.leyLines.reveal ?? 3, v = TUNING.leyLines.pulseSpeed, vb = TUNING.boot.speed!;
  castPartySpell(p, map, 0); p.bootFrom = 0; p.bootUntil = bootSeconds(map); p.pulse.at = p.bootUntil; p.pulse.d = 0; p.pulse.v = v;
  const lens = routeLengths(p, map), C1 = lens[0], wave1 = p.bootUntil + C1 / v;
  it("isn't there till the tip, reveal times the boot's pulse, has been round the whole ring", () => {
    expect(leyReveal(p, map, 0.1, reveal)).toBe(0);
    expect(leyReveal(p, map, (B / reveal) / vb - 0.1, reveal)).toBe(0);
    expect(leyReveal(p, map, (B / reveal) / vb + 0.5, reveal)!).toBeGreaterThan(0);
  });
  it("runs on along the route at reveal times the boot pulse's pace, and goes on without a jump as the boot ends and the wave's pulse takes over", () => {
    const t = (B / reveal) / vb + 5;
    expect(leyReveal(p, map, t, reveal)!).toBeCloseTo(metresToLinks(lens, reveal * vb * t - B), 6);
    const before = leyReveal(p, map, p.bootUntil - 1e-3, reveal)!, after = leyReveal(p, map, p.bootUntil + 1e-3, reveal)!;
    expect(Math.abs(after - before)).toBeLessThan(0.01);
    expect(leyReveal(p, map, p.bootUntil, reveal)).toBeCloseTo(metresToLinks(lens, (reveal - 1) * B), 6);
    expect(leyReveal(p, map, wave1, reveal)).toBeCloseTo(metresToLinks(lens, reveal * (B + C1) - B), 6);
  });
  it("keeps to the boot pulse's progress, not the clock: a faster pulse comes off the ring as early in it", () => {
    const fast = { ...map, tuning: { ...map.tuning, boot: { ...map.tuning.boot, speed: 40 } } } as typeof map;
    const short = { ...p, bootUntil: bootSeconds(fast) } as typeof p, at = (B / reveal) / 40;
    expect(leyReveal(short, fast, at - 0.05, reveal)).toBe(0);
    expect(leyReveal(short, fast, at + 0.05, reveal)!).toBeGreaterThan(0);
  });
  it("draws the first link from where the boot's lap ends, on round the ring the same way (clockwise), then off it; the rainbow and the dots run on from the ring", async () => {
    const THREE = await import("three");
    const { leyChain } = await import("../rules/leylines");
    const { LeyLines } = await import("./leylines");
    for (const seed of [123, 7, 42]) {
      const g2 = newGame(seed, TUNING), m = g2.map, d = m.dancefloor, R = speakerCircle(m), ley = new LeyLines(TUNING.leyLines, () => 0, m), chain = leyChain(g2.party, m), Q = bootPath(m);
      for (let i = 0; i < 2000 && !ley.currentLink(); i++) ley.update(1, () => chain, () => new THREE.Vector3(1, 1, 1), 0, 0);
      const link = ley.currentLink()!, end = Q.path[Q.path.length - 1];
      expect(Math.hypot(link[0][0] - end[0], link[0][1] - end[1]), `seed ${seed}`).toBeLessThan(0.01);
      // On round the ring the way the boot goes (clockwise on the screen: the angle round home, 0 south, falling), at least a few metres.
      const ang = (q: readonly number[]) => Math.atan2(q[0] - d.x, q[1] - d.z);
      let turn = 0, i = 1;
      for (; i < link.length && Math.abs(Math.hypot(link[i][0] - d.x, link[i][1] - d.z) - R) < 1; i++) { const da = ang(link[i]) - ang(link[i - 1]); turn += Math.atan2(Math.sin(da), Math.cos(da)); }
      expect(turn, `seed ${seed}: clockwise on the ring`).toBeLessThan(-0.05);
      // The boot's lap ends heading the same way: the ring's last step and the link's first step point alike.
      const q0 = Q.path[Q.path.length - 2], h0 = Math.atan2(end[1] - q0[1], end[0] - q0[0]), h1 = Math.atan2(link[1][1] - link[0][1], link[1][0] - link[0][0]);
      const dh = Math.atan2(Math.sin(h1 - h0), Math.cos(h1 - h0));
      expect(Math.abs(dh) * 180 / Math.PI, `seed ${seed}: no kink at the lap's end`).toBeLessThan(15);
      // One line: the ring its first link, the route's metres (the rainbow's hue) starting where the ring's end, its dots every 2 m on.
      expect(ley.runAt(0)).toBeCloseTo(Q.length, 0); // (the ring's link as drawn, its points every 2 m)
      ley.ring(1); ley.pulse(0.5); ley.grow(null); ley.front(0, 0);
      const [L] = ley.dotLines(2);
      expect(ley.dotLines(2).length).toBe(1); expect(L.ringLinks).toBe(1);
      for (let j = 1; j < L.bars.run.length; j++) expect(L.bars.run[j] - L.bars.run[j - 1]).toBeCloseTo(2, 3);
      const first = L.bars.links.findIndex(l => l >= 1); // (the route's first dot: just past the ring's link)
      expect(L.bars.run[first]).toBeGreaterThanOrEqual(Q.length); expect(L.bars.run[first] - Q.length).toBeLessThan(2.01);
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

describe("the ley line before the party (Ed, 2026-10-26: \"Before the party, the ley line is not visible\")", () => {
  it("isn't drawn at all till the spell's cast, not even the Route-seer hat's whole route; then as before", () => {
    const before = { ...party(), spellAt: null } as PartyState;
    for (const t of [0, 5, 30, 600]) {
      expect(leyDrawnTo(before, map, t, 3, false)).toBe(0);
      expect(leyDrawnTo(before, map, t, 3, true)).toBe(0);
    }
    const on = party();
    expect(leyDrawnTo(on, map, first, 3, true)).toBeNull(); // (the hat's whole route, once the party's on)
    expect(leyDrawnTo(on, map, first, 3, false)).toBe(leyReveal(on, map, first, 3));
  });
});

describe("the line as dots through the boot (Ed, 2026-10-29: \"The leyline does not show as dots, just a faint rainbow glow, until the boot-up period is finished. The boot-up period leyline did not show as dots or spectrum as it went round the circle\")", () => {
  // A real game, its line routed, the boot's pulse part way round the ring (as render/view.ts drives it each frame: pulse() with no
  // head, grow() by leyReveal, ring() by the boot's own progress, then front()).
  const g = newGame(123, TUNING), p = g.party, map = g.map, P = bootPath(map), reveal = TUNING.leyLines.reveal ?? 3, v = TUNING.leyLines.pulseSpeed;
  castPartySpell(p, map, 0); p.bootFrom = 0; p.bootUntil = bootSeconds(map); p.pulse.at = p.bootUntil; p.pulse.d = 0; p.pulse.v = v;
  const make = async () => {
    const { leyChain } = await import("../rules/leylines");
    const { LeyLines } = await import("./leylines");
    const ley = new LeyLines(TUNING.leyLines, () => 0, map), chain = leyChain(p, map);
    for (let i = 0; i < 2000 && !ley.currentLink(); i++) ley.update(1, () => chain, () => new THREE.Vector3(1, 1, 1), 0, 0);
    return ley;
  };
  const uniform = (ley: object, set: "ringSet" | "cur", name: string) => ((ley as unknown as Record<string, { meshes: { material: { uniforms: Record<string, { value: number }> } }[] }>)[set].meshes[0].material.uniforms[name].value);
  it("is one line in the rainbow, the boot ring its first link, with one spark; only its glow pass draws (the line is dots)", async () => {
    const ley = await make();
    expect(uniform(ley, "cur", "uRainbow")).toBe(1); expect(uniform(ley, "cur", "uRingLinks")).toBe(1);
    expect(ley.meshes.filter(m => (m as { isPoints?: boolean }).isPoints).length).toBe(1);
    const D = (ley as unknown as { drawn: { total: number }[] }).drawn, Q = bootPath(map);
    expect(D.length).toBe(routeLengths(p, map).length + 1); expect(D[0].total).toBeCloseTo(Q.length, 0);
    ley.update(1, () => ({ stones: [], current: 0 }), () => new THREE.Vector3(), 0, 0);
    const shown = (ley as unknown as { cur: { meshes: { visible: boolean }[]; glow: unknown } }).cur;
    expect(shown.meshes.filter(m => m.visible)).toEqual([shown.glow]);
  }, 30000);
  it("mid-boot: the boot's spark on the ring's link, bars behind it and single dots ahead, the tip reveal times as far: off the ring and out along the route, all single dots there", async () => {
    const ley = await make(), time = (0.8 * P.length) / TUNING.boot.speed!; // (the boot's pulse 0.8 of the way round: the tip, reveal times as far, off the ring and out along the route)
    const pulse = bootPulseAt(p, map, time) / P.length, line = bootLineAt(p, map, time, reveal) / P.length;
    ley.pulse(null, pulse); ley.grow(leyDrawnTo(p, map, time, reveal, false), line); ley.ring(1); ley.front(time, 0);
    expect(pulse).toBeGreaterThan(0.3); expect(pulse).toBeLessThan(1); expect(line).toBe(1);
    expect(ley.sparkLinks()).toBeCloseTo(pulse, 6); // (the one spark: the boot's, on the ring's link)
    const [L] = ley.dotLines(2), to = 1 + metresToLinks(routeLengths(p, map), reveal * 0.8 * P.length - P.length);
    expect(L.strength).toBe(1); expect(L.from).toBe(0); expect(L.to).toBeCloseTo(to, 6); expect(L.spark).toBeCloseTo(pulse, 6); expect(L.ringK).toBe(1);
    const behind = Array.from(L.bars.links).filter(l => l <= L.spark), ahead = Array.from(L.bars.links).filter(l => l > L.spark && l <= L.to), route = ahead.filter(l => l >= 1);
    expect(behind.length).toBeGreaterThan(10); expect(ahead.length).toBeGreaterThan(10); expect(route.length).toBeGreaterThan(5); // (bars, then dots round the ring and on out along the route)
    expect(L.place(L.spark, time, { x: 0, z: 0 })).not.toBeNull();
    // Where the route runs on round the ring from the lap's end, the ring's dots give way to the route's (the line over itself).
    expect(L.hide[0]).toBeCloseTo(P.ringFrom / P.length, 6); expect(L.hide[1]).toBeGreaterThan(L.hide[0]); expect(L.hide[1]).toBeLessThan(1);
  }, 30000);
  it("before the tip is round the whole ring, only the ring is drawn, as far as its line's got; before the spell, nothing, and no spark", async () => {
    const ley = await make(), time = (0.2 * P.length) / TUNING.boot.speed!, line = bootLineAt(p, map, time, reveal) / P.length;
    ley.pulse(null, bootPulseAt(p, map, time) / P.length); ley.grow(leyDrawnTo(p, map, time, reveal, false), line); ley.ring(1); ley.front(time, 0);
    let [L] = ley.dotLines(2);
    expect(L.strength).toBe(1); expect(L.to).toBeCloseTo(line, 6); expect(L.to).toBeLessThan(1); expect(L.hide[1]).toBe(0);
    ley.pulse(null, 0); ley.grow(0, 0); ley.ring(0); ley.front(time, 0);
    [L] = ley.dotLines(2);
    expect(L.strength).toBe(0); expect(ley.sparkLinks()).toBeNull();
  }, 30000);
  it("the boot over: the ring's link faint (RING_AFTER) and all bars, the spark the wave's, bars behind it and dots ahead; the whole line shown (the hat), the spark still; the waves off, no spark and all bars", async () => {
    const C1 = routeLengths(p, map)[0], ley = await make(), time = p.bootUntil + (0.6 * C1) / v, sp = shaderPulse(p, map, time)!; // (the wave's spark 0.6 of the way along the first link)
    expect(sp).toBeCloseTo(0.6, 6);
    ley.pulse(sp); ley.grow(leyDrawnTo(p, map, time, reveal, false), 1); ley.ring(RING_AFTER); ley.front(time, 0);
    let [L] = ley.dotLines(2);
    expect(L.ringK).toBe(RING_AFTER); expect(L.ringLinks).toBe(1); // (the ring's link faint, all of it behind the spark: bars)
    expect(L.strength).toBe(1); expect(L.spark).toBe(ley.sparkLinks()!); expect(L.spark).toBeCloseTo(1 + sp, 6); expect(L.to).toBeGreaterThan(L.spark);
    expect(Array.from(L.bars.links).some(l => l >= 1 && l <= L.spark)).toBe(true);
    expect(Array.from(L.bars.links).some(l => l > L.spark && l <= L.to)).toBe(true);
    // Where the route runs on round the ring from the lap's end, the ring's dots give way to the route's (the line over itself).
    expect(L.hide[0]).toBeCloseTo(P.ringFrom / P.length, 6); expect(L.hide[1]).toBeGreaterThan(L.hide[0] + 0.2); expect(L.hide[1]).toBeLessThan(1);
    ley.grow(leyDrawnTo(p, map, time, reveal, true), 1); ley.front(time, 0); // (the Route-seer hat: all of it)
    [L] = ley.dotLines(2);
    expect(L.to).toBe(Infinity); expect(ley.sparkLinks()).not.toBeNull(); expect(L.spark).toBe(ley.sparkLinks()!);
    // The waves off: no spark, and the line lit the whole way (all bars).
    ley.pulse(null); ley.front(time, 0);
    [L] = ley.dotLines(2);
    expect(ley.sparkLinks()).toBeNull(); expect(L.spark).toBe(Infinity); expect(L.strength).toBe(1);
  }, 30000);
});

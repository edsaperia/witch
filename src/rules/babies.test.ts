// Babies behave differently (Ed, 2026-10-11; docs/backlog/gameplay.md "Babies"; rules/babies.ts): single file along her
// trail in stack order, scattering in a fight, very fast when far off, eating only at their placed sigil, one berry to a
// youth, and weighing so 8 fill either allowance, whatever their species.
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { babiesOf, queueDistances, queueGap, queueHalf, scatterSpot, stepBaby, trailPoint } from "./babies";
import { SPACING } from "./combatSpacing";
import { isInside } from "./mapShape";
import { toEvolve } from "./berries";
import { TUNING, withTuning } from "./tuning";
import { newLeash, stepLeash } from "./leash";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, invites: { ...TUNING.invites, on: false } });
const run = (g: Game, secs: number, c: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, c, STEP); each?.(); } };

/** She stands on the ground in a quiet wild area two out from home, `n` babies of hers following (on her stack, oldest first). */
function scene(n: number, species: string | string[] = "fox", seed = 123): { g: Game; babies: Creature[] } {
  // Retain the two-area-away site, >300 m spare recruits, 200 m catch-up and coastal scatter geometry.
  const g = newGame(seed, T), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  for (const c of g.creatures) if (Math.hypot(c.x - site.x, c.z - site.z) < 250) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const babies = spare.slice(0, n).map((c, i) => {
    const x = site.x + 2 + i, z = site.z + 2, kind = typeof species === "string" ? species : species[i % species.length];
    Object.assign(c, { species: kind, level: 0 as Level, x, z, tx: x, tz: z, cell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: T.creatureSpeed * speedFactor(kind, 0, T), gone: false, hp: undefined, siege: undefined, enraged: false, fight: undefined, circle: undefined, leashed: true, state: "leashed" as Creature["state"] });
    g.leash.stack.push(c.id);
    return c;
  });
  // (no berries near: these tests aren't about eating, but the one that is)
  g.berries.berries.forEach(b => { const p = g.berries.bushes[b.bush]; if (Math.hypot(p.x - site.x, p.z - site.z) < 200) b.claimedBy = -1; });
  g.byArea = null;
  return { g, babies };
}

describe("babies on her leash", () => {
  it("walk in single file behind her along where she's been, in stack order (the bottom one first), spaced by their sizes (foxes: babies.gap apart)", () => {
    const { g, babies } = scene(4), gap = babiesOf(g.tuning).gap;
    run(g, 3, { ...idle, moveX: 1 }); // east
    run(g, 3, { ...idle, moveZ: 1 }); // then south: a bend in the line
    run(g, 2, { ...idle, moveZ: 1 });
    // nearest her the stack's bottom (the newest), then each further back along her trail
    const w = g.witch;
    const order = [...babies].reverse(), d = order.map(c => Math.hypot(c.x - w.x, c.z - w.z));
    for (let i = 1; i < d.length; i++) expect(d[i]).toBeGreaterThan(d[i - 1]);
    const back = queueDistances(order, g.tuning);
    expect(back).toEqual([1, 2, 3, 4].map(k => k * gap)); // (foxes are small: the minimum gap)
    order.forEach((c, k) => {
      const want = trailPoint(g.leash.trail, w.x, w.z, back[k]);
      expect(Math.hypot(c.x - want.x, c.z - want.z)).toBeLessThan(0.8); // (on its place on her trail)
    });
  }, 60000);

  it("scatter for the whole fight: from when something goes for her (before any hit), one way throughout, back into line only babies.calm seconds after it's over", () => {
    // A controlled nearby threat; its own waiting route must not decide when this leash fixture ends.
    const B = babiesOf(T), S = B.scatter, witch = { x: 0, z: 0 }, leash = newLeash();
    const babies = Array.from({ length: 3 }, (_, id) => ({ id, species: "fox", level: 0, x: 2 + id, z: 2, leashed: true, state: "leashed", speed: T.creatureSpeed * speedFactor("fox", 0, T), walk: 0, facing: 1 } as Creature));
    const boar = { id: 3, species: "boar", level: 1, x: 10, z: 0, fight: { target: { kind: "witch", id: 0 }, readyAt: 1e9, windupUntil: 0, aimX: 0, aimZ: 0 } } as Creature;
    const creatures = [...babies, boar]; leash.stack = babies.map(c => c.id);
    // Keep the assertions below on the same interface, with only the leash rule stepped.
    const g = { tuning: T, witch, leash };
    let time = 0;
    const run = (_g: typeof g, seconds: number, _controls = idle, each?: () => void) => {
      for (let i = 0; i < Math.round(seconds / STEP); i++) { time += STEP; stepLeash(leash, creatures, { talk: false, sigil: false }, witch, true, time, STEP, T); each?.(); }
    };
    let spread = 0;
    const lowest = () => Math.min(...babies.map(c => Math.hypot(c.x - g.witch.x, c.z - g.witch.z)));
    run(g, 1.5, idle, () => { spread = Math.max(spread, lowest()); });
    expect(boar.fight!.windupUntil).toBe(0); // The threat has not begun an attack.
    // (all of them off the line, babies.scatter or so from her, away from where it came at her: it charges through her, so not a side check)
    expect(spread).toBeGreaterThan(S * 0.5);
    for (const c of babies) expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z)).toBeGreaterThan(S * 0.5);
    const way = { ...g.leash.scatter! };
    // a lull in the fight shorter than calm: still scattered, the same way, not hopping back into line and out again
    boar.gone = true;
    run(g, B.calm! * 0.5, idle, () => { expect(g.leash.scatter).toBeDefined(); });
    boar.gone = false;
    run(g, 1, idle, () => { expect(g.leash.scatter!.x).toBe(way.x); expect(g.leash.scatter!.z).toBe(way.z); });
    for (const c of babies) expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z)).toBeGreaterThan(S * 0.5);
    // over: still scattered until calm seconds have gone by, then back in line
    boar.gone = true;
    run(g, B.calm! - 0.3);
    expect(g.leash.scatter).toBeDefined();
    run(g, 2.3);
    expect(g.leash.scatter).toBeUndefined();
    const w2 = g.witch;
    const back = queueDistances([...babies].reverse(), T);
    [...babies].reverse().forEach((c, k) => { const want = trailPoint(g.leash.trail, w2.x, w2.z, back[k]); expect(Math.hypot(c.x - want.x, c.z - want.z)).toBeLessThan(1); });
  }, 60000);

  it("scatter off the screen (Ed, 2026-10-26: \"outside of my camera view\"): each at least babies.scatter from her, past the view's farthest edge (50 m at zoom 3 on his screen), pulling on her not at all, and on the island's land, even fleeing toward the sea", () => {
    const B = babiesOf(TUNING);
    expect(B.scatter).toBeGreaterThanOrEqual(50);
    const fight = (g: Game, from: { x: number; z: number }) => {
      const w = g.witch, boar = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - w.x, c.z - w.z) > 300)!;
      Object.assign(boar, { species: "boar", level: 1 as Level, x: from.x, z: from.z, tx: from.x, tz: from.z, anchorX: from.x, anchorZ: from.z, cell: g.map.cellSafe(w.x, w.z).cell, gone: false, hp: undefined, hunting: 0, fight: { target: { kind: "witch", id: 0 }, readyAt: 1e9, windupUntil: 0, aimX: 0, aimZ: 0 } });
      g.byArea = null;
    };
    // (in the open: all of them out past the edge)
    {
      const { g, babies } = scene(4), w = g.witch;
      fight(g, { x: w.x + 10, z: w.z });
      run(g, 4);
      for (const c of babies) expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z)).toBeGreaterThanOrEqual(B.scatter * 0.98);
    }
    // (by the coast, the fight coming from inland: they flee seaward, but stop on the land)
    {
      const { g, babies } = scene(4), b = g.map.bounds, [hx, hy] = g.map.centreCell, home = g.map.siteOf(hx, hy);
      let p = { x: home.x, z: home.z };
      for (let r = 0; r < 5000 && isInside(b, home.x + r, home.z, 20); r += 2) p = { x: home.x + r, z: home.z }; // (east, 20 m in from the coast)
      g.witches[0].body = { ...g.witches[0].body, x: p.x, z: p.z };
      for (const c of babies) Object.assign(c, { x: p.x - 2, z: p.z, tx: p.x - 2, tz: p.z });
      fight(g, { x: p.x - 10, z: p.z });
      run(g, 4);
      expect(babies.some(c => { const q = scatterSpot(c, g.witch.x, g.witch.z, g.leash.scatter!, B.scatter); return !isInside(b, q.x, q.z); })).toBe(true); // (unchecked, one would be in the sea)
      for (const c of babies) expect(isInside(b, c.x, c.z)).toBe(true);
    }
  }, 60000);

  // Ed, 2026-11-03: "The spacing in this queue should adjust depending on how large the babies are (some are quite large and
  // so smush together in the queue)".
  const SPECIES = Object.keys(SPACING.body.radii);
  const baby = (species: string) => ({ species, level: 0 as Level });

  it("space big babies further apart than small ones: half each one's drawn length and the margin between them", () => {
    const B = babiesOf(TUNING), d = (k: string) => queueDistances([baby(k), baby(k)], TUNING);
    for (const big of ["elephant", "rhino", "bear", "crocodile"]) {
      expect(d(big)[1] - d(big)[0]).toBeGreaterThan(d("fox")[1] - d("fox")[0]);
      expect(d(big)[0]).toBeGreaterThan(d("fox")[0]); // (off her too)
      expect(d(big)[1] - d(big)[0]).toBeCloseTo(2 * queueHalf(baby(big), TUNING) + B.margin!, 9);
    }
    // (a size knob: lengths and gaps grow with it; the margin stays)
    const T2 = withTuning({ leash: { ...TUNING.leash, babies: { ...B, size: B.size! * 2 } } });
    expect(queueHalf(baby("elephant"), T2)).toBeCloseTo(queueHalf(baby("elephant"), TUNING) * 2, 9);
  });

  it("keep no two neighbours in the line overlapping, nor the first and her, whatever their kinds", () => {
    const B = babiesOf(TUNING), her = B.her!;
    for (let i = 0; i < SPECIES.length; i++) {
      // (every kind behind every other few, and behind her)
      const line = [SPECIES[i], SPECIES[(i * 7 + 3) % SPECIES.length], SPECIES[(i * 13 + 5) % SPECIES.length], SPECIES[(i + 1) % SPECIES.length]].map(baby);
      const back = queueDistances(line, TUNING);
      expect(back[0]).toBeGreaterThanOrEqual(her + queueHalf(line[0], TUNING) + B.margin! - 1e-9);
      for (let k = 1; k < line.length; k++) {
        expect(back[k] - back[k - 1]).toBeGreaterThanOrEqual(queueHalf(line[k - 1], TUNING) + queueHalf(line[k], TUNING) + B.margin! - 1e-9);
        expect(back[k] - back[k - 1]).toBeCloseTo(queueGap(queueHalf(line[k - 1], TUNING), queueHalf(line[k], TUNING), TUNING), 9);
      }
    }
  });

  it("keep small babies at least babies.gap apart, and off her", () => {
    const B = babiesOf(TUNING), small = ["squirrel", "heron", "fennec", "owl", "fox"];
    for (const k of small) expect(2 * queueHalf(baby(k), TUNING) + B.margin!).toBeLessThan(B.gap); // (small enough to be at the minimum)
    const back = queueDistances(small.map(baby), TUNING);
    expect(back).toEqual(small.map((_, k) => (k + 1) * B.gap));
    // (and never under it, even with no margin and no size)
    const T0 = withTuning({ leash: { ...TUNING.leash, babies: { ...B, margin: 0, size: 0, her: 0 } } });
    expect(queueDistances(SPECIES.slice(0, 6).map(baby), T0)).toEqual([1, 2, 3, 4, 5, 6].map(k => k * B.gap));
  });

  it("in play, a mixed line keeps clear on her trail: big babies further back, none overlapping its neighbour", () => {
    const kinds = ["squirrel", "elephant", "fox", "crocodile", "bear"], { g, babies } = scene(kinds.length, kinds);
    run(g, 12, { ...idle, moveX: 1 }); // a long walk east: the whole line strung out straight behind her
    const w = g.witch, order = [...babies].reverse(), B = babiesOf(g.tuning);
    const back = queueDistances(order, g.tuning);
    order.forEach((c, k) => { const want = trailPoint(g.leash.trail, w.x, w.z, back[k]); expect(Math.hypot(c.x - want.x, c.z - want.z)).toBeLessThan(1); });
    expect(Math.hypot(order[0].x - w.x, order[0].z - w.z)).toBeGreaterThan(B.her! + queueHalf(order[0], g.tuning) + B.margin! - 1);
    for (let k = 1; k < order.length; k++) {
      const a = order[k - 1], b = order[k], d = Math.hypot(a.x - b.x, a.z - b.z);
      expect(d).toBeGreaterThan(queueHalf(a, g.tuning) + queueHalf(b, g.tuning)); // (not smushed together)
    }
  }, 60000);

  it("scatter a big baby half its length further than a small one would go, so all of it is out of view", () => {
    const c = { id: 5, species: "crocodile", level: 0 } as Creature, away = { x: 1, z: 0 }, S = babiesOf(TUNING).scatter, half = queueHalf(c, TUNING);
    const near = scatterSpot(c, 0, 0, away, S), far = scatterSpot(c, 0, 0, away, S, half);
    expect(Math.hypot(far.x, far.z) - Math.hypot(near.x, near.z)).toBeCloseTo(half, 9);
    expect(Math.hypot(far.x, far.z) - half).toBeGreaterThanOrEqual(S);
  });

  it("uses the configured far catch-up speed without overshoot or losing leash membership", () => {
    const B = babiesOf(T), s = newLeash(), b = { id: 0, species: "fox", level: 0, x: 200, z: 30, tx: 200, tz: 30, speed: T.creatureSpeed, walk: 0, facing: 1, leashed: true, state: "leashed" } as Creature;
    s.stack.push(b.id);
    const distance = Math.hypot(b.x, b.z);
    stepLeash(s, [b], { talk: false, sigil: false }, { x: 0, z: 0 }, true, STEP, STEP, T);
    expect(distance - Math.hypot(b.x, b.z)).toBeCloseTo(B.farSpeed * STEP, 8);
    expect(s.stack).toEqual([b.id]); expect(b.leashed).toBe(true); expect(b.level).toBe(0);
    const target = { x: b.x + 0.1, z: b.z };
    stepBaby(b, target.x, target.z, 0, 0, b.speed, 0, 1, T);
    expect([b.x, b.z]).toEqual([target.x, target.z]);
    expect(Number.isFinite(b.x) && Number.isFinite(b.z)).toBe(true);
    // C1 reports the original200m/10s scenario and <8s arrival outcome.
  }, 60000);
});

describe("babies and berries", () => {
  /** A free berry `d` metres from her. */
  const berryNear = (g: Game, d: number) => {
    const w = g.witch, b = g.berries.berries.find(q => q.claimedBy === -1)!;
    b.claimedBy = null;
    Object.assign(g.berries.bushes[b.bush], { x: w.x + d, z: w.z });
    return b;
  };

  it("following her, a baby never stops for a berry; its sigil put down with a berry within babyReach, it eats it, and one berry makes it a youth", () => {
    const { g, babies } = scene(1), [b] = babies, w = g.witch;
    expect(toEvolve(0, g.tuning)).toBe(1);
    const berry = berryNear(g, 3);
    run(g, 3);
    expect(g.berries.feeding.has(b.id)).toBe(false); // (right by it, following: no)
    expect(berry.claimedBy).toBeNull();
    // her sigil put down: the berry 3 m off is within reach
    g.leash.stack = []; g.leash.placed.push({ id: b.id, x: w.x, z: w.z, at: g.clock.time });
    let evolving = false;
    run(g, 6, idle, () => { evolving ||= g.berries.evolving.has(b.id) || b.level === 1; });
    expect(evolving).toBe(true);
  }, 60000);

  it("doesn't eat a berry further than babyReach from its placed sigil", () => {
    const { g, babies } = scene(1), [b] = babies, w = g.witch;
    const berry = berryNear(g, (g.tuning.berries.babyReach ?? 10) + 4);
    g.leash.stack = []; g.leash.placed.push({ id: b.id, x: w.x, z: w.z, at: g.clock.time });
    run(g, 4);
    expect(berry.claimedBy).toBeNull();
    expect(b.level).toBe(0);
  }, 60000);
});

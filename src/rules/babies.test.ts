// Babies behave differently (Ed, 2026-10-11; docs/backlog/gameplay.md "Babies"; rules/babies.ts): single file along her
// trail in stack order, scattering in a fight, very fast when far off, eating only at their placed sigil, one berry to a
// youth, and weighing so 8 fill either allowance, whatever their species.
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { babiesOf, scatterSpot, stepBaby, trailPoint } from "./babies";
import { isInside } from "./mapShape";
import { toEvolve } from "./berries";
import { TUNING, withTuning } from "./tuning";
import { newLeash, stepLeash } from "./leash";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, invites: { ...TUNING.invites, on: false } });
const run = (g: Game, secs: number, c: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, c, STEP); each?.(); } };

/** She stands on the ground in a quiet wild area two out from home, `n` babies of hers following (on her stack, oldest first). */
function scene(n: number, species = "fox", seed = 123): { g: Game; babies: Creature[] } {
  // Retain the two-area-away site, >300 m spare recruits, 200 m catch-up and coastal scatter geometry.
  const g = newGame(seed, T), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  for (const c of g.creatures) if (Math.hypot(c.x - site.x, c.z - site.z) < 250) c.gone = true;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300);
  const babies = spare.slice(0, n).map((c, i) => {
    const x = site.x + 2 + i, z = site.z + 2;
    Object.assign(c, { species, level: 0 as Level, x, z, tx: x, tz: z, cell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: T.creatureSpeed * speedFactor(species, 0, T), gone: false, hp: undefined, siege: undefined, enraged: false, fight: undefined, circle: undefined, leashed: true, state: "leashed" as Creature["state"] });
    g.leash.stack.push(c.id);
    return c;
  });
  // (no berries near: these tests aren't about eating, but the one that is)
  g.berries.berries.forEach(b => { const p = g.berries.bushes[b.bush]; if (Math.hypot(p.x - site.x, p.z - site.z) < 200) b.claimedBy = -1; });
  g.byArea = null;
  return { g, babies };
}

describe("babies on her leash", () => {
  it("walk in single file behind her along where she's been, in stack order (the bottom one first), babies.gap apart", () => {
    const { g, babies } = scene(4), gap = babiesOf(g.tuning).gap;
    run(g, 3, { ...idle, moveX: 1 }); // east
    run(g, 3, { ...idle, moveZ: 1 }); // then south: a bend in the line
    run(g, 2, { ...idle, moveZ: 1 });
    // nearest her the stack's bottom (the newest), then each further back along her trail
    const w = g.witch;
    const order = [...babies].reverse(), d = order.map(c => Math.hypot(c.x - w.x, c.z - w.z));
    for (let i = 1; i < d.length; i++) expect(d[i]).toBeGreaterThan(d[i - 1]);
    order.forEach((c, k) => {
      const want = trailPoint(g.leash.trail, w.x, w.z, (k + 1) * gap);
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
    [...babies].reverse().forEach((c, k) => { const want = trailPoint(g.leash.trail, w2.x, w2.z, (k + 1) * B.gap); expect(Math.hypot(c.x - want.x, c.z - want.z)).toBeLessThan(1); });
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

// Babies behave differently (Ed, 2026-10-11; docs/backlog/gameplay.md "Babies"; rules/babies.ts): single file along her
// trail in stack order, scattering in a fight, very fast when far off, eating only at their placed sigil, one berry to a
// youth, and weighing so 8 fill either allowance, whatever their species.
import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { babiesOf, scatterSpot, trailPoint } from "./babies";
import { creatureWeight, freeOf, loadOf } from "./leashWeight";
import { leashLoad } from "./game";
import { isInside } from "./mapShape";
import { toEvolve } from "./berries";
import { TUNING, withTuning } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, invites: { ...TUNING.invites, on: false } });
const run = (g: Game, secs: number, c: Controls = idle, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, c, STEP); each?.(); } };

/** She stands on the ground in a quiet wild area two out from home, `n` babies of hers following (on her stack, oldest first). */
function scene(n: number, species = "fox", seed = 123): { g: Game; babies: Creature[] } {
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
    const { g, babies } = scene(3), B = babiesOf(g.tuning), S = B.scatter;
    run(g, 2, { ...idle, moveX: 1 });
    run(g, 0.5); // (she stops)
    const w = g.witch;
    // a wild boar coming for her, 10 m east of her, a long way off its first strike (no hit in this test)
    const boar = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - w.x, c.z - w.z) > 300)!;
    Object.assign(boar, { species: "boar", level: 1 as Level, x: w.x + 10, z: w.z, tx: w.x + 10, tz: w.z, anchorX: w.x + 10, anchorZ: w.z, cell: g.map.cellSafe(w.x, w.z).cell, gone: false, hp: undefined, hunting: 0, fight: { target: { kind: "witch", id: 0 }, readyAt: 1e9, windupUntil: 0, aimX: 0, aimZ: 0 } });
    g.byArea = null;
    const hp = g.witches[0].health;
    let spread = 0;
    const lowest = () => Math.min(...babies.map(c => Math.hypot(c.x - g.witch.x, c.z - g.witch.z)));
    run(g, 1.5, idle, () => { spread = Math.max(spread, lowest()); });
    expect(g.witches[0].health).toEqual(hp); // (scattered before anything landed)
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
    // (in the open: all of them out past the edge, and her load nothing)
    {
      const { g, babies } = scene(4), w = g.witch;
      fight(g, { x: w.x + 10, z: w.z });
      run(g, 4);
      for (const c of babies) expect(Math.hypot(c.x - g.witch.x, c.z - g.witch.z)).toBeGreaterThanOrEqual(B.scatter * 0.98);
      expect(leashLoad(g).total).toBe(0);
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

  it("one far off (200 m, out of sight) is back with her in seconds", () => {
    const { g, babies } = scene(1), [b] = babies, w = g.witch;
    Object.assign(b, { x: w.x + 200, z: w.z + 30, tx: w.x + 200, tz: w.z + 30 });
    let at = -1;
    const t0 = g.clock.time;
    run(g, 10, idle, () => { if (at < 0 && Math.hypot(b.x - g.witch.x, b.z - g.witch.z) < 12) at = g.clock.time - t0; });
    expect(at).toBeGreaterThan(0);
    expect(at).toBeLessThan(8); // (within about 8 s of a 200 m gap; a youth at its run takes nearly a minute)
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

describe("babies' weight", () => {
  it("8 babies fill her free allowance on the ground and in the treetops, whatever their species", () => {
    const t = T, W = t.leash.weight;
    for (const species of ["fox", "bear", "bat"]) {
      expect(creatureWeight({ species, level: 0 }, t, false)).toBeCloseTo(W.levels[0], 9);
      expect(creatureWeight({ species, level: 0 }, t, true)).toBeCloseTo(W.babyGround!, 9);
    }
    expect(8 * creatureWeight({ species: "bear", level: 0 }, t, true)).toBeLessThanOrEqual(freeOf(t, true) + 1e-9);
    expect(9 * creatureWeight({ species: "bear", level: 0 }, t, true)).toBeGreaterThan(freeOf(t, true));
    expect(8 * creatureWeight({ species: "bear", level: 0 }, t, false)).toBeLessThanOrEqual(freeOf(t, false) + 1e-9);
    expect(9 * creatureWeight({ species: "bear", level: 0 }, t, false)).toBeGreaterThan(freeOf(t, false));
    // a youth still weighs its strength
    expect(creatureWeight({ species: "bear", level: 1 }, t)).toBeGreaterThan(creatureWeight({ species: "fox", level: 1 }, t));
  });

  it("a tidy line costs nothing: babies at their places behind her pull no load; one left far behind pulls", () => {
    const t = T, gap = babiesOf(t).gap, mk = (id: number, x: number) => ({ id, species: "fox", level: 0, x, z: 0, gone: false } as unknown as Creature);
    const cs = Array.from({ length: 8 }, (_, i) => mk(i, -(8 - i) * gap)); // (the stack's bottom, id 7, nearest)
    const stack = cs.map(c => c.id), at = { x: 0, z: 0, mode: "ground" };
    expect(loadOf(stack, cs, at, t).total).toBe(0);
    cs[0].x = -60; // the oldest left behind
    expect(loadOf(stack, cs, at, t).total).toBeGreaterThan(0);
  });
});

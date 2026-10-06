import { describe, expect, it } from "vitest";
import type { Creature, Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { planRoute, TRAVEL, updateMode } from "./travel";
import { setupArena } from "./arena";
import { canEat } from "./berries";

// Travelling and posse (Ed, 2026-10-05).
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, each?: () => void, c: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, c, STEP); each?.(); } };
function quiet(): Game {
  const g = newGame(77, TUNING);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  g.witches[0].health.hp = 1e6;
  return g;
}
const used = new Set<number>();
function place(g: Game, species: string, level: Level, x: number, z: number, party = false): Creature {
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !used.has(k.id) && Math.hypot(k.x - x, k.z - z) > 300)!;
  used.add(c.id);
  Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, fight: undefined });
  c.cell = g.map.cellSafe(x, z).cell as [number, number];
  if (party) { c.leashed = true; g.leash.stack.push(c.id); }
  g.byArea = null;
  return c;
}
const clearAround = (g: Game, x: number, z: number, r: number) => { for (const c of g.creatures) if (!c.leashed && Math.hypot(c.x - x, c.z - z) < r) c.gone = true; g.byArea = null; };
const R = TRAVEL.posse * TUNING.fight.scale;

describe("travelling and posse (Ed, 2026-10-05)", () => {
  it("has a party animal following her through the treetops travel, quiet: wild creatures it passes don't engage it, nor it them", () => {
    used.clear();
    const g = quiet(), w = g.witch;
    g.witch = { ...w, mode: "treetop", lift: 1 };
    const sx = w.x + 160, sz = w.z;
    clearAround(g, sx, sz, 120);
    const mine = place(g, "wolf", 2, sx, sz, true);
    const boars = [0, 1, 2].map(i => place(g, "boar", 2, sx - 6 - i * 8, sz + (i - 1) * 3));
    let engaged = false;
    run(g, 10, () => { if (mine.fight?.target || boars.some(b => b.fight?.target?.kind === "creature" && b.fight.target.id === mine.id)) engaged = true; });
    expect(mine.travelling).toBe(true);
    expect(engaged).toBe(false);
    expect(mine.hp).toBeUndefined();
    expect(Math.hypot(mine.x - g.witch.x, mine.z - g.witch.z)).toBeLessThan(160 - 30); // on its way to her
  }, 60000);

  it("has a traveller join her posse inside the radius and fight as ever", () => {
    used.clear();
    const g = quiet(), w = g.witch;
    clearAround(g, w.x, w.z, 140);
    const mine = place(g, "wolf", 2, w.x + 120, w.z, true);
    const boar = place(g, "boar", 1, w.x + 4, w.z);
    run(g, 0.2);
    expect(mine.travelling).toBe(true);
    let joined = -1, fought = false;
    run(g, 30, () => { if (joined < 0 && !mine.travelling) joined = Math.hypot(mine.x - g.witch.x, mine.z - g.witch.z); if (mine.fight?.target?.kind === "creature" && mine.fight.target.id === boar.id) fought = true; });
    expect(joined).toBeGreaterThan(0);
    expect(joined).toBeLessThanOrEqual(R + 1);
    expect(fought).toBe(true);
  }, 60000);

  it("plans a route along area borders, clear of every area's middle but near its ends", () => {
    const g = quiet(), m = g.map, a = m.siteOf(m.centreCell[0] - 2, m.centreCell[1]), b = m.siteOf(m.centreCell[0] + 2, m.centreCell[1] + 1);
    const sx = a.x + 60, sz = a.z + 20, tx = b.x - 55, tz = b.z - 25;
    const pts = planRoute(m, sx, sz, tx, tz), clear = TRAVEL.clear * TUNING.fight.scale;
    expect(pts[0]).toEqual({ x: sx, z: sz });
    expect(pts[pts.length - 1]).toEqual({ x: tx, z: tz });
    let worst = Infinity, straight = 0;
    for (const p of pts) {
      if (Math.hypot(p.x - sx, p.z - sz) < clear || Math.hypot(p.x - tx, p.z - tz) < clear) continue;
      const [cx, cy] = m.cellSafe(p.x, p.z).cell;
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const s = m.siteOf(cx + i, cy + j); worst = Math.min(worst, Math.hypot(p.x - s.x, p.z - s.z)); }
    }
    // (the straight line, for comparison, passes far closer to some centre)
    for (let k = 0; k <= 50; k++) { const x = sx + ((tx - sx) * k) / 50, z = sz + ((tz - sz) * k) / 50; if (Math.hypot(x - sx, z - sz) < clear || Math.hypot(x - tx, z - tz) < clear) continue; const [cx, cy] = m.cellSafe(x, z).cell; straight = Math.max(straight, clear - Math.hypot(x - m.siteOf(cx, cy).x, z - m.siteOf(cx, cy).z)); }
    expect(worst).toBeGreaterThanOrEqual(clear * 0.95);
    expect(straight).toBeGreaterThan(0); // (the straight line did cut through a middle)
    for (let i = 1; i < pts.length; i++) expect(Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z)).toBeLessThanOrEqual(TRAVEL.step * TUNING.fight.scale * 3.5); // (pushed out round a centre, its points spread a little)
  });

  it("re-plans the route when its target moves on", () => {
    used.clear();
    const g = quiet(), w = g.witch;
    g.witch = { ...w, mode: "treetop", lift: 1 };
    const mine = place(g, "wolf", 2, w.x + 200, w.z, true);
    run(g, 0.5);
    const first = mine.route!;
    g.witch = { ...g.witch, z: g.witch.z + 80 };
    run(g, 0.2);
    expect(mine.route).not.toBe(first);
    expect(mine.route!.tz).toBeCloseTo(g.witch.z, 0);
  }, 60000);

  it("keeps every party animal in her posse through a 30 s arena fight with her dodging round", () => {
    for (const spec of ["wolf*4@2,boar*3@2", "hare*4@2,raven*3@2"]) for (const follow of [false, true]) {
      const g = quiet();
      setupArena(g, spec);
      const party = g.arena!.ids.map(i => g.creatures[i]).filter(c => c.leashed);
      if (follow) { for (const c of party) { g.leash.placed = g.leash.placed.filter(p => p.id !== c.id); g.leash.stack.push(c.id); } }
      let left = 0;
      for (let i = 0; i < 30 / STEP; i++) {
        const t = i * STEP, c: Controls = { ...idle, moveX: Math.sin(t * 0.9), moveZ: Math.cos(t * 0.6), dash: i % 150 === 0 };
        stepGame(g, c, STEP);
        for (const p of party) if (p.leashed && p.travelling) left++;
      }
      expect(left, `${spec} ${follow ? "following her" : "at sigils"}`).toBe(0);
    }
  }, 120000);

  it("has hysteresis at the radius, and a party animal in a fight stays in her posse wherever it is", () => {
    const g = quiet(), c = g.creatures[0], a = { x: 0, z: 0, sigil: false, ground: true }, t = 0;
    Object.assign(c, { x: R * 1.2, z: 0, travelling: false, fight: undefined, hurtAt: undefined, engagedUntil: undefined });
    expect(updateMode(c, a, g.map, t)).toBe(true); // in the posse: stays till 1.4 × out
    c.x = R * 1.5;
    expect(updateMode(c, a, g.map, t)).toBe(false);
    c.x = R * 1.2;
    expect(updateMode(c, a, g.map, t)).toBe(false); // travelling: joins only inside the radius
    c.x = R * 0.9;
    expect(updateMode(c, a, g.map, t)).toBe(true);
    c.x = R * 3; c.fight = { target: { kind: "creature", id: 1 }, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 };
    expect(updateMode(c, a, g.map, t)).toBe(true); // engaged
    c.fight = undefined;
    expect(updateMode(c, a, g.map, t + TRAVEL.engaged * 0.5)).toBe(true); // and a few seconds after
    expect(updateMode(c, a, g.map, t + TRAVEL.engaged + 0.1)).toBe(false);
    // Following her in the treetops: travelling, however close.
    Object.assign(c, { x: 3, travelling: false, engagedUntil: undefined });
    expect(updateMode(c, { ...a, ground: false }, g.map, t + 10)).toBe(false);
  });

  it("has only party animals in her posse eat berries: not travellers, not wild ones (Ed, 2026-10-05)", () => {
    const g = quiet(), c = g.creatures[0];
    Object.assign(c, { level: 1, leashed: true, travelling: false, fight: undefined });
    expect(canEat(c, g.berries)).toBe(true);
    c.travelling = true;
    expect(canEat(c, g.berries)).toBe(false);
    Object.assign(c, { leashed: false, travelling: false });
    expect(canEat(c, g.berries)).toBe(false);
    // In play: a traveller passing ripe bushes claims none.
    used.clear();
    const h = quiet(), w = h.witch;
    h.witch = { ...w, mode: "treetop", lift: 1 };
    const b = h.berries.bushes[0], mine = place(h, "wolf", 1, b.x + 3, b.z + 3, true);
    let claimed = false;
    run(h, 3, () => { if (h.berries.feeding.has(mine.id)) claimed = true; });
    expect(mine.travelling).toBe(true);
    expect(claimed).toBe(false);
  }, 60000);
});

// Dodging matters (Ed, 2026-10-08: "almost all animals are easily evaded simply by walking backwards, even large swarms.
// Ideally good play should require effective use of dodge"; "give her twice the amount of dodges"): two blinks before the
// cooldown, and against her (tuning dodge) committed strikes (a), predictive aim (b), packs cutting off her retreat (c).
// The numbers for every kind are tools/balance/dodgebot.mjs's.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { newDash, rechargeDash, startDash } from "./dash";
import { newWitch } from "./witch";
import { speedFactor, wanderRange } from "./creatures";

const D = TUNING.dodge!;
const only = (on: string): Tuning => withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, dodge: { a: { ...D.a, on: on.includes("a") }, b: { ...D.b, on: on.includes("b") }, c: { ...D.c, on: on.includes("c") } } });

/** A fight two areas out from home: n of `sp` (adults) 25 to 33 m off her, the area's own taken out. */
function arena(t: Tuning, sp: string, n: number): { g: Game; ids: number[]; inArea: (x: number, z: number) => boolean; site: { x: number; z: number } } {
  const g = newGame(1, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - site.x, c.z - site.z) > 300), ids: number[] = [];
  for (let i = 0; i < n; i++) {
    const c = spare[i], a = (n > 4 ? Math.PI * 2 : Math.PI / 2) * ((i + 0.5) / n - 0.5), r = 25 + (i % 3) * 4, x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r;
    Object.assign(c, { species: sp, level: 2, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(sp, 2, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, circle: undefined });
    ids.push(c.id);
  }
  for (const c of g.creatures) if (!ids.includes(c.id) && Math.hypot(c.x - site.x, c.z - site.z) < 260) c.gone = true;
  g.byArea = null;
  const inArea = (x: number, z: number) => { const q = g.map.cellSafe(x, z).cell; return q[0] === cell[0] && q[1] === cell[1]; };
  return { g, ids, inArea, site };
}

/** Hits she takes in `secs` walking straight away from the middle of the nearest three (bending to stay in the area). */
function backingOff(t: Tuning, sp: string, n: number, secs: number, each?: (g: Game) => void): number {
  const { g, ids, inArea, site } = arena(t, sp, n), w = g.witches[0];
  let hits = 0, last = w.health.hp;
  for (let f = 0; f < secs * 60; f++) {
    const B = w.body, near = ids.map(i => g.creatures[i]).filter(c => c.fight?.target?.kind === "witch").sort((a, b) => Math.hypot(a.x - B.x, a.z - B.z) - Math.hypot(b.x - B.x, b.z - B.z)).slice(0, 3);
    let mx = 0, mz = 0;
    if (near.length) {
      const cx = near.reduce((s, c) => s + c.x, 0) / near.length, cz = near.reduce((s, c) => s + c.z, 0) / near.length, a0 = Math.atan2(B.z - cz, B.x - cx);
      const da = [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1.2, 1.6, -1.6, 2, -2, 2.4, -2.4, Math.PI].find(d => inArea(B.x + Math.cos(a0 + d) * 20, B.z + Math.sin(a0 + d) * 20));
      if (da !== undefined) { mx = Math.cos(a0 + da); mz = Math.sin(a0 + da); } else { const k = Math.hypot(site.x - B.x, site.z - B.z) || 1; mx = (site.x - B.x) / k; mz = (site.z - B.z) / k; }
    }
    const c: Controls = { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0 };
    stepGame(g, c, 1 / 60);
    each?.(g);
    if (w.health.hp < last) hits += last - w.health.hp;
    last = w.health.hp;
  }
  return hits;
}

describe("dodging matters (Ed, 2026-10-08)", () => {
  it("she has two blinks before the cooldown, coming back one at a time", () => {
    const d = newDash(), w = { ...newWitch(0, 0), seated: false, mode: "ground" as const }, max = TUNING.dash.charges!, cd = TUNING.dash.cooldown, B = { minX: -1e4, maxX: 1e4, minZ: -1e4, maxZ: 1e4 };
    expect(max).toBe(2);
    d.charges = max; // (full, as she is a second into a game)
    const go = (time: number) => { rechargeDash(d, time, max, cd); return startDash(d, w, 1, 0, time, TUNING, B, () => true, max, 0.2); };
    expect(go(0)).toBe(true);
    expect(go(0.25)).toBe(true); // (the second, straight after)
    expect(go(0.5)).toBe(false); // (none left)
    expect(go(1.05)).toBe(true); // (one back a cooldown after the first)
    expect(go(1.3)).toBe(false);
    expect(go(2.1)).toBe(true); // (the next a cooldown later)
  });

  it("with all three, a pack catches her walking away, where before she was all but untouched", () => {
    const before = backingOff(only(""), "wolf", 4, 30), after = backingOff(only("abc"), "wolf", 4, 30);
    expect(before).toBeLessThanOrEqual(3);
    expect(after).toBeGreaterThanOrEqual(Math.max(6, before * 3));
  }, 120000);

  it("no more strike at her at once than dodge.a lets (so a dodge can answer each), whatever the crowd", () => {
    let worst = 0;
    backingOff(only("abc"), "wolf", 12, 20, g => {
      const n = g.creatures.filter(c => !c.gone && c.fight?.target?.kind === "witch" && (c.fight.windupUntil > 0 || c.fight.lunge)).length;
      worst = Math.max(worst, n);
    });
    expect(worst).toBeGreaterThan(0);
    expect(worst).toBeLessThanOrEqual(Math.max(D.a.tokens, D.a.swarmTokens));
  }, 120000);
});

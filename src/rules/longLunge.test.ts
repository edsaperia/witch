// Long lunges (Ed, 2026-11-13: "Lunge ranges seem very short; they could be twice as long, around 1.5-2 dashes range."; asked how,
// "Both": creatures wind up from far away, and the lunge carries on through and past the spot it aimed at). tuning lunge,
// rules/combat.ts longLunge; ?lunge=old (lunge.on false) the lunges as they were. Measured: tools/balance/lunges.mjs.
import { describe, expect, it } from "vitest";
import { attackOf, longLunge, lungeLength } from "./combat";
import type { Creature, Level } from "./creatures";
import { speedFactor, wanderRange } from "./creatures";
import { stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning } from "./tuning";
import { preppedGame } from "../test/preppedGame";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const NEW = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 } });
const OLD = withTuning({ witchHealth: { ...TUNING.witchHealth, hits: 1e6 }, lunge: { ...TUNING.lunge!, on: false } });
const DASH = TUNING.dash.distance;

/** She stands in a wild area two out from home with `n` wild `species` in an arc `off` metres east of her, everything else gone. */
function scene(t: typeof NEW, species: string, level: Level, off: number, n = 3): { g: Game; pack: Creature[] } {
  const g = preppedGame(123, t), w = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
  w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
  const pack = g.creatures.filter(o => !o.gone && !o.leashed && !o.boss && Math.hypot(o.x - site.x, o.z - site.z) > 300).slice(0, n);
  for (const o of g.creatures) if (!pack.includes(o) && Math.hypot(o.x - site.x, o.z - site.z) < 400) o.gone = true;
  pack.forEach((c, i) => {
    const a = (Math.PI / 2) * ((i + 0.5) / n - 0.5), x = site.x + Math.cos(a) * off, z = site.z + Math.sin(a) * off;
    Object.assign(c, { species, level, x, z, tx: x, tz: z, cell, homeX: site.x, homeZ: site.z, anchorX: x, anchorZ: z, range: wanderRange(g.map), speed: t.creatureSpeed * speedFactor(species, level, t), gone: false, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, enraged: false, friendly: false, rest: 0, fight: undefined, fleeUntil: undefined, wanderTo: undefined, charge: undefined, vx: 0, vz: 0, circle: undefined });
  });
  g.byArea = null;
  return { g, pack };
}

/** The pack's first lunge at her: how far off she was when that one's wind-up began and when it let go, how far it then went, how
 *  far past her it ended (along its line, from where she stood as it let go), the hits she took while it lunged, and which it was.
 *  `each` gives her controls for a step while one of them lunges. */
function firstLunge(g: Game, pack: Creature[], each?: () => Partial<Controls> | void) {
  const B = () => g.witches[0].body, off = (c: Creature) => Math.hypot(c.x - B().x, c.z - B().z), wound = new Map<number, number>();
  let c: Creature | null = null, release = NaN, from: { x: number; z: number; hx: number; hz: number; dx: number; dz: number } | null = null, hits = 0, hp = g.witches[0].health.hp;
  for (let i = 0; i < Math.round(30 / STEP); i++) {
    for (const o of pack) { const f = o.fight; if (f && f.windupUntil > 0 && !f.lunge) { if (!wound.has(o.id)) wound.set(o.id, off(o)); } else if (!f?.lunge) wound.delete(o.id); }
    stepGame(g, { ...idle, ...(c ? each?.() ?? {} : {}) }, STEP);
    if (!c) { c = pack.find(o => o.fight?.lunge && o.fight.target?.kind === "witch") ?? null; if (c) { const L = c.fight!.lunge!; release = off(c); from = { x: c.x, z: c.z, hx: B().x, hz: B().z, dx: L.dx, dz: L.dz }; hp = g.witches[0].health.hp; } }
    const now = g.witches[0].health.hp; if (c && now < hp) hits += hp - now; hp = now;
    if (c && !c.fight?.lunge) break;
  }
  if (!c || !from) throw new Error("none of them lunged");
  const travelled = Math.hypot(c.x - from.x, c.z - from.z), past = (c.x - from.hx) * from.dx + (c.z - from.hz) * from.dz;
  return { c, windupAt: wound.get(c.id) ?? NaN, release, travelled, past, hits };
}

describe("long lunges", () => {
  it("every long lunge is 1.5 to 2 dashes, by its kind's own lunge: the longest kinds wind up 1.5 dashes off and run 2", () => {
    const A = (lunge: number) => ({ ...attackOf("wolf", 1)!.attack, lunge });
    expect(longLunge(A(16), NEW)).toEqual({ from: 1.5 * DASH, length: 2 * DASH });
    expect(longLunge(A(18.4), NEW)).toEqual({ from: 1.5 * DASH, length: 2 * DASH }); // (an adult's, grown: no longer than the longest)
    expect(longLunge(A(14), NEW)!.length).toBeCloseTo(1.75 * DASH);
    expect(longLunge(A(12), NEW)).toEqual({ from: 1.5 * DASH * 0.75, length: 1.5 * DASH });
    expect(longLunge(A(10), NEW)!.length).toBeCloseTo(1.5 * DASH); // (never under the shortest share)
    for (const species of ["wolf", "stoat", "badger", "fox", "marten"]) for (const level of [1, 2] as Level[]) {
      const L = longLunge(attackOf(species, level)!.attack, NEW)!.length;
      expect(L).toBeGreaterThanOrEqual(1.5 * DASH - 1e-9); expect(L).toBeLessThanOrEqual(2 * DASH + 1e-9);
    }
  });
  it("a swipe stays a swipe, and ?lunge=old (lunge.on false) leaves every lunge as it was", () => {
    const bear = attackOf("bear", 2)!.attack, wolf = attackOf("wolf", 2)!.attack;
    expect(bear.lunge).toBeLessThan(TUNING.lunge!.least);
    expect(longLunge(bear, NEW)).toBeNull();
    expect(longLunge(wolf, OLD)).toBeNull();
    expect(longLunge({ ...wolf, delivery: "shot" }, NEW)).toBeNull();
  });
  it("its telegraph is as long as the lunge will be (Ed, 2026-11-02: \"the end of the line is where the lunge lands\"), and at a soundsystem as before", () => {
    const { pack: [c] } = scene(NEW, "stoat", 2, 30), A = attackOf("stoat", 2)!.attack;
    expect(lungeLength(c, A, true, NEW, 0, c.x - 30, c.z)).toBe(longLunge(A, NEW)!.length);
    expect(lungeLength(c, A, false, NEW, 0, c.x - 30, c.z, true)).toBeLessThanOrEqual(A.lunge!);
  });
  it("at her standing still: it winds up from far off, lets go there, and runs 1.5 to 2 dashes through and past her, hitting her once", () => {
    const { g, pack } = scene(NEW, "wolf", 2, 28), r = firstLunge(g, pack);
    expect(r.windupAt).toBeGreaterThan(DASH * 0.8); // (not from 2 m)
    expect(r.release).toBeGreaterThan(DASH * 0.6); // (nor after sprinting in)
    expect(r.travelled).toBeGreaterThanOrEqual(1.5 * DASH - 0.5);
    expect(r.travelled).toBeLessThanOrEqual(2 * DASH + 0.5);
    expect(r.past).toBeGreaterThan(5); // (through and past where she was)
    expect(r.hits).toBe(1);
  }, 60000);
  it("the old lunge (?lunge=old): it sprints in as it winds up and its lunge stops where it aimed, short of a dash", () => {
    const { g, pack } = scene(OLD, "wolf", 2, 28), r = firstLunge(g, pack);
    expect(r.travelled).toBeLessThan(DASH);
    expect(r.past).toBeLessThan(3);
    expect(r.hits).toBe(1);
  }, 60000);
  it("fair: a blink sideways as it lets go takes her out of its line, and it carries on along it without turning back", () => {
    const { g, pack } = scene(NEW, "wolf", 2, 28);
    let blinked = false;
    const r = firstLunge(g, pack, () => { if (!blinked) { blinked = true; return { moveX: 0, moveZ: 1, dash: true, aimX: 0, aimZ: 10 }; } });
    expect(blinked).toBe(true);
    expect(r.hits).toBe(0);
    expect(r.travelled).toBeGreaterThanOrEqual(1.5 * DASH - 0.5);
    expect(Math.hypot(r.c.x - g.witches[0].body.x, r.c.z - g.witches[0].body.z)).toBeGreaterThan(8); // (it didn't curl round after her)
  }, 60000);
});

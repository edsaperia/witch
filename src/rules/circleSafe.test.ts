// A legend's circle is safe from outside (Ed, round 14: "I got attacked by a wild creature when in a legend circle; I think they
// shouldn't attack you from outside when you're in there"): standing in a calm legend's circle (the same test as slow time,
// rules/slowTime.ts), nothing outside it goes for her, a shot already on its way doesn't land, and a chaser gives up and goes home.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { legendRings, type Ring } from "./slowTime";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, idle, STEP); };

/** Her on the ground at the edge of a sleeping legend's circle, `inside` it or just out of it, with six wild young of the
 *  circle's area crowding her from outside it. (Slow time off, so the world runs at full speed either way: a fair test.) */
function crowd(inside: boolean): { g: Game; ring: Ring; hp: number; ids: number[] } {
  const g = newGame(123, TUNING);
  (g as { tuning: typeof TUNING }).tuning = { ...g.tuning, legendCircle: { ...g.tuning.legendCircle!, slow: { ...g.tuning.legendCircle!.slow, on: false } } };
  g.clock.paused = false; g.party.spellAt = -100;
  const ring = legendRings(g).find(r => g.creatures[r.id].legendState === "asleep")!;
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - ring.x, c.z - ring.z) < 200) c.gone = true;
  const at = ring.r + (inside ? -1.5 : 1.5), wx = ring.x + at, wz = ring.z;
  g.witches[0].body = { ...g.witch, seated: false, mode: "ground", lift: 0, x: wx, z: wz };
  g.witches[0].health.hp = 1e6;
  const cell = g.map.cellSafe(wx, wz).cell, ids: number[] = [];
  const pool = g.creatures.filter(c => !c.boss && !c.gone && c.level >= 1 && Math.hypot(c.x - ring.x, c.z - ring.z) > 400).slice(0, 6); // (borrowed from far off)
  pool.forEach((c, i) => {
    const a = (i / 6 - 0.5) * 1.6, x = ring.x + Math.cos(a) * (ring.r + 4), z = ring.z + Math.sin(a) * (ring.r + 4);
    Object.assign(c, { x, z, tx: x, tz: z, anchorX: x, anchorZ: z, cell: [cell[0], cell[1]], state: undefined, enraged: false, siege: undefined, fight: undefined, retreat: undefined, friendly: false, leashed: false, asleep: undefined, napUntil: undefined, wakeUntil: undefined });
    ids.push(c.id);
  });
  g.byArea = null;
  return { g, ring, hp: g.witches[0].health.hp, ids };
}

describe("a legend's circle is safe from outside", () => {
  it("keeps her safe in it from wild creatures crowding its edge, who'd hit her just outside it", () => {
    const out = crowd(false);
    run(out.g, 15);
    expect(out.g.witches[0].health.hp, "just outside the circle they go for her").toBeLessThan(out.hp);
    const inn = crowd(true);
    run(inn.g, 15);
    expect(inn.g.witches[0].health.hp).toBe(inn.hp);
    for (const id of inn.ids) expect(inn.g.creatures[id].fight?.target?.kind).not.toBe("witch");
  }, 120_000);

  it("turns a chaser away when she steps in, and a shot already on its way at her doesn't land", () => {
    const { g, ring, ids } = crowd(false);
    const chasers = () => ids.filter(id => g.creatures[id].fight?.target?.kind === "witch");
    for (let i = 0; i < 600 && !chasers().length; i++) run(g, STEP);
    const chasing = chasers();
    expect(chasing.length).toBeGreaterThan(0);
    const w = g.witches[0];
    w.body = { ...w.body, x: ring.x + ring.r - 2, z: ring.z }; // (a step into the circle)
    const hp = w.health.hp, from = g.creatures[ids[0]];
    g.combat.shots.push({ id: 9999, x: w.body.x + 1, z: w.body.z, vx: -20, vz: 0, until: g.clock.time + 1, from: from.id, side: "wild", species: from.species, damage: 1, radius: 0.5, attack: "shot" });
    run(g, 5);
    expect(w.health.hp).toBe(hp);
    for (const id of chasing) expect(g.creatures[id].fight?.target?.kind).not.toBe("witch");
  }, 120_000);
});

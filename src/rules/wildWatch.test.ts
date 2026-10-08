// The wild watch (Ed, 2026-10-07): come down in a wild area and its animals stir and stare at her, then attack.
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { COMBAT } from "./combat";
import { isInside } from "./mapShape";
import { newGame, newWitchPlayer, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import { aggroOf, watcher } from "./wildWatch";
import { legendRings } from "./slowTime";
import { napping } from "./creatures";

/** Every species at strength 1 for these tests (Ed, 2026-10-08, gave the species strengths by class; these test other
 *  mechanics, written when every species was 1): combat.json strength.species emptied for the block, put back after. */
const SAVED_STRENGTH = { ...COMBAT.strength!.species };
const plainStrength = () => { for (const k of Object.keys(COMBAT.strength!.species)) delete COMBAT.strength!.species[k]; };
const restoreStrength = () => Object.assign(COMBAT.strength!.species, SAVED_STRENGTH);

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };

/** A wild area with young or adults in it, the witch high over it in the treetops, the game running. */
function overWild(): { g: Game; key: string; at: { x: number; z: number } } {
  const g = newGame(77, TUNING);
  g.clock.paused = false;
  g.witches[0].health.hp = 1e6;
  const home = cellKey(g.map.centreCell), rings = legendRings(g);
  // a spot 8 m from one of an area's watchers, in that area and clear of every legend's circle (she's safe in one)
  for (const c of g.creatures) {
    const key = cellKey(c.cell);
    if (!watcher(c) || key === home || g.party.areas.has(key) || g.friendly.has(key)) continue;
    for (let i = 0; i < 8; i++) {
      const x = c.x + Math.cos(i * Math.PI / 4) * 8, z = c.z + Math.sin(i * Math.PI / 4) * 8;
      if (cellKey(g.map.cellSafe(x, z).cell) !== key || rings.some(r => Math.hypot(r.x - x, r.z - z) < r.r + 6)) continue;
      const at = { x, z };
      g.witch = { ...g.witch, seated: false, x, z, vx: 0, vz: 0, mode: "treetop", lift: 1 };
      return { g, key, at };
    }
  }
  throw new Error("no wild area to land in");
}
const land = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false }; };
const rise = (g: Game) => { g.witch = { ...g.witch, mode: "treetop", lift: 1 }; };
const here = (g: Game, key: string) => g.creatures.filter(c => cellKey(c.cell) === key && watcher(c));
const onHer = (g: Game, key: string) => g.creatures.some(c => cellKey(c.cell) === key && c.fight?.target?.kind === "witch");

describe("the wild watch (Ed, 2026-10-07)", () => {
  beforeAll(plainStrength); afterAll(restoreStrength);
  it("has a wild area's young and adults stand and stare at her for wildWatch.time when she comes down, then attack", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    run(g, 5);
    expect(here(g, key).length).toBeGreaterThan(0);
    land(g, at.x, at.z);
    run(g, STEP);
    const t0 = g.clock.time;
    run(g, W.time - 0.2, () => {
      expect(onHer(g, key), "none goes for her while they watch").toBe(false);
      for (const c of here(g, key)) if (c.watchUntil! > g.clock.time && !napping(c, g.clock.time) && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 1) expect(c.facing, "turned to her").toBe(g.witch.x >= c.x ? 1 : -1);
    });
    let went = false;
    run(g, 15, () => { went ||= onHer(g, key); });
    expect(went, "then they attack").toBe(true);
    expect(g.clock.time - t0).toBeGreaterThan(W.time);
  }, 120_000);

  it("plays once a visit: once they've attacked, up and down again soon doesn't start it over; after wildWatch.forget away it plays again", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    land(g, at.x, at.z); run(g, STEP);
    const first = g.wildEntry.get(key)!.at;
    run(g, W.time + 0.5);
    rise(g); run(g, 3); land(g, at.x, at.z); run(g, STEP);
    expect(g.wildEntry.get(key)!.at, "the same visit").toBe(first);
    rise(g); run(g, W.forget + 1);
    expect(g.wildEntry.has(key), "forgotten").toBe(false);
    land(g, at.x, at.z); run(g, STEP);
    expect(g.wildEntry.get(key)!.at).toBeGreaterThan(first);
  }, 120_000);

  it("calls it off if she leaves before they make up their minds (Ed: time to run away): they settle and don't chase, and coming back starts it over", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    land(g, at.x, at.z); run(g, STEP);
    const first = g.wildEntry.get(key)!.at;
    expect(aggroOf(g)!.k).toBeLessThan(0.05);
    run(g, W.time * 0.5);
    const mid = aggroOf(g)!;
    expect(mid.k).toBeGreaterThan(0.4); expect(mid.k).toBeLessThan(0.6); expect(mid.danger).toBeGreaterThan(0);
    rise(g); run(g, STEP);
    expect(g.wildEntry.has(key), "called off").toBe(false);
    expect(here(g, key).every(c => c.watchUntil === undefined), "they settle").toBe(true);
    expect(aggroOf(g)).toBeNull();
    let chased = false; run(g, 4, () => { chased ||= onHer(g, key); });
    expect(chased, "and don't chase").toBe(false);
    land(g, at.x, at.z); run(g, STEP);
    expect(g.wildEntry.get(key)!.at, "a new watch").toBeGreaterThan(first);
    expect(aggroOf(g)!.k).toBeLessThan(0.05);
  }, 120_000);

  it("lets her walk out on foot before they make up their minds, and nobody follows (Ed: time to run away)", () => {
    const { g, key, at } = overWild();
    // the area's edge along a straight line from her landing spot into a neighbouring area (not out to the sand and the
    // map's edge): she lands 4 m inside it, by its watchers
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], edgeOf = ([dx, dz]: number[]) => { let r = 0; while (cellKey(g.map.cellSafe(at.x + dx * (r + 1), at.z + dz * (r + 1)).cell) === key && r < 400) r++; return r; };
    const [dx, dz] = dirs.find(d => { const r = edgeOf(d); return r < 400 && isInside(g.map.bounds, at.x + d[0] * (r + 40), at.z + d[1] * (r + 40), 60); })!;
    const r = edgeOf([dx, dz]), ex = at.x + dx * r, ez = at.z + dz * r, px = -dz, pz = dx; // (the edge point, and across the way)
    for (const c of here(g, key)) { const back = 4 + 1 + (c.id % 3) * 0.5, side = c.id % 2 ? 1 : -1; c.x = ex - dx * back + px * side; c.z = ez - dz * back + pz * side; c.tx = c.x; c.tz = c.z; } // (right by her: within any attack's reach of the edge)
    land(g, ex - dx * 4, ez - dz * 4); run(g, STEP);
    expect(aggroOf(g)).not.toBeNull();
    let chased = false, out = -1;
    const walk: Controls = { ...idle, moveX: dx, moveZ: dz };
    for (let i = 0; i < 8 / STEP; i++) {
      stepGame(g, i * STEP < TUNING.wildWatch!.time * 0.6 || out < 0 ? walk : idle, STEP); // (running on while they watch: clear of a charge's reach past the edge)
      // (out once she's out of it and stays out: an area's edge is ragged, so a step out can be a step back in)
      if (cellKey(g.map.cellSafe(g.witch.x, g.witch.z).cell) !== key) { if (out < 0) out = g.clock.time; } else out = -1;
      chased ||= onHer(g, key);
    }
    expect(out, "she got out").toBeGreaterThan(0);
    expect(chased, "nobody follows her out").toBe(false);
  }, 120_000);

  it("doesn't start over when a second witch lands in the area while it plays: they go for her as for the first", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    land(g, at.x, at.z); run(g, STEP);
    const first = g.wildEntry.get(key)!.at, until = here(g, key).map(c => c.watchUntil);
    run(g, W.time / 2);
    const two = newWitchPlayer(1, at.x + 1, at.z, TUNING);
    two.body = { ...two.body, seated: false, mode: "ground", lift: 0 }; two.health.hp = 1e6;
    g.witches.push(two);
    run(g, STEP);
    expect(g.wildEntry.get(key)!.at, "the same visit").toBe(first);
    expect(here(g, key).map(c => c.watchUntil), "no new pause").toEqual(until);
  }, 120_000);

  it("does nothing with wildWatch off", () => {
    const t = { ...TUNING, wildWatch: { ...TUNING.wildWatch!, on: false } }, g = newGame(77, t);
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0 };
    run(g, 1);
    expect(g.wildEntry.size).toBe(0);
    expect(g.creatures.every(c => c.watchUntil === undefined)).toBe(true);
  }, 120_000);
});

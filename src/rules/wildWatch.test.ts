// The wild watch (Ed, 2026-10-07): come down in a wild area and its animals stir and stare at her, then attack.
import { describe, expect, it } from "vitest";
import { newGame, newWitchPlayer, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import { watcher } from "./wildWatch";
import { legendRings } from "./slowTime";

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
  it("has a wild area's young and adults stand and stare at her for wildWatch.time when she comes down, then attack", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    run(g, 5);
    expect(here(g, key).length).toBeGreaterThan(0);
    land(g, at.x, at.z);
    run(g, STEP);
    const t0 = g.clock.time;
    run(g, W.time - 0.2, () => {
      expect(onHer(g, key), "none goes for her while they watch").toBe(false);
      for (const c of here(g, key)) if (c.watchUntil! > g.clock.time && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 1) expect(c.facing, "turned to her").toBe(g.witch.x >= c.x ? 1 : -1);
    });
    let went = false;
    run(g, 15, () => { went ||= onHer(g, key); });
    expect(went, "then they attack").toBe(true);
    expect(g.clock.time - t0).toBeGreaterThan(W.time);
  }, 120_000);

  it("plays once a visit: up and down again soon doesn't start it over; after wildWatch.forget away it plays again", () => {
    const { g, key, at } = overWild(), W = TUNING.wildWatch!;
    land(g, at.x, at.z); run(g, STEP);
    const first = g.wildEntry.get(key)!.at;
    rise(g); run(g, 3); land(g, at.x, at.z); run(g, STEP);
    expect(g.wildEntry.get(key)!.at, "the same visit").toBe(first);
    rise(g); run(g, W.forget + 1);
    expect(g.wildEntry.has(key), "forgotten").toBe(false);
    land(g, at.x, at.z); run(g, STEP);
    expect(g.wildEntry.get(key)!.at).toBeGreaterThan(first);
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

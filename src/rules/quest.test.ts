import { describe, expect, it } from "vitest";
import { spawnCreatures } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { AREA_TYPES, generateMap } from "./map";
import { cellKey } from "./party";
import { setupQuestDemo } from "./quest";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, first: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, i === 0 ? first : idle, STEP); };
/** The demo set-up: beside the nearest sleeping legend with what it dreams of on her stack. */
function demo(): { g: Game; L: Game["creatures"][number]; gift: Game["creatures"][number] } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const L = setupQuestDemo(g, (x, z) => { g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false }; })!;
  g.witches[0].health.hp = 1e6;
  return { g, L, gift: g.creatures[g.leash.stack[g.leash.stack.length - 1]] };
}

describe("the first quest (Ed, 2026-10-04)", () => {
  it("gives every sleeping legend a dream: a creature of the map, not its own kind, as a baby, young or adult, from the seed", () => {
    const map = generateMap(123, TUNING), kinds = new Set(Array.from({ length: map.n * map.n }, (_, i) => AREA_TYPES[map.typeOf(i % map.n, Math.floor(i / map.n))].creature));
    const legends = spawnCreatures(map).filter(c => c.boss), again = spawnCreatures(generateMap(123, TUNING)).filter(c => c.boss);
    for (const L of legends) {
      if (L.legendState === "happy") { expect(L.quest).toBeUndefined(); continue; } // (home's)
      expect(kinds.has(L.quest!.species)).toBe(true);
      expect(L.quest!.species).not.toBe(L.species);
      expect([0, 1, 2]).toContain(L.quest!.level);
    }
    expect(again.map(c => c.quest)).toEqual(legends.map(c => c.quest));
    expect(new Set(legends.map(c => c.quest?.level)).size).toBeGreaterThan(2); // (a mix)
  });

  it("is done by putting that sigil down in the legend's area: the legend's happy, the area friendly, the creature joins it", () => {
    const { g, L, gift } = demo(), key = cellKey(L.cell);
    expect(cellKey(g.map.cellSafe(g.witch.x, g.witch.z).cell)).toBe(key);
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("happy");
    expect(L.quest!.done).toBeDefined();
    expect(g.friendly.has(key)).toBe(true);
    expect(gift.leashed).toBe(false);
    expect(g.leash.stack).not.toContain(gift.id);
    expect(g.leash.placed.map(p => p.id)).not.toContain(gift.id);
    expect(cellKey(gift.cell)).toBe(key);
    expect(g.buffs.active.map(b => b.id)).toContain(L.id); // (its buff, if its kind has one)
  }, 60000);

  it("isn't done by the wrong creature, or out of the legend's area", () => {
    const { g, L, gift } = demo();
    gift.level = ((gift.level + 1) % 3) as typeof gift.level;
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("asleep");
    expect(g.friendly.size).toBe(0);
  }, 60000);

  it("leaves her be in a friendly area: its creatures don't attack", () => {
    const { g, L } = demo(), W = g.witches[0];
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("happy");
    const hp = W.health.hp;
    // Bring the area's adults to her.
    for (const c of g.creatures) if (!c.boss && !c.gone && !c.leashed && c.cell[0] === L.cell[0] && c.cell[1] === L.cell[1]) { c.level = 2; c.x = g.witch.x + 2; c.z = g.witch.z; c.tx = c.x; c.tz = c.z; c.seen = g.clock.time; }
    run(g, 8);
    expect(W.health.hp).toBe(hp);
  }, 60000);

  it("turns a friendly area's creatures into guards when its wave comes, and they (its legend first) see off the wild", () => {
    const { g, L, gift } = demo(), key = cellKey(L.cell);
    run(g, 0.2, { ...idle, sigil: true });
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // (out of it)
    const site = g.map.soundsystemSpot(L.cell[0], L.cell[1]);
    g.party.areas.set(key, { cell: L.cell, wave: 1, at: g.clock.time, from: null, soundsystem: { ...site, variant: 0 } });
    run(g, 0.2);
    expect(gift.guard).toBe(true);
    expect(g.creatures.filter(c => c.guard).length).toBeGreaterThanOrEqual(1);
    expect(g.creatures.filter(c => c.siege === key).length).toBe(0); // no siege on a friendly area's soundsystem
    // A wild raider walks in.
    const raider = g.creatures.find(c => !c.boss && !c.gone && !c.leashed && !c.guard && !c.friendly && Math.hypot(c.x - L.x, c.z - L.z) > 300)!;
    const kind = ["wolf", "boar", "hare"].find(k => k !== gift.species && k !== L.species)!; // (same kind never fights same kind)
    const site2 = g.map.siteOf(L.cell[0], L.cell[1]), dd = Math.hypot(site2.x - L.x, site2.z - L.z) || 1, rx = L.x + ((site2.x - L.x) / dd) * 3, rz = L.z + ((site2.z - L.z) / dd) * 3; // (beside the legend, in its area)
    Object.assign(raider, { species: kind, level: 1, x: rx, z: rz, tx: rx, tz: rz, seen: g.clock.time, cell: [L.cell[0], L.cell[1]], homeX: rx, homeZ: rz, anchorX: rx, anchorZ: rz, safeR: undefined, siege: key, enraged: true });
    g.byArea = null;
    run(g, 20);
    expect(raider.hp !== undefined || raider.fleeUntil || raider.gone).toBeTruthy();
  }, 60000);

  it("wakes an area whose quest isn't done angry: its creatures go for the nearest party animal or soundsystem", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next[0];
    const here = g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1] && !c.boss);
    here.forEach(c => { c.level = 1; });
    // One of hers parked near them, nearer than the new soundsystem will be.
    const mine = g.creatures.find(c => !c.boss && !c.gone && Math.hypot(c.x - here[0].x, c.z - here[0].z) > 300)!;
    Object.assign(mine, { species: "hare", level: 1, x: here[0].x + 3, z: here[0].z, tx: here[0].x + 3, tz: here[0].z, leashed: true, seen: g.clock.time });
    g.leash.placed.push({ id: mine.id, x: mine.x, z: mine.z, at: g.clock.time });
    stepGame(g, { ...idle, nextWave: true }, STEP);
    run(g, 0.5);
    expect(here.some(c => c.fight?.target?.kind === "creature" && c.fight.target.id === mine.id)).toBe(true);
  }, 60000);

  it("can't be done once the area's wave has come", () => {
    const { g, L } = demo(), key = cellKey(L.cell);
    g.party.areas.set(key, { cell: L.cell, wave: 1, at: g.clock.time, from: null, soundsystem: null });
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.quest!.done).toBeUndefined();
    expect(g.friendly.has(key)).toBe(false);
  }, 60000);
});

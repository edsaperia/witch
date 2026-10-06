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
    const map = generateMap(123, TUNING), kinds = new Set(map.cells.map(([x, y]) => AREA_TYPES[map.typeOf(x, y)].creature));
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

  it("isn't done by the wrong creature, or out of the legend's area", () => {
    const { g, L, gift } = demo();
    gift.level = ((gift.level + 1) % 3) as typeof gift.level;
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.legendState).toBe("asleep");
    expect(g.friendly.size).toBe(0);
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

  it("can still be done after the area's wave, while its legend sleeps: the buff, but not a friendly area (Ed, 2026-10-06)", () => {
    const { g, L } = demo(), key = cellKey(L.cell);
    g.party.areas.set(key, { cell: L.cell, wave: 1, at: g.clock.time, from: null, soundsystem: null });
    run(g, 0.2, { ...idle, sigil: true });
    expect(L.quest!.done).toBeDefined();
    expect(L.buffed).toBe(true);
    expect(g.friendly.has(key)).toBe(false); // (its wave has come and gone: the buff alone)
    expect(g.party.leyDone?.has(key) ?? false).toBe(false); // (and the ley line doesn't move for it: it moved on at the wave)
  }, 60000);
});

import { describe, expect, it } from "vitest";
import { spawnCreatures } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { AREA_TYPES, generateMap } from "./map";
import { cellKey } from "./party";
import { setupQuestDemo } from "./quest";
import { TUNING, withTuning } from "./tuning";

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

  it("makes every wild creature already living in the area friendly when it's done, calming any mid-attack; hers and other areas' as they were (art builder 3, 2026-10-07)", () => {
    const { g, L, gift } = demo(), key = cellKey(L.cell);
    const here = g.creatures.filter(c => cellKey(c.cell) === key && !c.boss && !c.gone && !c.leashed);
    expect(here.length).toBeGreaterThan(1);
    // some of them going for her already
    for (const c of here.slice(0, 2)) Object.assign(c, { enraged: true, fight: { target: { kind: "witch", id: 0 }, windupUntil: 0, nextAt: 0 } });
    const elsewhere = g.creatures.find(c => cellKey(c.cell) !== key && !c.boss && !c.gone && !c.leashed)!;
    run(g, 0.2, { ...idle, sigil: true });
    expect(g.friendly.has(key)).toBe(true);
    for (const c of here) { expect(c.friendly, `creature ${c.id}`).toBe(true); expect(c.enraged).toBeFalsy(); expect(c.fight?.target ?? null).toBeNull(); expect(c.siege).toBeUndefined(); }
    expect(gift.leashed).toBe(true); expect(gift.friendly).toBeFalsy(); // (hers, parked by the legend: as it was)
    expect(elsewhere.friendly).toBeFalsy();
    // and they leave her be from now on
    const hp = g.witches[0].health.hp;
    for (let i = 0; i < Math.round(5 / STEP); i++) { stepGame(g, idle, STEP); for (const c of here) if (!c.gone && !c.leashed) expect(c.fight?.target?.kind === "witch").toBeFalsy(); }
    expect(g.witches[0].health.hp).toBe(hp);
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

describe("legends.questCap: dreams from anywhere but the truly far (Ed, 2026-10-06: quests are a gamble)", () => {
  /** Each legend's distance (in areas) to the nearest area of the kind it dreams of, and its quest's far. */
  const dists = (questCap: number, seed = 8919) => {
    const map = generateMap(seed, withTuning({ legends: { ...TUNING.legends, questCap, questLater: false } })), out: { d: number; far: number }[] = [];
    for (const L of spawnCreatures(map).filter(c => c.boss && c.quest)) {
      const s = map.siteOf(L.cell[0], L.cell[1]);
      out.push({ far: L.quest!.far!, d: Math.min(...map.cells.filter(([cx, cy]) => AREA_TYPES[map.typeOf(cx, cy)].creature === L.quest!.species).map(([cx, cy]) => { const t = map.siteOf(cx, cy); return Math.hypot(t.x - s.x, t.z - s.z); })) / map.areaSize });
    }
    return out.sort((a, b) => a.d - b.d);
  };
  it("keeps the spread of near and far, cutting only the far tail; never its own kind; the far ones roll stronger", () => {
    const cap = TUNING.legends.questCap, capped = dists(cap), any = dists(0), med = (a: { d: number }[]) => a[a.length >> 1].d;
    expect(capped[capped.length - 1].d).toBeLessThanOrEqual(cap + 1e-9);
    expect(any[any.length - 1].d).toBeGreaterThan(cap); // (there was a tail to cut)
    // (the gamble kept: most dreams as far as ever; over a few maps, one map's few legends being too few to say)
    const ratios = [8919, 1, 123, 4242, 77].map(seed => med(dists(cap, seed)) / med(dists(0, seed)));
    expect(ratios.reduce((a, b) => a + b, 0) / ratios.length).toBeGreaterThan(0.85);
    for (const q of capped) { expect(q.far).toBeGreaterThan(0); expect(q.far).toBeLessThanOrEqual(1); expect(q.far).toBeCloseTo(q.d / cap, 6); }
    for (const L of spawnCreatures(generateMap(8919, TUNING)).filter(c => c.boss && c.quest)) expect(L.quest!.species).not.toBe(L.species); // (and with questLater on)
  }, 60000);
});

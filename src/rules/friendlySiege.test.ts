// A friendly area's wave (Ed, 2026-10-11, fix (a)): its legend's quest done before its wave, its creatures stay as party
// animals guarding it; the wave enrages none of them (rules/combat.ts startSiege). Before, it did: enraged and friendly at
// once, combat left them be (rules/game.ts), so none could be knocked down, and the night (rules/win.ts) could never be won
// (the skilled bot on seed 8919's 10-area home, a hare in its area, its posse beside it for twenty minutes).
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "./game";
import { cellKey } from "./party";
import { befriendArea } from "./sigilButton";
import { AREA_TYPES } from "./map";
import { straggler } from "./win";
import { TUNING, withTuning } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("a friendly area's wave", () => {
  it("enrages none of its creatures: they never become stragglers the night can't get past (seed 8919, the hare's area)", () => {
    // Ten-area regression world: seed 8919's hare wave and a distinct hostile wave are the original bug's fixture.
    const g = newGame(8919, withTuning({ map: { ...TUNING.map!, islandAreas: 10 } }));
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const cell = g.map.cells.find(([x, y]) => AREA_TYPES[g.map.typeOf(x, y)].creature === "hare")!;
    expect(cell).toBeDefined();
    const key = cellKey(cell);
    // its legend's quest done before its wave: the area friendly (rules/sigilButton.ts questDone)
    g.friendly.add(key); befriendArea(g, key);
    const here = () => g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && cellKey(c.cell) === key && c.level > 0);
    expect(here().length).toBeGreaterThan(0);
    expect(here().every(c => c.friendly)).toBe(true);
    // the waves brought on until its own has come
    for (let k = 0; k < 40 && !g.party.areas.has(key); k++) stepGame(g, { ...idle, nextWave: true }, STEP);
    expect(g.party.areas.has(key)).toBe(true);
    for (let i = 0; i < Math.round(2 / STEP); i++) stepGame(g, idle, STEP);
    for (const c of here()) { expect(c.enraged, `creature ${c.id}`).toBeFalsy(); expect(c.siege).toBeUndefined(); expect(straggler(c)).toBe(false); }
    // (another area's wave still enrages its own, as before)
    const other = [...g.party.areas.keys()].find(k => k !== key && !g.friendly.has(k) && g.creatures.some(c => cellKey(c.cell) === k && c.enraged));
    expect(other).toBeDefined();
  }, 120000);
});

// Wild babies keep out of fights, as her leashed ones do (rules/wildBabies.ts; Ed, 2026-11-13: "wild babies should avoid combat
// in the way that friendly babies do"; "note that Wild babies are not invitable").
import { describe, expect, it } from "vitest";
import { stepGame, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import { invitableNow, stateOf } from "./creatureStates";
import { holdsArea } from "./clear";
import { babiesOf } from "./babies";
import { shyBaby } from "./wildBabies";
import { preppedGame } from "../test/preppedGame";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const STEP = 1 / 60;
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, still, STEP); };
const R = (TUNING.combat.defendRadius ?? 30) * (TUNING.fight?.scale ?? 1);

/** A game under way (no waves), her on the ground in the first wild area with babies and fighters, its hunt begun, hard to knock out. */
function fight(seed = 7) {
  const g: Game = preppedGame(seed, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witches[0].health.hp = 1e6;
  const home = cellKey(g.map.centreCell);
  for (const [cx, cy] of g.map.cells) {
    const key = `${cx},${cy}`;
    if (key === home || g.party.areas.has(key) || !g.map.playable(cx, cy) || g.challenge?.key === key) continue;
    const own = g.creatures.filter(c => cellKey(c.cell) === key && !c.gone);
    const babies = own.filter(c => c.level === 0 && !c.circle), fighters = own.filter(c => c.level > 0 && !c.boss);
    if (babies.length < 2 || fighters.length < 2) continue;
    const at = fighters[0];
    g.witch = { ...g.witch, x: at.x + 6, z: at.z, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
    // (the babies awake, by her: in the middle of what's coming)
    babies.forEach((b, i) => { b.asleep = false; b.napUntil = undefined; b.wakeUntil = undefined; b.x = g.witch.x + 2 + i; b.z = g.witch.z + 2; b.tx = b.x; b.tz = b.z; });
    g.wildEntry.set(key, { at: g.clock.time, until: g.clock.time, last: g.clock.time, danger: 1 }); // (its watch over: the hunt at once)
    return { g, key, babies, fighters, circle: own.filter(c => c.level === 0 && c.circle) };
  }
  throw new Error("no such area");
}
/** Those going for her, within the fight's reach of her on the ground. */
const inFight = (g: Game) => g.witch.mode !== "ground" ? [] : g.creatures.filter(f => !f.gone && f.fight?.target?.kind === "witch" && Math.hypot(f.x - g.witch.x, f.z - g.witch.z) <= R);

describe("wild babies", () => {
  it("run from a fight that comes to them, stay in their own area, and stay wild and uninvitable", () => {
    const { g, key, babies } = fight();
    run(g, 0.5);
    expect(inFight(g).length).toBeGreaterThan(0);
    run(g, 4);
    const fs = inFight(g);
    expect(fs.length).toBeGreaterThan(0);
    for (const b of babies) {
      expect(b.shy, `baby ${b.id} keeping away`).toBeDefined();
      const d = Math.min(Math.hypot(g.witch.x - b.x, g.witch.z - b.z), ...fs.map(f => Math.hypot(f.x - b.x, f.z - b.z)));
      expect(d, `baby ${b.id} clear of the fight`).toBeGreaterThanOrEqual(R - 0.5);
      const at = g.map.cellSafe(b.x, b.z).cell;
      expect(`${at[0]},${at[1]}`).toBe(key);
      expect(stateOf(b)).toBe("wild");
      expect(invitableNow(b)).toBe(false);
      expect(holdsArea(b)).toBe(false);
      expect(b.fight?.target ?? null).toBeNull();
      expect(b.fleeUntil).toBeUndefined();
    }
  });

  it("go back to their roam once the fight's been over for leash.babies.calm seconds", () => {
    const { g, babies } = fight();
    run(g, 3);
    expect(babies.every(b => b.shy)).toBe(true);
    // (the fight over: her up over the treetops, where nothing goes for her)
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    run(g, (babiesOf(TUNING).calm ?? 3) + 0.5);
    for (const b of babies) { expect(b.shy).toBeUndefined(); expect(shyBaby(b, g.clock.time) || !!b.asleep || b.wakeUntil !== undefined).toBe(true); }
  });

  it("leave a legend's circle baby in its circle", () => {
    const g: Game = preppedGame(7, TUNING);
    g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
    g.witches[0].health.hp = 1e6;
    const b = g.creatures.find(c => c.level === 0 && c.circle && !c.gone)!;
    expect(b).toBeDefined();
    const foes = g.creatures.filter(c => cellKey(c.cell) === cellKey(b.cell) && c.level > 0 && !c.boss && !c.gone);
    g.witch = { ...g.witch, x: b.circle!.x + 3, z: b.circle!.z, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
    foes.slice(0, 3).forEach((f, i) => { f.asleep = false; f.napUntil = undefined; f.x = g.witch.x + 8 + i; f.z = g.witch.z; });
    g.wildEntry.set(cellKey(b.cell), { at: g.clock.time, until: g.clock.time, last: g.clock.time, danger: 1 });
    run(g, 4);
    expect(b.shy).toBeUndefined();
    expect(Math.hypot(b.x - b.circle!.x, b.z - b.circle!.z)).toBeLessThanOrEqual(b.circle!.r + 0.5);
  });
});

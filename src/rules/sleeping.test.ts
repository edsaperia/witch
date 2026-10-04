import { describe, expect, it } from "vitest";
import { toEvolve } from "./berries";
import { LEGEND_BUFFS } from "./buffs";
import { maxHp } from "./combat";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, i === 0 ? c : idle, STEP); };
/** A game with the witch on the ground beside a sleeping legend (one with a buff), too tough to knock out. */
function beside(): { g: Game; L: Game["creatures"][number] } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  const L = g.creatures.find(c => c.boss && c.legendState === "asleep" && LEGEND_BUFFS.species[c.species])!;
  // (beside it on its area's side: legends lie out toward their area's edge)
  const site = g.map.siteOf(L.cell[0], L.cell[1]), d = Math.hypot(site.x - L.x, site.z - L.z) || 1;
  g.witch = { ...g.witch, seated: false, x: L.x + ((site.x - L.x) / d) * 4, z: L.z + ((site.z - L.z) / d) * 4, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - L.x, c.z - L.z) < 120) c.gone = true; // just the two of them
  g.byArea = null;
  g.witches[0].health.hp = 1e6;
  return { g, L };
}
const wake = (g: Game, L: Game["creatures"][number]) => { g.party.areas.set(L.cell.join(), { cell: L.cell, wave: 1, at: g.clock.time, from: null, soundsystem: null }); run(g, TUNING.wildLegends.wake + 0.3); };

describe("sleeping legends (Ed, 2026-10-04)", () => {
  it("sleep through her standing beside them: no fight, no chat, not a step", () => {
    const { g, L } = beside(), W = g.witches[0], hp0 = W.health.hp, at = [L.x, L.z];
    run(g, 6);
    expect(W.health.hp).toBe(hp0);
    expect([L.x, L.z]).toEqual(at);
    expect(g.leash.talk).toBeNull();
    expect(L.legendState).toBe("asleep");
  }, 60000);

  it("wake angry when their area's wave comes, and go for her in their area, but not out of it", () => {
    const { g, L } = beside(), W = g.witches[0], hp0 = W.health.hp;
    wake(g, L);
    expect(L.legendState).toBe("awake");
    expect(L.enraged).toBe(true);
    run(g, 12);
    expect(W.health.hp).toBeLessThan(hp0);
    // She leaves its area: it doesn't follow her out.
    const out = g.map.siteOf(L.cell[0] + 3 < g.map.n ? L.cell[0] + 3 : L.cell[0] - 3, L.cell[1]);
    g.witch = { ...g.witch, x: out.x, z: out.z };
    run(g, 10);
    const k = g.map.cellSafe(L.x, L.z).cell;
    expect(k).toEqual(L.cell);
  }, 60000);

  it("sink back to sleep for good when beaten, rather than run off", () => {
    const { g, L } = beside();
    wake(g, L);
    L.hp = 1;
    // A wolf of hers finishes it.
    const wolf = g.creatures.find(c => !c.boss && !c.gone && c.level === 1)!;
    const wx = (L.x + g.witch.x) / 2, wz = (L.z + g.witch.z) / 2;
    Object.assign(wolf, { species: "wolf", leashed: true, x: wx, z: wz, tx: wx, tz: wz, seen: g.clock.time, gone: false });
    g.leash.stack.push(wolf.id);
    run(g, 8);
    expect(L.legendState).toBe("slept");
    expect(L.fleeUntil).toBeUndefined();
    expect(L.gone).toBeFalsy();
    // Another wave doesn't wake it.
    g.party.areas.delete(L.cell.join()); run(g, 0.5);
    g.party.areas.set(L.cell.join(), { cell: L.cell, wave: 2, at: g.clock.time, from: null, soundsystem: null }); run(g, 5);
    expect(L.legendState).toBe("slept");
    expect(maxHp(3)).toBeGreaterThan(0);
  }, 60000);

  it("turn happy (debug L, for now): at peace, and their buff is on", () => {
    const { g, L } = beside();
    run(g, 0.2, { ...idle, happyNearest: true });
    expect(L.legendState).toBe("happy");
    expect(g.buffs.active.map(b => b.id)).toContain(L.id);
  }, 60000);

  it("start home's legend happy, with the party", () => {
    const g = newGame(123, TUNING), [hx, hy] = g.map.centreCell;
    const home = g.creatures.find(c => c.boss && c.cell[0] === hx && c.cell[1] === hy)!;
    expect(home.legendState).toBe("happy");
  });

  it("are the only legends: party animals evolve no further than adult", () => {
    expect(toEvolve(0, TUNING)).toBe(TUNING.berries.toEvolve[0]);
    expect(toEvolve(1, TUNING)).toBe(TUNING.berries.toEvolve[1]);
    expect(toEvolve(2, TUNING)).toBe(Infinity);
  });
});

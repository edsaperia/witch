import { describe, expect, it } from "vitest";
import { toEvolve } from "./berries";
import { LEGEND_BUFFS } from "./buffs";
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
  for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - L.x, c.z - L.z) < (c.species === L.species ? 40 : 120)) c.gone = true; // just the two of them (and its own kin, which never fight it, further off: without them it grows restless; near, they'd fight her)
  g.byArea = null;
  g.witches[0].health.hp = 1e6;
  return { g, L };
}

describe("sleeping legends (Ed, 2026-10-04)", () => {
  it("sleep through her standing beside them: no fight, no chat, not a step", () => {
    const { g, L } = beside(), W = g.witches[0], hp0 = W.health.hp, at = [L.x, L.z];
    run(g, 6);
    expect(W.health.hp).toBe(hp0);
    expect([L.x, L.z]).toEqual(at);
    expect(g.leash.talk).toBeNull();
    expect(L.legendState).toBe("asleep");
  }, 60000);

  it("turn happy (debug O, for now): at peace, and their buff is on", () => {
    const { g, L } = beside();
    run(g, 0.2, { ...idle, happyNearest: true });
    expect(L.legendState).toBe("happy");
    expect(g.buffs.active.map(b => b.id)).toContain(L.id);
  }, 60000);

  it("leave home without a legend, so she starts with no buff (Ed, 2026-10-05)", () => {
    const g = newGame(123, TUNING), [hx, hy] = g.map.centreCell;
    expect(g.creatures.some(c => c.boss && c.cell[0] === hx && c.cell[1] === hy)).toBe(false);
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60);
    expect(g.buffs.active).toEqual([]);
  }, 60000);

  it("are the only legends: party animals evolve no further than adult", () => {
    expect(toEvolve(0, TUNING)).toBe(4);
    expect(toEvolve(1, TUNING)).toBe(4);
    expect(toEvolve(2, TUNING)).toBe(Infinity);
  });
});

